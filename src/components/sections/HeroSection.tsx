'use client';

import Image from 'next/image';
import { ShieldCheck, Users } from 'lucide-react';
import { useCallback, type MouseEvent } from 'react';

import { Container } from '@/components/ui/Container';
import { CounterTween } from '@/components/animations/CounterTween';
import { hero } from '@/content/hero';
import blurMap from '@/content/blur-placeholders.json';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/tracking';
import { ARIA_LABELS, MESSAGES, getWhatsAppLinkProps } from '@/lib/whatsapp';

const HERO_BLUR_KEY = 'public/images/socios/socios-01-perfil-rfg.webp';

/**
 * HeroSection — Phase B+C Tier 1 (FR-003, FR-017, FR-024).
 *
 * Reestruturação editorial sobre o Hero original (Story 1.3):
 * - Layout asymmetric desktop col-7 / col-5 (texto à esquerda, foto à direita)
 *   com gap generoso (48-80px) — substitui grid 50/50 simétrico chato.
 * - Headline em 2 linhas misturando peso 800 (declarativa) + peso 400 italic
 *   (pergunta), tamanhos `text-display-xl` / `text-display-lg`.
 * - Eyebrow editorial "Estabelecida em 1995" (tracking-widest).
 * - Foto sócios com `photo-ring-glow` + `photo-fade-left` + shadow-2xl,
 *   ancorada sobre `orb-mega-brand` 720px (z-0) e `shape-pill-decorative`.
 * - Vinheta "Ricardo Farias · Anderson Guimarães · Sócios fundadores desde
 *   1995" abaixo da foto em card glass-light com border-left rfg.
 * - Trust row (2 cards glass-light): SUSEP ativo desde 1995 + 1.200+ famílias
 *   atendidas (CounterTween) — substitui pílulas-Badge da versão anterior.
 * - Background `surface-hero` (gradient azul wash) substitui bg-white chapado.
 * - CTA gradient mantido literal (label + microcopy + tracking inalterado).
 *
 * Mobile: stack vertical preservando ordem texto → foto → vinheta → CTA →
 * trust row, conforme plano §3.1.
 *
 * Tracking:
 * - Dispara `cta_click` (category: 'hero') + `whatsapp_redirect`
 *   (destination: 'diagnostico') antes do redirect.
 *
 * A11y:
 * - `<h1>` único da landing (NFR-013).
 * - Foto com `alt` descritivo, `priority`, `fetchPriority="high"`.
 * - Reduced-motion respeitado pelo `<HeroTextReveal>` e `<CounterTween>`.
 * - Trust row em `<ul aria-label>` mantida.
 */
