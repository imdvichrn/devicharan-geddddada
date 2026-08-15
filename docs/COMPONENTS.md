# COMPONENTS

## Hierarchy
```
App
├── Navigation                 persistent header, theme toggle, anchor + route links
├── AnimatedRoutes
│   ├── ScrollToTop
│   └── PageTransition
│       ├── Portfolio (/)
│       │   ├── AnimatedBackground
│       │   ├── Hero section (video + heroBg + profile avatar)
│       │   ├── About / HiddenIdentityBlock
│       │   ├── Projects grid → project cards → VideoEmbed
│       │   ├── WorkflowsGrid → VideoWindow / WindowChrome
│       │   ├── LiveProjectsButton
│       │   ├── ContactForm
│       │   └── FooterMicroBio
│       ├── PerfectPackPage (/perfect-pack)
│       ├── ProjectPage (/project/:projectId)
│       ├── VideoEditingPostProduction
│       ├── ExamFlowOSJourney / ExamFlowOSGuide
│       └── NotFound
└── Chatbot                    single root-level instance (never render it in a page)
    ├── SiriOrb
    └── ActionButtons
```

## Shared components

### `Navigation.tsx`
Header with logo, section anchors, route links, theme toggle. Hybrid strategy: `Link`
for routes, `requestAnimationFrame` scroll for anchors, `/#section` when navigating
from another route. No props.

### `PageTransition.tsx`
Framer Motion spring wrapper applied to every routed page. Props: `children`.

### `ScrollToTop.tsx`
Scrolls to top on route change; honours `#hash` targets.

### `Chatbot.tsx` — Echoless assistant
Floating assistant. Owns message state, streaming, sound effects (`/siri-wave.webm`),
name capture (`localStorage: chatbot_user_name`), navigation intents and quick actions.
Calls `services/chatService.ts`. Persona: "Online • Personal Assistant", short
2–4 sentence replies, no markdown lists.

### `SiriOrb.tsx`
64px animated orb used as the chatbot avatar/trigger. Pure presentation.

### `ActionButtons.tsx`
Renders contextual buttons (internal routes / external URLs) returned by chat intents.

### `ContactForm.tsx`
Controlled form with honeypot + validation. Sends two EmailJS messages
(notification then autoreply) and guards against double submission.

### `WorkflowsGrid.tsx`
Bento grid of workflow visualizations; embeds `VideoWindow` and links to project routes.

### `VideoEmbed.tsx` / `VideoWindow.tsx`
YouTube **facade** components: render a thumbnail first and only load the iframe on
click. `fetchPriority="low"`, lazy loading, titles include the full name for SEO.
Never replace these with raw `<iframe>` tags.

### `WindowChrome.tsx`
macOS-style window frame used for media and panels. Renders `Echoless.jsx` branding mark.

### `AnimatedBackground.tsx`
Homepage gradient orbs + star field, driven by CSS keyframes (GPU-accelerated).

### `LiveProjectsButton.tsx`
macOS-inspired interactive button for the live projects link.

### `SEOContent.tsx`
Exports `HiddenIdentityBlock` and `FooterMicroBio` — visually hidden, semantically
readable identity/keyword blocks. Invisible to users, readable by crawlers.

### `ui/*`
Vendored shadcn/ui primitives on Radix. Treat as library code: extend through props and
`className` rather than editing the files.

## Conventions
- Named exports for shared components; default exports for pages.
- No component reaches into routing state except `Navigation`, `ScrollToTop`, pages.
- Colors come from tokens only; no hardcoded hex/`bg-black`/`text-white`.
