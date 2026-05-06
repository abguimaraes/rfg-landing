'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, type ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MegaStatBlock } from '@/components/sections/MegaStatBlock';
import { useParallax } from '@/components/animations/useParallax';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { useSplitText } from '@/components/animations/useSplitText';
import { opportunity } from '@/content/opportunity';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

/**
 * Aplica destaque (Inter 600 + `--text-primary`) em todos os termos
 * `highlights` que aparecerem no parágrafo. Mantém ordem e preserva
 * texto literal sem inventar conteúdo.
 *
 * Tier 2: highlights ganham classe `highlight-sweep` que aplica gradient
 * sweep CSS (background-clip + animation) — efeito puro CSS, leve, sem
 * GSAP por highlight (custaria muitos ScrollTriggers).
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
        <strong
          key={i}
          data-opportunity-highlight
          className={cn(
            'font-semibold text-neutral-900',
            // Gradient sweep base: linha sublinhada brand que cresce ao
            // entrar viewport (animada via GSAP). `linear-gradient` com
            // backgroundSize 0 100% inicial; GSAP anima pra 100% 100%.
            'bg-gradient-to-r from-rfg-light/35 via-rfg-light/25 to-rfg-dark/15',
            'bg-no-repeat bg-[length:0%_0.35em] bg-[position:0_88%]',
          )}
        >
          {part}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/**
 * OpportunitySection — Story 1.3 (FR-005, FR-028) + Tier 2 PR #16 (UAU).
 *
 * Reestruturação Tier 2 para virar protagonista visual da landing:
 *
 * - Background: `bg-surface-spotlight` (radial gradient brand sutil) +
 *   orb decorativo paralax atrás dos numbers (depth real sem tirar foco).
 * - Layout 2 colunas desktop: lado esquerdo narrativo (eyebrow + H2 +
 *   parágrafos), lado direito MEGA NUMBERS protagonistas em `text-mega`.
 *   Mobile empilha (numbers acima, narrativa abaixo).
 * - H2 com `useSplitText` mode='words' — reveal scroll-driven palavra a
 *   palavra (já respeita reduceMotion no helper).
 * - 2 stats refatorados em `<MegaStatBlock>`:
 *     · Scramble caótico de caracteres aleatórios (~40% do tempo)
 *     · Counter tween 0→valor com glow brand pulse na chegada
 *     · Dominam metade da seção visualmente.
 * - Highlights nos parágrafos ganham `.opportunity-highlight` — gradient
 *   sweep CSS (background-clip animado) destacando termos como
 *   "Diagnóstico de Ângulo Morto Patrimonial" sem custar ScrollTriggers.
 *
 * Mantém:
 * - Conteúdo `opportunity.ts` 100% literal (FR-005).
 * - aria-label canônico nas stats ("Mais de 1.200 famílias atendidas").
 * - Compliance SUSEP/CON-013 já é OK no copy.
 * - Reduce-motion: split skipa, mega skipa scramble+counter (valor direto).
 */
export function OpportunitySection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.18,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });
  const headlineRef = useSplitText<HTMLHeadingElement>({
    mode: 'words',
    duration: 0.7,
    y: 28,
    stagger: 0.06,
  });
  // Orb decorativo atrás dos mega numbers — parallax sutil scroll-driven.
  const orbRef = useParallax<HTMLDivElement>({
    yPercent: -18,
    mobileMultiplier: 0.4,
  });
  // Container para escopear o highlight sweep ao DOM da seção.
  const narrativeRef = useRef<HTMLDivElement>(null);

  // Gradient sweep nos `<strong data-opportunity-highlight>` — anima
  // background-size de 0% → 100% (efeito marker cresce da esquerda).
  // 1 ScrollTrigger único + stagger interno (econômico vs N triggers).
  useGSAP(
    () => {
      if (!narrativeRef.current) return;
      const targets = narrativeRef.current.querySelectorAll(
        '[data-opportunity-highlight]',
      );
      if (targets.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add(
        { reduceMotion: '(prefers-reduced-motion: reduce)' },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) {
            // Estado final direto — marker cheio sem animação.
            gsap.set(targets, { backgroundSize: '100% 0.35em' });
            return;
          }
          gsap.fromTo(
            targets,
            { backgroundSize: '0% 0.35em' },
            {
              backgroundSize: '100% 0.35em',
              duration: 0.9,
              ease: 'power2.out',
              stagger: 0.12,
              scrollTrigger: {
                trigger: narrativeRef.current!,
                start: 'top 70%',
                once: true,
              },
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: narrativeRef },
  );

  return (
    <section
      id="oportunidade"
      aria-labelledby="oportunidade-headline"
      className={cn(
        'relative overflow-hidden bg-surface-spotlight',
        'py-16 md:py-24 lg:py-28',
      )}
    >
      {/* Orb azul brand ATRÁS dos mega numbers — depth real, parallax sutil.
          Posicionado lado direito desktop, escondido em mobile pra evitar
          poluição visual nos numbers empilhados. */}
      <div
        ref={orbRef}
        aria-hidden="true"
        className={cn(
          'orb-decor right-[-10%] top-1/4 h-[28rem] w-[28rem]',
          'bg-rfg-light/35',
          'hidden lg:block',
        )}
      />

      <Container variant="wide" className="relative z-[1]">
        <div ref={containerRef} className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ============= Coluna esquerda: narrativa ============= */}
          <div
            ref={narrativeRef}
            className="flex flex-col gap-6 lg:col-span-6"
          >
            <Eyebrow data-reveal>{opportunity.eyebrow}</Eyebrow>
            <h2
              id="oportunidade-headline"
              ref={headlineRef}
              data-reveal
              className={cn(
                'font-display text-h2 font-bold leading-tight tracking-tight',
                'text-neutral-900',
              )}
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
          </div>

          {/* ============= Coluna direita: MEGA NUMBERS protagonistas ============= */}
          <aside
            data-reveal
            className={cn(
              'flex flex-col gap-12 lg:col-span-6 lg:gap-16',
              'lg:justify-center lg:pl-4',
              // Em mobile mostra primeiro (visualmente acima da narrativa)
              // via `order` — desktop mantém ordem source.
              'order-first lg:order-none',
            )}
            aria-label="Resultados da RFG em números"
          >
            {opportunity.stats.map((stat) => (
              <MegaStatBlock
                key={stat.ariaLabel}
                value={stat.value}
                prefix={stat.prefix}
                caption={(stat.suffix ?? '').trim()}
                ariaLabel={stat.ariaLabel}
              />
            ))}
          </aside>
        </div>
      </Container>
    </section>
  );
}
