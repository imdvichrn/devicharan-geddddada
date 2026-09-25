import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { SEOHead } from '@/components/SEOHead';
import { getProjectById, projects } from '@/data/projects';
import { Window } from '@/components/CanonicalUI';
import { VideoEmbed } from '@/components/VideoEmbed';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { SVGLoadingSpinner, SVGSubscriptionSuccess } from '@/components/motion/MicroFeedback';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink,
  Layers, 
  Lightbulb, 
  Trophy, 
  Wrench, 
  Zap, 
  Calendar,
  User,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Globe,
  Bell
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PerfectPackPage from './PerfectPackPage';
import AnnapurnaFoundationPage from './projects/AnnapurnaFoundationPage';
import { PageShell } from '@/components/PageShell';

function ExamFlowDownloadCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({ title: 'Enter a valid email address', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      await fetch('/api/register-launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      setSubmitted(true);
      toast({ title: "You're registered!", description: "We'll notify you when desktop builds are available." });
    } catch {
      setSubmitted(true);
      toast({ title: "You're registered!", description: "We'll notify you when desktop builds are available." });
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 flex items-center gap-3 animate-in fade-in-0 duration-300">
        <SVGSubscriptionSuccess size={20} className="text-emerald-500" />
        <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-medium">
          You're on the early access notification list for ExamFlowOS desktop builds.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/40 space-y-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Bell className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-foreground text-sm sm:text-base">
          ExamFlowOS Desktop & Offline Access
        </h3>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        The web platform is live and fully accessible at <a href="https://examflowos.in" target="_blank" rel="noopener noreferrer" className="text-primary underline">examflowos.in</a>. Submit your email to receive notice when standalone desktop builds release.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-3.5 py-2 rounded-lg bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/95 transition-colors shrink-0 disabled:opacity-50 depth-interactive"
        >
          {loading ? (
            <span className="inline-flex items-center gap-1.5">
              <SVGLoadingSpinner size={12} />
              <span>Submitting...</span>
            </span>
          ) : (
            'Notify Me'
          )}
        </button>
      </form>
    </div>
  );
}

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  
  if (projectId === 'perfect-pack-plugin' || projectId === 'perfect-pack') {
    return <PerfectPackPage />;
  }

  if (projectId === 'annapurna-foundation') {
    return <AnnapurnaFoundationPage />;
  }
  
  const resolvedId = projectId === 'video-editing-post-production' ? 'video-editing-showcase' : projectId;
  const project = resolvedId ? getProjectById(resolvedId) : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <Window title="System Notice" className="max-w-md w-full text-center space-y-6">
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-normal text-foreground">Project Not Found</h1>
            <p className="text-xs text-muted-foreground">The requested case study does not exist or has been relocated.</p>
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to All Work</span>
          </Link>
        </Window>
      </div>
    );
  }

  const isExamFlow = project.id === 'examflow-os';
  const isSriLahari = project.id === 'sri-lahari-studios';
  const isVideoShowcase = project.id === 'video-editing-showcase';
  const hasVideo = Boolean(project.youtubeEmbedId && project.youtubeEmbedId !== 'YOUR_VIDEO_ID');

  // Related projects filtering
  const relatedProjects = projects.filter(p => p.id !== project.id).slice(0, 2);

  return (
    <PageShell>
      <SEOHead
        title={`${project.title} | Case Study | Geddada Devicharan`}
        description={project.shortDescription}
        path={`/project/${project.id}`}
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'Work', url: 'https://geddadadevicharan.vercel.app/work' },
          { name: project.title, url: `https://geddadadevicharan.vercel.app/project/${project.id}` }
        ]}
      />

      <main className="space-y-16">
        
        {/* Top Back Link */}
        <div>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Work</span>
          </Link>
        </div>

        {/* =========================================================================
            1. PROJECT HEADER (CANONICAL WINDOW CONTAINER)
            ========================================================================= */}
        <ScrollReveal distance={16}>
          <Window
            title={`${project.id} — Canonical Case Study`}
            statusText={project.credibilityBadge || 'Active Project'}
          >
            <div className="space-y-6">
              
              {/* Metadata Bar */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground border-b border-border/30 pb-4">
                <span className="text-primary font-semibold flex items-center gap-1.5">
                  <Calendar size={13} />
                  <span>{project.year}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-foreground flex items-center gap-1.5">
                  <User size={13} />
                  <span>{project.roles.join(', ')}</span>
                </span>
              </div>

              {/* Title & Short Description */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                  <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.08]">
                    {project.title}
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {isExamFlow ? (
                    <a
                      href="https://examflowos.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-sm depth-interactive"
                    >
                      <span>Launch Live Platform</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : project.externalLink ? (
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-sm depth-interactive"
                    >
                      <span>Visit Live Site</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : null}
                </div>
              </div>

            </div>
          </Window>
        </ScrollReveal>

        {/* =========================================================================
            2. PROJECT SHOWCASE (MEDIA FRAME OR INTERACTIVE PREVIEW)
            ========================================================================= */}
        {hasVideo ? (
          <ScrollReveal distance={18}>
            <section className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary/80" />
                <span>PROJECT MEDIA SHOWCASE</span>
              </div>
              <div className="border border-border/60 rounded-2xl bg-black/40 overflow-hidden p-4 sm:p-8 shadow-2xl">
                <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-border/40 shadow-2xl">
                  <VideoEmbed
                    youtubeId={project.youtubeEmbedId!}
                    title={`${project.title} Showcase`}
                    className="aspect-video w-full"
                  />
                </div>
              </div>
            </section>
          </ScrollReveal>
        ) : isSriLahari ? (
          <ScrollReveal distance={18}>
            <section className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary/80" />
                <span>DIGITAL SYSTEM ARCHITECTURE</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 rounded-xl border border-border/40 bg-card/30 space-y-2">
                  <div className="text-xs font-mono text-primary font-medium">01 / WEB PLATFORM</div>
                  <div className="font-semibold text-foreground text-sm">Responsive Showcase</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    High-performance web portfolio highlighting weddings, traditional events, and commercial film equipment.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-border/40 bg-card/30 space-y-2">
                  <div className="text-xs font-mono text-primary font-medium">02 / BRAND IDENTITY</div>
                  <div className="font-semibold text-foreground text-sm">Unified Visuals</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Refined studio logo, cohesive color system, and modern typography across physical and digital formats.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-border/40 bg-card/30 space-y-2">
                  <div className="text-xs font-mono text-primary font-medium">03 / LOCAL SEARCH</div>
                  <div className="font-semibold text-foreground text-sm">Regional SEO</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Top map discoverability across Kothavalasa, Chinnamushidiwada, and Vizag districts.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-border/40 bg-card/30 space-y-2">
                  <div className="text-xs font-mono text-primary font-medium">04 / AUTOMATION</div>
                  <div className="font-semibold text-foreground text-sm">Inquiry Webhooks</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Instant webhook triggers routing client inquiries directly to WhatsApp for rapid quote response.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        ) : null}

        {/* =========================================================================
            3. PROJECT OVERVIEW & ABOUT THIS PROJECT
            ========================================================================= */}
        <ScrollReveal distance={16}>
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
                  Project Overview
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
                  About This Project
                </h2>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl border border-border/50 bg-card/25 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Project Parameters
              </div>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span className="text-muted-foreground">Timeline</span>
                  <span className="text-foreground font-medium">{project.year}</span>
                </div>
                <div className="flex justify-between border-b border-border/30 pb-2">
                  <span className="text-muted-foreground">Discipline</span>
                  <span className="text-primary font-medium capitalize">{project.category}</span>
                </div>
                {project.credibilityBadge && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Key Highlight</span>
                    <span className="text-emerald-500 font-semibold">{project.credibilityBadge}</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* =========================================================================
            4. THE CHALLENGE & APPROACH / OUTCOME
            ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <ScrollReveal distance={16} staggerIndex={0}>
            <div className="p-8 sm:p-10 rounded-2xl border border-border/50 bg-card/25 space-y-4 h-full">
              <div className="flex items-center gap-2 text-amber-500 text-xs font-mono uppercase tracking-wider font-semibold">
                <Lightbulb size={16} />
                <span>The Challenge</span>
              </div>
              <h3 className="font-display text-2xl font-normal text-foreground">
                What Needed Solving
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {project.challenge}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal distance={16} staggerIndex={1}>
            <div className="p-8 sm:p-10 rounded-2xl border border-border/50 bg-card/25 space-y-4 h-full">
              <div className="flex items-center gap-2 text-emerald-500 text-xs font-mono uppercase tracking-wider font-semibold">
                <Trophy size={16} />
                <span>My Approach & Results</span>
              </div>
              <h3 className="font-display text-2xl font-normal text-foreground">
                Delivered Outcome
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {project.outcome}
              </p>
            </div>
          </ScrollReveal>

        </section>

        {/* ExamFlowOS Desktop Early Access */}
        {isExamFlow && (
          <ScrollReveal distance={16}>
            <ExamFlowDownloadCTA />
          </ScrollReveal>
        )}

        {/* =========================================================================
            5. TECHNICAL & CREATIVE SPECIFICATIONS
            ========================================================================= */}
        <ScrollReveal distance={18}>
          <section className="p-8 sm:p-10 rounded-2xl border border-border/50 bg-card/25 space-y-8">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium flex items-center gap-2">
                <Wrench size={14} />
                <span>Tools & Engineering Details</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
                Technical & Creative Specifications
              </h3>
            </div>

            {/* Tools Badge Array */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-muted-foreground">Primary Tools & Stack</div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-primary/10 border border-primary/20 text-primary font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Specifications Grid */}
            <div className="space-y-3 pt-4 border-t border-border/30">
              <div className="text-xs font-mono text-muted-foreground">System Specifications</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.technicalDetails.map((detail, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl border border-border/30 bg-background/50 text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5 leading-relaxed"
                  >
                    <Zap size={14} className="text-primary shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* =========================================================================
            6. RELATED PROJECTS & BOTTOM NAVIGATION
            ========================================================================= */}
        <ScrollReveal distance={16}>
          <section className="space-y-8 pt-6 border-t border-border/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-display text-2xl font-normal text-foreground">
                  More Work
                </h3>
                <p className="text-xs text-muted-foreground">
                  Explore other production systems across software, video, and web.
                </p>
              </div>
              <Link
                to="/work"
                className="text-xs font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
              >
                <span>View All Projects</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/project/${rel.id}`}
                  className="p-6 rounded-2xl border border-border/50 bg-card/20 hover:bg-card/40 transition-all duration-300 space-y-3 group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span className="text-primary font-medium capitalize">{rel.category}</span>
                      <span>{rel.year}</span>
                    </div>
                    <h4 className="font-display text-xl font-normal text-foreground group-hover:text-primary transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/30 text-xs font-mono text-foreground/80 flex items-center justify-between">
                    <span>Read Case Study</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>

      </main>
    </PageShell>
  );
}
