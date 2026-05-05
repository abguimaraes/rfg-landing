import { type AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SkipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Âncora alvo do skip — default `#conteudo`. */
  href?: string;
}

/**
 * Skip-to-content link — atende FR-040 (WCAG 2.4.1).
 * Oculto até receber foco; ao focar aparece fixo no topo esquerdo.
 */
export function SkipLink({
  href = '#conteudo',
  children = 'Pular para o conteúdo principal',
  className,
  ...props
}: SkipLinkProps): JSX.Element {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only',
        'focus:fixed focus:left-4 focus:top-4 focus:z-50',
        'focus:rounded-md focus:bg-rfg-dark focus:px-4 focus:py-2',
        'focus:text-white focus:shadow-cta focus:outline-none',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