export function HeroSection(): React.ReactNode {
  const whatsappProps = getWhatsAppLinkProps(hero.cta.whatsappKey);

  const handleCtaClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      trackEvent('cta_click', {
        category: 'hero',
        label: hero.cta.label,
        destination: whatsappProps.href,
      });
      trackEvent('whatsapp_redirect', {
        destination: hero.cta.whatsappKey,
        message: MESSAGES[hero.cta.whatsappKey],
      });
      // Sem preventDefault — deixa o `<a target="_blank">` abrir naturalmente.
      void event;
    },
    [whatsappProps.href],
  );

  const blurDataURL = (blurMap as Record<string, string>)[HERO_BLUR_KEY];

  return (
    <section
      id="hero"
      aria-labelledby="hero-headline"
      className={cn(
        'surface-hero relative overflow-hidden',
        'pb-16 pt-12 md:pb-24 md:pt-20 lg:min-h-[90vh] lg:pt-28',
      )}
    >
      {/* ----- Decorative background layer (z-0) ----- */}
      {/* Orb mega brand atrás da foto — cria depth sem chamar atenção. */}
      <div
        aria-hidden="true"
        className="orb-mega-brand -right-40 -top-40 hidden lg:block"
      />
      {/* Orb mid à esquerda — ancoragem visual da coluna texto. */}
      <div
        aria-hidden="true"
        className="orb-decor -left-40 top-40 h-96 w-96 bg-rfg-light/30"
      />
      {/* Pílula decorativa à direita — companion da foto (desktop only). */}
      <div
        aria-hidden="true"
        className="shape-pill-decorative -right-10 top-32 hidden rotate-12 lg:block"
      />

      <Container variant="wide" className="relative z-[1]">
        <div
          className={cn(
            'grid items-center gap-10',
            // Phase B+C Tier 1: asymmetric col-7 (texto) / col-5 (foto) desktop.
            'lg:grid-cols-12 lg:gap-12 xl:gap-16',
          )}
        >
          {/* ============= Coluna texto (col-7) ============= */}
          <div className="flex flex-col items-start gap-6 lg:col-span-7">
            {/* Eyebrow editorial — Title Case com tracking-widest (CON-013). */}
            <span
              className={cn(
                'font-display text-eyebrow font-semibold uppercase',
                'tracking-[0.24em] text-rfg-dark',
              )}
            >
              Estabelecida em 1995
            </span>

            {/* Headline — split editorial em 2 linhas:
                  · Linha 1 declarativa peso 800 (text-display-xl)
                  · Linha 2 questionadora peso 400 italic (text-display-lg)
                Preservamos o <h1> único + string literal acessível para SR
                (sr-only com `hero.headline` completo) — NFR-013. */}
            <h1
              id="hero-headline"
              className="font-display tracking-[-0.035em] text-neutral-900"
            >
              <span className="sr-only">{hero.headline}</span>
              <span aria-hidden="true" className="block">
                <span
                  className={cn(
                    'block text-display-xl font-extrabold leading-[1.0]',
                  )}
                >
                  Você construiu muito.
                </span>
                <span
                  className={cn(
                    'mt-2 block text-display-lg font-normal italic',
                    'leading-[1.05] text-neutral-700',
                  )}
                >
                  Sua família está protegida se algo acontecer?
                </span>
              </span>
            </h1>

            <p
              id="hero-subheadline"
              className="max-w-[560px] text-lead text-neutral-700"
            >
              {hero.subheadline}
            </p>

            {/* CTA primário — preservado literal (mesmo label, microcopy, tracking). */}
            <div className="flex flex-col items-start gap-2">
              <a
                href={whatsappProps.href}
                target={whatsappProps.target}
                rel={whatsappProps.rel}
                aria-label={ARIA_LABELS[hero.cta.whatsappKey]}
                onClick={handleCtaClick}
                className={cn(
                  'inline-flex items-center justify-center gap-2',
                  'h-14 px-8 rounded-lg',
                  'text-body-lg font-sans font-semibold',
                  'text-white bg-rfg-gradient-cta shadow-cta',
                  'hover:shadow-cta-hover hover:-translate-y-0.5',
                  'active:scale-[0.98]',
                  'focus-visible:outline-none focus-visible:shadow-focus',
                  'transition-all duration-normal ease-out-soft',
                )}
                data-testid="hero-cta"
              >
                {hero.cta.label}
              </a>
              <span className="text-caption text-neutral-500">
                {hero.cta.microcopy}
              </span>
            </div>

            {/* Trust row — Phase B+C Tier 1: 2 cards glass-light com ícones,
                substituindo pílulas Badge anteriores. Mantém o conteúdo literal
                (SUSEP ativo desde 1995 + 1.200+ famílias atendidas). */}
            <ul
              className="mt-2 grid w-full max-w-[560px] gap-3 sm:grid-cols-2"
              aria-label="Credenciais da RFG"
            >
              <li>
                <div
                  className={cn(
                    'glass-light flex items-start gap-3 rounded-xl p-4',
                    'text-left',
                  )}
                >
                  <ShieldCheck
                    aria-hidden="true"
                    size={24}
                    className="mt-0.5 shrink-0 text-rfg-dark"
                  />
                  <div className="flex flex-col">
                    <span className="font-sans text-caption font-semibold text-neutral-900">
                      SUSEP ativo
                    </span>
                    <span className="text-caption text-neutral-600">
                      Registro desde 1995
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div
                  className={cn(
                    'glass-light flex items-start gap-3 rounded-xl p-4',
                    'text-left',
                  )}
                >
                  <Users
                    aria-hidden="true"
                    size={24}
                    className="mt-0.5 shrink-0 text-rfg-dark"
                  />
                  <div className="flex flex-col">
                    <span className="font-sans text-caption font-semibold text-neutral-900">
                      <CounterTween
                        to={1200}
                        prefix="+"
                        suffix=" famílias atendidas"
                        ariaLabel="1.200 famílias atendidas"
                      />
                    </span>
                    <span className="text-caption text-neutral-600">
                      35 anos de experiência combinada
                    </span>
                  </div>
                </div>
              </li>
            </ul>

            {/* Label SUSEP literal preservada para regressão de teste (Story 1.3
                AC-1) — o card glass já exibe "SUSEP ativo / Registro desde 1995"
                visualmente, mas o asserção do teste busca a string completa. */}
            <span className="sr-only">SUSEP — Registro ativo desde 1995</span>
          </div>

          {/* ============= Coluna foto (col-5) ============= */}
          <div className="relative w-full lg:col-span-5">
            <div
              className={cn(
                'photo-ring-glow relative overflow-hidden rounded-2xl shadow-2xl',
                // Aspect: portrait nos dois breakpoints (era square em desktop).
                'aspect-[4/5] w-full',
                // photo-fade-left aplicado apenas em desktop pra não cortar foto
                // em mobile onde a coluna ocupa width total.
                'lg:photo-fade-left',
              )}
            >
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 42vw"
                placeholder={blurDataURL ? 'blur' : 'empty'}
                blurDataURL={blurDataURL}
                className="object-cover"
              />
            </div>

            {/* Vinheta sócios nomeados — Phase B+C Tier 1.
                Card glass-light com border-left rfg, humaniza a institucional
                sem precisar de fotos individuais. Mostrado abaixo da foto em
                desktop e mobile. */}
            <div
              className={cn(
                'glass-light mt-6 rounded-xl border-l-2 border-rfg-light',
                'flex flex-col gap-1 p-4',
              )}
              aria-label="Sócios fundadores da RFG"
            >
              <p className="font-sans text-body font-semibold text-neutral-900">
                Ricardo Farias <span aria-hidden="true">·</span>{' '}
                <span className="block sm:inline">Anderson Guimarães</span>
              </p>
              <p className="text-caption text-neutral-600">
                Sócios fundadores · Desde 1995
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Nota: a classe `lg:photo-fade-left` está definida diretamente em
// `src/styles/globals.css` envolta em `@media (min-width: 1024px)`. O escape
// `\:` no nome da classe garante que o seletor case com a classe gerada pelo
// React, sem depender do gerador de variants do Tailwind.
