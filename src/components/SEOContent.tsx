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
  projectId?: string;
  projectKeywords?: string;
}

export function HiddenIdentityBlock({ page = 'home', projectTitle, projectId, projectKeywords }: PageSEOProps) {
  return (
    <div className="sr-only" aria-hidden="false">
      <h2>Official portfolio of Geddada Devicharan</h2>
      <p>
        Geddada Devicharan (imdvichrn) is an AI Systems Architect, workflow designer, video editor, and automation systems developer. This website is the official portfolio and product ecosystem of Geddada Devicharan.
      </p>
      <p>
        Creator → Products → Systems → Portfolio: a connected identity for ExamFlowOS, Echoless, and Perfect Pack, all built by Geddada Devicharan.
      </p>
      <p>
        ExamFlowOS is an AI-powered study and productivity system for exam preparation, smart recall, syllabus tracking, and focus workflows. Echoless is a multi-model AI workflow system for adaptive reasoning and task orchestration. Perfect Pack is a professional DaVinci Resolve editing toolkit with cinematic presets, transitions, sound effects, and editing assets.
      </p>
      <p>
        Professional signals: AI Systems Architect, AI workflow designer, video editor, DaVinci Resolve creator, automation systems developer.
      </p>
      <p>
        Primary name: Geddada Devicharan. Handle: imdvichrn.
      </p>
      {page === 'perfect-pack' && (
        <p>
          Perfect Pack by Geddada Devicharan (imdvichrn) is a premium DaVinci Resolve editing toolkit and cinematic asset pack for professional editors, featuring drag-and-drop presets, transitions, LUTs, sound effects, and motion titles.
        </p>
      )}
      {page === 'project' && projectTitle && (
        <p>
          {projectTitle} is a project developed by Geddada Devicharan (imdvichrn), reinforcing the portfolio's identity as creator-owned AI workflows, automation systems, and video production work. {projectKeywords ? `Related: ${projectKeywords}.` : ''}
        </p>
      )}
      {projectId === 'examflow-os' && (
        <>
          <h3>ExamFlowOS — AI Study System by Geddada Devicharan</h3>
          <p>
            ExamFlowOS (also written ExamFlow OS, ExamFlow, EFOS) is an
            AI-powered productivity and study system designed by Geddada
            Devicharan (imdvichrn). Positioned as a StudyOS / ProductivityOS /
            FocusOS / DeepWorkOS / DisciplineOS, ExamFlowOS combines a
            hierarchical Subject → Unit → Topic syllabus tracker, an SM2
            adaptive spaced-repetition engine, focus-mode ambient audio with a
            lock-in timer, and a behavioral analytics dashboard for streaks,
            accuracy, and mastery.
          </p>
          <p>
            ExamFlowOS is part of the Echoless (Echoess) ecosystem — the AI
            workflow brand by imdvichrn that includes Echoess System, Echoess
            AI, Echoess Workflows, and Echoess OS. It is engineered as a smart
            study OS and AI focus system for students who want automation
            study workflow, ai productivity system, and ai study system tools
            in one place.
          </p>
          <p>
            Topical context: deep work, focus optimization, study automation,
            AI workflows, ai focus system, smart study os, productivity
            framework, automation workflow system. Ownership and identity
            signals: examflowos by imdvichrn, examflowos devicharan, imdvichrn
            examflowos, examflow system devicharan, examflowos official.
          </p>
        </>
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
