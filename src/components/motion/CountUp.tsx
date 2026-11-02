import React, { useEffect, useRef } from 'react';
import { useInView, useSpring, useTransform, useReducedMotion, motion } from 'framer-motion';

export interface CountUpProps {
  /** Target numeric value to count up to */
  value: number;
  /** Starting numeric value (default: 0) */
  from?: number;
  /** Spring stiffness (default: 65 for smooth cinematic counting) */
  stiffness?: number;
  /** Spring damping (default: 28 for zero overshoot / organic settle) */
  damping?: number;
  /** Spring mass (default: 0.8) */
  mass?: number;
  /** Decimal places to show (default: 0) */
  decimals?: number;
  /** Prefix string e.g. "$" or "~" */
  prefix?: string;
  /** Suffix string e.g. "+", "%" */
  suffix?: string;
  /** Format with locale commas e.g. 10,000 (default: true) */
  formatCommas?: boolean;
  /** Custom CSS className */
  className?: string;
  /** Threshold for triggering in viewport (0 to 1, default: 0.25) */
  threshold?: number;
}

/**
 * CountUp — Framer Motion `useSpring` and `useTransform` Animation Primitive
 *
 * Implements a physics-based spring animation that smoothly rolls numbers from `from`
 * to `value` as the element enters the viewport.
 *
 * Features:
 * - Powered natively by Framer Motion's `useSpring` and `useTransform`
 * - Direct DOM text node manipulation via ref subscription to eliminate React re-render lag
 * - Tabular numerals (`tabular-nums`) to prevent layout shifts during counting
 * - Full `prefers-reduced-motion` compliance (instantly displays final value)
 * - Single viewport trigger with cleanup on unmount
 */
export function CountUp({
  value,
  from = 0,
  stiffness = 65,
  damping = 28,
  mass = 0.8,
  decimals = 0,
  prefix = '',
  suffix = '',
  formatCommas = true,
  className = '',
  threshold = 0.25,
}: CountUpProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: threshold });
  const prefersReducedMotion = useReducedMotion();

  // 1. Framer Motion Spring Value
  const springValue = useSpring(from, {
    stiffness,
    damping,
    mass,
  });

  // 2. Format function
  const formatNumber = (latest: number) => {
    const fixed = latest.toFixed(decimals);
    if (!formatCommas) return fixed;
    const parts = fixed.split('.');
    parts[0] = Number(parts[0]).toLocaleString('en-US');
    return parts.join('.');
  };

  // 3. Transform spring number into formatted string
  const displayString = useTransform(springValue, (latest) => {
    return `${prefix}${formatNumber(latest)}${suffix}`;
  });

  // 4. Trigger spring target when element enters viewport
  useEffect(() => {
    if (prefersReducedMotion) {
      springValue.jump(value);
      return;
    }

    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue, prefersReducedMotion]);

  // 5. Update text node directly for high-frequency 60/120fps DOM updates
  useEffect(() => {
    const unsubscribe = displayString.on('change', (latest) => {
      if (textRef.current) {
        textRef.current.textContent = latest;
      }
    });

    return () => unsubscribe();
  }, [displayString]);

  // Initial text before animation
  const initialText = prefersReducedMotion
    ? `${prefix}${formatNumber(value)}${suffix}`
    : `${prefix}${formatNumber(from)}${suffix}`;

  return (
    <span
      ref={containerRef}
      className={`inline-block font-mono tabular-nums ${className}`}
      aria-label={`${prefix}${formatNumber(value)}${suffix}`}
    >
      <span ref={textRef}>{initialText}</span>
    </span>
  );
}

export default CountUp;
