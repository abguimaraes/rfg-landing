'use client';

import { type ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { IconBurst } from '@/components/animations/IconBurst';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { commitment } from '@/content/commitment';

/**
 * CommitmentSection — Story 1.5 (FR-012, CON-003, CON-013, AC-21..28).
 *
 * Container narrow (760px — texto longo). Eyebrow + headline "Nosso
 * Compromisso" (Title Case — NÃO "GARANTIA") + subheadline + body sem
 * "garantia/garantir" em nenhum trecho.
 *
 * Compliance crítica:
 * - CON-003 / CON-013 / AC-22: SEM "garantia" / "garantir" / "garante".
 * - I-002 / AC-23: contém "13 anos" (não "12 anos").
 * - AC-24: selo escudo via `<IconBurst>` (Effect #6 reuso, back.out spring).
 * - AC-25: linha final "Se não fizer sentido para você..." em destaque.
 * - AC-26: badge SUSEP visível.
 * - AC-27: SEM CTA (último empurrão emocional antes de Visão de Futuro).
 */
export function CommitmentSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.15,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });

  return (
    <section
      id="compromisso"
      aria-labelledby="compromisso-headline"
      className="bg-white py-16 md:py-24 lg:py-28"
    >
      <Container variant="narrow">
        <div ref={containerRef} className="flex flex-col items-center gap-6 text-center">
          {/* Selo escudo — AC-24 / Effect #6 (icon scale-in burst) */}
          <IconBurst className="flex justify-center">
            <span
              data-burst
              aria-hidden="true"
              className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-rfg-gradient-cta text-white shadow-lg"
              style={{ willChange: 'transform' }}
            >
              <ShieldCheck size={44} strokeWidth={1.75} />
            </span>
          </IconBurst>

          <Eyebrow data-reveal>{commitment.eyebrow}</Eyebrow>

          <h2
            id="compromisso-headline"
            data-reveal
            className="font-display text-h2 font-bold leading-tight tracking-tight text-neutral-900"
          >
            {commitment.headline}
          </h2>

          <p
            data-reveal
            className="text-lead font-medium text-neutral-800"
          >
            {commitment.subheadline}
          </p>

          <div
            data-reveal
            className="flex flex-col gap-5 text-left text-body-lg leading-loose text-neutral-700"
          >
            {commitment.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            <p className="text-h4 font-display font-semibold leading-snug text-neutral-900">
              {commitment.midHighlight}
            </p>

            <div className="flex flex-col gap-1 text-body leading-relaxed">
              <p>{commitment.trustLine}</p>
              <p>{commitment.susepLine}</p>
            </div>

            <p>{commitment.realCommitmentIntro}</p>

            <p className="text-body-lg leading-relaxed">
              {commitment.realCommitmentOutroTop}
            </p>

            <p>{commitment.realCommitmentOutroBottom}</p>
          </div>

          <p
            data-reveal
            data-testid="commitment-final-line"
            className="font-display text-h4 font-semibold leading-snug text-rfg-dark"
          >
            {commitment.finalLine}
          </p>

          {/* Selo SUSEP — AC-26 */}
          <div data-reveal className="mt-4 flex justify-center">
            <Badge
              variant="success"
              size="md"
              className="!normal-case tracking-normal"
            >
              {commitment.susepSeal.label}
            </Badge>
          </div>
        </div>
      </Container>
    </section>
  );
}
