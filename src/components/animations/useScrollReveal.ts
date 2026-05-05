'use client';

import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

export interface UseScrollRevealOptions {
  /** Delay entre elementos `[data-reveal]` filhos. Default 0.12s. */
  stagger?: number;
  /** Distância em px do `y` inicial. Default 24. */
  y?: number;
  /** Duração da animação em segundos. Default 0.7. */
  duration?: number;
  /** ScrollTrigger start string. Default `'top 80%'`. */
  start?: string;
}

/**
 * Hook canonical de scroll reveal — Story 1.2 (AC-9, ADR-003).
 *
 * Carrega GSAP via dynamic import (mantém fora do bundle inicial), aplica
 * `gsap.matchMedia()` cobrindo `isMobile`, `isDesktop` e `reduceMotion`.
 * Quando `prefers-reduced-motion: reduce` está ativo, mantém estado final
 * (opacity 1) sem animar — atende FR-032/NFR-014.
 *
 * Uso:
 * ```tsx
 * const ref = useScrollReveal();
 * return <section ref={ref}><div data-reveal>...</div></section>;
 * ```
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  opts: UseScrollRevealOptions = {},
) {
  const containerRef = useRef<T>(null);

  useGSAP(
    async () => {
      if (!containerRef.current) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const targets = containerRef.current.querySelectorAll<HTMLElement>('[data-reveal]');
      if (targets.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          isMobile: '(max-width: 768px)',
          isDesktop: '(min-width: 769px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) {
            // Reduced motion → estado final (opacity 1, sem deslocamento)
            gsap.set(targets, { opacity: 1, y: 0, clearProps: 'all' });
            return;
          }
          gsap.from(targets, {
            y: opts.y ?? 24,
            opacity: 0,
            duration: opts.duration ?? 0.7,
            ease: 'power2.out',
            stagger: opts.stagger ?? 0.12,
            scrollTrigger: {
              trigger: containerRef.current!,
              start: opts.start ?? 'top 80%',
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return containerRef;
}
