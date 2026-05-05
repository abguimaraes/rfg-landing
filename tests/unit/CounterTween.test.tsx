import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock @gsap/react useGSAP — executa callback dentro de useLayoutEffect para
// que `ref.current` esteja populado (componente CounterTween early-return se
// `!ref.current`).
vi.mock('@gsap/react', async () => {
  const React = await import('react');
  return {
    useGSAP: (callback: unknown, _config?: unknown) => {
      React.useLayoutEffect(() => {
        if (typeof callback === 'function') {
          const cleanup = (callback as () => void | (() => void))();
          return typeof cleanup === 'function' ? cleanup : undefined;
        }
        return undefined;
      }, []);
    },
  };
});

// Mock GSAP — após FIX #1 (static import), podemos mockar `gsap` diretamente
// e exercitar o path reduceMotion (Nitpick #2).
//
// Importante: vi.mock() é hoisted ANTES das declarações de módulo, portanto
// usamos `vi.hoisted()` para criar refs compartilhadas com o factory.
const { mockGsapTo, mockGsapSet, mockMatchMediaAdd, reduceState } = vi.hoisted(
  () => ({
    mockGsapTo: vi.fn(),
    mockGsapSet: vi.fn(),
    mockMatchMediaAdd: vi.fn(),
    reduceState: { current: false },
  }),
);

vi.mock('gsap', () => {
  const gsap = {
    registerPlugin: vi.fn(),
    matchMedia: vi.fn(() => ({
      add: mockMatchMediaAdd,
      revert: vi.fn(),
    })),
    to: mockGsapTo,
    set: mockGsapSet,
  };
  return { default: gsap, ...gsap };
});

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { name: 'ScrollTrigger' },
}));

// Configura mockMatchMediaAdd para chamar o callback com reduceMotion=reduceState.current
mockMatchMediaAdd.mockImplementation(
  (
    _conditions: Record<string, string>,
    cb: (ctx: { conditions: Record<string, boolean> }) => void,
  ) => {
    cb({ conditions: { reduceMotion: reduceState.current } });
  },
);

// Helper para configurar reduced-motion (matchMedia + reduceState).
function setReducedMotion(reduced: boolean): void {
  reduceState.current = reduced;
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

beforeEach(() => {
  mockGsapTo.mockClear();
  mockGsapSet.mockClear();
  mockMatchMediaAdd.mockClear();
  // Re-aplica implementation (vi.restoreAllMocks no setup global limpa).
  mockMatchMediaAdd.mockImplementation(
    (
      _conditions: Record<string, string>,
      cb: (ctx: { conditions: Record<string, boolean> }) => void,
    ) => {
      cb({ conditions: { reduceMotion: reduceState.current } });
    },
  );
});

afterEach(() => {
  reduceState.current = false;
});

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

  it('expõe aria-label para leitores de tela com role="img" (a11y)', async () => {
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
    const labelled = screen.getByLabelText('Mais de 1.200 famílias atendidas');
    expect(labelled).toBeInTheDocument();
    // FIX #3: role="img" é WAI-ARIA válido para texto visualmente animado
    // com aria-label estático. role="text" foi removido (inválido).
    expect(labelled).toHaveAttribute('role', 'img');
  });

  it('em prefers-reduced-motion: reduce, salta direto ao valor final (Nitpick #2)', async () => {
    setReducedMotion(true);
    const { CounterTween } = await import('@/components/animations/CounterTween');
    render(
      <CounterTween
        to={1200}
        from={0}
        suffix=" famílias"
        ariaLabel="1200 famílias"
      />,
    );
    // matchMedia.add foi invocado pelo callback do useGSAP
    expect(mockMatchMediaAdd).toHaveBeenCalled();
    // Valor final aparece direto (não animado). pt-BR: 1.200
    expect(screen.getByText(/1\.200\s*famílias/)).toBeInTheDocument();
    // E gsap.to NÃO deve ter sido chamado no path reduced.
    expect(mockGsapTo).not.toHaveBeenCalled();
  });
});
