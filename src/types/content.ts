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

/* ============================================================================
 * Personas (Seção 4) — FR-006, FR-025
 * ========================================================================== */

/** Chave canônica de ícone Lucide consumida pelo `<PersonasSection>`. */
export type PersonaIconKey = 'family' | 'briefcase' | 'key';

export interface PersonaItem {
  /** Título da persona (Title Case — CON-013). */
  titulo: string;
  /** Ícone Lucide associado. */
  iconKey: PersonaIconKey;
  /** Descrição (já com prefixo "Isso é para você se..." conforme AC-3). */
  descricao: string;
}

export interface PersonasContent {
  eyebrow: string;
  headline?: string;
  personas: ReadonlyArray<PersonaItem>;
}

/* ============================================================================
 * Pilares de Valor (Seção 5) — FR-007, FR-025, FR-029
 * ========================================================================== */

export interface ValuePillarItem {
  /** Emoji literal do briefing (🛡️ / 🏠 / 👨‍👩‍👧 / 🤝). */
  emoji: string;
  /** Título em Title Case — CON-013/AC-8. */
  titulo: string;
  /** Body literal — `05-copy-landing.md` linhas 84-94. */
  descricao: string;
}

export interface ValuePillarsContent {
  eyebrow: string;
  /** H2 em Title Case (NÃO CAIXA ALTA — CON-013/AC-6). */
  headline: string;
  pillars: ReadonlyArray<ValuePillarItem>;
}

/* ============================================================================
 * Prova (Seção 6) — FR-008, FR-020, FR-031
 * ========================================================================== */

export interface TestimonialItem {
  /** Nome canônico do cliente (texto literal). */
  name: string;
  /** Profissão / atribuição. */
  role: string;
  /** Citação literal — `05-copy-landing.md` Seção 6. */
  quote: string;
}

export interface ProofCredentialItem {
  /** Valor numérico ou textual em destaque (ex: "35 anos", "1.200+"). */
  value: string;
  /** Descrição curta abaixo do valor. */
  label: string;
}

export interface ProofContent {
  eyebrow: string;
  headline: string;
  /** 4 testemunhos reais (Felipe / Eder / Henrique / Walter) — AC-14. */
  testimonials: ReadonlyArray<TestimonialItem>;
  /** Selo SUSEP — AC-17. */
  susepSeal: {
    label: string;
  };
  /** Tríade de autoridade — AC-18 + L-004. */
  credentials: ReadonlyArray<ProofCredentialItem>;
}

/* ============================================================================
 * Parceiros (Seção 6 — marquee) — FR-020, FR-031
 * ========================================================================== */

export interface PartnerLogo {
  /** Nome oficial (alt text + aria-label). */
  name: string;
  /** Slug (id estável + filename base). */
  slug: string;
  /** Caminho público (`/images/parceiros/<slug>.<ext>`). */
  src: string;
  /** Largura intrínseca em px. */
  width: number;
  /** Altura intrínseca em px. */
  height: number;
  /** Alt text descritivo (NFR-013). */
  alt: string;
}

/* ============================================================================
 * História de Origem (Seção 7) — FR-009, FR-018, FR-030
 * ========================================================================== */

export interface OriginStoryPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface OriginStoryMilestone {
  /** Marco temporal (ex: "1995", "2013", "Hoje"). */
  year: string;
  /** Headline curta do marco (Title Case). */
  title: string;
  /** Body literal — `05-copy-landing.md` linhas 129-159. */
  body: string;
}

export interface OriginStoryQuote {
  /** Texto literal da citação do Walter — AC-24. */
  text: string;
  /** Atribuição (nome + tempo de relacionamento). */
  attribution: string;
}

export interface OriginStoryContent {
  eyebrow: string;
  headline: string;
  /** Foto canônica `socios-02-estudio.webp` (FR-018, L-008). */
  photo: OriginStoryPhoto;
  milestones: ReadonlyArray<OriginStoryMilestone>;
  quote: OriginStoryQuote;
  /** Closing literal — linhas 157-159. */
  closing: string;
}

/* ============================================================================
 * Como Funciona (Seção 8) — FR-010, FR-025
 * ========================================================================== */

/** Chave canônica de ícone Lucide consumida pelo `<HowItWorksSection>`. */
export type HowItWorksIconKey = 'search' | 'shield-check' | 'handshake';

export interface HowItWorksStep {
  /** Número do passo formatado (ex: "01"). */
  number: string;
  /** Ícone Lucide associado. */
  iconKey: HowItWorksIconKey;
  /** Emoji literal opcional do briefing (🔍 / 🛡️ / 🤝). */
  emoji: string;
  /** Título em Title Case — CON-013/AC-3. */
  titulo: string;
  /** Body literal — `05-copy-landing.md` linhas 177-200. */
  body: string;
  /** Bullets "O que acontece aqui" — 3 itens literais. */
  bullets: ReadonlyArray<string>;
}

