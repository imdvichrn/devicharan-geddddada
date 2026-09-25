# ARCHITECTURE

## Runtime shape
```
Browser
  └── index.html (static meta, OG tags, JSON-LD)
        └── src/main.tsx            entry, title guard
              └── App.tsx           HelmetProvider → QueryClientProvider → ThemeProvider
                    │                 → TooltipProvider → Toasters → BrowserRouter
                    ├── Navigation           persistent header
                    ├── AnimatedRoutes       ScrollToTop + AnimatePresence + <Routes>
                    │     └── Page component (wrapped in PageTransition)
                    │           └── Sections / shared components
                    │                 └── hooks + lib helpers
                    └── Chatbot              root-level, single instance
                          └── services/chatService.ts
                                └── Supabase edge function `echoless-chat`
                                      └── Lovable AI Gateway (streaming SSE)
```

## Rendering model
Fully client-rendered SPA. Every route resolves to `index.html` on the host
(`vercel.json` rewrite) and React Router takes over in the browser.

Consequence: crawlers that do not execute JavaScript only see the meta tags in
`index.html`. That is why `index.html` carries global OG/Twitter tags and a
JSON-LD `@graph`, while per-page tags are added at runtime with Helmet.

## Layers
| Layer | Location | Responsibility |
| --- | --- | --- |
| Shell | `index.html`, `src/main.tsx` | Static meta, fonts, mount point, title guard |
| App composition | `src/App.tsx` | Providers, routing, global overlays |
| Pages | `src/pages/**` | One component per route, owns page-level SEO |
| Components | `src/components/**` | Presentation + interaction, no routing knowledge |
| UI primitives | `src/components/ui/**` | shadcn/Radix; treat as vendored, edit rarely |
| Hooks | `src/hooks/**` | Theme, mobile breakpoint, toast |
| Lib | `src/lib/**` | Pure helpers: schema builders, video URL helpers, `cn` |
| Data | `src/data/projects.ts` | Static content model |
| Services | `src/services/chatService.ts` | Network access for the assistant |
| Backend | `supabase/functions/**` | AI proxy + transactional email |

## State
There is no global store. State is local (`useState`/`useRef`) except:
- **Theme** — `ThemeProvider` in `src/hooks/useTheme.tsx`, persisted to `localStorage`.
- **Toasts** — `use-toast` reducer + `sonner`.
- **Chat** — message array held inside `Chatbot`; the user's name is cached in `localStorage`
  (`chatbot_user_name`).
- `QueryClientProvider` is mounted but no queries are registered yet; it exists so that
  future data fetching has a place to live.

## Styling system
All colors, gradients and shadows are semantic HSL tokens declared in `src/index.css`
and mapped in `tailwind.config.ts`. Components must use tokens
(`bg-background`, `text-foreground`, `hero.*`), never literal colors. Light and dark
themes are kept in sync through the same token names.

## Build & deploy
`vite build` → `dist/` static bundle. The sitemap plugin regenerates
`public/sitemap.xml` before the bundle is produced. Vercel serves `dist/` with the
rewrite and header rules from `vercel.json`.
