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

export const generateProductSchema = (data: {
  name: string;
  description: string;
  price: string;
  currency?: string;
  url?: string;
  image?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.name,
    "description": data.description,
    "image": data.image || "https://geddadadevicharan.netlify.app/profile-avatar.png",
    "brand": {
      "@type": "Brand",
      "name": "Geddada Devicharan"
    },
    "offers": {
      "@type": "Offer",
      "price": data.price,
      "priceCurrency": data.currency || "USD",
      "availability": "https://schema.org/InStock",
      "url": data.url || "https://geddadadevicharan.netlify.app/project/davinci-workflow-plugin",
      "seller": {
        "@type": "Person",
        "name": "Geddada Devicharan"
      }
    }
  };
};

export const generatePluginSchema = () => ({
  "@context": "https://schema.org/",
  "@type": "SoftwareApplication",
  "name": "Pro-Stream DaVinci Resolve Plugin",
  "operatingSystem": "Windows, macOS",
  "applicationCategory": "MultimediaApplication",
  "offers": {
    "@type": "Offer",
    "price": "10.00",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Person",
    "name": "Geddada Devicharan",
    "url": "https://geddadadevicharan.netlify.app"
  }
});
