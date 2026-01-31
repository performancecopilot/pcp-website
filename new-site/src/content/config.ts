import { defineCollection, z } from 'astro:content';

const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    version: z.string().optional(),
    description: z.string(),
  }),
});

const gsocCollection = defineCollection({
  type: 'content',
  schema: z.object({
    year: z.number(),
    title: z.string(),
    description: z.string(),
    status: z.enum(['ideas', 'active', 'completed']).default('ideas'),
  }),
});

const gsodCollection = defineCollection({
  type: 'content',
  schema: z.object({
    year: z.number(),
    title: z.string(),
    description: z.string(),
    type: z.enum(['ideas', 'proposal', 'casestudy']).default('ideas'),
  }),
});

const conferenceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    year: z.number(),
    title: z.string(),
    location: z.string().optional(),
    date: z.string().optional(),
    type: z.enum(['home', 'schedule', 'contact']).default('home'),
  }),
});

export const collections = {
  news: newsCollection,
  gsoc: gsocCollection,
  gsod: gsodCollection,
  conference: conferenceCollection,
};
