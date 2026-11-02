# Audit Plan — SEO, Crawlability, and Production Readiness

## 1. Objectives
- Validate SEO metadata, canonical tags, and structured data for all routes.
- Verify `robots.txt` and ensure no production pages are blocked or have `noindex`.
- Ensure all forms, CV downloads, and social links are correctly implemented.
- Confirm environment variables and secret management practices.

## 2. Audit Tasks
- **SEO Audit**: Validate `src/components/SEOHead.tsx` and `src/data/routeManifest.ts` for metadata completeness.
- **Structured Data Audit**: Inspect `src/lib/structuredData.ts` for schema validity.
- **Crawlability Check**: Search for `noindex` and verify `robots.txt` (generated in previous step).
- **Production Integrity**: Inspect `src/components/ContactForm.tsx`, check social links in `Portfolio.tsx` and `Chatbot.tsx`, and verify `metadata.json` for environment variable placeholders.

## 3. Verification
- Perform code-based verification of all checklist items.
- Report any findings requiring adjustment.
