/**
 * toolRedirects.js — single source of truth for where each retired
 * /tools/<slug>/ page now points.
 *
 * TASK-921: the 50 individual templated tool pages were retired in favor of
 * 3 category comparison articles (+ existing per-tool demo articles where
 * one already existed). This map is consumed by:
 *   - astro.config.mjs (registers the actual 301 redirects)
 *   - src/pages/tools/index.astro (so the tools index links to the *new*
 *     destination instead of a now-nonexistent /tools/<slug>/ page)
 *   - src/pages/security-categories/[slug].astro (same reason)
 *
 * Destinations, by rule:
 *   1. If a dedicated SecurityClaw demo article already existed for this
 *      tool (nuclei, trufflehog, gobuster, nikto, hashcat, sqlmap), send
 *      there — it's the deepest, most specific real content for that tool.
 *   2. If the tool is discussed by name in the recon comparison article
 *      even though its tools.json `category` isn't literally "recon"
 *      (currently just shodan), send to the recon comparison page.
 *   3. Else, if tools.json `category` maps to one of the 3 new category
 *      comparison pages (recon, web-testing, api-security), send there.
 *   4. Else (network-recon beyond tls-crypto-auditor, exploitation
 *      remainder, mobile, cloud, platform, enumeration remainder) — Peng
 *      confirmed via TASK-917 these are genuinely un-run or unimplemented
 *      skills with no dedicated write-up yet. Send to /securityclaw/,
 *      which documents every one of these skills by name, rather than a
 *      dead link or an unrelated category page.
 */

const DEMO_ARTICLE_BY_SLUG = {
  nuclei: '/articles/securityclaw-nuclei-misconfiguration-scanner-demo-2026/',
  trufflehog: '/articles/securityclaw-trufflehog-v3-live-secret-verification-demo-2026/',
  gobuster: '/articles/securityclaw-gobuster-directory-enumeration-demo-2026/',
  nikto: '/articles/securityclaw-nikto-web-misconfiguration-demo-2026/',
  hashcat: '/articles/securityclaw-hashcat-password-cracking-demo-2026/',
  sqlmap: '/articles/securityclaw-sqlmap-sql-injection-demo-2026/',
};

const RECON_ARTICLE = '/articles/recon-osint-tooling-securityclaw-data-2026/';
const RECON_BY_NAME = new Set(['shodan']);

const CATEGORY_ARTICLE = {
  recon: RECON_ARTICLE,
  'web-testing': '/articles/web-app-testing-tools-securityclaw-data-2026/',
  'api-security': '/articles/api-security-tools-securityclaw-data-2026/',
};

const FALLBACK_DESTINATION = '/securityclaw/';

export function getToolRedirectDestination(tool) {
  if (DEMO_ARTICLE_BY_SLUG[tool.slug]) return DEMO_ARTICLE_BY_SLUG[tool.slug];
  if (RECON_BY_NAME.has(tool.slug)) return RECON_ARTICLE;
  if (CATEGORY_ARTICLE[tool.category]) return CATEGORY_ARTICLE[tool.category];
  return FALLBACK_DESTINATION;
}

export function buildToolRedirectMap(toolsData) {
  const map = {};
  for (const tool of toolsData.tools) {
    map[tool.slug] = getToolRedirectDestination(tool);
  }
  return map;
}
