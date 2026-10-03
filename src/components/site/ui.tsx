import type { ReactNode } from 'react';
import { MessageCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getWhatsAppLinkProps, type WhatsAppMessageKey } from '@/lib/whatsapp';

/**
 * Primitivos server-only da landing enxuta. Zero JS no cliente:
 * o tracking de cliques é feito por delegação no <ClickTracker />
 * via atributos `data-cta` / `data-wa`.
 */

export function Section({
  id,
  className,
  children,
  tone = 'white',
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: 'white' | 'soft' | 'dark';
}) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-16 py-16 md:py-24',
        tone === 'soft' && 'bg-neutral-50',
        tone === 'dark' && 'bg-neutral-900 text-white',
        className,
      )}
    >
      <div className="mx-auto max-w-container px-5 md:px-8">{children}</div>
    </section>
  );
}

export function Heading({
  eyebrow,
  title,
  lead,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <header className={cn('mb-10 max-w-2xl md:mb-14', center && 'mx-auto text-center')}>
      <p
        className={cn(
          'mb-3 text-small font-semibold uppercase tracking-[0.16em]',
          dark ? 'text-rfg-light' : 'text-rfg-dark',
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          'font-display text-[1.75rem] font-bold leading-tight tracking-tight md:text-[2.5rem]',
          dark ? 'text-white' : 'text-neutral-900',
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p className={cn('mt-4 text-body-lg', dark ? 'text-white/70' : 'text-neutral-600')}>
          {lead}
        </p>
      ) : null}
    </header>
  );
}

export function WaButton({
  waKey,
  label,
  category,
  variant = 'primary',
  className,
}: {
  waKey: WhatsAppMessageKey;
  label: string;
  category: string;
  variant?: 'primary' | 'outline' | 'light';
  className?: string;
}) {
  const props = getWhatsAppLinkProps(waKey);
  return (
    <a
      {...props}
      data-cta={category}
      data-wa={waKey}
      className={cn(
        'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3',
        'text-body font-semibold transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rfg-light/40',
        variant === 'primary' && 'bg-rfg-dark text-white hover:bg-[#1d5895]',
        variant === 'outline' &&
          'border border-neutral-300 text-neutral-900 hover:border-rfg-dark hover:text-rfg-dark',
        variant === 'light' && 'bg-white text-rfg-dark hover:bg-neutral-100',
        className,
      )}
    >
      <MessageCircle aria-hidden="true" size={18} />
      {label}
    </a>
  );
}
