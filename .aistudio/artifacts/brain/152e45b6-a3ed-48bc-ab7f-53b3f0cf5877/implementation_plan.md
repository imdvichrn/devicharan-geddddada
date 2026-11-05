# Google Search Branding & Site Name Fix — Geddada Devicharan (Revised)

A targeted technical SEO engineering plan to align Google Search site-name signals with "Geddada Devicharan", consolidate homepage structured data into exactly one `WebSite` node, provide a crisp 96×96 square PNG favicon with multi-resolution ICO alternatives, and verify the final production build and deployed assets.

## User Review & Critical Decisions

> [!IMPORTANT]
> The plan has been refined with the following factual and architectural specifications:
>
> - **Consolidate into One WebSite Node**: Strictly follow Google's official documentation recommending that site-name properties be consolidated into a single `WebSite` structured-data node on the homepage, eliminating redundant secondary nodes.
> - **Primary Favicon & Formats**: Provide a clean 96×96 square PNG favicon (`/favicon-96x96.png`) as a primary Google-compatible icon, supported by 48×48 PNG and multi-resolution ICO (`/favicon.ico`) alternatives. Avoid claiming link order strictly dictates crawler choice.
> - **Stable URLs Without Cache-Busters**: Maintain fixed, permanent filenames (`/favicon-96x96.png`, `/favicon-48x48.png`, `/favicon.ico`) to allow search engine bots to cache and index them stably over time.
> - **Preserve Entity Graph**: Preserve the complete `Person` schema, breadcrumbs, and connected metadata; remove only the redundant `WebSite` object from `Portfolio.tsx`.
> - **Verified Authentic Brand Artwork**: Generate all favicon variants directly from the authentic master transparent logo symbol (`public/masters/logo-transparent.png`).
> - **Production Output & HTTP Verification**: Inspect the final `dist/index.html` generated after full build and prerender, and verify live HTTP response headers and MIME types.
> - **Factual Search Update Expectations**: Clearly explain that valid implementation ensures site-name and favicon eligibility, while Google's automated systems determine snippet updates across subsequent crawl cycles.

---

## 1. Overview & Structured Data Strategy

### Current Issue
Google Search currently displays the platform domain fallback ("Vercel") instead of the intended brand name "Geddada Devicharan" for `https://geddadadevicharan.vercel.app/`. 

### Remediation
1. **Single Canonical WebSite Schema**:
   - Embed exactly one authoritative `WebSite` schema inside `index.html`'s `<script type="application/ld+json">`.
   - Set `"name": "Geddada Devicharan"`.
   - Set `"alternateName": ["Devicharan", "imdvichrn"]`.
   - Set `"url": "https://geddadadevicharan.vercel.app/"`.
   - Set `"@id": "https://geddadadevicharan.vercel.app/#website"`.
   - Reference the publisher/author entity via `"publisher": { "@id": "https://geddadadevicharan.vercel.app/#person" }`.
2. **Remove Redundant WebSite Injection in React**:
   - In `src/pages/Portfolio.tsx`, remove the duplicate `{ "@type": "WebSite", ... }` object passed to `SEOHead`'s `structuredData` prop.
   - Retain `generatePersonSchema()` so the `Person` entity remains fully articulated.
3. **Preserve Sub-Route Schemas**:
   - Ensure sub-pages (`/works/*`, `/writing/*`, `/experiments/*`) retain their respective schema types (`TechArticle`, `BlogPosting`, `SoftwareApplication`, `BreadcrumbList`) without injecting additional WebSite nodes.

---

## 2. Branding Signal Alignment

All homepage brand signals will be unified to present unambiguous identity cues to search crawlers:

| Surface / Tag | Value |
| :--- | :--- |
| **Document Title** | `Geddada Devicharan — Digital Product Builder · Video Editor · Digital Systems` |
| **Visible Heading (H1)** | `Geddada Devicharan` |
| **`og:site_name`** | `Geddada Devicharan` |
| **`og:title`** | `Geddada Devicharan — Digital Product Builder · Video Editor · Digital Systems` |
| **`twitter:title`** | `Geddada Devicharan — Digital Product Builder · Video Editor · Digital Systems` |
| **WebSite Schema `name`** | `Geddada Devicharan` |
| **WebSite Schema `alternateName`** | `["Devicharan", "imdvichrn"]` |
| **Canonical URL** | `https://geddadadevicharan.vercel.app/` |
| **Web Manifest (`site.webmanifest`)** | `"name": "Geddada Devicharan"`, `"short_name": "Devicharan"` |
| **Visible Navigation & Footer** | `Geddada Devicharan` |

