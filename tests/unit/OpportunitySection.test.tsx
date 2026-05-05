import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@gsap/react', () => ({
  useGSAP: () => undefined,
}));

import { OpportunitySection } from '@/components/sections/OpportunitySection';
import { opportunity } from '@/content/opportunity';

describe('<OpportunitySection />', () => {
  it('renderiza o eyebrow "A Oportunidade" (Title Case)', () => {
    render(<OpportunitySection />);
    expect(screen.getByText('A Oportunidade')).toBeInTheDocument();
  });

  it('renderiza o `<h2>` com headline literal', () => {
    render(<OpportunitySection />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent(opportunity.headline);
  });

  it('destaca o mecanismo único "Diagnóstico de Ângulo Morto Patrimonial"', () => {
    render(<OpportunitySection />);
    const highlight = screen.getByText('Diagnóstico de Ângulo Morto Patrimonial');
    expect(highlight.tagName).toBe('STRONG');
    expect(highlight).toHaveClass('font-semibold');
  });

  it('destaca "90% dos corretores"', () => {
    render(<OpportunitySection />);
    const highlight = screen.getByText('90% dos corretores');
    expect(highlight.tagName).toBe('STRONG');
  });

  it('destaca "Ricardo Farias e Anderson Guimarães"', () => {
    render(<OpportunitySection />);
    const highlight = screen.getByText('Ricardo Farias e Anderson Guimarães');
    expect(highlight.tagName).toBe('STRONG');
  });

  it('renderiza 2 stats com aria-label canônico', () => {
    render(<OpportunitySection />);
    expect(
      screen.getByLabelText('Mais de 1.200 famílias atendidas'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('35 anos de experiência combinada'),
    ).toBeInTheDocument();
  });
});
