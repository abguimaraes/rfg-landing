'use client';

import { useGSAP } from '@gsap/react';
import { useRef, type ReactNode } from 'react';

/**
 * GlowPoints — PR #23 (CommitmentSection refactor).
 *
 * Renderiza 5 orbs azul-claro absolute spread pela section, animados em
 * loop sutil (yoyo opacity + leve scale) pra "quebrar" a uniformidade
 * do gradient brand-strong. Todos `aria-hidden`, pointer-events none.
 *
 * Reduced motion: orbs estáticos com opacity final, sem loop.
 */
export function GlowPoints(): ReactNode {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    async () => {
      if (!ref.current) return;
      const orbs = ref.current.querySelectorAll<HTMLElement>('[data-glow-orb]');
      if (orbs.length === 0) return;

      const [{ gsap }] = await Promise.all([import('gsap')]);

      const mm = gsap.matchMedia();
      mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)' }, (ctx) => {
        if (ctx.conditions?.reduceMotion) {
          gsap.set(orbs, { opacity: 0.55, scale: 1, clearProps: 'transform' });
          return;
        }

        // Set inicial — todos visíveis com opacity base.
        gsap.set(orbs, { opacity: 0.45, scale: 1 });

        // Loop infinito sutil — cada orb com duration ligeiramente diferente
        // pra evitar pulse sincronizado (sensação orgânica).
        orbs.forEach((orb, i) => {
          const dur = 3.2 + i * 0.4;
          gsap.to(orb, {
            opacity: 0.75,
            scale: 1.08,
            duration: dur,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 0.3,
          });
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Orb 1 — top-left, médio. */}
      <span
        data-glow-orb
        className="absolute left-[8%] top-[12%] h-48 w-48 rounded-full bg-rfg-light/40 blur-3xl"
      />
      {/* Orb 2 — top-right, pequeno e mais translúcido. */}
      <span
        data-glow-orb
        className="absolute right-[10%] top-[6%] h-32 w-32 rounded-full bg-white/30 blur-2xl"
      />
      {/* Orb 3 — center-right, grande (anchor visual). */}
      <span
        data-glow-orb
        className="absolute right-[-4%] top-[42%] h-72 w-72 rounded-full bg-rfg-light/30 blur-3xl"
      />
      {/* Orb 4 — bottom-left, médio (suporta signature). */}
      <span
        data-glow-orb
        className="absolute -left-10 bottom-[18%] h-56 w-56 rounded-full bg-rfg-mid/35 blur-3xl"
      />
      {/* Orb 5 — bottom-center, pequeno (acento ao redor da signature). */}
      <span
        data-glow-orb
        className="absolute bottom-[8%] left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-rfg-light/25 blur-3xl"
      />
    </div>
  );
}
