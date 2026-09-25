import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Bot, 
  Layers, 
  ChevronRight
} from 'lucide-react';
import { 
  BusinessSystemsIcon 
} from '@/components/icons/PortfolioIcons';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';

export function SystemsPage() {
  return (
    <PageShell>
      <SEOHead
        title="Business Systems & Automation — Practical Workflows | Geddada Devicharan"
        description="Engineering practical digital systems and automations for businesses. Workflow improvement, client intake routing, n8n integrations, and systems engineering grounded in B.Tech EEE."
        path="/systems"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'Work', url: 'https://geddadadevicharan.vercel.app/work' },
          { name: 'Business Systems', url: 'https://geddadadevicharan.vercel.app/systems' }
        ]}
      />

      <main className="space-y-16 sm:space-y-20">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-2">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/work" className="hover:text-foreground transition-colors">Work</Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">Business Systems</span>
        </nav>

        {/* =========================================================================
            1. INTRO
            ========================================================================= */}
        <header className="space-y-4 max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
            DISCIPLINE 04 · BUSINESS SYSTEMS & AUTOMATION
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05]">
            Practical Digital Systems & Workflow Automation
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Building digital operating systems that make businesses easier to run. Eliminating repetitive manual copy-pasting, routing client inquiries instantly, and engineering dependable autopilot pipelines.
          </p>
        </header>

        {/* =========================================================================
            2. SYSTEMS I'VE BUILT & AUTOMATION MATRIX (WINDOW PATTERN)
            ========================================================================= */}
        <section className="depth-widget overflow-hidden">
          <WindowChrome 
            title="n8n & Webhook Matrix — Event-Driven Digital Pipelines"
            rightElement={
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-emerald-500 font-medium">Reliable Operations</span>
              </div>
            }
          />

          <div className="p-8 sm:p-12 space-y-8">
            <div className="space-y-2 max-w-3xl pb-6 border-b border-border/40">
              <div className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                Operating Philosophy
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
                Eliminate Administrative Friction, Retain Human Judgment
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Most small businesses lose hours every day to scattered WhatsApp chats, lost inquiry forms, and repetitive email drafts. I build event-driven pipelines that handle mechanical busywork instantly while keeping business owners in full control of critical customer relationships.
              </p>
            </div>

            {/* 3 Practical Automation Workflows */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl depth-surface depth-interactive space-y-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <BusinessSystemsIcon size={20} strokeWidth={1.6} />
                </div>
                <h3 className="text-base font-semibold text-foreground">Inquiry Capture & Routing</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Web forms emit structured webhooks into n8n, instantly notifying the team on WhatsApp or Telegram while logging the customer record in a clean spreadsheet.
                </p>
              </div>

              <div className="p-6 rounded-2xl depth-surface depth-interactive space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <Bot size={19} />
                </div>
                <h3 className="text-base font-semibold text-foreground">Smart Message Triage</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Extracting key parameters (dates, event types, budget tiers) from incoming client messages to generate organized briefings and ready-to-review draft replies.
                </p>
              </div>

              <div className="p-6 rounded-2xl depth-surface depth-interactive space-y-2">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-500">
                  <Layers size={19} />
                </div>
                <h3 className="text-base font-semibold text-foreground">Post-Production Handshake</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Syncing finalized client video exports with cloud delivery storage links and automated confirmation messages to clients upon render completion.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            3. CASE STUDY: SRI LAHARI STUDIOS DIGITAL OS
            ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-2xl depth-widget flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono text-primary font-medium uppercase">
              Production Deployment
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
              Sri Lahari Studios: Complete Studio OS
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Implemented an end-to-end client intake and inquiry triage system that eliminated booking lag and organized 10 years of commercial photo and video operations.
            </p>
          </div>

          <Link 
            to="/project/sri-lahari-studios"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/95 depth-interactive transition-colors shrink-0 shadow-sm"
          >
            <span>Read Case Study</span>
            <ArrowRight size={13} />
          </Link>
        </section>

        {/* Navigation Footer */}
        <section className="pt-12 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Explore More Disciplines
            </h3>
            <p className="text-xs text-muted-foreground">
              Return to Software & Products or explore technical writing logs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/software" 
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-xl depth-surface depth-interactive hover:border-foreground/40 text-foreground transition-colors"
            >
              <span>Software & Products</span>
              <ArrowRight size={13} />
            </Link>
            <Link 
              to="/writing" 
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 depth-interactive transition-colors shadow-sm"
            >
              <span>Technical Writing</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </section>

      </main>
    </PageShell>
  );
}

export default SystemsPage;
