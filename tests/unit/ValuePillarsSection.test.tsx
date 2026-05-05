import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@gsap/react', () => ({
  useGSAP: () => undefined,
}));

import { ValuePillarsSection } from '@/components/sections/ValuePillarsSection';
import { valueProps } from '@/content/valueProps';

describe('<ValuePillarsSection />', () => {
  it('renderiza eyebrow "Proposta de Valor"', () => {
    render(<ValuePillarsSection />);
    expect(screen.getByText('Proposta de Valor')).toBeInTheDocument();
  });

  it('renderiza H2 em Title Case (NÃO CAIXA ALTA — AC-6)', () => {
    render(<ValuePillarsSection />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent(valueProps.headline);
    expect(h2.textContent).not.toBe(h2.textContent?.toUpperCase());
  });

  it('renderiza os 4 pilares como `<h3>` (AC-7)', () => {
    render(<ValuePillarsSection />);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
  });

  it('Pilar 3 contém "faz com que" e NÃO "garante" (AC-9)', () => {
    render(<ValuePillarsSection />);
    const allText = document.body.textContent ?? '';
    expect(allText).toContain(
      'O seguro de vida certo faz com que eles continuem bem — mesmo sem você por perto.',
    );
    expect(allText).not.toMatch(/\bgarante\b|\bgarantia\b|\bgarantir\b/i);
  });

  it('exibe os 4 emojis canônicos (AC-11)', () => {
    render(<ValuePillarsSection />);
    expect(screen.getByText('🛡️')).toBeInTheDocument();
    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('👨‍👩‍👧')).toBeInTheDocument();
    expect(screen.getByText('🤝')).toBeInTheDocument();
  });
});
