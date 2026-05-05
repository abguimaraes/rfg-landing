# RFG Landing — Arquitetura Técnica v1.0

> Autor: Aria (Architect Agent) | Data: 2026-05-05
> Stack ratificada por Anderson em `00-execution-plan.md` (Decisões D1-D9)
> Codebase 100% novo, independente do PostFeito (apenas referência visual de efeitos)

**Documentos relacionados:**
- `docs/plan/00-execution-plan.md` — Plano de execução e decisões D1-D9
- `docs/plan/effects-reference.md` — GSAP 3.14 + ScrollTrigger (sem Framer Motion / Lenis)
- `docs/plan/design-system.md` — Tokens Tailwind + CSS custom properties prontos
- `assets/brand/typography.md` — Manrope + Inter (Google Fonts)

---

## 1. Architecture Decision Records (ADRs)

### ADR-001 — Next.js 15 (App Router) + React Server Components

**Status:** Aceito
**Contexto:** Landing institucional estática (13 seções), com possível ISR no futuro para depoimentos/news. Requer SEO de excelência, performance Lighthouse >=95 e suporte a Open Graph dinâmico.

**Decisão:** Adotar Next.js 15 com App Router e RSC como padrão. Componentes interativos (animações, acordeões, analytics) marcados `'use client'`.

**Consequências:**
- (+) SSG/ISR padrão para todas as rotas marketing → HTML estático servido pelo edge
- (+) `generateMetadata`, `opengraph-image.tsx`, `sitemap.ts`, `robots.ts` nativos
- (+) Streaming SSR e suspense boundaries para componentes pesados (animações)
- (+) Mesma stack do PostFeito → familiaridade do time, padrões já validados
- (-) RSC exige cuidado com `'use client'` em componentes GSAP/animados
- (-) Build size maior que site estático puro (mitigado: code splitting automático)

**Alternativas rejeitadas:**
- Astro: excelente para landings estáticas, mas curva de aprendizado adicional e menor familiaridade
- Vite + React puro: SEO/SSR exige setup manual; sem ganho prático

---

### ADR-002 — Sem backend v1 (WhatsApp Direct)

**Status:** Aceito (D3 ratificada)
**Contexto:** Lead capture é o principal objetivo da landing. Diagnóstico é gratuito, sem fricção; produtos são personalizados. Anderson decidiu evitar formulários, banco de dados e backend nesta v1.

**Decisão:** Todos os 6 CTAs apontam para WhatsApp via deep links com mensagens pré-preenchidas:
```
https://wa.me/5582982359028?text=<URL-encoded message>
```
Helper centralizado em `src/lib/whatsapp.ts` monta URLs por contexto (diagnostico | essencial | completa | legado | objeções | footer).

**Consequências:**
- (+) Zero infraestrutura — sem Supabase, Postgres, API routes
- (+) Sem necessidade de cookies de sessão, JWT, autenticação
- (+) Conversão imediata — WhatsApp já é o canal preferido do público RFG
- (+) Tracking via `whatsapp_redirect` event (GA4 + Meta Pixel) antes do redirect
- (-) Nenhum lead persistido sistemicamente — depende de Anderson/Ricardo registrarem manualmente
- (-) Sem analytics de conversão pós-WhatsApp (mitigado: Meta Pixel pode rastrear conversão por outros sinais futuramente)

**Alternativas rejeitadas:**
- Formulário + Resend/Email: adiciona fricção e complexidade
- Supabase forms: overkill para v1
- Calendly embed: fora do tom (RFG quer conversa direta, não agendamento frio)

---

### ADR-003 — GSAP Lazy-Load com SSR Safeguards

**Status:** Aceito
**Contexto:** GSAP 3.14 (~67 KB gzipped) + ScrollTrigger (~23 KB) afetam o LCP se carregados no bundle inicial. Porém, `dynamic import` simples quebra o tipo `gsap.context()` durante SSR e gera flicker visual.

**Decisão:** Carregar GSAP no client via padrão híbrido:

1. Sections animadas são componentes `'use client'`
2. GSAP importado dinamicamente em `useEffect` ou via hook `useGSAP` (do `@gsap/react`)
3. ScrollTrigger registrado uma única vez no provider raiz client (`src/components/animations/AnimationsProvider.tsx`)
4. Cada section invoca `gsap.matchMedia()` para responsividade e `prefers-reduced-motion`
5. Pós-hidratação: `ScrollTrigger.sort()` + `ScrollTrigger.refresh()` em `requestAnimationFrame` para evitar layout calc antes de fonts/imagens

**Implementação canonical:**
```tsx
// src/components/animations/useScrollReveal.ts
'use client';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

export function useScrollReveal(opts?: { stagger?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(async () => {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add(
      { isMobile: '(max-width: 768px)', isDesktop: '(min-width: 769px)', reduceMotion: '(prefers-reduced-motion: reduce)' },
      (ctx) => {
        if (ctx.conditions?.reduceMotion) return; // sem animação
        gsap.from(containerRef.current!.querySelectorAll('[data-reveal]'), {
          y: 24, opacity: 0, duration: 0.7, ease: 'power2.out',
          stagger: opts?.stagger ?? 0.12,
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        });
      }
    );
    return () => mm.revert();
  }, { scope: containerRef });
  return containerRef;
}
```

