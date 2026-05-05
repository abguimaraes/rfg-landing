import type { ProofContent } from '@/types/content';

/**
 * Prova (Seção 6) — copy LITERAL de `docs/briefing/05-copy-landing.md`
 * linhas 100-118 + selo SUSEP + tríade de credenciais (FR-008/L-004).
 *
 * Compliance:
 * - AC-13: eyebrow "PROVA" + H2 literal.
 * - AC-14: 4 testemunhos REAIS (Felipe, Eder, Henrique, Walter) — sem
 *   reintroduzir os 3 fakes anteriores (Rômulo/Rodrigo/Marcos Roberto).
 *   Decisão Anderson 2026-05-05.
 * - AC-17: selo SUSEP "Registro ativo desde 1995".
 * - AC-18: tríade 35 anos / 1.200+ famílias / portfólio completo.
 */
export const proof: ProofContent = {
  eyebrow: 'Prova',
  headline:
    'Mais de 1.200 famílias atendidas. Veja o que algumas delas têm a dizer.',
  testimonials: [
    {
      name: 'Felipe Alexandre Oliveira',
      role: 'Segurança do Trabalho',
      quote:
        'Quero agradecer de coração a você e à sua equipe. Sem vocês eu não teria alcançado essa conquista. Fui acompanhado do início — na escolha da carta de crédito — até a contemplação e o recebimento do crédito, sempre com atendimento excelente, atencioso e paciente (do Ricardo e também do colega que me acompanhou). Mesmo quando eu tinha dúvidas simples, recebi todo o apoio. Recomendo de olhos fechados: já passei seu contato para duas ou três pessoas e sigo indicando. Muito obrigado; que Deus abençoe grandemente o trabalho de vocês.',
    },
    {
      name: 'Eder Clemente Pio',
      role: 'Empresário',
      quote:
        'Sou parceiro da RFG Corretora há muitos anos, tanto no consórcio imobiliário quanto nos seguros dos meus veículos e do meu negócio. Empresa séria, competente e ágil na solução de eventuais problemas, além de sempre me apresentar boas oportunidades. Recomendo.',
    },
    {
      name: 'Henrique Martins Santos',
      role: 'Supervisor de Produção',
      quote:
        'Recebemos assistência total em todo o processo: fomos orientados em cada etapa e tudo correu com tranquilidade. O único contratempo foi com a oficina (demora na entrega e um ajuste simples no para-barro), algo alheio à equipe e rápido de resolver. Excelente suporte.',
    },
    {
      name: 'Walter Campos',
      role: 'Agente publicitário',
      quote:
        'Cliente da RFG – Seguros e Consórcios há mais de doze anos (indicado por um amigo), sempre recebi orientações claras na aquisição de produtos/serviços e nas negociações com as seguradoras. Nos sinistros, o suporte foi fundamental, com dicas que levaram à solução desejada. Serviço sério e prestimoso.',
    },
  ],
  susepSeal: {
    label: 'SUSEP — Registro ativo desde 1995',
  },
  credentials: [
    { value: '35 anos', label: 'de experiência combinada' },
    { value: '1.200+', label: 'famílias atendidas' },
    { value: 'Portfólio completo', label: 'SUSEP ativo desde 1995' },
  ],
} as const;
