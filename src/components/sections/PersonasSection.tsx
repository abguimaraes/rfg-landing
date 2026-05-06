'use client';

import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { IconBurst } from '@/components/animations/IconBurst';
import { useParallax } from '@/components/animations/useParallax';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { useSplitText } from '@/components/animations/useSplitText';
import { personas } from '@/content/personas';
import { PersonaCard } from '@/components/sections/personas/PersonaCard';

/**
 * PersonasSection — Tier 2 PR #18 (FR-006, FR-025, AC-1..5).
 *
 * Refator visual ENRIQUECIDO:
 * - Hierarquia clara: 1 persona DESTACADA grande (~60% espaço) + 2 secundárias.
 * - Click numa persona secundária troca o destaque via GSAP Flip plugin
 *   (layout transition smooth — captura estado ANTES do React re-render
 *   e anima entre A→B com `Flip.from`).
 * - Mobile: stack vertical, destacada no topo.
 * - IconBurst ao entrar viewport (stagger nos ícones).
 * - Headline com `useSplitText` mode="words".
 * - Tilt 3D + glow brand on hover (via `<PersonaCard>`).
 * - Reduce-motion: troca de layout instantâneo (sem Flip animation).
 *
 * Conteúdo `personas.ts` permanece intacto (AC-3/AC-4 preservados).
 */
export function PersonasSection(): ReactNode {
  /** Index da persona destacada (default: primeira). */
  const [featuredIndex, setFeaturedIndex] = useState<number>(0);
  /** Pending state pra capturar Flip ANTES do re-render do React. */
  const flipStateRef = useRef<unknown>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.15,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });

  const headlineRef = useSplitText<HTMLHeadingElement>({ mode: 'words' });
  const spotlightRef = useParallax<HTMLDivElement>({ yPercent: -10 });

  /**
   * Click handler — captura Flip state ANTES do setState (React re-render).
   * Após paint do novo layout, useLayoutEffect dispara `Flip.from` animando
   * a transição A→B suavemente (estilo Apple Card / Linear).
   */
  const handleSelect = useCallback(
    (nextIndex: number) => {
      if (nextIndex === featuredIndex) return;
      const gridEl = gridRef.current;
      if (!gridEl) {
        setFeaturedIndex(nextIndex);
        return;
      }

      // Captura state ANTES do re-render (lazy import — Flip já registered no provider).
      // Pega ref local pra evitar leitura tardia do `gridRef.current` (pode estar
      // null se o componente desmontou ou o teste já cleanup-ou).
      void (async () => {
        try {
          const { Flip } = await import('gsap/Flip');
          const targets = gridEl.querySelectorAll<HTMLElement>('[data-flip-id]');
          flipStateRef.current = Flip.getState(targets, {
            props: 'borderRadius,padding,boxShadow',
          });
        } catch {
          // ignore — Flip indisponível (test env / GSAP não carregou)
        } finally {
          setFeaturedIndex(nextIndex);
        }
      })();
    },
    [featuredIndex],
  );

  /**
   * Após paint do novo layout (state alterado), dispara Flip.from pra
   * animar entre estado A capturado e estado B atual. Respeita reduce-motion
   * (matchMedia descarta a animação — layout muda instantaneamente).
   */
  useLayoutEffect(() => {
    if (!flipStateRef.current || !gridRef.current) return;
    const stateSnapshot = flipStateRef.current;
    flipStateRef.current = null;

    let cancelled = false;
    void (async () => {
      const [{ gsap }, { Flip }] = await Promise.all([
        import('gsap'),
        import('gsap/Flip'),
      ]);
      if (cancelled) return;

      const mm = gsap.matchMedia();
      mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)' }, (ctx) => {
        if (ctx.conditions?.reduceMotion) return; // troca instantânea
        Flip.from(stateSnapshot as Parameters<typeof Flip.from>[0], {
          duration: 0.6,
          ease: 'power3.inOut',
          absolute: true,
          scale: false,
          nested: true,
        });
      });
      // Cleanup imediato — single-shot animation
      requestAnimationFrame(() => mm.revert());
    })();

    return () => {
      cancelled = true;
    };
  }, [featuredIndex]);

  // Para Flip funcionar suave, precisamos KEYS ESTÁVEIS — mesmo node DOM
  // sobrevive entre re-renders, apenas reordena/redimensiona. Mantemos
  // a ordem original de `personas.personas` e a featured/secondary é decidida
  // só via prop `isFeatured` (CSS reordena via `order-first` no mobile e
  // `col-span-2 row-span-2` no desktop, sem alterar DOM order).
  const orderedPersonas = personas.personas;

  return (
    <section
      id="personas"
      aria-labelledby="personas-headline"
      className="relative overflow-hidden surface-soft pattern-dot-grid py-16 md:py-24 lg:py-28"
    >
      {/* Spotlight decorativo — radial atrás do conteúdo, parallax sutil
          (yPercent=-10 em desktop, 50% em mobile via mobileMultiplier). */}
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
              ref={gridRef}
              aria-label="Três perfis para quem a RFG atende — clique pra alternar destaque"
              className={
                // Grid hierárquico:
                // - Mobile: stack vertical (1 col), featured fica `order-first`.
                // - Desktop: featured (col-span-2 row-span-2 ~60% área)
                //   + secundárias (col-3 stack 2 rows).
                'grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2 md:gap-6 lg:gap-8'
              }
            >
              {orderedPersonas.map((persona, originalIndex) => (
                <PersonaCard
                  key={persona.iconKey /* key ESTÁVEL — Flip reusa node DOM */}
                  persona={persona}
                  index={originalIndex}
                  isFeatured={originalIndex === featuredIndex}
                  onSelect={handleSelect}
                />
              ))}
            </ul>
          </IconBurst>
        </div>
      </Container>
    </section>
  );
}
