import type { PersonasContent } from '@/types/content';

/**
 * Personas (Seção 4) — copy LITERAL de `docs/briefing/05-copy-landing.md`
 * linhas 60-69. Prefixo "Isso é para você se..." aplicado por padrão antes
 * de cada body, conforme AC-3 (FR-006 + sugestão briefing 05 linha 73).
 *
 * Compliance:
 * - AC-1: eyebrow "PARA QUEM É".
 * - AC-2: 3 personas uniformes, sem hierarquia.
 * - AC-3: prefixo "Isso é para você se..." em cada descricao.
 * - AC-4: copy literal das 3 personas + ícones canônicos.
 * - CON-013: Title Case nos títulos (sem CAIXA ALTA).
 */
export const personas: PersonasContent = {
  eyebrow: 'Para Quem É',
  personas: [
    {
      titulo: 'Pais e Provedores de Família',
      iconKey: 'family',
      descricao:
        'Isso é para você se... Você sustenta tudo sozinho e sabe que, se sair de cena, a família fica sem plano. Está na hora de mudar isso.',
    },
    {
      titulo: 'Profissionais Liberais e Autônomos',
      iconKey: 'briefcase',
      descricao:
        'Isso é para você se... Médicos, engenheiros, advogados, dentistas — você exerce sua profissão exposto a riscos que um único processo pode transformar em prejuízo milionário.',
    },
    {
      titulo: 'Quem Quer Realizar Sonhos sem Pagar Juros de Banco',
      iconKey: 'key',
      descricao:
        'Isso é para você se... Você quer o imóvel ou o carro que planejou, mas não quer financiar pelo dobro do preço. Existe um caminho melhor.',
    },
  ],
} as const;
