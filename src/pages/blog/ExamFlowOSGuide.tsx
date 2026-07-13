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
  Download,
  Search,
  Timer,
  Layers,
  Compass,
  Rocket,
  CheckCircle2,
  AlertTriangle,
  ListChecks,
} from 'lucide-react';

const CANONICAL =
  'https://geddadadevicharan.vercel.app/project/examflow-os/blog/examflowos-all-in-one-exam-prep-app-ap-tg-ecet-icet-polycet';
const PUBLISHED = '2026-07-13';
const TITLE =
  'ExamFlowOS: All-in-One AP/TG Exam Prep App';
const DESCRIPTION =
  'ExamFlowOS combines PYQs, CBT practice, flashcards, and spaced repetition into one app for AP/TG ECET, ICET & POLYCET prep.';

const KEYWORDS = [
  'ExamFlowOS',
  'AP ECET preparation',
  'TG ECET preparation',
  'AP ICET exam prep',
  'TG ICET exam prep',
  'AP POLYCET preparation',
  'TG POLYCET preparation',
  'previous year question papers',
  'CBT mock test practice',
  'computer based test simulator',
  'spaced repetition flashcards',
  'active recall study app',
  'competitive exam preparation app',
  'offline study app PWA',
  'exam preparation platform India',
  'Geddada Devicharan',
  'imdvichrn',
];

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
    url: 'https://geddadadevicharan.vercel.app/',
  },
  publisher: {
    '@type': 'Person',
    name: 'Geddada Devicharan',
    alternateName: 'imdvichrn',
    url: 'https://geddadadevicharan.vercel.app/',
  },
  about: { '@type': 'Thing', name: 'ExamFlowOS' },
  keywords: KEYWORDS,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://geddadadevicharan.vercel.app/' },
    { '@type': 'ListItem', position: 2, name: 'ExamFlow OS', item: 'https://geddadadevicharan.vercel.app/project/examflow-os' },
    { '@type': 'ListItem', position: 3, name: 'ExamFlowOS Review & Guide', item: CANONICAL },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is ExamFlowOS free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pricing isn\'t specified in the platform\'s documentation, so confirm this directly on the site. Many browsing features, like exploring exams and previewing papers, are available without an account.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to create an account to use ExamFlowOS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. You can browse exams, previous year papers, and PDFs without signing in. An account becomes valuable once you want to save flashcards, track recall history, and view long-term statistics.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which exams does ExamFlowOS currently support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AP ECET, TG ECET, AP ICET, TG ICET, AP POLYCET, and TG POLYCET, with additional regional and national exams planned for future releases.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use ExamFlowOS without an internet connection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, for most core activities. Subjects, notes, flashcards, recall sessions, Focus Mode, and statistics are stored locally. Features depending on remote content need connectivity.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I prepare for more than one exam using a single account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Subjects stay fully independent, so you can build separate structures for ECET and ICET without either losing progress.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a dedicated mobile app on the Play Store or App Store?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not as a store download. ExamFlowOS is a Progressive Web App that installs directly from the browser.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is my study data protected if I lose my device or clear my browser?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Through Import & Export. You can export a JSON backup of subjects, notes, flashcards, and settings, then import it on a new device.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Find and Download a Previous Year Paper on ExamFlowOS',
  description:
    'Step-by-step guide to navigate from the ExamFlowOS homepage to viewing, downloading, or starting a CBT for a previous year paper.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Open the ExamFlowOS Homepage', text: 'Start at the Home Dashboard.' },
    { '@type': 'HowToStep', position: 2, name: 'Go to the Previous Year Question Bank', text: 'From the Home Dashboard, select Previous Year Question Bank.' },
    { '@type': 'HowToStep', position: 3, name: 'Choose Your Examination', text: 'Tap the exam you are preparing for — AP ECET, TG ECET, AP ICET, TG ICET, AP POLYCET, or TG POLYCET.' },
    { '@type': 'HowToStep', position: 4, name: 'Choose the Year', text: 'Select the year you want from the available list.' },
    { '@type': 'HowToStep', position: 5, name: 'Choose Branch or Shift', text: 'ECET: pick your engineering branch. ICET: pick the shift. POLYCET: skip this step.' },
    { '@type': 'HowToStep', position: 6, name: 'Open the Paper', text: 'Choose View Paper, Download PDF, or Start CBT on the paper page.' },
  ],
};

