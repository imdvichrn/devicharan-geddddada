import { useEffect, useRef, useState, useCallback } from 'react';

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
 */
export function usePointerDepth(maxOffset: number = 6, damping: number = 0.08) {
  const [depth, setDepth] = useState<PointerDepth>({
    x: 0,
    y: 0,
    pixelX: 0,
    pixelY: 0,
    isHovered: false
  });

  const targetRef = useRef({ x: 0, y: 0, isHovered: false });
  const currentRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  }, [prefersReducedMotion]);

  const handlePointerLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0, isHovered: false };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let isRunning = true;

    const tick = () => {
      if (!isRunning) return;

      const target = targetRef.current;
      const current = currentRef.current;

      // Smooth lerp damping
      current.x += (target.x - current.x) * damping;
      current.y += (target.y - current.y) * damping;

      // Only update state if meaningful change
      const pixelX = Math.round(current.x * maxOffset * 100) / 100;
      const pixelY = Math.round(current.y * maxOffset * 100) / 100;

      setDepth({
        x: current.x,
        y: current.y,
        pixelX,
        pixelY,
        isHovered: target.isHovered
      });

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [maxOffset, damping, prefersReducedMotion]);

  return {
    depth,
    containerRef,
    handlePointerMove,
    handlePointerLeave
  };
}
