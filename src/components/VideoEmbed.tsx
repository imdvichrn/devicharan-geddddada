import { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoEmbedProps {
  youtubeId: string;
  title?: string;
  className?: string;
}

export function VideoEmbed({ youtubeId, title = "Video player", className = "" }: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(
    `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  );
  const [thumbnailError, setThumbnailError] = useState(false);

  /**
   * Thumbnail Fallback Strategy
   * If maxresdefault.jpg fails to load, automatically fall back to hqdefault.jpg
   * This ensures reliable thumbnail loading for all YouTube videos
   */
  const handleThumbnailError = () => {
    if (!thumbnailError) {
      setThumbnailError(true);
      setThumbnailUrl(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
    }
  };

  return (
    <div className={`relative w-full aspect-video min-h-[300px] rounded-lg overflow-hidden shadow-xl bg-black ${className}`}>
      {!isLoaded ? (
        // Facade: Show thumbnail with play button until clicked
        <button
          onClick={() => setIsLoaded(true)}
          className="absolute inset-0 w-full h-full group cursor-pointer"
          aria-label={`Play ${title}`}
        >
          {/* YouTube Thumbnail with Fallback Strategy */}
          <img
            src={thumbnailUrl}
            alt={title}
            onError={handleThumbnailError}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            {...({ importance: 'low', fetchPriority: 'low' } as React.ImgHTMLAttributes<HTMLImageElement>)}
          />
          
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
          
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </div>
        </button>
      ) : (
        // Lazy-loaded iframe only after click
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      )}
    </div>
  );
}
