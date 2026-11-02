import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE_URL = 'https://geddadadevicharan.vercel.app';

interface SitemapEntry {
  path: string;
  changefreq: 'weekly' | 'monthly';
  priority: number;
}

const PUBLIC_ROUTES: SitemapEntry[] = [
  // Core Navigation Pages
  { path: '/', changefreq: 'weekly', priority: 1.00 },
  { path: '/works', changefreq: 'weekly', priority: 0.95 },
  { path: '/experiments', changefreq: 'weekly', priority: 0.90 },
  { path: '/about', changefreq: 'monthly', priority: 0.90 },
  { path: '/contact', changefreq: 'monthly', priority: 0.85 },
  
  // Dedicated Domain Hubs
  { path: '/software', changefreq: 'weekly', priority: 0.90 },
  { path: '/video', changefreq: 'weekly', priority: 0.90 },
  { path: '/web', changefreq: 'weekly', priority: 0.90 },
  { path: '/systems', changefreq: 'weekly', priority: 0.90 },
  { path: '/writing', changefreq: 'weekly', priority: 0.85 },
  { path: '/skills', changefreq: 'monthly', priority: 0.85 },

  // Canonical Work Case Studies
  { path: '/works/examflow-os', changefreq: 'weekly', priority: 0.95 },
  { path: '/works/perfect-pack', changefreq: 'weekly', priority: 0.90 },
  { path: '/works/video-editing-post-production', changefreq: 'weekly', priority: 0.90 },
  { path: '/works/annapurna-foundation', changefreq: 'weekly', priority: 0.90 },
  { path: '/works/sri-lahari-studios', changefreq: 'monthly', priority: 0.85 },
  { path: '/works/managed-websites', changefreq: 'monthly', priority: 0.85 },
  { path: '/works/business-systems-automation', changefreq: 'monthly', priority: 0.85 },

  // Canonical Experiment Detail Pages
  { path: '/experiments/sm2-cbt-recall', changefreq: 'monthly', priority: 0.85 },
  { path: '/experiments/local-cli-davinci-automation', changefreq: 'monthly', priority: 0.85 },
  { path: '/experiments/mppt-solar-microgrid', changefreq: 'monthly', priority: 0.85 },
  { path: '/experiments/circadian-focus-stamina', changefreq: 'monthly', priority: 0.85 },
  { path: '/experiments/cellular-longevity-senescence', changefreq: 'monthly', priority: 0.85 },

  // Case Study Build Articles
  { path: '/works/examflow-os/blog/examflowos-journey', changefreq: 'monthly', priority: 0.80 },
  { path: '/works/examflow-os/blog/examflowos-all-in-one-exam-prep-app-ap-tg-ecet-icet-polycet', changefreq: 'monthly', priority: 0.80 },
];

function fmtDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function generateSitemap(_projectRoot: string, outDir: string) {
  const today = fmtDate(new Date());

  const urls = PUBLIC_ROUTES.map((route) => {
    const loc = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority.toFixed(2)}</priority>\n  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap, 'utf8');
}

// Allow direct CLI execution: `npx tsx scripts/generateSitemap.ts`
const isMain = import.meta.url === pathToFileURL(process.argv[1] || '').href;
if (isMain) {
  const root = process.cwd();
  generateSitemap(root, path.join(root, 'public')).then(() => {
    console.log(`[sitemap] Successfully generated canonical public/sitemap.xml (${PUBLIC_ROUTES.length} URLs)`);
  });
}
