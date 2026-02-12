import { useState } from 'react';
import { Play } from 'lucide-react';
import { getYoutubeThumbnailFallbacks } from '@/lib/video';

interface VideoEmbedProps {
  youtubeId: string;
  title?: string;
  className?: string;
}

export function VideoEmbed({ youtubeId, title = "Pro-Stream Plugin Demo", className = "" }: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thumb, setThumb] = useState(getYoutubeThumbnailFallbacks(youtubeId)[0]);
  const fallbacks = getYoutubeThumbnailFallbacks(youtubeId);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    const next = fallbacks.find((u) => u !== img.src);
    if (next) setThumb(next);
  };

  return (
    <div className={`relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black/20 border border-white/5 ${className}`}>
      {!isLoaded ? (
        <button
          onClick={() => setIsLoaded(true)}
          className="absolute inset-0 w-full h-full group"
          aria-label={`Watch the Pro-Stream DaVinci Resolve Plugin workflow demonstration by Geddada Devicharan`}
        >
          <img 
            src={thumb} 
            loading="lazy" 
            fetchPriority="low" 
            onError={handleImgError}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            alt={`${title} - Video Production Workflow`} 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] shadow-xl">
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </div>
          </div>
        </button>
      ) : (
        <iframe 
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&modestbranding=1&rel=0`} 
          title={title} 
          className="absolute inset-0 w-full h-full border-0" 
          allowFullScreen 
        />
      )}
    </div>
  );
}
