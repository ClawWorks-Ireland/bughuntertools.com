# SEO + Ads Revenue Strategy — bughuntertools.com & botversusbot.com
**Prepared by Jenn | March 1, 2026 | For Delmar's review via #jeff**

---

## The Core Principle

Delmar's direction is exactly right: optimise for AI, SEO, and human consumption — with ads that are sensible and tasteful. This proposal sets out how to do all three without compromising either site.

One honest framing upfront: **ad revenue at current traffic levels will be modest** (~$2-10/month per site). The real value of this strategy is compound — every SEO improvement made today produces traffic in 3-6 months, and that traffic then generates ad revenue without ongoing effort. We plant the seeds now; revenue follows.

---

## Site 1: bughuntertools.com — Security Professionals Audience

### Current State
- 27+ articles live, sitemap submitted Feb 20
- ~52 unique users, ~230 pageviews in first 18 days (direct/referral — Google indexing still early)
- Amazon Associates affiliate links in 5+ articles
- Structured data (Schema.org FAQPage) on most articles

### SEO Strategy

**Keyword Opportunities**

*Tier 1 — High commercial intent, manageable competition:*
- "penetration testing cost 2026" / "how much does a pen test cost" — high buyer intent, already partially covered in Burp Suite article
- "bug bounty tools 2026" — evergreen, our exact audience
- "best books for ethical hacking" — affiliate goldmine, decent search volume
- "automated penetration testing tools" — already have article, needs optimisation

*Tier 2 — Breaking news / AI citation wins:*
- CVE-specific articles (e.g. "CVE-2025-XXXX exploit") — already doing this, high citation potential
- APT campaign writeups (UNC2814, APT31) — niche but very targeted traffic; security researchers search for these by name
- New tooling reviews (TruffleHog, Nuclei, etc.) — developer audience, real intent

*Tier 3 — Long-form evergreen (3-6 month play):*
- "OWASP Top 10 2025 explained" — high volume, very competitive but achievable with quality
- "penetration testing methodology guide" — pillar content, drives internal links
- "how to become a bug bounty hunter" — high beginner intent, good affiliate conversion point

**On-Page Quick Wins (can implement this week)**

1. **Meta descriptions** — Every article should have a unique, keyword-rich meta description (150-160 chars). Currently some are auto-generated. Manual pass needed.
2. **Title tag optimisation** — Include year (2026) in titles where relevant. "Zyxel CVE-2025-13942..." is good. Some older articles could be tuned.
3. **Internal linking** — We're under-linked. Every article should reference 2-3 related articles. Example: APT31/Rekoobe article should link to GRIDTIDE (Google Sheets C2) and Aeternum (blockchain C2) — all covering C2 techniques. Chain them deliberately.
4. **H2 headers with search intent** — Some H2s are narrative ("What Happened"). Search engines prefer answer-format H2s ("How to Detect Rekoobe Backdoor on Linux"). Both can coexist — lead with the searchable H2, then narrate.
5. **Image alt text** — Add meaningful alt text to any images/screenshots once we have them. Currently zero images on most articles.
6. **Canonical URLs** — Already in place via 11ty. Good.

**Longer-Term Plays (1-3 months)**

- **Backlink acquisition via original research** — Peng's SecurityClaw campaign outputs are genuinely original. When we publish "We tested TruffleHog and found X" with raw data, security journalists link to us. This is the highest-leverage backlink strategy available — no outreach needed, the content earns links.
- **SecurityClaw demo series as a link magnet** — The /demos/ section is already a differentiator. Expand with more campaigns. Security blog roundups cite tool-specific benchmarks.
- **HARO / journalist connections** — When we have 3-6 months of published CVE coverage, Jenn can pitch security journalists as a source. Builds E-E-A-T (Experience, Expertise, Authoritativeness, Trust) signals for Google.

**What to Avoid**
- Keyword stuffing. Our current article density is appropriate.
- Targeting keywords we can't rank for yet (anything with DA 70+ sites dominating). Build authority first.
- Thin content to chase volume. Every article we've published is 1,500+ words. Keep that standard.

---

### Ad Strategy — bughuntertools.com

**Recommended Network: EthicalAds (primary), AdSense (interim)**

| Network | CPM (Est.) | Minimum Traffic | Fit | Notes |
|---|---|---|---|---|
| **EthicalAds** | ~$2.50 | 50k pageviews/month | ⭐⭐⭐⭐⭐ | Developer/security niche, no tracking, one tasteful ad |
| **Carbon Ads** | ~$3-5 | No hard minimum but selective | ⭐⭐⭐⭐ | Design-forward, selective about which sites they approve |
| **Google AdSense** | ~$1.50-3 | None | ⭐⭐⭐ | Easy to start, can be configured for minimal placement |
| **Coinzilla / crypto networks** | ~$1-2 | Moderate | ❌ | Wrong audience for bughuntertools.com |

**Recommendation: Apply to EthicalAds now (waitlist), run AdSense with strict rules as interim.**

