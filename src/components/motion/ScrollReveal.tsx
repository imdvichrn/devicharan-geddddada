import React, { useEffect, useRef, useState } from 'react';
import { useScrollMotion } from '@/hooks/useScrollMotion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // In milliseconds
  staggerIndex?: number; // Multiplied by 60ms
  distance?: number; // Movement in px (desktop: 18px default, auto reduced on mobile)
  motionBlur?: boolean; // Whether to apply restrained settle blur (default: true)
  as?: React.ElementType;
  triggerOnce?: boolean;
}

/**
 * Editorial Scroll Reveal Component.
 * Implements "Classical at rest. Modern in motion."
 * - Opacity 0 -> 1
 * - Subtle 12-24px movement (10-14px on mobile)
 * - Restrained motion blur while settling (2.5px -> 0px)
 * - Apple-like easing (cubic-bezier(0.16, 1, 0.3, 1))
 * - Respects scroll velocity (fast scrolling skips/shortens delay & blur)
 * - Single trigger by default
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  staggerIndex = 0,
  distance = 18,
  motionBlur = true,
  as: Component = 'div',
  triggerOnce = true,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasSettled, setHasSettled] = useState(false);
  const { isFastScrolling, prefersReducedMotion } = useScrollMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasSettled(true);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
          setHasSettled(false);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [triggerOnce, prefersReducedMotion]);

  // Mark as fully settled once animation completes to remove any transform/filter overhead
  useEffect(() => {
    if (!isVisible) return;

    const totalDuration = isFastScrolling ? 180 : 500 + delay + staggerIndex * 60;
    const timer = setTimeout(() => {
      setHasSettled(true);
    }, totalDuration);

    return () => clearTimeout(timer);
  }, [isVisible, isFastScrolling, delay, staggerIndex]);

  // If reduced motion is preferred or already settled, render clean static node
  if (prefersReducedMotion || hasSettled) {
    return (
      <Component ref={containerRef} className={className}>
        {children}
      </Component>
    );
  }

  // Calculate dynamic timing based on scroll velocity
  const effectiveDelay = isFastScrolling ? 0 : delay + staggerIndex * 60;
  const effectiveDuration = isFastScrolling ? 220 : 480;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const effectiveDistance = isMobile ? Math.min(distance, 12) : distance;

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : `translate3d(0, ${effectiveDistance}px, 0)`,
    filter: isVisible || !motionBlur || isFastScrolling ? 'blur(0px)' : 'blur(2.5px)',
    transitionProperty: 'opacity, transform, filter',
    transitionDuration: `${effectiveDuration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${effectiveDelay}ms`,
    willChange: isVisible && !hasSettled ? 'opacity, transform, filter' : 'auto',
  };

  return (
    <Component ref={containerRef} style={style} className={className}>
      {children}
    </Component>
  );
}

export default ScrollReveal;
