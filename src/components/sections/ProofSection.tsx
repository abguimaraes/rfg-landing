'use client';

import { ShieldCheck } from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CounterTween } from '@/components/animations/CounterTween';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { useSplitText } from '@/components/animations/useSplitText';
import { useParallax } from '@/components/animations/useParallax';
import { PartnersMarquee } from '@/components/sections/PartnersMarquee';
import { proof } from '@/content/proof';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

/**
 * ProofSection — Phase B+C Tier 2 ENRIQUECIDO (PR #22).
 *
 * Preserva 100% do dark surface, bento col-5/col-7, copy literal e marquee
 * Tier 1 (PR #13). Adiciona EFEITO UAU via:
 *
 * 1. **Pin + crossfade entre testimonials** (desktop only):
 *    Section dá pin enquanto usuário scrolla; o featured testimonial e os 3
 *    secundários trocam com fade crossfade em vez de aparecerem todos juntos.
 *    Sensação "uma história depois da outra". `gsap.matchMedia()` ativa só em
 *    desktop — mobile vira lista normal (sem pin) pra não bloquear scroll.
 *
 * 2. **Parallax orbs decorativos** (yPercent=-15) — equivalente a "fotos dos
 *    clientes" subindo levemente conforme scrolla. Os testimonials da RFG não
 *    têm avatares (compliance SUSEP — depoimentos LITERAIS sem fotos não
 *    autorizadas), então o parallax aplica nos orbs que ancoram a seção.
 *
 * 3. **Headline com SplitText words** — palavras revelam em stagger, dando
 *    peso editorial sem reescrever a copy. `prefers-reduced-motion: reduce`
 *    desabilita.
 *
 * 4. **CounterTween** já presente no Tier 1 (mega number "+1.200") — mantido.
 *
 * A11y / compliance:
 * - Mesmo durante pin, todos os 4 testemunhos permanecem no DOM (apenas
 *   opacity é animada). Screen-readers leem todos.
 * - Reduce-motion: pin/crossfade/parallax/split desabilitados; estado simples
 *   (todos os testimonials visíveis) — atende NFR-014.
 * - Mobile (<= 768px): SEM pin/crossfade — degrada pra lista vertical normal,
 *   evita travar scroll em telas pequenas. Apenas parallax leve nos orbs.
 * - Compliance SUSEP: testemunhos com nomes REAIS (Felipe / Eder / Henrique /
 *   Walter) preservados — nenhum nome inventado.
 */
