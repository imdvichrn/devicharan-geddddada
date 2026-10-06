import { useState } from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Brain, 
  Activity, 
  Terminal, 
  Sun, 
  Wind, 
  Info,
  Clock,
  Sparkles,
  ArrowRight,
  FlaskConical,
  ChevronRight
} from 'lucide-react';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';
import { experiments } from '@/data/experiments';

export function ExperimentsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredExperiments = activeCategory === 'all'
    ? experiments
    : experiments.filter(e => e.category === activeCategory);

  return (
    <PageShell maxWidth="default">
      <SEOHead
        title="Experiments & Explorations — Geddada Devicharan"
        description="Research notes, software prototypes, cognitive recall experiments, and clean energy studies by Geddada Devicharan."
        path="/experiments"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'Experiments', url: 'https://geddadadevicharan.vercel.app/experiments' }
        ]}
      />

      <main className="space-y-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-2">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">Experiments</span>
        </nav>

        {/* Header Window */}
        <div className="border border-border/60 rounded-xl bg-card/60 backdrop-blur-sm p-6 sm:p-8 space-y-4">
          <WindowChrome className="mb-2" />
          <div className="space-y-2">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <FlaskConical size={14} className="text-primary" />
              <span>Product Lab · Engineering & Personal Inquiries</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Experiments & Exploration
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Software prototypes, cognitive learning models, clean energy research from electrical engineering, and disciplined personal self-experimentation.
            </p>
          </div>

          {/* Responsibility Banner: Disclosing personal reading vs professional credentials */}
          <div className="p-3.5 rounded-lg bg-muted/40 border border-border/40 flex items-start gap-2.5 text-xs text-muted-foreground">
            <Info size={15} className="text-primary shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-foreground font-medium">Clarity Note:</strong> Professional qualifications (B.Tech Electrical & Electronics Engineering, Diploma, BHEL industrial training, software & video systems) are strictly distinguished from personal biohacking and longevity research, which represent self-directed intellectual curiosity and personal habit experiments, not medical credentials.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/40">
            {[
              { id: 'all', label: 'All Experiments' },
              { id: 'software', label: 'Software & Tooling' },
              { id: 'psychology', label: 'Cognitive Psychology' },
              { id: 'energy', label: 'Clean Energy & EEE' },
              { id: 'biohacking', label: 'Human Optimization' },
              { id: 'longevity', label: 'Longevity Science' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveCategory(f.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                  activeCategory === f.id
                    ? 'bg-foreground text-background shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Experiment Cards */}
        <div className="space-y-6">
          {filteredExperiments.map((exp) => (
            <article 
              key={exp.id}
              className="border border-border/50 rounded-xl bg-card/40 backdrop-blur-xs p-6 sm:p-7 space-y-4 hover:border-border transition-colors group"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-primary font-medium">{exp.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-[11px] text-foreground/80">{exp.status}</span>
                  {exp.isPersonalCuriosity && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-500/90 text-[11px]">Personal Study</span>
                    </>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  <Link to={`/experiments/${exp.id}`} className="hover:text-primary transition-colors">
                    {exp.title}
                  </Link>
                </h2>
                <p className="text-xs sm:text-sm font-mono text-muted-foreground">
                  {exp.subtitle}
                </p>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {exp.description}
              </p>

              {/* Methodology Preview */}
              <div className="p-3.5 rounded-lg bg-background/60 border border-border/40 text-xs sm:text-sm space-y-1">
                <span className="font-semibold text-foreground text-xs uppercase tracking-wider font-mono">
                  Method & Approach
                </span>
                <p className="text-muted-foreground leading-relaxed">{exp.methodology}</p>
              </div>

              {/* Action to view complete detail */}
              <div className="pt-2 flex items-center justify-between">
                {exp.relatedWorkLink ? (
                  <Link
                    to={exp.relatedWorkLink}
                    className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    <span>Related Work: {exp.relatedWorkTitle}</span>
                  </Link>
                ) : (
                  <span />
                )}

                <Link
                  to={`/experiments/${exp.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Full Experiment</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

            </article>
          ))}
        </div>

        {/* Footer Navigation */}
        <section className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <Link to="/works" className="hover:text-foreground flex items-center gap-1">
            <span>← Explore Works</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-foreground">About</Link>
            <Link to="/contact" className="hover:text-foreground">Contact</Link>
          </div>
        </section>

      </main>
    </PageShell>
  );
}
export default ExperimentsPage;
