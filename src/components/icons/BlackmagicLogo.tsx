interface BlackmagicLogoProps {
  className?: string;
}

export function BlackmagicLogo({ className = "w-6 h-6" }: BlackmagicLogoProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="currentColor" 
      className={className} 
      aria-label="Blackmagic Design logo"
      role="img"
    >
      <rect width="100" height="100" rx="20" className="fill-foreground/10 dark:fill-foreground/15" />
      {/* Sleek geometric emblem representing Blackmagic Design diamond structure */}
      <path 
        d="M50 16 L84 50 L50 84 L16 50 Z" 
        className="fill-none stroke-primary stroke-[5]" 
      />
      <path 
        d="M50 28 L72 50 L50 72 L28 50 Z" 
        className="fill-primary/20 stroke-primary stroke-[3]" 
      />
      <circle cx="50" cy="50" r="8" className="fill-primary" />
    </svg>
  );
}
