import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { visit } from 'unist-util-visit';

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
  // Astro outputs to dist/ by default
});
