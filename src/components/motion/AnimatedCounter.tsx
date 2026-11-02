import React from 'react';
import { CountUp, CountUpProps } from './CountUp';

export interface AnimatedCounterProps extends CountUpProps {}

/**
 * AnimatedCounter
 * Re-exports the high-performance Framer Motion `CountUp` primitive.
 */
export function AnimatedCounter(props: AnimatedCounterProps) {
  return <CountUp {...props} />;
}

export default AnimatedCounter;
