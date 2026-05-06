'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useRef, type RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);

export type SplitMode = 'chars' | 'words' | 'lines';

export interface UseSplitTextOptions {
  /** Granularidade do split. Default `'words'`. */
  mode?: SplitMode;
  /** Delay entre cada unit. Default 0.04s (chars), 0.08 (words), 0.12 (lines). */
  stagger?: number;
  /** Duração de cada unit. Default 0.6s. */
  duration?: number;
  /** Distância Y inicial em px. Default 24. */
  y?: number;
  /** ScrollTrigger start. Default `'top 85%'`. */
  start?: string;
  /** Trigger uma única vez. Default true. */
  once?: boolean;
  /** Easing. Default `'power3.out'`. */
  ease?: string;
}

/**
 * useSplitText — split + reveal scroll-driven via SplitText (free desde mai/2024).
 *
 * Aplica em qualquer elemento de texto. Respeita `prefers-reduced-motion`
 * e tem cleanup adequado (revert do split + matchMedia).
 *
 * Uso:
 * ```tsx
 * const ref = useSplitText<HTMLHeadingElement>({ mode: 'words' });
 * return <h2 ref={ref}>Texto a animar</h2>;
 * ```
 */
export function useSplitText<T extends HTMLElement = HTMLElement>(
  opts: UseSplitTextOptions = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);

  const mode = opts.mode ?? 'words';
  const defaultStagger = mode === 'chars' ? 0.04 : mode === 'words' ? 0.08 : 0.12;

  useGSAP(
    () => {
      if (!ref.current) return;

      const mm = gsap.matchMedia();
      let split: SplitText | null = null;

      mm.add(
        { reduceMotion: '(prefers-reduced-motion: reduce)' },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) return;

          split = new SplitText(ref.current!, { type: mode, autoSplit: true });
          const targets =
            mode === 'chars' ? split.chars : mode === 'words' ? split.words : split.lines;
          if (targets.length === 0) return;

          gsap.from(targets, {
            opacity: 0,
            y: opts.y ?? 24,
            duration: opts.duration ?? 0.6,
            ease: opts.ease ?? 'power3.out',
            stagger: opts.stagger ?? defaultStagger,
            scrollTrigger: {
              trigger: ref.current!,
              start: opts.start ?? 'top 85%',
              once: opts.once ?? true,
            },
          });
        },
      );

      return () => {
        if (split) split.revert();
        mm.revert();
      };
    },
    { scope: ref, dependencies: [mode] },
  );

  return ref;
}
