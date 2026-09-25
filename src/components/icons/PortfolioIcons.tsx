import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/**
 * 1. DISCIPLINE & PORTFOLIO ICONS
 * Clean, custom geometric SVG icons with uniform 24x24 coordinate grids,
 * optical alignment, and 1.5–1.75px consistent stroke weights.
 */

// Software & Digital Products Icon (Clean layered system & CLI terminal)
export const SoftwareProductIcon: React.FC<IconProps> = ({
  size = 20,
  strokeWidth = 1.6,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`portfolio-icon ${className}`}
    {...props}
  >
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M7 8h2" />
    <path d="M7 12l2.5 2L7 16" />
    <path d="M12 16h5" />
  </svg>
);

// Video & Post-Production Studio Icon (Cinematic node frame & timeline playhead)
export const VideoStudioIcon: React.FC<IconProps> = ({
  size = 20,
  strokeWidth = 1.6,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`portfolio-icon ${className}`}
    {...props}
  >
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="M7 4.5v15" />
    <path d="M17 4.5v15" />
    <path d="M2.5 9.5h4.5" />
    <path d="M2.5 14.5h4.5" />
    <path d="M17 9.5h4.5" />
    <path d="M17 14.5h4.5" />
    <polygon points="10.5 9.5 14.5 12 10.5 14.5 10.5 9.5" fill="currentColor" fillOpacity="0.15" />
  </svg>
);

// Managed Web Ecosystems Icon (Crisp globe with structured grid coordinates)
export const WebEcosystemIcon: React.FC<IconProps> = ({
  size = 20,
  strokeWidth = 1.6,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`portfolio-icon ${className}`}
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="4" ry="9" />
    <path d="M3.5 9h17" />
    <path d="M3.5 15h17" />
  </svg>
);

// Business Systems & Automations Icon (Branching automation flow & webhook nodes)
export const BusinessSystemsIcon: React.FC<IconProps> = ({
  size = 20,
  strokeWidth = 1.6,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`portfolio-icon ${className}`}
    {...props}
  >
    <rect x="3" y="3" width="6" height="6" rx="1.5" />
    <rect x="15" y="3" width="6" height="6" rx="1.5" />
    <rect x="9" y="15" width="6" height="6" rx="1.5" />
    <path d="M6 9v2.5a2.5 2.5 0 0 0 2.5 2.5h7a2.5 2.5 0 0 0 2.5-2.5V9" />
    <path d="M12 14v1" />
  </svg>
);

// Cloud Sync & Architecture Icon (Google Drive direct client sync)
export const CloudSyncIcon: React.FC<IconProps> = ({
  size = 20,
  strokeWidth = 1.6,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`portfolio-icon ${className}`}
    {...props}
  >
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    <polyline points="10 13 12 11 14 13" />
    <line x1="12" y1="11" x2="12" y2="16" />
  </svg>
);

// Color Science & Grading Icon (Node-based ACES / YRGB color management)
export const ColorScienceIcon: React.FC<IconProps> = ({
  size = 20,
  strokeWidth = 1.6,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`portfolio-icon ${className}`}
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a9 9 0 0 1 9 9c0 3-2 5-5 5h-1a2 2 0 0 0-2 2v1a1 1 0 0 1-1 1" />
    <circle cx="8" cy="10" r="1.2" fill="currentColor" />
    <circle cx="12" cy="7.5" r="1.2" fill="currentColor" />
    <circle cx="16" cy="10" r="1.2" fill="currentColor" />
  </svg>
);

// Editorial Writing & Build Log Icon
export const WritingLedgerIcon: React.FC<IconProps> = ({
  size = 20,
  strokeWidth = 1.6,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`portfolio-icon ${className}`}
    {...props}
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
    <path d="M8 7h8" />
    <path d="M8 11h8" />
    <path d="M8 15h5" />
  </svg>
);

// Verified Checkmark Micro Badge
export const VerifiedCheckIcon: React.FC<IconProps> = ({
  size = 14,
  strokeWidth = 2,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`portfolio-icon ${className}`}
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.12" />
    <polyline points="9 12 11 14 15 9" />
  </svg>
);

/**
 * 2. OFFICIAL BRAND MARKS
 * Exact, recognizable, unmodified SVG vectors for external brands.
 */

// Official GitHub Logo
export const OfficialGithubIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`brand-icon ${className}`}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

// Official Instagram Logo
export const OfficialInstagramIcon: React.FC<IconProps> = ({
  size = 16,
  strokeWidth = 1.75,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`brand-icon ${className}`}
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={strokeWidth + 0.5} />
  </svg>
);

// Official LinkedIn Logo
export const OfficialLinkedinIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`brand-icon ${className}`}
    {...props}
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

// Official WhatsApp Logo
export const OfficialWhatsappIcon: React.FC<IconProps> = ({
  size = 16,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`brand-icon ${className}`}
    {...props}
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.25-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" />
  </svg>
);
