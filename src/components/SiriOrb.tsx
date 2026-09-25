import { cn } from "@/lib/utils";

interface SiriOrbProps {
  className?: string;
  isOpen?: boolean;
}

export function SiriOrb({ className }: SiriOrbProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-full", className)}
      style={{ 
        width: '100%', 
        height: '100%', 
        background: 'none', 
        padding: 0, 
        margin: 0,
        borderRadius: '50%'
      }}
    >
      <video
        src="/siri-wave.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={(e) => {
          const video = e.currentTarget;
          video.currentTime = 0;
          video.play().catch(console.error);
        }}
        onEnded={(e) => {
          const video = e.currentTarget;
          video.currentTime = 0;
          video.play().catch(console.error);
        }}
        style={{ 
          width: '100%', 
          height: '100%', 
          borderRadius: '50%', 
          objectFit: 'cover', 
          display: 'block',
          clipPath: 'circle(50%)'
        }}
      />
    </div>
  );
}