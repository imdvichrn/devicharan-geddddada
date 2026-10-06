import fs from 'fs';
import path from 'path';
import { routeManifest, DOMAIN } from '../src/data/routeManifest';

function testProductionBuild() {
  const distDir = path.resolve(process.cwd(), 'dist');
  if (!fs.existsSync(distDir)) {
    console.error('FAIL: dist directory does not exist.');
    process.exit(1);
  }

  let passed = 0;
  let failed = 0;

  for (const route of routeManifest) {
    let htmlPath: string;
    if (route.path === '/') {
      htmlPath = path.join(distDir, 'index.html');
    } else {
      htmlPath = path.join(distDir, route.path.replace(/^\//, ''), 'index.html');
    }

    if (!fs.existsSync(htmlPath)) {
      console.error(`FAIL: Missing pre-rendered HTML file for route "${route.path}" at ${htmlPath}`);
      failed++;
      continue;
    }

    const html = fs.readFileSync(htmlPath, 'utf-8');

    // Check title
    if (!html.includes(`<title>${route.title}</title>`)) {
      console.error(`FAIL: Title mismatch for route "${route.path}"`);
      failed++;
      continue;
    }

    // Check canonical link
    if (!html.includes(`rel="canonical" href="${route.canonicalUrl}"`)) {
      console.error(`FAIL: Canonical URL mismatch for route "${route.path}"`);
      failed++;
      continue;
    }

    // Check OG image
    if (!html.includes(`property="og:image" content="${route.ogImage}"`)) {
      console.error(`FAIL: OG image mismatch for route "${route.path}"`);
      failed++;
      continue;
    }

    // Check OG image file exists in dist
    const ogRelPath = route.ogImage.replace(`${DOMAIN}/`, '');
    const ogFilePath = path.join(distDir, ogRelPath);
    if (!fs.existsSync(ogFilePath)) {
      console.error(`FAIL: OG image file does not exist at ${ogFilePath} for route "${route.path}"`);
      failed++;
      continue;
    }

    passed++;
  }

  // Check sitemap.xml in dist
  const sitemapDistPath = path.join(distDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapDistPath)) {
    console.error('FAIL: sitemap.xml does not exist in dist/');
    failed++;
  } else {
    const sitemapContent = fs.readFileSync(sitemapDistPath, 'utf-8');
    if (!sitemapContent.includes(DOMAIN)) {
      console.error('FAIL: sitemap.xml missing production origin domain.');
      failed++;
    } else {
      passed++;
    }
  }

  // Check robots.txt in dist
  const robotsDistPath = path.join(distDir, 'robots.txt');
  if (!fs.existsSync(robotsDistPath)) {
    console.error('FAIL: robots.txt does not exist in dist/');
    failed++;
  } else {
    const robotsContent = fs.readFileSync(robotsDistPath, 'utf-8');
    if (!robotsContent.includes(`${DOMAIN}/sitemap.xml`)) {
      console.error('FAIL: robots.txt missing production sitemap reference.');
      failed++;
    } else {
      passed++;
    }
  }

  console.log(`\n--- PRODUCTION BUILD VERIFICATION RESULTS ---`);
  console.log(`PASSED TESTS: ${passed}`);
  console.log(`FAILED TESTS: ${failed}`);

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log(`\nSUCCESS: Every route, metadata tag, static OG image, sitemap, and robots.txt verified 100% OK!`);
  }
}

testProductionBuild();
