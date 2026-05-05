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
    'A RFG não chega com uma proposta pronta debaixo do braço. O primeiro passo é o Diagnóstico de Ângulo Morto Patrimonial: uma análise personalizada que mapeia tudo que você construiu, identifica onde está a sua vulnerabilidade real e te mostra, em números concretos, o que precisa ser protegido, em que ordem e por quê. Nada de produto empurrado. Nada de contrato que você assina sem entender. Só clareza — talvez pela primeira vez.',
    'O que torna isso diferente de tudo que você já tentou antes: enquanto 90% dos corretores focam em seguro de carro porque é o produto mais fácil de vender, Ricardo Farias e Anderson Guimarães trabalham com o portfólio completo há mais de 35 anos. Seguro de vida, proteção de patrimônio, consórcio sem juros de banco, previdência com taxa justa, responsabilidade civil para profissionais liberais. Tudo integrado num plano que faz sentido para a sua vida — não para a meta do mês de alguém.',
    'Imagine chegar em casa sabendo que, se algo acontecer com você amanhã, sua família está protegida. Que o apartamento continua. Que a escola dos filhos continua. Que o seu negócio tem cobertura. Essa não é uma promessa distante — é o que mais de 1.200 famílias já vivem depois de passar pelo diagnóstico com a RFG. Você fala diretamente com quem sabe. Sem call center. Sem atendente. Com quem conhece a sua história pelo nome.',
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
