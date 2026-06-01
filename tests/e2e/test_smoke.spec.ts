import { test, expect } from '@playwright/test';

/**
 * Baseline browser smoke test — bughuntertools.com
 *
 * Verifies three things on every PR:
 *   1. Home page loads with no 4xx/5xx network responses.
 *   2. Above-the-fold heading renders non-empty text.
 *   3. Clicking a navigation link changes the URL and renders a page.
 */

test.describe('bughuntertools.com smoke', () => {
  test('home page loads without 4xx/5xx errors', async ({ page }) => {
    const badResponses: string[] = [];

    page.on('response', (response) => {
      if (response.status() >= 400) {
        badResponses.push(`${response.status()} ${response.url()}`);
      }
    });

    await page.goto('/');

    expect(
      badResponses,
      `Unexpected error responses: ${badResponses.join(', ')}`
    ).toHaveLength(0);
  });

  test('above-the-fold heading renders non-empty text', async ({ page }) => {
    await page.goto('/');

    // BHT home uses an h1 inside the hero section
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    const text = await heading.innerText();
    expect(text.trim().length, 'Heading should contain text').toBeGreaterThan(0);
  });

  test('nav link changes URL and renders content', async ({ page }) => {
    await page.goto('/');

    // Click the "Articles" link in the main nav (skips the "Home" link)
    const navLink = page
      .locator('nav.main-nav a[href^="/"]')
      .filter({ hasNotText: /^Home$/i })
      .first();

    const href = await navLink.getAttribute('href');

    await navLink.click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain(href!);
    await expect(page.locator('body')).toBeVisible();
  });
});
