import { SEOHead } from '@/components/SEOHead';
import { ContactForm } from '@/components/ContactForm';
import { HiddenIdentityBlock, FooterMicroBio } from '@/components/SEOContent';
import { 
  generatePersonSchema, 
  generateWebsiteSchema, 
  generateOrganizationSchema, 
  generateExamFlowOSSchema 
} from '@/lib/structuredData';
import { WindowChrome } from '@/components/WindowChrome';
import { HeroField } from '@/components/HeroField';
import { usePointerDepth } from '@/hooks/usePointerDepth';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { DownloadCVButton } from '@/components/motion/MicroFeedback';
import { 
  SoftwareProductIcon,
  VideoStudioIcon,
  WebEcosystemIcon,
  BusinessSystemsIcon,
  WritingLedgerIcon,
  OfficialGithubIcon,
  OfficialInstagramIcon,
  OfficialLinkedinIcon,
  OfficialWhatsappIcon,
  VerifiedCheckIcon
} from '@/components/icons/PortfolioIcons';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  MapPin, 
  Download, 
  ExternalLink,
  GraduationCap,
  X,
  ArrowRight,
  BookOpen,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import profileImage from '@/assets/profile-avatar.png';

// 4 Primary Pathways — Map of Devicharan's Work
const primaryPathways = [
  {
    id: 'software',
    title: 'Software & Products',
    path: '/software',
    kicker: 'Digital Products',
    summary: 'Architecting lightweight web apps, CBT simulation platforms, and user-owned Google Drive cloud backup systems.',
    evidence: 'ExamFlowOS · 10K+ Total Users · ~700 Active',
    icon: SoftwareProductIcon,
  },
  {
    id: 'video',
    title: 'Video & Post-Production',
    path: '/video',
    kicker: 'Creative Studio',
    summary: 'High-volume post-production finishing, node-based color grading, and Fairlight audio mastering in DaVinci Resolve Studio on macOS.',
    evidence: '700+ Client Video Projects Delivered',
    icon: VideoStudioIcon,
  },
  {
    id: 'web',
    title: 'Websites & Digital',
    path: '/web',
    kicker: 'Managed Web',
    summary: 'Design, technical SEO infrastructure, and continuous operational stewardship across live business web ecosystems.',
    evidence: 'Sri Lahari Studios · Annapurna Foundation (7+ Sites)',
    icon: WebEcosystemIcon,
  },
  {
    id: 'systems',
    title: 'Business Systems',
    path: '/systems',
    kicker: 'Operations Autopilot',
    summary: 'Event-driven n8n automations, client intake routing, and business digital OS workflows that eliminate manual friction.',
    evidence: 'Studio Digital OS · Webhook Pipelines',
    icon: BusinessSystemsIcon,
  }
];

