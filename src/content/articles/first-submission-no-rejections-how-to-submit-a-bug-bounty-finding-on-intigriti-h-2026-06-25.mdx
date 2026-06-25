---
title: "First submission, no rejections: how to submit a bug bounty finding on Intigriti, HackerOne, Bugcrowd, and YesWeHack"
description: "This is not a \"what is bug bounty\" article. It's a practitioner guide for researchers who already know how to find vulnerabilities but lose bounties to bad submissions."
date: 2026-06-25
category: bug-bounty
tags: ["how to submit bug bounty report", "HackerOne vs Bugcrowd vs Intigriti", "Intigriti submission guide", "bug bounty CVSS scoring", "VRT vulnerability rating taxonomy guide", "YesWeHack submission guide", "bug bounty report rejected informative"]
hasFAQ: true
---

> **Affiliate Disclosure:** This site contains affiliate links. We earn a commission when you purchase through our links at no additional cost to you.

This is not a "what is bug bounty" article. You already know what it is. This is for researchers who find real vulnerabilities and then lose the bounty because the submission form didn't agree with them.

---

## The problem

You found something. The writeup is done, the curl commands reproduce cleanly, and you're ready to submit. Then you open the platform's form and it asks for a CVSS vector, a taxonomy classification with 40 nested entries, and an "Assets" dropdown where nothing quite matches your target. You guess. You submit. Triage marks it "Informative" and closes it.

Platforms are not interchangeable. Intigriti uses a vulnerability-type dropdown with a CORS-specific option. HackerOne builds the CVSS 3.1 calculator directly into the form. Bugcrowd has the VRT taxonomy tree that you need to know before opening the report page. YesWeHack is the EU-native platform most researchers ignore until a big fintech program shows up there exclusively.

Getting these details wrong is a correctible mistake. This guide covers what to do differently on each one.

---

## Platform comparison at a glance

| | Intigriti | HackerOne | Bugcrowd | YesWeHack |
|---|---|---|---|---|
| Primary market | EU | US/Global | US/Global | EU/France |
| Severity model | 5-level scale + CVSS manual | CVSS 3.1 (built-in calculator) | P1–P5 Priority | CVSS 3.x (required) |
| Classification | Custom dropdown taxonomy | CWE | VRT (hierarchical tree) | Custom dropdown taxonomy |
| CVSS required? | Recommended | Auto-calculated in form | Optional (paste vector) | Required |
| Submission URL | `.../researcher/submit/{company}/{program}` | `.../reports/new?user_name={handle}` | `.../bugcrowd.com/{slug}/report` | `.../programs/{slug}/report-vulnerability` |
| Initial triage SLA | 2–10 business days | 1–5 business days | 3–7 business days | 3–7 business days |
| Typical High payout | €1,000–€5,000 | $500–$20,000 | $750–$5,000 | €1,000–€3,000 |

---

## Intigriti (EU-First, Researcher-Friendly)

Intigriti is built primarily for European programs and the submission experience reflects that. Reports go to `https://app.intigriti.com/researcher/submit/{company}/{program}` and the form has a specific vulnerability-type dropdown rather than a freeform text field.

The thing most researchers miss: the `X-Intigriti-User` header. Intigriti programs send a custom request header to their in-scope assets during active testing windows. If your reproduction steps don't include that header, triagers cannot reproduce the finding the way you describe it. Some programs will mark a report Informative purely on failure to reproduce, even if the vulnerability is real. This header is usually documented on the program's scope page. Read it before you start testing, not after you've already captured the traffic.

Severity on Intigriti deserves extra attention. The platform has its own 5-level scale (Critical, High, Medium, Low, Informational), and triagers re-rate submissions independently of whatever CVSS score you provide. A CVSS 7.5 does not automatically pay at High. What matters is the triager's read of real-world impact within the specific program's context. Put your impact argument in the description field, not just in the CVSS vector. Explain what an attacker can actually do with this, on this target, in this program's environment.

Practical note: write your full submission draft offline before opening the Intigriti form. The form does not autosave reliably. Losing a browser tab means rewriting from memory.

---

## HackerOne (US Platform, Enterprise Programs)

HackerOne is the largest platform by program count, and the submission form has more built-in tooling than the others. The CVSS 3.1 calculator is integrated directly: you build the vector through a guided series of dropdowns, and the severity level fills in automatically. Do not skip this and type a CVSS string manually in the description field instead. Triagers weight the in-form calculator results over anything in the free-text section, and a manually-typed vector in the wrong field effectively disappears.

The section that kills more HackerOne reports than any other is the **Impact** field. It is a freeform text box, and most researchers write something like "an attacker could gain access to sensitive data." That is not impact. Impact is: who can trigger this, from where, what do they gain, and what does the affected system or user lose. One specific scenario with a named consequence is worth more than three sentences of generic attacker capability. Write it like you're explaining the risk to a non-technical program manager who has to approve a fix.

HackerOne shows a warning if a similar report already exists for the same asset within the last 30 days. This is a duplicate indicator, not a submission block. If you see it, read the note before deciding whether to proceed. If an equivalent finding was already triaged as Informative, your report needs to be clearly differentiated or it will land in the same place.

---

## Bugcrowd (VRT Taxonomy Is Everything)

