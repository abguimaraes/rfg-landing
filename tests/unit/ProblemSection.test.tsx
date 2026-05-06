import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@gsap/react', () => ({
  useGSAP: () => undefined,
}));

import { ProblemSection } from '@/components/sections/ProblemSection';
import { problem } from '@/content/problem';

describe('<ProblemSection />', () => {
  it('renderiza o eyebrow "O Problema" (Title Case)', () => {
    render(<ProblemSection />);
    expect(screen.getByText('O Problema')).toBeInTheDocument();
  });

  it('renderiza o `<h2>` com headline literal', () => {
    render(<ProblemSection />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent(problem.headline);
  });

  it('renderiza os 4 parágrafos do body literal', () => {
    render(<ProblemSection />);
    // Cada parágrafo é único o suficiente para um match parcial.
    expect(screen.getByText(/O apartamento\. O carro/)).toBeInTheDocument();
    expect(
      screen.getByText(/Não um dia ruim qualquer — um acidente/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Banco quer vender produto/)).toBeInTheDocument();
    expect(
      screen.getByText(/E enquanto esse número permanece invisível/),
    ).toBeInTheDocument();
  });

  it('destaca a frase-âncora "ainda sou novo, resolvo isso depois."', () => {
    render(<ProblemSection />);
    const anchor = screen.getByText(problem.anchorPhrase);
    expect(anchor.tagName).toBe('STRONG');
    expect(anchor).toHaveClass('font-semibold');
  });

  it('NÃO contém CTA (AC-17 — sem CTA na Seção 2)', () => {
    render(<ProblemSection />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renderiza a filigrana SVG decorativa (aria-hidden, role=presentation)', () => {
    const { container } = render(<ProblemSection />);
    // Filigrana é o único <svg> com role="presentation" na seção.
    const filigree = container.querySelector('svg[role="presentation"]');
    expect(filigree).toBeInTheDocument();
    expect(filigree).toHaveAttribute('aria-hidden', 'true');
    // Tem ao menos uma <path> dentro (paths das letras + ornamentos).
    const paths = filigree?.querySelectorAll('path') ?? [];
    expect(paths.length).toBeGreaterThan(5);
  });

  it('parágrafo da frase-âncora é tratado como pull-quote (blockquote estilizado)', () => {
    render(<ProblemSection />);
    // Hotfix 2026-05-06: pull-quote refeito como <blockquote> com bg
    // glass-light + border-l-4 (era <p> com text-display-lg gigante).
    const anchor = screen.getByText(problem.anchorPhrase);
    const quote = anchor.closest('blockquote');
    expect(quote).not.toBeNull();
    expect(quote).toHaveClass('border-l-4');
    expect(quote).toHaveClass('border-rfg-light');
    // Texto interno mantém font-display + italic (drama editorial menor).
    const paragraph = anchor.closest('p');
    expect(paragraph).toHaveClass('font-display');
    expect(paragraph).toHaveClass('italic');
  });
});
