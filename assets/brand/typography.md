# RFG — Tipografia Oficial

> Sistema tipográfico da landing page. Mobile-first. Otimizado para tom premium-consultivo-fraternal.
> **Pareado com:** `colors.md` (paleta gradiente azul) e `docs/plan/design-system.md` (design system completo).

---

## 1. Decisão Final (TL;DR)

| Camada | Fonte | Uso |
|--------|-------|-----|
| **Headlines / Display** | **Manrope** | H1, H2, H3, números de impacto, CTAs grandes |
| **Body / UI** | **Inter** | Parágrafos, listas, FAQ, labels, inputs, botões pequenos |
| **Mono (raro)** | **JetBrains Mono** | Casos pontuais (selo SUSEP, números técnicos). Opcional. |

> Ambas Google Fonts, gratuitas, self-hostáveis, com excelente suporte pt-BR (acentuação, ç).

---

## 2. Por que Manrope (Headlines)

**Candidatas avaliadas:** Manrope, Plus Jakarta Sans, Sora, DM Sans, Geist.

| Fonte | Prós | Contras | Veredito |
|-------|------|---------|----------|
| **Manrope** | Geométrica-humanista, calor sutil nos terminais, ótima em pesos 600/700, gratuita, suporte pt-BR completo, letras abertas (legível em mobile) | Levemente menos "tech" que Geist | **ESCOLHIDA** — equilibra autoridade e calor humano |
| Plus Jakarta Sans | Moderna, premium, ótima em headlines | Em corpo, parece menos diferenciada do Inter | Reserva |
| Sora | Bold geometric, transmite premium | Menos calor humano — risco de ficar "frio corporativo" | Descartada |
| DM Sans | Limpa, neutra | Pouco caráter — não diferencia da concorrência | Descartada |
| Geist | Moderna (Vercel) | Tech demais — não casa com fraternal | Descartada |

**Justificativa final:** Manrope tem **traços geométricos com sutileza humanista** — terminais levemente arredondados, "a" e "g" abertos. Em pesos 700 ela transmite autoridade ("35 anos de experiência"); em 500 transmite proximidade ("Você construiu muito"). Encarna exatamente "irmão mais velho experiente": confiável sem ser frio, premium sem ser distante.

## 3. Por que Inter (Body)

Inter é o padrão-ouro de UI tipografia em 2026: legibilidade extrema em mobile (320px), x-height alto, suporte completo a OpenType (tabular-nums para preços), pareamento perfeito com Manrope (mesma família humanista-geométrica, sem conflito visual). Em 16px no body, mantém legibilidade até em conexões fracas (boa renderização em screens HiDPI e standard).

**Pareamento Manrope + Inter:** ambas compartilham DNA geométrico-humanista, então a transição entre headline e body é fluida. Não compete por atenção — Manrope grita, Inter sussurra.

---

## 4. Importação

