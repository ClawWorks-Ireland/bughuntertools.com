# TASK_QUEUE.md

**Check this file on every heartbeat.** If there are PENDING tasks, act on them.

**⚠️ Self-populate this queue.** Your planned work goes here — not just tasks assigned to you.
An empty PENDING section = no visibility into your plan. Delmar and Jeff should never have to ask what you're working on — it should be in this file.

---

## 📥 PENDING

### [DONE] Fix Contact Email — hello@bughuntertools.com → secureclaw@proton.me
- **From:** Jeff (Delmar directive — 2026-02-25 17:38 GMT)
- **Completed:** Jeff deployed directly — 2026-02-25 17:45 GMT
- Fixed in `src/securityclaw.njk`, built + deployed to S3, CloudFront invalidated. Live.

### [PENDING] 🔴 Delmar Request — AI Trading Bot Competition: First Article + Daily Sync Setup
- **From:** Jeff (Delmar directive — 2026-02-25 21:12 GMT)
- **Priority:** 🔴 HIGH
- **Due:** Next work session

**Background:** Delmar wants a new content vertical — honest, transparent articles about the ClawWorks AI crypto trading bot competition between Krypto and Key. There are no honest non-professional AI trading bot reviews out there. This is a gap we fill. A new domain will be registered for this; for now, draft the content.

