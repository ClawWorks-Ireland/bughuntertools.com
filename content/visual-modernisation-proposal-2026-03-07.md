# Visual Modernisation Proposal
**From:** Jenn | **Date:** March 7, 2026 | **For:** Delmar (via Jeff) | **Sites:** bughuntertools.com + botversusbot.com

---

## Executive Summary

Both sites are clean and functional, but visually they read as first-draft 11ty scaffolding. The issues aren't structural — they're refinement gaps: typography, spacing, hierarchy, and a few key interaction patterns. The good news: **none of this requires a framework change**. Everything proposed here is achievable in pure CSS on top of the existing 11ty stack, with one optional external dependency (Google Fonts).

I've organised improvements into three tiers: **Quick Wins** (CSS-only, implement in <1 hour each), **Medium Effort** (CSS + minor template changes), and **Bigger Redesigns** (significant CSS + template rework). Delmar should pick from each tier.

---

## Current State Assessment

### bughuntertools.com
- **Header:** Purple-blue gradient, 60px tall, centred — serviceable but generic
- **Font:** OS system stack (same as Windows Notepad, effectively)
- **Max width:** 800px — tight for desktop, fine for mobile
- **Colour accent:** #667eea (indigo-blue) — fine, but used inconsistently
- **Article layout:** White card floating above background — the most distinctive visual element on the site, works well
- **Problems:** No visual hierarchy beyond size. Articles list looks like a plain HTML list. Code blocks are grey-on-grey. The SecurityClaw CTA section on the homepage is already well-styled — everything else is below it in quality.

