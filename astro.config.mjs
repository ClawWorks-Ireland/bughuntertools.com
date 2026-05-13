import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://bughuntertools.com',
  integrations: [
    mdx(),
    sitemap(),
  ],
  markdown: {
    // Articles use raw HTML inside .md files (article wrappers, sections, divs).
    // This flag tells remark-rehype to pass raw HTML nodes through instead of
    // escaping them as text. Without this, all <div>, <section>, <h1> etc. in
    // article markdown files render as literal tag text on the page.
    allowDangerousHtml: true,
  },
  build: {
    // Keep trailing slashes consistent
  },
  trailingSlash: 'always',
  // Astro outputs to dist/ by default
});
