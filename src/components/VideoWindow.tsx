import { useState } from 'react';
import { Play } from 'lucide-react';
import { WindowChrome } from '@/components/WindowChrome';

interface VideoWindowProps {
  youtubeId: string;
  title: string;
  className?: string;
}

/**
 * macOS Safari-style Video Window Component
 * Features glass-morphism effect, window chrome buttons, and thumbnail facade for performance
 */
export function VideoWindow({ youtubeId, title, className = '' }: VideoWindowProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(
    `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  );
  const [thumbnailError, setThumbnailError] = useState(false);

  // Fallback to hqdefault if maxresdefault fails
  const handleThumbnailError = () => {
    if (!thumbnailError) {
      setThumbnailError(true);
      setThumbnailUrl(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
    }
  };

  return (
    <div 
      className={`glass-elevated border-glass-border rounded-xl overflow-hidden shadow-2xl transition-all hover:scale-[1.01] ${className}`}
    >
      {/* macOS Window Header */}
      <div className="bg-background/40 backdrop-blur-md px-4 py-2.5 border-b border-glass-border flex items-center relative">
        <WindowChrome />
        <div className="absolute left-0 right-0 text-center pointer-events-none">
          <span className="text-[10px] md:text-xs text-muted-foreground font-medium truncate px-20 inline-block max-w-full">
            {title} — Safari
          </span>
        </div>
      </div>
      
      {/* Video Player Area */}
      <div className="aspect-video bg-black relative">
        {!isLoaded ? (
          // Thumbnail Facade with Play Button
          <button
            onClick={() => setIsLoaded(true)}
            className="absolute inset-0 w-full h-full group cursor-pointer"
            aria-label={`Play ${title}`}
          >
            {/* YouTube Thumbnail */}
            <img
              src={thumbnailUrl}
              alt={title}
              onError={handleThumbnailError}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
            
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-300 shadow-lg backdrop-blur-sm">
                <Play className="w-7 h-7 md:w-9 md:h-9 text-white fill-white ml-1" />
              </div>
            </div>
          </button>
        ) : (
          // Lazy-loaded iframe after click
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&showinfo=0&autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-none"
          />
        )}
      </div>
    </div>
  );
}
