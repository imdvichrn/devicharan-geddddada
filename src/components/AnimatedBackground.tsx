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