### Google Fonts (HTML)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### CSS @import

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
```

### Self-hosted (recomendado pra performance / LGPD)

Baixar de [fonts.google.com](https://fonts.google.com) e servir via `/public/fonts/`:

```css
@font-face {
  font-family: 'Manrope';
  src: url('/fonts/manrope-variable.woff2') format('woff2-variations');
  font-weight: 400 800;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-variable.woff2') format('woff2-variations');
  font-weight: 400 700;
  font-display: swap;
  font-style: normal;
}
```

### Fallback Stack Completo

```css
--font-display: 'Manrope', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-body: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Monaco, 'Cascadia Code', Consolas, monospace;
```

---

## 5. Hierarquia de Pesos

| Hierarquia | Peso Manrope | Peso Inter | Quando usar |
|-----------|--------------|------------|-------------|
| Display (hero) | 800 | — | H1 do hero (raro, máximo impacto) |
| H1 | 700 | — | Headlines de seção |
| H2 | 700 | — | Subheadlines de seção |
| H3 | 600 | — | Títulos de cards, pacotes, FAQ |
| H4 / Eyebrow | 600 | — | Tags ("PARA QUEM É", "COMO FUNCIONA") |
| Body | — | 400 | Parágrafos |
| Body emphasis | — | 500 | Frases-chave em negrito leve |
| Body strong | — | 600 | Frases-âncora (objeções, pilares) |
| Button | — | 600 | CTAs |
| Caption / Small | — | 400-500 | Selos SUSEP, notas, footer |

---

## 6. Escala Tipográfica (Modular — ratio 1.250 "Major Third")

> Base: 16px = 1rem. Escala harmônica que garante hierarquia clara sem saltos abruptos.
> **Mobile-first:** valores `mobile` (320-768px); `desktop` (>=1024px) escala +20-30% nas displays.

### Desktop (>=1024px)

| Token | rem | px | line-height | letter-spacing | font | weight | Uso |
|-------|-----|-----|-------------|----------------|------|--------|-----|
| `text-display` | 4.5rem | 72px | 1.05 | -0.03em | Manrope | 800 | Hero H1 |
| `text-h1` | 3.5rem | 56px | 1.1 | -0.025em | Manrope | 700 | H1 seções |
| `text-h2` | 2.75rem | 44px | 1.15 | -0.02em | Manrope | 700 | H2 seções |
| `text-h3` | 2rem | 32px | 1.2 | -0.015em | Manrope | 600 | H3 cards |
| `text-h4` | 1.5rem | 24px | 1.3 | -0.01em | Manrope | 600 | H4 / lead |
| `text-eyebrow` | 0.875rem | 14px | 1.4 | 0.12em | Manrope | 600 | "PARA QUEM É" (uppercase) |
| `text-lead` | 1.375rem | 22px | 1.5 | -0.005em | Inter | 400 | Subheadline hero |
| `text-body-lg` | 1.125rem | 18px | 1.65 | 0 | Inter | 400 | Parágrafos longos (storytelling) |
| `text-body` | 1rem | 16px | 1.6 | 0 | Inter | 400 | Body padrão |
| `text-body-sm` | 0.9375rem | 15px | 1.55 | 0 | Inter | 400 | UI secundária |
| `text-caption` | 0.875rem | 14px | 1.5 | 0.005em | Inter | 500 | Selos, badges, notas |
| `text-small` | 0.75rem | 12px | 1.5 | 0.02em | Inter | 500 | Footer, microcopy |

### Mobile (320-768px)

| Token | rem | px | line-height | letter-spacing |
|-------|-----|-----|-------------|----------------|
| `text-display` | 2.75rem | 44px | 1.1 | -0.025em |
| `text-h1` | 2.25rem | 36px | 1.15 | -0.02em |
| `text-h2` | 1.875rem | 30px | 1.2 | -0.015em |
| `text-h3` | 1.5rem | 24px | 1.25 | -0.01em |
| `text-h4` | 1.25rem | 20px | 1.35 | -0.005em |
| `text-eyebrow` | 0.8125rem | 13px | 1.4 | 0.12em |
| `text-lead` | 1.125rem | 18px | 1.55 | 0 |
| `text-body-lg` | 1.0625rem | 17px | 1.65 | 0 |
| `text-body` | 1rem | 16px | 1.6 | 0 |
| `text-body-sm` | 0.9375rem | 15px | 1.55 | 0 |
| `text-caption` | 0.875rem | 14px | 1.5 | 0.005em |
| `text-small` | 0.75rem | 12px | 1.5 | 0.02em |

### Tablet (769-1023px)
Interpolação fluida via `clamp()` — ver `design-system.md` para tokens fluidos.

---

## 7. Princípios de Aplicação

1. **Apenas 1 fonte por bloco semântico**: nunca misturar Manrope e Inter no mesmo parágrafo
2. **Letter-spacing negativo** em headlines grandes (>=24px) — dá ar premium editorial
3. **Letter-spacing positivo** em uppercase pequeno (eyebrows, badges) — melhora legibilidade
4. **Line-height generoso no body** (1.6+) — fundamental para storytelling longo das seções 2, 3, 7
5. **Não usar peso 300 (Light)** — a marca pede solidez, peso 300 transmite fragilidade
6. **OpenType `tabular-nums`** ativo nos preços ("R$ 380/mês") para alinhamento vertical
7. **Português-Brasil**: garantir que acentos (á é í ó ú ã õ ç) renderizam corretamente em todos os pesos

---

## 8. Acessibilidade

- **Contraste mínimo:** 4.5:1 para body, 3:1 para texto grande (>=24px) — WCAG AA
- **Tamanho mínimo:** 14px para qualquer texto interativo
- **`prefers-reduced-motion`**: respeitar; sem animações tipográficas que afetam motion-sensitive users
- **`font-display: swap`** em todas as @font-face — evita FOIT

---

## 9. Custom Properties (drop-in)

```css
:root {
  /* Font families */
  --font-display: 'Manrope', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;

  /* Font sizes — desktop */
  --fs-display: 4.5rem;
  --fs-h1: 3.5rem;
  --fs-h2: 2.75rem;
  --fs-h3: 2rem;
  --fs-h4: 1.5rem;
  --fs-eyebrow: 0.875rem;
  --fs-lead: 1.375rem;
  --fs-body-lg: 1.125rem;
  --fs-body: 1rem;
  --fs-body-sm: 0.9375rem;
  --fs-caption: 0.875rem;
  --fs-small: 0.75rem;

  /* Line heights */
  --lh-tight: 1.1;
  --lh-snug: 1.2;
  --lh-normal: 1.5;
  --lh-relaxed: 1.6;
  --lh-loose: 1.65;

  /* Letter spacings */
  --tracking-tighter: -0.03em;
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.02em;
  --tracking-wider: 0.12em;

  /* Weights */
  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;
  --fw-extrabold: 800;
}

