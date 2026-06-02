/**
 * Utility functions for generating JSON-LD structured data.
 * Optimized for entity recognition and ranking on identity + product keywords:
 *   Geddada Devicharan, Devicharan, Charan, Devi Charan,
 *   Geddada, imdvichrn, iamdvichrn, ExamFlowOS, Echoless, Echoess
 */

const BASE_URL = "https://geddadadevicharan.vercel.app";
const PERSON_NAME = "Devicharan Geddada";
const PERSON_ALIASES = [
  "Geddada Devicharan",
  "Charan",
  "Devi Charan",
  "Devicharan",
  "Geddada Charan",
  "imdvichrn",
  "iamdvichrn",
  "geddadadevicharan",
  "Devicharan India",
  "Charan EEE BTech",
  "Devicharan editor",
  "Devicharan developer",
  "Devicharan Geddada AI",
];

const SOCIAL_PROFILES = [
  "https://www.linkedin.com/in/geddadadevicharan",
  "https://www.instagram.com/imdvichrn",
  "https://github.com/imdvichrn",
  "https://www.facebook.com/imdvichrn",
  "https://x.com/imdvichrn",
];

export const generatePersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  "name": PERSON_NAME,
  "alternateName": PERSON_ALIASES,
  "url": BASE_URL,
  "image": `${BASE_URL}/profile-avatar.png`,
  "jobTitle": "AI Video Editor, Reels & Automation Creator",
  "description":
    "Devicharan Geddada (imdvichrn) — AI Video Editor, Reels & Automation Creator from India. Creator of ExamFlowOS (AI study system) and Echoless (personal AI assistant). EEE BTech student building AI workflows, automation systems, and cinematic video projects.",
  "knowsAbout": [
    "AI workflows",
    "AI automation",
    "AI study system",
    "Productivity systems",
    "Reels editing",
    "Video editing",
    "DaVinci Resolve",
    "Color grading",
    "Fusion VFX",
    "Sound design",
    "React development",
    "TypeScript",
    "ExamFlowOS",
    "Echoless AI assistant",
    "Creator economy India",
  ],
  "brand": [
    { "@type": "Brand", "name": "Echoless", "alternateName": ["Echoess", "Echoess AI"] },
    { "@type": "Brand", "name": "ExamFlowOS" },
  ],
  "sameAs": SOCIAL_PROFILES,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Visakhapatnam",
    "addressRegion": "Andhra Pradesh",
    "addressCountry": "India",
  },
});

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "name": "Devicharan Geddada — Portfolio",
  "alternateName": ["Charan Portfolio", "imdvichrn Portfolio", "Devicharan Portfolio", "Echoless Ecosystem"],
  "url": BASE_URL,
  "description": "Portfolio of Devicharan Geddada (imdvichrn) — AI video editor, reels and automation creator from India.",
  "inLanguage": "en-IN",
  "author": { "@id": `${BASE_URL}/#person` },
  "publisher": { "@id": `${BASE_URL}/#person` },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${BASE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": PERSON_NAME,
  "url": BASE_URL,
  "logo": `${BASE_URL}/favicon_io/android-chrome-512x512.png`,
  "sameAs": [
    "https://www.linkedin.com/in/geddadadevicharan",
    "https://www.instagram.com/imdvichrn",
    "https://github.com/imdvichrn",
    "https://twitter.com/imdvichrn"
  ],
  "founder": {
    "@type": "Person",
    "name": PERSON_NAME,
    "alternateName": PERSON_ALIASES,
    "url": BASE_URL
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "technical support",
      "url": BASE_URL,
      "availableLanguage": ["English"]
    }
  ]
});

/** Echoless / Echoess brand entity */
export const generateEchoessBrandSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Brand",
  "@id": `${BASE_URL}/#echoless-brand`,
  "name": "Echoless",
  "alternateName": ["Echoess", "Echoess AI", "Echoess System", "Echoess Workflows", "Echoess OS"],
  "description":
    "Echoless (Echoess) is the personal AI assistant and workflow brand created by Devicharan Geddada (imdvichrn) — covering AI chatbots, automation systems, and creator workflows.",
  "url": BASE_URL,
  "founder": { "@id": `${BASE_URL}/#person` },
  "sameAs": SOCIAL_PROFILES,
});

