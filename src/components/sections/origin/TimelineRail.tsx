'use client';

import { type ReactNode } from 'react';

import { useDrawSVG } from '@/components/animations/useDrawSVG';
import { cn } from '@/lib/utils';

export interface TimelineRailProps {
  /** Classes adicionais. */
  className?: string;
  /** Modo de orientação. Default `'horizontal'`. */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * TimelineRail — Tier 2 PR #19.
 *
 * Linha SVG conectora entre os marcos da timeline. Usa `useDrawSVG` com
 * scrub para que a linha "se desenhe" conforme o usuário scrolla — em
 * desktop a linha horizontal acompanha o pin; em mobile a linha vertical
 * é desenhada conforme cada marco aparece.
 *
 * Decorativo: `aria-hidden="true"`. Recebe `pointer-events-none` para não
 * interferir em interações.
 *
 * Stroke gradient white → rfg-light → white para criar fluidez tonal sobre
 * surface-deep-rich.
 */
export function TimelineRail({
  className,
  orientation = 'horizontal',
}: TimelineRailProps): ReactNode {
  // Scrub linear — desenha conforme scroll progride.
  const ref = useDrawSVG<SVGSVGElement>({
    scrub: true,
    start: 'top 85%',
    end: 'bottom 20%',
    ease: 'none',
  });

  if (orientation === 'vertical') {
    return (
      <svg
        ref={ref}
        aria-hidden="true"
        viewBox="0 0 4 1000"
        preserveAspectRatio="none"
        className={cn(
          'pointer-events-none absolute h-full w-1',
          'opacity-60',
          className,
        )}
      >
        <defs>
          <linearGradient id="rail-vert-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="20%" stopColor="rgba(76,179,230,0.6)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.85)" />
            <stop offset="80%" stopColor="rgba(76,179,230,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
          </linearGradient>
        </defs>
        <path
          d="M2 0 L2 1000"
          stroke="url(#rail-vert-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 2000 4"
      preserveAspectRatio="none"
      className={cn(
        'pointer-events-none absolute h-1 w-full',
        'opacity-70',
        className,
      )}
    >
      <defs>
        <linearGradient id="rail-horiz-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="20%" stopColor="rgba(76,179,230,0.7)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="80%" stopColor="rgba(76,179,230,0.7)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
        </linearGradient>
      </defs>
      <path
        d="M0 2 L2000 2"
        stroke="url(#rail-horiz-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
