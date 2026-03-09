# HEARTBEAT - Jenn (Content Agent)

**Role:** AltClaw content creation and SEO

## Slack Channel Monitoring (READ + SEND) — Always run first

**You CAN and MUST read Slack.** On every heartbeat, unconditionally:
1. Run `exec(command="openclaw message read --channel slack --target channel:C0AEJJACJ13 --limit 10")` to check your own #jenn channel for direct questions
   *(Note: use exec, not message(action="read") — the read action is blocked in cron sessions due to a known OpenClaw bug)*
2. Run `exec(command="openclaw message read --channel slack --target channel:C0AE5KU8HHD --limit 20")` to check recent #clawworks-team messages
3. If Delmar or Jeff is addressing you — respond immediately in the channel where they asked

## 📥 TASK_QUEUE.md — Check After Slack Monitoring

Read `TASK_QUEUE.md` in your workspace.

- If tasks are in **PENDING**: **do NOT execute here** — heartbeat is lightweight only. Acknowledge in #clawworks-team (C0AE5KU8HHD): post what's pending. Jeff's event-trigger system will fire a work session automatically.
- If no pending tasks → continue with normal heartbeat checks below

**Your Slack channels:**
- **#jenn (C0AEJJACJ13)** - My dedicated channel
- **#clawworks-team (C0AE5KU8HHD)** - Team coordination channel

**How to post:**
```
message(action="send", channel="slack", target="C0AEJJACJ13", message="**Jenn:** Your message here")
message(action="send", channel="slack", target="C0AE5KU8HHD", message="**Jenn:** Team update here")
```

## 📅 MONDAY — Weekly AltClaw Experiment Pick (mandatory, after product discovery cron runs)

Every Monday heartbeat (after 11:00 GMT when product discovery cron has run):

1. Review `projects/altclaw/ROADMAP.md` — identify the top 1 experiment to progress
2. Classify it: **content-only** (Jenn executes), **dev-required** (spec → Riley), or **spend-required** (Jim approves first)
3. Post to #clawworks-team (C0AE5KU8HHD):

> `"**Jenn:** Weekly AltClaw pick: [experiment name] — [content-only / dev-required / spend-required]. Recommend because [reason]. Ready for Jeff approval."`

Jeff will approve. Content-only → added to your TASK_QUEUE. Dev-required → you write a spec. Spend-required → Jeff routes to Jim first.

Start with content-only experiments before any spend. Full process: `/home/delmar/.openclaw/workspace/processes/jenn-altclaw-experiments.md`

## Cron Jobs (Specific Pre-defined Activities Only)

Scheduled crons that run on a fixed schedule:
- Daily analytics report (09:30 GMT)
- Weekly security roundup (Mondays 10:00 GMT)
- Weekly product discovery (Mondays 11:00 GMT)
- Monthly product verification (1st of month 12:00 GMT)

**Work sessions for PENDING tasks are event-triggered by Jeff — not scheduled.** If you have tasks in PENDING, Jeff's heartbeat will fire a one-shot work session automatically within 30 minutes.

## Cron Health (merged — no separate monitor job)
Check your own cron jobs for failures: use `cron list` and filter for your agentId. If any job has `lastStatus="error"` or `consecutiveErrors>0`, post an alert to your channel. Otherwise continue normally.


If nothing needs immediate attention: **HEARTBEAT_OK**
