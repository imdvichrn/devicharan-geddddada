import { Navigation } from '@/components/Navigation';
import { Chatbot } from '@/components/Chatbot';
import { ContactForm } from '@/components/ContactForm';
import { WindowChrome } from '@/components/WindowChrome';
import { AnimatedBackground } from '@/components/AnimatedBackground';
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
  "Payment Solutions": [
    "Instant Transfers", "QR Code Payments", "Split Bills", "Business API", "Mobile Checkout"
  ],
  "Business Features": [
    "Analytics Dashboard", "Transaction History", "Customer Management", "Revenue Tracking"
  ],
  "Security & Compliance": [
    "Bank-Grade Security", "Fraud Protection", "PCI Compliance", "24/7 Support"
  ]
};

const features = [
  {
    title: "Instant Payments",
    description: "Send and receive money instantly with just a phone number or username",
    year: "2024",
    technologies: ["Real-time Processing", "Mobile-first", "Secure Authentication"],
    link: "#"
  },
  {
    title: "Business Dashboard",
    description: "Comprehensive analytics and insights for business transaction management",
    year: "2024", 
    technologies: ["Analytics", "Business Intelligence", "Revenue Tracking"],
    link: "https://www.youtube.com/@scenesyncclips"
  },
  {
    title: "QR Code Payments",
    description: "Simple scan-to-pay functionality for seamless in-person transactions",
    year: "2024",
    technologies: ["QR Technology", "NFC", "Contactless Payments"],
    link: "#"
  },
  {
    title: "Split Payments",
    description: "Easily divide bills and expenses among friends and colleagues",
    year: "2024",
    technologies: ["Group Payments", "Smart Calculation", "Social Integration"],
    link: "#"
  },
  {
    title: "Developer API",
    description: "Robust payment infrastructure for businesses to integrate Venmo payments",
    year: "2024",
    technologies: ["RESTful API", "Webhooks", "SDK Support"],
    link: "#"
  }
];

const partnerships = [
  {
    degree: "Bank Partnerships",
    institution: "150+ Financial Institutions",
    period: "Nationwide Coverage",
    status: "Active"
  },
  {
    degree: "Merchant Network", 
    institution: "2M+ Business Partners",
    period: "Growing Network",
    status: "Expanding"
  }
];

const highlights = [
  "Lightning-fast transfers in seconds",
  "Bank-grade security and encryption",
  "Trusted by 80+ million users worldwide", 
  "Simple social payment experience",
  "24/7 customer support and fraud protection"
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
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
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
                    Venmo Business
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground">
                    Fast, Safe & Social Payments | Trusted by Millions
                  </p>
                  
                  <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>Available Nationwide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      <span>24/7 Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      <span>business@venmo.com</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    onClick={() => window.open('https://venmo.com/business', '_blank')}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Get Started
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="border-primary/20 hover:bg-primary/10"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Learn More
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
                About Venmo Business
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Venmo Business empowers companies of all sizes to accept payments easily and securely. 
                With our trusted platform used by over 80 million people, businesses can tap into a 
                social payment network that makes transactions simple, fast, and engaging.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From small retailers to large enterprises, Venmo Business provides the tools you need 
                to grow revenue, understand customer behavior, and create seamless payment experiences 
                that keep customers coming back.
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
                Payment Solutions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {Object.entries(services).map(([category, skillList]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {skill}
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
                Features & Solutions
              </CardTitle>
            </CardHeader>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-panel border-glass-border hover:scale-105 transition-transform duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {feature.year}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {feature.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(feature.link, '_blank')}
                    disabled={feature.link === '#'}
                  >
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <Card className="glass-panel border-glass-border">
            <CardHeader>
              <WindowChrome className="mb-4" />
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <GraduationCap className="text-primary" />
                Partnerships
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {partnerships.map((partner, index) => (
                <div key={index} className="border-l-4 border-primary/30 pl-6 pb-6 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{partner.degree}</h3>
                    <Badge 
                      variant={partner.status === 'Active' ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {partner.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground font-medium">{partner.institution}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    <span>{partner.period}</span>
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
                Why Choose Venmo
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
            © 2025 Venmo LLC. All rights reserved.
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