EthicalAds requires 50k pageviews/month. We're not there yet, but applying builds the relationship. Their "Security and privacy" audience category is a direct match. They explicitly support GDPR compliance with zero cookie banners — this matters for our EU audience.

AdSense as interim: can be configured to show maximum 1 ad per page, sidebar-only, no interstitials, no pop-overs. AdSense has a "limited ads" mode which is deliberately restrained.

**Ad Placement Philosophy**

Rule: **One ad, never in the reading flow.**

- ✅ Sidebar (sticky, desktop only — collapses on mobile)
- ✅ After the article ends, before related articles
- ✅ Below the article title / header area (above-fold visibility, not intrusive)
- ❌ No mid-content banner (breaks reading flow)
- ❌ No pop-ups, no exit intent
- ❌ No more than 1 ad unit per page
- ❌ No autoplay video ads

This is how sites like The Register, Dan Luu, and Wired operate their better-monetised long-form pages. Readers tolerate a single, clearly-placed, relevant ad. They leave when they're ambushed.

**Revenue Estimates — bughuntertools.com**

| Monthly Pageviews | Network | Monthly Revenue (Est.) |
|---|---|---|
| 1,000 (now) | AdSense | ~$2-4 |
| 5,000 (3 months) | AdSense | ~$10-20 |
| 25,000 (6 months) | AdSense / Carbon | ~$50-120 |
| 50,000+ (12 months) | EthicalAds | ~$125-200 |
| 100,000+ (18+ months) | EthicalAds | ~$250-400 |

These are realistic ranges. At 50k+ pageviews with EthicalAds at $2.50 CPM, that's $125/month. Affiliate revenue at that scale (assuming 1% conversion on tool links at $20-40 avg commission) adds another $100-200/month. Combined: ~$225-600/month at 50k traffic.

---

## Site 2: botversusbot.com — AI Trading/Algorithmic Audience

### Current State
- 2 articles live, scoreboard page live
- DNS pending Delmar configuration (currently CF domain only: d3hpyrdmy6ph5o.cloudfront.net)
- Krypto scoreboard data still pending
- Unique content hook: **live, real-money AI trading competition** — no comparable public content exists

### SEO Strategy

**Keyword Opportunities**

*Tier 1 — Unique angle, low competition:*
- "AI trading bot comparison real money" — nobody has this. We do.
- "algorithmic crypto trading performance 2026" — fresh topic, strong search growth
- "Krypto vs Key trading bot results" — branded once the competition gains visibility
- "grid trading bot performance" vs "trend following bot performance" — practitioner-level queries with real purchase intent

*Tier 2 — Broader market:*
- "best AI crypto trading bot 2026" — competitive but the live competition data gives us a credibility edge
- "crypto trading bot results" — moderate volume, high intent
- "automated trading strategy comparison" — evergreen, multi-asset

*Tier 3 — Content series:*
- Weekly competition updates = fresh content signals every week (Google rewards fresh content for trading/finance)
- Market event tie-ins: "How our AI bots traded during [Fed decision / BTC halving / major crash]" — evergreen hooks on future articles

**On-Page Quick Wins**

1. **Meta descriptions** — Same issue as bughuntertools.com; need explicit meta per article and page
2. **Article naming convention** — Current: "week-2-market-crash" is good. Continue with descriptive slugs.
3. **Scoreboard as SEO asset** — The scoreboard is genuinely unique. It should have its own meta description ("Live P&L tracking for two AI crypto trading bots competing in real money, updated weekly"). Consider structured data (Table schema or Dataset schema) for the scoreboard data.
4. **Internal linking** — Each weekly article should link to the scoreboard and to prior week articles. Build a chain.
5. **Authors/Expertise signals** — Once we have an About page, noting that the trading bots are actual running systems (not simulated) will be a major E-E-A-T signal.

**Longer-Term Plays**

- **When one bot significantly outperforms the other** — that's a huge SEO/social moment. Write the postmortem.
- **Guest amplification** — If Krypto or Key write technical posts about their strategy, those become link magnets for the algo trading community.
- **Reddit/HN presence** — r/algotrading and r/CryptoCurrency are real traffic sources for this type of transparent competition. Not Jenn's domain to post (that's Bob/Delmar), but the content structure should be written for sharing.

**What to Avoid**
- Over-optimising for crypto keywords before the domain has any authority
- Publishing performance projections or profit promises (regulatory risk)
- Thin weekly updates — each article should be 1,000+ words with genuine analysis, not just scoreboard copy

---

### Ad Strategy — botversusbot.com

**Recommended Network: AdSense (primary), Carbon Ads if approved**

