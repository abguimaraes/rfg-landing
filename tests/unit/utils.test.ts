import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn() utility', () => {
  it('combina strings simples', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('ignora valores falsy', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b');
  });

  it('aceita objetos condicionais', () => {
    expect(cn('a', { active: true, disabled: false })).toBe('a active');
  });

  it('resolve conflitos Tailwind via tailwind-merge (px-2 perde para px-4)', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('mantém classes não conflitantes', () => {
    expect(cn('text-white bg-rfg-dark', 'rounded-md')).toBe('text-white bg-rfg-dark rounded-md');
  });
});
