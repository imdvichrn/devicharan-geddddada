import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Volume2, 
  ChevronRight,
  Monitor
} from 'lucide-react';
import { 
  VideoStudioIcon, 
  ColorScienceIcon 
} from '@/components/icons/PortfolioIcons';
import { VideoEmbed } from '@/components/VideoEmbed';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';

export function VideoPage() {
  const primaryVideoId = "cmk8S96EDQ0";

  return (
    <PageShell>
      <SEOHead
        title="Video Editing & Post-Production — 700+ Deliverables | Geddada Devicharan"
        description="High-volume commercial post-production operating in DaVinci Resolve Studio on macOS. 700+ client video projects completed across commercial spots, short-form reels, color grading, motion graphics, and broadcast audio."
        path="/video"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'Work', url: 'https://geddadadevicharan.vercel.app/work' },
          { name: 'Video & Post-Production', url: 'https://geddadadevicharan.vercel.app/video' }
        ]}
      />

      <main className="space-y-16">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-2">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/work" className="hover:text-foreground transition-colors">Work</Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">Video & Post-Production</span>
        </nav>

        {/* =========================================================================
            1. INTRO
            ========================================================================= */}
        <header className="space-y-4 max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
            DISCIPLINE 02 · VIDEO & CREATIVE PRODUCTION
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05]">
            700+ Client Video Projects
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            High-throughput commercial post-production operating in <strong className="text-foreground font-medium">DaVinci Resolve Studio</strong> on macOS. Video editing, colorist workflows, node-based color transforms, motion design, and Fairlight broadcast audio mastering.
          </p>
        </header>

        {/* =========================================================================
            2. FEATURED REEL / MEDIA
            ========================================================================= */}
        <section className="space-y-6">
          <div className="depth-widget overflow-hidden">
            <WindowChrome 
              title="DaVinci Resolve Studio — Post-Production Reel"
              rightElement={
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-mono text-primary font-medium">macOS Pipeline</span>
                </div>
              }
            />

            {/* Cinematic Video Embed */}
            <div className="p-4 sm:p-8 bg-black/40">
              <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border/40">
                <VideoEmbed 
                  youtubeId={primaryVideoId}
                  title="Geddada Devicharan — Video Editing & Post-Production Reel"
                  className="aspect-video w-full"
                />
              </div>
            </div>

            <div className="p-6 sm:p-8 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground text-base">
                  Commercial & Short-Form Post-Production Showcase
                </h3>
                <p className="text-xs text-muted-foreground">
                  Highlighting pacing, dynamic sound layering, and color grading across selected deliverables.
                </p>
              </div>
              <Link
                to="/writing"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl depth-surface depth-interactive hover:border-foreground/40 text-foreground transition-colors shrink-0"
              >
                <span>Read Post-Mortem Log</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. SELECTED WORK
            ========================================================================= */}
        <section className="space-y-8 pt-8 border-t border-border/50">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Production Scope
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
              Selected Work Across Formats
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="font-semibold text-foreground text-sm">Short-Form & Social Reels</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Fast-paced, hook-driven edits optimized for Instagram Reels, YouTube Shorts, and high audience retention.
                </p>
              </div>
              <div className="text-[11px] font-mono text-primary pt-3 border-t border-border/40 font-medium">
                250+ delivered
              </div>
            </div>

            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="font-semibold text-foreground text-sm">Commercial & Brand Promos</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Polished corporate deliverables, studio showcases, and product launch videos with crisp typography and audio.
                </p>
              </div>
              <div className="text-[11px] font-mono text-primary pt-3 border-t border-border/40 font-medium">
                120+ delivered
              </div>
            </div>

            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="font-semibold text-foreground text-sm">Song Shoots & Music Videos</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Rhythmic cutting, mood-driven color palettes, speed ramping, and narrative storytelling for musical productions.
                </p>
              </div>
              <div className="text-[11px] font-mono text-primary pt-3 border-t border-border/40 font-medium">
                80+ delivered
              </div>
            </div>

            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="font-semibold text-foreground text-sm">Event & Studio Documentaries</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Multi-camera synchronization, chronological pacing, and emotional story arcs for wedding and large studio events.
                </p>
              </div>
              <div className="text-[11px] font-mono text-primary pt-3 border-t border-border/40 font-medium">
                250+ delivered
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. COLOR / GRADING
            ========================================================================= */}
        <section className="space-y-6 pt-8 border-t border-border/50">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
              Colorist Discipline
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
              Node-Based Color Grading & Color Science
            </h2>
          </div>

          <div className="p-8 rounded-2xl depth-widget space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <ColorScienceIcon size={20} strokeWidth={1.6} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">DaVinci YRGB Color Managed & ACES</h3>
                <div className="text-xs text-muted-foreground font-mono">Precision Color Correction & Creative Look Design</div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
              Operating within DaVinci Resolve Studio’s node tree pipeline. Handling color space transformations (CST) across mixed camera profiles (Sony S-Log3, Canon Log, Apple ProRes), precise skin-tone vector isolation, highlight roll-off protection, and print film emulation curves.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/40 font-mono text-xs text-foreground/80">
              <div>• ACES & DaVinci YRGB</div>
              <div>• Skin tone qualification</div>
              <div>• Multi-cam match</div>
              <div>• Film grain / Halation</div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. POST-PRODUCTION & AUDIO
            ========================================================================= */}
        <section className="space-y-6 pt-8 border-t border-border/50">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-500 font-medium">
              Acoustic Precision
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
              Fairlight Audio Mastering & Sound Design
            </h2>
          </div>

          <div className="p-8 rounded-2xl depth-widget space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <Volume2 size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Broadcast Audio Standards & Foley Layering</h3>
                <div className="text-xs text-muted-foreground font-mono">ITU-R BS.1770 Loudness Compliance</div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
              Clean dialogue isolation, spectral de-noising, parametric equalization, and sidechain ducking. Mastered to strict target loudness (-14 LUFS integrated for digital social platforms with -1.0 dB True Peak ceiling) so soundscapes never distort or get compressed by platform normalization algorithms.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/40 font-mono text-xs text-foreground/80">
              <div>• -14 LUFS integrated</div>
              <div>• Dialogue de-noising</div>
              <div>• Multitrack Foley</div>
              <div>• Dynamics EQ & Limiter</div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. MOTION & PERFECT PACK
            ========================================================================= */}
        <section className="space-y-6 pt-8 border-t border-border/50">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
              Motion Graphics
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
              Fusion VFX & Kinetic Typography
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl depth-widget flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-primary font-medium">
                <span>$10 USD</span>
                <span aria-hidden="true">·</span>
                <span>In Timeline Development</span>
                <span aria-hidden="true">·</span>
                <span>DRFX Package</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
                Perfect Pack for DaVinci Resolve Studio
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Derived directly from 700+ finished projects: a drag-and-drop toolkit containing custom motion graphics, kinetic text treatments, film textures, and sound design elements.
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
        </section>

        {/* =========================================================================
            7. PROCESS (CONCISE & SCANNABLE)
            ========================================================================= */}
        <section className="space-y-8 pt-8 border-t border-border/50">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
              Pipeline Execution
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
              Post-Production Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="p-5 rounded-2xl depth-widget depth-interactive space-y-2">
              <div className="text-xs font-mono text-primary font-semibold">01 — EDIT</div>
              <div className="font-semibold text-foreground text-sm">Story & Pacing</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Story, pacing, narrative rhythm, and timeline assembly structure.
              </p>
            </div>

            <div className="p-5 rounded-2xl depth-widget depth-interactive space-y-2">
              <div className="text-xs font-mono text-primary font-semibold">02 — COLOR</div>
              <div className="font-semibold text-foreground text-sm">Grading & Look</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Color correction and grading in DaVinci Resolve Studio.
              </p>
            </div>

            <div className="p-5 rounded-2xl depth-widget depth-interactive space-y-2">
              <div className="text-xs font-mono text-primary font-semibold">03 — MOTION</div>
              <div className="font-semibold text-foreground text-sm">Titles & VFX</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Titles, kinetic graphics, lower-thirds, and Fusion compositing.
              </p>
            </div>

            <div className="p-5 rounded-2xl depth-widget depth-interactive space-y-2">
              <div className="text-xs font-mono text-primary font-semibold">04 — SOUND</div>
              <div className="font-semibold text-foreground text-sm">Fairlight Mix</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Sound design, Foley synchronization, and broadcast loudness compliance.
              </p>
            </div>

            <div className="p-5 rounded-2xl depth-widget depth-interactive space-y-2">
              <div className="text-xs font-mono text-primary font-semibold">05 — DELIVERY</div>
              <div className="font-semibold text-foreground text-sm">Final Finishing</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Platform-specific master exports, bitrate optimization, and finishing.
              </p>
            </div>

          </div>
        </section>

        {/* =========================================================================
            8. TOOLS & ENVIRONMENT
            ========================================================================= */}
        <section className="space-y-6 pt-8 border-t border-border/50">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Hardware & Environment
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
              Primary Studio Software & Tools
            </h2>
          </div>

          <div className="p-6 rounded-2xl depth-widget flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-foreground font-semibold text-base">
                <Monitor size={18} className="text-primary" />
                <span>DaVinci Resolve Studio on macOS Workstation</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Official Studio License with hardware-accelerated ProRes processing, Fusion node engine, and Fairlight sound deck.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1.5 rounded-xl depth-surface font-mono text-xs text-foreground">
                macOS
              </span>
              <span className="px-3 py-1.5 rounded-xl depth-surface font-mono text-xs text-primary font-medium">
                DaVinci Resolve Studio
              </span>
            </div>
          </div>
        </section>

        {/* Navigation Footer */}
        <section className="pt-12 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Explore More Spaces
            </h3>
            <p className="text-xs text-muted-foreground">
              Continue to software products or managed web ecosystems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/software" 
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-xl depth-surface depth-interactive text-foreground transition-colors"
            >
              <span>Software & Products</span>
              <ArrowRight size={13} />
            </Link>
            <Link 
              to="/web" 
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 depth-interactive transition-colors shadow-sm"
            >
              <span>Websites & Digital Presence</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </section>

      </main>
    </PageShell>
  );
}

export default VideoPage;
