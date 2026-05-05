import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@gsap/react', () => ({
  useGSAP: () => undefined,
}));

import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { howItWorks } from '@/content/howItWorks';

describe('<HowItWorksSection />', () => {
  it('renderiza eyebrow "Como Funciona"', () => {
    render(<HowItWorksSection />);
    const matches = screen.getAllByText('Como Funciona');
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('renderiza H2 com a copy "Como Funciona" (AC-1)', () => {
    render(<HowItWorksSection />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2.textContent).toBe('Como Funciona');
  });

  it('renderiza os 3 passos como `<h3>` (AC-2)', () => {
    render(<HowItWorksSection />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(3);
  });

  it('títulos dos passos em Title Case (AC-3 — NÃO CAIXA ALTA)', () => {
    render(<HowItWorksSection />);
    howItWorks.steps.forEach((step) => {
      expect(step.titulo).not.toBe(step.titulo.toUpperCase());
    });
    expect(screen.getByText(/Passo 1: O Diagnóstico de Ângulo Morto Patrimonial/)).toBeInTheDocument();
    expect(screen.getByText(/Passo 2: O Plano Personalizado/)).toBeInTheDocument();
    expect(screen.getByText(/Passo 3: Acompanhamento Contínuo/)).toBeInTheDocument();
  });

  it('cada passo expõe label "O que acontece aqui" (AC-2)', () => {
    render(<HowItWorksSection />);
    const labels = screen.getAllByText(/O que acontece aqui:/);
    expect(labels).toHaveLength(3);
  });

  it('cada passo expõe exatamente 3 bullets concretos (AC-2)', () => {
    const { container } = render(<HowItWorksSection />);
    const lis = container.querySelectorAll('ol > li');
    expect(lis).toHaveLength(3);
    lis.forEach((stepLi) => {
      const innerBullets = stepLi.querySelectorAll('ul > li');
      expect(innerBullets.length).toBe(3);
    });
    // Cobertura total: 3 passos × 3 bullets = 9 bullets
    howItWorks.steps.forEach((step) => {
      expect(step.bullets).toHaveLength(3);
      step.bullets.forEach((b) => {
        expect(b.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it('expõe ancora id="como-funciona" (AC-7)', () => {
    const { container } = render(<HowItWorksSection />);
    expect(container.querySelector('#como-funciona')).toBeInTheDocument();
  });

  it('NÃO renderiza nenhum CTA WhatsApp (AC-6)', () => {
    const { container } = render(<HowItWorksSection />);
    const links = container.querySelectorAll('a[href^="https://wa.me"]');
    expect(links).toHaveLength(0);
  });
});
