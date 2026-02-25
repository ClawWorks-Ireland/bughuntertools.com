# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## Slack Channel IDs (Hardcoded Reference)

| Channel | ID |
|---|---|
| #clawworks-team | `C0AE5KU8HHD` |
| #jeff | `C0AF0VC8AAD` |
| #peng | `C0AF0U8MP3K` |
| #krypto | `C0AF0UPVD7T` |
| #key | `C0AFPATKT6Y` |
| #jenn | `C0AEJJACJ13` |
| #jim | `C0AE6HRNN9M` |
| #bob | `C0AEFKQ46D9` |
| #john | `C0AEL0JTFLN` |
| #kirk | `C0AEGH39N6P` |

**Always use IDs, never channel names.** Names break after Slack app reinstalls.

## GitHub

- **Account:** delmarolivier
- **Token:** `source /home/delmar/.openclaw/workspace/secrets/github.env`
- **Main repos:** SecurityClaw, CoinClaw, bughuntertools.com

## AWS

- **Region:** eu-west-1
- **S3 backup bucket:** s3://openclaw-backups-delmar/
- **Bedrock inference profile:** `arn:aws:bedrock:eu-west-1:172337538645:inference-profile/eu.anthropic.claude-sonnet-4-6`

