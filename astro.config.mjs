import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { visit } from 'unist-util-visit';
import toolsData from './src/_data/tools.json' with { type: 'json' };
import { buildToolRedirectMap } from './src/utils/toolRedirects.js';

// TASK-921: the 50 individual /tools/<slug>/ pages were retired in favor of
// category comparison pages + existing demo articles. Redirect every old
// tool-slug URL so backlinks/indexing don't silently 404. Source of truth
// for the mapping lives in src/utils/toolRedirects.js (shared with the
// tools index + security-category pages so on-site links point to the
// same destinations).
const toolRedirects = Object.fromEntries(
  Object.entries(buildToolRedirectMap(toolsData)).map(([slug, dest]) => [`/tools/${slug}`, dest])
);

// Rehype plugin: add rel="sponsored nofollow" to Amazon affiliate links.
// Targets any <a> with an amazon.com href containing a tag= parameter.
function rehypeAffiliateRel() {
  return function (tree) {
    visit(tree, 'element', function (node) {
      if (
        node.tagName === 'a' &&
        node.properties &&
        typeof node.properties.href === 'string'
      ) {
        const href = node.properties.href;
        if (href.includes('amazon.com') && href.includes('tag=')) {
          node.properties.rel = ['sponsored', 'nofollow'];
        }
      }
    });
  };
}

export default defineConfig({
  site: 'https://bughuntertools.com',
  integrations: [
    mdx({
      rehypePlugins: [rehypeAffiliateRel],
    }),
    sitemap(),
  ],
  markdown: {
    rehypePlugins: [rehypeAffiliateRel],
  },
  build: {
    // Keep trailing slashes consistent
  },
  trailingSlash: 'always',
  redirects: toolRedirects,
  // Astro outputs to dist/ by default
});
