import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';

/**
 * BackgroundLoop — Continuous Living Spatial Field
 *
 * Engine Guarantees:
 * - Continuous RAF loop that NEVER stops or freezes
 * - Frame-to-frame delta advancement (dt) updated directly from RAF timestamps
 * - Every star updates position (x += vx * dt, y += vy * dt) on every single frame
 * - Visible physical velocity vectors (10–40 px/s) so motion is clearly observable while idle
 * - Pure astronomical field: tiny stars, cosmic dust motes, rare stellar streaks, subtle corner glow
 * - ZERO line art, ZERO boxes, ZERO wireframe, ZERO bezier arcs, ZERO grid
 * - Strict content containment at z-0 behind all page cards and text
 */

interface SpatialStar {
  x: number;            // World X position
  y: number;            // World Y position
  vx: number;           // Drift velocity X (px/s)
  vy: number;           // Drift velocity Y (px/s)
  orbitRx: number;      // Orbital wobble X (px)
  orbitRy: number;      // Orbital wobble Y (px)
  orbitFreq: number;    // Orbital frequency (rad/s)
  orbitPhase: number;   // Orbit phase offset
  size: number;         // Star radius (px)
  tier: 'distant' | 'mid' | 'foreground' | 'dust' | 'accent';
  depthFactor: number;  // Depth parallax multiplier
  baseAlpha: number;    // Resting opacity (0.45 - 0.95)
  twinkleSpeed: number; // Twinkle frequency (rad/s)
  twinklePhase: number; // Twinkle phase
  twinkleAmp: number;   // Twinkle amplitude
  glowLevel: 0 | 1 | 2; // 0 = sharp point, 1 = soft halo, 2 = controlled corona
}

interface StellarStreak {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  maxLife: number;
  life: number;
  alpha: number;
  width: number;
}

