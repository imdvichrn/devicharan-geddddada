import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  ArrowRight,
  Zap,
  Cpu,
  Brain,
  Activity,
  Sun
} from 'lucide-react';
import { WindowChrome } from '@/components/WindowChrome';
import { SkillsWindow } from '@/components/SkillsWindow';
import { PageShell } from '@/components/PageShell';

export function AboutPage() {
  return (
    <PageShell>
      <SEOHead
        title="About | Geddada Devicharan (@imdvichrn)"
        description="Geddada Devicharan (@imdvichrn) — Digital Product Builder, Video Editor & Business Systems Creator based in Visakhapatnam & Vizianagaram, AP, India."
        path="/about"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'About', url: 'https://geddadadevicharan.vercel.app/about' }
        ]}
      />

      <main className="space-y-16">
        
        {/* Header Section */}
        <header className="space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="text-primary font-medium">Geddada Devicharan</span>
            <span aria-hidden="true">·</span>
            <span>@imdvichrn</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-primary" />
              Visakhapatnam & Vizianagaram, AP, India
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05]">
            About Devicharan
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Digital Product Builder, Video Editor, and Business Systems Creator. Final-year Electrical and Electronics Engineering student with a focus on high-efficiency client software, cinema post-production, and practical automations.
          </p>
        </header>

        {/* =========================================================================
            1. PERSONAL PROFILE & BACKGROUND
            ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 border-t border-border/50 items-start">
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              01 · BACKGROUND & FOCUS
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
              Who I Am & How I Build
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              I work at the intersection of <strong className="text-foreground font-medium">software engineering</strong>, <strong className="text-foreground font-medium">digital product architecture</strong>, <strong className="text-foreground font-medium">high-volume video post-production</strong>, and <strong className="text-foreground font-medium">business operational systems</strong>.
            </p>
            <p>
              Rather than confining myself to abstract theories or endless corporate hierarchies, I build self-sustaining software products (like <strong className="text-foreground font-medium">ExamFlowOS</strong>, serving 10,000+ registered students with zero recurring server bills) and manage the live digital presence for real businesses (including <strong className="text-foreground font-medium">Sri Lahari Studios</strong> and <strong className="text-foreground font-medium">8+ active websites</strong>).
            </p>
            <p>
              In video post-production, having delivered over <strong className="text-foreground font-medium">700+ commercial video projects</strong> in DaVinci Resolve Studio on macOS, I bring engineering rigor to creative finishing: mathematically consistent color science, strict ITU broadcast audio loudness, and rhythmic visual pacing.
            </p>
          </div>
        </section>

        {/* =========================================================================
            2. EDUCATION & TECHNICAL CREDENTIALS
            ========================================================================= */}
        <section className="space-y-8 pt-8 border-t border-border/50">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              02 · EDUCATION & QUALIFICATIONS
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
              Academic & Industrial Rigor
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Foundational grounding in electrical machines, power grid stability, semiconductor physics, and industrial automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">B.Tech in Electrical & Electronics Engineering</h3>
                  <div className="text-xs font-mono text-primary font-medium pt-0.5">Final-Year Undergraduate (2023–2026)</div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Andhra University (AU) affiliated engineering college, Visakhapatnam. Focus on power electronics, linear control systems, and renewable energy conversion.
                </p>
              </div>
              <div className="text-[11px] font-mono text-muted-foreground/80 pt-3 border-t border-border/30">
                Visakhapatnam, Andhra Pradesh
              </div>
            </div>

            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Diploma in Electrical & Electronics Engineering</h3>
                  <div className="text-xs font-mono text-emerald-500 font-medium pt-0.5">M.R.A.G.R. Government Polytechnic</div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  M.R.A.G.R. Government Polytechnic, Vizianagaram. Established core engineering discipline in circuit analysis, electrical measurements, and machine laboratory work.
                </p>
              </div>
              <div className="text-[11px] font-mono text-muted-foreground/80 pt-3 border-t border-border/30">
                Vizianagaram, Andhra Pradesh
              </div>
            </div>

            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-500">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Industrial Training at BHEL Visakhapatnam</h3>
                  <div className="text-xs font-mono text-violet-400 font-medium pt-0.5">Heavy Plates & Vessels Plant (HPVP)</div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Hands-on industrial training at Bharat Heavy Electricals Limited. Gained practical experience in heavy electrical machinery, industrial sub-station operations, and quality inspection.
                </p>
              </div>
              <div className="text-[11px] font-mono text-muted-foreground/80 pt-3 border-t border-border/30">
                BHEL HPVP · Visakhapatnam
              </div>
            </div>

            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Renewable Energy Workshop (Solar & Wind)</h3>
                  <div className="text-xs font-mono text-amber-500 font-medium pt-0.5">Ahalya Industrial · 2024</div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Specialized workshop on solar photovoltaic panel orientation, Maximum Power Point Tracking (MPPT) algorithms, inverter harmonics, and wind generation synchronization.
                </p>
              </div>
              <div className="text-[11px] font-mono text-muted-foreground/80 pt-3 border-t border-border/30">
                Visakhapatnam · 2024
              </div>
            </div>

            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-3 flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
                  <Cpu size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">MATLAB Industrial Internship</h3>
                  <div className="text-xs font-mono text-cyan-400 font-medium pt-0.5">APSCHE & HMIES Solutions · 2025</div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Completed an intensive industrial internship in collaboration with Andhra Pradesh State Council of Higher Education (APSCHE) and HMIES Solutions. Focused on computational modeling, electrical signal processing, feedback loops, and numerical simulation.
                </p>
              </div>
              <div className="text-[11px] font-mono text-muted-foreground/80 pt-3 border-t border-border/30">
                HMIES Solutions & APSCHE · 2025
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            3. SKILLS & EXPERTISE (macOS WINDOW STYLE)
            ========================================================================= */}
        <section className="pt-8 border-t border-border/50">
          <SkillsWindow />
        </section>

        {/* =========================================================================
            4. INTERESTS BEYOND WORK (PERSONAL CURIOSITY)
            ========================================================================= */}
        <section className="space-y-8 pt-8 border-t border-border/50">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              03 · INTELLECTUAL INQUIRY
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
              Interests Beyond Work
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Areas of active self-directed study and personal experimentation that sharpen engineering and focus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl border border-border/60 bg-card/30 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Brain size={18} />
              </div>
              <h3 className="text-base font-semibold text-foreground">Cognitive Psychology & Recall</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Studying memory retention curves, cognitive load theory, and spaced repetition mechanics. This inquiry directly shaped the study scheduling engine inside ExamFlowOS.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/30 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <Activity size={18} />
              </div>
              <h3 className="text-base font-semibold text-foreground">Circadian Protocols & Stamina</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Personal experimentation with natural morning light exposure, sleep cycle timing, and targeted focus blocks to maintain cognitive stamina during long build and edit sessions.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/30 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <Sun size={18} />
              </div>
              <h3 className="text-base font-semibold text-foreground">Clean Energy Transitions</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Tracking decentralized photovoltaic microgrid architectures, battery energy storage systems (BESS), and power electronics efficiency in the global shift to clean power.
              </p>
            </div>

          </div>
        </section>

        {/* Closing Actions */}
        <section className="pt-12 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              Ready to explore further?
            </h3>
            <p className="text-xs text-muted-foreground">
              Explore documented work across software, video, and websites, or get in touch directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/work" 
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-lg border border-border/80 hover:border-foreground/50 bg-background text-foreground transition-colors"
            >
              <span>Explore Work Map</span>
              <ArrowRight size={13} />
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-sm"
            >
              <span>Direct Communication</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </section>

      </main>
    </PageShell>
  );
}

export default AboutPage;