**Consequências:**
- (+) GSAP fora do bundle initial → LCP otimizado
- (+) `useGSAP` cuida de cleanup automático (sem memory leaks)
- (+) `matchMedia` aplica/reverte regras por breakpoint sem reload
- (+) `prefers-reduced-motion` respeitado
- (-) Animações têm pequeno delay pós-hidratação (~100ms) — aceitável

**Alternativas rejeitadas:**
- GSAP no bundle principal: penalidade LCP de ~50-90ms
- Framer Motion: já decidido descartar (D1, decisão D11 implícita do effects-reference)
- IntersectionObserver puro: não cobre timelines complexas (counters, scrubbed pin, bento)

---

### ADR-004 — `next/image` + WebP (Otimização Automática)

**Status:** Aceito
**Contexto:** Fotos dos sócios chegam em PNG (1.2-2.2 MB). LCP exige imagem hero <300 KB. Lighthouse penaliza qualquer CLS por imagens sem dimensão.

**Decisão:**
- Todas as imagens raster servidas via `next/image` com `quality={85}`
- Conversão prévia PNG → WebP em `public/images/` (build-time via script `scripts/optimize-images.ts`)
- Hero socio: `priority={true}`, `fetchPriority="high"`, `placeholder="blur"`, `sizes="(max-width: 768px) 100vw, 50vw"`
- Demais imagens: lazy load default + `placeholder="blur"` com blurDataURL pré-gerado
- Logos parceiros: SVG inline para os 5 mais visíveis (above-the-fold da Seção 6); `next/image` para os demais

**Estratégia de fallback:**
- WebP primário, PNG como fallback automático via `next/image`
- AVIF habilitado em `next.config.ts` para Chrome/Edge modernos (~20% menor que WebP)

**Consequências:**
- (+) LCP <2.5s mesmo com hero photo
- (+) Zero CLS (dimensões explícitas)
- (+) Variants automáticas por viewport
- (-) Build mais lento (~30s extra para otimizar imagens) — mitigado: cache em CI

---

### ADR-005 — SEO + Structured Data (LocalBusiness + InsuranceAgency)

**Status:** Aceito
**Contexto:** Landing precisa rankear para queries locais "corretora de seguros Maceió", "consultoria seguros Alagoas". Google valoriza Schema.org JSON-LD para rich snippets.

**Decisão:** Implementar JSON-LD combinando `LocalBusiness` + `InsuranceAgency` em `src/app/layout.tsx`:

```jsonld
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "InsuranceAgency"],
  "@id": "https://www.rfgcorretora.com.br/#organization",
  "name": "RFG Corretora de Seguros",
  "url": "https://www.rfgcorretora.com.br",
  "logo": "https://www.rfgcorretora.com.br/logo-rfg.svg",
  "image": "https://www.rfgcorretora.com.br/og-image.jpg",
  "telephone": "+5582982359028",
  "email": "contato@rfgcorretora.com.br",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "<endereço a confirmar>",
    "addressLocality": "Maceió",
    "addressRegion": "AL",
    "postalCode": "<CEP>",
    "addressCountry": "BR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": -9.6498, "longitude": -35.7089 },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00", "closes": "18:00"
  }],
  "areaServed": { "@type": "State", "name": "Alagoas" },
  "founder": [
    { "@type": "Person", "name": "Ricardo Guimarães" },
    { "@type": "Person", "name": "Anderson Guimarães" }
  ],
  "sameAs": [
    "https://www.instagram.com/rfgcorretora",
    "https://wa.me/5582982359028"
  ],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Registro SUSEP",
    "recognizedBy": { "@type": "Organization", "name": "SUSEP — Superintendência de Seguros Privados" }
  }
}
```

**Componente helper:** `src/components/seo/OrganizationSchema.tsx` injeta o JSON-LD via `<Script type="application/ld+json" strategy="afterInteractive">`.

**Outros structured data:**
- `FAQPage` na Seção 13 (gera rich snippet de FAQ no Google)
- `BreadcrumbList` (futuro, quando houver páginas /privacidade /termos)

**Consequências:**
- (+) Rich snippets em SERPs (estrelas, FAQ, telefone clicável)
- (+) Google Maps / Knowledge Panel populados automaticamente
- (+) Confiança institucional reforçada (SUSEP visível)

---

### ADR-006 — Acessibilidade WCAG AA (mínimo)

**Status:** Aceito
**Contexto:** RFG atende público diverso (incluindo +50 anos). Acessibilidade é compliance LGPD/CDC e impacta SEO (Lighthouse a11y). Design system já garante contraste AAA na maioria das combinações.

**Decisão:** Target WCAG 2.1 AA com aspirações AAA onde possível:

