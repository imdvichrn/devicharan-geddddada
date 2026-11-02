import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlignLeft, ChevronUp, Hash, ListFilter, X, BookOpen } from 'lucide-react';

export interface TocItem {
  id: string;
  text: string;
  level: number; // 2 for H2, 3 for H3
}

interface TableOfContentsProps {
  /** Optional custom container selector to scan for headings. Defaults to 'article' */
  contentSelector?: string;
  /** Custom className for the wrapper */
  className?: string;
}

/**
 * TableOfContents Component with Precision Scroll-Spy
 *
 * Scans article container for H2 and H3 elements, dynamically assigns ids if missing,
 * tracks active section via high-fidelity scroll-position calculation & IntersectionObserver:
 * 1. Desktop sidebar (sticky on large screens >= 1280px / 2xl)
 * 2. Mobile floating quick-jump menu button with smooth collapsible sheet
 * 3. High-fidelity scroll-spy highlighting the currently visible heading based on reader's scroll position
 * 4. Reading progress indicator with dynamic percentage & progress bar
 * 5. Auto-scrolls the sidebar menu list so active heading stays in view even in long articles
 */
export function TableOfContents({
  contentSelector = 'article',
  className = '',
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  // Refs to prevent scroll-locking race conditions during click-navigation
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);
  const activeLinkRef = useRef<HTMLButtonElement | null>(null);

  // Helper to generate slug from text
  const slugify = useCallback((text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/&amp;/g, 'and')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }, []);

  // 1. Scan headings and assign IDs
  useEffect(() => {
    const timer = setTimeout(() => {
      const articleEl = document.querySelector(contentSelector);
      if (!articleEl) return;

      const headingElements = articleEl.querySelectorAll<HTMLHeadingElement>('h2, h3');
      const items: TocItem[] = [];

      headingElements.forEach((el, index) => {
        // Ignore headings inside navigation, footer, or excluded containers
        if (el.closest('nav') || el.closest('footer') || el.closest('[data-no-toc]')) {
          return;
        }

        const rawText = el.innerText || el.textContent || '';
        const cleanText = rawText.trim();
        if (!cleanText) return;

        let id = el.id;
        if (!id) {
          const generated = slugify(cleanText);
          id = generated || `section-${index + 1}`;
          el.id = id;
        }

        // Add scroll-margin to elements so scrolling accounts for fixed header offset
        el.style.scrollMarginTop = '100px';

        items.push({
          id,
          text: cleanText,
          level: el.tagName.toLowerCase() === 'h3' ? 3 : 2,
        });
      });

      setHeadings(items);
      if (items.length > 0) {
        setActiveId(items[0].id);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [contentSelector, slugify]);

  // 2. High-precision Scroll-Spy & reading progress tracker
  useEffect(() => {
    if (headings.length === 0) return;

    let ticking = false;

    const determineActiveHeading = () => {
      // If user just clicked a TOC link, skip scroll spy recalculation until scroll finishes
      if (isClickScrolling.current) return;

      const articleEl = document.querySelector(contentSelector);
      if (!articleEl) return;

      // Calculate total reading progress
      const rect = articleEl.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight > 0) {
        const currentScrolled = -rect.top;
        const pct = Math.min(100, Math.max(0, (currentScrolled / totalHeight) * 100));
        setReadProgress(Math.round(pct));
      }

      // Check if user is near the bottom of the article / page
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const isNearBottom = scrollPosition + windowHeight >= docHeight - 80;

      if (isNearBottom) {
        // Activate last heading
        setActiveId(headings[headings.length - 1].id);
        return;
      }

      // Read offset threshold: 120px below top of viewport (just below header)
      const thresholdY = 130;
      let currentActive = headings[0].id;

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id);
        if (!el) continue;

        const headingTop = el.getBoundingClientRect().top;
        // If heading has reached or passed thresholdY, mark it as current
        if (headingTop <= thresholdY) {
          currentActive = headings[i].id;
        } else {
          // Since headings are in chronological order, once a heading is below the threshold,
          // the previously matched heading is the current reading section
          break;
        }
      }

      setActiveId(currentActive);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          determineActiveHeading();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    determineActiveHeading();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [headings, contentSelector]);

  // 3. Keep active link in sidebar visible within TOC scroll container
  useEffect(() => {
    if (activeLinkRef.current && navContainerRef.current) {
      const container = navContainerRef.current;
      const link = activeLinkRef.current;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;
      const linkTop = link.offsetTop - container.offsetTop;
      const linkBottom = linkTop + link.clientHeight;

      if (linkTop < containerTop) {
        container.scrollTo({ top: linkTop - 12, behavior: 'smooth' });
      } else if (linkBottom > containerBottom) {
        container.scrollTo({ top: linkBottom - container.clientHeight + 12, behavior: 'smooth' });
      }
    }
  }, [activeId]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Set lock so scroll listener doesn't flicker while smooth scrolling
    isClickScrolling.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    const navOffset = 96;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - navOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    setActiveId(id);
    setIsMobileOpen(false);

    // Release lock after smooth scroll settles
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  };

  const scrollToTop = () => {
    isClickScrolling.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (headings.length > 0) setActiveId(headings[0].id);
    setIsMobileOpen(false);

    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. DESKTOP SIDEBAR (Sticky on 2xl / wide screens >= 1320px)
         ───────────────────────────────────────────────────────────── */}
      <aside
        aria-label="Table of contents"
        className={`hidden 2xl:block w-64 shrink-0 self-start sticky top-28 ${className}`}
      >
        <div className="glass-panel border border-glass-border rounded-xl p-4 shadow-sm bg-card/75 backdrop-blur-md">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/40 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-foreground font-semibold uppercase tracking-wider">
              <AlignLeft className="w-3.5 h-3.5 text-primary" />
              On this page
            </span>
            <span className="text-[11px] text-muted-foreground font-sans">
              {readProgress}% read
            </span>
          </div>

          {/* Reading progress bar */}
          <div className="w-full bg-border/40 h-1 rounded-full mb-3 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-150 ease-out rounded-full"
              style={{ width: `${readProgress}%` }}
            />
          </div>

          {/* Nav list with Scroll-Spy Active Indicator */}
          <nav
            ref={navContainerRef}
            className="space-y-0.5 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1 text-xs relative"
          >
            {headings.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  ref={isActive ? activeLinkRef : null}
                  onClick={() => scrollToHeading(item.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`group relative w-full text-left py-1.5 px-2 rounded-lg transition-all duration-150 flex items-start gap-2 ${
                    item.level === 3 ? 'pl-4 text-[11px]' : 'text-xs'
                  } ${
                    isActive
                      ? 'text-primary font-medium bg-primary/10 shadow-xs'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  {/* Subtle active left accent pill */}
                  {isActive && (
                    <motion.div
                      layoutId="toc-active-indicator"
                      className="absolute left-0 top-1 bottom-1 w-0.5 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <Hash
                    className={`w-3 h-3 mt-0.5 shrink-0 transition-all duration-150 ${
                      isActive
                        ? 'opacity-100 text-primary scale-110'
                        : 'opacity-40 group-hover:opacity-75'
                    }`}
                  />
                  <span className="line-clamp-2 leading-relaxed">
                    {item.text}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Footer jump link */}
          <div className="pt-3 mt-3 border-t border-border/40">
            <button
              onClick={scrollToTop}
              className="w-full flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors py-1 rounded hover:bg-muted/30"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              Back to top
            </button>
          </div>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          2. MOBILE & TABLET FLOATING TOC MENU (Below 2xl)
         ───────────────────────────────────────────────────────────── */}
      <div className="2xl:hidden">
        {/* Floating trigger button positioned above the fold */}
        <div className="fixed bottom-6 left-6 z-40">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-background/90 text-foreground text-xs font-medium border border-border shadow-lg backdrop-blur-md hover:bg-card hover:border-primary/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Table of contents"
            aria-expanded={isMobileOpen}
          >
            <ListFilter className="w-4 h-4 text-primary" />
            <span className="font-mono text-[11px]">Contents</span>
            <span className="text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded-full">
              {readProgress}%
            </span>
          </motion.button>
        </div>

        {/* Slide-in / Modal Drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 2xl:hidden"
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed bottom-20 left-4 right-4 sm:left-6 sm:right-auto sm:w-80 max-h-[70dvh] z-50 glass-panel border border-glass-border rounded-2xl shadow-2xl bg-card/95 backdrop-blur-xl flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-background/40">
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                    <AlignLeft className="w-4 h-4 text-primary" />
                    <span>Table of Contents</span>
                  </div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-border/40 h-1">
                  <div
                    className="bg-primary h-full transition-all duration-150 rounded-r-full"
                    style={{ width: `${readProgress}%` }}
                  />
                </div>

                {/* Nav Links with Scroll-Spy Active Highlighting */}
                <nav className="p-3 space-y-1 overflow-y-auto flex-1 text-xs">
                  {headings.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToHeading(item.id)}
                        aria-current={isActive ? 'location' : undefined}
                        className={`w-full text-left py-2 px-3 rounded-lg transition-colors flex items-start gap-2.5 ${
                          item.level === 3 ? 'pl-6 text-[11px]' : 'text-xs font-medium'
                        } ${
                          isActive
                            ? 'text-primary bg-primary/10 font-semibold'
                            : 'text-foreground/80 hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <Hash
                          className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                            isActive ? 'text-primary' : 'text-muted-foreground/50'
                          }`}
                        />
                        <span className="line-clamp-2 leading-relaxed">{item.text}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Footer */}
                <div className="p-2 border-t border-border/40 bg-background/30 flex justify-between items-center text-[11px] px-3">
                  <span className="text-muted-foreground">{headings.length} sections</span>
                  <button
                    onClick={scrollToTop}
                    className="flex items-center gap-1 text-primary hover:underline font-medium"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                    Top of article
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
