import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Bot, Search, Zap } from 'lucide-react';
import { 
  SoftwareProductIcon, 
  VideoStudioIcon, 
  WebEcosystemIcon, 
  BusinessSystemsIcon 
} from '@/components/icons/PortfolioIcons';
import { PageShell } from '@/components/PageShell';

interface SkillPillar {
  category: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  philosophy: string;
  capabilities: {
    name: string;
    description: string;
    evidence: string;
  }[];
}

const skillPillars: SkillPillar[] = [
  {
    category: "Software & Development",
    subtitle: "Frontend engineering, web applications & resilient user interfaces",
    icon: SoftwareProductIcon,
    philosophy: "Building lightweight, reliable client-side software with zero unnecessary dependencies. Focused on fast load times, accessible DOM hierarchy, and durable state management.",
    capabilities: [
      {
        name: "Frontend & Web Application Development",
        description: "Architecting interactive Single Page Applications (SPAs) with reactive state, modular component hierarchies, and low-latency interaction loops.",
        evidence: "Engineered ExamFlowOS with zero framework bloat, sub-second route transitions, and responsive mobile testing interfaces."
      },
      {
        name: "JavaScript / TypeScript & React Ecosystem",
        description: "Writing strictly typed, modern TypeScript code with clean component lifecycles, custom hooks, and strict error handling.",
        evidence: "Production TypeScript across portfolio, product engines, and custom interactive tools."
      },
      {
        name: "UI Implementation & Component Architecture",
        description: "Translating functional requirements into refined, typography-led interfaces using Tailwind CSS and Radix UI primitives.",
        evidence: "High-density CBT testing screens, dark-mode design systems, and custom audio/timer controls."
      },
      {
        name: "Version Control, CI/CD & Cloud Deployment",
        description: "Git branching workflows, automated linting/compilation verification, and edge CDN deployments on Vercel and GitHub.",
        evidence: "Multi-branch deployment pipelines maintaining continuous uptime across public web platforms."
      }
    ]
  },
  {
    category: "Digital Products",
    subtitle: "Product architecture, CBT simulation engines & user-owned data",
    icon: Layers,
    philosophy: "Products must solve concrete friction without trapping users behind extractive recurring fees or fragile backend dependencies.",
    capabilities: [
      {
        name: "Product Architecture & Problem Framing",
        description: "End-to-end scope definition: user journeys, data flow, failure modes, and low-operating-cost architecture.",
        evidence: "Architected ExamFlowOS to serve 10K+ total registered students and ~700 active users at negligible recurring server costs."
      },
      {
        name: "Computer-Based Testing (CBT) Systems",
        description: "Simulating authentic entrance examination environments with strict timers, question state tracking, mark-for-review indices, and instant score computation.",
        evidence: "AP/Telangana entrance exam engines (ECET, POLYCET, ICET) running fully in-browser with zero latency."
      },
      {
        name: "User-Owned Storage & Google Drive Cloud Backup",
        description: "Decoupling user test progress and note libraries from costly databases by enabling direct-to-Google-Drive encrypted sync.",
        evidence: "ExamFlowOS cloud sync layer giving students permanent ownership over their study notes and test logs."
      },
      {
        name: "Product Maintenance & Growth Architecture",
        description: "Semantic JSON-LD schema, dynamic XML sitemaps, open-graph cards, and continuous feature iterations based on direct student feedback.",
        evidence: "10K+ organic student registrations achieved through search positioning and peer distribution."
      }
    ]
  },
  {
    category: "Video & Post-Production",
    subtitle: "High-volume editing, DaVinci Resolve Studio & broadcast finishing",
    icon: VideoStudioIcon,
    philosophy: "Video is visual rhythm, narrative compression, and acoustic precision. Every cut serves narrative clarity, color continuity, and emotional cadence.",
    capabilities: [
      {
        name: "DaVinci Resolve Studio (macOS Workflows)",
        description: "Operating on high-performance macOS workstations utilizing DaVinci Resolve Studio for timeline assembly, proxy management, and hardware-accelerated exports.",
        evidence: "Completed over 700+ client video deliverables across short-form, commercial, event, and documentary formats."
      },
      {
        name: "Node-Based Color Grading & Color Science",
        description: "Primary and secondary grading, color space transforms (ACES / DaVinci YRGB Color Managed), skin tone qualification, and shot-to-shot balance.",
        evidence: "Consistent cinema-grade grade continuity across multi-camera shoots and mixed camera color profiles."
      },
      {
        name: "Motion Design & Fusion Kinetic Titles",
        description: "Custom motion graphics, kinetic typography, lower thirds, callouts, and clean graphical treatments built inside Fusion and After Effects.",
        evidence: "Creator of 'Perfect Pack' ($10 USD) — a bespoke creative toolkit and macro pack for DaVinci Resolve editors."
      },
      {
        name: "Fairlight Audio Mastering & Sound Design",
        description: "Dialogue cleanup, parametric EQ, multi-band compression, noise profiling, sound effects placement, and ITU-R BS.1770 broadcast loudness compliance.",
        evidence: "Crisp, balanced dialogue mixes and punchy cinematic soundscapes across 700+ finished projects."
      }
    ]
  },
  {
    category: "Web & Business Systems",
    subtitle: "Client digital operations, ongoing management & local visibility",
    icon: WebEcosystemIcon,
    philosophy: "A business website is not just a digital brochure; it is an operational anchor that streamlines inquiries, establishes trust, and eliminates friction.",
    capabilities: [
      {
        name: "Website Management & Continuous Maintenance",
        description: "Active technical stewardship, DNS configuration, SSL management, asset optimization, and zero-downtime content updates.",
        evidence: "Responsible for managing and maintaining 8+ live business websites (excluding ExamFlowOS)."
      },
      {
        name: "Digital Operating Systems for Local Enterprises",
        description: "Unifying a legacy business's fragmented offline presence into a single coordinated digital workflow.",
        evidence: "Built the unified digital OS for Sri Lahari Studios (10-year operating studio in Visakhapatnam), integrating branding, portfolio showcases, and client intake."
      },
      {
        name: "Technical SEO & Discoverability",
        description: "Local search positioning, Google Business Profile alignment, meta architecture, and sitemap crawling optimization.",
        evidence: "Ranked regional businesses in local map packs and organic search queries across coastal Andhra Pradesh."
      }
    ]
  },
  {
    category: "AI & Practical Automation",
    subtitle: "Workflow automation, webhooks & human-supervised autopilot",
    icon: BusinessSystemsIcon,
    philosophy: "Automation should remove administrative drudgery and human error, never replace authentic personal communication or critical judgment.",
    capabilities: [
      {
        name: "n8n Workflow Engineering",
        description: "Self-hosted and cloud n8n orchestrations connecting webhooks, form submissions, communication apps, and database records.",
        evidence: "Automated inquiry routing pipelines that deliver instant client notifications while logging structured lead records."
      },
      {
        name: "AI-Assisted Operations & Triage",
        description: "Integrating LLM APIs for structured information extraction, auto-categorization of client emails, and draft responses.",
        evidence: "Practical business automations that reduce initial response latency from hours to seconds."
      }
    ]
  },
  {
    category: "SEO / Digital Presence",
    subtitle: "Structured data, local dominance & discoverability",
    icon: Search,
    philosophy: "High rankings are built on semantic truth, rapid rendering, and genuine authority rather than superficial tricks.",
    capabilities: [
      {
        name: "Structured JSON-LD & Schema Graph",
        description: "Authoring comprehensive semantic graphs across Person, WebSite, Organization, EducationalOccupationalCredential, and SoftwareApplication schemas.",
        evidence: "Rich Google search results and verified knowledge panel entity associations."
      },
      {
        name: "Core Web Vitals & Page Experience",
        description: "Delivering sub-second Largest Contentful Paint (LCP), zero Cumulative Layout Shift (CLS), and instant First Input Delay.",
        evidence: "100/100 performance scores across mobile and desktop audits on production deployments."
      }
    ]
  },
  {
    category: "Systems & Clean Energy Grounding",
    subtitle: "Electrical engineering fundamentals, solar PV & hardware efficiency",
    icon: Zap,
    philosophy: "Engineering is physical. Understanding circuit limits, thermal dissipation, and conversion efficiency informs better, leaner software architectures.",
    capabilities: [
      {
        name: "B.Tech Electrical & Electronics Engineering",
        description: "Final-year academic training covering power systems, transmission grids, control engineering, and microcontrollers.",
        evidence: "B.Tech EEE at AU affiliated college, Visakhapatnam; Diploma in EEE at M.R.A.G.R. Govt Polytechnic."
      },
      {
        name: "Industrial Power Training at BHEL",
        description: "Heavy electrical equipment inspection, turbine manufacturing, and high-voltage transformer testing protocols.",
        evidence: "Completed verified industrial training at Bharat Heavy Electricals Limited (BHEL) Visakhapatnam."
      }
    ]
  }
];

