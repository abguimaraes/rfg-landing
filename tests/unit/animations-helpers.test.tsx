/**
 * Smoke tests para helpers de animação GSAP novos (PR #14).
 *
 * Testes verificam: (1) mount sem crash; (2) matchMedia.add invocado;
 * (3) cleanup chamado no unmount. Não testam o efeito visual (jsdom não
 * renderiza GSAP corretamente — testes visuais ficam pra E2E/Playwright
 * em iterações futuras).
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';

// Mock @gsap/react useGSAP — executa callback sincronamente no mount.
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

const {
  mockGsapTo,
  mockGsapFrom,
  mockGsapFromTo,
  mockGsapSet,
  mockMatchMediaAdd,
  mockMatchMediaRevert,
  mockRegisterPlugin,
} = vi.hoisted(() => ({
  mockGsapTo: vi.fn(),
  mockGsapFrom: vi.fn(),
  mockGsapFromTo: vi.fn(),
  mockGsapSet: vi.fn(),
  mockMatchMediaAdd: vi.fn(),
  mockMatchMediaRevert: vi.fn(),
  mockRegisterPlugin: vi.fn(),
}));

vi.mock('gsap', () => {
  const gsap = {
    registerPlugin: mockRegisterPlugin,
    matchMedia: vi.fn(() => ({
      add: mockMatchMediaAdd,
      revert: mockMatchMediaRevert,
    })),
    to: mockGsapTo,
    from: mockGsapFrom,
    fromTo: mockGsapFromTo,
    set: mockGsapSet,
    config: vi.fn(),
    defaults: vi.fn(),
  };
  return { default: gsap, ...gsap };
});

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { name: 'ScrollTrigger', refresh: vi.fn() },
}));
vi.mock('gsap/SplitText', () => ({
  SplitText: class {
    chars: HTMLElement[] = [];
    words: HTMLElement[] = [];
    lines: HTMLElement[] = [];
    constructor() {
      // Nada — jsdom não calcula layout
    }
    revert() {}
  },
}));
vi.mock('gsap/DrawSVGPlugin', () => ({ DrawSVGPlugin: { name: 'DrawSVG' } }));
vi.mock('gsap/MorphSVGPlugin', () => ({ MorphSVGPlugin: { name: 'MorphSVG' } }));
vi.mock('gsap/ScrambleTextPlugin', () => ({
  ScrambleTextPlugin: { name: 'ScrambleText' },
}));
vi.mock('gsap/MotionPathPlugin', () => ({
  MotionPathPlugin: { name: 'MotionPath' },
}));
vi.mock('gsap/Flip', () => ({ Flip: { name: 'Flip' } }));
vi.mock('gsap/Observer', () => ({ Observer: { name: 'Observer' } }));

// Default: matchMedia.add chama callback com reduceMotion=false
mockMatchMediaAdd.mockImplementation(
  (
    _conditions: Record<string, string>,
    cb: (ctx: { conditions: Record<string, boolean> }) => void | (() => void),
  ) => {
    cb({
      conditions: {
        reduceMotion: false,
        isMobile: false,
        isDesktop: true,
        isHover: true,
      },
    });
  },
);

beforeEach(() => {
  mockGsapTo.mockClear();
  mockGsapFrom.mockClear();
  mockGsapFromTo.mockClear();
  mockGsapSet.mockClear();
  mockMatchMediaAdd.mockClear();
  mockMatchMediaRevert.mockClear();
  mockRegisterPlugin.mockClear();
});

afterEach(() => {
  // Reset to default
  mockMatchMediaAdd.mockImplementation(
    (
      _conditions: Record<string, string>,
      cb: (ctx: { conditions: Record<string, boolean> }) => void | (() => void),
    ) => {
      cb({
        conditions: {
          reduceMotion: false,
          isMobile: false,
          isDesktop: true,
          isHover: true,
        },
      });
    },
  );
});

describe('useSplitText', () => {
  it('renderiza sem crash e invoca matchMedia.add', async () => {
    const { useSplitText } = await import('@/components/animations/useSplitText');
    function Test() {
      const ref = useSplitText<HTMLHeadingElement>({ mode: 'words' });
      return <h2 ref={ref}>Texto a animar</h2>;
    }
    const { container } = render(<Test />);
    expect(container.querySelector('h2')).toBeInTheDocument();
    expect(mockMatchMediaAdd).toHaveBeenCalled();
  });
});

describe('useDrawSVG', () => {
  it('renderiza sem crash e invoca matchMedia.add', async () => {
    const { useDrawSVG } = await import('@/components/animations/useDrawSVG');
    function Test() {
      const ref = useDrawSVG<SVGSVGElement>();
      return (
        <svg ref={ref} viewBox="0 0 100 100">
          <path d="M0,0 L100,100" />
        </svg>
      );
    }
    const { container } = render(<Test />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(mockMatchMediaAdd).toHaveBeenCalled();
  });
});

describe('useScrambleText', () => {
  it('renderiza sem crash e invoca matchMedia.add', async () => {
    const { useScrambleText } = await import(
      '@/components/animations/useScrambleText'
    );
    function Test() {
      const ref = useScrambleText<HTMLSpanElement>({ text: '1.200' });
      return <span ref={ref}>placeholder</span>;
    }
    const { container } = render(<Test />);
    expect(container.querySelector('span')).toBeInTheDocument();
    expect(mockMatchMediaAdd).toHaveBeenCalled();
  });
});

describe('useTilt3D', () => {
  it('renderiza sem crash e invoca matchMedia.add', async () => {
    const { useTilt3D } = await import('@/components/animations/useTilt3D');
    function Test() {
      const ref = useTilt3D<HTMLDivElement>();
      return <div ref={ref}>card</div>;
    }
    const { container } = render(<Test />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(mockMatchMediaAdd).toHaveBeenCalled();
  });
});

describe('useParallax', () => {
  it('renderiza sem crash e invoca matchMedia.add', async () => {
    const { useParallax } = await import('@/components/animations/useParallax');
    function Test() {
      const ref = useParallax<HTMLDivElement>({ yPercent: -30 });
      return <div ref={ref}>parallax</div>;
    }
    const { container } = render(<Test />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(mockMatchMediaAdd).toHaveBeenCalled();
  });
});
