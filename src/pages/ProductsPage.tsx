import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ExternalLink, 
  Check, 
  Sparkles, 
  Database, 
  Cloud, 
  Clock, 
  Layers, 
  Film, 
  ShieldCheck 
} from 'lucide-react';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';

export function ProductsPage() {
  return (
    <PageShell maxWidth="default">
      <Helmet>
        <title>Digital Products | ExamFlowOS & Perfect Pack | Geddada Devicharan</title>
        <meta 
          name="description" 
          content="Digital products created by Geddada Devicharan: ExamFlowOS (free CBT platform for 10K+ students, ~700 active users) and Perfect Pack ($10 DaVinci Resolve toolkit, in development)." 
        />
        <link rel="canonical" href="https://geddadadevicharan.vercel.app/products" />
      </Helmet>

      <main className="space-y-12">
        
        {/* Header Window */}
        <div className="border border-border/60 rounded-xl bg-card/60 backdrop-blur-sm p-6 sm:p-8 space-y-4">
          <WindowChrome className="mb-2" />
          <div className="space-y-2">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Product Lab · Independent Software
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Useful Tools Built for Real Use
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Software and creative assets designed from direct personal need, built for zero friction, low maintenance overhead, and maximum practical utility.
            </p>
          </div>
        </div>

        {/* Product 1: ExamFlowOS */}
        <div className="border border-border/60 rounded-xl bg-card/40 backdrop-blur-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="text-primary font-semibold">Flagship Software</span>
                <span aria-hidden="true">·</span>
                <span>Web Application</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-500 font-medium">Free for Students</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                ExamFlowOS
              </h2>
              <p className="text-sm font-mono text-muted-foreground">
                10K+ Total Users · Approximately 700 Active Users · AP & TG Entrance Exams
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a 
                href="https://examflowos.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3.5 py-2 text-xs font-medium rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Launch App</span>
                <ExternalLink size={13} />
              </a>
              <Link 
                to="/project/examflow-os"
                className="px-3.5 py-2 text-xs font-medium rounded-lg border border-border/60 bg-background/80 hover:bg-muted transition-colors inline-flex items-center gap-1.5"
              >
                <span>Read Story</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            A specialized exam preparation platform and Computer-Based Testing (CBT) engine designed for engineering and competitive entrance students across Andhra Pradesh and Telangana. Includes comprehensive mock test engines, question paper archives, and hierarchical syllabus progression trackers.
          </p>

          {/* Key Architectural Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-background/60 border border-border/40 space-y-1.5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
                <Cloud size={15} className="text-primary" />
                <span>Google Drive Cloud Sync</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Replaced expensive cloud database overhead with direct, student-owned Google Drive backup. Zero monthly storage costs for the platform.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-background/60 border border-border/40 space-y-1.5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
                <Database size={15} className="text-primary" />
                <span>Multi-Stream CBT Engine</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Mirrors official testing environments for AP & TG ECET, POLYCET, and ICET with timer simulation, negative marking, and question review flags.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-background/60 border border-border/40 space-y-1.5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
                <Clock size={15} className="text-primary" />
                <span>Spaced Repetition & Recall</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Built-in revision tracking based on cognitive retention curves to ensure long-term mastery rather than last-minute rote cramming.
              </p>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="border-t border-border/30 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-foreground">Stack:</span>
              <span>React</span>
              <span aria-hidden="true">/</span>
              <span>TypeScript</span>
              <span aria-hidden="true">/</span>
              <span>Tailwind CSS</span>
              <span aria-hidden="true">/</span>
              <span>Google Drive API</span>
              <span aria-hidden="true">/</span>
              <span>Vite</span>
            </div>
            <span className="font-mono text-[11px]">Status: Live & Actively Maintained</span>
          </div>
        </div>

        {/* Product 2: Perfect Pack */}
        <div className="border border-border/60 rounded-xl bg-card/40 backdrop-blur-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="text-primary font-semibold">Creative Assets Toolkit</span>
                <span aria-hidden="true">·</span>
                <span>DaVinci Resolve Studio (macOS & Windows)</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-500 font-mono font-medium">$10 USD · In Development</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Perfect Pack for DaVinci Resolve
              </h2>
              <p className="text-sm font-mono text-muted-foreground">
                Bespoke Motion Design, Titles, Cinematic Text Treatments & Audio Assets
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link 
                to="/perfect-pack"
                className="px-3.5 py-2 text-xs font-medium rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors inline-flex items-center gap-1.5"
              >
                <span>View Product Page</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Distilled from over 700 real client video projects, Perfect Pack is an all-in-one creative companion built specifically for video editors using DaVinci Resolve Studio. Instead of generic templates, it offers battle-tested drag-and-drop DRFX presets designed to accelerate pacing without timeline clutter.
          </p>

          {/* Included Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-background/60 border border-border/40 space-y-1.5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
                <Film size={15} className="text-primary" />
                <span>Motion Titles & Typography</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Clean, modern title cards, lower thirds, and responsive kinetic text animations powered by custom Fusion macros.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-background/60 border border-border/40 space-y-1.5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
                <Layers size={15} className="text-primary" />
                <span>Film Textures & Overlays</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Atmospheric background textures, light leaks, subtle grain plates, and film burns crafted for cinematic grade integration.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-background/60 border border-border/40 space-y-1.5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
                <ShieldCheck size={15} className="text-primary" />
                <span>Drag & Drop DRFX Package</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Installs directly into DaVinci Resolve’s Effects Library with one double-click. Fully responsive controls inside the Edit Inspector.
              </p>
            </div>
          </div>

          {/* Product Status & Pricing Note */}
          <div className="border-t border-border/30 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">Launch Price:</span>
              <span className="font-mono text-foreground">$10 USD (One-time payment)</span>
            </div>
            <span className="font-mono text-[11px] text-amber-500">Active Development — Launching 2026</span>
          </div>
        </div>

      </main>
    </PageShell>
  );
}
export default ProductsPage;
