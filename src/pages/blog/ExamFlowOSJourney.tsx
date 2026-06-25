import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { WindowChrome } from '@/components/WindowChrome';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  Calendar,
  User,
  ExternalLink,
  BookOpen,
  Layers,
  Compass,
  Rocket,
} from 'lucide-react';

const CANONICAL =
  'https://devicharangeddada.lovable.app/project/examflow-os/blog/examflowos-journey';
const PUBLISHED = '2026-06-25';
const TITLE =
  'Building ExamFlowOS: A Better Way to Access Previous Year Question Papers';
const DESCRIPTION =
  'How Geddada Devicharan (@imdvichrn) is building ExamFlowOS — a structured platform for AP & Telangana entrance exam previous year question papers, organized by exam, year and subject, with a CBT experience on the roadmap.';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  inLanguage: 'en',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  url: CANONICAL,
  author: {
    '@type': 'Person',
    name: 'Geddada Devicharan',
    alternateName: 'imdvichrn',
    url: 'https://devicharangeddada.lovable.app/',
  },
  publisher: {
    '@type': 'Person',
    name: 'Geddada Devicharan',
    alternateName: 'imdvichrn',
    url: 'https://devicharangeddada.lovable.app/',
  },
  about: {
    '@type': 'Thing',
    name: 'ExamFlowOS',
  },
  keywords: [
    'ExamFlowOS',
    'EFOS',
    'previous year question papers',
    'AP entrance exams',
    'Telangana entrance exams',
    'EAMCET',
    'CBT',
    'Geddada Devicharan',
    'imdvichrn',
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
      item: 'https://devicharangeddada.lovable.app/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'ExamFlow OS',
      item: 'https://devicharangeddada.lovable.app/project/examflow-os',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Building ExamFlowOS',
      item: CANONICAL,
    },
  ],
};

export default function ExamFlowOSJourney() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{TITLE} | Geddada Devicharan</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={CANONICAL} />
        <meta name="author" content="Geddada Devicharan" />
        <meta
          name="keywords"
          content="ExamFlowOS, EFOS, previous year question papers, AP entrance exams, Telangana entrance exams, EAMCET, CBT, Geddada Devicharan, imdvichrn"
        />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Geddada Devicharan" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="article:published_time" content={PUBLISHED} />
        <meta property="article:author" content="Geddada Devicharan" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:creator" content="@imdvichrn" />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <Navigation />

      <main className="pt-24 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-sm text-muted-foreground"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  to="/project/examflow-os"
                  className="hover:text-foreground transition-colors"
                >
                  ExamFlow OS
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-foreground">Blog</li>
            </ol>
          </nav>

          {/* Back link */}
          <Link
            to="/project/examflow-os"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to ExamFlow OS
          </Link>

          {/* Article window */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel border border-glass-border rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border bg-background/40">
              <WindowChrome />
              <span className="text-xs text-muted-foreground font-mono">
                examflowos-journey.md
              </span>
              <div className="w-12" />
            </div>

            <div className="p-6 sm:p-10">
              <header className="mb-10">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="secondary" className="gap-1">
                    <BookOpen className="h-3 w-3" />
                    Blog
                  </Badge>
                  <Badge variant="outline">ExamFlowOS</Badge>
                  <Badge variant="outline">Education</Badge>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                  Building ExamFlowOS: Creating a Better Way to Access Previous
                  Year Question Papers
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={PUBLISHED}>June 25, 2026</time>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Geddada Devicharan{' '}
                    <span className="text-muted-foreground/70">
                      (@imdvichrn)
                    </span>
                  </span>
                </div>
              </header>

              <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-p:text-foreground/90 prose-p:leading-relaxed prose-strong:text-foreground">
                <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed">
                  When I started building ExamFlowOS, the goal wasn't simply to
                  upload PDFs.
                </p>

                <p>
                  The goal was to build a structured platform where students
                  preparing for Andhra Pradesh and Telangana entrance
                  examinations could access previous year question papers
                  through a clean, organized, and continuously expanding
                  library.
                </p>

                <p>
                  Today, ExamFlowOS brings together previous year papers across
                  major AP and Telangana entrance examination streams, with
                  every paper organized by exam, year, and subject wherever
                  applicable. Instead of scattered download links and
                  inconsistent archives, the platform focuses on making
                  academic resources easier to discover, navigate, and use.
                </p>

                <p>This is only the first stage of the project.</p>

                <p>
                  Over the coming months, ExamFlowOS will continue expanding
                  its paper library, improve search and organization, and
                  introduce a full Computer-Based Test (CBT) experience
                  designed to help students practice in an environment that
                  closely reflects modern entrance examinations.
                </p>

                <h2 className="mt-12">A Consistent URL Structure</h2>
                <p>
                  Every paper published on ExamFlowOS follows a consistent URL
                  structure, making navigation straightforward for both users
                  and search engines. The platform organizes content by
                  examination, year, and subject, allowing students to locate
                  papers quickly while ensuring the library can continue to
                  grow without changing its information architecture.
                </p>

                <Card className="not-prose my-8 glass-panel border-glass-border">
                  <CardContent className="p-6 font-mono text-sm overflow-x-auto">
                    <div className="text-muted-foreground mb-2">
                      # URL pattern
                    </div>
                    <div className="text-foreground">
                      /papers/<span className="text-primary">:exam</span>/
                      <span className="text-primary">:year</span>/
                      <span className="text-primary">:subject</span>
                    </div>
                    <div className="text-muted-foreground mt-4 mb-2"># Example</div>
                    <div className="text-foreground">
                      /papers/ap-eamcet/2024/mathematics
                    </div>
                  </CardContent>
                </Card>

                <h2 className="mt-12">The Long-Term Vision</h2>
                <p>The long-term vision is simple:</p>
                <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/90">
                  Create one platform where students can prepare for AP and
                  Telangana entrance examinations — from discovering previous
                  year papers to practicing them through an integrated CBT
                  system — all in one place.
                </blockquote>

                <p>
                  ExamFlowOS is being built with scalability in mind. Every new
                  paper, subject, year, and future feature follows a
                  structured architecture designed to grow into a comprehensive
                  learning platform rather than just another collection of
                  PDFs.
                </p>

                <h2 className="mt-12">What's Next</h2>
              </div>

              {/* Roadmap cards */}
              <div className="grid sm:grid-cols-3 gap-4 my-8 not-prose">
                {[
                  {
                    icon: Layers,
                    title: 'Expanded Library',
                    text: 'More exams, more years, more subjects — added continuously.',
                  },
                  {
                    icon: Compass,
                    title: 'Better Discovery',
                    text: 'Search, filters and organization tuned for fast access.',
                  },
                  {
                    icon: Rocket,
                    title: 'Integrated CBT',
                    text: 'A realistic Computer-Based Test experience for practice.',
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <Card
                    key={title}
                    className="glass-panel border-glass-border hover:border-primary/40 transition-colors"
                  >
                    <CardContent className="p-5">
                      <Icon className="h-5 w-5 text-primary mb-3" />
                      <h3 className="font-semibold mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {text}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="prose prose-invert max-w-none prose-p:text-foreground/90">
                <p>
                  This project is designed, developed, and continuously
                  maintained by{' '}
                  <strong>Geddada Devicharan (@imdvichrn)</strong> as part of
                  an ongoing mission to build better educational software for
                  students.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-12 flex flex-wrap gap-3">
                <Button asChild>
                  <a
                    href="https://examflowos.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Visit ExamFlowOS
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/project/examflow-os">View Project Page</Link>
                </Button>
              </div>
            </div>
          </motion.article>
        </div>
      </main>
    </div>
  );
}
