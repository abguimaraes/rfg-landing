import type { OriginStoryContent } from '@/types/content';

/**
 * História de Origem (Seção 7) — copy LITERAL de
 * `docs/briefing/05-copy-landing.md` linhas 130-159.
 *
 * Compliance crítica (CON-013 / CON-014 / I-006):
 * - Nomes literais: "Ricardo Farias" (NÃO "Ricardo Guimarães"),
 *   "Anderson Guimarães", "Mapfre", "1995", "2013", "13 anos".
 * - "Marcelo" NÃO aparece (AC-29).
 * - "13 anos" presente (NÃO "12 anos" — I-002).
 * - Citação canônica do Walter (cliente há 12+ anos), substitui a
 *   antiga citação atribuída ao Rodrigo (decisão Anderson 2026-05-05).
 * - L-008 / FR-018: apenas `socios-02-estudio.webp` é usada em v1.
 */
export const originStory: OriginStoryContent = {
  eyebrow: 'Nossa História',
  headline: 'Por que a RFG existe — e por que isso importa para você',
  photo: {
    src: '/images/socios/socios-02-estudio.webp',
    alt: 'Ricardo Farias e Anderson Guimarães, sócios fundadores da RFG, em estúdio — contexto de trabalho.',
    width: 1400,
    height: 933,
  },
  milestones: [
    {
      year: '1995',
      title: 'O início no mercado de seguros',
      body: 'Ricardo Farias estava no mercado de seguros e via a mesma cena se repetir toda semana: famílias sendo forçadas a escolher entre proteger o que têm e realizar o que sonham. Anderson Guimarães vivia o mesmo problema do outro lado do balcão, como gerente territorial na Mapfre — corretores que apareciam para fechar a venda e sumiam, gerentes de banco que empurravam previdência com taxas absurdas sem explicar nada.',
    },
    {
      year: '2013',
      title: 'A fundação da RFG',
      body: 'Ricardo e Anderson decidiram fazer diferente. Fundaram a RFG não para ser mais uma corretora — mas para ser o consultor que ninguém antes tinha sido: alguém que olha para o quadro completo, fala com clareza, e fica do lado mesmo depois que o contrato é assinado.',
    },
    {
      year: 'Hoje',
      title: '1.200+ famílias, 13 anos de operação',
      body: 'Mais de 1.200 famílias passaram pela RFG em 13 anos. Dezenas saíram do aluguel via consórcio, sem pagar juros de banco. Centenas tiveram carro, imóvel e empresa protegidos. Profissionais liberais passaram a exercer suas profissões com tranquilidade — sabendo que um processo judicial não vai destruir o que levaram anos para construir. Registro SUSEP ativo desde 1995.',
    },
  ],
  quote: {
    text: 'Serviço sério e prestimoso, recebi orientações claras desde a aquisição até as negociações com as seguradoras.',
    attribution: 'Walter Campos — cliente há mais de doze anos',
  },
  closing:
    'Isso não se constrói com quem quer só fechar venda. Se constrói com 35 anos de experiência combinada, registro SUSEP ativo desde 1995, e a decisão de tratar cada cliente como família — não como mais um número na carteira.',
} as const;
