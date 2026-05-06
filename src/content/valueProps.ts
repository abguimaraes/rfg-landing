import type { ValuePillarsContent } from '@/types/content';

/**
 * Pilares de Valor (Seção 5) — copy LITERAL de
 * `docs/briefing/05-copy-landing.md` linhas 80-94.
 *
 * Compliance crítica:
 * - CON-013 / AC-6: headline em Title Case (NÃO CAIXA ALTA).
 * - CON-013 / AC-8: títulos dos 4 pilares em Title Case.
 * - CON-003 / CON-013 / AC-9: Pilar 3 usa "faz com que" (NÃO "garante").
 * - AC-10: body de cada pilar literal.
 * - AC-11: emoji literal do briefing por pilar.
 */
export const valueProps: ValuePillarsContent = {
  eyebrow: 'Proposta de Valor',
  headline:
    'Você Trabalhou Anos para Construir Isso. A RFG Cuida para que Nenhum Imprevisto Desfaça o Que Você Levou Tanto Tempo para Conquistar.',
  pillars: [
    {
      emoji: '🛡️',
      titulo: 'Assegure o Que Já Tem',
      descricao:
        'Um acidente, um processo, um sinistro. Um único dia ruim pode desfazer anos de trabalho. Com a cobertura certa para o seu perfil, o que você construiu continua de pé — não importa o que aconteça.',
    },
    {
      emoji: '🏠',
      titulo: 'Realize Seus Sonhos sem Pagar Juros de Banco',
      descricao:
        'O imóvel ou o carro que você quer não precisa custar o dobro do preço. Com consórcio, você chega lá sem os juros que o banco nunca te mostra na hora de assinar.',
    },
    {
      emoji: '👨‍👩‍👧',
      titulo: 'Sua Família Assegurada se Você Sair de Cena',
      descricao:
        'Se você é o único que sustenta tudo, o que acontece com a sua família se você não puder mais trabalhar? O seguro de vida certo faz com que eles continuem bem — mesmo sem você por perto.',
    },
    {
      emoji: '🤝',
      titulo: 'Um Consultor que Conhece Você pelo Nome',
      descricao:
        'Sem call center. Sem proposta genérica. Ricardo e Anderson analisam a sua situação, montam o seu plano e ficam do seu lado — inclusive na hora do sinistro, quando a maioria dos corretores já sumiu.',
    },
  ],
} as const;
