import { Helmet } from 'react-helmet-async';
import { generateBreadcrumbSchema } from '@/lib/structuredData';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbLDProps {
  items: BreadcrumbItem[];
}

/**
 * BreadcrumbLD Component
 * Renders a structured BreadcrumbList JSON-LD script tag via Helmet for SEO enhancement.
 */
export function BreadcrumbLD({ items }: BreadcrumbLDProps) {
  if (!items || items.length === 0) return null;
  const schema = generateBreadcrumbSchema(items);

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
