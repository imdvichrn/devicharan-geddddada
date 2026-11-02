import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

interface OgCard {
  filename: string;
  category: string;
  title: string;
  subtitle: string;
  badge?: string;
  accentColor: string;
}

const cards: OgCard[] = [
  {
    filename: 'og-home.png',
    category: 'Geddada Devicharan',
    title: 'Digital Product Builder · Video Editor · Digital Systems',
    subtitle: 'Official Portfolio & Product Ecosystem · Visakhapatnam & Vizianagaram, AP, India',
    badge: '@imdvichrn',
    accentColor: '#3b82f6',
  },
  {
    filename: 'og-works.png',
    category: 'Works & Case Studies',
    title: 'Software, Post-Production, Managed Web & Systems',
    subtitle: 'ExamFlowOS · Perfect Pack · 700+ Video Deliverables · 8+ Active Web Properties',
    badge: 'Portfolio Hub',
    accentColor: '#3b82f6',
  },
  {
    filename: 'og-software.png',
    category: 'Software & Products',
    title: 'ExamFlowOS & Creative Asset Toolkits',
    subtitle: 'Free CBT testing platform for 10K+ students with Google Drive cloud backup',
    badge: 'Software Hub',
    accentColor: '#3b82f6',
  },
  {
    filename: 'og-video.png',
    category: 'Video & Post-Production',
    title: '700+ Client Video Projects in DaVinci Resolve Studio',
    subtitle: 'Node-based color grading, Fusion VFX, Fairlight audio mastering (-14 LUFS)',
    badge: '700+ Finished Cuts',
    accentColor: '#3b82f6',
  },
  {
    filename: 'og-web.png',
    category: 'Websites & Digital Presence',
    title: 'Full-Stack Web Engineering & Technical SEO',
    subtitle: 'Managing 8+ commercial web properties including Sri Lahari Studios & Annapurna Foundation',
    badge: '8+ Active Sites',
    accentColor: '#10b981',
  },
  {
    filename: 'og-systems.png',
    category: 'Business Systems & Automation',
    title: 'Digital Operations & Event-Driven Webhook Pipelines',
    subtitle: 'n8n workflows, client intake triage, and automated delivery pipelines',
    badge: 'Automation Engineering',
    accentColor: '#3b82f6',
  },
  {
    filename: 'og-writing.png',
    category: 'Writing & Engineering Notes',
    title: 'Technical Build Logs, Architecture & Cognitive Notes',
    subtitle: 'ExamFlowOS cloud drive architecture, spaced repetition, and technical SEO',
    badge: 'Build Logs',
    accentColor: '#f59e0b',
  },
  {
    filename: 'og-skills.png',
    category: 'Capabilities & Index',
    title: 'Technical & Creative Disciplines Map',
    subtitle: 'Software development, video editing, technical SEO, and B.Tech EEE systems',
    badge: 'Capabilities Index',
    accentColor: '#3b82f6',
  },
  {
    filename: 'og-experiments.png',
    category: 'Product Lab & Research',
    title: 'Software Prototypes & Cognitive Psychology Experiments',
    subtitle: 'SM-2 spaced repetition in CBT prep, DaVinci CLI automation, and focus architectures',
    badge: 'Experiments Lab',
    accentColor: '#a855f7',
  },
  {
    filename: 'og-about.png',
    category: 'About Geddada Devicharan',
    title: 'Digital Product Builder · Video Editor · Digital Systems',
    subtitle: 'Background, B.Tech EEE education, systems engineering, and creative history',
    badge: 'Geddada Devicharan',
    accentColor: '#3b82f6',
  },
  {
    filename: 'og-contact.png',
    category: 'Direct Communication',
    title: 'Contact Geddada Devicharan (@imdvichrn)',
    subtitle: 'Available for software product engineering, video post-production, and digital systems',
    badge: 'Contact',
    accentColor: '#10b981',
  },
  {
    filename: 'og-examflowos.png',
    category: 'ExamFlowOS Case Study',
    title: 'Free Competitive Exam Prep & CBT Platform',
    subtitle: 'Serving 10,000+ AP & TG entrance exam students with zero-cost cloud sync',
    badge: '10K+ Students',
    accentColor: '#3b82f6',
  },
  {
    filename: 'og-perfectpack.png',
    category: 'Perfect Pack for DaVinci Resolve',
    title: 'Post-Production Asset & Editing Toolkit',
    subtitle: 'Cinematic presets, sound design, motion titles, and DRFX macros',
    badge: 'DaVinci Resolve',
    accentColor: '#3b82f6',
  },
  {
    filename: 'og-annapurna.png',
    category: 'Annapurna Foundation',
    title: 'NGO Digital Presence & Video Operating System',
    subtitle: 'Web architecture, media documentation, and digital infrastructure in AP',
    badge: 'Non-Profit Media',
    accentColor: '#10b981',
  },
  {
    filename: 'og-sri-lahari.png',
    category: 'Sri Lahari Studios',
    title: 'Digital Business OS for 10-Year Studio',
    subtitle: 'Responsive web platform, regional local SEO, and automated client intake',
    badge: 'Commercial Studio OS',
    accentColor: '#f59e0b',
  },
  {
    filename: 'og-echoless.png',
    category: 'Echoless System',
    title: 'Grounded AI Intelligence & Navigation Engine',
    subtitle: 'Structured portfolio query handling and route navigation assistant',
    badge: 'Echoless AI',
    accentColor: '#3b82f6',
  },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function generateOgImages() {
  const ogDir = path.resolve(process.cwd(), 'public/og');
  if (!fs.existsSync(ogDir)) {
    fs.mkdirSync(ogDir, { recursive: true });
  }

  for (const card of cards) {
    const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#090d16" />
  
  <!-- Subtle Grid Pattern -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1" />
    </pattern>
    <radialGradient id="glow" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="${card.accentColor}" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#090d16" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="cardGlow" cx="20%" cy="80%" r="50%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#090d16" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#grid)" />
  <rect width="1200" height="630" fill="url(#glow)" />
  <rect width="1200" height="630" fill="url(#cardGlow)" />

  <!-- Outer Frame / Border -->
  <rect x="40" y="40" width="1120" height="550" rx="24" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1.5" />

  <!-- Content Container -->
  <g transform="translate(90, 90)">
    
    <!-- Header Badge & Category -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="${Math.max(140, card.category.length * 11 + 32)}" height="36" rx="18" fill="rgba(59, 130, 246, 0.12)" stroke="${card.accentColor}" stroke-opacity="0.3" stroke-width="1" />
      <text x="18" y="23" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="${card.accentColor}" letter-spacing="1">
        ${escapeXml(card.category.toUpperCase())}
      </text>
    </g>

    ${card.badge ? `
    <g transform="translate(${Math.max(160, card.category.length * 11 + 50)}, 0)">
      <rect x="0" y="0" width="${card.badge.length * 10 + 28}" height="36" rx="18" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" />
      <text x="14" y="23" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="rgba(255, 255, 255, 0.8)">
        ${escapeXml(card.badge)}
      </text>
    </g>
    ` : ''}

    <!-- Main Title -->
    <text x="0" y="140" font-family="Georgia, 'Times New Roman', serif" font-size="44" font-weight="400" fill="#ffffff" width="940">
      ${escapeXml(card.title)}
    </text>

    <!-- Subtitle -->
    <text x="0" y="220" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="400" fill="rgba(255, 255, 255, 0.65)">
      ${escapeXml(card.subtitle)}
    </text>

    <!-- Divider Line -->
    <line x1="0" y1="310" x2="940" y2="310" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />

    <!-- Footer Author Identity -->
    <g transform="translate(0, 360)">
      <!-- Avatar Dot / Accent -->
      <circle cx="20" cy="20" r="20" fill="rgba(59, 130, 246, 0.2)" stroke="${card.accentColor}" stroke-width="1.5" />
      <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#ffffff" text-anchor="middle">
        D
      </text>

      <text x="56" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#ffffff">
        Geddada Devicharan
      </text>
      <text x="56" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="rgba(255, 255, 255, 0.5)">
        Digital Product Builder · Video Editor · Digital Systems
      </text>

      <text x="940" y="26" font-family="monospace" font-size="14" font-weight="500" fill="rgba(255, 255, 255, 0.4)" text-anchor="end">
        geddadadevicharan.vercel.app
      </text>
    </g>

  </g>
</svg>
    `;

    const outputPath = path.join(ogDir, card.filename);
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);

    console.log(`Generated OG Image: ${card.filename}`);
  }
}

generateOgImages().catch(err => {
  console.error('Error generating OG images:', err);
  process.exit(1);
});
