import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface HeadingRevealProps {
  text: string;
  className?: string;
}

/**
 * HeadingReveal — Premium, restrained typography entrance
 *
 * Reveals heading text using a smooth clipping mask with a subtle light sweep.
 * Respects prefers-reduced-motion for accessibility.
 */
export function HeadingReveal({ text, className = '' }: HeadingRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <h1 className={className}>{text}</h1>;
  }

  return (
    <div className={`relative overflow-hidden inline-block ${className}`}>
      {/* Base Reveal */}
      <motion.h1
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {text}
        {/* Light Sweep Effect */}
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
        />
      </motion.h1>
    </div>
  );
}

export default HeadingReveal;
