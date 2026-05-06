import type { OpportunityContent } from '@/types/content';

/**
 * Oportunidade (Seção 3) — copy LITERAL de `05-copy-landing.md`
 * linhas 43-51 + stats com Counter Tween (FR-028, Efeito #5).
 *
 * Compliance:
 * - CON-013: sem "garantia/garantir".
 * - NFR-013: Title Case na headline.
 * - FR-005: mecanismo "Diagnóstico de Ângulo Morto Patrimonial" em destaque.
 */
export const opportunity: OpportunityContent = {
  eyebrow: 'A Oportunidade',
  headline:
    'O plano que protege o que você tem e realiza o que você quer — ao mesmo tempo.',
  paragraphs: [
    'O primeiro passo é o Diagnóstico de Ângulo Morto Patrimonial: uma análise personalizada que mapeia o que você construiu, identifica sua vulnerabilidade real e mostra, em números concretos, o que precisa ser protegido — em que ordem e por quê. Sem produto empurrado. Sem contrato que você assina sem entender. Só clareza.',
    'Enquanto 90% dos corretores focam em seguro de carro porque é o produto mais fácil de vender, Ricardo Farias e Anderson Guimarães trabalham com o portfólio completo há mais de 35 anos: vida, patrimônio, consórcio sem juros de banco, previdência com taxa justa, responsabilidade civil. Tudo num plano que faz sentido para a sua vida — não para a meta do mês de alguém.',
    'É o que mais de 1.200 famílias já vivem depois do diagnóstico. Você fala diretamente com quem sabe — sem call center, sem atendente — com quem conhece a sua história pelo nome.',
  ],
  highlights: [
    { text: 'Diagnóstico de Ângulo Morto Patrimonial' },
    { text: '90% dos corretores' },
    { text: 'Ricardo Farias e Anderson Guimarães' },
    { text: '35 anos' },
    { text: '1.200 famílias' },
  ],
  stats: [
    {
      value: 1200,
      prefix: '+',
      suffix: ' famílias atendidas',
      ariaLabel: 'Mais de 1.200 famílias atendidas',
    },
    {
      value: 35,
      suffix: ' anos de experiência',
      ariaLabel: '35 anos de experiência combinada',
    },
  ],
} as const;
