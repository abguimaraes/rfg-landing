'use client';

import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { Lock } from 'lucide-react';
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react';

import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { useSplitText } from '@/components/animations/useSplitText';
import { PathCard, type PathCardHandle } from '@/components/sections/paths/PathCard';
import { paths } from '@/content/paths';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/tracking';
import { ARIA_LABELS, MESSAGES, getWhatsAppLinkProps } from '@/lib/whatsapp';
import type { CtaCategory } from '@/types/analytics';
import type { PathItem } from '@/types/content';
import type { WhatsAppMessageKey } from '@/lib/whatsapp';

gsap.registerPlugin(Flip);

interface PathCtaTrackingMeta {
  category: CtaCategory;
  label: string;
  destination: string;
  whatsappKey: WhatsAppMessageKey;
}

function fireCtaTracking(meta: PathCtaTrackingMeta): void {
  trackEvent('cta_click', {
    category: meta.category,
    label: meta.label,
    destination: meta.destination,
  });
  trackEvent('whatsapp_redirect', {
    destination: meta.whatsappKey,
    message: MESSAGES[meta.whatsappKey],
  });
}

/** Classes do botão primary `lg` aplicadas direto ao `<a>` (PR #8 pattern). */
const PRIMARY_LG_CLASSES =
  'inline-flex items-center justify-center gap-2 h-14 px-8 rounded-lg ' +
  'font-sans font-semibold text-body-lg text-white bg-rfg-gradient-cta shadow-cta ' +
  'hover:shadow-cta-hover hover:-translate-y-0.5 active:scale-[0.98] ' +
  'transition-all duration-normal ease-out-soft ' +
  'focus-visible:outline-none focus-visible:shadow-focus';

/**
 * PathsSection — Story 1.5 (FR-011, FR-021 mensagens 2/3/4/5, AC-8..20).
 *
 * **Tier 2 PR #21 — efeitos UAU:**
 * - Headline em words com `useSplitText` (reveal scroll-driven).
 * - Stagger reveal dos cards via `useScrollReveal` (mantido).
 * - **Tilt 3D mouse-follow** em cada card (`PathCard` interno).
 * - **Flip animation** ao trocar destaque — hover/click em outro caminho promove
 *   ele a `featured`, com transição mágica via GSAP Flip plugin.
 * - **IconBurst** no emoji de cada card ao entrar viewport.
 * - **Gradient sweep** no hover (varredura azul brand).
 * - **Glow brand** intensificado no card destacado.
 * - Reduced-motion: cards estáticos, mantém o featured do content (CON-013 ok).
 *
 * Compliance:
 * - CON-002: SEM preços / R$ em qualquer card.
 * - CON-013: SEM "garantir/garantia" no Caminho 1.
 * - FR-011 + L-002: bônus literais (1 / 2 / 3).
 * - FR-021: chaves `essencial` / `completa` / `legado` / `cta_unico`.
 * - A11y: cada card é `role="button"` + `tabIndex={0}` + keyboard nav (Enter/Space).
 *
 * 4 CTAs WhatsApp: 3 por caminho + 1 CTA único final.
 */
