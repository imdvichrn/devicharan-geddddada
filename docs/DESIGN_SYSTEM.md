# PORTFOLIO DESIGN SYSTEM — SOURCE OF TRUTH
**Geddada Devicharan — Digital Product Builder, Video Editor & Creator**

> **Design Philosophy**: Make every design decision feel intentional, quiet, precise, and inevitable.
> Avoid "Apple-copy" superficiality (candy gradients, pill-badge clutter, bouncing animations). Focus on Swiss/editorial typographic hierarchy, disciplined spatial math, and restrained micro-motion.
>
> **The Golden Rule**: *"If everything is highlighted, nothing is highlighted."*

---

## 0. THE ATTENTION ALGORITHM (VISUAL HIERARCHY)

Every single element on a screen is assigned a priority score that governs its visual weight:

| Priority | Role | Target Elements | Visual Treatment |
| :--- | :--- | :--- | :--- |
| **P0** | **Identity / Primary Message** | Full Name (`Geddada Devicharan`), Core Discipline Statement | Large typography, high contrast, maximum breathing room. |
| **P1** | **Primary Action / Strongest Proof** | Primary CTA ("Explore my work"), core proof (`700+ deliverables`, `10K+ students`) | Clear and focused, restrained affordance, high intent. |
| **P2** | **Projects / Experience** | Discipline cards (Video, Software, Web, Systems), Case studies | Normal visual weight, contained surface elevation, quiet borders. |
| **P3** | **Supporting Information** | Section intros, build narratives, explanations ("Why I Built It") | Quieter secondary text, relaxed line-height, muted tones. |
| **P4** | **Metadata / Utility** | Location, timestamps, reading times, tool tags, social links | Almost disappears until needed; unboxed text with typographic dots (`·`). |

---

## 0.1 THE LAYOUT ALGORITHM (RECOMPOSITION OVER SCALING)

Instead of passively shrinking a desktop canvas down through arbitrary pixel breakpoints (`1200px` → `768px` → `375px`), the layout evaluates available space against content requirements:

```
AVAILABLE SPACE
      ↓
CONTENT REQUIREMENT
      ↓
CAN CONTENT FIT?
      ↓
YES → preserve composition
NO  → recompose
```

### Architectural Recomposition Across Viewports:

* **Desktop Layout (Wide Canvas)**:
  * Horizontal balance between statement and visual anchor.
  ```
  ┌──────────────────────────────────────────────┐
  │ NAV                                          │
  │                                              │
  │        LARGE STATEMENT        VISUAL         │
  │                                              │
  │        supporting text                       │
  │        primary action                        │
  │                                              │
  └──────────────────────────────────────────────┘
  ```

* **Tablet Layout (Medium Canvas)**:
  * Stacked vertical flow with preserved visual presence.
  ```
  ┌───────────────────────────────┐
  │ NAV                           │
  │                               │
  │ LARGE STATEMENT               │
  │                               │
  │ VISUAL                        │
  │                               │
  │ supporting text               │
  │ action                        │
  └───────────────────────────────┘
  ```

* **Mobile Layout (Narrow Canvas / Thumb Zone)**:
  * Recomposed specifically for handheld usage: Action elevated above secondary visual asset for instant thumb reach.
  ```
  ┌─────────────────┐
  │ NAV             │
  │                 │
  │ LARGE           │
  │ STATEMENT       │
  │                 │
  │ supporting      │
  │ text            │
  │                 │
  │ ACTION          │  ← Elevated for immediate reach
  │                 │
  │ VISUAL          │
  └─────────────────┘
  ```

---

## 1. VISUAL SYSTEM

### 1.1 Typography
* **Display & Editorial Headings**: `Instrument Serif`, `Source Serif 4`
  * Role: Primary hero name, major section kickers, essay titles.
  * Feeling: Quiet, cultured, deliberate craft.
* **Interface & Body Text**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
  * Role: Navigation items, project descriptions, UI controls, data labels, body prose.
  * Tracking: `-0.01em` on headings $\ge 24\text{px}$, normal on body, `+0.02em` on uppercase kickers.
* **Technical & Code Data**: `Geist Mono`, `JetBrains Mono`, `ui-monospace`
  * Role: Project metrics (e.g. `700+ deliverables`, `10K+ students`), timeline metadata, specs.
* **Anti-Slop Zero-Pill Rule**:
  * Never wrap static metadata (tags, categories, dates, statuses) in rounded pill badges or colored capsules.
  * Render static metadata as clean inline prose with typographic separators (`·`, `/`).

