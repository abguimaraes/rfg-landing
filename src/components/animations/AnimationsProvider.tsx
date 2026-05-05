'use client';

import { useEffect, type ReactNode } from 'react';

/**
 * AnimationsProvider — Story 1.2 (AC-8, ADR-003, Risco R1).
 *
 * Registra ScrollTrigger uma única vez via dynamic import e dispara
 * `ScrollTrigger.refresh()` em `requestAnimationFrame` pós-mount, mitigando
 * layout calc antes de fonts/imagens estarem prontas. NÃO importa GSAP no
 * bundle inicial — `await import()` mantém GSAP fora do chunk shared (ADR-003).
 */
export function AnimationsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        gsap.config({ nullTargetWarn: false });
        gsap.defaults({ ease: 'power2.out' });
        // Refresh pós-mount num próximo frame, evita medir layout estale
        requestAnimationFrame(() => {
          if (!cancelled) ScrollTrigger.refresh();
        });
      } catch {
        // Falha ao carregar GSAP é tolerável — animações são progressive enhancement.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <>{children}</>;
}
