import { describe, expect, it, beforeEach } from 'vitest';
import {
  buildWhatsAppUrl,
  getWhatsAppLinkProps,
  MESSAGES,
  ARIA_LABELS,
  type WhatsAppMessageKey,
} from '@/lib/whatsapp';

/**
 * Tabela canônica FR-021 (PRD §5.3).
 * Qualquer divergência aqui = quebra de contrato com a copy aprovada.
 */
const EXPECTED_URLS: Record<WhatsAppMessageKey, string> = {
  diagnostico:
    'https://wa.me/5582982359028?text=Ol%C3%A1!%20Quero%20agendar%20meu%20Diagn%C3%B3stico%20de%20%C3%82ngulo%20Morto%20Patrimonial.',
  essencial:
    'https://wa.me/5582982359028?text=Ol%C3%A1!%20Quero%20assegurar%20minha%20fam%C3%ADlia%20%E2%80%94%20Caminho%20Seguran%C3%A7a%20Essencial.',
  completa:
    'https://wa.me/5582982359028?text=Ol%C3%A1!%20Quero%20o%20plano%20completo%20para%20minha%20fam%C3%ADlia%20%E2%80%94%20Caminho%20Seguran%C3%A7a%20Completa.',
  legado:
    'https://wa.me/5582982359028?text=Ol%C3%A1!%20Quero%20construir%20um%20legado%20%E2%80%94%20Caminho%20Legado%20Familiar.',
  cta_unico:
    'https://wa.me/5582982359028?text=Ol%C3%A1!%20Quero%20fazer%20meu%20diagn%C3%B3stico%20gratuito.',
  sticky_nav:
    'https://wa.me/5582982359028?text=Ol%C3%A1!%20Vim%20pela%20landing.%20Quero%20falar%20com%20a%20RFG.',
  objecoes:
    'https://wa.me/5582982359028?text=Ol%C3%A1!%20Quero%20falar%20direto%20com%20a%20RFG%20sobre%20meu%20diagn%C3%B3stico.',
  footer:
    'https://wa.me/5582982359028?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20RFG.',
};

describe('whatsapp helper — FR-021', () => {
  beforeEach(() => {
    // Garante que use o número default das mensagens canônicas
    delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  });

  it('expõe exatamente 8 chaves canônicas', () => {
    const keys = Object.keys(MESSAGES) as WhatsAppMessageKey[];
    expect(keys).toHaveLength(8);
    expect(keys).toEqual(
      expect.arrayContaining([
        'diagnostico',
        'essencial',
        'completa',
        'legado',
        'cta_unico',
        'sticky_nav',
        'objecoes',
        'footer',
      ]),
    );
  });

  it.each(Object.keys(EXPECTED_URLS) as WhatsAppMessageKey[])(
    'buildWhatsAppUrl(%s) gera URL canônica FR-021',
    (key) => {
      expect(buildWhatsAppUrl(key)).toBe(EXPECTED_URLS[key]);
    },
  );

  it('mensagens literais têm dash em‑dash (—) e não traço comum (-)', () => {
    expect(MESSAGES.essencial).toContain('—');
    expect(MESSAGES.completa).toContain('—');
    expect(MESSAGES.legado).toContain('—');
  });

  it('respeita NEXT_PUBLIC_WHATSAPP_NUMBER quando definido', () => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = '5511999998888';
    expect(buildWhatsAppUrl('cta_unico')).toBe(
      'https://wa.me/5511999998888?text=Ol%C3%A1!%20Quero%20fazer%20meu%20diagn%C3%B3stico%20gratuito.',
    );
  });

  it('rejeita número com caracteres não-numéricos', () => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = '+55 82 98235-9028';
    expect(() => buildWhatsAppUrl('footer')).toThrow(/inválido/);
  });

  it('getWhatsAppLinkProps retorna shape correto para acessibilidade (FR-023)', () => {
    const props = getWhatsAppLinkProps('essencial');
    expect(props).toEqual({
      href: EXPECTED_URLS.essencial,
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': ARIA_LABELS.essencial,
    });
    expect(props['aria-label']).toMatch(/WhatsApp/);
  });
});