const TOC = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'what-is-examflowos', label: 'What is ExamFlowOS?' },
  { id: 'why-built', label: 'Why Was ExamFlowOS Built?' },
  { id: 'comparison', label: 'Traditional Prep vs. ExamFlowOS' },
  { id: 'features', label: 'Key Features' },
  { id: 'how-it-works', label: 'How ExamFlowOS Works' },
  { id: 'benefits', label: 'Benefits for Students' },
  { id: 'use-cases', label: 'Real-World Use Cases' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'mistakes', label: 'Common Mistakes' },
  { id: 'how-to-download', label: 'How to Find & Download a Paper' },
  { id: 'before-you-start', label: 'Before You Start' },
  { id: 'cheat-sheet', label: 'Quick Recap (Cheat Sheet)' },
  { id: 'faq', label: 'FAQ' },
  { id: 'conclusion', label: 'Conclusion' },
];

export default function ExamFlowOSGuide() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{TITLE} | Geddada Devicharan</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={CANONICAL} />
        <meta name="author" content="Geddada Devicharan" />
        <meta name="keywords" content={KEYWORDS.join(', ')} />
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
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      <Navigation />

      <main className="pt-24 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link to="/project/examflow-os" className="hover:text-foreground transition-colors">ExamFlow OS</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-foreground">Documentation</li>
            </ol>
          </nav>

          <Link
            to="/project/examflow-os"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to ExamFlow OS
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel border border-glass-border rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border bg-background/40">
              <WindowChrome />
              <span className="text-xs text-muted-foreground font-mono">examflowos-guide.md</span>
              <div className="w-12" />
            </div>

            <div className="p-6 sm:p-10">
              <header className="mb-10">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="secondary" className="gap-1">
                    <BookOpen className="h-3 w-3" />
                    Documentation
                  </Badge>
                  <Badge variant="outline">ExamFlowOS</Badge>
                  <Badge variant="outline">Guide</Badge>
                  <Badge variant="outline">Review</Badge>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                  ExamFlowOS Review: The All-in-One Study Platform Built for AP &amp; TG ECET, ICET, and POLYCET Aspirants
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={PUBLISHED}>July 13, 2026</time>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Geddada Devicharan <span className="text-muted-foreground/70">(@imdvichrn)</span>
                  </span>
                </div>
              </header>

              {/* Table of Contents */}
              <Card className="not-prose mb-10 glass-panel border-glass-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4 text-sm font-semibold">
                    <ListChecks className="h-4 w-4 text-primary" />
                    On this page
                  </div>
                  <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {TOC.map((t, i) => (
                      <li key={t.id} className="text-muted-foreground">
                        <a href={`#${t.id}`} className="hover:text-foreground transition-colors">
                          {String(i + 1).padStart(2, '0')}. {t.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-headings:scroll-mt-24 prose-p:text-foreground/90 prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-foreground/90">
                <h2 id="introduction">Introduction</h2>
                <p>
                  Picture a typical week of competitive exam preparation. Previous year papers live in one browser tab downloaded as scattered PDFs. Flashcards are scribbled across three different notebooks. A countdown to exam day exists only in the back of your mind. And revision happens whenever you remember to reopen last month's notes — which, if you're honest, isn't often enough.
                </p>
                <p>
                  This is the default experience for thousands of students preparing for Andhra Pradesh and Telangana entrance exams like ECET, ICET, and POLYCET. Preparation isn't just hard because the syllabus is big — it's hard because the tools are scattered across a dozen apps, tabs, and paper files.
                </p>
                <p>
                  ExamFlowOS was built to fix exactly that problem. It's a single study platform that brings previous year question papers, computer-based test practice, flashcards, spaced repetition, focus tools, and progress tracking into one connected workspace — designed specifically around how AP and TG entrance exam aspirants actually study.
                </p>

                <h2 id="what-is-examflowos">What is ExamFlowOS?</h2>
                <p>
                  ExamFlowOS is a study operating system for competitive exam preparation. Rather than being "just another PDF hosting site" or "just another flashcard app," it combines the full preparation workflow — reading papers, practicing under exam conditions, revising with flashcards, and tracking progress — into a single mobile-first, browser-based platform.
                </p>
                <p>It currently supports six examinations:</p>
                <ul>
                  <li><strong>AP ECET</strong> — Andhra Pradesh Engineering Common Entrance Test</li>
                  <li><strong>TG ECET</strong> — Telangana Engineering Common Entrance Test</li>
                  <li><strong>AP ICET</strong> — Andhra Pradesh Integrated Common Entrance Test</li>
                  <li><strong>TG ICET</strong> — Telangana Integrated Common Entrance Test</li>
                  <li><strong>AP POLYCET</strong> — Andhra Pradesh Polytechnic Common Entrance Test</li>
                  <li><strong>TG POLYCET</strong> — Telangana Polytechnic Common Entrance Test</li>
                </ul>
                <p>
                  It's aimed at diploma holders and B.Sc. graduates going for lateral entry into engineering and pharmacy programs (ECET), degree students preparing for MBA/MCA admissions (ICET), and Class 10 students aiming for polytechnic diploma seats (POLYCET) — along with self-learners, teachers, and institutions who want a more organized way to work with exam resources.
                </p>
                <p>
                  The platform is designed as a Progressive Web App (PWA), meaning it runs in the browser but can be installed on a phone or laptop like a native app — without needing an app store.
                </p>

                <h2 id="why-built">Why Was ExamFlowOS Built?</h2>
                <p>
                  ExamFlowOS exists to solve one specific problem: <strong>fragmentation</strong>. Most students preparing for AP or TG entrance exams end up juggling a separate app or resource for each part of their preparation — one place for notes, another for flashcards, another for PDFs, a countdown app, a timer app, and a notebook for tracking progress. Every switch between tools is a small tax on focus.
                </p>
                <p>The platform is built around a few guiding principles:</p>
                <ul>
                  <li><strong>One Platform</strong> — every study resource should live inside a single application.</li>
                  <li><strong>Student First</strong> — features are designed around how students actually study.</li>
                  <li><strong>Learning Before Memorization</strong> — emphasis on understanding and spaced repetition, not last-minute cramming.</li>
                  <li><strong>Previous Year Papers Matter</strong> — PYQs are treated as one of the most valuable resources a student has.</li>
                  <li><strong>Practice Creates Confidence</strong> — simulating the exam builds real exam-day readiness.</li>
                </ul>
                <p>
                  ExamFlowOS is an independent, solo-built educational technology project created by <strong>Geddada Devicharan (@imdvichrn)</strong>, with a simple goal: make AP and TG entrance exam preparation more organized, accessible, and efficient.
                </p>

                <h2 id="comparison">Traditional Exam Prep vs. ExamFlowOS</h2>
              </div>

              {/* Comparison table */}
              <div className="not-prose my-8 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-glass-border">
                      <th className="text-left py-3 pr-4 font-semibold">Preparation Task</th>
                      <th className="text-left py-3 pr-4 font-semibold text-muted-foreground">Traditional Approach</th>
                      <th className="text-left py-3 font-semibold text-primary">With ExamFlowOS</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/85">
                    {[
                      ['Finding previous year papers', 'Searching multiple websites and Telegram groups for scattered PDFs', 'Browse by exam, year, and branch in one organized library'],
                      ['Practicing under exam conditions', 'Reading PDFs with no timer, no navigation, no scoring', 'CBT engine with timer, question palette, and auto-scoring'],
                      ['Revising formulas and concepts', 'Rereading handwritten notes repeatedly', 'Active-recall flashcards scheduled by spaced repetition'],
                      ['Deciding what to study today', 'Guesswork, or whatever notebook is on top', 'Auto-generated daily review queue (due, weak, important)'],
                      ['Staying focused', 'Phone notifications, tab-switching, no structure', 'Built-in Pomodoro Focus Mode with ambient sounds & Lock-in Mode'],
                      ['Tracking progress', 'Mental estimate of "how much I\'ve studied"', 'Statistics dashboard with streaks, subject progress & CBT performance'],
                      ['Studying without internet', 'Often impossible once tabs or downloads are lost', 'Local subjects, notes, flashcards, and recall work offline'],
                      ['Backing up study data', 'Rarely done, often lost when switching devices', 'One-click JSON export/import for backup and device migration'],
                    ].map(([task, trad, ef], i) => (
                      <tr key={i} className="border-b border-glass-border/60 align-top">
                        <td className="py-3 pr-4 font-medium">{task}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{trad}</td>
                        <td className="py-3">{ef}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-headings:scroll-mt-24 prose-p:text-foreground/90 prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-foreground/90">
                <h2 id="features">Key Features of ExamFlowOS</h2>

                <h3>1. Previous Year Question (PYQ) Bank</h3>
                <p>
                  A searchable library of previous year papers organized by examination, year, and branch (or shift). Every paper supports online viewing, PDF download, and — where available — a CBT version. AP ECET papers, for example, can be browsed by year → branch, or by branch first, to compare a specific engineering branch's paper across multiple years.
                </p>

                <h3>2. Computer-Based Test (CBT) Simulator</h3>
                <p>
                  Arguably the flagship feature. Supported papers can be converted into full interactive CBT sessions — countdown timer, question palette showing answered/unanswered/marked status, "Mark for Review," "Clear Response," auto-save, automatic submission when time runs out, and an instant results screen with a percentage score and performance breakdown.
                </p>

                <h3>3. Subject &amp; Syllabus Management</h3>
                <p>
                  Unlimited subjects, each broken down into <strong>chapters → units → topics → notes → flashcards</strong>. Each subject can carry its own exam date and countdown timer, letting you prepare for ECET and ICET simultaneously without mixing your notes.
                </p>

                <h3>4. Flashcards for Active Recall</h3>
                <p>
                  Both text flashcards (definitions, formulas, terminology) and image flashcards (circuit diagrams, chemical structures, engineering drawings). Every card lives inside a topic, so it's automatically organized by your syllabus structure.
                </p>

                <h3>5. Recall System (Spaced Repetition Engine)</h3>
                <p>
                  Instead of asking you to decide what to revise, the Recall System builds a daily queue from due cards, weak cards, and important cards. Rate each card as <em>Again, Hard, Good, or Easy</em> — the system schedules its next appearance accordingly.
                </p>

                <h3>6. Focus Mode (Productivity Toolkit)</h3>
                <p>
                  A Pomodoro-style timer (10–90 min sessions, 1–15 min breaks) with ambient sounds (rain, ocean, forest, white/pink/brown noise), Lock-in Mode for a distraction-free interface, and optional Brutal Mode that makes your exam countdown far more prominent when a deadline is close.
                </p>

                <h3>7. Statistics Dashboard</h3>
                <p>
                  Every session, flashcard review, and CBT attempt feeds into a dashboard covering study streaks, focus time, subject progress, recall accuracy, and CBT performance — daily, weekly, and monthly.
                </p>

                <h3>8. Global Search</h3>
                <p>
                  A single search bar indexes subjects, chapters, topics, notes, flashcards, previous year papers, exam names, years, and branches.
                </p>

                <h3>9. Offline Support &amp; PWA</h3>
                <p>
                  Study data (subjects, notes, flashcards, recall progress, statistics) is stored locally on your device, so most features work without an internet connection. ExamFlowOS can also be installed as a Progressive Web App.
                </p>

                <h3>10. Import &amp; Export (Data Portability)</h3>
                <p>
                  Study data can be exported as a structured JSON backup and re-imported later — useful for switching devices or keeping a safety copy.
                </p>

                <h2 id="how-it-works">How ExamFlowOS Works</h2>
                <p>A typical study session follows a natural flow:</p>
                <ol>
                  <li>Start at the <strong>Home Dashboard</strong> — see your exam countdown, due flashcards, and subject overview.</li>
                  <li>Begin a <strong>Focus Mode</strong> session with a timer and optional ambient sound.</li>
                  <li>Clear your due flashcards from the <strong>Recall System</strong>.</li>
                  <li>Study a subject topic — move through chapters, units, and topics.</li>
                  <li>Practice with the <strong>PYQ Bank</strong> — open a previous year paper.</li>
                  <li>Attempt a <strong>CBT</strong> under real exam conditions.</li>
                  <li>Review your results — accuracy, time management, skipped questions.</li>
                  <li>Check your <strong>Statistics</strong> page to confirm your streak and progress.</li>
                </ol>

                <h2 id="benefits">Benefits for Students</h2>
                <ul>
                  <li><strong>Less time hunting, more time learning.</strong> PYQs, flashcards, notes, and timers in one place.</li>
                  <li><strong>Real exam-day confidence.</strong> Practicing with a countdown timer, not just reading a PDF.</li>
                  <li><strong>Retention that actually lasts.</strong> Spaced repetition fights the forgetting curve.</li>
                  <li><strong>Clear view of your progress.</strong> Real numbers, not vague feelings.</li>
                  <li><strong>Preparation that survives bad internet.</strong> Offline flashcards and notes.</li>
                  <li><strong>Peace of mind about your data.</strong> One-click backup.</li>
                  <li><strong>One system for multiple exams.</strong> ECET and ICET stay cleanly separated.</li>
                </ul>

                <h2 id="use-cases">Real-World Use Cases</h2>
                <ul>
                  <li><strong>The diploma holder chasing a lateral entry seat.</strong> Pulls every year's Mechanical AP ECET paper, runs three CBT attempts a week, uses image flashcards for engineering drawings.</li>
                  <li><strong>The degree student aiming for an MBA.</strong> Builds subjects for Quant, Data Sufficiency, and Verbal for TG ICET, relies on the daily Recall queue.</li>
                  <li><strong>The Class 10 student targeting a polytechnic seat.</strong> Uses short Focus Mode sessions with Physics and Chemistry formula flashcards.</li>
                  <li><strong>The commuter with patchy internet.</strong> Downloads key PYQ PDFs in advance, reviews due flashcards on the commute.</li>
                  <li><strong>The last-month sprinter.</strong> Turns on Brutal Mode, filters Recall to "Important" and "Weak" only, runs daily CBTs.</li>
                  <li><strong>The multi-exam hedger.</strong> Keeps two fully separate subject trees for AP ECET and AP ICET in one account.</li>
                </ul>

                <h2 id="best-practices">Best Practices</h2>
              </div>

              <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
                {[
                  'Start every session at the Home Dashboard so due flashcards stay visible.',
                  'Clear your daily review queue before starting new material.',
                  'Treat CBT attempts like the real exam — mind the timer and review before submitting.',
                  'Rate your flashcard recall honestly — the algorithm depends on it.',
                  'Create flashcards immediately after studying a topic, not later.',
                  'Export a backup regularly, especially before switching devices.',
                  'Favor short, consistent Focus sessions over occasional marathons.',
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg glass-panel border border-glass-border">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90">{tip}</span>
                  </div>
                ))}
              </div>

              <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-headings:scroll-mt-24 prose-p:text-foreground/90 prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-foreground/90">
                <h2 id="mistakes">Common Mistakes to Avoid</h2>
              </div>

              <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
                {[
                  'Reading papers but never attempting a CBT.',
                  'Letting due flashcards pile up until reviews become impossible.',
                  'Ignoring weak cards until the week before the exam.',
                  'Not backing up study data before switching browsers.',
                  'Cramming through long, unbroken study marathons.',
                  'Studying without a visible exam countdown per subject.',
                  'Sticking to only one state\'s papers when preparing for a related exam.',
                ].map((m, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg glass-panel border border-glass-border">
                    <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90">{m}</span>
                  </div>
                ))}
              </div>

              <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-headings:scroll-mt-24 prose-p:text-foreground/90 prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-foreground/90">
                <h2 id="how-to-download">How to Find and Download a Previous Year Paper on ExamFlowOS (Step-by-Step)</h2>
                <p>If you've never used ExamFlowOS before, finding a specific previous year paper takes less than a minute once you know the path.</p>

                <h3>The Short Version</h3>
              </div>

              <Card className="not-prose my-6 glass-panel border-glass-border">
                <CardContent className="p-6 font-mono text-sm overflow-x-auto">
                  <div className="text-foreground">
                    Home → <span className="text-primary">Previous Year Question Bank</span> → Examination → Year → Branch / Shift → Paper → <span className="text-primary">View / Download / Start CBT</span>
                  </div>
                </CardContent>
              </Card>

              <div className="not-prose my-6 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-glass-border">
                      <th className="text-left py-3 pr-4 font-semibold">Exam</th>
                      <th className="text-left py-3 font-semibold">Path after Year</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/85">
                    <tr className="border-b border-glass-border/60"><td className="py-3 pr-4 font-medium">AP ECET, TG ECET</td><td className="py-3">Branch → Paper</td></tr>
                    <tr className="border-b border-glass-border/60"><td className="py-3 pr-4 font-medium">AP ICET, TG ICET</td><td className="py-3">Shift → Paper</td></tr>
                    <tr className="border-b border-glass-border/60"><td className="py-3 pr-4 font-medium">AP POLYCET, TG POLYCET</td><td className="py-3">Paper (no branch/shift step)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-headings:scroll-mt-24 prose-p:text-foreground/90 prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-foreground/90">
                <h3>Step-by-Step Walkthrough</h3>
                <ol>
                  <li>
                    <strong>Open the ExamFlowOS Homepage.</strong> Start at the Home Dashboard — the fastest entry point to everything, including a direct Previous Year Question Search widget.
                  </li>
                  <li>
                    <strong>Go to the Previous Year Question Bank</strong> (sometimes shown as "PYQ Bank"). This is the central library for every supported exam.
                  </li>
                  <li>
                    <strong>Choose Your Examination</strong> from the six currently supported: AP ECET, TG ECET, AP ICET, TG ICET, AP POLYCET, TG POLYCET.
                  </li>
                  <li>
                    <strong>Choose the Year.</strong> The most recent 2–3 years are usually the most representative of the current pattern.
                  </li>
                  <li>
                    <strong>Choose Branch or Shift (if applicable).</strong> ECET → engineering branch; ICET → shift (Morning/Afternoon); POLYCET → skip this step.
                  </li>
                  <li>
                    <strong>Open the Paper Page</strong> to see the available actions: View Paper, Download PDF, or Start CBT (if available).
                  </li>
                </ol>
              </div>

              <div className="not-prose grid sm:grid-cols-3 gap-4 my-8">
                {[
                  { icon: BookOpen, title: 'View Paper', text: 'Opens the built-in Paper Viewer inside ExamFlowOS — original formatting, diagrams, and tables preserved.' },
                  { icon: Download, title: 'Download PDF', text: 'Starts your browser\'s normal download. The file saves exactly as the original paper.' },
                  { icon: Timer, title: 'Start CBT', text: 'Launches a timed, interactive test — countdown, question palette, mark-for-review, auto-scoring.' },
                ].map(({ icon: Icon, title, text }) => (
                  <Card key={title} className="glass-panel border-glass-border">
                    <CardContent className="p-5">
                      <Icon className="h-5 w-5 text-primary mb-3" />
                      <h3 className="font-semibold mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-headings:scroll-mt-24 prose-p:text-foreground/90 prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-foreground/90">
                <h3>Alternative Path: Browse by Branch</h3>
                <p>If you'd rather compare how one branch's paper has changed across multiple years, most exam pages offer a Browse by Branch option:</p>
              </div>

              <Card className="not-prose my-6 glass-panel border-glass-border">
                <CardContent className="p-6 font-mono text-sm overflow-x-auto">
                  <div className="text-foreground">
                    Examination → <span className="text-primary">Browse by Branch</span> → Choose Branch → View All Available Years → Open Paper
                  </div>
                </CardContent>
              </Card>

              <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-headings:scroll-mt-24 prose-p:text-foreground/90 prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-foreground/90">
                <h2 id="before-you-start">A Few Things to Know Before You Start</h2>
                <ul>
                  <li><strong>You don't need an account just to browse and download.</strong> Sign-in unlocks saved progress, flashcards, and statistics — but viewing and downloading papers works without one.</li>
                  <li><strong>Downloading requires an internet connection.</strong> Once a paper's PDF has loaded once, it may be cached, but a paper you haven't opened before needs connectivity — download anything you'll need before travelling.</li>
                  <li><strong>Not every paper has a CBT version yet.</strong> If "Start CBT" is greyed out, that paper is still PDF-only for now. More CBTs are added over time.</li>
                  <li><strong>The paper database keeps growing.</strong> The years, branches, and papers available today aren't the final set — check back for anything missing right now.</li>
                  <li><strong>You can search instead of browsing.</strong> Typing into the search bar is usually faster than tapping through every step manually.</li>
                </ul>

                <h2 id="cheat-sheet">Quick Recap (Cheat Sheet)</h2>
              </div>

              <Card className="not-prose my-6 glass-panel border-glass-border">
                <CardContent className="p-6">
                  <ol className="space-y-2 text-sm text-foreground/90">
                    <li className="flex gap-3"><span className="text-primary font-mono">01.</span> Open ExamFlowOS → Home</li>
                    <li className="flex gap-3"><span className="text-primary font-mono">02.</span> Tap <strong>Previous Year Question Bank</strong></li>
                    <li className="flex gap-3"><span className="text-primary font-mono">03.</span> Pick your <strong>Exam</strong></li>
                    <li className="flex gap-3"><span className="text-primary font-mono">04.</span> Pick the <strong>Year</strong></li>
                    <li className="flex gap-3"><span className="text-primary font-mono">05.</span> Pick the <strong>Branch</strong> (ECET) or <strong>Shift</strong> (ICET) — skip this for POLYCET</li>
                    <li className="flex gap-3"><span className="text-primary font-mono">06.</span> On the paper page, choose <strong>View</strong>, <strong>Download</strong>, or <strong>Start CBT</strong></li>
                  </ol>
                  <p className="mt-4 text-sm text-muted-foreground">That's the entire path — five taps at most, from the homepage to a downloaded paper in your hands.</p>
                </CardContent>
              </Card>

              <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-headings:scroll-mt-24 prose-p:text-foreground/90 prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-foreground/90">
                <h2 id="faq">Frequently Asked Questions</h2>

                <h3>Is ExamFlowOS free to use?</h3>
                <p>Pricing isn't specified in the platform's documentation, so confirm this directly on the site. Many browsing features, like exploring exams and previewing papers, are available without an account.</p>

                <h3>Do I need to create an account to use ExamFlowOS?</h3>
                <p>No. You can browse exams, previous year papers, and PDFs without signing in. An account becomes valuable once you want to save flashcards, track recall history, and view long-term statistics.</p>

                <h3>Which exams does ExamFlowOS currently support?</h3>
                <p>AP ECET, TG ECET, AP ICET, TG ICET, AP POLYCET, and TG POLYCET, with additional regional and national exams planned for future releases.</p>

                <h3>Can I use ExamFlowOS without an internet connection?</h3>
                <p>Yes, for most core activities. Subjects, notes, flashcards, recall sessions, Focus Mode, and statistics are stored locally. Features depending on remote content need connectivity.</p>

                <h3>Can I prepare for more than one exam using a single account?</h3>
                <p>Yes. Subjects stay fully independent, so you can build separate structures for ECET and ICET without either losing progress.</p>

                <h3>Is there a dedicated mobile app on the Play Store or App Store?</h3>
                <p>Not as a store download. ExamFlowOS is a Progressive Web App that installs directly from the browser and behaves like a native app while still updating through the web.</p>

                <h3>How is my study data protected if I lose my device or clear my browser?</h3>
                <p>Through Import &amp; Export. You can export a JSON backup of subjects, notes, flashcards, and settings, then import it on a new device.</p>

                <h3>Will ExamFlowOS add support for more exams or offline CBTs?</h3>
                <p>The stated roadmap includes expanded CBT coverage, topic-wise categorization, better offline support, and additional exams — though exact timing isn't specified.</p>

                <h2 id="conclusion">Conclusion</h2>
                <p>
                  Competitive exam preparation is already demanding enough without also having to act as your own project manager. ExamFlowOS was built to take that coordination overhead off your plate — previous year papers, CBT practice, flashcards, spaced repetition, and progress tracking all in one connected workspace designed specifically for AP and TG ECET, ICET, and POLYCET aspirants.
                </p>
                <p>
                  If your current preparation is spread across five different tools and a stack of downloaded PDFs, it's worth spending fifteen minutes exploring ExamFlowOS: pick your exam, open a previous year paper, and try your first CBT attempt.
                </p>
              </div>

              {/* Roadmap cards */}
              <div className="grid sm:grid-cols-3 gap-4 my-8 not-prose">
                {[
                  { icon: Layers, title: 'Expanded Library', text: 'More exams, more years, more subjects — added continuously.' },
                  { icon: Compass, title: 'Better Discovery', text: 'Search, filters and organization tuned for fast access.' },
                  { icon: Rocket, title: 'Integrated CBT', text: 'A realistic Computer-Based Test experience for practice.' },
                ].map(({ icon: Icon, title, text }) => (
                  <Card key={title} className="glass-panel border-glass-border hover:border-primary/40 transition-colors">
                    <CardContent className="p-5">
                      <Icon className="h-5 w-5 text-primary mb-3" />
                      <h3 className="font-semibold mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="prose prose-invert max-w-none prose-p:text-foreground/90">
                <p>
                  This documentation is written and maintained by <strong>Geddada Devicharan (@imdvichrn)</strong>, creator of ExamFlowOS.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Official portals</strong> (for registration, hall tickets, and results — ExamFlowOS is a preparation tool, not the official exam authority):{' '}
                  <a href="https://cets.apsche.ap.gov.in/ECET/" target="_blank" rel="noopener noreferrer">AP ECET</a>{', '}
                  <a href="https://cets.apsche.ap.gov.in/ICET/" target="_blank" rel="noopener noreferrer">AP ICET</a>{', '}
                  <a href="https://ecet.tgche.ac.in/" target="_blank" rel="noopener noreferrer">TG ECET</a>{', '}
                  <a href="https://icet.tgche.ac.in/" target="_blank" rel="noopener noreferrer">TG ICET</a>{', '}
                  <a href="https://polycetap.ap.gov.in/" target="_blank" rel="noopener noreferrer">AP POLYCET</a>.
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
                    <Search className="h-4 w-4" />
                    Open ExamFlowOS
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/project/examflow-os">View Project Page</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/project/examflow-os/blog/examflowos-journey">
                    Read: Building ExamFlowOS
                  </Link>
                </Button>
              </div>
            </div>
          </motion.article>
        </div>
      </main>
    </div>
  );
}
