import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@gsap/react', () => ({
  useGSAP: () => undefined,
}));

import { PersonasSection } from '@/components/sections/PersonasSection';

describe('<PersonasSection />', () => {
  it('renderiza eyebrow "Para Quem É"', () => {
    render(<PersonasSection />);
    expect(screen.getByText('Para Quem É')).toBeInTheDocument();
  });

  it('renderiza 3 personas como `<h3>` (AC-2)', () => {
    render(<PersonasSection />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(3);
  });

  it('títulos das 3 personas em Title Case (CON-013)', () => {
    render(<PersonasSection />);
    expect(screen.getByText('Pais e Provedores de Família')).toBeInTheDocument();
    expect(
      screen.getByText('Profissionais Liberais e Autônomos'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Quem Quer Realizar Sonhos sem Pagar Juros de Banco'),
    ).toBeInTheDocument();
  });

  it('cada persona usa prefixo "Isso é para você se..." (AC-3)', () => {
    render(<PersonasSection />);
    const matches = screen.getAllByText(/^Isso é para você se\.{3}/);
    expect(matches).toHaveLength(3);
  });

  it('renderiza ícones Lucide com aria-hidden (AC-2 a11y)', () => {
    const { container } = render(<PersonasSection />);
    const icons = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThanOrEqual(3);
  });
});