// Technical Articles & Build Logs
const articles = [
  {
    id: 'examflowos-architecture',
    title: 'ExamFlowOS Architecture: Designing a Google Drive Cloud Backup System',
    category: 'Product Architecture',
    readTime: '6 min read',
    intro: 'How I designed a Google Drive-based backup approach as part of ExamFlowOS’s zero-cost infrastructure strategy for 10K+ students.',
    content: {
      whatIBuilt: 'ExamFlowOS is a free, lightweight exam preparation and Computer-Based Testing (CBT) platform tailored for competitive entrance tests in Andhra Pradesh and Telangana (ECET, POLYCET, ICET).',
      howIBuiltIt: 'Built using React, TypeScript, and Vite. The critical innovation is client-side data serialization that authenticates directly with the student’s personal Google Drive via Google Drive API, saving bookmarks, custom notes, and exam history directly into their personal cloud storage.',
      whyIBuiltIt: 'Traditional cloud databases (Firebase, Supabase, Postgres) charge per read/write or compute hours. For a free service with 10K+ users taking 150-question mock exams, server costs would have killed the project or forced paywalls onto students.',
      whatWentWrong: 'OAuth token expiration and refresh handling inside iframes caused intermittent sync errors during multi-hour mock exams in early prototypes.',
      whatWorked: 'Implementing local IndexedDB caching with deferred background synchronization to Google Drive completely solved the token interruption issue.',
      whatILearned: 'Low-cost architecture requires rethinking data ownership. By letting users own their storage, you eliminate both backend liabilities and user subscription costs.'
    }
  },
  {
    id: 'video-editing-scale',
    title: 'Video Post-Production at Scale: 700+ Deliverables in DaVinci Resolve Studio',
    category: 'Post-Production',
    readTime: '7 min read',
    intro: 'Key workflows, node structures, and Fairlight audio mastering pipelines refined across 700+ completed commercial video projects.',
    content: {
      whatIBuilt: 'A standardized high-velocity post-production operating system on macOS using DaVinci Resolve Studio for commercial promotions, events, and dynamic short-form storytelling.',
      howIBuiltIt: 'Standardized timeline templates, fixed node-tree color grading structures, custom Fusion kinetic text macros, and Fairlight multi-bus audio mastering.',
      whyIBuiltIt: 'Delivering 700+ client projects with high retention requires eliminating decision fatigue on repetitive technical steps like color management and loudness calibration.',
      whatWentWrong: 'Early projects suffered from inconsistent audio across different mobile loudspeakers and headphone monitors due to relying on consumer headphone mixing.',
      whatWorked: 'Enforcing strict ITU-R BS.1770 broadcast loudness standards (-14 LUFS integrated for digital platforms, -1.0 dB True Peak ceiling) in Fairlight eliminated all cross-device volume issues.',
      whatILearned: 'Speed in creative work does not come from rushing; it comes from having an airtight, non-destructive pipeline where technical foundations are automated.'
    }
  },
  {
    id: 'sri-lahari-studios-os',
    title: 'Sri Lahari Studios: Building a Digital OS for a 10-Year Photography Business',
    category: 'Business Systems',
    readTime: '5 min read',
    intro: 'Transforming a decade-old studio’s operations with a unified web platform, regional SEO, and n8n inquiry automations.',
    content: {
      whatIBuilt: 'A unified digital presence and client intake operating system for Sri Lahari Studios, a 10-year operating studio with branches in Kothavalasa and Visakhapatnam.',
      howIBuiltIt: 'Designed and coded a fast, mobile-first showcase web platform, structured regional Google Business profiles, and integrated automated webhook triggers into n8n.',
      whyIBuiltIt: 'During peak wedding seasons, incoming inquiries were lost in unorganized chats and phone calls, leading to response lag and lost bookings.',
      whatWentWrong: 'Initial form designs were too exhaustive, causing prospective clients on mobile connections to abandon quote requests halfway through.',
      whatWorked: 'Reduced the booking intake to three essential questions with an instant direct routing fallback, increasing qualified inquiry submissions by over 60%.',
      whatILearned: 'Local business technology succeeds when it eliminates friction for the customer while reducing mental overhead for the business owner.'
    }
  }
];

