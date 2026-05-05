import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Container } from '@/components/ui/Container';
import { AccordionItem } from '@/components/ui/AccordionItem';
import {
  buildWhatsAppUrl,
  ARIA_LABELS,
  type WhatsAppMessageKey,
} from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Dev — Components',
  robots: { index: false, follow: false },
};

const WHATSAPP_KEYS: WhatsAppMessageKey[] = [
  'diagnostico',
  'essencial',
  'completa',
  'legado',
  'cta_unico',
  'sticky_nav',
  'objecoes',
  'footer',
];

/**
 * Página interna de smoke visual dos primitives da Story 1.2.
 * Gated server-side: 404 em produção (NUNCA expor em prod).
 */
export default function DevComponentsPage(): JSX.Element {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    notFound();
  }

  return (
    <Container variant="wide" as="div" className="py-12 md:py-16">
      <SectionHeader
        eyebrow="DEV / SMOKE TEST"
        title="Primitives — Story 1.2"
        lead="Smoke visual de Button, Card, Badge, Eyebrow, Container, AccordionItem e dos 8 CTAs WhatsApp canônicos. Página oculta em produção."
        as="h1"
      />

      <hr className="my-10 border-neutral-200" />

      {/* Buttons */}
      <section aria-labelledby="dev-buttons" className="mb-12">
        <h2 id="dev-buttons" className="mb-4 font-display text-h3 font-bold">
          Button
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm">Primary SM</Button>
          <Button variant="primary" size="md">Primary MD</Button>
          <Button variant="primary" size="lg">Primary LG</Button>
          <Button variant="secondary" size="md">Secondary</Button>
          <Button variant="ghost" size="md">Ghost</Button>
          <Button variant="link" size="md">Link</Button>
          <Button variant="primary" size="md" loading>Loading</Button>
          <Button variant="primary" size="md" disabled>Disabled</Button>
        </div>
      </section>

      {/* Badges */}
      <section aria-labelledby="dev-badges" className="mb-12">
        <h2 id="dev-badges" className="mb-4 font-display text-h3 font-bold">
          Badge
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge variant="brand">Mais Procurado</Badge>
          <Badge variant="accent">Destaque</Badge>
          <Badge variant="success" size="md">SUSEP 1995</Badge>
          <Badge variant="warning">Alerta</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      {/* Eyebrow */}
      <section aria-labelledby="dev-eyebrow" className="mb-12">
        <h2 id="dev-eyebrow" className="mb-4 font-display text-h3 font-bold">
          Eyebrow
        </h2>
        <Eyebrow>PARA QUEM É</Eyebrow>
      </section>

      {/* Cards */}
      <section aria-labelledby="dev-cards" className="mb-12">
        <h2 id="dev-cards" className="mb-4 font-display text-h3 font-bold">
          Card
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card variant="default">
            <h3 className="mb-2 font-display text-h4 font-semibold">Default</h3>
            <p className="text-body text-neutral-600">
              Card padrão para pilares, depoimentos comuns, FAQ collapsed.
            </p>
          </Card>
          <Card variant="elevated">
            <h3 className="mb-2 font-display text-h4 font-semibold">Elevated</h3>
            <p className="text-body text-neutral-600">
              Para depoimentos em destaque e casos de prova.
            </p>
          </Card>
          <Card variant="featured" badge={<Badge variant="brand">Mais Procurado</Badge>}>
            <h3 className="mb-2 font-display text-h4 font-semibold">Featured</h3>
            <p className="text-body text-neutral-600">
              Pacote 2 — destaque visual com faixa decorativa de gradiente RFG.
            </p>
          </Card>
          <Card variant="quote" className="md:col-span-2 lg:col-span-3">
            “Em 35 anos de RFG, ninguém ficou sem cobertura na hora que precisou.”
            <span className="mt-2 block font-sans text-caption font-semibold not-italic text-neutral-700">
              — Ricardo Guimarães, sócio-fundador
            </span>
          </Card>
        </div>
      </section>

      {/* Accordion */}
      <section aria-labelledby="dev-accordion" className="mb-12">
        <h2 id="dev-accordion" className="mb-4 font-display text-h3 font-bold">
          AccordionItem
        </h2>
        <Container variant="narrow" as="div" className="px-0">
          <AccordionItem question="Quanto tempo leva o diagnóstico?">
            Cerca de 30 minutos por WhatsApp ou ligação direta com os sócios.
          </AccordionItem>
          <AccordionItem question="Atendem todo o Brasil?">
            A consultoria nasce em Maceió/AL, mas atende todo o território nacional.
          </AccordionItem>
          <AccordionItem question="Preciso pagar algo no diagnóstico?">
            Não. Diagnóstico inicial é 100% gratuito.
          </AccordionItem>
        </Container>
      </section>

      {/* WhatsApp CTAs */}
      <section aria-labelledby="dev-whatsapp" className="mb-12">
        <h2 id="dev-whatsapp" className="mb-4 font-display text-h3 font-bold">
          WhatsApp — 8 chaves canônicas (FR-021)
        </h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {WHATSAPP_KEYS.map((key) => (
            <li key={key}>
              <a
                href={buildWhatsAppUrl(key)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ARIA_LABELS[key]}
                className="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-white p-4 transition-all duration-normal hover:border-rfg-mid hover:shadow-md focus-visible:shadow-focus"
              >
                <span className="font-display text-caption font-semibold uppercase tracking-wider text-rfg-dark">
                  {key}
                </span>
                <span className="text-body-sm text-neutral-700">{ARIA_LABELS[key]}</span>
                <code className="break-all text-small text-neutral-500">
                  {buildWhatsAppUrl(key)}
                </code>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
