import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';
import {
  ArrowLeft,
} from 'lucide-react';
import { TableOfContents } from '@/components/TableOfContents';

const CANONICAL = 'https://geddadadevicharan.vercel.app/writing/cognitive-load-spaced-repetition-learning';
const TITLE = 'Cognitive Load, Spaced Repetition, and Learning | Devicharan Geddada';
const DESCRIPTION = 'A thoughtful essay connecting software interface design with how students learn, exploring working memory limits, active recall, and ExamFlowOS’s design loop.';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Cognitive Load, Spaced Repetition, and Learning: Designing Interfaces for the Mind',
  description: DESCRIPTION,
  datePublished: '2026-10-08',
  dateModified: '2026-10-08',
  inLanguage: 'en',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  url: CANONICAL,
  author: {
    '@type': 'Person',
    name: 'Devicharan Geddada',
    alternateName: 'imdvichrn',
    url: 'https://geddadadevicharan.vercel.app/',
  },
  publisher: {
    '@type': 'Person',
    name: 'Devicharan Geddada',
    alternateName: 'imdvichrn',
    url: 'https://geddadadevicharan.vercel.app/',
  },
  keywords: [
    'cognitive load theory',
    'spaced repetition SM-2',
    'active recall retrieval practice',
    'ExamFlowOS learning loop',
    'educational software UX design',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://geddadadevicharan.vercel.app/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Writing',
      item: 'https://geddadadevicharan.vercel.app/writing',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Cognitive Load & Spaced Repetition',
      item: CANONICAL,
    },
  ],
};

