/**
 * Tipos canônicos de eventos de tracking — Story 1.2 (FR-044).
 * Mantém estrutura strict de payload por evento para evitar typos
 * silenciosos ao chamar `trackEvent`.
 */

export type EventName =
  | 'cta_click'
  | 'whatsapp_redirect'
  | 'scroll_depth'
  | 'section_view'
  | 'faq_open'
  | 'partner_logo_click'
  | 'consent_granted'
  | 'consent_declined';

export type CtaCategory =
  | 'hero'
  | 'secao_9'
  | 'secao_12'
  | 'objections'
  | 'faq'
  | 'footer'
  | 'sticky_nav';
export type WhatsAppDestination =
  | 'diagnostico'
  | 'essencial'
  | 'completa'
  | 'legado'
  | 'cta_unico'
  | 'sticky_nav'
  | 'objecoes'
  | 'footer';

export interface EventParams {
  cta_click: { category: CtaCategory; label: string; destination: string };
  whatsapp_redirect: { destination: WhatsAppDestination; message: string };
  scroll_depth: { percent: 25 | 50 | 75 | 100 };
  section_view: { section_id: string; section_name: string };
  faq_open: { question_id: string; question: string };
  partner_logo_click: { partner: string };
  consent_granted: { categories: string[] };
  consent_declined: Record<string, never>;
}

/* ----------------------------------------------------------------------------
 * Augmentation do `window` para gtag/fbq/va — usado por GA4, Meta Pixel e
 * Vercel Analytics (built-in via `@vercel/analytics`).
 * -------------------------------------------------------------------------- */

type GtagArgs =
  | ['event', string, Record<string, unknown>?]
  | ['config', string, Record<string, unknown>?]
  | ['set', Record<string, unknown>]
  | ['js', Date]
  | ['consent', 'default' | 'update', Record<string, unknown>];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean };
    _fbq?: unknown;
    va?: (event: 'event', payload: { name: string } & Record<string, unknown>) => void;
  }
}

export {};