/** ExamFlowOS as SoftwareApplication entity (high-impact for entity SEO) */
export const generateExamFlowOSSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${BASE_URL}/project/examflow-os#software`,
  "name": "ExamFlowOS",
  "alternateName": [
    "ExamFlow OS",
    "ExamFlow",
    "ExamFlow System",
    "ExamFlow AI",
    "ExamFlow Method",
    "ExamFlow Protocol",
    "EFOS",
    "ExamFlowOS by imdvichrn",
    "ExamFlowOS Devicharan",
    "ExamFlow System Devicharan",
    "ExamFlowOS Official",
  ],
  "applicationCategory": "ProductivityApplication",
  "applicationSubCategory": "AI Study System",
  "operatingSystem": "Web (Browser-based, runs on Windows, macOS, Linux, Android, iOS)",
  "url": "https://examflowos.vercel.app",
  "sameAs": [`${BASE_URL}/project/examflow-os`],
  "image": `${BASE_URL}/examflow-logo.jpg`,
  "description":
    "ExamFlowOS — an AI-powered productivity and study system designed by Devicharan Geddada. A browser-based StudyOS / ProductivityOS combining hierarchical syllabus tracking, SM2 spaced repetition, focus-mode ambient audio, and behavioral analytics for deep work and exam mastery.",
  "keywords":
    "examflowos, examflow system, examflow ai, examflow method, examflow protocol, examflowos by imdvichrn, examflowos devicharan, studyos, productivityos, focusos, deepworkos, disciplineos, ai study system, ai productivity system, automation study workflow, ai focus system, smart study os, echoess system, echoess ai, echoess workflows, echoess os",
  "featureList": [
    "Hierarchical Subject → Unit → Topic syllabus tracker",
    "SM2 active recall engine with adaptive spaced repetition",
    "Focus mode with ambient audio and lock-in timer",
    "Behavioral analytics dashboard (streaks, accuracy, mastery)",
    "Offline-first, client-side state persistence",
    "Zero sign-up, browser-native AI study workflow",
  ],
  "creator": { "@id": `${BASE_URL}/#person` },
  "author": { "@id": `${BASE_URL}/#person` },
  "publisher": { "@id": `${BASE_URL}/#person` },
  "brand": { "@id": `${BASE_URL}/#echoless-brand` },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "12",
    "bestRating": "5",
  },
});

export const generateSoftwareApplicationSchema = (data: {
  name: string;
  description: string;
  url?: string;
  applicationCategory: string;
  operatingSystem?: string;
  softwareVersion?: string;
  audience?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": data.name,
  "url": data.url || BASE_URL,
  "description": data.description,
  "applicationCategory": data.applicationCategory,
  "operatingSystem": data.operatingSystem || "Cross-platform",
  "softwareVersion": data.softwareVersion || "1.0",
  "author": {
    "@type": "Person",
    "name": PERSON_NAME,
    "alternateName": PERSON_ALIASES,
    "url": BASE_URL
  },
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": data.url || BASE_URL
  },
  ...(data.audience ? { educationalUse: data.audience } : {}),
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url,
  })),
});

export const generateVideoObjectSchema = (data: {
  title: string;
  description: string;
  youtubeId: string;
  uploadDate?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": data.title,
  "description": data.description,
  "uploadDate": data.uploadDate || new Date().toISOString().split('T')[0],
  "thumbnailUrl": `https://img.youtube.com/vi/${data.youtubeId}/maxresdefault.jpg`,
  "contentUrl": `https://www.youtube.com/watch?v=${data.youtubeId}`,
  "embedUrl": `https://www.youtube.com/embed/${data.youtubeId}`,
  "duration": "PT5M",
  "creator": { "@id": `${BASE_URL}/#person` },
});

