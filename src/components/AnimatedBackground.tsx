const stars = [
  { top: '5%', left: '10%', delay: '0s', size: 2 },
  { top: '12%', left: '85%', delay: '1.5s', size: 1.5 },
  { top: '20%', left: '25%', delay: '0.8s', size: 1 },
  { top: '15%', left: '60%', delay: '2.2s', size: 2 },
  { top: '30%', left: '5%', delay: '1s', size: 1.5 },
  { top: '35%', left: '90%', delay: '0.3s', size: 1 },
  { top: '45%', left: '15%', delay: '2.5s', size: 2 },
  { top: '40%', left: '70%', delay: '1.8s', size: 1.5 },
  { top: '55%', left: '40%', delay: '0.5s', size: 1 },
  { top: '60%', left: '95%', delay: '2s', size: 2 },
  { top: '65%', left: '8%', delay: '1.2s', size: 1.5 },
  { top: '70%', left: '55%', delay: '0.7s', size: 1 },
  { top: '75%', left: '30%', delay: '2.8s', size: 2 },
  { top: '80%', left: '80%', delay: '1.5s', size: 1.5 },
  { top: '85%', left: '45%', delay: '0.2s', size: 1 },
  { top: '90%', left: '12%', delay: '2.3s', size: 2 },
  { top: '8%', left: '45%', delay: '1.1s', size: 1 },
  { top: '25%', left: '75%', delay: '0.6s', size: 1.5 },
  { top: '50%', left: '88%', delay: '1.9s', size: 1 },
  { top: '95%', left: '65%', delay: '0.9s', size: 1.5 },
];

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Floating orbs with smooth infinite animations */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-float-slow"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
          top: '10%',
          left: '10%',
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl animate-float-medium"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)',
          top: '50%',
          right: '10%',
        }}
      />
      <div 
        className="absolute w-[300px] h-[300px] rounded-full opacity-10 blur-3xl animate-float-fast"
        style={{
          background: 'radial-gradient(circle, hsl(212, 100%, 70%) 0%, transparent 70%)',
          bottom: '20%',
          left: '30%',
        }}
      />

      {/* Twinkling stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-foreground/40 animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
          }}
        />
      ))}
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(var(--background))_80%)] opacity-60" />
    </div>
  );
};
