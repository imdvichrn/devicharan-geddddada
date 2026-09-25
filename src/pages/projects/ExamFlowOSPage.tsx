import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ChevronRight, 
  Cpu, 
  Cloud, 
  BookOpen, 
  Search, 
  Layers, 
  CheckCircle2, 
  RefreshCw, 
  Database, 
  FileText, 
  ExternalLink,
  ShieldCheck,
  Terminal,
  Activity,
  Lightbulb,
  Compass,
  Layout,
  BarChart2,
  ListOrdered
} from 'lucide-react';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';
import { generateBreadcrumbSchema, generateSoftwareApplicationSchema } from '@/lib/structuredData';

export function ExamFlowOSPage() {
  const canonicalUrl = 'https://geddadadevicharan.vercel.app/project/examflow-os';
  const logoUrl = 'https://geddadadevicharan.vercel.app/examflow-logo.jpg';
  const websiteUrl = 'https://examflowos.in';

  const title = 'ExamFlowOS — Free Exam Preparation & CBT Platform | Geddada Devicharan';
  const description = 'ExamFlowOS is a free exam-preparation and CBT platform I designed and developed for students, combining exam practice, a structured study workflow, and performance-focused tools.';

  const breadcrumbs = [
    { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
    { name: 'Work', url: 'https://geddadadevicharan.vercel.app/work' },
    { name: 'ExamFlowOS', url: canonicalUrl }
  ];

  const softwareSchemaData = {
    name: 'ExamFlowOS',
    description: 'Free competitive exam preparation and Computer-Based Testing (CBT) platform with multi-stream exam coverage for Andhra Pradesh and Telangana entrance exams.',
    url: websiteUrl,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web (Browser-based, Desktop & Mobile)',
    softwareVersion: '1.0'
  };

  const myRoles = [
    'Product Architecture',
    'UI/UX Design',
    'Frontend Development',
    'CBT System Engine',
    'Exam Database Architecture',
    'SEO & Search Discoverability',
    'Deployment',
    'Maintenance',
    'Continuous Development'
  ];

  const coreStudyLoopStages = [
    {
      num: '01',
      title: 'Paper',
      desc: 'Access structured previous year examination papers and question sets across target state entrance tests.'
    },
    {
      num: '02',
      title: 'CBT',
      desc: 'Execute practice sessions in an authentic, timed Computer-Based Testing interface mirroring real test conditions.'
    },
    {
      num: '03',
      title: 'Mistakes',
      desc: 'Isolate incorrect responses and review detailed answer breakdowns immediately post-test.'
    },
    {
      num: '04',
      title: 'Topics',
      desc: 'Map identified mistakes back to underlying syllabus units and specific subject topics.'
    },
    {
      num: '05',
      title: 'Recall',
      desc: 'Perform targeted review and active recall exercises focused specifically on flagged weakness areas.'
    },
    {
      num: '06',
      title: 'Stats',
      desc: 'Track accuracy rates, completion times, and category mastery metrics over continuous test sessions.'
    },
    {
      num: '07',
      title: 'Next Action',
      desc: 'Receive clear, structured direction on which topic to revise or which test paper to take next.'
    }
  ];

  return (
    <PageShell maxWidth="wide">
      <SEOHead
        title={title}
        description={description}
        path="/project/examflow-os"
        ogImage="https://geddadadevicharan.vercel.app/og/og-examflowos.png"
        ogType="article"
        breadcrumbs={breadcrumbs}
        structuredData={generateSoftwareApplicationSchema(softwareSchemaData)}
      />

      <main className="space-y-16 sm:space-y-24">
        
        {/* Top Wayfinding & Navigation */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/work" className="hover:text-foreground transition-colors">Work</Link>
            <ChevronRight size={12} />
            <span className="text-foreground font-medium">ExamFlowOS</span>
          </nav>

          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to Work</span>
          </Link>
        </div>

        {/* =========================================================================
            HERO
            ========================================================================= */}
        <header className="space-y-8 max-w-4xl">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary font-semibold uppercase tracking-wider border border-primary/20">
                Software · Product Case Study
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">100% Free for Students</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">2024–Present</span>
            </div>

            <div className="flex items-start gap-4 sm:gap-6 pt-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-border/80 bg-card overflow-hidden shrink-0 shadow-md">
                <img 
                  src="/examflow-logo.jpg" 
                  alt="ExamFlowOS official logo" 
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="space-y-2">
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05]">
                  ExamFlowOS
                </h1>
                <p className="text-lg sm:text-2xl font-light text-muted-foreground leading-relaxed">
                  "Free exam preparation and CBT platform built for students."
                </p>
              </div>
            </div>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            ExamFlowOS is a dedicated software product that I designed, architected, and built to give students a structured, friction-free environment for competitive exam practice, Computer-Based Testing (CBT), performance analysis, and continuous study workflows.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-sm"
            >
              <span>Visit ExamFlowOS</span>
              <ArrowUpRight size={14} />
            </a>
            <a 
              href="#study-loop"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-medium border border-border/80 hover:border-foreground/50 text-foreground transition-colors"
            >
              <span>Explore Study Loop</span>
              <ChevronRight size={14} />
            </a>
          </div>
        </header>

        {/* Hero Visual Frame */}
        <section className="space-y-4">
          <div className="border border-border/60 rounded-2xl bg-card/40 backdrop-blur-xs overflow-hidden shadow-[0_8px_32px_-4px_rgba(0,0,0,0.3)]">
            <WindowChrome 
              title="ExamFlowOS — Unified Exam Command Center (examflowos.in)"
              rightElement={
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-500 font-medium">Live Platform</span>
                </div>
              }
            />
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-muted/30">
              <img 
                src="/og/og-examflowos.png" 
                alt="ExamFlowOS interface and architecture preview" 
                className="w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex items-end p-6 sm:p-10">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
                    Product Interface & System Architecture
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/90 max-w-2xl font-normal">
                    Designed for maximum legibility and low cognitive load during intensive study sessions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roles & Responsibilities Bar */}
        <section className="p-6 sm:p-8 rounded-2xl border border-border/50 bg-card/30 space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-medium">
            MY confirmed RESPONSIBILITIES
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {myRoles.map((role) => (
              <span 
                key={role}
                className="px-3 py-1.5 rounded-lg border border-border/60 bg-background/80 text-xs font-medium text-foreground/90"
              >
                {role}
              </span>
            ))}
          </div>
        </section>

        {/* =========================================================================
            01 — WHAT IS EXAMFLOWOS?
            ========================================================================= */}
        <section className="space-y-8 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              01 · OVERVIEW
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
              What is ExamFlowOS?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p className="text-foreground font-medium">
                In simple terms: ExamFlowOS is a free browser-based study and Computer-Based Testing (CBT) platform built specifically for students preparing for competitive entrance examinations.
              </p>
              <p>
                A student visiting ExamFlowOS can immediately select their target exam, browse structured previous-year question papers, attempt full-length timed tests in an authentic CBT interface, analyze incorrect answers, track topic mastery, and synchronize their test history to their personal Google Drive.
              </p>
              <p>
                It requires no subscription, contains no paywalls, and is structured to reduce cognitive clutter so students can focus entirely on preparation.
              </p>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/40 space-y-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-foreground font-semibold">
                Free-Student Philosophy
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                ExamFlowOS operates on a low-cost, student-first philosophy. Essential exam-preparation material should be accessible to students without financial friction or mandatory paywalls.
              </p>
              <div className="space-y-3 pt-2 border-t border-border/40 text-xs font-mono text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Access Model</span>
                  <span className="text-foreground font-medium">Free for Students</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cloud Sync</span>
                  <span className="text-foreground font-medium">Google Drive Backup</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Platform Type</span>
                  <span className="text-foreground font-medium">Browser Application</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            02 — WHY I BUILT IT
            ========================================================================= */}
        <section className="space-y-8 pt-6 border-t border-border/40">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              02 · MOTIVATION
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
              Why I Built It
            </h2>
          </div>

          <div className="max-w-3xl space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              Preparing for competitive state entrance exams requires consistent practice under real exam conditions. However, many students face fragmented resources: question papers exist as unorganized PDFs, online mock test interfaces are clunky or locked behind heavy paywalls, and tracking personal test history across multiple attempts is tedious.
            </p>
            <p>
              I built ExamFlowOS to solve this exact gap: to create a single, practical environment that integrates actual previous-year examination material, a faithful Computer-Based Testing engine, instant answer evaluation, mistake tracking, and a continuous review workflow.
            </p>
            <p>
              By handling both the product design and engineering myself, I was able to optimize every detail specifically for student focus and workflow continuity.
            </p>
          </div>
        </section>

        {/* =========================================================================
            03 — CURRENT SCALE (VERIFIED METRICS)
            ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-2xl border border-border/50 bg-card/30 space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              03 · VERIFIED REACH
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
              Current Scale & Usage
            </h3>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            Over its operation, ExamFlowOS has grown organically through student recommendation and search discoverability.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-border/40">
            <div className="space-y-1">
              <div className="font-display text-4xl sm:text-5xl font-normal text-foreground">
                10K+
              </div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Total Users
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-display text-4xl sm:text-5xl font-normal text-foreground">
                ~700
              </div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Active Users
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-display text-4xl sm:text-5xl font-normal text-foreground">
                0 ₹
              </div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Cost to Students
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            04 — CORE STUDY LOOP
            ========================================================================= */}
        <section id="study-loop" className="space-y-8 pt-6 border-t border-border/40">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              04 · ARCHITECTURE
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
              The Core Study Loop
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              At the heart of ExamFlowOS is a structured 7-stage iteration cycle that guides students from paper selection to targeted mastery.
            </p>
          </div>

          {/* Visual Sequence Chain */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 pt-2">
            {coreStudyLoopStages.map((stage, idx) => (
              <div 
                key={stage.title} 
                className="p-4 rounded-xl border border-border/50 bg-card/40 flex flex-col justify-between space-y-3 relative group hover:border-border transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>{stage.num}</span>
                  {idx < coreStudyLoopStages.length - 1 && (
                    <span className="hidden md:inline text-border font-bold">→</span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground font-mono">
                    {stage.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-normal pt-1">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-xl border border-border/40 bg-muted/20 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Why this loop matters:</strong> Most test tools stop at score calculation. ExamFlowOS connects test results directly to weakness analysis and topic-level recall, allowing students to systematically close knowledge gaps paper by paper.
          </div>
        </section>

        {/* =========================================================================
            05 — CBT SYSTEM & EXAM DATABASE
            ========================================================================= */}
        <section className="space-y-8 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              05 · SYSTEM CAPABILITIES
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
              CBT Engine & Exam Database
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CBT System Card */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/40 space-y-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Cpu size={20} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  Computer-Based Testing (CBT) System
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  The exam interface replicates official government testing centers to eliminate interface unfamiliarity on exam day.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground border-t border-border/40 pt-4">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                  <span><strong>Question Presentation:</strong> Clean, high-legibility layout designed for long reading sessions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                  <span><strong>Answer Selection & Palette:</strong> Real-time tracking of answered, unanswered, and marked-for-review questions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                  <span><strong>Timed Environment:</strong> Configurable countdown timers mirroring official test durations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                  <span><strong>Post-Test Review:</strong> Immediate score reports, answer keys, and mistake logs.</span>
                </li>
              </ul>
            </div>

            {/* Exam Database Card */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/40 space-y-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Database size={20} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  Actively Maintained Exam Database
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Curated examination content covering major competitive entrance streams in Andhra Pradesh and Telangana.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground border-t border-border/40 pt-4">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                  <span><strong>AP & TG ECET:</strong> Engineering Common Entrance Test question banks and subject papers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                  <span><strong>POLYCET:</strong> Polytechnic Common Entrance Test papers and practice modules.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                  <span><strong>ICET:</strong> Integrated Common Entrance Test material and practice papers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                  <span><strong>Continuous Updates:</strong> Regularly maintained and expanded to keep content current.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            06 — GOOGLE DRIVE BACKUP & TECHNICAL ARCHITECTURE
            ========================================================================= */}
        <section className="space-y-8 pt-6 border-t border-border/40">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              06 · STORAGE & CLOUD BACKUP
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
              Google Drive Cloud Sync
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                A key consideration when keeping ExamFlowOS free for students is maintaining a lean infrastructure.
              </p>
              <p>
                ExamFlowOS utilizes a local-first client approach supplemented by optional Google Drive cloud synchronization. Students can store their test logs, mistake notebooks, and practice metrics locally in the browser, with the option to back up and sync their data directly to their personal Google Drive account.
              </p>
              <p>
                This approach allows students to maintain personal backup copies of their progress while keeping platform hosting overhead low.
              </p>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl border border-border/60 bg-card/40 space-y-4 font-mono text-xs">
              <div className="text-primary font-semibold uppercase tracking-wider">
                Sync Pipeline
              </div>
              <div className="space-y-2 text-muted-foreground">
                <div className="p-3 rounded-lg bg-background/60 border border-border/40 flex items-center justify-between">
                  <span>Browser Storage</span>
                  <span className="text-foreground">Local / Client Storage</span>
                </div>
                <div className="text-center text-primary font-bold">↓</div>
                <div className="p-3 rounded-lg bg-background/60 border border-border/40 flex items-center justify-between">
                  <span>Google OAuth</span>
                  <span className="text-foreground">Google Drive API</span>
                </div>
                <div className="text-center text-primary font-bold">↓</div>
                <div className="p-3 rounded-lg bg-background/60 border border-border/40 flex items-center justify-between">
                  <span>User Cloud Backup</span>
                  <span className="text-foreground">Personal Google Drive</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            07 — SEO & DISCOVERABILITY
            ========================================================================= */}
        <section className="space-y-8 pt-6 border-t border-border/40">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              07 · ORGANIC REACH
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
              SEO & Search Discoverability
            </h2>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Because ExamFlowOS runs without paid advertising budgets, connecting students with previous-year question papers depended heavily on technical SEO and structured search discoverability.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border/50 bg-card/30 space-y-2">
              <div className="text-sm font-semibold text-foreground font-mono flex items-center gap-2">
                <Search size={16} className="text-primary" />
                <span>Structured Sitemap Architecture</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Automated indexation pipelines mapping exam categories, years, and subjects for rapid search engine discovery.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border/50 bg-card/30 space-y-2">
              <div className="text-sm font-semibold text-foreground font-mono flex items-center gap-2">
                <FileText size={16} className="text-primary" />
                <span>Canonical & OpenGraph Metadata</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Strict metadata standards across all exam pages to ensure accurate link previews on messaging apps and social channels.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border/50 bg-card/30 space-y-2">
              <div className="text-sm font-semibold text-foreground font-mono flex items-center gap-2">
                <Terminal size={16} className="text-primary" />
                <span>High Performance Loading</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Lightweight client bundles optimized for low mobile bandwidth conditions common in tier-2 and tier-3 regions.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            08 — BUILDING IT MYSELF
            ========================================================================= */}
        <section className="space-y-8 pt-6 border-t border-border/40">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              08 · END-TO-END OWNERSHIP
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
              Building the Product
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl border border-border/60 bg-card/40 space-y-6">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              ExamFlowOS is a personal product built from the ground up. I handled every layer of its execution:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs text-foreground/90 pt-2 border-t border-border/40">
              <div className="p-3 rounded-lg bg-background/50 border border-border/40">
                <span className="text-primary block font-semibold">01. Product</span>
                <span className="text-muted-foreground text-[11px]">Concept & strategy</span>
              </div>
              <div className="p-3 rounded-lg bg-background/50 border border-border/40">
                <span className="text-primary block font-semibold">02. Design</span>
                <span className="text-muted-foreground text-[11px]">UI/UX & legibility</span>
              </div>
              <div className="p-3 rounded-lg bg-background/50 border border-border/40">
                <span className="text-primary block font-semibold">03. Development</span>
                <span className="text-muted-foreground text-[11px]">Frontend & reactivity</span>
              </div>
              <div className="p-3 rounded-lg bg-background/50 border border-border/40">
                <span className="text-primary block font-semibold">04. CBT Engine</span>
                <span className="text-muted-foreground text-[11px]">Timing & evaluation</span>
              </div>
              <div className="p-3 rounded-lg bg-background/50 border border-border/40">
                <span className="text-primary block font-semibold">05. Exam Data</span>
                <span className="text-muted-foreground text-[11px]">Content curation</span>
              </div>
              <div className="p-3 rounded-lg bg-background/50 border border-border/40">
                <span className="text-primary block font-semibold">06. SEO</span>
                <span className="text-muted-foreground text-[11px]">Search discoverability</span>
              </div>
              <div className="p-3 rounded-lg bg-background/50 border border-border/40">
                <span className="text-primary block font-semibold">07. Deployment</span>
                <span className="text-muted-foreground text-[11px]">Web hosting & CDN</span>
              </div>
              <div className="p-3 rounded-lg bg-background/50 border border-border/40">
                <span className="text-primary block font-semibold">08. Maintenance</span>
                <span className="text-muted-foreground text-[11px]">Ongoing updates</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            09 — LESSONS LEARNED
            ========================================================================= */}
        <section className="space-y-8 pt-6 border-t border-border/40">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              09 · REFLECTION
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
              What Building ExamFlowOS Taught Me
            </h2>
          </div>

          <div className="max-w-3xl space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium">
              Building and maintaining ExamFlowOS for over 10,000 total users provided valuable real-world product insights:
            </p>
            
            <ul className="space-y-4 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong>Building for Real Needs:</strong> Products become useful when they directly eliminate real friction for real people, not when they chase trendiness.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong>Reliability Over Novelty:</strong> Students taking timed practice exams need absolute interface stability; feature bloat actively hurts focus.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong>Long-Term Product Stewardship:</strong> Shipping initial code is only 20% of the effort; maintaining databases, fixing edge cases, and keeping platform dependencies updated over time is where real discipline lives.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span><strong>Cost-Aware Architecture:</strong> Client-side processing and optional Google Drive cloud sync support platform sustainability without requiring student fees.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            10 — CURRENT STATUS & ACTION LINK
            ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-2xl border border-border/60 bg-card/40 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/40">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Product & Active Maintenance</span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-normal text-foreground">
                ExamFlowOS is Live
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
                The platform continues to serve students daily across Andhra Pradesh and Telangana.
              </p>
            </div>

            <a 
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors shrink-0 shadow-md"
            >
              <span>Visit ExamFlowOS</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
            <Link to="/work" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
              <ArrowLeft size={12} />
              <span>Return to Work Overview</span>
            </Link>
            <Link to="/project/annapurna-foundation" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
              <span>Next Case Study: Annapurna Foundation</span>
              <ChevronRight size={12} />
            </Link>
          </div>
        </section>

      </main>
    </PageShell>
  );
}

export default ExamFlowOSPage;