export default function CognitiveLoadAndLearning() {
  return (
    <PageShell maxWidth="default">
      <SEOHead
        title={TITLE}
        description={DESCRIPTION}
        path="/writing/cognitive-load-spaced-repetition-learning"
        ogType="article"
        ogImage="https://geddadadevicharan.vercel.app/og/og-systems.png"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app/' },
          { name: 'Writing', url: 'https://geddadadevicharan.vercel.app/writing' },
          { name: 'Cognitive Load & Spaced Repetition', url: CANONICAL }
        ]}
        structuredData={[articleSchema, breadcrumbSchema]}
      />

      <div className="w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link to="/writing" className="hover:text-foreground transition-colors">Writing</Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-foreground truncate max-w-[200px] sm:max-w-none">
              Cognitive Load &amp; Learning
            </li>
          </ol>
        </nav>

        {/* Back Link */}
        <Link
          to="/writing"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Writing
        </Link>

        {/* Article Layout with Table of Contents */}
        <div className="relative flex justify-center 2xl:justify-between items-start gap-10">
          {/* Article Container */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel border border-glass-border rounded-2xl overflow-hidden flex-1 max-w-full 2xl:max-w-[880px]"
          >
          <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border bg-background/40">
            <WindowChrome />
            <span className="text-xs text-muted-foreground font-mono">
              cognitive-load-learning.md
            </span>
            <div className="w-12" />
          </div>

          <div className="p-6 sm:p-10 md:p-12 space-y-10">
            
            {/* Header */}
            <header className="border-b border-border/40 pb-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-sans">
                <span className="text-primary font-medium">Cognitive Psychology / Software Design / Education</span>
                <span aria-hidden="true">·</span>
                <span>Published 2026</span>
                <span aria-hidden="true">·</span>
                <span>Devicharan Geddada</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                  Educational Design
                </span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-foreground font-sans">
                  Cognitive Load, Spaced Repetition, and Learning: Designing Interfaces for the Mind
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground font-sans">
                  How human memory limitations, retrieval practice, and active feedback loops guide user experience in educational software.
                </p>
              </div>
            </header>

            {/* Editorial Body */}
            <div className="font-editorial text-[17px] sm:text-[19px] leading-[1.75] text-foreground/90 space-y-8 tracking-[0.01em] max-w-prose">
              
              <p className="text-lg sm:text-xl text-foreground leading-relaxed italic border-l-2 border-primary/60 pl-4 py-1">
                Modern educational websites are loud. They are packed with leaderboards, flash animations, video course alerts, pop-up chat widgets, and progress badges. But human attention is a bottleneck, and simply displaying more content does not improve learning. In fact, it often prevents it.
              </p>

              <p>
                When studying cognitive psychology, we encounter a fundamental principle: our working memory is highly limited. It can only process a small handful of items at any given moment. When an interface floods a student with unnecessary visual stimuli, it consumes their limited cognitive capacity—leaving little mental energy to solve the academic problems they are actually practicing.
              </p>

              <p>
                For ExamFlowOS, this research represents a primary design guideline. By designing clean, minimal interfaces that respect cognitive load, we can focus a student’s mental stamina entirely on preparation, recall, and mastery.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                Understanding Cognitive Load
              </h2>

              <p>
                Educational psychology generally breaks cognitive load into distinct categories:
              </p>

              <ul className="space-y-4 list-disc pl-5 text-sm sm:text-base font-sans text-muted-foreground">
                <li className="pl-1">
                  <strong className="text-foreground">Intrinsic Load:</strong> The natural difficulty of the material itself (e.g., solving a complex calculus integration or thermodynamic equation). This is valuable load.
                </li>
                <li className="pl-1">
                  <strong className="text-foreground">Extraneous Load:</strong> The mental effort required to navigate a poorly designed interface (e.g., trying to find where to submit your test, dodging pop-ups, or parsing cluttered options). This is wasted load.
                </li>
              </ul>

              <p>
                Our objective as software designers is to reduce extraneous load to absolute zero, allowing the student to allocate 100% of their working memory to intrinsic problem-solving. On ExamFlowOS, the Computer-Based Testing screen is deliberately distraction-free. There are no redundant progress gauges or animated rewards. The paper is front and center, the options are clean, and the navigation is completely intuitive.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                Active Recall and the Spaced Repetition Loop
              </h2>

              <p>
                Reading a study guide or highlighting a textbook is a passive form of review that creates an illusion of competence. Real, durable memory formation occurs during <strong className="text-foreground">retrieval practice</strong>—the mental strain of forcing your brain to recall an answer from memory.
              </p>

              <p>
                To support this, educational platforms should be built as active recall systems rather than simple reading document hubs. By practicing mock exams under realistic timed conditions and receiving instantaneous, structured explanations, students trigger strong neural retention feedback.
              </p>

              <p>
                Furthermore, memory decays over a predictable curve (first formalized by Hermann Ebbinghaus). To combat this forgetting curve, we utilize spaced repetition. When a student rates their confidence in a question or subject (Weak, Moderate, or Mastered), our scheduling logic adjusts when they should revisit that specific topic. 
              </p>

              <p>
                Instead of cramming hundreds of questions in a single day, the platform distributes reviews over expanding intervals. This structured spacing guarantees that students are prompted to recall information at the exact moment of near-forgetting, optimizing long-term retention.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                Mistakes as Learning Signals
              </h2>

              <p>
                In many competitive environments, mistakes are punished. In a clean learning loop, however, mistakes are the most valuable signal in the database. 
              </p>

              <p>
                ExamFlowOS isolates these mistakes into a dedicated student Error Log. Instead of forcing students to retake a complete 100-question exam, the platform extracts only their incorrect questions, allowing them to focus their sessions directly on their specific conceptual gaps.
              </p>

              <p>
                By connecting previous year papers, realistic computer-based tests, instant descriptive explanations, and personalized spaced recall intervals, we create a complete, closed-loop learning environment. We do not make complex medical or scientific claims. We simply apply fundamental principles of cognitive science to help students prepare for their examinations with less stress and higher efficiency.
              </p>

              {/* Related Article Navigation */}
              <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-left">
                  <span className="text-xs font-mono text-muted-foreground">Next Article</span>
                  <Link to="/writing/lessons-from-700-active-users" className="block text-sm font-semibold text-primary hover:underline">
                    Lessons from 700+ Monthly Active Users →
                  </Link>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-xs font-mono text-muted-foreground">Read also</span>
                  <Link to="/writing/architecture-of-zero-cost" className="block text-sm font-semibold text-primary hover:underline">
                    The Architecture of Zero Cost →
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </motion.article>

        {/* Dynamic Table of Contents */}
        <TableOfContents />
      </div>
    </div>
  </PageShell>
);
}
