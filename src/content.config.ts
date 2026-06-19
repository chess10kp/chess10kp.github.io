import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    tagline: z.string().default(''),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    position: z.string(),
    employer: z.string(),
    employer_link: z.string().optional(),
    timeline: z.string(),
    tech: z.array(z.string()),
    order: z.number(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    stack: z.array(z.string()),
    href: z.string().default(''),
    demo: z.string().default(''),
    blogId: z.string().default(''),
    award: z.string().default(''),
    order: z.number(),
  }),
});

export const collections = { blog, experience, projects };
