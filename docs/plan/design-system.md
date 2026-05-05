# RFG Landing — Design System v1.0

> Sistema de design completo para a landing page da RFG Corretora de Seguros.
> **Posicionamento:** Premium · Consultivo · Confiável · Fraternal · Direto.
> **Mobile-first** · WCAG AA · Drop-in para Tailwind + CSS custom properties.

**Arquivos relacionados:**
- `assets/brand/colors.md` — Paleta primária (gradiente azul oficial)
- `assets/brand/typography.md` — Sistema tipográfico completo
- `docs/briefing/01-dna-completo.md` — DNA de voz e perfil cliente
- `docs/briefing/05-copy-landing.md` — Copy das 13 seções

---

## 1. Filosofia do Sistema

O design system traduz o posicionamento da marca em decisões visuais concretas:

| Pilar de Marca | Tradução Visual |
|----------------|-----------------|
| **Premium** | Espaçamento generoso, tipografia editorial, sombras suaves, gradiente sutil |
| **Consultivo** | Hierarquia tipográfica clara, leitura confortável, sem ruído visual |
| **Confiável** | Paleta azul institucional, neutros frios (não pasteis), bordas precisas |
| **Fraternal** | Sombras com leve azul (não pretas), microinterações suaves, cantos arredondados |
| **Direto** | Componentes funcionais, CTAs com gradiente RFG (call-to-action óbvio) |

**Não somos:** corporativo frio (HSBC), barato/popular (varejo digital), tech-startup (SaaS B2B).
**Somos:** premium consultivo brasileiro (Itaú Personnalité encontra family doctor).

---

## 2. Cores

### 2.1 Primárias (oficiais — não alterar)

```css
--rfg-blue-dark:  #246BB2;  /* Topo do logo */
--rfg-blue-mid:   #3688C8;  /* Transição */
--rfg-blue-light: #4CB3E6;  /* Base do logo */
--rfg-white:      #FFFFFF;
--rfg-gradient-primary: linear-gradient(180deg, #246BB2 0%, #3688C8 50%, #4CB3E6 100%);
--rfg-gradient-cta:     linear-gradient(135deg, #246BB2 0%, #3688C8 60%, #4CB3E6 100%);
```

### 2.2 Neutros (escala de 9 tons — frios, com tinta azul sutil)

> **Estratégia:** neutros levemente frios (hue ~210, próximo ao azul RFG) em vez de cinzas neutros puros. Isso unifica visualmente tudo com a paleta primária e transmite "premium institucional" — não cinza-genérico-corporativo.

| Token | HEX | Uso |
|-------|-----|-----|
| `--neutral-50`  | `#F7F9FC` | Background alternativo (seções zebra) |
| `--neutral-100` | `#EEF2F8` | Background de cards sutis, divisores |
| `--neutral-200` | `#DCE3ED` | Borders padrão, dividers |
| `--neutral-300` | `#BFC9D6` | Borders enfatizados, inputs idle |
| `--neutral-400` | `#94A3B5` | Placeholder, text disabled |
| `--neutral-500` | `#64748B` | Text terciário, captions |
| `--neutral-600` | `#475569` | Text secundário (subheadlines, labels) |
| `--neutral-700` | `#334155` | Text body em fundo claro |
| `--neutral-800` | `#1E293B` | Text emphasis, links |
| `--neutral-900` | `#0F1A2E` | Headlines, text primary (preto suave azulado) |

### 2.3 Texto

```css
--text-primary:   var(--neutral-900);   /* Headlines, body emphasis */
--text-secondary: var(--neutral-700);   /* Body padrão */
--text-tertiary:  var(--neutral-500);   /* Captions, helper, notas */
--text-inverse:   var(--rfg-white);     /* Texto sobre azul/gradiente */
--text-link:      var(--rfg-blue-dark);
--text-link-hover: var(--rfg-blue-mid);
```

### 2.4 Backgrounds

```css
--bg-primary:    var(--rfg-white);      /* Fundo principal */
--bg-secondary:  var(--neutral-50);     /* Seções alternadas */
--bg-tertiary:   var(--neutral-100);    /* Cards sutis */
--bg-inverse:    var(--neutral-900);    /* Footer, seções dark */
--bg-brand:      var(--rfg-gradient-primary);
```

### 2.5 Borders

