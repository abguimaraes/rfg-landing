'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef, type ReactNode } from 'react';

import { CounterTween } from '@/components/animations/CounterTween';
import { useSplitText } from '@/components/animations/useSplitText';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TimelineCard } from '@/components/sections/origin/TimelineCard';
import { TimelineRail } from '@/components/sections/origin/TimelineRail';
import blurMap from '@/content/blur-placeholders.json';
import { originStory } from '@/content/originStory';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const PHOTO_BLUR_KEY = 'public/images/socios/socios-02-estudio.webp';

/** Ícones decorativos por marco — emojis editoriais (aria-hidden). */
const MILESTONE_ICONS: Record<string, string> = {
  '1995': '⚓',
  '2013': '🤝',
  Hoje: '🏛️',
};

/**
 * OriginStorySection — Tier 2 PR #19 ENRIQUECIDO.
 *
 * Reescrita: timeline horizontal pinned scroll-driven (desktop/tablet) +
 * timeline vertical fade-up (mobile). Cada marco da RFG (1995 → 2013 →
 * Hoje) entra em sequência conforme o scrub avança.
 *
 * Conteúdo preservado integralmente — apenas a apresentação é nova.
 *
 * EFEITO UAU (desktop ≥769px):
 * - Section PINNED pelo ScrollTrigger durante a duração da timeline.
 * - Timeline horizontal: track translaciona X conforme scroll progride.
 * - Cards entram um a um com fade + slide; ano com scramble; título com
 *   SplitText words; ícone via IconBurst.
 * - Linha SVG conectora (TimelineRail) é desenhada via DrawSVGPlugin
 *   scrub-driven entre marcos.
 *
 * MOBILE (≤768px):
 * - SEM pin (mobile = scroll vertical natural).
 * - Cards stackados verticalmente com TimelineRail vertical desenhada.
 * - Cada card aparece com fade-up via ScrollTrigger.
 *
 * Reduced motion (`prefers-reduced-motion: reduce`):
 * - Sem pin, sem scrub, sem translateX.
 * - Todos os marcos visíveis simultaneamente em estados finais.
 *
 * Compliance preservada (CON-013/AC-28/AC-29):
 * - "13 anos" presente, "12 anos" ausente.
 * - "Ricardo Farias", "Anderson Guimarães", "Mapfre" literais.
 * - "Marcelo" NÃO aparece.
 * - Foto socios-02-estudio.webp preservada.
 */
