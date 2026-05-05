# RFG Corretora de Seguros — Landing v1

Landing page institucional da **RFG Corretora de Seguros** — Maceió/AL.
Captação de leads via WhatsApp, sem backend, sem formulários.

> **Status:** em construção (Story 1.1 concluída — fundação do projeto)
> **Domínio (futuro):** [www.rfgcorretora.com.br](https://www.rfgcorretora.com.br)

---

## Stack

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| Framework | [Next.js](https://nextjs.org) (App Router + RSC) | 15.x |
| Runtime | Node.js | 20.x LTS |
| Linguagem | TypeScript (strict) | 5.x |
| Estilo | Tailwind CSS + tokens RFG (CSS custom properties) | 3.4.x |
| Animações | GSAP + `@gsap/react` (lazy-load via dynamic import) | 3.14.x |
| Imagens | `next/image` (AVIF + WebP automático) | nativo |
| Fontes | `next/font/google` — Manrope (display) + Inter (body) | nativo |
| Lint | ESLint 9 (flat config) + `jsx-a11y` | 9.x |
| Format | Prettier 3 + `prettier-plugin-tailwindcss` | 3.x |
| Package Manager | pnpm | 9.x |
| Deploy | Vercel (região GRU1) | — |
| Analytics | GA4 + Meta Pixel + Vercel Speed Insights | — |

---

## Comandos

```bash
# Instalar dependências
pnpm install

# Rodar em modo desenvolvimento (porta 3000)
pnpm dev

# Build de produção
pnpm build

# Iniciar em modo produção (após build)
pnpm start

# Lint (ESLint + jsx-a11y, zero warnings)
pnpm lint

# Type check (tsc --noEmit, strict + noUncheckedIndexedAccess)
pnpm typecheck

# Formatar (Prettier + tailwindcss plugin)
pnpm format
```

---

## Variáveis de Ambiente

Copie `.env.local.example` para `.env.local` e preencha. As variáveis prefixadas com `NEXT_PUBLIC_*` são expostas no client; as demais ficam apenas no server.

| Variável | Descrição | Quando preencher |
|----------|-----------|------------------|
| `NEXT_PUBLIC_GA4_ID` | ID GA4 (`G-XXXXXXXXXX`) | Story 1.7 (analytics) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Pixel ID Meta (Business Manager) | Story 1.7 |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número WhatsApp (formato 55+DDD+número) | Já preenchido (5582982359028) |
| `NEXT_PUBLIC_SITE_URL` | URL canônica em produção | Story 1.8 (go-live) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | E-mail comercial | Já preenchido (comercial@rfgcorretora.com.br) |
| `GOOGLE_SITE_VERIFICATION` | Token de verificação Google Search Console | Story 1.8 |
| `META_DOMAIN_VERIFICATION` | Token Meta Business | Story 1.8 |
| `NEXT_PUBLIC_ENABLE_CONSENT_BANNER` | Toggle banner LGPD | Default `true` |
| `NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS` | Toggle Vercel Analytics | Default `true` |

> **R5 (Risco):** GA4/Pixel só carregam quando `process.env.VERCEL_ENV === 'production'` (ou hostname bate com `NEXT_PUBLIC_SITE_URL`). Em preview/dev, eventos são apenas `console.log` (debug). Implementação completa virá na Story 1.7.

---

## Estrutura de Pastas

```
src/
├── app/                    # App Router (RSC default)
│   ├── layout.tsx          # Root layout: fonts (Manrope+Inter), metadata, skip-link
│   ├── page.tsx            # Landing — placeholder "Em construção"
│   ├── robots.ts           # robots.txt dinâmico
│   └── sitemap.ts          # sitemap.xml dinâmico
├── components/
│   ├── sections/           # Seções da landing (Story 1.3+)
│   ├── ui/                 # Primitivas (Button, Card, Badge, etc — Story 1.2)
│   ├── animations/         # Wrappers GSAP (Story 1.5)
│   ├── analytics/          # GA4, Meta Pixel, ConsentBanner (Story 1.7)
│   └── seo/                # JSON-LD schemas (Story 1.6)
├── lib/                    # Helpers (whatsapp, tracking, utils)
├── styles/
│   ├── globals.css         # Tailwind + base + components layer
│   └── tokens.css          # CSS custom properties (drop-in design-system.md)
├── content/                # Textos das seções (Story 1.3+)
├── types/                  # TypeScript types
└── hooks/                  # React hooks customizados

public/
├── images/
│   ├── socios/             # Fotos sócios (WebP otimizado)
│   └── parceiros/          # Logos seguradoras (SVG/WebP)
├── fonts/                  # Self-hosted fallback (next/font cobre)
├── logo-rfg.png            # Logo raster (SVG vem na Story 1.2)
└── favicon.ico             # (gerado dinamicamente em Story 1.6)
```

Ver mapa completo em [`docs/plan/architecture.md`](docs/plan/architecture.md) §2.

---

## Arquitetura

- **ADR-001:** Next.js 15 + App Router + RSC — `'use client'` apenas onde necessário
- **ADR-002:** Sem backend v1 — todos os CTAs apontam para WhatsApp via deep link
- **ADR-003:** GSAP lazy-load via `@gsap/react` `useGSAP` hook + `gsap.matchMedia()`
- **ADR-004:** `next/image` com AVIF + WebP automático, `placeholder="blur"`
- **ADR-005:** JSON-LD `LocalBusiness` + `InsuranceAgency` para SEO local
- **ADR-006:** WCAG AA mínimo (AAA onde possível), `jsx-a11y` zero warnings em CI

Detalhes em [`docs/plan/architecture.md`](docs/plan/architecture.md).

---

## Performance Targets

| Métrica | Target |
|---------|--------|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | = 100 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| First Load JS (shared) | < 100 KB gzipped |

---

## Deploy

- **Branch `main`** → auto-deploy production na Vercel
- **Branches `feature/*` / PRs** → preview deploy automático com URL única
- **Região:** `gru1` (Brasil) — config em `vercel.json`
- **Headers de segurança:** X-Frame-Options, CSP nosniff, HSTS preload (vercel.json)

Domínio `www.rfgcorretora.com.br` será apontado na Story 1.8 (go-live).

---

## Contatos

- **WhatsApp:** [+55 (82) 98235-9028](https://wa.me/5582982359028)
- **E-mail comercial:** [comercial@rfgcorretora.com.br](mailto:comercial@rfgcorretora.com.br)
- **Localização:** Maceió/AL · 35+ anos protegendo patrimônios em Alagoas

---

## Licença

Privado — Direitos reservados RFG Corretora de Seguros.
