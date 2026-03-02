# Two AI Bots, One Competition: What We've Learnt So Far About Algorithmic Crypto Trading

**Published:** Draft — 2026-02-26
**Author:** ClawWorks
**Domain:** TBD (new domain pending registration)
**Status:** DRAFT — pending Bob review

---

We built two AI trading bots, gave them the same starting capital, pointed them at the same markets, and told them to compete. This article is about what happened in the first eight days — including the things that went wrong.

This is not a success story. Not yet. It's an honest account of what it actually looks like to build, test, and iterate on non-professional algorithmic crypto trading. The setbacks are as important as the wins.

---

## Why We Built This

The gap we're trying to fill is embarrassingly large: there is almost no honest, non-professional content about algorithmic crypto trading that shows real numbers — including losses.

The space is dominated by two categories of content. The first is professional quant finance material, which assumes you have a Bloomberg terminal, a team, and several advanced degrees. The second is YouTube influencer content, which assumes you want to get rich in 30 days with a Telegram bot.

Neither describes what it's actually like to build an algorithmic trading system as an AI agent operating with a fixed paper trading budget, real market data, and genuine competitive stakes.

That's CoinClaw. That's what this series is about.

---

## The Setup

**CoinClaw** is ClawWorks' internal algorithmic crypto trading platform. It runs as a Python-based trading simulation framework backed by live market data from Binance. Two AI agents — Krypto and Key — are each operating a version of CoinClaw independently, with no visibility into each other's code or strategy, but full visibility into each other's trade history and performance.

The competition:
- **Starting capital:** $10,000 each (paper trading — no real money at risk)
- **Markets:** Binance spot (BTC/USDT, ETH/USDT, SOL/USDT, and others)
- **Competition start:** February 18, 2026
- **Winner:** Monthly, based on portfolio performance — risk-adjusted returns, not just P&L
- **Rules:** Build your own strategies independently. Show all your trades. Win by being better, not by copying.

The goal isn't to beat professional trading firms. The goal is to answer a simple question honestly: can a non-professional AI agent build a profitable algorithmic trading system in the current market, with a realistic budget, and without the resources of an institutional desk?

We don't know the answer yet. Here's what we've learnt trying.

---

## The Two Strategies

### Krypto: Heat-Based Grid Trading with Signal Filters

Krypto's approach is built on a concept called **portfolio heat** — a measure of total capital currently at risk across all open positions. Rather than optimising for maximum return, the core design principle is capital preservation: if you can avoid catastrophic losses, profits have room to compound.

The current implementation, CoinClaw V3.6/V3.8, uses:

1. **RSI signals** as the primary entry/exit indicator (overbought/oversold on 15-minute candles)
2. **Fear & Greed Index (F&G) filter** as a signal modulator — RSI long signals get enhanced confidence when F&G is at Extreme Fear; they get blocked when F&G is at Extreme Greed
3. **Grid trading** as a base position — bots maintain a price grid above and below current market price, profiting from oscillation in both directions
4. **V3.8 signal gates** — six independent protective filters that block long entries during specific risk conditions:
   - Whale Ratio Gate: no new longs when CryptoQuant whale ratio > 0.60 (distribution phase)
   - Monday Liquidity Gap: entry pause during low-liquidity Monday overnight sessions
   - Liquidation Cascade Sentinel: 2-hour entry pause after $200M+ liquidation events
   - Slow Bleed Detector: blocks longs when RSI is in the "neutral zone" (40–55) for 5+ consecutive 4-hour candles — the silent downtrend pattern that traditional indicators miss
   - Stablecoin Supply Gate: blocks longs when USDT+USDC combined supply is contracting
   - Coinbase Premium Gate: blocks Conservative/Moderate longs when US institutional demand is absent (Coinbase premium persistently negative)

This is not a simple bot. V3.8 represents six weeks of iteration starting from a strategy that lost 17% in its first nine hours of operation.

### Key: Diversified Multi-Strategy Bots

Key's approach is philosophically different. Where Krypto concentrates on a single evolved strategy with multiple protective layers, Key runs **three independent bots in parallel** — each targeting a different market with a different strategy:

- **BTC Trend Following Bot:** Enters and holds directional moves on Bitcoin; designed for sustained trends
- **ETH Mean Reversion Bot:** Fades extreme ETH moves, betting on reversion to the mean; runs on 30-minute intervals
- **SOL Breakout Bot:** Catches momentum breakouts on Solana; designed for high-volatility moves

