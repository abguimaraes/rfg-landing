/**
 * Visão de Futuro (Seção 11) — copy LITERAL de
 * `docs/briefing/05-copy-landing.md` linhas 357-389.
 *
 * Estrutura: 2 blocos contrastantes (positivo/negativo) que pintam o
 * "daqui a dois anos" de quem age vs quem adia.
 *
 * Compliance:
 * - CON-013: sem "garantia/garantir/garante".
 * - NFR-013: Title Case na headline.
 * - Sem CTA (próxima seção Objeções já leva ao WhatsApp).
 */

export interface VisionBlock {
  /** Headline curta do bloco (ex: "Imagine daqui a dois anos."). */
  headline: string;
  /** Parágrafos do corpo do bloco. */
  paragraphs: ReadonlyArray<string>;
  /** Linha-âncora destacada (peso 600 + cor primária no light, branca no dark). */
  closingLine: string;
}

export interface VisionContent {
  /** Eyebrow editorial (Title Case). */
  eyebrow: string;
  /** Headline da seção (h2). */
  headline: string;
  /** Bloco positivo (cenário de ação). */
  positive: VisionBlock;
  /** Bloco negativo (cenário de inação). */
  negative: VisionBlock;
}

export const vision: VisionContent = {
  eyebrow: 'Visão de Futuro',
  headline: 'Imagine daqui a dois anos.',
  positive: {
    headline: 'Você acorda. Toma seu café. E não sente aquele peso.',
    paragraphs: [
      'Sabe aquela sensação de fundo — aquela que você prefere não nomear — de que está construindo tudo sozinho, sem rede? Ela foi embora.',
      'Sua família está protegida. O apartamento está coberto. O consórcio está rodando. E você tem um consultor que conhece sua história pelo nome — que aparece quando precisa, sem você precisar correr atrás de ninguém.',
      'Você não precisou escolher entre proteger o que tem e construir o que quer.',
      'Quem está perto de você sente isso. Não precisa nem falar. É a tranquilidade de saber que, se algo acontecer com você, a família não vai do zero. Os filhos crescem com segurança real — não só emocional.',
    ],
    closingLine: 'E você chega em casa com menos peso nas costas.',
  },
  negative: {
    headline: 'Agora o outro lado. Se você não agir, nada muda.',
    paragraphs: [
      'Daqui a dois anos, você ainda vai estar adiando. Ainda vai ter uma conta mais urgente, uma reforma, uma viagem. E o "momento certo" vai continuar não chegando — porque ele nunca vem com placa.',
      'O problema com o imprevisto é que ele não avisa.',
      'Quando o acidente acontece, quando o processo judicial cai no seu colo, quando você fica incapacitado por um tempo — já é tarde demais para contratar qualquer coisa. Proteção não funciona como remédio. Você não contrata depois que a doença chegou.',
      'Você trabalhou anos para construir o que tem.',
    ],
    closingLine: 'Não deixa o acaso decidir o que acontece com isso.',
  },
} as const;
