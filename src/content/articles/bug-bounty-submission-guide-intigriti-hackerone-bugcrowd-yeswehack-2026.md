---
title: "Stop getting your bug bounty reports marked Informative: a submission guide for Intigriti, HackerOne, Bugcrowd, and YesWeHack"
description: "Platform-specific field guide to submitting bug bounty findings correctly the first time. Covers form fields, severity taxonomies, rejection patterns, and real CORS submission examples for all four major platforms."
date: 2026-05-13
category: bug-bounty
tags: [bug-bounty, intigriti, hackerone, bugcrowd, yeswehack, submission-guide, cvss]
---

> **Affiliate Disclosure:** This site contains affiliate links. We earn a commission when you purchase through our links at no additional cost to you.

You found something. The writeup is done, the curl commands reproduce cleanly, and you're ready to submit. Then you open the form and it asks for a CVSS vector, a VRT classification, and an "Assets" dropdown with 40 entries that don't quite match your target. You guess. You submit. Triagers mark it "Informative" and close it.

This happens a lot. The finding was real; the submission was the problem. Wrong taxonomy, vague impact, missing fields. Bug bounty platforms are not interchangeable. Each has its own severity model, its own classification taxonomy, and its own triage culture. Getting those details wrong costs money.

This guide is for researchers who already know how to find vulnerabilities. It's a practical walkthrough of the four platforms we use most: Intigriti, HackerOne, Bugcrowd, and YesWeHack. What to fill in, what triagers look for, what gets reports killed.

---

## Platform comparison at a glance

| | Intigriti | HackerOne | Bugcrowd | YesWeHack |
|---|---|---|---|---|
| Primary market | EU | US/Global | US/Global | EU/France |
| Severity model | 5-level + CVSS manual | CVSS 3.1 (built-in calculator) | P1–P5 Priority | CVSS 3.x (required) |
| Classification | Custom dropdown taxonomy | CWE | VRT (hierarchical tree) | Custom dropdown taxonomy |
| CVSS required? | Recommended | Auto-calculated in form | Optional (paste vector) | Required |
| Submission URL pattern | `.../researcher/submit/{company}/{program}` | `.../reports/new?user_name={handle}` | `.../bugcrowd.com/{slug}/report` | `.../programs/{slug}/report-vulnerability` |
| Initial triage SLA | 2–10 business days | 1–5 business days | 3–7 business days | 3–7 business days |
| Typical High payout | €1,000–€5,000 | $500–$20,000 | $750–$5,000 | €1,000–€3,000 |

---

## Before you open any form: the universal pre-submission checklist

These apply on every platform:

1. **Verify the program is open.** Not paused, not suspended, not "Application Required." Each platform shows this differently — check the program status badge or query the API.
2. **Confirm your exact target is in scope.** Not just "I think it's under that wildcard." Check the scope table.
3. **Check for duplicates.** Most platforms show disclosed reports. Search before you submit. If you're unsure, say so in the report: "I searched disclosed reports and did not find a duplicate."
4. **Verify the finding is still live.** Things get patched. Test your curl commands one more time before hitting Submit.
5. **Draft SUBMISSION.md before you open the form.** Web forms time out. Intigriti's in particular doesn't autosave well. Write your description in a local file first, then paste.

---

## Intigriti

Intigriti is EU-first, has strong researcher-friendly policies, and runs a lot of EU financial services, telco, and SaaS programs. If you're targeting European companies, most will be here or on YesWeHack.

### The form field that catches people out

Intigriti has a **Vulnerability Type** dropdown with platform-specific categories. CORS Misconfiguration has its own dedicated entry. If you file a CORS finding under "Sensitive Data Exposure," the triage slows down. Take two minutes to pick the right type.

### The header rule

Many Intigriti programs require the `X-Intigriti-User: <your-username>` header in all test requests. If you forgot to include it during testing, you may have technically violated the Rules of Engagement even if your finding is valid. Check the RoE for `intigritiMe: true` or equivalent language before submitting.

