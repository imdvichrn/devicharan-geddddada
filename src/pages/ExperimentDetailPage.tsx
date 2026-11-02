import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { getExperimentById, experiments } from '@/data/experiments';
import { PageShell } from '@/components/PageShell';
import { WindowChrome } from '@/components/WindowChrome';
import { 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight, 
  Info, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  FlaskConical,
  Layers,
  Calendar
} from 'lucide-react';

export function ExperimentDetailPage() {
  const { experimentId } = useParams<{ experimentId: string }>();
  const experiment = experimentId ? getExperimentById(experimentId) : null;

  if (!experiment) {
    return (
      <PageShell maxWidth="default">
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Experiment Not Found</h1>
          <p className="text-sm text-muted-foreground">The requested research note or experiment does not exist.</p>
          <Link
            to="/experiments"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium"
          >
            <ArrowLeft size={14} />
            <span>Back to Experiments</span>
          </Link>
        </div>
      </PageShell>
    );
  }

  const otherExperiments = experiments.filter((e) => e.id !== experiment.id).slice(0, 2);

  const experimentSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": experiment.title,
    "description": experiment.description,
    "datePublished": "2025-01-01",
    "author": {
      "@type": "Person",
      "name": "Geddada Devicharan",
      "url": "https://geddadadevicharan.vercel.app/"
    }
  };

  return (
    <PageShell maxWidth="default">
      <SEOHead
        title={`${experiment.title} | Experiments | Geddada Devicharan`}
        description={experiment.description}
        path={`/experiments/${experiment.id}`}
        ogType="article"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'Experiments', url: 'https://geddadadevicharan.vercel.app/experiments' },
          { name: experiment.title, url: `https://geddadadevicharan.vercel.app/experiments/${experiment.id}` }
        ]}
        structuredData={experimentSchema}
      />

      <main className="space-y-12">
        
        {/* Top Back Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-2">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/experiments" className="hover:text-foreground transition-colors">Experiments</Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{experiment.title}</span>
        </nav>

        {/* Experiment Hero Header */}
        <header className="border border-border/60 rounded-2xl bg-card/60 backdrop-blur-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <WindowChrome />
            <div className="flex items-center gap-2 text-xs font-mono text-primary">
              <FlaskConical size={14} />
              <span>Experiment Log</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="text-primary font-semibold">{experiment.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-foreground/80">{experiment.status}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-mono">
                <Calendar size={12} />
                <span>{experiment.date}</span>
              </span>
              {experiment.isPersonalCuriosity && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-500 font-medium text-[11px]">Self-Directed Study</span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
              {experiment.title}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-muted-foreground">
              {experiment.subtitle}
            </p>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
            {experiment.description}
          </p>

          {experiment.isPersonalCuriosity && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-muted-foreground flex items-start gap-2.5">
              <Info size={15} className="text-amber-500 shrink-0 mt-0.5" />
              <p>
                <strong>Academic & Personal Study Disclaimer:</strong> This note reflects self-directed inquiry and personal habit protocols, completely distinct from formal medical or clinical advice.
              </p>
            </div>
          )}
        </header>

        {/* Methodology & Approach */}
        <section aria-labelledby="methodology-heading" className="space-y-4">
          <h2 id="methodology-heading" className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Layers size={18} className="text-primary" />
            <span>Methodology & Technical Formulation</span>
          </h2>
          <div className="p-5 sm:p-6 rounded-xl bg-card/40 border border-border/50 text-sm text-muted-foreground leading-relaxed">
            {experiment.methodology}
          </div>
        </section>

        {/* Detailed Analysis */}
        <section aria-labelledby="analysis-heading" className="space-y-4">
          <h2 id="analysis-heading" className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Sparkles size={18} className="text-primary" />
            <span>Detailed Breakdown & Architecture</span>
          </h2>
          <div className="space-y-3">
            {experiment.detailedAnalysis.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-border/40 bg-background/50 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Observed Learnings */}
        <section aria-labelledby="learnings-heading" className="space-y-4">
          <h2 id="learnings-heading" className="text-lg font-semibold text-foreground flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-500" />
            <span>Key Observations & Empirical Findings</span>
          </h2>
          <div className="p-5 rounded-xl border border-border/60 bg-card/40 space-y-3">
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              {experiment.learnings.map((learning, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{learning}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Related Work Link if applicable */}
        {experiment.relatedWorkLink && experiment.relatedWorkTitle && (
          <section aria-labelledby="related-work-heading" className="p-6 rounded-2xl border border-primary/20 bg-primary/5 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
              Applied In Production Work
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 id="related-work-heading" className="text-base font-semibold text-foreground">
                  {experiment.relatedWorkTitle}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Explore the live case study and system architecture where these experiment findings are deployed.
                </p>
              </div>
              <Link
                to={experiment.relatedWorkLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium shrink-0 hover:bg-primary/90 transition-colors"
              >
                <span>View Case Study</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </section>
        )}

        {/* Other Experiments */}
        <section aria-labelledby="other-experiments-heading" className="pt-8 border-t border-border/40 space-y-4">
          <div className="flex items-center justify-between">
            <h2 id="other-experiments-heading" className="text-base font-semibold text-foreground">
              Other Explorations & Experiments
            </h2>
            <Link
              to="/experiments"
              className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherExperiments.map((other) => (
              <Link
                key={other.id}
                to={`/experiments/${other.id}`}
                className="p-4 rounded-xl border border-border/50 bg-card/30 hover:border-primary/40 transition-colors space-y-2 group block"
              >
                <div className="text-[11px] font-mono text-primary">{other.categoryLabel}</div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {other.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {other.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </PageShell>
  );
}

export default ExperimentDetailPage;