export function OriginStorySection(): ReactNode {
  const blurDataURL = (blurMap as Record<string, string>)[PHOTO_BLUR_KEY];

  // Header — SplitText words na headline
  const headlineRef = useSplitText<HTMLHeadingElement>({
    mode: 'words',
    stagger: 0.06,
    duration: 0.6,
    y: 20,
    start: 'top 80%',
  });

  // Pin + scrub container (desktop only)
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Mobile track ref (vertical timeline cards)
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pinContainer = pinContainerRef.current;
      const track = trackRef.current;
      const mobileContainer = mobileContainerRef.current;
      if (!pinContainer || !track) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 769px)',
          isMobile: '(max-width: 768px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const conditions = ctx.conditions ?? {};

          // ------- Reduced motion → estado final, sem pin nem scrub -------
          if (conditions.reduceMotion) {
            // Track aparece sem transform; cards visíveis.
            gsap.set(track, { x: 0, clearProps: 'transform' });
            const cards = pinContainer.querySelectorAll<HTMLElement>(
              '[data-timeline-card]',
            );
            gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' });

            if (mobileContainer) {
              const mobileCards = mobileContainer.querySelectorAll<HTMLElement>(
                '[data-timeline-card]',
              );
              gsap.set(mobileCards, { opacity: 1, y: 0, clearProps: 'all' });
            }
            return;
          }

          // ------- Desktop / Tablet: PIN + scrub horizontal -------
          if (conditions.isDesktop) {
            const cards = track.querySelectorAll<HTMLElement>(
              '[data-timeline-card]',
            );
            if (cards.length === 0) return;

            // Estado inicial: cards opacity 0, y 40 (entram em sequência)
            gsap.set(cards, { opacity: 0, y: 40 });

            // Calcular distância de scroll horizontal (track width - viewport width)
            const getScrollDistance = (): number => {
              const trackWidth = track.scrollWidth;
              const viewportWidth = pinContainer.offsetWidth;
              return Math.max(trackWidth - viewportWidth, 0);
            };

            // Timeline scrub: pin section, anima translateX do track
            // Cada card entra durante a sua "fatia" da timeline.
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: pinContainer,
                start: 'top top',
                // end dinâmico baseado em distância horizontal + buffer
                end: () => `+=${getScrollDistance() + window.innerHeight * 0.5}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            // Cards entram em sequência: 0 → 0.33, 0.33 → 0.66, 0.66 → 1.0
            cards.forEach((card, i) => {
              tl.to(
                card,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.3,
                  ease: 'power2.out',
                },
                i * 0.3,
              );
            });

            // Translação horizontal do track (após cards entrarem,
            // continua deslocando até último card sair do viewport caso
            // track > viewport).
            tl.to(
              track,
              {
                x: () => -getScrollDistance(),
                duration: 1,
                ease: 'none',
              },
              0,
            );

            // Refresh ScrollTrigger após mount
            ScrollTrigger.refresh();

            return () => {
              tl.kill();
            };
          }

          // ------- Mobile: timeline vertical fade-up -------
          if (conditions.isMobile && mobileContainer) {
            const cards = mobileContainer.querySelectorAll<HTMLElement>(
              '[data-timeline-card]',
            );
            if (cards.length === 0) return;

            cards.forEach((card) => {
              gsap.fromTo(
                card,
                { opacity: 0, y: 40 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    once: true,
                  },
                },
              );
            });
          }
        },
      );

      return () => mm.revert();
    },
    { dependencies: [] },
  );

  return (
    <section
      id="historia"
      aria-labelledby="historia-headline"
      className={cn(
        'surface-deep-rich pattern-noise relative overflow-hidden',
        'py-16 md:py-24 lg:py-28',
      )}
    >
      {/* Orb decorativo — depth real */}
      <div
        aria-hidden="true"
        className="orb-decor left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-rfg-dark/30"
      />

      <Container variant="wide" className="relative z-[1]">
        {/* Header — eyebrow + headline editorial */}
        <header className="mb-12 flex max-w-4xl flex-col gap-4 md:mb-16">
          <Eyebrow className="text-rfg-light">{originStory.eyebrow}</Eyebrow>
          <h2
            id="historia-headline"
            ref={headlineRef}
            className={cn(
              'font-display text-display-lg font-bold leading-tight tracking-tight',
              'text-white',
            )}
          >
            {originStory.headline}
          </h2>
        </header>

        {/* Linha-meta institucional — counter mega famílias atendidas */}
        <div className="mb-12 flex flex-col gap-2 md:mb-16">
          <p className="flex items-baseline gap-3 text-white/80">
            <CounterTween
              to={1200}
              prefix="+"
              duration={1.4}
              className={cn(
                'text-mega-gradient font-display font-extrabold',
                'text-display-xl leading-[0.95] tracking-[-0.04em]',
              )}
              ariaLabel="Mais de 1200 famílias atendidas em 13 anos"
            />
            <span className="font-display text-h4 font-semibold text-white">
              famílias · 13 anos
            </span>
          </p>
          <span className="text-body text-white/60">
            Registro SUSEP ativo desde 1995.
          </span>
        </div>
      </Container>

      {/* ============= DESKTOP / TABLET — pinned timeline horizontal ============= */}
      <div
        ref={pinContainerRef}
        className={cn(
          'hidden md:block',
          'relative h-screen min-h-[640px] w-full overflow-hidden',
        )}
        aria-label="Linha do tempo da RFG — desktop"
      >
        {/* Linha conectora — desenhada via scrub */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
          <TimelineRail orientation="horizontal" />
        </div>

        <div className="relative flex h-full items-center">
          <div
            ref={trackRef}
            className={cn(
              'flex items-center gap-12 px-12 lg:gap-16 lg:px-16',
              'will-change-transform',
            )}
          >
            {originStory.milestones.map((milestone) => (
              <TimelineCard
                key={milestone.year}
                year={milestone.year}
                title={milestone.title}
                body={milestone.body}
                icon={MILESTONE_ICONS[milestone.year] ?? '✦'}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ============= MOBILE — timeline vertical ============= */}
      <Container variant="wide" className="relative z-[1] md:hidden">
        <div
          ref={mobileContainerRef}
          className="relative flex flex-col gap-8 pl-8"
          aria-label="Linha do tempo da RFG — mobile"
        >
          {/* Rail vertical à esquerda */}
          <div className="absolute inset-y-0 left-2 w-1">
            <TimelineRail orientation="vertical" />
          </div>

          {originStory.milestones.map((milestone) => (
            <TimelineCard
              key={milestone.year}
              year={milestone.year}
              title={milestone.title}
              body={milestone.body}
              icon={MILESTONE_ICONS[milestone.year] ?? '✦'}
              className="max-w-full"
            />
          ))}
        </div>
      </Container>

      {/* ============= Citação Walter + foto + closing ============= */}
      <Container variant="wide" className="relative z-[1] mt-16 md:mt-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Foto sócios — coluna 5 desktop */}
          <div className="lg:col-span-5">
            <div
              className={cn(
                'relative aspect-[4/5] w-full overflow-hidden rounded-2xl',
                'shadow-card-featured ring-1 ring-white/10',
              )}
            >
              <Image
                src={originStory.photo.src}
                alt={originStory.photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                placeholder={blurDataURL ? 'blur' : 'empty'}
                blurDataURL={blurDataURL}
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>

          {/* Citação + closing — coluna 7 desktop */}
          <div className="flex flex-col gap-8 lg:col-span-7">
            <blockquote
              className={cn(
                'glass-dark rounded-2xl border-l-4 border-rfg-light p-7 lg:p-9',
              )}
            >
              <p className="text-body-lg italic leading-relaxed text-white/90">
                “{originStory.quote.text}”
              </p>
              <footer className="mt-4 font-sans text-caption font-semibold not-italic text-white">
                {originStory.quote.attribution}
              </footer>
            </blockquote>

            <p className="text-body-lg leading-relaxed text-white/80">
              {originStory.closing}
            </p>
          </div>
        </div>

        {/* Âncora #sobre solicitada pelo StickyNav (FR-002) */}
        <div id="sobre" aria-hidden="true" className="sr-only" />
      </Container>
    </section>
  );
}
