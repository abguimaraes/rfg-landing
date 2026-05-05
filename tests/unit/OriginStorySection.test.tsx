import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@gsap/react', () => ({
  useGSAP: () => undefined,
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { src, alt, fill: _fill, ...rest } = props as {
      src: string;
      alt: string;
      fill?: boolean;
    };
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={src} alt={alt} {...(rest as Record<string, unknown>)} />;
  },
}));

import { OriginStorySection } from '@/components/sections/OriginStorySection';

describe('<OriginStorySection />', () => {
  it('renderiza eyebrow "Nossa História"', () => {
    render(<OriginStorySection />);
    expect(screen.getByText('Nossa História')).toBeInTheDocument();
  });

  it('renderiza H2 literal "Por que a RFG existe..."', () => {
    render(<OriginStorySection />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent(
      'Por que a RFG existe — e por que isso importa para você',
    );
  });

  it('contém os 3 marcos: 1995, 2013, Hoje (AC-24)', () => {
    render(<OriginStorySection />);
    expect(screen.getByText('1995')).toBeInTheDocument();
    expect(screen.getByText('2013')).toBeInTheDocument();
    expect(screen.getByText('Hoje')).toBeInTheDocument();
  });

  it('contém "13 anos" e NÃO "12 anos" no body (CON-013/AC-28)', () => {
    render(<OriginStorySection />);
    const allText = document.body.textContent ?? '';
    expect(allText).toMatch(/13 anos/);
    expect(allText).not.toMatch(/\b12 anos\b/);
  });

  it('contém nomes literais Ricardo Farias / Anderson Guimarães / Mapfre (AC-28)', () => {
    render(<OriginStorySection />);
    const allText = document.body.textContent ?? '';
    expect(allText).toContain('Ricardo Farias');
    expect(allText).not.toMatch(/Ricardo Guimarães/);
    expect(allText).toContain('Anderson Guimarães');
    expect(allText).toContain('Mapfre');
  });

  it('NÃO contém "Marcelo" (AC-29)', () => {
    render(<OriginStorySection />);
    const allText = document.body.textContent ?? '';
    expect(allText).not.toMatch(/\bMarcelo\b/);
  });

  it('citação atribuída ao Walter Campos com 12+ anos (AC-24)', () => {
    render(<OriginStorySection />);
    expect(
      screen.getByText(/Walter Campos — cliente há mais de doze anos/),
    ).toBeInTheDocument();
  });

  it('foto sócios usa socios-02-estudio.webp (FR-018/L-008)', () => {
    render(<OriginStorySection />);
    const img = screen.getByAltText(/Ricardo Farias e Anderson Guimarães/);
    expect(img).toHaveAttribute('src', '/images/socios/socios-02-estudio.webp');
  });

  it('expõe âncora #sobre para o StickyNav', () => {
    const { container } = render(<OriginStorySection />);
    expect(container.querySelector('#sobre')).toBeInTheDocument();
  });
});
