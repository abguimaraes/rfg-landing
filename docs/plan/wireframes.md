# RFG Landing — Wireframes Detalhados v1.0

> Wireframes em ASCII das 13 seções + footer da landing RFG.
> **Mobile-first** (320-768px) — desktop (>=1024px) é evolução do mobile, não reset.
> **Stack visual:** Tailwind + tokens em `design-system.md`. Tipografia: Manrope (display) + Inter (body).
> **Animações:** GSAP + ScrollTrigger (referência: `effects-reference.md`).
> **CTA universal:** `https://wa.me/5582982359028?text={mensagem-contextual}`.

---

## 1. Decisões de Design (10)

| # | Decisão | Resposta | Justificativa |
|---|---------|----------|---------------|
| 1 | Foto Hero | **`socios-01-perfil-rfg.png`** (close peito-pra-cima, ambos blazer azul + camisa branca, fundo escuro) | Tráfego principal vem do Instagram (mobile). Em 320-414px o close lê melhor que corpo inteiro — rosto reconhecível como ativo de credibilidade. A formalidade do close ancora a "Tríade da Credencial" (35 anos / SUSEP 1995 / 1.200 famílias) sem competir com a headline. `socios-02-estudio.png` fica reservado para Seção 7 (História) — corpo inteiro casual casa com tom fraternal/storytelling. |
| 2 | Layout 3 personas (Seção 4) | **3 colunas desktop / 1 col stacked mobile**. Cards `default` com ícone Lucide no topo + H4 + body curto. Prefixo "Isso é para você se..." conforme briefing. | Cards uniformes evitam hierarquia entre personas (todas igualmente importantes). Stack mobile preserva legibilidade do body curto. |
| 3 | Pilares de valor (Seção 5) | **Grid 2x2 desktop / 1 col stacked mobile**. Cards `card-hover` (border-1, shadow-sm, lift no hover). | 4 cards em linha única ficariam apertados em 1024px. 2x2 dá respiro visual e cria pares semânticos (proteger/realizar / família/consultor). |
| 4 | Depoimentos (Seção 6) | **Grid estático 2 colunas desktop / 1 col stacked mobile** + faixa marquee de logos parceiros embaixo. Sem carousel. | Apenas 2 depoimentos confirmados (Rodrigo + Marcos Roberto). Carousel para 2 itens é overkill — grid estático cria simetria e força leitura completa. Carousel virá em v2 quando houver 5+ depoimentos. |
| 5 | Marquee logos parceiros (Seção 6) | **Confirmado — marquee infinito CSS keyframes** (padrão #8 effects-reference). 30s linear infinite. Respeita `prefers-reduced-motion: reduce` (vira grid estático). 10 logos em loop. | Padrão validado em PostFeito. CSS-only é leve (não usa JS), GPU-friendly. |
| 6 | 3 caminhos (Seção 9) | **Desktop: 3 cards horizontais, Caminho 2 (Proteção Completa) destacado** com `card-featured` (border-2 rfg-mid, shadow-xl, badge "MAIS PROCURADO" — posicionado discretamente, não gritado). Mobile: stack 1 coluna; Caminho 2 elevado por shadow + border, mas SEM scroll horizontal (visitante mobile precisa ver os 3). | Decisão alinhada à copy: "o caminho mais procurado" é descritivo, não selo de marketing. Stack mobile garante visibilidade dos 3 sem swipe. |
| 7 | Como Funciona (Seção 8) | **Steps verticais simples desktop + mobile** (NÃO scroll-pinned). 3 cards numerados (01/02/03) com ícone + H3 + body + lista bullet. Em desktop, cards lado-a-lado com linha conectora sutil. | Scroll-pinned (padrão #3) é poderoso mas pesa em performance — meta Lighthouse 95+ é prioridade. Steps verticais com `Card grid stagger` (padrão #2) entrega impacto sem custo de pin. Reservar pin para v2 caso métricas justifiquem. |
| 8 | Bento grid (padrão #7) | **Aplicar na Seção 7 (História de Origem)** — 4 áreas em grid: foto sócios (`socios-02-estudio.png`), bloco "1995" (Ricardo), bloco "2013" (fundação RFG), bloco "Hoje" (1.200 famílias / 35 anos). Mobile: stack 1 coluna sequencial. | Seção 7 é narrativa multi-temporal (1995 → 2013 → hoje) — bento grid traduz visualmente as 3 eras + foto-âncora. Seção 6 (Prova) ficaria ruidosa com bento; depoimentos pedem leitura linear. |
| 9 | FAQ (Seção 13) | **Acordeão (collapsible)**. Card padrão com chevron rotativo. Apenas 1 pergunta aberta por vez (single-open). 10 perguntas. | Conforme briefing. Single-open evita ruído visual e força foco. Reduz altura inicial da seção em ~60%. |
| 10 | Footer | Logo RFG + copy "Corretora de Seguros" / **CNPJ** / **Endereço Maceió-AL** / **Telefone WhatsApp clicável** / **Email** / **SUSEP "Registro ativo desde 1995"** / **Redes (Instagram, LinkedIn)** / Links navegação interna (âncoras) / Aviso legal LGPD + Política de Privacidade / **Mapa Google Maps incorporado** (iframe lazy-loaded, 1 col mobile / coluna lateral desktop). | Mapa cumpre dupla função: localização real (não é "loja virtual sem rosto") + reforço de credibilidade física. CNPJ + SUSEP no footer são exigências de compliance do setor. |

---

## 2. Ordem de Scroll (Top → Bottom) — Trilha de Efeitos

| # | Seção | Efeito de entrada | Transição |
|---|-------|-------------------|-----------|
| 0 | Sticky nav (logo + CTA WhatsApp) | Slide-down 200ms ao scroll | — |
| 1 | Hero | **#1 Hero text reveal** (word stagger 80ms) + foto fade-in 600ms | Curve divider sutil (#4 simplificado em mobile) |
| 2 | Problema | Fade-in body, scroll natural (no pin) | Cor de fundo: `--bg-secondary` (zebra) |
| 3 | Oportunidade | Fade-in eyebrow + headline; body reveal por parágrafo (intersection observer) | Volta para `--bg-primary` |
| 4 | Para Quem É | **#2 Card grid stagger** (3 cards, 150ms entre) | — |
| 5 | Proposta de Valor | **#2 Card grid stagger** + **#6 Icon scale-in burst** (back.out elastic) nos 4 ícones | — |
| 6 | Prova | Quote cards fade-in stagger + **#8 Marquee infinito** logos | `--bg-secondary` |
| 7 | História de Origem | **#7 Bento grid scrubbed** (5 fases: foto, 1995, 2013, hoje, citação Rodrigo) | `--bg-primary` |
| 8 | Como Funciona | **#2 Card grid stagger** vertical (3 steps, 200ms entre) + **#5 Counter tween** opcional ("35 anos", "1.200 famílias") | — |
| 9 | O Caminho (3 pacotes) | **#2 Card grid stagger** (3 cards, Caminho 2 com leve scale-up no destaque) | `--bg-secondary` (separa visualmente) |
| 10 | Compromisso | Fade-in + selo SUSEP icon scale | `--bg-primary` |
| 11 | Visão de Futuro | 2 colunas: positivo fade-in da esquerda, negativo da direita (com `--bg-secondary` no negativo) | — |
| 12 | Objeções | Acordeão: itens fade-in stagger; abrir = altura animada 250ms | — |
| 13 | FAQ | Acordeão idem + CTA final | — |
| 14 | Footer | Sem efeito de entrada (já visível ao chegar) | `--bg-inverse` |

> **Performance guard:** todos os efeitos respeitam `prefers-reduced-motion: reduce` (sem animação, opacity 1). GSAP + ScrollTrigger são lazy-loaded no marketing layout (dynamic import).

---

## 3. CTAs WhatsApp — Mapa de Pontos de Conversão

> Anderson exige **mínimo 4 CTAs**. Plano: **8 CTAs estratégicos** distribuídos.

| # | Localização | Texto botão | Mensagem WhatsApp |
|---|-------------|-------------|-------------------|
| 1 | Sticky nav (sempre visível) | `Falar no WhatsApp` (ghost desktop, ícone-only mobile) | `Olá! Vim pelo site da RFG.` |
| 2 | Hero | `Fazer meu diagnóstico` (primary lg) | `Olá! Quero fazer o Diagnóstico de Ângulo Morto Patrimonial.` |
| 3 | Seção 9 — Caminho 1 | `Quero proteger minha família` (primary md) | `Olá! Tenho interesse no Caminho 1: Proteção Essencial.` |
| 4 | Seção 9 — Caminho 2 | `Quero o plano completo` (primary md, destacado) | `Olá! Tenho interesse no Caminho 2: Proteção Completa.` |
| 5 | Seção 9 — Caminho 3 | `Quero construir um legado` (primary md) | `Olá! Tenho interesse no Caminho 3: Legado Familiar.` |
| 6 | Seção 9 — CTA único final | `Fazer meu diagnóstico gratuito` (primary lg, full-width mobile) | `Olá! Quero meu diagnóstico gratuito.` |
| 7 | Seção 12 (após objeções) | `Fazer meu diagnóstico agora` (primary lg) | `Olá! Resolvi minhas dúvidas — quero conversar.` |
| 8 | Footer / FAQ final | `Ainda tem dúvida? Fala direto com a gente.` (secondary md) | `Olá! Ainda tenho uma dúvida pra resolver.` |

**Encoding URL:** `https://wa.me/5582982359028?text={URL-encoded message}`. Todos os links com `target="_blank"` + `rel="noopener noreferrer"`.

---

## 4. Convenções dos Wireframes

```
┌─┐ = container (border)
│ │ = padding lateral
═══ = headline display
─── = body / divider
[BTN] = CTA primário
(btn) = CTA secundário/ghost
[IMG] = imagem
{ICN} = ícone Lucide
★ = badge
░░░ = background secundário (--bg-secondary)
▓▓▓ = background dark (--bg-inverse footer)
```

---

## 5. Sticky Nav (above the fold)

### Mobile (320-768)
```
┌──────────────────────────────────────────┐
│ [LOGO RFG]              {ICN whatsapp}   │  56px height, --shadow-sm
└──────────────────────────────────────────┘
```

### Desktop (>=1024)
```
┌────────────────────────────────────────────────────────────────────┐
│ [LOGO RFG]    Sobre  Como Funciona  Caminhos  FAQ    [Falar no WA]│  72px height
└────────────────────────────────────────────────────────────────────┘
```

### Elementos
| Elemento | Token / Componente |
|----------|-------------------|
| Logo RFG | `assets/brand/logo-rfg-horizontal.svg` (32px h mobile, 40px desktop) |
| Links nav | `text-body-sm` Inter 500, `--text-secondary` |
| CTA | mobile: `btn-ghost` ícone WhatsApp 24px / desktop: `btn-secondary-md` |
| Background | `--bg-primary` com backdrop-blur 12px ao scroll |
| Border-bottom | `--border-subtle` |
| Position | `sticky top-0 z-50` |

### Efeitos
- Slide-down 200ms ao detectar scroll > 80px
- Logo recolhe (height 32 → 28) em scroll
- Mobile menu hambúrguer NÃO existe (lista de links cabe em desktop apenas; mobile vai direto pro WhatsApp ícone)

---

## Seção 1: Hero

### Mobile (320-768)
```
┌──────────────────────────────────────────┐
│                                          │
│   ★ SUSEP — Registro ativo desde 1995    │  badge-success
│                                          │
│   ════════════════════════════════════   │
│   Você construiu muito.                  │  text-display Manrope 800
│   Sua família está protegida             │  44px mobile
│   se algo acontecer?                     │
│   ════════════════════════════════════   │
│                                          │
│   A RFG cuida da proteção da sua         │  text-lead Inter 400
│   família e do seu patrimônio — com      │  18px mobile
│   um plano feito para a sua realidade,   │
│   não uma proposta genérica.             │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  [Fazer meu diagnóstico]    →      │ │  btn-primary-lg full-width
│   └────────────────────────────────────┘ │
│                                          │
│   {ICN whatsapp}  Sem custo. Sem         │  text-caption
│                   compromisso.           │
│                                          │
│   ┌──────────────────────────────────┐   │
│   │                                  │   │
│   │   [IMG socios-01-perfil-rfg]     │   │  --radius-2xl, aspect 4/5
│   │   Ricardo + Anderson             │   │  --shadow-2xl
│   │                                  │   │
│   └──────────────────────────────────┘   │
│                                          │
│   ★ 1.200+ famílias    ★ 35 anos exp.   │  Tríade Credencial
│                                          │
└──────────────────────────────────────────┘
```

### Desktop (>=1024)
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐ │
│  │                              │  │                              │ │
│  │ ★ SUSEP 1995                 │  │                              │ │
│  │                              │  │  [IMG socios-01-perfil-rfg]  │ │
│  │ ══════════════════════════   │  │                              │ │
│  │ Você construiu muito.        │  │  Ricardo Farias              │ │
│  │ Sua família está             │  │  + Anderson Guimarães        │ │
│  │ protegida se                 │  │                              │ │
│  │ algo acontecer?              │  │  --radius-2xl                │ │
│  │ ══════════════════════════   │  │  --shadow-2xl                │ │
│  │                              │  │                              │ │
│  │ A RFG cuida da proteção...   │  │                              │ │
│  │                              │  │                              │ │
│  │ [Fazer meu diagnóstico] →    │  │                              │ │
│  │                              │  │                              │ │
│  │ {ICN} Sem custo. Sem comp.   │  │                              │ │
│  │                              │  │                              │ │
│  │ ★ 1.200 famílias  ★ 35 anos  │  │                              │ │
│  └──────────────────────────────┘  └──────────────────────────────┘ │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elementos
| Elemento | Token |
|----------|-------|
| Eyebrow / Badge SUSEP | `badge-success md`, "SUSEP — Registro ativo desde 1995" |
| H1 | `text-display` Manrope 800, `--text-primary`, `--lh-tight` |
| Subheadline | `text-lead` Inter 400, `--text-secondary` |
| CTA primário | `btn-primary-lg`, gradiente CTA, `--shadow-cta` |
| Microcopy CTA | `text-caption` `--text-tertiary` |
| Foto sócios | `socios-01-perfil-rfg.png` (a converter pra .webp), aspect 4/5 mobile, 1/1 desktop, `--radius-2xl`, `--shadow-2xl` |
| Tríade credencial | 3x `badge-outline sm` em linha (gap `--space-3`) |
| Container | `container-wide` |
| Padding | `py-12 px-4` mobile / `py-24 px-8` desktop |

### Foto/Asset
- **Principal:** `assets/socios/socios-01-perfil-rfg.png` (mobile + desktop)
- **Alt-text:** "Ricardo Farias e Anderson Guimarães, fundadores da RFG Corretora — 35 anos de experiência combinada"

### Efeitos
- **Padrão #1 — Hero text reveal** (word-by-word stagger 80ms, duration 0.6s, ease power2.out) — aplicado APENAS no H1
- Subheadline: fade-in 400ms após H1 completar
- Foto: fade-in + scale 1.02 → 1.00 em 600ms
- CTA: scale 0.96 → 1.00 + shadow-cta pulse sutil ao montar (300ms delay após subheadline)
- Tríade: fade-in stagger 100ms entre cada badge

### Responsividade
- Mobile: foto VAI ABAIXO do bloco texto (stack vertical), full-width
- Desktop: 2 colunas 50/50 com gap `--space-12`; texto à esquerda, foto à direita
- H1 redimensiona via `clamp(2.75rem, 5vw + 1rem, 4.5rem)`
- Tríade credencial em mobile: 2 badges em linha + 1 abaixo se não couber

### CTA
- **Texto:** `Fazer meu diagnóstico`
- **Destino:** `https://wa.me/5582982359028?text=Olá!%20Quero%20fazer%20o%20Diagnóstico%20de%20Ângulo%20Morto%20Patrimonial.`

---

## Seção 2: O Problema Primário

### Mobile (320-768)
```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  --bg-secondary
┌──────────────────────────────────────────┐
│                                          │
│   ════════════════════════════════════   │
│   O problema não é falta de              │  text-h2 Manrope 700
│   proteção. É o ângulo que você          │  30px mobile
│   nunca conseguiu ver.                   │
│   ════════════════════════════════════   │
│                                          │
│   Você sabe exatamente o que             │  text-body-lg Inter 400
│   construiu. O apartamento. O carro.     │  17px mobile, --lh-loose
│   A carteira de clientes. Os anos        │
│   de trabalho que estão por trás de      │
│   cada um desses ativos.                 │
│                                          │
│   Mas existe uma zona que ninguém        │  Parágrafo 2
│   nunca te mostrou: o que sobra de       │
│   tudo isso se um dia ruim chegar...     │
│                                          │
│   Não é sua culpa não saber essa         │  Parágrafo 3
│   resposta...                            │
│                                          │
│   E enquanto esse número permanece       │  Parágrafo 4
│   invisível, a resposta mais fácil       │
│   continua sendo a mesma: "ainda sou     │
│   novo, resolvo isso depois."            │
│                                          │
└──────────────────────────────────────────┘
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

### Desktop (>=1024)
```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│         ════════════════════════════════════════════════════         │
│         O problema não é falta de proteção.                          │  max-width 760px
│         É o ângulo que você nunca conseguiu ver.                     │  centered
│         ════════════════════════════════════════════════════         │
│                                                                      │
│         Você sabe exatamente o que construiu...                      │  text-body-lg
│                                                                      │  centered narrow
│         Mas existe uma zona que ninguém nunca te mostrou...          │
│                                                                      │
│         Não é sua culpa não saber...                                 │
│                                                                      │
│         E enquanto esse número permanece invisível...                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

### Elementos
| Elemento | Token |
|----------|-------|
| H2 | `text-h2` Manrope 700, `--text-primary` |
| Body (4 parágrafos) | `text-body-lg` Inter 400, `--text-secondary`, `--lh-loose` |
| Frase-âncora "ainda sou novo, resolvo isso depois" | `--text-primary` Inter 600 (negrito de ênfase) |
| Container | `container-narrow` (max-width 760px) |
| Background | `--bg-secondary` |
| Padding | `py-12 px-4` mobile / `py-24 px-6` desktop |

### Foto/Asset
- Nenhuma. Seção textual de imersão (storytelling).

### Efeitos
- H2: fade-up 600ms ao entrar viewport (intersection observer 70%)
- Cada parágrafo: fade-in stagger 200ms entre, ease-out
- Frase-âncora "ainda sou novo, resolvo isso depois" recebe leve highlight (color shift `--text-primary` em 400ms quando em viewport)

### Responsividade
- Mobile: padding `--space-4` lateral
- Desktop: container-narrow centralizado, melhor leitura editorial

### CTA
- Nenhum nesta seção (deliberado: imersão sem interrupção comercial)

---

## Seção 3: A Oportunidade

### Mobile (320-768)
```
┌──────────────────────────────────────────┐
│                                          │
│   A OPORTUNIDADE                          │  eyebrow
│   ─────────────                          │
│                                          │
│   ════════════════════════════════════   │
│   O plano que protege o que              │  text-h2
│   você tem e realiza o que você          │
│   quer — ao mesmo tempo.                 │
│   ════════════════════════════════════   │
│                                          │
│   A RFG não chega com uma proposta       │  text-body-lg
│   pronta debaixo do braço. O primeiro    │
│   passo é o **Diagnóstico de Ângulo**    │
│   **Morto Patrimonial**...               │
│                                          │
│   O que torna isso diferente: enquanto   │
│   90% dos corretores focam em seguro     │
│   de carro... Ricardo Farias e           │
│   Anderson Guimarães trabalham com o     │
│   portfólio completo há mais de          │
│   35 anos.                               │
│                                          │
│   Imagine chegar em casa sabendo que,    │
│   se algo acontecer com você amanhã,     │
│   sua família está protegida...          │
│                                          │
│   ┌─────────────────────────────────┐    │
│   │  ★ +1.200 famílias atendidas    │    │  Stat highlight
│   │  ★ 35 anos de experiência       │    │
│   └─────────────────────────────────┘    │
│                                          │
└──────────────────────────────────────────┘
```

### Desktop (>=1024)
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   A OPORTUNIDADE                                                     │
│   ─────────────                                                      │
│                                                                      │
│   ════════════════════════════════════════════════════════           │  text-h2
│   O plano que protege o que você tem e realiza o que você            │  max 720px
│   quer — ao mesmo tempo.                                             │
│   ════════════════════════════════════════════════════════           │
│                                                                      │
│   A RFG não chega com uma proposta pronta debaixo do braço. O        │  text-body-lg
│   primeiro passo é o Diagnóstico de Ângulo Morto Patrimonial...      │  container-narrow
│                                                                      │
│   O que torna isso diferente de tudo que você já tentou antes:       │
│   enquanto 90% dos corretores focam em seguro de carro porque é      │
│   o produto mais fácil de vender, Ricardo Farias e Anderson...       │
│                                                                      │
│   Imagine chegar em casa sabendo que, se algo acontecer com você     │
│   amanhã, sua família está protegida...                              │
│                                                                      │
│   ┌────────────────────┐  ┌────────────────────┐                     │  Stats highlight
│   │ {ICN}              │  │ {ICN}              │                     │  inline
│   │ +1.200 famílias    │  │ 35 anos            │                     │
│   │ atendidas          │  │ de experiência     │                     │
│   └────────────────────┘  └────────────────────┘                     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elementos
| Elemento | Token |
|----------|-------|
| Eyebrow | `text-eyebrow` Manrope 600, `--rfg-blue-dark` |
| H2 | `text-h2` Manrope 700 |
| Body (3 parágrafos) | `text-body-lg` Inter 400 |
| Termos em negrito ("Diagnóstico de Ângulo Morto Patrimonial", "1.200 famílias", "35 anos") | Inter 600 `--text-primary` |
| Stats cards | 2x `card` simples (mobile: empilhado em pill / desktop: 2 colunas) |
| Container | `container-narrow` |

### Foto/Asset
- Nenhuma foto. Foco no peso da copy + 2 stats.

### Efeitos
- Eyebrow + H2: fade-up 500ms
- Body: fade-in stagger por parágrafo
- **Padrão #5 — Counter tween** nos números "1.200" e "35" (animam de 0 → valor em 1.2s ao entrar viewport)
- Ícones nos stats: scale-in 200ms

### Responsividade
- Mobile: stats empilhados como uma única pill (1.200 + 35 lado-a-lado em pill horizontal)
- Desktop: 2 cards distintos lado-a-lado

### CTA
- Nenhum nesta seção (constrói momentum para Seção 4-5)

---

## Seção 4: Para Quem É

### Mobile (320-768)
```
┌──────────────────────────────────────────┐
│                                          │
│   PARA QUEM É                            │  eyebrow
│   ──────────────                         │
│                                          │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  {ICN família}                     │ │  Card 1 — default
│   │                                    │ │  --shadow-sm
│   │  Pais e provedores                 │ │  text-h4
│   │  de família                        │ │
│   │                                    │ │
│   │  Você sustenta tudo sozinho e      │ │  text-body
│   │  sabe que, se sair de cena, a      │ │
│   │  família fica sem plano. Está      │ │
│   │  na hora de mudar isso.            │ │
│   └────────────────────────────────────┘ │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  {ICN estetoscópio}                │ │  Card 2
│   │                                    │ │
│   │  Profissionais liberais            │ │
│   │  e autônomos                       │ │
│   │                                    │ │
│   │  Médicos, engenheiros, advogados,  │ │
│   │  dentistas — você exerce sua       │ │
│   │  profissão exposto a riscos...     │ │
│   └────────────────────────────────────┘ │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  {ICN chave-imóvel}                │ │  Card 3
│   │                                    │ │
│   │  Quem quer realizar sonhos         │ │
│   │  sem pagar juros de banco          │ │
│   │                                    │ │
│   │  Você quer o imóvel ou o carro     │ │
│   │  que planejou, mas não quer        │ │
│   │  financiar pelo dobro do preço.    │ │
│   │  Existe um caminho melhor.         │ │
│   └────────────────────────────────────┘ │
│                                          │
└──────────────────────────────────────────┘
```

### Desktop (>=1024)
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   PARA QUEM É                                                        │
│   ──────────────                                                     │
│                                                                      │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│   │ {ICN família}    │  │ {ICN steto}      │  │ {ICN chave}      │  │
│   │                  │  │                  │  │                  │  │
│   │ Pais e provedores│  │ Profissionais    │  │ Quem quer        │  │
│   │ de família       │  │ liberais e       │  │ realizar sonhos  │  │
│   │                  │  │ autônomos        │  │ sem juros        │  │
│   │ Você sustenta    │  │                  │  │                  │  │
│   │ tudo sozinho...  │  │ Médicos, engs... │  │ Você quer o      │  │
│   │                  │  │                  │  │ imóvel...        │  │
│   └──────────────────┘  └──────────────────┘  └──────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elementos
| Elemento | Token |
|----------|-------|
| Eyebrow | `text-eyebrow` Manrope 600 |
| Card | `card` (default), `--radius-lg`, `--shadow-sm`, hover lift |
| Ícone (Lucide) | 32px, `--rfg-blue-dark`, stroke 1.5 |
| H3 do card | `text-h3` mobile / `text-h4` desktop, Manrope 600 |
| Body do card | `text-body` Inter 400, `--text-secondary` |
| Grid | mobile: stack 1 col gap `--space-6` / desktop: 3 col gap `--space-8` |

### Foto/Asset
- Ícones Lucide:
  - Card 1: `Users` ou `Heart-handshake` (família)
  - Card 2: `Stethoscope` (profissionais liberais)
  - Card 3: `KeyRound` ou `HomeKey` (sonhos/imóvel)

### Efeitos
- **Padrão #2 — Card grid stagger** (cards entram a 80% viewport, 150ms entre cada, 0.7s duration, ease power2.out)
- Hover: card lift translateY(-2px), shadow-md, border-emphasis

### Responsividade
- Mobile: stack 1 coluna
- Tablet (769-1023): 2 colunas (terceiro card centralizado embaixo) ou 3 col reduzido
- Desktop: 3 col gap-8

### CTA
- Nenhum (seção de qualificação/identificação)

---

## Seção 5: Proposta de Valor

### Mobile (320-768)
```
┌──────────────────────────────────────────┐
│                                          │
│   PROPOSTA DE VALOR                      │  eyebrow
│   ────────────────                       │
│                                          │
│   ════════════════════════════════════   │
│   Você trabalhou anos para construir     │  text-h2
│   isso. A RFG cuida para que nenhum      │
│   imprevisto desfaça o que você levou    │
│   tanto tempo para conquistar.           │
│   ════════════════════════════════════   │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  {ICN escudo}                      │ │  Pilar 1
│   │                                    │ │  card-hover
│   │  PROTEJA O QUE JÁ TEM              │ │  text-h4 caps
│   │                                    │ │
│   │  Um acidente, um processo, um      │ │
│   │  sinistro. Um único dia ruim       │ │
│   │  pode desfazer anos de trabalho.   │ │
│   └────────────────────────────────────┘ │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  {ICN casa}                        │ │  Pilar 2
│   │  REALIZE SEUS SONHOS SEM           │ │
│   │  PAGAR JUROS DE BANCO              │ │
│   │  ...                               │ │
│   └────────────────────────────────────┘ │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  {ICN família}                     │ │  Pilar 3
│   │  SUA FAMÍLIA PROTEGIDA SE          │ │
│   │  VOCÊ SAIR DE CENA                 │ │
│   │  ...                               │ │
│   └────────────────────────────────────┘ │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  {ICN aperto-mão}                  │ │  Pilar 4
│   │  UM CONSULTOR QUE CONHECE          │ │
│   │  VOCÊ PELO NOME                    │ │
│   │  ...                               │ │
│   └────────────────────────────────────┘ │
│                                          │
└──────────────────────────────────────────┘
```

### Desktop (>=1024)
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   PROPOSTA DE VALOR                                                  │
│   ────────────────                                                   │
│                                                                      │
│   ════════════════════════════════════════════════════════           │
│   Você trabalhou anos para construir isso.                           │  text-h2
│   A RFG cuida para que nenhum imprevisto desfaça...                  │  centered
│   ════════════════════════════════════════════════════════           │
│                                                                      │
│   ┌──────────────────────────┐  ┌──────────────────────────┐        │  Grid 2x2
│   │ {ICN escudo}             │  │ {ICN casa}               │        │
│   │                          │  │                          │        │
│   │ PROTEJA O QUE JÁ TEM     │  │ REALIZE SEUS SONHOS      │        │
│   │                          │  │ SEM PAGAR JUROS          │        │
│   │ Um acidente, um proc...  │  │ O imóvel ou o carro...   │        │
│   │                          │  │                          │        │
│   └──────────────────────────┘  └──────────────────────────┘        │
│   ┌──────────────────────────┐  ┌──────────────────────────┐        │
│   │ {ICN família}            │  │ {ICN aperto-mão}         │        │
│   │                          │  │                          │        │
│   │ SUA FAMÍLIA PROTEGIDA    │  │ UM CONSULTOR QUE         │        │
│   │ SE VOCÊ SAIR DE CENA     │  │ CONHECE VOCÊ PELO NOME   │        │
│   │ Se você é o único...     │  │ Sem call center...       │        │
│   └──────────────────────────┘  └──────────────────────────┘        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elementos
| Elemento | Token |
|----------|-------|
| Eyebrow | `text-eyebrow` Manrope 600 |
| H2 | `text-h2` Manrope 700, max-width 760px centered |
| Card pilar | `card-hover` |
| Ícone pilar | Lucide 40px, `--rfg-blue-mid`, stroke 1.5, em círculo de fundo `--neutral-100` (--radius-full, padding `--space-3`) |
| Título pilar | `text-h4` Manrope 600 UPPERCASE, `--text-primary`, tracking 0.02em |
| Body pilar | `text-body` Inter 400, `--text-secondary` |

### Foto/Asset
- Ícones Lucide: `ShieldCheck` / `Home` / `Users` / `HandshakeIcon`
- Substitui os emojis 🛡️ 🏠 👨‍👩‍👧 🤝 do briefing por ícones limpos (mais premium que emoji nativo)

### Efeitos
- **Padrão #2 — Card grid stagger** (4 cards, 150ms stagger)
- **Padrão #6 — Icon scale-in burst** (ícones 0 → 1 com ease back.out(1.7), delay 200ms após card aparecer)
- Hover card: lift + shadow-md + ícone scale 1.05

### Responsividade
- Mobile: stack 1 col
- Tablet: 2 col
- Desktop: 2x2 (grid-cols-2 gap-8)

### CTA
- Nenhum (constrói desejo, deixa CTA pra Seção 9)

---

## Seção 6: Prova

### Mobile (320-768)
```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  --bg-secondary
┌──────────────────────────────────────────┐
│                                          │
│   PROVA                                  │  eyebrow
│   ─────                                  │
│                                          │
│   ════════════════════════════════════   │
│   Mais de 1.200 famílias atendidas.      │  text-h2
│   Veja o que algumas delas têm a dizer.  │
│   ════════════════════════════════════   │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │ "                                  │ │  card-quote
│   │  Vocês têm carta branca para       │ │  border-left-4 rfg-light
│   │  providenciar o melhor para mim    │ │  --bg-primary
│   │  e minha família, como sempre."    │ │
│   │                                    │ │
│   │  — Rodrigo                         │ │
│   │  Cliente há anos da RFG            │ │
│   └────────────────────────────────────┘ │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │ "                                  │ │  card-quote 2
│   │  Obrigado por sua atenção de       │ │
│   │  sempre nos seguros, nos           │ │
│   │  investimentos e, infelizmente,    │ │
│   │  também no sinistro ocorrido."     │ │
│   │                                    │ │
│   │  — Marcos Roberto                  │ │
│   │  Cliente que indicou a filha       │ │
│   └────────────────────────────────────┘ │
│                                          │
│                                          │
│   SEGURADORAS PARCEIRAS                  │  text-eyebrow centered
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  ◄ Porto Bradesco Mapfre Allianz ► │ │  Marquee infinito
│   │  ◄ Yelum Akad SulAm Tokio HDI Suh►│ │  10 logos loop
│   └────────────────────────────────────┘ │
│                                          │
│   ★ SUSEP — Registro ativo desde 1995    │  badge-success
│                                          │
└──────────────────────────────────────────┘
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

### Desktop (>=1024)
```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   PROVA                                                              │
│   ─────                                                              │
│                                                                      │
│   ════════════════════════════════════════════════════════           │
│   Mais de 1.200 famílias atendidas.                                  │
│   Veja o que algumas delas têm a dizer.                              │
│   ════════════════════════════════════════════════════════           │
│                                                                      │
│   ┌──────────────────────────────┐  ┌──────────────────────────────┐│
│   │ "Vocês têm carta branca      │  │ "Obrigado por sua atenção    ││  Grid 2 col
│   │  para providenciar o melhor  │  │  de sempre nos seguros, nos  ││  card-quote
│   │  para mim e minha família,   │  │  investimentos e também no   ││
│   │  como sempre."               │  │  sinistro ocorrido."         ││
│   │  — Rodrigo                   │  │  — Marcos Roberto            ││
│   │    Cliente há anos da RFG    │  │    Cliente que indicou filha ││
│   └──────────────────────────────┘  └──────────────────────────────┘│
│                                                                      │
│   ── SEGURADORAS PARCEIRAS ──                                        │
│   ┌────────────────────────────────────────────────────────────────┐│
│   │ Porto • Bradesco • Mapfre • Allianz • Yelum • Akad • SulAm... ││  Marquee 30s
│   └────────────────────────────────────────────────────────────────┘│
│                                                                      │
│   ★ SUSEP — Registro ativo desde 1995                                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

### Elementos
| Elemento | Token |
|----------|-------|
| Eyebrow | `text-eyebrow` |
| H2 | `text-h2` Manrope 700 |
| Card depoimento | `card-quote` (`--bg-primary` em fundo `--bg-secondary` da seção, border-left-4 `--rfg-blue-light`, `--radius-md`, padding `--space-6`) |
| Citação | `text-body-lg` Inter 400 italic |
| Atribuição | `text-caption` Inter 600 (nome) + `text-small` Inter 400 (descrição) |
| Aspas decorativas | text-display Manrope 800 `--rfg-blue-light` opacity 0.3 (símbolo `"` grande no canto sup-esq do card) |
| Marquee container | full-bleed, `--bg-primary`, padding `--space-6` 0, mask-image fade nas bordas (`linear-gradient` transparent → opaque → transparent) |
| Logo parceiro | altura 40px (mobile) / 48px (desktop), grayscale com opacity 0.7, hover: full color opacity 1 |
| Badge SUSEP | `badge-success md` |

### Foto/Asset
- 10 logos de `assets/brand/parceiros/` em loop:
  - `porto-seguro.svg`, `bradesco-seguros.svg`, `mapfre.png`, `allianz.svg`, `yelum-seguros.svg`, `akad-seguros.svg`, `sulamerica.png`, `tokio-marine.svg`, `hdi-seguros.svg`, `suhai-seguradora.png`
- Conforme `parceiros-fontes.md`: NÃO recolorir, NÃO distorcer. Renderizar em fundo `--bg-primary` (branco) com respiro mínimo 16px.

### Efeitos
- Quote cards: fade-in stagger 200ms entre os 2
- **Padrão #8 — Marquee infinito** (CSS keyframes 30s linear infinite, 2 cópias dos 10 logos para loop sem corte). Respeita `prefers-reduced-motion: reduce` (vira grid estático 5x2).
- Mask-image fade nas bordas do marquee: visualmente os logos "entram" e "saem" suavemente

### Responsividade
- Mobile: 1 col stacked nos depoimentos. Marquee mantém-se infinito (mais lento — 40s para evitar parecer correndo).
- Desktop: 2 col depoimentos, marquee 30s.

### CTA
- Nenhum direto. SUSEP badge funciona como prova final.

---

## Seção 7: A História de Origem

### Mobile (320-768) — Bento sequencial vertical
```
┌──────────────────────────────────────────┐
│                                          │
│   NOSSA HISTÓRIA                         │  eyebrow
│   ──────────────                         │
│                                          │
│   ════════════════════════════════════   │
│   Por que a RFG existe — e por que       │  text-h2
│   isso importa para você                 │
│   ════════════════════════════════════   │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │                                    │ │
│   │   [IMG socios-02-estudio]          │ │  Foto sócios
│   │   Ricardo + Anderson               │ │  --radius-2xl
│   │                                    │ │  aspect 4/3
│   └────────────────────────────────────┘ │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  1995                              │ │  Bento bloco 1
│   │                                    │ │  card elevated
│   │  Em 1995, Ricardo Farias estava    │ │
│   │  no mercado de seguros e via a     │ │
│   │  mesma cena se repetir toda        │ │
│   │  semana...                         │ │
│   │                                    │ │
│   │  Anderson Guimarães vivia o mesmo  │ │
│   │  problema — só que do outro lado   │ │
│   │  do balcão, como gerente Mapfre... │ │
│   └────────────────────────────────────┘ │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  2013                              │ │  Bento bloco 2
│   │                                    │ │
│   │  Em 2013, Ricardo e Anderson       │ │
│   │  decidiram fazer diferente.        │ │
│   │                                    │ │
│   │  Fundaram a RFG não para ser       │ │
│   │  mais uma corretora. Mas para      │ │
│   │  ser o consultor que ninguém       │ │
│   │  antes tinha sido...               │ │
│   └────────────────────────────────────┘ │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  HOJE                              │ │  Bento bloco 3
│   │                                    │ │  --bg-secondary
│   │  Nos 13 anos seguintes, mais de    │ │
│   │  1.200 famílias passaram pela      │ │
│   │  RFG...                            │ │
│   │                                    │ │
│   │  35 anos de experiência combinada. │ │
│   │  Registro SUSEP ativo desde 1995.  │ │
│   └────────────────────────────────────┘ │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │ "Vocês têm carta branca para       │ │  card-quote final
│   │  providenciar o melhor..."         │ │
│   │  — Rodrigo                         │ │
│   └────────────────────────────────────┘ │
│                                          │
└──────────────────────────────────────────┘
```

### Desktop (>=1024) — Bento grid 4 áreas
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   NOSSA HISTÓRIA                                                     │
│   Por que a RFG existe — e por que isso importa para você            │
│                                                                      │
│   ┌──────────────────────────┐  ┌──────────────────────────┐         │
│   │                          │  │  1995                    │         │
│   │                          │  │                          │         │
│   │  [IMG socios-02-estudio] │  │  Em 1995, Ricardo Farias │         │
│   │                          │  │  estava no mercado de    │         │
│   │  Ricardo + Anderson      │  │  seguros e via a mesma   │         │
│   │  --radius-2xl            │  │  cena se repetir toda    │         │
│   │  --shadow-xl             │  │  semana. Anderson, do    │         │
│   │                          │  │  outro lado do balcão... │         │
│   │  (área 2 col tall)       │  │                          │         │
│   │                          │  └──────────────────────────┘         │
│   │                          │  ┌──────────────────────────┐         │
│   │                          │  │  2013                    │         │
│   │                          │  │  Fundaram a RFG não para │         │
│   │                          │  │  ser mais uma corretora. │         │
│   │                          │  │  Mas para ser o consultor│         │
│   │                          │  │  que ninguém antes tinha │         │
│   │                          │  │  sido.                   │         │
│   └──────────────────────────┘  └──────────────────────────┘         │
│                                                                      │
│   ┌─────────────────────────────────────────────────────────────────┐│
│   │  HOJE — 13 anos depois                                          ││  área full-width
│   │  +1.200 famílias atendidas. 35 anos de experiência combinada.   ││  --bg-secondary
│   │  Registro SUSEP ativo desde 1995. "Vocês têm carta branca..."   ││  card elevated
│   │  — Rodrigo                                                      ││
│   └─────────────────────────────────────────────────────────────────┘│
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elementos
| Elemento | Token |
|----------|-------|
| Eyebrow | `text-eyebrow` |
| H2 | `text-h2` Manrope 700 |
| Foto sócios | `socios-02-estudio.png`, `--radius-2xl`, `--shadow-xl`, aspect 4/3 mobile / 3/4 desktop (vertical) |
| Bento bloco | `card` ou `card-elevated`, `--radius-xl`, `--shadow-md` |
| Year label ("1995", "2013", "HOJE") | `text-h3` Manrope 700 `--rfg-blue-dark` (numeral grande) |
| Body bloco | `text-body-lg` Inter 400 `--lh-loose` |
| Quote final (Rodrigo) | `card-quote` integrado ao bloco "HOJE" |
| Grid desktop | `grid-cols-2` com áreas: foto (col-span-1 row-span-2), 1995 (col-span-1), 2013 (col-span-1), HOJE (col-span-2 full-width) |

### Foto/Asset
- **`assets/socios/socios-02-estudio.png`** — corpo inteiro, casual, fundo escuro (estúdio). Casa com tom narrativo/fraternal da seção.
- Alt-text: "Ricardo Farias e Anderson Guimarães, fundadores da RFG, em foto de estúdio — sócios desde 2013."

### Efeitos
- **Padrão #7 — Bento grid scrubbed timeline** (5 fases): foto fade-in → 1995 slide-from-left → 2013 slide-from-right → HOJE fade-up → quote highlight. ScrollTrigger com scrub: 1.
- Mobile: simplificado para card stagger sequencial (sem scrub — performance)

### Responsividade
- Mobile: stack vertical 1 col na ordem [foto, 1995, 2013, HOJE, quote]
- Tablet: 2 col com foto + texto lado a lado, blocos empilhados
- Desktop: bento grid 2 cols com foto tall na esquerda, blocos à direita, HOJE full-width embaixo

### CTA
- Nenhum direto (constrói credibilidade narrativa, prepara para Seção 8)

---

## Seção 8: Detalhamento do Produto (Como Funciona)

### Mobile (320-768)
```
┌──────────────────────────────────────────┐
│                                          │
│   COMO FUNCIONA                          │  eyebrow
│   ──────────────                         │
│                                          │
│   Não é uma proposta genérica.           │  text-lead
│   Não é um produto empurrado.            │
│   É um processo em três etapas —         │
│   feito para a sua realidade.            │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  01                                │ │  Step 1
│   │  {ICN lupa}                        │ │  card
│   │                                    │ │
│   │  O Diagnóstico de                  │ │  text-h3
│   │  Ângulo Morto Patrimonial          │ │
│   │                                    │ │
│   │  Você nos conta o que tem...       │ │  text-body
│   │                                    │ │
│   │  • Mapeamos tudo que construiu     │ │  Lista bullet
│   │  • Identificamos onde a proteção   │ │
│   │    está ausente                    │ │
│   │  • Traduzimos risco em números     │ │
│   └────────────────────────────────────┘ │
│         │                                │  Linha conectora
│         ▼                                │
│   ┌────────────────────────────────────┐ │
│   │  02                                │ │  Step 2
│   │  {ICN escudo-doc}                  │ │
│   │                                    │ │
│   │  O Plano Personalizado             │ │
│   │                                    │ │
│   │  Com o diagnóstico em mãos,        │ │
│   │  montamos seu plano completo...    │ │
│   │                                    │ │
│   │  • Selecionamos os produtos certos │ │
│   │  • Integramos vida + bens +        │ │
│   │    consórcio + previdência         │ │
│   │  • Você entende o que contrata     │ │
│   └────────────────────────────────────┘ │
│         │                                │
│         ▼                                │
│   ┌────────────────────────────────────┐ │
│   │  03                                │ │  Step 3
│   │  {ICN aperto-mão}                  │ │
│   │                                    │ │
│   │  Acompanhamento Contínuo           │ │
│   │                                    │ │
│   │  Aqui é onde a maioria dos         │ │
│   │  corretores some. Nós ficamos.     │ │
│   │                                    │ │
│   │  • Acesso direto aos fundadores    │ │
│   │  • Revisões periódicas             │ │
│   │  • Suporte real no sinistro        │ │
│   └────────────────────────────────────┘ │
│                                          │
└──────────────────────────────────────────┘
```

### Desktop (>=1024)
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   COMO FUNCIONA                                                      │
│   ──────────────                                                     │
│                                                                      │
│   Não é uma proposta genérica. É um processo em três etapas.         │  text-lead
│                                                                      │
│   ┌──────────────────┐ ──── ┌──────────────────┐ ──── ┌──────────────┐│
│   │  01              │      │  02              │      │  03          ││  3 col
│   │  {ICN lupa}      │      │  {ICN escudo}    │      │  {ICN mãos}  ││  com linha
│   │                  │      │                  │      │              ││  conectora
│   │  Diagnóstico de  │      │  Plano           │      │  Acompanhar  ││
│   │  Ângulo Morto    │      │  Personalizado   │      │  Contínuo    ││
│   │                  │      │                  │      │              ││
│   │  Você nos conta  │      │  Com o diag em   │      │  Aqui é onde ││
│   │  o que tem...    │      │  mãos, montamos. │      │  todos somem.││
│   │                  │      │                  │      │              ││
│   │  • Mapeamos      │      │  • Selecionamos  │      │  • Acesso    ││
│   │  • Identificamos │      │  • Integramos    │      │  • Revisões  ││
│   │  • Traduzimos    │      │  • Você entende  │      │  • Suporte   ││
│   └──────────────────┘      └──────────────────┘      └──────────────┘│
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elementos
| Elemento | Token |
|----------|-------|
| Eyebrow | `text-eyebrow` |
| Bridge text | `text-lead` Inter 400 |
| Numeral 01/02/03 | `text-display` Manrope 800 `--rfg-blue-light` opacity 0.4 (decorativo, posicionado absoluto no topo do card) |
| Ícone | Lucide 48px `--rfg-blue-mid` em círculo de fundo `--neutral-100` |
| H3 step | `text-h3` Manrope 600 |
| Body | `text-body` Inter 400 |
| Lista bullet | `text-body-sm` Inter 400, marker `--rfg-blue-mid` |
| Card step | `card` padding `--space-8`, `--radius-lg` |
| Linha conectora desktop | 2px solid `--neutral-200` horizontal, dashed |

### Foto/Asset
- Ícones Lucide: `Search` (lupa), `ShieldCheck` ou `FileCheck` (escudo+doc), `HandshakeIcon` ou `Users-round` (acompanhamento)
- Substituem emojis 🔍 🛡️ 🤝 do briefing por ícones lineares premium

### Efeitos
- **Padrão #2 — Card grid stagger** (3 steps, 200ms entre)
- Numerais grandes (01/02/03): fade-in com leve scale 0.9 → 1
- Bullets: fade-up sequencial 100ms entre cada bullet dentro do card
- (NÃO usar pin/scrub — decisão #7)

### Responsividade
- Mobile: stack vertical com linha conectora vertical (entre cards)
- Tablet: 2+1 ou stack
- Desktop: 3 col com linha horizontal conectora

### CTA
- Nenhum direto (Seção 9 a seguir é o pico de conversão)

---

## Seção 9: O Caminho — 3 Pacotes

### Mobile (320-768)
```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  --bg-secondary
┌──────────────────────────────────────────┐
│                                          │
│   O CAMINHO                              │  eyebrow
│   ──────────                             │
│                                          │
│   ════════════════════════════════════   │
│   O CAMINHO COMEÇA PELO DIAGNÓSTICO      │  text-h2
│   — GRATUITO E SEM COMPROMISSO           │
│   ════════════════════════════════════   │
│                                          │
│   Não trabalhamos com proposta de        │  text-lead
│   prateleira. O seu plano é montado      │
│   depois que a gente entende a sua       │
│   realidade.                             │
│                                          │
│   A maioria dos corretores chega com     │  text-body-lg
│   o produto pronto e só ajusta o nome    │
│   no contrato. A gente faz o contrário...│
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  {ICN escudo}                      │ │  Caminho 1
│   │  CAMINHO 1                         │ │  card default
│   │                                    │ │
│   │  Proteção Essencial                │ │  text-h3
│   │                                    │ │
│   │  Para quem está começando pelo     │ │
│   │  mais importante: evitar que a     │ │
│   │  família fique desamparada...      │ │
│   │                                    │ │
│   │  ✓ Diagnóstico completo            │ │  Lista checks
│   │  ✓ Seguro de Vida adequado         │ │
│   │  ✓ Cobertura de bem prioritário    │ │
│   │  ✓ Acesso direto a Ricardo+And.    │ │
│   │  🎁 Checklist Patrimônio Blindado  │ │
│   │                                    │ │
│   │  ┌─────────────────────────────┐   │ │
│   │  │ [Quero proteger família]    │   │ │  btn-primary-md
│   │  └─────────────────────────────┘   │ │  full-width
│   │  Diagnóstico gratuito antes de     │ │  microcopy
│   │  qualquer decisão.                 │ │
│   └────────────────────────────────────┘ │
│                                          │
│   ┌════════════════════════════════════┐ │
│   ║  ★ MAIS PROCURADO                  ║ │  Caminho 2 — featured
│   ║  {ICN estrela}                     ║ │  card-featured
│   ║                                    ║ │  border-2 rfg-mid
│   ║  CAMINHO 2                         ║ │  --shadow-xl
│   ║                                    ║ │
│   ║  Proteção Completa                 ║ │
│   ║                                    ║ │
│   ║  Para quem quer resolver de uma    ║ │
│   ║  vez: família protegida, patrim.   ║ │
│   ║  coberto e sonhos em andamento...  ║ │
│   ║                                    ║ │
│   ║  ✓ Diagnóstico completo            ║ │
│   ║  ✓ Seguro de Vida (provedor)       ║ │
│   ║  ✓ Cobertura completa de bens      ║ │
│   ║  ✓ Resp. Civil Profissional        ║ │
│   ║  ✓ Sessão Consórcio s/ juros       ║ │
│   ║  ✓ Acesso prioritário              ║ │
│   ║  🎁 Guia Previdência               ║ │
│   ║  🎁 Checklist Patrimônio Blindado  ║ │
│   ║                                    ║ │
│   ║  ┌─────────────────────────────┐   ║ │
│   ║  │ [Quero o plano completo]    │   ║ │  btn-primary-md
│   ║  └─────────────────────────────┘   ║ │  full-width destaque
│   ║  Diagnóstico gratuito antes...     ║ │
│   └════════════════════════════════════┘ │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  {ICN coroa}                       │ │  Caminho 3
│   │  CAMINHO 3                         │ │  card default
│   │                                    │ │
│   │  Legado Familiar                   │ │
│   │                                    │ │
│   │  Para quem pensa no longo prazo:   │ │
│   │  proteção hoje, patrimônio para    │ │
│   │  os filhos amanhã.                 │ │
│   │                                    │ │
│   │  ✓ Tudo do Caminho 2               │ │
│   │  ✓ Estruturação Previdência        │ │
│   │  ✓ Planejamento sucessão           │ │
│   │  ✓ Sessão consórcio imóvel filhos  │ │
│   │  ✓ Revisão anual do plano          │ │
│   │  🎁 Guia Previdência               │ │
│   │  🎁 Checklist Patrimônio           │ │
│   │  🎁 Sessão Consórcio               │ │
│   │                                    │ │
│   │  ┌─────────────────────────────┐   │ │
│   │  │ [Quero construir um legado] │   │ │
│   │  └─────────────────────────────┘   │ │
│   │  Diagnóstico gratuito antes...     │ │
│   └────────────────────────────────────┘ │
│                                          │
│   ─────────────────                      │
│   COMO O INVESTIMENTO É DEFINIDO         │  text-h4
│                                          │
│   Cada plano é montado com base em       │  text-body-lg
│   três variáveis... O investimento real  │
│   só aparece depois do diagnóstico.      │
│   Não tem letra miúda.                   │
│                                          │
│   ─────────────────                      │
│   Não sabe ainda em qual caminho         │  text-h3
│   você se encaixa?                       │
│                                          │
│   Em 30 a 45 minutos, Ricardo ou         │
│   Anderson olham para sua situação.      │
│                                          │
│   ⚠ As vagas de diagnóstico são          │  badge-warning
│     limitadas por mês.                   │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │ [Fazer meu diagnóstico gratuito]   │ │  btn-primary-lg
│   │ → falar no WhatsApp                │ │  full-width
│   └────────────────────────────────────┘ │
│                                          │
│   Sem custo. Sem compromisso.            │  text-caption
│   Sem proposta empurrada no final.       │
│                                          │
│   ★ SUSEP — Registro ativo desde 1995    │
│                                          │
└──────────────────────────────────────────┘
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

### Desktop (>=1024)
```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   O CAMINHO                                                          │
│                                                                      │
│   ════════════════════════════════════════════════════════           │
│   O CAMINHO COMEÇA PELO DIAGNÓSTICO — GRATUITO E SEM COMP.           │
│   ════════════════════════════════════════════════════════           │
│                                                                      │
│   Não trabalhamos com proposta de prateleira... [bridge]             │
│                                                                      │
│   ┌──────────────┐  ┌════════════════┐  ┌──────────────┐             │
│   │ {ICN escudo} │  │ ★ MAIS PROCUR. │  │ {ICN coroa}  │             │
│   │              │  │ {ICN estrela}  │  │              │             │
│   │ CAMINHO 1    │  │ CAMINHO 2      │  │ CAMINHO 3    │             │  3 col
│   │ Proteção     │  │ Proteção       │  │ Legado       │             │  Caminho 2
│   │ Essencial    │  │ Completa       │  │ Familiar     │             │  destacado
│   │              │  │                │  │              │             │  (scale 1.05)
│   │ Para quem    │  │ Para quem quer │  │ Para quem    │             │
│   │ está começ.. │  │ resolver de... │  │ pensa no...  │             │
│   │              │  │                │  │              │             │
│   │ ✓ Diagnóstico│  │ ✓ Diagnóstico  │  │ ✓ Tudo do C2 │             │
│   │ ✓ Seguro Vida│  │ ✓ Seguro Vida  │  │ ✓ Previdência│             │
│   │ ✓ Cobertura  │  │ ✓ Cob. completa│  │ ✓ Sucessão   │             │
│   │ ✓ Acesso     │  │ ✓ Resp. Civil  │  │ ✓ Consórcio  │             │
│   │ 🎁 Checklist │  │ ✓ Consórcio    │  │ ✓ Revisão    │             │
│   │              │  │ ✓ Acesso prior.│  │ 🎁 3 bônus   │             │
│   │              │  │ 🎁 2 bônus     │  │              │             │
│   │              │  │                │  │              │             │
│   │ [Quero       │  │ [Quero plano   │  │ [Quero       │             │
│   │  proteger]   │  │  completo]     │  │  legado]     │             │
│   │ microcopy    │  │ microcopy      │  │ microcopy    │             │
│   └──────────────┘  └════════════════┘  └──────────────┘             │
│                                                                      │
│   ──────────────  COMO O INVESTIMENTO É DEFINIDO  ──────────────     │
│   Cada plano é montado com base em três variáveis...                 │
│                                                                      │
│   Não sabe ainda em qual caminho você se encaixa?                    │  text-h3 centered
│                                                                      │
│   ⚠ As vagas de diagnóstico são limitadas por mês.                   │
│   ┌────────────────────────────────────────────┐                     │
│   │ [Fazer meu diagnóstico gratuito → WhatsApp]│                     │  btn-primary-lg
│   └────────────────────────────────────────────┘                     │  centered
│   Sem custo. Sem compromisso. Sem proposta empurrada.                │
│   ★ SUSEP — Registro ativo desde 1995                                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

### Elementos
| Elemento | Token |
|----------|-------|
| Eyebrow | `text-eyebrow` |
| H2 | `text-h2` Manrope 700 (UPPERCASE no h2 da Seção 9 — único caso, ancorando "O CAMINHO") |
| Subheadline | `text-lead` Inter 400 |
| Bridge text | `text-body-lg` Inter 400 |
| Card Caminho 1 + 3 | `card` (default) |
| Card Caminho 2 | `card-featured` (border-2 `--rfg-blue-mid`, `--radius-xl`, `--shadow-xl`, faixa gradiente top 4px) |
| Badge "MAIS PROCURADO" | `badge-brand md` posicionado top: -12px do card 2 |
| Eyebrow card ("CAMINHO 1") | `text-eyebrow` `--rfg-blue-dark` |
| Title pacote | `text-h3` Manrope 600 |
| Para-quem | `text-body` Inter 500 italic `--text-secondary` |
| Lista benefícios | `text-body-sm` Inter 400, ícone `Check` Lucide 16px `--rfg-blue-mid` antes |
| Bônus 🎁 | mantém emoji (humaniza); `text-body-sm` |
| CTA card | `btn-primary-md` full-width |
| Microcopy CTA | `text-caption` `--text-tertiary` |
| Block "Como Investimento" | container-narrow, divider `--border-default` antes/depois |
| Badge vagas limitadas | `badge-warning md` "Vagas limitadas este mês" |
| CTA único final | `btn-primary-lg` full-width mobile / centered fit-content desktop |
| Selo SUSEP | `badge-success md` |

### Foto/Asset
- Ícones Lucide: `Shield` (Caminho 1), `Star` ou `Crown-jewels` (Caminho 2 — destaque), `Crown` (Caminho 3 — legado)
- Sem fotos nesta seção (foco em comparação)

### Efeitos
- **Padrão #2 — Card grid stagger** (3 cards, 200ms entre, com Caminho 2 chegando POR ÚLTIMO em scale 0.95 → 1.05 para enfatizar destaque)
- Hover Caminho 2: scale 1.06 + shadow-2xl
- CTA único final: pulse sutil shadow a cada 4s (atrai atenção sem irritar)
- Badge "MAIS PROCURADO": fade-in 400ms após card 2 montar

### Responsividade
- Mobile: stack 1 col vertical na ordem [C1, C2, C3]. Caminho 2 mantém destaque visual via shadow-xl + border-2.
- Tablet: 1 col ou 2+1 (C1 e C3 lado-a-lado, C2 full-width destacado embaixo — alternativa)
- Desktop: 3 col com C2 com leve scale 1.05 e shadow maior

### CTA — 4 botões nesta seção
1. `Quero proteger minha família` (Caminho 1) → `https://wa.me/5582982359028?text=Olá!%20Tenho%20interesse%20no%20Caminho%201:%20Proteção%20Essencial.`
2. `Quero o plano completo` (Caminho 2) → `https://wa.me/5582982359028?text=Olá!%20Tenho%20interesse%20no%20Caminho%202:%20Proteção%20Completa.`
3. `Quero construir um legado` (Caminho 3) → `https://wa.me/5582982359028?text=Olá!%20Tenho%20interesse%20no%20Caminho%203:%20Legado%20Familiar.`
4. `Fazer meu diagnóstico gratuito` (CTA único final) → `https://wa.me/5582982359028?text=Olá!%20Quero%20meu%20diagnóstico%20gratuito.`

---

## Seção 10: Nosso Compromisso

### Mobile (320-768)
```
┌──────────────────────────────────────────┐
│                                          │
│   NOSSO COMPROMISSO                      │  eyebrow
│   ──────────────────                     │
│                                          │
│   ════════════════════════════════════   │
│   Você não arrisca nada. O risco é       │  text-h2
│   todo nosso.                            │
│   ════════════════════════════════════   │
│                                          │
│   {ICN escudo grande}                    │  ícone central 64px
│                                          │  --rfg-blue-dark
│                                          │
│   Sabemos que você já foi enganado       │  text-body-lg
│   antes.                                 │
│                                          │
│   Corretor que sumiu. Produto que não    │
│   era o que prometeram. Proposta         │
│   genérica que não servia para a sua     │
│   vida.                                  │
│                                          │
│   Por isso, somos diretos:               │
│                                          │
│   Se você fizer o **Diagnóstico de       │  Frase-âncora
│   Ângulo Morto Patrimonial** com a       │  Inter 600
│   RFG e sentir que não valeu o           │
│   tempo — nos diga.                      │
│                                          │
│   **Você só avança se fizer sentido      │  Frase-âncora
│   para você.**                           │
│                                          │
│   Trabalhamos com mais de 1.200          │
│   famílias em 13 anos.                   │
│   Temos registro SUSEP ativo desde       │
│   1995.                                  │
│                                          │
│   **Transparência total antes,           │  Frase-âncora
│   durante e depois.**                    │
│                                          │
│   Se não fizer sentido para você, não    │
│   tem negócio. Simples assim.            │
│                                          │
│   ★ SUSEP 1995    ★ 1.200+ famílias      │  Tríade
│                                          │
└──────────────────────────────────────────┘
```

### Desktop (>=1024)
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   NOSSO COMPROMISSO                                                  │
│                                                                      │
│            ╔═══════════════════════════════════════╗                 │
│            ║  {ICN escudo 80px}                    ║                 │  Card-quote
│            ║                                       ║                 │  ampliado
│            ║  Você não arrisca nada.               ║                 │  centered
│            ║  O risco é todo nosso.                ║                 │  max 720px
│            ║                                       ║                 │
│            ║  Sabemos que você já foi enganado     ║                 │
│            ║  antes...                             ║                 │
│            ║                                       ║                 │
│            ║  Você só avança se fizer sentido      ║                 │
│            ║  para você.                           ║                 │
│            ║                                       ║                 │
│            ║  ★ SUSEP 1995  ★ 1.200+ famílias      ║                 │
│            ╚═══════════════════════════════════════╝                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elementos
| Elemento | Token |
|----------|-------|
| Eyebrow | `text-eyebrow` |
| H2 | `text-h2` Manrope 700 |
| Ícone escudo | Lucide `ShieldCheck` 64px (mobile) / 80px (desktop), `--rfg-blue-dark`, stroke 1.5 |
| Body | `text-body-lg` Inter 400 `--lh-loose` |
| Frases-âncora | Inter 600 `--text-primary` (não negrito-bold; semi-bold premium) |
| Card desktop | `card-elevated` ou variação `card-quote` ampliado, `--bg-secondary` interno |
| Tríade | 2x `badge-outline sm` |
| Container | `container-narrow` |

### Foto/Asset
- Sem foto. Ícone escudo grande como elemento visual central.
- (Conforme briefing: "Selo visual: escudo ou aperto de mão")

### Efeitos
- Ícone: scale-in 600ms + leve rotation 0deg → 5deg → 0deg (sutil, ease-spring)
- Body: fade-up sequencial por parágrafo
- Frases-âncora: ao entrar viewport, leve highlight color shift de `--text-secondary` → `--text-primary` em 400ms

### Responsividade
- Mobile: layout linear, ícone no topo, body em baixo
- Desktop: tudo dentro de card centralizado max-width 720px

### CTA
- Nenhum direto (o CTA principal vem na Seção 12 após objeções)

---

## Seção 11: Visão de Futuro

### Mobile (320-768)
```
┌──────────────────────────────────────────┐
│                                          │
│   VISÃO DE FUTURO                        │  eyebrow
│   ──────────────                         │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  ☀                                 │ │  Bloco positivo
│   │                                    │ │  card --bg-primary
│   │  Imagine daqui a dois anos.        │ │  text-h3
│   │                                    │ │
│   │  Você acorda. Toma seu café. E     │ │  text-body-lg
│   │  não sente aquele peso.            │ │
│   │                                    │ │
│   │  Sabe aquela sensação de fundo —   │ │
│   │  aquela que você prefere não       │ │
│   │  nomear — de que está construindo  │ │
│   │  tudo sozinho, sem rede? Ela foi   │ │
│   │  embora.                           │ │
│   │                                    │ │
│   │  Sua família está protegida. O     │ │
│   │  apartamento está coberto...       │ │
│   │                                    │ │
│   │  **Fez os dois ao mesmo tempo.**   │ │  Frase-âncora
│   └────────────────────────────────────┘ │
│                                          │
│   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  --bg-secondary
│   ┌────────────────────────────────────┐ │
│   │  ⚠                                 │ │  Bloco negativo
│   │                                    │ │  card --bg-secondary
│   │  Agora o outro lado.               │ │  text-h3
│   │                                    │ │
│   │  Se você não agir, nada muda.      │ │  text-body-lg
│   │                                    │ │
│   │  Daqui a dois anos, você ainda     │ │
│   │  vai estar adiando...              │ │
│   │                                    │ │
│   │  **O problema com o imprevisto     │ │  Frase-âncora
│   │  é que ele não avisa.**            │ │
│   │                                    │ │
│   │  Quando o acidente acontece...     │ │
│   │                                    │ │
│   │  **Não deixa o acaso decidir o     │ │  Frase-âncora final
│   │  que acontece com isso.**          │ │
│   └────────────────────────────────────┘ │
│   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                          │
└──────────────────────────────────────────┘
```

### Desktop (>=1024)
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   VISÃO DE FUTURO                                                    │
│                                                                      │
│   ┌──────────────────────────────┐  ┌──────────────────────────────┐│
│   │  ☀ Caminho da ação           │  │  ⚠ Caminho da inação         ││  2 col
│   │                              │  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░  ││  contraste visual
│   │  Imagine daqui a dois anos.  │  │  Agora o outro lado.         ││
│   │                              │  │                              ││
│   │  Você acorda. Toma seu café. │  │  Se você não agir, nada      ││
│   │  E não sente aquele peso...  │  │  muda. Daqui a dois anos...  ││
│   │                              │  │                              ││
│   │  Sua família está protegida. │  │  O problema com o imprevisto ││
│   │  O apartamento está coberto. │  │  é que ele não avisa.        ││
│   │  O consórcio está rodando... │  │                              ││
│   │                              │  │  Quando o acidente acontece, ││
│   │  Fez os dois ao mesmo tempo. │  │  já é tarde demais...        ││
│   │                              │  │                              ││
│   │  Você chega em casa com      │  │  Não deixa o acaso decidir   ││
│   │  menos peso nas costas.      │  │  o que acontece com isso.    ││
│   │                              │  │                              ││
│   │  --bg-primary                │  │  --bg-secondary              ││
│   └──────────────────────────────┘  └──────────────────────────────┘│
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elementos
| Elemento | Token |
|----------|-------|
| Eyebrow | `text-eyebrow` |
| Card positivo | `card`, `--bg-primary`, border-left-4 `--success-500` opacity 0.4 |
| Card negativo | `card`, `--bg-secondary`, border-left-4 `--warning-500` opacity 0.4 |
| Ícone topo | Lucide `Sun` (positivo) / `AlertTriangle` (negativo), 32px |
| H3 sub-headline | `text-h3` Manrope 600 |
| Body | `text-body-lg` Inter 400 `--lh-loose` |
| Frases-âncora | Inter 600 `--text-primary` |
| Container | `container-wide` desktop / single col mobile |

### Foto/Asset
- Sem foto. Apenas ícones contrastantes (sol vs alerta) reforçam dualidade.

### Efeitos
- Bloco positivo: fade-in da esquerda (translateX -30px → 0)
- Bloco negativo: fade-in da direita (translateX 30px → 0)
- Frases-âncora: highlight color shift ao entrar viewport
- Ícones: scale 0 → 1 com ease-spring

### Responsividade
- Mobile: stack vertical (positivo em cima, negativo embaixo) para preservar ordem narrativa
- Desktop: 2 col side-by-side, contraste visual

### CTA
- Nenhum direto (preparação emocional para Seção 12)

---

## Seção 12: Últimas Dúvidas (Objeções)

### Mobile (320-768)
```
┌──────────────────────────────────────────┐
│                                          │
│   ÚLTIMAS DÚVIDAS                        │  eyebrow
│   ──────────────                         │
│                                          │
│   ════════════════════════════════════   │
│   Ainda tem alguma dúvida?               │  text-h2
│   Faz sentido. Veja as mais comuns.      │
│   ════════════════════════════════════   │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │ {ICN $}                            │ │  Acordeão item 1
│   │                                    │ │  card collapsed
│   │ "Seguro é caro demais para o que   │ │  text-h4
│   │  eu ganho agora."          ▼       │ │
│   └────────────────────────────────────┘ │
│   ┌────────────────────────────────────┐ │
│   │ {ICN ⏳}                            │ │  Item 2
│   │ "Ainda sou novo. Posso deixar      │ │
│   │  para depois."             ▼       │ │
│   └────────────────────────────────────┘ │
│   ┌────────────────────────────────────┐ │
│   │ {ICN handshake}                    │ │  Item 3 expanded
│   │ "Já fui enganado por corretor.     │ │
│   │  Por que vocês são diferentes?" ▲  │ │
│   │ ─────────────────────────────────  │ │
│   │                                    │ │  body expandido
│   │ Sua desconfiança é completamente   │ │
│   │ legítima.                          │ │
│   │                                    │ │
│   │ 90% dos corretores focam em        │ │
│   │ seguro de carro... Você fala       │ │
│   │ direto com Ricardo e Anderson.     │ │
│   └────────────────────────────────────┘ │
│   ┌────────────────────────────────────┐ │
│   │ {ICN doc}                          │ │  Item 4
│   │ "Não entendo nada disso. Tenho     │ │
│   │  medo de fazer errado." ▼          │ │
│   └────────────────────────────────────┘ │
│   ┌────────────────────────────────────┐ │
│   │ {ICN calendar}                     │ │  Item 5
│   │ "Agora não é o momento. Tenho      │ │
│   │  outras prioridades." ▼            │ │
│   └────────────────────────────────────┘ │
│                                          │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │  [IMG socios-01-perfil-rfg]        │ │  Foto pequena
│   │  Ricardo + Anderson                │ │  sócios próxima
│   └────────────────────────────────────┘ │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │ [Fazer meu diagnóstico agora]      │ │  btn-primary-lg
│   │ → falar no WhatsApp                │ │  full-width
│   └────────────────────────────────────┘ │
│                                          │
└──────────────────────────────────────────┘
```

### Desktop (>=1024)
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   ÚLTIMAS DÚVIDAS                                                    │
│                                                                      │
│   ════════════════════════════════════════════════════════           │
│   Ainda tem alguma dúvida? Faz sentido. Veja as mais comuns.         │
│   ════════════════════════════════════════════════════════           │
│                                                                      │
│   ┌────────────────────────────────┐  ┌────────────────────────────┐│
│   │ Acordeão (5 itens):            │  │  [IMG socios-01]           ││  2 col
│   │                                │  │  Ricardo + Anderson        ││  desktop:
│   │ {$}  "Seguro é caro..."   ▼    │  │  --radius-2xl              ││  acordeão (8/12)
│   │ {⏳} "Posso deixar..."     ▼    │  │  Foto pequena              ││  + foto (4/12)
│   │ {🤝} "Já fui enganado..."  ▲    │  │  ancorando confiança       ││
│   │      [body expanded]           │  │                            ││
│   │      Sua desconfiança é...     │  │                            ││
│   │ {📋} "Não entendo nada..." ▼   │  │                            ││
│   │ {📅} "Não é o momento..."  ▼   │  │                            ││
│   │                                │  │                            ││
│   └────────────────────────────────┘  └────────────────────────────┘│
│                                                                      │
│   ┌────────────────────────────────────────────────┐                 │
│   │ [Fazer meu diagnóstico agora → WhatsApp]       │                 │  btn-primary-lg
│   └────────────────────────────────────────────────┘                 │  centered
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elementos
| Elemento | Token |
|----------|-------|
| Eyebrow | `text-eyebrow` |
| H2 | `text-h2` Manrope 700 |
| Acordeão item | `card-hover` collapsed; `card` quando expanded; `--radius-md` |
| Pergunta header | `text-h4` Manrope 600 (truncate em 1-2 linhas mobile) |
| Ícone categoria | Lucide 24px (substituindo emojis): `DollarSign`, `Hourglass`, `Handshake`, `FileQuestion`, `CalendarDays` |
| Chevron toggle | Lucide `ChevronDown` 20px com rotação 180deg ao expandir |
| Body resposta | `text-body` Inter 400, `--text-secondary`, padding-top `--space-4` |
| Frase-âncora destacada | Inter 600 `--text-primary` |
| Foto sócios | `socios-01-perfil-rfg.png` ou crop quadrado, `--radius-2xl`, `--shadow-md` |
| CTA final | `btn-primary-lg` |

### Foto/Asset
- **`assets/socios/socios-01-perfil-rfg.png`** (cropped 1:1) — reforço de confiança visual antes do CTA. Conforme briefing: "Foto dos fundadores próxima: rostos reais aumentam confiança".

### Efeitos
- Acordeão: items fade-up stagger 100ms ao entrar viewport
- Toggle: altura animada 250ms ease-in-out (transition: max-height); chevron rotate 180deg
- Single-open mode (apenas 1 expanded por vez)
- CTA final: pulse shadow sutil

### Responsividade
- Mobile: stack vertical [acordeão, foto, CTA]
- Desktop: 2 col [acordeão 8/12, foto 4/12]; CTA full-width centered embaixo

### CTA
- **Texto:** `Fazer meu diagnóstico agora`
- **Destino:** `https://wa.me/5582982359028?text=Olá!%20Resolvi%20minhas%20dúvidas%20—%20quero%20conversar.`

---

## Seção 13: Perguntas Frequentes (FAQ)

### Mobile (320-768)
```
┌──────────────────────────────────────────┐
│                                          │
│   FAQ                                    │  eyebrow
│   ──                                     │
│                                          │
│   ════════════════════════════════════   │
│   PERGUNTAS FREQUENTES                   │  text-h2
│   ════════════════════════════════════   │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │ 1. Preciso ter muito dinheiro      │ │  Acordeão FAQ
│   │    para contratar?            ▼    │ │  card collapsed
│   └────────────────────────────────────┘ │
│   ┌────────────────────────────────────┐ │
│   │ 2. Vocês vendem só seguro de       │ │
│   │    carro?                     ▼    │ │
│   └────────────────────────────────────┘ │
│   ┌────────────────────────────────────┐ │
│   │ 3. Como funciona o primeiro        │ │  expanded
│   │    passo?                     ▲    │ │
│   │ ─────────────────────────────────  │ │
│   │ Você clica no botão, cai no nosso  │ │
│   │ WhatsApp e fala diretamente com    │ │
│   │ Ricardo ou Anderson...             │ │
│   └────────────────────────────────────┘ │
│   ┌────────────────────────────────────┐ │
│   │ 4. Consórcio demora muito?     ▼   │ │
│   └────────────────────────────────────┘ │
│   ┌────────────────────────────────────┐ │
│   │ 5. Já tenho seguro contratado.     │ │
│   │    Faz sentido o diag?         ▼   │ │
│   └────────────────────────────────────┘ │
│   ┌────────────────────────────────────┐ │
│   │ 6. Vocês somem após assinar?   ▼   │ │
│   └────────────────────────────────────┘ │
│   ┌────────────────────────────────────┐ │
│   │ 7. A RFG é regularizada?       ▼   │ │
│   └────────────────────────────────────┘ │
│   ┌────────────────────────────────────┐ │
│   │ 8. Previdência só vale para        │ │
│   │    quem ganha muito?           ▼   │ │
│   └────────────────────────────────────┘ │
│   ┌────────────────────────────────────┐ │
│   │ 9. Quanto tempo leva?          ▼   │ │
│   └────────────────────────────────────┘ │
│   ┌────────────────────────────────────┐ │
│   │ 10. Por que confiar na RFG?    ▼   │ │
│   └────────────────────────────────────┘ │
│                                          │
│   ─────────────────                      │
│   Ainda tem dúvida?                      │  text-h3
│   Fala direto com a gente.               │
│                                          │
│   ┌────────────────────────────────────┐ │
│   │ (Falar no WhatsApp)                │ │  btn-secondary-md
│   └────────────────────────────────────┘ │
│                                          │
└──────────────────────────────────────────┘
```

### Desktop (>=1024)
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   PERGUNTAS FREQUENTES                                               │
│                                                                      │
│            ┌──────────────────────────────────────────┐              │  container-narrow
│            │ 1. Preciso ter muito dinheiro?     ▼     │              │  centered
│            ├──────────────────────────────────────────┤              │  10 itens
│            │ 2. Vocês vendem só carro?          ▼     │              │
│            ├──────────────────────────────────────────┤              │
│            │ 3. Como funciona o primeiro?       ▲     │              │
│            │    Você clica no botão, cai no...        │              │
│            ├──────────────────────────────────────────┤              │
│            │ 4. Consórcio demora?               ▼     │              │
│            │ ...                                      │              │
│            └──────────────────────────────────────────┘              │
│                                                                      │
│            Ainda tem dúvida? Fala direto com a gente.                │
│            ┌─────────────────────────────────┐                       │
│            │ (Falar no WhatsApp)             │                       │  btn-secondary
│            └─────────────────────────────────┘                       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elementos
| Elemento | Token |
|----------|-------|
| Eyebrow | `text-eyebrow` |
| H2 | `text-h2` Manrope 700 |
| Acordeão item | `card-hover`, `--radius-md`, divider entre items `--border-subtle` |
| Numeração | `text-h4` Manrope 600 `--rfg-blue-dark` |
| Pergunta | `text-h4` Manrope 600 `--text-primary` |
| Resposta | `text-body` Inter 400 `--text-secondary` |
| Chevron | Lucide `ChevronDown` 20px |
| Container | `container-narrow` |
| CTA final | `btn-secondary-md` (ghost/secundário — não compete com CTAs primários) |

### Foto/Asset
- Nenhuma. Foco em texto + funcionalidade.

### Efeitos
- Items fade-up stagger 80ms (mais rápido que outros — são 10 items)
- Toggle: altura animada 250ms; chevron rotate
- Single-open mode

### Responsividade
- Mobile: full-width
- Desktop: container-narrow centralizado (max 760px) — leitura confortável

### CTA
- **Texto:** `Falar no WhatsApp`
- **Destino:** `https://wa.me/5582982359028?text=Olá!%20Ainda%20tenho%20uma%20dúvida%20pra%20resolver.`

---

## Footer

### Mobile (320-768)
```
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  --bg-inverse (neutral-900)
┌──────────────────────────────────────────┐
│                                          │
│  [LOGO RFG branco]                       │
│                                          │
│  Corretora de Seguros                    │  text-body --text-inverse
│  ─────────────────                       │
│                                          │
│  CONTATO                                 │  eyebrow inverse
│  ──────                                  │
│  📞 (82) 98235-9028                      │
│  ✉ contato@rfgcorretora.com.br          │
│  📍 Maceió - AL                          │
│                                          │
│  ──────────────────────                  │
│                                          │
│  SOBRE A RFG                             │
│  ──────────                              │
│  CNPJ: XX.XXX.XXX/0001-XX                │  preencher
│  ★ SUSEP — Registro ativo desde 1995     │
│                                          │
│  ──────────────────────                  │
│                                          │
│  NAVEGAÇÃO                               │
│  ──────────                              │
│  · Sobre nós                             │
│  · Como funciona                         │
│  · Os 3 caminhos                         │
│  · FAQ                                   │
│  · Política de Privacidade               │
│  · Termos de Uso                         │
│                                          │
│  ──────────────────────                  │
│                                          │
│  REDES                                   │
│  ─────                                   │
│  [IG] [LinkedIn] [WhatsApp]              │  ícones 24px
│                                          │
│  ──────────────────────                  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  [MAPA Google embed - Maceió]      │  │  iframe lazy
│  │  height 200px                      │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ──────────────────────                  │
│                                          │
│  © 2026 RFG Corretora de Seguros.        │  text-small
│  Todos os direitos reservados.           │
│                                          │
│  Em conformidade com a LGPD              │
│  (Lei 13.709/2018).                      │
│                                          │
└──────────────────────────────────────────┘
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

### Desktop (>=1024)
```
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [LOGO RFG branco]                                                   │
│                                                                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────────┐ │  4 colunas
│  │ CONTATO     │ │ SOBRE       │ │ NAVEGAÇÃO   │ │ MAPA           │ │
│  │             │ │             │ │             │ │                │ │
│  │ 📞 (82)     │ │ CNPJ: XX... │ │ · Sobre     │ │ [Google Maps   │ │
│  │   98235-9028│ │             │ │ · Como      │ │  embed]        │ │
│  │             │ │ ★ SUSEP     │ │ · Caminhos  │ │                │ │
│  │ ✉ contato@  │ │   1995      │ │ · FAQ       │ │  height 220px  │ │
│  │   rfgcorr.. │ │             │ │ · Privacid. │ │                │ │
│  │             │ │ Anderson    │ │ · Termos    │ │                │ │
│  │ 📍 Maceió   │ │ Guimarães   │ │             │ │                │ │
│  │   AL        │ │ Ricardo F.  │ │             │ │                │ │
│  │             │ │             │ │             │ │                │ │
│  │ [IG][LI][WA]│ │             │ │             │ │                │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └────────────────┘ │
│                                                                      │
│  ──────────────────────────────────────────────                      │
│  © 2026 RFG Corretora de Seguros. LGPD compliant.                    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

### Elementos
| Elemento | Token |
|----------|-------|
| Background | `--bg-inverse` (`--neutral-900`) |
| Logo | versão branca/clear do logo RFG, 40px h |
| Eyebrow coluna | `text-eyebrow` Manrope 600 `--rfg-blue-light` |
| Body | `text-body-sm` Inter 400 `--neutral-300` |
| Links | `text-body-sm` Inter 400 `--neutral-200`, hover: `--rfg-blue-light` |
| Ícones redes | Lucide 24px (`Instagram`, `Linkedin`, `MessageCircle`), `--neutral-300`, hover `--rfg-blue-light` |
| Mapa Google | `<iframe>` lazy-loaded, `--radius-lg`, `--shadow-md`, height 200-220px |
| Copyright | `text-small` Inter 500 `--neutral-400` |
| Border separador (mobile) | `--neutral-700` 1px |
| Container | `container-wide` |
| Padding | `py-12 px-4` mobile / `py-16 px-8` desktop |

### Foto/Asset
- **Logo branco/clear:** `assets/brand/logo-rfg-white.svg` (a gerar — versão clear da logo principal pra fundo dark)
- **Mapa Google:** iframe embed Maceió-AL com endereço real RFG (a confirmar com Anderson)
- **Ícones redes:** Lucide

### Efeitos
- Sem efeitos de entrada (já visível ao chegar)
- Hover links: color shift 150ms
- Mapa: lazy-load via Intersection Observer (carrega só quando footer entra viewport — performance)

### Responsividade
- Mobile: stack 1 col com dividers
- Tablet: 2 col
- Desktop: 4 col com mapa na última

### CTA
- **Texto:** `Falar no WhatsApp` (ícone-only mobile)
- **Destino:** `https://wa.me/5582982359028?text=Olá!%20Vim%20pelo%20site%20da%20RFG.`

---

## 6. Resumo de Performance e A11y

### Performance (meta Lighthouse 95+)
- Imagens: `.webp` com fallback `.png`, `loading="lazy"`, `decoding="async"`, srcset responsivo (`@1x @2x @3x`)
- GSAP + ScrollTrigger: dynamic import na rota marketing apenas
- Marquee CSS: GPU-friendly (transform: translateX, will-change: transform)
- Mapa Google: lazy iframe (footer)
- Fontes: Manrope + Inter via `font-display: swap`, preconnect, self-hosted recomendado
- Bento grid (Seção 7): scrub apenas em desktop; mobile usa stagger simples
- Sem Framer Motion (decisão `effects-reference.md`)

### A11y (WCAG AA mínimo)
- Contraste: validado em `design-system.md` §2.7 (todos AA ou AAA)
- Alt-text obrigatório em todas as fotos (sócios, parceiros, mapa)
- `prefers-reduced-motion: reduce` desativa todos os efeitos (`design-system.md` §8)
- Touch targets: `btn-md` 44px (atende WCAG mobile)
- Focus states: `--shadow-focus` em todos os interativos
- Acordeões: ARIA correto (`aria-expanded`, `aria-controls`)
- Skip-to-content link no topo (sr-only, visível ao Tab)
- Inputs (futuros): label associada, helper/error text com `aria-describedby`

### Mobile-first checks
- Hero text legível em 320px (Galaxy Fold)
- CTAs full-width com touch target 56px (lg)
- Sticky nav não cobre conteúdo crítico
- Marquee respeita reduced-motion

---

## 7. Checklist de Handoff (próximas etapas)

- [ ] Validar wireframes com Anderson e Ricardo (decisão #1 em especial — qual foto no Hero)
- [ ] Confirmar CNPJ e endereço completo da RFG para footer
- [ ] Confirmar email de contato oficial
- [ ] Decidir se há vídeo institucional na Seção 8 (substitui ou complementa cards)
- [ ] Coletar versão clear do logo RFG (white) para footer
- [ ] Otimizar fotos sócios para `.webp` + responsivos
- [ ] Otimizar SVG marquee parceiros (especialmente `tokio-marine.svg`, conforme `parceiros-fontes.md`)
- [ ] Validar copy final UPPERCASE em pilares Seção 5 (alternativa: title case com peso 700) — decisão UI fina
- [ ] Implementar single-open vs multi-open nos acordeões (decidir UX)
- [ ] Setup tracking: Plausible ou Vercel Analytics — eventos de conversão por CTA

---

*Wireframes criados por @ux-design-expert (Uma) em 2026-05-05. Próximo: handoff para @architect (decisão de stack — Astro? Next? Vite?) e depois @dev para implementação.*