Bugcrowd uses the Vulnerability Rating Taxonomy (VRT): a public hierarchical classification tree where every finding type maps to a default priority level. The tree goes three levels deep (category, subcategory, variant), and picking the wrong path changes the priority the program applies to your submission.

The public VRT is browsable at `https://bugcrowd.com/vulnerability-rating-taxonomy` before you open any report form. Spend two minutes there before writing up a finding. The difference between `Server-Side Request Forgery > Internal Service Interaction > Direct` and `Server-Side Request Forgery > External Service Interaction` is not just a label; it changes which payout band the program's reward table applies.

Bugcrowd uses P1–P5 Priority rather than CVSS severity bands. P1 is Critical, P3 is Medium. The exact dollar amounts are program-specific, but P3 Medium is not zero on most programs; it is often $500–$2,000. Check the program's reward table on the scope page before deciding whether a finding is worth writing up.

One thing to check before you start: whether the program is "Points Only" or "Cash." This is visible in the program header. Some researchers reach the submission step and discover this only after an hour of writeup work.

---

## YesWeHack (EU Focus, Telco/Fintech Stronghold)

YesWeHack is the platform most non-European researchers underestimate. The program catalogue includes French telecom operators, EU financial services companies, and major retail brands that don't appear on Intigriti or HackerOne. If you're targeting an EU company and can't find their program on either of those platforms, YesWeHack is where to look next.

The form at `https://yeswehack.com/programs/{program_slug}/report-vulnerability` requires a full CVSS 3.x vector. It is not auto-calculated and it is not optional. Build your CVSS vector before opening the form. The FIRST CVSS calculator at `https://www.first.org/cvss/calculator/3.1` works fine for this and is widely used.

Some YesWeHack programs have French-speaking triagers. Writing in English is expected and fine, but write for someone who may be reading your report in a second language. Short, numbered reproduction steps. Clear screenshots. No idioms. A report that says "I popped a shell" will cause confusion; "I executed an OS command and captured the output in the screenshot below" will not. Numbered steps with explicit HTTP requests and expected versus actual output get faster turnaround.

---

## Five rejection causes that appear on every platform

Most report rejections trace back to a short list of mistakes that are not platform-specific.

Vague impact is the most common. "An attacker could compromise sensitive data" is not an impact statement. Name the attacker class, the asset they reach, and the damage the target actually suffers.

Missing reproduction steps is the second. A finding with a description and no numbered steps to reproduce is automatically flagged for clarification. Include steps, expected output, and actual output. Include the HTTP request if it matters.

Wrong or missing scope causes a third category of rejections. The in-scope assets list is specific. Subdomains are not automatically in scope if they are not listed. Match your target to the scope table exactly before submitting.

Excluded vulnerability class is a less obvious one. Many programs exclude self-XSS, rate limiting without evidence of quantifiable impact, and certain CSRF cases. Read the exclusions list on the scope page. It changes per program.

Duplicate submission is the last. Check your own previous reports and the program's public disclosures before submitting. Some platforms surface in-program duplicate hints; some do not. A quick check avoids the fastest possible rejection.

---

## Recommended Reading

- [The Web Application Hacker's Handbook](https://www.amazon.com/dp/B005LVQA9S?tag=bughuntertools-20) ($45): the foundational text for web application attack techniques
- [The Tangled Web](https://www.amazon.com/dp/1593273886?tag=bughuntertools-20) ($35): Michal Zalewski's deep-dive into browser security and web application trust models
- [Bug Bounty Bootcamp](https://www.amazon.com/dp/1718501544?tag=bughuntertools-20) ($40): covers the full submission lifecycle, including how to write reports that get paid

---

## Frequently asked questions

### Why do my HackerOne reports keep getting marked Informative?

The most common cause is a weak Impact field. HackerOne triagers rely heavily on that section to assess severity. Generic statements like "an attacker could access user data" without a specific scenario tend to land as Informative. Write out exactly what an attacker can do, what they gain, and what the affected user or system loses. One concrete scenario is more useful to a triager than three lines of general capability claims.

### Do I need to write a CVSS vector for every platform?

No. HackerOne has a built-in CVSS calculator in the form that computes the vector through a guided dropdown. Bugcrowd uses the VRT taxonomy instead of CVSS as its primary classification. Intigriti recommends CVSS but does not require it. YesWeHack requires a full CVSS 3.x vector and the form will not accept a submission without one.

### What is the Bugcrowd VRT and why does it matter?

The VRT (Vulnerability Rating Taxonomy) is Bugcrowd's hierarchical classification system for vulnerability types. Each node in the tree carries a default priority level (P1–P5). Picking the wrong VRT path changes the default severity applied to your report, which feeds directly into the payout band the program's reward table uses. Two minutes with the public VRT document before submitting is worth more than a follow-up message to triage asking for a re-rating.

### Can I submit the same vulnerability to multiple platforms?

Only if the program appears on multiple platforms and the program rules permit it. Most mature programs are exclusive to one platform. Submitting the same finding simultaneously to multiple platforms is considered poor practice, and most platforms will close the later submission as a duplicate.

### What's the fastest way to get a first response from triage?

Complete submissions get faster first responses. That means: numbered reproduction steps, HTTP request/response evidence, CVSS vector or taxonomy classification filled in correctly, and a concrete impact statement. A report missing any of these will usually go into a clarification queue before triage even looks at the technical content.
