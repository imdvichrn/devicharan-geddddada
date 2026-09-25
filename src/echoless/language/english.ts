/**
 * Echoless English Sentence Composer
 * 
 * Deterministically constructs conversational, human-like sentences strictly from verified facts.
 * NEVER embeds raw URLs into sentences.
 */

import { TypedFact } from '../knowledge/facts';

export const ENGLISH_COMPOSER = {
  greetings: [
    "Hey. What would you like to explore across Devicharan's software products, video post-production, or digital systems?",
    "Hello. I can walk you through Devicharan's software builds, DaVinci Resolve post-production, or web architectures.",
    "Hey there. Ask me about ExamFlowOS, his video deliverables, or how he structures digital systems."
  ],

  clarifications: [
    "What part?",
    "What part do you mean?",
    "Which project or area would you like to know about?"
  ],

  languageAck: "Sure, let's continue in English. What would you like to know?",

  socials: {
    list: "Sure. These are his main channels.",
    instagram: "Yeah — his Instagram is where he shares the visual and color grading side of his work.",
    github: "His GitHub is where his open-source code repositories and software projects live.",
    linkedin: "His LinkedIn documents his professional career and engineering background.",
    facebook: "Here is his Facebook profile.",
    twitter: "Here is his X (Twitter) profile for brief technical thoughts and updates.",
  },

  contact: "You can reach Devicharan directly on WhatsApp or via email.",

  buildsSummary: [
    "Devicharan operates across software engineering, video post-production, and business systems. His main builds include ExamFlowOS (free CBT platform for AP/TG exams with 10K+ users), Perfect Pack for DaVinci Resolve, and web architectures for clients like Annapurna Foundation and Sri Lahari Studios.",
    "He builds practical digital products and systems: ExamFlowOS for state CBT exams, custom workflow automations using n8n, 8+ managed business websites, and professional video post-production in DaVinci Resolve Studio."
  ],

  examflowos: {
    explain: [
      "ExamFlowOS is the exam-preparation system he built around CBT practice. It is 100% free with no paywalls and currently serves over 10K+ users and ~700 active students for AP and Telangana entrance exams like ECET, POLYCET, and ICET.",
      "ExamFlowOS is his own exam-prep platform, built around realistic computer-based test (CBT) practice. It covers AP and Telangana entrance exams such as ECET, POLYCET, and ICET, serving 10K+ total users without any subscription fees.",
      "ExamFlowOS is a free study operating system Devicharan engineered for state entrance tests (ECET, POLYCET, ICET). It has handled over 10K+ users across AP and Telangana."
    ],
    expand: [
      "Beyond the test engine itself, it includes active recall question engines, granular mistake review dashboards, and Google Drive cloud sync so students own their study history.",
      "It focuses heavily on test analytics and active recall, giving students time-per-question metrics and score breakdowns without storing private data on third-party servers."
    ],
    why: "He built ExamFlowOS because existing entrance exam tools were either locked behind high paywalls or poorly designed. He wanted students preparing for state exams like ECET and POLYCET to have a fast, realistic CBT tool completely free."
  },

  video: {
    explain: [
      "In video post-production, Devicharan has completed 700+ deliverables across commercial, narrative, wedding, and corporate genres, working primarily in DaVinci Resolve Studio.",
      "He specializes in color grading and post-production in DaVinci Resolve Studio, with a track record of 700+ deliverables spanning commercial projects and narrative films.",
      "His video post-production work is built on DaVinci Resolve Studio, covering ACES and DaVinci Wide Gamut color pipelines across more than 700 completed deliverables."
    ],
    expand: [
      "His pipeline spans node-based color grading (ACES / DaVinci Wide Gamut), motion graphics in Fusion, and audio restoration in Fairlight.",
      "He handles the full post stack—from advanced color space transforms to audio loudness normalization in Fairlight and kinetic typography in Fusion."
    ],
    why: "He focuses on DaVinci Resolve Studio because of its unified color science and audio engines, ensuring cinematic consistency across high-volume production deliverables."
  },

  perfect_pack: {
    explain: [
      "Perfect Pack is a curated asset, power grade, and transition toolkit he crafted specifically for DaVinci Resolve Studio creators.",
      "It is a specialized DaVinci Resolve power grade and transition toolkit built for editors looking for clean cinematic workflows without software bloat."
    ],
    expand: [
      "It includes reusable node structures, color contrast curves, and seamless transitions tailored for fast studio turnarounds."
    ],
    why: "He created Perfect Pack to eliminate repetitive grading setups and give creators instant access to tested production grades."
  },

  annapurna: {
    explain: [
      "Annapurna Foundation is a non-governmental organization (NGO) in Andhra Pradesh doing community work across food seva, cattle care (GoSeva), rural school sanitation (Project Saraswati Devi), and street dog welfare.",
      "It's a grassroots NGO in AP. Devicharan architected and maintains their complete web ecosystem, donation workflows, and video documentation pro bono."
    ],
    expand: [
      "His ongoing contribution includes developing and maintaining their public donor portal, structuring transparent initiative pages, and producing documentary video content.",
      "The four main initiatives are Project Annapurna (meals), Project GoSeva (cattle care), Project Saraswati Devi (school sanitation), and Project Street Dogs (animal care)."
    ],
    why: "He partnered with Annapurna Foundation pro bono because he believes in using digital craft and reliable web infrastructure to amplify real, human community welfare."
  },

  web: {
    explain: [
      "In web ecosystems, Devicharan actively maintains 8+ business websites built with TypeScript, React, Next.js, and Tailwind CSS.",
      "He develops and manages full-stack web platforms with a focus on editorial typography, sub-second load times, and structured SEO architectures, currently maintaining 8+ live client ecosystems."
    ],
    expand: [
      "His web stack emphasizes clean typography, zero-pill UI discipline, mobile responsiveness, and high-performance frontend architectures."
    ],
    why: "He builds websites as long-term digital infrastructure rather than throwaway templates, ensuring performance and SEO reliability."
  },

  systems: {
    explain: [
      "In business systems, he designs automated workflows using n8n, webhooks, REST APIs, and CRM integrations to eliminate manual operational friction.",
      "He creates event-driven business automation pipelines that connect customer inquiries, data routing, and operational dashboards."
    ],
    expand: [
      "His setups typically involve n8n self-hosted workflows, webhook event handlers, automated email routing, and structured database syncs."
    ],
    why: "He focuses on systems to automate repetitive operational tasks so organizations can scale without overhead."
  },

  cv: {
    explain: "Devicharan's verified Curriculum Vitae is available as a direct PDF download (~3.52 MB). It outlines his engineering qualifications, training at BHEL, and full technical background.",
    expand: "The CV details his final-year B.Tech in Electrical and Electronics Engineering, his diploma from MRAGR Govt Polytechnic, industrial training at BHEL Visakhapatnam, and technical project milestones."
  },

  devicharan: {
    explain: [
      "Geddada Devicharan is a digital product builder, video editor and colorist (700+ deliverables), and systems creator based in Visakhapatnam and Vizianagaram, AP.",
      "Devicharan operates across software development (ExamFlowOS), video post-production in DaVinci Resolve Studio, and business systems automation."
    ],
    expand: [
      "He is in his final year of B.Tech Electrical and Electronics Engineering at Andhra University Affiliated College and holds a state diploma in EEE from MRAGR Govt Polytechnic.",
      "His technical background includes industrial training at BHEL Visakhapatnam, MATLAB computational modeling via HMIES / APSCHE, and 8+ actively managed web ecosystems."
    ],
    why: "He operates across software development, DaVinci Resolve post-production, and workflow automation to build end-to-end digital solutions with high performance and craft."
  }
};