### 1.2 Color & Contrast
* **Semantic Palette (HSL tokens)**:
  * `--background`: Neutral obsidian black (`224 71% 4%` dark) / warm studio white (`220 14% 97%` light).
  * `--foreground`: High-contrast neutral (`210 40% 98%` dark) / deep ink (`224 24% 10%` light).
  * `--muted`: Quiet secondary slate (`217 33% 17%` dark) / subtle warm gray (`220 12% 95%` light).
  * `--muted-foreground`: Readable secondary text (`215 20% 65%` dark) / balanced slate (`220 8% 42%` light).
  * `--border`: Hairline contrast border (`217 33% 17%` dark / `220 13% 89%` light).
  * `--primary`: Accent blue (`211 100% 50%`) reserved exclusively for interactive focus, active tab indicator, and primary CTAs. No candy gradient washes across arbitrary backgrounds.

### 1.3 Spacing & Spatial Math
* **Base Scale**: 4px baseline grid (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`).
* **Outer vs Inner Math**:
  * Container outer padding is always strictly greater than or equal to inner child gaps ($P_{\text{outer}} \ge G_{\text{inner}}$).
  * Minimum container padding: 16px (`px-4`) on mobile, 32px (`px-8`) on desktop.
* **Fluid Scaling**: Key vertical clearances utilize CSS `clamp()`:
  * Header height: `clamp(3.75rem, 3.35rem + 1vw, 4.5rem)`
  * Header-to-content gap: `clamp(1.25rem, 0.5rem + 2.5vw, 3.5rem)`

### 1.4 Shapes & Radius Discipline
* **Nested Radius Formula**:
  $$r_{\text{inner}} = r_{\text{outer}} - \text{padding}$$
  * Cards / Surface containers: `rounded-2xl` (16px).
  * Embedded panels / inner elements: `rounded-xl` (12px).
  * Interactive buttons / chips: `rounded-lg` (8px).
  * Pill shapes (`rounded-full`) are strictly reserved for circular icon buttons and avatar portraits.

### 1.5 Elevation & Depth
* **Single-Elevation Rule**: Maximum one level of card depth per viewport. Prohibit nesting bordered boxes inside bordered cards.
* **Hairline Borders**: `1px solid rgba(255, 255, 255, 0.08)` in dark mode, `1px solid rgba(0, 0, 0, 0.06)` in light mode.
* **Backdrop Filtration**: Subtle `backdrop-blur-md` (8px to 12px) on floating navigation and dialogs.

---

## 2. CONTAINER SYSTEM

### 2.1 Hierarchy
Every view follows an intentional 3-tier container architecture:
```
Page
 └── Full viewport (min-h-[100dvh], fluid background canvas)
      └── Content container (max-w-[1200px], centered, fluid page-padding)
           ├── Navigation (floating or anchored header)
           ├── Section (semantic landmark: hero, work map, proof)
           └── Content (grid, reading column, or interactive surface)
```

### 2.2 Container Dimensions & Starting Tokens
* `--content-max: 1200px`: The global visual limit for multi-column grids, work showcase maps, and portfolio galleries.
* `--reading-max: 720px`: The comfortable optical measure for longform writing, case study prose, and bio essays (prevents long lines that fatigue the eye).
* `--page-padding: clamp(20px, 4vw, 64px)`: Fluid lateral margin that scales continuously from compact smartphones to ultra-wide displays without abrupt step-jumps.

---

## 3. SEMANTIC SPACING RHYTHM

Spacing is not arbitrary. We avoid random intervals (`17px`, `29px`, `43px`, `57px`, `71px`). Every spacing step belongs to an intentional harmonic scale where distance has clear structural meaning:

```
4   8   12   16   24   32   48   64   80   96   128   160
```

### The Spacing Grammar:
| Token / Step | Value | Semantic Meaning & Usage |
| :--- | :--- | :--- |
| **`--space-4`** | `4px` | Hairline micro-nudge; tight tag separator padding |
| **`--space-8`** | `8px` | **Within an element**: icon + label, inline avatar + handle, button inner gap |
| **`--space-12`** | `12px` | Tightly bound sibling controls; small input group gaps |
| **`--space-16`** | `16px` | **Related elements**: input label + field, tightly stacked list items |
| **`--space-24`** | `24px` | **Component**: internal card padding, modal body inset, control row gaps |
| **`--space-32`** | `32px` | Sub-component separation; card metadata footer offsets |
| **`--space-48`** | `48px` | **Component group**: card cluster separation, grid row gap |
| **`--space-64`** | `64px` | Mid-tier landmark partition between content sub-topics |
| **`--space-80`** | `80px` | **Section**: standard section-to-section boundary on desktop / tablet |
| **`--space-96`** | `96px` | Major section separation before landmark calls to action |
| **`--space-128`** | `128px` | **Major narrative transition**: chapter break, hero to case study handoff |
| **`--space-160`** | `160px` | Top-level chapter boundary; monumental hero clearance |

---

## 4. SHAPE LANGUAGE & RADIUS HIERARCHY

> **Anti-AI-Slop Rule**: Do not make every component `border-radius: 24px`. Homogeneous bubble curves are the hallmark of generic AI generation. Instead, construct deliberate visual tension through a hierarchical scale that includes zero radius.

| Level | Token / Class | Radius | Component Targets & Tension Role |
| :--- | :--- | :--- | :--- |
| **Architectural / Crisp** | `rounded-none` | `0px` | Technical spec tables, full-width border dividers, terminal windows, code blocks, timeline tick marks. **Creates grounding tension against rounded containers.** |
| **Subtle / Minimal** | `rounded-md` | `6px` | Navigation pills, search dropdown rows, utility popovers, inline status indicators. |
| **Controlled** | `rounded-lg` | `8px` – `10px` | Action buttons, text input fields, segmented filter tabs. |
| **Moderate** | `rounded-xl` | `12px` – `14px` | Standard portfolio cards, case study feature panels, discipline hub items. |
| **Strong** | `rounded-2xl` | `16px` – `20px` | Large video viewports, primary hero preview canvas, modal overlays. |
| **Distinctive Utility** | `rounded-full` | `9999px` | Circular avatar portrait anchor, icon-only toggle buttons, assistant orb trigger. |

---

## 5. TYPOGRAPHY SYSTEM

Typography does the heavy lifting through **scale, optical letterforms, line-height, and surrounding negative space** — not continuous bolding.

> **Anti-AI-Slop Rule**: Do not make every heading bold. True sophistication lives in the tension between weight, optical serif elegance, strict monospace alignment, and calm regular body prose.

### 5.1 Typographic Scale & Fluid Clamps
* **Display (`font-display`)**:
  * Typeface: `Instrument Serif`, italicized/regular
  * Formula: `clamp(2.5rem, 1.8rem + 3.5vw, 4.75rem)`
  * Weight: `font-normal` (400) — delicate, cultured, deliberate
  * Leading & Tracking: `leading-[1.04]`, tracking `-0.025em`
* **Heading 1 / Landmark (`h1`)**:
  * Typeface: `Instrument Serif` (editorial) or `Inter` (technical)
  * Formula: `clamp(2rem, 1.5rem + 2.4vw, 3.25rem)`
  * Weight: `font-normal` (editorial) or `font-semibold` (technical)
  * Leading: `leading-[1.12]`, tracking `-0.02em`
* **Heading 2 / Section Titles (`h2`)**:
  * Typeface: `Inter`
  * Formula: `clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)`
  * Weight: `font-medium` (500) to `font-semibold` (600)
  * Leading: `leading-[1.2]`, tracking `-0.015em`
* **Heading 3 / Card Titles (`h3`)**:
  * Typeface: `Inter`
  * Formula: `clamp(1.125rem, 1rem + 0.6vw, 1.5rem)`
  * Weight: `font-medium` (500)
  * Leading: `leading-[1.3]`, tracking `-0.01em`
* **Body Large / Lead Prose**:
  * Typeface: `Inter`
  * Formula: `clamp(1.0625rem, 0.98rem + 0.35vw, 1.25rem)`
  * Weight: `font-normal` (400), `leading-[1.6]`
* **Body Regular**:
  * Typeface: `Inter`
  * Value: `1rem` (16px), `font-normal` (400), `leading-[1.65]`
* **Small / Secondary**:
  * Typeface: `Inter`
  * Value: `0.875rem` (14px), `font-normal` (400), `leading-[1.5]`
* **Metadata / Metrics (`font-mono`)**:
  * Typeface: `Geist Mono` / `ui-monospace`
  * Value: `0.75rem` (12px), tracking `+0.02em`, quiet slate tone

---

## 6. RESTRAINED COLOR PALETTE & ACCENT MEANING

> **Core Principle**: *"Accent is not decoration. Accent means: Pay attention here. If the entire page is accented with gradients, the accent has lost all meaning."*

We avoid building a visual rainbow. The palette is strictly bounded:

```
[ Background Canvas ]  ──  Base obsidian / warm studio white
[ Elevated Surface ]   ──  Cards, panels, modal sheets
[ Primary Text ]       ──  Maximum contrast legible prose
[ Secondary Text ]     ──  Subtle reading notes, contextual paragraphs
[ Muted Metadata ]     ──  Timestamps, metrics, quiet tags
[ Hairline Border ]    ──  Low-contrast edge boundaries
[ Accent ]             ──  RESERVED FOR INTENT: active state, focus ring, primary CTA
[ Accent Hover ]       ──  Physical interaction state
[ Status (Success/Warn/Err) ]  ──  Restrained functional diagnostics only
```

### HSL Tokens:
* **Background**: Obsidian `224 71% 4%` (Dark) / Studio `220 14% 97%` (Light)
* **Elevated Background**: `224 22% 9%` (Dark) / Pure White `0 0% 100%` (Light)
* **Primary Text**: `210 40% 98%` (Dark) / Deep Ink `224 24% 10%` (Light)
* **Secondary Text**: `215 20% 65%` (Dark) / Slate `220 8% 42%` (Light)
* **Muted Text**: `217 15% 45%` (Dark) / Light Slate `220 6% 60%` (Light)
* **Hairline Border**: `224 16% 18%` (Dark) / `220 13% 89%` (Light)
* **Accent**: Apple Blue `210 100% 52%` (Dark) / `211 100% 50%` (Light) — **strictly applied only to 1 or 2 focal points per viewport**.

---

## 7. DEPTH & SHADOW DISCIPLINE

> **Anti-AI-Slop Rule**: Do not put drop shadows on every card. Depth comes from spacing, contrast, scale, and hairline edges. Shadows are reserved exclusively where an element physically floats over content.

```
FLAT (Ground Plane)
  ↓
