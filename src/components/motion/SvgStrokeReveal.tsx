import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface SvgStrokeRevealProps {
  /** SVG elements, icon components, or paths to reveal */
  children: React.ReactNode;
  /** Additional CSS classes for the container */
  className?: string;
  /** Duration of the stroke drawing animation in seconds (default: 1.4) */
  duration?: number;
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number;
}

/**
 * SvgStrokeReveal — Progressive Vector Line Drawing Component
 *
 * Uses Framer Motion's pathLength (animating stroke-dasharray and stroke-dashoffset under the hood)
 * to progressively draw SVG paths and technical iconography as they enter the viewport.
 */
export function SvgStrokeReveal({
  children,
  className = '',
  duration = 1.4,
  delay = 0,
}: SvgStrokeRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={`inline-flex items-center justify-center ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      className={`inline-flex items-center justify-center ${className}`}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
    >
      <motion.div
        variants={{
          hidden: { pathLength: 0, opacity: 0, scale: 0.95 },
          visible: {
            pathLength: 1,
            opacity: 1,
            scale: 1,
            transition: {
              pathLength: { duration, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default SvgStrokeReveal;
