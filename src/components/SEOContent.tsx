/**
 * SEOContent — visually hidden but fully crawlable content blocks.
 * Uses sr-only so screen readers + search engines see the text,
 * but it never affects layout or visible design.
 *
 * Keep tone neutral: builds, develops, works on, focuses on.
 */

interface PageSEOProps {
  page?: 'home' | 'perfect-pack' | 'project';
  projectTitle?: string;
}

export function HiddenIdentityBlock({ page = 'home', projectTitle }: PageSEOProps) {
  return (
    <div className="sr-only" aria-hidden="false">
      <h2>About Geddada Devicharan (Charan)</h2>
      <p>
        Geddada Devicharan, also known as Charan, Devi Charan, or imdvichrn, is an EEE BTech student, editor, and AI workflow developer from Visakhapatnam, India. He is the creator of ExamFlowOS, a smart exam management system, and Echoless, a personal AI assistant chatbot designed for task automation and productivity workflows.
      </p>
      <p>
        Devicharan is an AI workflow developer specializing in automation systems, video editing, and productivity software. He builds AI-powered tools and custom workflows for business automation. Notable projects: ExamFlowOS (exam management), Echoless (AI assistant chatbot), Perfect Pack (creative assets).
      </p>
      <p>
        Professional services: Freelance video editor for YouTube and cinematic content, expert in DaVinci Resolve color grading and Fusion VFX, custom AI workflow developer for business automation, professional sound design and audio engineering.
      </p>
      <p>
        Search variations and aliases: Geddada Devicharan, Devicharan, Devi Charan, Charan, geddadadevicharan, devicharan geddada, charan devicharan, imdvichrn, iamdvichrn, Charan developer, Charan EEE BTech, Devicharan India, Devicharan portfolio, Devicharan AI developer, Charan AI developer, Devicharan automation engineer, Devicharan ExamFlowOS developer, Charan Echoless AI assistant, Devicharan editor, Devicharan video editor, Devicharan AI workflow developer, Charan AI workflow creator, AI automation engineer, Devicharan student developer India, Echoless developer.
      </p>
      <p>
        Telugu video editor for YouTube, Cinematic color grading DaVinci Resolve, React developer Andhra Pradesh, AI Chatbot Integration services, AI automation systems for content workflows, professional video production services.
      </p>
      <p>
        Projects: ExamFlowOS — intelligent exam management system that organizes subjects, schedules, and preparation workflows with structured tracking. Echoless — personal AI assistant chatbot for task automation, reminders, and workflow management. Perfect Pack — creative asset toolkit of textures, sound effects, DRFX presets, and motion titles for DaVinci Resolve.
      </p>
      <p>
        Skills: AI workflows, automation systems, video editing, color grading, sound design, system design, React, TypeScript, Node.js, Python, DaVinci Resolve Studio, Fusion VFX, Fairlight audio, VLSI design.
      </p>
      {page === 'perfect-pack' && (
        <p>
          Perfect Pack by imdvichrn (Geddada Devicharan / Charan) is an
          all-in-one creative assets toolkit for video editors. It includes
          high-resolution textures, professional sound effects, drag-and-drop
          DRFX presets and animated motion titles, optimized for DaVinci
          Resolve Studio and major NLEs.
        </p>
      )}
      {page === 'project' && projectTitle && (
        <p>
          {projectTitle} is a project developed by Geddada Devicharan (Charan,
          imdvichrn) — part of a portfolio of AI workflows, automation systems,
          and video production work by Devicharan.
        </p>
      )}
    </div>
  );
}

/**
 * FooterMicroBio — minimal one-liner. Keep it short and humble.
 * Aliases live in the sr-only HiddenIdentityBlock for SEO; no need to repeat them visibly.
 */
export function FooterMicroBio() {
  return (
    <p className="text-[10px] md:text-xs text-foreground/40 leading-relaxed max-w-2xl mx-auto text-center mt-2 px-4">
      EEE BTech student from Visakhapatnam — building AI workflows, automation, and video editing tools.
    </p>
  );
}