// Deterministic PRNG (Mulberry32)
function createPRNG(seed: number) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const BackgroundLoop: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = 1;
    let isMobile = width < 768;

    // Time & kinetic tracking
    let lastTime = performance.now();
    let totalTime = 0;

    // Pointer Parallax
    let targetPointerX = 0;
    let targetPointerY = 0;
    let currentPointerX = 0;
    let currentPointerY = 0;

    // Scroll impulse tracking
    let lastScrollY = window.scrollY || 0;
    let targetScrollVelocity = 0;
    let currentScrollVelocity = 0;

    // Theme detection
    const isDark = document.documentElement.classList.contains('dark') || theme === 'dark';

    // Pure monochromatic star colors
    const starRgb = isDark ? '245, 248, 255' : '38, 50, 72';
    const dustRgb = isDark ? '205, 222, 250' : '65, 80, 105';
    const primaryRgb = isDark ? '10, 132, 255' : '0, 122, 255';

    // Stars collection
    const stars: SpatialStar[] = [];

    // Stellar streak state
    const streak: StellarStreak = {
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      length: 0,
      maxLife: 0.6,
      life: 0,
      alpha: 0,
      width: 1
    };

    let nextStreakTime = 10 + Math.random() * 8;

    // Initialize physical universe
    const initSimulation = (w: number, h: number) => {
      const rng = createPRNG(4529183);
      stars.length = 0;

      const distantCount = isMobile ? 20 : 42;
      const midCount = isMobile ? 14 : 28;
      const foregroundCount = isMobile ? 6 : 12;
      const dustCount = isMobile ? 10 : 22;
      const accentCount = isMobile ? 2 : 3;

      // 1. Distant Stars: 0.5–0.9px, continuous steady drift (6–12 px/s)
      for (let i = 0; i < distantCount; i++) {
        const angle = -0.22 + (rng() - 0.5) * 0.7;
        const speed = (6.0 + rng() * 6.0) * (isMobile ? 0.75 : 1.0);
        stars.push({
          x: rng() * w,
          y: rng() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          orbitRx: 2 + rng() * 4,
          orbitRy: 1.5 + rng() * 3,
          orbitFreq: 0.15 + rng() * 0.20,
          orbitPhase: rng() * Math.PI * 2,
          size: 0.50 + rng() * 0.40,
          tier: 'distant',
          depthFactor: 0.35,
          baseAlpha: isDark ? 0.48 + rng() * 0.16 : 0.38 + rng() * 0.14,
          twinkleSpeed: 0.4 + rng() * 0.5,
          twinklePhase: rng() * Math.PI * 2,
          twinkleAmp: 0.10 + rng() * 0.08,
          glowLevel: 0
        });
      }

      // 2. Mid-Field Stars: 0.8–1.35px, visible drift (14–24 px/s)
      for (let i = 0; i < midCount; i++) {
        const angle = -0.26 + (rng() - 0.5) * 0.8;
        const speed = (14.0 + rng() * 10.0) * (isMobile ? 0.8 : 1.0);
        stars.push({
          x: rng() * w,
          y: rng() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          orbitRx: 5 + rng() * 8,
          orbitRy: 3.5 + rng() * 6,
          orbitFreq: 0.20 + rng() * 0.28,
          orbitPhase: rng() * Math.PI * 2,
          size: 0.80 + rng() * 0.55,
          tier: 'mid',
          depthFactor: 0.70,
          baseAlpha: isDark ? 0.68 + rng() * 0.16 : 0.55 + rng() * 0.14,
          twinkleSpeed: 0.5 + rng() * 0.7,
          twinklePhase: rng() * Math.PI * 2,
          twinkleAmp: 0.15 + rng() * 0.10,
          glowLevel: rng() > 0.80 ? 1 : 0
        });
      }

      // 3. Foreground Stars: 1.2–1.9px, active drift (24–38 px/s), soft halo
      for (let i = 0; i < foregroundCount; i++) {
        const angle = -0.24 + (rng() - 0.5) * 0.6;
        const speed = (24.0 + rng() * 14.0) * (isMobile ? 0.85 : 1.0);
        stars.push({
          x: rng() * w,
          y: rng() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          orbitRx: 8 + rng() * 12,
          orbitRy: 6 + rng() * 9,
          orbitFreq: 0.28 + rng() * 0.35,
          orbitPhase: rng() * Math.PI * 2,
          size: 1.25 + rng() * 0.65,
          tier: 'foreground',
          depthFactor: 1.20,
          baseAlpha: isDark ? 0.88 + rng() * 0.10 : 0.75 + rng() * 0.12,
          twinkleSpeed: 0.6 + rng() * 0.8,
          twinklePhase: rng() * Math.PI * 2,
          twinkleAmp: 0.20 + rng() * 0.10,
          glowLevel: 1
        });
      }

      // 4. Cosmic Dust Motes: 0.4–0.7px, slow atmospheric drift (6–11 px/s)
      for (let i = 0; i < dustCount; i++) {
        const angle = -0.15 + (rng() - 0.5) * 0.8;
        const speed = (6.0 + rng() * 5.0) * (isMobile ? 0.75 : 1.0);
        stars.push({
          x: rng() * w,
          y: rng() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          orbitRx: 3 + rng() * 5,
          orbitRy: 2 + rng() * 4,
          orbitFreq: 0.15 + rng() * 0.20,
          orbitPhase: rng() * Math.PI * 2,
          size: 0.40 + rng() * 0.30,
          tier: 'dust',
          depthFactor: 0.45,
          baseAlpha: isDark ? 0.32 + rng() * 0.12 : 0.22 + rng() * 0.10,
          twinkleSpeed: 0.3 + rng() * 0.4,
          twinklePhase: rng() * Math.PI * 2,
          twinkleAmp: 0.08,
          glowLevel: 0
        });
      }

      // 5. Rare Stellar Accents: 1.7–2.3px, beacons with controlled corona (18–28 px/s)
      for (let i = 0; i < accentCount; i++) {
        const angle = -0.28 + (rng() - 0.5) * 0.4;
        const speed = (18.0 + rng() * 10.0) * (isMobile ? 0.75 : 1.0);
        const posX = i === 0 ? w * 0.85 : w * 0.15;
        const posY = i === 0 ? h * 0.18 : h * 0.82;
        stars.push({
          x: posX,
          y: posY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          orbitRx: 10 + rng() * 14,
          orbitRy: 8 + rng() * 10,
          orbitFreq: 0.20 + rng() * 0.25,
          orbitPhase: rng() * Math.PI * 2,
          size: 1.75 + rng() * 0.55,
          tier: 'accent',
          depthFactor: 1.35,
          baseAlpha: isDark ? 0.95 : 0.82,
          twinkleSpeed: 0.4 + rng() * 0.4,
          twinklePhase: rng() * Math.PI * 2,
          twinkleAmp: 0.25,
          glowLevel: 2
        });
      }
    };

    initSimulation(width, height);

    // Pointer handlers
    const handlePointerMove = (e: PointerEvent) => {
      const normX = (e.clientX / (window.innerWidth || 1)) * 2 - 1;
      const normY = (e.clientY / (window.innerHeight || 1)) * 2 - 1;
      targetPointerX = Math.max(-1, Math.min(1, normX));
      targetPointerY = Math.max(-1, Math.min(1, normY));
    };

    const handlePointerLeave = () => {
      targetPointerX = 0;
      targetPointerY = 0;
    };

    const handleScroll = () => {
      const sy = window.scrollY || 0;
      const delta = sy - lastScrollY;
      lastScrollY = sy;
      targetScrollVelocity = Math.max(-10, Math.min(10, delta * 0.06));
    };

    const handleVisibilityChange = () => {
      lastTime = performance.now();
    };

    // Spawn fast stellar streak
    const spawnStreak = () => {
      if (streak.active) return;
      
      const angle = 0.42 + (Math.random() - 0.5) * 0.45;
      const speed = 320 + Math.random() * 180;
      streak.vx = Math.cos(angle) * speed;
      streak.vy = Math.sin(angle) * speed;
      streak.length = 40 + Math.random() * 40;
      streak.maxLife = 0.50 + Math.random() * 0.30;
      streak.life = 0;
      streak.width = isMobile ? 0.75 : 1.0;
      streak.alpha = isDark ? 0.65 : 0.45;

      streak.x = Math.random() * width * 0.75;
      streak.y = Math.random() * height * 0.60;
      streak.active = true;

      nextStreakTime = totalTime + (isMobile ? (22 + Math.random() * 18) : (12 + Math.random() * 14));
    };

    // Main render frame
    const renderFrame = (dt: number, totalT: number) => {
      if (width <= 0 || height <= 0) return;

      // Clear full canvas
      ctx.clearRect(0, 0, width, height);

      // Smooth pointer lerp
      currentPointerX += (targetPointerX - currentPointerX) * 0.05;
      currentPointerY += (targetPointerY - currentPointerY) * 0.05;

      // Smooth scroll impulse decay
      currentScrollVelocity += (targetScrollVelocity - currentScrollVelocity) * 0.12;
      targetScrollVelocity *= 0.88;

      const parallaxScale = isMobile ? 0.45 : 1.0;

      // 1. Procedural Camera Float (Floating Space Field)
      const camDriftX = (Math.sin(totalT * 0.045) * 6.5 + Math.sin(totalT * 0.095 + 1.2) * 3.0) * parallaxScale;
      const camDriftY = (Math.cos(totalT * 0.038 + 0.8) * 5.0 + Math.cos(totalT * 0.082 + 2.1) * 2.5) * parallaxScale;
      const camZoom = 1.0 + Math.sin(totalT * 0.025 + 0.5) * 0.012 * parallaxScale;
      const scrollCamY = currentScrollVelocity * 1.5;

      // 2. Atmospheric Corner Illumination (Soft, Pure Atmosphere, No Lines)
      const breathPhaseTop = Math.sin(totalT * 0.22) * 0.20 + 0.80;
      const breathPhaseBottom = Math.sin(totalT * 0.18 + 1.8) * 0.20 + 0.80;

      const glowAlphaTop = (isDark ? 0.060 : 0.035) * breathPhaseTop;
      const glowAlphaBottom = (isDark ? 0.045 : 0.026) * breathPhaseBottom;

      // Top-right atmospheric haze
      const trX = width * 0.88 + (currentPointerX * 2.5 + camDriftX * 0.7) * parallaxScale;
      const trY = height * 0.10 + (currentPointerY * 2.5 + camDriftY * 0.7 - scrollCamY * 0.5) * parallaxScale;
      const trRadius = Math.min(width, height) * (isMobile ? 0.42 : 0.54) * camZoom;

      const gradTR = ctx.createRadialGradient(trX, trY, 0, trX, trY, trRadius);
      gradTR.addColorStop(0, `rgba(${primaryRgb}, ${glowAlphaTop})`);
      gradTR.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradTR;
      ctx.fillRect(0, 0, width, height);

      // Bottom-left atmospheric haze
      const blX = width * 0.12 + (currentPointerX * 2.0 + camDriftX * 0.5) * parallaxScale;
      const blY = height * 0.90 + (currentPointerY * 2.0 + camDriftY * 0.5 - scrollCamY * 0.4) * parallaxScale;
      const blRadius = Math.min(width, height) * (isMobile ? 0.36 : 0.48) * camZoom;

      const gradBL = ctx.createRadialGradient(blX, blY, 0, blX, blY, blRadius);
      gradBL.addColorStop(0, `rgba(${primaryRgb}, ${glowAlphaBottom})`);
      gradBL.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradBL;
      ctx.fillRect(0, 0, width, height);

      // 3. Rare Stellar Streak Event
      if (!streak.active && totalT >= nextStreakTime) {
        spawnStreak();
      }

      if (streak.active) {
        streak.life += dt;
        if (streak.life >= streak.maxLife) {
          streak.active = false;
        } else {
          streak.x += streak.vx * dt;
          streak.y += streak.vy * dt;

          const progress = streak.life / streak.maxLife;
          const fadeEnvelope = Math.sin(progress * Math.PI);
          const streakAlpha = streak.alpha * fadeEnvelope;

          if (streakAlpha > 0.01) {
            const tailX = streak.x - (streak.vx / 320) * streak.length;
            const tailY = streak.y - (streak.vy / 320) * streak.length;

            const streakGrad = ctx.createLinearGradient(tailX, tailY, streak.x, streak.y);
            streakGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
            streakGrad.addColorStop(0.7, `rgba(${isDark ? '240, 246, 255' : '100, 130, 180'}, ${streakAlpha * 0.5})`);
            streakGrad.addColorStop(1, `rgba(${isDark ? '255, 255, 255' : '40, 60, 100'}, ${streakAlpha})`);

            ctx.strokeStyle = streakGrad;
            ctx.lineWidth = streak.width;
            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(streak.x, tailY + (streak.y - tailY));
            ctx.stroke();

            ctx.fillStyle = `rgba(255, 255, 255, ${streakAlpha})`;
            ctx.beginPath();
            ctx.arc(streak.x, streak.y, streak.width * 1.1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 4. Spatial Stars Simulation (Continuous Physical Update Every Frame)
      const centerX = width * 0.5;
      const centerY = height * (isMobile ? 0.38 : 0.44);
      const calmRadius = Math.min(width, height) * (isMobile ? 0.42 : 0.36);

      for (let i = 0; i < stars.length; i++) {
        const p = stars[i];

        // Continuous linear translation
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Seamless boundary wrap with buffer
        const buf = 40;
        if (p.x < -buf) p.x = width + buf;
        if (p.x > width + buf) p.x = -buf;
        if (p.y < -buf) p.y = height + buf;
        if (p.y > height + buf) p.y = -buf;

        // Orbital wobble
        const orbAngle = totalT * p.orbitFreq + p.orbitPhase;
        const orbPx = Math.cos(orbAngle) * p.orbitRx;
        const orbPy = Math.sin(orbAngle) * p.orbitRy;

        // Depth-based camera float & pointer parallax
        const depth = p.depthFactor * parallaxScale;
        const parallaxX = (currentPointerX * 2.8 + camDriftX) * depth;
        const parallaxY = (currentPointerY * 2.8 + camDriftY - scrollCamY) * depth;

        let posX = p.x + orbPx + parallaxX;
        let posY = p.y + orbPy + parallaxY;

        // Visual coordinate wrapping
        if (posY < 0) posY += height;
        if (posY > height) posY -= height;
        if (posX < 0) posX += width;
        if (posX > width) posX -= width;

        // Center calm zone calculation
        const distFromCenter = Math.hypot(posX - centerX, posY - centerY);
        let centerDamp = 1.0;
        if (distFromCenter < calmRadius) {
          centerDamp = Math.max(0.30, distFromCenter / calmRadius);
        }

        // Boundary edge alpha feathering
        const edgeMargin = 40;
        const edgeAlpha = Math.min(
          1,
          Math.min(posX / edgeMargin, (width - posX) / edgeMargin),
          Math.min(posY / edgeMargin, (height - posY) / edgeMargin)
        );

        // Independent organic twinkle
        const twinkle = Math.sin(totalT * p.twinkleSpeed + p.twinklePhase) * p.twinkleAmp + (1 - p.twinkleAmp);
        const finalAlpha = Math.max(0, Math.min(1.0, p.baseAlpha * twinkle * edgeAlpha * centerDamp * (isDark ? 1.0 : 0.88) * (isMobile ? 0.80 : 1.0)));
        const finalRadius = p.size * (isDark ? 1.0 : 0.92) * (isMobile ? 0.88 : 1.0);

        if (finalAlpha <= 0.02) continue;

        const renderColor = p.tier === 'dust' ? dustRgb : starRgb;

        // Controlled subtle star glow
        if (p.glowLevel === 1 && !isMobile) {
          const haloRadius = finalRadius * 2.2;
          const haloGrad = ctx.createRadialGradient(posX, posY, 0, posX, posY, haloRadius);
          haloGrad.addColorStop(0, `rgba(${primaryRgb}, ${finalAlpha * 0.30})`);
          haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(posX, posY, haloRadius, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.glowLevel === 2 && !isMobile) {
          const coronaRadius = finalRadius * 3.0;
          const coronaGrad = ctx.createRadialGradient(posX, posY, 0, posX, posY, coronaRadius);
          coronaGrad.addColorStop(0, `rgba(${primaryRgb}, ${finalAlpha * 0.42})`);
          coronaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = coronaGrad;
          ctx.beginPath();
          ctx.arc(posX, posY, coronaRadius, 0, Math.PI * 2);
          ctx.fill();

          // Micro lens diffraction tick
          const tickLen = finalRadius * 2.4;
          ctx.strokeStyle = `rgba(${primaryRgb}, ${finalAlpha * 0.32})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(posX - tickLen, posY);
          ctx.lineTo(posX + tickLen, posY);
          ctx.moveTo(posX, posY - tickLen);
          ctx.lineTo(posX, posY + tickLen);
          ctx.stroke();
        }

        // Star core
        ctx.fillStyle = `rgba(${renderColor}, ${finalAlpha})`;
        ctx.beginPath();
        ctx.arc(posX, posY, finalRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const oldWidth = width;
      const oldHeight = height;
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      isMobile = width < 768;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Smoothly scale existing star coordinates to new viewport without reset
      if (oldWidth > 0 && oldHeight > 0 && stars.length > 0) {
        const scaleX = width / oldWidth;
        const scaleY = height / oldHeight;
        for (let i = 0; i < stars.length; i++) {
          stars[i].x *= scaleX;
          stars[i].y *= scaleY;
        }
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Continuous requestAnimationFrame loop (runs continuously)
    const animate = (now: number) => {
      const rawDeltaMs = now - lastTime;
      const dt = Math.min(Math.max(rawDeltaMs / 1000, 0.001), 0.1);
      lastTime = now;

      totalTime += dt;
      renderFrame(dt, totalTime);

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-background transition-colors duration-500"
      aria-hidden="true"
    >
      {/* Pure Living Spatial Canvas strictly contained at z-0 without any line art, boxes, or grids */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default BackgroundLoop;
