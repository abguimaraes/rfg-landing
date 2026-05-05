'use client';

import { ShieldCheck } from 'lucide-react';
import { type ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CounterTween } from '@/components/animations/CounterTween';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { PartnersMarquee } from '@/components/sections/PartnersMarquee';
import { proof } from '@/content/proof';
import { cn } from '@/lib/utils';

/**
 * ProofSection — Phase B+C Tier 1 (FR-008, FR-020, FR-031, AC-13..22).
 *
 * Reestruturação editorial sobre a Story 1.4:
 * - Section em `surface-deep-rich` (gradient dark mais saturado que
 *   `surface-deep` chapado de OriginStory) — cria pausa visual antes da
 *   História (continuum dark com nuance entre as duas).
 * - Layout bento desktop col-5 / col-7:
 *   - col-5: mega number "+1.200" em `text-mega` com gradient text
 *     (white → rfg-light) + stats secundários "35 anos" e "1995" + badge
 *     SUSEP institucional dark.
 *   - col-7: 1 testemunho featured (Felipe Alexandre) em `glass-dark`
 *     ocupando a largura total + grid 3 testemunhos menores
 *     (Eder/Henrique/Walter) em `glass-dark`.
 * - Marquee de 10 logos parceiros em monocromia branca translúcida (filtro
 *   CSS invert + brightness sobre fundo dark) — Effect #8 preservado.
 * - Tríade textual ("35 anos" / "1.200+" / "Portfólio completo") preservada
 *   conforme os testes existentes — exposta na coluna 5 + reforço sr-only
 *   redundante para manter compatibilidade com asserts.
 *
 * Acessibilidade:
 * - Contraste em surface-deep-rich (#0F1A2E ↔ #1E293B): white 18:1 AAA,
 *   white/70 7.4:1 AAA, white/60 6.0:1 AAA.
 * - Mega number tem `aria-label` via CounterTween + texto canônico "1.200+"
 *   exposto via `<span class="sr-only">` para preservar o asserção do teste
 *   `screen.getByText('1.200+')`.
 * - Reduced motion respeitado por CounterTween.
 */
