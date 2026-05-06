'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, type RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export interface UseDrawSVGOptions {
  /** Selector dos paths a desenhar dentro do scope. Default `'path'`. */
  selector?: string;
  /** Valor inicial de drawSVG. Default `'0%'`. */
  from?: string;
  /** Valor final. Default `'100%'`. */
  to?: string;
  /** Duração total quando `scrub` desabilitado. Default 1.5s. */
  duration?: number;
  /** Stagger entre paths. Default 0.15s. */
  stagger?: number;
  /** Habilita scroll-scrub (path desenha conforme scroll). Default true. */
  scrub?: boolean | number;
  /** ScrollTrigger start. Default `'top 80%'`. */
  start?: string;
  /** ScrollTrigger end (necessário pra scrub). Default `'bottom 30%'`. */
  end?: string;
  /** Easing. Default `'none'` (linear, ideal pra scrub). */
  ease?: string;
}

/**
 * useDrawSVG — desenha paths SVG via DrawSVGPlugin (free desde mai/2024).
 *
 * Ideal pra: filigranas decorativas, linhas conectoras, signatures
 * handwriting-style. Use scrub=true pra "desenhar conforme scrolla".
 *
 * Uso:
 * ```tsx
 * const ref = useDrawSVG<SVGSVGElement>({ scrub: 1 });
 * return <svg ref={ref}><path d="..." /></svg>;
 * ```
 */
export function useDrawSVG<T extends SVGElement = SVGSVGElement>(
  opts: UseDrawSVGOptions = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const paths = ref.current.querySelectorAll<SVGPathElement>(
        opts.selector ?? 'path',
      );
      if (paths.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add(
        { reduceMotion: '(prefers-reduced-motion: reduce)' },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) {
            gsap.set(paths, { drawSVG: '100%' });
            return;
          }

          gsap.fromTo(
            paths,
            { drawSVG: opts.from ?? '0%' },
            {
              drawSVG: opts.to ?? '100%',
              duration: opts.duration ?? 1.5,
              stagger: opts.stagger ?? 0.15,
              ease: opts.ease ?? 'none',
              scrollTrigger: {
                trigger: ref.current!,
                start: opts.start ?? 'top 80%',
                end: opts.end ?? 'bottom 30%',
                scrub: opts.scrub ?? true,
              },
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return ref;
}
