'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, type RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

export interface UseScrambleTextOptions {
  /** Texto final a revelar. Obrigatório. */
  text: string;
  /** Duração total da animação em segundos. Default 1.5s. */
  duration?: number;
  /** Caracteres usados no scramble. Default `'upperAndLowerCase'`. */
  chars?: string;
  /** Velocidade do scramble (0.5–2). Default 0.6. */
  speed?: number;
  /** Revelar texto da esquerda pra direita conforme anima. Default true. */
  revealDelay?: number;
  /** ScrollTrigger start. Default `'top 85%'`. */
  start?: string;
  /** Trigger uma única vez. Default true. */
  once?: boolean;
}

/**
 * useScrambleText — scramble effect via ScrambleTextPlugin (free desde mai/2024).
 *
 * Ideal pra: stats numéricos protagonistas, headlines de impacto,
 * elementos que precisam de "wow" instantâneo.
 *
 * Uso:
 * ```tsx
 * const ref = useScrambleText<HTMLSpanElement>({ text: '1.200' });
 * return <span ref={ref} />;
 * ```
 *
 * O conteúdo inicial do elemento é substituído pelo `text` com efeito.
 */
export function useScrambleText<T extends HTMLElement = HTMLSpanElement>(
  opts: UseScrambleTextOptions,
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const mm = gsap.matchMedia();
      mm.add(
        { reduceMotion: '(prefers-reduced-motion: reduce)' },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) {
            ref.current!.textContent = opts.text;
            return;
          }

          gsap.to(ref.current!, {
            duration: opts.duration ?? 1.5,
            scrambleText: {
              text: opts.text,
              chars: opts.chars ?? 'upperAndLowerCase',
              speed: opts.speed ?? 0.6,
              revealDelay: opts.revealDelay ?? 0,
            },
            scrollTrigger: {
              trigger: ref.current!,
              start: opts.start ?? 'top 85%',
              once: opts.once ?? true,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: ref, dependencies: [opts.text] },
  );

  return ref;
}
