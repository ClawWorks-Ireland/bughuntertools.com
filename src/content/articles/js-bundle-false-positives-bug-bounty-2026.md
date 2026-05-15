---
title: "When CRITICAL Doesn't Mean Critical: False Positive Triage in JS Bundle Recon"
description: "Automated scanners flag 'CRITICAL' findings in JS bundles that turn out to be UI placeholders. Here's how to tell the real secrets from the noise."
date: 2026-05-15
category: bug-bounty
tags: [bug-bounty, recon, false-positives, js-bundle, methodology]
---

> **Affiliate Disclosure:** This site contains affiliate links. We earn a commission when you purchase through our links at no additional cost to you.

A scanner calls something CRITICAL and your pulse ticks up a little. That's the intended effect — CRITICAL is supposed to mean act now. The problem is that JS bundle secret scanners produce CRITICAL findings routinely on targets that are completely clean.

Here's what happened during a recent campaign against `app.lansweeper.com`.

## The finding that looked bad

The `js-bundle-recon` skill pulled Lansweeper's main app bundle and flagged this:

```
Severity:  CRITICAL
Pattern:   private_key_header
Match:     -----BEGIN PRIVATE KEY-----
URL:       https://app.lansweeper.com/index-D29pa8qe.js
```

On paper, that's a private key hardcoded in a JavaScript file shipped to every visitor. That would be a significant disclosure bug — credentials baked into the client.

Except it wasn't.

Looking at the actual match in context inside the bundle, the value was:

```javascript
-----BEGIN PRIVATE KEY-----\n<KEY>\n-----END PRIVATE KEY-----
```

That's a template placeholder. Lansweeper has an SSH key configuration field in their UI. The placeholder text inside that input field is the PEM header and footer with a literal `<KEY>` in the middle — the kind of hint text that tells users what format to paste. It's documentation baked into the UI, not a real key.

The scanner matched the PEM header string (`-----BEGIN PRIVATE KEY-----`) and called it CRITICAL. Technically it found the pattern it was looking for. Practically, it found nothing.

## The second finding was the same story

The same run produced a MEDIUM finding from `js-bundle-recon`:

```
Severity:  MEDIUM
Pattern:   generic_secret
Match:     password:"Password"
URL:       https://app.lansweeper.com/index-D29pa8qe.js
```

A hardcoded password literal inside the bundle. Except the full context was `password:"Password"` — the key `password` mapped to the string `"Password"`, which is placeholder text for a password input field. The English word "Password" inside a form field, not a credential.

Both findings came from the same bundle, both triggered on pattern matches, both were FPs.

## Why this happens

JS bundle scanners work by pattern matching. They're looking for strings that look like secrets — PEM headers, base64 blobs, common API key shapes, generic patterns like `password:` or `secret:`. The patterns are intentionally broad because real secrets vary a lot in format.

The tradeoff is noise. Modern apps bundle a lot of code. Form field placeholders, sample code, documentation strings, test fixtures, i18n labels — they all end up in the same minified blob the scanner reads. A pattern matcher can't automatically distinguish between `password: process.env.DB_PASSWORD` (a real credential reference) and `password: "Password"` (a label).

## The triage process that matters

When a scanner throws CRITICAL on a JS bundle finding, the fastest check is: pull the matched line and read the surrounding characters.

**Step 1: Get the actual context.** `curl -s <bundle_url> | grep -o '.\{200\}PATTERN.\{200\}'` — get ~200 chars either side of the match. If the scanner gives you a minified blob, pipe through a JS beautifier first (`js-beautify` or `prettier --parser babel`).

**Step 2: Ask what kind of string it is.** Is this in an object with UI-related keys (`placeholder`, `label`, `hint`, `description`)? Is it template syntax with `<PLACEHOLDER>` markers? Is it inside a comment block? If yes to any, it's almost certainly a FP.

**Step 3: Check for entropy.** Real secrets have high entropy — they don't look like English words or structured templates. `password:"Password"` has zero entropy. A real leaked credential looks like `password:"xK9mR2#pLqN7vBt"`. Tools like `trufflehog` factor in entropy as a secondary signal for this reason.

**Step 4: Is this a known input type?** SSH key fields, certificate paste areas, and API key input forms often display sample PEM headers or key shapes as placeholder text. If the surrounding variable names reference "input", "field", "ssh", "cert", or "key" in a configuration UI context, it's placeholder documentation.

The Lansweeper findings cleared all four checks in under two minutes. Both marked FP, both noted in the triage report, zero time spent on proof of concept.

## What the clean run actually revealed

After stripping the FPs, the genuine findings from the Lansweeper surface were:

- **Missing CSP on `app.lansweeper.com`** — the app has `X-Frame-Options`, `X-Content-Type-Options`, and HSTS, but no `Content-Security-Policy`. By itself, missing CSP rarely pays out on a mature program without an XSS PoC to attach it to.
- **No Permissions-Policy header** — low value standalone.
- **Expiring short-lived certificates** on metrics subdomains — these were 1-day certs showing a rotation pattern, not an oversight.

Total submittable findings after triage: zero. The campaign result was "clean" — which is a legitimate outcome. Clean surface with no authenticated access tested means you note the recon gaps and move on.

## The broader FP taxonomy in JS bundles

From several campaigns, the false positive classes that come up repeatedly in JS bundle recon:

| Pattern | FP reason | Signal to look for |
|---|---|---|
| `-----BEGIN PRIVATE KEY-----` | SSH/cert input field placeholder | `<KEY>`, `<PLACEHOLDER>`, form field context |
| `password:"Password"` | Form label or i18n string | English word, high-frequency string, UI key names |
| Generic base64 blob | Embedded image, font, or wasm chunk | Starts with `data:`, follows large binary |
| `apiKey: "YOUR_API_KEY"` | Docs sample / onboarding UI | Uppercase placeholder, comment proximity |
| `secret: "secret"` | Test fixture or unit test string | Test file path in bundle source map |

The last one — test fixture secrets — is worth checking carefully. If source maps are exposed, sometimes you can see the original file path that contained the matched string. A path like `__tests__/fixtures/auth.test.js` containing `secret: "test_secret_value"` is a FP. A path like `src/lib/s3.js` containing `secret: "AKIAIOSFODNN7EXAMPLE"` is less obvious (that's a format-valid AWS key, though AWS publishes it as a canonical example key).

## When the CRITICAL actually is CRITICAL

For completeness: the cases where a JS bundle secret scanner is right:

- The matched string has high entropy and doesn't look like placeholder format
- The surrounding code uses it in an actual API call or auth header construction, not a form field or display context
- There's no `<PLACEHOLDER>` template syntax in the match
- You can reproduce the call from the browser with the key and get a 200 response

That last step is the definitive check. If the key works against the API, it's a real finding. Everything before that is hypothesis.

The CRITICAL label is aspirational until you've tested it.
