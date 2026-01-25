/**
 * Utility functions for generating JSON-LD structured data
 * Helps with SEO by providing structured information to search engines
 */

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const generateVideoObjectSchema = (data: {
  title: string;
  description: string;
  youtubeId: string;
  uploadDate?: string;
}) => {
  return {
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
      "name": "Geddada Devicharan",
      "url": "https://geddadadevicharan.netlify.app"
    }
  };
};

export const generateCreativeWorkSchema = (data: {
  title: string;
  description: string;
  tools: string[];
  roles: string[];
  year?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": data.title,
    "description": data.description,
    "datePublished": data.year ? `${data.year}-01-01` : new Date().toISOString().split('T')[0],
    "creator": {
      "@type": "Person",
      "name": "Geddada Devicharan",
      "url": "https://geddadadevicharan.netlify.app"
    },
    "keywords": [...data.tools, ...data.roles].join(", ")
  };
};
