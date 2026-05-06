'use client';

import Image from 'next/image';
import { ShieldCheck, Users } from 'lucide-react';
import { useCallback, useRef, type MouseEvent } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { Container } from '@/components/ui/Container';
import { CounterTween } from '@/components/animations/CounterTween';
import { useParallax } from '@/components/animations/useParallax';
import { hero } from '@/content/hero';
import blurMap from '@/content/blur-placeholders.json';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/tracking';
import { ARIA_LABELS, MESSAGES, getWhatsAppLinkProps } from '@/lib/whatsapp';

const HERO_BLUR_KEY = 'public/images/socios/socios-01-perfil-rfg.webp';

/**
 * HeroSection — Phase B+C Tier 2 ENRIQUECIDO (PR #22).
 *
 * ENRIQUECIMENTO sobre o Tier 1 (PR #13) — preserva 100% do layout asymmetric
 * col-7 / col-5, copy literal, tracking e a11y. Adiciona EFEITO UAU via:
 *
 * 1. **Parallax background ornaments** (yPercent=-25):
 *    - `orb-mega-brand` (top-right, desktop)
 *    - `orb-decor` (top-left, ambos breakpoints)
 *    - `shape-pill-decorative` (right, desktop)
 *    O fundo "fica" enquanto o texto sobe — depth real sem mexer no layout.
 *
 * 2. **CTA micro-pulse infinito** (scale 1 → 1.03 → 1, duration 2s, yoyo):
 *    Convida ao clique sem ser distrativo. Power1.inOut suave; respeita
 *    `prefers-reduced-motion: reduce` (sem pulse).
 *
 * 3. **Scroll-down hint** abaixo do bento — chevron com loop bounce
 *    (yoyo true, repeat -1, duration 1.2s). Aria-hidden, decorativo, somente
 *    desktop (`lg:block`). Reduzido em mobile pra não poluir hero curto.
 *
 * Layout / copy / tracking: INALTERADOS vs Tier 1.
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

  // ----- Tier 2: parallax refs (ornamentos decorativos) -----
  // Yperc=-25 conforme briefing — fundo "respira" enquanto texto sobe.
  // mobileMultiplier=0.5 (default do helper) reduz pra 12.5% em mobile.
  const orbMegaRef = useParallax<HTMLDivElement>({ yPercent: -25 });
  const orbDecorRef = useParallax<HTMLDivElement>({ yPercent: -25 });
  const pillRef = useParallax<HTMLDivElement>({ yPercent: -25 });

  // ----- Tier 2: CTA micro-pulse infinito -----
  // Scale 1 → 1.03 → 1, 2s, yoyo, repeat -1. `prefers-reduced-motion: reduce`
  // desabilita totalmente. Tween direto via gsap.to com matchMedia.
  const ctaRef = useRef<HTMLAnchorElement>(null);
  useGSAP(
    () => {
      if (!ctaRef.current) return;
      const mm = gsap.matchMedia();
      mm.add(
        { reduceMotion: '(prefers-reduced-motion: reduce)' },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) return;
          gsap.to(ctaRef.current!, {
            scale: 1.03,
            duration: 2,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
          });
        },
      );
      return () => mm.revert();
    },
    { scope: ctaRef },
  );

  return (
    <section
      id="hero"
      aria-labelledby="hero-headline"
      className={cn(
        'surface-hero relative overflow-hidden',
        // Hotfix 2026-05-06: removido lg:min-h-[90vh] e reduzido pb pra
        // diminuir gap pro Problema (Anderson "espaçamento muito grande").
        'pb-12 pt-12 md:pb-16 md:pt-20 lg:pb-20 lg:pt-24',
      )}
    >
      {/* ----- Decorative background layer (z-0) — Tier 2 com parallax ----- */}
      {/* Orb mega brand atrás da foto — cria depth sem chamar atenção. */}
      <div
        ref={orbMegaRef}
        aria-hidden="true"
        className="orb-mega-brand -right-40 -top-40 hidden lg:block"
      />
      {/* Orb mid à esquerda — ancoragem visual da coluna texto. */}
      <div
        ref={orbDecorRef}
        aria-hidden="true"
        className="orb-decor -left-40 top-40 h-96 w-96 bg-rfg-light/30"
      />
      {/* Pílula decorativa à direita — companion da foto (desktop only). */}
      <div
        ref={pillRef}
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

            {/* CTA primário — preservado literal + Tier 2 micro-pulse infinito. */}
            <div className="flex flex-col items-start gap-2">
              <a
                ref={ctaRef}
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
                  'transition-shadow duration-normal ease-out-soft',
                  // Origem do scale fixa no centro pra pulse simétrico.
                  'origin-center',
                )}
                data-testid="hero-cta"
              >
                {hero.cta.label}
              </a>
              <span className="text-caption text-neutral-500">
                {hero.cta.microcopy}
              </span>
            </div>

            {/* Trust row — Hotfix 2026-05-06: items-stretch + h-full pra
                cards alinhados (Anderson "botões desalinhados").
                CounterTween default render valor final imediato (sem +0). */}
            <ul
              className="mt-2 grid w-full max-w-[560px] items-stretch gap-3 sm:grid-cols-2"
              aria-label="Credenciais da RFG"
            >
              <li className="h-full">
                <div
                  className={cn(
                    'glass-light flex h-full items-start gap-3 rounded-xl p-4',
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
              <li className="h-full">
                <div
                  className={cn(
                    'glass-light flex h-full items-start gap-3 rounded-xl p-4',
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
              {/* Hotfix 2026-05-06: ordem corrigida — Anderson está à
                  ESQUERDA na foto, Ricardo à DIREITA. Legenda invertida
                  (apontado por Anderson). */}
              <p className="font-sans text-body font-semibold text-neutral-900">
                Anderson Guimarães <span aria-hidden="true">·</span>{' '}
                <span className="block sm:inline">Ricardo Farias</span>
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
