import React, { useState, useEffect } from "react";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";
import { cn } from "@/lib/utils";

interface SiriOrbProps {
  className?: string;
  isOpen?: boolean;
}

export function SiriOrb({ className, isOpen }: SiriOrbProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!dotLottie) return;
    if (prefersReducedMotion) {
      dotLottie.pause();
      dotLottie.setFrame(0);
    } else {
      dotLottie.play();
    }
  }, [dotLottie, prefersReducedMotion]);

  return (
    <div
      className={cn(
        "relative rounded-full w-full h-full aspect-square flex items-center justify-center overflow-hidden select-none bg-transparent border-0 shadow-none outline-none",
        className
      )}
      style={{
        borderRadius: "50%",
        aspectRatio: "1 / 1",
        background: "transparent",
        boxShadow: "none",
        border: "none",
        outline: "none",
      }}
      aria-label="Echoless assistant animation"
    >
      <DotLottieReact
        src="/ECHOLESS.lottie"
        autoplay={!prefersReducedMotion}
        loop={!prefersReducedMotion}
        backgroundColor="transparent"
        dotLottieRefCallback={setDotLottie}
        layout={{
          fit: "contain",
          align: [0.5, 0.5],
        }}
        renderConfig={{
          autoResize: true,
          freezeOnOffscreen: true,
          devicePixelRatio: typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1,
        }}
        className="w-full h-full object-contain pointer-events-none"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}

