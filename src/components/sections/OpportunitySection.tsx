'use client';

import { type ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CounterTween } from '@/components/animations/CounterTween';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { opportunity } from '@/content/opportunity';

/**
 * Aplica destaque (Inter 600 + `--text-primary`) em todos os termos
 * `highlights` que aparecerem no parágrafo. Mantém ordem e preserva
 * texto literal sem inventar conteúdo.
 */
function renderWithHighlights(
  text: string,
  highlights: ReadonlyArray<{ text: string }>,
): ReactNode {
  if (highlights.length === 0) return text;
  // Constrói pattern com escape de regex; ordena por tamanho desc para evitar
  // matches parciais (ex: "35 anos" antes de "anos").
  const sorted = [...highlights].sort((a, b) => b.text.length - a.text.length);
  const escaped = sorted.map((h) => h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g');
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    if (sorted.some((h) => h.text === part)) {
      return (
        <strong key={i} className="font-semibold text-neutral-900">
          {part}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/**
 * OpportunitySection — Story 1.3 (FR-005, FR-028).
 *
 * Container narrow, `--bg-primary`. Eyebrow + H2 + 3 parágrafos com
 * destaques (mecanismo "Diagnóstico de Ângulo Morto Patrimonial",
 * 1.200 famílias, 35 anos, sócios). 2 stats inline com Counter Tween
 * (Efeito #5, FR-028) — respeita reduced-motion via componente.
 */
export function OpportunitySection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.18,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });

  return (
    <section
      id="oportunidade"
      aria-labelledby="oportunidade-headline"
      className="bg-white py-16 md:py-24 lg:py-28"
    >
      <Container variant="narrow">
        <div ref={containerRef} className="flex flex-col gap-6">
          <Eyebrow data-reveal>{opportunity.eyebrow}</Eyebrow>
          <h2
            id="oportunidade-headline"
            data-reveal
            className="font-display text-h2 font-bold leading-tight tracking-tight text-neutral-900"
          >
            {opportunity.headline}
          </h2>
          <div className="flex flex-col gap-5">
            {opportunity.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                data-reveal
                className="text-body-lg leading-loose text-neutral-700"
              >
                {renderWithHighlights(paragraph, opportunity.highlights)}
              </p>
            ))}
          </div>

          {/* Stats com counter tween — FR-028 */}
          <ul
            data-reveal
            className="mt-8 grid gap-4 sm:grid-cols-2"
            aria-label="Resultados da RFG em números"
          >
            {opportunity.stats.map((stat) => (
              <li
                key={stat.ariaLabel}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-5 text-center"
              >
                <CounterTween
                  to={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  ariaLabel={stat.ariaLabel}
                  className="font-display text-h3 font-bold text-rfg-dark"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
