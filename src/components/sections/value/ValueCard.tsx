'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type ValueCardEffect =
  | 'feature' /* Card 1 dominante: list reveal stagger + counter mega */
  | 'icon-spin' /* Card 2: ícone com spin GSAP no hover */
  | 'gradient-sweep' /* Card 3: gradient sweep animado + parallax interno */
  | 'tilt-glow'; /* Card 4: tilt 3D + hover glow brand */

export interface ValueCardProps {
  /** Variant de efeito visual (define hover/animations específicos). */
  effect: ValueCardEffect;
  /** Classes adicionais (ex: span do bento grid). */
  className?: string;
  /** Conteúdo interno do card (heading, body, decorations). */
  children: ReactNode;
  /** aria-labelledby — id do `<h3>` interno para nomear o `<article>`. */
  ariaLabelledby?: string;
}

/**
 * ValueCard — primitivo do bento ValuePillarsSection (Tier 2 PR #17).
 *
 * Wrapper que aplica em TODOS os cards:
 * - Tilt 3D scope-internal (`useGSAP` + `gsap.matchMedia`) com mouse-follow,
 *   desabilitado em mobile/touch e em `prefers-reduced-motion`.
 * - Hover glow brand (shadow expansion + ring rfg-light) por classes Tailwind.
 * - Estados de focus visíveis (focus-visible ring), atendendo a11y.
 *
 * Efeitos específicos por variant:
 * - `icon-spin`: spin 360° + scale no `[data-card-icon]` no hover.
 * - `gradient-sweep`: anima o `[data-card-sweep]` em loop sutil contínuo
 *   (gradient passando lateralmente).
 * - `feature` / `tilt-glow`: apenas tilt 3D + hover glow.
 *
 * O efeito principal de cada card (list reveal, counter, parallax interno) é
 * aplicado pelos componentes filhos — este componente só monta o invólucro.
 */
export function ValueCard({
  effect,
  className,
  children,
  ariaLabelledby,
}: ValueCardProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isHover: '(hover: hover) and (pointer: fine)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) return;
          if (!ctx.conditions?.isHover) return;

          /* ------- Tilt 3D inline (todos cards) ------- */
          gsap.set(el, {
            transformPerspective: 1200,
            transformStyle: 'preserve-3d',
          });

          const handleMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const max = effect === 'tilt-glow' ? 9 : 6;
            const rotateY = (x - 0.5) * max * 2;
            const rotateX = (0.5 - y) * max * 2;

            gsap.to(el, {
              rotateX,
              rotateY,
              scale: effect === 'tilt-glow' ? 1.025 : 1.015,
              duration: 0.4,
              ease: 'power2.out',
            });
          };

          const handleLeaveTilt = () => {
            gsap.to(el, {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.6,
              ease: 'power3.out',
            });
          };

          el.addEventListener('mousemove', handleMove);
          el.addEventListener('mouseleave', handleLeaveTilt);

          /* ------- Variant icon-spin: spin no [data-card-icon] ------- */
          let iconEnter: (() => void) | null = null;
          let iconLeave: (() => void) | null = null;
          if (effect === 'icon-spin') {
            const icon = el.querySelector<HTMLElement>('[data-card-icon]');
            if (icon) {
              iconEnter = () => {
                gsap.to(icon, {
                  rotate: '+=360',
                  scale: 1.15,
                  duration: 0.9,
                  ease: 'back.out(1.6)',
                });
              };
              iconLeave = () => {
                gsap.to(icon, {
                  scale: 1,
                  duration: 0.4,
                  ease: 'power2.out',
                });
              };
              el.addEventListener('mouseenter', iconEnter);
              el.addEventListener('mouseleave', iconLeave);
            }
          }

          /* ------- Variant gradient-sweep: loop sutil contínuo ------- */
          let sweepTween: gsap.core.Tween | null = null;
          if (effect === 'gradient-sweep') {
            const sweep = el.querySelector<HTMLElement>('[data-card-sweep]');
            if (sweep) {
              gsap.set(sweep, { xPercent: -120, opacity: 0.6 });
              sweepTween = gsap.to(sweep, {
                xPercent: 120,
                duration: 4.5,
                repeat: -1,
                ease: 'sine.inOut',
                yoyo: true,
              });
            }
          }

          return () => {
            el.removeEventListener('mousemove', handleMove);
            el.removeEventListener('mouseleave', handleLeaveTilt);
            if (iconEnter) el.removeEventListener('mouseenter', iconEnter);
            if (iconLeave) el.removeEventListener('mouseleave', iconLeave);
            if (sweepTween) sweepTween.kill();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: ref, dependencies: [effect] },
  );

  return (
    <article
      ref={ref}
      aria-labelledby={ariaLabelledby}
      className={cn(
        // Base — cartão sólido com ring sutil
        'group relative isolate flex h-full flex-col gap-4 overflow-hidden',
        'rounded-2xl border border-neutral-200/80 bg-white p-6 md:p-8',
        'shadow-card-default',
        // Hover: expansão do glow brand + ring
        'transition-[box-shadow,border-color] duration-normal ease-out-soft',
        'hover:border-rfg-light/60 hover:shadow-card-hover',
        // Focus visível (a11y) — keyboard navigation
        'focus-visible:outline-none focus-visible:border-rfg-light',
        'focus-visible:ring-2 focus-visible:ring-rfg-light/60',
        // Will-change pra suavizar tilt em desktop
        'will-change-transform',
        // Variant feature — destaque maior com gradient soft + featured shadow
        effect === 'feature' &&
          'bg-gradient-to-br from-white via-white to-rfg-light/10 shadow-card-featured',
        // Variant tilt-glow — glow contínuo (mais intenso)
        effect === 'tilt-glow' && 'hover:shadow-glow-brand',
        className,
      )}
    >
      {children}
    </article>
  );
}
