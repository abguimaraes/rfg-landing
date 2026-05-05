'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState, type ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger);

export interface CounterTweenProps {
  /** Valor final (e.g. 1200). */
  to: number;
  /** Valor inicial — default 0. */
  from?: number;
  /** Duração em segundos — default 1.2. */
  duration?: number;
  /** Prefixo opcional (ex: "+"). */
  prefix?: string;
  /** Sufixo opcional (ex: " famílias atendidas"). */
  suffix?: string;
  /** Formatador customizado (default: `Math.round` + locale pt-BR). */
  format?: (value: number) => string;
  /** Label acessível. */
  ariaLabel?: string;
  /** Classes adicionais. */
  className?: string;
}

const formatNumberPtBR = (value: number): string =>
  Math.round(value).toLocaleString('pt-BR');

/**
 * CounterTween — Story 1.3, AC-20 (FR-028, Efeito #5).
 *
 * Anima um número de `from` -> `to` ao entrar viewport (ScrollTrigger 80%).
 * Em `prefers-reduced-motion: reduce`, mostra o valor final direto sem animar.
 *
 * Uso:
 * ```tsx
 * <CounterTween to={1200} prefix="+" suffix=" famílias atendidas" />
 * ```
 */
export function CounterTween({
  to,
  from = 0,
  duration = 1.2,
  prefix = '',
  suffix = '',
  format = formatNumberPtBR,
  ariaLabel,
  className,
}: CounterTweenProps): ReactNode {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(format(from));

  useGSAP(
    () => {
      if (!ref.current) return;

      const mm = gsap.matchMedia();
      mm.add(
        { reduceMotion: '(prefers-reduced-motion: reduce)' },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) {
            setDisplay(format(to));
            return;
          }
          const state = { value: from };
          gsap.to(state, {
            value: to,
            duration,
            ease: 'power2.out',
            onUpdate: () => setDisplay(format(state.value)),
            onComplete: () => setDisplay(format(to)),
            scrollTrigger: {
              trigger: ref.current!,
              start: 'top 80%',
              once: true,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: ref, dependencies: [to, from, duration] },
  );

  return (
    <span
      ref={ref}
      className={className}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      <span aria-hidden={ariaLabel ? 'true' : undefined}>
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  );
}
