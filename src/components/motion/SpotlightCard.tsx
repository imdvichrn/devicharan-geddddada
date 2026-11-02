import React, { useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
  maxTiltAngle?: number;
  as?: React.ElementType;
}

/**
 * SpotlightCard — Apple & Linear Inspired Interactive Surface
 *
 * Features:
 * 1. Cursor-reactive radial gradient spotlight tracking cursor coordinates in real time.
 * 2. Subtle 3D gyroscope tilt physics (default max 4°) calculated from center delta.
 * 3. Graceful fallback on mobile touch devices (tilt disabled, static ambient highlight).
 * 4. Full prefers-reduced-motion compliance (disables tilt & animations).
 * 5. Smooth spring return to equilibrium on pointer leave.
 */
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'hsl(var(--primary) / 0.10)',
  enableTilt = true,
  maxTiltAngle = 2.5,
  as: Component = 'div',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover)').matches) {
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    if (enableTilt && !prefersReducedMotion) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Calculate tilt angles (rotateX is derived from Y delta, rotateY from X delta)
      const rotateX = ((y - centerY) / centerY) * -maxTiltAngle;
      const rotateY = ((x - centerX) / centerX) * maxTiltAngle;

      setTilt({ x: rotateX, y: rotateY });
    }
  }, [enableTilt, maxTiltAngle, prefersReducedMotion]);

  const handleMouseEnter = useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover)').matches) {
      return;
    }
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={
        enableTilt && !prefersReducedMotion
          ? {
              rotateX: tilt.x,
              rotateY: tilt.y,
              transformPerspective: 1000,
            }
          : {}
      }
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 30,
        mass: 0.5,
      }}
      className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 backdrop-blur-md transition-colors duration-300 ${className}`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      {!prefersReducedMotion && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Subtle Border Spotlight Line */}
      {!prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl border border-primary/20 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.8 : 0,
            maskImage: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 70%)`,
            WebkitMaskImage: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
