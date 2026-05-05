import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@gsap/react', () => ({
  useGSAP: () => undefined,
}));

import { CommitmentSection } from '@/components/sections/CommitmentSection';

describe('<CommitmentSection />', () => {
  it('renderiza eyebrow "Nosso Compromisso"', () => {
    render(<CommitmentSection />);
    const matches = screen.getAllByText('Nosso Compromisso');
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('renderiza H2 "Nosso Compromisso" em Title Case (AC-21 — NÃO "GARANTIA")', () => {
    render(<CommitmentSection />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2.textContent).toBe('Nosso Compromisso');
    expect(h2.textContent).not.toBe(h2.textContent?.toUpperCase());
  });

  it('renderiza subheadline "Você não arrisca nada. O risco é todo nosso."', () => {
    render(<CommitmentSection />);
    expect(
      screen.getByText('Você não arrisca nada. O risco é todo nosso.'),
    ).toBeInTheDocument();
  });

  it('NÃO contém "garantia/garantir/garante" (CON-003 / CON-013 / AC-22)', () => {
    render(<CommitmentSection />);
    const text = document.body.textContent ?? '';
    expect(text).not.toMatch(/garantia|garantir|garante/i);
  });

  it('contém "13 anos" e NÃO "12 anos" (CON-013 / I-002 / AC-23)', () => {
    render(<CommitmentSection />);
    const text = document.body.textContent ?? '';
    expect(text).toMatch(/13 anos/);
    expect(text).not.toMatch(/\b12 anos\b/);
  });

  it('renderiza linha final "Se não fizer sentido para você..." em destaque (AC-25)', () => {
    render(<CommitmentSection />);
    expect(screen.getByTestId('commitment-final-line')).toHaveTextContent(
      'Se não fizer sentido para você, não tem negócio. Simples assim.',
    );
  });

  it('renderiza badge SUSEP "Registro ativo desde 1995" (AC-26)', () => {
    render(<CommitmentSection />);
    expect(
      screen.getByText(/SUSEP — Registro ativo desde 1995/i),
    ).toBeInTheDocument();
  });

  it('NÃO contém CTA WhatsApp (AC-27)', () => {
    const { container } = render(<CommitmentSection />);
    const links = container.querySelectorAll('a[href^="https://wa.me"]');
    expect(links).toHaveLength(0);
  });

  it('expõe ancora id="compromisso"', () => {
    const { container } = render(<CommitmentSection />);
    expect(container.querySelector('#compromisso')).toBeInTheDocument();
  });
});
