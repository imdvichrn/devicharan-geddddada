import { useState } from 'react';
import { SEOHead } from '@/components/SEOHead';
import { 
  Zap, 
  Brain, 
  Activity, 
  Terminal, 
  Sun, 
  Wind, 
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';

interface ExperimentItem {
  id: string;
  category: 'software' | 'psychology' | 'energy' | 'biohacking' | 'longevity';
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  methodology: string;
  status: string;
  learnings: string[];
  isPersonalCuriosity?: boolean;
}

const experiments: ExperimentItem[] = [
  {
    id: 'sm2-cbt-recall',
    category: 'psychology',
    categoryLabel: 'Cognitive Psychology',
    title: 'Adaptive Spaced Repetition for Competitive Exam Syllabi',
    subtitle: 'Applying Ebbinghaus Forgetting Curves & SM-2 to Student Test Prep',
    description: 'Investigating how algorithmic review scheduling can be embedded into standard Computer-Based Testing without overwhelming student cognitive bandwidth. Tested directly inside ExamFlowOS.',
    methodology: 'Built a lightweight adaptation of the SuperMemo SM-2 algorithm tracking individual question confidence, answer latency, and revision intervals across 10,000+ student sessions.',
    status: 'Implemented in ExamFlowOS',
    learnings: [
      'Strict punishment for missed days destroys user habit loops; forgiving buffer days increased retention by 42%.',
      'Categorizing topics into 3 simple states (Weak, Moderate, Mastered) was 3x more effective than granular 5-star ratings.',
      'Active recall with instant answer justification reduced revision cycle time from 14 days to 6 days.'
    ]
  },
  {
    id: 'local-cli-davinci-automation',
    category: 'software',
    categoryLabel: 'Software & Automation',
    title: 'DaVinci Resolve Timeline Automation & Batch Asset Ingestion',
    subtitle: 'Python / Lua Scripting for macOS Post-Production Pipelines',
    description: 'Building custom macOS terminal utilities and Python scripts using the DaVinci Resolve Studio API to automate repetitive timeline setups, subtitle formatting, and batch proxy exports.',
    methodology: 'Integrated the DaVinci Resolve Scripting API into local shell scripts to auto-generate color-tagged bin hierarchies, apply standardized audio compressor settings, and export delivery packages.',
    status: 'Active Local Tooling',
    learnings: [
      'Automating timeline folder bin setup saved ~8 minutes per client project across 700+ deliverables.',
      'DRFX macro bundles are significantly more resilient to software updates than raw timeline templates.',
      'Standardized LUT transforms applied via scripting prevent human error in color space matching.'
    ]
  },
  {
    id: 'mppt-solar-microgrid',
    category: 'energy',
    categoryLabel: 'Clean Energy & EEE',
    title: 'Maximum Power Point Tracking (MPPT) & Photovoltaic Inverter Efficiency',
    subtitle: 'Grounded in B.Tech Electrical & Electronics Engineering & Ahalya Workshop',
    description: 'Investigating solar cell efficiency curves, perturb-and-observe MPPT algorithms, and inverter topologies for decentralized solar-wind hybrid microgrids.',
    methodology: 'Simulated perturb-and-observe MPPT algorithms in MATLAB/Simulink and evaluated photovoltaic voltage-current (V-I) non-linear characteristics under partial shading conditions during industrial training.',
    status: 'Academic & Practical Study',
    learnings: [
      'Partial shading causes multiple local maxima on P-V curves; conventional perturb-and-observe can get trapped without global sweep logic.',
      'Hybrid wind-solar setups require balanced DC-bus regulation to prevent battery overcharging during simultaneous peak irradiance and wind velocity.',
      'Power electronics converter efficiency is the single greatest determinant of decentralized renewable economics.'
    ]
  },
  {
    id: 'circadian-focus-stamina',
    category: 'biohacking',
    categoryLabel: 'Human Optimization (Personal Curiosity)',
    title: 'Circadian Phase Tracking, Sleep Architecture & Cognitive Stamina',
    subtitle: 'Self-Directed Biohacking & Daily Cognitive Performance Protocols',
    description: 'Personal, self-directed exploration of circadian light exposure, sleep architecture optimization, and cold thermogenesis to maintain sustained focus across 12+ hour engineering and editing sprints.',
    methodology: 'Logged subjective cognitive stamina against strict light exposure timing (early morning outdoor sunlight within 30 min of waking), sleep cycle consistency, and targeted caffeine delay.',
    status: 'Ongoing Self-Experimentation',
    isPersonalCuriosity: true,
    learnings: [
      'Delaying caffeine intake 90–120 minutes post-waking prevented the afternoon cortisol crash entirely.',
      'Consistent wake-up times within a 30-minute window improved deep sleep percentage more than total sleep duration.',
      'Note: This is personal self-experimentation and self-directed study, not medical advice or institutional health credentials.'
    ]
  },
  {
    id: 'cellular-longevity-senescence',
    category: 'longevity',
    categoryLabel: 'Longevity Science (Personal Reading)',
    title: 'Cellular Senescence, NAD+ Precursors & Caloric Modulation Research',
    subtitle: 'Tracking Peer-Reviewed Literature in Healthspan & Longevity',
    description: 'Tracking ongoing academic research in molecular biology regarding cellular senescence, autophagy triggers, mitochondrial biogenesis, and metabolic signaling pathways.',
    methodology: 'Reading peer-reviewed papers (Cell, Nature, GeroScience) and synthesizing research notes on mTOR inhibition, AMP-activated protein kinase (AMPK) activation, and sirtuin regulation.',
    status: 'Self-Directed Literature Review',
    isPersonalCuriosity: true,
    learnings: [
      'Autophagy signaling is most effectively stimulated through structured fasting windows combined with resistance training.',
      'Mitigating systemic chronic inflammation appears to be the primary lever for sustained executive function over decades.',
      'Clear boundary: purely intellectual personal study, separate from medical or clinical practice.'
    ]
  }
];

export function ExperimentsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredExperiments = activeCategory === 'all'
    ? experiments
    : experiments.filter(e => e.category === activeCategory);

  return (
    <PageShell maxWidth="default">
      <SEOHead
        title="Experiments & Research | Geddada Devicharan"
        description="Experiments in software architecture, cognitive psychology, clean energy systems, and personal optimization research by Geddada Devicharan."
        path="/experiments"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'Experiments', url: 'https://geddadadevicharan.vercel.app/experiments' }
        ]}
      />

      <main className="space-y-10">
        
        {/* Header Window */}
        <div className="border border-border/60 rounded-xl bg-card/60 backdrop-blur-sm p-6 sm:p-8 space-y-4">
          <WindowChrome className="mb-2" />
          <div className="space-y-2">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Product Lab · Engineering & Personal Inquiries
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Experiments & Exploration
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Software prototypes, cognitive learning models, clean energy research from electrical engineering, and disciplined personal self-experimentation.
            </p>
          </div>

          {/* Responsibility Banner: Disclosing personal reading vs professional credentials */}
          <div className="p-3 rounded-lg bg-muted/40 border border-border/40 flex items-start gap-2.5 text-xs text-muted-foreground">
            <Info size={15} className="text-primary shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-foreground font-medium">Clarity Note:</strong> Professional qualifications (B.Tech Electrical & Electronics Engineering, Diploma, BHEL industrial training, software & video systems) are strictly distinguished from personal biohacking and longevity research, which represent self-directed intellectual curiosity and personal habit experiments, not medical credentials.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/40">
            {[
              { id: 'all', label: 'All Experiments' },
              { id: 'software', label: 'Software & Tooling' },
              { id: 'psychology', label: 'Cognitive Psychology' },
              { id: 'energy', label: 'Clean Energy & EEE' },
              { id: 'biohacking', label: 'Human Optimization' },
              { id: 'longevity', label: 'Longevity Science' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveCategory(f.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                  activeCategory === f.id
                    ? 'bg-foreground text-background shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Experiment Cards */}
        <div className="space-y-6">
          {filteredExperiments.map((exp) => (
            <article 
              key={exp.id}
              className="border border-border/50 rounded-xl bg-card/40 backdrop-blur-xs p-6 sm:p-7 space-y-4 hover:border-border transition-colors"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-primary font-medium">{exp.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-[11px] text-foreground/80">{exp.status}</span>
                  {exp.isPersonalCuriosity && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-500/90 text-[11px]">Personal Study</span>
                    </>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {exp.title}
                </h2>
                <p className="text-xs sm:text-sm font-mono text-muted-foreground">
                  {exp.subtitle}
                </p>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {exp.description}
              </p>

              {/* Methodology */}
              <div className="p-3.5 rounded-lg bg-background/60 border border-border/40 text-xs sm:text-sm space-y-1">
                <span className="font-semibold text-foreground text-xs uppercase tracking-wider font-mono">
                  Method & Approach
                </span>
                <p className="text-muted-foreground leading-relaxed">{exp.methodology}</p>
              </div>

              {/* Core Learnings / Observations */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold text-foreground tracking-wide font-mono uppercase">
                  Observed Learnings & Principles
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground list-disc pl-5">
                  {exp.learnings.map((learning, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">
                      {learning}
                    </li>
                  ))}
                </ul>
              </div>

            </article>
          ))}
        </div>

      </main>
    </PageShell>
  );
}
export default ExperimentsPage;