export const generateCreativeWorkSchema = (data: {
  title: string;
  description: string;
  tools: string[];
  roles: string[];
  year?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": data.title,
  "description": data.description,
  "datePublished": data.year ? `${data.year}-01-01` : new Date().toISOString().split('T')[0],
  "creator": { "@id": `${BASE_URL}/#person` },
  "keywords": [...data.tools, ...data.roles, ...PERSON_ALIASES].join(", "),
});

export const generateProjectSchema = (data: {
  id: string;
  title: string;
  description: string;
  year?: string;
  tools?: string[];
  url?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": data.url || `${BASE_URL}/project/${data.id}`,
  "name": data.title,
  "description": data.description,
  "url": data.url || `${BASE_URL}/project/${data.id}`,
  "datePublished": data.year ? `${data.year}-01-01` : undefined,
  "keywords": [
    ...(data.tools || []),
    "Devicharan Geddada",
    "Geddada Devicharan",
    "Devicharan",
    "Charan",
    "imdvichrn",
    "Echoless",
  ].join(", "),
  "author": { "@id": `${BASE_URL}/#person` },
  "creator": { "@id": `${BASE_URL}/#person` },
  "publisher": { "@id": `${BASE_URL}/#person` },
});

export const generateProductSchema = (data: {
  name: string;
  description: string;
  price: string;
  currency?: string;
  url?: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": data.name,
  "description": data.description,
  "image": data.image || `${BASE_URL}/profile-avatar.png`,
  "brand": { "@type": "Brand", "name": "imdvichrn" },
  "offers": {
    "@type": "Offer",
    "price": data.price,
    "priceCurrency": data.currency || "USD",
    "availability": "https://schema.org/InStock",
    "url": data.url || `${BASE_URL}/perfect-pack`,
    "seller": { "@id": `${BASE_URL}/#person` },
  },
});

export const generatePluginSchema = () => ({
  "@context": "https://schema.org/",
  "@type": "SoftwareApplication",
  "name": "Pro-Stream DaVinci Resolve Plugin",
  "operatingSystem": "Windows, macOS",
  "applicationCategory": "MultimediaApplication",
  "offers": {
    "@type": "Offer",
    "price": "10.00",
    "priceCurrency": "USD",
  },
  "author": { "@id": `${BASE_URL}/#person` },
});

/** Echoless as a SoftwareApplication (multi-model AI workflow system) */
export const generateEchoessAppSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${BASE_URL}/#echoless-app`,
  "name": "Echoless",
  "alternateName": ["Echoess", "Echoess AI", "Echoless AI"],
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "AI Workflow System",
  "operatingSystem": "Web",
  "url": BASE_URL,
  "description":
    "Echoless — a multi-model AI workflow system designed for intelligent automation, reasoning enhancement, and adaptive workflow execution.",
  "keywords":
    "echoless, multi-model ai, ai workflow system, ai orchestration, automation systems, workflow intelligence, adaptive workflow",
  "creator": { "@id": `${BASE_URL}/#person` },
  "author": { "@id": `${BASE_URL}/#person` },
  "publisher": { "@id": `${BASE_URL}/#person` },
  "brand": { "@id": `${BASE_URL}/#echoless-brand` },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
  },
});

/** Perfect Pack — Product schema for the DaVinci Resolve toolkit */
export const generatePerfectPackProductSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${BASE_URL}/perfect-pack#product`,
  "name": "Perfect Pack — Cinematic Editing Toolkit for DaVinci Resolve",
  "description":
    "Professional DaVinci Resolve toolkit featuring cinematic presets, transitions, sound effects, editing assets, and workflow tools by Geddada Devicharan.",
  "image": `${BASE_URL}/og/og-perfectpack.png?v=3`,
  "url": `${BASE_URL}/perfect-pack`,
  "category": "Video Editing Toolkit",
  "brand": { "@type": "Brand", "name": "Geddada Devicharan" },
  "manufacturer": { "@id": `${BASE_URL}/#person` },
  "offers": {
    "@type": "Offer",
    "price": "10",
    "priceCurrency": "USD",
    "availability": "https://schema.org/PreOrder",
    "url": `${BASE_URL}/perfect-pack`,
    "seller": { "@id": `${BASE_URL}/#person` },
  },
});
