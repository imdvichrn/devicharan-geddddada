import React from 'react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Sparkles, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';

export interface CaseStudyBlockProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Editorial Case Study Section Container
 */
export function CaseStudySection({
  title,
  kicker,
  intro,
  children,
  className = '',
}: {
  title?: string;
  kicker?: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`space-y-8 ${className}`}>
      {(title || kicker || intro) && (
        <ScrollReveal distance={16}>
          <div className="space-y-2 max-w-3xl">
            {kicker && (
              <div className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
                {kicker}
              </div>
            )}
            {title && (
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
                {title}
              </h2>
            )}
            {intro && (
              <p className="text-base text-muted-foreground leading-relaxed">
                {intro}
              </p>
            )}
          </div>
        </ScrollReveal>
      )}
      <div className="space-y-6">{children}</div>
    </section>
  );
}

/**
 * Editorial Text Paragraph Block
 */
export function CaseStudyTextBlock({
  lead,
  children,
  staggerIndex = 0,
}: {
  lead?: boolean;
  children: React.ReactNode;
  staggerIndex?: number;
}) {
  return (
    <ScrollReveal staggerIndex={staggerIndex} distance={14}>
      <div
        className={`text-muted-foreground leading-relaxed ${
          lead ? 'text-base sm:text-lg text-foreground/90 font-normal' : 'text-sm sm:text-base'
        }`}
      >
        {children}
      </div>
    </ScrollReveal>
  );
}

/**
 * Technical Detail / Architecture Specification Block
 */
export function CaseStudyTechnicalBlock({
  label = 'Technical Detail',
  items,
  staggerIndex = 1,
}: {
  label?: string;
  items: { key: string; value: string }[] | string[];
  staggerIndex?: number;
}) {
  const isKeyVal = items.length > 0 && typeof items[0] !== 'string';

  return (
    <ScrollReveal staggerIndex={staggerIndex} distance={16}>
      <div className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/30 backdrop-blur-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary font-medium">
          <Terminal size={14} />
          <span>{label}</span>
        </div>

        {isKeyVal ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {(items as { key: string; value: string }[]).map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-border/40 bg-background/50 space-y-1">
                <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">{item.key}</span>
                <span className="text-foreground font-medium text-xs">{item.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
            {(items as string[]).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-primary font-mono text-xs mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ScrollReveal>
  );
}

/**
 * Result & Observation Block (Delivered outcome & key metric reflection)
 */
export function CaseStudyObservationBlock({
  type = 'worked',
  title,
  children,
  staggerIndex = 2,
}: {
  type?: 'worked' | 'challenge' | 'learned';
  title: string;
  children: React.ReactNode;
  staggerIndex?: number;
}) {
  const isWorked = type === 'worked';
  const isChallenge = type === 'challenge';

  const colorClass = isWorked
    ? 'text-emerald-500 border-emerald-500/30 bg-emerald-500/5'
    : isChallenge
    ? 'text-amber-500 border-amber-500/30 bg-amber-500/5'
    : 'text-primary border-primary/30 bg-primary/5';

  const Icon = isWorked ? CheckCircle2 : isChallenge ? AlertCircle : Sparkles;

  return (
    <ScrollReveal staggerIndex={staggerIndex} distance={16}>
      <div className={`p-6 sm:p-8 rounded-2xl border ${colorClass} space-y-3`}>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold">
          <Icon size={15} />
          <span>{title}</span>
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </ScrollReveal>
  );
}
