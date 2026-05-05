'use client';

import { useGSAP } from '@gsap/react';
import { useRef, type ReactNode } from 'react';

export interface BentoGridProps {
  /** Conteúdo do grid (deve usar `[data-bento-block]` em cada área). */
  children: ReactNode;
  /** Classes adicionais aplicadas ao wrapper. */
  className?: string;
}

/**
 * BentoGrid — Story 1.4 (Effect #7, FR-030, AC-26/27).
 *
 * Mapeia uma timeline GSAP para o scroll do wrapper (`scrub: 1`) em desktop,
 * com cada bloco `[data-bento-block]` entrando em fases diferentes:
 * - Foto: fade-in puro.
 * - Blocos textuais: slide lateral (alternado) + fade.
 * - Citação: fade-up final.
 *
 * Mobile (`max-width: 768px`) reduz para card stagger simples sem scrub.
 * `prefers-reduced-motion: reduce` mantém estado final estático.
 */
export function BentoGrid({
  children,
  className,
}: BentoGridProps): ReactNode {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    async () => {
      if (!ref.current) return;
      const blocks = ref.current.querySelectorAll<HTMLElement>('[data-bento-block]');
      if (blocks.length === 0) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();
      mm.add(
        {
          isMobile: '(max-width: 768px)',
          isDesktop: '(min-width: 769px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) {
            gsap.set(blocks, { opacity: 1, x: 0, y: 0, clearProps: 'all' });
            return;
          }

          if (ctx.conditions?.isMobile) {
            // Mobile — Effect #2 simples (sem scrub).
            gsap.from(blocks, {
              opacity: 0,
              y: 24,
              duration: 0.6,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ref.current!,
                start: 'top 85%',
                once: true,
              },
            });
            return;
          }

          // Desktop — Effect #7 scrubbed timeline.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ref.current!,
              start: 'top 75%',
              end: 'bottom 60%',
              scrub: 1,
            },
          });

          blocks.forEach((block, i) => {
            const variant = block.dataset.bentoVariant ?? 'fade';
            const from: gsap.TweenVars = { opacity: 0 };
            switch (variant) {
              case 'photo':
                from.scale = 0.96;
                break;
              case 'left':
                from.x = -40;
                break;
              case 'right':
                from.x = 40;
                break;
              case 'up':
                from.y = 32;
                break;
              default:
                from.y = 16;
            }
            tl.from(block, { ...from, duration: 0.6, ease: 'power2.out' }, i * 0.15);
          });
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
