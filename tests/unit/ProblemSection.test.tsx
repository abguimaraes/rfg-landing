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

  it('parágrafo da frase-âncora é tratado como pull-quote editorial', () => {
    render(<ProblemSection />);
    // O <strong> com a frase-âncora deve estar dentro de um <p> com classe
    // de pull-quote (border-l-2 + text-display-lg + font-display).
    const anchor = screen.getByText(problem.anchorPhrase);
    const paragraph = anchor.closest('p');
    expect(paragraph).not.toBeNull();
    expect(paragraph).toHaveClass('border-l-2');
    expect(paragraph).toHaveClass('font-display');
    expect(paragraph).toHaveClass('text-display-lg');
  });
});
