'use client';

import { type ReactNode } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { PartnersMarquee } from '@/components/sections/PartnersMarquee';
import { proof } from '@/content/proof';

/**
 * ProofSection — Story 1.4 (FR-008, FR-020, FR-031, AC-13..22).
 *
 * Container wide, `--bg-secondary` (`bg-neutral-50`).
 * - 4 quote cards uniformes em grid **2×2 desktop / 1-col stack mobile**
 *   (decisão Anderson 2026-05-05 — sem hierarquia entre os 4).
 * - Cada card exibe citação + nome + profissão (Felipe / Eder / Henrique /
 *   Walter, copy literal).
 * - Tríade de credenciais (35 anos / 1.200+ / portfólio completo) acima
 *   dos cards (AC-18 + L-004).
 * - Selo SUSEP `badge success md` "Registro ativo desde 1995" entre os
 *   cards e o marquee (AC-17).
 * - Marquee de 10 logos parceiros (Effect #8).
 *
 * Efeito #2 — Card stagger via `useScrollReveal`.
 */
export function ProofSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.15,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });

  return (
    <section
      id="prova"
      aria-labelledby="prova-headline"
      className="bg-white py-16 md:py-24 lg:py-28"
    >
      <Container variant="wide">
        <div ref={containerRef} className="flex flex-col gap-10">
          <header className="flex max-w-3xl flex-col gap-4">
            <Eyebrow data-reveal>{proof.eyebrow}</Eyebrow>
            <h2
              id="prova-headline"
              data-reveal
              className="font-display text-h2 font-bold leading-tight tracking-tight text-neutral-900"
            >
              {proof.headline}
            </h2>
          </header>

          {/* Tríade de credenciais (FR-008 + L-004) */}
          <ul
            data-reveal
            className="grid gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:grid-cols-3"
            aria-label="Credenciais da RFG"
          >
            {proof.credentials.map((credential) => (
              <li
                key={credential.value}
                className="flex flex-col items-center gap-1 text-center"
              >
                <span className="font-display text-h3 font-bold text-rfg-dark">
                  {credential.value}
                </span>
                <span className="text-body-sm text-neutral-600">
                  {credential.label}
                </span>
              </li>
            ))}
          </ul>

          {/* Quote cards 2x2 — AC-14 */}
          <ul
            className="grid gap-6 md:grid-cols-2 md:gap-8"
            aria-label="Depoimentos de clientes da RFG"
          >
            {proof.testimonials.map((testimonial) => (
              <li key={testimonial.name} data-reveal className="h-full">
                <Card variant="quote" className="flex h-full flex-col gap-4">
                  <blockquote className="text-body-lg italic leading-relaxed text-neutral-700">
                    “{testimonial.quote}”
                  </blockquote>
                  <footer className="not-italic">
                    <p className="font-sans text-caption font-semibold text-neutral-900">
                      {testimonial.name}
                    </p>
                    <p className="font-sans text-caption text-neutral-600">
                      {testimonial.role}
                    </p>
                  </footer>
                </Card>
              </li>
            ))}
          </ul>

          {/* Selo SUSEP — AC-17 */}
          <div data-reveal className="flex justify-center">
            <Badge
              variant="success"
              size="md"
              className="!normal-case tracking-normal"
            >
              {proof.susepSeal.label}
            </Badge>
          </div>

          {/* Marquee 10 logos — AC-19/20 */}
          <div data-reveal className="mt-4">
            <PartnersMarquee />
          </div>
        </div>
      </Container>
    </section>
  );
}
