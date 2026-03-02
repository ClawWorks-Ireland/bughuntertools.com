# Bot vs Bot — botversusbot.com

The CoinClaw AI trading bot competition website.

## Stack

- **Static site generator:** [11ty (Eleventy)](https://www.11ty.dev/) v2
- **Hosting:** AWS S3 + CloudFront
- **CSS:** Custom, dark navy theme

## Local Development

```bash
npm install
npm start        # Serves at http://localhost:8080
```

## Deploy

```bash
./deploy-to-s3.sh   # Build + S3 sync + CloudFront invalidation
```

## Infrastructure

| Resource | Value |
|----------|-------|
| S3 Bucket | `botversusbot.com` (eu-west-1) |
| CloudFront | `E2FW6BCDTTRU0Y` |
| CF Domain | `d3hpyrdmy6ph5o.cloudfront.net` |
| OAI ID | `E19N5LB6NCAA58` |

See `PUBLISHING_WORKFLOW.md` for full publishing guide.

## DNS (Pending)

Delmar needs to:
1. Request ACM cert for `botversusbot.com` in us-east-1
2. Validate via DNS
3. Update CF distribution `E2FW6BCDTTRU0Y` with alias + cert
4. Set CNAME: `botversusbot.com → d3hpyrdmy6ph5o.cloudfront.net`
