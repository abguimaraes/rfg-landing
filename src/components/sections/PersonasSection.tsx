'use client';

import { type ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { IconBurst } from '@/components/animations/IconBurst';
import { useParallax } from '@/components/animations/useParallax';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { useSplitText } from '@/components/animations/useSplitText';
import { personas } from '@/content/personas';
import { PersonaCard } from '@/components/sections/personas/PersonaCard';

/**
 * PersonasSection — Hotfix 2026-05-06.
 *
 * REMOVIDO: Flip click-to-feature interaction (Anderson "animação esquisita,
 * não faz sentido, desalinha cards") + hierarquia featured/secondary
 * desproporcional ("cards muito grandes e esquisitos").
 *
 * Voltou pra grid uniforme 3-col desktop / 1-col mobile com cards do mesmo
 * tamanho. Mantém efeitos sutis (IconBurst entry, tilt 3D leve no hover,
 * SplitText na headline).
 */
export function PersonasSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.15,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });

  const headlineRef = useSplitText<HTMLHeadingElement>({ mode: 'words' });
  const spotlightRef = useParallax<HTMLDivElement>({ yPercent: -10 });

  return (
    <section
      id="personas"
      aria-labelledby="personas-headline"
      className="relative overflow-hidden surface-soft pattern-dot-grid py-16 md:py-24 lg:py-28"
    >
      {/* Spotlight decorativo radial atrás do conteúdo (parallax sutil). */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0 bg-surface-spotlight"
      />

      <Container variant="wide" className="relative z-10">
        <div ref={containerRef} className="flex flex-col gap-8 md:gap-10">
          <header className="flex max-w-3xl flex-col items-start gap-3" data-reveal>
            <Eyebrow>{personas.eyebrow}</Eyebrow>
            <h2
              ref={headlineRef}
              id="personas-headline"
              className="font-display text-h2 font-bold leading-tight tracking-tight text-neutral-900"
            >
              Para quem a RFG é feita
            </h2>
          </header>

          <IconBurst stagger={0.18} duration={0.7}>
            <ul
              aria-label="Três perfis para quem a RFG atende"
              className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 lg:gap-8"
            >
              {personas.personas.map((persona) => (
                <PersonaCard key={persona.iconKey} persona={persona} />
              ))}
            </ul>
          </IconBurst>
        </div>
      </Container>
    </section>
  );
}
