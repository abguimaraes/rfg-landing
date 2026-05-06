'use client';

import { type ComponentType, type ReactNode } from 'react';

import { Card } from '@/components/ui/Card';
import { IconBurst } from '@/components/animations/IconBurst';
import type { HowItWorksStep } from '@/types/content';

export interface StepCardProps {
  step: HowItWorksStep;
  /** Componente Lucide (já resolvido pelo container). */
  Icon: ComponentType<{
    'aria-hidden'?: boolean | 'true' | 'false';
    strokeWidth?: number;
    size?: number;
    className?: string;
  }>;
}

/**
 * StepCard — card individual de passo (HowItWorks Tier 2 PR #20).
 *
 * Reuso do `<Card>` base com:
 * - Número do passo (01/02/03) em escala display-lg destacado.
 * - Ícone Lucide animado via `<IconBurst>` (scale-in spring quando entra
 *   no viewport — sincroniza com a "trilha" que chega).
 * - Emoji decorativo no canto superior direito.
 * - Body + bullets "O que acontece aqui" (mantidos intactos).
 *
 * A11y: <h3> semântico, ordem natural de leitura preservada, bullets em
 * <ul>. Atributo `data-reveal` permite o stagger do container.
 */
export function StepCard({ step, Icon }: StepCardProps): ReactNode {
  return (
    <Card
      variant="default"
      hoverable
      className="surface-clean relative flex h-full flex-col gap-5 shadow-card-default transition-shadow duration-normal ease-out-soft hover:shadow-card-hover"
    >
      {/* Header: número grande + ícone burst + emoji */}
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className="font-display text-display-lg font-bold leading-none tracking-tight text-rfg-mid/25"
        >
          {step.number}
        </span>

        <IconBurst className="flex shrink-0 items-center gap-3">
          <span
            data-burst
            aria-hidden="true"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rfg-mid/10 text-rfg-dark ring-1 ring-rfg-mid/20"
            style={{ willChange: 'transform' }}
          >
            <Icon aria-hidden="true" strokeWidth={1.75} size={26} />
          </span>
          <span
            data-burst
            aria-hidden="true"
            className="text-2xl leading-none"
            style={{ willChange: 'transform' }}
          >
            {step.emoji}
          </span>
        </IconBurst>
      </div>

      <h3 className="font-display text-h4 font-semibold leading-tight text-neutral-900">
        {step.titulo}
      </h3>

      <p className="text-body leading-relaxed text-neutral-700">{step.body}</p>

      <div className="mt-auto flex flex-col gap-2">
        <p className="text-caption font-semibold uppercase tracking-wider text-rfg-dark">
          O que acontece aqui:
        </p>
        <ul className="flex flex-col gap-2">
          {step.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex gap-2 text-body-sm leading-relaxed text-neutral-700"
            >
              <span
                aria-hidden="true"
                className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-rfg-mid"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
