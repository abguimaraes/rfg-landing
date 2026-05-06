/**
 * Smoke tests para as 4 seções da Story 1.6
 * (Vision · Objections · FAQ · Footer).
 *
 * Cobertura mínima — renderização + conteúdo canônico literal.
 */

import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';

vi.mock('@gsap/react', () => ({
  useGSAP: () => undefined,
}));

vi.mock('gsap', () => {
  const stub = {
    registerPlugin: () => undefined,
    matchMedia: () => ({ add: () => undefined, revert: () => undefined }),
    set: () => undefined,
    to: () => undefined,
    from: () => undefined,
    fromTo: () => undefined,
    config: () => undefined,
    defaults: () => undefined,
  };
  return { default: stub, gsap: stub };
});
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { refresh: () => undefined },
}));
vi.mock('gsap/SplitText', () => ({
  SplitText: class {
    chars: never[] = [];
    words: never[] = [];
    lines: never[] = [];
    revert(): void {}
  },
}));

import { FaqSection } from '@/components/sections/FaqSection';
import { Footer } from '@/components/sections/Footer';
import { ObjectionsSection } from '@/components/sections/ObjectionsSection';
import { VisionSection } from '@/components/sections/VisionSection';
import { faq } from '@/content/faq';
import { footer as footerContent } from '@/content/footer';
import { objections } from '@/content/objections';
import { vision } from '@/content/vision';

describe('<VisionSection />', () => {
  it('renderiza eyebrow + headline literal', () => {
    render(<VisionSection />);
    expect(screen.getByText(vision.eyebrow)).toBeInTheDocument();
    expect(screen.getByText(vision.headline)).toBeInTheDocument();
  });

  it('renderiza 2 blocos contrastantes (positivo + negativo)', () => {
    render(<VisionSection />);
    expect(screen.getByText(vision.positive.headline)).toBeInTheDocument();
    expect(screen.getByText(vision.negative.headline)).toBeInTheDocument();
    expect(screen.getByText(vision.positive.closingLine)).toBeInTheDocument();
    expect(screen.getByText(vision.negative.closingLine)).toBeInTheDocument();
  });

  it('headline em h2 (a11y heading hierarchy)', () => {
    render(<VisionSection />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent(vision.headline);
  });
});

describe('<ObjectionsSection />', () => {
  it('renderiza eyebrow + headline literal', () => {
    render(<ObjectionsSection />);
    expect(screen.getByText(objections.eyebrow)).toBeInTheDocument();
    expect(screen.getByText(objections.headline)).toBeInTheDocument();
  });

  it('renderiza 5 objeções (cada uma com headline distinta)', () => {
    render(<ObjectionsSection />);
    objections.objections.forEach((objection) => {
      // Headline está envolvida em &ldquo;...&rdquo; — match parcial.
      const matches = screen.getAllByText((_, node) =>
        Boolean(node?.textContent?.includes(objection.headline)),
      );
      expect(matches.length).toBeGreaterThan(0);
    });
  });

  it('CTA WhatsApp final aponta pra wa.me', () => {
    render(<ObjectionsSection />);
    const cta = screen.getByTestId('objections-cta');
    expect(cta).toHaveAttribute('href');
    expect(cta.getAttribute('href')).toMatch(/^https:\/\/wa\.me\//);
  });

  it('compliance: NÃO contém "garantia" / "garantir"', () => {
    const { container } = render(<ObjectionsSection />);
    const text = container.textContent ?? '';
    expect(text).not.toMatch(/garantia/i);
    expect(text).not.toMatch(/garantir/i);
  });
});

describe('<FaqSection />', () => {
  it('renderiza eyebrow + headline literal', () => {
    render(<FaqSection />);
    expect(screen.getByText(faq.eyebrow)).toBeInTheDocument();
    expect(screen.getByText(faq.headline)).toBeInTheDocument();
  });

  it('renderiza 10 perguntas como <details>', () => {
    const { container } = render(<FaqSection />);
    const details = container.querySelectorAll('details');
    expect(details).toHaveLength(10);
  });

  it('cada pergunta está em um <summary>', () => {
    render(<FaqSection />);
    faq.items.forEach((item) => {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    });
  });

  it('CTA WhatsApp final aponta pra wa.me', () => {
    render(<FaqSection />);
    const cta = screen.getByTestId('faq-cta');
    expect(cta.getAttribute('href')).toMatch(/^https:\/\/wa\.me\//);
  });

  it('contém "12 anos" (pergunta 10 — I-002 literal)', () => {
    const { container } = render(<FaqSection />);
    expect(container.textContent).toContain('12 anos');
  });
});

describe('<Footer />', () => {
  it('renderiza tagline + SUSEP + copyright dinâmico', () => {
    render(<Footer />);
    expect(screen.getByText(footerContent.tagline)).toBeInTheDocument();
    expect(screen.getByText(footerContent.susepLine)).toBeInTheDocument();
    const currentYear = new Date().getFullYear().toString();
    const copyright = screen.getByText((content) =>
      content.includes(currentYear) &&
      content.includes('Todos os direitos reservados'),
    );
    expect(copyright).toBeInTheDocument();
  });

  it('renderiza informações de contato (endereço, telefone, WhatsApp, email, Instagram)', () => {
    render(<Footer />);
    expect(screen.getByText(footerContent.contact.address)).toBeInTheDocument();
    expect(screen.getByText(footerContent.contact.phone)).toBeInTheDocument();
    expect(screen.getByText(footerContent.contact.whatsapp)).toBeInTheDocument();
    expect(screen.getByText(footerContent.contact.email)).toBeInTheDocument();
    expect(screen.getByText(footerContent.contact.instagram)).toBeInTheDocument();
  });

  it('semantic <footer> com role contentinfo', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer[role="contentinfo"]');
    expect(footer).not.toBeNull();
  });

  it('links de navegação apontam pras âncoras corretas', () => {
    render(<Footer />);
    const navSection = screen.getByText('Navegação').closest('div');
    expect(navSection).not.toBeNull();
    footerContent.navLinks.forEach((link) => {
      const anchor = within(navSection!).getByText(link.label);
      expect(anchor.closest('a')).toHaveAttribute('href', link.href);
    });
  });
});
