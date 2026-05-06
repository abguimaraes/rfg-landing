'use client';

import { type ReactNode } from 'react';
import { Handshake, Search, ShieldCheck } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { useSplitText } from '@/components/animations/useSplitText';
import { howItWorks } from '@/content/howItWorks';
import type { HowItWorksIconKey } from '@/types/content';

import { ConnectorLine } from './howitworks/ConnectorLine';
import { StepCard } from './howitworks/StepCard';

/** Mapeia chave canônica de ícone -> componente Lucide. */
const ICON_MAP: Record<HowItWorksIconKey, typeof Search> = {
  search: Search,
  'shield-check': ShieldCheck,
  handshake: Handshake,
};

/**
 * HowItWorksSection — Story 1.5 (FR-010, FR-025, AC-1..7) + Tier 2 PR #20.
 *
 * Container wide, surface-soft + pattern-blueprint. Eyebrow "Como Funciona" +
 * H2 com `useSplitText` (words) + bridge text + 3 cards numerados (01/02/03)
 * com ícone Lucide animado via `IconBurst` + emoji + título Title Case +
 * body + 3 bullets "O que acontece aqui".
 *
 * EFEITO UAU (Tier 2 ENRIQUECIDO — PR #20):
 * - Linha SVG conectora desenhada via `useDrawSVG` scrub-driven, criando
 *   "trilha" da jornada. Desktop = horizontal serpenteando entre cards;
 *   mobile = vertical conectando cards stackados.
 * - Cards entram em sequência (`useScrollReveal` stagger) sincronizados
 *   com a posição da linha que vai chegando.
 * - Cada card tem número grande (text-display-lg em rfg-mid/25 atrás do
 *   conteúdo) + ícone com burst spring + emoji.
 *
 * A11y / reduce-motion: SVG decorativo `aria-hidden`. Reduce-motion mantém
 * linha 100% desenhada e cards visíveis sem stagger (handled nos hooks).
 */
export function HowItWorksSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.2,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });
  const headlineRef = useSplitText<HTMLHeadingElement>({
    mode: 'words',
    stagger: 0.08,
    y: 24,
    duration: 0.6,
  });

  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-headline"
      className="surface-soft pattern-blueprint relative overflow-hidden py-16 md:py-24 lg:py-28"
    >
      <Container variant="wide">
        <div ref={containerRef} className="flex flex-col gap-10">
          <header className="flex max-w-3xl flex-col gap-4">
            <Eyebrow data-reveal>{howItWorks.eyebrow}</Eyebrow>
            <h2
              id="como-funciona-headline"
              ref={headlineRef}
              data-reveal
              className="font-display text-h2 font-bold leading-tight tracking-tight text-rfg-dark"
            >
              {howItWorks.eyebrow}
            </h2>
            <p data-reveal className="text-lead text-neutral-700">
              {howItWorks.bridge}
            </p>
          </header>

          {/* Trilha + cards. `relative` ancora a linha SVG absoluta. */}
          <div className="relative">
            <ConnectorLine />

            <ol
              className="relative grid gap-8 md:grid-cols-3 md:gap-8"
              aria-label="Três passos do processo da RFG"
            >
              {howItWorks.steps.map((step) => {
                const Icon = ICON_MAP[step.iconKey];
                return (
                  <li key={step.number} data-reveal className="relative h-full">
                    <StepCard step={step} Icon={Icon} />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
