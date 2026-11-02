import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { WindowChrome } from '@/components/WindowChrome';
import { PageShell } from '@/components/PageShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  Calendar,
  User,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { TableOfContents } from '@/components/TableOfContents';

const CANONICAL = 'https://geddadadevicharan.vercel.app/writing/examflowos-10000-registrations';
const PUBLISHED = '2026';
const TITLE = '10,000 Registrations: The Journey Behind ExamFlowOS | Devicharan Geddada';
const DESCRIPTION = 'From an idea in November 2025 to 10,000+ registrations and 700+ monthly active users. Devicharan Geddada shares the story, challenges, and Pinky Promise behind ExamFlowOS.';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: TITLE,
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
  about: {
    '@type': 'Thing',
    name: 'ExamFlowOS',
  },
  keywords: [
    'ExamFlowOS',
    '10,000 registrations',
    'imdvichrn',
    'Devicharan Geddada',
    'student preparation CBT',
    'ECET',
    'POLYCET',
    'ICET',
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
      name: '10,000 Registrations Milestone',
      item: CANONICAL,
    },
  ],
};

export default function ExamFlowOSRegistrations() {
  return (
    <PageShell maxWidth="default">
      <SEOHead
        title={TITLE}
        description={DESCRIPTION}
        path="/writing/examflowos-10000-registrations"
        ogType="article"
        ogImage="https://geddadadevicharan.vercel.app/og/og-examflowos.png"
        breadcrumbs={[
          { name: 'Home', url: 'https://geddadadevicharan.vercel.app/' },
          { name: 'Writing', url: 'https://geddadadevicharan.vercel.app/writing' },
          { name: '10,000 Registrations Milestone', url: CANONICAL }
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
              10,000 Registrations
            </li>
          </ol>
        </nav>

        {/* Back link */}
        <Link
          to="/writing"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Writing
        </Link>

        {/* Article layout with Table of Contents */}
        <div className="relative flex justify-center 2xl:justify-between items-start gap-10">
          {/* Article window */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel border border-glass-border rounded-2xl overflow-hidden flex-1 max-w-full 2xl:max-w-[880px]"
          >
          <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border bg-background/40">
            <WindowChrome />
            <span className="text-xs text-muted-foreground font-mono">
              milestone-10000-registrations.md
            </span>
            <div className="w-12" />
          </div>

          <div className="p-6 sm:p-10 md:p-12 space-y-10">
            
            {/* Hero Section */}
            <header className="border-b border-border/40 pb-8 space-y-6">
              
              {/* Premium, unboxed metadata (No Static Pills) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-sans">
                <span className="text-primary font-medium">Building / Product / Writing</span>
                <span aria-hidden="true">·</span>
                <span>Published 2026</span>
                <span aria-hidden="true">·</span>
                <span>Devicharan Geddada · Creator of ExamFlowOS</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-6 pt-2">
                <div className="w-16 h-16 rounded-2xl border border-border/80 bg-card overflow-hidden shrink-0 shadow-md">
                  <img
                    src="/examflow-logo.jpg"
                    alt="ExamFlowOS official logo"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                    10,000 Registrations
                  </span>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-foreground font-sans">
                    10,000 Registrations: The Story Behind ExamFlowOS and a Promise to Keep
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground font-sans">
                    Devicharan Geddada · 2026
                  </p>
                </div>
              </div>
            </header>

            {/* Content Body: Source Serif 4 styling */}
            <div className="font-editorial text-[17px] sm:text-[19px] leading-[1.75] text-foreground/90 space-y-8 tracking-[0.01em] max-w-prose">
              
              {/* Opening */}
              <p className="text-lg sm:text-xl text-foreground leading-relaxed italic border-l-2 border-primary/60 pl-4 py-1">
                There is a unique kind of quiet that happens late at night when you are looking at a system dashboard. The cursor blinks, the server logs scroll by, and suddenly you notice a counter has quietly ticked past 10,000.
              </p>

              <p>
                For an independent developer, that number is more than a database row. It is a moment of deep reflection.
              </p>

              {/* Origin Story */}
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                The Origin Story
              </h2>

              <p>
                In November 2025, ExamFlowOS was nothing more than an outline in my notebook. I wanted to design an application that cut out the noise of modern educational portals — no unnecessary visual clutter, no complicated navigation, and no friction between a student and the preparation material they actually need.
              </p>

              <p>
                Just a clean, fast, responsive tool that helped students prepare for examinations.
              </p>

              <p>
                By December 2025, I had built the very first working demo. It was basic, but the core idea worked.
              </p>

              <p>
                Encouraged by that small spark, I spent the following weeks refining the architecture, preparing databases, and polishing the interface.
              </p>

              <p>
                In 2026, I launched ExamFlowOS publicly using the <strong>.in domain</strong> (<a href="https://examflowos.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5 font-sans text-[16px] font-medium">examflowos.in <ExternalLink size={12} /></a>).
              </p>

              {/* 10,000 Registrations */}
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                10,000+ Registrations
              </h2>

              <p>
                Now, looking back from this milestone, ExamFlowOS has reached <strong>10,000+ registrations</strong>.
              </p>

              <p>
                To some, in the world of high-growth startups, 10,000 accounts might sound like a modest starting point.
              </p>

              <p>
                But to me, as an independent creator, that number is massive. These are people who decided that something I built was worth their time.
              </p>

              {/* 700+ Monthly Active Users */}
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                700+ Monthly Active Users
              </h2>

              <p>
                And registrations only tell part of the story.
              </p>

              <p>
                The quieter number that means just as much to me is <strong>700+ monthly active users</strong>.
              </p>

              <p>
                These users aren't simply creating accounts and disappearing. They return to ExamFlowOS to download examination papers, attempt CBTs, cross-check answers, review their preparation, and find mistakes they can improve before the real examination.
              </p>

              <p>
                Knowing that hundreds of students return to something I built as part of their preparation is both a huge privilege and a deep responsibility.
              </p>

              {/* Scaling/Infrastructure Reality */}
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                Scaling &amp; Infrastructure Reality
              </h2>

              <p>
                It has not been a perfectly smooth journey.
              </p>

              <p>
                As usage has grown, hosting and bandwidth have become real engineering constraints. Handling more traffic while keeping the experience responsive — especially for students accessing the platform through mobile networks — is something I continue to work on.
              </p>

              <p>
                I don't say this as a complaint. It is simply part of building something real.
              </p>

              <p>
                Growth brings problems that don't exist when you're building alone on a local machine. It means thinking more carefully about infrastructure, data, caching, queries, assets, and reliability.
              </p>

              <p>
                And it reinforces something I believed when I started: <em>Simple software is only valuable when it remains reliable.</em>
              </p>

              {/* Pinky Promise */}
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                My Pinky Promise
              </h2>

              <p>
                That brings me to the commitment I made to the students using ExamFlowOS.
              </p>

              <p>
                I call it my <strong>Pinky Promise</strong>. This isn't a marketing slogan. It is a personal promise from the person building and maintaining the platform.
              </p>

              {/* Minimal metrics layout (no pills) */}
              <div className="my-8 not-prose p-6 rounded-2xl bg-muted/40 border border-border/50 space-y-6">
                <div className="border-b border-border/40 pb-4">
                  <h3 className="font-sans text-base font-bold text-foreground">
                    The Pinky Promise
                  </h3>
                </div>
                
                <div className="space-y-6 text-sm text-foreground/90 font-sans">
                  <div className="space-y-1">
                    <h4 className="font-bold text-primary flex items-center gap-2">
                      <span>1. Keep the data fresh.</span>
                    </h4>
                    <p className="text-muted-foreground pl-5">
                      I will continue updating the examination database regularly with the latest relevant exam papers, wrappers, CBTs, and preparation resources.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-primary flex items-center gap-2">
                      <span>2. Prioritize stability over novelty.</span>
                    </h4>
                    <p className="text-muted-foreground pl-5">
                      I want ExamFlowOS to remain reliable. I don't want to constantly replace stable features simply because something newer or trendier exists.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-primary flex items-center gap-2">
                      <span>3. Let real student experience guide the roadmap.</span>
                    </h4>
                    <p className="text-muted-foreground pl-5">
                      Real usage, feedback, frustrations, mistakes, and requests should influence what gets improved.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-primary flex items-center gap-2">
                      <span>4. Take care of the platform for the long term.</span>
                    </h4>
                    <p className="text-muted-foreground pl-5">
                      I want ExamFlowOS to be something students can continue returning to — not something that disappears after the excitement of a launch.
                    </p>
                  </div>
                </div>
              </div>

              {/* Closing Reflection */}
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground tracking-tight pt-4">
                Closing Reflection
              </h2>

              <p>
                When I first started building ExamFlowOS in late 2025, I didn't know whether anyone outside my immediate circle would ever use it.
              </p>

              <p>
                Today, more than 10,000 registrations later, and with 700+ monthly active users, the perspective is very different.
              </p>

              <p>
                It has taught me something simple:
              </p>

              <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/80 my-6 bg-muted/20 py-2 pr-2 rounded-r-lg">
                Useful software doesn't have to be complicated. It just has to work when someone is counting on it.
              </blockquote>

              <p>
                To every student who registered, downloaded a paper, completed a CBT, checked an answer, found a mistake, sent feedback, reported a bug, or simply gave ExamFlowOS a chance:
              </p>

              <p>
                Thank you.
              </p>

              <p>
                Thank you for trusting something I built.
              </p>

              <p>
                I'll keep my Pinky Promise.
              </p>

              <p>
                We're only getting started.
              </p>

              <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between border-t border-border/40 gap-4">
                <div className="space-y-0.5">
                  <p className="font-sans font-semibold text-foreground text-sm">
                    Devicharan Geddada
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    Creator of ExamFlowOS
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button asChild size="sm">
                    <a
                      href="https://examflowos.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5"
                    >
                      Visit ExamFlowOS (examflowos.in)
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
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
