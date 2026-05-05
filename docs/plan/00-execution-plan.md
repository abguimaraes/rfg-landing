# RFG Landing — Plano de Execução

> Criado em 2026-05-05 por Orion. Projeto: landing page institucional da RFG Corretora de Seguros, com deploy em `www.rfgcorretora.com.br`.

---

## Premissas Confirmadas

| Item | Decisão |
|------|---------|
| Domínio | `www.rfgcorretora.com.br` (Anderson é proprietário) |
| Pacotes/preços | **Não exibir valores.** Diagnóstico é gratuito; produtos são personalizados. Reescrever Seção 9 |
| Logos parceiros | 10 seguradoras: Porto, Yelum, Bradesco, Mapfre, Allianz, Akad, SulAmérica, Tokio Marine, Suhai, HDI — scraping institucional |
| Vídeo institucional | ❌ Não nesta versão |
| Logo RFG | ✓ `assets/brand/logo-rfg.png` |
| Depoimentos | Os 3 já enviados (Rômulo, Rodrigo, Marcos Roberto) — sem dados numéricos |
| Paleta | ✓ Definida em `assets/brand/colors.md` (gradiente azul + branco) |
| Tipografia | **A criar por agente** (@ux-design-expert) |
| Efeitos | Reaproveitar do **PostFeito** (GSAP, bento grid, animações) — preservados como sagrados (memória) |

---

## Stack Recomendada (a ratificar com Aria)

| Camada | Decisão proposta | Motivo |
|--------|------------------|--------|
| Framework | **Next.js 15 (App Router)** | Mesma stack do PostFeito → componentes/efeitos diretos sem reescrita |
| Estilo | **Tailwind CSS** + CSS custom properties (paleta RFG) | Consistente com PostFeito |
| Animações | **GSAP + Framer Motion** | Mesmo conjunto da landing PostFeito |
| Deploy | **Vercel** (auto-deploy via GitHub) | Anderson já usa, CI/CD pronto |
| Repo | `abguimaraes/rfg-landing` (GitHub privado) | A criar por @devops |
| DNS | Apontar `www.rfgcorretora.com.br` → Vercel | A executar por @devops |
| Forms/CTA | WhatsApp direto (sem backend) | Sem necessidade de Supabase nesta v1 |
| Analytics | Vercel Analytics + Meta Pixel + Google Analytics 4 | Padrão para landing de captação |

**Decisão a tomar:** Backend para captura de leads via formulário, ou apenas WhatsApp direto? Recomendo **WhatsApp puro v1** (sem fricção, sem backend, faz parte do diferencial "acesso direto") e formulário em v2 se necessário.

---

## Fases do Projeto

### **FASE 0 — Research & Validação** (paralela, ~3-4h)

#### 0.1 — Auditoria da copy entregue
**Agente:** `@pm` (Morgan)
**Output:** `docs/plan/copy-audit.md`
- Validar correção gramatical, fluidez, compliance SUSEP
- Aplicar lista de palavras proibidas (`01-dna-completo.md`)
- Adaptar Seção 9 (remover preços, posicionar como "Diagnóstico Gratuito + Plano Personalizado")
- Sugerir pequenos ajustes de tom (alinhamento com DNA de voz)

#### 0.2 — Research efeitos PostFeito
**Agente:** `@analyst` (Alex)
**Output:** `docs/plan/postfeito-effects-inventory.md`
- Inventariar GSAP timelines, bento grid layouts, scroll triggers, micro-animações da landing PostFeito
- Mapear quais efeitos transplantam direto e quais precisam adaptação
- Listar dependencies (`gsap`, `lenis`, `framer-motion`, etc) com versões pinadas
- ⚠️ **CRÍTICO da memória:** efeitos GSAP, layout, bento grid, animações são **sagrados** — preservar fielmente

