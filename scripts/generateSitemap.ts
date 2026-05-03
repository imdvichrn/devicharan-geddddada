import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE_URL = 'https://geddadadevicharan.vercel.app';

interface ProjectLite {
  id: string;
  category: 'video' | 'design' | 'strategy' | 'web';
}

// Priority weights per category and per featured id
const PRIORITY_BY_CATEGORY: Record<ProjectLite['category'], number> = {
  web: 0.9,
  video: 0.85,
  design: 0.75,
  strategy: 0.75,
};
const FEATURED: Record<string, number> = {
  'examflow-os': 0.98,
  'perfect-pack': 0.9,
  'perfect-pack-plugin': 0.9,
};
const CHANGEFREQ_BY_CATEGORY: Record<ProjectLite['category'], string> = {
  web: 'weekly',
  video: 'monthly',
  design: 'monthly',
  strategy: 'monthly',
};

function fmtDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

async function loadProjects(projectRoot: string): Promise<ProjectLite[]> {
  // Parse src/data/projects.ts as text — avoid TS import dependency
  const file = path.join(projectRoot, 'src/data/projects.ts');
  const src = fs.readFileSync(file, 'utf8');
  const items: ProjectLite[] = [];
  // Match `id: '...'` followed (somewhere in the same object) by `category: '...'`
  const blockRe = /\{\s*id:\s*'([^']+)'[\s\S]*?category:\s*'([^']+)'/g;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(src)) !== null) {
    const [, id, category] = m;
    if (['video', 'design', 'strategy', 'web'].includes(category)) {
      items.push({ id, category: category as ProjectLite['category'] });
    }
  }
  return items;
}

function urlEntry(loc: string, lastmod: string, changefreq: string, priority: number, image?: string) {
  const img = image
    ? `\n    <image:image>\n      <image:loc>${image}</image:loc>\n    </image:image>`
    : '';
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority.toFixed(2)}</priority>${img}\n  </url>`;
}

const OG_BY_ID: Record<string, string> = {
  'examflow-os': 'https://geddadadevicharan.vercel.app/og/og-examflow.jpg',
  'perfect-pack': 'https://geddadadevicharan.vercel.app/og/og-perfect-pack.jpg',
  'perfect-pack-plugin': 'https://geddadadevicharan.vercel.app/og/og-perfect-pack.jpg',
};

export async function generateSitemap(projectRoot: string, outDir: string) {
  const projects = await loadProjects(projectRoot);
  const projectsFile = path.join(projectRoot, 'src/data/projects.ts');
  const lastmod = fmtDate(fs.statSync(projectsFile).mtime);
  const today = fmtDate(new Date());

  const urls: string[] = [];
  urls.push(urlEntry(`${SITE_URL}/`, today, 'weekly', 1.0));

  for (const p of projects) {
    const priority = FEATURED[p.id] ?? PRIORITY_BY_CATEGORY[p.category];
    const changefreq = CHANGEFREQ_BY_CATEGORY[p.category];
    urls.push(urlEntry(`${SITE_URL}/project/${p.id}`, lastmod, changefreq, priority));
  }

  // Legacy redirect kept indexed (low priority)
  urls.push(urlEntry(`${SITE_URL}/projects/video-editing-post-production`, lastmod, 'monthly', 0.6));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${SITE_URL}/sitemap.xml</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>\n</sitemapindex>\n`;

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(outDir, 'sitemap-index.xml'), sitemapIndex);
}

// Allow direct CLI execution: `tsx scripts/generateSitemap.ts`
const isMain = import.meta.url === pathToFileURL(process.argv[1] || '').href;
if (isMain) {
  const root = process.cwd();
  generateSitemap(root, path.join(root, 'public')).then(() => {
    console.log('[sitemap] Generated public/sitemap.xml and public/sitemap-index.xml');
  });
}
