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
        Geddada Devicharan, also known as Charan, Devi Charan, imdvichrn, iamdvichrn,
        geddadadevicharan and devicharan geddada, is an EEE BTech student from
        Visakhapatnam, India who builds AI workflows, automation systems, and video
        editing projects. Devicharan develops ExamFlowOS, a structured exam
        management system, and Echoless, a personal assistant chatbot focused on
        task automation and productivity. Charan works with React, TypeScript,
        DaVinci Resolve, and AI-driven tooling.
      </p>
      <p>
        Freelance video editor for YouTube and Cinematic content. Expert in DaVinci Resolve color grading and Fusion VFX. Custom AI workflow developer for business automation. Professional sound design and audio engineering services.
      </p>
      <p>
        Telugu video editor for YouTube, Cinematic color grading DaVinci Resolve, React developer Andhra Pradesh, AI Chatbot Integration services, and AI automation systems for content workflows.
      </p>
      <p>
        Search variations and aliases: Geddada Devicharan, Devicharan, Devi Charan,
        Charan developer, Charan EEE BTech, Devicharan India, Devicharan portfolio,
        Devicharan official, geddadadevicharan, devicharan geddada, charan devicharan,
        imdvichrn, iamdvichrn, Charan AI developer, Devicharan automation engineer,
        Devicharan ExamFlowOS developer, Charan Echoless AI assistant, Devicharan editor,
        Devicharan video editor, Devicharan AI workflow developer, Charan productivity
        system developer, Devicharan student developer India, Echoless developer,
        next-gen AI workflow creator, privacy-first portfolio developer.
      </p>
      <p>
        Projects: ExamFlowOS — exam management system that organizes subjects,
        schedules, and preparation flow with structured tracking. Echoless — personal
        assistant chatbot built to handle workflows, reminders, and structured task
        interaction. Perfect Pack — a creative asset toolkit of textures, sound
        effects, DRFX presets, and motion titles for DaVinci Resolve and major NLEs.
      </p>
      <p>
        Skills: AI workflows, automation systems, video editing, color grading,
        sound design, system design, React, TypeScript, Node.js, Python, DaVinci
        Resolve Studio, Fusion VFX, Fairlight audio, VLSI design.
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