ELEVATED (Card Surface)
  ↓
FLOATING (Autonomous Overlay)
```

1. **Flat (Level 0)**:
   * Background canvas, prose typography, inline divider rules.
   * **Shadow**: None.
2. **Elevated (Level 1)**:
   * Portfolio discipline cards, case study preview panels.
   * **Visual Treatment**: Subtle surface contrast (`bg-card`), 1px hairline border (`border-border`), **zero fuzzy shadow**.
3. **Floating (Level 2)**:
   * Sticky glass header navigation, dialog modals, floating assistant orb.
   * **Visual Treatment**: True z-index elevation, subtle diffuse ambient blur (`shadow-[0_8px_30px_rgba(0,0,0,0.12)]` / `backdrop-blur-md`).

---

## 8. THE 4-TIER MOTION SYSTEM

Motion is an architectural feedback layer, not decorative flair. Every animation belongs to one of four distinct tiers:

```
MOTION
│
├── 1. Micro
│   └── button / hover / press / switch toggle
│
├── 2. Transitional
│   └── navigation / page route / tab change
│
├── 3. Reveal
│   └── content entering viewport on scroll
│
└── 4. Spatial
    └── expanding / collapsing / modal / drawer
```

### Parameter Matrix:
| Motion Tier | Target | Purpose / Why | Duration | Easing | Distance | Opacity | Scale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Micro** | Button, hover, active press, switch | **Feedback** (Confirms user physical input) | `120ms` – `160ms` | `ease-out` / `cubic-bezier(0.16, 1, 0.3, 1)` | `1px` – `2px` micro-lift | `1.0` (surface tone shifts) | `0.98` (active) `1.01` (hover) |
| **Transitional** | Page route, tab switch, nav indicator | **Continuity** (Prevents cognitive disorientation across contexts) | `240ms` – `300ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | `8px` – `12px` | `0` → `1` | `1.0` (zero zoom distortion) |
| **Reveal** | Content entering viewport | **Attention** (Paces focus through narrative sequence) | `300ms` – `380ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | `16px` – `20px` upward | `0` → `1` | `1.0` |
| **Spatial** | Modal dialog, expanding drawer, sheet | **Spatial Relationship** (Maps origin and bounds of temporary surface) | `260ms` – `320ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Anchored to trigger | `0` → `1` | `0.96` → `1.0` |

