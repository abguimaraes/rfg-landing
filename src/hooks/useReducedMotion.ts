'use client';

import { useEffect, useState } from 'react';

/**
 * Hook SSR-safe que detecta `prefers-reduced-motion: reduce`.
 * Story 1.2 (NFR-014, FR-032).
 *
 * - Server: sempre `false` (default conservador).
 * - Client: atualiza após mount via `matchMedia`.
 * - Reage a mudanças (usuário troca preferência sem reload).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);

    const handler = (event: MediaQueryListEvent): void => {
      setReduced(event.matches);
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reduced;
}
