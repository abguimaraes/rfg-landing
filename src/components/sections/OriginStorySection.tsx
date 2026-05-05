'use client';

import Image from 'next/image';
import { type ReactNode } from 'react';

import { BentoGrid } from '@/components/animations/BentoGrid';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { originStory } from '@/content/originStory';
import blurMap from '@/content/blur-placeholders.json';

const PHOTO_BLUR_KEY = 'public/images/socios/socios-02-estudio.webp';

/** Variantes de entrada animada (Effect #7 scrubbed timeline). */
const MILESTONE_VARIANTS = ['left', 'right', 'up'] as const;

/**
 * OriginStorySection — Story 1.4 (FR-009, FR-018, FR-030, AC-23..30).
 *
 * Container wide, `--bg-primary`. Bento grid de 5 áreas — foto sócios +
 * 3 marcos temporais (1995 / 2013 / Hoje) + citação Walter Campos.
 *
 * Compliance crítica:
 * - "13 anos" presente, "12 anos" ausente (CON-013/AC-28).
 * - Nomes literais "Ricardo Farias", "Anderson Guimarães", "Mapfre".
 * - "Marcelo" NÃO aparece (AC-29).
 * - Apenas `socios-02-estudio.webp` (não fotos individuais — FR-018/L-008).
 *
 * Effect #7 — Bento grid scrubbed timeline (desktop) + card stagger
 * (mobile) via `<BentoGrid>`. Mobile vira stack vertical sequencial.
 */
export function OriginStorySection(): ReactNode {
  const blurDataURL = (blurMap as Record<string, string>)[PHOTO_BLUR_KEY];

  return (
    <section
      id="historia"
      aria-labelledby="historia-headline"
      className="surface-deep pattern-noise relative overflow-hidden py-16 md:py-24 lg:py-28"
    >
      {/* Phase A — Blur orb (§A.3 do plan).
          Centro da seção, opacity baixa, dialoga com fundo escuro do estúdio
          da foto socios-02 — cria fusão tonal que Anderson pediu. */}
      <div
        aria-hidden="true"
        className="orb-decor left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-rfg-dark/30"
      />

      <Container variant="wide" className="relative z-[1]">
        <header className="mb-10 flex max-w-3xl flex-col gap-4 md:mb-14">
          <Eyebrow className="text-rfg-light">{originStory.eyebrow}</Eyebrow>
          <h2
            id="historia-headline"
            className="font-display text-h2 font-bold leading-tight tracking-tight text-white"
          >
            {originStory.headline}
          </h2>
        </header>

        <BentoGrid className="grid gap-6 md:grid-cols-12 md:gap-8">
          {/* Foto — área superior esquerda em desktop, topo no mobile.
              Fundo dark da seção + fundo de estúdio da foto criam fusão tonal
              natural — sem precisar mask/frame extra. */}
          <div
            data-bento-block
            data-bento-variant="photo"
            className="relative md:col-span-5 md:row-span-2"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 md:aspect-auto md:h-full">
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

          {/* 3 marcos temporais (1995, 2013, Hoje) — adaptados para dark.
              bg-neutral-800/60 sobre surface-deep cria um leve relevo;
              border white/10 substitui neutral-200; texto inverso. */}
          {originStory.milestones.map((milestone, i) => (
            <article
              key={milestone.year}
              data-bento-block
              data-bento-variant={MILESTONE_VARIANTS[i] ?? 'up'}
              className="rounded-2xl border border-white/10 bg-neutral-800/60 p-6 backdrop-blur-sm md:col-span-7 md:p-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-h3 font-bold text-rfg-light">
                  {milestone.year}
                </span>
                <span className="h-px flex-1 bg-white/15" aria-hidden="true" />
              </div>
              <h3 className="mt-2 font-display text-h4 font-semibold text-white">
                {milestone.title}
              </h3>
              <p className="mt-3 text-body leading-relaxed text-neutral-300">
                {milestone.body}
              </p>
            </article>
          ))}

          {/* Citação Walter Campos — border accent rfg-light + bg sutil.
              text neutral-200 sobre dark mantém WCAG AA (>4.5:1). */}
          <blockquote
            data-bento-block
            data-bento-variant="up"
            className="rounded-2xl border-l-4 border-rfg-light bg-neutral-800/60 p-6 backdrop-blur-sm md:col-span-12 md:p-8"
          >
            <p className="text-body-lg italic leading-relaxed text-neutral-200">
              “{originStory.quote.text}”
            </p>
            <footer className="mt-3 font-sans text-caption font-semibold not-italic text-white">
              {originStory.quote.attribution}
            </footer>
          </blockquote>

          {/* Closing — fecha a história */}
          <p
            data-bento-block
            data-bento-variant="up"
            className="text-body-lg leading-relaxed text-neutral-300 md:col-span-12"
          >
            {originStory.closing}
          </p>
        </BentoGrid>

        {/* Âncora #sobre solicitada pelo StickyNav (FR-002) */}
        <div id="sobre" aria-hidden="true" className="sr-only" />
      </Container>
    </section>
  );
}
