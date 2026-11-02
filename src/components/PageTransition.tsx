import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  const pageVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: {
          opacity: 0,
          y: 8,
        },
        animate: {
          opacity: 1,
          y: 0,
        },
        exit: {
          opacity: 0,
          y: -4,
        },
      };

  const pageTransition = shouldReduceMotion
    ? { duration: 0.08 }
    : {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      };

  return (
    <motion.div
      layout
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      style={{ 
        willChange: shouldReduceMotion ? 'opacity' : 'opacity, transform',
        width: '100%' 
      }}
    >
      {children}
    </motion.div>
  );
}
