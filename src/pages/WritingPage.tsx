import { useState, useEffect } from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Share2, 
  Check, 
  X, 
  Code 
} from 'lucide-react';
import { 
  WritingLedgerIcon 
} from '@/components/icons/PortfolioIcons';
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
  whatIBuilt: string;
  howIBuiltIt: string;
  why: string;
  whatWentWrong: string;
  whatWorked: string;
  lessons: string[];
  codeSnippet?: {
    language: string;
    code: string;
    caption: string;
  };
}

const articles: Article[] = [
  {
    id: 'examflowos-architecture-cloud-drive',
    title: 'Architecture of a Zero-Cost Exam Prep Platform: Scaling ExamFlowOS to 10K+ Students',
    category: 'Software Architecture',
    categorySlug: 'software',
    date: 'February 2026',
    readTime: '6 min read',
    summary: 'How I engineered a Computer-Based Testing engine and solved student data persistence using client-side storage and user-owned Google Drive backups, eliminating recurring cloud database bills.',
    whatIBuilt: 'ExamFlowOS, a comprehensive Computer-Based Testing (CBT) platform and exam command center supporting competitive entrance exams across Andhra Pradesh and Telangana (AP & TG ECET, POLYCET, ICET).',
    howIBuiltIt: 'Built using React, TypeScript, and Vite with a client-first architectural model. Instead of streaming question loads through an expensive relational database on every test question, the core syllabus question banks are bundled into optimized JSON structures indexed with Lunr search. For saving test attempt histories and personal notes, I designed a direct Google Drive sync integration where students authorize their own Drive storage via Google Identity Services.',
    why: 'Competitive entrance exam preparation in India is plagued by paywalled mock test platforms that charge fees students can rarely afford. My primary constraint was ethical: the tool had to remain 100% free for students indefinitely. Traditional backend databases (Supabase, Firebase, RDS) with 10K+ users would generate continuous monthly bills that an independent developer could not maintain without adding advertisements or paywalls.',
    whatWentWrong: 'In early iterations, local storage quotas (5MB) were quickly exhausted by students taking 50+ complete mock tests. An initial attempt at an IndexedDB-only solution worked locally, but students lost their entire revision progress whenever they cleared browser caches or switched from phone to laptop.',
    whatWorked: 'The user-owned Google Drive sync strategy solved both problems cleanly. Students retain full sovereignty over their test data in a dedicated folder in their personal Google Drive. The app simply reads and writes serialized JSON state on test submission. The server overhead dropped to $0/month.',
    lessons: [
      'Client-first state with user-owned cloud storage is a viable architecture for high-volume educational utilities.',
      'Offline-capable CBT engines dramatically improve test reliability for students on spotty 4G mobile connections.',
      'Zero recurring infrastructure cost equals infinite runway for public-good software projects.'
    ],
    codeSnippet: {
      language: 'typescript',
      code: `// Google Drive user-owned state synchronization payload
interface StudentExamState {
  examId: string;
  submittedAt: string;
  durationSeconds: number;
  scoreBreakdown: Record<string, number>;
  incorrectQuestionIds: string[];
  markedForReview: string[];
}

export async function backupToUserDrive(token: string, state: StudentExamState): Promise<boolean> {
  const boundary = '-------314159265358979323846';
  const delimiter = "\\r\\n--" + boundary + "\\r\\n";
  const closeDelim = "\\r\\n--" + boundary + "--";
  
  const metadata = {
    name: 'examflowos_backup_' + state.examId + '.json',
    mimeType: 'application/json',
    parents: ['appDataFolder']
  };
  
  // Multipart upload directly to Google Drive API
  const body = delimiter +
    'Content-Type: application/json; charset=UTF-8\\r\\n\\r\\n' +
    JSON.stringify(metadata) + delimiter +
    'Content-Type: application/json\\r\\n\\r\\n' +
    JSON.stringify(state) + closeDelim;

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/related; boundary=' + boundary
    },
    body
  });
  return res.ok;
}`,
      caption: 'Direct user-owned Google Drive sync mechanism in ExamFlowOS'
    }
  },
  {
    id: 'sri-lahari-studios-business-os',
    title: 'Modernizing a 10-Year Studio: Website, Local SEO & n8n Autopilot',
    category: 'Business Systems',
    categorySlug: 'automation',
    date: 'January 2026',
    readTime: '5 min read',
    summary: 'A field case study in turning a brick-and-mortar photo studio in Kothavalasa into an automated digital operation with instant inquiry routing and regional search dominance.',
    whatIBuilt: 'A complete digital business operating system for Sri Lahari Studios (operating for ~10 years in Kothavalasa & Chinnamushidiwada): responsive web platform, unified visual identity, local search indexing, and automated customer communication pipelines.',
    howIBuiltIt: 'Designed a clean, responsive showcase website presenting equipment, photography packages, and sample deliverables. Connected contact and quote forms to an n8n webhook receiver that parses prospective client requests, validates event dates, logs them to an operational spreadsheet, and immediately triggers a WhatsApp notification to the studio manager.',
    why: 'Wedding and event shoots have tight booking windows. When clients reach out to multiple photographers, the studio that responds within 5 minutes with clear pricing and availability wins the contract. The studio previously relied on manual phone calls, resulting in lost leads when operators were on active shoots.',
    whatWentWrong: 'Initial attempts at an interactive chatbot felt too impersonal for wedding clients who expect warmth. Customers abandoned forms when asked for too many initial specifics.',
    whatWorked: 'Shortened the form to just three high-intent questions (Event Type, Date, Location) and used n8n to instantly send a friendly acknowledgment text while notifying the lead photographer directly on WhatsApp. Response times dropped from 4 hours to under 3 minutes.',
    lessons: [
      'Automation should support human relationships in local businesses, never replace them with sterile corporate bots.',
      'Local SEO (Google Business profile + geo-targeted sitemaps) is often the highest-ROI investment for physical studios.',
      'Small business automation thrives on simple, bulletproof webhook chains over complex multi-step AI agents.'
    ]
  },
  {
    id: 'davinci-resolve-700-client-projects',
    title: 'Lessons from 700+ Video Edits in DaVinci Resolve Studio on macOS',
    category: 'Video & Post-Production',
    categorySlug: 'video',
    date: 'December 2025',
    readTime: '7 min read',
    summary: 'Observations on color management, Fairlight audio sweetening, and pacing mechanics learned across hundreds of commercial, song, and short-form client deliverables.',
    whatIBuilt: 'A standardized high-speed post-production workflow and DRFX asset library (now evolving into Perfect Pack) optimized for DaVinci Resolve Studio on macOS.',
    howIBuiltIt: 'Structured a consistent node tree template for Rec.709 color management, fixed timeline tracks for dialogue/SFX/music, and created reusable Fusion motion macros with responsive keyframe curves.',
    why: 'When you take on over 700 client projects across short-form reels, advertisements, and song shoots, every second wasted on repetitive timeline setup or re-balancing audio ruins turnaround times. Discipline and standardized pipelines are the only way to deliver top-tier visual polish consistently.',
    whatWentWrong: 'Relying too early on arbitrary third-party LUTs caused clipping in skin tones and broken dynamic range when footage came from mismatched camera sensors (Sony S-Log vs iPhone ProRes vs Canon Log).',
    whatWorked: 'Transitioning entirely to DaVinci YRGB Color Managed with standardized CST (Color Space Transform) input nodes guaranteed clean highlight roll-off and exact skin tone alignment regardless of source format. Building dedicated Fairlight voice compression chains with target -14 LUFS integrated loudness ensured social audio never gets squashed by platform algorithms.',
    lessons: [
      'Pacing is rhythmic subtraction: the difference between amateur and professional editing is what you decide to leave out.',
      'Sound design represents at least 60% of the perceived visual quality in video.',
      'Personalized asset templates save hundreds of hours when built from actual client friction rather than theoretical presets.'
    ]
  },
  {
    id: 'technical-seo-sitemaps-schema',
    title: 'The Clean Web Architecture: Schema.org, Sitemaps & Search Engines',
    category: 'Technical SEO',
    categorySlug: 'seo',
    date: 'November 2025',
    readTime: '4 min read',
    summary: 'A disciplined approach to indexing, structured JSON-LD entities, and Core Web Vitals across independent software products and client websites.',
    whatIBuilt: 'Technical SEO frameworks and structured data architectures deployed across 8+ managed websites and ExamFlowOS.',
    howIBuiltIt: 'Implemented automated sitemap generation with strict canonical URL enforcement, verified OpenGraph social metadata, and deep Schema.org structured data (Person, WebSite, SoftwareApplication, and Organization entities).',
    why: 'Modern search engines and AI answer engines (Perplexity, ChatGPT Search, Claude) rely on unambiguous semantic signals. Without structured schema entities, multi-disciplinary creators are easily misclassified or ignored by search indexing algorithms.',
    whatWentWrong: 'Common CMS plugins inject massive, bloated schemas with circular references that confuse search crawlers and degrade page performance scores.',
    whatWorked: 'Writing clean, hand-crafted JSON-LD schemas embedded directly into SSR or React Helmet headers. Explicitly declaring entity relationships (e.g. Creator -> SoftwareApplication -> WebSite) established clear entity identity in search knowledge panels.',
    lessons: [
      'Valid structured data is non-negotiable for AI engine discoverability (GEO / AEO).',
      'High Core Web Vitals scores come from eliminating third-party script bloat, not from lazy optimization tricks.',
      'A sitemap should only list URLs that are 200 OK, canonical, and indexable.'
    ]
  },
  {
    id: 'cognitive-retention-cbt-design',
    title: 'Cognitive Load & Spaced Repetition in Educational Software',
    category: 'Cognitive Science & Software',
    categorySlug: 'research',
    date: 'October 2025',
    readTime: '6 min read',
    summary: 'How applying cognitive psychology principles—active recall, the forgetting curve, and minimal UI cognitive load—shaped the ExamFlowOS study environment.',
    whatIBuilt: 'The study algorithms and revision scheduling engine powering ExamFlowOS.',
    howIBuiltIt: 'Implemented a lightweight adaptation of the SuperMemo SM-2 spaced repetition algorithm combined with low-friction topic confidence ratings (Weak, Moderate, Mastered).',
    why: 'Most exam preparation apps simply dump endless questions on students, creating decision fatigue and anxiety. By applying cognitive load theory, we can direct a student’s limited daily mental energy exclusively toward their specific knowledge gaps.',
    whatWentWrong: 'Rigid interval schedules that punish students for missing a day cause despair and abandonment.',
    whatWorked: 'A forgiving buffer algorithm that gently shifts unreviewed cards to the next active session without resetting historical mastery metrics.',
    lessons: [
      'Software interfaces should minimize extraneous cognitive load so users can focus on intrinsic problem-solving.',
      'Active recall with instantaneous, clear explanations produces 3x better retention than passive reading.'
    ]
  }
];

