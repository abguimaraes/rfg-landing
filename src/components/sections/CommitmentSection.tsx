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
      className="surface-brand-strong relative overflow-hidden py-16 md:py-24 lg:py-28"
    >
      <Container variant="narrow" className="relative z-[1]">
        <div ref={containerRef} className="flex flex-col items-center gap-6 text-center">
          {/* Selo escudo — AC-24 / Effect #6 (icon scale-in burst).
              Sobre gradient brand-strong: bg branco translúcido contrasta
              suficiente com o azul institucional sem competir com o gradient. */}
          <IconBurst className="flex justify-center">
            <span
              data-burst
              aria-hidden="true"
              className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/15 text-white shadow-2xl ring-1 ring-white/30 backdrop-blur-sm"
              style={{ willChange: 'transform' }}
            >
              <ShieldCheck size={44} strokeWidth={1.75} />
            </span>
          </IconBurst>

          <Eyebrow data-reveal className="text-white/90">
            {commitment.eyebrow}
          </Eyebrow>

          <h2
            id="compromisso-headline"
            data-reveal
            className="font-display text-h2 font-bold leading-tight tracking-tight text-white"
          >
            {commitment.headline}
          </h2>

          <p data-reveal className="text-lead font-medium text-white/95">
            {commitment.subheadline}
          </p>

          <div
            data-reveal
            className="flex flex-col gap-5 text-left text-body-lg leading-loose text-white/90"
          >
            {commitment.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            <p className="font-display text-h4 font-semibold leading-snug text-white">
              {commitment.midHighlight}
            </p>

            <div className="flex flex-col gap-1 text-body leading-relaxed">
              <p>{commitment.trustLine}</p>
              <p>{commitment.susepLine}</p>
            </div>

            <p>
              Não precisamos de cliente que não está convencido — precisamos de
              cliente que está protegido de verdade.
            </p>

            <p className="text-body-lg leading-relaxed">
              {commitment.realCommitment}
            </p>

            <p>
              Sem sumir após a venda. Sem surpresa no sinistro. Sem letra miúda
              que você só descobre quando já é tarde.
            </p>
          </div>

          <p
            data-reveal
            data-testid="commitment-final-line"
            className="font-display text-h4 font-semibold leading-snug text-white"
          >
            {commitment.finalLine}
          </p>

          {/* Selo SUSEP — AC-26. Variant inverse no gradient: bg branco
              translúcido + texto branco mantém a leitura sobre o azul. */}
          <div data-reveal className="mt-4 flex justify-center">
            <Badge
              variant="outline"
              size="md"
              className="!normal-case border-white/40 bg-white/10 tracking-normal text-white backdrop-blur-sm"
            >
              {commitment.susepSeal.label}
            </Badge>
          </div>
        </div>
      </Container>
    </section>
  );
}
