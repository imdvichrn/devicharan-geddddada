import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Search, 
  Server,
  ChevronRight,
  Share2
} from 'lucide-react';
import { 
  WebEcosystemIcon 
} from '@/components/icons/PortfolioIcons';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';

export function WebPage() {
  return (
    <PageShell>
      <SEOHead
        title="Websites & Digital Presence — 8+ Managed Sites | Geddada Devicharan"
        description="End-to-end website development, ongoing management, SEO, and digital presence architectures. Actively managing 8+ business websites including Sri Lahari Studios and Annapurna Foundation."
        path="/web"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'Work', url: 'https://geddadadevicharan.vercel.app/work' },
          { name: 'Websites & Digital', url: 'https://geddadadevicharan.vercel.app/web' }
        ]}
      />

      <main className="space-y-16 sm:space-y-20">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-2">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/work" className="hover:text-foreground transition-colors">Work</Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">Websites & Digital</span>
        </nav>

        {/* =========================================================================
            1. INTRO
            ========================================================================= */}
        <header className="space-y-4 max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
            DISCIPLINE 03 · WEBSITES & DIGITAL PRESENCE
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05]">
            Websites Built for Long-Term Operation
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Web engineering is not just writing code; it is technical stewardship. I design, deploy, maintain, and optimize <strong className="text-foreground font-medium">8+ business web platforms</strong>—ensuring high uptime, strong local search rankings, and friction-free inquiry journeys.
          </p>
        </header>

        {/* =========================================================================
            2. FEATURED CASE STUDY: SRI LAHARI STUDIOS (WINDOW PATTERN)
            ========================================================================= */}
        <section className="space-y-8">
          <div className="depth-widget overflow-hidden">
            <WindowChrome 
              title="srilaharistudios.com — Commercial Studio Digital OS"
              rightElement={
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-500 font-medium">Active Operations</span>
                </div>
              }
            />

            <div className="p-8 sm:p-12 space-y-8">
              
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-border/40">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                    <span className="text-primary font-semibold uppercase tracking-wider">Business Digital OS</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-foreground font-medium">10-Year Photography Studio</span>
                    <span aria-hidden="true">·</span>
                    <span>Kothavalasa & Visakhapatnam</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground">
                    Sri Lahari Studios: Complete Business Digital Architecture
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Engineering a cohesive digital ecosystem for a 10-year operating photography and cinematography business. Encompassing modern web platform design, visual identity, Instagram presence, regional search discoverability, and ongoing technical maintenance.
                  </p>
                </div>

                <Link 
                  to="/project/sri-lahari-studios"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/95 depth-interactive transition-colors shrink-0 shadow-sm"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* 4 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl depth-surface depth-interactive space-y-2">
                  <div className="text-xs font-mono text-primary font-medium">01 / WEB PLATFORM</div>
                  <div className="font-semibold text-foreground text-sm">Responsive Showcase</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    High-performance galleries optimized for 4G mobile devices, service package breakdowns, and direct booking triggers.
                  </p>
                </div>

                <div className="p-6 rounded-2xl depth-surface depth-interactive space-y-2">
                  <div className="text-xs font-mono text-primary font-medium">02 / LOCAL SEO</div>
                  <div className="font-semibold text-foreground text-sm">Regional Map Presence</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Optimized Google Business Profiles, structured schema markup, and geo-targeted keywords across Vizag & Vizianagaram.
                  </p>
                </div>

                <div className="p-6 rounded-2xl depth-surface depth-interactive space-y-2">
                  <div className="text-xs font-mono text-primary font-medium">03 / INTAKE TRIAGE</div>
                  <div className="font-semibold text-foreground text-sm">WhatsApp Automations</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Automated client inquiry triage via webhook scripts directly into WhatsApp, cutting response lag from days to minutes.
                  </p>
                </div>

                <div className="p-6 rounded-2xl depth-surface depth-interactive space-y-2">
                  <div className="text-xs font-mono text-primary font-medium">04 / MAINTENANCE</div>
                  <div className="font-semibold text-foreground text-sm">Continuous Support</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Ongoing domain management, monthly security updates, automated backups, and portfolio image refreshes.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            3. RESPONSIBILITIES & TECHNICAL STEWARDSHIP
            ========================================================================= */}
        <section className="space-y-8 pt-8 border-t border-border/50">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Scope of Management
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
              What Website Stewardship Involves
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Search size={18} />
              </div>
              <h3 className="text-base font-semibold text-foreground">Technical SEO & Indexation</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Clean metadata, OpenGraph cards, XML sitemaps, Google Search Console index audits, Schema.org JSON-LD structured data, and local discoverability.
              </p>
            </div>

            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <Server size={18} />
              </div>
              <h3 className="text-base font-semibold text-foreground">Uptime & Domain Infrastructure</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                DNS configuration, SSL certificate renewal, automated backups, sub-second TTFB optimization, and high availability on edge CDN networks.
              </p>
            </div>

            <div className="p-6 rounded-2xl depth-widget depth-interactive space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-500">
                <Share2 size={18} />
              </div>
              <h3 className="text-base font-semibold text-foreground">Social & Intake Integration</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Connecting website lead forms directly to business WhatsApp accounts and spreadsheets so inquiries never slip through the cracks.
              </p>
            </div>

          </div>
        </section>

        {/* =========================================================================
            4. MANAGED SITES ROSTER
            ========================================================================= */}
        <section className="space-y-8 pt-8 border-t border-border/50">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
              Active Production Roster
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
              8+ Managed Business Websites
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl depth-widget depth-interactive space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-primary font-semibold uppercase">Commercial Studio</span>
                <span className="text-xs font-mono text-emerald-500">Live & Managed</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Sri Lahari Studios</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Full-stack web platform for a 10-year commercial photography and wedding cinema studio with branches in Kothavalasa and Vizag.
              </p>
              <div className="pt-2 text-xs font-mono text-muted-foreground">
                Stack: React, TypeScript, Tailwind, Google Maps API, WhatsApp CRM
              </div>
            </div>

            <div className="p-8 rounded-2xl depth-widget depth-interactive space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-primary font-semibold uppercase">Non-Profit NGO</span>
                  <span className="text-xs font-mono text-emerald-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live & Managed
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-card border border-border/60 p-1 flex items-center justify-center shrink-0">
                    <img 
                      src="https://annapurna-foundation.com/assets/logo/logo-master-transparent-1024x1024.png" 
                      alt="Annapurna Foundation Logo" 
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Annapurna Foundation</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Building and managing the digital presence and media workflows for food seva, school sanitation, animal welfare, and community initiatives.
                </p>
                <div className="pt-1 text-xs font-mono text-muted-foreground">
                  Focus: Website Development, Video Editing, Continuous Management
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-border/40">
                <Link 
                  to="/project/annapurna-foundation"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline font-medium"
                >
                  <span>Read Case Study</span>
                  <ArrowRight size={13} />
                </Link>
                <a 
                  href="https://annapurna-foundation.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                >
                  Visit Site ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Footer */}
        <section className="pt-12 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Explore More Disciplines
            </h3>
            <p className="text-xs text-muted-foreground">
              Continue to business systems automation or software products.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/systems" 
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 depth-interactive transition-colors shadow-sm"
            >
              <span>Business Systems</span>
              <ArrowRight size={13} />
            </Link>
            <Link 
              to="/software" 
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-xl depth-surface depth-interactive hover:border-foreground/40 text-foreground transition-colors"
            >
              <span>Software & Products</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </section>

      </main>
    </PageShell>
  );
}

export default WebPage;
