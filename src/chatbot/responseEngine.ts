/**
 * Grounded Response Engine
 * Generates verified, fact-checked responses strictly from structured JSON knowledge.
 * Provides contextual action chips linking to real projects, routes, CV, and GitHub.
 */

import { IntentResult } from './intentEngine';
import { NormalizedQuery } from './queryNormalizer';
import {
  portfolioData,
  projectsData,
  experimentsData,
  skillsData,
  experienceData,
  faqData,
  educationData,
  SearchResult,
} from './searchEngine';

export interface ActionChip {
  label: string;
  path: string;
  isExternal?: boolean;
}

export interface GeneratedResponse {
  text: string;
  intent: string;
  confidence: number;
  entityId?: string;
  sources?: string[];
  projectLink?: string;
  suggestedActions?: ActionChip[];
  suggestedFollowups?: string[];
}

export function generateResponse(
  query: NormalizedQuery,
  intentResult: IntentResult,
  searchResults: SearchResult[],
  contextEntityId?: string
): GeneratedResponse {
  const { cleaned, referentType } = query;
  const activeEntity = intentResult.targetEntityId || contextEntityId;

  // 1. GREETING
  if (intentResult.intent === 'GREETING') {
    return {
      text: "Hey. I'm Echoless, here to help you navigate Devicharan's work. What would you like to explore across his software products, DaVinci Resolve post-production, managed web systems, or lab experiments?",
      intent: 'GREETING',
      confidence: 0.98,
      suggestedActions: [
        { label: 'Explore Works', path: '/works' },
        { label: 'ExamFlowOS', path: '/works/examflow-os' },
        { label: 'Experiments & Lab', path: '/experiments' },
        { label: 'Video Showcase', path: '/video' },
        { label: 'Download CV', path: '/Geddada_Devicharan_CV.pdf' },
      ],
      suggestedFollowups: [
        'Tell me about ExamFlowOS',
        'What experiments has he published?',
        'What tools does he use for video editing?',
        'How can I get in touch?',
      ],
    };
  }

  // 2. MULTI-TURN FOLLOW-UP UNDER AN ACTIVE ENTITY ("that project", "tell me more", "technology?", "metrics?", "link?")
  if (intentResult.intent === 'MULTI_TURN_FOLLOWUP' && activeEntity) {
    if (activeEntity === 'examflow-os') {
      const proj = projectsData.find((p) => p.id === 'examflow-os')!;
      if (referentType === 'tech') {
        return {
          text: `ExamFlowOS is built with: ${proj.technologies.join(', ')}. It features an offline-first client architecture with Google Drive cloud backup integration to eliminate proprietary database costs.`,
          intent: 'PROJECT_QUERY',
          confidence: 0.95,
          entityId: 'examflow-os',
          projectLink: '/works/examflow-os',
          suggestedActions: [
            { label: 'Live App (examflowos.in)', path: proj.links.website || 'https://examflowos.in', isExternal: true },
            { label: 'ExamFlowOS Case Study', path: '/works/examflow-os' },
          ],
        };
      }
      if (referentType === 'metrics') {
        return {
          text: `ExamFlowOS has reached ${proj.metrics.totalUsers} registered students with ~${proj.metrics.activeUsers} active learners, completely free of charge.`,
          intent: 'PROJECT_QUERY',
          confidence: 0.95,
          entityId: 'examflow-os',
          projectLink: '/works/examflow-os',
          suggestedActions: [
            { label: 'ExamFlowOS Case Study', path: '/works/examflow-os' },
          ],
        };
      }
      if (referentType === 'link') {
        return {
          text: `You can access ExamFlowOS directly at ${proj.links.website || 'https://examflowos.in'} or read the in-depth architectural case study here in the portfolio.`,
          intent: 'PROJECT_QUERY',
          confidence: 0.95,
          entityId: 'examflow-os',
          projectLink: '/works/examflow-os',
          suggestedActions: [
            { label: 'Open examflowos.in', path: proj.links.website || 'https://examflowos.in', isExternal: true },
            { label: 'View Case Study', path: '/works/examflow-os' },
          ],
        };
      }
      // "tell me more" or general
      return {
        text: proj.longDescription,
        intent: 'PROJECT_QUERY',
        confidence: 0.95,
        entityId: 'examflow-os',
        projectLink: '/works/examflow-os',
        suggestedActions: [
          { label: 'Launch ExamFlowOS', path: proj.links.website || 'https://examflowos.in', isExternal: true },
          { label: 'Development Journey Blog', path: proj.links.blogJourney || '/works/examflow-os' },
        ],
      };
    }

    if (activeEntity === 'video') {
      if (referentType === 'tech' || cleaned.includes('tool') || cleaned.includes('stack')) {
        return {
          text: "Devicharan's post-production suite runs on macOS Apple Silicon using DaVinci Resolve Studio, Fusion for VFX and kinetic typography, and Fairlight for multi-track audio cleanup and loudness normalization.",
          intent: 'VIDEO_QUERY',
          confidence: 0.94,
          entityId: 'video',
          projectLink: '/works/video-editing-post-production',
          suggestedActions: [
            { label: 'Video Showcase', path: '/video' },
            { label: 'Perfect Pack Toolkit', path: '/works/perfect-pack' },
          ],
        };
      }
      if (referentType === 'metrics' || cleaned.includes('many') || cleaned.includes('number')) {
        return {
          text: "Devicharan has completed 700+ deliverables across commercial brand commercials, short-form retention reels, product advertisements, and song shoots.",
          intent: 'VIDEO_QUERY',
          confidence: 0.94,
          entityId: 'video',
          projectLink: '/works/video-editing-post-production',
          suggestedActions: [
            { label: 'View Video Deliverables', path: '/video' },
          ],
        };
      }
      // Default video elaboration
      return {
        text: "For video editing and timeline finishing, Devicharan works end-to-end in DaVinci Resolve Studio on macOS. He handles pacing, audio cleanup in Fairlight, and motion graphics in Fusion across 700+ completed deliverables. Everything is cut with meticulous attention to rhythm, clarity, and client retention.",
        intent: 'VIDEO_QUERY',
        confidence: 0.94,
        entityId: 'video',
        projectLink: '/works/video-editing-post-production',
        suggestedActions: [
          { label: 'Watch Showcase', path: '/video' },
          { label: 'Color Grading Case Study', path: '/works/video-editing-post-production' },
        ],
      };
    }
  }

  // 3. EXPERIMENTS DOMAIN
  if (intentResult.intent === 'EXPERIMENTS_QUERY') {
    const specificExp = experimentsData.find((e: any) => e.id === activeEntity);
    if (specificExp) {
      return {
        text: `${specificExp.title}: ${specificExp.description} (${specificExp.status})`,
        intent: 'EXPERIMENTS_QUERY',
        confidence: 0.96,
        entityId: specificExp.id,
        projectLink: `/experiments/${specificExp.id}`,
        sources: [`/experiments/${specificExp.id}`],
        suggestedActions: [
          { label: 'Read Experiment Note', path: `/experiments/${specificExp.id}` },
          ...(specificExp.relatedWorkLink ? [{ label: `Related: ${specificExp.relatedWorkTitle}`, path: specificExp.relatedWorkLink }] : []),
          { label: 'All Experiments', path: '/experiments' }
        ],
        suggestedFollowups: [
          'What were the key findings?',
          'Tell me about ExamFlowOS',
        ],
      };
    }

    return {
      text: "Devicharan publishes technical explorations and research notes across cognitive psychology (adaptive spaced repetition in ExamFlowOS), post-production CLI automation in DaVinci Resolve, clean energy microgrids (MPPT photovoltaic efficiency), and longevity literature.",
      intent: 'EXPERIMENTS_QUERY',
      confidence: 0.95,
      entityId: 'experiments',
      projectLink: '/experiments',
      sources: ['/experiments'],
      suggestedActions: [
        { label: 'Explore Lab Experiments', path: '/experiments' },
        { label: 'Spaced Repetition (SM-2)', path: '/experiments/sm2-cbt-recall' },
        { label: 'DaVinci CLI Automation', path: '/experiments/local-cli-davinci-automation' },
      ],
      suggestedFollowups: [
        'Tell me about the spaced repetition experiment',
        'What is DaVinci CLI automation?',
      ],
    };
  }

  // 4. VIDEO DOMAIN (handles "video", "editing", "color grading", "davinci", etc.)
  if (
    intentResult.intent === 'VIDEO_QUERY' ||
    cleaned.includes('video') ||
    cleaned.includes('davinci') ||
    cleaned.includes('editing') ||
    cleaned.includes('color')
  ) {
    if (cleaned.includes('color')) {
      return {
        text: "His color grading work centers on DaVinci Resolve Studio on macOS, utilizing node-based color grading and color space transforms. He emphasizes shot-to-shot matching, natural highlight rolloff, and clean skin tone qualification for commercial and promotional projects.",
        intent: 'VIDEO_QUERY',
        confidence: 0.96,
        entityId: 'video',
        projectLink: '/works/video-editing-post-production',
        sources: ['/video', '/works/video-editing-post-production'],
        suggestedActions: [
          { label: 'Color Grading Showcase', path: '/works/video-editing-post-production' },
          { label: 'Video Showcase Hub', path: '/video' },
        ],
        suggestedFollowups: [
          'What tools does he use for video editing?',
          'Tell me about Perfect Pack',
        ],
      };
    }

    if (cleaned.includes('editing') || cleaned.includes('cut') || cleaned.includes('pacing')) {
      return {
        text: "For video editing and timeline finishing, Devicharan works end-to-end in DaVinci Resolve Studio on macOS. He handles pacing, audio cleanup in Fairlight, and motion graphics in Fusion across 700+ completed deliverables. Everything is cut with meticulous attention to rhythm, clarity, and client retention.",
        intent: 'VIDEO_QUERY',
        confidence: 0.96,
        entityId: 'video',
        projectLink: '/works/video-editing-post-production',
        sources: ['/video'],
        suggestedActions: [
          { label: 'View Video Work', path: '/video' },
          { label: 'Video Case Study', path: '/works/video-editing-post-production' },
          { label: 'Contact for Video Projects', path: '/contact' },
        ],
        suggestedFollowups: [
          'Tell me about his color grading',
          'What is Perfect Pack?',
        ],
      };
    }

    return {
      text: "Devicharan specializes in node-based color grading and video editing in DaVinci Resolve Studio on macOS, with a track record of 700+ deliverables across short-form reels, product ads, and song shoots. His workflows emphasize color consistency, audio normalization in Fairlight, and motion titles in Fusion.",
      intent: 'VIDEO_QUERY',
      confidence: 0.96,
      entityId: 'video',
      projectLink: '/works/video-editing-post-production',
      sources: ['/video', '/works/video-editing-post-production'],
      suggestedActions: [
        { label: 'Explore Video Showcase', path: '/video' },
        { label: 'Video Case Study', path: '/works/video-editing-post-production' },
        { label: 'Perfect Pack for DaVinci', path: '/works/perfect-pack' },
      ],
      suggestedFollowups: [
        'Tell me more about his editing',
        'How does he handle color grading?',
      ],
    };
  }

  // 5. SPECIFIC PROJECT: EXAMFLOWOS
  if (
    (intentResult.intent === 'PROJECT_QUERY' && activeEntity === 'examflow-os') ||
    cleaned.includes('examflow') ||
    cleaned.includes('cbt') ||
    cleaned.includes('ecet') ||
    query.expandedTerms.some((t) => ['examflow', 'examflowos', 'cbt', 'ecet', 'polycet', 'icet'].includes(t))
  ) {
    const proj = projectsData.find((p) => p.id === 'examflow-os')!;
    return {
      text: "ExamFlowOS is a free competitive exam preparation and CBT platform built for students preparing for AP & TG ECET, ICET, and POLYCET. Built solo by Devicharan, it serves 10,000+ students (~700 active) with a user-owned Google Drive cloud backup architecture that keeps the platform 100% free forever.",
      intent: 'PROJECT_QUERY',
      confidence: 0.96,
      entityId: 'examflow-os',
      projectLink: '/works/examflow-os',
      sources: ['/works/examflow-os', ...(proj.links.website ? [proj.links.website] : [])],
      suggestedActions: [
        { label: 'ExamFlowOS Case Study', path: '/works/examflow-os' },
        { label: 'Open examflowos.in', path: proj.links.website || 'https://examflowos.in', isExternal: true },
        { label: 'Read Build Journey', path: proj.links.blogJourney || '/works/examflow-os' },
        { label: 'Recall Experiment', path: '/experiments/sm2-cbt-recall' },
      ],
      suggestedFollowups: [
        'What technology is it built with?',
        'How many users does it have?',
      ],
    };
  }

  // 6. SPECIFIC PROJECT: PERFECT PACK
  if (
    (intentResult.intent === 'PROJECT_QUERY' && activeEntity === 'perfect-pack') ||
    cleaned.includes('perfect pack') ||
    (query.expandedTerms.includes('perfect') && query.expandedTerms.includes('pack'))
  ) {
    return {
      text: "Perfect Pack is a comprehensive post-production asset toolkit developed for DaVinci Resolve Studio editors. Grounded in 700+ completed deliverables, it provides cinematic presets, seamless transitions, motion titles, and sound effects for editors on macOS and Windows.",
      intent: 'PROJECT_QUERY',
      confidence: 0.96,
      entityId: 'perfect-pack',
      projectLink: '/works/perfect-pack',
      sources: ['/works/perfect-pack'],
      suggestedActions: [
        { label: 'Explore Perfect Pack', path: '/works/perfect-pack' },
        { label: 'Video Showcase', path: '/video' },
        { label: 'CLI Automation Experiment', path: '/experiments/local-cli-davinci-automation' },
      ],
    };
  }

  // 7. SPECIFIC PROJECT: ANNAPURNA FOUNDATION
  if (activeEntity === 'annapurna-foundation' || cleaned.includes('annapurna')) {
    return {
      text: "Annapurna Foundation is an NGO whose initiatives span food seva, school sanitation, and animal welfare. Devicharan architects and maintains their web platform, video documentation, and digital presence.",
      intent: 'PROJECT_QUERY',
      confidence: 0.95,
      entityId: 'annapurna-foundation',
      projectLink: '/works/annapurna-foundation',
      sources: ['/works/annapurna-foundation'],
      suggestedActions: [
        { label: 'View NGO Case Study', path: '/works/annapurna-foundation' },
      ],
    };
  }

  // 8. SPECIFIC PROJECT: SRI LAHARI STUDIOS
  if (activeEntity === 'sri-lahari-studios' || cleaned.includes('sri lahari')) {
    return {
      text: "For Sri Lahari Studios—a 10-year photo and cinematography studio in Kothavalasa—Devicharan built a complete digital business OS including responsive web infrastructure, local SEO, branding, and automated client inquiry workflows.",
      intent: 'PROJECT_QUERY',
      confidence: 0.95,
      entityId: 'sri-lahari-studios',
      projectLink: '/works/sri-lahari-studios',
      sources: ['/works/sri-lahari-studios'],
      suggestedActions: [
        { label: 'View Studio Case Study', path: '/works/sri-lahari-studios' },
      ],
    };
  }

  // 9. SOFTWARE DOMAIN
  if (intentResult.intent === 'SOFTWARE_QUERY') {
    return {
      text: "In software engineering, Devicharan builds offline-first, client-driven web applications using React, TypeScript, Vite, and Tailwind CSS. His primary product is ExamFlowOS (10,000+ students), engineered with zero recurring database overhead.",
      intent: 'SOFTWARE_QUERY',
      confidence: 0.92,
      entityId: 'software',
      projectLink: '/software',
      sources: ['/software'],
      suggestedActions: [
        { label: 'Software Hub', path: '/software' },
        { label: 'ExamFlowOS Case Study', path: '/works/examflow-os' },
        { label: 'GitHub Profile', path: portfolioData.links.github, isExternal: true },
      ],
    };
  }

  // 10. WEB DOMAIN
  if (intentResult.intent === 'WEB_QUERY') {
    return {
      text: "Devicharan actively engineers and maintains 8+ live commercial websites with 99.9% uptime, implementing technical SEO, XML sitemaps, structured schema.org data, and high-performance React frontends.",
      intent: 'WEB_QUERY',
      confidence: 0.92,
      entityId: 'web',
      projectLink: '/web',
      sources: ['/web'],
      suggestedActions: [
        { label: 'Managed Websites', path: '/web' },
        { label: 'All Works', path: '/works' },
      ],
    };
  }

  // 11. SYSTEMS & AUTOMATION DOMAIN
  if (intentResult.intent === 'SYSTEMS_QUERY') {
    return {
      text: "In business systems, Devicharan designs automated workflows using n8n, webhooks, REST APIs, and CRM integrations to eliminate manual operational friction. He creates event-driven pipelines that route customer inquiries and operational data automatically.",
      intent: 'SYSTEMS_QUERY',
      confidence: 0.92,
      entityId: 'systems',
      projectLink: '/systems',
      sources: ['/systems'],
      suggestedActions: [
        { label: 'Systems & Automations', path: '/systems' },
        { label: 'Case Study', path: '/works/business-systems-automation' },
      ],
    };
  }

  // 12. CONTACT / HIRE / RATES
  if (intentResult.intent === 'CONTACT_QUERY') {
    return {
      text: `You can reach Devicharan directly via email at ${portfolioData.links.email} or through the interactive contact page. He takes on select commercial video editing projects, custom software builds, and business automation contracts.`,
      intent: 'CONTACT_QUERY',
      confidence: 0.94,
      projectLink: '/contact',
      sources: ['/contact'],
      suggestedActions: [
        { label: 'Send an Inquiry', path: '/contact' },
        { label: 'Email Directly', path: `mailto:${portfolioData.links.email}`, isExternal: true },
        { label: 'Download CV', path: '/Geddada_Devicharan_CV.pdf' },
      ],
    };
  }

  // 13. EDUCATION
  if (intentResult.intent === 'EDUCATION_QUERY') {
    return {
      text: "Devicharan holds a Bachelor of Technology (B.Tech) in Electrical and Electronics Engineering (EEE) from Andhra Pradesh, India. His systems engineering training underpins his first-principles approach to software architecture and technical post-production workflows.",
      intent: 'EDUCATION_QUERY',
      confidence: 0.94,
      projectLink: '/about',
      sources: ['/about'],
      suggestedActions: [
        { label: 'About Devicharan', path: '/about' },
        { label: 'Curriculum Vitae', path: '/Geddada_Devicharan_CV.pdf' },
      ],
    };
  }

  // 14. FAQ MATCH
  const faqMatch = searchResults.find((r) => r.source === 'faq');
  if (faqMatch && faqMatch.score >= 8) {
    return {
      text: faqMatch.item.answer,
      intent: 'FAQ_QUERY',
      confidence: 0.9,
      projectLink: faqMatch.item.links?.[0],
      sources: faqMatch.item.links,
      suggestedActions: (faqMatch.item.links || []).map((l: string) => ({
        label: l.startsWith('http') ? 'Official Link' : 'View Page',
        path: l,
        isExternal: l.startsWith('http'),
      })),
    };
  }

  // 15. SAFE FALLBACK (No hallucination!)
  return {
    text: "I don't have verified details on that specific topic in Devicharan's portfolio knowledge base. I can provide verified facts across his 700+ DaVinci Resolve video deliverables, ExamFlowOS (10K+ students), Perfect Pack toolkit, managed client websites, and lab experiments.",
    intent: 'UNKNOWN',
    confidence: 0.3,
    projectLink: '/works',
    suggestedActions: [
      { label: 'Browse Works', path: '/works' },
      { label: 'ExamFlowOS', path: '/works/examflow-os' },
      { label: 'Experiments & Lab', path: '/experiments' },
      { label: 'Video Showcase', path: '/video' },
      { label: 'Contact Devicharan', path: '/contact' },
    ],
    suggestedFollowups: [
      'Tell me about ExamFlowOS',
      'What are his video editing deliverables?',
      'What experiments has he published?',
      'How to contact Devicharan?',
    ],
  };
}
