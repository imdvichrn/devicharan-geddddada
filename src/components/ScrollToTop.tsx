import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop:
 * - On route change without hash → scroll to top smoothly.
 * - On route change with hash (e.g. /#about) → wait for target to mount,
 *   then smooth-scroll to it with nav-bar offset.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      // Try a few frames in case the section just mounted
      let attempts = 0;
      const tick = () => {
        const el = document.getElementById(id);
        if (el) {
          const navHeight = 64;
          const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else if (attempts++ < 20) {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
}
