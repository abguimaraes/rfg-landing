'use client';

import { useCallback, type MouseEvent, type ReactNode } from 'react';
import { Check, Gift, Lock } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { paths } from '@/content/paths';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/tracking';
import { ARIA_LABELS, MESSAGES, getWhatsAppLinkProps } from '@/lib/whatsapp';
import type { CtaCategory } from '@/types/analytics';
import type { PathItem } from '@/types/content';
import type { WhatsAppMessageKey } from '@/lib/whatsapp';

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

/** Classes do botão primary `md` aplicadas direto ao `<a>`. */
const PRIMARY_MD_CLASSES =
  'inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md ' +
  'font-sans font-semibold text-body text-white bg-rfg-gradient-cta shadow-cta ' +
  'hover:shadow-cta-hover hover:-translate-y-0.5 active:scale-[0.98] ' +
  'transition-all duration-normal ease-out-soft ' +
  'focus-visible:outline-none focus-visible:shadow-focus';

interface PathCardProps {
  path: PathItem;
}

function PathCard({ path }: PathCardProps): ReactNode {
  const whatsappProps = getWhatsAppLinkProps(path.whatsappKey);

  const handleClick = useCallback(
    (_event: MouseEvent<HTMLAnchorElement>) => {
      fireCtaTracking({
        category: 'secao_9',
        label: path.slug,
        destination: whatsappProps.href,
        whatsappKey: path.whatsappKey,
      });
    },
    [path.slug, path.whatsappKey, whatsappProps.href],
  );

  return (
    <Card
      variant={path.isFeatured ? 'featured' : 'default'}
      hoverable={!path.isFeatured}
      className={cn(
        'flex h-full flex-col gap-5',
        path.isFeatured && 'pt-12 md:pt-14',
      )}
      badge={
        path.isFeatured && path.featuredBadge ? (
          <Badge variant="brand" size="md" className="shadow-md">
            {path.featuredBadge}
          </Badge>
        ) : undefined
      }
    >
      <header className="flex flex-col gap-2">
        <span aria-hidden="true" className="text-3xl leading-none">
          {path.emoji}
        </span>
        <h3 className="font-display text-h4 font-semibold leading-tight text-neutral-900">
          {path.titulo}
        </h3>
        {path.subtitulo ? (
          <p className="text-body-sm font-medium text-rfg-dark">
            {path.subtitulo}
          </p>
        ) : null}
      </header>

      <p className="text-body leading-relaxed text-neutral-700">{path.body}</p>

      <div className="flex flex-col gap-3">
        <p className="text-caption font-semibold uppercase tracking-wider text-rfg-dark">
          O que costuma fazer parte deste plano
        </p>
        <ul className="flex flex-col gap-2">
          {path.planItems.map((item, i) => (
            <li
              key={i}
              className="flex gap-2 text-body-sm leading-relaxed text-neutral-700"
            >
              <Check
                aria-hidden="true"
                size={16}
                strokeWidth={2.5}
                className="mt-1 shrink-0 text-success-700"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 rounded-lg bg-neutral-50 p-4">
        <p className="text-caption font-semibold uppercase tracking-wider text-rfg-dark">
          Bônus inclusos
        </p>
        <ul className="flex flex-col gap-2">
          {path.bonusItems.map((bonus, i) => (
            <li
              key={i}
              className="flex gap-2 text-body-sm leading-relaxed text-neutral-700"
            >
              <Gift
                aria-hidden="true"
                size={16}
                strokeWidth={2}
                className="mt-1 shrink-0 text-rfg-mid"
              />
              <span>{bonus.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <p className="text-body-sm leading-relaxed text-neutral-700">
          <span className="font-semibold text-neutral-900">Para quem é: </span>
          {path.forWho}
        </p>
        <a
          href={whatsappProps.href}
          target={whatsappProps.target}
          rel={whatsappProps.rel}
          aria-label={ARIA_LABELS[path.whatsappKey]}
          onClick={handleClick}
          className={cn(PRIMARY_MD_CLASSES, 'w-full')}
          data-testid={`paths-cta-${path.slug}`}
        >
          {path.ctaLabel}
        </a>
        <p className="text-caption text-neutral-500">{paths.ctaMicrocopy}</p>
      </div>
    </Card>
  );
}

/**
 * PathsSection — Story 1.5 (FR-011, FR-021 mensagens 2/3/4/5, AC-8..20).
 *
 * Container wide, `--bg-secondary` (`bg-neutral-50`). Eyebrow + H2 Title
 * Case + subheadline + bridge + 3 cards (Caminho 2 destacado com badge
 * "Mais Procurado" via `<Card variant="featured">`). Cada card tem
 * checklist `planItems` + bônus literais `bonusItems` + CTA WhatsApp.
 *
 * Compliance:
 * - CON-002: SEM preços / R$ em qualquer card.
 * - CON-013: SEM "garantir/garantia" no Caminho 1.
 * - FR-011 + L-002: bônus literais (1 / 2 / 3).
 * - FR-021: chaves `essencial` / `completa` / `legado` / `cta_unico`.
 *
 * 4 CTAs WhatsApp: 3 por caminho + 1 CTA único final.
 * Padrão `<a>` + classes do Button (PR #8 pattern — não aninhar `<a><Button>`).
 */
export function PathsSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.15,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });

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

  return (
    <section
      id="caminhos"
      aria-labelledby="caminhos-headline"
      className="bg-neutral-50 py-16 md:py-24 lg:py-28"
    >
      <Container variant="wide">
        <div ref={containerRef} className="flex flex-col gap-10">
          <header className="flex max-w-3xl flex-col gap-4">
            <Eyebrow data-reveal>{paths.eyebrow}</Eyebrow>
            <h2
              id="caminhos-headline"
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
              <li key={path.slug} data-reveal className="h-full">
                <PathCard path={path} />
              </li>
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
