/**
 * Footer (Story 1.6) — copy institucional final da landing.
 *
 * Estrutura padrão: brand · navegação · contato · legal/copyright.
 * Mantém compliance SUSEP (registro ativo desde 1995, sem mencionar nº).
 *
 * Contato literal de `docs/briefing/03-contato.md`:
 * - Endereço: Rua José Pontes Magalhães, 70 · Edifício Itália, salas 506-509 · Jatiúca · Maceió/AL
 * - Telefone fixo: (82) 3142-1018
 * - WhatsApp: +55 82 98235-9028
 * - Email: comercial@rfgcorretora.com.br
 * - Site: www.rfgcorretora.com.br
 * - Instagram: @rfgcorretoraeconsorcio
 */

export interface FooterLink {
  label: string;
  href: string;
  /** Link externo abre em _blank. Default false (âncora interna). */
  external?: boolean;
}

export interface FooterContent {
  /** Tagline curta abaixo do logo. */
  tagline: string;
  /** Coluna de navegação interna. */
  navLinks: ReadonlyArray<FooterLink>;
  /** Coluna de links legais (LGPD, termos). */
  legalLinks: ReadonlyArray<FooterLink>;
  /** Bloco de contato. */
  contact: {
    address: string;
    phone: string;
    phoneHref: string;
    whatsapp: string;
    whatsappHref: string;
    email: string;
    emailHref: string;
    instagram: string;
    instagramHref: string;
  };
  /** Linha SUSEP no rodapé inferior. */
  susepLine: string;
  /** Copyright (sem ano fixo — ano renderizado dinamicamente). */
  copyrightSuffix: string;
}

export const footer: FooterContent = {
  tagline:
    'Diagnóstico Patrimonial em Maceió/AL. Acesso direto aos sócios fundadores desde 1995.',
  navLinks: [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Caminhos', href: '#caminhos' },
    { label: 'Compromisso', href: '#compromisso' },
    { label: 'Perguntas', href: '#faq' },
  ],
  legalLinks: [
    { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
    { label: 'Termos de Uso', href: '/termos-de-uso' },
  ],
  contact: {
    address:
      'Rua José Pontes Magalhães, 70 · Edifício Itália, salas 506-509 · Jatiúca · Maceió/AL',
    phone: '(82) 3142-1018',
    phoneHref: 'tel:+558231421018',
    whatsapp: '+55 82 98235-9028',
    whatsappHref: 'https://wa.me/5582982359028',
    email: 'comercial@rfgcorretora.com.br',
    emailHref: 'mailto:comercial@rfgcorretora.com.br',
    instagram: '@rfgcorretoraeconsorcio',
    instagramHref: 'https://instagram.com/rfgcorretoraeconsorcio',
  },
  susepLine: 'Registro SUSEP ativo desde 1995.',
  copyrightSuffix: 'RFG Corretora de Seguros · Todos os direitos reservados.',
} as const;
