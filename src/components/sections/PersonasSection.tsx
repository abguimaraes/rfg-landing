'use client';

import { type ReactNode } from 'react';
import { Briefcase, KeyRound, Users } from 'lucide-react';

import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { personas } from '@/content/personas';
import type { PersonaIconKey } from '@/types/content';

/** Mapeia chave canônica de ícone do conteúdo -> componente Lucide. */
const ICON_MAP: Record<PersonaIconKey, typeof Users> = {
  family: Users,
  briefcase: Briefcase,
  key: KeyRound,
};

/**
 * PersonasSection — Story 1.4 (FR-006, FR-025, AC-1..5).
 *
 * Container wide, eyebrow "PARA QUEM É" (Title Case via Eyebrow) +
 * 3 cards uniformes em grid 3-col desktop / 1-col mobile (sem hierarquia
 * visual entre as personas — AC-2). Cada card: ícone Lucide topo + título
 * (Manrope 600) + body curto com prefixo "Isso é para você se..." (AC-3).
 *
 * Efeito #2 — Card grid stagger via `useScrollReveal` (150ms entre cards,
 * duration 0.7s, viewport 80%; respeita reduced-motion).
 */
export function PersonasSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.15,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });

  return (
    <section
      id="personas"
      aria-labelledby="personas-headline"
      className="bg-white py-16 md:py-24 lg:py-28"
    >
      <Container variant="wide">
        <div ref={containerRef} className="flex flex-col gap-8">
          <header className="flex flex-col items-start gap-3" data-reveal>
            <Eyebrow>{personas.eyebrow}</Eyebrow>
            {/* H2 visualmente oculto — o eyebrow já carrega a copy "Para Quem É",
                mas a a11y precisa de um heading hierárquico (NFR-013) que case
                com `aria-labelledby="personas-headline"` na <section>. */}
            <h2 id="personas-headline" className="sr-only">
              Para quem a RFG é feita
            </h2>
          </header>

          <ul
            className="grid gap-6 md:grid-cols-3 md:gap-8"
            aria-label="Três perfis para quem a RFG atende"
          >
            {personas.personas.map((persona) => {
              const Icon = ICON_MAP[persona.iconKey];
              return (
                <li key={persona.titulo} data-reveal className="h-full">
                  <Card
                    variant="default"
                    hoverable
                    className="flex h-full flex-col gap-4"
                  >
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.5}
                      size={40}
                      className="text-rfg-dark"
                    />
                    <h3 className="font-display text-h4 font-semibold leading-tight text-neutral-900">
                      {persona.titulo}
                    </h3>
                    <p className="text-body leading-relaxed text-neutral-700">
                      {persona.descricao}
                    </p>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
