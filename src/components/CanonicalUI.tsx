import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ArrowRight, ExternalLink } from 'lucide-react';
import { WindowChrome } from '@/components/WindowChrome';

// ---------------------------------------------------------------------------
// 1. WINDOW CONTAINER
// ---------------------------------------------------------------------------
export interface WindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  badge?: React.ReactNode;
  statusText?: string;
  showChrome?: boolean;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  compact?: boolean;
  className?: string;
}

export function Window({
  title,
  badge,
  statusText,
  showChrome = true,
  children,
  headerRight,
  compact = false,
  className = '',
  ...props
}: WindowProps) {
  return (
    <div
      className={`border border-border/60 rounded-2xl bg-card/40 backdrop-blur-md overflow-hidden shadow-xl transition-all duration-300 ${className}`}
      {...props}
    >
      {(showChrome || title || statusText || badge || headerRight) && (
        <div className={`border-b border-border/40 px-5 sm:px-6 ${compact ? 'py-3' : 'py-3.5 sm:py-4'} flex items-center justify-between bg-muted/20 gap-4`}>
          <div className="flex items-center gap-3">
            {showChrome && <WindowChrome />}
            {title && (
              <span className="text-xs font-mono text-muted-foreground truncate hidden sm:inline-block">
                {title}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            {badge && <div>{badge}</div>}
            {statusText && (
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-primary font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>{statusText}</span>
              </div>
            )}
            {headerRight}
          </div>
        </div>
      )}
      <div className={compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8 lg:p-10'}>
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. SECTION HEADER
// ---------------------------------------------------------------------------
export interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  kicker,
  title,
  description,
  action,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/40 ${className}`}>
      <div className="space-y-3 max-w-3xl">
        {kicker && (
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-primary/80" />
            <span>{kicker}</span>
          </div>
        )}
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.05]">
          {title}
        </h2>
        {description && (
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. BACK LINK
// ---------------------------------------------------------------------------
export function BackLink({
  to = '/work',
  label = 'Back to Work',
  className = '',
}: {
  to?: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors group ${className}`}
    >
      <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
      <span>{label}</span>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// 4. CANONICAL BUTTONS
// ---------------------------------------------------------------------------
export function PrimaryButton({
  children,
  href,
  to,
  onClick,
  isExternal = false,
  className = '',
}: {
  children: React.ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void;
  isExternal?: boolean;
  className?: string;
}) {
  const baseClasses = `inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 shadow-sm shrink-0 ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        <span>{children}</span>
        <ArrowRight size={13} />
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={baseClasses}
      >
        <span>{children}</span>
        {isExternal ? <ExternalLink size={13} /> : <ArrowRight size={13} />}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      <span>{children}</span>
    </button>
  );
}

export function SecondaryButton({
  children,
  href,
  to,
  onClick,
  isExternal = false,
  className = '',
}: {
  children: React.ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void;
  isExternal?: boolean;
  className?: string;
}) {
  const baseClasses = `inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium border border-border/80 hover:border-foreground/50 bg-background/50 text-foreground transition-all duration-200 shrink-0 ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        <span>{children}</span>
        <ArrowRight size={13} />
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={baseClasses}
      >
        <span>{children}</span>
        {isExternal ? <ExternalLink size={13} /> : <ArrowRight size={13} />}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      <span>{children}</span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// 5. STATUS / METRIC CHIP
// ---------------------------------------------------------------------------
export function MetricChip({
  label,
  value,
  variant = 'default',
}: {
  label: string;
  value: string;
  variant?: 'default' | 'success' | 'accent' | 'warning';
}) {
  const variantColor = {
    default: 'text-foreground',
    success: 'text-emerald-500',
    accent: 'text-primary',
    warning: 'text-amber-500',
  }[variant];

  return (
    <div className="p-4 rounded-xl border border-border/40 bg-card/30 space-y-1">
      <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">{label}</div>
      <div className={`text-base sm:text-lg font-bold font-mono ${variantColor}`}>{value}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 6. CASE STUDY SECTION BLOCK
// ---------------------------------------------------------------------------
export function CaseStudySectionBlock({
  title,
  subtitle,
  children,
  className = '',
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`p-8 sm:p-10 rounded-2xl border border-border/50 bg-card/25 space-y-6 ${className}`}>
      <div className="space-y-1.5 border-b border-border/30 pb-4">
        <h3 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
      <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  );
}
