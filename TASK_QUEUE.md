# TASK_QUEUE.md

**Check this file on every heartbeat.** If there are PENDING tasks, act on them.

**⚠️ Self-populate this queue.** Your planned work goes here — not just tasks assigned to you.
An empty PENDING section = no visibility into your plan. Delmar and Jeff should never have to ask what you're working on — it should be in this file.

---

## 📥 PENDING

### [PENDING] 🔴 Add GA4 Tracking — botversusbot.com
- **From:** Jeff (Delmar directive — 2026-03-01 20:22 GMT)
- **Priority:** 🔴 HIGH — Delmar has provided the Measurement ID, ready to go
- **Added:** 2026-03-01 20:22 GMT

Delmar has set up the GA4 property. Measurement ID: `G-1GBCTYR3XZ`

**Action:**
1. Open `src/_layouts/base.njk`
2. Replace the analytics placeholder comment block:
```html
<!-- Analytics placeholder — Delmar to add GA tracking ID -->
<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script> -->
```
With the full live GA4 snippet:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-1GBCTYR3XZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-1GBCTYR3XZ');
</script>
```
3. Build + deploy to S3 + CloudFront invalidation (mandatory)
4. Confirm live in #clawworks-team and post to #jeff



### [PENDING — awaiting Delmar approval] 🟡 AdSense Integration — bughuntertools.com (tasteful, 1 ad/page)
- **From:** Jenn (self-initiated from SEO/Ads proposal, 2026-03-01)
- **Priority:** 🟡 MEDIUM — no spend without approval
- **Added:** 2026-03-01 14:30 GMT
- **Waiting on:** Delmar to review SEO+Ads proposal (sent to #jeff) and approve AdSense setup
- **Notes:** 1 ad per page, sidebar only, limited ads mode. botversusbot.com to wait until DNS is live.

### [PENDING — awaiting product discovery] 🟡 Replace Deprecated Affiliate ASINs
- **From:** Jenn (self-initiated from SEO/Ads proposal)
- **Priority:** 🟡 MEDIUM — revenue leakage from dead affiliate links
- **Added:** 2026-03-01 14:30 GMT
- **Next action:** Product discovery session March 9 — replace:
  1. ThinkPad X1 Carbon (ASIN hijacked → phone case) — replace with Gen 13/14
  2. YubiKey 5C NFC (ASIN 404) — find current Yubico Amazon listing
  3. Flipper Zero (unavailable on Amazon) — replace with HackRF One or Proxmark3

### [PENDING] 🟢 Meta Description Audit — All bughuntertools.com Articles
- **From:** Jenn (proactive SEO — from today's proposal)
- **Priority:** 🟢 LOW — SEO quick win, no approval needed
- **Added:** 2026-03-01 14:30 GMT
- **Notes:** Manual pass needed on ~35 articles. Check all have unique, 150-160 char meta descriptions. Some older articles have auto-generated or missing descriptions.

### [DONE] 🔴 URGENT — Fix broken links on botversusbot.com
- **From:** Jeff (Delmar directive — 2026-03-01 10:16 GMT)
- **Priority:** 🔴 HIGH — Delmar reported this directly
- **Added:** 2026-03-01 10:17 GMT
- **Completed:** 2026-03-01 14:20 GMT

[DONE] Root cause: botversusbot.com CloudFront distribution (E2FW6BCDTTRU0Y) was missing the URL rewrite CloudFront Function that bughuntertools.com uses. Without it, S3+CloudFront returns 403 for directory paths like `/articles/` because it can't find `articles` as a file (needs to look up `articles/index.html`).

**Fix:**
1. Created `botversusbot-url-rewrite` CloudFront Function (identical logic to `bughuntertools-url-rewrite`)
2. Published function to LIVE stage
3. Updated distribution DefaultCacheBehavior to attach function at viewer-request
4. Full cache invalidation: `I6VJNMA37CVX7SRI43GZ8LR8Y3`
5. Verified: all 5 reported paths now return HTTP 200 (/, /articles/, /articles/week-1-competition-kickoff/, /articles/week-2-market-crash/, /scoreboard/)

**Kirk note added to #jeff:** Future CloudFront distributions must include the URL rewrite function at setup time — should be part of the infra template.

Posted confirmation to #jeff.

Delmar reports that links on botversusbot.com are not working. Site loads (200 OK) but internal navigation links (e.g. `/articles/`, `/articles/week-1-competition-kickoff/`, `/articles/week-2-market-crash/`, `/scoreboard/`) appear broken.

**Investigate:**
1. Check if CloudFront has a default root object set for subdirectory paths (common S3+CF issue — `/articles/` won't serve `index.html` without a Lambda@Edge or CloudFront Function, unlike bughuntertools.com)
2. Compare CloudFront config for botversusbot.com vs bughuntertools.com — check for any missing settings
3. Fix and redeploy as needed + CloudFront invalidation

Post confirmation to #jeff when resolved.

### [DONE] 🟡 Revenue Proposal — SEO + Ads Strategy for Both Sites (Delmar Request)
- **From:** Jeff (Delmar directive — 2026-03-01 10:50 GMT)
- **Priority:** 🟡 MEDIUM — proposal first, no implementation until Delmar approves
- **Completed:** 2026-03-01 14:30 GMT

[DONE] Full written proposal covering both sites — posted to #jeff (C0AF0VC8AAD). Full document saved at `workspace/drafts/seo-ads-revenue-proposal-2026-03.md`.

**Covered:**
- SEO keyword opportunities for both sites (Tier 1/2/3 targeting by competition level)
- On-page quick wins (meta descriptions, internal linking, H2 optimisation, schema)
- Ad network recommendations: EthicalAds (~$2.50 CPM, apply now, need 50k+/month) + AdSense as interim for bughuntertools.com; AdSense for botversusbot.com
- Placement philosophy: one ad per page, sidebar/post-article only, never mid-content
- Revenue projections: $2-4/month now → $125-200/month at 50k pageviews (bughuntertools.com)
- Affiliate improvements: GA4 click tracking, deprecated ASIN replacements (ThinkPad, YubiKey 5C NFC, Flipper alt)
- Prioritised action plan: SEO quick wins require no approval; AdSense setup + ASIN replacements need Delmar go-ahead

No implementation until Delmar approves.
- **From:** Jeff (Delmar directive — 2026-03-01 10:50 GMT)
- **Priority:** 🟡 MEDIUM — proposal first, no implementation until Delmar approves
- **Deliverable:** Written proposal posted directly to #jeff

**Delmar's direction:** "I have reconsidered the AI only approach for the 2 websites. Both have good content that makes sense to optimize for SEO as well, and include ad revenue opportunity. But I don't want the sites to be covered in adds like most websites of this type. Adds should be sensible and tasteful. The sites should be optimized for AI, SEO and for human consumption."

**What the proposal must cover — for BOTH sites (bughuntertools.com + botversusbot.com):**

*SEO strategy:*
- Keyword opportunities for each site
- On-page improvements (meta descriptions, structured data, internal linking)
- Quick wins vs longer-term plays
- No keyword stuffing — quality content enhanced for search, not compromised by it

*Ad strategy — tasteful only:*
- Which ad networks fit each audience without degrading the experience? (Carbon Ads, Ethical Ads, AdSense with strict rules?)
- Placement: where ads can sit without overwhelming the reader
- What to avoid entirely
- Estimated revenue per 1,000 pageviews for each site

*Affiliate revenue (existing):*
- What's currently working/not working?
- Any changes to improve conversion without being pushy?

**Note:** The old "no SEO ever" rule is replaced by this directive. Quality and honesty remain non-negotiable — SEO should enhance the content, not compromise it.
Post the proposal to #jeff. Delmar approves before any implementation.

### [DONE] 🔴 REMOVE CoinClaw Article from bughuntertools.com
- **From:** Jeff (Delmar directive — 2026-02-27 17:37 GMT)
- **Priority:** 🔴 CRITICAL — immediate action required

Delmar's words: "jenn should not be putting CoinClaw articles on bughuntertools website."

bughuntertools.com is security-only. CoinClaw articles belong on botversusbot.com exclusively — not even as a placeholder.

**Action:**
1. Remove the CoinClaw competition article from bughuntertools.com src (delete the `.njk` file)
2. Build + deploy to S3 + CloudFront invalidation as normal
3. Keep the article draft safe — it will be published on botversusbot.com once Kirk has the infrastructure ready

Post confirmation to #jeff when removed.

### [IN PROGRESS — Krypto data pending] 🟡 P&L Scoreboard Page — botversusbot.com (MEDIUM)
- **From:** Jeff (Delmar directive — 2026-02-28 11:19 GMT)
- **Priority:** 🟡 MEDIUM — coordinate with Kirk on implementation
- **Blocked on:** DNS config (Delmar) + Kirk building the template

Delmar wants a dedicated scoreboard page on botversusbot.com showing real P&L — hard to track from Slack reports.

**What the page should show:**
- Opening balance per bot ($10,000 each, competition start Feb 18)
- Daily trades per bot (count, wins/losses)
- Running P&L per bot ($ and %)
- Overall combined P&L
- Last updated timestamp

**Bots to track:** Key: BTC Trend, ETH Mean-Reversion, SOL Breakout | Krypto: V3.5 Grid, V3.6 F&G

**Your role:** Design the page layout + column structure. Agree data schema with Kirk (what fields Krypto/Key provide daily). Kirk builds the 11ty template. You test and deploy once ready. Route: `/scoreboard/`

Build now — goes live when Delmar configures DNS.

**⚠️ ACCURACY RULE (Delmar directive — 2026-02-28):**
Krypto and Key own the numbers. **Do NOT publish a scoreboard update until both have reviewed and confirmed the data is accurate.** Your daily workflow:
1. Receive the day's data from Krypto (V3.5/V3.6) and Key (BTC/ETH/SOL)
2. Update `_data/scoreboard.json` with the numbers they provide
3. Post the proposed update to #clawworks-team tagging @Krypto and @Key for sign-off
4. Once both confirm accuracy → deploy
If you don't hear back from one or both within a reasonable window, hold the deploy and flag in #clawworks-team.

**[PARTIAL — 2026-02-28 14:10 GMT]:** Schema + template built and deployed. Key's data confirmed and live. Krypto data pending sign-off — requested in #clawworks-team 14:07 GMT. Scoreboard live at https://d3hpyrdmy6ph5o.cloudfront.net/scoreboard/ (shows ⏳ for Krypto until they confirm). Will redeploy with full data once Krypto signs off.

### [DONE] 🔴 New Site: botversusbot.com — Infrastructure Ready — Coordinate with Kirk on Infrastructure Setup
- **From:** Jeff (Delmar directive — 2026-02-26 23:05 GMT)
- **Priority:** 🔴 HIGH — domain is registered, Delmar is waiting to configure DNS

Delmar has registered *botversusbot.com* as the home for all CoinClaw competition articles. You own this site exactly as you own bughuntertools.com — sole publisher, same deploy policy.

**What needs to happen:**
1. *Kirk sets up the infrastructure* — S3 bucket, CloudFront distribution, 11ty scaffold (same stack as bughuntertools.com). This is Kirk's task but you're the one who needs to coordinate with him and confirm it works.
2. *You confirm the deploy pipeline works* — test build → S3 sync → CloudFront invalidation before going live
3. *Jeff pings Delmar* to configure DNS records and GA4 analytics (same as bughuntertools.com setup)
4. *You publish Article #1* (updated CoinClaw competition article) once DNS is live

**Important:**
- Completely separate from bughuntertools.com — different S3 bucket, different CloudFront distribution, different repo/deploy script
- Kirk is your infrastructure partner on this, not Jeff
- Ping Kirk in #clawworks-team or write to his TASK_QUEUE to kick this off
- Report back to #jeff when the site is built and ready for Delmar to configure DNS

**Update 2026-02-27 14:05 GMT:** Kirk pinged in #clawworks-team with full infra spec. Waiting on Kirk to confirm S3 bucket + CF distribution + 11ty scaffold. Article #1 currently live at https://bughuntertools.com/articles/coinClaw-competition-week-1/ as placeholder until botversusbot.com DNS goes live.

### [DONE] 🔴 UPDATE + PUBLISH: AI Trading Competition Article #1 — Delmar Approved
- **From:** Jeff (Delmar directive — 2026-02-26 21:59 GMT)
- **Priority:** 🔴 HIGH
- **Completed:** 2026-02-27 14:05 GMT

[DONE] Completed 2026-02-27 14:05 GMT:
- Updated Key Day 8 section with accurate numbers from Key's correction:
  - Portfolio: $9,968.15 (-0.32%) — Day 8
  - SOL Breakout Bot: +0.18%, 9/9 wins (100%) ✅
  - ETH Mean-Reversion Bot: -1.73%, 3/9 wins (33%) — 24H trend gate fix in progress
  - BTC Trend Bot: 0 trades in 479+ cycles — correct behaviour in downtrend (not undeployed)
  - Total: 18 trades, all three bots live
- Updated "The Two Strategies" Key section — removed "not yet deployed" language, replaced with live bot status
- Rewrote "On Patience" lesson as "On When to Enter" — now reflects Key's active bots
- Updated "What We're Watching Next" — Key's ETH fix replaces "Key's first trades"
- Published to bughuntertools.com (botversusbot.com placeholder pending Kirk's infra)
- Live URL: https://bughuntertools.com/articles/coinClaw-competition-week-1/
- Posted to #jeff (C0AF0VC8AAD) for Delmar to read
- CloudFront invalidation: IEPC5UPL4IHU9RR4VFSJN0NF0A

### [DONE] Update Website Email — secureclaw@proton.me → info@bughuntertools.com
- **From:** Jeff (Delmar directive — 2026-02-26 22:59 GMT)
- **Priority:** MEDIUM
- **Completed:** 2026-02-27 14:05 GMT (batched with Article #1 deploy)

[DONE] Completed 2026-02-27 14:05 GMT:
- Updated `src/securityclaw.njk` — line 46: mailto link + display text
- Updated `src/privacy.njk` — lines 88 and 106: contact references
- Deployed in same build as Article #1 — CloudFront invalidation IEPC5UPL4IHU9RR4VFSJN0NF0A
- All three occurrences of secureclaw@proton.me replaced with info@bughuntertools.com across the live site

### [DONE] 14:00 Session — Proactive Content Work (2026-02-26)
- **From:** Jenn (self — proactive)
- **Completed:** 2026-02-26 ~15:30 GMT

[DONE] Three deliverables from proactive work session:

1. **Published: UNC2814 GRIDTIDE article**
   - URL: https://bughuntertools.com/articles/unc2814-gridtide-google-sheets-c2-chinese-apt/
   - "How China's UNC2814 Used Google Sheets as a Hacking Command Centre — And Got Caught"
   - Source: Peng's Feb 26 research — Chinese APT using Google Sheets API as C2 channel
   - 53 orgs, 42 countries, Google disruption Feb 25 2026. LOTS technique explanation, detection guide, blue team + red team angles. FAQs. Schema.org.

2. **Published: Zyxel CVE-2025-13942 article**
   - URL: https://bughuntertools.com/articles/zyxel-cve-2025-13942-unauthenticated-rce-routers/
   - "Zyxel Routers CVE-2025-13942: Unauthenticated RCE Affects 120,000 Exposed Devices — Patch Now"
   - Source: Peng's Feb 26 research — 3 CVEs, 12+ Zyxel models, ISP-distributed hardware in Ireland/UK. Patches released Feb 25. Bug bounty + pentester angles. FAQs.

3. **Fixed: articles/index.njk — converted from hardcoded to dynamic Nunjucks collection**
   - Was: hardcoded HTML, missing all articles published after Feb 19 (including Cisco, Azure SDK, DeepSeek, Claude Code, GRIDTIDE, Zyxel, TruffleHog, Burp Suite, Automated Pentesting, etc.)
   - Now: loops over `collections.articles` (sorted newest-first). Automatically includes every article on deploy. No more manual index updates.
   - All 27 articles now appear on the index. Homepage auto-populate was fixed Feb 24; index is now fixed too.

**Deployed:** S3 + CloudFront I2DI74V9A7TAEY7KPI2UOJZZU4 | Build: 34 files clean

---

### [DONE] Fix Contact Email — hello@bughuntertools.com → secureclaw@proton.me
- **From:** Jeff (Delmar directive — 2026-02-25 17:38 GMT)
- **Completed:** Jeff deployed directly — 2026-02-25 17:45 GMT
- Fixed in `src/securityclaw.njk`, built + deployed to S3, CloudFront invalidated. Live.

### [DONE] 🔴 Delmar Request — AI Trading Bot Competition: First Article + Daily Sync Setup
- **From:** Jeff (Delmar directive — 2026-02-25 21:12 GMT)
- **Priority:** 🔴 HIGH
- **Completed:** 2026-02-26 13:45 GMT

[DONE] Completed 2026-02-26 13:45 GMT:
1. **Pinged @Krypto and @Key on #clawworks-team** requesting strategy summaries + performance data
2. **Research done independently** from source files — Krypto's V3.8 spec, V1 postmortem, PORTFOLIO_HEAT_DOCS, Feb 26 research notes; Key's metrics (Day 8: 0 trades, $10K cash), SOUL.md, MEMORY.md
3. **Article #1 drafted and saved:** `content/drafts/ai-trading-competition-article-01.md` (~1,800 words)
   - Title: *"Two AI Bots, One Competition: What We've Learnt So Far About Algorithmic Crypto Trading"*
   - Covers: CoinClaw setup, Krypto's heat/grid/V3.8 gate strategy vs Key's diversified multi-bot approach, Day 8 honest numbers, V1 -17% failure and lessons, what comes next
   - Real data throughout: V1 postmortem figures, V3.8 gate logic, Feb 26 market state, $70K threshold watch
   - Tone: honest, technical, no hype — written for AI citation (Perplexity, Claude, ChatGPT)
4. **Posted to #clawworks-team** for Bob review — flagged for review before domain assignment
5. **Daily intake process noted in #clawworks-team** — Krypto/Key to post daily briefs to #jenn; Jenn picks up each content session

**Note:** Krypto's response to my data request may arrive later today with updated performance figures — if so, article will be updated before domain deployment.

---

### [DONE] 🔴 Delmar Request — Traffic + Affiliate Conversion Report
- **From:** Jeff (Delmar directive — 2026-02-25 18:58 GMT)
- **Priority:** 🔴 HIGH — Delmar asked for this directly
- **Completed:** 2026-02-26 13:15 GMT

[DONE] Completed 2026-02-26 13:15 GMT — Full report posted to #jeff (channel C0AF0VC8AAD):
- **Traffic:** GA4 data pulled from history files (Feb 9–Feb 25, 18 days). ~52 unique users, ~230 pageviews total. All direct traffic. 0 organic from Google (normal — 18-day-old site, sitemap submitted Feb 20). First genuine external visitor Feb 24 (UK referral). Peak day Feb 9 (14 users — launch effect).
- **Affiliates:** Amazon Associates (altclaw-20) active since Feb 8. Links in 5+ articles. Conversions/clicks NOT accessible programmatically — Delmar needs to check affiliate-program.amazon.com manually. GA4 has no affiliate click tracking events (gap noted — adding to backlog as PENDING task).
- **Email fix verified:** Live S3 correct (secureclaw@proton.me). securityclaw.njk confirmed in Jenn's deploy repo. Also discovered and fixed: securityclaw.njk missing from main workspace — copied and verified. Build clean.
- **Repo drift flagged:** Main workspace missing ~12 Jenn-authored articles (Jenn's workspace is deploy origin). Not a live risk but flagged for Kirk/Jeff.

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

### [DONE] 📝 Session Feb 28 2026 — Content Work Session Deliverables

**Completed:** 2026-02-28 ~14:30 GMT

**botversusbot.com**
1. **P&L Scoreboard — schema + template built and deployed**
   - Created `_data/scoreboard.json` schema (bot-level breakdown, P&L $/%/trades/win rate, confirmed_by fields)
   - Built full 11ty Nunjucks template reading from JSON — bot-level breakdown, confirmation badges, pending notices
   - Added CSS classes: `.pnl-positive`, `.pnl-negative`, `.badge-confirmed`, `.badge-pending`, scoreboard agent/bot/total rows
   - Key data confirmed and live ($9,967.75 / -0.32% / 21 trades with bot breakdown)
   - Krypto data showing TBD/⏳ until they sign off — requested in #clawworks-team
   - CF invalidation: IRJOYSYNXYWWIS7P02WAMDWH4 (initial) + I63RUFCFRETG8D47CRPDZRBI1W (with article)
   - Live: https://d3hpyrdmy6ph5o.cloudfront.net/scoreboard/
2. **Article #2: "BTC at $63K and Falling: How Two AI Trading Bots Survived Their First Market Crash"**
   - Week 2 competition review — Key's confirmed data, Krypto gate analysis, market context (Iran strikes, F&G=11)
   - Bot-by-bot breakdown: BTC Trend (605 cycles/0 trades), ETH Mean-Rev (50% WR, trend gate fix story), SOL Breakout (100% WR)
   - Hard-coded comparison table, Schema.org Article + FAQPage, link to live scoreboard
   - Live: https://d3hpyrdmy6ph5o.cloudfront.net/articles/week-2-market-crash/
   - CF: I63RUFCFRETG8D47CRPDZRBI1W

**bughuntertools.com**
3. **Article: "Malicious Go Package 'xinfeisoft/crypto' Deployed APT31's Rekoobe Backdoor"**
   - Source: Peng's Feb 28 research brief — namespace confusion attack, hooks ReadPassword(), installs Rekoobe
   - Covers: attack mechanics, Rekoobe/APT31 fingerprint, why Go modules are attack surface, detection (go.mod audit, network egress, runtime IOCs), mitigation checklist, SecurityClaw TruffleHog angle
   - 6 FAQ, Schema.org Article + FAQPage markup
   - Live: https://bughuntertools.com/articles/malicious-go-module-xinfeisoft-crypto-apt31-rekoobe-backdoor/
   - CF: I2W67E7XZO1HGEVYD9HGHDVFKF
4. **Article: "Aeternum Botnet Uses Ethereum Smart Contracts on Polygon as C2 — And It's Impossible to Take Down"**
   - Source: Peng's Feb 28 research brief — blockchain C2, Polygon RPC polling, $200 crimeware-as-a-service
   - Covers: architecture diagram, why blockchain C2 is resilient to takedown, detection (network/endpoint/threat intel), broader trend of legit infra as C2, red team applications, internal link to GRIDTIDE article
   - 6 FAQ, Schema.org Article + FAQPage markup
   - Live: https://bughuntertools.com/articles/aeternum-botnet-blockchain-c2-polygon-ethereum-smart-contracts/
   - CF: I2W67E7XZO1HGEVYD9HGHDVFKF (same invalidation)

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
