import { useEffect, useState } from 'react';

/* ------------------------------------------------------------------
   Minimal history router.

   The site is a single-page app with no routing dependency, so rather
   than pull one in for a single extra page we push state directly and
   let a `popstate` event fan the change out to every subscriber. That
   keeps navigation a real SPA transition (no reload, no flash of the
   dark body background) while leaving the existing homepage tree and
   its GSAP/Lenis setup completely untouched.
------------------------------------------------------------------ */

const ROUTE_EVENT = 'popstate';

export function navigate(to) {
  if (typeof window === 'undefined') return;

  if (window.location.pathname === to) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent(ROUTE_EVENT));
}

export function usePathname() {
  const [pathname, setPathname] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname
  );

  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    window.addEventListener(ROUTE_EVENT, sync);
    return () => window.removeEventListener(ROUTE_EVENT, sync);
  }, []);

  return pathname;
}

/* Anchor that keeps real href semantics (middle-click, open in new tab,
   crawlers) but upgrades a plain left-click into a client-side push. */
export function routeLinkProps(to, onNavigate) {
  return {
    href: to,
    onClick: (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      onNavigate?.();
      navigate(to);
    },
  };
}