export function PathsSection(): ReactNode {
  // Slug inicial = primeiro caminho marcado como featured no content (preserva
  // semântica original: "Caminho 2 — Proteção Completa").
  const initialFeaturedSlug = useMemo<PathItem['slug']>(() => {
    const featured = paths.paths.find((p) => p.isFeatured);
    return featured?.slug ?? paths.paths[0]!.slug;
  }, []);

  const [activeSlug, setActiveSlug] = useState<PathItem['slug']>(initialFeaturedSlug);

  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.15,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });

  const headlineRef = useSplitText<HTMLHeadingElement>({
    mode: 'words',
    stagger: 0.06,
    duration: 0.7,
    y: 28,
    start: 'top 85%',
  });

  // Refs por slug — Flip captura `state` antes da troca, depois anima `from`.
  const cardRefs = useRef<Record<string, PathCardHandle | null>>({});

  const setCardRef = useCallback(
    (slug: PathItem['slug']) => (handle: PathCardHandle | null) => {
      cardRefs.current[slug] = handle;
    },
    [],
  );

  const finalCtaProps = getWhatsAppLinkProps(paths.finalCta.whatsappKey);

  const handleFinalCtaClick = useCallback(
    (_event: MouseEvent<HTMLAnchorElement>) => {
      fireCtaTracking({
        category: 'secao_9',
        label: 'cta_unico',
        destination: finalCtaProps.href,
        whatsappKey: paths.finalCta.whatsappKey,
      });
    },
    [finalCtaProps.href],
  );

  const handleCardCtaClick = useCallback((path: PathItem, destination: string) => {
    fireCtaTracking({
      category: 'secao_9',
      label: path.slug,
      destination,
      whatsappKey: path.whatsappKey,
    });
  }, []);

  // Promove um caminho a destaque com Flip animation. Idempotente.
  const handlePromote = useCallback(
    (slug: PathItem['slug']) => {
      setActiveSlug((current) => {
        if (current === slug) return current;

        // Flip funciona só com hover real + sem reduced-motion.
        const supportsHover =
          typeof window !== 'undefined' &&
          window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const reduceMotion =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!supportsHover || reduceMotion) return slug;

        const targets = Object.values(cardRefs.current)
          .map((h) => h?.el)
          .filter((el): el is HTMLLIElement => el !== null && el !== undefined);

        if (targets.length === 0) return slug;

        const state = Flip.getState(targets, {
          props: 'boxShadow,borderRadius',
        });

        // Trigger React state change DEPOIS do snapshot
        // (commit do novo layout acontece no próximo render).
        queueMicrotask(() => {
          Flip.from(state, {
            duration: 0.7,
            ease: 'power3.inOut',
            absolute: false,
            scale: true,
            simple: false,
          });
        });

        return slug;
      });
    },
    [],
  );

  return (
    <section
      id="caminhos"
      aria-labelledby="caminhos-headline"
      className="surface-clean py-16 md:py-24 lg:py-28"
    >
      <Container variant="wide">
        <div ref={containerRef} className="flex flex-col gap-10">
          <header className="flex max-w-3xl flex-col gap-4">
            <Eyebrow data-reveal>{paths.eyebrow}</Eyebrow>
            <h2
              id="caminhos-headline"
              ref={headlineRef}
              data-reveal
              className="font-display text-h2 font-bold leading-tight tracking-tight text-neutral-900"
            >
              {paths.headline}
            </h2>
            <p
              data-reveal
              className="text-lead font-medium text-neutral-800"
            >
              {paths.subheadline}
            </p>
            <p data-reveal className="text-body leading-relaxed text-neutral-700">
              {paths.bridge}
            </p>
          </header>

          <ul
            className="grid gap-6 md:grid-cols-3 md:items-stretch md:gap-8"
            aria-label="Três caminhos disponíveis após o diagnóstico"
          >
            {paths.paths.map((path) => (
              <PathCard
                key={path.slug}
                ref={setCardRef(path.slug)}
                path={path}
                isActive={activeSlug === path.slug}
                ctaMicrocopy={paths.ctaMicrocopy}
                onPromote={handlePromote}
                onCtaClick={handleCardCtaClick}
              />
            ))}
          </ul>

          {/* "Como o Investimento É Definido" — AC-14 (sem preços, CON-002) */}
          <div
            data-reveal
            className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8"
          >
            <div className="flex items-center gap-3">
              <Lock
                aria-hidden="true"
                size={24}
                strokeWidth={1.75}
                className="text-rfg-dark"
              />
              <h3 className="font-display text-h4 font-semibold text-neutral-900">
                {paths.investment.headline}
              </h3>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {paths.investment.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-body leading-relaxed text-neutral-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Selo SUSEP — AC-17 */}
          <div data-reveal className="flex justify-center">
            <Badge
              variant="success"
              size="md"
              className="!normal-case tracking-normal"
            >
              {paths.susepSeal.label}
            </Badge>
          </div>

          {/* CTA único final + escassez honesta — AC-15/AC-16 */}
          <div
            data-reveal
            className="flex flex-col items-center gap-5 rounded-2xl border border-rfg-light/40 bg-white p-8 text-center md:p-10"
          >
            <h3 className="font-display text-h3 font-bold leading-tight text-neutral-900">
              {paths.finalCta.headline}
            </h3>
            <p className="max-w-2xl text-body-lg leading-relaxed text-neutral-700">
              {paths.finalCta.body}
            </p>
            <p className="text-body font-semibold text-neutral-900">
              {paths.finalCta.reinforcement}
            </p>
            <p
              className="text-body-sm italic text-neutral-600"
              data-testid="paths-scarcity"
            >
              {paths.finalCta.scarcityLabel}
            </p>
            <a
              href={finalCtaProps.href}
              target={finalCtaProps.target}
              rel={finalCtaProps.rel}
              aria-label={ARIA_LABELS[paths.finalCta.whatsappKey]}
              onClick={handleFinalCtaClick}
              className={cn(PRIMARY_LG_CLASSES, 'w-full sm:w-auto')}
              data-testid="paths-cta-unico"
            >
              {paths.finalCta.ctaLabel}
            </a>
            <p className="text-caption text-neutral-500">
              {paths.finalCta.microcopy}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