---

## 3. Favicon Assets & Google Search Compatibility

### Google Favicon Guidelines Alignment
- Google Search guidelines state that favicons should be square and at least 48×48px (e.g. 48×48, 96×96, 144×144, 192×192) or an SVG file, with a stable URL.
- Google rescales favicons to 16×16px for search result displays.

### Asset Delivery Matrix
1. **`public/favicon-96x96.png`**: High-contrast square 96×96 PNG generated from authentic master transparent brand symbol (`public/masters/logo-transparent.png`).
2. **`public/favicon-48x48.png`**: Standard 48×48 PNG.
3. **`public/favicon.ico`**: Multi-resolution icon containing 16×16, 32×32, and 48×48 sizes for legacy browser compatibility.
4. **`public/apple-touch-icon.png`**: 180×180 PNG for iOS home-screen bookmarks.
5. **`public/site.webmanifest`**: 192×192 and 512×512 icons for PWA and Android.

### HTML `<head>` Reference Configuration
```html
<!-- Favicons (Stable URLs, square assets) -->
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

---

## 4. Verification & Testing Workflow

### Step 1: Automated Audit & Build Verification
1. Update `scripts/audit.ts` to test for `"alternateName": ["Devicharan", "imdvichrn"]` and verify the existence of `public/favicon-96x96.png`.
2. Run `npm run lint` (`tsc --noEmit`) to verify zero TypeScript errors.
3. Run `npm run build` to execute the full production build pipeline:
   - OG image generation (`scripts/generateOgImages.ts`)
   - Sitemap & robots generation (`scripts/generateSitemapAndRobots.ts`)
   - Vite client bundling
   - Static HTML metadata pre-rendering (`scripts/buildPrerender.ts`)

### Step 2: Final Production `dist/index.html` Inspection
1. Inspect the generated `dist/index.html` file directly to confirm:
   - Exactly **one** `<script type="application/ld+json">` tag containing `@type: "WebSite"`.
   - Correct `name: "Geddada Devicharan"` and `alternateName: ["Devicharan", "imdvichrn"]`.
   - Pre-rendered `<link rel="icon" ...>` tags pointing to stable favicon URLs.
   - Preserved `Person` schema with `name: "Geddada Devicharan"` and `jobTitle`.

### Step 3: Live HTTP & Crawlability Verification
1. Inspect HTTP status, headers, and MIME types for:
   - Homepage: `https://geddadadevicharan.vercel.app/` (Status 200, Content-Type: `text/html`)
   - Favicon: `https://geddadadevicharan.vercel.app/favicon-96x96.png` (Status 200, Content-Type: `image/png`)
   - ICO: `https://geddadadevicharan.vercel.app/favicon.ico` (Status 200)
   - Robots: `https://geddadadevicharan.vercel.app/robots.txt` (Confirm `Googlebot` and `Googlebot-Image` are allowed)

---

## 5. Google Search Console Action Guide

Following deployment:

1. **Inspect Canonical URL**: Enter `https://geddadadevicharan.vercel.app/` into Google Search Console URL Inspection.
2. **Test Live URL**: Click **"Test Live URL"** to execute a fresh fetch via Google's rendering service.
3. **Examine Rendered HTML**: In the Test Live URL panel, inspect the **"HTML"** tab to verify that Google's crawler sees the single `WebSite` node with `"name": "Geddada Devicharan"` and `"alternateName": ["Devicharan", "imdvichrn"]`.
4. **Verify Structured Data Tab**: Check the structured data section in GSC to confirm that `WebSite` is recognized without syntax errors or warnings.
5. **Request Indexing**: Click **"Request Indexing"** to queue the updated homepage for recrawling.
6. **Timeline & Monitoring**: Google's site-name indexing operates on an algorithmic refresh cycle. Valid schema and crawlable favicons establish eligibility; Google updates the displayed snippet once its index refreshes.