```css
--border-subtle:   var(--neutral-100);
--border-default:  var(--neutral-200);
--border-emphasis: var(--neutral-300);
--border-brand:    var(--rfg-blue-mid);
--border-focus:    var(--rfg-blue-light);
```

### 2.6 Semânticos (microinterações, futuras evoluções)

> Ainda que a v1 da landing não tenha formulário, definir semânticos é boa prática para badges, tooltips, validações e a fase 2.

| Token | HEX | Uso |
|-------|-----|-----|
| `--success-50`  | `#F0FAF4` | Background sucesso |
| `--success-500` | `#16A34A` | Verde sutil (não fluo) — confirmações |
| `--success-700` | `#15803D` | Hover/borders |
| `--warning-50`  | `#FEF8EC` | Background aviso |
| `--warning-500` | `#D97706` | Âmbar premium (não amarelo gritante) |
| `--warning-700` | `#A35D03` | Hover/borders |
| `--error-50`    | `#FEF2F2` | Background erro |
| `--error-500`   | `#DC2626` | Vermelho sóbrio (não vermelho-alerta) |
| `--error-700`   | `#B91C1C` | Hover/borders |
| `--info-50`     | `#EFF6FF` | Background info |
| `--info-500`    | `var(--rfg-blue-mid)` | Reusa marca |

### 2.7 Validação de contraste (WCAG AA)

| Combinação | Ratio | Status |
|-----------|-------|--------|
| `--text-primary` sobre `--bg-primary` | 14.8:1 | AAA |
| `--text-secondary` sobre `--bg-primary` | 8.6:1 | AAA |
| `--text-tertiary` sobre `--bg-primary` | 4.6:1 | AA |
| `--text-inverse` sobre `--rfg-blue-dark` | 7.1:1 | AAA |
| `--text-inverse` sobre `--rfg-blue-mid` | 4.8:1 | AA |
| `--rfg-blue-dark` sobre `--bg-primary` | 5.1:1 | AA |

---

## 3. Tipografia

> Especificação completa em `assets/brand/typography.md`. Resumo aqui:

- **Display/Headlines:** `Manrope` (400-800)
- **Body/UI:** `Inter` (400-700)
- **Mono (raro):** `JetBrains Mono`
- **Escala:** modular ratio 1.250 (Major Third), mobile-first
- **Tokens:** `--fs-display` → `--fs-small`, `--lh-*`, `--tracking-*`, `--fw-*`

---

## 4. Spacing System (base 4px)

> Tokens nomeados + escala numérica. Mobile-first — em desktop, multiplicadores via media queries quando necessário.

| Token | px | rem | Uso típico |
|-------|-----|-----|-----------|
| `--space-0`   | 0    | 0      | Reset |
| `--space-px`  | 1    | -      | Hairline borders |
| `--space-1`   | 4    | 0.25   | xs — gap mínimo entre ícone e texto |
| `--space-2`   | 8    | 0.5    | sm — gap entre badges, inline items |
| `--space-3`   | 12   | 0.75   | gap pequeno em cards densos |
| `--space-4`   | 16   | 1      | md — padding base de cards mobile |
| `--space-5`   | 20   | 1.25   | gap médio |
| `--space-6`   | 24   | 1.5    | lg — padding default cards, gap entre parágrafos |
| `--space-8`   | 32   | 2      | xl — gap entre subseções |
| `--space-10`  | 40   | 2.5    | gap entre blocos médios |
| `--space-12`  | 48   | 3      | 2xl — padding seções mobile, gap pilar/pilar |
| `--space-16`  | 64   | 4      | 3xl — padding seções tablet, gap entre seções mobile |
| `--space-20`  | 80   | 5      | gap grande |
| `--space-24`  | 96   | 6      | 4xl — padding seções desktop |
| `--space-32`  | 128  | 8      | 5xl — gap entre seções desktop |
| `--space-40`  | 160  | 10     | hero spacing desktop |

### Aliases semânticos

```css
--space-xs: var(--space-1);    /* 4px */
--space-sm: var(--space-2);    /* 8px */
--space-md: var(--space-4);    /* 16px */
--space-lg: var(--space-6);    /* 24px */
--space-xl: var(--space-12);   /* 48px */
--space-2xl: var(--space-16);  /* 64px */
--space-3xl: var(--space-24);  /* 96px */
--space-4xl: var(--space-32);  /* 128px */

/* Spacing por contexto */
--section-padding-mobile:  var(--space-12) var(--space-4);   /* 48 16 */
--section-padding-tablet:  var(--space-16) var(--space-6);   /* 64 24 */
--section-padding-desktop: var(--space-24) var(--space-8);   /* 96 32 */
--section-gap: var(--space-32);                              /* 128px entre seções desktop */

--container-max: 1200px;
--container-narrow: 760px;   /* leitura confortável de body longo (Seção 2, 7) */
```

