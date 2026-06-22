import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['security-news', 'bug-bounty', 'tools', 'research']),
    tags: z.array(z.string()).optional(),
    hasFAQ: z.boolean().optional(),
    /** Tool review data for Product/SoftwareApplication + AggregateRating JSON-LD */
    toolReviews: z.array(z.object({
      name: z.string(),
      url: z.string().url(),
      ratingValue: z.number().min(1).max(5),
      description: z.string().optional(),
      price: z.string().optional(),
      priceCurrency: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { articles };
