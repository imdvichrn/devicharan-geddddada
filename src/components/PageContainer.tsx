import { ReactNode, createContext, useContext } from 'react';

const PageContainerContext = createContext<boolean>(false);

export interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'default' | 'narrow' | 'wide' | 'hero' | 'full';
  noTopPadding?: boolean;
}

/**
 * PageContainer — Unified Route & Page Layout Container
 * 
 * Central layout component that wraps route components and guarantees consistent:
 * - Fluid header-to-content breathing room via `page-shell-top` (`clamp(5.25rem, 4.1rem + 3.8vw, 8.5rem)`)
 * - Fluid bottom breathing room via `page-shell-bottom` (`clamp(4rem, 2.75rem + 3.2vw, 7.5rem)`)
 * - Responsive container gutters via `page-shell-gutter` (`clamp(1rem, 0.4rem + 2.4vw, 3rem)`)
 * - Symmetrical centering across viewports without manual page-level offsets.
 */
export function PageContainer({
  children,
  className = '',
  maxWidth = 'default',
  noTopPadding = false,
}: PageContainerProps) {
  const isInsideContainer = useContext(PageContainerContext);

  // If already wrapped at the App route level, render children cleanly without duplicate padding/nesting
  if (isInsideContainer) {
    return <>{children}</>;
  }

  const maxWidthClass = {
    narrow: 'max-w-3xl',
    default: 'max-w-[1140px]',
    wide: 'max-w-[1240px]',
    hero: 'max-w-[1080px]',
    full: 'max-w-full',
  }[maxWidth];

  return (
    <PageContainerContext.Provider value={true}>
      <div
        className={`relative w-full min-h-[100dvh] flex flex-col ${
          noTopPadding ? '' : 'page-shell-top'
        } page-shell-bottom text-foreground selection:bg-primary/20 selection:text-primary ${className}`}
      >
        <div className={`w-full ${maxWidthClass} mx-auto page-shell-gutter flex-1 flex flex-col`}>
          {children}
        </div>
      </div>
    </PageContainerContext.Provider>
  );
}

export default PageContainer;
