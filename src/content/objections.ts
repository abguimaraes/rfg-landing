/**
 * Últimas Dúvidas / Objeções (Seção 12) — copy LITERAL de
 * `docs/briefing/05-copy-landing.md` linhas 393-455.
 *
 * 5 objeções comuns endereçadas com tom fraternal + transparência.
 * CTA WhatsApp final (chave `objecoes`).
 *
 * Compliance:
 * - CON-013: sem "garantia/garantir/garante".
 * - NFR-013: Title Case na headline.
 * - Frases-chave em **bold** marcadas com `**` (renderer aplica destaque).
 */

export interface ObjectionItem {
  /** Ícone emoji (💰 ⏳ 🤝 📋 📅). */
  icon: string;
  /** Headline da objeção (entre aspas no UI). */
  headline: string;
  /** Parágrafos da resposta — frases-chave em `**bold**`. */
  paragraphs: ReadonlyArray<string>;
}

export interface ObjectionsContent {
  eyebrow: string;
  headline: string;
  objections: ReadonlyArray<ObjectionItem>;
  cta: {
    label: string;
    microcopy: string;
    whatsappKey: 'objecoes';
  };
}

export const objections: ObjectionsContent = {
  eyebrow: 'Últimas Dúvidas',
  headline: 'Ainda tem alguma dúvida? Faz sentido. Veja as mais comuns.',
  objections: [
    {
      icon: '💰',
      headline: 'Seguro é caro demais para o que eu ganho agora.',
      paragraphs: [
        'Entendo. Parece mais uma parcela num mês que já está apertado.',
        'Mas pensa assim: um profissional liberal sem seguro de responsabilidade civil pode ser processado por um cliente. Um único processo pode custar R$ 200 mil. A parcela mensal do seguro? Em muitos casos, menos de R$ 200.',
        '**O que parece caro é a parcela. O que é caro de verdade é não ter cobertura quando precisar.**',
        'No diagnóstico, a gente olha para a sua situação real e encontra o que faz sentido para o seu momento — sem empurrar o que não cabe.',
      ],
    },
    {
      icon: '⏳',
      headline: 'Ainda sou novo. Posso deixar para depois.',
      paragraphs: [
        'Essa é a objeção mais comum. E a mais perigosa.',
        '**O imprevisto não consulta sua idade antes de acontecer.** E seguro não funciona retroativamente — você não contrata depois que o problema chegou.',
        'Quanto mais cedo você assegura o que construiu, menor o custo e maior a cobertura.',
        'Além disso, o "depois" raramente chega. Sempre tem uma prioridade mais urgente. Até que um dia o imprevisto chega primeiro.',
      ],
    },
    {
      icon: '🤝',
      headline: 'Já fui enganado por corretor antes. Por que vocês seriam diferentes?',
      paragraphs: [
        'Sua desconfiança é completamente legítima.',
        '90% dos corretores focam em seguro de carro porque é o mais fácil de vender. Empurram proposta genérica, recebem comissão e somem. Você provavelmente foi atendido por esse padrão.',
        '**A diferença está no que acontece depois da assinatura.**',
        'O Henrique recebeu assistência total em todo o processo do sinistro dele e nos chamou de "excelente suporte". O Walter, cliente há mais de doze anos, descreveu o serviço como "sério e prestimoso". Isso não se constrói com quem quer só fechar venda.',
        'Você fala direto com Ricardo e Anderson — os fundadores, com 35 anos de experiência combinados. Não com atendente. Não com call center.',
      ],
    },
    {
      icon: '📋',
      headline: 'Não entendo nada disso. Tenho medo de fazer errado de novo.',
      paragraphs: [
        '**O problema nunca foi você. Foi a qualidade de quem explicou.**',
        'O mercado de seguros tem interesse em manter o cliente confuso. Confuso, você não compara. Não questiona. Assina o que é apresentado.',
        'Você não precisa entender cada cláusula. Precisa de alguém que entenda por você — e que seja honesto sobre o que faz sentido e o que não faz.',
        'É exatamente isso que o **Diagnóstico de Ângulo Morto Patrimonial** entrega: clareza. Você vai saber o que está assegurado, por quanto e por quê — talvez pela primeira vez.',
      ],
    },
    {
      icon: '📅',
      headline: 'Agora não é o momento. Tenho outras prioridades.',
      paragraphs: [
        'Faz sentido. Sempre tem.',
        'Mas pensa numa coisa: **qual é o custo real de esperar mais um ano?**',
        'Se você ficar incapacitado amanhã — o que acontece com a parcela do apartamento? Com a escola dos filhos? Com os clientes que dependem de você?',
        'Ninguém nunca te mostrou esse número de forma honesta. E o que não é visto, não é assegurado.',
        '**O momento certo não vai aparecer com uma placa. Ele é agora** — enquanto você ainda pode contratar, enquanto o risco ainda pode ser coberto.',
      ],
    },
  ],
  cta: {
    label: 'Falar direto com a RFG',
    microcopy: 'Sem compromisso. Sem pressão para fechar.',
    whatsappKey: 'objecoes',
  },
} as const;
