import React, { useRef } from 'react';
import { motion, useSpring, useReducedMotion } from 'framer-motion';

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

/**
 * MagneticButton — Tactile Physics-Based Spring Interaction Component
 *
 * Pulls buttons and interactive links slightly toward the cursor on hover using
 * Framer Motion springs, providing a refined "Linear & Apple" precision feel.
 */
export function MagneticButton({
  children,
  className = '',
  onClick,
  as = 'button',
  href,
  target,
  rel,
  disabled,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Spring physics for x and y magnetic displacement
  const x = useSpring(0, { stiffness: 180, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 180, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || disabled) return;
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Pull limit factor (max magnetic shift)
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="inline-block"
    >
      <Component
        onClick={onClick}
        href={href}
        target={target}
        rel={rel}
        disabled={disabled}
        aria-label={ariaLabel}
        className={`relative inline-flex items-center justify-center transition-transform active:scale-95 ${className}`}
      >
        {children}
      </Component>
    </motion.div>
  );
}

export default MagneticButton;