### Motion Intensity vs Priority Rule:
* **Motion intensity decreases as importance decreases.**
  * High-priority milestones (**P0 / P1**) receive clean, clear presence.
  * Secondary items and metadata (**P3 / P4**) enter quietly or statically without ornamental choreographies.
* **Accessibility**: Every tier strictly obeys `@media (prefers-reduced-motion: reduce)` by immediately forcing durations to `0ms` and bypassing translate/scale transforms.

---

## 9. THE GOVERNING ANIMATION RULE

This is an uncompromised development invariant:

> ### **No animation without a reason.**
>
> * If a button moves: **feedback.**
> * If a page transitions: **continuity.**
> * If an element enters: **attention.**
> * If something expands: **spatial relationship.**
> * If it just moves because it looks cool: **delete it.**

---

## 10. COMPONENT BEHAVIOR (DESKTOP → TABLET → MOBILE)

| Component | Desktop ($\ge 1024\text{px}$) | Tablet ($640\text{px} - 1023\text{px}$) | Mobile ($< 640\text{px}$) |
| :--- | :--- | :--- | :--- |
| **Navigation** | Floating centered glass pill, full label row | Centered glass pill, compact text | Persistent glass header with drawer sheet |
| **Project Cards** | 2-column asymmetric or 3-column grid; rich hover preview | 2-column grid; subtle border highlight | 1-column card; title + quiet unboxed metadata |
| **Video Window** | 16:9 embedded player with timeline metadata side-panel | 16:9 player with stacked metadata | 16:9 player with full-width touch playback |
| **Assistant Trigger** | Floating 80px orb at bottom-right (`md:w-20`) | Floating 64px orb (`sm:w-16`) | Floating 56px orb (`w-14`) with safe-area offset |
| **Buttons / CTAs** | Height 40px, padding `px-4 py-2` | Height 44px, padding `px-4 py-2.5` | Minimum touch height 44px, full-width or primary right-docked |

