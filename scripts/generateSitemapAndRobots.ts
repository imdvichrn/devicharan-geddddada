import fs from 'fs';
import path from 'path';
import { routeManifest, DOMAIN } from '../src/data/routeManifest';

function generateSitemap() {
  const canonicalRoutes = routeManifest.filter(r => r.isCanonical);
  const today = new Date().toISOString().split('T')[0];

  const urlsXml = canonicalRoutes
    .map(route => {
      const priority = route.path === '/' ? '1.0' : route.path.startsWith('/works/') ? '0.9' : '0.8';
      return `  <url>
    <loc>${route.canonicalUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log('Successfully generated public/sitemap.xml with', canonicalRoutes.length, 'canonical URLs.');

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${DOMAIN}/sitemap.xml
`;

  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf-8');
  console.log('Successfully generated public/robots.txt referencing production origin.');
}

generateSitemap();
