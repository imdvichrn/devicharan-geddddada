import { cn } from "@/lib/utils";
import { Instagram, Facebook, Linkedin } from "lucide-react";

interface SiriOrbProps {
  className?: string;
  isOpen?: boolean;
}

export function SiriOrb({ className }: SiriOrbProps) {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} className="text-muted-foreground" />,
      url: "https://www.linkedin.com/in/devi-charan-1a8b49302/",
    },
    {
      name: "Instagram",
      icon: <Instagram size={20} className="text-muted-foreground" />,
      url: "https://www.instagram.com/imdvichrn/",
    },
    {
      name: "Facebook",
      icon: <Facebook size={20} className="text-muted-foreground" />,
      url: "https://www.facebook.com/userdead.610/",
    },
  ];

  return (
    <div className={cn("relative flex items-center justify-center w-32 h-32", className)}>
      {/* Central Orb */}
      <div
        className="w-16 h-16 relative overflow-hidden rounded-full"
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
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>

      {/* Orbiting Social Icons */}
      <div className="absolute inset-0 animate-spin-slow">
        {socialLinks.map((social, index) => {
          const angle = (index / socialLinks.length) * 360;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-1/2 left-1/2 w-10 h-10 -m-5 flex items-center justify-center bg-background/50 rounded-full backdrop-blur-sm transition-transform duration-300 hover:scale-125"
              style={{
                transform: `rotate(${angle}deg) translate(50px) rotate(-${angle}deg)`,
              }}
            >
              {social.icon}
            </a>
          );
        })}
      </div>
    </div>
  );
}
