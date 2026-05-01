---
title: "How SecurityClaw Finally Got Past bol.com's WAF — and What It Found"
description: "Enterprise WAFs block cloud IPs before your scanner says hello. SecurityClaw solved the problem with a Kali Linux container running from a residential IP — and bol.com had real findings waiting."
date: 2026-05-01
category: bug-bounty
tags: [securityclaw, waf-bypass, bol.com, kali, residential-ip, header-security, bug-bounty]
---

There's a problem that every cloud-based security scanner eventually runs into: the target doesn't even let you knock on the door.

SecurityClaw ran four campaigns against bol.com from AWS EC2 instances. Every single one came back the same way — 100% `WAF_BLOCK` before any security skill could execute. Akamai's CDN identified the AWS IP ranges and dropped the connections at the edge. Not a single header analysed. Not a single TLS cert inspected. Just wall-to-wall 403s.

The fix wasn't clever evasion. It was a change of address.

## The Cloud IP Problem

Modern CDN-backed WAFs don't just inspect request content — they also check where requests are coming from. AWS, Azure, and GCP publish their IP ranges publicly, and WAF vendors maintain reputation databases that flag cloud-sourced traffic as automated scanners before a single skill runs.

This isn't a flaw in the WAF. It's working as designed. For security researchers, though, it's a dead end: you can build the most sophisticated scanner in the world and get blocked at the front door because your egress IP is listed in an AWS range file.

SecurityClaw's previous four bol.com campaigns (002–005) all hit this wall. Over 2,600 findings were eventually recovered from Campaign 005 via an S3 results pipeline — but those were certificate findings from subdomain scanning, the one phase that didn't require direct HTTP contact with the main site. Anything needing live HTTP contact was silently WAF-blocked.

## The Solution: A Residential Kali Container

The fix was Peng's `securityclaw-kali` Docker container, running SecurityClaw from a residential network rather than a cloud instance. The container runs on AirDelmar's home infrastructure with egress through a Sky UK broadband connection in Dublin, Ireland — IP `51.186.6.232`, AS5607.

From a WAF's perspective, that IP looks like a home user's browser, not an AWS scanner. Akamai doesn't block it.

The acceptance test suite confirmed the setup before any real campaign ran:

- **T-1 SSH**: Connected ✅
- **T-2 Python**: 3.13.12 at `/opt/venv/bin/python3` ✅
- **T-3 AWS identity**: Account `172337538645` (delmar) confirmed ✅
- **T-10 Egress IP**: `51.186.6.232` — AS5607 Sky UK Limited, Dublin IE — residential, not cloud/VPN ✅
- **T-5 Dry-run campaign**: 14 skills, 10 findings, exit 0 ✅

All infrastructure checks passed. The container has AWS credentials for result storage (findings go to S3) but its outbound HTTP traffic routes through the residential broadband connection.

## bol.com: What Changed

The difference between EC2 and the Kali container wasn't subtle:

| | EC2 (campaigns 002–005) | Kali container |
|---|---|---|
| CDN status | 🔴 100% WAF_BLOCK | ✅ No blocks |
| Skills executed | 0 (blocked before any skill ran) | 14/14 ✅ |
| Findings | WAF_BLOCK only | 9 real findings |
| TLS audit | N/A | Clean (0 findings) |
| Header analysis | N/A | 7 findings |

For the first time, SecurityClaw ran its full 14-skill suite against bol.com and got through cleanly. No WAF triggers. No blocks. Just results.

## What SecurityClaw Found

bol.com's TLS configuration is solid — the audit came back clean with zero findings. Certificate management, cipher suites, protocol versions: nothing to report there.

The HTTP security headers are a different story:

**HIGH**
- Missing `Content-Security-Policy` — no CSP means the browser has no instruction to block inline scripts or restrict resource origins. A meaningful XSS gap for a large e-commerce site.

**MEDIUM**
- Missing `X-Content-Type-Options` — browsers may MIME-sniff responses, enabling content-type confusion attacks
- Missing `X-Frame-Options` — no clickjacking protection (though CSP's `frame-ancestors` would address this)
- Missing `Referrer-Policy` — full referrer headers leak internal URL structure to third parties
- Missing `Permissions-Policy` — no restrictions on camera, microphone, geolocation access by embedded content

**LOW**
- Missing `Cross-Origin-Opener-Policy (COOP)`
- Missing `Cross-Origin-Resource-Policy (CORP)`

**INFO**
- Certificate Transparency log entry (1 finding)
- JavaScript bundle fingerprint (1 finding — tech stack identified)

Nine real findings where EC2 campaigns returned nothing but walls. The header gaps, particularly the missing CSP on an e-commerce platform handling payment flows, are genuinely worth reporting through Intigriti.

## What This Unlocks

The residential Kali container isn't just a workaround for one target — it changes SecurityClaw's operational model for any Akamai- or Cloudflare-protected target. Cloud IP blocking is the default posture for major CDNs, which means most enterprise targets have been effectively out of reach for EC2-based scanning.

With residential egress confirmed and validated end-to-end, SecurityClaw can now run meaningful campaigns against the category of targets that previously returned nothing. The acceptance test suite is in place to verify the setup before each campaign cycle.

bol.com Campaign 006 has a real findings baseline to build from. The wall is down.
