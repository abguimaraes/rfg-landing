/**
 * Tipos canônicos do conteúdo da landing — consumidos pelos arquivos
 * em `src/content/*.ts`. Toda copy é literal de `docs/briefing/05-copy-landing.md`
 * (CON-013, FR-050).
 */

import type { WhatsAppMessageKey } from '@/lib/whatsapp';

/* ============================================================================
 * Hero (Seção 1) — FR-003
 * ========================================================================== */

export interface HeroCredentialBadge {
  /** Texto literal exibido no badge. */
  label: string;
  /** Variante visual (`success` para SUSEP, `outline` para credenciais). */
  variant: 'success' | 'outline';
}

export interface HeroPhoto {
  src: string;
  alt: string;
  /** Dimensões intrínsecas (do arquivo otimizado). */
  width: number;
  height: number;
}

export interface HeroContent {
  /** `<h1>` único da landing — NFR-013. */
  headline: string;
  subheadline: string;
  cta: {
    label: string;
    /** Chave canônica de WhatsApp — FR-021. */
    whatsappKey: WhatsAppMessageKey;
    microcopy: string;
  };
  badgeSusep: HeroCredentialBadge;
  credentials: ReadonlyArray<HeroCredentialBadge>;
  photo: HeroPhoto;
}

/* ============================================================================
 * Problema (Seção 2) — FR-004
 * ========================================================================== */

export interface ProblemContent {
  eyebrow: string;
  /** Headline `<h2>`. */
  headline: string;
  /** Parágrafos do body em ordem. */
  paragraphs: ReadonlyArray<string>;
  /** Frase-âncora destacada (Inter 600) — AC-14. */
  anchorPhrase: string;
}

/* ============================================================================
 * Oportunidade (Seção 3) — FR-005, FR-028
 * ========================================================================== */

export interface OpportunityHighlight {
  /** Trecho destacado em Inter 600 dentro dos parágrafos. */
  text: string;
}

export interface OpportunityStat {
  /** Valor final do counter (e.g. 1200). */
  value: number;
  /** Prefixo opcional (e.g. "+"). */
  prefix?: string;
  /** Sufixo opcional (e.g. " famílias atendidas"). */
  suffix: string;
  /** Label acessível para `aria-label`. */
  ariaLabel: string;
}

export interface OpportunityContent {
  eyebrow: string;
  headline: string;
  paragraphs: ReadonlyArray<string>;
  /** Termos destacados (Inter 600) — AC-19. */
  highlights: ReadonlyArray<OpportunityHighlight>;
  /** Stats com counter tween — Efeito #5 (FR-028). */
  stats: ReadonlyArray<OpportunityStat>;
}
