'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { forwardRef, useRef, type ReactNode } from 'react';

import { IconBurst } from '@/components/animations/IconBurst';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, SplitText);

export interface TimelineCardProps {
  /** Marco temporal (ex: "1995", "2013", "Hoje"). */
  year: string;
  /** Título curto do marco (Title Case). */
  title: string;
  /** Body literal — preservar copy exata do content file. */
  body: string;
  /** Ícone decorativo (emoji ou SVG). aria-hidden=true. */
  icon: ReactNode;
  /** Classes adicionais para o card wrapper. */
  className?: string;
  /** Prefere counter (numérico) — exibe scramble pra digits. Default true se year é numérico. */
  numeric?: boolean;
}

/**
 * TimelineCard — Tier 2 PR #19.
 *
 * Card individual de cada marco da timeline scroll-driven da OriginStory.
 *
 * Anatomia:
 * - Mega number do ano em `text-mega` (clamp 4-8rem) com gradient white → rfg-light.
 *   Para anos numéricos (1995, 2013, 2026), aplica scramble; para "Hoje", usa
 *   split words (já que scramble com chars não numéricos pode quebrar leitura).
 * - Headline curta com SplitText words.
 * - Body com fade-up.
 * - Ícone decorativo via `IconBurst` (data-burst).
 *
 * Animações:
 * - Estado inicial: opacity 0, y 40 (CSS-driven, SSR-safe).
 * - O componente PAI controla a animação de entrada via [data-timeline-card]
 *   target — esse hook só roda animações INTERNAS (split text + scramble +
 *   icon burst), que disparam no próprio ScrollTrigger.
 *
 * `prefers-reduced-motion`: estados finais aplicados sem animação.
 */
export const TimelineCard = forwardRef<HTMLElement, TimelineCardProps>(
  function TimelineCard(
    { year, title, body, icon, className, numeric: numericProp },
    forwardedRef,
  ) {
    const cardRef = useRef<HTMLElement>(null);
    const yearRef = useRef<HTMLSpanElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const isNumeric = numericProp ?? /^\d+$/.test(year);

    // Combine forwardedRef + cardRef
    const setRefs = (node: HTMLElement | null) => {
      cardRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    };

    useGSAP(
      () => {
        const card = cardRef.current;
        const yearEl = yearRef.current;
        const titleEl = titleRef.current;
        if (!card || !yearEl || !titleEl) return;

        const mm = gsap.matchMedia();
        let split: SplitText | null = null;

        mm.add(
          { reduceMotion: '(prefers-reduced-motion: reduce)' },
          (ctx) => {
            // Reduced motion → estado final imediato
            if (ctx.conditions?.reduceMotion) {
              yearEl.textContent = year;
              return;
            }

            // Year — scramble (numérico) ou split words ("Hoje")
            if (isNumeric) {
              gsap.fromTo(
                yearEl,
                { opacity: 0 },
                {
                  opacity: 1,
                  duration: 0.4,
                  scrambleText: {
                    text: year,
                    chars: '0123456789',
                    speed: 0.8,
                    revealDelay: 0,
                  },
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    once: true,
                  },
                },
              );
            } else {
              // "Hoje" — fade simples já que não tem digits
              yearEl.textContent = year;
              gsap.fromTo(
                yearEl,
                { opacity: 0, y: 12 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    once: true,
                  },
                },
              );
            }

            // Title — split words com stagger
            split = new SplitText(titleEl, { type: 'words', autoSplit: true });
            if (split.words.length > 0) {
              gsap.from(split.words, {
                opacity: 0,
                y: 16,
                duration: 0.5,
                ease: 'power3.out',
                stagger: 0.06,
                delay: 0.15,
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                  once: true,
                },
              });
            }
          },
        );

        return () => {
          if (split) split.revert();
          mm.revert();
        };
      },
      { scope: cardRef, dependencies: [year, title, isNumeric] },
    );

    return (
      <article
        ref={setRefs}
        data-timeline-card
        className={cn(
          'flex w-full max-w-md shrink-0 flex-col gap-5 rounded-2xl p-7 lg:p-9',
          'glass-dark border border-white/10',
          'shadow-card-featured',
          className,
        )}
      >
        {/* Ícone decorativo */}
        <IconBurst className="flex" stagger={0} duration={0.5}>
          <span
            data-burst
            aria-hidden="true"
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full',
              'border border-rfg-light/40 bg-rfg-dark/30 text-2xl text-rfg-light',
            )}
          >
            {icon}
          </span>
        </IconBurst>

        {/* Mega number — ano */}
        <div className="flex flex-col gap-1">
          <span
            ref={yearRef}
            className={cn(
              'font-display font-extrabold leading-[0.9] tracking-[-0.04em]',
              'text-mega-gradient text-display-xl',
            )}
            // Estado inicial: vazio (será preenchido pela animação ou reduced motion)
          >
            {year}
          </span>
        </div>

        {/* Linha separadora */}
        <div
          aria-hidden="true"
          className="h-px w-12 bg-gradient-to-r from-rfg-light/60 to-transparent"
        />

        {/* Headline */}
        <h3
          ref={titleRef}
          className={cn(
            'font-display text-h3 font-semibold leading-tight tracking-tight',
            'text-white',
          )}
        >
          {title}
        </h3>

        {/* Body */}
        <p className="text-body leading-relaxed text-white/75">{body}</p>
      </article>
    );
  },
);
