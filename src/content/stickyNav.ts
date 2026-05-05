import type { WhatsAppMessageKey } from '@/lib/whatsapp';

export interface StickyNavLink {
  label: string;
  /** Âncora interna (#sobre, #como-funciona, etc). */
  href: string;
}

export interface StickyNavContent {
  brandLogo: {
    src: string;
    alt: string;
  };
  links: ReadonlyArray<StickyNavLink>;
  cta: {
    label: string;
    whatsappKey: WhatsAppMessageKey;
  };
}

/**
 * StickyNav (FR-002) — copy literal de wireframes §1.
 * Os links apontam para âncoras das seções 7 (#sobre), 8 (#como-funciona),
 * 9 (#caminhos) e 13 (#faq) — algumas ainda não existem (Story 1.4-1.7).
 */
export const stickyNav: StickyNavContent = {
  brandLogo: {
    src: '/logo-rfg.png',
    alt: 'RFG Corretora de Seguros',
  },
  links: [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Caminhos', href: '#caminhos' },
    { label: 'Perguntas', href: '#faq' },
  ],
  cta: {
    label: 'Falar no WhatsApp',
    whatsappKey: 'sticky_nav',
  },
} as const;