#### 0.3 — Scraping logos seguradoras parceiras
**Agente:** `@analyst` (Alex)
**Output:** `assets/brand/parceiros/` (SVG/PNG) + `docs/plan/parceiros-fontes.md`
- 10 sites institucionais: Porto, Yelum, Bradesco, Mapfre, Allianz, Akad, SulAmérica, Tokio Marine, Suhai, HDI
- Preferir SVG (escalável); fallback PNG transparente
- ⚠️ **Compliance jurídico:** uso de logo de parceiros em landing institucional. Anderson confirmou parceria comercial real com essas seguradoras — uso é legítimo. Documentar fonte de cada logo.

#### 0.4 — Sistema visual & tipografia
**Agente:** `@ux-design-expert` (Uma)
**Output:** `docs/plan/design-system.md` + `assets/brand/typography.md`
- Escolher tipografia primária + secundária (sugestão preliminar: **Inter** ou **Poppins** para body, **Playfair Display** ou **Manrope** para headlines — confiável, premium, legível)
- Definir paleta complementar (greys, off-whites, success/error)
- Definir escala tipográfica (h1 → small)
- Spacing system (4px / 8px base)
- Justificar escolhas com base no DNA "fraternal + premium + confiável"

---

### **FASE 1 — Design & Wireframes** (~2-3h)

#### 1.1 — Wireframes das 13 seções
**Agente:** `@ux-design-expert` (Uma)
**Output:** `docs/plan/wireframes.md`
- Layout de cada seção (mobile-first)
- Posicionamento de fotos dos sócios (hero = `socios-01-perfil-rfg.png`; história = `socios-02-estudio.png`; cards individuais = `ricardo-01` + `anderson-01`)
- Definir onde cada efeito do PostFeito entra
- Footer com endereço, CNPJ, contatos, SUSEP

#### 1.2 — Arquitetura técnica
**Agente:** `@architect` (Aria)
**Output:** `docs/plan/architecture.md`
- ADR stack (Next.js 15 / Tailwind / GSAP / Vercel)
- Estrutura de pastas (`src/app`, `src/components/sections`, `src/lib/animations`)
- Estratégia de imagens (next/image + WebP, lazy loading, blur placeholders)
- Performance targets: Lighthouse 95+, LCP <2.5s, CLS <0.1
- SEO: metadata por seção, Open Graph, structured data (LocalBusiness + InsuranceAgency)
- Acessibilidade: WCAG AA mínimo

---

### **FASE 2 — Definição Formal** (~2h)

#### 2.1 — PRD enxuto
**Agente:** `@pm` (Morgan)
**Output:** `docs/prd/rfg-landing-prd.md`
- 1 Epic: "RFG Landing v1 — Captação via WhatsApp"
- ~6-8 stories: setup repo, design system, hero+seções 1-3, seções 4-7, seções 8-10, seções 11-13, footer+SEO, deploy

#### 2.2 — Validação PRD
**Agente:** `@po` (Pax)
**Output:** Audit findings
- Ciclo PM→PO→PM (regra Anderson)
- Aprovar ou retornar com revisão

#### 2.3 — Drafting stories
**Agente:** `@sm` (River)
**Output:** `docs/stories/*.story.md`
- Cada story com AC claros, file list, complexity estimate

#### 2.4 — Validação stories
**Agente:** `@po` (Pax)
**Output:** Validation report
- 10-point checklist por story
- GO / NO-GO

---

### **FASE 3 — Implementação** (~6-10h, com paralelismo)

#### 3.1 — Setup do repositório
**Agente:** `@devops` (Gage)
**Output:** Repo `abguimaraes/rfg-landing` no GitHub + Vercel project conectado
- Next.js 15 boilerplate
- Tailwind + tokens RFG
- ESLint, Prettier, TypeScript strict
- GitHub Actions: lint + typecheck on PR

#### 3.2 — Design system implementado
**Agente:** `@dev` (Dex)
**Output:** `src/styles/`, `src/components/ui/`
- Tokens CSS, tipografia, paleta
- Botões, inputs, cards primitives
- GSAP setup + animation utilities

