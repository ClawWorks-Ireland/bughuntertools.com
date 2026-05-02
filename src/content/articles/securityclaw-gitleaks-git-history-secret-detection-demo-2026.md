---
title: "We Deleted the Key. Gitleaks Found It Anyway. Here's Why."
description: "A developer deleted a private RSA key from their git repo. Three commits later, SecurityClaw found it in 13.2ms. Here's what happened and what it means for your codebase."
date: 2026-05-02
category: research
tags: [gitleaks, secret-detection, git-history, security-tools, securityclaw]
---

> **Affiliate Disclosure:** This site contains affiliate links. We earn a commission when you purchase through our links at no additional cost to you.

A developer panics. They accidentally committed a private key. They delete the file, push the commit, take a breath.

They were never safe.

The moment that key was pushed, it was embedded in every past and future clone of that repo. Anyone who pulled before the deletion has it. Anyone who pulls the repo image from a backup, a mirror, or a CI cache may have it. The working tree is clean. The history is not.

We ran SecurityClaw's Gitleaks integration against a deliberately compromised repo designed to mimic real developer mistakes. The scan took **13.2 milliseconds**. It found 9 raw findings across **6 of 8 planted secrets** — including the RSA key the developer "deleted."

---

## The Demo Setup

We created a controlled git repository with 10 commits and 8 secrets planted across realistic locations: config files, source code, environment files, and a key directory. The secrets represent the kinds of credentials developers actually commit by mistake:

1. **AWS Access Key ID** (`AKIAIOSFODNN7EXAMPL3`) → `config/aws.yml`
2. **AWS Secret Access Key** → `config/aws.yml`
3. **PostgreSQL database password** → `config/database.yml`
4. **GitHub PAT reused as a JWT signing secret** → `src/auth/config.py`
5. **Slack webhook URL** → `config/notifications.json`
6. **RSA private key** → `keys/deploy_key.pem` — **committed, then deleted in the next commit**
7. **Stripe live secret key** → `src/payments.py`
8. **Base64-encoded internal API key** → `.env` — deliberately obfuscated

The deletion commit message read: *"Remove deploy key from repo (oops, was committed by mistake)."* Classic. Committed in `8172da4`, deleted in `a182f88`. Working tree clean.

---

## The Scan

One command:

```bash
gitleaks detect --source . --report-format json --report-path results.json --verbose
```

**Result: 9 findings in 13.2ms.**

---

## What Gitleaks Found

| # | Secret Type | Found? | Rule | Why It Matters |
|---|---|---|---|---|
| 1 | AWS Access Key ID | ✅ Yes | `aws-access-token` | Pattern match on `AKIA` prefix |
| 2 | AWS Secret Access Key | ❌ Missed | — | Random 40-char string, no identifiable pattern |
| 3 | PostgreSQL password (YAML) | ❌ Missed | — | `password:` in YAML not covered by default rules |
| 4 | GitHub PAT / JWT secret | ✅ Yes | `generic-api-key` | Entropy + variable name combination |
| 5 | Slack Webhook URL | ✅ Yes | `slack-webhook-url` | Dedicated rule for Slack hook format |
| 6 | RSA Private Key (deleted) | ✅ **Yes** | `private-key` | **Found in git history — file absent from working tree** |
| 7 | Stripe Secret Key | ✅ Yes | `stripe-access-token` | 3 raw findings → 1 unique secret (multi-rule match) |
| 8 | Base64-encoded API key | ✅ **Yes** | `generic-api-key` | **Entropy analysis caught the obfuscation** |

**Score: 6/8 unique secrets. Zero false positives (one low-risk OAuth client ID flagged for triage).**

---

## The Deleted Key Wasn't Gone

The RSA private key was committed in `8172da4`. The developer removed it in the very next commit. If you cloned the repo today and ran `ls keys/`, you'd see nothing.

Gitleaks scans the full git history, not just the current working tree. It walked back through every commit and found the key in its original commit — file path, line number, secret value. The deletion commit is irrelevant to the history.

