import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type ContainerVariant = 'wide' | 'narrow' | 'default' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  variant?: ContainerVariant;
  as?: ElementType;
}

const variantClasses: Record<ContainerVariant, string> = {
  wide: 'max-w-container px-4 md:px-6 lg:px-8',
  default: 'max-w-container px-4 md:px-6 lg:px-8',
  narrow: 'max-w-narrow px-4 md:px-6',
  full: 'max-w-none px-4 md:px-6 lg:px-8',
};

export const Container = forwardRef<HTMLElement, ContainerProps>(function Container(
  { variant = 'wide', as: Component = 'div', className, children, ...props },
  ref,
) {
  // forwardRef + polymorphic precisa cast pra evitar mismatch no ref
  const Element = Component as ElementType;
  return (
    <Element
      ref={ref}
      className={cn('mx-auto', variantClasses[variant], className)}
      {...props}
    >
      {children}
    </Element>
  );
});
