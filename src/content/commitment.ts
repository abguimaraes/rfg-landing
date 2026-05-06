import type { CommitmentContent } from '@/types/content';

/**
 * Compromisso (Seção 10) — copy LITERAL de
 * `docs/briefing/05-copy-landing.md` linhas 320-348.
 *
 * Compliance crítica:
 * - CON-003 / CON-013 / AC-21..22: SEM "garantia/garantir/garante" em
 *   nenhum trecho. Headline é "Nosso Compromisso" (Title Case).
 * - CON-013 / I-002 / AC-23: contém "13 anos" (NÃO "12 anos").
 * - AC-25: linha final "Se não fizer sentido para você, não tem negócio.
 *   Simples assim." em destaque.
 */
export const commitment: CommitmentContent = {
  eyebrow: 'Nosso Compromisso',
  headline: 'Nosso Compromisso',
  subheadline: 'Você não arrisca nada. O risco é todo nosso.',
  paragraphs: [
    'Sabemos que você já foi enganado antes.',
    'Corretor que sumiu. Produto que não era o que prometeram. Proposta genérica que não servia para a sua vida.',
    'Por isso, somos diretos:',
    'Se você fizer o Diagnóstico de Ângulo Morto Patrimonial com a RFG e sentir que não valeu o tempo — nos diga. Sem burocracia, sem constrangimento, sem pressão para fechar qualquer coisa.',
    'O diagnóstico existe para te dar clareza, não para te prender.',
  ],
  midHighlight: 'Você só avança se fizer sentido para você.',
  trustLine: 'Trabalhamos com mais de 1.200 famílias em 13 anos.',
  susepLine: 'Temos registro SUSEP ativo desde 1995.',
  realCommitmentIntro:
    'Não precisamos de cliente que não está convencido — precisamos de cliente que está assegurado de verdade.',
  realCommitmentOutroTop:
    'Esse é o nosso compromisso real: transparência total antes, durante e depois.',
  realCommitmentOutroBottom:
    'Sem sumir após a venda. Sem surpresa no sinistro. Sem letra miúda que você só descobre quando já é tarde.',
  finalLine:
    'Se não fizer sentido para você, não tem negócio. Simples assim.',
  susepSeal: {
    label: 'SUSEP — Registro ativo desde 1995',
  },
} as const;
