import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll tracking refs to avoid per-pixel re-renders
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const scrollThreshold = 14;

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY.current;

          // Check if scrolled past top buffer
          setIsScrolled(currentScrollY > 20);

          // Scroll direction logic with threshold
          if (currentScrollY <= 60) {
            // Always show header near the very top of the page
            setIsVisible(true);
          } else if (delta > scrollThreshold) {
            // Scrolling down meaningfully -> hide header
            setIsVisible(false);
          } else if (delta < -scrollThreshold) {
            // Scrolling up meaningfully -> show header
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // Handle Escape key to close open menus
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const isWorkActive = [
    '/works',
    '/work', 
    '/software', 
    '/products', 
    '/video', 
    '/video-editing', 
    '/web', 
    '/websites', 
    '/systems', 
    '/perfect-pack', 
    '/project'
  ].some((prefix) => location.pathname === prefix || location.pathname.startsWith(`${prefix}/`));

  const navItems = [
    { label: 'Home', path: '/', isActive: location.pathname === '/' },
    { label: 'Works', path: '/works', isActive: isWorkActive },
    { label: 'Experiments', path: '/experiments', isActive: location.pathname.startsWith('/experiments') },
    { label: 'Writing', path: '/writing', isActive: location.pathname.startsWith('/writing') },
    { label: 'About', path: '/about', isActive: location.pathname.startsWith('/about') || location.pathname.startsWith('/skills') },
    { label: 'Contact', path: '/contact', isActive: location.pathname.startsWith('/contact') },
  ];

  const isHeaderVisible = isVisible || isMobileMenuOpen;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          isScrolled && !isMobileMenuOpen
            ? 'bg-background/85 backdrop-blur-md border-b border-border/30 shadow-[0_4px_24px_rgba(0,0,0,0.08)]' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1240px] 2xl:max-w-[1380px] mx-auto page-shell-gutter h-[var(--header-height)] flex items-center justify-between">
          
          {/* Brand Anchor: Geddada Devicharan (@imdvichrn) */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm font-medium tracking-tight text-foreground hover:opacity-85 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded px-1 py-1 min-h-[44px]"
            aria-label="Geddada Devicharan home"
          >
            <div className="relative w-5 h-5 shrink-0">
              <img 
                src="/masters/logo-dark-mode.png" 
                alt="Geddada Devicharan logo mark" 
                width="20"
                height="20"
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-150 ${theme === 'dark' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              />
              <img 
                src="/masters/logo-light-mode.png" 
                alt="Geddada Devicharan logo mark" 
                width="20"
                height="20"
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-150 ${theme === 'light' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              />
            </div>
            <span className="font-semibold tracking-tight text-base sm:text-sm">Geddada Devicharan</span>
            <span className="text-[11px] text-muted-foreground/70 hidden lg:inline-flex items-center gap-1.5 font-mono">
              <span>@imdvichrn</span>
              <span className="w-1.5 h-1.5 rounded-full bg-highlight shadow-[0_0_6px_hsl(var(--highlight))]" title="Active portfolio" />
            </span>
          </Link>

          {/* Desktop Navigation with Soft Rounded Bubble Active State */}
          <nav 
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-1.5 text-xs font-medium"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={item.isActive ? 'page' : undefined}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-150 active:scale-95 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  item.isActive 
                    ? 'bg-primary/10 text-primary font-semibold border border-primary/25 shadow-xs' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Action: Interactive Theme toggle + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px] h-11 w-11 sm:h-9 sm:w-9 rounded-xl depth-surface depth-interactive text-muted-foreground hover:text-foreground flex items-center justify-center shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {theme === 'dark' ? (
                <Sun size={16} aria-hidden="true" className="text-amber-400" />
              ) : (
                <Moon size={16} aria-hidden="true" className="text-foreground" />
              )}
            </button>

            {/* Mobile hamburger button with accessible 44px target */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="md:hidden min-h-[44px] min-w-[44px] h-11 w-11 rounded-xl depth-surface depth-interactive text-muted-foreground hover:text-foreground flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {isMobileMenuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Unclipped Full-Viewport Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="md:hidden fixed inset-0 z-50 bg-background flex flex-col justify-between overflow-y-auto overflow-x-hidden animate-in fade-in-0 duration-200"
          style={{ height: '100dvh' }}
        >
          {/* Mobile Menu Top Header Bar with Safe-Area Inset */}
          <div className="h-16 px-4 pt-[max(0.5rem,env(safe-area-inset-top))] flex items-center justify-between border-b border-border/40 shrink-0">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground min-h-[44px] py-1"
            >
              <div className="relative w-5 h-5 shrink-0">
                <img 
                  src="/masters/logo-dark-mode.png" 
                  alt="Geddada Devicharan logo mark" 
                  width="20"
                  height="20"
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-150 ${theme === 'dark' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                />
                <img 
                  src="/masters/logo-light-mode.png" 
                  alt="Geddada Devicharan logo mark" 
                  width="20"
                  height="20"
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-150 ${theme === 'light' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                />
              </div>
              <span>Geddada Devicharan</span>
              <span className="text-[11px] text-muted-foreground/70 font-mono">@imdvichrn</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="min-h-[44px] min-w-[44px] h-11 w-11 rounded-xl border border-border/50 bg-card/50 text-muted-foreground hover:text-foreground flex items-center justify-center"
              >
                {theme === 'dark' ? (
                  <Sun size={16} aria-hidden="true" className="text-amber-400" />
                ) : (
                  <Moon size={16} aria-hidden="true" className="text-foreground" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="min-h-[44px] min-w-[44px] h-11 w-11 rounded-xl border border-border/50 bg-card/50 text-muted-foreground hover:text-foreground flex items-center justify-center"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Navigation Links with 50px+ Touch Target & Clear Active State */}
          <div className="p-4 space-y-1.5 flex-1 min-h-0 overflow-y-auto">
            <div className="text-[10px] font-mono uppercase tracking-widest text-primary font-medium px-4 py-2">
              Navigation
            </div>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-150 min-h-[50px] ${
                  item.isActive 
                    ? 'bg-primary/10 text-primary font-semibold border border-primary/25 shadow-xs' 
                    : 'text-foreground hover:bg-muted/50 border border-transparent'
                }`}
              >
                <span className="text-base font-medium">{item.label}</span>
                {item.isActive ? (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                ) : (
                  <span className="text-xs font-mono text-muted-foreground/50">→</span>
                )}
              </Link>
            ))}
          </div>

          {/* Footer note with safe-area spacing */}
          <div className="p-4 pt-3 border-t border-border/40 shrink-0 pb-[max(1.25rem,env(safe-area-inset-bottom))] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-foreground font-medium">Geddada Devicharan</span>
              <span className="text-[11px] text-muted-foreground font-mono">AP, India</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Digital Product Builder · Video Editor · Digital Systems
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation;
