import { Navigation } from '@/components/Navigation';
import { Chatbot } from '@/components/Chatbot';
import { ContactForm } from '@/components/ContactForm';
import { WindowChrome } from '@/components/WindowChrome';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useState, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ExternalLink,
  User,
  Code,
  Briefcase,
  GraduationCap,
  Star,
  Calendar,
  Loader2
} from 'lucide-react';
import { useKeyboardShortcuts, createPortfolioShortcuts } from '@/hooks/useKeyboardShortcuts';
import { KeyboardShortcutsHelp } from '@/components/KeyboardShortcutsHelp';
import heroImage from '@/assets/hero-bg.jpg';
import profileImage from '@/assets/profile-avatar.jpg';

const services = {
  "Digital Solutions": [
    "Web Development", "Mobile Apps", "E-commerce", "Custom Software", "AI Integration"
  ],
  "Creative Services": [
    "Brand Design", "Video Production", "Content Marketing", "Social Media Management"
  ],
  "Business Solutions": [
    "Data Analytics", "Process Automation", "CRM Systems", "Cloud Migration"
  ]
};

const projects = [
  {
    title: "Enterprise Web Platform",
    description: "Scalable web application serving 10,000+ users with advanced analytics and real-time data",
    year: "2024",
    technologies: ["React", "Node.js", "PostgreSQL"],
    link: "https://demo-project0045.lovable.app/"
  },
  {
    title: "Marketing Automation Suite",
    description: "Complete marketing automation platform with email campaigns, analytics, and lead scoring",
    year: "2024", 
    technologies: ["Marketing Automation", "Analytics", "CRM"],
    link: "https://www.youtube.com/@scenesyncclips"
  },
  {
    title: "Brand Identity System",
    description: "Comprehensive brand identity and digital presence for Fortune 500 companies",
    year: "2024",
    technologies: ["Brand Design", "Digital Strategy", "UI/UX"],
    link: "#"
  },
  {
    title: "Data Analytics Dashboard",
    description: "Real-time business intelligence dashboard with predictive analytics and reporting",
    year: "2024",
    technologies: ["Data Science", "Business Intelligence", "Machine Learning"],
    link: "#"
  },
  {
    title: "Mobile Commerce App",
    description: "Cross-platform mobile application with seamless checkout and inventory management",
    year: "2023",
    technologies: ["React Native", "Payment Processing", "Cloud Services"],
    link: "#"
  }
];

const clients = [
  {
    company: "TechCorp Solutions",
    industry: "Technology",
    project: "Digital Transformation",
    result: "40% efficiency increase"
  },
  {
    company: "Global Retail Chain", 
    industry: "E-commerce",
    project: "Online Platform Development",
    result: "300% sales growth"
  }
];

const highlights = [
  "500+ successful projects delivered globally",
  "24/7 customer support and maintenance",
  "Certified technology partners and expertise",
  "Scalable solutions for businesses of all sizes",
  "Industry-leading security and compliance standards"
];

export function Portfolio() {
  const [isDownloading, setIsDownloading] = useState(false);
  const chatbotRef = useRef<{ toggleChat: () => void }>(null);

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
        description: "Your CV is being downloaded...",
      });
      
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Unable to download CV. Please try again later.",
        variant: "destructive",
      });
    } finally {
      // Add a small delay to show the loading state
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  };

  const shortcuts = createPortfolioShortcuts({
    toggleChat: () => chatbotRef.current?.toggleChat(),
    scrollToTop,
    scrollToContact,
    toggleFullscreen,
    downloadCV: handleDownloadCV,
    openProjects: scrollToProjects,
  });

  useKeyboardShortcuts(shortcuts);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-background/20 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <Card className="glass-elevated border-glass-border animate-scale-in">
            <CardHeader className="pb-6">
              <WindowChrome className="mb-6" />
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Geddada Devicharan"
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20"></div>
                </div>
                
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    TechFlow Solutions
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground">
                    Innovative Business Solutions | Digital Transformation | Growth Partners
                  </p>
                  
                  <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>Global Operations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      <span>hello@techflow.solutions</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Get Started
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="border-primary/20 hover:bg-primary/10"
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    View Solutions
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="glass-panel border-glass-border">
            <CardHeader>
              <WindowChrome className="mb-4" />
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <User className="text-primary" />
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                TechFlow Solutions is a leading digital transformation company specializing in innovative 
                business solutions. We help organizations modernize their operations, streamline processes, 
                and accelerate growth through cutting-edge technology and strategic consulting.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team of experts combines deep industry knowledge with the latest technological 
                advancements to deliver scalable, secure, and user-friendly solutions that drive 
                measurable business results for our clients worldwide.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <Card className="glass-panel border-glass-border">
            <CardHeader>
              <WindowChrome className="mb-4" />
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Code className="text-primary" />
                Our Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {Object.entries(services).map(([category, serviceList]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {serviceList.map((service) => (
                      <Badge 
                        key={service} 
                        variant="secondary" 
                        className="px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="glass-panel border-glass-border mb-8">
            <CardHeader>
              <WindowChrome className="mb-4" />
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Briefcase className="text-primary" />
                Projects & Work
              </CardTitle>
            </CardHeader>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="glass-panel border-glass-border hover:scale-105 transition-transform duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {project.year}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(project.link, '_blank')}
                    disabled={project.link === '#'}
                  >
                    <ExternalLink className="mr-2 h-3 w-3" />
                    View Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Success Stories Section */}
      <section id="clients" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <Card className="glass-panel border-glass-border">
            <CardHeader>
              <WindowChrome className="mb-4" />
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Star className="text-primary" />
                Client Success Stories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {clients.map((client, index) => (
                <div key={index} className="border-l-4 border-primary/30 pl-6 pb-6 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{client.company}</h3>
                    <Badge 
                      variant="default"
                      className="ml-2"
                    >
                      {client.industry}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground font-medium">{client.project}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Star size={14} className="text-primary" />
                    <span className="font-semibold text-primary">{client.result}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="glass-panel border-glass-border">
            <CardHeader>
              <WindowChrome className="mb-4" />
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Star className="text-primary" />
                Key Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <Star className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-glass-border glass-panel">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 TechFlow Solutions. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot ref={chatbotRef} />
      
      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcutsHelp />
    </div>
  );
}