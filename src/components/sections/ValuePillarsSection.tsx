'use client';

import { type ReactNode } from 'react';

import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { IconBurst } from '@/components/animations/IconBurst';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { valueProps } from '@/content/valueProps';

/**
 * ValuePillarsSection — Story 1.4 (FR-007, FR-025, FR-029, AC-6..12).
 *
 * Container wide, eyebrow + H2 em **Title Case** (NÃO CAIXA ALTA — CON-013).
 * Grid 2x2 desktop / 1-col stack mobile com 4 pilares uniformes (`Card`
 * variant default + hover). Pilar 3 usa "faz com que" (NÃO "garante" — CON-003).
 *
 * Efeitos:
 * - #2 Card stagger via `useScrollReveal` (entrada dos cards).
 * - #6 Icon burst via `IconBurst` (scale 0->1 + back.out(1.7) nos emojis).
 */
export function ValuePillarsSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.15,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });

  return (
    <section
      id="valor"
      aria-labelledby="valor-headline"
      className="surface-clean py-16 md:py-24 lg:py-28"
    >
      <Container variant="wide">
        <div ref={containerRef} className="flex flex-col gap-10">
          <header className="flex max-w-3xl flex-col gap-4">
            <Eyebrow data-reveal>{valueProps.eyebrow}</Eyebrow>
            <h2
              id="valor-headline"
              data-reveal
              className="font-display text-h2 font-bold leading-tight tracking-tight text-neutral-900"
            >
              {valueProps.headline}
            </h2>
          </header>

          <IconBurst>
            <ul
              className="grid gap-6 md:grid-cols-2 md:gap-8"
              aria-label="Quatro pilares da proposta de valor da RFG"
            >
              {valueProps.pillars.map((pillar) => (
                <li key={pillar.titulo} data-reveal className="h-full">
                  <Card
                    variant="default"
                    hoverable
                    className="flex h-full flex-col gap-4"
                  >
                    <span
                      data-burst
                      aria-hidden="true"
                      className="inline-block text-4xl leading-none"
                      style={{ willChange: 'transform' }}
                    >
                      {pillar.emoji}
                    </span>
                    <h3 className="font-display text-h4 font-semibold leading-tight text-neutral-900">
                      {pillar.titulo}
                    </h3>
                    <p className="text-body leading-relaxed text-neutral-700">
                      {pillar.descricao}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          </IconBurst>
        </div>
      </Container>
    </section>
  );
}
