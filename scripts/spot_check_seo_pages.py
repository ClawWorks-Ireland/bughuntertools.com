#!/usr/bin/env python3
"""
spot_check_seo_pages.py — TASK-744 acceptance criteria verification.
Checks: title, meta description, single h1, affiliate tag for all generated pages.
"""
import re
import sys
from pathlib import Path

DIST = Path("/home/node/repos/bughuntertools.com/dist")
REQUIRED_AFFILIATE_TAG = "bughuntertools-20"
WRONG_AFFILIATE_TAG = "altclaw-20"
ERRORS = []
CHECKED = 0

def check_page(path: Path) -> bool:
    html = path.read_text()
    rel = str(path.relative_to(DIST))
    ok = True

    # Title
    titles = re.findall(r"<title>(.*?)</title>", html, re.DOTALL)
    if not titles or not titles[0].strip():
        ERRORS.append(f"MISSING TITLE: {rel}")
        ok = False

    # Meta description
    descs = re.findall(r'<meta name="description" content="([^"]+)"', html)
    if not descs:
        ERRORS.append(f"MISSING META DESCRIPTION: {rel}")
        ok = False

    # Single H1
    h1s = re.findall(r"<h1[^>]*>(.*?)</h1>", html, re.DOTALL)
    if len(h1s) == 0:
        ERRORS.append(f"MISSING H1: {rel}")
        ok = False
    elif len(h1s) > 1:
        ERRORS.append(f"MULTIPLE H1s ({len(h1s)}): {rel}")
        ok = False

    # Affiliate tag
    if REQUIRED_AFFILIATE_TAG not in html:
        ERRORS.append(f"MISSING AFFILIATE TAG: {rel}")
        ok = False

    # Wrong tag
    if WRONG_AFFILIATE_TAG in html:
        ERRORS.append(f"WRONG AFFILIATE TAG altclaw-20: {rel}")
        ok = False

    return ok

# Check all tool pages
tool_pages = sorted((DIST / "tools").rglob("index.html"))
cat_pages = sorted((DIST / "security-categories").rglob("index.html"))
all_pages = tool_pages + cat_pages

for page in all_pages:
    check_page(page)
    CHECKED += 1

# Summary
total_dist = list(DIST.rglob("index.html"))
print(f"Total pages in dist: {len(total_dist)}")
print(f"Pages spot-checked: {CHECKED}")
print(f"  - Tool pages: {len(tool_pages)}")
print(f"  - Category pages: {len(cat_pages)}")
print()
if ERRORS:
    print(f"FAILURES ({len(ERRORS)}):")
    for e in ERRORS:
        print(f"  ✗ {e}")
    sys.exit(1)
else:
    print(f"✓ All {CHECKED} pages pass: title ✓ meta description ✓ h1 ✓ affiliate tag ✓")
    sys.exit(0)
