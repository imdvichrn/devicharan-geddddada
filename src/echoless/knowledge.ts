// Re-export new knowledge graph, facts, and actions layer
export * from './knowledge/index';

/**
 * Contains ONLY verified public information about Geddada Devicharan.
 * Completely provider-independent and decoupled from any specific AI SDK.
 */

export const DEVICHARAN_IDENTITY = {
  fullName: "Geddada Devicharan",
  preferredName: "Devicharan",
  onlineHandle: "@imdvichrn",
  currentRole: "Digital Product Builder, Video Editor / Post-Production Specialist, Business Systems Creator",
  location: "Visakhapatnam & Vizianagaram, Andhra Pradesh, India",
  summary: "A multidisciplinary builder blending software engineering, business automation, and high-end video post-production.",
} as const;

export const PROFESSIONAL_POSITIONING = {
  philosophy: "Quiet craftsmanship, high performance, and rapid execution. Builds practical systems that solve real operational bottlenecks.",
  dualCompetence: "Unique dual capability: full-stack software and automation architecture on one side, and high-precision post-production (node-based color grading and motion graphics) on the other.",
} as const;

export const EXAMFLOW_OS_FACTS = {
  name: "ExamFlowOS",
  tagline: "Free CBT Practice & Study Operating System for AP & TS Entrance Exams",
  liveUrl: "https://examflowos.in",
  portfolioPath: "/software",
  keyFeatures: [
    "100% Free computer-based test (CBT) practice platform.",
    "Tailored for state-level entrance exams: ECET, ICET, POLYCET.",
    "Active recall engines and topic-by-topic mastery tracking.",
    "Detailed score analytics, time-per-question metrics, and review dashboards.",
    "Google Drive Cloud Sync — students own and control their own study records.",
    "10,000+ registered test attempts across Andhra Pradesh and Telangana.",
  ],
} as const;

export const VIDEO_POST_PRODUCTION_FACTS = {
  scope: "700+ commercial, narrative, wedding, corporate, and creative video deliverables completed.",
  primaryTool: "DaVinci Resolve Studio",
  competencies: [
    "Node-based Color Grading (ACES, DaVinci Wide Gamut, Color Space Transforms).",
    "Fusion Motion Graphics (title sequences, tracked UI elements, dynamic transitions).",
    "Fairlight Audio Post-Production (dialogue isolation, spectral repair, loudness normalization to broadcast standards).",
    "Rhythmic and narrative pacing tailored for retention and emotional resonance.",
  ],
  portfolioPath: "/video",
} as const;

export const ANNAPURNA_FOUNDATION_FACTS = {
  name: "Annapurna Foundation",
  nature: "Community non-profit organization operating in Andhra Pradesh.",
  devicharanContribution: "Engineered and maintains the complete digital web ecosystem, donation workflows, information architecture, and public presence pro bono.",
  impact: "Empowers the non-profit to communicate transparently, manage donor relations, and organize outreach campaigns.",
} as const;

export const SRI_LAHARI_STUDIOS_FACTS = {
  name: "Sri Lahari Studios",
  background: "A decade-old creative photography and videography studio operating in Kothavalasa & Chinnamushidiwada.",
  devicharanContribution: "Built Sri Lahari Studios OS — a custom digital operations infrastructure integrating automated client inquiry routing, delivery workflows, and local search engine presence.",
  impact: "Streamlined customer inquiries, reduced manual booking overhead, and strengthened local client acquisition.",
} as const;

export const PERFECT_PACK_FACTS = {
  name: "Perfect Pack",
  description: "A professional asset, power grade, and transition toolkit crafted specifically for DaVinci Resolve Studio creators.",
  targetAudience: "Video editors, colorists, and motion designers seeking cinematic workflows without bloat.",
  portfolioPath: "/perfect-pack",
} as const;

