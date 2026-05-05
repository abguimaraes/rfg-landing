'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/tracking';

const MARKS: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100];

/**
 * ScrollDepthTracker — Story 1.2 (AC-15, FR-045).
 *
 * Dispara `scroll_depth` em 25/50/75/100% **uma vez por sessão** (sessionStorage).
 * Usa scroll listener com rAF throttle — leve o suficiente para LCP/CLS.
 */
export function ScrollDepthTracker(): null {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fired = new Set<number>();
    // Recupera marcos já disparados na sessão
    try {
      const raw = window.sessionStorage.getItem('rfg_scroll_depth');
      if (raw) {
        const parsed = JSON.parse(raw) as number[];
        if (Array.isArray(parsed)) parsed.forEach((m) => fired.add(m));
      }
    } catch {
      // ignore
    }

    let ticking = false;

    const evaluate = (): void => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      if (scrollHeight <= 0) return;
      const percent = Math.min(100, Math.round((scrollTop / scrollHeight) * 100));

      for (const mark of MARKS) {
        if (percent >= mark && !fired.has(mark)) {
          fired.add(mark);
          trackEvent('scroll_depth', { percent: mark });
        }
      }

      try {
        window.sessionStorage.setItem('rfg_scroll_depth', JSON.stringify([...fired]));
      } catch {
        // ignore
      }
    };

    const onScroll = (): void => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        evaluate();
        ticking = false;
      });
    };

    // Avalia imediatamente para casos onde o user já está scrollado (refresh)
    evaluate();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return null;
}
