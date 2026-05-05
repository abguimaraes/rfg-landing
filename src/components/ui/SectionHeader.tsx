import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Eyebrow } from './Eyebrow';

export type SectionHeaderAlign = 'left' | 'center';

export interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Texto opcional logo abaixo do título (lead). */
  lead?: ReactNode;
  align?: SectionHeaderAlign;
  /** Tag do título — default `h2`. Use `h1` apenas no Hero. */
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'left',
  as: Tag = 'h2',
  className,
}: SectionHeaderProps): JSX.Element {
  const titleSize = Tag === 'h1' ? 'text-h1' : Tag === 'h2' ? 'text-h2' : 'text-h3';

  return (
    <header
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag className={cn('font-display font-bold text-neutral-900', titleSize)}>{title}</Tag>
      {lead ? (
        <p
          className={cn(
            'text-lead text-neutral-700 max-w-[720px]',
            align === 'center' && 'mx-auto',
          )}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
