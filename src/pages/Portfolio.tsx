import { Navigation } from '@/components/Navigation';
import { Chatbot } from '@/components/Chatbot';
import { ContactForm } from '@/components/ContactForm';
import { WindowChrome } from '@/components/WindowChrome';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  Calendar
} from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';
import profileImage from '@/assets/profile-avatar.jpg';

const skills = {
  "Creative & Technical Tools": [
    "Adobe Photoshop", "Canva", "CapCut", "DaVinci Resolve", "Wix", "No-code AI Platforms"
  ],
  "Professional Skills": [
    "Data Entry", "Research", "Content Design", "Bilingual Communication (Telugu ↔ English)"
  ],
  "Soft Skills": [
    "Problem-Solving", "Teamwork", "Adaptability", "Continuous Learning"
  ]
};

const projects = [
  {
    title: "Portfolio Website",
    description: "Built using Wix/AI Builder with modern design principles and responsive layout",
    year: "2024",
    technologies: ["Wix", "AI Builder", "Web Design"],
    link: "https://demo-project0045.lovable.app/"
  },
  {
    title: "Video Editing Demos",
    description: "Professional video editing projects showcasing creative storytelling and technical skills",
    year: "2024", 
    technologies: ["CapCut", "DaVinci Resolve", "Video Production"],
    link: "https://youtube.com/@scenesyncclips?si=xx0J30hHGUVaoY82"
  },
  {
    title: "Content & Design",
    description: "Visual content creation for digital marketing and brand communications",
    year: "2024",
    technologies: ["Photoshop", "Canva", "Graphic Design"],
    link: "#"
  },
  {
    title: "Marketing & Planning Practice",
    description: "Strategic planning and execution of digital marketing campaigns",
    year: "2024",
    technologies: ["Digital Marketing", "Content Strategy", "Analytics"],
    link: "#"
  },
  {
    title: "Team Collaboration Project",
    description: "Cross-functional team project demonstrating leadership and collaboration skills",
    year: "2023",
    technologies: ["Project Management", "Team Leadership", "Communication"],
    link: "#"
  }
];

const education = [
  {
    degree: "B.Tech in Electrical & Electronics Engineering",
    institution: "Currently Pursuing",
    period: "Ongoing",
    status: "In Progress"
  },
  {
    degree: "Diploma in Electrical & Electronics Engineering", 
    institution: "M.R.A.G.R. Govt. Polytechnic, Vizianagaram",
    period: "Completed",
    status: "Completed"
  }
];

const highlights = [
  "Self-taught in Prompt Engineering & AI Tools",
  "Bilingual (Telugu & English)",
  "Interest in Digital Marketing & Creative Design",
  "Reliable and motivated professional",
  "Strong adaptability and continuous learning mindset"
];

export function Portfolio() {
  const handleDownloadCV = () => {
    // In a real implementation, this would download the actual CV
    console.log('Download CV clicked');
  };

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
                    Geddada Devicharan
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground">
                    Aspiring Digital Professional | Creative Learner | Problem Solver
                  </p>
                  
                  <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>Visakhapatnam, India</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      <span>+91 6303468707</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      <span>devicharangeddada@gmail.com</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    onClick={handleDownloadCV}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="border-primary/20 hover:bg-primary/10"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Me
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
                Motivated and growth-driven individual with a Diploma in Electrical & Electronics Engineering 
                and currently pursuing a B.Tech in EEE. Skilled in video editing, graphic design, website building, 
                and digital content planning. Self-taught in AI-assisted workflows and prompt engineering, with 
                strong adaptability, collaboration, and problem-solving skills.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm passionate about leveraging technology to create meaningful digital experiences. My journey 
                combines technical engineering knowledge with creative digital skills, making me versatile in 
                both analytical and creative problem-solving approaches.
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
                Skills & Expertise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {Object.entries(skills).map(([category, skillList]) => (
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

      {/* Education Section */}
      <section id="education" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <Card className="glass-panel border-glass-border">
            <CardHeader>
              <WindowChrome className="mb-4" />
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <GraduationCap className="text-primary" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="border-l-4 border-primary/30 pl-6 pb-6 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{edu.degree}</h3>
                    <Badge 
                      variant={edu.status === 'In Progress' ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {edu.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground font-medium">{edu.institution}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    <span>{edu.period}</span>
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
            © 2025 Geddada Devicharan. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}