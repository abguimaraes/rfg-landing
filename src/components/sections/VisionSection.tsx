'use client';

import { type ReactNode } from 'react';
import { ArrowRight, Sun, CloudOff } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { useSplitText } from '@/components/animations/useSplitText';
import { vision, type VisionBlock } from '@/content/vision';
import { cn } from '@/lib/utils';

/**
 * VisionSection — Story 1.6 (FR-013).
 *
 * 2 blocos contrastantes ("daqui a dois anos"):
 * - POSITIVO: surface-hero (light), tom otimista, ícone Sun.
 * - NEGATIVO: surface-deep-rich (dark), tom sério, ícone CloudOff.
 *
 * Layout: side-by-side desktop (2-col), stack vertical mobile.
 * Sem CTA — próxima seção (Objeções) puxa pro WhatsApp.
 *
 * Efeitos:
 * - SplitText na headline da seção (words).
 * - useScrollReveal stagger nos blocos (eyebrow + headline + parágrafos).
 *
 * Compliance:
 * - CON-013: sem "garantia/garantir/garante".
 * - NFR-013: Title Case headline.
 */
export function VisionSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.18,
    y: 28,
    duration: 0.75,
    start: 'top 80%',
  });
  const headlineRef = useSplitText<HTMLHeadingElement>({
    mode: 'words',
    stagger: 0.06,
    duration: 0.7,
  });

  return (
    <section
      id="visao-futuro"
      aria-labelledby="visao-futuro-headline"
      className="relative overflow-hidden surface-soft py-16 md:py-24 lg:py-28"
    >
      <Container variant="wide" className="relative z-[1]">
        <div ref={containerRef} className="flex flex-col gap-12 md:gap-16">
          {/* Header */}
          <header className="flex max-w-3xl flex-col items-start gap-3" data-reveal>
            <Eyebrow>{vision.eyebrow}</Eyebrow>
            <h2
              id="visao-futuro-headline"
              ref={headlineRef}
              className="font-display text-h2 font-bold leading-tight tracking-tight text-neutral-900"
            >
              {vision.headline}
            </h2>
          </header>

          {/* Grid 2 blocos contrastantes */}
          <div
            className={cn(
              'grid gap-8 md:gap-6 lg:grid-cols-2 lg:gap-8',
              'relative items-stretch',
            )}
          >
            {/* Bloco POSITIVO — light */}
            <VisionCard
              block={vision.positive}
              variant="positive"
            />

            {/* Conector visual entre blocos (desktop only — mobile fica stack) */}
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute left-1/2 top-1/2 z-[2] hidden',
                '-translate-x-1/2 -translate-y-1/2 lg:flex',
                'h-12 w-12 items-center justify-center rounded-full',
                'bg-white shadow-card-featured ring-2 ring-rfg-light',
              )}
            >
              <ArrowRight size={20} className="text-rfg-dark" strokeWidth={2.5} />
            </div>

            {/* Bloco NEGATIVO — dark */}
            <VisionCard
              block={vision.negative}
              variant="negative"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

interface VisionCardProps {
  block: VisionBlock;
  variant: 'positive' | 'negative';
}

function VisionCard({ block, variant }: VisionCardProps): ReactNode {
  const isDark = variant === 'negative';
  const Icon = isDark ? CloudOff : Sun;

  return (
    <article
      data-reveal
      className={cn(
        'flex h-full flex-col gap-5 rounded-2xl p-7 md:p-9 lg:p-10',
        isDark
          ? 'surface-deep-rich text-white shadow-2xl ring-1 ring-white/10'
          : 'bg-white text-neutral-800 shadow-card-featured ring-1 ring-neutral-200',
      )}
    >
      {/* Ícone + label do bloco */}
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'inline-flex h-12 w-12 items-center justify-center rounded-xl',
            isDark
              ? 'bg-white/10 text-rfg-light ring-1 ring-white/15'
              : 'bg-rfg-light/15 text-rfg-dark ring-1 ring-rfg-light/30',
          )}
          aria-hidden="true"
        >
          <Icon size={26} strokeWidth={1.75} />
        </span>
        <span
          className={cn(
            'font-display text-caption font-semibold uppercase tracking-[0.18em]',
            isDark ? 'text-rfg-light' : 'text-rfg-dark',
          )}
        >
          {isDark ? 'Cenário da inação' : 'Cenário da decisão'}
        </span>
      </div>

      {/* Headline do bloco */}
      <h3
        className={cn(
          'font-display text-h3 font-bold leading-tight tracking-tight',
          isDark ? 'text-white' : 'text-neutral-900',
        )}
      >
        {block.headline}
      </h3>

      {/* Parágrafos */}
      <div
        className={cn(
          'flex flex-col gap-4 text-body-lg leading-relaxed',
          isDark ? 'text-white/85' : 'text-neutral-700',
        )}
      >
        {block.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {/* Linha-âncora final destacada */}
      <p
        className={cn(
          'mt-auto pt-3 font-display text-h4 font-semibold leading-snug',
          isDark ? 'text-rfg-light' : 'text-rfg-dark',
        )}
      >
        {block.closingLine}
      </p>
    </article>
  );
}
