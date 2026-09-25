import { Helmet } from 'react-helmet-async';
import { generateBreadcrumbSchema } from '@/lib/structuredData';

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  breadcrumbs?: Array<{ name: string; url: string }>;
  structuredData?: object | object[];
}

const DOMAIN = 'https://geddadadevicharan.vercel.app';
const DEFAULT_OG_IMAGE = `${DOMAIN}/og/og-home.png?v=3`;

export function SEOHead({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  breadcrumbs,
  structuredData,
}: SEOHeadProps) {
  const canonicalUrl = `${DOMAIN}${path.startsWith('/') ? path : `/${path}`}`;
  const breadcrumbSchema = breadcrumbs ? generateBreadcrumbSchema(breadcrumbs) : null;

  return (
    <Helmet>
      {/* Title & Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* OpenGraph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${DOMAIN}${ogImage}`} />
      <meta property="og:site_name" content="Geddada Devicharan" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${DOMAIN}${ogImage}`} />
      <meta name="twitter:creator" content="@imdvichrn" />

      {/* Breadcrumb Structured Data */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Additional Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
