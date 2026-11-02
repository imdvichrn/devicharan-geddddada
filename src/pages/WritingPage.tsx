import { useState } from 'react';
import { SEOHead } from '@/components/SEOHead';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Clock 
} from 'lucide-react';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

interface Article {
  id: string;
  title: string;
  category: string;
  categorySlug: 'software' | 'automation' | 'video' | 'seo' | 'research';
  date: string;
  readTime: string;
  summary: string;
}

const articles: Article[] = [
  {
    id: 'examflowos-10000-registrations',
    title: '10,000 Registrations: The Story Behind ExamFlowOS and a Promise to Keep',
    category: 'Building / Product / Writing',
    categorySlug: 'software',
    date: '2026',
    readTime: '5 min read',
    summary: 'The personal, honest engineering and product story of how ExamFlowOS crossed 10,000 registrations while maintaining 700+ active users with zero recurring infrastructure bills.'
  },
  {
    id: 'architecture-of-zero-cost',
    title: 'The Architecture of Zero Cost: Scaling Software with Zero Infrastructure Bills',
    category: 'Software Architecture / Hosting',
    categorySlug: 'software',
    date: '2026',
    readTime: '6 min read',
    summary: 'How to design, scale, and maintain public-good software to 10,000+ users without accumulating recurring database and server costs. Insights from building ExamFlowOS.'
  },
  {
    id: 'monetization-of-10-year-studio',
    title: 'Monetization of a 10-Year Studio: Chasing Longevity Over Short-Term Gains',
    category: 'Business / Sustainable Growth / Philosophy',
    categorySlug: 'automation',
    date: '2026',
    readTime: '5 min read',
    summary: 'A thoughtful reflection on sustainable solo software development, avoiding intrusive advertising, and the discipline required to build products that remain useful for a decade.'
  },
  {
    id: 'lessons-from-700-active-users',
    title: 'Lessons from 700+ Monthly Active Users: Reality of Solo Product Growth',
    category: 'Product Management / User Metrics',
    categorySlug: 'research',
    date: '2026',
    readTime: '6 min read',
    summary: 'A practical case study on what real-world students reveal that local testing cannot, analyzing retention metrics, cache issues, and prioritizing stability for ExamFlowOS.'
  },
  {
    id: 'the-clean-web-architecture',
    title: 'The Clean Web Architecture: Reducing Future Cognitive Friction in Production',
    category: 'Software Engineering / Front-End',
    categorySlug: 'seo',
    date: '2026',
    readTime: '5 min read',
    summary: 'A practical discussion on separation of concerns, component structure, environment configuration, and minimizing external packages to maintain high performance and readability.'
  },
  {
    id: 'cognitive-load-spaced-repetition-learning',
    title: 'Cognitive Load, Spaced Repetition, and Learning: Designing Interfaces for the Mind',
    category: 'Cognitive Psychology / Software Design',
    categorySlug: 'research',
    date: '2026',
    readTime: '6 min read',
    summary: 'A thoughtful essay connecting software interface design with how students learn, exploring working memory limits, active recall, and ExamFlowOS’s design loop.'
  }
];

export function WritingPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredArticles = activeFilter === 'all'
    ? articles
    : articles.filter(a => a.categorySlug === activeFilter);

  return (
    <PageShell maxWidth="default">
      <SEOHead
        title="Writing & Build Logs — Geddada Devicharan"
        description="Technical build logs, engineering case studies, software architecture, video post-production insights, and cognitive psychology essays by Geddada Devicharan."
        path="/writing"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app' },
          { name: 'Writing', url: 'https://geddadadevicharan.vercel.app/writing' }
        ]}
      />

      <main className="space-y-10">
        
        {/* Header Window */}
        <ScrollReveal distance={16}>
          <div className="depth-widget p-6 sm:p-8 space-y-4">
            <WindowChrome className="mb-2" />
            <div className="space-y-2">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Technical Logs · Case Studies · Notes
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                Building in Public: Engineering &amp; Workflow Notes
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                Structured post-mortems and technical reflections on building software, managing web ecosystems, post-production craft, and systems design.
              </p>
            </div>

            {/* Clean Segmented Filter */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/40">
              {[
                { id: 'all', label: 'All Writing' },
                { id: 'software', label: 'Software Architecture' },
                { id: 'automation', label: 'Business Automation' },
                { id: 'video', label: 'Video Post-Production' },
                { id: 'seo', label: 'Technical SEO' },
                { id: 'research', label: 'Cognitive Science' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-xl depth-interactive transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                    activeFilter === f.id
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Articles List */}
        <div className="space-y-6">
          {filteredArticles.map((article, idx) => (
            <ScrollReveal key={article.id} staggerIndex={idx} distance={16}>
              <article 
                className="depth-widget depth-interactive p-6 sm:p-7 space-y-4 cursor-pointer group"
                onClick={() => {
                  navigate(`/writing/${article.id}`);
                }}
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="text-primary font-medium">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                  <span className="font-medium text-primary inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform">
                    <span>Read Full Case Study</span>
                    <ArrowRight size={13} />
                  </span>
                  <span className="text-muted-foreground/80 font-mono text-[11px]">
                    Structured Post-Mortem
                  </span>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

      </main>

    </PageShell>
  );
}

export default WritingPage;
