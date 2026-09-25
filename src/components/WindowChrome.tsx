import React from 'react';

interface WindowChromeProps {
  title?: string;
  className?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onZoom?: () => void;
  rightElement?: React.ReactNode;
}

export function WindowChrome({
  title,
  className = "",
  onClose,
  onMinimize,
  onZoom,
  rightElement
}: WindowChromeProps) {
  return (
    <div className={`h-10 px-4 flex items-center justify-between border-b border-border/40 bg-muted/30 select-none ${className}`}>
      {/* Traffic Lights - Precise macOS 12px dots with 8px gap */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close window"
          className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/40 hover:opacity-90 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-400"
        />
        <button
          type="button"
          onClick={onMinimize}
          aria-label="Minimize window"
          className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/40 hover:opacity-90 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
        />
        <button
          type="button"
          onClick={onZoom}
          aria-label="Maximize window"
          className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/40 hover:opacity-90 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
        />
      </div>

      {/* Center Title */}
      {title && (
        <div className="text-xs font-mono text-muted-foreground truncate px-3 text-center pointer-events-none">
          {title}
        </div>
      )}

      {/* Right Element or Spacer for symmetry */}
      <div className="flex items-center gap-2 shrink-0">
        {rightElement || <div className="w-14" />}
      </div>
    </div>
  );
}

export default WindowChrome;
