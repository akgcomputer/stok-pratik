import { defineCollection, z } from 'astro:content';

const kategorilerCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().nullable().optional(),
    author: z.string().default('Stok Pratik Ekibi'),
    externalLink: z.string().url().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const destekCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
    externalLink: z.string().url().optional(),
    videoLink: z.string().optional(),
  }),
});

export const collections = {
  'kategoriler': kategorilerCollection,
  'blog': blogCollection,
  'destek': destekCollection,
};
