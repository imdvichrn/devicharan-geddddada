import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { PointerDepth } from '@/hooks/usePointerDepth';

interface HeroFieldProps {
  className?: string;
  pointerDepth?: PointerDepth;
  pointerDepthRef?: React.RefObject<PointerDepth | null> | React.MutableRefObject<PointerDepth>;
}

/**
 * HeroField — Localized Depth & Atmospheric Layer for the Hero Section.
 * 
 * Works in tandem with the global ambient spatial field:
 * - Visually quiet, editorial astronomical coordinate presence
 * - 2–8px smooth parallax displacement reacting to cursor/pointer via refs
 * - Single-initialization animation loop: never destroyed or recreated on pointer moves
 * - Pauses rendering automatically when scrolled out of viewport or tab hidden
 * - Quiet center calm zone preserving 100% text legibility
 * - Mobile-specific density & touch damping
 * - Respects prefers-reduced-motion
 */
export const HeroField: React.FC<HeroFieldProps> = ({ 
  className = '',
  pointerDepth,
  pointerDepthRef
}) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Synchronize incoming pointerDepth object into an internal ref for zero-rerender rendering
  const internalDepthRef = useRef<PointerDepth>(
    pointerDepthRef?.current || pointerDepth || { pixelX: 0, pixelY: 0, x: 0, y: 0, isHovered: false }
  );

  useEffect(() => {
    if (pointerDepthRef?.current) {
      internalDepthRef.current = pointerDepthRef.current;
    } else if (pointerDepth) {
      internalDepthRef.current = pointerDepth;
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isMobile = false;
    let isVisible = true;
    let time = 0;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    function resize() {
      if (!canvas || !container || !ctx) return;
      const rect = container.getBoundingClientRect();
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextWidth = Math.floor(rect.width);
      const nextHeight = Math.floor(rect.height);

      if (nextWidth === 0 || nextHeight === 0) return;

      if (width !== nextWidth || height !== nextHeight || dpr !== nextDpr) {
        width = nextWidth;
        height = nextHeight;
        dpr = nextDpr;
        isMobile = width < 768;

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        if (prefersReducedMotion) {
          render();
        }
      }
    }

    // Grid coordinates & anchor geometry
    const isDark = document.documentElement.classList.contains('dark') || theme === 'dark';
    
    // Peripheral coordinate anchors (placed outside reading zone)
    const nodes = [
      { bx: 0.14, by: 0.22, depth: 1.2, radius: 2.0, label: '01' },
      { bx: 0.86, by: 0.18, depth: 0.9, radius: 1.8, label: '02' },
      { bx: 0.10, by: 0.82, depth: 1.0, radius: 1.8, label: '03' },
      { bx: 0.90, by: 0.80, depth: 1.3, radius: 2.2, label: '04' },
      { bx: 0.26, by: 0.40, depth: 0.6, radius: 1.4, label: '' },
      { bx: 0.74, by: 0.48, depth: 0.7, radius: 1.4, label: '' },
    ];

    function render() {
      if (!ctx || width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);

      // Direct ref lookup on every frame without triggering any React updates
      const currentDepth = pointerDepthRef?.current || internalDepthRef.current;
      const px = currentDepth.pixelX || 0;
      const py = currentDepth.pixelY || 0;

      // Color tokens
      const strokeBase = isDark 
        ? 'rgba(255, 255, 255, 0.038)' 
        : 'rgba(0, 0, 0, 0.040)';
      
      const dotBase = isDark
        ? 'rgba(255, 255, 255, 0.14)'
        : 'rgba(0, 0, 0, 0.16)';
      
      const accentGlow = isDark
        ? 'rgba(10, 132, 255, 0.045)' // Apple Blue Dark
        : 'rgba(0, 122, 255, 0.035)'; // Apple Blue Light

      // 1. Subtle background ambient focal glow (moves 1–3px with pointer)
      const centerX = width * 0.5 + px * 0.35;
      const centerY = height * 0.46 + py * 0.35;
      const glowRadius = Math.min(width, height) * (isMobile ? 0.38 : 0.46);

      const radialGrad = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, glowRadius
      );
      radialGrad.addColorStop(0, accentGlow);
      radialGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Fine architectural structural guide lines (parallax layered 1–2px)
      ctx.lineWidth = isMobile ? 0.75 : 1;
      ctx.strokeStyle = strokeBase;

      // Subtle horizontal axis
      const horizY = height * 0.50 + py * 0.18;
      ctx.beginPath();
      ctx.moveTo(width * 0.06, horizY);
      ctx.lineTo(width * 0.94, horizY);
      ctx.stroke();

      // Lateral bounds
      const leftX = width * (isMobile ? 0.08 : 0.12) + px * 0.22;
      const rightX = width * (isMobile ? 0.92 : 0.88) + px * 0.22;
      
      ctx.beginPath();
      ctx.moveTo(leftX, height * 0.08);
      ctx.lineTo(leftX, height * 0.92);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(rightX, height * 0.08);
      ctx.lineTo(rightX, height * 0.92);
      ctx.stroke();

      // 3. Render gentle peripheral coordinate nodes
      const renderNodes = isMobile ? nodes.slice(0, 4) : nodes;

      for (const node of renderNodes) {
        const nx = node.bx * width + px * node.depth;
        const ny = node.by * height + py * node.depth;

        // Micro pulse (only if motion is allowed)
        const pulse = prefersReducedMotion ? 1 : Math.sin(time * 0.0012 + node.depth) * 0.15 + 0.90;
        
        ctx.fillStyle = dotBase;
        ctx.beginPath();
        ctx.arc(nx, ny, node.radius * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Subtle crosshair tick on peripheral anchors
        if (node.depth >= 0.9 && !isMobile) {
          ctx.strokeStyle = strokeBase;
          ctx.beginPath();
          ctx.moveTo(nx - 4, ny);
          ctx.lineTo(nx + 4, ny);
          ctx.moveTo(nx, ny - 4);
          ctx.lineTo(nx, ny + 4);
          ctx.stroke();
        }
      }

      // 4. Center Calm Zone: Radial feather mask so text readability remains 100% pristine
      ctx.globalCompositeOperation = 'destination-out';
      const calmRadius = Math.min(width, height) * (isMobile ? 0.45 : 0.40);
      const maskGrad = ctx.createRadialGradient(
        width * 0.5, height * 0.48, 0,
        width * 0.5, height * 0.48, calmRadius
      );
      maskGrad.addColorStop(0, 'rgba(0, 0, 0, 0.48)');
      maskGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.18)');
      maskGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = maskGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      if (!prefersReducedMotion && isVisible && !document.hidden) {
        time += 16;
        animId = requestAnimationFrame(render);
      } else {
        animId = 0;
      }
    }

    function startLoop() {
      if (prefersReducedMotion) {
        render();
      } else if (!animId && isVisible && !document.hidden) {
        animId = requestAnimationFrame(render);
      }
    }

    function stopLoop() {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Pause rendering when hero is outside the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry?.isIntersecting ?? true;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);

    // Pause rendering when browser tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (isVisible) {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Respect user toggling prefers-reduced-motion
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        stopLoop();
        render();
      } else if (isVisible && !document.hidden) {
        startLoop();
      }
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    startLoop();

    return () => {
      stopLoop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      mediaQuery.removeEventListener('change', handleMotionChange);
      observer.disconnect();
    };
  }, [theme]); // Strictly theme only; canvas lifecycle is never destroyed on pointer coordinate changes

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block opacity-90 transition-opacity duration-500" 
      />
    </div>
  );
};

export default HeroField;

