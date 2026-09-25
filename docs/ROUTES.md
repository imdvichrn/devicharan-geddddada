# ROUTES

All routes are declared in `src/App.tsx` (`AnimatedRoutes`). The host rewrites every
non-file path to `/index.html` (`vercel.json`), so deep links work on refresh/share.

## Live routes

### `/`
- Purpose: homepage / full portfolio
- Page component: `src/pages/Portfolio.tsx`
- Data: `src/data/projects.ts`
- Assets: `src/assets/profile-avatar.png`, `hero-bg.png`, `background-video.mp4`, `/cv.pdf`
- Navigation sources: logo, all header links, chatbot deep links
- External links: social profiles, WhatsApp (`https://wa.me/916303468707`), YouTube embeds
- Auth: none

### `/perfect-pack`
- Purpose: Perfect Pack product page + launch registration
- Page component: `src/pages/PerfectPackPage.tsx`
- Data: launch registration write to `launch_registrations`
- Assets: `/assets/product-logo.png`, `/assets/perfect-pack-preview.png`, `/assets/perfect-pack-demo.mp4`, `/og/og-perfectpack.png`
- Navigation sources: header, homepage project grid, chatbot
- Auth: none (public insert policy)

### `/project/:projectId`
- Purpose: generic project detail page driven by data
- Page component: `src/pages/ProjectPage.tsx`
- Data: matching entry in `src/data/projects.ts`; per-project SEO from an internal `seoConfig`
- Assets: `/examflow-logo.jpg`, YouTube thumbnails, OG images
- Unknown `projectId` renders the not-found state
- Auth: none

### `/projects/video-editing-post-production`
- Purpose: dedicated video editing / post-production case study
- Page component: `src/pages/projects/VideoEditingPostProduction.tsx`
- Assets: YouTube facades (`VideoEmbed`)
- Auth: none

### `/project/examflow-os/blog/examflowos-journey`
- Purpose: long-form build-journey article
- Page component: `src/pages/blog/ExamFlowOSJourney.tsx`
- Auth: none

### `/project/examflow-os/blog/examflowos-all-in-one-exam-prep-app-ap-tg-ecet-icet-polycet`
- Purpose: documentation-style guide (TOC, tables, FAQ, HowTo schema)
- Page component: `src/pages/blog/ExamFlowOSGuide.tsx`
- Auth: none

### `*`
- Purpose: 404
- Page component: `src/pages/NotFound.tsx`

## Redirects (kept for existing inbound links)
| From | To |
| --- | --- |
| `/admin` | `/` |
| `/projects` | `/#projects` |
| `/project/perfect-pack` | `/perfect-pack` |
| `/projects/web-portfolio` | `/#projects` |
| `/projects/scenesync-edits` | `/#projects` |
| `/projects/visual-design` | `/project/visual-design` |
| `/projects/growth-strategy` | `/project/growth-strategy` |

## Link inventory
- **Internal navigation** — `Navigation.tsx` uses `Link` for route changes and
  `requestAnimationFrame` scrolling for in-page anchors; anchors on other routes
  navigate to `/#section` first, then scroll.
- **External links** — always `target="_blank" rel="noopener noreferrer"`.
- **Contact** — WhatsApp link only. The phone number is never rendered as text.
- **Downloads** — `/cv.pdf` (fetched then saved by the homepage CV button).
- **Anchors** — `#hero`, `#about`, `#projects`, `#workflows`, `#contact`.
- No `href="#"` or `javascript:void(0)` placeholders remain.