| Critério | Implementação |
|---------|---------------|
| 1.1.1 Non-text content | `alt` descritivo em TODAS as imagens; `alt=""` apenas em decorativas |
| 1.3.1 Info and Relationships | HTML semântico: `<header><main><section><article><footer>` |
| 1.4.3 Contrast | Validado em design-system.md §2.7 — body 8.6:1, headlines 14.8:1 |
| 1.4.10 Reflow | Mobile-first responsivo; testar 320px |
| 1.4.11 Non-text Contrast | Borders, ícones, focus ring 3:1 mínimo |
| 1.4.12 Text Spacing | Tokens já configurados (line-height 1.6, letter-spacing positivo em uppercase) |
| 2.1.1 Keyboard | Todos os interativos navegáveis via Tab; FAQ acordeão via Enter/Space |
| 2.4.1 Bypass Blocks | Skip-to-content link no `<body>` |
| 2.4.2 Page Titled | `generateMetadata` em todas as rotas |
| 2.4.4 Link Purpose | `aria-label` descritivo nos CTAs ("Falar no WhatsApp sobre o Plano Essencial") |
| 2.4.6 Headings | 1 `<h1>` por página; hierarquia h2 → h3 sem saltos |
| 2.4.7 Focus Visible | Focus ring `--shadow-focus` em todos os interativos |
| 2.5.5 Target Size (AAA) | CTAs >=44x44px (sm 36px apenas para UI secundária) |
| 3.1.1 Language of Page | `<html lang="pt-BR">` |
| 4.1.2 Name, Role, Value | ARIA roles em acordeão FAQ (`aria-expanded`, `aria-controls`) |
| Reduced Motion | GSAP `matchMedia` com `(prefers-reduced-motion: reduce)` desativa animações |

**Ferramentas de validação:**
- ESLint plugin: `eslint-plugin-jsx-a11y`
- Lighthouse a11y audit (target >=95)
- axe DevTools manual em cada PR
- NVDA/VoiceOver smoke test antes do go-live

---

## 2. Estrutura de Pastas

