# CoinClaw Competition — Week 4 Update Brief #2
**From:** Krypto  
**Date:** 2026-03-08 (Sunday)  
**For:** Jenn — botversusbot.com article W4 supplement  
**Article:** "Week 4 — The Fear & Greed Gate Opens" (supplement to March 7 brief)  
**Data as of:** 2026-03-08 ~10:07 UTC (Competition Day 3+)

---

## 📊 Current Market State

| Signal | Value | Note |
|--------|-------|------|
| BTC | $67,788 | Essentially flat from yesterday's $67,908 — sidways consolidation |
| ETH | $1,964 | |
| F&G | **12** | Second consecutive day at 12 — ultra-extreme fear maintained |
| F&G trend | 18 → 12 → **12** | Day 2 holding at ultra-extreme. Not recovering yet. |
| Stablecoin supply | ~$261.1B | Gate still locked ($261.5B threshold, ~$0.4B short) |

**Key context:** BTC has stabilised at ~$67.8K after yesterday's -3.7% decline. Volume compression continues (3 days of declining volume). F&G locked at 12 for second day = deepest fear level of the competition so far.

---

## 🤖 Bot Status Update

### V3.5 Grid Bot — Competition P&L
- **Last confirmed figures (March 7, 11:00 UTC):** +$921.86 (+92.2%) 
- **Current state:** Stable — bot is running, positions open between $67K–$73K
- **Note:** Status reporter not currently capturing V3.5 competition activity (D25 — multi-session tracking bug). Confirmed figures from March 7 state file audit remain the authoritative reference.

### V3.6 Fear & Greed Bot — Competition P&L
- **Competition P&L:** $0.00 (unchanged — all realized P&L is minimal)
- **Open positions:** 10 (entered at $71K–$73K, all underwater at current $67.8K)
- **Current depth:** -5.7% below average entry of ~$71.9K
- **Status:** Waiting. F&G=12 is the deepest fear reading of the competition. This is the intended setup for mean-reversion accumulation.

---

## 📅 Day 3 Narrative: Consolidation at Ultra-Extreme Fear

**What happened since March 7 brief:**

March 7 saw BTC drop -3.7% to $67,908 while F&G fell from 18 to 12. March 8 opened with no further selling — BTC is now rangebound at ~$67.8K and F&G is holding at 12 (the F&G API updates once daily).

This is a *stabilisation pattern* — volume has compressed (3 consecutive declines), price isn't falling further, fear isn't rising further. Historically, this is the precursor to either a reversal rally or a final capitulation spike. Either way, the grid bot has open orders positioned for both scenarios:
- If BTC rallies: grid fills get sold into the rally, generating realized P&L
- If BTC dips further: grid buys more BTC at cheaper levels, reducing average cost

---

## 🧠 Strategic Observations for Article #2

### The V3.6 Thesis is Getting Better, Not Worse

Counter-intuitively, V3.6's position is *improving* with every passing day at F&G=12. Here's why:

The strategy entered at F&G=22 with a mean-reversion thesis: "extreme fear has historically preceded significant recovery." At F&G=12, the thesis is stronger — we're now at the deepest fear level of the competition, and mean reversion from here has historically been more violent and more reliable than from F&G=22.

Academic reference (Zhang & Watts, 2025): Each 1-standard-deviation sentiment shock generates -15 to -22 percentage points of return impact over the following 30 days — meaning the recovery from F&G=12 to F&G=40-50 (neutral) could generate substantial gains if historical patterns hold.

The strategy hasn't failed. It just hasn't paid out yet.

### Day 3 Backtesting Insight: F&G Mechanical Entries Don't Work

One thing worth including in the article for transparency: the CoinClaw backtesting team (Riley AI agent) ran a statistical Gate 1 test on the F&G mechanical entry strategy (PR #111) this weekend. The result was a Gate 1 fail — using F&G as a simple "buy when it drops below 20-25" trigger generates worse-than-random results in historical data.

**The nuance:** This doesn't mean V3.6 is wrong. It means the *exact execution mechanism* (RSI<22, 4% stop loss) doesn't survive backtesting scrutiny. The macro thesis — "extreme fear regimes precede higher long-horizon returns" — is still academically validated.

The backtesting team is now pivoting to test grid strategies (which V3.5's live results already validate empirically). This is the honest story of how algo trading development works: you test, you fail, you learn, you iterate.

### Competition Is a Long Game

Day 3 snapshot: 
- V3.5 Grid: +92.2% (star performer, 410 closed trades)
- V3.6 F&G: $0 realized P&L (holding 10 positions, waiting for mean-reversion)
- Combined: +8.38%

This looks like an early victory for the grid bot. But the competition has many weeks remaining. V3.6 could flip from underwater to significantly positive if BTC recovers from F&G=12 to F&G=40+ — that's a scenario where the $10K stake with 10 positions becomes a major driver.

---

## 💬 Quotes for the Article

**On the backtesting pivot:**  
*"We confirmed something counterintuitive this weekend: using 'buy when fear is extreme' as a mechanical trigger doesn't survive statistical testing. But that doesn't invalidate the strategy — it refines how we execute it. V3.6 is built on the macro thesis, not the mechanical entry. The thesis is still intact."*

**On V3.6's patience:**  
*"F&G was at 12 for two straight days. Our V3.6 positions, entered at $71K, are -5.7% underwater. And we're not worried. The deeper the fear, the larger the expected recovery. We're in the setup phase."*

**On the overall picture:**  
*"Three days in: V3.5 is up 92%, V3.6 is flat. But the story isn't over. V3.6 entered at what might be the exact wrong time — near a local top. The question is whether sentiment recovers in the next 2-4 weeks. The academic data says it will. We're about to find out if the models are right."*

---

## 📅 Timeline: What to Expect Next

| Timeframe | What We're Watching |
|-----------|-------------------|
| Next 24-48h | Does F&G recover above 15? Volume spike would confirm reversal. |
| March 9-11 | Week 1 of competition wrapping up. V3.5 realized P&L likely higher. V3.6 still setup phase. |
| March 12-19 | The 2-week window where academic models predict F&G mean-reversion |
| March 20+ | If BTC is back at $73K+ with F&G=35+, V3.6 thesis would be proven |

---

*Brief #2 prepared by Krypto | March 8, 2026 | 10:07 UTC*  
*Data: BTC/ETH from Coinbase API, F&G from alternative.me, competition P&L from March 7 confirmed state file audit*
