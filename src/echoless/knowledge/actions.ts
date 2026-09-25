/**
 * Echoless Verified Action Registry
 * 
 * Actions are STRICTLY decoupled from sentence generation.
 * The sentence generation engine NEVER generates URLs in text.
 * Instead, the engine selects verified Action IDs from this registry,
 * and the UI renders clean, contextual action buttons independently.
 */

export type ActionIntent = 'social' | 'contact' | 'navigate' | 'download' | 'external_product';

export interface VerifiedAction {
  id: string;
  label: string;
  url: string;
  intent: ActionIntent;
  description: string;
  isExternal: boolean;
  category: 'social' | 'contact' | 'project' | 'portfolio' | 'document';
  aliases: string[];
}

export const VERIFIED_ACTIONS_REGISTRY: Record<string, VerifiedAction> = {
  // -------------------------------------------------------------
  // SOCIAL MEDIA CHANNELS (Deterministic Verified Links)
  // -------------------------------------------------------------
  instagram: {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/imdvichrn',
    intent: 'social',
    category: 'social',
    description: 'Instagram profile for visual craft and creative updates (@imdvichrn)',
    isExternal: true,
    aliases: [
      'instagram', 'insta', 'instgram', 'instagarm', 'ig', '@imdvichrn',
      'his instagram', 'his insta', 'instagram profile', 'instagram link',
      'devicharan instagram', 'social instagram'
    ],
  },
  github: {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/imdvichrn/imdvichrn',
    intent: 'social',
    category: 'social',
    description: 'GitHub repositories and open source software (@imdvichrn)',
    isExternal: true,
    aliases: [
      'github', 'git hub', 'git', 'github repo', 'github profile',
      'his github', 'github link', 'source code', 'devicharan github'
    ],
  },
  linkedin: {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/geddadadevicharan',
    intent: 'social',
    category: 'social',
    description: 'Professional career profile on LinkedIn',
    isExternal: true,
    aliases: [
      'linkedin', 'linkdin', 'linked in', 'linkedin profile',
      'his linkedin', 'linkedin link', 'connect on linkedin'
    ],
  },
  facebook: {
    id: 'facebook',
    label: 'Facebook',
    url: 'https://www.facebook.com/imdvichrn',
    intent: 'social',
    category: 'social',
    description: 'Facebook profile (@imdvichrn)',
    isExternal: true,
    aliases: [
      'facebook', 'facboook', 'fb', 'face book', 'facbook',
      'his facebook', 'facebook link', 'facebook profile'
    ],
  },
  twitter: {
    id: 'twitter',
    label: 'X (Twitter)',
    url: 'https://x.com/devi_charan_2004',
    intent: 'social',
    category: 'social',
    description: 'X / Twitter profile (@devi_charan_2004)',
    isExternal: true,
    aliases: [
      'twitter', 'x', 'x.com', 'tweet', 'twitter profile',
      'his twitter', 'his x', 'x profile'
    ],
  },

  // -------------------------------------------------------------
  // DIRECT CONTACT CHANNELS
  // -------------------------------------------------------------
  whatsapp: {
    id: 'whatsapp',
    label: 'WhatsApp',
    url: 'https://wa.me/916303468707',
    intent: 'contact',
    category: 'contact',
    description: 'Direct WhatsApp communication (+91 6303468707)',
    isExternal: true,
    aliases: [
      'whatsapp', 'whats app', 'wa', 'chat on whatsapp', 'message whatsapp',
      'his whatsapp', 'whatsapp number', 'whatsapp chat', 'phone'
    ],
  },
  email: {
    id: 'email',
    label: 'Email',
    url: 'mailto:devicharangeddada@gmail.com',
    intent: 'contact',
    category: 'contact',
    description: 'Direct email inbox (devicharangeddada@gmail.com)',
    isExternal: true,
    aliases: [
      'email', 'mail', 'send email', 'gmail', 'his email',
      'email address', 'contact email', 'write email'
    ],
  },
  contact: {
    id: 'contact',
    label: 'Contact & Inquiries',
    url: '/contact',
    intent: 'navigate',
    category: 'contact',
    description: 'Dedicated portfolio contact and inquiry page',
    isExternal: false,
    aliases: [
      'contact', 'contact page', 'hire', 'get in touch', 'reach out',
      'inquiry', 'message', 'collaborate', 'booking'
    ],
  },

  // -------------------------------------------------------------
  // PRODUCTS & LIVE DEMOS
  // -------------------------------------------------------------
  examflowos: {
    id: 'examflowos',
    label: 'ExamFlowOS Live',
    url: 'https://examflowos.in',
    intent: 'external_product',
    category: 'project',
    description: '100% free CBT entrance exam practice platform (10K+ users)',
    isExternal: true,
    aliases: [
      'examflow', 'examflowos', 'exam flow', 'cbt demo', 'exam platform',
      'examflowos live', 'examflowos link', 'exam app', 'exam prep', 'exam'
    ],
  },

  // -------------------------------------------------------------
  // PORTFOLIO SECTIONS & CASE STUDIES
  // -------------------------------------------------------------
  software: {
    id: 'software',
    label: 'Software & Products',
    url: '/software',
    intent: 'navigate',
    category: 'portfolio',
    description: 'Full-stack software engineering projects and applications',
    isExternal: false,
    aliases: [
      'software', 'software page', 'apps', 'coding', 'code',
      'engineering', 'developer work', 'digital products'
    ],
  },
  video: {
    id: 'video',
    label: 'Video Portfolio',
    url: '/video',
    intent: 'navigate',
    category: 'portfolio',
    description: '700+ deliverables, color grading & DaVinci Resolve case studies',
    isExternal: false,
    aliases: [
      'video', 'videos', 'video editing', 'video portfolio', 'davinci',
      'color grading', 'post production', 'editing work', 'showreel'
    ],
  },
  perfect_pack: {
    id: 'perfect_pack',
    label: 'Perfect Pack',
    url: '/perfect-pack',
    intent: 'navigate',
    category: 'project',
    description: 'DaVinci Resolve power grades, assets, and cinematic transitions',
    isExternal: false,
    aliases: [
      'perfect pack', 'perfectpack', 'powergrade', 'presets', 'transitions',
      'davinci toolkit', 'color presets'
    ],
  },
  web: {
    id: 'web',
    label: 'Web Ecosystems',
    url: '/web',
    intent: 'navigate',
    category: 'portfolio',
    description: '8+ managed business websites, high-contrast layouts and SEO',
    isExternal: false,
    aliases: [
      'web', 'websites', 'web design', 'web development', 'managed sites',
      'web architecture', 'web portfolio'
    ],
  },
  systems: {
    id: 'systems',
    label: 'Business Systems',
    url: '/systems',
    intent: 'navigate',
    category: 'portfolio',
    description: 'Automation architectures, n8n workflows, and operational CRMs',
    isExternal: false,
    aliases: [
      'systems', 'automation', 'n8n', 'workflows', 'crm',
      'business automation', 'business systems', 'zapier'
    ],
  },
  annapurna: {
    id: 'annapurna',
    label: 'Annapurna Foundation Case Study',
    url: '/project/annapurna-foundation',
    intent: 'navigate',
    category: 'project',
    description: 'Pro bono digital presence and public web ecosystem case study',
    isExternal: false,
    aliases: [
      'annapurna', 'annapurna foundation', 'ngo', 'charity project',
      'annapurna case study', 'non profit'
    ],
  },
  cv: {
    id: 'cv',
    label: 'Download CV (PDF)',
    url: '/Geddada_Devicharan_CV.pdf',
    intent: 'download',
    category: 'document',
    description: 'Official verified Curriculum Vitae document (~3.52 MB PDF)',
    isExternal: false,
    aliases: [
      'cv', 'resume', 'download cv', 'download resume', 'pdf',
      'biodata', 'curriculum vitae', 'cv pdf'
    ],
  },
};