```
rfg-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout: fonts, analytics, schema, providers
│   │   ├── page.tsx                    # Landing — composição das 13 seções
│   │   ├── opengraph-image.tsx         # OG dinâmico (1200x630, edge runtime)
│   │   ├── twitter-image.tsx           # Twitter Card (mesmas dimensões)
│   │   ├── icon.tsx                    # Favicon dinâmico (32x32)
│   │   ├── apple-icon.tsx              # Apple touch icon (180x180)
│   │   ├── robots.ts                   # robots.txt dinâmico
│   │   ├── sitemap.ts                  # sitemap.xml dinâmico
│   │   ├── manifest.ts                 # PWA manifest (futuro)
│   │   ├── privacidade/
│   │   │   └── page.tsx                # Política de Privacidade (LGPD)
│   │   ├── termos/
│   │   │   └── page.tsx                # Termos de Uso
│   │   └── api/
│   │       └── (vazio v1 — sem backend)
│   ├── components/
│   │   ├── sections/                   # 1 componente por seção da landing
│   │   │   ├── HeroSection.tsx                # Seção 1
│   │   │   ├── ProblemSection.tsx             # Seção 2
│   │   │   ├── OpportunitySection.tsx         # Seção 3
│   │   │   ├── PersonasSection.tsx            # Seção 4 (Para Quem É)
│   │   │   ├── ValuePropsSection.tsx          # Seção 5 (Proposta de Valor)
│   │   │   ├── ProofSection.tsx               # Seção 6 (Prova + Logos parceiros)
│   │   │   ├── OriginStorySection.tsx         # Seção 7 (História de Origem)
│   │   │   ├── HowItWorksSection.tsx          # Seção 8 (Como Funciona)
│   │   │   ├── OfferSection.tsx               # Seção 9 (Oferta sem preços)
│   │   │   ├── GuaranteeSection.tsx           # Seção 10 (Garantia)
│   │   │   ├── VisionSection.tsx              # Seção 11 (Visão de Futuro)
│   │   │   ├── ObjectionsSection.tsx          # Seção 12 (Objeções)
│   │   │   ├── FaqSection.tsx                 # Seção 13 (FAQ)
│   │   │   └── Footer.tsx
│   │   ├── ui/                         # Primitivas (drop-in do design-system.md)
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Eyebrow.tsx
│   │   │   ├── SectionHeader.tsx       # Eyebrow + H2 + Lead padrão
│   │   │   ├── Container.tsx           # narrow / wide
│   │   │   ├── AccordionItem.tsx       # FAQ item (a11y completo)
│   │   │   └── SkipLink.tsx            # Skip-to-content
│   │   ├── animations/                 # Wrappers GSAP
│   │   │   ├── AnimationsProvider.tsx  # Registra ScrollTrigger uma vez
│   │   │   ├── ScrollReveal.tsx        # Wrapper genérico fade-in stagger
│   │   │   ├── HeroTextReveal.tsx      # Stagger word-by-word (Effect 1)
│   │   │   ├── CardGridReveal.tsx      # Card stagger (Effect 2)
│   │   │   ├── ScrollPinned.tsx        # Pin desktop (Effect 3)
│   │   │   ├── CurveDivider.tsx        # Clip-path scroll (Effect 4)
│   │   │   ├── CounterTween.tsx        # Number tween (Effect 5)
│   │   │   ├── IconBurst.tsx           # Scale-in elastic (Effect 6)
│   │   │   ├── BentoGrid.tsx           # Bento timeline (Effect 7)
│   │   │   └── Marquee.tsx             # Infinite CSS marquee (Effect 8)
│   │   ├── analytics/
│   │   │   ├── GoogleAnalytics.tsx     # GA4 via next/script afterInteractive
│   │   │   ├── MetaPixel.tsx           # Meta Pixel (gated por consent)
│   │   │   ├── VercelAnalytics.tsx     # Vercel Analytics (built-in)
│   │   │   ├── ConsentBanner.tsx       # Cookie banner LGPD
│   │   │   └── ScrollDepthTracker.tsx  # 25/50/75/100% scroll
│   │   └── seo/
│   │       ├── OrganizationSchema.tsx  # LocalBusiness + InsuranceAgency JSON-LD
│   │       └── FaqSchema.tsx           # FAQPage JSON-LD
│   ├── lib/
│   │   ├── animations/
│   │   │   ├── timelines.ts            # Timelines reutilizáveis
│   │   │   ├── scrollTriggers.ts       # Configs ScrollTrigger comuns
│   │   │   └── easings.ts              # Curvas customizadas
│   │   ├── tracking.ts                 # Event helpers (cta_click, whatsapp_redirect, etc)
│   │   ├── whatsapp.ts                 # URL builder + mensagens pré-preenchidas
│   │   ├── consent.ts                  # Helpers de consentimento LGPD
│   │   └── utils.ts                    # cn(), classNames helpers
│   ├── styles/
│   │   ├── globals.css                 # Reset + base + @layer components
│   │   └── tokens.css                  # CSS custom properties (drop-in design-system.md)
│   ├── content/                        # Textos das seções (separados pra fácil edição)
│   │   ├── hero.ts
│   │   ├── problem.ts
│   │   ├── opportunity.ts
│   │   ├── personas.ts
│   │   ├── valueProps.ts
│   │   ├── proof.ts
│   │   ├── originStory.ts
│   │   ├── howItWorks.ts
│   │   ├── offer.ts
│   │   ├── guarantee.ts
│   │   ├── vision.ts
│   │   ├── objections.ts
│   │   ├── faq.ts
│   │   ├── footer.ts
│   │   └── partners.ts                 # Lista de seguradoras parceiras
│   ├── types/
│   │   ├── content.ts                  # Tipos para content/*
│   │   ├── analytics.ts                # Event types
│   │   └── seo.ts                      # Metadata types
│   └── hooks/
│       ├── useReducedMotion.ts
│       ├── useIntersection.ts
│       └── useConsent.ts
├── public/
│   ├── images/
│   │   ├── socios/                     # WebP otimizadas (<300KB)
│   │   │   ├── socios-perfil-rfg.webp
│   │   │   ├── socios-estudio.webp
│   │   │   ├── ricardo-perfil.webp
│   │   │   └── anderson-perfil.webp
│   │   ├── parceiros/                  # SVG inline + PNG fallback otimizado
│   │   │   ├── porto-seguro.svg
│   │   │   ├── yelum-seguros.svg
│   │   │   ├── bradesco-seguros.svg
│   │   │   ├── mapfre.webp
│   │   │   ├── allianz.svg
│   │   │   ├── akad-seguros.svg
│   │   │   ├── sulamerica.webp
│   │   │   ├── tokio-marine.svg
│   │   │   ├── suhai-seguradora.webp
│   │   │   └── hdi-seguros.svg
│   │   └── og-default.jpg              # Open Graph fallback (1200x630)
│   ├── fonts/                          # Self-hosted Manrope + Inter (variable)
│   │   ├── manrope-variable.woff2
│   │   └── inter-variable.woff2
│   ├── logo-rfg.svg                    # Logo vetorizado
│   ├── logo-rfg.png                    # Fallback raster
│   ├── favicon.ico
│   └── robots-default.txt              # (opcional, robots.ts dinâmico cobre)
├── scripts/
│   ├── optimize-images.ts              # Build: PNG → WebP via sharp
│   └── generate-blur-placeholders.ts   # Gera blurDataURL para next/image
├── docs/
│   ├── plan/                           # (já existente)
│   ├── prd/                            # PRD da landing
│   ├── stories/                        # Stories do desenvolvimento
│   └── briefing/                       # (já existente)
├── tests/
│   ├── e2e/                            # Playwright (smoke da landing)
│   │   ├── landing.spec.ts
│   │   └── whatsapp-cta.spec.ts
│   └── unit/
│       ├── whatsapp.test.ts
│       └── tracking.test.ts
├── .github/
│   └── workflows/
│       ├── ci.yml                      # Lint + typecheck + build on PR
│       └── lighthouse.yml              # Lighthouse CI on PR (opcional v1.1)
├── .vscode/
│   └── settings.json                   # Format on save, ESLint, Prettier
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── eslint.config.mjs                   # Flat config (ESLint 9+)
├── prettier.config.mjs
├── package.json
├── pnpm-lock.yaml                      # ou package-lock.json
├── .env.local.example
├── .env.local                          # gitignored
├── .gitignore
├── .nvmrc                              # node 20.x
├── vercel.json                         # Headers, redirects, regions
└── README.md
```

---

## 3. Performance Targets

### 3.1 Lighthouse (target obrigatório)

| Categoria | Target |
|----------|--------|
| Performance | **>= 95** |
| Accessibility | **>= 95** |
| Best Practices | **>= 95** |
| SEO | **= 100** |

### 3.2 Core Web Vitals (target Real User Monitoring via Vercel Speed Insights)