export interface HowItWorksContent {
  eyebrow: string;
  /** Bridge text literal — linhas 173-175. */
  bridge: string;
  steps: ReadonlyArray<HowItWorksStep>;
}

/* ============================================================================
 * Caminhos / Oferta (Seção 9) — FR-011, FR-021 mensagens 2/3/4/5
 * ========================================================================== */

export interface PathBonus {
  /** Texto literal do bônus (ex: "Checklist Meu Patrimônio Blindado..."). */
  label: string;
}

export interface PathItem {
  /** Slug estável (essencial / completa / legado). */
  slug: 'essencial' | 'completa' | 'legado';
  /** Emoji literal do briefing (🛡️ / 🌟 / 👑). */
  emoji: string;
  /** Título em Title Case — CON-013. */
  titulo: string;
  /** Subtítulo opcional ("(o caminho mais procurado)" para Caminho 2). */
  subtitulo?: string;
  /** "Para quem é" — copy literal. */
  forWho: string;
  /** Body curto explicativo — copy literal. */
  body: string;
  /** Lista "O que costuma fazer parte deste plano". */
  planItems: ReadonlyArray<string>;
  /** Lista de bônus literais (FR-011 + L-002): 1 / 2 / 3 conforme caminho. */
  bonusItems: ReadonlyArray<PathBonus>;
  /** Label literal do CTA WhatsApp. */
  ctaLabel: string;
  /** Chave canônica WhatsApp para os 3 caminhos — FR-021 mensagens 2/3/4. */
  whatsappKey: 'essencial' | 'completa' | 'legado';
  /** True para Caminho 2 (destacado visualmente). */
  isFeatured: boolean;
  /** Texto do badge se `isFeatured` (ex: "MAIS PROCURADO"). */
  featuredBadge?: string;
}

export interface PathsInvestmentBlock {
  /** Headline em Title Case — "Como o Investimento É Definido". */
  headline: string;
  /** Parágrafos explicativos — copy literal linhas 292-296. */
  paragraphs: ReadonlyArray<string>;
}

export interface PathsFinalCta {
  /** Headline opcional — "Não Sabe Ainda em Qual Caminho Você Se Encaixa?". */
  headline: string;
  /** Body literal — linhas 304-306. */
  body: string;
  /** Linha de reforço bold — "Sem custo. Sem compromisso...". */
  reinforcement: string;
  /** Selo "Vagas limitadas" — sugestão wireframes Decisão 6. */
  scarcityLabel: string;
  /** Label do CTA principal. */
  ctaLabel: string;
  /** Chave WhatsApp para o CTA único — `cta_unico` (FR-021 mensagem 5). */
  whatsappKey: 'cta_unico';
  /** Microcopy abaixo do CTA. */
  microcopy: string;
}

export interface PathsContent {
  eyebrow: string;
  /** H2 literal em Title Case — linha 217. */
  headline: string;
  subheadline: string;
  /** Bridge text literal — linhas 223-227. */
  bridge: string;
  /** Microcopy padronizado abaixo de cada CTA. */
  ctaMicrocopy: string;
  paths: ReadonlyArray<PathItem>;
  investment: PathsInvestmentBlock;
  finalCta: PathsFinalCta;
  /** Selo SUSEP — AC-17. */
  susepSeal: { label: string };
}

/* ============================================================================
 * Compromisso (Seção 10) — FR-012, CON-003, CON-013
 * ========================================================================== */

export interface CommitmentContent {
  eyebrow: string;
  /** Headline literal "Nosso Compromisso" (Title Case — CON-013). */
  headline: string;
  /** Subheadline "Você não arrisca nada. O risco é todo nosso." */
  subheadline: string;
  /** Parágrafos do body — copy literal linhas 327-348. */
  paragraphs: ReadonlyArray<string>;
  /** Linha intermediária em destaque ("Você só avança se fizer sentido para você."). */
  midHighlight: string;
  /** Linha "Trabalhamos com mais de 1.200 famílias em 13 anos." */
  trustLine: string;
  /** Linha SUSEP "Temos registro SUSEP ativo desde 1995." */
  susepLine: string;
  /** Parágrafo introdutório antes do "compromisso real" — copy literal. */
  realCommitmentIntro: string;
  /** Compromisso real em destaque (linha 348). */
  realCommitmentOutroTop: string;
  /** Parágrafo de fechamento abaixo do compromisso real — copy literal. */
  realCommitmentOutroBottom: string;
  /** Frase final em destaque "Se não fizer sentido para você...". */
  finalLine: string;
  /** Selo SUSEP "Registro ativo desde 1995". */
  susepSeal: { label: string };
}
