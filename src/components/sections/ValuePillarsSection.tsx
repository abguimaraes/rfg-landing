'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, type ReactNode } from 'react';

import { CounterTween } from '@/components/animations/CounterTween';
import { IconBurst } from '@/components/animations/IconBurst';
import { useParallax } from '@/components/animations/useParallax';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { useSplitText } from '@/components/animations/useSplitText';
import { ValueCard } from '@/components/sections/value/ValueCard';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { valueProps } from '@/content/valueProps';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

/**
 * ValuePillarsSection — Tier 2 PR #17 (FR-007, FR-025, FR-029, AC-6..12).
 *
 * Reestruturação do grid 2x2 uniforme em **bento assimétrico** com efeito
 * próprio por card. Mantém eyebrow + H2 em **Title Case** (CON-013) e Pilar 3
 * com "faz com que" (CON-003).
 *
 * Layout desktop (lg): grid 12 cols com 4 cards distribuídos:
 * - Card 1 dominante (col-span-7, row-span-2): "Proteja o Que Já Tem"
 *   · list reveal stagger via SplitText mode='lines'
 *   · counter mega "+1.200" famílias atendidas (efeito feature)
 * - Card 2 (col-span-5): "Realize Seus Sonhos"
 *   · ícone com IconBurst entry + spin GSAP no hover (effect icon-spin)
 * - Card 3 (col-span-5): "Sua Família Protegida"
 *   · gradient sweep animado (loop sutil) + parallax interno na decoração
 * - Card 4 (col-span-12): "Um Consultor que Conhece"
 *   · tilt 3D com max=9 + hover glow brand (shadow-glow-brand)
 *
 * Tablet (md): grid 2-col stack vertical, cards uniformes.
 * Mobile: single col, sem tilt (matchMedia interno do ValueCard).
 *
 * Headline da seção animada via `useSplitText` mode='words' (entrada scroll).
 *
 * A11y:
 * - `<article>` por card com `tabIndex={0}` e `aria-labelledby={h3-id}`.
 * - Focus visible com ring rfg-light (NFR-014).
 * - Reduced motion respeitado por todos os helpers (matchMedia interna).
 */
