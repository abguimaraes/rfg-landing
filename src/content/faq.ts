/**
 * Perguntas Frequentes (Seção 13) — copy LITERAL de
 * `docs/briefing/05-copy-landing.md` linhas 465-500.
 *
 * 10 Q&A apresentadas em acordeão (`<details>`/`<summary>` HTML nativo).
 * CTA WhatsApp final (chave `cta_unico`).
 *
 * Compliance:
 * - CON-013: sem "garantia/garantir/garante".
 * - I-002: contém "12 anos" (literal do briefing — pergunta 10).
 * - NFR-013: Title Case nas perguntas.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  eyebrow: string;
  headline: string;
  items: ReadonlyArray<FaqItem>;
  cta: {
    label: string;
    microcopy: string;
    whatsappKey: 'cta_unico';
  };
}

export const faq: FaqContent = {
  eyebrow: 'Perguntas Frequentes',
  headline: 'As perguntas que você provavelmente está fazendo.',
  items: [
    {
      question: 'Preciso ter muito dinheiro para contratar um plano de seguros?',
      answer:
        'Não. O diagnóstico é gratuito e sem compromisso. A partir dele, montamos um plano que cabe no seu orçamento real — sem empurrar produto.',
    },
    {
      question: 'Vocês vendem só seguro de carro?',
      answer:
        'Não. Enquanto 90% dos corretores focam só nisso, a RFG trabalha com o portfólio completo: seguro de vida, blindagem patrimonial, consórcio, previdência e responsabilidade civil profissional.',
    },
    {
      question: 'Como funciona o primeiro passo?',
      answer:
        'Você clica no botão, cai no nosso WhatsApp e fala diretamente com Ricardo ou Anderson. Sem atendente, sem call center. Dois especialistas com mais de 35 anos de experiência combinada.',
    },
    {
      question: 'Consórcio demora muito para funcionar?',
      answer:
        'Depende do seu perfil e do seu plano. Na sessão estratégica, a gente analisa sua situação e te mostra o caminho mais inteligente — sem prometer o que não pode ser prometido.',
    },
    {
      question:
        'Já tenho seguro contratado. Faz sentido fazer o diagnóstico mesmo assim?',
      answer:
        'Sim. A maioria dos clientes que chegam até nós já tem alguma coisa contratada — e descobre que está pagando por cobertura errada, insuficiente ou duplicada. O diagnóstico mostra isso com clareza.',
    },
    {
      question: 'Vocês somem depois que a gente assina?',
      answer:
        'Não. O Felipe Alexandre Oliveira foi acompanhado do início ao fim do processo de consórcio — desde a escolha da carta de crédito até a contemplação — e nos passou seu contato para mais 2-3 pessoas. O Walter Campos é cliente há mais de doze anos e descreve o serviço como "sério e prestimoso". Esse é o padrão de relacionamento que praticamos.',
    },
    {
      question: 'A RFG é uma empresa regularizada?',
      answer:
        'Sim. Registro SUSEP ativo desde 1995. A RFG opera desde 2013 — atravessamos crises porque fazemos certo.',
    },
    {
      question: 'Previdência privada só vale a pena para quem ganha muito?',
      answer:
        'Não. Vale para quem quer chegar na aposentadoria com dinheiro suficiente. O problema é quando é feita no banco, com taxas que corroem o rendimento em silêncio. A gente mostra a diferença.',
    },
    {
      question: 'Quanto tempo leva para ter tudo resolvido?',
      answer:
        'Em poucos dias você já tem o diagnóstico feito e o plano montado. A implementação depende de cada produto — mas o processo é direto e sem burocracia desnecessária.',
    },
    {
      question: 'Por que devo confiar na RFG e não em outro corretor?',
      answer:
        'Mais de 1.200 famílias atendidas em 12 anos. Acesso direto aos fundadores. Portfólio completo. E uma premissa simples: a gente não fecha venda — a gente monta plano. Se não fizer sentido para você, a gente te diz isso também.',
    },
  ],
  cta: {
    label: 'Ainda tem dúvida? Fala direto com a gente',
    microcopy: 'Resposta no WhatsApp em até algumas horas, em horário comercial.',
    whatsappKey: 'cta_unico',
  },
} as const;
