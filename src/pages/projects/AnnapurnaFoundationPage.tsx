import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ChevronRight, 
  Heart, 
  Globe, 
  Film, 
  Server, 
  Layers, 
  Sparkles, 
  Eye, 
  Camera, 
  Users, 
  BookOpen, 
  Smile, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';
import { generateCreativeWorkSchema } from '@/lib/structuredData';

export function AnnapurnaFoundationPage() {
  const canonicalUrl = 'https://geddadadevicharan.vercel.app/project/annapurna-foundation';
  const logoUrl = 'https://annapurna-foundation.com/assets/logo/logo-master-transparent-1024x1024.png';
  const websiteUrl = 'https://annapurna-foundation.com';

  const title = 'Annapurna Foundation — Digital Work & Case Study | Geddada Devicharan';
  const description = 'How I contribute to Annapurna Foundation through video editing, website development, management, deployment, and digital presence.';

  const breadcrumbs = [
    { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
    { name: 'Work', url: 'https://geddadadevicharan.vercel.app/work' },
    { name: 'Annapurna Foundation', url: canonicalUrl }
  ];

  const creativeWorkData = {
    title: 'Annapurna Foundation — Digital Work & Case Study',
    description: 'Personal case study documenting ongoing video editing, website development, management, deployment, and digital presence for Annapurna Foundation.',
    tools: [
      'Website Development',
      'Website Management',
      'Website Deployment',
      'Video Editing & Post-Production',
      'Digital Presence'
    ],
    roles: [
      'Web Developer',
      'Website Manager',
      'Video Editor & Post-Production Specialist',
      'Digital Presence Contributor'
    ],
    year: '2024–2026'
  };

  return (
    <PageShell maxWidth="wide">
      <SEOHead
        title={title}
        description={description}
        path="/project/annapurna-foundation"
        ogType="article"
        ogImage="https://geddadadevicharan.vercel.app/og/og-home.png"
        breadcrumbs={breadcrumbs}
        structuredData={generateCreativeWorkSchema(creativeWorkData)}
      />

      <main className="space-y-16 sm:space-y-24">
        
        {/* Top Breadcrumbs & Back Navigation */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/work" className="hover:text-foreground transition-colors">Work</Link>
            <ChevronRight size={12} />
            <span className="text-foreground font-medium">Annapurna Foundation</span>
          </nav>

          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to Work</span>
          </Link>
        </div>

        {/* =========================================================================
            HEADER / HERO SECTION
            ========================================================================= */}
        <header className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-card border border-border/60 p-2 flex items-center justify-center shrink-0 shadow-sm">
                <img 
                  src={logoUrl} 
                  alt="Annapurna Foundation Logo" 
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] font-mono uppercase tracking-widest text-primary font-medium">
                  CASE STUDY · DIGITAL PRESENCE & VIDEO
                </div>
                <div className="text-xs font-mono text-muted-foreground">
                  annapurna-foundation.com · Active Engagement
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-sm"
              >
                <span>Visit Annapurna Foundation</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Title & Core Subtitle */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05]">
              Annapurna Foundation
            </h1>
            <p className="text-lg sm:text-2xl font-normal text-muted-foreground leading-relaxed max-w-3xl">
              Building and managing the digital presence of an organisation I genuinely care about.
            </p>
          </div>

          {/* Key Attributes Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs font-mono">
            <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-1">
              <span className="text-muted-foreground block text-[10px] uppercase">Nature</span>
              <span className="font-medium text-foreground text-xs sm:text-sm">Non-Governmental Organisation</span>
            </div>
            <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-1">
              <span className="text-muted-foreground block text-[10px] uppercase">My Focus Areas</span>
              <span className="font-medium text-foreground text-xs sm:text-sm">Web, Video & Digital Presence</span>
            </div>
            <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-1">
              <span className="text-muted-foreground block text-[10px] uppercase">Engagement</span>
              <span className="font-medium text-foreground text-xs sm:text-sm">Ongoing Technical Stewardship</span>
            </div>
            <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-1">
              <span className="text-muted-foreground block text-[10px] uppercase">Platform</span>
              <a 
                href={websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline text-xs sm:text-sm flex items-center gap-1"
              >
                <span>annapurna-foundation.com</span>
                <ArrowUpRight size={11} />
              </a>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 01 — THE ORGANISATION
            ========================================================================= */}
        <section aria-labelledby="section-organisation" className="space-y-8 pt-8 border-t border-border/40">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
              01 — The Organisation
            </div>
            <h2 id="section-organisation" className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground">
              A Wide Spectrum of Community Service
            </h2>
          </div>

          <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            <p>
              Annapurna Foundation is a non-governmental organisation (NGO) whose work spans multiple initiatives and forms of community service. Rather than operating within a single isolated domain, the organisation addresses pressing community needs through hands-on service.
            </p>
            <p>
              Its dedicated initiatives include:
            </p>
          </div>

          {/* Project Initiatives Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xs space-y-3">
              <div className="text-xs font-mono text-primary font-semibold uppercase">Initiative 01</div>
              <h3 className="text-lg font-semibold text-foreground">Project Annapurna</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Food seva initiatives focused on preparing and distributing wholesome meals to people in need.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xs space-y-3">
              <div className="text-xs font-mono text-primary font-semibold uppercase">Initiative 02</div>
              <h3 className="text-lg font-semibold text-foreground">Project GoSeva</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Care, shelter, and regular nourishment dedicated to cows and bovine welfare.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xs space-y-3">
              <div className="text-xs font-mono text-primary font-semibold uppercase">Initiative 03</div>
              <h3 className="text-lg font-semibold text-foreground">Project Saraswati Devi</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Supporting education through school improvements, learning supplies, and student-focused facilities.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xs space-y-3">
              <div className="text-xs font-mono text-primary font-semibold uppercase">Initiative 04</div>
              <h3 className="text-lg font-semibold text-foreground">Project Street Dogs</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Animal welfare efforts providing food, care, and compassion to stray animals in local communities.
              </p>
            </div>
          </div>

          {/* Additional Identified Areas of Work */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border/50 bg-card/20 space-y-4">
            <h4 className="text-sm font-mono uppercase tracking-wider text-foreground font-semibold">
              Identified Areas of Community Service
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs sm:text-sm font-mono text-muted-foreground">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 border border-border/30">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Food Seva & Meal Distribution</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 border border-border/30">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>School Washing & Sanitation</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 border border-border/30">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>School Reconstruction & Upgrades</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 border border-border/30">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Animal Welfare & Daily Feeding</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 border border-border/30">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Community Health & Support</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 border border-border/30">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Educational Assistance</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02 — WHY I CHOSE TO WORK WITH THEM
            ========================================================================= */}
        <section aria-labelledby="section-why" className="space-y-8 pt-8 border-t border-border/40">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
              02 — Why I Chose to Work With Them
            </div>
            <h2 id="section-why" className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground">
              More Than a Client Project
            </h2>
          </div>

          <div className="border-l-2 border-primary/60 pl-6 sm:pl-8 space-y-5 text-base sm:text-lg text-foreground/90 leading-relaxed max-w-3xl">
            <p>
              I chose to work with Annapurna Foundation because I genuinely care about the organisation and the work it does for people, animals, education, and communities.
            </p>
            <p className="text-muted-foreground">
              When I first looked closely at their grassroots efforts—from feeding street animals early in the morning to cleaning and restoring school environments for young children—it became clear that this was not something I wanted to treat as an ordinary transactional client gig.
            </p>
            <p className="text-muted-foreground">
              I wanted to contribute my technical and creative skills to something that has a meaningful, tangible purpose. Building their digital presence has allowed me to turn what I do well into ongoing support for an organisation whose mission I respect.
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03 — MY ROLE
            ========================================================================= */}
        <section aria-labelledby="section-role" className="space-y-8 pt-8 border-t border-border/40">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
              03 — My Role
            </div>
            <h2 id="section-role" className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground">
              Specific Responsibilities & Contribution
            </h2>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            My contribution is centered around creative post-production, web infrastructure, and digital presence. Rather than a one-time handoff, it involves continuous attention to ensure the organisation’s message and media remain current and accessible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Film size={18} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Video Editing & Post-Production</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Assembling, cutting, color grading, and finishing video documentation of food drives, animal rescue work, and school visits into clear, dignified stories.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Globe size={18} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Website Development</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Developing a modern, accessible web application that cleanly structures each initiative, hosts photographs and video embeds, and works smoothly across mobile devices.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Layers size={18} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Website Management</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Regularly updating project information, organizing photo galleries, refreshing media links, and ensuring the content accurately reflects ongoing field activities.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Server size={18} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Deployment & Maintenance</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Overseeing hosting, domain configuration, performance tuning, and technical uptime so the public site is consistently reachable.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/30 space-y-3 md:col-span-2 lg:col-span-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Eye size={18} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Digital Presence</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Coordinating the visual and informational consistency of how Annapurna Foundation presents itself online, making it straightforward for volunteers, supporters, and visitors to understand their programs.
              </p>
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 04 — MAKING THE WORK VISIBLE
            ========================================================================= */}
        <section aria-labelledby="section-visibility" className="space-y-8 pt-8 border-t border-border/40">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
              04 — Making the Work Visible
            </div>
            <h2 id="section-visibility" className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground">
              Documentation & Honest Communication
            </h2>
          </div>

          <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            <p>
              For an organisation actively working on the ground, digital presentation is primarily a matter of documentation and transparency. Grassroots work happens daily, but without an organized digital space, that work remains difficult for outside people to discover and appreciate.
            </p>
            <p>
              Through the website, we provide:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-5 rounded-xl border border-border/50 bg-card/25 space-y-2">
              <div className="text-primary font-semibold">Structured Project Info</div>
              <p className="text-muted-foreground leading-relaxed">
                Clear outlines explaining each active initiative without complex jargon or inflated claims.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/50 bg-card/25 space-y-2">
              <div className="text-primary font-semibold">Photographs & Galleries</div>
              <p className="text-muted-foreground leading-relaxed">
                Visual records of school sanitation days, feeding programs, and animal welfare efforts.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/50 bg-card/25 space-y-2">
              <div className="text-primary font-semibold">Video Documentation</div>
              <p className="text-muted-foreground leading-relaxed">
                Edited field footage documenting the real conditions and community members served.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/50 bg-card/25 space-y-2">
              <div className="text-primary font-semibold">Contact & Outreach Channels</div>
              <p className="text-muted-foreground leading-relaxed">
                Direct and accessible communication pathways for individuals wanting to connect with the team.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/50 bg-card/25 space-y-2 sm:col-span-2">
              <div className="text-primary font-semibold">Accessible Understanding</div>
              <p className="text-muted-foreground leading-relaxed">
                A simple, lightweight web home where anyone can quickly grasp what the organisation stands for and how it operates.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 05 — SELECTED WORK / PROJECTS
            ========================================================================= */}
        <section aria-labelledby="section-projects" className="space-y-8 pt-8 border-t border-border/40">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
              05 — Selected Initiatives
            </div>
            <h2 id="section-projects" className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground">
              Documented Service Areas
            </h2>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            A curated overview of the core projects and initiatives represented on the platform.
          </p>

          {/* Editorial Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Project Annapurna */}
            <div className="border border-border/60 rounded-2xl bg-card/30 overflow-hidden space-y-4">
              <WindowChrome title="Initiative — Project Annapurna (Food Seva)" />
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-primary font-medium">Community Food Seva</span>
                  <span className="text-muted-foreground">Documented Activity</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Project Annapurna</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Regular meal preparation, packaging, and distribution aimed at addressing hunger in underserved areas. Digital coverage focuses on respectful documentation of volunteers and feeding sessions.
                </p>
                <div className="p-4 rounded-xl bg-background/50 border border-border/40 text-xs font-mono text-muted-foreground flex items-center justify-between">
                  <span>Focus: Meal Distribution & Food Relief</span>
                  <span className="text-primary">Ongoing</span>
                </div>
              </div>
            </div>

            {/* Project GoSeva */}
            <div className="border border-border/60 rounded-2xl bg-card/30 overflow-hidden space-y-4">
              <WindowChrome title="Initiative — Project GoSeva (Animal Care)" />
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-primary font-medium">Bovine Welfare</span>
                  <span className="text-muted-foreground">Documented Activity</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Project GoSeva</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dedicated care and nourishment for cows and bovines, providing fresh feed, water, and shelter maintenance. Visual media highlights daily care routines and volunteer involvement.
                </p>
                <div className="p-4 rounded-xl bg-background/50 border border-border/40 text-xs font-mono text-muted-foreground flex items-center justify-between">
                  <span>Focus: Animal Care & Nutrition</span>
                  <span className="text-primary">Ongoing</span>
                </div>
              </div>
            </div>

            {/* Project Saraswati Devi */}
            <div className="border border-border/60 rounded-2xl bg-card/30 overflow-hidden space-y-4">
              <WindowChrome title="Initiative — Project Saraswati Devi (Education)" />
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-primary font-medium">Educational Support</span>
                  <span className="text-muted-foreground">Documented Activity</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Project Saraswati Devi</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Supporting school children and classrooms through school washing, hygiene improvements, classroom reconstruction, and learning supplies so students can study in clean, safe environments.
                </p>
                <div className="p-4 rounded-xl bg-background/50 border border-border/40 text-xs font-mono text-muted-foreground flex items-center justify-between">
                  <span>Focus: School Sanitation & Improvement</span>
                  <span className="text-primary">Ongoing</span>
                </div>
              </div>
            </div>

            {/* Project Street Dogs */}
            <div className="border border-border/60 rounded-2xl bg-card/30 overflow-hidden space-y-4">
              <WindowChrome title="Initiative — Project Street Dogs (Animal Welfare)" />
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-primary font-medium">Stray Animal Support</span>
                  <span className="text-muted-foreground">Documented Activity</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Project Street Dogs</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Daily food rounds, water provision, and care for street dogs in local neighborhoods. Media emphasizes gentle, compassionate community interaction and regular feeding routes.
                </p>
                <div className="p-4 rounded-xl bg-background/50 border border-border/40 text-xs font-mono text-muted-foreground flex items-center justify-between">
                  <span>Focus: Daily Feeding & Compassion</span>
                  <span className="text-primary">Ongoing</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 06 — MY DIGITAL CONTRIBUTION (FLOW / COMPOSITION)
            ========================================================================= */}
        <section aria-labelledby="section-contribution" className="space-y-8 pt-8 border-t border-border/40">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
              06 — My Digital Contribution
            </div>
            <h2 id="section-contribution" className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground">
              From Ground Work to Digital Understanding
            </h2>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            My work functions as the connective layer that takes on-the-ground activity and presents it clearly to anyone visiting the web platform.
          </p>

          {/* Sequential Editorial Pipeline */}
          <div className="relative border border-border/60 rounded-2xl bg-card/25 p-6 sm:p-10 space-y-6">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Contribution Flow Architecture
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs font-mono">
              
              <div className="p-5 rounded-xl bg-background/60 border border-border/40 space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-primary font-semibold text-sm block">01</span>
                  <span className="font-medium text-foreground block">Real-World Work</span>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    Food seva, animal feeding, school washing & community service.
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-muted-foreground/80 uppercase">Foundation Ground Activity</div>
              </div>

              <div className="p-5 rounded-xl bg-background/60 border border-border/40 space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-primary font-semibold text-sm block">02</span>
                  <span className="font-medium text-foreground block">Media Documentation</span>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    Capturing and organizing raw field photography and video clips.
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-muted-foreground/80 uppercase">Field Footage & Photos</div>
              </div>

              <div className="p-5 rounded-xl bg-background/60 border border-border/40 space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-primary font-semibold text-sm block">03</span>
                  <span className="font-medium text-foreground block">Post-Production</span>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    Editing video narratives, color correction, and audio balancing.
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-primary uppercase">My Creative Work</div>
              </div>

              <div className="p-5 rounded-xl bg-background/60 border border-border/40 space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-primary font-semibold text-sm block">04</span>
                  <span className="font-medium text-foreground block">Web Platform</span>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    Building, hosting, and maintaining annapurna-foundation.com.
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-primary uppercase">My Web Work</div>
              </div>

              <div className="p-5 rounded-xl bg-background/60 border border-border/40 space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-primary font-semibold text-sm block">05</span>
                  <span className="font-medium text-foreground block">Public Discovery</span>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    People discovering and understanding the organisation's true purpose.
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-emerald-500 uppercase">Clear Awareness</div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 07 — REFLECTION
            ========================================================================= */}
        <section aria-labelledby="section-reflection" className="space-y-8 pt-8 border-t border-border/40">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
              07 — Personal Reflection
            </div>
            <h2 id="section-reflection" className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground">
              Why This Matters to Me
            </h2>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl border border-border/60 bg-card/30 backdrop-blur-xs space-y-6 max-w-3xl">
            <p className="text-lg sm:text-xl font-display text-foreground leading-relaxed italic">
              &ldquo;I don't see this simply as building a website for an NGO. I see it as helping build the digital layer through which an organisation I care about can present its work.&rdquo;
            </p>
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed pt-2 border-t border-border/30">
              <p>
                Working on Annapurna Foundation continues to be a meaningful part of my creative and technical journey. It keeps me grounded in how digital craft—good typography, responsive layouts, thoughtful editing, and reliable deployments—can serve real, human community efforts.
              </p>
              <div className="text-xs font-mono text-foreground pt-2">
                — Geddada Devicharan (@imdvichrn)
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CALL TO ACTION / FOOTER NAVIGATION
            ========================================================================= */}
        <section className="pt-12 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              Visit the Official Foundation Platform
            </h3>
            <p className="text-xs text-muted-foreground">
              Explore the live initiatives, photo documentation, and community contact channels.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-sm"
            >
              <span>Visit Annapurna Foundation</span>
              <ArrowUpRight size={14} />
            </a>
            
            <Link
              to="/work"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-medium border border-border/70 hover:border-foreground/40 bg-background text-foreground transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Work</span>
            </Link>
          </div>
        </section>

      </main>
    </PageShell>
  );
}

export default AnnapurnaFoundationPage;
