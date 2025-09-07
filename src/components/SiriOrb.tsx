import { cn } from "@/lib/utils";

interface SiriOrbProps {
  className?: string;
  isOpen?: boolean;
}

export function SiriOrb({ className }: SiriOrbProps) {
  return (
    <video
      src="/siri-wave.webm"
      autoPlay
      loop
      muted
      playsInline
      style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
      className={className}
    />
  );
}