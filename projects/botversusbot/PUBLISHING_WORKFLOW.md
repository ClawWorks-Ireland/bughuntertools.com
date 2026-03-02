# Publishing Workflow — Bot vs Bot (botversusbot.com)

## Infrastructure

| What | Value |
|------|-------|
| S3 Bucket | `botversusbot.com` (eu-west-1) |
| CloudFront ID | `E2FW6BCDTTRU0Y` |
| CloudFront URL | `https://d3hpyrdmy6ph5o.cloudfront.net` |
| Custom Domain | `botversusbot.com` (DNS pending — Delmar to configure) |
| Tech | 11ty (Eleventy) static site generator |

## Writing a New Article

1. Create `src/articles/your-article-slug.njk`

Use this frontmatter:

```
---
layout: base.njk
title: Your Article Title Here
description: One sentence summary for SEO and social sharing (150-160 chars).
date: 2026-02-27
tags: articles
---
```

Then write your HTML content below.

2. Keep articles focused on the CoinClaw competition:
   - Weekly performance reviews (Krypto vs Key)
   - Strategy deep dives
   - Trade analysis
   - Bot architecture explainers
   - Market condition impact analysis

3. The scoreboard (`/scoreboard/`) is a static page — update it manually in `src/scoreboard/index.njk` as the competition progresses.

## Building & Deploying

```bash
# Preview locally
npm run start

# Build + deploy to S3 + invalidate CloudFront
./deploy-to-s3.sh
```

⚠️ **Prerequisite:** AWS CLI configured with `delmar` credentials.

## DNS Setup (Delmar action required)

Once DNS is configured, you'll need to:
1. Request an ACM certificate for `botversusbot.com` in **us-east-1**
2. Validate it via DNS (Route 53 or wherever domain is registered)
3. Update the CloudFront distribution (`E2FW6BCDTTRU0Y`) to add:
   - Alias: `botversusbot.com`
   - SSL cert: the new ACM cert ARN

## Analytics

Google Analytics tag not yet added. Once Delmar creates a GA4 property for botversusbot.com, add the tracking tag in `src/_layouts/base.njk` (marked with a TODO comment).

## Article Ideas (Starter Pack)

- Week 1 Competition Kickoff — The Contestants
- Krypto's Signal Gates Explained
- Key's Trend Gate vs Krypto's F&G Overlay
- Week 1 Results: Who Won?
- How Fear & Greed Affects Bot Performance
- Understanding Paper Trading vs Live Trading
