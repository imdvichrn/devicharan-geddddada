/**
 * Echoless English Sentence Composer
 * 
 * Deterministically constructs conversational, natural sentences strictly from verified facts.
 * Generates 2-4 natural, conversational sentences without fluff or repetitive essays.
 * NEVER embeds raw URLs into sentences.
 */

export const ENGLISH_COMPOSER = {
  greetings: [
    "Hey. I'm Echoless, here to help you navigate Devicharan's work. What would you like to explore across his software products, DaVinci Resolve post-production, or digital systems?",
    "Hello. I can walk you through Devicharan's software builds, video post-production in DaVinci Resolve Studio, or web architectures. What would you like to look at first?",
    "Hey there. Feel free to ask me about ExamFlowOS, his 700+ video deliverables, or how he structures digital business systems."
  ],

  clarifications: [
    "What part of Devicharan's work would you like to explore? Ask me about software, video post-production, or business systems.",
    "Which project or area would you like to know more about? I can cover ExamFlowOS, DaVinci Resolve editing, or his background.",
    "Could you clarify which area you're looking for? I can walk you through his software products, video deliverables, or web ecosystems."
  ],

  languageAck: "Sure, let's continue in English. What would you like to explore across Devicharan's work?",

  socials: {
    list: "Here are Devicharan's verified social and code channels. You can explore his code on GitHub, connect on LinkedIn, or see his visual work on Instagram.",
    instagram: "Yeah — his Instagram is where he shares the visual and color grading side of his work (@imdvichrn), including project stills and timeline highlights.",
    github: "His GitHub (github.com/imdvichrn) is where his open-source code repositories, TypeScript projects, and software architectures live.",
    linkedin: "His LinkedIn profile documents his technical engineering background, B.Tech credentials, and professional updates.",
    facebook: "Here is his official Facebook profile (@imdvichrn).",
    twitter: "Here is his X (Twitter) profile (@imdvichrn) for brief technical thoughts and project updates.",
  },

  contact: "You can reach Devicharan directly on WhatsApp at +91 6303468707 or via email at devicharangeddada@gmail.com. He typically responds within 24 hours on business days.",

  buildsSummary: [
    "Devicharan operates across three core disciplines: software products, video post-production, and digital systems. His main builds include ExamFlowOS (free CBT platform for AP/TG entrance exams with 10K+ users), Perfect Pack for DaVinci Resolve, and web architectures for organizations like Annapurna Foundation and Sri Lahari Studios.",
    "He builds practical digital products and systems: ExamFlowOS for state computer-based entrance tests, automated workflow pipelines with n8n, 8+ managed client websites, and over 700 finished video deliverables in DaVinci Resolve Studio."
  ],

  examflowos: {
    explain: [
      "ExamFlowOS is the computer-based test (CBT) preparation platform Devicharan engineered for students across Andhra Pradesh and Telangana. It is 100% free with zero paywalls and currently serves over 10K+ registered users and ~700 active test-takers for exams like ECET, POLYCET, and ICET. The platform runs client-side with Google Drive cloud sync so students retain complete control over their test data.",
      "ExamFlowOS is Devicharan's flagship software product—a free CBT testing operating system built with TypeScript and React. It provides realistic entrance exam simulations, active recall question engines, and granular mistake review dashboards for state exams. Over 10,000 students have used it without subscription fees or locked mock tests."
    ],
    expand: [
      "Beyond the test engine itself, ExamFlowOS includes active recall question banks, subject-wise analytics, time-per-question metrics, and Google Drive cloud backup. It is engineered with a local-first architecture to ensure instant test rendering and privacy without storing student data on third-party servers.",
      "It focuses heavily on test analytics and active recall, giving students time-per-question metrics and score breakdowns without storing private data on third-party servers."
    ],
    why: "He built ExamFlowOS because existing entrance exam tools were either locked behind high paywalls or poorly designed. He wanted students preparing for state exams like ECET and POLYCET to have a fast, realistic CBT tool completely free."
  },

  video: {
    explain: [
      "In video post-production, Devicharan has completed 700+ deliverables across commercial promotions, narrative films, and corporate projects, working primarily in DaVinci Resolve Studio on macOS. His pipeline covers narrative assembly, node-based ACES and DaVinci Wide Gamut color grading, and audio mastering in Fairlight.",
      "Devicharan specializes in color grading and creative video editing in DaVinci Resolve Studio, with a track record of 700+ deliverables spanning commercial projects and narrative films. His workflows emphasize color precision, seamless audio normalization in Fairlight, and kinetic motion titles in Fusion."
    ],
    editing: [
      "For video editing and timeline finishing, Devicharan works end-to-end in DaVinci Resolve Studio on macOS. He handles narrative assembly, precision pacing, audio cleanup in Fairlight, and motion graphics in Fusion across 700+ completed deliverables. Everything is cut with meticulous attention to rhythm and narrative flow.",
      "His video editing workflow covers complete post-production in DaVinci Resolve Studio: multi-track timeline construction, audio normalization in Fairlight, and motion titles in Fusion."
    ],
    colorGrading: [
      "In color grading, Devicharan builds node-based color pipelines using ACES and DaVinci Wide Gamut color science. He focuses on disciplined node trees, accurate skin tone reproduction, color contrast curves, and custom PowerGrade architectures in DaVinci Resolve Studio.",
      "His color grading work centers on DaVinci Resolve Studio, utilizing ACES and DaVinci Wide Gamut color pipelines. He emphasizes shot-to-shot matching, natural highlight rolloff, and custom PowerGrades for commercial and narrative projects."
    ],
    expand: [
      "His pipeline spans node-based color grading (ACES / DaVinci Wide Gamut), motion graphics in Fusion, and audio restoration in Fairlight. He handles the full post stack—from advanced color space transforms to broadcast audio loudness compliance.",
      "He handles the full post stack—from advanced color space transforms to audio loudness normalization in Fairlight and kinetic typography in Fusion."
    ],
    why: "He focuses on DaVinci Resolve Studio because of its unified color science and audio engines, ensuring cinematic consistency across high-volume production deliverables."
  },

  software: {
    explain: [
      "In software engineering, Devicharan builds performant digital products with TypeScript, React, Next.js, and Node.js. His flagship software is ExamFlowOS, a free CBT testing operating system serving 10K+ students with client-side Google Drive sync. He focuses on sub-second load times, local-first data privacy, and clean system architecture.",
      "Devicharan builds practical digital tools and products—focusing on sub-second frontend performance, local-first data privacy, and clean system architecture. Beyond ExamFlowOS, he engineers custom automation scripts, internal dashboards, and managed web platforms."
    ],
    expand: [
      "His software work spans ExamFlowOS (CBT test engine with Google Drive cloud backup), custom automation tools in TypeScript, and robust web applications with editorial design discipline.",
      "He prioritizes minimal client footprints, clean TypeScript patterns, and robust state management without framework overhead."
    ],
    why: "He engineers software to solve real friction without bloat, prioritizing fast performance, privacy, and zero paywalls for educational tools."
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
      "Annapurna Foundation is a non-governmental organization (NGO) in Andhra Pradesh doing community work across food seva, cattle care (GoSeva), rural school sanitation (Project Saraswati Devi), and street dog welfare. Devicharan architected and maintains their complete web ecosystem, donation workflows, and video documentation pro bono.",
      "It's a grassroots NGO in AP. Devicharan developed and maintains their complete web portal and video documentation pro bono to support their food, cattle, and rural school welfare initiatives."
    ],
    expand: [
      "His ongoing contribution includes developing and maintaining their public donor portal, structuring transparent initiative pages, and producing documentary video content. The four main initiatives are Project Annapurna, Project GoSeva, Project Saraswati Devi, and Project Street Dogs."
    ],
    why: "He partnered with Annapurna Foundation pro bono because he believes in using digital craft and reliable web infrastructure to amplify real, human community welfare."
  },

  web: {
    explain: [
      "In web ecosystems, Devicharan actively maintains 8+ business websites built with TypeScript, React, Next.js, and Tailwind CSS. He develops and manages full-stack web platforms with a focus on editorial typography, sub-second load times, and structured SEO architectures.",
      "He develops and manages full-stack web platforms with a focus on editorial typography, sub-second load times, and structured SEO architectures, currently maintaining 8+ live client ecosystems including Sri Lahari Studios and Annapurna Foundation."
    ],
    expand: [
      "His web stack emphasizes clean typography, zero-pill UI discipline, mobile responsiveness, and high-performance frontend architectures."
    ],
    why: "He builds websites as long-term digital infrastructure rather than throwaway templates, ensuring performance and SEO reliability."
  },

  systems: {
    explain: [
      "In business systems, Devicharan designs automated workflows using n8n, webhooks, REST APIs, and CRM integrations to eliminate manual operational friction. He creates event-driven automation pipelines that connect customer inquiries, data routing, and operational dashboards.",
      "He creates event-driven business automation pipelines that connect customer inquiries, data routing, and operational dashboards using n8n and TypeScript."
    ],
    expand: [
      "His setups typically involve n8n self-hosted workflows, webhook event handlers, automated email routing, and structured database syncs."
    ],
    why: "He focuses on systems to automate repetitive operational tasks so organizations can scale without overhead."
  },

  cv: {
    explain: "Devicharan's verified Curriculum Vitae is available as a direct PDF download (~3.52 MB). It outlines his engineering qualifications, training at BHEL Visakhapatnam, and full technical background across software and post-production.",
    expand: "The CV details his final-year B.Tech in Electrical and Electronics Engineering, his diploma from MRAGR Govt Polytechnic, industrial training at BHEL Visakhapatnam, and technical project milestones."
  },

  devicharan: {
    explain: [
      "Geddada Devicharan is a digital product builder, video editor and colorist (700+ deliverables), and systems creator based in Visakhapatnam and Vizianagaram, AP. He operates across software development (ExamFlowOS), video post-production in DaVinci Resolve Studio, and business systems automation. He is currently completing his final year of B.Tech in Electrical & Electronics Engineering.",
      "Devicharan is an engineer and digital creator from Andhra Pradesh. He builds software products like ExamFlowOS, finishes commercial video in DaVinci Resolve Studio with over 700 deliverables, and manages digital web infrastructure for regional businesses and NGOs."
    ],
    expand: [
      "He is in his final year of B.Tech Electrical and Electronics Engineering at Andhra University Affiliated College and holds a state diploma in EEE from MRAGR Govt Polytechnic. His technical background includes industrial training at BHEL Visakhapatnam, MATLAB computational modeling via HMIES / APSCHE, and 8+ actively managed web ecosystems."
    ],
    why: "He operates across software development, DaVinci Resolve post-production, and workflow automation to build end-to-end digital solutions with high performance and craft."
  }
};
