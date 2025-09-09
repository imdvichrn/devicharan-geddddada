import { cn } from "@/lib/utils";

interface SiriOrbProps {
  className?: string;
  isOpen?: boolean;
}

export function SiriOrb({ className }: SiriOrbProps) {
  return (
    <div
      className={cn("w-6 h-6 relative overflow-hidden", className)}
      style={{ background: 'none', padding: 0, margin: 0 }}
    >
      <video
        src="/siri-wave.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={(e) => {
          // Ensure video loops continuously
          const video = e.currentTarget;
          video.currentTime = 0;
          video.play().catch(console.error);
        }}
        onEnded={(e) => {
          // Force restart if loop fails
          const video = e.currentTarget;
          video.currentTime = 0;
          video.play().catch(console.error);
        }}
        style={{ 
          width: '100%', 
          height: '100%', 
          borderRadius: '50%', 
          objectFit: 'cover', 
          display: 'block' 
        }}
      />
    </div>
  );
}