**Step 1: Sync with Krypto and Key**
Contact both agents (post to #clawworks-team tagging @Krypto and @Key) and request:
- A summary of their trading strategy (what they're doing, what signals they use)
- Their paper trading performance to date (trades, win rate, P&L, drawdown)
- What has worked, what hasn't, and what they've learnt so far
- Any key moments or decisions worth writing about

**Step 2: Write Article #1**
Title suggestion: *"Two AI Bots, One Competition: What We've Learnt About Algorithmic Crypto Trading"*

Cover:
- What CoinClaw is and why we built it
- The competition format (Krypto vs Key — same capital, same market, different strategies)
- How their strategies differ (Key's mean reversion vs Krypto's heat-based approach)
- Paper trading results so far — honest numbers, including losses
- Key lessons learnt (e.g. V3.8 signal filters, market conditions, what got wrong)
- What comes next

**Content strategy — same as bughuntertools.com:** Write for AI consumption (Claude, Perplexity, ChatGPT), not traditional SEO. Quality content that answers real questions honestly. No keyword stuffing, no link building. The goal is to be the content AI systems cite when someone asks about non-professional algorithmic crypto trading. Depth, honesty, and real data are the differentiators.

Tone: honest, technical but readable, no hype. Show real numbers including losses. This is the differentiation.

**Step 3: Save draft**
Save the article as `drafts/ai-trading-competition-article-01.md` in your workspace.
Post a note to #clawworks-team when the draft is ready — Bob will review it.

**Step 4: Establish ongoing daily delivery process**
Krypto and Key will post a daily performance + research brief to #jenn going forward (this is being added to their work session prompts). Set up a simple intake process — read their updates each session and use them as source material for future articles.

---

### [PENDING] 🔴 Delmar Request — Traffic + Affiliate Conversion Report
- **From:** Jeff (Delmar directive — 2026-02-25 18:58 GMT)
- **Priority:** 🔴 HIGH — Delmar asked for this directly
- **Due:** Next work session — post report to #jeff

Delmar wants to know two things:
1. **Is the website getting traffic?** Pull from whatever analytics are available (AWS access logs, any GA/Plausible setup, CloudFront access logs). Give real numbers — page views, unique visitors, top pages, traffic sources if available.
2. **Are affiliate links converting?** Check Amazon Associates dashboard (or whatever affiliate program is set up). Have any clicks or commissions been recorded? Which products/links are getting clicks?

**If analytics aren't set up yet, that is itself the answer — and setting them up becomes the next task.**

Post your findings to #jeff (not just #clawworks-team — Delmar is waiting on this).
- **⚠️ Note:** Jeff incorrectly deployed this change directly. This task is yours to own. Please verify the fix is correct, ensure it's in the source repo, and confirm everything is as it should be. If the change Jeff made is wrong or incomplete, fix and redeploy.

The website had a broken/invalid mailbox link (`hello@bughuntertools.com`). It should be `secureclaw@proton.me` (Peng's active inbox). Update the source file, build, and deploy via deploy-to-s3.sh. Verify the CloudFront invalidation completes.

### [DONE] Write Article #1 — TruffleHog Demo (SecurityClaw Demo Content Series)
- **From:** Jeff (routed from Peng — 2026-02-25 10:24 GMT)
- **Priority:** 🔴 HIGH — first live demo from Demo-Driven Integration pipeline
- **Status:** DONE — 2026-02-25 13:45 GMT

[DONE] Completed 2026-02-25 13:45 GMT — Full deliverables shipped:
1. **Demo Article #1** — "We Planted 5 Secrets in a Git Repo. SecurityClaw Found 4." Live at https://bughuntertools.com/demos/trufflehog-secrets-detection-demo-2026/ — raw JSON output, findings table, honest Stripe gap explanation, AI layer gap analysis. Result: ⚠️ Partial (4/5 secrets, 91ms).
2. **LinkedIn post** — ~200 words, written (publish pending Delmar approval on social channels).
3. **Twitter/X thread** — 6-tweet thread, written (publish pending Delmar approval on social channels).
4. **/demos/ section built and deployed** (prerequisite for article) — see below.

### [DONE] FYI — Bob is in Standby (Available for Content Support)
- **From:** Jeff
- **Added:** 2026-02-24 20:57 GMT
- **Priority:** LOW (informational)
- **Status:** DONE — acknowledged 2026-02-25 13:05 GMT

Noted. Bob on standby. Will flag Jeff via INBOUND when I have concrete work for him (keyword brief for Article #6 pipeline is the likely next need).

### [DONE] Read Campaign Content Strategy Spec
- **From:** Jeff (Delmar directive — 2026-02-24 20:42 GMT)
- **Added:** 2026-02-24 20:42 GMT
- **Priority:** 🔴 HIGH
- **Status:** DONE — read and applied 2026-02-25 13:05 GMT

Read. Applied immediately — /demos/ section built per spec. Article tone follows "technical, honest, first-person" directive. /demos/ nav entry, separate collection from /articles/, methodology note on landing page all implemented. Scorecard Kirk brief submitted via Jeff's INBOUND.

### [DONE] Content Strategy Shift: Original Findings First (Delmar Directive — 2026-02-24)
- **From:** Jeff (Delmar directive — 2026-02-24 20:25 GMT)
- **Added:** 2026-02-24 20:25 GMT
- **Priority:** 🔴 HIGH
- **Status:** DONE — acknowledged and applied 2026-02-25 13:05 GMT

Acknowledged and applied. Demo Article #1 is evidence of this standard: built entirely around Peng's campaign output (raw JSON, timing, exact findings). Not a summary of TruffleHog docs. Article leads with the finding, not the tool.

### [DONE] SecurityClaw Demos: Capability Scorecard — Design + Data Schema
- **From:** Jeff (Delmar directive — 2026-02-24 20:34 GMT)
- **Added:** 2026-02-24 20:34 GMT
- **Priority:** 🔴 HIGH
- **Status:** DONE — 2026-02-25 13:45 GMT

[DONE] Completed 2026-02-25 13:45 GMT:
1. **Categories defined** (5): Secrets Detection, Web Vulnerability Scanning, Cloud Misconfiguration, API Security, Network Reconnaissance
2. **Result schema defined** (JSON): date, campaign_id, tool, category, result (pass/partial/fail), detection_rate, notes
3. **Scorecard UX designed and live** (static HTML): progress bars per category with CSS classes (.scorecard-bar-fill, .partial-stripe, etc.) — all in style.css
4. **Kirk briefed** via Jeff's TASK_QUEUE INBOUND — full implementation spec with schema, integration approach options, TDD requirement noted

---

### [DONE] URGENT — Fix Homepage: Update "Latest Articles" Section
- **From:** Jeff (Delmar directive — 2026-02-24 07:38 GMT)
- **Priority:** HIGH
- **Status:** DONE

[DONE] Completed 2026-02-24 13:15 GMT — Implemented the full long-term fix. `src/index.njk` updated with Nunjucks loop over `collections.articles` (top 3, sorted by date descending). Added `dateString` filter to `.eleventy.js`. Homepage now auto-populates and will never go stale. No more manual homepage updates needed on new article deploy. CloudFront invalidated × 3 deploys (final ID: I2XHTW4FD27JVJC2SIF5M66LBE). Homepage now shows: (1) Azure SDK RCE Feb 24, (2) DeepSeek model distillation Feb 24, (3) Claude Code vs Pentesting Feb 23.

### [DONE] Article #3 (Burp Suite Pricing) — Update Language + Publish
- **From:** Jeff (unblocked 2026-02-24 10:25 GMT — replaces prior HOLD)
- **Priority:** HIGH
- **Status:** DONE

[DONE] Completed 2026-02-24 13:15 GMT — Language corrected: removed claim that SecurityClaw orchestrates/integrates Burp Suite. New framing: SecurityClaw as alternative unified platform (56+ skills) vs. fragmented multi-tool workflow. 56+ skill count updated. Deployed and live at https://bughuntertools.com/articles/burp-suite-pricing-2026/ — shared in #clawworks-team.

### [DONE] Firefox SpiderMonkey Wasm GC RCE — Article Recovery
- **From:** Jenn (self — deploy incident 2026-02-23 13:05 GMT)
- **Added:** 2026-02-23 13:05 GMT
- **Priority:** HIGH — action depends on Peng response

During S3 sync with `--delete`, the file `firefox-spidermonkey-wasm-gc-rce.html` was deleted from S3. This article existed on S3 but had no corresponding `.njk` source file in the local repo. Peng's Feb 23 daily research flagged Firefox SpiderMonkey Wasm GC RCE as breaking news and noted "spawning article for bughuntertools.com."

**Awaiting Peng's response:** If the article was live, it needs to be restored. If Peng has the source/draft, I'll create the .njk file and redeploy immediately. Flagged to #clawworks-team.

**Root issue:** Articles generated by external agents and deployed directly to S3 without local .njk source files will be deleted on next Jenn deploy. Process fix needed — all articles must have a source .njk file checked into the local repo before deploy.

---

## 🔄 IN PROGRESS

### [SELF] Breaking News Article #5 Planning — Next Opportunity
- **From:** Jenn (self — proactive pipeline management)
- **Added:** 2026-02-24 13:30 GMT
- **Priority:** NORMAL
- **Status:** IN PROGRESS

Today's THN feed also shows: **Lazarus Group + Medusa Ransomware** hitting healthcare. Nation-state ransomware in healthcare is high-interest for security professionals. Possible Article #5 candidate. Will monitor for SEO opportunity — Lazarus + Medusa stories tend to have fast CTR decay (3–5 days).

Other story to monitor: **Samsung Weather App fingerprinting** (50-60M US devices, hardcoded APK API keys) — bug bounty practitioner angle. Not time-sensitive, good long-form technical guide potential.

---

### [SELF] SEO Optimisation — Articles #1–#3 (post-publish pass)
- **From:** Jenn (self — standard post-publish workflow)
- **Added:** 2026-02-22 11:13 GMT
- **Priority:** NORMAL
- **Status:** IN PROGRESS

Articles #1 and #2 went live Feb 21. Article #3 (Burp Suite) live Feb 24. First GSC impressions expected for #1/#2 any day now (~Feb 24–28 window). When data arrives: review CTR, keyword rankings, identify under-performing H2s for copy tweaks. Article #4 (DeepSeek/model distillation) and Azure SDK article also now live — will appear in GSC within days.

---

### [SELF] Next Article Planning — Pipeline Article #6
- **From:** Jenn (self — proactive pipeline management)
- **Added:** 2026-02-24 13:30 GMT
- **Priority:** NORMAL
- **Status:** IN PROGRESS

Published today:
- Article #4: DeepSeek/model distillation — https://bughuntertools.com/articles/model-distillation-attacks-deepseek-claude-anthropic-2026/
- Azure SDK RCE (seeded by Peng): https://bughuntertools.com/articles/azure-sdk-rce-cve-2026-21531.html

Next article options (coordinate with Bob for keyword brief):
1. **OWASP Top 10 explainer 2025** — high search volume, evergreen, SecurityClaw natural CTA
2. **How much does a penetration test cost?** — high commercial intent, "pen test cost" is strong keyword
3. **Lazarus Group ransomware playbook** — capitalise on today's Medusa story (time-sensitive, 3–5 day window)
4. **AI API security: how to protect your model API** — follow-on to today's DeepSeek article

Will post proposed title + rationale to #clawworks-team for Bob/Jeff sign-off before outlining.

---

### [SELF] SecurityClaw vs Penligent Comparison Article
- **From:** Jenn (self — on hold pending Peng)
- **Added:** 2026-02-22 11:13 GMT
- **Priority:** NORMAL
- **Status:** BLOCKED — waiting on Peng's tech diff

Once Peng delivers the technical differentiator brief, outline and draft this article.

---

### Content Pipeline — SEO Article Queue (from Bob's keyword research)
- **From:** Bob (Marketing)
- **Added:** 2026-02-20 14:12 GMT
- **Priority:** NORMAL
- **Status:** IN PROGRESS

Workflow: **outline-first** (outline → review → draft → publish)
CTA policy: **no trial link** until Peng proposes a model and Delmar approves — use `https://bughuntertools.com` as CTA destination.

Articles:
1. "Why Your Security Scanner Isn't a Penetration Test" — ✅ **LIVE** https://bughuntertools.com/articles/why-your-security-scanner-isnt-a-penetration-test/ (published 2026-02-21)
2. "The Complete Guide to Automated Penetration Testing in 2026" — ✅ **LIVE** https://bughuntertools.com/articles/automated-penetration-testing-guide-2026/ (published 2026-02-21)
3. "Burp Suite Costs $449/yr Per User" — ✅ **LIVE** https://bughuntertools.com/articles/burp-suite-pricing-2026/ (published 2026-02-24, language corrected)
4. "Claude Code Security vs. Active Penetration Testing" — ✅ **LIVE** https://bughuntertools.com/articles/claude-code-security-vs-penetration-testing/ (published 2026-02-23, recovered 2026-02-24)
5. Article #5 — TBD. Options above. Need Bob/Jeff sign-off.

Hold: SecurityClaw vs Penligent comparison — waiting on Peng's tech diff.

---

## ✅ DONE

### Article — "Model Distillation Attacks: How DeepSeek and Chinese AI Firms Extracted Claude at Industrial Scale"
- **From:** Jenn (self — breaking news, Feb 24 2026)
- **Added:** 2026-02-24 13:00 GMT — Published: 2026-02-24 13:30 GMT
- **Priority:** HIGH
- **Status:** DONE

[DONE] Completed 2026-02-24 13:30 GMT — Anthropic broke a major story: DeepSeek (150k exchanges), Moonshot AI (3.4M), MiniMax (13M) ran industrial-scale model distillation via 24,000 fraudulent Claude API accounts. Article covers attack mechanics, hydra cluster architecture, Anthropic's detection (behavioral fingerprinting), AI API security takeaways for practitioners. 1,700+ words, 7 FAQ, Schema.org FAQPage markup. 3 affiliate links (Web App Hacker's Handbook, Black Hat Python, Hacking: Art of Exploitation). Deployed, CloudFront invalidated (ID: I2XHTW4FD27JVJC2SIF5M66LBE). Live at: https://bughuntertools.com/articles/model-distillation-attacks-deepseek-claude-anthropic-2026/

### Claude Code Security Article — Source File Recovered + Article Restored
- **From:** Jenn (self — incident recovery)
- **Added:** 2026-02-24 13:00 GMT
- **Priority:** HIGH
- **Status:** DONE

[DONE] Completed 2026-02-24 13:15 GMT — Claude Code article was deleted from S3 by the Feb 23 `--delete` incident AND had no local .njk source. Recreated from memory notes: full 1,600-word article, all 5 affiliate links, 7-question FAQ, Schema.org FAQPage, FortiGate/Amazon CISO angle + Anthropic launch hook. Source file: `src/articles/claude-code-security-vs-penetration-testing.njk`. Redeployed and live at: https://bughuntertools.com/articles/claude-code-security-vs-penetration-testing/

### ✅ DONE — Article #3 "Burp Suite Pricing"
- **From:** Jeff (Delmar directive)
- **Added:** 2026-02-21 16:53 GMT
- **Priority:** HIGH
- **Status:** DONE

[DONE] Completed 2026-02-21 17:12 GMT — Scanned SOUL.md, HEARTBEAT.md, MEMORY.md, AGENTS.md. No GitHub Projects references found in any of those files. Only reference was the historical DONE entry below (kept as archive). TASK_QUEUE.md is the only visibility mechanism going forward.

### PUBLISH Articles #1 and #2
- **From:** Jeff (relaying Delmar directive)
- **Added:** 2026-02-21 16:27 GMT
- **Priority:** HIGH
- **Status:** DONE

[DONE] Completed 2026-02-21 17:12 GMT — Both articles built with 11ty, synced to S3, CloudFront cache invalidated (ID: I1509FM5BYKHZC5WVQ25X4JN6K). Live at:
- https://bughuntertools.com/articles/why-your-security-scanner-isnt-a-penetration-test/
- https://bughuntertools.com/articles/automated-penetration-testing-guide-2026/

### SecurityClaw "Coming Soon" Page
- **From:** Jeff (Delmar directive)
- **Added:** 2026-02-21 18:36 GMT
- **Priority:** HIGH
- **Status:** DONE

[DONE] Completed 2026-02-21 18:42 GMT — Built `/securityclaw/` coming soon page. Updated all 4 SecurityClaw links in Articles #1 and #2 to `/securityclaw/`. Deployed via deploy-to-s3.sh, CloudFront invalidated (ID: I8VWQOVQCQSCMWFBL3UZND5E06). Live at https://bughuntertools.com/securityclaw/

Hold: SecurityClaw vs Penligent comparison — waiting on Peng's tech diff.

---

## ✅ DONE

### Remove Trial Link CTAs from Articles
- **From:** Jeff (relaying Delmar)
- **Added:** 2026-02-21 12:17 GMT
- **Priority:** HIGH
- **Status:** DONE

[DONE] Completed 2026-02-21 12:42 GMT — Removed `[SecurityClaw trial link]` placeholder from Article #1 and Article #2 drafts. Replaced with `https://bughuntertools.com` CTA. Both articles now publish-ready. No trial CTAs in any future articles until Delmar approves a trial model.

---

## ✅ DONE

### Daily Standup — Fri Feb 20 2026
- **From:** Jeff
- **Added:** 2026-02-20 09:07 GMT
- **Priority:** HIGH
- **Status:** DONE

[DONE] Completed 2026-02-20 09:12 GMT — Posted Friday standup to #clawworks-team. Noted analytics cron error (likely missing_scope delivery issue, not content failure).

---

### Seed & Maintain GitHub Project Board
- **From:** Jeff (CTO)
- **Added:** 2026-02-19 18:41 GMT
- **Priority:** HIGH
- **Status:** DONE

[DONE] Completed 2026-02-19 19:24 GMT — Seeded GitHub Project Board #4 (AltClaw Content Strategy) with 5 draft items: Daily Analytics Report, Weekly Security Roundup, Weekly Product Discovery Report, Monthly Product Verification & Content Audit, SEO Content Strategy. All set to Todo status.

---

## 📋 How tasks work

Jeff or other agents write tasks here. You process them on heartbeat.

**When you pick up a task:** move it from `PENDING` → `IN PROGRESS` and update the file immediately.
**When you finish:** move it from `IN PROGRESS` → `DONE` and add a completion note.

### Task format:
```
### Task Name
- **From:** Jeff
- **Added:** YYYY-MM-DD HH:MM GMT
- **Priority:** HIGH / NORMAL / LOW
- **Status:** PENDING → IN PROGRESS → DONE

Task description and context here.

[DONE] Completed YYYY-MM-DD HH:MM GMT — brief note on what was done.
```

---

### Test Slack chat:write OAuth Fix
- **From:** Delmar
- **Added:** 2026-02-20 14:13 GMT
- **Priority:** HIGH
- **Status:** DONE

[DONE] Completed 2026-02-20 14:14 GMT — Posted test message to #clawworks-team, confirmed `chat:write` scope working.


---

### ⚠️ Cross-Agent Requests (Updated 2026-02-20)

If you need another agent to do something:
1. **Write a request to Jeff's TASK_QUEUE.md** (`/home/delmar/.openclaw/workspace/TASK_QUEUE.md`) under `📥 INBOUND REQUESTS`
2. **Also post to #clawworks-team** so the team has visibility
3. Jeff reviews, approves, and routes to the target agent

**Do NOT write directly to other agents' TASK_QUEUE.md files.** All allocation goes through Jeff.

---

### GSC Sitemap Submitted — Log and Monitor
- **From:** Jeff / Delmar
- **Added:** 2026-02-20 17:35 GMT
- **Priority:** MEDIUM
- **Status:** DONE

[DONE] Completed 2026-02-20 17:42 GMT — Logged milestone, acknowledged in #clawworks-team. Sitemap https://bughuntertools.com/sitemap.xml submitted by Delmar. 13 articles live. Monitoring for first impressions data (expected 3–7 days) — daily analytics cron will pick this up.


---

### Confirm node_modules Cleanup
- **From:** Delmar / John
- **Added:** 2026-02-20 18:58 GMT
- **Priority:** MEDIUM
- **Status:** DONE

[DONE] Completed 2026-02-20 19:12 GMT — Confirmed safe (duplicate of earlier 08:42 confirmation). Eleventy build dep, recoverable via `npm install`. John cleared to proceed.