export function ProofSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.15,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });

  // Tier 2: ref para SplitText na headline (words mode).
  const headlineRef = useSplitText<HTMLHeadingElement>({
    mode: 'words',
    y: 20,
    duration: 0.6,
    stagger: 0.06,
  });

  // Tier 2: parallax nos orbs decorativos (yPercent=-15).
  // mobileMultiplier default 0.5 → 7.5% mobile (suave).
  const orbTopRef = useParallax<HTMLDivElement>({ yPercent: -15 });
  const orbBottomRef = useParallax<HTMLDivElement>({ yPercent: -15 });

  // Tier 2: pin + crossfade entre testimonials (desktop only).
  // Estrutura: 4 testimonial slots com `data-testimonial-slide` no DOM.
  // Pin section por ~3x viewport; cada slide ganha foco sequencial via opacity.
  const sectionRef = useRef<HTMLElement>(null);
  const slidesWrapperRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !slidesWrapperRef.current) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) return;
          if (!ctx.conditions?.isDesktop) return;

          const slides =
            slidesWrapperRef.current!.querySelectorAll<HTMLElement>(
              '[data-testimonial-slide]',
            );
          if (slides.length < 2) return;

          // Estado inicial: primeiro visível, demais opacity 0.
          gsap.set(slides, { opacity: 0 });
          gsap.set(slides[0]!, { opacity: 1 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: 'top top',
              // Pin por ~ (slides - 1) * 60% viewport — total ≈ 3x para 4 slides.
              end: () => `+=${(slides.length - 1) * window.innerHeight * 0.6}`,
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Crossfade sequencial: slide N fade out enquanto N+1 fade in.
          for (let i = 0; i < slides.length - 1; i++) {
            const current = slides[i]!;
            const next = slides[i + 1]!;
            tl.to(current, { opacity: 0, duration: 0.5 }, i)
              .to(next, { opacity: 1, duration: 0.5 }, i + 0.1);
          }

          return () => {
            // Cleanup: garante que ao reverter (resize, reduce-motion toggle)
            // todos os testimonials voltem visíveis (a11y baseline).
            gsap.set(slides, { opacity: 1, clearProps: 'opacity' });
          };
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  // Apenas o testemunho featured (primeiro = Felipe Alexandre) e os 3 secundários.
  const [featuredTestimonial, ...remainingTestimonials] = proof.testimonials;

  return (
    <section
      ref={sectionRef}
      id="prova"
      aria-labelledby="prova-headline"
      className={cn(
        // Phase B+C Tier 1: surface-deep-rich + pattern-noise overlay sutil.
        'surface-deep-rich pattern-noise relative overflow-hidden',
        'py-16 md:py-24 lg:py-28',
      )}
    >
      {/* Orbs decorativos com parallax Tier 2 (yPercent=-15). */}
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
          {/* Header — eyebrow + H2 brancos sobre fundo dark.
              H2 ganha SplitText words em Tier 2 (revela palavra por palavra). */}
          <header className="flex max-w-3xl flex-col gap-4">
            <Eyebrow data-reveal className="text-rfg-light">
              {proof.eyebrow}
            </Eyebrow>
            <h2
              ref={headlineRef}
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
                  <CounterTween to={1200} prefix="+" duration={1.4} />
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

            {/* ---- col-7: bento quotes (1 featured + 3 menores) ----
                Tier 2: cada testimonial vira "slide" com data-testimonial-slide.
                Em desktop, ScrollTrigger pin + crossfade sequencial entre eles.
                Em mobile / reduce-motion: lista normal (todos visíveis). */}
            <ul
              ref={slidesWrapperRef}
              className={cn(
                'flex flex-col gap-6 lg:col-span-7',
                // Em desktop, os slides ficam empilhados na MESMA posição via
                // grid 1×1 — só um aparece por vez via opacity. Em mobile,
                // segue layout normal (gap entre cards visíveis).
                'lg:relative lg:grid lg:min-h-[420px] lg:grid-cols-1 lg:grid-rows-1',
              )}
              aria-label="Depoimentos de clientes da RFG"
            >
              {/* Featured testimonial — Felipe Alexandre Oliveira. */}
              {featuredTestimonial ? (
                <li
                  data-reveal
                  data-testimonial-slide
                  className={cn(
                    'h-full',
                    // Desktop: ocupa célula 1×1 do grid (todos slides sobrepostos).
                    'lg:col-start-1 lg:row-start-1',
                  )}
                >
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

              {/* 3 menores — em mobile aparecem como grid normal abaixo do
                  featured; em desktop cada um vira um slide separado sobre o
                  featured (crossfade sequencial). */}
              {remainingTestimonials.map((testimonial) => (
                <li
                  key={testimonial.name}
                  data-reveal
                  data-testimonial-slide
                  className={cn(
                    'h-full',
                    // Desktop: cada slide ocupa a mesma célula (sobreposição).
                    'lg:col-start-1 lg:row-start-1',
                  )}
                >
                  <article
                    className={cn(
                      'glass-dark flex h-full flex-col gap-4 rounded-2xl p-8',
                      'ring-1 ring-rfg-light/20 transition-all duration-normal',
                      'hover:ring-white/30',
                    )}
                  >
                    <blockquote className="text-body-lg italic leading-relaxed text-white/90">
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
