// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL und BASE_PATH werden im GitHub-Workflow gesetzt.
// Lokal (npm run dev) läuft die Seite unter "/".
const site = process.env.SITE_URL || 'https://www.tpz-weingarten.de';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !page.includes('/drucki-mucki/') })],
});
