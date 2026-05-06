'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

export interface MegaStatBlockProps {
  /** Valor numérico final (ex: 1200). */
  value: number;
  /** Prefixo opcional (ex: '+'). */
  prefix?: string;
  /** Sufixo curto pós-numero (ex: ''). */
  suffix?: string;
  /** Linha descritiva (ex: 'famílias atendidas'). */
  caption: string;
  /** Label acessível canônico (ex: 'Mais de 1.200 famílias atendidas'). */
  ariaLabel: string;
  /** Duração total scramble + counter — default 1.6s. */
  duration?: number;
  /** Classes adicionais para o wrapper. */
  className?: string;
  /** Classes adicionais para o número mega. */
  numberClassName?: string;
}

const formatNumberPtBR = (value: number): string =>
  Math.round(value).toLocaleString('pt-BR');

/**
 * MegaStatBlock — Tier 2 PR #16.
 *
 * Stat protagonista com efeito UAU em 2 atos:
 *   1. Scramble caótico de caracteres aleatórios (ScrambleTextPlugin, free)
 *      com reveal progressivo durante ~40% do tempo total.
 *   2. Counter numérico atérrissa de 0→`value` (ease power2.out) com glow
 *      brand sutil ao chegar.
 *
 * Padrões obrigatórios:
 * - `gsap.matchMedia()` cobrindo desktop/mobile/reduceMotion.
 * - Em `prefers-reduced-motion: reduce`, mostra valor final imediato (sem
 *   scramble nem tween).
 * - `aria-label` autoritativo no wrapper; conteúdo visual é `aria-hidden`
 *   para evitar leitura repetida durante a transição.
 *
 * Layout: número mega (text-mega) ocupa toda a largura disponível;
 * caption pequeno em rfg-mid abaixo.
 */
export function MegaStatBlock({
  value,
  prefix = '',
  suffix = '',
  caption,
  ariaLabel,
  duration = 1.6,
  className,
  numberClassName,
}: MegaStatBlockProps): ReactNode {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>('');

  useGSAP(
    () => {
      if (!numberRef.current || !wrapperRef.current) return;

      const finalText = `${prefix}${formatNumberPtBR(value)}${suffix}`;

      const mm = gsap.matchMedia();
      mm.add(
        { reduceMotion: '(prefers-reduced-motion: reduce)' },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) {
            // Estado final direto (FR-032/NFR-014).
            setDisplay(finalText);
            return;
          }

          // Pré-condição: começa vazio (placeholder com width preservado por
          // 1ch invisível para evitar layout-shift no primeiro frame).
          setDisplay(' ');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapperRef.current!,
              start: 'top 80%',
              once: true,
            },
          });

          // Ato 1: scramble caótico de caracteres aleatórios em ~40% do tempo.
          // Substitui textContent diretamente via plugin (não passa por React
          // state), restaurado depois para o counter assumir o controle.
          tl.to(numberRef.current!, {
            duration: duration * 0.4,
            ease: 'none',
            scrambleText: {
              text: finalText,
              chars: '0123456789+-/.',
              speed: 0.7,
              revealDelay: 0,
            },
          });

          // Ato 2: counter sobe 0→value (em paralelo, sobrescreve o scramble).
          // Usa onUpdate para sincronizar React state — quando o counter
          // termina, o estado final coincide com o que o scramble revelaria.
          const state = { value: 0 };
          tl.to(
            state,
            {
              value,
              duration: duration * 0.6,
              ease: 'power2.out',
              onUpdate: () => {
                // Override do textContent que o scramble setou no DOM —
                // garante que o counter venca a corrida visualmente.
                if (numberRef.current) {
                  const formatted = `${prefix}${formatNumberPtBR(state.value)}${suffix}`;
                  numberRef.current.textContent = formatted;
                  setDisplay(formatted);
                }
              },
              onComplete: () => {
                if (numberRef.current) {
                  numberRef.current.textContent = finalText;
                  setDisplay(finalText);
                }
              },
            },
            `>-${duration * 0.15}`,
          );

          // Glow pulse na chegada — destaca o "aterrissar" do número.
          tl.fromTo(
            numberRef.current!,
            { filter: 'drop-shadow(0 0 0 rgba(76,179,230,0))' },
            {
              filter: 'drop-shadow(0 0 24px rgba(76,179,230,0.45))',
              duration: 0.4,
              ease: 'power2.out',
              yoyo: true,
              repeat: 1,
            },
            '<+0.1',
          );
        },
      );

      return () => mm.revert();
    },
    { scope: wrapperRef, dependencies: [value, prefix, suffix, duration] },
  );

  return (
    <div
      ref={wrapperRef}
      role="img"
      aria-label={ariaLabel}
      className={cn('flex flex-col gap-2', className)}
    >
      <span
        ref={numberRef}
        aria-hidden="true"
        className={cn(
          'text-mega-gradient font-display font-extrabold',
          'text-mega leading-[0.9] tracking-[-0.045em]',
          'block break-words',
          numberClassName,
        )}
      >
        {display || ' '}
      </span>
      <span
        aria-hidden="true"
        className="font-sans text-body-sm font-medium uppercase tracking-[0.18em] text-rfg-mid"
      >
        {caption}
      </span>
    </div>
  );
}
