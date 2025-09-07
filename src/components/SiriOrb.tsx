import { cn } from "@/lib/utils";

interface SiriOrbProps {
  className?: string;
  isOpen?: boolean;
}

export function SiriOrb({ className, isOpen }: SiriOrbProps) {
  return (
    <div className={cn("relative w-6 h-6", className)}>
      {/* Main orb with animated gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400 animate-siri-pulse">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-400/30 via-transparent to-green-400/30 animate-siri-flow"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-transparent via-aqua-400/40 to-transparent animate-siri-ripple"></div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 blur-sm opacity-60 animate-siri-glow"></div>
      
      {/* Close indicator when open */}
      {isOpen && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-0.5 bg-white/80 rounded-full transform rotate-45 absolute"></div>
          <div className="w-3 h-0.5 bg-white/80 rounded-full transform -rotate-45 absolute"></div>
        </div>
      )}
    </div>
  );
}