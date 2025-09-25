interface WindowChromeProps {
  className?: string;
}

import { useContext } from 'react';
// We'll use a context to control the chatbot panel from the window chrome
// but fallback to window events if not available

export function WindowChrome({ className = "", onClose, onMinimize, onZoom }: WindowChromeProps & {
  onClose?: () => void;
  onMinimize?: () => void;
  onZoom?: () => void;
}) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      // Close current window/tab or minimize if that fails
      try {
        window.close();
      } catch (e) {
        // If window.close() fails, try to minimize to taskbar
        if ('minimize' in window && typeof (window as any).minimize === 'function') {
          (window as any).minimize();
        } else {
          // Fallback: blur/unfocus the window
          window.blur();
        }
      }
    }
  };

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize();
    } else {
      // Try different minimize approaches
      try {
        if ('minimize' in window && typeof (window as any).minimize === 'function') {
          (window as any).minimize();
        } else if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          // Simulate minimize by blurring and reducing visibility
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
      // Toggle fullscreen mode
      try {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      } catch (e) {
        // Fallback: toggle between normal and maximized viewport
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
    <div className={`flex items-center gap-2 ${className}`}>
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
  );
}