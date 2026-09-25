import { useState, useEffect, useRef } from 'react';

/**
 * Hook to detect user scroll velocity and motion preferences.
 * Ensures the UI feels "Classical at rest. Modern in motion."
 * - Normal scrolling: Full, subtle Apple-like reveal
 * - Fast scrolling: Shorten / skip stagger so page never fights the user
 * - Reduced motion: Instant reveal without transform or blur
 */
export function useScrollMotion() {
  const [isFastScrolling, setIsFastScrolling] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const scrollTimeout = useRef<number | null>(null);

  // Check prefers-reduced-motion media query
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Monitor scroll velocity
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return;

    lastScrollY.current = window.scrollY;
    lastScrollTime.current = performance.now();

    const handleScroll = () => {
      const currentY = window.scrollY;
      const currentTime = performance.now();
      const deltaY = Math.abs(currentY - lastScrollY.current);
      const deltaTime = Math.max(currentTime - lastScrollTime.current, 1);

      // Velocity in pixels per millisecond
      const velocity = deltaY / deltaTime;

      if (velocity > 1.8) {
        setIsFastScrolling(true);
      }

      lastScrollY.current = currentY;
      lastScrollTime.current = currentTime;

      // Clear fast-scrolling flag after user slows down / pauses
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = window.setTimeout(() => {
        setIsFastScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
    };
  }, [prefersReducedMotion]);

  return { isFastScrolling, prefersReducedMotion };
}