export function Portfolio() {
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);
  
  // High performance pointer parallax for HeroField
  const { 
    depth: heroPointerDepth, 
    containerRef: heroContainerRef, 
    handlePointerMove: handleHeroPointerMove, 
    handlePointerLeave: handleHeroPointerLeave 
  } = usePointerDepth(6, 0.08);

  // Intersection Observers for subtle section entries
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [pathwaysRef, pathwaysInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [workRef, workInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [writingRef, writingInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="relative min-h-screen text-foreground selection:bg-primary/20 selection:text-primary">
      <SEOHead
        title="Geddada Devicharan — Digital Product Builder, Video Editor & Creator"
        description="Geddada Devicharan is a multidisciplinary digital creator building products, websites, digital systems, and visual experiences across software, video, and creative technology."
        path="/"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app/' },
          { name: 'Work', url: 'https://geddadadevicharan.vercel.app/work' },
          { name: 'Software', url: 'https://geddadadevicharan.vercel.app/software' },
          { name: 'Video Studio', url: 'https://geddadadevicharan.vercel.app/video' },
          { name: 'Web & Systems', url: 'https://geddadadevicharan.vercel.app/web' },
          { name: 'Writing & Build Logs', url: 'https://geddadadevicharan.vercel.app/writing' },
          { name: 'Skills & Capabilities', url: 'https://geddadadevicharan.vercel.app/skills' },
          { name: 'Experiments & Lab', url: 'https://geddadadevicharan.vercel.app/experiments' },
          { name: 'Contact', url: 'https://geddadadevicharan.vercel.app/contact' }
        ]}
        structuredData={[
          generatePersonSchema(),
          generateWebsiteSchema()
        ]}
      />

      <HiddenIdentityBlock />

      {/* =========================================================================
          1. HERO — CENTRAL VISUAL AXIS (PROGRESSIVE COMPOSITION & HEROFIELD DEPTH)
          ========================================================================= */}
      <section 
        id="hero" 
        ref={(node) => {
          heroRef(node);
          heroContainerRef.current = node;
        }}
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={handleHeroPointerLeave}
        className="relative pb-16 sm:pb-24 md:pb-28 lg:pb-32 w-full min-h-[62vh] flex flex-col justify-center items-start md:items-center text-left md:text-center overflow-x-hidden page-shell-gutter"
      >
        {/* Dedicated subtle HeroField separate from global background with 2-8px parallax */}
        <HeroField pointerDepth={heroPointerDepth} />

        <div className="relative z-10 w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto flex flex-col items-start md:items-center">
          
          {/* STEP 1: PORTRAIT ANCHOR */}
          <div className="mb-4 sm:mb-6 hero-step-1">
            <div 
              className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border border-border bg-card shadow-[0_4px_20px_rgba(0,0,0,0.18)] ml-0 md:mx-auto transition-transform duration-300 hover:scale-[1.02] depth-interactive"
              style={{
                transform: `translate3d(${heroPointerDepth.pixelX * 0.3}px, ${heroPointerDepth.pixelY * 0.3}px, 0)`
              }}
            >
              <img 
                src={profileImage} 
                alt="Geddada Devicharan portrait" 
                width={144}
                height={144}
                className="w-full h-full object-cover object-center" 
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* STEP 2: HANDLE (@imdvichrn) */}
          <div className="hero-step-2 text-xs sm:text-sm font-mono text-primary font-medium tracking-wide text-left md:text-center flex items-center gap-1.5">
            <span>@imdvichrn</span>
            <VerifiedCheckIcon size={13} className="text-primary inline-block" />
          </div>

          {/* STEP 3: DISPLAY NAME (Instrument Serif) */}
          <h1 className="hero-step-3 mt-2 sm:mt-3 font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.06] text-left md:text-center">
            Geddada Devicharan
          </h1>

          {/* STEP 4: DISCIPLINE STATEMENT (Balanced & Clean) */}
          <div className="hero-step-4 mt-3 sm:mt-4 text-xs sm:text-base md:text-lg lg:text-xl text-foreground/90 font-normal tracking-normal max-w-xl xl:max-w-2xl mx-0 md:mx-auto leading-snug px-0 md:px-2 text-left md:text-center">
            Digital Product Builder · Video Editor · Post-Production Specialist · Creator
          </div>

          {/* STEP 5: PERSONAL INTRO (Calm, human, readable) */}
          <p className="hero-step-5 mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base lg:text-[17px] text-muted-foreground max-w-md sm:max-w-xl md:max-w-2xl mx-0 md:mx-auto leading-relaxed font-normal px-0 md:px-2 text-left md:text-center">
            Designing minimal software systems, finishing commercial post-production video, and managing digital infrastructure from Andhra Pradesh, India.
          </p>

          {/* STEP 6: ACTIONS (Physical depth & micro-lift on hover, press down state) */}
          <div className="hero-step-6 mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-start md:justify-center gap-3 w-full sm:w-auto max-w-md md:max-w-none mx-0 md:mx-auto">
            
            {/* Primary Action */}
            <a 
              href="#work-map"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-11 sm:h-12 rounded-xl text-xs sm:text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/95 depth-interactive shadow-[0_2px_10px_rgba(0,122,255,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
            >
              <span>Explore my work</span>
              <ArrowRight size={14} strokeWidth={2} />
            </a>

            {/* Secondary Action: Download CV with micro-feedback */}
            <DownloadCVButton />

            {/* Tertiary Action: Get in touch */}
            <Link 
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 h-11 sm:h-12 rounded-xl text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 depth-interactive transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
            >
              <span>Get in touch</span>
            </Link>

          </div>

          {/* STEP 7: LOCATION & OFFICIAL CHANNELS */}
          <div className="hero-step-7 mt-6 sm:mt-8 flex flex-col items-start md:items-center gap-2 text-xs text-muted-foreground max-w-md mx-0 md:mx-auto">
            <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-muted-foreground/90">
              <MapPin size={12} className="text-primary shrink-0" strokeWidth={1.75} />
              <span>Visakhapatnam & Vizianagaram, AP, India</span>
            </div>

            <div className="flex flex-wrap items-center justify-start md:justify-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-xs font-mono text-muted-foreground pt-0.5">
              <a 
                href="mailto:devicharangeddada@gmail.com" 
                className="hover:text-foreground transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                aria-label="Send email to Devicharan"
              >
                <Mail size={12} className="text-primary shrink-0" strokeWidth={1.75} />
                <span>Email</span>
              </a>
              <span className="text-border" aria-hidden="true">·</span>
              <a 
                href="https://github.com/imdvichrn/imdvichrn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                aria-label="View GitHub Profile"
              >
                <OfficialGithubIcon size={13} className="shrink-0" />
                <span>GitHub</span>
              </a>
              <span className="text-border" aria-hidden="true">·</span>
              <a 
                href="https://www.linkedin.com/in/geddadadevicharan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                aria-label="View LinkedIn Profile"
              >
                <OfficialLinkedinIcon size={13} className="shrink-0" />
                <span>LinkedIn</span>
              </a>
              <span className="text-border" aria-hidden="true">·</span>
              <a 
                href="https://instagram.com/imdvichrn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                aria-label="View Instagram Profile"
              >
                <OfficialInstagramIcon size={13} className="shrink-0" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. MAP OF WORK — 4 CLEAR DESTINATIONS (CONTAINED SURFACE SEPARATION)
          ========================================================================= */}
      <section id="work-map" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1240px] 2xl:max-w-[1380px] mx-auto border-t border-border/40">
        <div className="space-y-12">
          
          <ScrollReveal distance={16}>
            <div className="space-y-3 max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
                DISCIPLINES & SPACES
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground">
                What I build & create.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Four dedicated spaces covering software products, high-velocity post-production, managed web ecosystems, and automated business systems.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7 xl:gap-8">
            {primaryPathways.map((pathway, idx) => {
              const Icon = pathway.icon;
              return (
                <ScrollReveal key={pathway.id} staggerIndex={idx} distance={18}>
                  <Link
                    to={pathway.path}
                    className="p-6 sm:p-8 lg:p-10 xl:p-11 rounded-2xl depth-widget depth-interactive hover:border-foreground/30 transition-all duration-200 flex flex-col justify-between space-y-6 group h-full"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-muted/70 border border-border/80 flex items-center justify-center text-foreground group-hover:text-primary transition-colors">
                          <Icon size={22} strokeWidth={1.6} />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1 group-hover:text-foreground">
                          <span>Enter space</span>
                          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-xs font-mono text-primary font-medium">
                          {pathway.kicker}
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-normal text-foreground group-hover:text-primary transition-colors">
                          {pathway.title}
                        </h3>
                      </div>

                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {pathway.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/50 text-xs font-mono text-foreground/80 font-medium flex items-center justify-between">
                      <span>{pathway.evidence}</span>
                      <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. FEATURED HIGHLIGHTS (EXAMFLOWOS & REEL)
          ========================================================================= */}
      <section id="work" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1240px] 2xl:max-w-[1380px] mx-auto border-t border-border/40">
        <div className="space-y-16">
          
          <ScrollReveal distance={16}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/40">
              <div className="space-y-3 max-w-3xl">
                <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
                  HIGHLIGHTS
                </div>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground">
                  Selected work in depth.
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  ExamFlowOS, commercial video finishing in DaVinci Resolve Studio, and local business digital architectures.
                </p>
              </div>
              
              <Link 
                to="/work" 
                className="text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 shrink-0"
              >
                <span>Explore All Work</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>

          {/* ExamFlowOS Authentic Window */}
          <ScrollReveal distance={20} staggerIndex={1}>
            <article className="rounded-2xl depth-widget overflow-hidden">
              <WindowChrome 
                title="ExamFlowOS — Computer-Based Testing & Preparation Platform"
                rightElement={
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-500 font-medium">Live</span>
                  </div>
                }
              />

              <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 space-y-8">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-border/40">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl overflow-hidden border border-border bg-card/80 shrink-0 shadow-sm mt-0.5">
                      <img 
                        src="/examflow-logo.jpg" 
                        alt="ExamFlowOS official app logo" 
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                        <span className="text-primary font-semibold uppercase tracking-wider">Flagship Software</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-foreground font-semibold">10,000+ Total Users</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-foreground/90 font-medium">~700 Active</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-muted-foreground">Free for Students</span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-normal text-foreground">
                        ExamFlowOS
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
                        A free, lightweight exam preparation and Computer-Based Testing (CBT) platform built for competitive entrance exams in Andhra Pradesh and Telangana (ECET, POLYCET, ICET). Designed with personal Google Drive sync so student history persists without recurring server costs.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0 pt-2 lg:pt-0">
                    <a 
                      href="https://examflowos.in" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/95 depth-interactive shadow-sm"
                    >
                      <span>Visit ExamFlowOS</span>
                      <ExternalLink size={13} />
                    </a>
                    <Link 
                      to="/software"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium depth-surface depth-interactive hover:border-foreground/40 text-foreground transition-colors"
                    >
                      <span>Case Study</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 text-xs font-mono text-muted-foreground">
                  <div className="p-4 sm:p-5 rounded-xl bg-background/50 border border-border/50">
                    <span className="text-primary font-bold text-sm sm:text-base block">10K+ Users</span>
                    <span className="text-[11px] sm:text-xs">Registered accounts</span>
                  </div>
                  <div className="p-4 sm:p-5 rounded-xl bg-background/50 border border-border/50">
                    <span className="text-foreground font-bold text-sm sm:text-base block">~700 Active</span>
                    <span className="text-[11px] sm:text-xs">Regular student test-takers</span>
                  </div>
                  <div className="p-4 sm:p-5 rounded-xl bg-background/50 border border-border/50">
                    <span className="text-foreground font-bold text-sm sm:text-base block">100% Free</span>
                    <span className="text-[11px] sm:text-xs">Zero student paywalls</span>
                  </div>
                  <div className="p-4 sm:p-5 rounded-xl bg-background/50 border border-border/50">
                    <span className="text-primary font-bold text-sm sm:text-base block">Google Drive</span>
                    <span className="text-[11px] sm:text-xs">Client-side cloud sync</span>
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>

          {/* Sri Lahari Studios & Video Deliverables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10">
            
            <ScrollReveal distance={18} staggerIndex={0}>
              <article className="p-6 sm:p-8 lg:p-10 rounded-2xl depth-widget depth-interactive hover:border-foreground/30 space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="text-xs font-mono text-primary font-semibold uppercase">
                    Business Digital Ecosystem
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground">
                    Sri Lahari Studios OS
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Modernized the digital presence and client intake of a 10-year operating photography studio in Kothavalasa and Vizag with responsive web architecture, regional SEO, and automated inquiry routing.
                  </p>
                  <div className="text-xs font-mono text-muted-foreground space-y-1.5 pt-1">
                    <div>• Responsive studio showcase web platform</div>
                    <div>• Regional search dominance across Vizag & Vizianagaram</div>
                    <div>• Direct WhatsApp client intake & triage</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <Link 
                    to="/project/sri-lahari-studios"
                    className="text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Read Studio Case Study</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            </ScrollReveal>

            <ScrollReveal distance={18} staggerIndex={1}>
              <article className="p-6 sm:p-8 lg:p-10 rounded-2xl depth-widget depth-interactive hover:border-foreground/30 space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="text-xs font-mono text-primary font-semibold uppercase">
                    700+ Video Deliverables
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground">
                    Video Post-Production & Color
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    High-velocity creative post-production in DaVinci Resolve Studio on macOS across commercial promotions, music events, and social campaigns.
                  </p>
                  <div className="text-xs font-mono text-muted-foreground space-y-1.5 pt-1">
                    <div>• Node-based color grading & color space transforms</div>
                    <div>• Fairlight ITU-R BS.1770 broadcast audio mastering</div>
                    <div>• Creator of Perfect Pack ($10 USD creative asset kit)</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/40 flex items-center justify-between">
                  <Link 
                    to="/video"
                    className="text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Explore Video Room</span>
                    <ArrowRight size={13} />
                  </Link>
                  <span className="text-xs font-mono text-muted-foreground">DaVinci Resolve Studio</span>
                </div>
              </article>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. WRITING & BUILD LOGS
          ========================================================================= */}
      <section id="writing" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1240px] 2xl:max-w-[1380px] mx-auto border-t border-border/40">
        <div className="space-y-12">
          
          <ScrollReveal distance={16}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/40">
              <div className="space-y-3 max-w-3xl">
                <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
                  WRITING
                </div>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground">
                  Technical build logs.
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  Engineering reflections structured as: What I Built · How I Built It · Why · What Went Wrong · What Worked · Lessons.
                </p>
              </div>

              <Link 
                to="/writing" 
                className="text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 shrink-0"
              >
                <span>View All Logs</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 xl:gap-8">
            {articles.map((art, idx) => (
              <ScrollReveal key={art.id} staggerIndex={idx} distance={18}>
                <article 
                  className="p-6 sm:p-7 lg:p-8 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xs flex flex-col justify-between space-y-6 hover:border-foreground/40 transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.25)] h-full"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span className="text-primary font-semibold">{art.category}</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="font-display text-2xl font-normal text-foreground leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {art.intro}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedArticle(art)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-medium border border-border/80 hover:border-foreground/50 bg-background/60 text-foreground transition-colors flex items-center justify-center gap-2 depth-interactive"
                  >
                    <BookOpen size={13} />
                    <span>Read Reflection</span>
                  </button>
                </article>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-[760px] bg-card border border-border/60 rounded-2xl shadow-2xl p-6 sm:p-10 md:p-12 my-8 animate-in fade-in-0 zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close article"
            >
              <X size={18} />
            </button>

            <div className="space-y-8">
              <div className="space-y-2 border-b border-border/40 pb-6">
                <div className="text-xs font-mono text-primary font-medium">
                  {selectedArticle.category} · {selectedArticle.readTime}
                </div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground">
                  {selectedArticle.title}
                </h1>
                <p className="text-xs text-muted-foreground">
                  By Geddada Devicharan (@imdvichrn) · Visakhapatnam & Vizianagaram
                </p>
              </div>

              <div className="font-sans text-[16px] sm:text-[17px] leading-[1.8] text-foreground/90 space-y-6 max-w-[680px]">
                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-1">
                    1. What I Built
                  </h2>
                  <p>{selectedArticle.content.whatIBuilt}</p>
                </div>

                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-1">
                    2. How I Built It
                  </h2>
                  <p>{selectedArticle.content.howIBuiltIt}</p>
                </div>

                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-1">
                    3. Why I Built It
                  </h2>
                  <p>{selectedArticle.content.whyIBuiltIt}</p>
                </div>

                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500 mb-1">
                    4. What Went Wrong
                  </h2>
                  <p>{selectedArticle.content.whatWentWrong}</p>
                </div>

                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-500 mb-1">
                    5. What Worked
                  </h2>
                  <p>{selectedArticle.content.whatWorked}</p>
                </div>

                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-primary mb-1">
                    6. What I Learned
                  </h2>
                  <p>{selectedArticle.content.whatILearned}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-border/40 flex justify-end">
                <button 
                  onClick={() => setSelectedArticle(null)} 
                  className="px-6 py-2.5 rounded-xl text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. ABOUT & BACKGROUND (NO AGE / DOB)
          ========================================================================= */}
      <section id="about" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1240px] 2xl:max-w-[1380px] mx-auto border-t border-border/40">
        <div className="space-y-12">
          
          <ScrollReveal distance={16}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/40">
              <div className="space-y-3 max-w-3xl">
                <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
                  BACKGROUND
                </div>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground">
                  About Geddada Devicharan.
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  Digital Product Builder, Video Editor & Business Systems Creator based in Andhra Pradesh.
                </p>
              </div>

              <Link 
                to="/about" 
                className="text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 shrink-0"
              >
                <span>Full Biography</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
            
            <ScrollReveal className="lg:col-span-7 space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed" distance={16} staggerIndex={0}>
              <p>
                Based in Visakhapatnam and Vizianagaram, Andhra Pradesh. I operate across software engineering, video post-production (700+ deliverables in DaVinci Resolve Studio), website management (8+ managed websites including Sri Lahari Studios and Annapurna Foundation), and practical business automation.
              </p>
              <p>
                My philosophy is straightforward: design simple systems that solve genuine friction, respect human attention, and operate without fragile dependencies.
              </p>

              <div className="pt-4 border-t border-border/40 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono text-muted-foreground">
                <div>
                  <span className="text-foreground block font-semibold">Name</span>
                  Geddada Devicharan
                </div>
                <div>
                  <span className="text-foreground block font-semibold">Identity</span>
                  @imdvichrn
                </div>
                <div>
                  <span className="text-foreground block font-semibold">Location</span>
                  Visakhapatnam & Vizianagaram, AP
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-5 space-y-6" distance={16} staggerIndex={1}>
              <div className="p-6 sm:p-8 lg:p-9 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xs space-y-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.25)]">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm sm:text-base">
                  <GraduationCap size={18} className="text-primary" />
                  <span>Academic Rigor</span>
                </div>
                <div className="space-y-3.5 text-xs sm:text-sm text-muted-foreground">
                  <div className="border-l-2 border-primary/50 pl-3 space-y-0.5">
                    <div className="font-semibold text-foreground">B.Tech Electrical & Electronics Engineering</div>
                    <div>Final Year · Andhra University affiliated college, Vizag</div>
                  </div>
                  <div className="border-l-2 border-border pl-3 space-y-0.5">
                    <div className="font-semibold text-foreground">Diploma in EEE</div>
                    <div>Completed · M.R.A.G.R. Govt Polytechnic, Vizianagaram</div>
                  </div>
                  <div className="border-l-2 border-border pl-3 space-y-0.5">
                    <div className="font-semibold text-foreground">BHEL Visakhapatnam Training</div>
                    <div>Industrial training at Bharat Heavy Electricals Limited</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* =========================================================================
          6. CONTACT & COMMUNICATION
          ========================================================================= */}
      <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1240px] 2xl:max-w-[1380px] mx-auto border-t border-border/40">
        <ScrollReveal distance={18}>
          <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-12 text-center">
            
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
                DIRECT CHANNELS
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground">
                Direct communication.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Reach out for software products, video post-production, website management, and business automations.
              </p>
            </div>

            <div className="w-full">
              <ContactForm 
                title="Send a Direct Message" 
                subtitle="Leave a note below with your project context or inquiry." 
              />
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* =========================================================================
          7. FOOTER
          ========================================================================= */}
      <footer className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1240px] 2xl:max-w-[1380px] mx-auto border-t border-border/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          <div className="space-y-1">
            <p className="text-base font-semibold text-foreground">
              Geddada Devicharan
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Digital Product Builder, Video Editor & Business Systems Creator.
            </p>
            <p className="text-[11px] sm:text-xs font-mono text-muted-foreground/60 pt-1">
              Visakhapatnam & Vizianagaram, AP, India · © {new Date().getFullYear()}
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/software" className="hover:text-foreground transition-colors">Software</Link>
            <Link to="/video" className="hover:text-foreground transition-colors">Video</Link>
            <Link to="/web" className="hover:text-foreground transition-colors">Web</Link>
            <Link to="/systems" className="hover:text-foreground transition-colors">Systems</Link>
            <Link to="/writing" className="hover:text-foreground transition-colors">Writing</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-2">
            <a 
              href="https://github.com/imdvichrn/imdvichrn" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className="p-2.5 text-muted-foreground hover:text-foreground depth-interactive transition-colors rounded-lg"
            >
              <OfficialGithubIcon size={17} />
            </a>
            <a 
              href="https://www.linkedin.com/in/geddadadevicharan" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="p-2.5 text-muted-foreground hover:text-foreground depth-interactive transition-colors rounded-lg"
            >
              <OfficialLinkedinIcon size={17} />
            </a>
            <a 
              href="https://www.instagram.com/imdvichrn" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="p-2.5 text-muted-foreground hover:text-foreground depth-interactive transition-colors rounded-lg"
            >
              <OfficialInstagramIcon size={17} />
            </a>
          </div>

        </div>

        <FooterMicroBio />
      </footer>

    </div>
  );
}

export default Portfolio;
