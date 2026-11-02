import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';
import {
  ArrowLeft,
} from 'lucide-react';
import { TableOfContents } from '@/components/TableOfContents';

const CANONICAL = 'https://geddadadevicharan.vercel.app/writing/the-clean-web-architecture';
const TITLE = 'The Clean Web Architecture: Reducing Future Cognitive Friction | Devicharan Geddada';
const DESCRIPTION = 'A practical discussion on separation of concerns, component structure, environment configuration, and minimizing external packages to maintain high performance and readability.';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'The Clean Web Architecture: Reducing Future Cognitive Friction',
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
    'clean web architecture',
    'Vite React SPA best practices',
    'minimizing npm dependencies',
    'accessible design semantic HTML',
    'maintainable web engineering',
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
      name: 'The Clean Web Architecture',
      item: CANONICAL,
    },
  ],
};

export default function CleanWebArchitecture() {
  return (
    <PageShell maxWidth="default">
      <SEOHead
        title={TITLE}
        description={DESCRIPTION}
        path="/writing/the-clean-web-architecture"
        ogType="article"
        ogImage="https://geddadadevicharan.vercel.app/og/og-web.png"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app/' },
          { name: 'Writing', url: 'https://geddadadevicharan.vercel.app/writing' },
          { name: 'The Clean Web Architecture', url: CANONICAL }
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
              Clean Web Architecture
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
              clean-web-architecture.md
            </span>
            <div className="w-12" />
          </div>

          <div className="p-6 sm:p-10 md:p-12 space-y-10">
            
            {/* Header */}
            <header className="border-b border-border/40 pb-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-sans">
                <span className="text-primary font-medium">Software Engineering / Front-End / Web Standards</span>
                <span aria-hidden="true">·</span>
                <span>Published 2026</span>
                <span aria-hidden="true">·</span>
                <span>Devicharan Geddada</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                  Engineering Codebase
                </span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-foreground font-sans">
                  The Clean Web Architecture: Reducing Future Cognitive Friction in Production
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground font-sans">
                  How a disciplined approach to separation of concerns, static boundaries, and zero-dependency mindsets creates long-term maintainable software.
                </p>
              </div>
            </header>

            {/* Editorial Body */}
            <div className="font-editorial text-[17px] sm:text-[19px] leading-[1.75] text-foreground/90 space-y-8 tracking-[0.01em] max-w-prose">
              
              <p className="text-lg sm:text-xl text-foreground leading-relaxed italic border-l-2 border-primary/60 pl-4 py-1">
                The most expensive part of software engineering is not writing code. It is reading, understanding, and modifying it six months later. In web development, where frameworks and paradigms change annually, building a maintainable codebase is a deliberate exercise in restraint.
              </p>

              <p>
                In standard frontend architecture, there is a constant temptation to implement "architecture for architecture's sake." We are told to write abstract wrappers for our wrappers, introduce deep folders for trivial components, and adopt massive state-management libraries to manage simple local parameters. 
              </p>

              <p>
                For a solo developer, this artificial complexity represents a high risk. If your system is hard to understand, it will be hard to maintain. Clean web architecture is not about textbook abstract rules; it is about keeping your code simple and readable, reducing future confusion, and ensuring high performance.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                Practical Separation of Concerns
              </h2>

              <p>
                A clean application separates its core concerns cleanly without creating excessive file bloat:
              </p>

              <ul className="space-y-4 list-disc pl-5 text-sm sm:text-base font-sans text-muted-foreground">
                <li className="pl-1">
                  <strong className="text-foreground">Semantic UI Layers:</strong> Keep your layout and markup clean. Use standard HTML tags (`&lt;main&gt;`, `&lt;article&gt;`, `&lt;header&gt;`, `&lt;footer&gt;`) instead of endless generic nested `&lt;div&gt;` blocks.
                </li>
                <li className="pl-1">
                  <strong className="text-foreground">Explicit State Management:</strong> Use standard React hooks (`useState`, `useEffect`) and clear context parameters. Avoid wrapping simple pages in heavy, complex state-management boilerplates unless you have multi-entity relational variables.
                </li>
                <li className="pl-1">
                  <strong className="text-foreground">Decoupled Configuration:</strong> Environment details, static routes, and sitemaps should live in flat, indexable configuration files (like `routeManifest.ts`) that can be imported both by client components and static prerendering build scripts.
                </li>
              </ul>

              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                The Danger of Dependency Creep
              </h2>

              <p>
                The ease of `npm install` has led to a culture of dependency accumulation. It is common to see simple portfolios or websites that import hundreds of megabytes of third-party packages to implement basic carousels, modals, or page transitions.
              </p>

              <p>
                Every dependency you add is a black box. It increases your final javascript payload, degrades your Core Web Vitals, and introduces security vulnerabilities. In five years, many of those packages will be abandoned, leaving you with obsolete code that prevents you from updating your core framework.
              </p>

              <p>
                When building my projects, I prioritize writing vanilla implementations over importing external packages. For example, our modal overlay reader and page transition systems use standard Tailwind classes and lightweight Framer Motion transitions rather than massive pre-packaged layout libraries. This discipline keeps the application bundle small and incredibly fast, ensuring high performance.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                Routing, Prerendering, and SEO Integration
              </h2>

              <p>
                In single-page applications (SPAs), search engine crawlers often fail to parse client-side React metadata reliably. If a crawler receives an empty HTML shell with a blank body and standard script tags, it may index your page with missing titles and default descriptions.
              </p>

              <p>
                To solve this cleanly, we implement a static build-time prerender pipeline. By declaring our routes and their canonical metadata in a single configuration file (`routeManifest.ts`), we can run a node script during `npm run build` that generates pre-rendered `.html` documents for every individual route (such as `/writing`, `/works`, or individual articles).
              </p>

              <p>
                This represents a beautiful hybrid model. Search engines and social sharing crawlers get a fully pre-rendered HTML document with correct &lt;title&gt;, canonical URL, and Schema.org semantic data on their very first request. Meanwhile, human users enjoy the fast page transitions of a React single-page application.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                Reducing Technical Debt
              </h2>

              <p>
                Clean web architecture is ultimately about respect—respect for your users' hardware and bandwidth, and respect for your future self. 
              </p>

              <p>
                By keeping your code structured, minimizing external dependencies, and relying on native web APIs, you build software that survives and remains easy to maintain across decades.
              </p>

              {/* Related Article Navigation */}
              <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-left">
                  <span className="text-xs font-mono text-muted-foreground">Next Article</span>
                  <Link to="/writing/monetization-of-10-year-studio" className="block text-sm font-semibold text-primary hover:underline">
                    Monetization of a 10-Year Studio →
                  </Link>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-xs font-mono text-muted-foreground">Read also</span>
                  <Link to="/writing/architecture-of-zero-cost" className="block text-sm font-semibold text-primary hover:underline">
                    The Architecture of Zero Cost →
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
