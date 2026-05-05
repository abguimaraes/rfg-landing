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
});
