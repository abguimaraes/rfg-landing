/**
 * WhatsApp helper — Story 1.2 (FR-021, FR-022, FR-023)
 *
 * Centraliza as 8 mensagens canônicas e a montagem da URL `wa.me`
 * usadas pelos CTAs da landing. Qualquer divergência das strings da
 * tabela FR-021 do PRD quebra os testes em `tests/unit/whatsapp.test.ts`.
 */

/** Chaves canônicas do enum WhatsApp (FR-021). */
export type WhatsAppMessageKey =
  | 'diagnostico'
  | 'essencial'
  | 'completa'
  | 'legado'
  | 'cta_unico'
  | 'sticky_nav'
  | 'objecoes'
  | 'footer';

/**
 * Mensagens literais (texto antes do encode) — FR-021.
 * **NÃO refatorar** para template strings ou variáveis. Cada string é lei.
 */
export const MESSAGES: Record<WhatsAppMessageKey, string> = {
  diagnostico: 'Olá! Quero agendar meu Diagnóstico de Ângulo Morto Patrimonial.',
  essencial: 'Olá! Quero proteger minha família — Caminho Proteção Essencial.',
  completa: 'Olá! Quero o plano completo para minha família — Caminho Proteção Completa.',
  legado: 'Olá! Quero construir um legado — Caminho Legado Familiar.',
  cta_unico: 'Olá! Quero fazer meu diagnóstico gratuito.',
  sticky_nav: 'Olá! Vim pela landing. Quero falar com a RFG.',
  objecoes: 'Olá! Quero falar direto com a RFG sobre meu diagnóstico.',
  footer: 'Olá! Vim pelo site da RFG.',
};

/** `aria-label` contextual por chave — FR-023. */
export const ARIA_LABELS: Record<WhatsAppMessageKey, string> = {
  diagnostico:
    'Falar no WhatsApp para agendar o Diagnóstico de Ângulo Morto Patrimonial',
  essencial: 'Falar no WhatsApp sobre o Caminho Proteção Essencial',
  completa: 'Falar no WhatsApp sobre o Caminho Proteção Completa',
  legado: 'Falar no WhatsApp sobre o Caminho Legado Familiar',
  cta_unico: 'Falar no WhatsApp para fazer o diagnóstico gratuito',
  sticky_nav: 'Falar no WhatsApp com a RFG Corretora',
  objecoes: 'Falar no WhatsApp diretamente com a RFG sobre seu diagnóstico',
  footer: 'Falar no WhatsApp com a RFG Corretora pelo site',
};

const DEFAULT_PHONE = '5582982359028';

function getPhoneNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_PHONE;
  if (!/^\d+$/.test(raw)) {
    throw new Error(
      `[whatsapp] NEXT_PUBLIC_WHATSAPP_NUMBER inválido: "${raw}" — apenas dígitos são aceitos.`,
    );
  }
  return raw;
}

/**
 * Monta a URL `https://wa.me/{phone}?text={encoded}` usando a mensagem
 * literal mapeada pela chave canônica.
 */
export function buildWhatsAppUrl(key: WhatsAppMessageKey): string {
  const phone = getPhoneNumber();
  const message = MESSAGES[key];
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Props prontas para um `<a>` WhatsApp acessível (FR-023). */
export interface WhatsAppLinkProps {
  href: string;
  target: '_blank';
  rel: 'noopener noreferrer';
  'aria-label': string;
}

export function getWhatsAppLinkProps(key: WhatsAppMessageKey): WhatsAppLinkProps {
  return {
    href: buildWhatsAppUrl(key),
    target: '_blank',
    rel: 'noopener noreferrer',
    'aria-label': ARIA_LABELS[key],
  };
}