export function WritingPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState(false);

  // Close reader on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedArticle) {
        setSelectedArticle(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArticle]);

  // Lock scroll when reading article
  useEffect(() => {
    if (selectedArticle) {
      const orig = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [selectedArticle]);

  const copySnippet = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

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
                Building in Public: Engineering & Workflow Notes
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
                onClick={() => setSelectedArticle(article)}
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

      {/* Editorial Reader Modal (Source Serif 4, 720px width, generous line-height) */}
      {selectedArticle && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label={selectedArticle.title}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl overflow-y-auto animate-in fade-in-0 duration-150 p-4 sm:p-6 md:p-10 flex justify-center"
        >
          <div className="w-full max-w-[760px] bg-background border border-border/60 rounded-2xl shadow-2xl p-6 sm:p-10 space-y-8 my-auto min-h-screen sm:min-h-0">
            
            {/* Top Bar with Close button & Meta */}
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                <ArrowLeft size={14} />
                <span>Back to Writing</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
                  ESC to close
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  aria-label="Close reader"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Article Editorial Header */}
            <header className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-sans">
                <span className="text-primary font-medium">{selectedArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.date}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
                {selectedArticle.title}
              </h1>
            </header>

            {/* Editorial Body: Source Serif 4 typography */}
            <div className="font-editorial text-[17px] sm:text-[19px] leading-[1.75] text-foreground/90 space-y-8 tracking-[0.01em]">
              
              {/* Introduction / Summary */}
              <div className="border-l-2 border-primary/60 pl-4 py-1 italic text-foreground/80 text-lg">
                {selectedArticle.summary}
              </div>

              {/* Section 1: The Problem & Why */}
              <section className="space-y-3">
                <h3 className="font-sans text-xs uppercase tracking-wider font-bold text-primary">
                  01. The Problem & Why It Needed Building
                </h3>
                <p>{selectedArticle.why}</p>
              </section>

              {/* Section 2: What I Built */}
              <section className="space-y-3">
                <h3 className="font-sans text-xs uppercase tracking-wider font-bold text-primary">
                  02. What I Built
                </h3>
                <p>{selectedArticle.whatIBuilt}</p>
              </section>

              {/* Section 3: How I Built It */}
              <section className="space-y-3">
                <h3 className="font-sans text-xs uppercase tracking-wider font-bold text-primary">
                  03. Technical Implementation
                </h3>
                <p>{selectedArticle.howIBuiltIt}</p>
              </section>

              {/* Code Snippet if present */}
              {selectedArticle.codeSnippet && (
                <div className="font-mono text-xs not-italic my-6 border border-border/60 rounded-xl overflow-hidden bg-muted/40">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-muted/60 text-muted-foreground">
                    <span className="text-[11px]">{selectedArticle.codeSnippet.caption}</span>
                    <button
                      type="button"
                      onClick={() => copySnippet(selectedArticle.codeSnippet!.code)}
                      className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      {copiedCode ? <Check size={12} className="text-emerald-500" /> : <Code size={12} />}
                      <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-[12px] leading-relaxed text-foreground">
                    <code>{selectedArticle.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Section 4: What Went Wrong */}
              <section className="space-y-3">
                <h3 className="font-sans text-xs uppercase tracking-wider font-bold text-amber-500">
                  04. Friction & What Went Wrong
                </h3>
                <p>{selectedArticle.whatWentWrong}</p>
              </section>

              {/* Section 5: What Worked */}
              <section className="space-y-3">
                <h3 className="font-sans text-xs uppercase tracking-wider font-bold text-emerald-500">
                  05. What Worked
                </h3>
                <p>{selectedArticle.whatWorked}</p>
              </section>

              {/* Section 6: Key Lessons */}
              <section className="space-y-3 border-t border-border/40 pt-6">
                <h3 className="font-sans text-xs uppercase tracking-wider font-bold text-primary">
                  06. Core Engineering Lessons
                </h3>
                <ul className="space-y-2 list-disc pl-5 text-[16px] sm:text-[18px]">
                  {selectedArticle.lessons.map((lesson, idx) => (
                    <li key={idx} className="pl-1 leading-relaxed">
                      {lesson}
                    </li>
                  ))}
                </ul>
              </section>

            </div>

            {/* Footer inside reader */}
            <div className="border-t border-border/50 pt-6 flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-mono">
                Geddada Devicharan (@imdvichrn)
              </span>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </PageShell>
  );
}
export default WritingPage;
