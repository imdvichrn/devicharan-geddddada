import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';

interface LiveProjectsButtonProps {
  href?: string;
  label?: string;
}

export function LiveProjectsButton({ 
  href = "https://github.com/yourusername", 
  label = "View Live Projects" 
}: LiveProjectsButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-2xl cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Outer glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Outer stroke border - macOS style */}
      <div className="absolute inset-0 rounded-2xl p-[2px]">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/60 via-accent/60 to-primary/60 opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
          style={{
            backgroundSize: '200% 100%',
            animation: 'gradient-shift 3s linear infinite',
          }}
        />
      </div>

      {/* Inner background - glass effect */}
      <div className="absolute inset-[2px] rounded-[14px] bg-background/90 backdrop-blur-xl group-hover:bg-background/80 transition-colors duration-300" />

      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-[2px] rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['-100% 0%', '200% 0%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Inner stroke highlight - top light reflection */}
      <div className="absolute inset-[2px] rounded-[14px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Sparkle icon with animation */}
      <motion.div
        className="relative z-10"
        animate={{
          rotate: [0, 15, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
      </motion.div>

      {/* Button text */}
      <span className="relative z-10 text-sm md:text-base font-semibold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_100%] group-hover:animate-gradient-shift">
        {label}
      </span>

      {/* External link icon */}
      <motion.div
        className="relative z-10"
        initial={{ x: 0 }}
        whileHover={{ x: 3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-primary/80 group-hover:text-primary transition-colors duration-300 drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)]" />
      </motion.div>

      {/* Pulse ring effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-primary/30"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.a>
  );
}
