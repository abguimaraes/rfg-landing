'use client';

import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

export interface CommitmentBulletProps {
  /** Ícone lucide-react (ShieldCheck, Eye, Heart etc). */
  icon: LucideIcon;
  /** Texto do bullet (corpo). */
  children: ReactNode;
  /** Index para stagger (data-attr). */
  index: number;
  /** Headline interna opcional (text-h4 destaque). */
  headline?: string;
  /** Classes extras. */
  className?: string;
}

/**
 * CommitmentBullet — PR #23 (CommitmentSection refactor).
 *
 * Bullet visual de compromisso — ícone à esquerda em wrapper glass-light
 * iluminado + texto à direita. Espaçado generosamente. Cada bullet tem
 * `data-reveal` para entrar em stagger via useScrollReveal pai.
 *
 * Layout: ícone (chip 56px) | conteúdo (flex-1)
 * Mobile: stack vertical (ícone topo, texto abaixo).
 */
export function CommitmentBullet({
  icon: Icon,
  children,
  index,
  headline,
  className,
}: CommitmentBulletProps): ReactNode {
  return (
    <li
      data-reveal
      data-bullet-index={index}
      className={cn(
        'group flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6',
        className,
      )}
    >
      {/* Chip do ícone — bg branco translúcido com ring glow,
          contrasta sobre o azul institucional sem competir. */}
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl',
          'bg-white/12 text-white ring-1 ring-white/25 backdrop-blur-sm',
          'shadow-[0_8px_24px_-6px_rgba(76,179,230,0.45)]',
          'transition-all duration-normal',
          'group-hover:bg-white/20 group-hover:ring-white/40',
          'group-hover:shadow-[0_12px_32px_-6px_rgba(76,179,230,0.65)]',
        )}
      >
        <Icon size={26} strokeWidth={1.75} />
      </span>

      <div className="flex flex-col gap-2">
        {headline ? (
          <p className="font-display text-h4 font-semibold leading-snug text-white">
            {headline}
          </p>
        ) : null}
        <div className="text-body-lg leading-relaxed text-white/90">
          {children}
        </div>
      </div>
    </li>
  );
}