export function ValuePillarsSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.18,
    y: 32,
    duration: 0.8,
    start: 'top 80%',
  });

  // Headline da seção — split words com entrada scroll-driven.
  const headlineRef = useSplitText<HTMLHeadingElement>({
    mode: 'words',
    stagger: 0.05,
    y: 28,
    duration: 0.7,
  });

  // Card 1 (feature): list reveal stagger nos itens da lista mini-stats.
  const featureListRef = useRef<HTMLUListElement>(null);

  // Card 3 (gradient-sweep): parallax interno na decoração.
  const card3DecorRef = useParallax<HTMLDivElement>({
    yPercent: -18,
    mobileMultiplier: 0.4,
  });

  useGSAP(
    () => {
      const list = featureListRef.current;
      if (!list) return;

      const items = list.querySelectorAll<HTMLLIElement>('[data-feature-item]');
      if (items.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add(
        { reduceMotion: '(prefers-reduced-motion: reduce)' },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) {
            gsap.set(items, { opacity: 1, x: 0, clearProps: 'all' });
            return;
          }
          gsap.from(items, {
            opacity: 0,
            x: -20,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: list,
              start: 'top 85%',
              once: true,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: featureListRef },
  );

  const [pilar1, pilar2, pilar3, pilar4] = valueProps.pillars;
  // Defensive guards — content é garantido com 4 pilares, mas type permite
  // ReadonlyArray. Usa fallback vazio pra preservar render mesmo em refactor.
  const safePilar1 = pilar1 ?? { emoji: '', titulo: '', descricao: '' };
  const safePilar2 = pilar2 ?? { emoji: '', titulo: '', descricao: '' };
  const safePilar3 = pilar3 ?? { emoji: '', titulo: '', descricao: '' };
  const safePilar4 = pilar4 ?? { emoji: '', titulo: '', descricao: '' };

  return (
    <section
      id="valor"
      aria-labelledby="valor-headline"
      className={cn(
        // Surface: clean (white) com spotlight radial sutil ancorado à direita.
        'surface-clean relative overflow-hidden',
        'py-16 md:py-24 lg:py-28',
      )}
    >
      {/* Spotlight gradient atrás do card dominante (desktop only) */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 z-0',
          'bg-surface-spotlight opacity-70',
        )}
      />
      {/* Orb decorativo bottom-right pra dar peso visual */}
      <div
        aria-hidden="true"
        className="orb-decor -right-32 bottom-0 h-96 w-96 bg-rfg-light/12"
      />

      <Container variant="wide" className="relative z-[1]">
        <div ref={containerRef} className="flex flex-col gap-10 md:gap-14">
          <header className="flex max-w-3xl flex-col gap-4">
            <Eyebrow data-reveal>{valueProps.eyebrow}</Eyebrow>
            <h2
              id="valor-headline"
              ref={headlineRef}
              data-reveal
              className="font-display text-h2 font-bold leading-tight tracking-tight text-neutral-900"
            >
              {valueProps.headline}
            </h2>
          </header>

          {/* ============= Bento grid assimétrico ============= */}
          <div
            data-reveal
            className={cn(
              'grid gap-5 md:gap-6',
              // Tablet: 2-col stack uniforme
              'md:grid-cols-2',
              // Desktop: bento 12-col com row span no card 1
              'lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-6 xl:gap-8',
            )}
            aria-label="Quatro pilares da proposta de valor da RFG"
          >
            {/* ---------- Card 1 (FEATURE — dominante) ---------- */}
            <ValueCard
              effect="feature"
              ariaLabelledby="pilar-1-titulo"
              className={cn(
                'md:col-span-2',
                'lg:col-span-7 lg:row-span-2 lg:p-10',
              )}
            >
              {/* Decorative blur orb interno (sutil, atrás do conteúdo) */}
              <div
                aria-hidden="true"
                className={cn(
                  'pointer-events-none absolute -right-20 -top-20 h-72 w-72',
                  'rounded-full bg-rfg-light/20 blur-[80px]',
                )}
              />

              <div className="relative z-[1] flex h-full flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                  <span
                    aria-hidden="true"
                    data-card-icon
                    className="inline-block text-5xl leading-none"
                  >
                    {safePilar1.emoji}
                  </span>
                  <span
                    className={cn(
                      'rounded-full bg-rfg-dark/90 px-3 py-1',
                      'font-display text-caption font-semibold uppercase',
                      'tracking-[0.14em] text-white',
                    )}
                  >
                    Proteção #1
                  </span>
                </div>

                <h3
                  id="pilar-1-titulo"
                  className={cn(
                    'font-display text-h3 font-bold leading-tight',
                    'tracking-tight text-neutral-900 lg:text-display-lg',
                    'lg:leading-[1.05]',
                  )}
                >
                  {safePilar1.titulo}
                </h3>

                <p className="max-w-prose text-body-lg leading-relaxed text-neutral-700">
                  {safePilar1.descricao}
                </p>

                {/* Counter mega — número grande estilo editorial */}
                <div className="mt-auto flex flex-col gap-2">
                  <span
                    className={cn(
                      'font-display font-extrabold text-rfg-dark',
                      'text-display-xl leading-[0.95] tracking-[-0.04em]',
                    )}
                    aria-hidden="true"
                  >
                    <CounterTween to={1200} prefix="+" duration={1.6} />
                  </span>
                  <span className="sr-only">
                    Mais de 1.200 famílias protegidas pela RFG
                  </span>
                  <p className="text-body font-medium text-neutral-600">
                    famílias protegidas pela RFG desde 1995
                  </p>

                  {/* List reveal stagger — mini-stats que entram em sequência */}
                  <ul
                    ref={featureListRef}
                    className="mt-4 flex flex-col gap-2.5"
                    aria-label="Diferenciais da proteção RFG"
                  >
                    <li
                      data-feature-item
                      className="flex items-center gap-3 text-body-sm text-neutral-700"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-block h-1.5 w-6 rounded-full bg-rfg-mid"
                      />
                      Análise personalizada do seu perfil
                    </li>
                    <li
                      data-feature-item
                      className="flex items-center gap-3 text-body-sm text-neutral-700"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-block h-1.5 w-6 rounded-full bg-rfg-mid"
                      />
                      Cobertura sob medida pra cada fase de vida
                    </li>
                    <li
                      data-feature-item
                      className="flex items-center gap-3 text-body-sm text-neutral-700"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-block h-1.5 w-6 rounded-full bg-rfg-mid"
                      />
                      Suporte ativo na hora do sinistro
                    </li>
                  </ul>
                </div>
              </div>
            </ValueCard>

            {/* ---------- Card 2 (ICON-SPIN) ---------- */}
            <ValueCard
              effect="icon-spin"
              ariaLabelledby="pilar-2-titulo"
              className={cn('md:col-span-1', 'lg:col-span-5')}
            >
              <div className="flex h-full flex-col gap-4">
                <IconBurst stagger={0} duration={0.7}>
                  <div
                    className={cn(
                      'inline-flex h-16 w-16 items-center justify-center',
                      'rounded-2xl bg-rfg-light/15',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      data-burst
                      data-card-icon
                      className="inline-block text-4xl leading-none will-change-transform"
                    >
                      {safePilar2.emoji}
                    </span>
                  </div>
                </IconBurst>
                <h3
                  id="pilar-2-titulo"
                  className={cn(
                    'font-display text-h4 font-semibold leading-tight',
                    'tracking-tight text-neutral-900',
                  )}
                >
                  {safePilar2.titulo}
                </h3>
                <p className="text-body leading-relaxed text-neutral-700">
                  {safePilar2.descricao}
                </p>
              </div>
            </ValueCard>

            {/* ---------- Card 3 (GRADIENT-SWEEP) ---------- */}
            <ValueCard
              effect="gradient-sweep"
              ariaLabelledby="pilar-3-titulo"
              className={cn('md:col-span-1', 'lg:col-span-5')}
            >
              {/* Sweep gradient bar — animado por GSAP via [data-card-sweep] */}
              <div
                aria-hidden="true"
                data-card-sweep
                className={cn(
                  'pointer-events-none absolute inset-y-0 -left-1/3 z-0 w-2/3',
                  'bg-gradient-to-r from-transparent via-rfg-light/20 to-transparent',
                  'blur-2xl',
                )}
              />
              {/* Decoração com parallax interno */}
              <div
                ref={card3DecorRef}
                aria-hidden="true"
                className={cn(
                  'pointer-events-none absolute -bottom-16 -right-16 z-0',
                  'h-48 w-48 rounded-full',
                  'bg-gradient-to-br from-rfg-light/30 to-rfg-mid/20 blur-2xl',
                )}
              />

              <div className="relative z-[1] flex h-full flex-col gap-4">
                <div
                  className={cn(
                    'inline-flex h-16 w-16 items-center justify-center',
                    'rounded-2xl bg-gradient-to-br from-rfg-light/20 to-rfg-mid/10',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="inline-block text-4xl leading-none"
                  >
                    {safePilar3.emoji}
                  </span>
                </div>
                <h3
                  id="pilar-3-titulo"
                  className={cn(
                    'font-display text-h4 font-semibold leading-tight',
                    'tracking-tight text-neutral-900',
                  )}
                >
                  {safePilar3.titulo}
                </h3>
                <p className="text-body leading-relaxed text-neutral-700">
                  {safePilar3.descricao}
                </p>
              </div>
            </ValueCard>

            {/* ---------- Card 4 (TILT-GLOW) ---------- */}
            <ValueCard
              effect="tilt-glow"
              ariaLabelledby="pilar-4-titulo"
              className={cn(
                'md:col-span-2',
                'lg:col-span-12 lg:p-10',
              )}
            >
              <div
                className={cn(
                  'flex h-full flex-col gap-5',
                  'lg:flex-row lg:items-center lg:gap-10',
                )}
              >
                <div
                  className={cn(
                    'inline-flex h-20 w-20 shrink-0 items-center justify-center',
                    'rounded-3xl bg-rfg-gradient-cta shadow-cta',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="inline-block text-5xl leading-none"
                  >
                    {safePilar4.emoji}
                  </span>
                </div>
                <div className="flex flex-col gap-3 lg:flex-1">
                  <h3
                    id="pilar-4-titulo"
                    className={cn(
                      'font-display text-h3 font-bold leading-tight',
                      'tracking-tight text-neutral-900 lg:text-h2',
                    )}
                  >
                    {safePilar4.titulo}
                  </h3>
                  <p className="max-w-prose text-body-lg leading-relaxed text-neutral-700">
                    {safePilar4.descricao}
                  </p>
                </div>
                <div
                  className={cn(
                    'hidden shrink-0 flex-col items-end gap-1 lg:flex',
                    'rounded-2xl border border-rfg-light/40 bg-rfg-light/5 px-5 py-4',
                  )}
                  aria-hidden="true"
                >
                  <span className="font-display text-caption font-semibold uppercase tracking-[0.16em] text-rfg-dark">
                    Atendimento
                  </span>
                  <span className="font-display text-h4 font-bold text-neutral-900">
                    Pessoa a pessoa
                  </span>
                </div>
              </div>
            </ValueCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
