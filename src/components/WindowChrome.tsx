interface WindowChromeProps {
  className?: string;
}

export function WindowChrome({ className = "" }: WindowChromeProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="window-dot red"></div>
      <div className="window-dot yellow"></div>
      <div className="window-dot green"></div>
    </div>
  );
}