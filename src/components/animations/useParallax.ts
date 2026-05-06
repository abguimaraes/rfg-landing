'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, type RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

export interface UseParallaxOptions {
  /** Intensidade vertical em yPercent. Negativo = sobe ao scrollar. Default -20. */
  yPercent?: number;
  /** Intensidade horizontal em xPercent. Default 0. */
  xPercent?: number;
  /** Scrub speed (true ou número de segundos lag). Default true. */
  scrub?: boolean | number;
  /** ScrollTrigger start. Default `'top bottom'`. */
  start?: string;
  /** ScrollTrigger end. Default `'bottom top'`. */
  end?: string;
  /** Reduzir intensidade em mobile (multiplier). Default 0.5. */
  mobileMultiplier?: number;
}

/**
 * useParallax — parallax scroll-driven via yPercent/xPercent + scrub.
 *
 * Ideal pra: backgrounds, ornamentos, fotos. Reduzido em mobile via
 * matchMedia (default 50%). Respeita prefers-reduced-motion.
 *
 * Uso:
 * ```tsx
 * const ref = useParallax<HTMLDivElement>({ yPercent: -30 });
 * return <div ref={ref} className="bg-orb" />;
 * ```
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  opts: UseParallaxOptions = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          isMobile: '(max-width: 768px)',
          isDesktop: '(min-width: 769px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) return;

          const multiplier = ctx.conditions?.isMobile
            ? (opts.mobileMultiplier ?? 0.5)
            : 1;
          const y = (opts.yPercent ?? -20) * multiplier;
          const x = (opts.xPercent ?? 0) * multiplier;

          gsap.fromTo(
            ref.current!,
            { yPercent: 0, xPercent: 0 },
            {
              yPercent: y,
              xPercent: x,
              ease: 'none',
              scrollTrigger: {
                trigger: ref.current!,
                start: opts.start ?? 'top bottom',
                end: opts.end ?? 'bottom top',
                scrub: opts.scrub ?? true,
              },
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: ref, dependencies: [opts.yPercent, opts.xPercent] },
  );

  return ref;
}
