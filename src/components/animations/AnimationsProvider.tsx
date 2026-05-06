'use client';

import { useEffect, type ReactNode } from 'react';

/**
 * AnimationsProvider — registra plugins GSAP globalmente via dynamic import.
 *
 * GSAP é 100% free desde mai/2024 (Webflow). Todos plugins premium
 * (SplitText, DrawSVG, MorphSVG, ScrambleText, MotionPath, Flip, Observer)
 * vêm dentro do pacote `gsap` 3.13+. Mantém pattern de dynamic import para
 * isolar GSAP do chunk shared (ADR-003).
 *
 * Refresh pós-mount em rAF mitiga layout calc antes de fonts/imagens prontas.
 */
export function AnimationsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [
          { gsap },
          { ScrollTrigger },
          { SplitText },
          { DrawSVGPlugin },
          { MorphSVGPlugin },
          { ScrambleTextPlugin },
          { MotionPathPlugin },
          { Flip },
          { Observer },
        ] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
          import('gsap/SplitText'),
          import('gsap/DrawSVGPlugin'),
          import('gsap/MorphSVGPlugin'),
          import('gsap/ScrambleTextPlugin'),
          import('gsap/MotionPathPlugin'),
          import('gsap/Flip'),
          import('gsap/Observer'),
        ]);
        if (cancelled) return;

        gsap.registerPlugin(
          ScrollTrigger,
          SplitText,
          DrawSVGPlugin,
          MorphSVGPlugin,
          ScrambleTextPlugin,
          MotionPathPlugin,
          Flip,
          Observer,
        );
        gsap.config({ nullTargetWarn: false });
        gsap.defaults({ ease: 'power2.out' });

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