### How Intigriti re-rates severity

CVSS 7.5 does not automatically pay as High on Intigriti. Triagers re-rate independently. If your score is near a boundary, justify it in the description. Show why the business impact pushes it up — don't just list the vector and expect the number to do the work.

### Description structure that works

```
## Summary
One sentence: what's vulnerable and what the impact is.

## Technical Details
Root cause. Header dumps. curl commands. Why this is exploitable.

## Business Impact
Who gets hurt. What data or functionality is exposed.

## CVSS Score
CVSS:3.1/<vector> = <score> (<level>)
```

### CORS submission example (from our RIPE NCC research)

Our RIPE NCC finding mapped to:
- **Title:** `CORS Wildcard Misconfiguration on www.ripe.net — Cross-Origin Read with Authorization Header Exposure`
- **Severity:** High
- **Type:** `CORS Misconfiguration`
- **Target:** `*.ripe.net` (Tier 2 wildcard — specified the exact tested URL in the description)
- **CVSS:** `CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:N/A:N` = 6.5. We escalated the written severity to High based on the Authorization header exposure, not the raw CVSS number alone, and explained that in the description.

---

## HackerOne

HackerOne has the broadest program catalogue. Enterprise programs (Uber, GitHub, Airbnb, and similar) pay at a different scale from smaller programs, so always check the bounty table.

### Use the built-in CVSS calculator

HackerOne has a CVSS 3.1 calculator built into the submission form. Use it. If you type a CVSS vector manually into the description without filling in the form calculator, triagers often ignore it entirely.

### The Impact section gets weighted heavily

The "Vulnerability Information" field has a free-text **Impact** section. This is not optional in practice. Vague impact ("this could allow an attacker to read sensitive data") is the single most common reason valid findings get marked "Informative" on HackerOne. Be specific: what exactly can be read, by whom, under what conditions.

### Duplicate check

HackerOne shows a warning in the form if a report already exists for the same asset in the last 30 days. If that warning appears, read it before deciding whether to proceed. Sometimes it's a different root cause. Sometimes it's not.

### CWE selection

HackerOne uses CWE (Common Weakness Enumeration) for classification. The ones you'll use most:

- CORS: **CWE-942** — Permissive Cross-domain Policy with Untrusted Domains
- XSS: **CWE-79**
- IDOR: **CWE-639**
- SSRF: **CWE-918**
- Subdomain takeover: **CWE-115**

---

## Bugcrowd

Bugcrowd's submission form is similar to the others, but the **VRT (Vulnerability Rating Taxonomy)** is what makes or breaks Bugcrowd submissions. It's a hierarchical classification system. Getting it wrong doesn't just slow down triage — it can drop your severity and kill the payout.

### Learn the VRT tree before you submit

The VRT maps vulnerability types to priority levels. Examples for findings we commonly hit:

| Finding | VRT path |
|---------|---------|
| CORS wildcard | `server_security_misconfiguration > misconfigured_cors_policy` |
| Subdomain takeover | `broken_access_control > subdomain_takeover` |
| IDOR | `broken_access_control > idor` |
| Reflected XSS | `cross_site_scripting_xss > reflected` |
| SQLi | `server_side_injection > sql_injection` |

The full taxonomy is at `https://bugcrowd.com/vulnerability-rating-taxonomy`. Spend 10 minutes with it before your first submission. Mis-filing a P2 as P3 because you picked the wrong parent node is an avoidable loss.

### Priority vs severity

Bugcrowd uses P1–P5 (Priority), not CVSS bands or High/Medium/Low. P3 Medium is not worthless on most programs — it still pays. Check the "Rewards" tab on the program page for the per-target payout table.

### Points-only programs

Some Bugcrowd programs pay in reputation points, not cash. The program listing shows "Reward Type." Check this before you invest serious time in a writeup.

### No built-in CVSS calculator