#### 3.3 — Implementação das 13 seções (paralelizada em ondas)
**Agente:** `@dev` (Dex) — possivelmente N pipelines em worktree isolado se YOLO total

| Onda | Stories paralelas | Conflito potencial |
|------|------------------|--------------------|
| Onda A | Hero (1), Problema (2), Oportunidade (3) | Nenhum — seções independentes |
| Onda B | Para Quem (4), Valor (5), Prova (6), Origem (7) | Nenhum — seções independentes |
| Onda C | Como Funciona (8), Oferta sem-preço (9), Garantia (10) | Nenhum |
| Onda D | Visão (11), Dúvidas (12), FAQ (13) + Footer | FAQ acordeão precisa cuidado |

⚠️ **Lição aprendida da memória 2026-05-04:** YOLO total paralelo em working tree único causa race. **Usar `git worktree` por pipeline OU serializar.**

#### 3.4 — Otimização de imagens
**Agente:** `@dev` (Dex)
**Output:** `public/images/`
- Conversão fotos sócios PNG → WebP (1.2-2.2 MB → <300 KB)
- Múltiplas resoluções (`@1x`, `@2x`)
- Logo RFG em SVG (vectorizar) + PNG fallback
- Logos parceiros otimizados

---

### **FASE 4 — QA & Polish** (~2-3h)

#### 4.1 — QA gate completo
**Agente:** `@qa` (Quinn)
**Output:** QA report + gate decision
- Lighthouse audit (perf + a11y + SEO)
- Cross-browser (Chrome, Safari, Firefox, Edge)
- Mobile (iOS Safari, Android Chrome)
- Animações em mobile (GSAP performance)
- WhatsApp links em todos os CTAs
- Verificar todos os 6 CTAs apontam pra mensagens corretas
- Compliance SUSEP (palavras proibidas)

#### 4.2 — Fix iterativo
**Agente:** `@dev` (Dex) → `@qa` (Quinn) — QA Loop max 5 iterações

---

### **FASE 5 — Deploy & Go-Live** (~1-2h)

#### 5.1 — Deploy preview
**Agente:** `@devops` (Gage)
- Push branch `main` → Vercel auto-deploy preview
- Validar URL preview com Anderson (smoke ativo)

#### 5.2 — Configuração de domínio
**Agente:** `@devops` (Gage)
**Pendência:** Anderson precisa confirmar **onde o domínio está hospedado hoje**:
- Se Registro.br + nameservers próprios → apontar A/AAAA records pra Vercel
- Se está apontado pra outro host (HostGator, GoDaddy, etc) → migrar nameservers ou alterar A records
- Se já existe site na raiz → migrar/redirecionar

