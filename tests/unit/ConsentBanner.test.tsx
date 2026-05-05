import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConsentBanner } from '@/components/analytics/ConsentBanner';

describe('<ConsentBanner /> snapshot', () => {
  it('renderiza banner inicial (sem consent salvo) — snapshot', () => {
    const { container } = render(<ConsentBanner />);
    // Tem conteúdo visível?
    expect(screen.getByText(/Sua privacidade importa/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Aceitar todos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Personalizar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Recusar/i })).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
