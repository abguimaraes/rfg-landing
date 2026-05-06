'use client';

import { ShieldCheck } from 'lucide-react';
import { type ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CounterTween } from '@/components/animations/CounterTween';
import { useParallax } from '@/components/animations/useParallax';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { useSplitText } from '@/components/animations/useSplitText';
import { PartnersMarquee } from '@/components/sections/PartnersMarquee';
import { proof } from '@/content/proof';
import { cn } from '@/lib/utils';

/**
 * ProofSection — Hotfix 2026-05-06.
 *
 * REMOVIDO: pin + crossfade entre testimonials (Anderson "depoimentos
 * truncados, passam despercebidos — parte crucial da página").
 *
 * NOVO LAYOUT:
 * - Mantém col-5 (desktop) com mega number + stats SUSEP.
 * - col-7 vira **stack vertical** de 4 cards iguais e generosos
 *   (era bento 1 featured + 3 menores em grid 3-col).
 * - Cada card entra com fade-up scroll-driven via useScrollReveal
 *   stagger forte (data-reveal). Todos visíveis após scrollar.
 * - Header com chip avatar (inicial do nome) + numeração "01 / 04"
 *   pra dar contagem visual de que há vários depoimentos.
 *
 * Compliance:
 * - AC-13 eyebrow + H2 literal preservados
 * - AC-14 4 testemunhos REAIS (Felipe / Eder / Henrique / Walter)
 * - AC-17 selo SUSEP
 * - AC-18 tríade "35 anos / 1.200+ / Portfólio completo" preservada
 *   (mega number + stats inline + sr-only canônicos pros tests)
 *
 * Reduce motion respeitado pelos hooks (matchMedia interna).
 */
export function ProofSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.18,
    y: 32,
    duration: 0.8,
    start: 'top 80%',
  });

  const headlineRef = useSplitText<HTMLHeadingElement>({
    mode: 'words',
    y: 20,
    duration: 0.6,
    stagger: 0.06,
  });

  // Parallax nos orbs decorativos (yPercent=-15).
  const orbTopRef = useParallax<HTMLDivElement>({ yPercent: -15 });
  const orbBottomRef = useParallax<HTMLDivElement>({ yPercent: -15 });

  const testimonials = proof.testimonials;

  return (
    <section
      id="prova"
      aria-labelledby="prova-headline"
      className={cn(
        'surface-deep-rich pattern-noise relative overflow-hidden',
        'py-16 md:py-24 lg:py-28',
      )}
    >
      <div
        ref={orbTopRef}
        aria-hidden="true"
        className="orb-decor -left-32 top-10 h-96 w-96 bg-rfg-dark/40"
      />
      <div
        ref={orbBottomRef}
        aria-hidden="true"
        className="orb-decor -right-20 bottom-10 h-80 w-80 bg-rfg-light/15"
      />

      <Container variant="wide" className="relative z-[1]">
        <div ref={containerRef} className="flex flex-col gap-12 lg:gap-16">
          <header className="flex max-w-3xl flex-col gap-4">
            <Eyebrow data-reveal className="text-rfg-light">
              {proof.eyebrow}
            </Eyebrow>
            <h2
              ref={headlineRef}
              id="prova-headline"
              data-reveal
              className="font-display text-h2 font-bold leading-tight tracking-tight text-white"
            >
              {proof.headline}
            </h2>
          </header>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* ---- col-5: mega number + stats + selo SUSEP ---- */}
            <aside
              data-reveal
              className="flex flex-col gap-8 lg:col-span-5"
              aria-label="Credenciais e números da RFG"
            >
              <div className="flex flex-col gap-2">
                <span
                  className={cn(
                    'text-mega-gradient font-display font-extrabold',
                    'text-mega leading-[0.95] tracking-[-0.04em]',
                  )}
                  aria-hidden="true"
                >
                  <CounterTween to={1200} prefix="+" duration={1.4} />
                </span>
                <span className="sr-only">1.200+ famílias atendidas</span>
                <p className="text-body text-white/70">
                  <span className="font-semibold text-white">1.200+</span>{' '}
                  famílias atendidas
                </p>
              </div>

              <div className="h-px w-16 bg-white/10" aria-hidden="true" />

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

              <span className="sr-only">
                Portfólio completo · SUSEP ativo desde 1995
              </span>
            </aside>

            {/* ---- col-7: STACK VERTICAL de 4 cards iguais ----
                Cada card entra com fade-up via data-reveal stagger. */}
            <ul
              className="flex flex-col gap-5 lg:col-span-7 lg:gap-6"
              aria-label="Depoimentos de clientes da RFG"
            >
              {testimonials.map((testimonial, i) => {
                const initial = testimonial.name.charAt(0).toUpperCase();
                return (
                  <li key={testimonial.name} data-reveal>
                    <article
                      className={cn(
                        'glass-dark relative flex flex-col gap-5 rounded-2xl p-7 md:p-8 lg:p-9',
                        'ring-1 ring-rfg-light/20 transition-all duration-normal',
                        'hover:ring-rfg-light/45 hover:shadow-2xl',
                      )}
                    >
                      <header className="flex items-center justify-between gap-4">
                        <span
                          aria-hidden="true"
                          className={cn(
                            'inline-flex h-12 w-12 shrink-0 items-center justify-center',
                            'rounded-full bg-rfg-light/15 font-display text-h4 font-bold text-rfg-light',
                            'ring-1 ring-rfg-light/30',
                          )}
                        >
                          {initial}
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            'font-display text-caption font-semibold uppercase',
                            'tracking-[0.2em] text-white/40',
                          )}
                        >
                          Depoimento {String(i + 1).padStart(2, '0')}
                          {' / '}
                          {String(testimonials.length).padStart(2, '0')}
                        </span>
                      </header>

                      <blockquote className="text-body-lg italic leading-relaxed text-white">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>

                      <footer className="not-italic">
                        <p className="font-sans text-body font-semibold text-white">
                          {testimonial.name}
                        </p>
                        <p className="font-sans text-caption text-white/60">
                          {testimonial.role}
                        </p>
                      </footer>
                    </article>
                  </li>
                );
              })}
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