**Tarefas:**
- Adicionar domínio no Vercel (`www.rfgcorretora.com.br` + redirect de `rfgcorretora.com.br`)
- Configurar SSL automático (Vercel Let's Encrypt)
- Validar propagação DNS (~15min a 24h)
- Testar redirects (raiz → www)

#### 5.3 — Analytics & tracking
**Agente:** `@devops` (Gage)
- Vercel Analytics (built-in)
- Google Analytics 4 (Anderson precisa fornecer GA4 ID ou criar)
- Meta Pixel (Anderson precisa fornecer Pixel ID ou criar)
- Eventos de conversão: clique em cada CTA WhatsApp

#### 5.4 — Go-live final
**Agente:** `@devops` (Gage)
- DNS validado → produção live
- Smoke real Anderson navegando em mobile + desktop
- Checklist completo de deploy

---

## Estimativa de Tempo

| Fase | Wall-clock estimado | Paralelizável |
|------|---------------------|---------------|
| Fase 0 — Research | 3-4h | ✓ (4 agentes em paralelo) |
| Fase 1 — Design | 2-3h | Parcial |
| Fase 2 — Definição | 2h | — |
| Fase 3 — Implementação | 6-10h | ✓ (4 ondas, worktree por pipeline) |
| Fase 4 — QA | 2-3h | — |
| Fase 5 — Deploy | 1-2h | — |
| **Total** | **16-24h** | |

**Em sessão única YOLO:** 1-2 dias de trabalho intenso. **Em sessões fracionadas:** 4-6 sessões de 4h.

---

## Mapa de Agentes

| Fase | Agentes | Responsabilidade |
|------|---------|------------------|
| 0 — Research | `@pm` `@analyst` `@ux-design-expert` | Auditoria, scraping, design system |
| 1 — Design | `@ux-design-expert` `@architect` | Wireframes + arquitetura |
| 2 — Definição | `@pm` `@po` `@sm` | PRD + stories validadas |
| 3 — Implementação | `@dev` `@devops` | Código + setup repo |
| 4 — QA | `@qa` `@dev` | Validation + fix loop |
| 5 — Deploy | `@devops` | Vercel + DNS + analytics |

**Orquestração:** Eu (Orion) coordeno tudo, disparo agentes, consolido outputs, mantenho contexto. Anderson decide só nas portas de qualidade (PRD GO/NO-GO, design GO, deploy GO).

---

## Decisões Ratificadas (2026-05-05)

| # | Decisão |
|---|---------|
| D1 | ✓ Stack: **Next.js 15 + Tailwind + GSAP + Vercel** |
| D2 | ✓ Repo privado `abguimaraes/rfg-landing` (a criar por @devops) |
| D3 | ✓ Lead capture: **só WhatsApp direto v1** |
| D4 | ✓ Domínio: **Registro.br** com nameservers default → apontar A/AAAA records pra Vercel |
| D5 | ✓ **Domínio limpo** — nenhum site rodando atualmente, deploy direto sem migração |
| D6 | ✓ GA4 + Meta Pixel: **criar do zero** (Gage cria contas + integra) |
| D7 | ✓ **Spec Pipeline curto** — projeto novo merece definição formal (PM→PO→SM→PO) |
| D8 | ✓ GitHub: conta `abguimaraes` (mesma do PostFeito) |
| D9 | ✓ Vercel: **mesma conta** dos outros projetos (Anderson) — cada projeto é deploy isolado com domínio próprio, sem mistura |
| D10 | ✓ **Repo público (decisão 2026-05-05).** `abguimaraes/rfg-landing` virou público + LICENSE MIT para liberar Branch Protection no GitHub Free (Opção A vs Pro/$4 mês ou ruleset bloqueado). Justificativa: landing institucional sem secrets/IP sensível. Branch protection aplicada via `gh api PUT /branches/main/protection`. Documentação: `docs/plan/github-branch-protection.md`. Story 1.1 AC-2 ✅ resolvido. |

## ⚠️ Separação de Projetos — RFG ≠ PostFeito

**Crítico (registrado em memória 2026-05-05):** RFG Landing é projeto **completamente independente** do PostFeito:
- Repo separado (`abguimaraes/rfg-landing`)
- Domínio separado (`www.rfgcorretora.com.br`)
- Codebase 100% novo — zero importação de código do PostFeito
- Stack pode coincidir (Next.js + Tailwind + GSAP) por se tratar de boas práticas comuns, não por dependência

**O que o PostFeito é nesta jornada:** apenas **referência visual** dos efeitos GSAP/scroll/bento que Anderson curtiu. O agente vai inventariar os PADRÕES (tipos de animação, timing, scroll triggers) e **reimplementar do zero** no rfg-landing — sem copiar código.

---

## Fase 0 — Disparada em paralelo

4 agents ortogonais rodando simultaneamente:
1. **Audit + reescrita copy** (sem preços na Seção 9)
2. **Inventário de padrões de efeitos** (referência visual PostFeito → reimplementação)
3. **Scraping logos parceiros** (10 seguradoras)
4. **Design system + tipografia** (definição completa)
