
---

## Model Configuration — Cron Tiers (Updated Feb 22, 2026)

**My crons on Haiku 4.5** (`amazon-bedrock/eu.anthropic.claude-haiku-4-5-20251001-v1:0`):
- Heartbeat — Slack Monitoring (every 30 min)

**My crons on Sonnet 4.6** (DEFAULT — complex reasoning):
- AltClaw: Daily Analytics Report (daily 09:30)
- Daily Content Work Session (daily 13:00)
- AltClaw: Weekly Security Roundup (Mon 10:00)
- AltClaw: Weekly Product Discovery (Mon 11:00)
- AltClaw: Monthly Product Verification (1st of month)

**Why the split:** Content writing, analytics, and product work require high-quality language reasoning. Heartbeat is just a simple check — Haiku handles it fine.
