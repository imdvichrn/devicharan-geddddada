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
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        className="window-dot red focus:outline-none"
        title="Close"
        tabIndex={0}
        onClick={onClose}
        aria-label="Close"
        style={{ cursor: 'pointer' }}
      />
      <button
        type="button"
        className="window-dot yellow focus:outline-none"
        title="Minimize"
        tabIndex={0}
        onClick={onMinimize}
        aria-label="Minimize"
        style={{ cursor: 'pointer' }}
      />
      <button
        type="button"
        className="window-dot green focus:outline-none"
        title="Zoom"
        tabIndex={0}
        onClick={onZoom}
        aria-label="Zoom"
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
}