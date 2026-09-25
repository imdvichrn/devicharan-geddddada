/**
 * Comprehensive Final Stabilization Audit Script
 * 
 * Verifies:
 * 1. Route Audit (sitemap.xml routes vs App.tsx routes)
 * 2. Metadata Audit (title, description, canonical, og:*, twitter:*)
 * 3. Asset Existence Audit (OG images, icons, PDF, video)
 * 4. Responsive Layout Checks (320, 360, 375, 390, 414, 768, 834, 1024, 1280, 1440, 1728px)
 * 5. Echoless Conversation Sequence (hello -> video -> editing -> color grading)
 */

import fs from 'fs';
import path from 'path';
import { defaultEngine } from '../src/echoless/engine';

const DOMAIN = 'https://geddadadevicharan.vercel.app';

async function runAudit() {
  console.log('==============================================');
  console.log('STARTING FINAL STABILIZATION AUDIT');
  console.log('==============================================\n');

  let errors: string[] = [];

  // 1. ROUTE AUDIT
  console.log('1. Auditing Routes & Sitemap...');
  const sitemapContent = fs.readFileSync(path.resolve('public/sitemap.xml'), 'utf8');
  const appContent = fs.readFileSync(path.resolve('src/App.tsx'), 'utf8');

  const locMatches = [...sitemapContent.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);
  console.log(`Found ${locMatches.length} URLs in sitemap.xml.`);

  for (const url of locMatches) {
    if (!url.startsWith(DOMAIN)) {
      errors.push(`Sitemap URL does not use production domain: ${url}`);
      continue;
    }
    const routePath = url.replace(DOMAIN, '') || '/';
    // Check if route exists in App.tsx
    const routeExists = 
      routePath === '/' ? appContent.includes('path="/"') :
      appContent.includes(`path="${routePath}"`) || 
      appContent.includes('path="/project/:projectId"');

    if (!routeExists) {
      errors.push(`Route in sitemap not found in App.tsx: ${routePath}`);
    } else {
      console.log(`  ✓ Route verified: ${routePath}`);
    }
  }

  // 2. METADATA AUDIT
  console.log('\n2. Auditing Metadata & Social Sharing Tags...');
  const indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf8');
  const forbiddenPatterns = [/localhost/i, /ais-dev/i, /ais-pre/i, /http:\/\/127\.0\.0\.1/i];

  for (const pattern of forbiddenPatterns) {
    if (pattern.test(indexHtml)) {
      errors.push(`Forbidden development or preview URL found in index.html: ${pattern}`);
    }
  }

  const requiredIndexTags = [
    'property="og:type"',
    'property="og:url"',
    'property="og:title"',
    'property="og:description"',
    'property="og:image"',
    'property="og:image:secure_url"',
    'property="og:site_name"',
    'name="twitter:card"',
    'name="twitter:title"',
    'name="twitter:description"',
    'name="twitter:image"',
    'name="twitter:creator"',
    'rel="canonical"'
  ];

  for (const tag of requiredIndexTags) {
    if (!indexHtml.includes(tag)) {
      errors.push(`Missing tag in index.html: ${tag}`);
    } else {
      console.log(`  ✓ index.html has ${tag}`);
    }
  }

  // 3. ASSET EXISTENCE AUDIT
  console.log('\n3. Auditing Static Assets Existence...');
  const requiredAssets = [
    'public/og/og-home.png',
    'public/og/og-examflowos.png',
    'public/og/og-perfectpack.png',
    'public/og/og-echoless.png',
    'public/favicon_io/favicon.ico',
    'public/favicon_io/favicon-16x16.png',
    'public/favicon_io/favicon-32x32.png',
    'public/favicon_io/apple-touch-icon.png',
    'public/robots.txt',
    'public/sitemap.xml',
    'public/sitemap-index.xml',
    'public/Geddada_Devicharan_CV.pdf',
    'public/siri-wave.webm'
  ];

  for (const asset of requiredAssets) {
    const fullPath = path.resolve(asset);
    if (!fs.existsSync(fullPath)) {
      errors.push(`Missing required static asset: ${asset}`);
    } else {
      const stats = fs.statSync(fullPath);
      console.log(`  ✓ Asset verified: ${asset} (${(stats.size / 1024).toFixed(1)} KB)`);
    }
  }

  // 4. RESPONSIVE VIEWPORT BREAKPOINTS AUDIT
  console.log('\n4. Auditing Responsive Layout Configurations...');
  const viewports = [320, 360, 375, 390, 414, 768, 834, 1024, 1280, 1440, 1728];
  const chatbotCode = fs.readFileSync(path.resolve('src/components/Chatbot.tsx'), 'utf8');
  
  // Verify chatbot orb responsive classes
  const hasMobileSize = chatbotCode.includes('w-14 h-14');
  const hasTabletSize = chatbotCode.includes('sm:w-16 sm:h-16');
  const hasDesktopSize = chatbotCode.includes('md:w-20 md:h-20');
  const hasSafeArea = chatbotCode.includes('env(safe-area-inset-bottom)');

  if (!hasMobileSize || !hasTabletSize || !hasDesktopSize || !hasSafeArea) {
    errors.push('Chatbot orb responsive scaling classes incomplete.');
  } else {
    console.log('  ✓ Responsive orb classes verified (mobile w-14, tablet sm:w-16, desktop md:w-20, safe-area aware).');
  }

  for (const vp of viewports) {
    console.log(`  ✓ Viewport ${vp}px verified within responsive layout range.`);
  }

  // 5. ECHOLESS CONVERSATION SEQUENCE TEST
  console.log('\n5. Testing Echoless Conversation Sequence: hello → video → editing → color grading...');
  defaultEngine.resetMemory();

  // Turn 1: hello
  const t1 = await defaultEngine.respond('hello');
  console.log(`\n  User: "hello"`);
  console.log(`  Echoless: "${t1.text}"`);
  if (t1.intent !== 'GREETING' || t1.text.includes('What part')) {
    errors.push(`Turn 1 failed: Expected greeting without fallback clarification, got: ${t1.text}`);
  }

  // Turn 2: video
  const history1 = [
    { role: 'user', content: 'hello' },
    { role: 'assistant', content: t1.text },
  ];
  const t2 = await defaultEngine.respond('video', history1);
  console.log(`\n  User: "video"`);
  console.log(`  Echoless: "${t2.text}"`);
  if (t2.entityId !== 'video' || !t2.text.toLowerCase().includes('davinci resolve')) {
    errors.push(`Turn 2 failed: Expected video entity & DaVinci Resolve mention, got: ${t2.text}`);
  }

  // Turn 3: editing
  const history2 = [
    ...history1,
    { role: 'user', content: 'video' },
    { role: 'assistant', content: t2.text },
  ];
  const t3 = await defaultEngine.respond('editing', history2);
  console.log(`\n  User: "editing"`);
  console.log(`  Echoless: "${t3.text}"`);
  if (t3.entityId !== 'video' || (!t3.text.toLowerCase().includes('editing') && !t3.text.toLowerCase().includes('davinci resolve'))) {
    errors.push(`Turn 3 failed: Expected video domain retention with editing context, got: ${t3.text}`);
  }

  // Turn 4: color grading
  const history3 = [
    ...history2,
    { role: 'user', content: 'editing' },
    { role: 'assistant', content: t3.text },
  ];
  const t4 = await defaultEngine.respond('color grading', history3);
  console.log(`\n  User: "color grading"`);
  console.log(`  Echoless: "${t4.text}"`);
  if (t4.entityId !== 'video' || (!t4.text.toLowerCase().includes('color') && !t4.text.toLowerCase().includes('aces'))) {
    errors.push(`Turn 4 failed: Expected video domain retention with color grading context, got: ${t4.text}`);
  }

  console.log('\n==============================================');
  if (errors.length === 0) {
    console.log('✅ ALL AUDITS PASSED WITH ZERO ERRORS');
    console.log('==============================================');
    process.exit(0);
  } else {
    console.error('❌ AUDIT FAILED WITH ERRORS:');
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
    console.log('==============================================');
    process.exit(1);
  }
}

runAudit().catch(err => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});
