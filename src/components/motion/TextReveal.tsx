import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

/**
 * TextReveal — Calm Editorial Typography Word Reveal
 *
 * Splits text into words and reveals them sequentially with subtle upward settle,
 * preserving measurement, layout stability, and accessibility.
 */
export function TextReveal({
  text,
  className = '',
  delay = 0,
  as: Component = 'span',
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');

  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 24,
        stiffness: 280,
      },
    },
    hidden: {
      opacity: 0,
      y: 8,
      transition: {
        type: 'spring' as const,
        damping: 24,
        stiffness: 280,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={child}
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
