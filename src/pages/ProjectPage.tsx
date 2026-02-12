import { useParams, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Chatbot } from '@/components/Chatbot';
import { VideoEmbed } from '@/components/VideoEmbed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  Zap
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getProjectById } from '@/data/projects';
import { generateProductSchema, generatePluginSchema } from '@/lib/structuredData';
import PerfectPackPage from './PerfectPackPage';

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  
  // Render Perfect Pack product page for specific route
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

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{project.title} - Geddada Devicharan</title>
        <meta name="description" content={project.longDescription.slice(0, 160)} />
        <meta property="og:title" content={`${project.title} - Geddada Devicharan`} />
        <meta property="og:description" content={project.shortDescription} />
        <link rel="canonical" href={`https://devicharangeddada.lovable.app/project/${projectId}`} />
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

      <Navigation />

      <main className="pt-20 md:pt-28 pb-16 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Back Button */}
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
              
              {/* Badges */}
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

              {/* H1 Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {project.title}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground">
                {project.shortDescription}
              </p>
            </CardHeader>
          </Card>

          {/* Video Player Section */}
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
              
              {/* Additional Videos */}
              {project.additionalVideos && project.additionalVideos.length > 0 && (
                <div className="space-y-4">
                  {project.additionalVideos.map((video, index) => (
                    <div key={video.id} className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {video.title}
                      </h3>
                      <VideoEmbed 
                        youtubeId={video.id} 
                        title={video.title}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

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

          {/* Two Column Grid: Challenge & Outcome */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Challenge */}
            <Card className="glass-panel border-glass-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="text-warning h-5 w-5" />
                  <h2>The Challenge</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {project.challenge}
                </p>
              </CardContent>
            </Card>

            {/* Outcome */}
            <Card className="glass-panel border-glass-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="text-success h-5 w-5" />
                  <h2>Results</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {project.outcome}
                </p>
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
              {/* Tools */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <Badge 
                      key={tool} 
                      variant="secondary" 
                      className="px-4 py-2 bg-primary/10 text-primary border-primary/20"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {project.technicalDetails.map((spec) => (
                    <div 
                      key={spec}
                      className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 rounded-lg px-3 py-2 border border-glass-border/50"
                    >
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