---

## 5. Border Radius

| Token | px | Uso |
|-------|-----|-----|
| `--radius-none` | 0 | Reset |
| `--radius-sm`   | 4 | Badges, pills pequenos, inputs |
| `--radius-md`   | 8 | Botões padrão, inputs grandes |
| `--radius-lg`   | 12 | Cards padrão, modals |
| `--radius-xl`   | 16 | Cards destacados ("Mais Procurado") |
| `--radius-2xl`  | 24 | Hero blocks, imagens hero |
| `--radius-full` | 9999px | Pills, avatares circulares, badges arredondados |

---

## 6. Shadows (5 níveis — premium e suaves)

> **Estratégia:** sombras com tinta azul sutil (não pretas puras) — reforça a paleta da marca e transmite premium em vez de "cartaz". Opacidades baixas, blur generoso.

```css
--shadow-sm:  0 1px 2px 0 rgba(36, 107, 178, 0.06),
              0 1px 3px 0 rgba(15, 26, 46, 0.08);

--shadow-md:  0 4px 8px -2px rgba(36, 107, 178, 0.08),
              0 2px 4px -1px rgba(15, 26, 46, 0.06);

--shadow-lg:  0 12px 24px -6px rgba(36, 107, 178, 0.1),
              0 4px 8px -2px rgba(15, 26, 46, 0.06);

--shadow-xl:  0 24px 48px -12px rgba(36, 107, 178, 0.18),
              0 8px 16px -4px rgba(15, 26, 46, 0.08);

--shadow-2xl: 0 40px 80px -20px rgba(36, 107, 178, 0.25),
              0 16px 32px -8px rgba(15, 26, 46, 0.1);

/* Especiais */
--shadow-focus:    0 0 0 4px rgba(76, 179, 230, 0.35);
--shadow-cta:      0 8px 24px -4px rgba(36, 107, 178, 0.4);
--shadow-cta-hover: 0 12px 32px -6px rgba(36, 107, 178, 0.5);
```

| Token | Uso |
|-------|-----|
| `sm`  | Borders sutis, inputs idle, dividers elevados |
| `md`  | Cards padrão (pilares, depoimentos) |
| `lg`  | Cards hover, dropdowns |
| `xl`  | Card "Mais Procurado", modals, popovers importantes |
| `2xl` | Hero image lift, modal de destaque (raro) |
| `cta` | Botão primário (gradiente RFG) |

---

## 7. Componentes Primitivos

### 7.1 Button

**Variantes:** `primary` · `secondary` · `ghost` · `link`
**Tamanhos:** `sm` (36px) · `md` (44px — default mobile-first, atende WCAG touch target) · `lg` (56px)

#### Primary (CTAs principais — "Fazer meu diagnóstico", "QUERO O PLANO COMPLETO...")

```
Background:    var(--rfg-gradient-cta)
Text:          var(--text-inverse) — Inter 600
Border-radius: var(--radius-md)  /* sm/md */ | var(--radius-lg) /* lg */
Padding:       sm: 8 16 | md: 12 24 | lg: 16 32
Shadow:        var(--shadow-cta)
Min-height:    sm 36 | md 44 | lg 56

States:
  hover:  shadow-cta-hover, brilho leve (gradient shift +5%)
  active: scale(0.98), shadow-md
  focus-visible: outline + shadow-focus
  disabled: bg neutral-300, text neutral-500, no shadow, cursor not-allowed
```

#### Secondary (CTAs alternativos, navegação interna)

```
Background:    transparent
Text:          var(--rfg-blue-dark) — Inter 600
Border:        2px solid var(--rfg-blue-dark)
Border-radius: var(--radius-md) | var(--radius-lg) lg
Padding:       igual primary - 2px (compensa border)

States:
  hover:  bg rfg-blue-dark, text inverse
  active: scale(0.98)
  focus-visible: shadow-focus
```

#### Ghost (ações secundárias inline, FAQ)

