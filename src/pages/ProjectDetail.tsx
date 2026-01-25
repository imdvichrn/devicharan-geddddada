import { useParams, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Chatbot } from '@/components/Chatbot';
import { VideoEmbed } from '@/components/VideoEmbed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WindowChrome } from '@/components/WindowChrome';
import { ArrowLeft, Play, Calendar, User } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Project data with YouTube IDs
const projectsData: Record<string, {
  title: string;
  description: string;
  youtubeId: string;
  year: string;
  tools: string[];
  roles: string[];
}> = {
  'video-editing': {
    title: 'Video Editing Showcase',
    description: 'Professional video editing projects created using DaVinci Resolve Studio, featuring color grading, motion graphics, and seamless transitions.',
    youtubeId: 'N68iysGT2DU',
    year: '2024',
    tools: ['DaVinci Resolve Studio', 'Fusion', 'Fairlight'],
    roles: ['Video Editor', 'Colorist', 'Motion Designer']
  },
  'scenesync-edits': {
    title: 'SceneSync Edits',
    description: 'Synchronized video edits with music and visual effects, creating immersive viewing experiences.',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2024',
    tools: ['DaVinci Resolve', 'Adobe After Effects'],
    roles: ['Video Editor', 'Sound Designer']
  },
  'visual-design': {
    title: 'Visual Design Portfolio',
    description: 'Collection of visual design work including thumbnails, social media graphics, and brand assets.',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2024',
    tools: ['Adobe Photoshop', 'Canva', 'Figma'],
    roles: ['Graphic Designer', 'Brand Designer']
  },
  'growth-strategy': {
    title: 'Growth Strategy Case Studies',
    description: 'Digital marketing and growth strategy implementations for various projects and brands.',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2024',
    tools: ['Analytics Tools', 'Social Media Platforms'],
    roles: ['Growth Strategist', 'Content Planner']
  }
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectsData[id] : null;

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

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{project.title} - Geddada Devicharan</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} - Geddada Devicharan`} />
        <meta property="og:description" content={project.description} />
        <link rel="canonical" href={`https://devicharangeddada.lovable.app/project/${id}`} />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 md:pt-28 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/#projects" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          {/* Project Header */}
          <Card className="glass-elevated border-glass-border mb-8">
            <CardHeader>
              <WindowChrome className="mb-4" />
              <div className="flex flex-wrap items-center gap-3 mb-4">
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
              <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {project.title}
              </CardTitle>
              <p className="text-lg text-muted-foreground mt-4">{project.description}</p>
            </CardHeader>
          </Card>

          {/* Video Player */}
          <Card className="glass-panel border-glass-border mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Play className="text-primary h-5 w-5" />
                Project Video
              </CardTitle>
            </CardHeader>
            <CardContent>
              <VideoEmbed 
                youtubeId={project.youtubeId} 
                title={project.title}
                className="shadow-2xl"
              />
            </CardContent>
          </Card>

          {/* Tools Used */}
          <Card className="glass-panel border-glass-border">
            <CardHeader>
              <CardTitle className="text-xl">Tools & Technologies</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </section>

      <Chatbot />
    </div>
  );
}