export default function SkillsPage() {
  return (
    <PageShell>
      <SEOHead
        title="Technical & Creative Capabilities | Geddada Devicharan"
        description="A grounded breakdown of capabilities across Software Development, Digital Products, Video Post-Production (700+ projects), Business Systems, and Automation."
        path="/skills"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'Skills', url: 'https://geddadadevicharan.vercel.app/skills' }
        ]}
      />

      <main className="space-y-16 sm:space-y-24">
        
        {/* Open Canvas Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-primary/80" />
            <span>CAPABILITY MAP / INDEX</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05]">
            Skills & Capabilities
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A concrete, evidence-backed inventory of technical and creative disciplines. No generic badge clouds or claimed proficiencies without real-world production backing.
          </p>
        </header>

        {/* 7 Disciplines Sections - Open Symmetrical Grid */}
        <div className="space-y-24">
          {skillPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <section 
                key={pillar.category} 
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-12 border-t border-border/50 items-start"
              >
                {/* Left 4-column overview */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-primary font-medium">
                      0{idx + 1}
                    </span>
                    <span className="w-4 h-[1px] bg-border" aria-hidden="true" />
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Pillar
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground flex items-center gap-2.5">
                    <Icon size={22} className="text-primary shrink-0" />
                    <span>{pillar.category}</span>
                  </h2>

                  <p className="text-sm font-medium text-foreground/80">
                    {pillar.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2">
                    {pillar.philosophy}
                  </p>
                </div>

                {/* Right 8-column capabilities list */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pillar.capabilities.map((cap) => (
                    <div 
                      key={cap.name}
                      className="depth-widget p-6 rounded-2xl border border-border/40 bg-card/40 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <h3 className="text-base font-semibold text-foreground tracking-tight">
                          {cap.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {cap.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-border/30">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-primary font-medium mb-1">
                          Production Evidence
                        </div>
                        <p className="text-xs text-foreground/90 font-sans">
                          {cap.evidence}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Closing Action Banner */}
        <section className="pt-16 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-foreground">
              Interested in how these apply to your project?
            </h3>
            <p className="text-sm text-muted-foreground">
              Explore documented case studies or get in touch for custom systems development.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/work" 
              className="depth-interactive inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-lg border border-border/80 bg-background/80 text-foreground"
            >
              <span>View Case Studies</span>
              <ArrowRight size={13} />
            </Link>
            <Link 
              to="/contact" 
              className="depth-interactive inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground font-semibold shadow-sm"
            >
              <span>Direct Inquiries</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </section>

      </main>
    </PageShell>
  );
}
