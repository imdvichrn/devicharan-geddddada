import { Navigation } from '@/components/Navigation';
import { Chatbot } from '@/components/Chatbot';
import { ContactForm } from '@/components/ContactForm';
import { WindowChrome } from '@/components/WindowChrome';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { LiveProjectsButton } from '@/components/LiveProjectsButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Download, User, Code, Briefcase, GraduationCap, Star, Calendar, Loader2, Linkedin, Instagram, Facebook, Workflow } from 'lucide-react';
import { WorkflowsGrid } from '@/components/WorkflowsGrid';
import profileImage from '@/assets/profile-avatar.png';
import backgroundVideo from '@/assets/background-video.mp4';
import heroBg from '@/assets/hero-bg.png';
const skills = {
  "Creative & Technical Tools": ["Adobe Photoshop", "Canva", "DaVinci Resolve Studio", "Wix", "No-code AI Platforms"],
  "Professional Skills": ["Data Entry", "Research", "Fusion-Oriented Motion Graphics & 3D Modeling", "Bilingual Communication (Telugu ↔ English)"],
  "Soft Skills": ["Strategic Thinking", "Teamwork", "Adaptability", "Continuous Learning"]
};
const education = [{
  degree: "B.Tech in Electrical & Electronics Engineering",
  institution: "Currently Pursuing",
  period: "Ongoing",
  status: "In Progress"
}, {
  degree: "Diploma in Electrical & Electronics Engineering",
  institution: "M.R.A.G.R. Govt. Polytechnic, Vizianagaram",
  period: "Completed",
  status: "Completed"
}];
const highlights = ["Self-taught in Prompt Engineering & AI Tools", "Bilingual (Telugu & English)", "Digital Marketing & Creative Design", "Professional Video Editor & Colorist", "Full Post-Production Pipeline Expertise"];
export function Portfolio() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const chatbotRef = useRef<{
    toggleChat: () => void;
  }>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Parallax scroll effect for background video
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const offset = scrollY * 0.4; // Subtle parallax multiplier
    setParallaxOffset(offset);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force play immediately - don't call load() as it interrupts autoplay
    const playVideo = () => {
      video.play().catch(() => {
        // If autoplay blocked, try muted (should already be muted, but ensure)
        video.muted = true;
        video.play().catch(() => {});
      });
    };

    // Play on mount
    playVideo();

    // Handle seamless loop restart (backup for loop attribute)
    const handleEnded = () => {
      video.currentTime = 0;
      playVideo();
    };

    // Handle timeupdate to prevent stalling near end
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.1) {
        video.currentTime = 0;
      }
    };

    // Ensure video keeps playing when tab becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        playVideo();
      }
    };

    // Handle canplaythrough to ensure smooth playback
    const handleCanPlay = () => {
      playVideo();
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('canplaythrough', handleCanPlay);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('canplaythrough', handleCanPlay);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Intersection observers for scroll animations
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [educationRef, educationInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [highlightsRef, highlightsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [contactRef, contactInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const handleDownloadCV = async () => {
    try {
      setIsDownloading(true);

      // Create a link element to trigger download
      const link = document.createElement('a');
      link.href = '/cv.pdf';
      link.download = 'Geddada_Devicharan_CV.pdf';

      // Check if file exists by trying to fetch it
      const response = await fetch('/cv.pdf');
      if (!response.ok) {
        throw new Error('CV file not found');
      }

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Download Started",
        description: "Your CV is being downloaded..."
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Unable to download CV. Please try again later.",
        variant: "destructive"
      });
    } finally {
      // Add a small delay to show the loading state
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Portfolio component for Geddada Devicharan
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  };
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ 
            zIndex: 0,
            maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
          }}
        >
          <video
            ref={videoRef}
            poster={heroBg}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute w-full h-[120%] object-cover will-change-transform"
            style={{ 
              transform: `translate3d(0, ${-parallaxOffset}px, 0)`,
              top: '-10%'
            }}
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-background/60" style={{ zIndex: 1 }} />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-3 md:px-4" style={{ zIndex: 2 }}>
          <Card className="glass-elevated border-glass-border animate-scale-in">
            <CardHeader className="pb-4 md:pb-6 px-3 md:px-6">
              <WindowChrome className="mb-3 md:mb-6" />
              <div className="flex flex-col items-center space-y-3 md:space-y-6">
                <div className="relative w-24 h-24 md:w-36 md:h-36">
                  <img 
                    src={profileImage} 
                    alt="Geddada Devicharan - Video Editor and Digital Professional" 
                    width={144}
                    height={144}
                    className="w-full h-full rounded-full object-cover object-top border-4 border-primary/30 shadow-2xl ring-2 ring-primary/10 ring-offset-2 ring-offset-background" 
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none"></div>
                </div>
                
                <div className="space-y-2 md:space-y-4">
                  <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Geddada Devicharan
                  </h1>
                  <div className="mt-1">
                    <span className="inline-block text-sm md:text-base text-primary font-medium">@imdvichrn</span>
                  </div>
                  <p className="text-sm md:text-xl lg:text-2xl text-muted-foreground px-2">
                    Video Editor & Post-Production Specialist | Digital Creator | Developer
                  </p>
                  
                  <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 md:gap-2">
                      <MapPin size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                      <span className="hidden sm:inline">Visakhapatnam, India</span>
                      <span className="sm:hidden">Vizag, India</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <Phone size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                      <span className="hidden sm:inline">+91 6303468707</span>
                      <span className="sm:hidden">+91 630...</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 max-w-full">
                      <Mail size={14} className="md:w-4 md:h-4 flex-shrink-0" aria-hidden="true" />
                      <span className="hidden md:inline truncate">devicharangeddada@gmail.com</span>
                      <span className="md:hidden truncate text-xs">devicharan...</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                  <Button onClick={handleDownloadCV} disabled={isDownloading} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 hover-scale text-xs md:text-sm" aria-label="Download CV">
                    {isDownloading ? <>
                        <Loader2 className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 animate-spin" aria-hidden="true" />
                        <span className="hidden sm:inline">Downloading...</span>
                        <span className="sm:hidden">Loading...</span>
                      </> : <>
                        <Download className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Download CV</span>
                        <span className="sm:hidden">CV</span>
                      </>}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })} className="border-primary/20 hover:bg-primary/10 hover-scale text-xs md:text-sm" aria-label="Contact Geddada Devicharan">
                    <Mail className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" aria-hidden="true" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-10 md:py-20 px-3 md:px-4">
        <div ref={aboutRef} className={`max-w-6xl mx-auto transition-all duration-700 ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="glass-panel border-glass-border hover-scale">
            <CardHeader className="px-4 md:px-6">
              <WindowChrome className="mb-2 md:mb-4" />
              <CardTitle className="text-xl md:text-3xl font-bold flex items-center gap-2 md:gap-3">
                <User className="text-primary w-5 h-5 md:w-6 md:h-6" />
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-6 px-4 md:px-6">
              <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                Video editor and post-production specialist with a Diploma in Electrical & Electronics Engineering, 
                currently completing a B.Tech in EEE. I deliver professional video editing, graphic design, web development, 
                and digital content strategy. Self-taught in AI-assisted workflows and prompt engineering, with 
                proven adaptability and technical precision.
              </p>
              <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                I build digital experiences that combine engineering discipline with creative execution. My work 
                spans the full post-production pipeline — from color grading and VFX to sound design and delivery optimization.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-10 md:py-20 px-3 md:px-4 bg-muted/30">
        <div ref={skillsRef} className={`max-w-6xl mx-auto transition-all duration-700 delay-100 ${skillsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="glass-panel border-glass-border hover-scale">
            <CardHeader className="px-4 md:px-6">
              <WindowChrome className="mb-2 md:mb-4" />
              <CardTitle className="text-xl md:text-3xl font-bold flex items-center gap-2 md:gap-3">
                <Code className="text-primary w-5 h-5 md:w-6 md:h-6" />
                Skills & Expertise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-8 px-4 md:px-6">
              {Object.entries(skills).map(([category, skillList]) => <div key={category} className="space-y-2 md:space-y-4">
                  <h3 className="text-base md:text-xl font-semibold text-foreground">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map(skill => <Badge key={skill} variant="secondary" className="px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-200 hover-scale">
                        {skill}
                      </Badge>)}
                  </div>
                </div>)}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Workflows & Capabilities Section */}
      <section id="projects" className="py-10 md:py-20 px-3 md:px-4">
        <div ref={projectsRef} className={`max-w-6xl mx-auto transition-all duration-700 delay-200 ${projectsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="glass-panel border-glass-border mb-4 md:mb-8 hover-scale">
            <CardHeader className="px-4 md:px-6">
              <WindowChrome className="mb-2 md:mb-4" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-xl md:text-3xl font-bold flex items-center gap-2 md:gap-3">
                  <Workflow className="text-primary w-5 h-5 md:w-6 md:h-6" />
                  Workflows & Capabilities
                </CardTitle>
                <LiveProjectsButton 
                  href="https://github.com/imdvichrn" 
                  label="View Live Projects"
                />
              </div>
            </CardHeader>
          </Card>
          
          <WorkflowsGrid />
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-10 md:py-20 px-3 md:px-4 bg-muted/30">
        <div ref={educationRef} className={`max-w-6xl mx-auto transition-all duration-700 delay-300 ${educationInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="glass-panel border-glass-border hover-scale">
            <CardHeader className="px-4 md:px-6">
              <WindowChrome className="mb-2 md:mb-4" />
              <CardTitle className="text-xl md:text-3xl font-bold flex items-center gap-2 md:gap-3">
                <GraduationCap className="text-primary w-5 h-5 md:w-6 md:h-6" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
              {education.map((edu, index) => <div key={index} className="border-l-4 border-primary/30 pl-3 md:pl-6 pb-4 md:pb-6 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                    <h3 className="text-base md:text-xl font-semibold text-foreground">{edu.degree}</h3>
                    <Badge variant={edu.status === 'In Progress' ? 'default' : 'secondary'} className="ml-2">
                      {edu.status}
                    </Badge>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">{edu.institution}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    <span>{edu.period}</span>
                  </div>
                </div>)}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="py-10 md:py-20 px-3 md:px-4">
        <div ref={highlightsRef} className={`max-w-6xl mx-auto transition-all duration-700 delay-400 ${highlightsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="glass-panel border-glass-border hover-scale">
            <CardHeader className="px-4 md:px-6">
              <WindowChrome className="mb-2 md:mb-4" />
              <CardTitle className="text-xl md:text-3xl font-bold flex items-center gap-2 md:gap-3">
                <Star className="text-primary w-5 h-5 md:w-6 md:h-6" />
                Key Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {highlights.map((highlight, index) => <div key={index} className="flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <Star className="text-primary mt-0.5 flex-shrink-0" size={14} />
                    <span className="text-sm md:text-base text-muted-foreground">{highlight}</span>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-10 md:py-20 px-3 md:px-4 bg-muted/30">
        <div ref={contactRef} className={`max-w-4xl mx-auto transition-all duration-700 delay-500 ${contactInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-glass-border glass-panel">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4">
            {/* Social Media Links */}
            <nav className="flex justify-center items-center gap-6" aria-label="Social media links">
              <a 
                href="https://www.linkedin.com/in/geddadadevicharan" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit LinkedIn Profile"
                className="p-3 h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-200 hover-scale inline-flex items-center justify-center"
              >
                <Linkedin size={20} className="text-foreground/70 hover:text-primary transition-colors" aria-hidden="true" />
              </a>

              <a 
                href="https://www.instagram.com/imdvichrn" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit Instagram Profile"
                className="p-3 h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-200 hover-scale inline-flex items-center justify-center"
              >
                <Instagram size={20} className="text-foreground/70 hover:text-primary transition-colors" aria-hidden="true" />
              </a>

              <a 
                href="https://www.facebook.com/userdead.610" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit Facebook Profile"
                className="p-3 h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-200 hover-scale inline-flex items-center justify-center"
              >
                <Facebook size={20} className="text-foreground/70 hover:text-primary transition-colors" aria-hidden="true" />
              </a>
            </nav>
            
            <p className="text-foreground/70">© 2026 Geddada Devicharan (@imdvichrn). All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot ref={chatbotRef} />
      
    </div>;
}