import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@gsap/react', () => ({
  useGSAP: () => undefined,
}));

import { PathsSection } from '@/components/sections/PathsSection';
import { paths } from '@/content/paths';

describe('<PathsSection />', () => {
  it('renderiza eyebrow "O Caminho"', () => {
    render(<PathsSection />);
    expect(screen.getByText('O Caminho')).toBeInTheDocument();
  });

  it('renderiza H2 em Title Case (AC-8)', () => {
    render(<PathsSection />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent(paths.headline);
    expect(h2.textContent).not.toBe(h2.textContent?.toUpperCase());
  });

  it('expõe ancora id="caminhos" (AC-9)', () => {
    const { container } = render(<PathsSection />);
    expect(container.querySelector('#caminhos')).toBeInTheDocument();
  });

  it('renderiza 3 cards de caminhos (AC-10)', () => {
    render(<PathsSection />);
    expect(screen.getByTestId('paths-cta-essencial')).toBeInTheDocument();
    expect(screen.getByTestId('paths-cta-completa')).toBeInTheDocument();
    expect(screen.getByTestId('paths-cta-legado')).toBeInTheDocument();
  });

  it('Caminho 2 destacado com badge "MAIS PROCURADO" (AC-10/AC-12)', () => {
    render(<PathsSection />);
    expect(screen.getByText('MAIS PROCURADO')).toBeInTheDocument();
    expect(screen.getByText('(o caminho mais procurado)')).toBeInTheDocument();
  });

  it('CTAs apontam para wa.me com chaves WhatsApp corretas (AC-11/12/13/16)', () => {
    render(<PathsSection />);
    const ctaEssencial = screen.getByTestId('paths-cta-essencial') as HTMLAnchorElement;
    const ctaCompleta = screen.getByTestId('paths-cta-completa') as HTMLAnchorElement;
    const ctaLegado = screen.getByTestId('paths-cta-legado') as HTMLAnchorElement;
    const ctaUnico = screen.getByTestId('paths-cta-unico') as HTMLAnchorElement;

    expect(ctaEssencial.href).toContain('wa.me/');
    expect(ctaEssencial.href).toContain(encodeURIComponent('Caminho Segurança Essencial'));

    expect(ctaCompleta.href).toContain('wa.me/');
    expect(ctaCompleta.href).toContain(encodeURIComponent('Caminho Segurança Completa'));

    expect(ctaLegado.href).toContain('wa.me/');
    expect(ctaLegado.href).toContain(encodeURIComponent('Legado Familiar'));

    expect(ctaUnico.href).toContain('wa.me/');
    expect(ctaUnico.href).toContain(encodeURIComponent('diagnóstico gratuito'));
  });

  it('todos os 4 CTAs são links `<a target="_blank">` (PR #8 pattern)', () => {
    render(<PathsSection />);
    ['paths-cta-essencial', 'paths-cta-completa', 'paths-cta-legado', 'paths-cta-unico'].forEach((tid) => {
      const el = screen.getByTestId(tid) as HTMLAnchorElement;
      expect(el.tagName).toBe('A');
      expect(el.target).toBe('_blank');
      expect(el.rel).toContain('noopener');
    });
  });

  it('NÃO contém preços / "R$" / "preço" (CON-002, AC-19)', () => {
    const { container } = render(<PathsSection />);
    const text = container.textContent ?? '';
    expect(text).not.toMatch(/R\$\s?\d/);
    expect(text).not.toMatch(/\bpreço\b/i);
  });

  it('Caminho 1 NÃO contém "garantir/garantia" (CON-013, AC-19)', () => {
    render(<PathsSection />);
    // Card do Caminho 1 — checa todo o documento (NÃO deve ter em nenhum lugar)
    const text = document.body.textContent ?? '';
    expect(text).not.toMatch(/garantia|garantir|garante/i);
  });

  it('renderiza microcopy "Diagnóstico gratuito antes de qualquer decisão." (AC-11/12/13)', () => {
    render(<PathsSection />);
    const matches = screen.getAllByText('Diagnóstico gratuito antes de qualquer decisão.');
    expect(matches.length).toBeGreaterThanOrEqual(3);
  });

  it('renderiza bloco "Como o Investimento É Definido" (AC-14)', () => {
    render(<PathsSection />);
    expect(screen.getByText('Como o Investimento É Definido')).toBeInTheDocument();
  });

  it('renderiza selo "Vagas limitadas" acima do CTA único (AC-15)', () => {
    render(<PathsSection />);
    expect(screen.getByTestId('paths-scarcity')).toHaveTextContent(
      /vagas de diagnóstico são limitadas por mês/i,
    );
  });

  it('renderiza selo SUSEP "Registro ativo desde 1995" (AC-17)', () => {
    render(<PathsSection />);
    expect(
      screen.getByText(/SUSEP — Registro ativo desde 1995/i),
    ).toBeInTheDocument();
  });
});
