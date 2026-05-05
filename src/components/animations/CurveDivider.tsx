'use client';

import { useGSAP } from '@gsap/react';
import { useRef, type ReactNode } from 'react';

export interface CurveDividerProps {
  /** Cor de cima (origem) — default white. */
  fromColor?: string;
  /** Cor de baixo (destino) — default neutral-50 (`#F7F9FC`). */
  toColor?: string;
  /** Altura em px — default 120. */
  height?: number;
}

/**
 * CurveDivider — Story 1.3 (FR-027, AC-12, Efeito #4).
 *
 * Divider entre Hero e Seção 2. Em desktop, anima o `clip-path` polygon
 * via `ScrollTrigger scrub: 1` simulando uma onda que "engole" a seção
 * superior à medida que o usuário rola. Em mobile e em
 * `prefers-reduced-motion: reduce`, mostra uma versão estática SVG
 * simplificada para preservar LCP/INP (NFR-005).
 *
 * Implementação composicional:
 * - Estado base: SVG path estático (curva suave).
 * - Desktop não-reduzido: GSAP anima o `path d` com scrub.
 */
export function CurveDivider({
  fromColor = '#FFFFFF',
  toColor = '#F7F9FC',
  height = 120,
}: CurveDividerProps): ReactNode {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    async () => {
      if (!wrapperRef.current) return;
      const path = wrapperRef.current.querySelector<SVGPathElement>(
        '[data-curve-path]',
      );
      if (!path) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
          isMobileOrReduced:
            '(max-width: 768px), (prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          if (ctx.conditions?.isMobileOrReduced) {
            // Estado final estático.
            return;
          }
          if (ctx.conditions?.isDesktop) {
            // Anima d-attribute do path com scrub.
            gsap.fromTo(
              path,
              { attr: { d: 'M0,0 C300,0 600,0 1200,0 L1200,120 L0,120 Z' } },
              {
                attr: {
                  d: 'M0,0 C300,120 600,120 1200,0 L1200,120 L0,120 Z',
                },
                ease: 'none',
                scrollTrigger: {
                  trigger: wrapperRef.current!,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1,
                },
              },
            );
          }
        },
      );

      return () => mm.revert();
    },
    { scope: wrapperRef },
  );

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="relative w-full overflow-hidden leading-[0]"
      style={{ background: fromColor, height }}
    >
      <svg
        viewBox={`0 0 1200 ${height}`}
        preserveAspectRatio="none"
        className="block h-full w-full"
        focusable="false"
      >
        <path
          data-curve-path
          d={`M0,0 C300,80 600,80 1200,0 L1200,${height} L0,${height} Z`}
          fill={toColor}
        />
      </svg>
    </div>
  );
}
