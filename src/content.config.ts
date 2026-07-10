import { defineCollection, z } from "astro:content";

import { glob, file } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
  }),
});

const notas = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/notas" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, notas };
