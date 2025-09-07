import { cn } from "@/lib/utils";

interface SiriOrbProps {
  className?: string;
  isOpen?: boolean;
}

export function SiriOrb({ className, isOpen }: SiriOrbProps) {
  return (
    <div className={cn("relative w-6 h-6", className)}>
      {/* Central white core */}
      <div className="absolute inset-0 rounded-full bg-white shadow-lg animate-siri-core">
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white to-blue-50 animate-pulse"></div>
      </div>
      
      {/* Flowing wave layers */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/40 via-transparent to-cyan-400/40 animate-siri-wave-1"></div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-purple-400/30 to-pink-400/40 animate-siri-wave-2"></div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-cyan-400/35 via-transparent to-blue-500/30 animate-siri-wave-3"></div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-pink-400/25 via-purple-400/20 to-transparent animate-siri-wave-4"></div>
      
      {/* Shimmer overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-siri-shimmer"></div>
      
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300/20 via-purple-300/20 to-cyan-300/20 blur-md animate-siri-glow"></div>
      
      {/* Close indicator when open */}
      {isOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-2.5 h-0.5 bg-gray-600 rounded-full transform rotate-45 absolute"></div>
          <div className="w-2.5 h-0.5 bg-gray-600 rounded-full transform -rotate-45 absolute"></div>
        </div>
      )}
    </div>
  );
}