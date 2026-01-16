import { Navigation } from '@/components/Navigation';
import { Chatbot } from '@/components/Chatbot';
import { WindowChrome } from '@/components/WindowChrome';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Wrench, Target, Layers, Linkedin, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';

interface ProjectLayoutProps {
  title: string;
  description: string;
  year: string;
  tools: string[];
  roles: string[];
  process: { title: string; description: string }[];
  mediaPlaceholders?: { type: 'image' | 'video'; label: string }[];
  metaDescription: string;
}

export function ProjectLayout({
  title,
  description,
  year,
  tools,
  roles,
  process,
  mediaPlaceholders = [],
  metaDescription
}: ProjectLayoutProps) {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [mediaRef, mediaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Helmet>
        <title>{title} | Geddada Devicharan</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://devicharangeddada.lovable.app/projects/${title.toLowerCase().replace(/\s+/g, '-')}`} />
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

        {/* Process Section */}
        <section className="py-10 md:py-16 px-3 md:px-4 bg-muted/30">
          <div 
            ref={processRef}
            className={`max-w-4xl mx-auto transition-all duration-700 delay-100 ${processInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
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

        {/* Media Section */}
        {mediaPlaceholders.length > 0 && (
          <section className="py-10 md:py-16 px-3 md:px-4">
            <div 
              ref={mediaRef}
              className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${mediaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <Card className="glass-panel border-glass-border hover-scale">
                <CardHeader className="px-4 md:px-8">
                  <WindowChrome className="mb-4" />
                  <CardTitle className="text-xl md:text-2xl font-bold">
                    Project Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 md:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mediaPlaceholders.map((media, index) => (
                      <div 
                        key={index}
                        className="aspect-video rounded-lg bg-muted/50 border border-glass-border flex items-center justify-center"
                      >
                        <span className="text-muted-foreground text-sm">
                          {media.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

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