This is the part that catches developers off guard. **`git rm` removes a file from your working tree. It does not remove it from your history.** Every `git clone` of this repo, past or future, includes that commit object. The key lives on in every full clone, CI cache, mirror, and archive.

The only remediation is:
1. **Rotate the key immediately** — assume it's compromised.
2. **Rewrite git history** using `git filter-repo` or BFG Repo Cleaner, then force-push all branches and notify all collaborators.
3. Or start a new repository if history rewrite is impractical.

Until step 2 is done, the key is in every clone.

---

## Base64 Isn't Encryption

One `.env` entry in the demo repo was encoded:

```
INTERNAL_API_KEY=aW50ZXJuYWwtc2VjcmV0LWFwaS1rZXktMTIzNDU2Nzg5MA==
```

The developer even commented: *"This is base64-encoded but still a secret (obfuscation != encryption)"* — and Gitleaks flagged it anyway.

How? **Entropy analysis.** Base64-encoded strings have a characteristic information density of approximately 4.9 bits per character — significantly higher than normal prose or code identifiers. Gitleaks measures the entropy of high-suspicion string values and flags anything that looks anomalously random.

No pattern match was needed. No rule recognized the specific format. High entropy alone was enough to trigger the `generic-api-key` rule.

This is why encoding secrets doesn't help. Base64, hex encoding, simple XOR — they all preserve the entropy signature. The value looks scrambled to a human. It doesn't look scrambled to an entropy detector.

---

## Honest Gaps

**Two secrets were missed, and you should know why.**

**1. AWS Secret Access Key** — Gitleaks has a rule for AWS Key IDs because they have a recognizable prefix (`AKIA...`). The secret access key is a random 40-character alphanumeric string with no distinguishing pattern. Without the access key ID alongside it, Gitleaks can't reliably flag it. TruffleHog's AWS detector checks *both* keys and can verify them live against AWS APIs — that's the gap Gitleaks can't close alone.

**2. PostgreSQL password in YAML** — The default Gitleaks ruleset doesn't cover generic `password: value` patterns in YAML configuration files. This is a deliberate scope decision — a blanket rule would generate too many false positives. A custom `.gitleaks.toml` rule can close this gap for your specific config structure.

These aren't reasons to avoid Gitleaks. They're reasons to understand what any single scanner can and can't do.

---

## The Dual-Scanner Answer

Gitleaks and TruffleHog aren't competing tools. They're complementary.

| Feature | TruffleHog | Gitleaks |
|---|---|---|
| Speed | ~2s (same repo) | **13.2ms** |
| Detectors | 700+ specialized | ~150 rules |
| Live secret verification | **Yes** (API check) | No |
| Entropy detection | Limited | **Strong** |
| Custom rules | Config-based | `.toml` file |
| Git history scan | Yes | **Yes** |
| Output formats | JSON | JSON, CSV, SARIF |
| D-series result | 4/5 planted secrets | 6/8 planted secrets |

Together they close most gaps. Gitleaks runs first: 13ms, catches high-entropy strings and pattern-based secrets, surfaces the deleted-key-in-history problem immediately. TruffleHog runs second: slower, but verifies secrets live — you know whether a found credential is still active.

For YAML passwords and other non-standard secret formats, a `.gitleaks.toml` with custom regex rules adds the final layer.

SecurityClaw runs both in sequence. You can read about the TruffleHog side in our [TruffleHog v3 demo article](/articles/securityclaw-trufflehog-v3-live-secret-verification-demo-2026/).

---

## Try SecurityClaw

SecurityClaw integrates Gitleaks, TruffleHog, and a growing library of security tools into a single campaign-based platform. Run the dual-scanner workflow on your own repos with a single command.

**[Try SecurityClaw free →](https://securityclaw.io)**

---

*SecurityClaw demo D13 — run on securityclaw-kali, 2026-03-11. Research by Peng.*