export const WEBSITES_AND_DIGITAL_SYSTEMS_FACTS = {
  architecture: "Fast, modern, accessible web applications and automated business workflows.",
  webPrinciples: [
    "Clean typography, high-contrast readability, and zero-pill UI discipline.",
    "Responsive performance with sub-second initial load times.",
    "Modern stack: TypeScript, React, Next.js, Tailwind CSS, Vite.",
    "Comprehensive technical SEO, OpenGraph metadata, and structured JSON-LD schemas.",
  ],
  automationStack: [
    "Event-driven automation using n8n and REST webhooks.",
    "AI-assisted data extraction and notification pipelines.",
    "Operational CRM and lead routing systems.",
  ],
  portfolioPaths: ["/web", "/systems"],
} as const;

export const SKILLS_AND_STACK = {
  softwareEngineering: [
    "TypeScript", "JavaScript (ESNext)", "React", "Next.js", "Node.js", "Express",
    "Tailwind CSS", "Vite", "HTML5", "CSS3 / Modern Layouts", "Git", "GitHub"
  ],
  postProduction: [
    "DaVinci Resolve Studio", "Node-based Color Grading", "Fusion Compositing",
    "Fairlight Audio Engineering", "Color Management (DWG/ACES)", "Sound Design"
  ],
  businessAutomation: [
    "n8n Workflow Automation", "Webhooks & REST APIs", "Zapier", "Cloud Functions", "Operational Tooling"
  ],
} as const;

export const EXPERIENCE_AND_TRAINING = [
  {
    institution: "Bharat Heavy Electricals Limited (BHEL), Visakhapatnam",
    type: "Industrial Training",
    focus: "Heavy electrical systems, industrial manufacturing protocols, and operational safety.",
  },
  {
    institution: "HMIES Solutions in collaboration with APSCHE (2025)",
    type: "Industrial Internship",
    focus: "MATLAB computational modeling, algorithmic simulation, and control systems.",
  },
  {
    institution: "Ahalya Industrial Workshop (2024)",
    type: "Technical Workshop",
    focus: "Renewable Energy Systems and power conversion.",
  },
] as const;

export const EDUCATION_FACTS = [
  {
    degree: "B.Tech in Electrical and Electronics Engineering (Final Year)",
    institution: "Andhra University Affiliated Engineering College",
    location: "Visakhapatnam, Andhra Pradesh",
  },
  {
    degree: "Diploma in Electrical and Electronics Engineering",
    institution: "M.R.A.G.R. Government Polytechnic",
    location: "Vizianagaram, Andhra Pradesh",
  },
] as const;

export const PUBLIC_LINKS = {
  email: "devicharangeddada@gmail.com",
  whatsApp: "https://wa.me/916303468707",
  whatsAppNumber: "+91 6303468707",
  github: "https://github.com/imdvichrn/imdvichrn",
  linkedin: "https://www.linkedin.com/in/geddadadevicharan",
  instagram: "https://www.instagram.com/imdvichrn",
  facebook: "https://www.facebook.com/imdvichrn",
  twitter: "https://x.com/devi_charan_2004",
  examFlowLive: "https://examflowos.in",
} as const;

export const CV_METADATA = {
  fileName: "Geddada_Devicharan_CV.pdf",
  publicUrl: "/Geddada_Devicharan_CV.pdf",
  fileSizeApprox: "3.52 MB",
  description: "Official verified CV covering education, software products, 700+ post-production deliverables, and industrial training.",
} as const;

export const PORTFOLIO_PAGES = [
  { path: "/", label: "Home / Overview" },
  { path: "/work", label: "Selected Works & Projects" },
  { path: "/software", label: "Software & Digital Products" },
  { path: "/video", label: "Video Post-Production & Color Grading" },
  { path: "/web", label: "Web Ecosystems" },
  { path: "/systems", label: "Business Systems & Automation" },
  { path: "/perfect-pack", label: "Perfect Pack (DaVinci Resolve)" },
  { path: "/contact", label: "Contact & Inquiries" },
] as const;

export const ONLINE_OFFLINE_BOUNDARY = {
  publicOnlineEcholess: "You are the public-facing assistant embedded in this portfolio website. Your role is to introduce visitors to Devicharan, answer questions about his products, post-production experience, and systems, and offer direct verified navigation links.",
  privateOfflineEcholess: "A separate, private offline environment running on Devicharan's personal workstation for confidential files, private automations, multimodal desktop tools, and local PDF processing. You cannot access his workstation, file system, or private tools.",
} as const;

