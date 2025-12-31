import { useEffect, useRef } from 'react';

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let orbs: Orb[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(212, 100%, 70%, ${this.opacity})`;
        ctx!.fill();
      }
    }

    class Orb {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      angle: number;
      angularSpeed: number;

      constructor(color: string, radius: number) {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.radius = radius;
        this.color = color;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() - 0.5) * 0.01;
      }

      update() {
        this.angle += this.angularSpeed;
        this.x += Math.cos(this.angle) * 0.5 + this.speedX;
        this.y += Math.sin(this.angle) * 0.5 + this.speedY;

        // Bounce off edges softly
        if (this.x < -this.radius) this.x = canvas!.width + this.radius;
        if (this.x > canvas!.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas!.height + this.radius;
        if (this.y > canvas!.height + this.radius) this.y = -this.radius;
      }

      draw() {
        const gradient = ctx!.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');

        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();
      }
    }

    const init = () => {
      resize();
      particles = [];
      orbs = [];

      // Create particles
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
      }

      // Create floating orbs with different colors
      orbs.push(new Orb('hsla(212, 100%, 60%, 0.15)', 200));
      orbs.push(new Orb('hsla(270, 95%, 75%, 0.12)', 180));
      orbs.push(new Orb('hsla(180, 80%, 60%, 0.1)', 150));
      orbs.push(new Orb('hsla(340, 90%, 65%, 0.08)', 220));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw orbs (background blobs)
      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });

      // Draw and connect particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections between close particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx!.beginPath();
            ctx!.moveTo(p1.x, p1.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.strokeStyle = `hsla(212, 100%, 70%, ${0.1 * (1 - distance / 100)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_hsla(212,100%,60%,0.15)_0%,_transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_hsla(270,95%,75%,0.12)_0%,_transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_hsla(180,80%,60%,0.08)_0%,_transparent_60%)]" />
      </div>
      
      {/* Animated canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsla(220,25%,8%,0.4)_100%)] pointer-events-none" />
    </>
  );
};
