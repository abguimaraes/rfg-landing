import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock next/image — em jsdom o componente real tem comportamento de SSR
// que polui o snapshot. Mantemos os atributos relevantes (alt, src, priority).
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { src, alt, priority, fill: _fill, ...rest } = props as {
      src: string;
      alt: string;
      priority?: boolean;
      fill?: boolean;
    };
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return (
      <img
        src={src}
        alt={alt}
        data-priority={priority ? 'true' : undefined}
        {...(rest as Record<string, unknown>)}
      />
    );
  },
}));

// Mock GSAP via @gsap/react useGSAP — não dispara animação em jsdom.
vi.mock('@gsap/react', () => ({
  useGSAP: () => undefined,
}));

import { HeroSection } from '@/components/sections/HeroSection';
import { hero } from '@/content/hero';

describe('<HeroSection />', () => {
  it('renderiza o `<h1>` com a headline literal de 05-copy-landing.md', () => {
    render(<HeroSection />);
    // O HeroTextReveal mantém a string completa em `<span class="sr-only">`.
    const headlineNodes = screen.getAllByText(hero.headline);
    expect(headlineNodes.length).toBeGreaterThan(0);
    // Há exatamente um <h1> na seção (NFR-013).
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
  });

  it('renderiza a subheadline literal', () => {
    render(<HeroSection />);
    expect(screen.getByText(hero.subheadline)).toBeInTheDocument();
  });

  it('CTA aponta para wa.me/diagnostico com aria-label correto', () => {
    render(<HeroSection />);
    const cta = screen.getByTestId('hero-cta');
    expect(cta.getAttribute('href')).toMatch(/wa\.me\/\d+\?text=/);
    expect(cta).toHaveAttribute('target', '_blank');
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer');
    expect(cta).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Diagnóstico'),
    );
  });

  it('exibe badge SUSEP "Registro ativo desde 1995"', () => {
    render(<HeroSection />);
    expect(
      screen.getByText('SUSEP — Registro ativo desde 1995'),
    ).toBeInTheDocument();
  });

  it('exibe tríade de credenciais (1.200+ famílias / 35 anos)', () => {
    render(<HeroSection />);
    expect(
      screen.getByText('1.200+ famílias atendidas'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('35 anos de experiência combinada'),
    ).toBeInTheDocument();
  });

  it('foto sócios usa next/image com alt descritivo + priority', () => {
    render(<HeroSection />);
    const img = screen.getByAltText(/Ricardo Farias e Anderson Guimarães/);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('data-priority', 'true');
  });

  it('CTA microcopy "Sem custo. Sem compromisso."', () => {
    render(<HeroSection />);
    expect(screen.getByText('Sem custo. Sem compromisso.')).toBeInTheDocument();
  });
});
