'use client';

import { type ReactNode, type MouseEvent, useCallback } from 'react';

import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { useSplitText } from '@/components/animations/useSplitText';
import { objections, type ObjectionItem } from '@/content/objections';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/tracking';
import { ARIA_LABELS, MESSAGES, getWhatsAppLinkProps } from '@/lib/whatsapp';

/**
 * ObjectionsSection — Story 1.6 (FR-014).
 *
 * 5 objeções comuns endereçadas com tom fraternal + transparência.
 * Layout grid responsivo: 2-col desktop (3+2 ou 2+2+1 fluido), 1-col mobile.
 * CTA WhatsApp ao final (chave `objecoes`).
 *
 * Frases-chave em **bold** marcadas no copy via `**...**` — renderer
 * converte em `<strong>` com peso 600 + cor neutral-900 (light bg).
 *
 * Compliance:
 * - CON-013: sem "garantia/garantir/garante".
 * - Tom literal preservado de `docs/briefing/05-copy-landing.md` §12.
 */
export function ObjectionsSection(): ReactNode {
  const containerRef = useScrollReveal<HTMLDivElement>({
    stagger: 0.15,
    y: 24,
    duration: 0.7,
    start: 'top 80%',
  });
  const headlineRef = useSplitText<HTMLHeadingElement>({
    mode: 'words',
    stagger: 0.05,
    duration: 0.7,
  });

  const whatsappProps = getWhatsAppLinkProps(objections.cta.whatsappKey);

  const handleCtaClick = useCallback(
    (_event: MouseEvent<HTMLAnchorElement>) => {
      trackEvent('cta_click', {
        category: 'objections',
        label: objections.cta.label,
        destination: whatsappProps.href,
      });
      trackEvent('whatsapp_redirect', {
        destination: objections.cta.whatsappKey,
        message: MESSAGES[objections.cta.whatsappKey],
      });
    },
    [whatsappProps.href],
  );

  return (
    <section
      id="objecoes"
      aria-labelledby="objecoes-headline"
      className="relative overflow-hidden surface-clean bg-surface-spotlight py-16 md:py-24 lg:py-28"
    >
      <Container variant="wide" className="relative z-[1]">
        <div ref={containerRef} className="flex flex-col gap-12 md:gap-14">
          <header
            className="flex max-w-3xl flex-col items-start gap-3"
            data-reveal
          >
            <Eyebrow>{objections.eyebrow}</Eyebrow>
            <h2
              id="objecoes-headline"
              ref={headlineRef}
              className="font-display text-h2 font-bold leading-tight tracking-tight text-neutral-900"
            >
              {objections.headline}
            </h2>
          </header>

          {/* Grid de objeções — 2-col desktop, 1-col mobile */}
          <ul
            className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2"
            aria-label="Cinco objeções comuns endereçadas"
          >
            {objections.objections.map((objection) => (
              <ObjectionCard key={objection.headline} objection={objection} />
            ))}
          </ul>

          {/* CTA final */}
          <div
            data-reveal
            className={cn(
              'flex flex-col items-center gap-3 rounded-2xl bg-white p-8 text-center',
              'shadow-card-featured ring-1 ring-rfg-light/30 md:p-10',
            )}
          >
            <p className="max-w-2xl font-display text-h4 font-semibold leading-snug text-neutral-900">
              Faz sentido. Quer ver isso na prática?
            </p>
            <a
              href={whatsappProps.href}
              target={whatsappProps.target}
              rel={whatsappProps.rel}
              aria-label={ARIA_LABELS[objections.cta.whatsappKey]}
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
              data-testid="objections-cta"
            >
              {objections.cta.label}
            </a>
            <span className="text-caption text-neutral-500">
              {objections.cta.microcopy}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Renderiza parágrafo dividindo segmentos `**bold**` em `<strong>`.
 * Mantém texto literal sem inventar conteúdo.
 */
function renderParagraphWithBold(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-neutral-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

interface ObjectionCardProps {
  objection: ObjectionItem;
}

function ObjectionCard({ objection }: ObjectionCardProps): ReactNode {
  return (
    <li data-reveal className="h-full">
      <article
        className={cn(
          'flex h-full flex-col gap-4 rounded-2xl bg-white p-6 md:p-7',
          'shadow-card-default ring-1 ring-neutral-200',
          'transition-shadow duration-normal ease-out-soft',
          'hover:shadow-card-hover',
        )}
      >
        {/* Ícone emoji grande no topo */}
        <span
          aria-hidden="true"
          className="text-4xl leading-none md:text-5xl"
        >
          {objection.icon}
        </span>

        {/* Headline da objeção (entre aspas, italic) */}
        <h3
          className={cn(
            'font-display text-h4 font-semibold italic leading-snug',
            'text-neutral-900',
          )}
        >
          &ldquo;{objection.headline}&rdquo;
        </h3>

        {/* Resposta */}
        <div className="flex flex-col gap-3 text-body leading-relaxed text-neutral-700">
          {objection.paragraphs.map((paragraph, i) => (
            <p key={i}>{renderParagraphWithBold(paragraph)}</p>
          ))}
        </div>
      </article>
    </li>
  );
}