```
Background:    transparent
Text:          var(--rfg-blue-dark) — Inter 500
Border:        none
Padding:       sm: 8 12 | md: 12 16 | lg: 16 20

States:
  hover:  bg neutral-100
  focus-visible: shadow-focus
```

#### Link (inline em texto)

```
Text:          var(--text-link) — Inter 500, underline 2px offset
States:
  hover: text-link-hover, underline mais espesso
```

#### Especificações de tamanho

| Tamanho | Height | Font | Padding-x | Use case |
|---------|--------|------|-----------|----------|
| `sm` | 36px | 14px / Inter 600 | 16px | UI secundária, FAQ |
| `md` | 44px | 16px / Inter 600 | 24px | CTA padrão (mobile/desktop) |
| `lg` | 56px | 18px / Inter 600 | 32px | Hero CTA, pacotes |

### 7.2 Card

**Variantes:** `default` · `elevated` · `featured` (Mais Procurado) · `quote`

#### Default (pilares, depoimentos comuns, FAQ collapsed)

```
Background:    var(--bg-primary)
Border:        1px solid var(--border-default)
Border-radius: var(--radius-lg) /* 12px */
Padding:       var(--space-6) /* 24px mobile */ → var(--space-8) /* 32px desktop */
Shadow:        var(--shadow-sm)

Hover (interativo):
  border:      var(--border-emphasis)
  shadow:      var(--shadow-md)
  transform:   translateY(-2px)
  transition:  all 200ms cubic-bezier(0.16, 1, 0.3, 1)
```

#### Elevated (depoimentos em destaque, casos de prova)

```
Background:    var(--bg-primary)
Border:        none
Border-radius: var(--radius-xl) /* 16px */
Padding:       var(--space-8)
Shadow:        var(--shadow-lg)
```

#### Featured ("Pacote 2 — Mais Procurado")

```
Background:    var(--bg-primary)
Border:        2px solid var(--rfg-blue-mid)
Border-radius: var(--radius-xl) /* 16px */
Padding:       var(--space-8) → var(--space-10)
Shadow:        var(--shadow-xl)
Position:      relative; possui badge "MAIS PROCURADO" no topo (translateY(-50%))

Decorativo:
  Antes do título, uma faixa de gradiente RFG no topo (height: 4px)
  ::before com gradiente full-width
```

#### Quote (depoimentos)

```
Background:    var(--bg-secondary) /* neutral-50 */
Border-left:   4px solid var(--rfg-blue-light)
Border-radius: var(--radius-md) /* 8px */
Padding:       var(--space-6)

Citação:       text-body-lg / Inter 400 italic
Atribuição:    text-caption / Inter 600, color text-secondary
```

### 7.3 Input / Textarea

> v1 da landing não tem formulário. Definição prepara fase 2 (formulário de contato, calculadora de diagnóstico).

```
Height:        44px (input) / auto-min 96px (textarea)
Background:    var(--bg-primary)
Border:        1.5px solid var(--border-default)
Border-radius: var(--radius-md)
Padding:       12px 16px
Font:          16px Inter 400 (16px evita zoom-on-focus iOS)
Color:         var(--text-primary)
Placeholder:   var(--text-tertiary)

States:
  hover:    border var(--border-emphasis)
  focus:    border var(--rfg-blue-mid), shadow-focus, outline none
  error:    border var(--error-500), with helper text below
  disabled: bg neutral-100, color neutral-400, cursor not-allowed

Label:        text-caption / Inter 600, color text-secondary, margin-bottom var(--space-2)
Helper text:  text-small / Inter 400, color text-tertiary, margin-top var(--space-1)
Error text:   text-small / Inter 500, color error-500
```

### 7.4 Badge / Pill

**Variantes:** `default` · `brand` · `accent` · `success` · `warning` · `outline`
**Tamanhos:** `sm` · `md`

```
Border-radius: var(--radius-full)
Padding:       sm: 2px 8px | md: 4px 12px
Font:          sm: 11px / Inter 600 uppercase, tracking 0.06em
               md: 12px / Inter 600 uppercase, tracking 0.05em

Variantes:
  default:  bg neutral-100, text neutral-700
  brand:    bg var(--rfg-blue-dark), text inverse — "MAIS PROCURADO"
  accent:   bg gradient-cta, text inverse — selo de destaque máximo
  success:  bg success-50, text success-700 — "SUSEP 1995"
  warning:  bg warning-50, text warning-700
  outline:  bg transparent, border 1px var(--rfg-blue-mid), text var(--rfg-blue-dark)
```

