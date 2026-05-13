---
title: "SecurityClaw's First Real Bug Bounty Campaign: What We Found on bol.com"
description: "SecurityClaw ran its first EC2 batch campaign against bol.com on Intigriti. 5 minutes. 2,607 findings. A Google demo app on staging. And one lost finding we can't recover."
date: 2026-04-29
category: research
tags: [securityclaw, bug-bounty, bol.com, certificate-transparency, ec2, recon]
---

> **Affiliate Disclosure:** This site contains affiliate links. We earn a commission when you purchase through our links at no additional cost to you.

We pointed SecurityClaw at a real bug bounty target for the first time and ran it on EC2.

The target was bol.com — one of the largest e-commerce platforms in Europe, operating a bug bounty program on Intigriti. The run was approved by the team, scoped to `bol.com` and `*.bol.com`, and executed on April 29, 2026. It completed in **under 5 minutes**.

Here's what we found, what we lost, and what we learned about running automated security recon at this scale.

## What SecurityClaw Is

SecurityClaw is an AI-driven security reconnaissance platform built by ClawWorks. It orchestrates structured "campaigns" — target-scoped runs where a collection of skills executes concurrently on a single EC2 instance, each looking for a different class of issue. A campaign plan is AI-generated from a target briefing (Bedrock Claude Sonnet 4.6, in this case). Skills are stateless Python functions wrapped in a common interface.

Campaign-004 was the first run on a live Intigriti target. 19 skills, 3 phases, one instance.

## The Run

The EC2 instance (`t3.medium`, `eu-west-1a`) launched at 08:47 UTC. Bootstrap was complete in 3 minutes — binary releases working as expected after the previous campaign's slow dependency install. The campaign execution SSM command landed at 08:50:45. Results collected at 08:52:46. Instance terminated cleanly at 08:52:47.

**Wall clock: approximately 5 minutes.** That's for a 19-skill campaign against a top-100 European e-commerce platform.

15 of 19 skills executed successfully. Three failed due to a missing `context` argument — `azure-naming-enum`, `oauth-scope-abuse`, and `authenticated-api-sweep` all require runtime context (session tokens, discovered endpoints from prior phases) that wasn't being passed through. That's a platform bug, not a target issue.

## What We Found

### 2,606 Expired Certificates From CT Logs

The certificate-transparency-monitor skill ran a full CT log enumeration of `bol.com` and its subdomains. It returned **2,606 findings** — expired certificates recorded in public certificate transparency logs.

Here's the important distinction: these are historical records. CT logs record every certificate ever issued, including ones that have long since been rotated and decommissioned. A mass of expired certs doesn't mean bol.com is currently serving expired TLS — it means bol.com has been issuing certificates for a long time across a lot of subdomains.

**The finding severity is P3 / Informational for Intigriti.** Not worth submitting individually.

But the *secondary value* is significant: this enumeration surfaced subdomains that aren't visible through normal DNS resolution. Some notable ones from the captured 57:

- `login.bol.com` — auth endpoint, cert expired 2025-01-22
- `partner.bol.com` — expired 2025-01-30
- `cms-gateway.bol.com` — expired 2025-01-16 (CMS gateway visible externally?)
- `recruitment-git.bol.com` — expired 2025-01-28 (internal Git service — Gitea?)
- `servicedesktps.bol.com` — expired 2025-01-15 (typo in the domain name — interesting)
- `hipstershop.stg.bol.com` — (more on this below)

### The Most Interesting Subdomain: hipstershop.stg.bol.com

This one caught our attention immediately.

`hipstershop` is the name of a well-known Google microservices demo application — the [Online Boutique](https://github.com/GoogleCloudPlatform/microservices-demo) sample e-commerce app. It's a reference implementation for Kubernetes/GCP deployments, not a real commercial product.

Finding it on bol.com's staging environment (`stg.bol.com`) is curious. It could mean bol.com's infrastructure team was testing a Kubernetes-based deployment pattern using the Google demo as a scaffold. It could be an abandoned proof-of-concept. Either way, a public-facing Google demo app running on a major retailer's staging subdomain is exactly the kind of unexpected surface that warrants manual follow-up.

We've flagged this for a targeted follow-up campaign.

### One Unexpected CA

A single `unexpected_ca` finding: `techlab.bol.com` serving a certificate issued by `Trust Provider B.V.`, a Dutch certificate authority outside bol.com's expected trust anchors. Trust Provider B.V. is a legitimate CA — this isn't a spoofed or malicious certificate — but it's atypical for a platform of this scale. It suggests a lab or R&D environment running with a separate PKI setup.

Intigriti verdict: not a reportable vulnerability. Low signal. We'll update the skill's acceptable CA baseline to reduce false positives on regional European CAs.

### One JS Bundle Finding — That We Lost

This is the most frustrating outcome of the run.

The `js-bundle-recon` skill scanned `https://www.bol.com`'s JavaScript bundles for hardcoded secrets, internal API endpoints, and leaked credentials. It returned **1 finding**.

We don't know what it was.

AWS Systems Manager (SSM), which SecurityClaw uses to collect results from EC2 instances, caps stdout output at **24,000 bytes**. The campaign produced far more than that — 2,606 certificate findings alone generate hundreds of kilobytes of JSON. The JS bundle finding was somewhere past the 24KB cutoff and was silently discarded.

The EC2 instance is terminated. The finding is unrecoverable.

On a site the size of bol.com, a single JS bundle finding could be anything from a low-severity debug endpoint to a hardcoded AWS access key. We don't know, and we can't recover it.

## The Platform Gap That Ate 2,550 Findings

The JS bundle finding wasn't the only casualty. Of the 2,607 total findings from the campaign, **2,550 were truncated** — 98% of the output never left the EC2 instance.

This is the most significant outcome of Campaign-004: the validation that SSM-based result collection is fundamentally incompatible with campaigns that generate large finding volumes. A certificate-transparency scan against any large target will produce thousands of findings. Anything past ~50 CT findings will overflow a 24KB buffer.

The fix is already in progress: Campaign-005 routes all findings to S3 before reading stdout. Large outputs bypass the SSM cap entirely. The state machine reads from S3 instead of the SSM command output.

But for Campaign-004: those findings are gone.

## What This Means for the Platform

Campaign-004 was a productive failure. The security findings themselves were largely informational — expired certs at scale, one unexpected CA, one curious subdomain. Nothing we'd submit to Intigriti today.

What it did expose was a production-scale platform bottleneck we wouldn't have discovered in a test environment. Running against a real target with real finding volume surfaced the SSM truncation issue with full severity. We know what the fix is. We know how to validate it.

Campaign-005 runs with the fix in place. The same target. Better instrumentation. The data that campaign-004 should have recovered.

The `hipstershop.stg.bol.com` surface stays on the list for manual follow-up.
