import type { ProblemContent } from '@/types/content';

/**
 * Problema Primário (Seção 2) — copy LITERAL de `05-copy-landing.md`
 * linhas 27-37, com mecanismo "Ponto Cego Patrimonial" (FR-004).
 *
 * Compliance:
 * - CON-013: nenhuma menção à persona "Marcelo" + sem "garantia/garantir".
 * - NFR-013: Title Case na headline.
 */
export const problem: ProblemContent = {
  eyebrow: 'O Problema',
  headline:
    'O problema não é falta de proteção. É o ângulo que você nunca conseguiu ver.',
  paragraphs: [
    'Você sabe exatamente o que construiu. O apartamento. O carro. A carteira de clientes. Os anos de trabalho que estão por trás de cada um desses ativos.',
    'Mas existe uma zona que ninguém nunca te mostrou: o que sobra de tudo isso se um dia ruim chegar de surpresa. Não um dia ruim qualquer — um acidente, uma incapacidade, um processo judicial, um sinistro grave. O que fica para a sua família? O que continua de pé?',
    'Não é sua culpa não saber essa resposta. Banco quer vender produto, não resolver sua vida. Corretor genérico quer fechar a proposta e sumir. Ninguém nunca sentou com você, olhou para tudo que você tem, e te mostrou esse número com honestidade. O resultado é que o seu patrimônio cresceu de um lado... e a sua vulnerabilidade cresceu no mesmo ritmo do outro lado, completamente fora do seu campo de visão.',
    'E enquanto esse número permanece invisível, a resposta mais fácil continua sendo a mesma: "ainda sou novo, resolvo isso depois." Só que o imprevisto não avisa a hora que vai chegar. E quando ele chega, não dá mais para contratar nada.',
  ],
  anchorPhrase: 'ainda sou novo, resolvo isso depois.',
} as const;
