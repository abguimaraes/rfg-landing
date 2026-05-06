import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

vi.mock('@gsap/react', () => ({
  useGSAP: () => undefined,
}));

// Mocka módulos GSAP usados via dynamic import (Flip + gsap) — em jsdom
// não há ambiente real de animação, então retornamos stubs. Como `vi.mock`
// é hoisted, os stubs são definidos inline dentro de cada factory.
vi.mock('gsap', () => {
  const stub = {
    registerPlugin: () => undefined,
    matchMedia: () => ({ add: () => undefined, revert: () => undefined }),
    set: () => undefined,
    to: () => undefined,
    from: () => undefined,
    fromTo: () => undefined,
    config: () => undefined,
    defaults: () => undefined,
  };
  return { default: stub, gsap: stub };
});
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: { refresh: () => undefined } }));
vi.mock('gsap/SplitText', () => ({
  SplitText: class {
    chars: never[] = [];
    words: never[] = [];
    lines: never[] = [];
    revert(): void {}
  },
}));
vi.mock('gsap/Flip', () => ({
  Flip: { getState: () => ({}), from: () => undefined },
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

  // ============================================================
  // Tier 2 PR #18 — hierarquia + Flip interaction
  // ============================================================

  it('inicia com a primeira persona em destaque (aria-pressed=true)', () => {
    render(<PersonasSection />);
    const featured = screen.getByRole('button', {
      name: /Pais e Provedores de Família — em destaque/i,
    });
    expect(featured).toHaveAttribute('aria-pressed', 'true');
  });

  it('expõe cards secundários como `role="button"` clicáveis', () => {
    render(<PersonasSection />);
    const secondary = screen.getByRole('button', {
      name: /Selecionar Profissionais Liberais e Autônomos como destaque/i,
    });
    expect(secondary).toHaveAttribute('aria-pressed', 'false');
    expect(secondary).toHaveAttribute('tabindex', '0');
  });

  it('click numa persona secundária promove ela ao destaque', async () => {
    render(<PersonasSection />);
    const secondary = screen.getByRole('button', {
      name: /Selecionar Profissionais Liberais e Autônomos como destaque/i,
    });
    fireEvent.click(secondary);
    // Após click, a persona clicada vira "em destaque" (async pq setState
    // ocorre dentro de microtask — Flip captura state via dynamic import).
    const promoted = await screen.findByRole('button', {
      name: /Profissionais Liberais e Autônomos — em destaque/i,
    });
    expect(promoted).toHaveAttribute('aria-pressed', 'true');
  });

  it('Enter ativa a troca de destaque (keyboard a11y)', async () => {
    render(<PersonasSection />);
    const secondary = screen.getByRole('button', {
      name: /Selecionar Quem Quer Realizar Sonhos sem Pagar Juros de Banco como destaque/i,
    });
    fireEvent.keyDown(secondary, { key: 'Enter' });
    const promoted = await screen.findByRole('button', {
      name: /Quem Quer Realizar Sonhos sem Pagar Juros de Banco — em destaque/i,
    });
    expect(promoted).toHaveAttribute('aria-pressed', 'true');
  });

  it('Space ativa a troca de destaque (keyboard a11y)', async () => {
    render(<PersonasSection />);
    const secondary = screen.getByRole('button', {
      name: /Selecionar Profissionais Liberais e Autônomos como destaque/i,
    });
    fireEvent.keyDown(secondary, { key: ' ' });
    const promoted = await screen.findByRole('button', {
      name: /Profissionais Liberais e Autônomos — em destaque/i,
    });
    expect(promoted).toHaveAttribute('aria-pressed', 'true');
  });

  it('headline visível "Para quem a RFG é feita" como h2', () => {
    render(<PersonasSection />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('Para quem a RFG é feita');
  });
});
