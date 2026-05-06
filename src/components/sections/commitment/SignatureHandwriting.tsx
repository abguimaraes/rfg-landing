'use client';

import { type ReactNode } from 'react';

import { useDrawSVG } from '@/components/animations/useDrawSVG';
import { cn } from '@/lib/utils';

export interface SignatureHandwritingProps {
  /** Texto da signature (frase final). */
  text: string;
  /** ID p/ data-testid do texto (compliance AC-25). */
  testId?: string;
  /** Classes extras no wrapper. */
  className?: string;
}

/**
 * SignatureHandwriting — PR #23 (CommitmentSection refactor).
 *
 * Renderiza a frase final em estilo "assinatura à mão" — texto principal
 * em italic display branco + uma swoosh manuscrita decorativa abaixo
 * desenhada via DrawSVG scrub-driven (path "rabisca" conforme o usuário
 * scrolla até o fundo da seção).
 *
 * Acessibilidade:
 * - O texto fica em <p> nativo para leitores de tela e satisfaz o teste
 *   `getByTestId('commitment-final-line')`.
 * - SVG swoosh é puramente decorativo (`aria-hidden`).
 * - Reduced motion: useDrawSVG já gsap.set drawSVG=100% (swoosh visível
 *   sem animação).
 */
export function SignatureHandwriting({
  text,
  testId,
  className,
}: SignatureHandwritingProps): ReactNode {
  // Path scrub-driven sob o texto. start mais cedo (top 90%) e
  // end mais tarde pra dar tempo do efeito desenhar bem.
  const svgRef = useDrawSVG<SVGSVGElement>({
    scrub: 1.2,
    start: 'top 88%',
    end: 'bottom 70%',
    duration: 2,
  });

  return (
    <div className={cn('relative flex flex-col items-center gap-3', className)}>
      {/* Texto da signature — italic display, branco, peso semibold.
          Mantém p semântico para leitores de tela e testes. */}
      <p
        data-testid={testId}
        className={cn(
          'font-display text-h3 font-semibold italic leading-snug text-white',
          'text-center tracking-tight',
          'sm:text-display-lg sm:leading-[1.05]',
        )}
        style={{
          textShadow: '0 2px 24px rgba(76, 179, 230, 0.45)',
        }}
      >
        {text}
      </p>

      {/* Swoosh handwriting decorativa — desenhada via DrawSVG scrub.
          Path simulando uma rubrica final manuscrita ascending. */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        viewBox="0 0 600 80"
        className="h-12 w-full max-w-[420px] sm:h-16 sm:max-w-[560px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Path "assinatura" — curva fluida ascending com loop, evocando
            uma rubrica caligráfica. Cubic béziers encadeados pra fluidez. */}
        <path
          d="M 20 50
             C 60 20, 110 70, 160 40
             S 240 10, 290 45
             C 330 70, 380 25, 430 50
             C 470 70, 510 35, 555 28
             L 580 22"
          stroke="rgba(255, 255, 255, 0.92)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(76, 179, 230, 0.55))',
          }}
        />
        {/* Mini flourish — segundo path (loop final) — desenhado em
            sequência via stagger do hook. Adiciona personalidade. */}
        <path
          d="M 555 28
             C 565 20, 580 30, 575 45
             C 572 52, 562 50, 558 42"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(76, 179, 230, 0.45))',
          }}
        />
      </svg>
    </div>
  );
}
