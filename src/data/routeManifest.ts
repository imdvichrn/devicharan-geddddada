export interface RouteDefinition {
  path: string;
  canonicalUrl: string;
  title: string;
  description: string;
  ogImage: string;
  keywords: string[];
  schemaType: 'WebSite' | 'CollectionPage' | 'SoftwareApplication' | 'Product' | 'CreativeWork' | 'VideoObject' | 'TechArticle' | 'BlogPosting' | 'AboutPage' | 'ContactPage';
  isCanonical: boolean;
  redirectTo?: string;
}

export const DOMAIN = 'https://geddadadevicharan.vercel.app';

export const routeManifest: RouteDefinition[] = [
  // 1. Homepage
  {
    path: '/',
    canonicalUrl: `${DOMAIN}/`,
    title: 'Geddada Devicharan — Digital Product Builder · Video Editor · Digital Systems',
    description: 'Geddada Devicharan builds digital products, digital systems and visual experiences, with a focus on thoughtful software and video.',
    ogImage: `${DOMAIN}/og/og-home.png`,
    keywords: ['Geddada Devicharan', 'imdvichrn', 'digital product builder', 'video editor', 'digital systems', 'ExamFlowOS', 'Perfect Pack'],
    schemaType: 'WebSite',
    isCanonical: true,
  },

  // 2. Works Hub
  {
    path: '/works',
    canonicalUrl: `${DOMAIN}/works`,
    title: 'Works & Case Studies — Geddada Devicharan',
    description: 'Documented case studies and digital product architecture across ExamFlowOS, DaVinci Resolve post-production, managed client websites, and business systems.',
    ogImage: `${DOMAIN}/og/og-works.png`,
    keywords: ['Geddada Devicharan works', 'ExamFlowOS case study', 'video post-production', 'managed websites', 'business systems'],
    schemaType: 'CollectionPage',
    isCanonical: true,
  },

  // 3. Disciplines: Software
  {
    path: '/software',
    canonicalUrl: `${DOMAIN}/software`,
    title: 'Software & Digital Products — Geddada Devicharan',
    description: 'Free student CBT platforms (ExamFlowOS for 10K+ students) and creative software toolkits created by Geddada Devicharan.',
    ogImage: `${DOMAIN}/og/og-software.png`,
    keywords: ['ExamFlowOS', 'CBT testing engine', 'software products', 'Google Drive cloud backup', 'Geddada Devicharan software'],
    schemaType: 'CollectionPage',
    isCanonical: true,
  },

  // 4. Disciplines: Video
  {
    path: '/video',
    canonicalUrl: `${DOMAIN}/video`,
    title: 'Video Editing & Post-Production (700+ Projects) — Geddada Devicharan',
    description: 'Commercial post-production operating in DaVinci Resolve Studio on macOS. 700+ deliverables, node-based color grading, Fusion VFX, and Fairlight audio.',
    ogImage: `${DOMAIN}/og/og-video.png`,
    keywords: ['video editing', 'color grading', 'DaVinci Resolve Studio', 'Fairlight audio', '700 deliverables', 'Geddada Devicharan video'],
    schemaType: 'CollectionPage',
    isCanonical: true,
  },

  // 5. Disciplines: Web
  {
    path: '/web',
    canonicalUrl: `${DOMAIN}/web`,
    title: 'Websites & Digital Presence — Geddada Devicharan',
    description: 'Full-stack web architecture, technical SEO, and infrastructure management for 8+ commercial web properties including Sri Lahari Studios and Annapurna Foundation.',
    ogImage: `${DOMAIN}/og/og-web.png`,
    keywords: ['managed websites', 'technical SEO', 'web development', 'Sri Lahari Studios', 'Annapurna Foundation'],
    schemaType: 'CollectionPage',
    isCanonical: true,
  },

  // 6. Disciplines: Systems
  {
    path: '/systems',
    canonicalUrl: `${DOMAIN}/systems`,
    title: 'Business Systems & Automation — Geddada Devicharan',
    description: 'Practical digital operations, event-driven webhooks, n8n automations, and inquiry routing pipelines for businesses.',
    ogImage: `${DOMAIN}/og/og-systems.png`,
    keywords: ['business systems', 'n8n automation', 'event-driven webhooks', 'inquiry routing', 'digital operations'],
    schemaType: 'CollectionPage',
    isCanonical: true,
  },

  // 7. Writing & Build Logs
  {
    path: '/writing',
    canonicalUrl: `${DOMAIN}/writing`,
    title: 'Writing & Build Logs — Geddada Devicharan',
    description: 'Engineering notes, software architecture case studies, spaced repetition research, and post-production essays by Geddada Devicharan.',
    ogImage: `${DOMAIN}/og/og-writing.png`,
    keywords: ['software architecture notes', 'build in public', 'technical SEO case study', 'spaced repetition essay'],
    schemaType: 'CollectionPage',
    isCanonical: true,
  },

  // 8. Capabilities / Skills Index
  {
    path: '/skills',
    canonicalUrl: `${DOMAIN}/skills`,
    title: 'Technical Capabilities & Disciplines — Geddada Devicharan',
    description: 'Concrete inventory of capabilities across Software Engineering, Video Post-Production, Technical SEO, and Electrical Engineering.',
    ogImage: `${DOMAIN}/og/og-skills.png`,
    keywords: ['Geddada Devicharan skills', 'software development', 'video post-production', 'B.Tech EEE'],
    schemaType: 'CollectionPage',
    isCanonical: true,
  },

  // 9. Experiments Hub
  {
    path: '/experiments',
    canonicalUrl: `${DOMAIN}/experiments`,
    title: 'Product Lab & Research Experiments — Geddada Devicharan',
    description: 'Cognitive psychology models, CLI automation, clean energy studies, and disciplined personal research experiments.',
    ogImage: `${DOMAIN}/og/og-experiments.png`,
    keywords: ['SM-2 spaced repetition', 'DaVinci CLI automation', 'circadian focus', 'product lab'],
    schemaType: 'CollectionPage',
    isCanonical: true,
  },

  // 10. About
  {
    path: '/about',
    canonicalUrl: `${DOMAIN}/about`,
    title: 'About Geddada Devicharan — Digital Product Builder · Video Editor · Digital Systems',
    description: 'Background, B.Tech EEE engineering education, systems philosophy, and work history of Geddada Devicharan (@imdvichrn).',
    ogImage: `${DOMAIN}/og/og-about.png`,
    keywords: ['About Geddada Devicharan', 'imdvichrn biography', 'B.Tech EEE JNTUK', 'digital systems engineer'],
    schemaType: 'AboutPage',
    isCanonical: true,
  },

  // 11. Contact
  {
    path: '/contact',
    canonicalUrl: `${DOMAIN}/contact`,
    title: 'Contact & Direct Communication — Geddada Devicharan',
    description: 'Get in touch with Geddada Devicharan for software collaborations, video finishing, or business systems engineering.',
    ogImage: `${DOMAIN}/og/og-contact.png`,
    keywords: ['Contact Geddada Devicharan', 'hire video editor', 'software development consulting'],
    schemaType: 'ContactPage',
    isCanonical: true,
  },

  // 12. Case Study: ExamFlowOS
  {
    path: '/works/examflow-os',
    canonicalUrl: `${DOMAIN}/works/examflow-os`,
    title: 'ExamFlowOS Case Study — Free CBT Exam Platform | Geddada Devicharan',
    description: 'Full case study on ExamFlowOS: free competitive exam CBT platform serving 10,000+ students with Google Drive cloud backup architecture.',
    ogImage: `${DOMAIN}/og/og-examflowos.png`,
    keywords: ['ExamFlowOS', 'AP ECET prep', 'TG ECET prep', 'ICET exam prep', 'CBT test simulator'],
    schemaType: 'SoftwareApplication',
    isCanonical: true,
  },

  // 13. Case Study: Perfect Pack
  {
    path: '/works/perfect-pack',
    canonicalUrl: `${DOMAIN}/works/perfect-pack`,
    title: 'Perfect Pack for DaVinci Resolve — Post-Production Toolkit | Geddada Devicharan',
    description: 'DaVinci Resolve Studio asset toolkit featuring cinematic presets, sound design, motion titles, and DRFX macros grounded in 700+ completed deliverables.',
    ogImage: `${DOMAIN}/og/og-perfectpack.png`,
    keywords: ['Perfect Pack', 'DaVinci Resolve presets', 'DRFX macros', 'editing toolkit', 'video presets'],
    schemaType: 'Product',
    isCanonical: true,
  },

  // 14. Case Study: Annapurna Foundation
  {
    path: '/works/annapurna-foundation',
    canonicalUrl: `${DOMAIN}/works/annapurna-foundation`,
    title: 'Annapurna Foundation — NGO Web & Media Operating System | Geddada Devicharan',
    description: 'Building and managing the digital presence, video media, and web platform for Annapurna Foundation non-profit.',
    ogImage: `${DOMAIN}/og/og-annapurna.png`,
    keywords: ['Annapurna Foundation', 'NGO website', 'food seva digital presence', 'Geddada Devicharan NGO work'],
    schemaType: 'CreativeWork',
    isCanonical: true,
  },

  // 15. Case Study: Video Editing Post-Production
  {
    path: '/works/video-editing-post-production',
    canonicalUrl: `${DOMAIN}/works/video-editing-post-production`,
    title: 'Video Post-Production Pipeline (700+ Deliverables) | Geddada Devicharan',
    description: 'Commercial video editing, node-based color grading, and Fairlight audio mastering in DaVinci Resolve Studio on macOS.',
    ogImage: `${DOMAIN}/og/og-video.png`,
    keywords: ['700 video projects', 'DaVinci Resolve color grading', 'Fairlight audio mastering', 'video editor Vizag'],
    schemaType: 'VideoObject',
    isCanonical: true,
  },

  // 16. Case Study: Sri Lahari Studios
  {
    path: '/works/sri-lahari-studios',
    canonicalUrl: `${DOMAIN}/works/sri-lahari-studios`,
    title: 'Sri Lahari Studios — Digital Business OS | Geddada Devicharan',
    description: 'Digital operating system, web platform, branding, local SEO, and inquiry automation for a 10-year photo and cinematography studio.',
    ogImage: `${DOMAIN}/og/og-sri-lahari.png`,
    keywords: ['Sri Lahari Studios', 'photography studio OS', 'local SEO Vizag', 'inquiry automation'],
    schemaType: 'CreativeWork',
    isCanonical: true,
  },

  // 17. Case Study: Managed Client Websites
  {
    path: '/works/managed-websites',
    canonicalUrl: `${DOMAIN}/works/managed-websites`,
    title: 'Managed Client Websites (8+ Deployments) | Geddada Devicharan',
    description: 'Full-stack development, technical SEO, 99.9% uptime maintenance, and sitemap infrastructure for 8+ business websites.',
    ogImage: `${DOMAIN}/og/og-web.png`,
    keywords: ['managed websites', 'client website engineering', 'technical SEO maintenance'],
    schemaType: 'CreativeWork',
    isCanonical: true,
  },

  // 18. Case Study: Business Systems Automation
  {
    path: '/works/business-systems-automation',
    canonicalUrl: `${DOMAIN}/works/business-systems-automation`,
    title: 'Business Systems & Workflow Automation | Geddada Devicharan',
    description: 'Event-driven webhooks, n8n automations, and lead triage pipelines eliminating operational drag.',
    ogImage: `${DOMAIN}/og/og-systems.png`,
    keywords: ['n8n automation', 'webhook pipelines', 'lead triage automation', 'business systems'],
    schemaType: 'CreativeWork',
    isCanonical: true,
  },

  // 19. Blog Article: ExamFlowOS Journey
  {
    path: '/works/examflow-os/blog/examflowos-journey',
    canonicalUrl: `${DOMAIN}/works/examflow-os/blog/examflowos-journey`,
    title: 'Building ExamFlowOS: PYQs & CBT Engine | Geddada Devicharan',
    description: 'How Geddada Devicharan (@imdvichrn) built ExamFlowOS — a structured CBT platform for AP & TG entrance exams.',
    ogImage: `${DOMAIN}/og/og-examflowos.png`,
    keywords: ['Building ExamFlowOS', 'previous year question papers', 'AP entrance exams', 'CBT practice'],
    schemaType: 'BlogPosting',
    isCanonical: true,
  },

  // 20. Blog Article: ExamFlowOS Guide
  {
    path: '/works/examflow-os/blog/examflowos-all-in-one-exam-prep-app-ap-tg-ecet-icet-polycet',
    canonicalUrl: `${DOMAIN}/works/examflow-os/blog/examflowos-all-in-one-exam-prep-app-ap-tg-ecet-icet-polycet`,
    title: 'ExamFlowOS: All-in-One AP/TG Exam Prep App Guide | Geddada Devicharan',
    description: 'Comprehensive guide to ExamFlowOS: PYQs, CBT practice, active recall, and spaced repetition for AP & TG entrance exams.',
    ogImage: `${DOMAIN}/og/og-examflowos.png`,
    keywords: ['ExamFlowOS guide', 'AP ECET study app', 'TG ECET CBT test', 'spaced repetition flashcards'],
    schemaType: 'BlogPosting',
    isCanonical: true,
  },

  // 21. Experiment Detail: SM-2 Recall
  {
    path: '/experiments/sm2-cbt-recall',
    canonicalUrl: `${DOMAIN}/experiments/sm2-cbt-recall`,
    title: 'SM-2 Spaced Repetition in CBT Prep — Experiment Note | Geddada Devicharan',
    description: 'Empirical research on memory retention curves, SM-2 scheduling, and forgiving intervals in competitive exam preparation.',
    ogImage: `${DOMAIN}/og/og-experiments.png`,
    keywords: ['SM-2 algorithm experiment', 'spaced repetition CBT', 'cognitive recall research'],
    schemaType: 'TechArticle',
    isCanonical: true,
  },

  // 22. Experiment Detail: DaVinci CLI
  {
    path: '/experiments/local-cli-davinci-automation',
    canonicalUrl: `${DOMAIN}/experiments/local-cli-davinci-automation`,
    title: 'DaVinci Resolve macOS Timeline Automation — Experiment Note | Geddada Devicharan',
    description: 'Developing Python and Lua macOS terminal utilities for automated DaVinci Resolve project setups and DRFX exports.',
    ogImage: `${DOMAIN}/og/og-experiments.png`,
    keywords: ['DaVinci Resolve scripting', 'macOS editing CLI', 'Python timeline automation'],
    schemaType: 'TechArticle',
    isCanonical: true,
  },

  // 23. Experiment Detail: Circadian Focus
  {
    path: '/experiments/circadian-focus-architecture',
    canonicalUrl: `${DOMAIN}/experiments/circadian-focus-architecture`,
    title: 'Circadian Light & Focus Architecture — Personal Experiment | Geddada Devicharan',
    description: 'Personal habit tracking on morning light timing, sleep latency, and long deep-work focus sessions.',
    ogImage: `${DOMAIN}/og/og-experiments.png`,
    keywords: ['circadian protocol', 'focus block architecture', 'deep work stamina'],
    schemaType: 'TechArticle',
    isCanonical: true,
  },

  // 24. Experiment Detail: BESS Microgrid
  {
    path: '/experiments/bess-microgrid-efficiency',
    canonicalUrl: `${DOMAIN}/experiments/bess-microgrid-efficiency`,
    title: 'Microgrid Solar PV & BESS Efficiency — EEE Study | Geddada Devicharan',
    description: 'Electrical engineering analysis of inverter conversion losses and battery storage thermal management.',
    ogImage: `${DOMAIN}/og/og-experiments.png`,
    keywords: ['solar PV microgrid', 'BESS efficiency', 'EEE power systems'],
    schemaType: 'TechArticle',
    isCanonical: true,
  },

  // Legacy Aliases (mapped to canonical targets)
  {
    path: '/work',
    canonicalUrl: `${DOMAIN}/works`,
    title: 'Works & Case Studies — Geddada Devicharan',
    description: 'Documented case studies and digital product architecture across ExamFlowOS, DaVinci Resolve post-production, managed client websites, and business systems.',
    ogImage: `${DOMAIN}/og/og-works.png`,
    keywords: ['Geddada Devicharan works'],
    schemaType: 'CollectionPage',
    isCanonical: false,
    redirectTo: '/works',
  },
  {
    path: '/projects',
    canonicalUrl: `${DOMAIN}/works`,
    title: 'Works & Case Studies — Geddada Devicharan',
    description: 'Documented case studies and digital product architecture.',
    ogImage: `${DOMAIN}/og/og-works.png`,
    keywords: ['Geddada Devicharan works'],
    schemaType: 'CollectionPage',
    isCanonical: false,
    redirectTo: '/works',
  },
  {
    path: '/project/examflow-os',
    canonicalUrl: `${DOMAIN}/works/examflow-os`,
    title: 'ExamFlowOS Case Study — Free CBT Exam Platform | Geddada Devicharan',
    description: 'Full case study on ExamFlowOS: free competitive exam CBT platform.',
    ogImage: `${DOMAIN}/og/og-examflowos.png`,
    keywords: ['ExamFlowOS'],
    schemaType: 'SoftwareApplication',
    isCanonical: false,
    redirectTo: '/works/examflow-os',
  },
  {
    path: '/projects/examflow-os',
    canonicalUrl: `${DOMAIN}/works/examflow-os`,
    title: 'ExamFlowOS Case Study — Free CBT Exam Platform | Geddada Devicharan',
    description: 'Full case study on ExamFlowOS: free competitive exam CBT platform.',
    ogImage: `${DOMAIN}/og/og-examflowos.png`,
    keywords: ['ExamFlowOS'],
    schemaType: 'SoftwareApplication',
    isCanonical: false,
    redirectTo: '/works/examflow-os',
  },
  {
    path: '/perfect-pack',
    canonicalUrl: `${DOMAIN}/works/perfect-pack`,
    title: 'Perfect Pack for DaVinci Resolve — Post-Production Toolkit | Geddada Devicharan',
    description: 'DaVinci Resolve Studio asset toolkit featuring cinematic presets.',
    ogImage: `${DOMAIN}/og/og-perfectpack.png`,
    keywords: ['Perfect Pack'],
    schemaType: 'Product',
    isCanonical: false,
    redirectTo: '/works/perfect-pack',
  },
  {
    path: '/project/perfect-pack',
    canonicalUrl: `${DOMAIN}/works/perfect-pack`,
    title: 'Perfect Pack for DaVinci Resolve — Post-Production Toolkit | Geddada Devicharan',
    description: 'DaVinci Resolve Studio asset toolkit featuring cinematic presets.',
    ogImage: `${DOMAIN}/og/og-perfectpack.png`,
    keywords: ['Perfect Pack'],
    schemaType: 'Product',
    isCanonical: false,
    redirectTo: '/works/perfect-pack',
  },
  {
    path: '/projects/perfect-pack',
    canonicalUrl: `${DOMAIN}/works/perfect-pack`,
    title: 'Perfect Pack for DaVinci Resolve — Post-Production Toolkit | Geddada Devicharan',
    description: 'DaVinci Resolve Studio asset toolkit featuring cinematic presets.',
    ogImage: `${DOMAIN}/og/og-perfectpack.png`,
    keywords: ['Perfect Pack'],
    schemaType: 'Product',
    isCanonical: false,
    redirectTo: '/works/perfect-pack',
  },
  {
    path: '/project/annapurna-foundation',
    canonicalUrl: `${DOMAIN}/works/annapurna-foundation`,
    title: 'Annapurna Foundation — NGO Web & Media Operating System | Geddada Devicharan',
    description: 'Building and managing the digital presence for Annapurna Foundation non-profit.',
    ogImage: `${DOMAIN}/og/og-annapurna.png`,
    keywords: ['Annapurna Foundation'],
    schemaType: 'CreativeWork',
    isCanonical: false,
    redirectTo: '/works/annapurna-foundation',
  },
  {
    path: '/projects/annapurna-foundation',
    canonicalUrl: `${DOMAIN}/works/annapurna-foundation`,
    title: 'Annapurna Foundation — NGO Web & Media Operating System | Geddada Devicharan',
    description: 'Building and managing the digital presence for Annapurna Foundation non-profit.',
    ogImage: `${DOMAIN}/og/og-annapurna.png`,
    keywords: ['Annapurna Foundation'],
    schemaType: 'CreativeWork',
    isCanonical: false,
    redirectTo: '/works/annapurna-foundation',
  },
  {
    path: '/project/video-editing-post-production',
    canonicalUrl: `${DOMAIN}/works/video-editing-post-production`,
    title: 'Video Post-Production Pipeline (700+ Deliverables) | Geddada Devicharan',
    description: 'Commercial video editing in DaVinci Resolve Studio.',
    ogImage: `${DOMAIN}/og/og-video.png`,
    keywords: ['video editing'],
    schemaType: 'VideoObject',
    isCanonical: false,
    redirectTo: '/works/video-editing-post-production',
  },
  {
    path: '/projects/video-editing-post-production',
    canonicalUrl: `${DOMAIN}/works/video-editing-post-production`,
    title: 'Video Post-Production Pipeline (700+ Deliverables) | Geddada Devicharan',
    description: 'Commercial video editing in DaVinci Resolve Studio.',
    ogImage: `${DOMAIN}/og/og-video.png`,
    keywords: ['video editing'],
    schemaType: 'VideoObject',
    isCanonical: false,
    redirectTo: '/works/video-editing-post-production',
  },
  {
    path: '/project/examflow-os/blog/examflowos-journey',
    canonicalUrl: `${DOMAIN}/works/examflow-os/blog/examflowos-journey`,
    title: 'Building ExamFlowOS: PYQs & CBT Engine | Geddada Devicharan',
    description: 'How Geddada Devicharan (@imdvichrn) built ExamFlowOS.',
    ogImage: `${DOMAIN}/og/og-examflowos.png`,
    keywords: ['Building ExamFlowOS'],
    schemaType: 'BlogPosting',
    isCanonical: false,
    redirectTo: '/works/examflow-os/blog/examflowos-journey',
  },
  {
    path: '/project/examflow-os/blog/examflowos-all-in-one-exam-prep-app-ap-tg-ecet-icet-polycet',
    canonicalUrl: `${DOMAIN}/works/examflow-os/blog/examflowos-all-in-one-exam-prep-app-ap-tg-ecet-icet-polycet`,
    title: 'ExamFlowOS: All-in-One AP/TG Exam Prep App Guide | Geddada Devicharan',
    description: 'Comprehensive guide to ExamFlowOS.',
    ogImage: `${DOMAIN}/og/og-examflowos.png`,
    keywords: ['ExamFlowOS guide'],
    schemaType: 'BlogPosting',
    isCanonical: false,
    redirectTo: '/works/examflow-os/blog/examflowos-all-in-one-exam-prep-app-ap-tg-ecet-icet-polycet',
  },
];
