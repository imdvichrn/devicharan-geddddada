import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Chatbot } from '@/components/Chatbot';
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
import { generateProductSchema, generatePluginSchema, generateProjectSchema, generateBreadcrumbSchema } from '@/lib/structuredData';
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
        <Chatbot />
      </div>
    );
  }

  const isExamFlow = project.id === 'examflow-os';

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{project.title} — by Geddada Devicharan (Charan / imdvichrn)</title>
        <meta name="description" content={`${project.title}: ${project.shortDescription} — built by Geddada Devicharan (Charan, imdvichrn).`.slice(0, 160)} />
        <meta name="keywords" content={`${project.title}, ${project.tools.join(', ')}, Geddada Devicharan, Devicharan, Charan, imdvichrn, iamdvichrn, Devicharan ${project.category}, Charan developer, Devicharan portfolio`} />
        <meta property="og:title" content={`${project.title} — Geddada Devicharan`} />
        <meta property="og:description" content={project.shortDescription} />
        <link rel="canonical" href={`https://geddadadevicharan.netlify.app/project/${projectId}`} />
        <script type="application/ld+json">{JSON.stringify(generateProjectSchema({
          id: project.id,
          title: project.title,
          description: project.longDescription,
          year: project.year,
          tools: project.tools,
        }))}</script>
        <script type="application/ld+json">{JSON.stringify(generateBreadcrumbSchema([
          { name: 'Home', url: 'https://geddadadevicharan.netlify.app/' },
          { name: 'Projects', url: 'https://geddadadevicharan.netlify.app/#projects' },
          { name: project.title, url: `https://geddadadevicharan.netlify.app/project/${projectId}` },
        ]))}</script>
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

      <HiddenIdentityBlock page="project" projectTitle={project.title} />

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

          {/* Video Player Section */}
          {project.youtubeEmbedId && project.youtubeEmbedId !== '' && (
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

          {/* Challenge & Outcome */}
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

      <Chatbot />
    </div>
  );
}