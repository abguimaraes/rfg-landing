import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant =
  | 'default'
  | 'brand'
  | 'accent'
  | 'success'
  | 'warning'
  | 'outline';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const baseClasses =
  'inline-flex items-center font-sans font-semibold uppercase rounded-full whitespace-nowrap';

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-[11px] px-2 py-0.5 tracking-[0.06em]',
  md: 'text-xs px-3 py-1 tracking-[0.05em]',
};

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-700',
  brand: 'bg-rfg-dark text-white',
  accent: 'bg-rfg-gradient-cta text-white',
  success: 'bg-success-50 text-success-700',
  warning: 'bg-warning-50 text-warning-700',
  outline: 'bg-transparent border border-rfg-mid text-rfg-dark',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'default', size = 'md', className, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
});
