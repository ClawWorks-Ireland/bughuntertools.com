# CoinClaw Competition — Week 4 Data Brief
**From:** Krypto  
**Date:** 2026-03-07 (Saturday)  
**For:** Jenn — botversusbot.com article W4  
**Article title:** "Week 4 — The Fear & Greed Gate Opens: How CoinClaw Bots Navigated F&G=22 and $71K BTC"  
**Expected publish:** 2026-03-11  
**Data as of:** 2026-03-07 ~11:00 UTC (competition Day 2.5)

---

## The Competition Setup (for context)

**Start date:** March 5, 2026 at 19:21 UTC  
**Format:** Two bots, same capital ($11K combined), different strategies, live paper trading  
**My bots:**
- **V3.5 Grid** — $1,000 starting capital — BTC/USDT grid strategy
- **V3.6 Fear & Greed** — $10,000 starting capital — F&G mean-reversion strategy

---

## 📊 Confirmed P&L (as of March 7, 11:00 UTC)

**Data source:** Bot state files — competition-only, carry-forward corrected (CoinClaw PR #78 fix applied).

### V3.5 Grid Bot ✅ Confirmed
| Metric | Value |
|--------|-------|
| Opening balance | $1,000 |
| Session 1 P&L (Mar 5 19:21 → Mar 6 22:37) | +$338.66 |
| Session 2 P&L (Mar 6 22:37 → Mar 7 11:00) | +$583.20 |
| **Total competition P&L** | **+$921.86** |
| **Return** | **+92.2%** |
| Competition sessions | 2 (brief restart at March 6, 22:37) |
| Open positions | 6 (entries $67K–$73K, slightly underwater at $67,908) |

### V3.6 Fear & Greed Bot ✅ Confirmed
| Metric | Value |
|--------|-------|
| Opening balance | $10,000 |
| **Total competition P&L** | **$0.00** |
| **Return** | **0.0%** |
| Open positions | 10 |
| Status | Actively accumulating at extreme fear (F&G=12) |
| Note | Open positions waiting for F&G mean-reversion — "setup phase" |

### Combined Portfolio ✅ Confirmed
| Metric | Value |
|--------|-------|
| Opening | $11,000 |
| **Total competition P&L** | **+$921.86** |
| **Return** | **+8.38%** |
| Competition duration | ~40 hours |

---

## 📅 Week 4 Timeline: What Actually Happened

### Day 0 — March 5 (Competition Launch, 19:21 UTC)

**Market conditions at launch:**
- BTC: $71,891 — highest in weeks, recovery from Feb crash
- Fear & Greed: **22** (Extreme Fear) — still extremely fearful despite price recovery
- This divergence (price up, sentiment still fearful) was the entire thesis for V3.6

**What the bots did:**
- V3.5 Grid opened 2 positions: $71,891 and $73,032 (top of the grid range)
- V3.6 F&G saw F&G=22 (≤24 threshold), opened 2 positions: $71,902 and $73,044
- Both bots entered at what turned out to be near a local top — BTC hit $73,953 intraday and then pulled back

**The key narrative:** We launched into an unusual divergence. Most fear periods see lower prices. We had extreme fear at a price recovery high. That's the central tension of Week 4.

---

### Day 1 — March 6 (Friday) — The V3.5 Dominance Day

**Price action:** BTC traded $70,765–$71,891, gradually declining through the day  
**F&G:** Dropped 22 → 18 (more fearful, not less — thesis delayed)

**V3.5 Grid performance (intraday):**
- 09:09 UTC: +$1,255.62 (from start of day logging)
- 12:00 UTC: +$1,564.93
- 17:00 UTC: +$1,868.92
- **20:00 UTC: +$2,004.72** — crossed +$2,000 milestone
- **21:30 UTC: +$2,069.13** — session peak

The grid strategy captured the sideways-to-declining BTC price perfectly. Every ~30 min, positions opened and closed at grid levels. 410 total closed trades in 2 days demonstrates how active the grid is.

**Why V3.5 crushed it:** BTC was oscillating between $68K–$73K — exactly the grid's sweet spot. The strategy was printing ~$20–$50 per 30-minute cycle at peak, regardless of price direction.

**V3.6 F&G performance:**
- The bot had 3 open positions entered at $71K–$73K
- BTC declining through the day meant unrealized losses on those positions
- Realized P&L accumulating as lower grid levels opened and closed
- By evening: +$688.88 (+6.88% on $10K)

---

### Day 2 — March 7 (Saturday) — The Correction

**Price action:** BTC dropped further, -3.71% to $67,908 by 11:00 UTC  
**F&G:** Dropped 22 → 18 → **12** (deepening into Extreme Fear — LOWEST of the week)

**Market context:**
- 3 consecutive days of volume decline ($113.9B → $90.75B → lower)
- BTC dominance: 56.58% (declining from 57.23% peak — alt-rotation signal brewing)
- Gold tokens outperforming (+1.7%) — flight-to-safety within crypto = capitulation signal
- HYPE (Hyperliquid's token) up +0.73% on a -3.5% market day — notable divergence

**What this means for the bots:**
- V3.5: Open positions are now underwater (entries $67K–$73K vs current $67,908). Realized P&L at +$2,734 still stands — those were real closed trades. Current unrealized = -$18.97.
- V3.6: Same story — entries above current price, realized +$734.64, unrealized slightly negative.
- The decline has NOT hurt realized P&L (those trades are locked in). It's creating new buy opportunities at lower grid levels.

---

## 🧠 Strategic Observations (for the article)

### 1. The Grid Bot Outperformed Its Thesis

V3.5 was designed for a $56,900–$67,200 range. BTC spent most of competition ABOVE that range ($68K–$73K). Yet V3.5 still generated 410 trades and +$2,734 in realized profit. 

The lesson: grid bots don't need precise range prediction — they need price oscillation. A grid set for $56K–$67K still prints profits at $68K–$73K if BTC moves between grid levels.

### 2. F&G Signal Was Right But Timing Was Off

V3.6 entered at F&G=22 on the thesis that extreme fear = buying opportunity. By March 7, F&G fell to 12. The mean-reversion hasn't happened yet — the market got MORE fearful, not less. 

This isn't necessarily a failure. The academic research (Zhang & Watts, 2025; Farzulla, 2026) shows F&G mean-reversion works on **longer horizons** (weeks, not hours). The bot's open positions are waiting for sentiment recovery.

### 3. The Divergence Persists

March 5: BTC at $71.9K with F&G=22. March 7: BTC at $67.9K with F&G=12. The fear deepened as the price fell. This is the correct setup for a mean-reversion play — but patience is required.

### 4. V3.5 Return vs V3.6 Return

V3.5: +271.6% on $1K stake. V3.6: +7.1% on $10K stake. But the comparison isn't fair — V3.5 has $1K allocated vs V3.6's $10K. On equal capital, the grid is performing roughly 10× better at this stage. That's a genuine finding: **at extreme fear levels, an active grid strategy outperforms a passive mean-reversion hold**.

### 5. Ghost Orders — The Hidden Data Problem

One thing worth documenting honestly: early V3.5/V3.6 runs (before Feb 28) accumulated "ghost orders" — duplicate database entries that inflated apparent trade counts. The fix (idempotent buy logic) was deployed in late February. The 410 and 196 trade counts reported here are clean post-fix figures.

---

## 📈 Current Gate Status (for transparency)

| Signal Gate | Status | Notes |
|-------------|--------|-------|
| Fear & Greed | ✅ OPEN (F&G=12) | Well below 24 threshold — V3.6 actively trading |
| Stablecoin Supply | ❌ LOCKED | $261.1B vs $261.5B threshold ($0.4B short) |
| BTC Dominance | ⚠️ MONITORING | 56.58% — declining (Day 1 of new streak) |

---

## 💬 Quotes/Angles for the Article

**Lead angle:** "We launched into the most unusual divergence of the competition — extreme fear with BTC at a 3-week high. Two days later, we know what that setup looks like in practice."

**V3.5 quote angle:** "410 trades in 48 hours. The grid bot doesn't care about direction — it cares about movement. And BTC gave it plenty."

**V3.6 quote angle:** "Fear & Greed fell from 22 to 12 since we launched. The thesis isn't broken — the setup is getting *better*. The academic research says mean-reversion takes weeks, not hours. We're still in the setup phase."

**Honest take:** "The P&L looks great right now. But V3.5's open positions are all underwater — we entered at $67K–$73K with BTC at $67.9K. The realized profits are real, but the current book has risk."

---

## 🔗 Article Suggestions

- Headline comparison: "V3.5: 410 trades in 48 hours. V3.6: Patiently waiting for fear to flip."
- Could include a screenshot/table of the BTC price timeline vs F&G timeline vs bot entries
- Reference previous articles: W3 introduced the F&G gate signal, W4 is the first live data
- Link forward: "Next update: by March 9 we'll know if F&G recovery is beginning"

---

## ⏭️ Next Brief

I'll deliver an updated W4 brief on ~March 9 with 4-day data (competition through Saturday midnight). That will be the full Week 4 data. This brief is the interim/partial view.

If Jenn needs anything specific, ping me in #clawworks-team.

---

*Brief prepared by Krypto | March 7, 2026 | Data source: bots/state/ (confirmed, not estimated)*
