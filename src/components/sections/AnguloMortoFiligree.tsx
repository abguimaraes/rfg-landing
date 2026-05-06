'use client';

import { type ReactNode } from 'react';

import { useDrawSVG } from '@/components/animations/useDrawSVG';
import { cn } from '@/lib/utils';

export interface AnguloMortoFiligreeProps {
  /** Classe adicional no wrapper SVG. */
  className?: string;
}

/**
 * AnguloMortoFiligree — filigrana decorativa SVG que escreve "ÂNGULO MORTO"
 * no fundo da `ProblemSection` via `useDrawSVG` com scrub-driven (path
 * desenha-se conforme o usuário scrolla).
 *
 * Conceito visual:
 * - Stroke leve (1.25px), opacity ~0.08 — fica atrás do texto sem competir.
 * - Letras estilizadas em paths geométricos simples (interpretação caligráfica
 *   minimalista), 2 linhas: "ÂNGULO" em cima + "MORTO" abaixo.
 * - Linhas decorativas conectoras (subtle filigree) reforçam o motivo do
 *   "ângulo morto" — uma diagonal marcando o que não se vê.
 *
 * Acessibilidade:
 * - `aria-hidden="true"` + `role="presentation"` — puramente decorativo.
 *
 * Animação:
 * - `scrub: 1` (lag suave 1s) → desenha conforme scrolla.
 * - Reduce-motion → estado final imediato (drawSVG: 100%).
 */
export function AnguloMortoFiligree({
  className,
}: AnguloMortoFiligreeProps): ReactNode {
  const ref = useDrawSVG<SVGSVGElement>({
    scrub: 1,
    start: 'top 90%',
    end: 'bottom 10%',
    stagger: 0.04,
  });

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      role="presentation"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      className={cn('h-full w-full text-rfg-dark', className)}
    >
      {/* ============ DIAGONAL DECORATIVA — "ângulo morto" geométrico ============ */}
      <path d="M 60 60 L 1140 540" opacity="0.45" />
      <path d="M 1140 60 L 60 540" opacity="0.25" />

      {/* ============ LINHA "ÂNGULO" — y centerline ~200 ============ */}
      {/* Â — circumflex + triângulo + travessão */}
      <path d="M 105 145 L 120 130 L 135 145" />
      <path d="M 80 250 L 120 160 L 160 250" />
      <path d="M 95 220 L 145 220" />
      {/* N — duas verticais + diagonal */}
      <path d="M 195 250 L 195 160 L 265 250 L 265 160" />
      {/* G — arco aberto + travessão interno */}
      <path d="M 380 175 C 360 155, 320 155, 305 175 C 290 195, 290 230, 305 245 C 320 260, 360 260, 380 240 L 380 210 L 350 210" />
      {/* U — duas verticais + arco */}
      <path d="M 420 160 L 420 225 C 420 245, 440 250, 460 250 C 480 250, 500 245, 500 225 L 500 160" />
      {/* L — vertical + base */}
      <path d="M 545 160 L 545 250 L 615 250" />
      {/* O — elipse */}
      <path d="M 700 205 C 700 175, 680 158, 655 158 C 630 158, 610 175, 610 205 C 610 235, 630 252, 655 252 C 680 252, 700 235, 700 205 Z" />

      {/* ============ LINHA "MORTO" — y centerline ~440 ============ */}
      {/* M — quatro vértices */}
      <path d="M 130 490 L 130 400 L 170 470 L 210 400 L 210 490" />
      {/* O */}
      <path d="M 340 445 C 340 415, 320 398, 295 398 C 270 398, 250 415, 250 445 C 250 475, 270 492, 295 492 C 320 492, 340 475, 340 445 Z" />
      {/* R — vertical + arco superior + perna diagonal */}
      <path d="M 385 490 L 385 400 L 430 400 C 450 400, 460 415, 460 430 C 460 445, 450 460, 430 460 L 385 460" />
      <path d="M 425 460 L 470 490" />
      {/* T — travessão + vertical */}
      <path d="M 510 400 L 600 400" />
      <path d="M 555 400 L 555 490" />
      {/* O */}
      <path d="M 720 445 C 720 415, 700 398, 675 398 C 650 398, 630 415, 630 445 C 630 475, 650 492, 675 492 C 700 492, 720 475, 720 445 Z" />

      {/* ============ ORNAMENTOS LATERAIS ============ */}
      {/* Linha dupla horizontal abaixo de MORTO (filigree) */}
      <path d="M 770 440 L 1100 440" opacity="0.55" />
      <path d="M 770 455 L 1050 455" opacity="0.35" />
      {/* Linha dupla horizontal acima de ÂNGULO */}
      <path d="M 770 200 L 1100 200" opacity="0.55" />
      <path d="M 800 215 L 1100 215" opacity="0.35" />
      {/* Pequenos ticks decorativos */}
      <path d="M 1100 200 L 1110 195 L 1110 220 L 1100 215" opacity="0.4" />
      <path d="M 1100 440 L 1110 435 L 1110 460 L 1100 455" opacity="0.4" />
    </svg>
  );
}