| Métrica | Target | Threshold "Good" (Google) |
|---------|--------|--------------------------|
| LCP (Largest Contentful Paint) | **< 2.5s** | < 2.5s |
| FID/INP (Interaction to Next Paint) | **< 100ms / < 200ms** | < 200ms (INP) |
| CLS (Cumulative Layout Shift) | **< 0.1** | < 0.1 |
| TBT (Total Blocking Time) | **< 200ms** | < 200ms |
| FCP (First Contentful Paint) | **< 1.8s** | < 1.8s |
| TTFB (Time to First Byte) | **< 600ms** (Vercel edge) | < 800ms |

### 3.3 Estratégias de Otimização

#### Imagens
- `next/image` com formato AVIF + WebP fallback automático
- Hero socio: `priority={true}`, `fetchPriority="high"`, `placeholder="blur"`, dimensões explícitas
- Sócios estúdio + cards individuais: `loading="lazy"` (default) com `placeholder="blur"`
- Logos parceiros: SVG inline para os 5 mais visíveis (above-the-fold)
- Build script `scripts/optimize-images.ts` (sharp) gera WebP <300KB para todas as fotos
- `sizes` prop correta em todas: `"(max-width: 768px) 100vw, 50vw"` ou similar

#### Fontes
- `next/font/google` para Manrope + Inter com `display: 'swap'`
- `subsets: ['latin']` (cobre pt-BR completo)
- `preload: true` apenas para Manrope 700 + Inter 400 (críticos para LCP)
- Variable fonts via woff2 → 2 requests apenas
- `adjustFontFallback: true` (Next.js auto-ajusta métricas pra evitar CLS)

```tsx
// src/app/layout.tsx
import { Manrope, Inter } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});
```

#### JavaScript
- GSAP via dynamic import (ADR-003) — fora do bundle initial
- Sections client-side apenas onde necessário; resto RSC
- `next/script strategy="afterInteractive"` para GA4 + Meta Pixel
- Tree shaking automático do Tailwind (purge via `content` config)
- React Compiler (experimental Next 15) — avaliar v1.1

#### CSS
- Tailwind purge automático (config em `tailwind.config.ts`)
- Tokens CSS como custom properties (zero runtime)
- `@tailwindcss/typography` apenas para Seções 2, 7, 11 (storytelling longo)
- Critical CSS inlined automaticamente pelo Next.js

#### Network
- Vercel Edge Network (Brasil GRU região mais próxima)
- HTTP/3 + Brotli compression
- `Cache-Control: public, max-age=31536000, immutable` para `_next/static/*`
- ISR `revalidate: 86400` (24h) para landing — força redeploy só em mudanças de copy

---

## 4. SEO + Metadados

### 4.1 Metadata Default (`src/app/layout.tsx`)

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://www.rfgcorretora.com.br'),
  title: {
    default: 'RFG Corretora de Seguros — Diagnóstico Patrimonial Gratuito | Maceió/AL',
    template: '%s | RFG Corretora de Seguros',
  },
  description: 'Consultoria de seguros premium em Maceió/AL. 35+ anos protegendo patrimônios em Alagoas. Diagnóstico gratuito sem compromisso. Atendimento direto com sócios — Ricardo e Anderson Guimarães.',
  keywords: [
    'corretora de seguros Maceió',
    'consultoria de seguros Alagoas',
    'seguro patrimonial AL',
    'corretora de seguros familiar',
    'diagnóstico patrimonial gratuito',
    'RFG Corretora',
  ],
  authors: [{ name: 'RFG Corretora de Seguros' }],
  creator: 'RFG Corretora de Seguros',
  publisher: 'RFG Corretora de Seguros',
  formatDetection: { email: false, address: false, telephone: true },
  alternates: {
    canonical: 'https://www.rfgcorretora.com.br',
    languages: { 'pt-BR': 'https://www.rfgcorretora.com.br' },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.rfgcorretora.com.br',
    siteName: 'RFG Corretora de Seguros',
    title: 'RFG Corretora de Seguros — Diagnóstico Patrimonial Gratuito',
    description: 'Consultoria de seguros premium em Maceió/AL. 35+ anos protegendo patrimônios em Alagoas.',
    images: [{
      url: '/opengraph-image',
      width: 1200,
      height: 630,
      alt: 'RFG Corretora de Seguros — Maceió/AL',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RFG Corretora de Seguros — Diagnóstico Patrimonial Gratuito',
    description: 'Consultoria de seguros premium em Maceió/AL.',
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};
```

### 4.2 Description (150-160 caracteres exatos)

```
Consultoria de seguros premium em Maceió/AL. 35+ anos protegendo patrimônios. Diagnóstico gratuito direto com os sócios. Sem fila, sem call center.
```
(154 caracteres)

### 4.3 robots.ts

```tsx
// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/_next/', '/admin/'] },
    ],
    sitemap: 'https://www.rfgcorretora.com.br/sitemap.xml',
    host: 'https://www.rfgcorretora.com.br',
  };
}
```

### 4.4 sitemap.ts

```tsx
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.rfgcorretora.com.br/', lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://www.rfgcorretora.com.br/privacidade', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://www.rfgcorretora.com.br/termos', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
```

### 4.5 Open Graph dinâmico (`opengraph-image.tsx`)

Gerado em edge runtime via `next/og` (ImageResponse). Composição: logo RFG + headline "Diagnóstico Patrimonial Gratuito" + gradiente da marca + foto sócios. 1200x630px.

### 4.6 Structured Data

- `OrganizationSchema.tsx` (ADR-005) injetado em layout root
- `FaqSchema.tsx` injetado dentro de `FaqSection` com perguntas/respostas mapeadas

---

## 5. Acessibilidade

Resumo aplicado (detalhamento em ADR-006):

```tsx
// src/app/layout.tsx
<html lang="pt-BR" dir="ltr">
  <body>
    <SkipLink href="#conteudo">Pular para o conteúdo</SkipLink>
    <main id="conteudo">{children}</main>
  </body>
