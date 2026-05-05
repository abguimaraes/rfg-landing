import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes Tailwind, resolvendo conflitos via tailwind-merge.
 * Padrão usado pelos primitives da landing (Button, Card, Badge, etc.).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
