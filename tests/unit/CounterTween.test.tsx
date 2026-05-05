import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock @gsap/react useGSAP para inspecionar comportamento determinístico.
vi.mock('@gsap/react', () => ({
  useGSAP: (callback: () => void) => {
    // Executa callback imediatamente em ambiente de teste.
    callback();
  },
}));

// Helper para mockar matchMedia retornando reduceMotion configurável.
function setReducedMotion(reduced: boolean): void {
  window.matchMedia = ((query: string) => ({
    matches: query.includes('prefers-reduced-motion: reduce') ? reduced : false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  })) as any;
}

describe('<CounterTween />', () => {
  it('mostra valor inicial (from) no SSR / mount inicial', async () => {
    setReducedMotion(false);
    const { CounterTween } = await import('@/components/animations/CounterTween');
    render(
      <CounterTween
        to={1200}
        from={0}
        suffix=" famílias"
        ariaLabel="Mais de 1200"
      />,
    );
    // Valor inicial deve ser 0 (formatado pt-BR)
    expect(screen.getByLabelText('Mais de 1200')).toBeInTheDocument();
    expect(screen.getByText(/0\s*famílias/)).toBeInTheDocument();
  });

  it('formata valores grandes em pt-BR (1.200, não 1,200)', async () => {
    setReducedMotion(false);
    const { CounterTween } = await import('@/components/animations/CounterTween');
    const customFormat = (v: number): string =>
      Math.round(v).toLocaleString('pt-BR');
    render(
      <CounterTween
        to={1200}
        from={1200}
        format={customFormat}
        ariaLabel="1200 fixo"
      />,
    );
    // pt-BR usa "." como separador de milhares
    expect(screen.getByText('1.200')).toBeInTheDocument();
  });

  it('aceita prefix e suffix sem alterar texto literal', async () => {
    setReducedMotion(false);
    const { CounterTween } = await import('@/components/animations/CounterTween');
    render(
      <CounterTween
        to={35}
        from={35}
        prefix="+"
        suffix=" anos"
        ariaLabel="35 anos"
      />,
    );
    expect(screen.getByText('+35 anos')).toBeInTheDocument();
  });

  it('expõe aria-label para leitores de tela (a11y)', async () => {
    setReducedMotion(false);
    const { CounterTween } = await import('@/components/animations/CounterTween');
    render(
      <CounterTween
        to={1200}
        prefix="+"
        suffix=" famílias atendidas"
        ariaLabel="Mais de 1.200 famílias atendidas"
      />,
    );
    expect(
      screen.getByLabelText('Mais de 1.200 famílias atendidas'),
    ).toBeInTheDocument();
  });
});
