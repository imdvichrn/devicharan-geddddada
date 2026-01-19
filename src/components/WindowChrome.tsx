import profileAvatar from '@/assets/profile-avatar.png';

interface WindowChromeProps {
  className?: string;
  showAvatar?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onZoom?: () => void;
}

export function WindowChrome({ 
  className = "", 
  showAvatar = true,
  onClose, 
  onMinimize, 
  onZoom 
}: WindowChromeProps) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      try {
        window.close();
      } catch (e) {
        if ('minimize' in window && typeof (window as any).minimize === 'function') {
          (window as any).minimize();
        } else {
          window.blur();
        }
      }
    }
  };

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize();
    } else {
      try {
        if ('minimize' in window && typeof (window as any).minimize === 'function') {
          (window as any).minimize();
        } else if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          window.blur();
          document.body.style.visibility = 'hidden';
          setTimeout(() => {
            document.body.style.visibility = 'visible';
            window.focus();
          }, 1000);
        }
      } catch (e) {
        console.log('Minimize not supported in this environment');
      }
    }
  };

  const handleZoom = () => {
    if (onZoom) {
      onZoom();
    } else {
      try {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      } catch (e) {
        if (document.body.style.transform === 'scale(1.1)') {
          document.body.style.transform = 'scale(1)';
          document.body.style.transformOrigin = 'top left';
        } else {
          document.body.style.transform = 'scale(1.1)';
          document.body.style.transformOrigin = 'top left';
          setTimeout(() => {
            document.body.style.transform = 'scale(1)';
          }, 500);
        }
      }
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Traffic Light Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="window-dot red focus:outline-none hover:scale-110 active:scale-95 transition-transform"
          title="Close"
          tabIndex={0}
          onClick={handleClose}
          aria-label="Close"
          style={{ cursor: 'pointer' }}
        />
        <button
          type="button"
          className="window-dot yellow focus:outline-none hover:scale-110 active:scale-95 transition-transform"
          title="Minimize"
          tabIndex={0}
          onClick={handleMinimize}
          aria-label="Minimize"
          style={{ cursor: 'pointer' }}
        />
        <button
          type="button"
          className="window-dot green focus:outline-none hover:scale-110 active:scale-95 transition-transform"
          title="Fullscreen"
          tabIndex={0}
          onClick={handleZoom}
          aria-label="Toggle Fullscreen"
          style={{ cursor: 'pointer' }}
        />
      </div>
      
      {/* Personal Brand Avatar */}
      {showAvatar && (
        <div className="flex items-center gap-2 ml-1">
          <img 
            src={profileAvatar} 
            alt="Devicharan" 
            className="w-6 h-6 rounded-full object-cover object-top border border-primary/30 shadow-sm ring-1 ring-primary/10"
          />
          <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
            Portfolio
          </span>
        </div>
      )}
    </div>
  );
}