import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ExternalLink, 
  Cpu, 
  BookOpen, 
  Terminal,
  Database,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { 
  CloudSyncIcon, 
  SoftwareProductIcon,
  VerifiedCheckIcon 
} from '@/components/icons/PortfolioIcons';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';

export function SoftwarePage() {
  return (
    <PageShell>
      <SEOHead
        title="Software & Products — ExamFlowOS & Tools | Geddada Devicharan"
        description="Software and digital products created by Geddada Devicharan: ExamFlowOS (free CBT platform for 10K+ students, ~700 active users) and Perfect Pack ($10 DaVinci Resolve toolkit)."
        path="/software"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'Work', url: 'https://geddadadevicharan.vercel.app/work' },
          { name: 'Software & Products', url: 'https://geddadadevicharan.vercel.app/software' }
        ]}
      />

      <main className="space-y-16 sm:space-y-20">
        
        {/* Wayfinding Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-2">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/work" className="hover:text-foreground transition-colors">Work</Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">Software & Products</span>
        </nav>

        {/* =========================================================================
            1. INTRO
            ========================================================================= */}
        <header className="space-y-4 max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
            DISCIPLINE 01 · SOFTWARE & DIGITAL PRODUCTS
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05]">
            Software Built for Direct Human Need
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Architecting lightweight, high-performance web applications and digital tools. Designed with a zero-cost-for-students philosophy, local-first data resilience, and user-owned cloud synchronization.
          </p>
        </header>

        {/* =========================================================================
            2. FLAGSHIP PRODUCT: EXAMFLOWOS
            ========================================================================= */}
        <section className="space-y-8">
          
          {/* macOS Styled Product Window */}
          <div className="depth-widget overflow-hidden">
            <WindowChrome 
              title="ExamFlowOS — Computer-Based Testing & Exam Command Center"
              rightElement={
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-500 font-medium">Live</span>
                </div>
              }
            />

            <div className="p-8 sm:p-12 space-y-10">
              
              {/* Product Title Bar & Actions */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b border-border/40">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-border bg-card/80 shrink-0 shadow-md">
                    <img 
                      src="/examflow-logo.jpg" 
                      alt="ExamFlowOS official app logo" 
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                      <span className="text-primary font-semibold uppercase tracking-wider">Flagship Product</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-foreground font-semibold">10,000+ Total Users</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-foreground/90 font-medium">~700 Active</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-muted-foreground font-medium">100% Free</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
                      ExamFlowOS — Computer-Based Testing & Preparation Platform
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      A unified exam preparation and Computer-Based Testing (CBT) engine designed for competitive entrance exams in Andhra Pradesh and Telangana (AP & TG ECET, POLYCET, ICET). Built solo from user interface to cloud synchronization.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0 pt-2 lg:pt-0">
                  <a 
                    href="https://examflowos.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/95 depth-interactive shadow-sm"
                  >
                    <span>Visit ExamFlowOS</span>
                    <ExternalLink size={13} />
                  </a>
                  <Link 
                    to="/project/examflow-os"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium depth-surface depth-interactive hover:border-foreground/40 text-foreground transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* 3 Architecture Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="p-6 rounded-2xl depth-surface depth-interactive space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <SoftwareProductIcon size={20} strokeWidth={1.6} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">Authentic CBT Simulation</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Mirrors official government exam interfaces with timed question matrices, instant section switching, mark-for-review flags, and real-time score computation.
                  </p>
                </div>

                <div className="p-6 rounded-2xl depth-surface depth-interactive space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <CloudSyncIcon size={20} strokeWidth={1.6} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">Google Drive Cloud Sync</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Students back up test histories, notes, and mistake journals directly to their personal Google Drive. Eliminates recurring server database bills, keeping the service free.
                  </p>
                </div>

                <div className="p-6 rounded-2xl depth-surface depth-interactive space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <BookOpen size={19} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">AP & TG Syllabus Focus</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Custom-curated question banks and previous-year test papers for state entrance tests (ECET, POLYCET, ICET) previously unavailable in a unified modern digital format.
                  </p>
                </div>

              </div>

              {/* Verified Product Metrics Panel */}
              <div className="p-6 rounded-2xl border border-border/50 bg-muted/30 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono">
                <div>
                  <span className="text-foreground block font-bold text-base">10,000+</span>
                  <span className="text-muted-foreground">Total Registered Users</span>
                </div>
                <div>
                  <span className="text-foreground/90 block font-bold text-base">~700 Active</span>
                  <span className="text-muted-foreground">Regular Students</span>
                </div>
                <div>
                  <span className="text-foreground block font-bold text-base">100% Free</span>
                  <span className="text-muted-foreground">Zero Student Cost</span>
                </div>
                <div>
                  <span className="text-primary block font-bold text-base">Solo Creator</span>
                  <span className="text-muted-foreground">Geddada Devicharan</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            3. PRODUCT IN DEVELOPMENT: PERFECT PACK
            ========================================================================= */}
        <section className="space-y-6 pt-8 border-t border-border/50">
          <div className="depth-widget overflow-hidden">
            <WindowChrome 
              title="Perfect Pack — DaVinci Resolve Studio Toolkit"
              rightElement={
                <span className="text-xs font-mono text-primary font-medium">$10 USD · In Development</span>
              }
            />

            <div className="p-8 sm:p-12 space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-border/40">
                <div className="space-y-3 max-w-3xl">
                  <div className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                    Digital Asset Product · Commercial License
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
                    Perfect Pack for DaVinci Resolve Studio
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    A curated creative toolkit tailored for DaVinci Resolve Studio editors. Derived directly from 700+ commercial video deliverables, it packages custom motion graphics, kinetic typography treatments, film grain textures, and audio design macros into an accessible drag-and-drop DRFX bundle.
                  </p>
                </div>

                <Link 
                  to="/perfect-pack"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/95 depth-interactive shrink-0 shadow-sm"
                >
                  <span>Explore Perfect Pack ($10)</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs text-foreground/90">
                <div className="p-4 rounded-xl depth-surface depth-interactive space-y-1">
                  <div className="text-primary font-semibold">DRFX Macros</div>
                  <div className="text-muted-foreground text-[11px]">Instant drag-and-drop timeline assets</div>
                </div>
                <div className="p-4 rounded-xl depth-surface depth-interactive space-y-1">
                  <div className="text-primary font-semibold">Fusion Kinetic Type</div>
                  <div className="text-muted-foreground text-[11px]">Responsive keyframed title treatments</div>
                </div>
                <div className="p-4 rounded-xl depth-surface depth-interactive space-y-1">
                  <div className="text-primary font-semibold">Fairlight Audio Sweeps</div>
                  <div className="text-muted-foreground text-[11px]">Mastered UI clicks, whooshes & risers</div>
                </div>
                <div className="p-4 rounded-xl depth-surface depth-interactive space-y-1">
                  <div className="text-primary font-semibold">Film Grain & Halation</div>
                  <div className="text-muted-foreground text-[11px]">Non-destructive cinematic overlays</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. TECHNICAL PRINCIPLES & SOFTWARE CRAFT
            ========================================================================= */}
        <section className="space-y-8 pt-8 border-t border-border/50">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Engineering Foundations
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
              How I Build Software
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-2">
              <div className="font-semibold text-foreground text-sm flex items-center gap-2">
                <Terminal size={16} className="text-primary" />
                <span>Zero Framework Bloat</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Using vanilla React, TypeScript, and Vite with minimal third-party dependencies to ensure instant initial loads on 4G mobile connections.
              </p>
            </div>

            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-2">
              <div className="font-semibold text-foreground text-sm flex items-center gap-2">
                <Database size={16} className="text-primary" />
                <span>Local-First & Offline Resilience</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                IndexedDB caching and client-side serialization so students taking 150-question mock exams never lose test state during network drops.
              </p>
            </div>

            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-2">
              <div className="font-semibold text-foreground text-sm flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary" />
                <span>User Data Sovereignty</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                By enabling direct client-to-Google-Drive synchronization, users own their data without proprietary platform lock-in.
              </p>
            </div>

          </div>
        </section>

        {/* Navigation Footer */}
        <section className="pt-12 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Explore More Disciplines
            </h3>
            <p className="text-xs text-muted-foreground">
              Continue to video post-production or managed web ecosystems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/video" 
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-xl depth-surface depth-interactive text-foreground transition-colors"
            >
              <span>Video & Post-Production</span>
              <ArrowRight size={13} />
            </Link>
            <Link 
              to="/web" 
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 depth-interactive transition-colors shadow-sm"
            >
              <span>Web & Digital Systems</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </section>

      </main>
    </PageShell>
  );
}

export default SoftwarePage;