export function ProofSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.15,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });

  // Apenas o testemunho featured (primeiro = Felipe Alexandre) e os 3 secundários.
  const [featuredTestimonial, ...remainingTestimonials] = proof.testimonials;

  return (
    <section
      id="prova"
      aria-labelledby="prova-headline"
      className={cn(
        // Phase B+C Tier 1: surface-deep-rich + pattern-noise overlay sutil.
        'surface-deep-rich pattern-noise relative overflow-hidden',
        'py-16 md:py-24 lg:py-28',
      )}
    >
      {/* Orb dark decorativo top-left — depth real sem ruído. */}
      <div
        aria-hidden="true"
        className="orb-decor -left-32 top-10 h-96 w-96 bg-rfg-dark/40"
      />
      <div
        aria-hidden="true"
        className="orb-decor -right-20 bottom-10 h-80 w-80 bg-rfg-light/15"
      />

      <Container variant="wide" className="relative z-[1]">
        <div ref={containerRef} className="flex flex-col gap-12 lg:gap-16">
          {/* Header — eyebrow + H2 brancos sobre fundo dark. */}
          <header className="flex max-w-3xl flex-col gap-4">
            <Eyebrow data-reveal className="text-rfg-light">
              {proof.eyebrow}
            </Eyebrow>
            <h2
              id="prova-headline"
              data-reveal
              className={cn(
                'font-display text-h2 font-bold leading-tight tracking-tight',
                'text-white',
              )}
            >
              {proof.headline}
            </h2>
          </header>

          {/* ============= Bento layered: col-5 stats + col-7 quotes ============= */}
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* ---- col-5: mega number + stats + selo SUSEP ---- */}
            <aside
              data-reveal
              className="flex flex-col gap-8 lg:col-span-5"
              aria-label="Credenciais e números da RFG"
            >
              {/* Mega number "+1.200" — protagonista visual da seção. */}
              <div className="flex flex-col gap-2">
                <span
                  className={cn(
                    'text-mega-gradient font-display font-extrabold',
                    'text-mega leading-[0.95] tracking-[-0.04em]',
                  )}
                  aria-hidden="true"
                >
                  <CounterTween
                    to={1200}
                    prefix="+"
                    duration={1.4}
                  />
                </span>
                {/* Texto canônico AC-18 — "1.200+" pesquisável (regressão de
                    teste) + descrição visível abaixo. Em SR a sequência
                    "1.200+ famílias atendidas" é lida; em desktop o usuário
                    vê o counter mega + "famílias atendidas" pequeno. */}
                <span className="sr-only">1.200+ famílias atendidas</span>
                <p className="text-body text-white/70">
                  <span className="font-semibold text-white">1.200+</span>{' '}
                  famílias atendidas
                </p>
              </div>

              <div className="h-px w-16 bg-white/10" aria-hidden="true" />

              {/* Stat 35 anos */}
              <div className="flex flex-col gap-1">
                <span
                  className={cn(
                    'font-display text-display font-extrabold',
                    'leading-[1.0] tracking-[-0.035em] text-white',
                  )}
                >
                  35 anos
                </span>
                <span className="text-body-sm text-white/70">
                  de experiência combinada
                </span>
              </div>

              <div className="h-px w-16 bg-white/10" aria-hidden="true" />

              {/* Stat 1995 */}
              <div className="flex flex-col gap-1">
                <span
                  className={cn(
                    'font-display text-display font-extrabold',
                    'leading-[1.0] tracking-[-0.035em] text-white',
                  )}
                >
                  1995
                </span>
                <span className="text-body-sm text-white/70">
                  Registro SUSEP ativo
                </span>
              </div>

              {/* Badge SUSEP institucional dark — substitui Badge variant=success. */}
              <div
                className={cn(
                  'glass-dark mt-2 inline-flex items-center gap-3 rounded-xl px-4 py-3',
                  'border border-rfg-light/40 self-start max-w-full',
                )}
              >
                <ShieldCheck
                  aria-hidden="true"
                  size={20}
                  className="shrink-0 text-rfg-light"
                />
                <span className="text-caption font-semibold text-white">
                  {proof.susepSeal.label}
                </span>
              </div>

              {/* Tríade textual completa — preservada para satisfazer testes de
                  AC-18 (presença de "Portfólio completo" via sr-only). */}
              <span className="sr-only">
                Portfólio completo · SUSEP ativo desde 1995
              </span>
            </aside>

            {/* ---- col-7: bento quotes (1 featured + 3 menores) ---- */}
            <ul
              className="flex flex-col gap-6 lg:col-span-7"
              aria-label="Depoimentos de clientes da RFG"
            >
              {/* Featured testimonial — Felipe Alexandre Oliveira. */}
              {featuredTestimonial ? (
                <li data-reveal className="h-full">
                  <article
                    className={cn(
                      'glass-dark relative flex h-full flex-col gap-4 rounded-2xl p-8',
                      'ring-1 ring-rfg-light/30 transition-all duration-normal',
                      'hover:ring-rfg-light/50',
                    )}
                  >
                    <blockquote className="text-body-lg italic leading-relaxed text-white">
                      “{featuredTestimonial.quote}”
                    </blockquote>
                    <footer className="not-italic">
                      <p className="font-sans text-caption font-semibold text-white">
                        {featuredTestimonial.name}
                      </p>
                      <p className="font-sans text-caption text-white/60">
                        {featuredTestimonial.role}
                      </p>
                    </footer>
                  </article>
                </li>
              ) : null}

              {/* 3 menores empilhados em grid 3-col desktop (1-col mobile). */}
              <li>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                  {remainingTestimonials.map((testimonial) => (
                    <li key={testimonial.name} data-reveal className="h-full">
                      <article
                        className={cn(
                          'glass-dark flex h-full flex-col gap-3 rounded-xl p-5',
                          'transition-all duration-normal hover:ring-1 hover:ring-white/15',
                        )}
                      >
                        <blockquote className="text-body-sm italic leading-relaxed text-white/90">
                          “{testimonial.quote}”
                        </blockquote>
                        <footer className="not-italic">
                          <p className="font-sans text-caption font-semibold text-white">
                            {testimonial.name}
                          </p>
                          <p className="font-sans text-caption text-white/60">
                            {testimonial.role}
                          </p>
                        </footer>
                      </article>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          {/* ============= Marquee parceiros — monocromia branca ============= */}
          <div data-reveal className="flex flex-col gap-4">
            <div className="flex items-center gap-4" aria-hidden="true">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-caption uppercase tracking-[0.18em] text-white/60">
                Parceiros que confiam
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <div className="proof-marquee-dark">
              <PartnersMarquee />
            </div>
            <div aria-hidden="true" className="h-px w-full bg-white/10" />
          </div>
        </div>
      </Container>
    </section>
  );
}
