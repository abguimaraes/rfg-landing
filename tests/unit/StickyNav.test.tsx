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
    // Após FIX #4: removidos roles menubar/menuitem; links âncora puros dentro do
    // <nav aria-label="Navegação principal">. Buscamos via getByRole('link', ...).
    expect(screen.getByRole('link', { name: 'Sobre' })).toHaveAttribute(
      'href',
      '#sobre',
    );
    expect(
      screen.getByRole('link', { name: 'Como funciona' }),
    ).toHaveAttribute('href', '#como-funciona');
    expect(screen.getByRole('link', { name: 'Caminhos' })).toHaveAttribute(
      'href',
      '#caminhos',
    );
    expect(screen.getByRole('link', { name: 'Perguntas' })).toHaveAttribute(
      'href',
      '#faq',
    );
  });

  it('CTA desktop usa mensagem sticky_nav e aria-label canônico', () => {
    render(<StickyNav />);
    const cta = screen.getByTestId('sticky-nav-cta');
    expect(cta.getAttribute('href')).toMatch(/wa\.me\/\d+\?text=/);
    expect(cta).toHaveAttribute('aria-label', expect.stringContaining('RFG'));
    // Após FIX #5: CTA é <a> direto (sem <button> aninhado), com rel
    // contendo 'noopener' (segurança em target="_blank").
    expect(cta).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('CTA mobile (ícone) também aponta para wa.me com rel seguro', () => {
    render(<StickyNav />);
    const ctaMobile = screen.getByTestId('sticky-nav-cta-mobile');
    expect(ctaMobile.getAttribute('href')).toMatch(/wa\.me\/\d+\?text=/);
    expect(ctaMobile).toHaveAttribute('target', '_blank');
    expect(ctaMobile).toHaveAttribute(
      'rel',
      expect.stringContaining('noopener'),
    );
  });

  it('expõe nav com aria-label "Navegação principal"', () => {
    render(<StickyNav />);
    expect(
      screen.getByRole('navigation', { name: 'Navegação principal' }),
    ).toBeInTheDocument();
  });
});