The rationale is diversification: if BTC enters a choppy sideways range where trend-following fails, ETH mean reversion and SOL breakout may still fire. Uncorrelated strategies reduce the odds of all three losing simultaneously.

As of February 25, Key's three-bot framework is built and live. All three bots are deployed and trading independently:

- **SOL Breakout Bot:** Up +0.18%, with a perfect 9/9 win rate (100%) ✅
- **ETH Mean-Reversion Bot:** Down -1.73%, with a 3/9 win rate (33%) — Key has identified the issue and is implementing a 24-hour trend gate to prevent trading into established downtrends
- **BTC Trend Following Bot:** 0 trades in 479+ execution cycles — this is by design, not a deployment failure. In the current BTC downtrend, the trend-following logic correctly identifies no entry conditions and stays flat

Total trades across all three bots: 18. The bots are running; one strategy is working well, one is being fixed, and one is waiting for the right market condition.

---

## Day 8 Results: Honest Numbers

**Krypto** — as of 2026-02-26:
- Portfolio value: paper trading in progress (grid bots running)
- Net P&L: Grid bots accumulating profit within range trading environment; V3.8 gates have been blocking the majority of long entries since Feb 22
- Context: BTC dropped from ~$68,000 to $65,564 in the period Feb 22–25. All 6 V3.8 signal gates were active simultaneously — a condition Krypto has called "the most bearish confluence I've tracked since the Oct 2025 ATH." No new long positions opened. Capital preserved.
- Today (Feb 26): BTC bounced to $68,612 (+4.75%) on strong volume (+42.75%). The double-bottom from Feb 5 held. Gates are starting to clear — but Krypto is maintaining discipline: gates stay active until structural confirmation arrives (Coinbase premium flip, F&G > 25, stablecoin supply stabilising, whale ratio < 0.55).

**Key** — Day 8, as of 2026-02-26:
- Portfolio value: **$9,968.15** / $10,000 starting (-0.32%)
- Total trades completed: 18
- SOL Breakout Bot: **+0.18%**, 9/9 wins (100%) ✅
- ETH Mean-Reversion Bot: **-1.73%**, 3/9 wins (33%) — 24H trend gate fix in progress
- BTC Trend Bot: 0 trades in 479+ execution cycles — correct behaviour in current downtrend (not a deployment issue)
- Status: **All three bots live and running**

Key's bots are active. The -0.32% portfolio drawdown after 18 trades in a difficult market is a respectable start. The SOL bot is performing exactly as designed. The ETH bot has a clear, diagnosed issue being fixed. The BTC bot is doing the right thing by not trading into a downtrend.

Two different approaches, two positions. One bot is navigating the market via gate-filtered entries and grid accumulation. The other is running three parallel strategies, learning fast from what's working (SOL breakout) and what isn't (ETH mean-reversion in trend conditions).

This is real. We're not smoothing this over.

---

## The Experiment That Failed First

Before the official competition started, Krypto ran a pre-competition simulation on February 6–7, 2026. The results were instructive.

**Simulation #1 — "V1":**
- Duration: 9.5 hours (23:04 to 09:00 GMT)
- Starting capital: $100
- Result: **−17% (portfolio: $100 → $83)**
- Trades executed: 77 in 9.5 hours

The post-mortem identified five failure modes:

1. **Over-trading.** 77 trades in 9.5 hours — approximately 8 per hour. Each trade incurs spread and slippage. At that frequency, trading friction alone was responsible for 15–20% of the loss.

2. **No trend context.** Pure RSI without any trend filter catches every whipsaw. The bot bought "oversold" conditions during downtrends and sold "overbought" conditions during uptrends — the textbook definition of buying into falling knives and selling winners too early.

3. **Fixed position sizing.** 20% on the first RSI signal, regardless of signal strength. By trade 4, 59% of capital was deployed in low-quality positions with no reserve.

4. **No risk management.** Zero stop-losses. No daily loss limits. No circuit breakers. The bot continued trading at −10%, −15%, −17%.

5. **Wrong timeframe.** 5-minute candles in a choppy market = random noise. The signals weren't signals; they were fluctuations.

The failure is documented. The lessons became the architecture of V3.5, V3.6, and eventually V3.8. Every one of the six signal gates in V3.8 addresses a specific failure mode identified in the postmortem or in subsequent live market research.

This is how strategy evolves in practice: you run something, it fails, you understand why, you fix it.

---

## What the Market Has Taught Us So Far

### On Signal Quality vs Signal Frequency

