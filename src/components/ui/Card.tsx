import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type CardVariant = 'default' | 'elevated' | 'featured' | 'quote' | 'bordered';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /**
   * Aplica hover lift (border emphasize + shadow + translateY).
   * Default true em variants `default` e `bordered`, false nos demais.
   */
  hoverable?: boolean;
  /** Slot opcional renderizado acima do conteúdo (ex.: badge "MAIS PROCURADO"). */
  badge?: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white border border-neutral-200 rounded-lg p-6 md:p-8 shadow-sm',
  bordered: 'bg-white border border-neutral-300 rounded-lg p-6 md:p-8',
  elevated: 'bg-white rounded-xl p-8 shadow-lg',
  featured: cn(
    'relative bg-white border-2 border-rfg-mid rounded-xl p-8 md:p-10 shadow-xl',
    'md:scale-[1.02]',
    // Faixa decorativa de gradiente RFG no topo
    'before:absolute before:left-0 before:right-0 before:top-0 before:h-1',
    'before:rounded-t-xl before:bg-rfg-gradient-cta',
  ),
  quote: cn(
    'bg-neutral-50 border-l-4 border-rfg-light rounded-md p-6',
    'text-body-lg italic text-neutral-700',
  ),
};

const hoverClasses =
  'transition-all duration-normal ease-out-soft hover:border-neutral-300 hover:shadow-md hover:-translate-y-0.5';

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'default', hoverable, badge, children, className, ...props },
  ref,
) {
  const shouldHover =
    hoverable ?? (variant === 'default' || variant === 'bordered');

  return (
    <div
      ref={ref}
      className={cn(variantClasses[variant], shouldHover && hoverClasses, className)}
      {...props}
    >
      {badge ? (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          {badge}
        </div>
      ) : null}
      {children}
    </div>
  );
});
