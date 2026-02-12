import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Chatbot } from '@/components/Chatbot';
import { VideoEmbed } from '@/components/VideoEmbed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WindowChrome } from '@/components/WindowChrome';
import { ArrowLeft, Play, Calendar, User, ShoppingBag, Zap, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { generateBreadcrumbSchema, generateVideoObjectSchema, generateCreativeWorkSchema } from '@/lib/structuredData';

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
    title: 'Create Cinematic 3D Titles in DaVinci Resolve Fusion',
    description: 'Professional video editing projects created using DaVinci Resolve Studio, featuring color grading, motion graphics, and seamless transitions.',
    youtubeId: 'N68iysGT2DU',
    year: '2025',
    tools: ['DaVinci Resolve Studio', 'Fusion', 'Fairlight'],
    roles: ['Video Editor', 'Colorist', 'Motion Designer']
  },
  'scenesync-edits': {
    title: 'SceneSync Edits',
    description: 'Synchronized video edits with music and visual effects, creating immersive viewing experiences.',
    youtubeId: 'mDFBTdLKwEw',
    year: '2024',
    tools: ['DaVinci Resolve', 'Adobe After Effects'],
    roles: ['Video Editor', 'Sound Designer']
  },
  'visual-design': {
    title: 'Visual Design Portfolio',
    description: 'Collection of visual design work including thumbnails, social media graphics, and brand assets.',
    youtubeId: 'nKVGh6yXfWw',
    year: '2024',
    tools: ['Adobe Photoshop', 'Canva', 'Figma'],
    roles: ['Graphic Designer', 'Brand Designer']
  },
  'growth-strategy': {
    title: 'Growth Strategy Case Studies',
    description: 'Digital marketing and growth strategy implementations for various projects and brands.',
    youtubeId: 'G8EW0uAJJ3k',
    year: '2024',
    tools: ['Analytics Tools', 'Social Media Platforms'],
    roles: ['Growth Strategist', 'Content Planner']
  }
};

/* 3D-Interactive Product Section Component */
function ProductSection() {
  return (
    <section className="grid lg:grid-cols-2 gap-12 items-center py-20 px-6 perspective-container">
      {/* 3D Tilted Video Card */}
      <motion.div 
        whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="card-3d-tilt glass-elevated rounded-[2.5rem] p-3 shadow-2xl overflow-hidden"
      >
        <VideoEmbed youtubeId="YOUR_VIDEO_ID" title="PERFECT PACK Demonstration" />
      </motion.div>

      <div className="space-y-8 preserve-3d-content">
        <div className="space-y-4">
          <motion.span className="text-primary font-bold tracking-widest text-xs uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
            imdvichrn's Official Release
          </motion.span>
          <h1 className="text-7xl font-black bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent leading-tight">
            PERFECT PACK
          </h1>
          <h2 className="text-xl font-bold text-primary tracking-tight">ALL-IN-ONE CREATIVE ASSETS</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The PERFECT PACK is the industry secret for elite colorists who demand Drag & Drop Integration and High-Resolution Textures in their post-production pipeline.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <Zap />, text: "Drag & Drop" },
            { icon: <Layers />, text: "High-Res Textures" },
            { icon: <Cpu />, text: "Major NLE Support" },
            { icon: <ShieldCheck />, text: "Secure Access" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 glass-panel p-3 rounded-xl border border-white/5">
              <span className="text-primary w-5 h-5">{item.icon}</span>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Secure Buy Button with Shimmer and Glow */}
        <motion.button 
          whileHover={{ y: -5, boxShadow: "0 20px 40px -10px hsla(var(--primary), 0.5)" }}
          whileTap={{ scale: 0.98 }}
          className="product-premium-btn w-full py-6 rounded-2xl flex items-center justify-center gap-4 text-white font-black text-xl"
          aria-label="Securely purchase the PERFECT PACK All-In-One Creative Assets for $10.00"
        >
          <ShoppingBag className="w-6 h-6" />
          Get PERFECT PACK — $10.00
        </motion.button>
        
        <p className="text-center text-xs text-muted-foreground/60 italic">
          Optimized for All Major Editors. Unique download link generated after payment.
        </p>
      </div>
    </section>
  );
}

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
        <link rel="canonical" href={`https://geddadadevicharan.netlify.app/project/${id}`} />
        
        {/* Breadcrumb Schema - Shows "Home > Projects > [Project Name]" in search results */}
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", url: "https://geddadadevicharan.netlify.app" },
            { name: "Projects", url: "https://geddadadevicharan.netlify.app/#projects" },
            { name: project.title, url: `https://geddadadevicharan.netlify.app/project/${id}` }
          ]))}
        </script>
        
        {/* VideoObject Schema - Helps videos appear in Google Videos search */}
        <script type="application/ld+json">
          {JSON.stringify(generateVideoObjectSchema({
            title: project.title,
            description: project.description,
            youtubeId: project.youtubeId
          }))}
        </script>
        
        {/* CreativeWork Schema - Provides structured info about the project */}
        <script type="application/ld+json">
          {JSON.stringify(generateCreativeWorkSchema({
            title: project.title,
            description: project.description,
            tools: project.tools,
            roles: project.roles
          }))}
        </script>
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

export { ProductSection };