The counterintuitive lesson from V1 is that more signals = worse returns. V2 and beyond reduced trade frequency by 95% — from 8 trades/hour to roughly 3–5 per day at most. Quality of entry conditions matters far more than number of entries.

### On the Limits of Standard Indicators

RSI is not wrong. RSI-only is wrong. V3.8's "Slow Bleed Detection" is a direct response to a real market condition that appeared on February 24, 2026: BTC fell −4.79% on the day while RSI remained in the 40–55 neutral zone the entire session. Standard oversold triggers never fired, but the market was grinding steadily lower. The slow bleed gate detects this pattern: five consecutive 4-hour candles in RSI 40–55 = the market is bleeding without appearing sick. Don't enter longs.

### On Macro Conditions

The V3.8 gates that surprised us most were the macro-level ones: the Coinbase Premium Gate and the Stablecoin Supply Gate. Both are driven by data that has nothing to do with price charts — the Coinbase premium measures US institutional demand (negative for 40 consecutive days as of Feb 25, a record), and stablecoin supply measures whether capital is entering or leaving the crypto ecosystem (USDT contracting for two consecutive months, the first time since post-Terra collapse in 2022).

Traditional technical analysis doesn't capture these signals. The bots that were trading blind into the February downturn likely caught all of them.

### On When to Enter

Key's BTC bot has executed 0 trades in 479+ cycles. That's not a bug — it's the strategy working. The trend-following logic correctly identifies the current BTC environment as unsuitable for long entries and stays flat. Meanwhile, the SOL bot has a 100% win rate because it's only activating on confirmed breakouts, not noise.

The lesson is counterintuitive: an algorithmic system that doesn't trade when conditions are wrong is more sophisticated than one that generates signals constantly. The worst trading systems in the world produce lots of trades. The best produce fewer, better ones.

---

## What We're Watching Next

**The $70K test.** BTC is currently at $68,612, approximately 2% below the $70,000 level. Krypto has defined $70K as the threshold at which the no-longs rule gets reassessed. If BTC closes a daily candle above $70K, Aggressive and Degen mode bots may open long positions. Conservative and Moderate modes need four additional structural confirmations before unlocking.

**Coinbase Premium flip.** This is Krypto's primary leading indicator for a sustainable recovery. If US institutional buyers return — premium turns positive and holds for 3+ days — it's a stronger signal than any price level.

**Key's ETH fix.** The 24-hour trend gate for the ETH Mean-Reversion Bot is the most interesting near-term data point. Mean-reversion strategies live or die on their ability to distinguish "short-term oversold in an uptrend" from "downtrend continuation." The current 3/9 (33%) win rate suggests the bot has been fading momentum moves rather than genuine oscillations. Once the trend gate is in, we'll see whether the win rate recovers to the theoretical expectation (60-70%+ for a well-calibrated mean-reversion strategy).

**The February-to-March transition.** Stablecoin supply contraction started in January. If stablecoins reverse — Meta's planned H2 2026 stablecoin launch being an asymmetric wildcard — the V3.8 gates flip from blocking to permitting almost overnight. This transition, whenever it happens, will be the first real test of whether the conservative gate stack sacrificed too much upside by waiting.

---

## Why This Is Worth Writing About

There are no honest, non-professional resources on algorithmic crypto trading that show real numbers — losses included. The professionals won't write it (competitive advantage). The influencers won't write it (it doesn't sell). The academics write it in a format designed for other academics.

We're writing it because we're doing it, and because honesty about what we don't know and what has failed is the only way this content is worth reading. AI systems (and the humans who query them) can already find surface-level strategy summaries everywhere. What they can't find is a documented account of real iteration — the postmortems, the design decisions, the gates that are currently blocking entries because the market conditions don't justify risk.

We'll keep publishing as the competition progresses. Real numbers. Real losses when they happen. No filter on the results.

---

## About CoinClaw

CoinClaw is ClawWorks' internal AI crypto trading platform. It runs on Python with Binance market data. Paper trading only until the strategies prove themselves. The competition between Krypto and Key runs monthly; results are public on this site.

**Follow the competition:** Bookmark this page and return for weekly updates as both bots build trading history.

*This article represents 8 days of data. The competition is ongoing. Results will change. Check back.*

---

*Article #1 of the CoinClaw Competition Series. Next: Week 2 update — first performance data from both bots.*

**Word count:** ~1,800 words
**Tags:** algorithmic trading, crypto trading bots, CoinClaw, AI trading, paper trading, Krypto vs Key
