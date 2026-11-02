export interface ExperimentItem {
  id: string;
  category: 'software' | 'psychology' | 'energy' | 'biohacking' | 'longevity';
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  methodology: string;
  status: string;
  date: string;
  learnings: string[];
  detailedAnalysis: string[];
  relatedWorkTitle?: string;
  relatedWorkLink?: string;
  isPersonalCuriosity?: boolean;
}

export const experiments: ExperimentItem[] = [
  {
    id: 'sm2-cbt-recall',
    category: 'psychology',
    categoryLabel: 'Cognitive Psychology',
    title: 'Adaptive Spaced Repetition for Competitive Exam Syllabi',
    subtitle: 'Applying Ebbinghaus Forgetting Curves & SM-2 to Student Test Prep',
    date: '2025–2026',
    description: 'Investigating how algorithmic review scheduling can be embedded into standard Computer-Based Testing without overwhelming student cognitive bandwidth. Tested directly inside ExamFlowOS.',
    methodology: 'Built a lightweight adaptation of the SuperMemo SM-2 algorithm tracking individual question confidence, answer latency, and revision intervals across 10,000+ student sessions.',
    status: 'Implemented in ExamFlowOS',
    relatedWorkTitle: 'ExamFlowOS',
    relatedWorkLink: '/works/examflow-os',
    learnings: [
      'Strict punishment for missed days destroys user habit loops; forgiving buffer days increased retention by 42%.',
      'Categorizing topics into 3 simple states (Weak, Moderate, Mastered) was 3x more effective than granular 5-star ratings.',
      'Active recall with instant answer justification reduced revision cycle time from 14 days to 6 days.'
    ],
    detailedAnalysis: [
      'Problem Formulation: Standard mock exams only evaluate static knowledge at a single point in time, failing to account for memory decay over the multi-month preparation arc before competitive state entrance exams.',
      'Algorithmic Implementation: Implemented an adaptive decay interval where question re-prompting is scheduled based on historical error frequency and response latency rather than fixed calendar intervals.',
      'Client-Side Integration: To keep the application 100% free and offline-first, the review weights are stored in IndexedDB and periodically synchronized to student Google Drive backups.'
    ]
  },
  {
    id: 'local-cli-davinci-automation',
    category: 'software',
    categoryLabel: 'Software & Automation',
    title: 'DaVinci Resolve Timeline Automation & Batch Asset Ingestion',
    subtitle: 'Python / Lua Scripting for macOS Post-Production Pipelines',
    date: '2024–2026',
    description: 'Building custom macOS terminal utilities and Python scripts using the DaVinci Resolve Studio API to automate repetitive timeline setups, subtitle formatting, and batch proxy exports.',
    methodology: 'Integrated the DaVinci Resolve Scripting API into local shell scripts to auto-generate color-tagged bin hierarchies, apply standardized audio compressor settings, and export delivery packages.',
    status: 'Active Local Tooling',
    relatedWorkTitle: 'Perfect Pack for DaVinci Resolve',
    relatedWorkLink: '/works/perfect-pack',
    learnings: [
      'Automating timeline folder bin setup saved ~8 minutes per client project across 700+ deliverables.',
      'DRFX macro bundles are significantly more resilient to software updates than raw timeline templates.',
      'Standardized LUT transforms applied via scripting prevent human error in color space matching.'
    ],
    detailedAnalysis: [
      'Pipeline Bottlenecks: In high-volume commercial post-production, initial timeline prep (importing footage, bin organization, sync, audio track routing, color space setup) consumed 15–20% of total edit time.',
      'Scripting Architecture: Utilized DaVinci Resolve Studio’s Python API (`fusionscript`) to create automated project generation routines that scaffold video and audio tracks according to strict broadcast layout standards.',
      'Preset Packaging: Formatted reusable kinetic elements into drag-and-drop `.drfx` macro bundles which now form the core technical foundation of Perfect Pack.'
    ]
  },
  {
    id: 'mppt-solar-microgrid',
    category: 'energy',
    categoryLabel: 'Clean Energy & EEE',
    title: 'Maximum Power Point Tracking (MPPT) & Photovoltaic Inverter Efficiency',
    subtitle: 'Grounded in B.Tech Electrical & Electronics Engineering & Ahalya Workshop',
    date: '2023–2025',
    description: 'Investigating solar cell efficiency curves, perturb-and-observe MPPT algorithms, and inverter topologies for decentralized solar-wind hybrid microgrids.',
    methodology: 'Simulated perturb-and-observe MPPT algorithms in MATLAB/Simulink and evaluated photovoltaic voltage-current (V-I) non-linear characteristics under partial shading conditions during industrial training.',
    status: 'Academic & Practical Study',
    learnings: [
      'Partial shading causes multiple local maxima on P-V curves; conventional perturb-and-observe can get trapped without global sweep logic.',
      'Hybrid wind-solar setups require balanced DC-bus regulation to prevent battery overcharging during simultaneous peak irradiance and wind velocity.',
      'Power electronics converter efficiency is the single greatest determinant of decentralized renewable economics.'
    ],
    detailedAnalysis: [
      'Engineering Focus: Studying the mathematical models governing semiconductor solar cells under variable ambient temperature and solar irradiance levels.',
      'Simulink Modeling: Designed buck-boost DC-DC converter stages with pulse-width modulation (PWM) duty cycle control to dynamically lock onto maximum power points.',
      'First-Principles Systems Thinking: The rigorous mathematical framing of energy systems and feedback loops directly informs my software architecture and workflow automation philosophies.'
    ]
  },
  {
    id: 'circadian-focus-stamina',
    category: 'biohacking',
    categoryLabel: 'Human Optimization (Personal Curiosity)',
    title: 'Circadian Phase Tracking, Sleep Architecture & Cognitive Stamina',
    subtitle: 'Self-Directed Biohacking & Daily Cognitive Performance Protocols',
    date: '2024–2026',
    description: 'Personal, self-directed exploration of circadian light exposure, sleep architecture optimization, and cold thermogenesis to maintain sustained focus across 12+ hour engineering and editing sprints.',
    methodology: 'Logged subjective cognitive stamina against strict light exposure timing (early morning outdoor sunlight within 30 min of waking), sleep cycle consistency, and targeted caffeine delay.',
    status: 'Ongoing Self-Experimentation',
    isPersonalCuriosity: true,
    learnings: [
      'Delaying caffeine intake 90–120 minutes post-waking prevented the afternoon cortisol crash entirely.',
      'Consistent wake-up times within a 30-minute window improved deep sleep percentage more than total sleep duration.',
      'Note: This is personal self-experimentation and self-directed study, not medical advice or institutional health credentials.'
    ],
    detailedAnalysis: [
      'Protocol Design: Structuring daily work rhythms around ultradian 90-minute focus cycles interspersed with zero-input recovery breaks.',
      'Light Hygiene: Immediate morning ocular lux exposure to trigger cortisol awakening response, paired with red-shifted low-lux environment 2 hours prior to sleep onset.',
      'Boundary of Practice: Maintained strictly as a personal discipline inquiry and engineering productivity optimization.'
    ]
  },
  {
    id: 'cellular-longevity-senescence',
    category: 'longevity',
    categoryLabel: 'Longevity Science (Personal Reading)',
    title: 'Cellular Senescence, NAD+ Precursors & Caloric Modulation Research',
    subtitle: 'Tracking Peer-Reviewed Literature in Healthspan & Longevity',
    date: '2024–2026',
    description: 'Tracking ongoing academic research in molecular biology regarding cellular senescence, autophagy triggers, mitochondrial biogenesis, and metabolic signaling pathways.',
    methodology: 'Reading peer-reviewed papers (Cell, Nature, GeroScience) and synthesizing research notes on mTOR inhibition, AMP-activated protein kinase (AMPK) activation, and sirtuin regulation.',
    status: 'Self-Directed Literature Review',
    isPersonalCuriosity: true,
    learnings: [
      'Autophagy signaling is most effectively stimulated through structured fasting windows combined with resistance training.',
      'Mitigating systemic chronic inflammation appears to be the primary lever for sustained executive function over decades.',
      'Clear boundary: purely intellectual personal study, separate from medical or clinical practice.'
    ],
    detailedAnalysis: [
      'Literature Synthesis: Compiling summaries on the Hallmarks of Aging, particularly genomic instability, epigenetic alterations, and loss of proteostasis.',
      'Metabolic Pathway Mapping: Examining how energy-sensing networks (mTOR, AMPK, Sirtuins, IIS) interact with nutrient availability and cellular repair states.',
      'Intellectual Context: Self-directed reading for personal knowledge and long-term healthspan awareness.'
    ]
  }
];

export function getExperimentById(id: string): ExperimentItem | undefined {
  return experiments.find((e) => e.id === id);
}
