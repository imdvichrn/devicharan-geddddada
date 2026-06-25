import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { VideoEmbed } from '@/components/VideoEmbed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WindowChrome } from '@/components/WindowChrome';
import { 
  ArrowLeft, 
  Play, 
  Calendar, 
  User, 
  Target,
  Lightbulb,
  Trophy,
  Wrench,
  Zap,
  ExternalLink,
  Bell,
  CheckCircle,
  BookOpen,
  Brain,
  Headphones,
  BarChart3
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getProjectById } from '@/data/projects';
import { generateProductSchema, generatePluginSchema, generateProjectSchema, generateBreadcrumbSchema, generateExamFlowOSSchema, generateEchoessBrandSchema } from '@/lib/structuredData';
import { HiddenIdentityBlock } from '@/components/SEOContent';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import PerfectPackPage from './PerfectPackPage';

function ExamFlowDownloadCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      toast({ title: 'Enter a valid email', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('launch_registrations').insert({ email });
      if (error && error.code === '23505') {
        toast({ title: "You're already on the list!", description: "We'll notify you when the download is ready." });
        setSubmitted(true);
      } else if (error) {
        throw error;
      } else {
        setSubmitted(true);
        toast({ title: "You're in! 🎉", description: "We'll send you the download link when it's ready." });
      }
    } catch {
      toast({ title: 'Something went wrong', variant: 'destructive' });
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
      >
        <CheckCircle className="text-emerald-400 h-5 w-5 shrink-0" />
        <p className="text-sm text-foreground">You're on the list! We'll send you the download link as soon as it's available.</p>
      </motion.div>
    );
  }

  return (
    <Card className="glass-panel border-glass-border">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Download Coming Soon</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          The downloadable version is currently in development. Drop your email and we'll send you the link the moment it's ready.
        </p>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="flex-1 bg-background/50 border-glass-border"
          />
          <Button onClick={handleSubmit} disabled={loading} className="bg-primary hover:bg-primary/90 shrink-0">
            {loading ? 'Joining...' : 'Notify Me'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  
  if (projectId === 'perfect-pack-plugin') {
    return <PerfectPackPage />;
  }
  
  const project = projectId ? getProjectById(projectId) : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 px-4 flex items-center justify-center min-h-[60vh]">
          <Card className="glass-panel border-glass-border max-w-md">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
              <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist.</p>
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Portfolio
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isExamFlow = project.id === 'examflow-os';
  const hasVideo = Boolean(project.youtubeEmbedId && project.youtubeEmbedId !== 'YOUR_VIDEO_ID');

  // Per-project SEO metadata (invisible) — natural language, no stuffing on UI
  const seoConfig: Record<string, { title: string; description: string; keywords: string; ogTitle?: string; ogImage?: string }> = {
    'examflow-os': {
      title: 'ExamFlowOS | Smart Recall & AI Study System',
      description: 'AI-powered study system with smart recall, spaced repetition, syllabus tracking, focus mode, productivity tools, and exam analytics. Built by Geddada Devicharan.',
      keywords: 'ExamFlowOS, AI study system, spaced repetition, smart recall, study OS, focus system, exam preparation, student productivity, gamified learning, syllabus tracker, exam analytics, Geddada Devicharan, imdvichrn',
      ogTitle: 'ExamFlowOS — Smart Recall & AI Study System',
      ogImage: 'https://geddadadevicharan.vercel.app/og/og-examflowos.png?v=3',
    },
    'video-production': {
      title: 'Professional Video Production — Geddada Devicharan',
      description: 'Cinematic 4K video production with DaVinci Resolve color grading, Fusion VFX, and Fairlight sound design by Geddada Devicharan.',
      keywords: 'professional video production, cinematic video editor, davinci resolve color grading, fusion vfx, fairlight sound design, 4k workflow, Geddada Devicharan, imdvichrn',
    },
    'scenesync-edits': {
      title: 'SceneSync Edits — Beat-Synced Reels & Music Edits',
      description: 'SceneSync Edits — frame-perfect beat-synchronized reels and music edits with dynamic transitions and audio-reactive visuals by Geddada Devicharan.',
      keywords: 'beat sync editing, music video editing, reels editor, audio reactive visuals, dynamic transitions, davinci resolve, Geddada Devicharan, imdvichrn',
    },
    'visual-design': {
      title: 'Visual Design — Brand, Thumbnails & Reels Assets',
      description: 'Visual design portfolio by Geddada Devicharan — brand identity, YouTube thumbnails, social graphics, and creator visual systems.',
      keywords: 'visual design portfolio, brand identity, youtube thumbnail designer, social media graphics, creator visual system, Geddada Devicharan, imdvichrn',
    },
    'growth-strategy': {
      title: 'Growth Strategy & Digital Marketing | Geddada Devicharan',
      description: 'Data-driven growth strategy, content systems, and creator-economy marketing playbooks by Geddada Devicharan (imdvichrn).',
      keywords: 'growth strategy, digital marketing, content strategy, creator economy, audience research, kpi tracking, Geddada Devicharan, imdvichrn',
    },
    'data-research': {
      title: 'Data Research & Analysis | Geddada Devicharan',
      description: 'Structured data research, analysis and documentation services by Geddada Devicharan — accuracy, clarity, and actionable insight.',
      keywords: 'data research, market research, data analysis, documentation, Geddada Devicharan, imdvichrn',
    },
    'video-editing-post-production': {
      title: 'Video Editing & Post-Production Showcase | Geddada Devicharan',
      description: 'Professional post-production showcase: advanced editing, color correction, sound design, and Fusion motion graphics by Geddada Devicharan.',
      keywords: 'video editing, post production, color correction, sound design, fusion motion graphics, davinci resolve, Geddada Devicharan, imdvichrn',
    },
    'echoless': {
      title: 'Echoless | Multi-Model AI Workflow System',
      description: 'Multi-model AI workflow system designed for intelligent automation, reasoning enhancement, and adaptive workflow execution. Built by Geddada Devicharan.',
      keywords: 'Echoless, AI workflow system, multi-model AI, automation systems, AI orchestration, workflow intelligence, adaptive workflow, Geddada Devicharan, imdvichrn',
      ogTitle: 'Echoless — Multi-Model AI Workflow System',
    },
    'perfect-pack': {
      title: 'Perfect Pack for DaVinci Resolve | Cinematic Editing Toolkit',
      description: 'Professional DaVinci Resolve toolkit featuring cinematic presets, transitions, sound effects, editing assets, and workflow tools by Geddada Devicharan.',
      keywords: 'Perfect Pack, DaVinci Resolve toolkit, cinematic editing pack, DaVinci Resolve presets, editing toolkit, transitions, LUTs, sound effects, cinematic workflow, editing assets, Geddada Devicharan, imdvichrn',
      ogTitle: 'Perfect Pack — Cinematic Editing Toolkit for DaVinci Resolve',
      ogImage: 'https://geddadadevicharan.vercel.app/og/og-perfectpack.png?v=3',
    },
    'perfect-pack-plugin': {
      title: 'Perfect Pack for DaVinci Resolve | Cinematic Editing Toolkit',
      description: 'Professional DaVinci Resolve toolkit featuring cinematic presets, transitions, sound effects, editing assets, and workflow tools by Geddada Devicharan.',
      keywords: 'Perfect Pack, DaVinci Resolve toolkit, cinematic editing pack, DaVinci Resolve presets, editing toolkit, transitions, LUTs, sound effects, cinematic workflow, editing assets, Geddada Devicharan, imdvichrn',
      ogTitle: 'Perfect Pack — Cinematic Editing Toolkit for DaVinci Resolve',
      ogImage: 'https://geddadadevicharan.vercel.app/og/og-perfectpack.png?v=3',
    },
  };

  const seo = seoConfig[project.id] ?? {
    title: `${project.title} — by Geddada Devicharan (imdvichrn)`,
    description: `${project.title}: ${project.shortDescription} — built by Geddada Devicharan (imdvichrn).`.slice(0, 160),
    keywords: `${project.title}, ${project.tools.join(', ')}, Geddada Devicharan, imdvichrn, Geddada Devicharan ${project.category}, Geddada Devicharan portfolio`,
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta name="author" content="Geddada Devicharan" />
        <meta property="og:type" content={isExamFlow ? 'website' : 'article'} />
        <meta property="og:title" content={seo.ogTitle ?? seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={`https://geddadadevicharan.vercel.app/project/${projectId}`} />
        <meta property="og:image" content={seo.ogImage ?? 'https://geddadadevicharan.vercel.app/og/og-home.png?v=3'} />
        <meta property="og:image:secure_url" content={seo.ogImage ?? 'https://geddadadevicharan.vercel.app/og/og-home.png?v=3'} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={seo.ogTitle ?? seo.title} />
        <meta property="og:site_name" content="Geddada Devicharan" />
        <meta name="application-name" content="Geddada Devicharan" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://geddadadevicharan.vercel.app/project/${projectId}`} />
        <meta name="twitter:title" content={seo.ogTitle ?? seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage ?? 'https://geddadadevicharan.vercel.app/og/og-home.png?v=3'} />
        <meta name="twitter:image:alt" content={seo.ogTitle ?? seo.title} />
        <meta name="twitter:creator" content="@imdvichrn" />
        <link rel="canonical" href={`https://geddadadevicharan.vercel.app/project/${projectId}`} />
        <script type="application/ld+json">{JSON.stringify(generateProjectSchema({
          id: project.id,
          title: project.title,
          description: project.longDescription,
          year: project.year,
          tools: project.tools,
        }))}</script>
        <script type="application/ld+json">{JSON.stringify(generateBreadcrumbSchema([
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'Projects', url: 'https://geddadadevicharan.vercel.app/#projects' },
          { name: project.title, url: `https://geddadadevicharan.vercel.app/project/${projectId}` },
        ]))}</script>
        {isExamFlow && (
          <>
            <script type="application/ld+json">{JSON.stringify(generateExamFlowOSSchema())}</script>
            <script type="application/ld+json">{JSON.stringify(generateEchoessBrandSchema())}</script>
          </>
        )}
        {project.id === 'davinci-workflow-plugin' && (
          <>
            <script type="application/ld+json">
              {JSON.stringify(generateProductSchema({
                name: 'DaVinci Resolve Pro-Stream Plugin',
                description: 'Boost your editing speed by 30% with this custom DaVinci Resolve workflow utility.',
                price: '10.00',
                currency: 'USD',
              }))}
            </script>
            <script type="application/ld+json">
              {JSON.stringify(generatePluginSchema())}
            </script>
          </>
        )}
      </Helmet>

      <HiddenIdentityBlock page="project" projectTitle={project.title} projectId={project.id} projectKeywords={seo.keywords} />

      <Navigation />

      <main className="pt-20 md:pt-28 pb-16 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <Link 
            to="/#projects" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          {/* Hero Header */}
          <Card className="glass-elevated border-glass-border">
            <CardHeader className="space-y-4">
              <WindowChrome className="mb-2" />

              {/* ExamFlow Logo + Live Demo */}
              {isExamFlow && (
                <div className="flex items-center gap-4 mb-2">
                  <img 
                    src="/examflow-logo.jpg" 
                    alt="ExamFlow OS Logo" 
                    className="w-16 h-16 rounded-2xl shadow-lg"
                  />
                  <div className="flex-1" />
                  {project.externalLink && (
                    <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Try Live Demo
                      </Button>
                    </a>
                  )}
                </div>
              )}
              
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Calendar className="mr-1 h-3 w-3" />
                  {project.year}
                </Badge>
                {project.roles.map((role) => (
                  <Badge key={role} variant="outline" className="border-primary/20">
                    <User className="mr-1 h-3 w-3" />
                    {role}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {project.title}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground">
                {project.shortDescription}
              </p>

              {!isExamFlow && project.externalLink && (
                <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 mt-2">
                    <ExternalLink className="h-4 w-4" />
                    View Live
                  </Button>
                </a>
              )}
            </CardHeader>
          </Card>

          {/* ExamFlow Feature Highlights */}
          {isExamFlow && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: BookOpen, title: 'Syllabus Tracker', desc: 'Organize subjects, units, and topics in one place' },
                { icon: Brain, title: 'Smart Recall', desc: 'Flashcards that adapt to what you forget' },
                { icon: Headphones, title: 'Focus Mode', desc: 'Ambient audio and a lock-in timer to stay sharp' },
                { icon: BarChart3, title: 'Live Stats', desc: 'Track streaks, accuracy, and mastery at a glance' },
              ].map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="glass-panel border-glass-border h-full">
                    <CardContent className="p-4 space-y-2">
                      <feat.icon className="h-6 w-6 text-primary" />
                      <h3 className="font-semibold text-foreground text-sm">{feat.title}</h3>
                      <p className="text-xs text-muted-foreground">{feat.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Download CTA for ExamFlow */}
          {isExamFlow && <ExamFlowDownloadCTA />}

          {/* Video or showcase section */}
          {hasVideo ? (
            <Card className="glass-panel border-glass-border overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Play className="text-primary h-5 w-5" />
                  Project Video
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <VideoEmbed 
                  youtubeId={project.youtubeEmbedId} 
                  title={project.title}
                />
                {project.additionalVideos && project.additionalVideos.length > 0 && (
                  <div className="space-y-4">
                    {project.additionalVideos.map((video) => (
                      <div key={video.id} className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">{video.title}</h3>
                        <VideoEmbed youtubeId={video.id} title={video.title} />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : !isExamFlow && (
            <Card className="glass-panel border-glass-border overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Play className="text-primary h-5 w-5" />
                  Project Showcase
                </CardTitle>
              </CardHeader>
              <CardContent>
                {project.category === 'design' ? (
                  <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                    <div className="relative min-h-[280px] rounded-2xl border border-glass-border bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden p-5">
                      <div className="absolute inset-0 opacity-40">
                        <motion.div
                          animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
                          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute top-5 left-5 h-24 w-24 rounded-2xl bg-primary/20"
                        />
                        <motion.div
                          animate={{ x: [0, -14, 0], y: [0, 14, 0] }}
                          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute bottom-6 right-8 h-20 w-32 rounded-xl bg-accent/20"
                        />
                        <div className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/60 border border-glass-border" />
                      </div>
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="flex items-center justify-between gap-3">
                          <Badge variant="outline" className="border-primary/20 bg-background/60">Visual System</Badge>
                          <div className="flex gap-2">
                            <span className="h-3 w-3 rounded-full bg-primary/60" />
                            <span className="h-3 w-3 rounded-full bg-accent/60" />
                            <span className="h-3 w-3 rounded-full bg-muted" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="h-24 rounded-xl border border-glass-border bg-background/70 backdrop-blur-sm" />
                          <div className="h-24 rounded-xl border border-glass-border bg-primary/10 backdrop-blur-sm" />
                          <div className="h-24 rounded-xl border border-glass-border bg-accent/10 backdrop-blur-sm" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 w-32 rounded-full bg-foreground/10" />
                          <div className="h-3 w-full rounded-full bg-foreground/10" />
                          <div className="h-3 w-4/5 rounded-full bg-foreground/10" />
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <div className="rounded-2xl border border-glass-border bg-background/50 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Preview</p>
                        <h3 className="text-lg font-semibold text-foreground">Design gallery coming next</h3>
                        <p className="text-sm text-muted-foreground mt-2">For now this page highlights the design system, layout direction, and deliverable style instead of an empty video block.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {['Brand Identity', 'Social Assets', 'Thumbnail Design', 'Digital Layouts'].map((item) => (
                          <div key={item} className="rounded-xl border border-glass-border bg-background/50 px-3 py-4 text-sm text-foreground">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : project.category === 'strategy' ? (
                  <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-2xl border border-glass-border bg-gradient-to-br from-primary/10 via-background to-accent/10 p-5">
                      <div className="grid gap-3">
                        {[
                          { title: 'Research', body: 'Audience mapping, competitor scan, signal gathering' },
                          { title: 'Positioning', body: 'Offer clarity, channel fit, content angle' },
                          { title: 'Optimization', body: 'Testing, measurement, iteration, retention' },
                        ].map((step, index) => (
                          <motion.div
                            key={step.title}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.08 }}
                            className="flex items-start gap-3 rounded-xl border border-glass-border bg-background/60 p-4"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{step.title}</p>
                              <p className="text-sm text-muted-foreground">{step.body}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <div className="rounded-2xl border border-glass-border bg-background/50 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Snapshot</p>
                        <h3 className="text-lg font-semibold text-foreground">Strategy breakdown instead of filler</h3>
                        <p className="text-sm text-muted-foreground mt-2">This section now previews the framework and decision flow until a proper case-study reel is added.</p>
                      </div>
                      <div className="rounded-2xl border border-glass-border bg-background/50 p-4 space-y-3">
                        <div className="flex items-end gap-2 h-24">
                          {[42, 68, 54, 82, 73].map((value, i) => (
                            <motion.div
                              key={i}
                              animate={{ height: [`${Math.max(18, value - 12)}%`, `${value}%`, `${Math.max(18, value - 6)}%`] }}
                              transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
                              className="flex-1 rounded-t-md bg-primary/30"
                            />
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Reach</span>
                          <span>CTR</span>
                          <span>Retention</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-glass-border bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 text-center">
                    <h3 className="text-xl font-semibold text-foreground">Showcase coming soon</h3>
                    <p className="mt-2 text-sm text-muted-foreground">A dedicated media showcase will be added here soon.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Project Overview */}
          <Card className="glass-panel border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="text-primary h-5 w-5" />
                <h2>Project Overview</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>
            </CardContent>
          </Card>

          {/* About this project — concise, neutral tone */}
          <Card className="glass-panel border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BookOpen className="text-primary h-5 w-5" />
                <h2>About this project</h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                {project.title} is part of an ongoing portfolio of {project.category === 'video' ? 'video editing and post-production' : project.category === 'web' ? 'AI workflows and system tools' : project.category === 'design' ? 'visual design' : 'digital strategy'} work.
                Built with {project.tools.slice(0, 3).join(', ')}.
              </p>
            </CardContent>
          </Card>


          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-panel border-glass-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="text-warning h-5 w-5" />
                  <h2>The Challenge</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
              </CardContent>
            </Card>
            <Card className="glass-panel border-glass-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="text-success h-5 w-5" />
                  <h2>Results</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{project.outcome}</p>
              </CardContent>
            </Card>
          </div>

          {/* Technical Details */}
          <Card className="glass-panel border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Zap className="text-primary h-5 w-5" />
                <h2>Technical Details</h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <Badge key={tool} variant="secondary" className="px-4 py-2 bg-primary/10 text-primary border-primary/20">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Technical Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {project.technicalDetails.map((spec) => (
                    <div key={spec} className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 rounded-lg px-3 py-2 border border-glass-border/50">
                      <Zap size={12} className="text-primary shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="flex justify-center gap-4">
            <Link to="/#projects">
              <Button variant="outline" size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                View More Projects
              </Button>
            </Link>
            <Link to="/#contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}