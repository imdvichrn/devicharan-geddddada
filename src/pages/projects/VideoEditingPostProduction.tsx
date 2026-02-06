import { Navigation } from '@/components/Navigation';
import { Chatbot } from '@/components/Chatbot';
import { WindowChrome } from '@/components/WindowChrome';
import { VideoEmbed } from '@/components/VideoEmbed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Wrench, Target, Layers, Linkedin, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { generateBreadcrumbSchema, generateVideoObjectSchema, generateCreativeWorkSchema } from '@/lib/structuredData';

export default function VideoEditingPostProduction() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [videoRef, videoInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const title = "Video Editing & Post-Production";
  const description = "Professional post-production showcase featuring advanced editing techniques, color correction, and seamless transitions. This portfolio demonstrates expertise in utilizing industry-standard tools like Adobe Premiere Pro and DaVinci Resolve to create polished, cinema-quality final deliverables with professional sound design and advanced 3D workflows.";
  const year = "2025";
  const youtubeId = "N68iysGT2DU";
  
  const tools = [
    "Adobe Premiere Pro",
    "DaVinci Resolve",
    "3D Modeling",
    "Color Grading",
    "Professional Sound Design",
    "Fusion-Oriented Motion Graphics",
    "Audio Synchronization"
  ];
  
  const roles = [
    "Lead Video Editor & Post-Production Specialist",
    "Sound Engineer",
    "Colorist",
    "Audio Engineer"
  ];

  const process = [
    {
      title: "Project Overview",
      description: "A deep dive into the creative vision and editing style. Each post-production project begins with understanding the narrative intent and visual goals. I analyze the source material to identify key moments, develop a cohesive visual language, and plan the overall pacing and flow to ensure maximum impact and engagement."
    },
    {
      title: "Technical Execution",
      description: "Details on the software and tools used for post-production. The workflow utilizes DaVinci Resolve for timeline editing and color grading, CapCut for quick turnarounds and social media content, and professional audio tools for sound design. Each tool is selected based on project requirements, timeline constraints, and desired output quality."
    },
    {
      title: "Key Highlights",
      description: "Specific techniques employed throughout the editing process include advanced color grading with precision curves and LUTs, seamless transition design that maintains visual flow, audio synchronization ensuring perfect alignment between dialogue/music and visuals, and professional sound design adding depth and clarity to the final product."
    },
    {
      title: "Color Correction & Grading",
      description: "Professional color correction ensures consistency and balance across all footage. Creative color grading is applied to enhance mood, establish visual identity, and guide viewer attention. Techniques include primary color correction, secondary color grading using curves and hue ranges, and the application of custom LUTs for cohesive look development."
    },
    {
      title: "Audio Synchronization",
      description: "Frame-perfect synchronization between audio elements and visual content. This includes dialogue alignment, music syncing to beat points, sound effects placement, and audio level mixing to ensure professional clarity and balance throughout the entire piece."
    },
    {
      title: "Final Delivery",
      description: "Optimized exports for various platforms and formats. Final deliverables are rendered at the highest quality standards suitable for their intended distribution channels, whether for broadcast, streaming platforms, or social media sharing."
    }
  ];

  return (
    <>
      <Helmet>
        <title>{title} | Geddada Devicharan</title>
        <meta name="description" content="Video Editing & Post-Production - Professional post-production portfolio by Geddada Devicharan featuring color grading, audio design, and cinematic editing techniques." />
        <link rel="canonical" href="https://geddadadevicharan.netlify.app/projects/video-editing-post-production" />
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", url: "https://geddadadevicharan.netlify.app" },
            { name: "Projects", url: "https://geddadadevicharan.netlify.app/#projects" },
            { name: title, url: "https://geddadadevicharan.netlify.app/projects/video-editing-post-production" }
          ]))}
        </script>
        
        {/* VideoObject Schema */}
        <script type="application/ld+json">
          {JSON.stringify(generateVideoObjectSchema({
            title: title,
            description: description,
            youtubeId: youtubeId,
            uploadDate: "2025-01-01"
          }))}
        </script>
        
        {/* CreativeWork Schema */}
        <script type="application/ld+json">
          {JSON.stringify(generateCreativeWorkSchema({
            title: title,
            description: description,
            tools: tools,
            roles: roles,
            year: year
          }))}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-20 md:pt-28 pb-10 md:pb-16 px-3 md:px-4">
          <div 
            ref={heroRef}
            className={`max-w-4xl mx-auto transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Back Button */}
            <Link to="/#projects">
              <Button variant="ghost" size="sm" className="mb-6 hover-scale group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </Button>
            </Link>

            <Card className="glass-elevated border-glass-border">
              <CardHeader className="px-4 md:px-8 pb-4">
                <WindowChrome className="mb-4 md:mb-6" />
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="mr-1 h-3 w-3" />
                      {year}
                    </Badge>
                  </div>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {title}
                  </h1>
                  <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="px-4 md:px-8 space-y-6 md:space-y-8">
                {/* Tools Used */}
                <div className="space-y-3">
                  <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 text-foreground">
                    <Wrench className="text-primary w-5 h-5" />
                    Tools Used
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {tools.map(tool => (
                      <Badge 
                        key={tool} 
                        variant="secondary" 
                        className="px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-200"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Role / Focus Areas */}
                <div className="space-y-3">
                  <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 text-foreground">
                    <Target className="text-primary w-5 h-5" />
                    Role & Focus Areas
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {roles.map(role => (
                      <Badge 
                        key={role} 
                        variant="outline" 
                        className="px-3 py-1 border-accent/30 text-accent-foreground"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Video Player Section */}
        <section className="py-10 md:py-16 px-3 md:px-4 bg-muted/30">
          <div 
            ref={videoRef}
            className={`max-w-4xl mx-auto transition-all duration-700 delay-100 ${videoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <Card className="glass-panel border-glass-border hover-scale">
              <CardHeader className="px-4 md:px-8">
                <WindowChrome className="mb-4" />
                <CardTitle className="text-xl md:text-2xl font-bold">
                  Project Showcase
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 md:px-8 pb-8 space-y-8">
                {/* Primary Video */}
                <div className="space-y-3">
                  <h3 className="text-base md:text-lg font-medium text-foreground">
                    Main Showcase
                  </h3>
                  <VideoEmbed 
                    youtubeId={youtubeId} 
                    title="Video Editing & Post-Production Showcase"
                    className="shadow-lg"
                  />
                </div>
                
                {/* Secondary Video */}
                <div className="space-y-3">
                  <h3 className="text-base md:text-lg font-medium text-foreground">
                    Additional Work
                  </h3>
                  <VideoEmbed 
                    youtubeId="fkniR6CZWsY" 
                    title="Additional Post-Production Showcase"
                    className="shadow-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-10 md:py-16 px-3 md:px-4">
          <div 
            ref={processRef}
            className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${processInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <Card className="glass-panel border-glass-border hover-scale">
              <CardHeader className="px-4 md:px-8">
                <WindowChrome className="mb-4" />
                <CardTitle className="text-xl md:text-2xl font-bold flex items-center gap-3">
                  <Layers className="text-primary w-5 h-5 md:w-6 md:h-6" />
                  Process & Approach
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 md:px-8 space-y-6">
                {process.map((step, index) => (
                  <div 
                    key={index} 
                    className="border-l-4 border-primary/30 pl-4 md:pl-6 py-2"
                  >
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-glass-border glass-panel">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4">
              <div className="flex justify-center items-center gap-6">
                <a href="https://www.linkedin.com/in/geddadadevicharan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                  <Button variant="ghost" size="sm" className="p-3 h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-200 hover-scale">
                    <Linkedin size={20} className="text-muted-foreground hover:text-primary transition-colors" />
                  </Button>
                </a>
                <a href="https://www.instagram.com/imdvichrn" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile">
                  <Button variant="ghost" size="sm" className="p-3 h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-200 hover-scale">
                    <Instagram size={20} className="text-muted-foreground hover:text-primary transition-colors" />
                  </Button>
                </a>
                <a href="https://www.facebook.com/userdead.610" target="_blank" rel="noopener noreferrer" aria-label="Facebook Profile">
                  <Button variant="ghost" size="sm" className="p-3 h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-200 hover-scale">
                    <Facebook size={20} className="text-muted-foreground hover:text-primary transition-colors" />
                  </Button>
                </a>
              </div>
              <p className="text-muted-foreground">© 2026 Geddada Devicharan (@imdvichrn). All rights reserved.</p>
            </div>
          </div>
        </footer>

        <Chatbot />
      </div>
    </>
  );
}