---

## 11. AUDIT & CLASSIFICATION OF ANIMATED COMPONENTS

Every component with active animation is evaluated across seven architectural criteria:
1. *Does it improve comprehension?*
2. *Does it improve interaction?*
3. *Does it improve identity?*
4. *Does it hurt performance?*
5. *Does it compete with content?*
6. *Does it work on mobile?*
7. *Does it work with reduced motion?*

| Component | Comprehension | Interaction | Identity | Performance | Content Competition | Mobile Viable | Reduced Motion | Verdict | Action Plan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`PageTransition`** | Yes (context switch) | Yes (continuity) | Yes (deliberate) | Negligible | None | Yes | Yes (bypassed) | **KEEP** | Maintain 12px shift + opacity fade. |
| **`VideoWindow`** | Yes (video finishing proof) | Yes (facade click) | Yes (DaVinci Resolve) | Optimized (zero initial iframe) | None | Yes (16:9) | Yes | **KEEP** | Retain lazy thumbnail facade; strip unnecessary heavy drop-shadows. |
| **`BackgroundLoop`** | No (ambient) | No | Yes (spatial depth) | Moderate (continuous RAF) | Low on desktop; higher on mobile | Costly on low-end battery | Yes (stops loop) | **REFINE** | Maintain subtle celestial drift on desktop; pause RAF or simplify to static radial on mobile/power-save. |
| **`SiriOrb`** | Moderate (AI trigger) | Yes (click to open) | Moderate | Moderate (video decode) | Docked in corner | Obtrusive if over buttons | Needs video pause | **REFINE** | Ensure video pauses under `prefers-reduced-motion`; keep safe-area bottom clearance so it never covers mobile CTAs. |
| **`WindowChrome`** | Low (mimics macOS) | No (dead dots on static cards) | Moderate | Negligible | Wastes vertical space on mobile | Poor (extraneous on touch) | N/A | **DEMOTE** | Hide traffic-light chrome on mobile screens (`hidden sm:flex`); eliminate dead-click affordances. |
| **`MagneticButton`** | None | Low (gimmicky mouse drift) | None (trend) | Poor (layout thrash / mouse listeners) | Yes (button moves away from finger) | Impossible on touchscreens | Breaks | **REMOVE** | Banned. Replaced strictly with 1px–2px micro-press feedback (`MicroFeedback`). |

---

## 12. MOBILE PSYCHOLOGY: SERIAL ATTENTION ARCHITECTURE

> **The Core Reality**: On desktop, the human eye scans in two dimensions (horizontal and vertical balance). On mobile, human attention is strictly **serial and unidirectional**.

