import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isTransitioning: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored === 'light' || stored === 'dark') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);

  const applyThemeWithTransition = useCallback((nextTheme: Theme) => {
    const root = window.document.documentElement;
    
    // Clear any existing transition timers
    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      // Enable coordinated 450ms physical transition across surfaces, borders, shadows, text
      root.classList.add('theme-transitioning');
      setIsTransitioning(true);
    }

    root.classList.remove('light', 'dark');
    root.classList.add(nextTheme);
    localStorage.setItem('theme', nextTheme);
    setThemeState(nextTheme);

    if (!prefersReducedMotion) {
      transitionTimeoutRef.current = window.setTimeout(() => {
        root.classList.remove('theme-transitioning');
        setIsTransitioning(false);
      }, 450);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    applyThemeWithTransition(nextTheme);
  }, [theme, applyThemeWithTransition]);

  const setTheme = useCallback((nextTheme: Theme) => {
    if (nextTheme !== theme) {
      applyThemeWithTransition(nextTheme);
    }
  }, [theme, applyThemeWithTransition]);

  // Initial sync on mount
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, isTransitioning, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
