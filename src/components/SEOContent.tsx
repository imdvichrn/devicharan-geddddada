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
      <h2>Official portfolio of Geddada Devicharan</h2>
      <p>
        Geddada Devicharan, also known as Charan or imdvichrn, is an AI systems creator, workflow designer, video editor, and automation systems developer. This website is the official portfolio and product ecosystem of his digital systems and creative engineering projects.
      </p>
      <p>
        Creator → Products → Systems → Portfolio: a connected identity for ExamFlowOS, Echoless, and Perfect Pack, all built by the same creator, Geddada Devicharan.
      </p>
      <p>
        ExamFlowOS is an AI-powered study and productivity system for exam preparation, smart recall, syllabus tracking, and focus workflows. Echoless is a multi-model AI workflow system for adaptive reasoning and task orchestration. Perfect Pack is a professional DaVinci Resolve editing toolkit with cinematic presets, transitions, sound effects, and editing assets.
      </p>
      <p>
        Professional signals: AI workflow designer, video editor, DaVinci Resolve creator, automation systems developer, creator-focused portfolio, product-focused digital experience.
      </p>
      <p>
        Search variations and aliases: Geddada Devicharan, Devicharan, Devi Charan, Charan, geddadadevicharan, imdvichrn, iamdvichrn, AI systems creator, workflow designer, video editor, DaVinci Resolve toolkit creator, automation systems developer.
      </p>
      {page === 'perfect-pack' && (
        <p>
          Perfect Pack by imdvichrn (Geddada Devicharan / Charan) is a premium DaVinci Resolve editing toolkit and cinematic asset pack for professional editors, featuring drag-and-drop presets, transitions, LUTs, sound effects, and motion titles.
        </p>
      )}
      {page === 'project' && projectTitle && (
        <p>
          {projectTitle} is a project developed by Geddada Devicharan (Charan, imdvichrn), reinforcing the portfolio's identity as creator-owned AI systems, editing tools, and workflow products.
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
