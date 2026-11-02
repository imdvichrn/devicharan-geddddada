import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { TableOfContents } from '@/components/TableOfContents';

const CANONICAL = 'https://geddadadevicharan.vercel.app/writing/architecture-of-zero-cost';
const TITLE = 'The Architecture of Zero Cost: Scaling Software with Zero Infrastructure Bills | Devicharan Geddada';
const DESCRIPTION = 'How to design, scale, and maintain public-good software to 10,000+ users without accumulating recurring database and server costs. Insights from building ExamFlowOS.';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'The Architecture of Zero Cost: Scaling Software with Zero Infrastructure Bills',
  description: DESCRIPTION,
  datePublished: '2026-10-08',
  dateModified: '2026-10-08',
  inLanguage: 'en',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  url: CANONICAL,
  author: {
    '@type': 'Person',
    name: 'Devicharan Geddada',
    alternateName: 'imdvichrn',
    url: 'https://geddadadevicharan.vercel.app/',
  },
  publisher: {
    '@type': 'Person',
    name: 'Devicharan Geddada',
    alternateName: 'imdvichrn',
    url: 'https://geddadadevicharan.vercel.app/',
  },
  keywords: [
    'zero-cost architecture',
    'ExamFlowOS',
    'indie developer scaling',
    'static web delivery',
    'user-owned storage',
    'Google Drive sync',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://geddadadevicharan.vercel.app/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Writing',
      item: 'https://geddadadevicharan.vercel.app/writing',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'The Architecture of Zero Cost',
      item: CANONICAL,
    },
  ],
};

