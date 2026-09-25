/**
 * Echoless Deterministic Knowledge Layer — Typed Verified Facts
 * 
 * Every fact here is verified against public portfolio records for Geddada Devicharan.
 * The sentence generation layer MUST ONLY compose sentences from these verified facts.
 * If a fact does not exist here: DO NOT SAY IT.
 */

export interface TypedFact {
  id: string;
  entityId: string;
  attribute: string;
  value: string | string[] | number | boolean;
  verified: boolean;
  category: 'identity' | 'metric' | 'feature' | 'technology' | 'relationship' | 'contact' | 'training' | 'scope' | 'education';
  description?: string;
}

export const VERIFIED_FACTS: TypedFact[] = [
  // -------------------------------------------------------------
  // DEVICHARAN (PERSON / IDENTITY)
  // -------------------------------------------------------------
  {
    id: 'dc_full_name',
    entityId: 'devicharan',
    attribute: 'full_name',
    value: 'Geddada Devicharan',
    verified: true,
    category: 'identity',
    description: 'Full legal name',
  },
  {
    id: 'dc_preferred_name',
    entityId: 'devicharan',
    attribute: 'preferred_name',
    value: 'Devicharan',
    verified: true,
    category: 'identity',
    description: 'Preferred conversational name',
  },
  {
    id: 'dc_handle',
    entityId: 'devicharan',
    attribute: 'handle',
    value: '@imdvichrn',
    verified: true,
    category: 'identity',
    description: 'Universal online social handle',
  },
  {
    id: 'dc_role',
    entityId: 'devicharan',
    attribute: 'role',
    value: 'Digital Product Builder, Video Editor / Post-Production Specialist, and Business Systems Creator',
    verified: true,
    category: 'identity',
    description: 'Core professional disciplines',
  },
  {
    id: 'dc_location',
    entityId: 'devicharan',
    attribute: 'location',
    value: 'Visakhapatnam & Vizianagaram, Andhra Pradesh, India',
    verified: true,
    category: 'identity',
    description: 'Primary geographic location',
  },
  {
    id: 'dc_email',
    entityId: 'devicharan',
    attribute: 'email',
    value: 'devicharangeddada@gmail.com',
    verified: true,
    category: 'contact',
    description: 'Official direct contact email',
  },
  {
    id: 'dc_whatsapp',
    entityId: 'devicharan',
    attribute: 'whatsapp_number',
    value: '+91 6303468707',
    verified: true,
    category: 'contact',
    description: 'Official direct WhatsApp phone number',
  },
  {
    id: 'dc_education_btech',
    entityId: 'devicharan',
    attribute: 'education_degree',
    value: 'B.Tech in Electrical and Electronics Engineering (Final Year)',
    verified: true,
    category: 'education',
    description: 'Undergraduate degree program',
  },
  {
    id: 'dc_education_btech_inst',
    entityId: 'devicharan',
    attribute: 'education_institution',
    value: 'Andhra University Affiliated Engineering College, Visakhapatnam',
    verified: true,
    category: 'education',
    description: 'Undergraduate university affiliation',
  },
  {
    id: 'dc_education_diploma',
    entityId: 'devicharan',
    attribute: 'diploma_degree',
    value: 'Diploma in Electrical and Electronics Engineering',
    verified: true,
    category: 'education',
    description: 'State polytechnic diploma',
  },
  {
    id: 'dc_education_diploma_inst',
    entityId: 'devicharan',
    attribute: 'diploma_institution',
    value: 'M.R.A.G.R. Government Polytechnic, Vizianagaram',
    verified: true,
    category: 'education',
    description: 'Polytechnic institute',
  },
  {
    id: 'dc_training_bhel',
    entityId: 'devicharan',
    attribute: 'industrial_training_bhel',
    value: 'Bharat Heavy Electricals Limited (BHEL), Visakhapatnam (Heavy electrical systems, industrial manufacturing, and safety protocols)',
    verified: true,
    category: 'training',
    description: 'Industrial practical training',
  },
  {
    id: 'dc_training_hmies',
    entityId: 'devicharan',
    attribute: 'industrial_internship_hmies',
    value: 'HMIES Solutions in collaboration with APSCHE (MATLAB computational modeling, control systems, and simulation)',
    verified: true,
    category: 'training',
    description: 'State-certified computational internship',
  },
  {
    id: 'dc_training_ahalya',
    entityId: 'devicharan',
    attribute: 'technical_workshop_ahalya',
    value: 'Ahalya Industrial Workshop (Renewable Energy Systems and power conversion)',
    verified: true,
    category: 'training',
    description: 'Renewable energy practical workshop',
  },

  // -------------------------------------------------------------
  // EXAMFLOWOS (SOFTWARE PRODUCT)
  // -------------------------------------------------------------
  {
    id: 'examflow_name',
    entityId: 'examflowos',
    attribute: 'name',
    value: 'ExamFlowOS',
    verified: true,
    category: 'identity',
    description: 'Product name',
  },
  {
    id: 'examflow_type',
    entityId: 'examflowos',
    attribute: 'type',
    value: 'Free CBT Practice & Study Operating System',
    verified: true,
    category: 'feature',
    description: 'Product category',
  },
  {
    id: 'examflow_cost',
    entityId: 'examflowos',
    attribute: 'cost',
    value: '100% Free (no paywalls, no subscriptions)',
    verified: true,
    category: 'feature',
    description: 'Pricing model',
  },
  {
    id: 'examflow_total_users',
    entityId: 'examflowos',
    attribute: 'total_users',
    value: '10K+',
    verified: true,
    category: 'metric',
    description: 'Total user / test attempt scale across AP and Telangana',
  },
  {
    id: 'examflow_active_users',
    entityId: 'examflowos',
    attribute: 'active_users',
    value: '~700',
    verified: true,
    category: 'metric',
    description: 'Regular active users studying on the platform',
  },
  {
    id: 'examflow_exams',
    entityId: 'examflowos',
    attribute: 'supported_exams',
    value: ['ECET', 'POLYCET', 'ICET'],
    verified: true,
    category: 'feature',
    description: 'Target state entrance examinations in AP & Telangana',
  },
  {
    id: 'examflow_regions',
    entityId: 'examflowos',
    attribute: 'target_regions',
    value: ['Andhra Pradesh', 'Telangana'],
    verified: true,
    category: 'feature',
    description: 'Target geographic regions',
  },
  {
    id: 'examflow_sync',
    entityId: 'examflowos',
    attribute: 'sync_architecture',
    value: 'Google Drive Cloud Sync — students own and control their own study records',
    verified: true,
    category: 'technology',
    description: 'Decentralized data ownership mechanism',
  },
  {
    id: 'examflow_features',
    entityId: 'examflowos',
    attribute: 'core_features',
    value: [
      'Realistic computer-based test (CBT) interface matching official entrance exam layouts',
      'Active recall question engines and topic-by-topic mastery tracking',
      'Instant score analytics with time-per-question metrics',
      'Granular mistake review dashboards',
    ],
    verified: true,
    category: 'feature',
    description: 'Key user-facing features',
  },
  {
    id: 'examflow_live_url',
    entityId: 'examflowos',
    attribute: 'live_url',
    value: 'https://examflowos.in',
    verified: true,
    category: 'contact',
    description: 'Live production URL',
  },
  {
    id: 'examflow_portfolio_path',
    entityId: 'examflowos',
    attribute: 'portfolio_path',
    value: '/software',
    verified: true,
    category: 'identity',
    description: 'Internal portfolio route',
  },

  // -------------------------------------------------------------
  // VIDEO POST-PRODUCTION & COLOR GRADING
  // -------------------------------------------------------------
  {
    id: 'video_name',
    entityId: 'video',
    attribute: 'name',
    value: 'Video Post-Production & Color Grading',
    verified: true,
    category: 'identity',
    description: 'Domain name',
  },
  {
    id: 'video_scope',
    entityId: 'video',
    attribute: 'scope',
    value: '700+ commercial, narrative, wedding, corporate, and creative video deliverables completed',
    verified: true,
    category: 'scope',
    description: 'Completed volume of client and creative projects',
  },
  {
    id: 'video_deliverables_count',
    entityId: 'video',
    attribute: 'deliverables_count',
    value: '700+',
    verified: true,
    category: 'metric',
    description: 'Total video deliverables count',
  },
  {
    id: 'video_primary_tool',
    entityId: 'video',
    attribute: 'primary_tool',
    value: 'DaVinci Resolve Studio',
    verified: true,
    category: 'technology',
    description: 'Primary NLE and grading suite',
  },
  {
    id: 'video_color_grading',
    entityId: 'video',
    attribute: 'color_grading_competencies',
    value: 'Node-based Color Grading using ACES, DaVinci Wide Gamut (DWG), and Color Space Transforms',
    verified: true,
    category: 'technology',
    description: 'Color science pipeline',
  },
  {
    id: 'video_motion_graphics',
    entityId: 'video',
    attribute: 'motion_graphics',
    value: 'Fusion Motion Graphics (clean lower thirds, title sequences, tracked UI elements, kinetic transitions)',
    verified: true,
    category: 'technology',
    description: 'VFX and motion graphics suite',
  },
  {
    id: 'video_audio_post',
    entityId: 'video',
    attribute: 'audio_post_production',
    value: 'Fairlight Audio Engineering (dialogue isolation, spectral repair, and broadcast loudness normalization)',
    verified: true,
    category: 'technology',
    description: 'Audio restoration and mixing',
  },
  {
    id: 'video_portfolio_path',
    entityId: 'video',
    attribute: 'portfolio_path',
    value: '/video',
    verified: true,
    category: 'identity',
    description: 'Internal portfolio route',
  },

  // -------------------------------------------------------------
  // PERFECT PACK (DAVINCI RESOLVE TOOLKIT)
  // -------------------------------------------------------------
  {
    id: 'perfectpack_name',
    entityId: 'perfect_pack',
    attribute: 'name',
    value: 'Perfect Pack',
    verified: true,
    category: 'identity',
    description: 'Toolkit product name',
  },
  {
    id: 'perfectpack_type',
    entityId: 'perfect_pack',
    attribute: 'type',
    value: 'Professional asset, power grade, and transition toolkit crafted for DaVinci Resolve Studio creators',
    verified: true,
    category: 'feature',
    description: 'Product nature',
  },
  {
    id: 'perfectpack_target',
    entityId: 'perfect_pack',
    attribute: 'target_audience',
    value: 'Video editors, colorists, and motion designers seeking cinematic workflows without software bloat',
    verified: true,
    category: 'relationship',
    description: 'Target creator persona',
  },
  {
    id: 'perfectpack_portfolio_path',
    entityId: 'perfect_pack',
    attribute: 'portfolio_path',
    value: '/perfect-pack',
    verified: true,
    category: 'identity',
    description: 'Internal portfolio route',
  },

  // -------------------------------------------------------------
  // ANNAPURNA FOUNDATION (PRO BONO NGO PARTNERSHIP)
  // -------------------------------------------------------------
  {
    id: 'annapurna_name',
    entityId: 'annapurna_foundation',
    attribute: 'name',
    value: 'Annapurna Foundation',
    verified: true,
    category: 'identity',
    description: 'NGO name',
  },
  {
    id: 'annapurna_type',
    entityId: 'annapurna_foundation',
    attribute: 'type',
    value: 'Non-governmental organisation (NGO) operating hands-on community service initiatives in Andhra Pradesh',
    verified: true,
    category: 'relationship',
    description: 'Organization type',
  },
  {
    id: 'annapurna_initiatives',
    entityId: 'annapurna_foundation',
    attribute: 'initiatives',
    value: [
      'Project Annapurna (Food Seva — distributing meals to underserved individuals and families)',
      'Project GoSeva (Cattle Care — fodder, shelter, and medical assistance for cows)',
      'Project Saraswati Devi (School Sanitation — hygiene and clean facilities for rural students)',
      'Project Street Dogs (Animal Welfare — feeding drives and compassionate rescue care)',
    ],
    verified: true,
    category: 'feature',
    description: 'Four dedicated community service programs',
  },
  {
    id: 'annapurna_devicharan_work',
    entityId: 'annapurna_foundation',
    attribute: 'devicharan_contribution',
    value: 'Engineered and maintains the complete digital web ecosystem, donation workflows, information architecture, video documentation, and public presence pro bono',
    verified: true,
    category: 'relationship',
    description: 'Devicharan role & contribution',
  },
  {
    id: 'annapurna_portfolio_path',
    entityId: 'annapurna_foundation',
    attribute: 'portfolio_path',
    value: '/project/annapurna-foundation',
    verified: true,
    category: 'identity',
    description: 'Internal case study route',
  },

  // -------------------------------------------------------------
  // SRI LAHARI STUDIOS (CLIENT / MANAGED ECOSYSTEM)
  // -------------------------------------------------------------
  {
    id: 'srilahari_name',
    entityId: 'sri_lahari_studios',
    attribute: 'name',
    value: 'Sri Lahari Studios',
    verified: true,
    category: 'identity',
    description: 'Studio name',
  },
  {
    id: 'srilahari_background',
    entityId: 'sri_lahari_studios',
    attribute: 'background',
    value: 'A decade-old creative photography and videography studio operating in Kothavalasa & Chinnamushidiwada',
    verified: true,
    category: 'relationship',
    description: 'Studio background',
  },
  {
    id: 'srilahari_contribution',
    entityId: 'sri_lahari_studios',
    attribute: 'devicharan_contribution',
    value: 'Built Sri Lahari Studios OS — a custom digital operations infrastructure integrating automated client inquiry routing, delivery workflows, and local search presence',
    verified: true,
    category: 'relationship',
    description: 'Devicharan systems development for studio',
  },

  // -------------------------------------------------------------
  // WEB ECOSYSTEMS (MANAGED WEBSITES & DIGITAL PRESENCE)
  // -------------------------------------------------------------
  {
    id: 'web_name',
    entityId: 'web_ecosystems',
    attribute: 'name',
    value: 'Web Ecosystems & Development',
    verified: true,
    category: 'identity',
    description: 'Discipline name',
  },
  {
    id: 'web_managed_count',
    entityId: 'web_ecosystems',
    attribute: 'managed_websites_count',
    value: '8+ active business websites',
    verified: true,
    category: 'metric',
    description: 'Number of actively maintained client and organization websites',
  },
  {
    id: 'web_stack',
    entityId: 'web_ecosystems',
    attribute: 'technologies',
    value: ['TypeScript', 'JavaScript (ESNext)', 'React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'Vite', 'HTML5', 'CSS3'],
    verified: true,
    category: 'technology',
    description: 'Modern frontend and web development stack',
  },
  {
    id: 'web_design_principles',
    entityId: 'web_ecosystems',
    attribute: 'design_principles',
    value: 'Clean editorial typography, high-contrast readability, zero-pill UI discipline, sub-second load times, structured JSON-LD SEO schemas',
    verified: true,
    category: 'feature',
    description: 'UI/UX and architectural standard',
  },
  {
    id: 'web_portfolio_path',
    entityId: 'web_ecosystems',
    attribute: 'portfolio_path',
    value: '/web',
    verified: true,
    category: 'identity',
    description: 'Internal web portfolio route',
  },

  // -------------------------------------------------------------
  // BUSINESS SYSTEMS & AUTOMATION
  // -------------------------------------------------------------
  {
    id: 'systems_name',
    entityId: 'business_systems',
    attribute: 'name',
    value: 'Business Systems & Automation',
    verified: true,
    category: 'identity',
    description: 'Discipline name',
  },
  {
    id: 'systems_automation_stack',
    entityId: 'business_systems',
    attribute: 'automation_stack',
    value: ['n8n Workflow Automation', 'Webhooks & REST APIs', 'Zapier', 'Operational CRMs', 'Lead Routing Pipelines'],
    verified: true,
    category: 'technology',
    description: 'Automation and backend workflow stack',
  },
  {
    id: 'systems_portfolio_path',
    entityId: 'business_systems',
    attribute: 'portfolio_path',
    value: '/systems',
    verified: true,
    category: 'identity',
    description: 'Internal systems route',
  },

  // -------------------------------------------------------------
  // CV / RESUME DOCUMENT
  // -------------------------------------------------------------
  {
    id: 'cv_name',
    entityId: 'cv',
    attribute: 'name',
    value: 'Official Curriculum Vitae',
    verified: true,
    category: 'identity',
    description: 'Official verified resume document',
  },
  {
    id: 'cv_file_name',
    entityId: 'cv',
    attribute: 'file_name',
    value: 'Geddada_Devicharan_CV.pdf',
    verified: true,
    category: 'feature',
    description: 'File name',
  },
  {
    id: 'cv_file_size',
    entityId: 'cv',
    attribute: 'file_size',
    value: '~3.52 MB',
    verified: true,
    category: 'metric',
    description: 'Approximate PDF download size',
  },
  {
    id: 'cv_path',
    entityId: 'cv',
    attribute: 'download_url',
    value: '/Geddada_Devicharan_CV.pdf',
    verified: true,
    category: 'contact',
    description: 'Direct PDF download link',
  },
];

// Helper Query Functions
export function getFact(entityId: string, attribute: string): TypedFact | undefined {
  return VERIFIED_FACTS.find(
    (f) => f.entityId.toLowerCase() === entityId.toLowerCase() && f.attribute.toLowerCase() === attribute.toLowerCase()
  );
}

export function getFactsByEntity(entityId: string): TypedFact[] {
  return VERIFIED_FACTS.filter(
    (f) => f.entityId.toLowerCase() === entityId.toLowerCase()
  );
}

export function getVerifiedFacts(entityId: string): TypedFact[] {
  return VERIFIED_FACTS.filter(
    (f) => f.entityId.toLowerCase() === entityId.toLowerCase() && f.verified
  );
}

export function findFact(predicate: (fact: TypedFact) => boolean): TypedFact | undefined {
  return VERIFIED_FACTS.find(predicate);
}

export function getFactValue<T = any>(entityId: string, attribute: string, fallback: T): T {
  const fact = getFact(entityId, attribute);
  return fact ? (fact.value as unknown as T) : fallback;
}