/**
 * Returns a consolidated, clean markdown representation of verified portfolio facts.
 * Suitable for injection into any provider's system prompt or context window.
 */
export function getVerifiedKnowledgeBase(): string {
  return `# VERIFIED KNOWLEDGE BASE: GEDDADA DEVICHARAN

## 1. IDENTITY & CONTACT
- Name: ${DEVICHARAN_IDENTITY.fullName} (${DEVICHARAN_IDENTITY.preferredName})
- Handle: ${DEVICHARAN_IDENTITY.onlineHandle}
- Role: ${DEVICHARAN_IDENTITY.currentRole}
- Location: ${DEVICHARAN_IDENTITY.location}
- Email: ${PUBLIC_LINKS.email}
- WhatsApp: ${PUBLIC_LINKS.whatsApp}
- LinkedIn: ${PUBLIC_LINKS.linkedin}
- GitHub: ${PUBLIC_LINKS.github}
- Instagram: ${PUBLIC_LINKS.instagram}
- Facebook: ${PUBLIC_LINKS.facebook}
- Verified CV: ${CV_METADATA.publicUrl}

## 2. FLAGSHIP SOFTWARE: EXAMFLOWOS
- Website: ${EXAMFLOW_OS_FACTS.liveUrl}
- Portfolio route: ${EXAMFLOW_OS_FACTS.portfolioPath}
- Description: Free CBT (Computer-Based Test) practice platform for AP & TS ECET, ICET, and POLYCET entrance exams.
- Metrics & Highlights: Over 10,000+ test attempts; active recall engines; topic mastery metrics; Google Drive cloud sync (users own their private study records).

## 3. VIDEO EDITING & POST-PRODUCTION
- Volume: ${VIDEO_POST_PRODUCTION_FACTS.scope}
- Primary Tool: ${VIDEO_POST_PRODUCTION_FACTS.primaryTool}
- Specializations: Node-based color grading (DWG/ACES workflows), Fusion motion design, Fairlight audio mastering (dialogue restoration, loudness compliance), narrative pacing.
- Portfolio route: ${VIDEO_POST_PRODUCTION_FACTS.portfolioPath}

## 4. CREATIVE TOOLKIT: PERFECT PACK
- Description: ${PERFECT_PACK_FACTS.description}
- Target: ${PERFECT_PACK_FACTS.targetAudience}
- Portfolio route: ${PERFECT_PACK_FACTS.portfolioPath}

## 5. CLIENT & ECOSYSTEM SYSTEMS
- Annapurna Foundation: Non-profit organization in AP; Devicharan architected and maintains their complete web infrastructure and public donor portal pro bono.
- Sri Lahari Studios: 10-year operating studio in Kothavalasa & Chinnamushidiwada; Devicharan engineered their digital operating system (Sri Lahari Studios OS), lead routing webhooks, and local SEO.

## 6. TECHNICAL STACK & DISCIPLINES
- Web & Software: TypeScript, JavaScript, React, Next.js, Node.js, Express, Tailwind CSS, Vite, HTML5, CSS3, Git.
- Post-Production: DaVinci Resolve Studio, Node-based Color Grading, Fusion, Fairlight, Sound Design.
- Automation: n8n, Webhook Pipelines, REST APIs, Automation Scripts.

## 7. EDUCATION & INDUSTRIAL TRAINING
- Education: Final-year B.Tech in Electrical & Electronics Engineering (AU affiliated college). Prior Diploma in EEE from M.R.A.G.R. Government Polytechnic, Vizianagaram.
- Industrial Training: BHEL Visakhapatnam (heavy electrical systems); HMIES Solutions with APSCHE (MATLAB modeling, 2025); Ahalya Industrial (Renewable energy workshop, 2024).

## 8. ONLINE VS OFFLINE SYSTEM BOUNDARY
- Public Online Echoless (This AI): Embedded in this web portfolio. Discusses public portfolio work, provides links, guides visitors.
- Private Offline Echoless: Runs on Devicharan's personal local computer for private tasks, local file system actions, and private laptop tools. Public Echoless cannot run local desktop tools or access private machine files.`;
}
