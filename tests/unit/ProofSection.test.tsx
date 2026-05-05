import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@gsap/react', () => ({
  useGSAP: () => undefined,
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { src, alt, ...rest } = props as { src: string; alt: string };
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={src} alt={alt} {...(rest as Record<string, unknown>)} />;
  },
}));

import { ProofSection } from '@/components/sections/ProofSection';

describe('<ProofSection />', () => {
  it('renderiza eyebrow "Prova"', () => {
    render(<ProofSection />);
    expect(screen.getByText('Prova')).toBeInTheDocument();
  });

  it('renderiza H2 com headline literal', () => {
    render(<ProofSection />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent(
      'Mais de 1.200 famílias atendidas. Veja o que algumas delas têm a dizer.',
    );
  });

  it('renderiza 4 testemunhos REAIS (AC-14)', () => {
    render(<ProofSection />);
    expect(screen.getByText('Felipe Alexandre Oliveira')).toBeInTheDocument();
    expect(screen.getByText('Eder Clemente Pio')).toBeInTheDocument();
    expect(screen.getByText('Henrique Martins Santos')).toBeInTheDocument();
    expect(screen.getByText('Walter Campos')).toBeInTheDocument();
  });

  it('cada testemunho exibe profissão (AC-14)', () => {
    render(<ProofSection />);
    expect(screen.getByText('Segurança do Trabalho')).toBeInTheDocument();
    expect(screen.getByText('Empresário')).toBeInTheDocument();
    expect(screen.getByText('Supervisor de Produção')).toBeInTheDocument();
    expect(screen.getByText('Agente publicitário')).toBeInTheDocument();
  });

  it('exibe selo SUSEP (AC-17)', () => {
    render(<ProofSection />);
    expect(
      screen.getByText('SUSEP — Registro ativo desde 1995'),
    ).toBeInTheDocument();
  });

  it('exibe tríade de credenciais (AC-18)', () => {
    render(<ProofSection />);
    expect(screen.getByText('35 anos')).toBeInTheDocument();
    expect(screen.getByText('1.200+')).toBeInTheDocument();
  });

  it('renderiza marquee com 10 logos parceiros (AC-19) — 20 imagens (10 + 10 clones)', () => {
    const { container } = render(<ProofSection />);
    const logos = container.querySelectorAll('.marquee__item');
    // Marquee duplica conteúdo (track + clone), então deve ter 20 itens.
    expect(logos.length).toBe(20);
  });

  it('marquee renderiza exatamente 1 track original + 1 clone (fix duplicação 2026-05-05)', () => {
    const { container } = render(<ProofSection />);
    const original = container.querySelectorAll(
      '.marquee__track[data-marquee-clone="false"]',
    );
    const clones = container.querySelectorAll(
      '.marquee__track[data-marquee-clone="true"]',
    );
    // Garante que existe APENAS 1 par (track + clone) para evitar a regressão
    // de logos duplicados em desktop wide reportada por Anderson.
    expect(original.length).toBe(1);
    expect(clones.length).toBe(1);
    // Cada track contém os 10 logos parceiros.
    expect(original[0]?.querySelectorAll('.marquee__item').length).toBe(10);
    expect(clones[0]?.querySelectorAll('.marquee__item').length).toBe(10);
  });

  it('marquee tem aria-label "Seguradoras parceiras da RFG" (AC-22)', () => {
    render(<ProofSection />);
    expect(
      screen.getByRole('region', { name: /Seguradoras parceiras da RFG/ }),
    ).toBeInTheDocument();
  });

  it('NÃO contém os 3 fakes anteriores', () => {
    render(<ProofSection />);
    const allText = document.body.textContent ?? '';
    expect(allText).not.toMatch(/Rômulo|Rodrigo|Marcos Roberto/);
  });
});
