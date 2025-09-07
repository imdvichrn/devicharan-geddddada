import { cn } from "@/lib/utils";

interface SiriOrbProps {
  className?: string;
  isOpen?: boolean;
}

export function SiriOrb({ className, isOpen }: SiriOrbProps) {
  return (
    <div className={cn("relative w-6 h-6", className)}>
      {/* Central bright white core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-white shadow-2xl animate-siri-core-pulse"></div>
      </div>
      
      {/* Overlapping translucent wave shapes */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Blue wave shape */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/50 via-blue-300/30 to-transparent animate-siri-wave-blue transform-gpu"></div>
        
        {/* Aqua wave shape */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-cyan-400/45 via-cyan-300/25 to-transparent animate-siri-wave-aqua transform-gpu"></div>
        
        {/* Pink wave shape */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-pink-400/40 via-pink-300/30 to-transparent animate-siri-wave-pink transform-gpu"></div>
        
        {/* Purple wave shape */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400/45 via-purple-300/25 to-transparent animate-siri-wave-purple transform-gpu"></div>
        
        {/* Additional overlapping layers for depth */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-blue-200/20 to-cyan-200/20 animate-siri-flow-1 transform-gpu"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-l from-transparent via-pink-200/15 to-purple-200/15 animate-siri-flow-2 transform-gpu"></div>
      </div>
      
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/10 via-blue-200/5 to-transparent blur-sm animate-siri-outer-glow"></div>
      
      {/* Close indicator when open */}
      {isOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-2.5 h-0.5 bg-gray-700/80 rounded-full transform rotate-45 absolute"></div>
          <div className="w-2.5 h-0.5 bg-gray-700/80 rounded-full transform -rotate-45 absolute"></div>
        </div>
      )}
    </div>
  );
}