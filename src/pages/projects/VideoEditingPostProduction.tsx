import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronRight, 
  Film, 
  Palette, 
  Volume2, 
  Sliders, 
  Sparkles,
  ExternalLink,
  Monitor,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { VideoWindow } from '@/components/VideoWindow';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';
import { generateBreadcrumbSchema, generateVideoObjectSchema, generateCreativeWorkSchema } from '@/lib/structuredData';

export function VideoEditingPostProduction() {
  const title = "Video Editing & Post-Production";
  const description = "High-volume commercial post-production operating in DaVinci Resolve Studio on macOS. Over 700 client video projects delivered across commercial spots, short-form reels, color grading, Fusion motion graphics, and Fairlight audio mastering.";
  const year = "2024–Present";
  const primaryVideoId = "cmk8S96EDQ0";

  const tools = [
    "DaVinci Resolve Studio",
    "Color Grading (CST Workflows)",
    "Fusion Motion Graphics",
    "Fairlight Audio Mastering",
    "Speed Ramping & Rhythm",
    "Multi-Camera Sync"
  ];

  const roles = [
    "Video Editor",
    "Post-Production Specialist",
    "Colorist",
    "Motion Designer"
  ];

  const formats = [
    {
      num: "01",
      title: "Short-Form Content & Social Reels",
      count: "250+ Delivered",
      desc: "Fast-paced, hook-driven edits engineered for high retention across Instagram Reels and YouTube Shorts. Focus on tight pacing, dynamic sound layering, and visual continuity."
    },
    {
      num: "02",
      title: "Product Ads & Commercial Spots",
      count: "120+ Delivered",
      desc: "Polished brand promos, studio product showcases, and launch commercials featuring crisp typography, callout animations, and broadcast-ready audio polish."
    },
    {
      num: "03",
      title: "Song Shoots & Music Videos",
      count: "80+ Delivered",
      desc: "Rhythmic cutting aligned precisely with musical beats, mood-driven color palettes, speed ramping, and cinematic storytelling for musical productions."
    },
    {
      num: "04",
      title: "Creative & Event Productions",
      count: "250+ Delivered",
      desc: "Multi-camera timeline synchronization, chronological storytelling, and comprehensive audio levelling for studio events, documentaries, and wedding films."
    }
  ];

  const workflowModules = [
    {
      icon: Film,
      title: "Timeline Editing & Pacing",
      desc: "Precision ripple and roll edits, dynamic speed ramping, and narrative rhythm optimized for viewer attention and seamless scene transitions."
    },
    {
      icon: Palette,
      title: "Node-Based Color Grading",
      desc: "Color Space Transform (CST) node pipelines, primary exposure balancing, custom curves, hue-vs-hue tuning, and cohesive visual look development."
    },
    {
      icon: Sparkles,
      title: "Fusion Motion Design",
      desc: "Integrated node-based compositing, kinetic titles, lower thirds, callout tracking, and graphic overlays created natively in DaVinci Fusion."
    },
    {
      icon: Volume2,
      title: "Fairlight Audio Mastering",
      desc: "Dialogue cleaning, noise reduction, EQ notch filtering, multi-track sound effects layering, and loudness normalization for broadcast standards."
    }
  ];

  return (
    <PageShell maxWidth="wide">
      <SEOHead
        title="Video Editing & Post-Production — Geddada Devicharan"
        description={description}
        path="/projects/video-editing-post-production"
        breadcrumbs={[
          { name: "Home", url: "https://geddadadevicharan.vercel.app" },
          { name: "Work", url: "https://geddadadevicharan.vercel.app/work" },
          { name: title, url: "https://geddadadevicharan.vercel.app/projects/video-editing-post-production" }
        ]}
        structuredData={[
          generateVideoObjectSchema({
            title: title,
            description: description,
            youtubeId: primaryVideoId,
            uploadDate: "2024-01-01"
          }),
          generateCreativeWorkSchema({
            title: title,
            description: description,
            tools: tools,
            roles: roles,
            year: year
          })
        ]}
      />

      <main className="space-y-16 sm:space-y-24">
        
        {/* Top Wayfinding & Navigation */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/work" className="hover:text-foreground transition-colors">Work</Link>
            <ChevronRight size={12} />
            <span className="text-foreground font-medium">Video Editing</span>
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
            1. HERO & POSITIONING (Spacious Editorial Style)
            ========================================================================= */}
        <header className="space-y-8 max-w-4xl">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary font-semibold uppercase tracking-wider border border-primary/20">
                Post-Production · DaVinci Resolve Studio
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">700+ Client Projects</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{year}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05]">
              Video Editing & Post-Production
            </h1>

            <p className="text-lg sm:text-2xl font-light text-muted-foreground leading-relaxed">
              "700+ client video projects delivered with precision pacing, node-based color grading, and broadcast audio."
            </p>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            As a video editor, post-production specialist, and colorist operating in <strong className="text-foreground font-medium">DaVinci Resolve Studio</strong> on macOS, I handle the full post-production lifecycle for commercial spots, short-form social reels, product advertisements, song shoots, and creative productions.
          </p>

          {/* Specialty Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {tools.map((tool) => (
              <span 
                key={tool}
                className="px-3 py-1.5 rounded-lg border border-border/60 bg-card/40 text-xs font-mono text-foreground/90"
              >
                {tool}
              </span>
            ))}
          </div>
        </header>

        {/* =========================================================================
            2. HERO FEATURED SHOWCASE (Dominant Large Video Frame)
            ========================================================================= */}
        <section className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
            FEATURED REEL · CINEMATIC SHOWCASE
          </div>

          <VideoWindow 
            youtubeId={primaryVideoId}
            title="ExamFlowOS — Cinematic Product Trailer & Editing Showcase"
            className="w-full shadow-[0_12px_40px_-8px_rgba(0,0,0,0.35)]"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-border/40 bg-card/20 text-xs text-muted-foreground">
            <div>
              <strong className="text-foreground font-medium">Featured Deliverable:</strong> High-impact commercial trailer combining dynamic cutting, custom title callouts, and clean color grading.
            </div>
            <div className="font-mono text-primary text-[11px] shrink-0">
              Environment: DaVinci Resolve Studio (macOS)
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. PRODUCTION SCOPE & FORMATS (Spacious Editorial Layout)
            ========================================================================= */}
        <section className="space-y-8 pt-8 border-t border-border/40">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              01 · PRODUCTION SCOPE
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
              700+ Delivered Projects Across Formats
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Consistently executing high-volume client deliverables while maintaining tight visual standards and audio clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formats.map((fmt) => (
              <div 
                key={fmt.num}
                className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/30 backdrop-blur-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-primary font-semibold">{fmt.num}</span>
                    <span className="text-muted-foreground bg-background/60 border border-border/40 px-2.5 py-1 rounded-md">
                      {fmt.count}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {fmt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {fmt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            4. TECHNICAL POST-PRODUCTION PIPELINE
            ========================================================================= */}
        <section className="space-y-8 pt-8 border-t border-border/40">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              02 · WORKSTATION PIPELINE
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
              DaVinci Resolve Studio Workflow
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Operating natively on macOS with hardware-accelerated timeline editing, node-based color management, and broadcast audio tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div 
                  key={mod.title}
                  className="p-6 rounded-2xl border border-border/50 bg-card/30 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground font-mono">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            5. ADDITIONAL SHOWCASE GALLERY (Large Media Previews)
            ========================================================================= */}
        <section className="space-y-8 pt-8 border-t border-border/40">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
              03 · ADDITIONAL SHOWCASES
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
              Selected Editing & Post-Production Cuts
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <VideoWindow 
                youtubeId="N68iysGT2DU"
                title="Commercial Post-Production Showcase"
                className="w-full shadow-lg"
              />
              <div className="px-2 space-y-1">
                <h3 className="text-sm font-semibold text-foreground">Commercial & Promos Showcase</h3>
                <p className="text-xs text-muted-foreground">Focusing on graphic callouts, rhythmic cutting, and clean audio balancing.</p>
              </div>
            </div>

            <div className="space-y-3">
              <VideoWindow 
                youtubeId="fkniR6CZWsY"
                title="Additional Creative Post-Production Reel"
                className="w-full shadow-lg"
              />
              <div className="px-2 space-y-1">
                <h3 className="text-sm font-semibold text-foreground">Creative & Short-Form Reel</h3>
                <p className="text-xs text-muted-foreground">Highlighting speed ramping, color correction, and mood-driven music syncing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. POST-PRODUCTION PRINCIPLES
            ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-2xl border border-border/50 bg-card/30 space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              04 · PHILOSOPHY
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-normal text-foreground">
              Editorial Discipline
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2">
            <div className="space-y-2 border-t border-border/40 pt-4">
              <strong className="text-foreground block font-mono text-xs">Pacing Drives Emotion</strong>
              Cutting on action and aligning transition speed to underlying audio beats keeps audiences engaged without visual fatigue.
            </div>
            <div className="space-y-2 border-t border-border/40 pt-4">
              <strong className="text-foreground block font-mono text-xs">Color Serves Intent</strong>
              Grade palette choices are designed to guide viewer eye position and mood, maintaining natural skin tones and consistent contrast.
            </div>
            <div className="space-y-2 border-t border-border/40 pt-4">
              <strong className="text-foreground block font-mono text-xs">Audio Is Half the Film</strong>
              Clean dialogue leveling, surgical EQ filtering, and precise sound effects placement transform raw edits into polished productions.
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. BOTTOM WAYFINDING & CALL TO ACTION
            ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-2xl border border-border/60 bg-card/40 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/40">
            <div className="space-y-2">
              <div className="text-xs font-mono text-primary font-medium uppercase tracking-wider">
                COMMISSIONS & COLLABORATIONS
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-normal text-foreground">
                Need Professional Post-Production?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
                Available for commercial post-production, short-form editing, and color grading projects.
              </p>
            </div>

            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors shrink-0 shadow-md"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
            <Link to="/work" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
              <ArrowLeft size={12} />
              <span>Return to Work Overview</span>
            </Link>
            <Link to="/project/examflow-os" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
              <span>View Case Study: ExamFlowOS</span>
              <ChevronRight size={12} />
            </Link>
          </div>
        </section>

      </main>
    </PageShell>
  );
}

export default VideoEditingPostProduction;
