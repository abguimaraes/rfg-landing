import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const baseClasses = [
  'inline-flex items-center justify-center gap-2',
  'font-sans font-semibold',
  'transition-all duration-normal ease-out-soft',
  'focus-visible:outline-none focus-visible:shadow-focus',
  'disabled:cursor-not-allowed',
].join(' ');

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    'text-white bg-rfg-gradient-cta shadow-cta',
    'hover:shadow-cta-hover hover:-translate-y-0.5',
    'active:scale-[0.98]',
    'disabled:bg-none disabled:bg-neutral-300 disabled:text-neutral-500 disabled:shadow-none',
  ),
  secondary: cn(
    'text-rfg-dark bg-transparent border-2 border-rfg-dark',
    'hover:bg-rfg-dark hover:text-white',
    'active:scale-[0.98]',
    'disabled:border-neutral-300 disabled:text-neutral-400',
  ),
  ghost: cn(
    'text-rfg-dark bg-transparent',
    'hover:bg-neutral-100',
    'disabled:text-neutral-400',
  ),
  link: cn(
    'text-rfg-dark underline underline-offset-4 decoration-2',
    'hover:text-rfg-mid hover:decoration-[3px]',
    'disabled:text-neutral-400',
  ),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-body-sm rounded-md',
  md: 'h-11 px-6 text-body rounded-md',
  lg: 'h-14 px-8 text-body-lg rounded-lg',
};

const linkSizeClasses: Record<ButtonSize, string> = {
  sm: 'text-body-sm',
  md: 'text-body',
  lg: 'text-body-lg',
};

const Spinner = ({ size }: { size: ButtonSize }) => {
  const dim = size === 'sm' ? 14 : size === 'md' ? 16 : 20;
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      role="status"
      aria-label="Carregando"
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 1-9 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled,
    leftIcon,
    rightIcon,
    children,
    className,
    type = 'button',
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      aria-busy={loading || undefined}
      disabled={isDisabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        variant === 'link' ? linkSizeClasses[size] : sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading ? <Spinner size={size} /> : leftIcon}
      <span>{children}</span>
      {!loading && rightIcon}
    </button>
  );
});
