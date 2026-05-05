import type { HowItWorksContent } from '@/types/content';

/**
 * Como Funciona (Seção 8) — copy LITERAL de
 * `docs/briefing/05-copy-landing.md` linhas 167-206.
 *
 * Compliance crítica:
 * - CON-013 / AC-3: títulos em Title Case (NÃO CAIXA ALTA).
 * - FR-010: 3 passos numerados com bridge + bullets literais.
 * - Ícones: 🔍 lupa / 🛡️ escudo+doc / 🤝 aperto de mão (briefing linha 209).
 */
export const howItWorks: HowItWorksContent = {
  eyebrow: 'Como Funciona',
  bridge:
    'Não é uma proposta genérica. Não é um produto empurrado. É um processo em três etapas — feito para a sua realidade, não para uma planilha padrão.',
  steps: [
    {
      number: '01',
      iconKey: 'search',
      emoji: '🔍',
      titulo: 'Passo 1: O Diagnóstico de Ângulo Morto Patrimonial',
      body:
        'Você nos conta o que tem — família, patrimônio, renda, planos. Nós mostramos o que sobra disso tudo se um imprevisto chegar amanhã. É a primeira vez que alguém ilumina o ponto que ninguém nunca te mostrou.',
      bullets: [
        'Mapeamos tudo que você construiu: imóvel, veículo, renda, negócio',
        'Identificamos onde a proteção está ausente, insuficiente ou mal alocada',
        'Traduzimos risco abstrato em números concretos — sem enrolação',
      ],
    },
    {
      number: '02',
      iconKey: 'shield-check',
      emoji: '🛡️',
      titulo: 'Passo 2: O Plano Personalizado',
      body:
        'Com o diagnóstico em mãos, montamos o seu plano completo. Proteção da família. Cobertura do patrimônio. Realização dos seus sonhos. Tudo junto — sem precisar escolher entre um e outro.',
      bullets: [
        'Selecionamos os produtos certos para o seu perfil — e só eles',
        'Integramos seguro de vida, cobertura de bens, consórcio e previdência em um único plano claro',
        'Você entende o que está contratando, por quê, e quanto custa — sem letra miúda',
      ],
    },
    {
      number: '03',
      iconKey: 'handshake',
      emoji: '🤝',
      titulo: 'Passo 3: Acompanhamento Contínuo',
      body:
        'Aqui é onde a maioria dos corretores some. Nós ficamos. Ricardo e Anderson acompanham cada cliente pelo nome — na renovação, no sinistro, na mudança de vida. Você fala com quem sabe, não com um atendente.',
      bullets: [
        'Acesso direto aos fundadores — sem call center, sem fila',
        'Revisões periódicas para adequar o plano quando sua vida muda',
        'Suporte real quando você mais precisa — inclusive no momento do sinistro',
      ],
    },
  ],
} as const;
