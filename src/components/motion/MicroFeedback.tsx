import React, { useState } from 'react';
import { Download } from 'lucide-react';

export type MicroFeedbackState = 'idle' | 'loading' | 'success' | 'downloading' | 'downloaded' | 'error';

/**
 * 1. Minimalist SVG Spinner (Apple-style 1.5px stroke)
 */
export function SVGLoadingSpinner({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`animate-spin ${className}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" className="opacity-20" />
      <path d="M12 3a9 9 0 0 1 9 9" className="opacity-90 stroke-current" />
    </svg>
  );
}

/**
 * 2. Animated Success Checkmark (Crisp stroke drawing + gentle settle)
 */
export function SVGSuccessCheckmark({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.8"
        className="opacity-25"
      />
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeDasharray="56.5"
        strokeDashoffset="56.5"
        className="animate-[stroke-draw_400ms_cubic-bezier(0.16,1,0.3,1)_forwards]"
      />
      <path
        d="M7.5 12.2l3 3 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="14"
        strokeDashoffset="14"
        className="animate-[stroke-draw_350ms_cubic-bezier(0.16,1,0.3,1)_120ms_forwards]"
      />
    </svg>
  );
}

/**
 * 3. Animated Download Confirmation Icon
 */
export function SVGDownloadCompleted({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2"
        className="opacity-70"
      />
      <path
        d="M7.5 11.5l3.5 3.5 5.5-5.5"
        strokeDasharray="14"
        strokeDashoffset="14"
        className="animate-[stroke-draw_350ms_cubic-bezier(0.16,1,0.3,1)_forwards] text-emerald-500"
      />
    </svg>
  );
}

/**
 * 4. Animated Subscription / Notification Bell Icon
 */
export function SVGSubscriptionSuccess({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" className="opacity-40" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" className="opacity-40" />
      <circle
        cx="18"
        cy="6"
        r="4.5"
        className="fill-primary stroke-none animate-[ping_1.2s_cubic-bezier(0,0,0.2,1)_1] opacity-60"
      />
      <circle
        cx="18"
        cy="6"
        r="3.5"
        className="fill-primary stroke-background stroke-1"
      />
      <path
        d="M16.8 6l0.9 0.9 1.6-1.6"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 5. Animated Restrained Error Icon
 */
export function SVGErrorCross({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 animate-[shake_300ms_ease-in-out] ${className}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" className="text-destructive/30 stroke-current" />
      <path
        d="M15 9l-6 6M9 9l6 6"
        stroke="currentColor"
        strokeWidth="2"
        className="text-destructive"
      />
    </svg>
  );
}

/**
 * Interactive Download CV Button with physical micro-interaction feedback
 */
export function DownloadCVButton({
  className = '',
  cvUrl = '/Geddada_Devicharan_CV.pdf',
}: {
  className?: string;
  cvUrl?: string;
}) {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'downloaded'>('idle');

  const handleDownload = () => {
    if (downloadState !== 'idle') return;
    setDownloadState('downloading');

    // Trigger download
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Geddada_Devicharan_CV.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadState('downloaded');
      setTimeout(() => {
        setDownloadState('idle');
      }, 3200);
    }, 450);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloadState === 'downloading'}
      aria-label={downloadState === 'downloaded' ? 'CV Downloaded' : 'Download Curriculum Vitae'}
      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 h-11 sm:h-12 rounded-xl text-xs sm:text-sm font-medium depth-surface depth-interactive hover:bg-muted/70 text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 transition-all ${
        downloadState === 'downloaded' ? 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5' : ''
      } ${className}`}
    >
      {downloadState === 'idle' && (
        <>
          <Download size={14} strokeWidth={1.75} className="shrink-0" />
          <span>Download CV</span>
        </>
      )}
      {downloadState === 'downloading' && (
        <>
          <SVGLoadingSpinner size={14} className="text-primary shrink-0" />
          <span>Downloading...</span>
        </>
      )}
      {downloadState === 'downloaded' && (
        <>
          <SVGDownloadCompleted size={14} className="text-emerald-500 shrink-0" />
          <span className="font-medium">CV Downloaded</span>
        </>
      )}
    </button>
  );
}
