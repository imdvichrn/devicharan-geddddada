import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Subtle floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-primary/20 rounded-full animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      {/* Gentle gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-xl animate-pulse" 
           style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-xl animate-pulse" 
           style={{ animationDuration: '10s', animationDelay: '4s' }} />
      
      {/* Subtle sparkles */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-0.5 h-0.5 bg-primary/30 rounded-full animate-glow-pulse"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}