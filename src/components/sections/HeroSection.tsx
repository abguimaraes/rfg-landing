'use client';

import Image from 'next/image';
import { useCallback, type MouseEvent } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { HeroTextReveal } from '@/components/animations/HeroTextReveal';
import { hero } from '@/content/hero';
import blurMap from '@/content/blur-placeholders.json';
import { trackEvent } from '@/lib/tracking';
import { ARIA_LABELS, MESSAGES, getWhatsAppLinkProps } from '@/lib/whatsapp';

const HERO_BLUR_KEY = 'public/images/socios/socios-01-perfil-rfg.webp';

/**
 * HeroSection — Story 1.3 (FR-003, FR-017, FR-024).
 *
 * Layout responsivo:
 * - Mobile: stack vertical (texto -> foto), full-width.
 * - Desktop (>=1024px): grid 2 colunas 50/50, gap `--space-12`,
 *   texto à esquerda, foto à direita.
 *
 * Tracking:
 * - Dispara `cta_click` (category: 'hero') + `whatsapp_redirect`
 *   (destination: 'diagnostico') antes do redirect.
 *
 * A11y:
 * - `<h1>` único da landing (NFR-013).
 * - Foto com `alt` descritivo, `priority`, `fetchPriority="high"`.
 * - Reduced-motion respeitado pelo `<HeroTextReveal>`.
 */
export function HeroSection(): React.ReactNode {
  const whatsappProps = getWhatsAppLinkProps(hero.cta.whatsappKey);

  const handleCtaClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      trackEvent('cta_click', {
        category: 'hero',
        label: hero.cta.label,
        destination: whatsappProps.href,
      });
      trackEvent('whatsapp_redirect', {
        destination: hero.cta.whatsappKey,
        message: MESSAGES[hero.cta.whatsappKey],
      });
      // Sem preventDefault — deixa o `<a target="_blank">` abrir naturalmente.
      void event;
    },
    [whatsappProps.href],
  );

  const blurDataURL = (blurMap as Record<string, string>)[HERO_BLUR_KEY];

  return (
    <section
      id="hero"
      aria-labelledby="hero-headline"
      className="relative overflow-hidden bg-white pb-16 pt-12 md:pb-24 md:pt-20 lg:pt-28"
    >
      <Container variant="wide">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Coluna texto */}
          <div className="flex flex-col items-start gap-6">
            <Badge variant="success" size="md" className="!normal-case tracking-normal">
              {hero.badgeSusep.label}
            </Badge>

            <HeroTextReveal
              as="h1"
              className="font-display text-h1 font-bold leading-tight tracking-tight text-neutral-900 md:text-display"
            >
              {hero.headline}
            </HeroTextReveal>

            <p
              id="hero-subheadline"
              className="max-w-[560px] text-lead text-neutral-700"
            >
              {hero.subheadline}
            </p>

            <div className="flex flex-col items-start gap-2">
              <a
                href={whatsappProps.href}
                target={whatsappProps.target}
                rel={whatsappProps.rel}
                aria-label={whatsappProps['aria-label']}
                onClick={handleCtaClick}
                className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rfg-light focus-visible:ring-offset-2"
                data-testid="hero-cta"
              >
                <Button
                  variant="primary"
                  size="lg"
                  tabIndex={-1}
                  aria-label={ARIA_LABELS[hero.cta.whatsappKey]}
                >
                  {hero.cta.label}
                </Button>
              </a>
              <span className="text-caption text-neutral-500">
                {hero.cta.microcopy}
              </span>
            </div>

            <ul
              className="mt-2 flex flex-wrap items-center gap-2"
              aria-label="Credenciais da RFG"
            >
              {hero.credentials.map((credential) => (
                <li key={credential.label}>
                  <Badge
                    variant={credential.variant}
                    size="sm"
                    className="!normal-case tracking-normal"
                  >
                    {credential.label}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna foto */}
          <div className="relative w-full">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl lg:aspect-square">
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder={blurDataURL ? 'blur' : 'empty'}
                blurDataURL={blurDataURL}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