</html>
```

**Padrões obrigatórios em cada PR:**
- ESLint plugin `jsx-a11y` zero warnings
- 1 `<h1>` único na landing (Hero)
- Hierarquia `<h2>` → `<h3>` sem saltos
- `<img alt="...">` descritivo (ou `alt=""` para decorativas)
- CTAs com `aria-label` contextual: `aria-label="Falar no WhatsApp sobre o Plano Essencial"`
- Acordeão FAQ: `<button aria-expanded={isOpen} aria-controls={panelId}>` + `<div role="region" id={panelId}>`
- Focus ring visível: `focus-visible:shadow-focus`
- Contraste mínimo: 4.5:1 body, 3:1 UI/large text — design-system.md já garante
- `prefers-reduced-motion` respeitado em todas as animações GSAP
- Lighthouse a11y >= 95 em CI bloqueia merge

---

## 6. Analytics e Tracking

### 6.1 Plataformas

| Plataforma | Uso | Setup |
|-----------|-----|-------|
| **Vercel Speed Insights** | Core Web Vitals RUM | Built-in, zero config |
| **Vercel Analytics** | Pageviews, navegação | Built-in, opt-in via dashboard |
| **GA4** | Eventos detalhados, conversões, funis | Property nova `rfgcorretora.com.br` (criar) |
| **Meta Pixel** | Retargeting + lookalike audiences | Pixel novo (criar via Business Manager) |

### 6.2 Eventos a Implementar

Helper centralizado em `src/lib/tracking.ts`:

```ts
type EventName =
  | 'cta_click'
  | 'whatsapp_redirect'
  | 'scroll_depth'
  | 'section_view'
  | 'faq_open'
  | 'partner_logo_click'
  | 'consent_granted'
  | 'consent_declined';

interface EventParams {
  cta_click: { category: 'hero' | 'secao_9' | 'secao_12' | 'footer'; label: string; destination: string };
  whatsapp_redirect: { destination: 'diagnostico' | 'essencial' | 'completa' | 'legado' | 'objecoes' | 'footer'; message: string };
  scroll_depth: { percent: 25 | 50 | 75 | 100 };
  section_view: { section_id: string; section_name: string };
  faq_open: { question_id: string; question: string };
  partner_logo_click: { partner: string };
  consent_granted: { categories: string[] };
  consent_declined: {};
}

export function trackEvent<E extends EventName>(name: E, params: EventParams[E]) {
  // GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params);
  }
  // Meta Pixel — apenas eventos de conversão e gated por consent
  if (typeof window !== 'undefined' && window.fbq && hasConsent('marketing')) {
    if (name === 'whatsapp_redirect') window.fbq('track', 'Lead', params);
    if (name === 'cta_click') window.fbq('track', 'InitiateCheckout', params);
  }
  // Vercel Analytics (built-in via track API)
  if (typeof window !== 'undefined' && window.va) {
    window.va('event', { name, ...params });
  }
}
```

### 6.3 Implementação por Componente

| Componente | Trigger | Evento |
|-----------|---------|--------|
| `<HeroCta>` | onClick | `cta_click` (category: 'hero') + `whatsapp_redirect` |
| `<OfferCard>` | onClick CTA | `cta_click` (category: 'secao_9') + `whatsapp_redirect` |
| `<ObjectionsCta>` | onClick | `cta_click` (category: 'secao_12') |
| `<FooterCta>` | onClick | `cta_click` (category: 'footer') |
| `<ScrollDepthTracker>` | IntersectionObserver | `scroll_depth` (debounced) |
| `<SectionWrapper>` | IntersectionObserver | `section_view` (uma vez por sessão) |
| `<AccordionItem>` (FAQ) | onClick header | `faq_open` |
| `<PartnerLogo>` | onClick | `partner_logo_click` |
| `<ConsentBanner>` | aceitar/recusar | `consent_granted` / `consent_declined` |

### 6.4 Funis a Configurar no GA4

- Funil principal: `section_view (hero)` → `scroll_depth (50%)` → `cta_click` → `whatsapp_redirect`
- Conversão: `whatsapp_redirect` marcado como conversion event (configurar no painel GA4)

---

## 7. Compliance & LGPD

### 7.1 Cookie Banner

Componente `<ConsentBanner>` exibido no primeiro acesso (verificado via `localStorage.rfg_consent`). Granularidade:

| Categoria | Padrão | Finalidade |
|-----------|--------|-----------|
| **Necessários** | Sempre ativo (não opcional) | Funcionamento do site |
| **Analytics** | Opt-in | GA4 (com IP anonimizado por padrão) |
| **Marketing** | Opt-in | Meta Pixel (carregado apenas se aceito) |

GA4 com `anonymize_ip: true` pode ser carregado sem consent explícito (interpretação conservadora — alguns juristas exigem opt-in para qualquer cookie não-essencial; conservador = opt-in para tudo exceto necessários).

**Implementação:**
- Banner aparece bottom-fixed, dismissível com 2 botões: "Aceitar todos" / "Personalizar"
- "Personalizar" abre modal com toggles por categoria
- Estado salvo em `localStorage.rfg_consent` (formato: `{analytics: true, marketing: false, timestamp: '...'}`)
- Re-validação anual (timestamp + 365d)

### 7.2 Páginas Legais

| Rota | Conteúdo |
|------|---------|
| `/privacidade` | Política de Privacidade LGPD: dados coletados (nenhum form, mas cookies analytics + WhatsApp redirect), finalidade, base legal (legítimo interesse + consentimento), direitos do titular, contato do encarregado (DPO) — Anderson ou Ricardo |
| `/termos` | Termos de Uso: condições de uso da landing, propriedade intelectual, ressalvas SUSEP (não substitui apólice), foro Maceió/AL |

### 7.3 Direitos do Titular (LGPD Art. 18)

- Botão "Solicitar exclusão dos meus dados" no footer → `mailto:contato@rfgcorretora.com.br?subject=Solicitação de exclusão de dados (LGPD)&body=...`
- Documentado em `/privacidade`

### 7.4 SUSEP Compliance

Disclaimer no footer:
```
RFG Corretora de Seguros — CNPJ XX.XXX.XXX/0001-XX
Registro SUSEP nº XXXXXXX. SUSEP é a Superintendência de Seguros Privados (susep.gov.br).
A presente página é meramente institucional. Apólices, coberturas e condições serão definidas em contrato específico assinado com seguradora parceira.
```

---

## 8. CI/CD

### 8.1 GitHub Actions — `ci.yml`

```yaml
name: CI
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm build
      - run: pnpm test
