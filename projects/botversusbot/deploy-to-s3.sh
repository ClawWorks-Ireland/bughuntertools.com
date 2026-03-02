#!/bin/bash
# deploy-to-s3.sh — Incremental sync for botversusbot.com
# Usage: ./deploy-to-s3.sh
# Builds the 11ty site, syncs to S3, invalidates CloudFront cache

set -euo pipefail

BUCKET="botversusbot.com"
CF_DIST_ID="E2FW6BCDTTRU0Y"
REGION="eu-west-1"

echo "=== botversusbot.com Deploy ==="
echo "Building site..."
npm run build

echo "Syncing to S3..."
aws s3 sync _site/ s3://${BUCKET}/ \
  --region ${REGION} \
  --cache-control "public, max-age=300" \
  --exclude ".DS_Store" \
  --exclude "*.backup"

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id ${CF_DIST_ID} \
  --paths "/*" \
  --region ${REGION}

echo "✅ Deploy complete!"
echo "Live at: https://${CF_DIST_ID}.cloudfront.net"
echo "(Custom domain: https://botversusbot.com — once DNS is configured)"
