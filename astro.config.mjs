import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://bughuntertools.com',
  integrations: [
    mdx(),
    sitemap(),
  ],
  build: {
    // Keep trailing slashes consistent
  },
  trailingSlash: 'always',
  // Astro outputs to dist/ by default
});
