import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const navItems = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

const productLink = {
  label: 'Perfect Pack',
  path: '/project/perfect-pack-plugin',
  isProduct: true
};

export function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollY = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollY) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // If not on home page, navigate to home with hash
      window.location.href = '/#' + sectionId;
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 md:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('home')}
              className="text-base md:text-xl font-bold text-foreground hover:text-primary transition-all duration-300 hover-scale relative group"
            >
              <span className="relative z-10 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_100%] group-hover:animate-gradient-shift drop-shadow-[0_0_8px_hsl(var(--primary)/0.3)]">
                Devicharan
              </span>
              <span className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-40 bg-gradient-to-r from-primary/50 to-accent/50 transition-opacity duration-300 rounded-lg" />
            </button>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={(e) => {
                    if (isHomePage) {
                      e.preventDefault();
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover-scale cursor-pointer ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  aria-label={`Go to Geddada Devicharan's ${item.label} section`}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Perfect Pack Product Link with New Badge */}
              <Link 
                to={productLink.path}
                className="relative group px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover-scale text-muted-foreground hover:text-primary hover:bg-muted/50"
                aria-label="View Perfect Pack All-In-One Creative Assets - Drag & Drop Integration for Professional Editors"
              >
                {productLink.label}
                <span className="absolute -top-3 -right-4 px-1.5 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full animate-pulse whitespace-nowrap">
                  New
                </span>
              </Link>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0 hover-scale relative group overflow-visible"
              aria-label="Toggle theme"
            >
              <span className="absolute inset-0 rounded-md bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
              {theme === 'light' ? (
                <Moon size={18} className="relative z-10 drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)] group-hover:drop-shadow-[0_0_10px_hsl(var(--primary)/0.7)] transition-all duration-300" />
              ) : (
                <Sun size={18} className="relative z-10 drop-shadow-[0_0_6px_hsl(45_100%_60%/0.5)] group-hover:drop-shadow-[0_0_12px_hsl(45_100%_60%/0.8)] transition-all duration-300" />
              )}
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-9 h-9 p-0 relative group"
                aria-label="Toggle menu"
              >
                <span className="absolute inset-0 rounded-md bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
                {isMenuOpen ? (
                  <X size={18} className="relative z-10 drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)] transition-all duration-300" />
                ) : (
                  <Menu size={18} className="relative z-10 drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)] transition-all duration-300" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-glass-border">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={(e) => {
                    if (isHomePage) {
                      e.preventDefault();
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  aria-label={`Go to Geddada Devicharan's ${item.label} section`}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Perfect Pack Product Link - Mobile */}
              <Link 
                to={productLink.path}
                onClick={() => setIsMenuOpen(false)}
                className="relative block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors text-muted-foreground hover:text-primary hover:bg-muted/50"
                aria-label="View Perfect Pack All-In-One Creative Assets - Drag & Drop Integration for Professional Editors"
              >
                {productLink.label}
                <span className="absolute -top-2 right-3 px-1.5 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full animate-pulse whitespace-nowrap">
                  New
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}