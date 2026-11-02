/**
 * Centralized Motion Tokens & Presets (Apple & Linear Restrained Precision)
 * Provides consistent spring configurations, durations, and easings across the portfolio.
 */

export const springPresets = {
  snappy: { type: 'spring' as const, stiffness: 350, damping: 30, mass: 0.8 },
  smooth: { type: 'spring' as const, stiffness: 280, damping: 28, mass: 0.9 },
  gentle: { type: 'spring' as const, stiffness: 200, damping: 25, mass: 1.0 },
  bouncy: { type: 'spring' as const, stiffness: 400, damping: 20, mass: 0.7 },
};

export const easePresets = {
  apple: [0.16, 1, 0.3, 1] as const,
  linear: [0.25, 1, 0.5, 1] as const,
  smoothOut: [0.2, 0.8, 0.2, 1] as const,
};

export const transitionPresets = {
  standard: { duration: 0.25, ease: easePresets.apple },
  quick: { duration: 0.15, ease: easePresets.apple },
  deliberate: { duration: 0.4, ease: easePresets.apple },
};
