'use client';

import { type ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { problem } from '@/content/problem';

/**
 * Renderiza um parágrafo destacando a frase-âncora (Inter 600 + cor primária).
 * Aplica apenas se o parágrafo contiver a frase exata — evita falsos-positivos.
 */
function renderParagraph(text: string, anchorPhrase: string): ReactNode {
  const idx = text.indexOf(anchorPhrase);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const after = text.slice(idx + anchorPhrase.length);
  return (
    <>
      {before}
      <strong className="font-semibold text-neutral-900">{anchorPhrase}</strong>
      {after}
    </>
  );
}

/**
 * ProblemSection — Story 1.3 (FR-004).
 *
 * Container narrow (max 760px), `--bg-secondary`. H2 + 4 parágrafos com
 * fade-up stagger via `useScrollReveal` (respeita prefers-reduced-motion).
 * Frase-âncora "ainda sou novo, resolvo isso depois." recebe Inter 600
 * + cor primária (AC-14).
 *
 * Sem CTA — imersão deliberada (AC-17).
 */
export function ProblemSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.2,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });

  return (
    <section
      id="problema"
      aria-labelledby="problema-headline"
      className="bg-neutral-50 py-16 md:py-24 lg:py-28"
    >
      <Container variant="narrow">
        <div ref={containerRef} className="flex flex-col gap-6">
          <Eyebrow data-reveal>{problem.eyebrow}</Eyebrow>
          <h2
            id="problema-headline"
            data-reveal
            className="font-display text-h2 font-bold leading-tight tracking-tight text-neutral-900"
          >
            {problem.headline}
          </h2>
          <div className="flex flex-col gap-5">
            {problem.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                data-reveal
                className="text-body-lg leading-loose text-neutral-700"
              >
                {renderParagraph(paragraph, problem.anchorPhrase)}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
