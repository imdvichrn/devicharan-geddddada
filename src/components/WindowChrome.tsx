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
      // Default close behavior - close current window/tab
      window.close();
    }
  };

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize();
    } else {
      // Default minimize behavior - minimize browser window
      if (document.documentElement.requestFullscreen && document.fullscreenElement) {
        document.exitFullscreen();
      }
      // Note: True window minimization requires native app context
    }
  };

  const handleZoom = () => {
    if (onZoom) {
      onZoom();
    } else {
      // Default zoom behavior - toggle fullscreen
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(console.error);
      } else {
        document.exitFullscreen().catch(console.error);
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