```

### 8.2 GitHub Actions — `lighthouse.yml` (opcional v1.1)

Lighthouse CI rodando sobre Vercel Preview Deploy URL via comentário automático no PR:
```yaml
- uses: treosh/lighthouse-ci-action@v11
  with:
    urls: ${{ steps.preview.outputs.url }}
    uploadArtifacts: true
    temporaryPublicStorage: true
```

Falha PR se Performance <95 ou Accessibility <95.

### 8.3 Branch Protection (main)

Configurar via GitHub → Settings → Branches:
- PR obrigatório (1 reviewer)
- Status checks obrigatórios: `quality`
- Sem force push
- Sem delete branch

### 8.4 Vercel Deploy

| Branch | Comportamento |
|--------|--------------|
| `main` | Auto-deploy production → `www.rfgcorretora.com.br` |
| `feature/*` | Auto-deploy preview com URL única |
| PRs | Comentário automático Vercel com URL preview |

`vercel.json`:
```json
{
  "regions": ["gru1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    }
  ],
  "redirects": [
    { "source": "/home", "destination": "/", "permanent": true }
  ]
}
```

### 8.5 DNS (Registro.br)

A configurar por @devops:
- A record: `rfgcorretora.com.br` → `76.76.21.21` (Vercel)
- CNAME: `www.rfgcorretora.com.br` → `cname.vercel-dns.com`
- Vercel project: domínio principal `www.rfgcorretora.com.br`, redirect `rfgcorretora.com.br` → `www.rfgcorretora.com.br`
- SSL: Let's Encrypt automático via Vercel

---

## 9. Variáveis de Ambiente

### 9.1 `.env.local.example`

```bash
# ============================================================================
# RFG Landing — Environment Variables
# ============================================================================
# Copie para .env.local e preencha. Variáveis prefixadas NEXT_PUBLIC_*
# são expostas ao client; demais ficam apenas no server.
# ============================================================================

# --- Analytics & Tracking ---
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=000000000000000

# --- Site & Contato ---
NEXT_PUBLIC_SITE_URL=https://www.rfgcorretora.com.br
NEXT_PUBLIC_WHATSAPP_NUMBER=5582982359028
NEXT_PUBLIC_CONTACT_EMAIL=contato@rfgcorretora.com.br

# --- SEO & Verification ---
GOOGLE_SITE_VERIFICATION=
META_DOMAIN_VERIFICATION=

# --- Feature Flags (futuro) ---
NEXT_PUBLIC_ENABLE_CONSENT_BANNER=true
NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS=true
```

### 9.2 Configuração no Vercel Dashboard

Todas as variáveis acima replicadas em Vercel → Settings → Environment Variables, escopo `Production`, `Preview` e `Development`.

---

## 10. Riscos Técnicos e Mitigações

| # | Risco | Probabilidade | Impacto | Mitigação |
|---|-------|--------------|---------|-----------|
| **R1** | **GSAP SSR hydration mismatch** — animação inicia antes da hidratação ou flicker visual entre SSR HTML e client-side mount | Alta | Médio | (a) Sections animadas marcadas `'use client'`; (b) GSAP carregado apenas dentro de `useGSAP` hook (que aguarda mount); (c) Estados iniciais via CSS inicial (`opacity: 0` aplicado no SSR; GSAP só remove); (d) `ScrollTrigger.refresh()` em `requestAnimationFrame` pós-hidratação. **Validação:** smoke test em Vercel Preview com throttle 3G — confirmar zero flicker. |
| **R2** | **CLS por fontes (FOUT/FOIT)** — Manrope/Inter trocam métricas durante swap, causando reflow | Média | Alto (LCP/CLS) | (a) `next/font/google` com `adjustFontFallback: true` (auto-ajusta size-adjust + ascent/descent); (b) `display: 'swap'`; (c) `preload: true` para weights críticos; (d) Self-host como fallback caso `next/font` em algum momento falhe; (e) Lighthouse CI bloqueia PR se CLS >0.1. **Validação:** WebPageTest com filmstrip — observar transição de fallback → Manrope sem layout jump. |
| **R3** | **CLS por imagens sem dimensão** — `next/image` exige `width`/`height` ou `fill`. Erro comum: passar URL string sem dimensões | Média | Alto (CLS) | (a) ESLint rule custom: `next/image` deve ter `width+height` ou `fill+sizes`; (b) Build script `generate-blur-placeholders.ts` calcula dimensões automaticamente e gera tipos TypeScript; (c) Hero com `priority + fetchPriority="high"`; (d) Aspect ratio CSS reservado em containers (`aspect-[4/3]` Tailwind). **Validação:** Lighthouse CLS <0.1 em todas as PRs. |
| **R4** | **Bundle size excede budget** — GSAP + ScrollTrigger + plugins podem inflar o JS inicial se mal lazy-loaded | Média | Médio (LCP/TBT) | (a) Dynamic import GSAP por componente (não no provider); (b) Bundle analyzer (`@next/bundle-analyzer`) em CI; (c) Budget: initial JS <100KB gzipped; (d) Tree-shake plugins GSAP (importar só `ScrollTrigger`, não `gsap/all`); (e) Code splitting por section automático via Next.js. **Validação:** `pnpm build` mostra First Load JS <100KB shared + <50KB por route. |
| **R5** | **Vercel preview com domínio diferente quebra Meta Pixel / GA4 sandbox** — eventos batem em preview e contaminam métricas de produção | Baixa | Médio | (a) Meta Pixel + GA4 carregados apenas se `process.env.VERCEL_ENV === 'production'` OU NEXT_PUBLIC_SITE_URL bate com window.location.host; (b) Em preview/dev, console.log dos eventos via debug helper; (c) Documentar em README; (d) `.env.preview` separa IDs (Meta Pixel sandbox + GA4 property de teste). **Validação:** Inspecionar Network tab em Vercel Preview — confirmar zero requests para `google-analytics.com` e `facebook.com/tr`. |

### 10.1 Riscos secundários monitorados (não bloqueantes v1)

- **R6:** WhatsApp deep link comportamento iOS Safari vs Chrome Android — testar em devices reais antes do go-live
- **R7:** Domínio `.com.br` propagação DNS pode levar até 24h — agendar deploy com janela de tolerância
- **R8:** SUSEP número fictício no footer até Anderson confirmar registro real — bloqueador de go-live (não técnico)

---

## 11. Stack Final Consolidada (Sumário)

| Camada | Tecnologia | Versão | Justificativa |
|--------|-----------|--------|---------------|
| Framework | Next.js | 15.x | App Router + RSC + SSG/ISR |
| Runtime | Node.js | 20.x LTS | Vercel default |
| Linguagem | TypeScript | 5.x | strict mode |
| Estilo | Tailwind CSS | 3.4.x | Tokens RFG via CSS custom properties |
| Animações | GSAP | 3.14.x | + @gsap/react 2.x (useGSAP hook) |
| Imagens | next/image | nativo | AVIF + WebP automático |
| Fontes | next/font/google | nativo | Manrope + Inter variable |
| Testes E2E | Playwright | 1.x | Smoke + WhatsApp CTA |
| Testes Unit | Vitest | 2.x | tracking + whatsapp helpers |
| Lint | ESLint | 9.x | flat config + jsx-a11y |
| Format | Prettier | 3.x | + tailwind plugin |
| Package Manager | pnpm | 9.x | mais rápido + workspaces ready |
| Deploy | Vercel | - | edge GRU1, mesma conta `abguimaraes` |
| DNS | Registro.br | - | A/CNAME para Vercel |
| Analytics | GA4 + Meta Pixel + Vercel | - | Criar properties novas |

---

## 12. Próximos Passos (Handoff)

1. **@pm (Morgan)** — Escrever PRD enxuto baseado nesta arquitetura (`docs/prd/rfg-landing-prd.md`)
2. **@po (Pax)** — Validar PRD (ciclo PM→PO→PM obrigatório por regra Anderson)
3. **@sm (River)** — Draft das stories (~6-8 stories conforme execution plan)
4. **@po (Pax)** — Validar stories (10-point checklist)
5. **@devops (Gage)** — Setup repo `abguimaraes/rfg-landing` + Vercel project + DNS
6. **@dev (Dex)** — Implementação por ondas (A, B, C, D conforme execution plan §3.3)

---

## 13. Changelog

| Data | Versão | Autor | Mudança |
|------|--------|-------|---------|
| 2026-05-05 | 1.0 | Aria | Documento inicial — ADR-001..006, estrutura, performance, SEO, a11y, analytics, LGPD, CI/CD, riscos |
