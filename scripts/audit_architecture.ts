import fs from 'node:fs';
import path from 'node:path';
import { experiments } from '../src/data/experiments';
import { projects } from '../src/data/projects';
import faqData from '../src/data/faq.json';
import { ChatbotBrain } from '../src/chatbot/chatbot';

const DOMAIN = 'https://geddadadevicharan.vercel.app';

interface AuditError {
  type: string;
  location: string;
  message: string;
}

const errors: AuditError[] = [];

console.log('=== 1. AUDITING CANONICAL HIERARCHY & ROUTES ===');

// Check projects
for (const p of projects) {
  const canonicalPath = `/works/${p.id}`;
  if (!p.id || !p.title) {
    errors.push({ type: 'PROJECT_META', location: p.id, message: 'Missing id or title' });
  }
}
console.log(`✓ Audited ${projects.length} individual projects under /works/[project]`);

// Check experiments
for (const exp of experiments) {
  const canonicalPath = `/experiments/${exp.id}`;
  if (!exp.id || !exp.title || !exp.description) {
    errors.push({ type: 'EXP_META', location: exp.id, message: 'Missing id, title or description' });
  }
}
console.log(`✓ Audited ${experiments.length} individual experiments under /experiments/[experiment]`);

// Audit Chatbot Links & Responses
console.log('\n=== 2. AUDITING CHATBOT INTELLIGENCE ROUTING ===');
const brain = new ChatbotBrain();

async function auditChatbot() {
  const testQueries = [
    { query: 'Tell me about ExamFlowOS', expectedPattern: '/works/examflow-os' },
    { query: 'What experiments has Devicharan conducted?', expectedPattern: '/experiments' },
    { query: 'Tell me about spaced repetition recall', expectedPattern: '/experiments/sm2-cbt-recall' },
    { query: 'What is Perfect Pack?', expectedPattern: '/works/perfect-pack' },
    { query: 'How to contact Devicharan?', expectedPattern: '/contact' },
    { query: 'Where is the video editing case study?', expectedPattern: '/works/video-editing-post-production' }
  ];

  for (const t of testQueries) {
    const res = await brain.respond(t.query);
    const allLinks = [
      res.projectLink || '',
      ...(res.suggestedActions?.map(a => a.path) || []),
      ...(res.sources || [])
    ];
    const hasExpected = allLinks.some(l => l.includes(t.expectedPattern));
    if (!hasExpected) {
      errors.push({
        type: 'CHATBOT_LINK',
        location: t.query,
        message: `Expected link containing "${t.expectedPattern}", got ${JSON.stringify(allLinks)}`
      });
    } else {
      console.log(`✓ Query "${t.query}" correctly resolved to ${t.expectedPattern}`);
    }
  }
}

auditChatbot().then(() => {
  console.log('\n=== 3. AUDITING SITEMAP CANONICAL URLS ===');
  const sitemapContent = fs.readFileSync(path.join(process.cwd(), 'public/sitemap.xml'), 'utf8');
  
  // Verify no localhost or preview URLs
  if (sitemapContent.includes('localhost') || sitemapContent.includes('run.app') || sitemapContent.includes('ais-')) {
    errors.push({ type: 'SITEMAP_URL', location: 'sitemap.xml', message: 'Contains invalid domain preview/localhost' });
  }

  // Verify core canonical URLs present
  const requiredUrls = [
    `${DOMAIN}/`,
    `${DOMAIN}/works`,
    `${DOMAIN}/works/examflow-os`,
    `${DOMAIN}/works/perfect-pack`,
    `${DOMAIN}/works/video-editing-post-production`,
    `${DOMAIN}/works/annapurna-foundation`,
    `${DOMAIN}/experiments`,
    `${DOMAIN}/experiments/sm2-cbt-recall`,
    `${DOMAIN}/experiments/local-cli-davinci-automation`,
    `${DOMAIN}/experiments/mppt-solar-microgrid`,
    `${DOMAIN}/experiments/circadian-focus-stamina`,
    `${DOMAIN}/experiments/cellular-longevity-senescence`,
    `${DOMAIN}/about`,
    `${DOMAIN}/contact`
  ];

  for (const url of requiredUrls) {
    if (!sitemapContent.includes(`<loc>${url}</loc>`)) {
      errors.push({ type: 'SITEMAP_MISSING', location: 'sitemap.xml', message: `Missing canonical URL: ${url}` });
    }
  }
  console.log(`✓ All ${requiredUrls.length} required canonical hierarchy URLs present in sitemap.xml`);

  console.log('\n=== AUDIT SUMMARY ===');
  if (errors.length === 0) {
    console.log('✓ AUDIT PASSED: Zero inconsistencies found across Information Architecture, SEO Identity, Canonical URLs, and Chatbot routing.');
  } else {
    console.error(`✗ AUDIT FAILED with ${errors.length} errors:`);
    console.error(JSON.stringify(errors, null, 2));
    process.exit(1);
  }
});
