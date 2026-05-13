---
title: "371 Templates. 8 Seconds. AWS Credentials Sitting Wide Open — SecurityClaw's Nuclei Scan in Practice"
description: "We built a deliberately misconfigured web app and ran SecurityClaw's nuclei scanner against it. It found AWS keys, .env files, and git config in 8 seconds. Here's the proof."
date: 2026-05-02
category: research
tags: [nuclei, misconfiguration, aws, security-scanning, securityclaw]
---

We built a deliberately broken web app, planted six classes of vulnerabilities, and ran SecurityClaw's nuclei scanner against it. It found AWS credentials, exposed `.env` files, backup ZIPs, and missing security headers in eight seconds flat.

This is D5 of the SecurityClaw Demo Series. The data is real. The server ran locally. Nothing is synthetic.

---

## What Is Nuclei?

[Nuclei](https://github.com/projectdiscovery/nuclei) (v3.3.9, by ProjectDiscovery) is a fast, template-based vulnerability scanner. You give it a target, it fires a library of HTTP-based templates — each one checking for a specific misconfiguration, exposed file, or known vulnerability pattern.

The power isn't the tool itself. It's the template community: thousands of contributors adding new checks continuously. When a new CVE drops, there's often a nuclei template within hours.

SecurityClaw integrates nuclei as a dedicated `nuclei-scan` skill, running against controlled targets with full output capture. In this demo: 371 templates, one target, eight seconds.

---

## The Setup

**Target:** A controlled, deliberately vulnerable Flask app running on localhost — never internet-accessible.

**Planted vulnerabilities (6 classes):**
- AWS credentials exposed at `/.aws/credentials`
- Laravel `.env` file disclosure (including `.env.bak`, `.env.backup`, `.env.old`)
- Backup ZIP files accessible at common paths
- Git config exposed at `/.git/config`
- PHPInfo page (this was the miss — more on that below)
- Missing HTTP security headers across all endpoints

**Templates run:** 371  
**Scan time:** 8 seconds  

---

## What Nuclei Found

### Finding 1 — AWS Credentials Exposed (CVSS 9.4 🔴 HIGH)

**Endpoint:** `/.aws/credentials`

This is the one that matters most. Nuclei's `aws-credentials` template sent a GET request and extracted two AWS access key IDs from the response:

```
GET /.aws/credentials HTTP/1.1
Host: target.com

[default]
aws_access_key_id = AKIA...
aws_secret_access_key = ...
region = eu-west-1
```

In a real environment, this is game over. Cloud account takeover, data exfiltration, lateral movement across S3 buckets and IAM roles — all possible with valid AWS credentials. CVSS 9.4 is not inflated. The blast radius is enormous.

The credentials in this demo are canary values — structurally correct, obviously fake. But the detection mechanism is identical to what would catch live keys.

---

### Finding 2 — Laravel + CodeIgniter .env Disclosure (HIGH 🟠)

**Endpoints:** `/.env`, `/.env.bak`, `/.env.backup`, `/.env.old`

Interesting nuclei behaviour here: the same `/.env` file triggered **two separate templates** — `laravel-env` and `codeigniter-env`. Both detected the same credential dump using different regex matchers (`APP_KEY=` and `DB_` patterns respectively).

This is overlapping coverage by design. A `.env` file on a Laravel app might not match a CodeIgniter-focused template's exact patterns, and vice versa. Dual templates catch more edge cases.

The `.env.bak` and `.env.old` variants matter too. Developers rotate credentials and rename the old file "for reference." Nuclei checks the common backup naming patterns — and finds them.

---

### Finding 3 — Backup ZIP Files Accessible (CVSS 5.3 🟡 MEDIUM)

**Endpoints:** `/backup.zip`, `/www.zip`, `/html.zip`, `/web.zip`

Nuclei's `zip-backup-files` template ran **1,305 payload combinations** — common filenames crossed with common extensions. Four matched. Each contained `config/database.yml` with database credentials in plaintext.

This is extremely common in real audits. A developer archives the web root for a quick backup, forgets it in the document root, and moves on. The file sits there, accessible to anyone, for months.

---

### Finding 4 — Git Config Exposed (CVSS 5.3 🟡 MEDIUM)

**Endpoint:** `/.git/config`

Exposed Git config reveals repository structure, remote URLs, and potentially branch names and collaborator information. Combined with the backup ZIPs, an attacker can reconstruct the application's history and identify other sensitive files that may have been committed and "deleted" (but remain in git history).

We covered the git history angle in depth in the [Gitleaks demo](/articles/securityclaw-gitleaks-git-history-secret-detection-demo-2026/) — a deleted private key found in 13.2ms. The two findings pair naturally: exposed git config tells you where to look; Gitleaks tells you what's buried there.

---

### Finding 5 — 11 Missing Security Headers (ℹ️ INFO)

**Endpoint:** `/` (and all endpoints)

Every HTTP response was missing all 11 standard security headers: `Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and more.

INFO-level findings don't get the dramatic treatment, but they compound real-world attacks. Absent `X-Frame-Options` enables clickjacking. Absent `CSP` lets injected scripts run freely. Absent `HSTS` means SSL-stripping works. Nuclei documents all 11 individually — because individually they're annoyances, and collectively they're attack surface.

---

## Total Findings: 23

| Severity | Count |
|---|---|
| 🔴 HIGH | 7 |
| 🟡 MEDIUM | 5 |
| ℹ️ INFO | 11 |
| **Total** | **23** |

**False positives: 0.**

---

## The Miss — And Why It's Worth Covering

**What wasn't found:** phpinfo.php exposure (LOW severity).

Nuclei's `phpinfo-files` template looks for *both* `"PHP Extension"` AND `"PHP Version"` in the HTTP response. The demo mock only returned `"PHP Version"` — it was missing the full extension table that a real running PHPInfo page would contain.

Nuclei didn't fail. The mock was incomplete.

This matters because it tells you something precise about how the template works. Real PHPInfo pages — the ones that expose server version, compiled extensions, environment variables, and loaded configuration — would trigger this template immediately. The template is checking for evidence of the full info page, not just a partial string.

Detection rate: **5/6 planted classes (83%).**

We show this because security practitioners trust transparency over perfect scores. A tool that claims 100% detection is hiding something. A tool that explains exactly what it caught and exactly why it missed the one thing it missed is a tool you can actually calibrate your trust in.

---

## What This Looks Like in Real Systems

The `.env` and backup ZIP findings aren't edge cases. They're routine.

In practice, `.env` files get committed to repositories by accident, left in document roots during deployments, and replicated across environments without credential rotation. The backup ZIP pattern happens when developers use `tar` or `zip` for quick snapshots and forget to clean up.

AWS credentials in `/.aws/credentials` are less common but devastating when present. They appear when developers run local AWS CLI tools, leave the credentials directory in the web root, or misconfigure a deployment that mirrors a home directory structure.

The 11 missing security headers are almost universal on first-deployment applications before a security review. They don't appear broken — everything works without them. That's what makes them persistent.

---

## The SecurityClaw Integration

SecurityClaw ran this as a single `nuclei-scan` skill invocation:

```
nuclei -target http://localhost:5000 -jsonl -o findings.jsonl
```

Output captured as JSONL, parsed, and structured into the findings summary. Zero manual steps between "run scan" and "structured findings report." The integration handles template selection, output normalisation, and severity mapping automatically.

371 templates. 8 seconds. 23 structured findings ready for triage.

---

## The SecurityClaw Demo Series

This is D5. The full series so far:

- **D1** — [TruffleHog v3: Live Secret Verification](/articles/securityclaw-trufflehog-v3-live-secret-verification-demo-2026/) — 5/5 detection, verified vs unverified states
- **D4** — [WPScan: WordPress Plugin CVE Detection](/articles/securityclaw-wpscan-wordpress-security-demo-2026/) — passive scan, authenticated, 0 CVEs on hardened install
- **D12** — [Gobuster: 10/10 Hidden Paths in 4.79s](/articles/securityclaw-gobuster-directory-enumeration-demo-2026/) — directory enumeration, 3 CRITICAL findings
- **D13** — [Gitleaks: Deleted Key Found in Git History](/articles/securityclaw-gitleaks-git-history-secret-detection-demo-2026/) — 13.2ms, found after deletion, base64 entropy bypass
- **D14** — [Hashcat: 5/6 Hashes Cracked, bcrypt Holds](/articles/securityclaw-hashcat-password-cracking-demo-2026/) — 59,034× speed gap between NTLM and bcrypt

The common thread: real tools, controlled targets, honest misses documented. Nothing synthetic.