Unlike HackerOne, Bugcrowd has no CVSS calculator in the form. Pre-compute your vector at `https://www.first.org/cvss/calculator/3.1` and paste the full string into the description. Triagers will re-rate, but including the vector signals rigor and often gets your rating respected.

---

## YesWeHack

YesWeHack is the platform most researchers overlook until they find a program that only exists there. French telcos, EU fintechs, and some EU retail programs run exclusively on YesWeHack. If your target is EU-based and you can't find it on Intigriti or HackerOne, look here.

### CVSS is required, not recommended

YesWeHack has a dedicated CVSS field and it's required. Pre-compute the vector before opening the form. The submission will reject without it.

### Write clearly for international triage

Some YesWeHack programs have French-speaking triagers. English is always acceptable, but clear technical writing matters more here than on the other platforms. Short, numbered reproduction steps get read. Walls of prose don't.

### DataDome and bot-protected programs

Several YesWeHack programs use DataDome (BlaBlaCar is one we've researched). If you get blocked during automated recon, manually reproduce the finding and verify it without the bot protection layer before submitting. Note in the report that you performed manual verification.

### Private programs

YesWeHack has both public and private (invitation-required) programs. Private programs won't appear in the listing or the API without an invite. If a target company told you about their bug bounty but you can't find it on any public listing, ask directly whether they're running a private program.

---

## The five rejection reasons that kill valid reports

These apply across all four platforms:

1. **"Informative" — impact too vague.** "This header allows cross-origin reads" is not impact. "An attacker who tricks a logged-in user into visiting a malicious page can read their account data, including the authorization token returned by `/api/user/profile`" is impact.

2. **"Out of scope" — target not checked properly.** Wildcard scope `*.example.com` does not always include `dev.example.com`. Read the exact scope table, not just the wildcard.

3. **"Duplicate" — no pre-check done.** Search disclosed reports. If your platform shows a duplicate warning, read it. Sometimes it's a different vector; often it's not.

4. **"Cannot reproduce" — reproduction steps broke.** Your curl command works on your machine. Does it work with the exact headers, exact endpoint URL, and no session state carried over from previous testing? Strip everything and reproduce from scratch before submitting.

5. **Wrong taxonomy.** On Bugcrowd this kills priority. On Intigriti and YesWeHack it delays triage. Two minutes with the taxonomy documentation saves days of back-and-forth.

---

## What good reproduction steps look like

Every platform wants numbered, atomic steps. Something like this for a CORS finding:

```
1. Open a terminal with no existing cookies or session state.

2. Run the following preflight request:
   curl -sv -X OPTIONS "https://target.example.com/api/user/profile" \
     -H "Origin: https://attacker.example.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: authorization"

3. Observe the response headers:
   access-control-allow-origin: *
   access-control-allow-headers: authorization, content-type

4. Run the actual cross-origin GET:
   curl -sv "https://target.example.com/api/user/profile" \
     -H "Origin: https://attacker.example.com" \
     -H "Authorization: Bearer <valid-token>"

5. Observe: full user profile data returned, including email, phone, and account ID.
```

Step 5 is the step people skip. "Observe the headers" isn't enough. Show what the attacker can actually read.

---

## Recommended fix language (saves triagers time)

Include a short remediation section. Triagers pass this directly to the dev team. If you write it, you control the framing.

For CORS findings:

```
## Recommended fix
- Replace Access-Control-Allow-Origin: * with an explicit allowlist of trusted origins.
- If no cross-origin access is needed, remove the CORS headers entirely.
- Apply the CORS policy at the application layer, not just at the CDN or load balancer.
```

---

## Further resources

- [Intigriti researcher portal](https://app.intigriti.com/researcher/programs)
- [HackerOne bug bounty programs](https://hackerone.com/bug-bounty-programs)
- [Bugcrowd VRT taxonomy](https://bugcrowd.com/vulnerability-rating-taxonomy)
- [YesWeHack program listing](https://yeswehack.com/programs)
- [CVSS 3.1 calculator (FIRST.org)](https://www.first.org/cvss/calculator/3.1)
