# Implementation Plan: Height-Synced Page Transitions

Refine the `PageTransition` component to eliminate jarring layout jumps when switching between routes with different container widths by leveraging Framer Motion's `layout` prop.

---

## 1. Technical Strategy

- **`layout` prop**: Enable `layout` on the `motion.div` wrapper. This automatically handles height synchronization during route transitions as the container size changes, preventing content jumps.
- **`AnimatePresence` (existing in `App.tsx`)**: Ensure `AnimatePresence mode="wait"` is utilized to cleanly sequence the exit and enter animations.
- **Performance**: Maintain the existing `spring` transition for high-performance fluid motion, avoiding heavy layout-dependency monitoring hooks.

---

## 2. Implementation Steps

1.  **Modify `src/components/PageTransition.tsx`**:
    - Add `layout` prop to the `motion.div` component.
    - Set `transition` for `layout` to match the existing spring configuration for cohesive timing.
    - Preserve existing `variants` for `initial`, `animate`, and `exit` to maintain the current fade/slide feel.

2.  **Verification**:
    - Test route changes between full-width (`/`) and constrained container (`/writing`) pages.
    - Confirm the container resizes smoothly without sudden jumps.
    - Ensure `prefers-reduced-motion` still overrides all animations instantly.

---

## 3. Anticipated Changes

```typescript
// src/components/PageTransition.tsx
<motion.div
  layout // New: handles height synchronization automatically
  initial="initial"
  animate="animate"
  exit="exit"
  variants={pageVariants}
  transition={pageTransition}
  style={{ 
    willChange: shouldReduceMotion ? 'opacity' : 'opacity, transform',
    width: '100%' // Ensure layout stability
  }}
>
  {children}
</motion.div>
```

---

## 4. Verification Plan

- **Layout Stability**: Switch between routes with differing `PageContainer` constraints (e.g., `maxWidth="wide"` vs `maxWidth="default"`).
- **History Navigation**: Perform back/forward browser navigation.
- **Reduced Motion**: Toggle system accessibility setting to ensure instant transitions.