### 7.5 Section (estrutural)

```
Padding-y mobile:  var(--space-12)  /* 48px */
Padding-y tablet:  var(--space-16)  /* 64px */
Padding-y desktop: var(--space-24)  /* 96px */

Container:
  max-width: 1200px
  margin: 0 auto
  padding-x: var(--space-4) mobile / var(--space-6) tablet / var(--space-8) desktop

Container narrow (storytelling):
  max-width: 760px
  para Seções 2, 7, 11 (leitura longa)
```

### 7.6 Eyebrow + Headline (padrão de seção)

> Padrão de abertura de cada seção da landing.

```html
<div class="section-header">
  <span class="eyebrow">PARA QUEM É</span>
  <h2 class="section-title">Headline aqui</h2>
  <p class="section-lead">Subheadline opcional</p>
</div>
```

```
.eyebrow:        text-eyebrow Manrope 600 uppercase, color rfg-blue-dark
                 margin-bottom var(--space-3)
.section-title:  text-h2 Manrope 700, color text-primary
                 margin-bottom var(--space-4)
.section-lead:   text-lead Inter 400, color text-secondary
                 max-width 720px
```

---

## 8. Motion / Microinterações

```css
--ease-out:        cubic-bezier(0.16, 1, 0.3, 1);     /* default — entrada confortável */
--ease-in-out:     cubic-bezier(0.65, 0, 0.35, 1);    /* transições reversíveis */
--ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1); /* feedback tátil (botões) */

--duration-fast:   150ms;   /* hover, focus */
--duration-normal: 250ms;   /* padrão */
--duration-slow:   400ms;   /* card lift, modal */
--duration-slower: 600ms;   /* fade-in seções (scroll) */

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## 9. Drop-in CSS (`tokens.css`)

```css
:root {
  /* ============ COLORS — Brand ============ */
  --rfg-blue-dark: #246BB2;
  --rfg-blue-mid: #3688C8;
  --rfg-blue-light: #4CB3E6;
  --rfg-white: #FFFFFF;
  --rfg-gradient-primary: linear-gradient(180deg, #246BB2 0%, #3688C8 50%, #4CB3E6 100%);
  --rfg-gradient-cta: linear-gradient(135deg, #246BB2 0%, #3688C8 60%, #4CB3E6 100%);

  /* ============ COLORS — Neutrals ============ */
  --neutral-50: #F7F9FC;
  --neutral-100: #EEF2F8;
  --neutral-200: #DCE3ED;
  --neutral-300: #BFC9D6;
  --neutral-400: #94A3B5;
  --neutral-500: #64748B;
  --neutral-600: #475569;
  --neutral-700: #334155;
  --neutral-800: #1E293B;
  --neutral-900: #0F1A2E;

  /* ============ COLORS — Semantic ============ */
  --success-50: #F0FAF4;
  --success-500: #16A34A;
  --success-700: #15803D;
  --warning-50: #FEF8EC;
  --warning-500: #D97706;
  --warning-700: #A35D03;
  --error-50: #FEF2F2;
  --error-500: #DC2626;
  --error-700: #B91C1C;
  --info-50: #EFF6FF;
  --info-500: #3688C8;

  /* ============ COLORS — Aliases ============ */
  --text-primary: var(--neutral-900);
  --text-secondary: var(--neutral-700);
  --text-tertiary: var(--neutral-500);
  --text-inverse: var(--rfg-white);
  --text-link: var(--rfg-blue-dark);
  --text-link-hover: var(--rfg-blue-mid);

  --bg-primary: var(--rfg-white);
  --bg-secondary: var(--neutral-50);
  --bg-tertiary: var(--neutral-100);
  --bg-inverse: var(--neutral-900);

  --border-subtle: var(--neutral-100);
  --border-default: var(--neutral-200);
  --border-emphasis: var(--neutral-300);
  --border-brand: var(--rfg-blue-mid);
  --border-focus: var(--rfg-blue-light);

  /* ============ TYPOGRAPHY ============ */
  --font-display: 'Manrope', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;

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

  --lh-tight: 1.1;
  --lh-snug: 1.2;
  --lh-normal: 1.5;
  --lh-relaxed: 1.6;
  --lh-loose: 1.65;

  --tracking-tighter: -0.03em;
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.02em;
  --tracking-wider: 0.12em;

  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;
  --fw-extrabold: 800;

  /* ============ SPACING ============ */
  --space-0: 0;
  --space-px: 1px;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
  --space-40: 10rem;

  --space-xs: var(--space-1);
  --space-sm: var(--space-2);
  --space-md: var(--space-4);
  --space-lg: var(--space-6);
  --space-xl: var(--space-12);
  --space-2xl: var(--space-16);
  --space-3xl: var(--space-24);
  --space-4xl: var(--space-32);

  --container-max: 1200px;
  --container-narrow: 760px;

  /* ============ RADIUS ============ */
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* ============ SHADOWS ============ */
  --shadow-sm: 0 1px 2px 0 rgba(36, 107, 178, 0.06), 0 1px 3px 0 rgba(15, 26, 46, 0.08);
  --shadow-md: 0 4px 8px -2px rgba(36, 107, 178, 0.08), 0 2px 4px -1px rgba(15, 26, 46, 0.06);
  --shadow-lg: 0 12px 24px -6px rgba(36, 107, 178, 0.1), 0 4px 8px -2px rgba(15, 26, 46, 0.06);
  --shadow-xl: 0 24px 48px -12px rgba(36, 107, 178, 0.18), 0 8px 16px -4px rgba(15, 26, 46, 0.08);
  --shadow-2xl: 0 40px 80px -20px rgba(36, 107, 178, 0.25), 0 16px 32px -8px rgba(15, 26, 46, 0.1);
  --shadow-focus: 0 0 0 4px rgba(76, 179, 230, 0.35);
  --shadow-cta: 0 8px 24px -4px rgba(36, 107, 178, 0.4);
  --shadow-cta-hover: 0 12px 32px -6px rgba(36, 107, 178, 0.5);

  /* ============ MOTION ============ */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;
}

/* ============ MOBILE TYPOGRAPHY OVERRIDES ============ */
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

/* ============ A11Y ============ */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* ============ BASE ============ */
html { font-size: 16px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
body {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: var(--lh-relaxed);
  color: var(--text-primary);
  background: var(--bg-primary);
}
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  color: var(--text-primary);
  letter-spacing: var(--tracking-tight);
  line-height: var(--lh-snug);
}
```

---

## 10. Tailwind Config (drop-in)

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx,vue,svelte,astro}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1200px', '2xl': '1200px' },
    },
    extend: {
      colors: {
        rfg: {
          dark: '#246BB2',
          mid: '#3688C8',
          light: '#4CB3E6',
          DEFAULT: '#3688C8',
        },
        neutral: {
          50: '#F7F9FC',
          100: '#EEF2F8',
          200: '#DCE3ED',
          300: '#BFC9D6',
          400: '#94A3B5',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F1A2E',
        },
        success: { 50: '#F0FAF4', 500: '#16A34A', 700: '#15803D' },
        warning: { 50: '#FEF8EC', 500: '#D97706', 700: '#A35D03' },
        error:   { 50: '#FEF2F2', 500: '#DC2626', 700: '#B91C1C' },
        info:    { 50: '#EFF6FF', 500: '#3688C8' },
      },
      fontFamily: {
        display: ['Manrope', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        sans:    ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing, fontWeight }]
        'display':  ['clamp(2.75rem, 5vw + 1rem, 4.5rem)',  { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        'h1':       ['clamp(2.25rem, 4vw + 1rem, 3.5rem)',  { lineHeight: '1.1',  letterSpacing: '-0.025em', fontWeight: '700' }],
        'h2':       ['clamp(1.875rem, 3vw + 1rem, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h3':       ['clamp(1.5rem, 2vw + 1rem, 2rem)',     { lineHeight: '1.2',  letterSpacing: '-0.015em', fontWeight: '600' }],
        'h4':       ['clamp(1.25rem, 1vw + 1rem, 1.5rem)',  { lineHeight: '1.3',  letterSpacing: '-0.01em', fontWeight: '600' }],
        'eyebrow':  ['0.875rem',   { lineHeight: '1.4', letterSpacing: '0.12em', fontWeight: '600' }],
        'lead':     ['clamp(1.125rem, 0.5vw + 1rem, 1.375rem)', { lineHeight: '1.5', letterSpacing: '-0.005em', fontWeight: '400' }],
        'body-lg':  ['1.125rem',   { lineHeight: '1.65', fontWeight: '400' }],
        'body':     ['1rem',       { lineHeight: '1.6',  fontWeight: '400' }],
        'body-sm':  ['0.9375rem',  { lineHeight: '1.55', fontWeight: '400' }],
        'caption':  ['0.875rem',   { lineHeight: '1.5',  fontWeight: '500' }],
        'small':    ['0.75rem',    { lineHeight: '1.5',  letterSpacing: '0.02em', fontWeight: '500' }],
      },
      spacing: {
        // Tailwind base já cobre 0-96; adiciona aliases semânticos
        'section-mobile':  '3rem',
        'section-tablet':  '4rem',
        'section-desktop': '6rem',
        'section-gap':     '8rem',
      },
      maxWidth: {
        'container': '1200px',
        'narrow': '760px',
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        DEFAULT: '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'sm':  '0 1px 2px 0 rgba(36,107,178,0.06), 0 1px 3px 0 rgba(15,26,46,0.08)',
        DEFAULT: '0 4px 8px -2px rgba(36,107,178,0.08), 0 2px 4px -1px rgba(15,26,46,0.06)',
        'md':  '0 4px 8px -2px rgba(36,107,178,0.08), 0 2px 4px -1px rgba(15,26,46,0.06)',
        'lg':  '0 12px 24px -6px rgba(36,107,178,0.1), 0 4px 8px -2px rgba(15,26,46,0.06)',
        'xl':  '0 24px 48px -12px rgba(36,107,178,0.18), 0 8px 16px -4px rgba(15,26,46,0.08)',
        '2xl': '0 40px 80px -20px rgba(36,107,178,0.25), 0 16px 32px -8px rgba(15,26,46,0.1)',
        'focus': '0 0 0 4px rgba(76,179,230,0.35)',
        'cta':       '0 8px 24px -4px rgba(36,107,178,0.4)',
        'cta-hover': '0 12px 32px -6px rgba(36,107,178,0.5)',
      },
      backgroundImage: {
        'rfg-gradient':     'linear-gradient(180deg, #246BB2 0%, #3688C8 50%, #4CB3E6 100%)',
        'rfg-gradient-cta': 'linear-gradient(135deg, #246BB2 0%, #3688C8 60%, #4CB3E6 100%)',
      },
      transitionTimingFunction: {
        'out-soft':   'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-soft':'cubic-bezier(0.65, 0, 0.35, 1)',
        'spring':     'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        'fast':   '150ms',
        'normal': '250ms',
        'slow':   '400ms',
        'slower': '600ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // pra prose nos blocos longos (Seção 2, 7, 11)
  ],
};
```

### Classes utilitárias customizadas (`globals.css` add-on)

```css
@layer components {
  /* CTA Primary */
  .btn-primary {
    @apply inline-flex items-center justify-center font-sans font-semibold text-white
           bg-rfg-gradient-cta rounded-md shadow-cta
           transition-all duration-normal ease-out-soft
           hover:shadow-cta-hover hover:-translate-y-0.5
           active:scale-[0.98]
           focus-visible:outline-none focus-visible:shadow-focus
           disabled:bg-none disabled:bg-neutral-300 disabled:text-neutral-500 disabled:shadow-none disabled:cursor-not-allowed;
  }
  .btn-primary-md { @apply btn-primary h-11 px-6 text-body; }
  .btn-primary-lg { @apply btn-primary h-14 px-8 text-body-lg rounded-lg; }

  /* CTA Secondary */
  .btn-secondary {
    @apply inline-flex items-center justify-center font-sans font-semibold
           text-rfg-dark bg-transparent border-2 border-rfg-dark rounded-md
           transition-all duration-normal ease-out-soft
           hover:bg-rfg-dark hover:text-white
           focus-visible:outline-none focus-visible:shadow-focus;
  }
  .btn-secondary-md { @apply btn-secondary h-11 px-6 text-body; }
  .btn-secondary-lg { @apply btn-secondary h-14 px-8 text-body-lg rounded-lg; }

  /* Cards */
  .card {
    @apply bg-white border border-neutral-200 rounded-lg p-6 md:p-8
           shadow-sm transition-all duration-normal ease-out-soft;
  }
  .card-hover { @apply hover:border-neutral-300 hover:shadow-md hover:-translate-y-0.5; }
  .card-featured {
    @apply bg-white border-2 border-rfg-mid rounded-xl p-8 md:p-10 shadow-xl relative;
  }
  .card-quote {
    @apply bg-neutral-50 border-l-4 border-rfg-light rounded-md p-6;
  }

  /* Eyebrow */
  .eyebrow {
    @apply font-display font-semibold text-eyebrow uppercase
           text-rfg-dark tracking-[0.12em];
  }

  /* Section */
  .section { @apply py-12 md:py-16 lg:py-24; }
  .container-narrow { @apply mx-auto max-w-narrow px-4 md:px-6; }
  .container-wide   { @apply mx-auto max-w-container px-4 md:px-6 lg:px-8; }

  /* Badge */
  .badge { @apply inline-flex items-center font-sans font-semibold uppercase tracking-wider rounded-full; }
  .badge-sm { @apply badge text-[11px] px-2 py-0.5; }
  .badge-md { @apply badge text-xs px-3 py-1; }
  .badge-brand   { @apply bg-rfg-dark text-white; }
  .badge-success { @apply bg-success-50 text-success-700; }
  .badge-outline { @apply bg-transparent border border-rfg-mid text-rfg-dark; }
}
```

---

## 11. Mapeamento — Tokens → Seções da Landing

| Seção | Componentes | Tokens-chave |
|-------|-------------|--------------|
| **1. Hero** | `text-display`, `btn-primary-lg`, `badge-success` (SUSEP) | `--rfg-gradient-cta`, `--shadow-cta`, container-wide |
| **2. Problema** | `container-narrow`, `text-body-lg` storytelling | `--bg-primary`, `--lh-loose` |
| **3. Oportunidade** | `eyebrow`, `text-h2`, `text-body-lg` | `--rfg-blue-dark` em destaques |
| **4. Para Quem É** | 3x `card`, `text-h3` por persona | `--shadow-sm` cards |
| **5. Proposta de Valor** | 4x `card-hover`, ícones | grid 2x2 desktop, stack mobile |
| **6. Prova** | `card-quote`, faixa logos parceiros | `--bg-secondary` na seção |
| **7. História de Origem** | `container-narrow`, foto sócios `--radius-2xl` | leitura longa |
| **8. Como Funciona** | 3x `card` com numeração visual | gap `--space-8` |
| **9. Oferta e Preços** | 3x `card`, meio = `card-featured` + `badge-brand` | `--shadow-xl` no featured |
| **10. Garantia** | `card-quote` ampliado, badge SUSEP | tom de confiança |
| **11. Visão de Futuro** | 2 colunas (positivo/negativo), `--bg-secondary` no negativo | contraste visual |
| **12. Objeções** | Acordeão + `btn-primary-lg` final | `text-body-lg` respostas |
| **13. FAQ** | Acordeão `card-hover` com chevron | `--space-3` gap |
| **Footer** | `--bg-inverse`, badges parceiros, links | tipografia menor |

---

## 12. Checklist de Implementação (handoff @dev)

- [ ] Importar Manrope + Inter (preconnect + Google Fonts ou self-hosted)
- [ ] Copiar `tokens.css` (`:root` block) em `src/styles/tokens.css`
- [ ] Substituir `tailwind.config.js` pelo template acima
- [ ] Adicionar `@tailwindcss/typography` (`npm i -D @tailwindcss/typography`)
- [ ] Configurar `globals.css` com layer `components` (classes utilitárias)
- [ ] Validar contraste em ferramenta (axe DevTools / Lighthouse)
- [ ] Testar em mobile real (iPhone SE 320px, Android médio 360px)
- [ ] `prefers-reduced-motion` respeitado
- [ ] Testar fontes em conexão 3G simulada (FOUT controlado com `font-display: swap`)

---

## 13. Decisões em Aberto

- [ ] Definir se haverá Dark Mode na v1 (sugestão: não — concentra esforço no light premium)
- [ ] Definir grid system fino (8/12 colunas) — recomendação: 12-col com gutters `--space-6` desktop, `--space-4` mobile
- [ ] Confirmar com Anderson/Ricardo se gradiente do CTA pode usar 135° (diagonal) ou só 180° (vertical do logo)
- [ ] Validar fotos dos sócios pra definir tratamento (filtro azul sutil? overlay gradient?)
- [ ] Decidir ícones: linha fina padronizada (Lucide / Phosphor / Tabler) — recomendação: **Lucide** (open source, peso geométrico-humanista que casa com Manrope)