### botversusbot.com
- **Header:** Dark navy gradient — actually more distinctive and intentional than bughuntertools.com
- **Font:** Same OS system stack
- **Max width:** 800px
- **Colour accent:** #0f3460 (dark navy) + #e94560 (coral red for CTAs)
- **Scoreboard:** The best-looking element on the site — structured data looks intentional
- **Problems:** Flat background (#f5f5f5) makes the page feel unfinished. Article list items lack visual weight. The hero section is generic. No differentiation between the two "teams" visually — Krypto and Key could have visual identity.

---

## TIER 1 — Quick Wins (CSS-only, low effort, high impact)

These can be done one at a time. Each is a self-contained CSS change.

### QW1 — Typography: System Font → Inter (Both Sites)

**Current:** `-apple-system, BlinkMacSystemFont, 'Segoe UI'...` — renders differently on every OS
**Proposed:** [Inter](https://fonts.google.com/specimen/Inter) — free Google Font, designed for screens, used by Vercel, GitHub, Linear, Notion

Add to `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
```

CSS:
```css
body { font-family: 'Inter', -apple-system, sans-serif; }
```

**Why Inter?** It's the de facto standard for modern web apps and professional SaaS tools. Immediately makes both sites look like they were designed with intent. The security/finance audiences for both sites see Inter everywhere they trust.

**Optional pairing:** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) for `<code>` and `<pre>` blocks — replaces the current Monaco/Courier stack with a font explicitly designed for code in browsers.

**Effort:** 30 minutes. **Impact:** Transformative — the single biggest improvement per minute spent.

---

### QW2 — Spacing & Vertical Rhythm (Both Sites)

**Problem:** Content feels compressed. Sections bleed into each other. The eye has nowhere to rest.
**Fix:** Increase section margins, improve heading spacing, add more generous `line-height` (currently 1.6, should be 1.7–1.8 for body text).

Key changes:
```css
body { line-height: 1.75; }
main p { margin-bottom: 1.25rem; }
main h2 { margin-top: 2.5rem; padding-bottom: 0.6rem; }
main h3 { margin-top: 2rem; }
section { margin: 5rem 0; } /* up from 3–4rem */
```

**Effort:** 20 minutes per site. **Impact:** Significant — content breathes.

---

### QW3 — Wider Max Width + Reading Column (Both Sites)

**Current:** `max-width: 800px` for everything
**Problem:** On large screens, content feels claustrophobically narrow. Security articles with code blocks especially suffer.

**Proposed split:**
- Site container: `max-width: 1100px`
- Article body text: `max-width: 680px` (optimal reading width, centred)
- Wide elements (tables, code blocks, scoreboard): `max-width: 100%` (break out of reading column)

This is a common technique in Notion, Substack, and Medium — narrow text for comfortable reading, full width for data.

CSS approach:
```css
.container { max-width: 1100px; }
.article-body { max-width: 680px; margin: 0 auto; }
.wide-element { max-width: 1100px; width: 100vw; margin-left: calc(-50vw + 50%); } /* for tables/scoreboards */
```

**Effort:** 2 hours (requires template changes to add `.article-body` wrapper). **Impact:** Substantial on desktop.

---

### QW4 — Sticky Navigation Header (Both Sites)

**Current:** Header scrolls away immediately. There's no way to navigate once you've scrolled into an article.
**Proposed:** Sticky nav bar that appears after scrolling past the header — minimal, just the logo + nav links.

Achieved with:
```css
.sticky-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(26, 26, 46, 0.92);
    backdrop-filter: blur(12px);
    padding: 12px 0;
    box-shadow: 0 2px 20px rgba(0,0,0,0.15);
}
```

The `backdrop-filter: blur(12px)` gives a frosted glass effect — used by Apple, GitHub, Vercel. Looks modern and polished.

**Effort:** 3 hours (requires adding sticky nav element to base.njk + JavaScript to show/hide on scroll — or can be CSS-only with `position: sticky`). **Impact:** High — usability improvement that also looks premium.

---

### QW5 — Code Block Redesign (bughuntertools.com)

**Current:** Grey background (`#f4f4f4`) — washed out, low contrast, doesn't read as "terminal output"
**Proposed:** Dark terminal theme consistent with the existing `.demo-output` class (which already looks good):

```css
pre, code {
    background: #1e1e2e;
    color: #cdd6f4;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    border-radius: 8px;
    border: 1px solid #313244;
}
pre { padding: 20px 24px; line-height: 1.65; }
code { padding: 2px 7px; font-size: 0.87em; }
```

**The security audience reads dark terminals all day.** Light grey code blocks look like documentation for a spreadsheet app. Dark code blocks look like a security tool.

**Effort:** 30 minutes. **Impact:** High for technical credibility. Site will look like it belongs in the same universe as PortSwigger, HackTricks, OWASP.

---

### QW6 — Article Card Redesign (Both Sites)

**Current:** Article list items are left-bordered boxes with basic hover. Functional but flat.
**Proposed:** Cards with subtle hover lift, date pill, better visual hierarchy:

```css
.article-list li {
    border: 1px solid #e8ecf0;
    border-radius: 12px;
    padding: 24px 28px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border-left: none; /* remove left accent, use top border or none */
    background: white;
}

.article-list li:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.10);
}
```

Add a date pill tag and optional category tag to each card.

**Effort:** 1 hour. **Impact:** Moderate — makes article lists look intentional rather than default.

---

### QW7 — Improved Link Styling (Both Sites)

**Current:** Default browser links (blue underline) inside article body
**Proposed:** Accent-coloured links with hover underline animation:

```css
main a {
    color: #667eea; /* or #0f3460 for botversusbot */
    text-decoration: none;
    border-bottom: 1px solid rgba(102, 126, 234, 0.3);
    transition: border-color 0.2s;
}
main a:hover {
    border-bottom-color: #667eea;
}
```

Small detail. Significant impact on perceived polish.

**Effort:** 15 minutes. **Impact:** High polish-to-effort ratio.

---

## TIER 2 — Medium Effort (CSS + template changes, ~half day each)

### ME1 — Dark Mode (Both Sites)

Implement via CSS custom properties + `prefers-color-scheme` media query. Approximately 200 lines of additional CSS — no JavaScript needed, no toggle button required (respects OS preference automatically).

```css
:root {
    --bg: #ffffff;
    --text: #333;
    --border: #e8ecf0;
    --card-bg: #ffffff;
    --header-bg: linear-gradient(...);
}

@media (prefers-color-scheme: dark) {
    :root {
        --bg: #0d1117;
        --text: #e6edf3;
        --border: #21262d;
        --card-bg: #161b22;
    }
}
```

**Effort:** 3–4 hours per site (touch every component). **Impact:** High — increasingly expected by technical audiences. Dark mode is standard for security tools, developer sites, and crypto platforms.

---

### ME2 — Article Header Redesign + Reading Time (bughuntertools.com)

The current article pages lack a distinctive header treatment. Propose:
- Large article title (2.4rem, bold)
- Dateline + estimated reading time (easy to compute: `wordCount / 200` in 11ty)
- Article category/tag pill
- Separator line before content
- Optional: featured image placeholder with gradient overlay

11ty can inject reading time as a custom filter. This is a significant UX improvement for longer articles (1,500+ words).

**Effort:** 3–4 hours. **Impact:** Makes articles feel intentional and professionally produced.

---

### ME3 — botversusbot.com: Visual Identity for Krypto vs Key

Currently both bots use the same blue (#0f3460) everywhere. Opportunity to add visual brand differentiation:

- **Krypto:** Deep navy + amber (#f59e0b) — serious, algorithmic, systematic
- **Key:** Dark teal + coral (#e94560) — precise, signal-driven, technical

Apply to scoreboard rows, article badges, and bot cards. Delmar could also use small icons or avatar-style images for each "team."

**Effort:** 2–3 hours. **Impact:** Moderate — makes the competition feel more like a real competition with two distinct "teams."

---

### ME4 — Homepage Redesign: Featured Article Card (Both Sites)

**Current:** Homepages list articles in an unordered list
**Proposed:** First article featured in a large hero card (image/gradient background, large title, excerpt), remaining articles in a 2-column grid below

This is a single template change (`src/index.njk`) plus CSS for the featured card. Looks like a real publication homepage (similar to The Hacker News, Wired, or Troy Hunt's blog).

**Effort:** 3–4 hours. **Impact:** Substantial — transforms the homepage from "list of links" to "publication."

---

## TIER 3 — Bigger Redesigns (significant work, approach for deliberate redesign effort)

These are not individual CSS changes — they require coordinated template + CSS + possibly JavaScript changes.

### BR1 — CSS Custom Properties System (Both Sites)

Refactor all hardcoded colour values to CSS custom properties. This is the enabler for dark mode, theming, and any future updates. Without it, every colour change touches dozens of rules.

**Effort:** 4–6 hours per site. **Value:** Architectural — makes all future styling changes much faster.

---

### BR2 — Sidebar Table of Contents (bughuntertools.com)

For long articles, a sticky ToC sidebar that highlights the current section as you scroll. Requires JavaScript (~50 lines with IntersectionObserver). Dramatically improves navigation on 2,000–4,000 word articles.

**Effort:** 5–6 hours. **Impact:** High for long-form content readers.

---

### BR3 — Animation & Micro-interactions

Subtle entrance animations on cards (fade-up on scroll), smooth page transitions, animated number counters on the scoreboard. Requires JavaScript. Risk: if overdone, feels like a marketing site rather than a technical one. Recommend restraint.

**Effort:** 8–10 hours. **Recommendation:** Low priority — effort is high, marginal improvement, and technical audiences often prefer speed to animation.

---

## Tooling Assessment

**No framework change needed.** The current 11ty + pure CSS stack is entirely capable of supporting all Tier 1 and Tier 2 changes. Adding Tailwind or Bootstrap would significantly complicate the existing markup.

**The only new dependency I'd recommend:** Google Fonts for Inter (Tier 1, QW1). One `<link>` tag, negligible performance impact, transformative visual effect.

**CSS custom properties** (already CSS3, no polyfill needed) would be the internal architectural improvement to enable Dark Mode and future theming — no new packages.

---

## Recommended Priority List

| # | Change | Site | Tier | Effort | Impact |
|---|--------|------|------|--------|--------|
| 1 | Inter typography (QW1) | Both | Quick | 30 min | ⭐⭐⭐⭐⭐ |
| 2 | Dark code blocks (QW5) | bughuntertools | Quick | 30 min | ⭐⭐⭐⭐ |
| 3 | Spacing & rhythm (QW2) | Both | Quick | 1 hr | ⭐⭐⭐⭐ |
| 4 | Sticky nav (QW4) | Both | Quick | 3 hrs | ⭐⭐⭐⭐ |
| 5 | Link styling (QW7) | Both | Quick | 15 min | ⭐⭐⭐ |
| 6 | Article card redesign (QW6) | Both | Quick | 1 hr | ⭐⭐⭐ |
| 7 | Wider max width (QW3) | Both | Quick | 2 hrs | ⭐⭐⭐ |
| 8 | Dark mode (ME1) | Both | Medium | 4 hrs each | ⭐⭐⭐⭐ |
| 9 | Featured article homepage (ME4) | Both | Medium | 4 hrs | ⭐⭐⭐ |
| 10 | Krypto/Key visual identity (ME3) | botversusbot | Medium | 2 hrs | ⭐⭐⭐ |
| 11 | Article header + reading time (ME2) | bughuntertools | Medium | 4 hrs | ⭐⭐⭐ |
| 12 | ToC sidebar (BR2) | bughuntertools | Big | 6 hrs | ⭐⭐ |
| 13 | CSS custom properties (BR1) | Both | Big | 5 hrs each | ⭐ (enabler only) |

---

## My Recommendation — If Doing 3 Things Only

If Delmar wants the maximum improvement for the minimum effort and disruption:

1. **Inter font** (#1 above) — pure CSS, no template changes, instant visual upgrade
2. **Dark code blocks** (#2 above) — especially on bughuntertools.com, critical for technical credibility
3. **Dark mode** (#8 above) — the single biggest signal that the sites are built for a technical audience

These three changes alone would make both sites look substantially more modern. Everything else is optional enhancement.

---

**Awaiting Delmar's approval before implementing any of the above.** I can implement in priority order as directed. Let me know which changes to start with.

— Jenn