@media (max-width: 768px) {
  :root {
    --fs-display: 2.75rem;
    --fs-h1: 2.25rem;
    --fs-h2: 1.875rem;
    --fs-h3: 1.5rem;
    --fs-h4: 1.25rem;
    --fs-eyebrow: 0.8125rem;
    --fs-lead: 1.125rem;
    --fs-body-lg: 1.0625rem;
  }
}
```

---

## 10. Exemplos Aplicados (mapping para a landing)

| Elemento da Landing | Token | Resultado |
|--------------------|-------|-----------|
| Hero H1 ("Você construiu muito...") | `text-display` Manrope 800 | Impacto premium, autoridade imediata |
| Subheadline hero | `text-lead` Inter 400 | Calor humano, leitura confortável |
| "PARA QUEM É" / "COMO FUNCIONA" | `text-eyebrow` Manrope 600 uppercase | Estrutura editorial, hierarquia clara |
| Pilar "PROTEJA O QUE JÁ TEM" | `text-h4` Manrope 600 | Comando claro sem gritar |
| Storytelling (Seção 2, 7) | `text-body-lg` Inter 400 | Leitura prolongada confortável |
| FAQ pergunta | `text-h4` Manrope 600 | Autoridade |
| FAQ resposta | `text-body` Inter 400 | Conversa, proximidade |
| Preço "R$ 380/mês" | `text-h2` Manrope 700 + tabular-nums | Premium, alinhado |
| CTA "Fazer meu diagnóstico" | `text-body` Inter 600 | Direto, acionável |
| Selo SUSEP | `text-caption` Inter 500 | Credencial, discreta |

---

## 11. Próximas Validações

- [ ] Validar renderização em Safari iOS (peso 800 Manrope pode parecer mais leve)
- [ ] Testar leitura de Seções 2, 7, 11 (storytelling longo) em mobile real
- [ ] Confirmar tamanho de selo SUSEP / autoridades não compete com headline do hero
- [ ] A11y audit: contraste de `--neutral-600` em `--neutral-50` no body
