import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronRight,
  Sliders
} from 'lucide-react';
import {
  SoftwareProductIcon,
  VideoStudioIcon,
  WebEcosystemIcon,
  BusinessSystemsIcon
} from '@/components/icons/PortfolioIcons';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';

export function WorkPage() {
  return (
    <PageShell>
      <SEOHead
        title="Work — Software, Video, Web & Systems | Geddada Devicharan"
        description="Things I've built, edited, designed and managed: ExamFlowOS, 700+ video editing projects in DaVinci Resolve, 8+ managed websites, and business systems."
        path="/work"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'Work', url: 'https://geddadadevicharan.vercel.app/work' }
        ]}
      />

      <main className="space-y-16 sm:space-y-20">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-2">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">Work</span>
        </nav>

        {/* Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
            WORK
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05]">
            Things I&apos;ve built, edited, designed and managed.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A central map to my four core disciplines. Choose a dedicated space below to explore detailed case studies, architectural breakdowns, and live projects.
          </p>
        </header>

        {/* =========================================================================
            1. SOFTWARE & PRODUCTS
            ========================================================================= */}
        <section aria-labelledby="software-heading" className="space-y-6 pt-4 border-t border-border/40">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium flex items-center gap-2">
                <SoftwareProductIcon size={16} />
                <span>01 · SOFTWARE & PRODUCTS</span>
              </div>
              <h2 id="software-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
                Software & Products
              </h2>
              <div className="text-xs sm:text-sm font-mono text-muted-foreground">
                ExamFlowOS · Perfect Pack · software architecture
              </div>
            </div>

            <Link
              to="/software"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/95 depth-interactive shrink-0 shadow-sm"
            >
              <span>Explore Software</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
            Building human-centered digital tools and educational software. From full-scale Computer-Based Testing (CBT) engines serving thousands of students with zero-cost cloud sync, to specialized creative assets for editors.
          </p>

          {/* Featured Case Study Card: ExamFlowOS */}
          <div className="p-6 sm:p-8 rounded-2xl depth-widget depth-interactive space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-card border border-border/60 p-1 overflow-hidden shrink-0 shadow-xs">
                  <img 
                    src="/examflow-logo.jpg" 
                    alt="ExamFlowOS official logo" 
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">ExamFlowOS</h3>
                  <div className="text-xs font-mono text-primary font-medium">Software · CBT · Product Design</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>10K+ Total Users (~700 Active)</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Free exam preparation and CBT platform built for students. Features structured previous-year exam papers across AP & TG state entrance tests, an authentic timed testing interface, mistake analysis, and Google Drive cloud sync.
            </p>

            <div className="pt-2 flex items-center justify-between border-t border-border/30">
              <Link
                to="/project/examflow-os"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline font-medium"
              >
                <span>Read Case Study</span>
                <ArrowRight size={13} />
              </Link>
              <a
                href="https://examflowos.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                Visit ExamFlowOS ↗
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. VIDEO & POST-PRODUCTION
            ========================================================================= */}
        <section aria-labelledby="video-heading" className="space-y-6 pt-10 border-t border-border/40">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium flex items-center gap-2">
                <VideoStudioIcon size={16} />
                <span>02 · VIDEO & POST-PRODUCTION</span>
              </div>
              <h2 id="video-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
                Video & Post-Production
              </h2>
              <div className="text-xs sm:text-sm font-mono text-muted-foreground">
                700+ client video projects · DaVinci Resolve Studio
              </div>
            </div>

            <Link
              to="/video"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/95 depth-interactive shrink-0 shadow-sm"
            >
              <span>Explore Video</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
            Video editing · Color Grading · Colorist · Video Post-Production · Motion Design. Operating in DaVinci Resolve Studio on macOS, executing node-based color transforms, kinetic typography, and broadcast-compliant Fairlight audio mastering (-14 LUFS).
          </p>

          {/* Visual Preview: Studio Post-Production Console */}
          <div className="rounded-2xl depth-widget depth-interactive p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/40">
              <div className="space-y-1">
                <div className="text-xs font-mono text-foreground font-semibold flex items-center gap-2">
                  <Sliders size={14} className="text-primary" />
                  <span>DaVinci Resolve Studio Timeline Pipeline</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Commercial brand spots, promotional reels, and event narratives.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-muted/60 border border-border/40 text-foreground">
                  700+ Finished Cuts
                </span>
                <span className="px-2.5 py-1 rounded-md bg-muted/60 border border-border/40 text-foreground">
                  -14 LUFS Audio
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-muted-foreground">
              <div className="p-4 rounded-xl bg-background/50 border border-border/30 space-y-1">
                <span className="text-foreground font-semibold block">Color Science</span>
                <span>ACES & DaVinci YRGB color management with skin-tone qualification.</span>
              </div>
              <div className="p-4 rounded-xl bg-background/50 border border-border/30 space-y-1">
                <span className="text-foreground font-semibold block">Fairlight Mastering</span>
                <span>Dialogue de-noising, multiband compression, and loudness metering.</span>
              </div>
              <div className="p-4 rounded-xl bg-background/50 border border-border/30 space-y-1">
                <span className="text-foreground font-semibold block">Fusion Motion</span>
                <span>Kinetic titles, screen replacements, and custom DRFX macros.</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. WEBSITES & DIGITAL
            ========================================================================= */}
        <section aria-labelledby="web-heading" className="space-y-6 pt-10 border-t border-border/40">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium flex items-center gap-2">
                <WebEcosystemIcon size={16} />
                <span>03 · WEBSITES & DIGITAL</span>
              </div>
              <h2 id="web-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
                Websites & Digital
              </h2>
              <div className="text-xs sm:text-sm font-mono text-muted-foreground">
                8+ managed websites · SEO · Digital presence
              </div>
            </div>

            <Link
              to="/web"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/95 depth-interactive shrink-0 shadow-sm"
            >
              <span>Explore Websites</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
            Website development · Website management · SEO · Digital presence. Providing ongoing technical stewardship, local map search optimization, high mobile performance, and domain infrastructure for 8+ commercial and community organizations.
          </p>

          {/* Visual Preview: Managed Sites Roster */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-primary font-semibold uppercase">Commercial Studio</span>
                <span className="text-emerald-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live & Managed
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Sri Lahari Studios</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Full digital presence, responsive portfolio showcase, and regional search presence for a 10-year studio in Kothavalasa & Vizag.
              </p>
            </div>

            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-primary font-semibold uppercase">Website · Digital Presence · Video</span>
                  <span className="text-emerald-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live & Managed
                  </span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-9 h-9 rounded-xl bg-card border border-border/60 p-1.5 flex items-center justify-center shrink-0">
                    <img 
                      src="https://annapurna-foundation.com/assets/logo/logo-master-transparent-1024x1024.png" 
                      alt="Annapurna Foundation official logo" 
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Annapurna Foundation</h3>
                    <span className="text-xs font-mono text-muted-foreground block">annapurna-foundation.com</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Building and managing the digital presence of an organisation I genuinely care about—spanning video editing, web development, deployment, and ongoing technical stewardship.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-border/30">
                <Link
                  to="/project/annapurna-foundation"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline font-medium"
                >
                  <span>Read Case Study</span>
                  <ArrowRight size={13} />
                </Link>
                <a
                  href="https://annapurna-foundation.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                >
                  Visit Site ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. BUSINESS SYSTEMS
            ========================================================================= */}
        <section aria-labelledby="systems-heading" className="space-y-6 pt-10 border-t border-border/40">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium flex items-center gap-2">
                <BusinessSystemsIcon size={16} />
                <span>04 · BUSINESS SYSTEMS</span>
              </div>
              <h2 id="systems-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
                Business Systems
              </h2>
              <div className="text-xs sm:text-sm font-mono text-muted-foreground">
                Digital operations · automation · webhook pipelines
              </div>
            </div>

            <Link
              to="/systems"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/95 depth-interactive shrink-0 shadow-sm"
            >
              <span>Explore Systems</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
            Digital operations · automation · AI-assisted workflows. Eliminating administrative busywork and inquiry drop-offs through event-driven webhooks, n8n integrations, automated client intake triage, and cloud delivery pipelines.
          </p>

          {/* Visual Preview: Event-Driven Automation Flow */}
          <div className="p-6 sm:p-8 rounded-2xl depth-widget depth-interactive space-y-4">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Automated Autopilot Architecture
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-background/50 border border-border/30 space-y-1">
                <span className="text-primary font-semibold block">01. Webhook Intake</span>
                <span className="text-muted-foreground leading-normal block">
                  Captures client form inquiries and normalizes event parameters.
                </span>
              </div>
              <div className="p-4 rounded-xl bg-background/50 border border-border/30 space-y-1">
                <span className="text-foreground font-semibold block">02. Instant Triage</span>
                <span className="text-muted-foreground leading-normal block">
                  Routes formatted briefings directly to WhatsApp/Telegram alerts.
                </span>
              </div>
              <div className="p-4 rounded-xl bg-background/50 border border-border/30 space-y-1">
                <span className="text-primary font-semibold block">03. Delivery Sync</span>
                <span className="text-muted-foreground leading-normal block">
                  Connects finished video exports to cloud storage links automatically.
                </span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </PageShell>
  );
}

export default WorkPage;
