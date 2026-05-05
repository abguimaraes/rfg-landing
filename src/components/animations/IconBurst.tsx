'use client';

import { useGSAP } from '@gsap/react';
import { useRef, type ReactNode } from 'react';

export interface IconBurstProps {
  /** Conteúdo (ícones / emojis a animar). */
  children: ReactNode;
  /** Stagger entre ícones (s) — default 0.15. */
  stagger?: number;
  /** Duração de cada ícone (s) — default 0.6. */
  duration?: number;
  /** Classes adicionais para o wrapper. */
  className?: string;
}

/**
 * IconBurst — Story 1.4 (Effect #6, FR-029).
 *
 * Aplica scale-in burst (`scale 0 -> 1`, `back.out(1.7)`) + fade nos elementos
 * filhos marcados com `[data-burst]` quando o wrapper entra no viewport.
 * Stagger 150ms entre ícones; respeita `prefers-reduced-motion: reduce`
 * (estado final estático).
 *
 * Uso:
 * ```tsx
 * <IconBurst>
 *   {pillars.map(p => <span data-burst key={p.titulo}>{p.emoji}</span>)}
 * </IconBurst>
 * ```
 */
export function IconBurst({
  children,
  stagger = 0.15,
  duration = 0.6,
  className,
}: IconBurstProps): ReactNode {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    async () => {
      if (!ref.current) return;
      const targets = ref.current.querySelectorAll<HTMLElement>('[data-burst]');
      if (targets.length === 0) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();
      mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)' }, (ctx) => {
        if (ctx.conditions?.reduceMotion) {
          gsap.set(targets, { scale: 1, opacity: 1, clearProps: 'all' });
          return;
        }
        gsap.fromTo(
          targets,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration,
            ease: 'back.out(1.7)',
            stagger,
            scrollTrigger: {
              trigger: ref.current!,
              start: 'top 85%',
              once: true,
            },
          },
        );
      });

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
