import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Bildpfade sind relativ zu src/assets/img, z. B. "hero/team.jpg".
const imagePath = z.string().superRefine((path, ctx) => {
  if (!existsSync(join(process.cwd(), 'src/assets/img', path))) {
    ctx.addIssue({ code: 'custom', message: `Bild nicht gefunden: src/assets/img/${path}` });
  }
});

const icon = z.enum(['plus', 'user', 'calendar', 'graduation', 'phone', 'mail', 'pin', 'clock']);

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    heading: z.string().optional(),
    subtitle: z.string().optional(),
    hero: imagePath.optional(),
    // nur Startseite
    features: z.array(z.object({ icon, title: z.string(), href: z.string() })).optional(),
    teasers: z.array(z.object({ title: z.string(), text: z.string().optional(), image: imagePath, href: z.string() })).optional(),
    introImage: imagePath.optional(),
  }),
});

const leistungen = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/leistungen' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    image: imagePath.optional(),
    imageAlt: z.string().optional(),
  }),
});

const jobs = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/jobs' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    active: z.boolean().default(true),
    downloads: z.array(z.object({ label: z.string(), file: z.string() })).default([]),
  }),
});

const site = defineCollection({
  loader: glob({ pattern: 'site.yaml', base: './src/data' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    address: z.object({ street: z.string(), zip: z.string(), city: z.string() }),
    phone: z.object({ display: z.string(), href: z.string() }),
    email: z.string(),
    mapsUrl: z.string().url(),
    social: z.array(z.object({ name: z.enum(['Facebook', 'Instagram']), url: z.string().url() })),
    nav: z.array(z.object({ label: z.string(), href: z.string() })),
    footerNav: z.array(z.object({ label: z.string(), href: z.string() })),
  }),
});

const timeRow = z.object({ days: z.string(), times: z.array(z.string()) });

const hours = defineCollection({
  loader: glob({ pattern: 'hours.yaml', base: './src/data' }),
  schema: z.object({
    groups: z.array(z.object({ title: z.string(), rows: z.array(timeRow) })),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: 'team.yaml', base: './src/data' }),
  schema: z.object({
    heading: z.string(),
    subtitle: z.string(),
    members: z.array(z.object({ name: z.string(), photo: imagePath, roles: z.array(z.string()) })),
  }),
});

export const collections = { pages, leistungen, jobs, site, hours, team };