/**
 * Get verified action by its unique ID
 */
export function getActionById(id: string): VerifiedAction | undefined {
  return VERIFIED_ACTIONS_REGISTRY[id.toLowerCase()];
}

/**
 * Get list of verified actions by IDs
 */
export function getVerifiedActions(ids: string[]): VerifiedAction[] {
  const result: VerifiedAction[] = [];
  for (const id of ids) {
    const action = getActionById(id);
    if (action && !result.some((a) => a.id === action.id)) {
      result.push(action);
    }
  }
  return result;
}

/**
 * Return all social media actions in priority order
 */
export function getAllSocialActions(): VerifiedAction[] {
  return [
    VERIFIED_ACTIONS_REGISTRY.instagram,
    VERIFIED_ACTIONS_REGISTRY.github,
    VERIFIED_ACTIONS_REGISTRY.linkedin,
    VERIFIED_ACTIONS_REGISTRY.facebook,
    VERIFIED_ACTIONS_REGISTRY.twitter,
  ].filter(Boolean);
}

/**
 * Return all direct contact actions
 */
export function getAllContactActions(): VerifiedAction[] {
  return [
    VERIFIED_ACTIONS_REGISTRY.whatsapp,
    VERIFIED_ACTIONS_REGISTRY.email,
    VERIFIED_ACTIONS_REGISTRY.contact,
  ].filter(Boolean);
}

/**
 * Resolve an action by fuzzy alias matching
 */
export function resolveActionByAlias(input: string): VerifiedAction | undefined {
  const cleanInput = input.trim().toLowerCase().replace(/[^a-z0-9\s]/g, '');
  
  for (const action of Object.values(VERIFIED_ACTIONS_REGISTRY)) {
    if (action.id === cleanInput) return action;
    for (const alias of action.aliases) {
      const cleanAlias = alias.toLowerCase().replace(/[^a-z0-9\s]/g, '');
      if (cleanInput === cleanAlias || cleanInput.includes(cleanAlias)) {
        return action;
      }
    }
  }
  
  return undefined;
}
