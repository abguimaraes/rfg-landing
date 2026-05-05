import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {}

export const Eyebrow = forwardRef<HTMLSpanElement, EyebrowProps>(function Eyebrow(
  { className, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'font-display text-eyebrow font-semibold uppercase tracking-[0.12em] text-rfg-dark',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});
