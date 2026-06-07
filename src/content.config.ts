import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z
    .object({
      type: z.enum(['news', 'event']).default('news'),
      title: z.string(),
      date: z.coerce.date(),
      location: z.string().optional(),
      summary: z.string(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      highlight: z.boolean().default(false),
    })
    .refine((data) => data.type !== 'event' || (data.location && data.location.length > 0), {
      message: 'Entries with type: event must include a "location" field.',
      path: ['location'],
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    intro: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    quote: z.string().optional(),
    quoteAuthor: z.string().optional(),
  }),
});

export const collections = { news, pages };
