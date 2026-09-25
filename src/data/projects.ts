export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  challenge: string;
  outcome: string;
  youtubeEmbedId?: string;
  additionalVideos?: { id: string; title: string }[];
  year: string;
  tools: string[];
  roles: string[];
  technicalDetails: string[];
  category: 'video' | 'design' | 'strategy' | 'web';
  externalLink?: string;
  credibilityBadge?: string;
}

export const projects: Project[] = [
  {
    id: 'examflow-os',
    title: 'ExamFlowOS',
    shortDescription: 'Free competitive exam preparation & CBT platform with multi-stream exam database, 10K+ total users, approximately 700 active users, and low-cost Google Drive cloud backup architecture.',
    longDescription: 'ExamFlowOS is a dedicated exam preparation and Computer-Based Testing (CBT) platform built to make competitive-exam preparation seamless, structured, and completely free for students. The platform provides comprehensive exam simulation, CBT functionality, and an extensive exam database covering multiple competitive streams across Andhra Pradesh and Telangana (including AP & TG ECET, POLYCET, ICET, and other state entrance exams). Designed, architected, and coded solo by Geddada Devicharan from frontend to cloud backups, ExamFlowOS embodies a sustainable low-cost philosophy: useful exam-preparation infrastructure should be accessible to all students without financial friction.',
    challenge: 'Competitive exam preparation forces students to juggle scattered question papers, unstructured mock tests, and inconsistent practice tools. Additionally, running a reliable platform with growing student traffic without charging fees or relying on expensive cloud databases required an innovative, sustainable architecture.',
    outcome: 'Built a full-featured, zero-friction exam command center that reached over 10,000 total users with approximately 700 active students. Created a novel Google Drive-based backup approach as part of the low-cost infrastructure strategy, allowing students to preserve their test histories and progress securely without expensive proprietary database overhead.',
    youtubeEmbedId: 'cmk8S96EDQ0',
    year: '2025–2026',
    credibilityBadge: '10K+ Users (~700 Active)',
    tools: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'CBT Engine', 'Google Drive Cloud Backup', 'Sitemap & Technical SEO'],
    roles: ['Sole Developer & Creator', 'Product Architect', 'UI/UX Designer', 'System Maintainer'],
    technicalDetails: [
      'Comprehensive CBT (Computer Based Test) examination interface mirroring official testing environments',
      'Extensive Andhra Pradesh & Telangana entrance exam database across multiple engineering and professional streams',
      'Google Drive-based cloud backup architecture designed for zero-cost, user-owned student data persistence',
      'Algorithmic revision tracking and spaced repetition topic mastery analysis',
      'Focus timer with ambient background audio generation for distraction-free study sessions',
      'Full technical SEO and sitemap indexing ensuring rapid discoverability for student search queries',
      'Offline-capable client-side persistence for seamless revision even on unstable mobile connections'
    ],
    category: 'web',
    externalLink: 'https://examflowos.in'
  },
  {
    id: 'sri-lahari-studios',
    title: 'Sri Lahari Studios — Digital Operating System',
    shortDescription: 'Building a complete digital operating system for a 10-year photo & video studio in Kothavalasa and Chinnamushidiwada: website, branding, local SEO, and automated workflows.',
    longDescription: 'Sri Lahari Studios is a premier photography, cinematography, and event production studio operating for approximately 10 years across Kothavalasa (KTV) and Chinnamushidiwada, Andhra Pradesh. Starting around 2024–2025, Geddada Devicharan stepped in to engineer and manage its complete digital business ecosystem. Moving beyond a simple static brochure site, the initiative established a cohesive digital operating system: responsive web architecture, unified logo and visual branding, active Instagram management, local search discoverability, and automated client inquiry workflows.',
    challenge: 'A decade-old established studio needed to modernize its digital footprint to reach clients across nearby towns, organize incoming wedding and shoot inquiries, and eliminate repetitive manual communication while preserving its trusted reputation.',
    outcome: 'Engineered a modern web platform and automated client communication pipeline. Strengthened local discoverability across Vizag and Vizianagaram districts, unified brand identity across physical and digital touchpoints, and streamlined client interactions.',
    youtubeEmbedId: '',
    year: '2024–2025',
    credibilityBadge: '10-Year Business OS',
    tools: ['Website Architecture', 'n8n Automation', 'Local SEO & Sitemaps', 'Brand Identity', 'Instagram Management', 'Client Workflow Systems'],
    roles: ['Digital Systems Architect', 'Web Developer', 'Brand Designer', 'Automation Specialist'],
    technicalDetails: [
      'Custom responsive studio website showcasing portfolio, equipment, and service packages',
      'Complete logo design, color palette, and visual identity system across all media',
      'Local SEO optimization targeting regional clients in Kothavalasa, Vizag, and surrounding districts',
      'Automated client communication and inquiry capture workflows to speed up response times',
      'Integrated Instagram aesthetic and content publishing strategy'
    ],
    category: 'strategy'
  },
  {
    id: 'video-editing-showcase',
    title: 'Video Editing & Post-Production (700+ Projects)',
    shortDescription: '700+ client video projects delivered using DaVinci Resolve Studio on macOS across short-form, ads, song shoots, motion design, and cinematic color grading.',
    longDescription: 'Video editing and post-production represents one of Geddada Devicharan’s deepest professional disciplines, backed by over 700 completed client projects. Operating primarily in DaVinci Resolve Studio on macOS, Devicharan handles the complete creative and technical pipeline: high-impact short-form videos, motion graphics, product advertisements, brand commercials, song shoots, and broadcast-ready finishing. His approach blends disciplined engineering with cinematic sensibility, focusing on precision pacing, node-based color science, and Fairlight audio mastering.',
    challenge: 'Executing 700+ diverse client projects while maintaining uncompromising standards for color grading, audio dynamics, narrative pacing, and platform-specific retention demands.',
    outcome: 'Consistently delivered high-performing visual assets across commercial, social, and creative sectors, recognized for dynamic rhythm, pristine audio sweetening, and bespoke motion graphics.',
    youtubeEmbedId: 'cmk8S96EDQ0',
    additionalVideos: [
      { id: 'xx0J30hHGUVaoY82', title: 'Cinematic Post-Production Showcase' },
      { id: 'mDFBTdLKwEw', title: 'Rhythmic SceneSync Editing' }
    ],
    year: '2022–2026',
    credibilityBadge: '700+ Client Projects',
    tools: ['DaVinci Resolve Studio (macOS)', 'Fusion VFX', 'Fairlight Audio', 'Motion Design', 'Node-based Color Grading'],
    roles: ['Lead Video Editor', 'Colorist', 'Motion Designer', 'Post-Production Specialist'],
    technicalDetails: [
      'Primary production workflow centered on DaVinci Resolve Studio on macOS',
      'Node-based color grading adhering to industry-standard color spaces and HDR delivery',
      'Fusion motion design for custom kinetic typography, screen replacements, and visual effects',
      'Fairlight sound design, dialogue de-noising, dynamic EQ, and multi-track audio mastering',
      'Pacing optimization tailored for short-form retention and high-engagement commercial spots'
    ],
    category: 'video'
  },
  {
    id: 'annapurna-foundation',
    title: 'Annapurna Foundation',
    shortDescription: 'Building and managing the digital presence of an organisation I genuinely care about.',
    longDescription: 'Annapurna Foundation is a dedicated NGO whose work spans multiple initiatives including food seva, school washing and sanitation, animal welfare, and community service. Geddada Devicharan contributes to the organisation through video editing and post-production, website development, website management, deployment, and ongoing digital presence.',
    challenge: 'Creating a clean, accessible digital home that documents diverse community initiatives—Project Annapurna, Project GoSeva, Project Saraswati Devi, and Project Street Dogs—with transparency and sincere presentation.',
    outcome: 'Built, deployed, and actively manage a modern web platform and media workflow that allows people to understand the organisation’s real-world initiatives and discover how to connect.',
    youtubeEmbedId: '',
    year: '2024–2026',
    credibilityBadge: 'Website · Digital Presence · Video',
    tools: ['Website Development', 'Website Management', 'Website Deployment', 'Video Editing & Post-Production', 'Digital Presence'],
    roles: ['Web Developer', 'Website Manager', 'Video Editor', 'Digital Presence Contributor'],
    technicalDetails: [
      'End-to-end website development, management, and continuous deployment for annapurna-foundation.com',
      'Video editing and post-production documenting on-the-ground food seva, school sanitation, and animal welfare',
      'Structured initiative pages covering Project Annapurna, Project GoSeva, Project Saraswati Devi, and Project Street Dogs',
      'High-performance image galleries, transparent initiative reporting, and direct contact channels'
    ],
    category: 'web',
    externalLink: 'https://annapurna-foundation.com'
  },
  {
    id: 'managed-websites',
    title: 'Managed Web Ecosystems (8+ Websites)',
    shortDescription: 'Ongoing development, management, maintenance, technical SEO, and digital workflows for 8+ business websites (excluding ExamFlowOS).',
    longDescription: 'Beyond standalone product development, Devicharan manages and maintains 8+ active websites for commercial and organizational clients. Responsibilities span full-stack web development, continuous maintenance, UI design, branding, technical SEO, sitemap architectures, and automated business integrations.',
    challenge: 'Balancing diverse client requirements across different sectors while enforcing high performance, mobile responsiveness, fast load speeds, and organic search visibility.',
    outcome: 'Established stable, high-ranking digital presences for over eight independent businesses and organizations, handling routine updates, security, and digital workflow improvements.',
    youtubeEmbedId: '',
    year: '2023–2026',
    credibilityBadge: '8+ Active Sites',
    tools: ['React', 'Next.js / Vite', 'Tailwind CSS', 'Technical SEO', 'Sitemaps', 'Web Maintenance', 'n8n'],
    roles: ['Web Developer', 'Web Ecosystem Manager', 'Technical SEO Specialist'],
    technicalDetails: [
      'Comprehensive management of 8+ independent business websites excluding ExamFlowOS',
      'End-to-end site maintenance, performance audits, and responsive UI enhancements',
      'Strategic sitemap generation, structured schema markup, and search indexing',
      'Integration of contact and lead-capture systems directly connected to business operations'
    ],
    category: 'web'
  },
  {
    id: 'business-systems-automation',
    title: 'Business Digital Systems & n8n Automation',
    shortDescription: 'Engineering practical autopilot workflows for businesses: automated client responses, email funnels, and operational efficiency.',
    longDescription: 'Devicharan builds practical digital systems that make businesses significantly easier to operate. Utilizing automation platforms like n8n alongside AI-assisted logic, he designs automated pipelines that handle client responses, email communication, repetitive data routing, and operational follow-ups. The guiding philosophy is practical autopilot: not replacing human judgment, but eliminating repetitive friction to achieve faster workflows, tighter organization, and effortless management.',
    challenge: 'Small and medium businesses frequently lose hours every day to manual, fragmented tasks: copying leads, drafting repetitive client replies, and updating spreadsheets.',
    outcome: 'Deployed robust n8n and webhook-driven workflows that streamline incoming communications, structure client requests, and automate standard responses with zero manual delay.',
    youtubeEmbedId: '',
    year: '2024–2026',
    credibilityBadge: 'Automated Operations',
    tools: ['n8n', 'Webhooks', 'REST APIs', 'Email Routing', 'AI-assisted Workflows', 'Process Optimization'],
    roles: ['Systems Architect', 'Automation Specialist'],
    technicalDetails: [
      'Custom n8n automation nodes for automated lead capture and instant notification routing',
      'Automated email workflows and transactional acknowledgment templates',
      'Information processing pipelines eliminating repetitive manual data entry',
      'AI-assisted client response drafting with human-in-the-loop oversight'
    ],
    category: 'strategy'
  },
  {
    id: 'perfect-pack',
    title: 'Perfect Pack for DaVinci Resolve',
    shortDescription: 'A paid $10 USD creative assets toolkit currently in development, featuring personalized motion design, titles, text treatments, backgrounds, and DaVinci resources.',
    longDescription: 'Perfect Pack is an upcoming paid digital product ($10 USD) currently being built by Geddada Devicharan specifically for DaVinci Resolve Studio editors. Derived from hundreds of real client editing projects, it gathers custom-crafted motion design assets, dynamic title templates, cinematic text treatments, atmospheric backgrounds, visual textures, and sound design elements into an accessible drag-and-drop package.',
    challenge: 'Most creative asset packs are either overpriced corporate bloat or generic templates that require heavy rework. The goal was to package high-utility, personalized assets created through 700+ actual projects into an affordable $10 toolkit.',
    outcome: 'Currently in active development. Features meticulously tested DRFX presets, film textures, audio cues, and title animations optimized for modern fast-paced editing workflows.',
    youtubeEmbedId: '',
    year: 'In Development (2026)',
    credibilityBadge: '$10 USD • In Development',
    tools: ['DaVinci Resolve Studio', 'Fusion VFX', 'Motion Typography', 'DRFX Presets', 'Sound Design'],
    roles: ['Creator & Lead Designer'],
    technicalDetails: [
      'Currently in active development — priced at $10 USD for lifetime access',
      'Personalized motion design assets tailored for DaVinci Resolve Studio on macOS/Windows',
      'Bespoke animated titles, typography treatments, and lower thirds',
      'Curated high-resolution texture overlays and atmospheric motion backgrounds',
      'Plug-and-play DRFX integration designed for immediate timeline drop-in'
    ],
    category: 'design',
    externalLink: '/perfect-pack'
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return projects.filter((p) => p.category === category);
}
