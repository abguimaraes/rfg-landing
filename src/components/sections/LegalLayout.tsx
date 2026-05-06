'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { type ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { Footer } from '@/components/sections/Footer';
import { cn } from '@/lib/utils';

export interface LegalLayoutProps {
  /** Eyebrow editorial (ex: "Documento Legal"). */
  eyebrow: string;
  /** Headline H1. */
  headline: string;
  /** Subheadline / data de atualização. */
  subheadline?: string;
  /** Conteúdo do documento. */
  children: ReactNode;
}

/**
 * LegalLayout — wrapper compartilhado para páginas legais
 * (Política de Privacidade, Termos de Uso).
 *
 * Estrutura:
 * - Background surface-soft + container narrow.
 * - Link "Voltar pra home" no topo (a11y).
 * - Eyebrow + H1 + subheadline.
 * - Conteúdo em prose typography.
 * - Footer reutilizado (consistência institucional).
 */
export function LegalLayout({
  eyebrow,
  headline,
  subheadline,
  children,
}: LegalLayoutProps): ReactNode {
  return (
    <>
      <main id="conteudo" className="surface-soft min-h-screen">
        <Container variant="narrow" className="py-16 md:py-24 lg:py-28">
          {/* Voltar pra home */}
          <Link
            href="/"
            className={cn(
              'inline-flex items-center gap-2 text-body-sm font-medium text-rfg-dark',
              'transition-colors duration-normal',
              'hover:text-rfg-mid focus-visible:text-rfg-mid',
              'focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4',
            )}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Voltar pra home
          </Link>

          <header className="mt-8 flex flex-col gap-3 md:mt-10">
            <span
              className={cn(
                'font-display text-eyebrow font-semibold uppercase',
                'tracking-[0.18em] text-rfg-dark',
              )}
            >
              {eyebrow}
            </span>
            <h1 className="font-display text-h1 font-bold leading-tight tracking-tight text-neutral-900">
              {headline}
            </h1>
            {subheadline ? (
              <p className="text-body-lg text-neutral-600">{subheadline}</p>
            ) : null}
          </header>

          <div
            className={cn(
              'prose prose-neutral mt-10 max-w-none md:mt-12',
              'prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight',
              'prose-h2:text-h3 prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-neutral-900',
              'prose-h3:text-h4 prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-neutral-900',
              'prose-p:text-body prose-p:leading-relaxed prose-p:text-neutral-700',
              'prose-li:text-body prose-li:text-neutral-700',
              'prose-a:text-rfg-dark prose-a:no-underline hover:prose-a:underline',
              'prose-strong:text-neutral-900 prose-strong:font-semibold',
            )}
          >
            {children}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
