/**
 * Utility functions for generating JSON-LD structured data.
 * Optimized for ranking on identity keywords:
 *   Geddada Devicharan, Devicharan, Charan, Devi Charan,
 *   Geddada, imdvichrn, iamdvichrn
 */

const BASE_URL = "https://devicharangeddada.lovable.app";
const PERSON_NAME = "Geddada Devicharan";
const PERSON_ALIASES = [
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
];

export const generatePersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": PERSON_NAME,
  "alternateName": PERSON_ALIASES,
  "url": BASE_URL,
  "image": `${BASE_URL}/profile-avatar.png`,
  "jobTitle": "AI Workflow Developer & Professional Video Editor",
  "description":
    "Geddada Devicharan (Charan / imdvichrn), an EEE BTech student, is an AI workflow developer and professional video editor who builds AI automation systems and video editing projects including ExamFlowOS and Echoless. Based in Visakhapatnam, India.",
  "knowsAbout": [
    "AI workflows",
    "Automation systems",
    "Video editing",
    "DaVinci Resolve",
    "React development",
    "TypeScript",
    "System design",
    "Productivity systems",
    "ExamFlowOS",
    "Echoless AI assistant",
  ],
  "sameAs": [
    "https://www.linkedin.com/in/geddadadevicharan",
    "https://www.instagram.com/imdvichrn",
    "https://github.com/imdvichrn",
    "https://www.facebook.com/imdvichrn",
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Visakhapatnam",
    "addressCountry": "India",
  },
});

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Geddada Devicharan — Portfolio",
  "alternateName": ["Charan Portfolio", "imdvichrn Portfolio", "Devicharan Portfolio"],
  "url": BASE_URL,
  "author": { "@type": "Person", "name": PERSON_NAME },
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
  "creator": {
    "@type": "Person",
    "name": PERSON_NAME,
    "alternateName": PERSON_ALIASES,
    "url": BASE_URL,
  },
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
  "creator": {
    "@type": "Person",
    "name": PERSON_NAME,
    "alternateName": PERSON_ALIASES,
    "url": BASE_URL,
  },
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
    "Geddada Devicharan",
    "Devicharan",
    "Charan",
    "imdvichrn",
  ].join(", "),
  "author": {
    "@type": "Person",
    "name": PERSON_NAME,
    "alternateName": PERSON_ALIASES,
    "url": BASE_URL,
  },
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
    "seller": { "@type": "Person", "name": PERSON_NAME },
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
  "author": {
    "@type": "Person",
    "name": PERSON_NAME,
    "alternateName": PERSON_ALIASES,
    "url": BASE_URL,
  },
});
