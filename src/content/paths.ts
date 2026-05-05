import type { PathsContent } from '@/types/content';

/**
 * Caminhos / Oferta (Seção 9) — copy LITERAL de
 * `docs/briefing/05-copy-landing.md` linhas 214-308.
 *
 * Compliance crítica:
 * - CON-002: SEM preços (R$ 180/380/580 não aparecem).
 * - CON-003 / CON-013: SEM "garantir/garantia" no Caminho 1.
 * - FR-011 + L-002: bônus literais por caminho (1 / 2 / 3).
 * - FR-021: chaves WhatsApp `essencial` / `completa` / `legado` / `cta_unico`.
 * - Caminho 2 destacado (`isFeatured: true`) com badge "MAIS PROCURADO"
 *   (Decisão 6 wireframes — NÃO usar "MAIS VENDIDO").
 */
export const paths: PathsContent = {
  eyebrow: 'O Caminho',
  headline:
    'O Caminho Começa pelo Diagnóstico — Gratuito e Sem Compromisso',
  subheadline:
    'Não trabalhamos com proposta de prateleira. O seu plano é montado depois que a gente entende a sua realidade.',
  bridge:
    'A maioria dos corretores chega com o produto pronto e só ajusta o nome no contrato. A gente faz o contrário. O primeiro passo com a RFG é o Diagnóstico de Ângulo Morto Patrimonial — uma análise personalizada da sua situação real. Sem custo. Sem compromisso. Sem proposta empurrada no final. A partir do diagnóstico, montamos o seu plano. E o seu plano vai se encaixar em um destes três perfis — dependendo do momento de vida, do tamanho do patrimônio e das suas prioridades.',
  ctaMicrocopy: 'Diagnóstico gratuito antes de qualquer decisão.',
  paths: [
    {
      slug: 'essencial',
      emoji: '🛡️',
      titulo: 'Caminho 1: Proteção Essencial',
      forWho:
        'quem ainda não tem proteção montada e quer começar pelo essencial — sem complicar, sem pagar pelo que não precisa.',
      body:
        'Para quem está começando pelo mais importante: evitar que a família fique desamparada se algo acontecer.',
      planItems: [
        'Diagnóstico de Ângulo Morto Patrimonial (análise completa da sua situação)',
        'Seguro de Vida adequado ao seu perfil e ao tamanho da sua família',
        'Cobertura de um bem prioritário (veículo ou residência)',
        'Acesso direto a Ricardo e Anderson para dúvidas e suporte',
      ],
      bonusItems: [
        {
          label:
            'Checklist "Meu Patrimônio Blindado — 7 Passos para a Proteção Total"',
        },
      ],
      ctaLabel: 'Quero proteger minha família — falar no WhatsApp',
      whatsappKey: 'essencial',
      isFeatured: false,
    },
    {
      slug: 'completa',
      emoji: '🌟',
      titulo: 'Caminho 2: Proteção Completa',
      subtitulo: '(o caminho mais procurado)',
      forWho:
        'quem já construiu patrimônio, sustenta família e quer um plano integrado — não três produtos avulsos comprados em três lugares diferentes.',
      body:
        'Para quem quer resolver de uma vez: família protegida, patrimônio coberto e sonhos em andamento — tudo no mesmo plano.',
      planItems: [
        'Diagnóstico de Ângulo Morto Patrimonial completo e personalizado',
        'Seguro de Vida com cobertura adequada ao provedor da família',
        'Cobertura completa de bens (veículo, residência ou empresa)',
        'Seguro de Responsabilidade Civil Profissional (para profissionais liberais e empresários)',
        'Sessão estratégica: Consórcio sem juros de banco para o próximo imóvel ou veículo',
        'Acesso direto e prioritário a Ricardo e Anderson',
      ],
      bonusItems: [
        { label: 'Guia "Desvendando a Previdência Inteligente"' },
        {
          label:
            'Checklist "Meu Patrimônio Blindado — 7 Passos para a Proteção Total"',
        },
      ],
      ctaLabel: 'Quero o plano completo — falar no WhatsApp',
      whatsappKey: 'completa',
      isFeatured: true,
      featuredBadge: 'Mais Procurado',
    },
    {
      slug: 'legado',
      emoji: '👑',
      titulo: 'Caminho 3: Legado Familiar',
      forWho:
        'quem já tem o presente em ordem e quer estruturar o futuro — para os filhos, para a aposentadoria, para o que fica depois da gente.',
      body:
        'Para quem pensa no longo prazo: proteção hoje, patrimônio construído para os filhos amanhã.',
      planItems: [
        'Tudo do caminho Proteção Completa',
        'Estruturação de Previdência Privada com taxa justa e estratégia clara',
        'Planejamento de sucessão familiar (seguro de vida como instrumento de legado)',
        'Sessão estratégica de consórcio de imóvel para os filhos',
        'Revisão anual do plano completo, com adequação às mudanças de vida',
        'Acesso direto, prioritário e contínuo a Ricardo e Anderson',
      ],
      bonusItems: [
        { label: 'Guia "Desvendando a Previdência Inteligente"' },
        {
          label:
            'Checklist "Meu Patrimônio Blindado — 7 Passos para a Proteção Total"',
        },
        {
          label:
            'Sessão Estratégica "Consórcio sem juros — Seu Próximo Imóvel ou Carro"',
        },
      ],
      ctaLabel: 'Quero construir um legado — falar no WhatsApp',
      whatsappKey: 'legado',
      isFeatured: false,
    },
  ],
  investment: {
    headline: 'Como o Investimento É Definido',
    paragraphs: [
      'Cada plano é montado com base em três variáveis: o seu perfil, o seu patrimônio e o que faz sentido proteger primeiro.',
      'Por isso, o investimento real só aparece depois do diagnóstico — quando a gente já sabe exatamente o que está sendo coberto, em que ordem e com qual prioridade.',
      'Não tem letra miúda. Não tem surpresa no contrato. Você vê o número antes de assinar — e só assina se fizer sentido para você.',
    ],
  },
  finalCta: {
    headline: 'Não Sabe Ainda em Qual Caminho Você Se Encaixa?',
    body:
      'Tudo bem — esse é exatamente o trabalho do diagnóstico. Em 30 a 45 minutos de conversa, Ricardo ou Anderson olham para a sua situação e te mostram qual desses caminhos faz mais sentido para o seu momento.',
    reinforcement: 'Sem custo. Sem compromisso. Sem proposta empurrada no final.',
    scarcityLabel:
      'Ricardo e Anderson atendem pessoalmente. As vagas de diagnóstico são limitadas por mês.',
    ctaLabel: 'Fazer meu diagnóstico gratuito — falar no WhatsApp',
    whatsappKey: 'cta_unico',
    microcopy: 'Sem custo. Sem compromisso.',
  },
  susepSeal: {
    label: 'SUSEP — Registro ativo desde 1995',
  },
} as const;
