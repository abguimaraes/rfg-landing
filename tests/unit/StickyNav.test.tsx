import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { src, alt, ...rest } = props as { src: string; alt: string };
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={src} alt={alt} {...(rest as Record<string, unknown>)} />;
  },
}));

import { StickyNav } from '@/components/sections/StickyNav';

describe('<StickyNav />', () => {
  it('renderiza logo RFG com alt acessível', () => {
    render(<StickyNav />);
    expect(screen.getByAltText('RFG Corretora de Seguros')).toBeInTheDocument();
  });

  it('renderiza 4 links âncora desktop (#sobre, #como-funciona, #caminhos, #faq)', () => {
    render(<StickyNav />);
    expect(screen.getByRole('menuitem', { name: 'Sobre' })).toHaveAttribute(
      'href',
      '#sobre',
    );
    expect(
      screen.getByRole('menuitem', { name: 'Como funciona' }),
    ).toHaveAttribute('href', '#como-funciona');
    expect(screen.getByRole('menuitem', { name: 'Caminhos' })).toHaveAttribute(
      'href',
      '#caminhos',
    );
    expect(screen.getByRole('menuitem', { name: 'Perguntas' })).toHaveAttribute(
      'href',
      '#faq',
    );
  });

  it('CTA desktop usa mensagem sticky_nav e aria-label canônico', () => {
    render(<StickyNav />);
    const cta = screen.getByTestId('sticky-nav-cta');
    expect(cta.getAttribute('href')).toMatch(/wa\.me\/\d+\?text=/);
    expect(cta).toHaveAttribute('aria-label', expect.stringContaining('RFG'));
  });

  it('CTA mobile (ícone) também aponta para wa.me', () => {
    render(<StickyNav />);
    const ctaMobile = screen.getByTestId('sticky-nav-cta-mobile');
    expect(ctaMobile.getAttribute('href')).toMatch(/wa\.me\/\d+\?text=/);
    expect(ctaMobile).toHaveAttribute('target', '_blank');
  });

  it('expõe nav com aria-label "Navegação principal"', () => {
    render(<StickyNav />);
    expect(
      screen.getByRole('navigation', { name: 'Navegação principal' }),
    ).toBeInTheDocument();
  });
});
