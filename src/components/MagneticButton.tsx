import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
  [key: string]: any;
}

const MagneticButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, MagneticButtonProps>(
  ({ children, className = '', ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      // Calculate distance from center
      const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const maxDistance = 100; // Magnetic pull range

      if (distance < maxDistance && isHovering) {
        // Calculate pull strength (stronger closer to button)
        const pullStrength = (1 - distance / maxDistance) * 15;
        
        setButtonPosition({
          x: mouseX * 0.3 * (pullStrength / 15),
          y: mouseY * 0.3 * (pullStrength / 15),
        });
      } else {
        setButtonPosition({ x: 0, y: 0 });
      }

      setMousePosition({ x: mouseX, y: mouseY });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setButtonPosition({ x: 0, y: 0 });
    };

    const Element = props.asChild ? 'a' : 'button';

    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative inline-block"
      >
        <motion.div
          animate={buttonPosition}
          transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          className="w-full"
        >
          <Element
            ref={ref as any}
            className={`relative inline-block ${className}`}
            {...props}
          >
            {children}
          </Element>
        </motion.div>
      </div>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
