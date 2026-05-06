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
  /**
   * Habilita animação from→to ao entrar viewport. Default `false` —
   * mostra valor final imediato (evita "+0" no SSR/initial render
   * quando ScrollTrigger não disparou ainda).
   */
  animate?: boolean;
}

const formatNumberPtBR = (value: number): string =>
  Math.round(value).toLocaleString('pt-BR');

/**
 * CounterTween — Story 1.3 (FR-028).
 *
 * Exibe número com prefix/suffix opcionais. Por padrão renderiza valor
 * FINAL imediatamente (sem animação) — garante que NUNCA aparece "+0"
 * no SSR/initial render mesmo se ScrollTrigger não disparar.
 *
 * Quando `animate={true}` é passado explicitamente:
 * - Em SSR/initial render: mostra valor final (sem flash de 0)
 * - Pré-mount cliente: reseta pra `from` se elemento ainda não está
 *   visível e anima até `to` quando entrar viewport (ScrollTrigger 80%)
 * - Em `prefers-reduced-motion: reduce`: mostra valor final direto
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
  animate = false,
}: CounterTweenProps): ReactNode {
  const ref = useRef<HTMLSpanElement>(null);
  // SSR/initial: SEMPRE valor final — evita "+0" antes do ScrollTrigger.
  const [display, setDisplay] = useState<string>(format(to));

  useGSAP(
    () => {
      if (!animate || !ref.current) return;
      // Se elemento já está visível (acima ou dentro do viewport) ao
      // montar, NÃO anima — fica no valor final pra não causar flash
      // 1.200 → 0 → 1.200.
      const rect = ref.current.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight;
      if (alreadyVisible) return;

      const mm = gsap.matchMedia();
      mm.add(
        { reduceMotion: '(prefers-reduced-motion: reduce)' },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) return; // valor final já está
          // Reset visual pra `from` ANTES da animação começar
          setDisplay(format(from));
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
    { scope: ref, dependencies: [to, from, duration, animate] },
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