export default function ZeroCostArchitecture() {
  return (
    <PageShell maxWidth="default">
      <SEOHead
        title={TITLE}
        description={DESCRIPTION}
        path="/writing/architecture-of-zero-cost"
        ogType="article"
        ogImage="https://geddadadevicharan.vercel.app/og/og-software.png"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app/' },
          { name: 'Writing', url: 'https://geddadadevicharan.vercel.app/writing' },
          { name: 'The Architecture of Zero Cost', url: CANONICAL }
        ]}
        structuredData={[articleSchema, breadcrumbSchema]}
      />

      <div className="w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link to="/writing" className="hover:text-foreground transition-colors">Writing</Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-foreground truncate max-w-[200px] sm:max-w-none">
              Zero-Cost Architecture
            </li>
          </ol>
        </nav>

        {/* Back Link */}
        <Link
          to="/writing"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Writing
        </Link>

        {/* Article Layout with Table of Contents */}
        <div className="relative flex justify-center 2xl:justify-between items-start gap-10">
          {/* Article Container */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel border border-glass-border rounded-2xl overflow-hidden flex-1 max-w-full 2xl:max-w-[880px]"
          >
          <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border bg-background/40">
            <WindowChrome />
            <span className="text-xs text-muted-foreground font-mono">
              architecture-of-zero-cost.md
            </span>
            <div className="w-12" />
          </div>

          <div className="p-6 sm:p-10 md:p-12 space-y-10">
            
            {/* Header */}
            <header className="border-b border-border/40 pb-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-sans">
                <span className="text-primary font-medium">Software Architecture / Hosting / Systems</span>
                <span aria-hidden="true">·</span>
                <span>Published 2026</span>
                <span aria-hidden="true">·</span>
                <span>Devicharan Geddada</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                  Engineering Principles
                </span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-foreground font-sans">
                  The Architecture of Zero Cost: Scaling Software with Zero Infrastructure Bills
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground font-sans">
                  Why near-zero-cost operations represent a superpower for independent developers building public-good software.
                </p>
              </div>
            </header>

            {/* Editorial Body */}
            <div className="font-editorial text-[17px] sm:text-[19px] leading-[1.75] text-foreground/90 space-y-8 tracking-[0.01em] max-w-prose">
              
              <p className="text-lg sm:text-xl text-foreground leading-relaxed italic border-l-2 border-primary/60 pl-4 py-1">
                For an independent developer, an infrastructure bill is not just an operating expense. It is a ticking clock, a silent pressure that forces compromises on licensing, pricing, and longevity long before a product finds its stride.
              </p>

              <p>
                When building public-good tools, this equation becomes even more acute. If you pledge that a student preparation utility must remain 100% free forever, every database call and server route becomes a potential liability. Traditional backend architectures—spinning up relational database instances, stateful API servers, and continuous background sync workers—essentially guarantee that growing popularity is punished with escalating monthly bills.
              </p>

              <p>
                The alternative is not to compromise on quality, but to rethink software design. By treating zero-cost operations as a primary engineering constraint rather than a budgetary inconvenience, we discover architectures that are not only free but intrinsically more stable, private, and durable.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                The Core Trap of "Modern" Stacks
              </h2>

              <p>
                Most developer tutorials today advocate for a baseline stack that is heavily over-engineered: a full Next.js application, an external database (such as Supabase or Neon), a separate auth provider, and a cloud state manager. While incredibly powerful, this model operates on the assumption of rapid commercialization—the expectation that monthly active users will eventually translate into premium subscriptions or enterprise tiers.
              </p>

              <p>
                But when your project is educational or a public utility, scaling this stack to 10,000+ registered users creates a structural mismatch. Relational databases charge for active connections, read/write throughput, or storage rows. At this point, you face a frustrating choice: shut down the project, clutter the experience with aggressive advertising, or cover the server costs out of your own pocket.
              </p>

              <p>
                To escape this trap, we must embrace a set of distinct architectural shifts:
              </p>

              <ul className="space-y-4 list-disc pl-5 text-sm sm:text-base font-sans text-muted-foreground">
                <li className="pl-1">
                  <strong className="text-foreground">Client-First Execution:</strong> Shift as much computation, indexing, and filtering as possible from stateful servers into the client's browser.
                </li>
                <li className="pl-1">
                  <strong className="text-foreground">Static Delivery over Live Queries:</strong> Pre-generate and cache dynamic content at build time, distributing it via global Content Delivery Networks (CDNs).
                </li>
                <li className="pl-1">
                  <strong className="text-foreground">Sovereign Data Storage:</strong> Decouple private user data from central database servers. If users own their data, you eliminate both storage costs and compliance complexity.
                </li>
              </ul>

              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                Client-Side Indexes & Zero-Cost Content Delivery
              </h2>

              <p>
                Consider the challenge of searching a massive library of previous year question papers. In a standard setup, a user type-ahead triggers API searches against a Postgres index, meaning each keystroke makes a round-trip to an active database connection. 
              </p>

              <p>
                With ExamFlowOS, I took a different route. During the automated production build, the entire syllabus and question paper structure is compiled and indexed into highly optimized static JSON files. When a student loads the app, this pre-built metadata index is fetched once and cached locally. Type-ahead searches are executed entirely client-side using a lightweight index runner.
              </p>

              <p>
                This shift has profound implications. Searching the directory places exactly <em>zero</em> load on my servers. Since the static assets are served over an edge network (such as Vercel), the bandwidth is completely absorbed by Vercel's generous free tier. The user experience feels incredibly fast because search queries execute instantly without network latency.
              </p>

              <div className="my-8 not-prose border border-border/60 rounded-xl overflow-hidden bg-muted/40">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-muted/60 text-muted-foreground text-xs font-mono">
                  <span>static-index-loader.ts</span>
                </div>
                <pre className="p-4 overflow-x-auto text-[12px] leading-relaxed text-foreground font-mono">
{`// Loading pre-built index at build time instead of query time
export async function fetchSearchIndex(examId: string) {
  try {
    const response = await fetch(\`/data/indexes/\${examId}.json\`, {
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
    });
    if (!response.ok) throw new Error('Failed to fetch static index');
    const indexData = await response.json();
    return indexData;
  } catch (error) {
    console.error('Local index lookup fallback:', error);
    return null;
  }
}`}
                </pre>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                The Sovereign Storage Solution
              </h2>

              <p>
                Perhaps the hardest problem to solve without a server is student data persistence. Students taking mock tests need to save their progress, flag difficult questions, track mistakes, and view preparation statistics across multiple sessions and devices.
              </p>

              <p>
                My solution was to implement user-owned storage. Instead of storing 10,000 student accounts in an expensive centralized Firebase or SQL database, ExamFlowOS integrates directly with <strong className="text-foreground">Google Drive APIs</strong>. Since almost every student in India already has a Google account, we utilize their personal, free cloud storage.
              </p>

              <p>
                When a student completes a practice session, the application serializes their progress and pushes it directly as a secure backup JSON document to their own private Google Drive's <code className="text-primary bg-muted px-1 rounded text-xs">appDataFolder</code>. 
              </p>

              <p>
                This architecture provides two incredible advantages. First, my infrastructure costs remain exactly <strong className="text-foreground">$0.00</strong>, regardless of whether 100 or 100,000 students register. Second, data privacy is absolute. I do not store student information on my own servers, removing the risk of data breaches and keeping the platform's footprint completely transparent and clean.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                Cheap is Not Fragile
              </h2>

              <p>
                There is a common misconception that designing for low cost results in a fragile system. The reality is often the opposite. 
              </p>

              <p>
                Stateless static apps served from edge nodes have no active server processes to crash, no databases to overflow with open connections, and no backend routes susceptible to DDoS attacks. By minimizing server dependency, you maximize resilience. A static app built cleanly with React, TypeScript, and Vite can easily survive sudden traffic spikes that would take down complex, database-heavy monolithic architectures.
              </p>

              <p>
                As independent developers, our runway isn't measured in VC capital, but in our interest and ability to keep our systems alive. By designing robust, zero-cost architectures, we guarantee our applications can stay active indefinitely, waiting for students and users to find them, without ever sending us an unexpected bill.
              </p>

              {/* Related Article Navigation */}
              <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-left">
                  <span className="text-xs font-mono text-muted-foreground">Next Article</span>
                  <Link to="/writing/lessons-from-700-active-users" className="block text-sm font-semibold text-primary hover:underline">
                    Lessons from 700+ Monthly Active Users →
                  </Link>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-xs font-mono text-muted-foreground">Read also</span>
                  <Link to="/writing/the-clean-web-architecture" className="block text-sm font-semibold text-primary hover:underline">
                    The Clean Web Architecture →
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </motion.article>

        {/* Dynamic Table of Contents */}
        <TableOfContents />
      </div>
    </div>
  </PageShell>
);
}
