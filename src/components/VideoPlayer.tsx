interface VideoPlayerProps {
  videoId: string;
  title?: string;
  className?: string;
}

export function VideoPlayer({ videoId, title = "Video player", className = "" }: VideoPlayerProps) {
  return (
    <div className={`relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-glass-border ${className}`}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        loading="lazy"
      />
    </div>
  );
}
