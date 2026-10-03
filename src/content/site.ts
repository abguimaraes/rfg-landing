/**
 * Conteúdo único da landing enxuta (redesign 2026-10).
 *
 * Fatos canônicos (confirmados por Anderson em 2026-10-03):
 * - RFG fundada em 2013 · 12 anos de operação.
 * - Experiência dos sócios no mercado de seguros desde 1995.
 * - 35 anos de experiência combinada · 1.200+ famílias atendidas.
 *
 * Compliance herdada: sem "garantia/garantir/garante"; sem preços;
 * depoimentos apenas reais (Felipe, Eder, Henrique, Walter).
 */
import type { WhatsAppMessageKey } from '@/lib/whatsapp';

export const facts = {
  founded: '2013',
  yearsOperating: '12 anos',
  experienceSince: '1995',
  combinedExperience: '35 anos',
  families: '1.200+',
} as const;

export const nav = {
  links: [
    { label: 'Soluções', href: '#solucoes' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Caminhos', href: '#caminhos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Perguntas', href: '#faq' },
  ],
  cta: { label: 'Falar no WhatsApp', key: 'sticky_nav' as WhatsAppMessageKey },
} as const;

export const hero = {
  eyebrow: 'Corretora de Seguros · Maceió/AL',
  headline: 'Você construiu muito. Sua família está assegurada se algo acontecer?',
  sub: 'Seguro, consórcio e previdência num plano feito para a sua realidade. Direto com os sócios, sem call center.',
  cta: { label: 'Fazer meu diagnóstico gratuito', key: 'diagnostico' as WhatsAppMessageKey },
  microcopy: 'Sem custo. Sem compromisso.',
  stats: [
    { value: facts.families, label: 'famílias atendidas' },
    { value: facts.combinedExperience, label: 'de experiência combinada' },
    { value: facts.yearsOperating, label: `de RFG, desde ${facts.founded}` },
  ],
  photo: {
    src: '/images/socios/socios-01-perfil-rfg.webp',
    alt: 'Ricardo Farias e Anderson Guimarães, sócios fundadores da RFG Corretora',
    width: 1254,
    height: 1254,
  },
} as const;

export const solutions = {
  eyebrow: 'Soluções',
  headline: 'Proteger o que você tem. Realizar o que você quer.',
  lead: 'O risco real é o ângulo morto: o que sobra do seu patrimônio se um imprevisto chegar. O Diagnóstico de Ângulo Morto Patrimonial mostra isso em números.',
  items: [
    { icon: 'heart', title: 'Seguro de Vida', text: 'Sua família amparada se você sair de cena.' },
    { icon: 'home', title: 'Patrimônio', text: 'Veículo, residência e empresa com a cobertura certa.' },
    { icon: 'scale', title: 'Responsabilidade Civil', text: 'Profissionais liberais protegidos de processos.' },
    { icon: 'key', title: 'Consórcio', text: 'Imóvel ou carro sem pagar juros de banco.' },
    { icon: 'trending', title: 'Previdência', text: 'Aposentadoria com taxa justa e estratégia clara.' },
    { icon: 'users', title: 'Sucessão Familiar', text: 'Seguro de vida como instrumento de legado.' },
  ],
  differential:
    '90% dos corretores focam só em seguro de carro. A RFG cuida do quadro completo, num único plano.',
} as const;

export const personas = {
  eyebrow: 'Para quem é',
  items: [
    {
      icon: 'users',
      title: 'Pais e provedores',
      text: 'Você sustenta a casa e quer que a família siga bem, aconteça o que acontecer.',
    },
    {
      icon: 'briefcase',
      title: 'Profissionais liberais',
      text: 'Médicos, engenheiros, advogados e dentistas expostos a processos que podem custar caro.',
    },
    {
      icon: 'key',
      title: 'Quem quer realizar sem juros',
      text: 'O imóvel ou o carro planejado, sem financiar pelo dobro do preço.',
    },
  ],
} as const;

export const howItWorks = {
  eyebrow: 'Como funciona',
  headline: 'Três etapas. Nenhuma proposta de prateleira.',
  steps: [
    {
      n: '01',
      title: 'Diagnóstico',
      text: 'Mapeamos família, patrimônio e renda e mostramos onde a cobertura falta, sobra ou está errada.',
    },
    {
      n: '02',
      title: 'Plano personalizado',
      text: 'Vida, bens, consórcio e previdência num plano só. Você entende o que contrata, por quê e quanto custa.',
    },
    {
      n: '03',
      title: 'Acompanhamento',
      text: 'Ricardo e Anderson seguem com você na renovação, no sinistro e nas mudanças de vida.',
    },
  ],
} as const;

export interface PathItem {
  slug: 'essencial' | 'completa' | 'legado';
  title: string;
  forWho: string;
  items: ReadonlyArray<string>;
  bonus: ReadonlyArray<string>;
  cta: string;
  key: WhatsAppMessageKey;
  featured?: boolean;
}

const CHECKLIST = 'Checklist “Meu Patrimônio Blindado: 7 Passos”';
const GUIA = 'Guia “Desvendando a Previdência Inteligente”';
const SESSAO = 'Sessão “Consórcio sem juros: seu próximo imóvel ou carro”';

export const paths = {
  eyebrow: 'Caminhos',
  headline: 'Tudo começa pelo diagnóstico gratuito.',
  sub: 'Depois dele, seu plano se encaixa em um destes três perfis.',
  items: [
    {
      slug: 'essencial',
      title: 'Segurança Essencial',
      forWho: 'Para quem está começando a se proteger.',
      items: [
        'Diagnóstico patrimonial completo',
        'Seguro de vida sob medida',
        'Cobertura de um bem prioritário',
        'Acesso direto aos sócios',
      ],
      bonus: [CHECKLIST],
      cta: 'Quero começar',
      key: 'essencial',
    },
    {
      slug: 'completa',
      title: 'Segurança Completa',
      forWho: 'Para quem já construiu patrimônio e quer um plano integrado.',
      items: [
        'Diagnóstico completo e personalizado',
        'Seguro de vida para o provedor',
        'Cobertura de veículo, residência ou empresa',
        'Responsabilidade civil profissional',
        'Sessão estratégica de consórcio',
        'Acesso prioritário aos sócios',
      ],
      bonus: [GUIA, CHECKLIST],
      cta: 'Quero o plano completo',
      key: 'completa',
      featured: true,
    },
    {
      slug: 'legado',
      title: 'Legado Familiar',
      forWho: 'Para quem quer estruturar o futuro dos filhos.',
      items: [
        'Tudo do Segurança Completa',
        'Previdência privada com taxa justa',
        'Planejamento de sucessão familiar',
        'Consórcio de imóvel para os filhos',
        'Revisão anual do plano',
        'Acesso prioritário e contínuo aos sócios',
      ],
      bonus: [GUIA, CHECKLIST, SESSAO],
      cta: 'Quero construir um legado',
      key: 'legado',
    },
  ] satisfies ReadonlyArray<PathItem>,
  investment:
    'O investimento é definido depois do diagnóstico, conforme perfil e patrimônio. Você vê o valor antes de assinar.',
  unsure: {
    title: 'Não sabe qual é o seu?',
    text: 'Em 30 a 45 minutos de conversa, Ricardo ou Anderson mostram o caminho certo. As vagas de diagnóstico são limitadas por mês.',
    cta: 'Fazer meu diagnóstico gratuito',
    key: 'cta_unico' as WhatsAppMessageKey,
  },
} as const;

export const about = {
  eyebrow: 'Sobre a RFG',
  headline: 'Experiência desde 1995. Atendimento pelo nome.',
  photo: {
    src: '/images/socios/socios-02-estudio.webp',
    alt: 'Ricardo Farias e Anderson Guimarães, sócios fundadores da RFG',
    width: 1400,
    height: 933,
  },
  timeline: [
    {
      year: '1995',
      text: 'Ricardo Farias entra no mercado de seguros. Anderson Guimarães atua como gerente territorial na Mapfre.',
    },
    {
      year: '2013',
      text: 'Os dois fundam a RFG para ser o consultor que olha o quadro completo e fica depois da assinatura.',
    },
    {
      year: 'Hoje',
      text: 'Mais de 1.200 famílias atendidas em 12 anos, com carros, imóveis, empresas e carreiras protegidos.',
    },
  ],
} as const;

export const testimonials = {
  eyebrow: 'Clientes',
  headline: 'Quem já passou pela RFG.',
  items: [
    {
      name: 'Felipe Alexandre Oliveira',
      role: 'Segurança do Trabalho',
      excerpt:
        'Fui acompanhado do início, na escolha da carta de crédito, até a contemplação. Recomendo de olhos fechados.',
      full: 'Quero agradecer de coração a você e à sua equipe. Sem vocês eu não teria alcançado essa conquista. Fui acompanhado do início — na escolha da carta de crédito — até a contemplação e o recebimento do crédito, sempre com atendimento excelente, atencioso e paciente (do Ricardo e também do colega que me acompanhou). Mesmo quando eu tinha dúvidas simples, recebi todo o apoio. Recomendo de olhos fechados: já passei seu contato para duas ou três pessoas e sigo indicando. Muito obrigado; que Deus abençoe grandemente o trabalho de vocês.',
    },
    {
      name: 'Eder Clemente Pio',
      role: 'Empresário',
      excerpt: 'Empresa séria, competente e ágil na solução de eventuais problemas. Recomendo.',
      full: 'Sou parceiro da RFG Corretora há muitos anos, tanto no consórcio imobiliário quanto nos seguros dos meus veículos e do meu negócio. Empresa séria, competente e ágil na solução de eventuais problemas, além de sempre me apresentar boas oportunidades. Recomendo.',
    },
    {
      name: 'Henrique Martins Santos',
      role: 'Supervisor de Produção',
      excerpt:
        'Recebemos assistência total em todo o processo: fomos orientados em cada etapa. Excelente suporte.',
      full: 'Recebemos assistência total em todo o processo: fomos orientados em cada etapa e tudo correu com tranquilidade. O único contratempo foi com a oficina (demora na entrega e um ajuste simples no para-barro), algo alheio à equipe e rápido de resolver. Excelente suporte.',
    },
    {
      name: 'Walter Campos',
      role: 'Agente publicitário, cliente há mais de doze anos',
      excerpt:
        'Nos sinistros, o suporte foi fundamental. Serviço sério e prestimoso.',
      full: 'Cliente da RFG – Seguros e Consórcios há mais de doze anos (indicado por um amigo), sempre recebi orientações claras na aquisição de produtos/serviços e nas negociações com as seguradoras. Nos sinistros, o suporte foi fundamental, com dicas que levaram à solução desejada. Serviço sério e prestimoso.',
    },
  ],
} as const;

export const commitment = {
  eyebrow: 'Nosso compromisso',
  headline: 'Se não fizer sentido para você, não tem negócio.',
  points: [
    'Transparência antes, durante e depois da venda',
    'Sem surpresa no sinistro, sem letra miúda',
    'O diagnóstico existe para dar clareza, não para prender',
  ],
} as const;

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq = {
  eyebrow: 'Perguntas frequentes',
  headline: 'Dúvidas comuns.',
  items: [
    {
      question: 'O diagnóstico tem custo?',
      answer: 'Não. É gratuito e sem compromisso. A partir dele montamos um plano que cabe no seu orçamento.',
    },
    {
      question: 'Como funciona o primeiro passo?',
      answer: 'Você clica no botão e fala no WhatsApp direto com Ricardo ou Anderson. Sem atendente, sem call center.',
    },
    {
      question: 'Vocês trabalham só com seguro de carro?',
      answer: 'Não. Atuamos com vida, patrimônio, responsabilidade civil, consórcio, previdência e sucessão.',
    },
    {
      question: 'Já tenho seguro. Ainda faz sentido?',
      answer: 'Sim. Muitos clientes descobrem que pagam por cobertura errada, insuficiente ou duplicada.',
    },
    {
      question: 'Seguro não é caro para o meu momento?',
      answer: 'Um único processo pode custar R$ 200 mil. Em muitos casos a parcela do seguro fica abaixo de R$ 200 por mês.',
    },
    {
      question: 'Sou jovem. Posso deixar para depois?',
      answer: 'Seguro não é retroativo. Quanto mais cedo você contrata, menor o custo e maior a cobertura.',
    },
    {
      question: 'Vocês somem depois da assinatura?',
      answer: 'Não. Acompanhamos renovação, sinistro e revisões. Temos clientes há mais de doze anos.',
    },
    {
      question: 'Previdência só vale para quem ganha muito?',
      answer: 'Não. Vale para quem quer se aposentar com dinheiro suficiente, sem as taxas altas de banco.',
    },
    {
      question: 'Quanto tempo leva?',
      answer: 'Em poucos dias você tem diagnóstico e plano. A implementação varia conforme cada produto.',
    },
    {
      question: 'A RFG é regularizada?',
      answer: 'Sim. A RFG é corretora registrada na SUSEP e opera em Maceió desde 2013.',
    },
  ] satisfies ReadonlyArray<FaqItem>,
} as const;

export const finalCta = {
  headline: 'Descubra o seu ângulo morto patrimonial.',
  text: 'Conversa direta com os sócios. Sem custo, sem compromisso.',
  cta: 'Falar no WhatsApp',
  key: 'cta_unico' as WhatsAppMessageKey,
} as const;

export const footer = {
  tagline: `Corretora de seguros em Maceió/AL desde ${facts.founded}. Experiência dos sócios desde ${facts.experienceSince}.`,
  legalLinks: [
    { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
    { label: 'Termos de Uso', href: '/termos-de-uso' },
  ],
  contact: {
    address:
      'Rua José Pontes Magalhães, 70 · Edifício Itália, salas 506-509 · Jatiúca · Maceió/AL',
    phone: '(82) 3142-1018',
    phoneHref: 'tel:+558231421018',
    whatsapp: '+55 82 98235-9028',
    whatsappHref: 'https://wa.me/5582982359028',
    email: 'comercial@rfgcorretora.com.br',
    emailHref: 'mailto:comercial@rfgcorretora.com.br',
    instagram: '@rfg.seguros',
    instagramHref: 'https://instagram.com/rfg.seguros',
  },
  susepLine: 'Corretora registrada na SUSEP.',
  copyrightSuffix: 'RFG Corretora de Seguros · Todos os direitos reservados.',
} as const;