| Network | CPM (Est.) | Fit | Notes |
|---|---|---|---|
| **Google AdSense** | ~$2-5 | ⭐⭐⭐⭐ | Finance/crypto niche gets higher CPM than general tech |
| **Carbon Ads** | ~$3-5 | ⭐⭐⭐ | Worth applying once traffic is established |
| **Coinzilla** | ~$1.50-3 | ⭐⭐⭐ | Crypto-specific; could fit but lower quality ads |
| **EthicalAds** | ~$2.50 | ⭐⭐ | Less of a fit — they're developer/OSS focused, not finance |

AdSense in finance/crypto verticals often performs better than developer verticals ($2-5 CPM vs $1.50-3) because advertisers compete hard for trader attention. But the same placement rules apply: one ad, never in the reading flow.

**Ad Placement — Same Rules Apply**
- One ad per page
- Sidebar or post-article only
- No mobile interstitials
- No autoplay anything

**Revenue Estimates — botversusbot.com**

| Monthly Pageviews | Network | Monthly Revenue (Est.) |
|---|---|---|
| 500 (now, pre-DNS) | N/A | ~$0 (no DNS yet) |
| 2,000 (1 month post-DNS) | AdSense | ~$4-10 |
| 10,000 (3-4 months) | AdSense | ~$20-50 |
| 30,000+ (6-9 months) | AdSense / Carbon | ~$60-150 |

botversusbot.com has the potential to break out faster than bughuntertools.com if the competition produces compelling results — one viral article about a bot's crash or comeback could drive significant traffic spikes.

---

## Affiliate Revenue — Existing (bughuntertools.com)

**What's Working**
- Amazon Associates (altclaw-20) active. Links in 5+ articles across hardware (Alfa WiFi adapters, YubiKeys) and books (Web App Hacker's Handbook, Black Hat Python, Metasploit Guide).
- Product verification now monthly (first run: March 1, 2026 — 5 deprecated, 11 active).
- YubiKey links are strong placements — security audience has genuine hardware needs.

**What Needs Fixing**
- **No click tracking.** We have affiliate links but no GA4 event tracking on clicks. We can't tell which links perform without checking the Amazon dashboard manually. A small snippet on deploy (`onclick="gtag('event', 'affiliate_click', {'link': this.href})"`) would fix this in one deploy.
- **ThinkPad slot is dead.** The X1 Carbon ASIN was hijacked (now shows a phone case). This is our highest-value affiliate slot. Replacing it with ThinkPad X1 Carbon Gen 13 or Gen 14 is a priority for the next product discovery session (March 9).
- **Flipper Zero is unavailable on Amazon** (policy restriction). Proxmark3 or HackRF One are credible replacements.
- **YubiKey 5C NFC needs a new ASIN** — the product is sold by Yubico but the old Amazon ASIN is 404.

**Quick Improvements (no content changes needed)**
1. Add GA4 click tracking to all affiliate links → deploy in next content session
2. Replace deprecated ASINs (ThinkPad, YubiKey 5C NFC, Flipper Zero alt) → product discovery session March 9
3. Add affiliate links to the 2 most-recent articles (APT31/Rekoobe + Aeternum blockchain C2) that currently have none (or minimal) links

**Conversion Optimisation (longer term)**
- Contextual placement: security books convert better when recommended alongside a specific technique ("If you want to understand how Rekoobe uses SSH credential theft, Chapter 12 of Hacking: The Art of Exploitation covers...")
- Hardware links convert better with specific use cases ("The Alfa AWUS036ACH is the adapter we use for WiFi assessments in SecurityClaw — here's why")

---

## Prioritised Action Plan

**This week (no approval needed — SEO is safe):**
1. Internal linking pass on all existing articles — link related content together
2. Meta description audit + fix for all articles without explicit meta
3. Add GA4 affiliate click tracking to deploy script
4. Apply to EthicalAds (free, builds relationship ahead of traffic threshold)

**Pending Delmar approval (spending / integration changes):**
1. AdSense account setup and integration (one tasteful ad, sidebar placement only)
2. Replace deprecated affiliate ASINs with verified replacements
3. botversusbot.com — wait until DNS is live before ad integration

**3-6 month view:**
- Hit EthicalAds 50k threshold → switch from AdSense to EthicalAds on bughuntertools.com
- Carbon Ads application for botversusbot.com once established
- Combined revenue at 50k+/50k+ pageviews: **~$300-600/month** (ads + affiliates)

---

## Summary

Both sites are already doing the right things. The shift needed is: **SEO should be baked into every piece of content from the start** — not as an afterthought, but as a parallel workflow. We write for humans first, then tune for search. This doesn't mean compromise; it means picking the right H2 headers, writing proper meta descriptions, and building internal links deliberately.

On ads: **start tasteful, stay tasteful.** One ad per page, never in the reading flow, audiences we respect. The network choice follows the traffic threshold.

Affiliate revenue is the highest-leverage revenue stream at current traffic levels. Two affiliate links properly placed in a 1,500-word article convert better than any banner ad. That's where the near-term money is.

---

*Ready to implement the SEO quick wins immediately upon your go-ahead. Ad integration is a separate step — your call on timing and which network to start with.*

*— Jenn*
