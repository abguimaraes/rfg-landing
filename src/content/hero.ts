import type { HeroContent } from '@/types/content';

/**
 * Hero (Seção 1) — copy LITERAL de `docs/briefing/05-copy-landing.md`
 * linhas 11-20 + tríade de credenciais conforme FR-003 e wireframes §1.
 *
 * Compliance:
 * - CON-013: NÃO usar "garantia/garantir".
 * - NFR-013: Title Case nas headlines (sem CAIXA ALTA).
 * - FR-021: CTA aponta para mensagem `diagnostico`.
 */
export const hero: HeroContent = {
  headline: 'Você construiu muito. Sua família está assegurada se algo acontecer?',
  subheadline:
    'A RFG cuida da segurança da sua família e do seu patrimônio — com um plano feito para a sua realidade, não uma proposta genérica.',
  cta: {
    label: 'Fazer meu diagnóstico',
    whatsappKey: 'diagnostico',
    microcopy: 'Sem custo. Sem compromisso.',
  },
  badgeSusep: {
    label: 'SUSEP — Registro ativo desde 1995',
    variant: 'success',
  },
  credentials: [
    { label: '1.200+ famílias atendidas', variant: 'outline' },
    { label: '35 anos de experiência combinada', variant: 'outline' },
  ],
  photo: {
    src: '/images/socios/socios-01-perfil-rfg.webp',
    alt: 'Ricardo Farias e Anderson Guimarães, fundadores da RFG Corretora — 35 anos de experiência combinada',
    width: 1254,
    height: 1254,
  },
} as const;
