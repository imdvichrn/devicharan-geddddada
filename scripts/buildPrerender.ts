import fs from 'fs';
import path from 'path';
import { routeManifest } from '../src/data/routeManifest';

function escapeAttr(str: string): string {
  return str.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function prerender() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const baseHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(baseHtmlPath)) {
    console.error('dist/index.html does not exist. Run "vite build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');
  let count = 0;

  for (const route of routeManifest) {
    let html = baseHtml;

    // 1. Replace Title
    html = html.replace(/<title>.*?<\/title>/gi, `<title>${escapeAttr(route.title)}</title>`);

    // 2. Replace Description
    html = html.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/gi,
      `<meta name="description" content="${escapeAttr(route.description)}" />`
    );

    // 3. Replace Canonical Link
    html = html.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/gi,
      `<link rel="canonical" href="${route.canonicalUrl}" />`
    );

    // 4. Replace OG Title
    html = html.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/gi,
      `<meta property="og:title" content="${escapeAttr(route.title)}" />`
    );

    // 5. Replace OG Description
    html = html.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/gi,
      `<meta property="og:description" content="${escapeAttr(route.description)}" />`
    );

    // 6. Replace OG URL
    html = html.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/gi,
      `<meta property="og:url" content="${route.canonicalUrl}" />`
    );

    // 7. Replace OG Image & Secure URL
    html = html.replace(
      /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/gi,
      `<meta property="og:image" content="${route.ogImage}" />`
    );
    html = html.replace(
      /<meta\s+property="og:image:secure_url"\s+content=".*?"\s*\/?>/gi,
      `<meta property="og:image:secure_url" content="${route.ogImage}" />`
    );

    // 8. Replace Twitter Title, Description, Image & URL
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/gi,
      `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/gi,
      `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/gi,
      `<meta name="twitter:image" content="${route.ogImage}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/gi,
      `<meta name="twitter:url" content="${route.canonicalUrl}" />`
    );

    // 9. If route is an alias redirect, inject meta refresh + JS redirect
    if (route.redirectTo) {
      const redirectTag = `<meta http-equiv="refresh" content="0;url=${route.redirectTo}"><script>window.location.replace("${route.redirectTo}");</script>`;
      html = html.replace('</head>', `${redirectTag}\n</head>`);
    }

    if (route.path === '/') {
      // Overwrite dist/index.html with updated homepage metadata
      fs.writeFileSync(baseHtmlPath, html, 'utf-8');
      count++;
    } else {
      // Create subdirectory in dist
      const targetSubDir = path.join(distDir, route.path.replace(/^\//, ''));
      fs.mkdirSync(targetSubDir, { recursive: true });
      fs.writeFileSync(path.join(targetSubDir, 'index.html'), html, 'utf-8');
      count++;
    }
  }

  // Copy static OG images into dist/og
  const publicOgDir = path.resolve(process.cwd(), 'public/og');
  const distOgDir = path.resolve(distDir, 'og');
  if (fs.existsSync(publicOgDir)) {
    fs.mkdirSync(distOgDir, { recursive: true });
    const ogFiles = fs.readdirSync(publicOgDir);
    for (const file of ogFiles) {
      fs.copyFileSync(path.join(publicOgDir, file), path.join(distOgDir, file));
    }
    console.log(`Copied ${ogFiles.length} static OG images to dist/og/.`);
  }

  console.log(`Successfully pre-rendered HTML metadata for ${count} routes into dist/.`);
}

prerender();
