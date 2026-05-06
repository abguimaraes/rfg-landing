'use client';

import { type ReactNode } from 'react';

import { useDrawSVG } from '@/components/animations/useDrawSVG';

/**
 * ConnectorLine — Tier 2 PR #20 (HowItWorks).
 *
 * Renderiza uma linha SVG decorativa "trilha" que conecta os 3 passos
 * do processo. Desenhada via `useDrawSVG` com scrub-driven scroll: conforme
 * o usuário rola, a linha vai sendo traçada de cima pra baixo (passo
 * 01 → 02 → 03), criando narrativa visual de "trilha da jornada".
 *
 * Comportamento responsivo (CSS visibility-only — ambas SVGs montadas):
 * - Desktop (md+): linha HORIZONTAL com curvas Bezier suaves serpenteando
 *   entre os 3 cards (sobe/desce pra dar UAU sem ficar reta chapada).
 * - Mobile (<md): linha VERTICAL conectando os cards stackados de cima
 *   pra baixo, com pequena ondulação lateral.
 *
 * A11y: aria-hidden=true (decorativo). Reduce-motion: linha já desenhada
 * por completo (handled dentro do hook).
 */
export function ConnectorLine(): ReactNode {
  // Cada SVG monta o seu próprio hook (DrawSVG age sobre os paths
  // descendentes do scope). Apenas UM dos dois é visualmente exibido,
  // mas ambos rodam o ScrollTrigger — leve, e garante consistência
  // se o user redimensionar a viewport durante o scroll.
  const desktopRef = useDrawSVG<SVGSVGElement>({
    scrub: 0.6,
    start: 'top 75%',
    end: 'bottom 60%',
  });

  const mobileRef = useDrawSVG<SVGSVGElement>({
    scrub: 0.6,
    start: 'top 80%',
    end: 'bottom 50%',
  });

  return (
    <>
      {/* Desktop: linha horizontal serpenteando (md+) */}
      <svg
        ref={desktopRef}
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-[140px] w-full -translate-y-1/2 md:block"
      >
        <defs>
          <linearGradient
            id="connector-line-gradient-desktop"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#246BB2" stopOpacity="0.15" />
            <stop offset="20%" stopColor="#3688C8" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#3688C8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#246BB2" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {/* Curva serpenteando: começa em x=80 (1º card), sobe e desce em
           bezier suave pelos 3 pontos chave (~200, ~600, ~1000), termina
           em x=1120 (3º card). Cada cubic-bezier puxa a linha pra cima
           ou pra baixo dando o efeito narrativo de "passos". */}
        <path
          d="M 80 100
             C 200 40, 320 40, 440 100
             S 680 160, 800 100
             S 1040 40, 1120 100"
          fill="none"
          stroke="url(#connector-line-gradient-desktop)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Mobile: linha vertical conectando cards stackados (<md) */}
      <svg
        ref={mobileRef}
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 60 1200"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-y-0 left-1/2 block h-full w-[60px] -translate-x-1/2 md:hidden"
      >
        <defs>
          <linearGradient
            id="connector-line-gradient-mobile"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#246BB2" stopOpacity="0.15" />
            <stop offset="15%" stopColor="#3688C8" stopOpacity="0.7" />
            <stop offset="85%" stopColor="#3688C8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#246BB2" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {/* Vertical: ondula levemente pela esquerda/direita pra dar vida
           ao traço sem virar zigzag agressivo. Path em coordenada Y de
           50 -> 1150 (10% padding cada extremidade). */}
        <path
          d="M 30 50
             C 10 250, 50 450, 30 600
             S 10 950, 30 1150"
          fill="none"
          stroke="url(#connector-line-gradient-mobile)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </>
  );
}
