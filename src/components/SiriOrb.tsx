import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SiriOrbProps {
  className?: string;
  isOpen?: boolean;
}

export function SiriOrb({ className }: SiriOrbProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div
      className={cn("relative overflow-hidden rounded-full w-full h-full flex items-center justify-center", className)}
      style={{
        borderRadius: '50%',
      }}
    >
      <video
        ref={videoRef}
        src="/siri-wave.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onEnded={(e) => {
          const video = e.currentTarget;
          video.currentTime = 0;
          video.play().catch(() => {});
        }}
        className="w-full h-full object-cover rounded-full pointer-events-none"
        style={{
          borderRadius: '50%',
          clipPath: 'circle(50%)'
        }}
      />
    </div>
  );
}
