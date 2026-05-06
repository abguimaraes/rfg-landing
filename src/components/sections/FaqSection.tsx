'use client';

import { type ReactNode, type MouseEvent, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { useSplitText } from '@/components/animations/useSplitText';
import { faq } from '@/content/faq';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/tracking';
import { ARIA_LABELS, MESSAGES, getWhatsAppLinkProps } from '@/lib/whatsapp';

/**
 * FaqSection — Story 1.6 (FR-016).
 *
 * 10 perguntas frequentes em acordeão `<details>`/`<summary>` HTML nativo
 * (acessível por padrão, funciona sem JS, escapa do bundle React).
 *
 * Layout: container narrow (760px), CTA WhatsApp final (chave `cta_unico`).
 *
 * Compliance:
 * - CON-013: sem "garantia/garantir/garante".
 * - I-002: contém "12 anos" (literal do briefing — pergunta 10).
 * - NFR-013: Title Case nas perguntas.
 */
export function FaqSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.12,
    y: 20,
    duration: 0.6,
    start: 'top 80%',
  });
  const headlineRef = useSplitText<HTMLHeadingElement>({
    mode: 'words',
    stagger: 0.05,
    duration: 0.7,
  });

  const whatsappProps = getWhatsAppLinkProps(faq.cta.whatsappKey);

  const handleCtaClick = useCallback(
    (_event: MouseEvent<HTMLAnchorElement>) => {
      trackEvent('cta_click', {
        category: 'faq',
        label: faq.cta.label,
        destination: whatsappProps.href,
      });
      trackEvent('whatsapp_redirect', {
        destination: faq.cta.whatsappKey,
        message: MESSAGES[faq.cta.whatsappKey],
      });
    },
    [whatsappProps.href],
  );

  return (
    <section
      id="faq"
      aria-labelledby="faq-headline"
      className="surface-soft py-16 md:py-24 lg:py-28"
    >
      <Container variant="narrow">
        <div ref={containerRef} className="flex flex-col gap-10 md:gap-12">
          <header className="flex flex-col items-start gap-3" data-reveal>
            <Eyebrow>{faq.eyebrow}</Eyebrow>
            <h2
              id="faq-headline"
              ref={headlineRef}
              className="font-display text-h2 font-bold leading-tight tracking-tight text-neutral-900"
            >
              {faq.headline}
            </h2>
          </header>

          {/* Acordeão — uma `<details>` por pergunta */}
          <ul className="flex flex-col gap-3">
            {faq.items.map((item, i) => (
              <li key={i} data-reveal>
                <details
                  className={cn(
                    'group rounded-xl bg-white shadow-card-default ring-1 ring-neutral-200',
                    'transition-shadow duration-normal ease-out-soft',
                    'hover:shadow-card-hover',
                    'open:shadow-card-hover',
                  )}
                >
                  <summary
                    className={cn(
                      'flex cursor-pointer items-center justify-between gap-4',
                      'px-6 py-5 md:px-7 md:py-6',
                      'font-display text-body-lg font-semibold text-neutral-900',
                      'list-none [&::-webkit-details-marker]:hidden',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rfg-light focus-visible:ring-offset-2',
                      'rounded-xl',
                    )}
                  >
                    <span className="flex-1">{item.question}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                        'bg-rfg-light/15 text-rfg-dark',
                        'transition-transform duration-normal ease-out-soft',
                        'group-open:rotate-180',
                      )}
                    >
                      <ChevronDown size={18} strokeWidth={2.5} />
                    </span>
                  </summary>
                  <div
                    className={cn(
                      'border-t border-neutral-100 px-6 py-5 md:px-7 md:py-6',
                      'text-body leading-relaxed text-neutral-700',
                    )}
                  >
                    <p>{item.answer}</p>
                  </div>
                </details>
              </li>
            ))}
          </ul>

          {/* CTA final */}
          <div
            data-reveal
            className={cn(
              'flex flex-col items-center gap-3 rounded-2xl bg-white p-7 text-center',
              'shadow-card-featured ring-1 ring-rfg-light/30 md:p-9',
            )}
          >
            <p className="max-w-xl font-display text-h4 font-semibold leading-snug text-neutral-900">
              {faq.cta.label}
            </p>
            <a
              href={whatsappProps.href}
              target={whatsappProps.target}
              rel={whatsappProps.rel}
              aria-label={ARIA_LABELS[faq.cta.whatsappKey]}
              onClick={handleCtaClick}
              className={cn(
                'mt-2 inline-flex items-center justify-center gap-2',
                'h-14 rounded-lg px-8 text-body-lg font-sans font-semibold',
                'bg-rfg-gradient-cta text-white shadow-cta',
                'hover:-translate-y-0.5 hover:shadow-cta-hover',
                'active:scale-[0.98]',
                'focus-visible:outline-none focus-visible:shadow-focus',
                'transition-all duration-normal ease-out-soft',
              )}
              data-testid="faq-cta"
            >
              Falar no WhatsApp
            </a>
            <span className="text-caption text-neutral-500">
              {faq.cta.microcopy}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
