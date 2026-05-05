'use client';

import { type ReactNode } from 'react';
import { Handshake, Search, ShieldCheck } from 'lucide-react';

import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { howItWorks } from '@/content/howItWorks';
import type { HowItWorksIconKey } from '@/types/content';

/** Mapeia chave canônica de ícone -> componente Lucide. */
const ICON_MAP: Record<HowItWorksIconKey, typeof Search> = {
  search: Search,
  'shield-check': ShieldCheck,
  handshake: Handshake,
};

/**
 * HowItWorksSection — Story 1.5 (FR-010, FR-025, AC-1..7).
 *
 * Container wide, `--bg-primary` (`bg-white`). Eyebrow "Como Funciona" +
 * bridge text + 3 cards verticais numerados (01/02/03) com ícone Lucide
 * + emoji + título Title Case + body + 3 bullets "O que acontece aqui".
 *
 * Layout: desktop 3 colunas com linha conectora sutil entre cards;
 * mobile stack 1 coluna. SEM CTA (build-up para Seção 9).
 *
 * Efeito #2 — Card grid stagger via `useScrollReveal`. Decisão 7 dos
 * wireframes: NÃO usar scroll-pinned (Lighthouse 95+ é prioridade).
 */
export function HowItWorksSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.2,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });

  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-headline"
      className="surface-soft pattern-blueprint py-16 md:py-24 lg:py-28"
    >
      <Container variant="wide">
        <div ref={containerRef} className="flex flex-col gap-10">
          <header className="flex max-w-3xl flex-col gap-4">
            <Eyebrow data-reveal>{howItWorks.eyebrow}</Eyebrow>
            <h2
              id="como-funciona-headline"
              data-reveal
              className="font-display text-h2 font-bold leading-tight tracking-tight text-neutral-900"
            >
              {howItWorks.eyebrow}
            </h2>
            <p data-reveal className="text-lead text-neutral-700">
              {howItWorks.bridge}
            </p>
          </header>

          <div className="relative">
            {/* Linha conectora decorativa entre os 3 cards (desktop only). */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent md:block"
            />
            <ol
              className="grid gap-6 md:grid-cols-3 md:gap-8"
              aria-label="Três passos do processo da RFG"
            >
            {howItWorks.steps.map((step) => {
              const Icon = ICON_MAP[step.iconKey];
              return (
                <li key={step.number} data-reveal className="relative h-full">
                  <Card
                    variant="default"
                    hoverable
                    className="flex h-full flex-col gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="font-display text-h3 font-bold text-rfg-light"
                      >
                        {step.number}
                      </span>
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.5}
                        size={32}
                        className="text-rfg-dark"
                      />
                      <span
                        aria-hidden="true"
                        className="ml-auto text-2xl leading-none"
                      >
                        {step.emoji}
                      </span>
                    </div>
                    <h3 className="font-display text-h4 font-semibold leading-tight text-neutral-900">
                      {step.titulo}
                    </h3>
                    <p className="text-body leading-relaxed text-neutral-700">
                      {step.body}
                    </p>
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
                </li>
              );
            })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