```
DESKTOP (Parallel Scanning)
┌──────────────────────────────────────────────┐
│ [ STATEMENT ]                 [ PORTRAIT ]   │
│ [ INTRO ]                     [ PROOF CARD ] │
│ [ PRIMARY CTA ]                              │
└──────────────────────────────────────────────┘

MOBILE (Serial Processing)
┌─────────────────┐
│ 1. WHO IS THIS? │  ← P0: Geddada Devicharan (Digital Product Builder · Video Editor)
│        ↓        │
│ 2. WHY CARE?    │  ← P3: Calm, grounded intro (Building software & finishing video)
│        ↓        │
│ 3. SHOW PROOF   │  ← P1: [ Explore my work → ] + 700+ deliverables proof
│        ↓        │
│ 4. VISUAL       │  ← P2: Portrait anchor grounded below
└─────────────────┘
```

### Mobile Anti-Clutter Invariant:
**Never place in the initial 400px mobile viewport:**
`Headline + Portrait + 3 Badges + Floating Pill + Looping Video + Social Bar + 2 Work Cards + Chatbot Popup`

**The visitor must answer three questions in sequence:**
1. *Who is this person?* (Instant clarity within 1.5 seconds)
2. *Why should I care?* (Direct statement of capability and value)
3. *Show me proof.* (Immediate thumb-accessible route to deliverables)

---

## 13. DESKTOP PSYCHOLOGY: SIMULTANEOUS RELATIONSHIPS & DOMINANT ANCHORS

Unlike mobile, a desktop viewport provides a wide two-dimensional canvas where the human eye effortlessly processes **simultaneous visual relationships**:

```
TEXT COLUMN                              VISUAL COLUMN
──────────────────────────────────────   ──────────────────────────────────────
[ Large Statement (P0) ]          ←───→  [ Visual Proof / Primary Media (P2) ]
↳ Who I am & What I engineer             ↳ Living player, project capture, asset

[ Context / Bio (P3) ]            ←───→  [ Technical Metadata (P4) ]
↳ Why built, ethical architecture        ↳ Stack, deliverable count, client

[ Primary Action (P1) ]           ←───→  [ Secondary Channels (P4) ]
↳ Direct link to work / launch demo      ↳ Repository link, live domain, contact
```

### Key Principles for Desktop Composition:
1. **The Eye Needs a Single Dominant Starting Point**:
   * Simultaneous relationships do **not** mean equal visual noise. The headline statement or primary case study title must decisively seize initial focus before the gaze drifts to the adjacent visual artifact.
2. **Horizontal Resonance**:
   * Align baseline heights between narrative paragraphs and the corresponding video/project showcase.
   * Information on the left is validated immediately by evidence on the right.
3. **Generous Negative Space as Architecture**:
   * Desktop breathes through ample gutters (`--page-padding: clamp(20px, 4vw, 64px)`) and section offsets (`80px` – `128px`), preventing the layout from feeling crammed or claustrophobic.

---

## 14. TABLET PSYCHOLOGY: DENSITY MEETS DISCIPLINE

Tablet (`768px` – `1024px`, iPad / Air / Pro portrait & landscape) is the most frequently neglected viewport in modern web design. Too many developers treat it as merely "desktop scaled down" or "mobile blown up."

```
                     THE TABLET SWEET SPOT
                               │
        ┌──────────────────────┴──────────────────────┐
        ↓                                             ↓
DESKTOP INFORMATION DENSITY           MOBILE SPATIAL DISCIPLINE
(2-column balance, rich context)       (single thumb flow, 44px+ touch targets)
```

### Explicit Tablet Specifications:
1. **Desktop Information Density**:
   * Preserves 2-column balanced work cards and side-by-side metric comparisons rather than forcing everything into an endless single-column mobile scroll.
   * Keeps technical metadata visible alongside summaries.
2. **Mobile Spatial Discipline**:
   * Outer container padding locks to `24px` – `32px` (`sm:px-6 md:px-8`) to prevent edge crowding.
   * Every interactive button, tab, and card maintains touch targets $\ge 44\text{px}$ (tablets are touch-first devices, not precision mice).
   * Touch gestures and scroll momentum are completely unobstructed by aggressive mouse-hover dependencies or hover-only tooltips.
3. **Adaptive Grid Transition**:
   * 3-column desktop grids gracefully recompose into clean **2-column asymmetric balance** (`grid-cols-1 sm:grid-cols-2`), never squishing cards into illegible vertical slivers.

