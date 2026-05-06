'use client';

import { type ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useParallax } from '@/components/animations/useParallax';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { useSplitText } from '@/components/animations/useSplitText';
import { AnguloMortoFiligree } from '@/components/sections/AnguloMortoFiligree';
import { problem } from '@/content/problem';
import { cn } from '@/lib/utils';

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
 * ProblemSection — Tier 2 PR #15 (FR-004 + EFEITO UAU).
 *
 * Reescrita editorial sobre Story 1.3 mantendo conteúdo literal de
 * `src/content/problem.ts` (4 parágrafos + headline + frase-âncora):
 *
 * Visual:
 * - `surface-soft` + spotlight radial sutil + filigrana SVG "ÂNGULO MORTO"
 *   no fundo (`useDrawSVG` scrub-driven — desenha conforme scrolla).
 * - Container narrow preservado (760px) sobre fundo wide (filigrana ocupa
 *   100% da largura da seção, atrás do conteúdo).
 *
 * Animações:
 * - Filigrana: `useDrawSVG` scrub=1 (path desenha conforme scroll).
 * - Headline H2: `useSplitText` mode='words' (reveal palavra-a-palavra).
 * - Pull-quote frase-âncora: `useSplitText` mode='words' (entrada dramática
 *   palavra-a-palavra ao chegar no viewport).
 * - Parágrafos: `useScrollReveal` stagger 0.18 + parallax sutil yPercent=-12
 *   no wrapper para profundidade.
 * - Eyebrow: data-reveal stagger inicial.
 *
 * Compliance:
 * - CON-013: nenhuma menção à persona "Marcelo" + sem "garantia/garantir".
 * - NFR-013: Title Case na headline preservada.
 * - Frase-âncora exata literal preservada (sem inventar copy nova).
 *
 * Acessibilidade:
 * - Filigrana decorativa: `aria-hidden="true"` + `role="presentation"`.
 * - Headline preserva texto canônico ao SR via fallback do SplitText.
 * - Reduced-motion respeitado por todos os helpers (estado final imediato).
 */
export function ProblemSection(): ReactNode {
  // Reveal scroll-driven para eyebrow + parágrafos (data-reveal).
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.18,
    y: 28,
    duration: 0.75,
    start: 'top 78%',
  });

  // Split words para o headline H2 — reveal palavra-a-palavra ao entrar.
  const headlineRef = useSplitText<HTMLHeadingElement>({
    mode: 'words',
    stagger: 0.06,
    duration: 0.7,
    y: 18,
    start: 'top 82%',
  });

  // Split words na pull-quote da frase-âncora — entrada dramática.
  const pullQuoteRef = useSplitText<HTMLQuoteElement>({
    mode: 'words',
    stagger: 0.09,
    duration: 0.7,
    y: 24,
    start: 'top 80%',
  });

  // Parallax sutil no wrapper dos parágrafos (profundidade scroll-driven).
  const paragraphsRef = useParallax<HTMLDivElement>({
    yPercent: -12,
    scrub: true,
    mobileMultiplier: 0.4,
  });

  return (
    <section
      id="problema"
      aria-labelledby="problema-headline"
      className={cn(
        'surface-soft bg-surface-spotlight relative overflow-hidden',
        'py-16 md:py-24 lg:py-28',
      )}
    >
      {/* ============ Filigrana SVG "ÂNGULO MORTO" ============ */}
      {/* Wrapper absoluto cobre toda a seção (atrás do conteúdo).
          opacity baixa (0.08) + text-rfg-dark via currentColor garante
          que a filigrana seja perceptível sem competir com o texto. */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 z-0',
          'flex items-center justify-center',
          'opacity-[0.08]',
        )}
      >
        <AnguloMortoFiligree className="max-w-[1400px]" />
      </div>

      {/* ============ Glow brand-soft top-left (depth) ============ */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -left-32 top-20 z-0',
          'h-72 w-72 rounded-full bg-rfg-light/15 blur-3xl',
        )}
      />

      <Container variant="narrow" className="relative z-[1]">
        <div ref={containerRef} className="flex flex-col gap-10 md:gap-12">
          <Eyebrow data-reveal>{problem.eyebrow}</Eyebrow>

          {/* Headline — split words via useSplitText (reveal palavra-a-palavra).
              String literal direta (sem cn/twMerge) para preservar `text-h2`. */}
          <h2
            id="problema-headline"
            ref={headlineRef}
            className="font-display text-h2 font-bold leading-tight tracking-tight text-neutral-900"
          >
            {problem.headline}
          </h2>

          {/* Parágrafos com parallax sutil — profundidade scroll-driven. */}
          <div ref={paragraphsRef} className="flex flex-col gap-6">
            {problem.paragraphs.map((paragraph, i) => {
              // Hotfix 2026-05-06: pull-quote refeito.
              // Era text-display-lg (5rem) — Anderson "ficou horrível".
              // Agora: blockquote estilizado, text-h3, glass-light bg,
              // ícone de aspas decorativo, mais compacto e legível.
              const containsAnchor = paragraph.includes(problem.anchorPhrase);
              if (containsAnchor) {
                return (
                  <blockquote
                    key={i}
                    ref={pullQuoteRef}
                    data-reveal
                    className="relative my-2 rounded-2xl border-l-4 border-rfg-light bg-white/60 p-6 shadow-card-default backdrop-blur-sm md:p-8"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -top-3 left-5 select-none font-display text-display-lg leading-none text-rfg-light/40"
                    >
                      &ldquo;
                    </span>
                    <p className="font-display text-h3 font-semibold italic leading-snug tracking-tight text-neutral-900">
                      {renderParagraph(paragraph, problem.anchorPhrase)}
                    </p>
                  </blockquote>
                );
              }
              return (
                <p
                  key={i}
                  data-reveal
                  className="text-body-lg leading-loose text-neutral-700"
                >
                  {renderParagraph(paragraph, problem.anchorPhrase)}
                </p>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
