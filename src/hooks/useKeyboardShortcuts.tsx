import { useEffect } from 'react';

interface KeyboardShortcuts {
  [key: string]: () => void;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for modifier keys
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isCtrlOrCmd = isMac ? event.metaKey : event.ctrlKey;
      
      // Create key combination string
      let keyCombo = '';
      if (isCtrlOrCmd) keyCombo += 'ctrl+';
      if (event.altKey) keyCombo += 'alt+';
      if (event.shiftKey) keyCombo += 'shift+';
      keyCombo += event.key.toLowerCase();

      // Execute shortcut if it exists
      if (shortcuts[keyCombo]) {
        event.preventDefault();
        shortcuts[keyCombo]();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

// Predefined shortcut combinations
export const createPortfolioShortcuts = (callbacks: {
  toggleChat?: () => void;
  scrollToTop?: () => void;
  scrollToContact?: () => void;
  toggleFullscreen?: () => void;
  downloadCV?: () => void;
  openProjects?: () => void;
}) => ({
  // Chat shortcuts
  'ctrl+shift+c': callbacks.toggleChat || (() => {}),
  'c': () => {
    // Only trigger if not in input field
    if (document.activeElement?.tagName !== 'INPUT' && 
        document.activeElement?.tagName !== 'TEXTAREA') {
      callbacks.toggleChat?.();
    }
  },
  
  // Navigation shortcuts
  'ctrl+home': callbacks.scrollToTop || (() => {}),
  'home': () => {
    if (document.activeElement?.tagName !== 'INPUT' && 
        document.activeElement?.tagName !== 'TEXTAREA') {
      callbacks.scrollToTop?.();
    }
  },
  'ctrl+shift+m': callbacks.scrollToContact || (() => {}),
  
  // Fullscreen
  'f11': callbacks.toggleFullscreen || (() => {}),
  'f': () => {
    if (document.activeElement?.tagName !== 'INPUT' && 
        document.activeElement?.tagName !== 'TEXTAREA') {
      callbacks.toggleFullscreen?.();
    }
  },
  
  // Download CV
  'ctrl+d': callbacks.downloadCV || (() => {}),
  'd': () => {
    if (document.activeElement?.tagName !== 'INPUT' && 
        document.activeElement?.tagName !== 'TEXTAREA') {
      callbacks.downloadCV?.();
    }
  },
  
  // Projects
  'ctrl+p': callbacks.openProjects || (() => {}),
  'p': () => {
    if (document.activeElement?.tagName !== 'INPUT' && 
        document.activeElement?.tagName !== 'TEXTAREA') {
      callbacks.openProjects?.();
    }
  },
  
  // Escape key
  'escape': () => {
    // Exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
});