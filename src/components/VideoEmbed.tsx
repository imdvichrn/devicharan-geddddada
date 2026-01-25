interface VideoEmbedProps {
  youtubeId: string;
  title?: string;
  className?: string;
}

export function VideoEmbed({ youtubeId, title = "Video player", className = "" }: VideoEmbedProps) {
  return (
    <div className={`relative w-full aspect-video rounded-lg overflow-hidden shadow-xl ${className}`}>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
      />
    </div>
  );
}
