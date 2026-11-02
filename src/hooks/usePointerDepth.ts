import { useEffect, useRef, useCallback } from 'react';

export interface PointerDepth {
  x: number; // Normalized -1 to 1
  y: number; // Normalized -1 to 1
  pixelX: number; // Target pixel offset (-maxOffset to maxOffset)
  pixelY: number; // Target pixel offset (-maxOffset to maxOffset)
  isHovered: boolean;
}

/**
 * usePointerDepth — High-performance Spring/Lerp Parallax Hook
 * 
 * Provides smooth 2–8px micro-displacement physics driven by pointer movement
 * with natural velocity damping and calm resting state.
 * 
 * Performance Guarantees:
 * - ZERO React state re-renders during 60/120fps animation ticks
 * - Directly updates depthRef and optional portraitRef DOM element
 * - Self-pausing loop: automatically stops running RAF when motion settles
 * - Respects prefers-reduced-motion
 */
export function usePointerDepth(maxOffset: number = 6, damping: number = 0.08) {
  const depthRef = useRef<PointerDepth>({
    x: 0,
    y: 0,
    pixelX: 0,
    pixelY: 0,
    isHovered: false
  });

  const targetRef = useRef({ x: 0, y: 0, isHovered: false });
  const currentRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);
  const isLoopRunningRef = useRef(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const startAnimation = useCallback(() => {
    if (prefersReducedMotion || isLoopRunningRef.current) return;
    isLoopRunningRef.current = true;

    const tick = () => {
      const target = targetRef.current;
      const current = currentRef.current;

      // Smooth lerp damping
      current.x += (target.x - current.x) * damping;
      current.y += (target.y - current.y) * damping;

      const pixelX = Math.round(current.x * maxOffset * 100) / 100;
      const pixelY = Math.round(current.y * maxOffset * 100) / 100;

      depthRef.current.x = current.x;
      depthRef.current.y = current.y;
      depthRef.current.pixelX = pixelX;
      depthRef.current.pixelY = pixelY;
      depthRef.current.isHovered = target.isHovered;

      // Update portrait DOM element directly without triggering React re-renders
      if (portraitRef.current) {
        portraitRef.current.style.transform = `translate3d(${pixelX * 0.2}px, ${pixelY * 0.2}px, 0)`;
      }

      // Check if settled (both target and current very close to target, and not hovered)
      const dx = Math.abs(target.x - current.x);
      const dy = Math.abs(target.y - current.y);
      const isSettled = dx < 0.0005 && dy < 0.0005 && !target.isHovered;

      if (isSettled) {
        current.x = 0;
        current.y = 0;
        depthRef.current.pixelX = 0;
        depthRef.current.pixelY = 0;
        if (portraitRef.current) {
          portraitRef.current.style.transform = 'translate3d(0px, 0px, 0px)';
        }
        isLoopRunningRef.current = false;
        animFrameRef.current = null;
        return;
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, [damping, maxOffset, prefersReducedMotion]);

  const handlePointerMove = useCallback((e: PointerEvent | React.PointerEvent) => {
    if (prefersReducedMotion) return;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalized between -1 and 1
      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

      targetRef.current = {
        x: normX,
        y: normY,
        isHovered: true
      };
    } else {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;

      targetRef.current = {
        x: Math.max(-1, Math.min(1, normX)),
        y: Math.max(-1, Math.min(1, normY)),
        isHovered: true
      };
    }

    startAnimation();
  }, [prefersReducedMotion, startAnimation]);

  const handlePointerLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0, isHovered: false };
    startAnimation();
  }, [startAnimation]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      isLoopRunningRef.current = false;
    };
  }, []);

  return {
    depth: depthRef.current,
    depthRef,
    portraitRef,
    containerRef,
    handlePointerMove,
    handlePointerLeave
  };
}

