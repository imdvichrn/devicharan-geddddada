# PROJECT MAP

## What this project is
Personal portfolio and product site for **Geddada Devicharan** (handle: `imdvichrn`).
It showcases AI systems, video editing/post-production work, and two products
(**ExamFlowOS**, **Perfect Pack**), plus an in-page AI assistant (**Echoless**).

It is a **single-page React application** (client-rendered) deployed as static files.
There is no application server in this repository.

## Stack
| Layer | Technology |
| --- | --- |
| Framework | React 18 + TypeScript 5 |
| Build tool | Vite 5 (`@vitejs/plugin-react-swc`) |
| Styling | Tailwind CSS 3 + shadcn/ui (Radix primitives) |
| Routing | react-router-dom 7 (`BrowserRouter`) |
| Animation | framer-motion |
| Head/meta | react-helmet-async |
| Data/async | @tanstack/react-query (provider only), direct fetch |
| Backend | Lovable Cloud (Supabase): Postgres table + 3 edge functions |
| Email | EmailJS (contact form, client-side), Resend via edge functions |
| Analytics | @vercel/analytics |
| Package manager | bun (`bun.lock`) — npm lockfile also present |

## Directory map
```
/
├── index.html                 Static shell: meta, OG/Twitter tags, JSON-LD graph
├── vite.config.ts             Vite config + sitemap plugin
├── vercel.json                SPA rewrites, security headers, cache headers
├── tailwind.config.ts         Design tokens (HSL semantic colors)
├── scripts/
│   ├── generateSitemap.ts     Builds public/sitemap.xml from src/data/projects.ts
│   └── vite-plugin-sitemap.ts Runs the generator on dev start and build
├── public/                    Served verbatim at the site root
│   ├── og/                    Pre-rendered social share images
│   ├── favicon_io/            Favicons + site.webmanifest
│   ├── assets/                Perfect Pack media (logo, preview, demo video)
│   ├── cv.pdf, examflow-logo.jpg, profile-avatar.png, siri-wave.webm
│   ├── robots.txt, sitemap.xml, sitemap-index.xml
│   └── googlec2e77a230f9718e1.html  (Search Console verification)
├── src/
│   ├── main.tsx               Entry point + document-title guard
│   ├── App.tsx                Providers + route table
│   ├── index.css              Design tokens / global styles
│   ├── pages/                 Route-level components
│   ├── components/            Shared components (`ui/` = shadcn primitives)
│   ├── hooks/                 useTheme, use-mobile, use-toast
│   ├── lib/                   structuredData.ts, video.ts, utils.ts
│   ├── data/projects.ts       Single source of truth for project content
│   ├── services/chatService.ts Streaming client for the Echoless edge function
│   ├── integrations/supabase/ Auto-generated client + DB types (do not edit)
│   └── assets/                Bundled media imported by components
└── supabase/functions/        Edge functions (echoless-chat, send-contact-email,
                               send-perfect-pack-email)
```

## Where data comes from
- **Project/portfolio content** — static TypeScript in `src/data/projects.ts`.
- **SEO/structured data** — generated in `src/lib/structuredData.ts` and injected per page with Helmet.
- **Launch registrations** — written to the `launch_registrations` table in the backend.
- **Chat replies** — streamed from the `echoless-chat` edge function.
- **Contact messages** — sent through EmailJS from the browser.

## Entry points
1. `index.html` → `<div id="root">` + `/src/main.tsx`
2. `src/main.tsx` → title guard → `createRoot().render(<App />)`
3. `src/App.tsx` → providers → `AnimatedRoutes` → page component
