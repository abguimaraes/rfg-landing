# Stories Validation Report — RFG Landing v1

> **Autor:** Pax (PO Agent) · **Data:** 2026-05-05
> **Escopo:** Validação 10-point checklist das 8 stories draftadas por River
> **Inputs:** PRD v0.2 (10/10 ratificado), copy-canônica `05-copy-landing.md`, `architecture.md`, `wireframes.md`, `design-system.md`
> **Stories validadas:** `1.1` a `1.8` em `docs/stories/`

---

## Sumário Executivo

| Métrica | Valor |
|---------|-------|
| Stories validadas | 8 / 8 |
| Score médio | **9.6 / 10** |
| Findings Major (M) | **2** |
| Findings minor (m) | **9** |
| FRs órfãos (sem story) | **0** |
| CONs órfãos | **0** |
| Veredito | **🟢 GO com 2 ajustes minor pré-Story 1.1 + 1 ajuste minor pré-Story 1.4** |

**Recomendação final:** Pipeline sequencial 1.1 → 1.8 com 2 ajustes minor antes de Dex pegar 1.1. Não paralelizar 1.4-1.6 (dependência hard de copy + content state acumulado).

---

## Validação Por Story (10-Point Checklist)

### Story 1.1 — Setup Foundation (Repo + Next.js + Tokens + CI)
**Score: 10 / 10**

| # | Critério | Avaliação |
|---|---------|-----------|
| 1 | User Story clara | ✅ "Como dev RFG... para fundação estável da 1.2-1.8" |
| 2 | AC binário e testável | ✅ 20 ACs todos verificáveis (CI green / Lighthouse ≥95 / branch protection ativa) |
| 3 | Tasks concretas | ✅ 20 tasks T1-T20 executáveis sem ambiguidade |
| 4 | File List explícito | ✅ 31 arquivos novos listados com `.gitkeep` por pasta |
| 5 | Dev Notes completos | ✅ Cita ADR-001/004/006, CON-009/010/011, FR-051/052, Risco R2/R5 |
| 6 | Testing strategy | ✅ Manual Anderson (Lighthouse + push --force bloqueado); E2E vazio justificado |
| 7 | DoD coerente | ✅ 9 itens alinhados com QG 9.1 + 9.2 do PRD |
| 8 | Cobertura FRs/CONs | ✅ FR-051, FR-052, NFR-022, NFR-024, NFR-025, CON-009/010/011/012, CON-014 |
| 9 | Dependências corretas | ✅ Sem dependências (story de abertura); blocks 1.2-1.8 |
| 10 | Complexidade razoável | ⚠️ Header diz "L (10-14h)" mas resumo do PRD §8.1 diz "M". Discrepância cosmética |

**Findings:**
- **m1 (cosmetic):** Linha 5 do header diz "Complexity: L" mas roadmap PRD §8.1 diz "M". 20 ACs justificam L. **Ação:** atualizar PRD §8.1 de M para L OU reduzir 20 ACs para M (recomenda-se manter L; ajustar PRD).

**Pré-requisito hard:** Nenhum.

---

### Story 1.2 — UI Primitives + Analytics + Helpers + Tipografia
**Score: 10 / 10**

| # | Critério | Avaliação |
|---|---------|-----------|
| 1 | User Story clara | ✅ "Como dev RFG... para 1.3-1.6 montarem 13 seções compondo primitives prontos" |
| 2 | AC binário e testável | ✅ 25 ACs, AC-21 testa URL exata por chave (incluindo `%C3%A1`, `%E2%80%94`) |
| 3 | Tasks concretas | ✅ 26 tasks T1-T26; cada componente tem task dedicada |
| 4 | File List explícito | ✅ 26 novos + 3 modificados |
| 5 | Dev Notes completos | ✅ ADR-003, CON-015, Risco R5, FR-046 LGPD, FR-021 mensagens literais |
| 6 | Testing strategy | ✅ Unit (whatsapp.test + tracking.test) + E2E `/dev/components` + Manual Anderson |
| 7 | DoD coerente | ✅ 9 itens incluindo bundle <100KB + GSAP fora do shared |
| 8 | Cobertura FRs/CONs | ✅ FR-021/022/023, FR-040, FR-041..048, FR-051, NFR-026, CON-015 |
| 9 | Dependências corretas | ✅ Depends 1.1; blocks 1.3-1.7 |
| 10 | Complexidade razoável | ✅ L (12-16h) compatível com 25 ACs + 26 tasks + 2 test files |

**Findings:** zero.

**Pré-requisito hard:** Nenhum (contínuo da 1.1).

---

### Story 1.3 — Seções 1-3 (Hero + Problema + Oportunidade)
**Score: 10 / 10**

| # | Critério | Avaliação |
|---|---------|-----------|
| 1 | User Story clara | ✅ "Como visitante Marcelo... ler Hero <2.5s e ter 1º CTA WhatsApp visível" |
| 2 | AC binário e testável | ✅ 25 ACs, AC-9 com regras técnicas explícitas (priority, fetchPriority, blur) |
| 3 | Tasks concretas | ✅ 16 tasks executáveis |
| 4 | File List explícito | ✅ 14 novos + 2 modificados |
| 5 | Dev Notes completos | ✅ CON-013, FR-050, ADR-003/004, Risco R2, sticky nav iOS, Counter tween, Curve mobile |
| 6 | Testing strategy | ✅ E2E parcial topo + Manual iOS/Android + WebPageTest filmstrip |
| 7 | DoD coerente | ✅ 8 itens incluindo LCP/CLS/INP + smoke compliance |
| 8 | Cobertura FRs/CONs | ✅ FR-002/003/004/005, FR-017, FR-024, FR-027, FR-028, FR-040, FR-050, CON-013 |
| 9 | Dependências corretas | ✅ Depends 1.2 + FR-050 aplicado (copy-audit) — bloqueador hard documentado |
| 10 | Complexidade razoável | ✅ L (12-16h) coerente com 3 seções + 3 efeitos GSAP + sticky nav responsivo |

**Findings:** zero.

**Pré-requisito hard:** ✅ FR-050 aplicado em copy (versão 2026-05-05) — pendente confirmação que `05-copy-landing.md` foi atualizado pré-Story.

---

### Story 1.4 — Seções 4-7 (Personas + Valor + Prova + História)
**Score: 9 / 10**

| # | Critério | Avaliação |
|---|---------|-----------|
| 1 | User Story clara | ✅ "Como Marcelo... reduzir desconfiança crônica antes de chegar nos caminhos" |
| 2 | AC binário e testável | ✅ 34 ACs com critério literal (Rômulo texto canônico, "13 anos", "Marcelo" ausente) |
| 3 | Tasks concretas | ✅ 18 tasks; T1 aborta se Rômulo ausente |
| 4 | File List explícito | ✅ 23 novos (10 logos parceiros listados nominalmente) |
| 5 | Dev Notes completos | ✅ M-001, CON-013/014, L-008, NFR-027, Effects 7/8, Risco R3, bundle |
| 6 | Testing strategy | ✅ Unit `content.test.ts` (textual CON-013) + E2E + Manual marquee/bento |
| 7 | DoD coerente | ✅ 9 itens incluindo compliance textual + 10 logos otimizados |
| 8 | Cobertura FRs/CONs | ✅ FR-006/007/008/009, FR-018, FR-020, FR-025/029/030/031, FR-032, CON-013 |
| 9 | Dependências corretas | ✅ Depends 1.3 + texto Rômulo em copy (Dependência #11 hard) |
| 10 | Complexidade razoável | ⚠️ XL (18-26h) é honesto mas é a story de maior risco do epic |

**Findings:**
- **M1 (Major):** AC-14 oferece **2 layouts alternativos** ("grid 3-col desktop / 1-col stack mobile" OU "2+1 com Marcos Roberto destacado pelo sinistro"). Não-determinístico — Dex precisa decidir sozinho. **Ação:** PO recomenda **fixar grid 3-col uniforme** (alinha com FR-008 "3 quote cards em grid 3-col"). Se Anderson quiser destaque pra Marcos Roberto, decidir antes da story começar.
- **m2 (minor):** AC-18 menciona "faixa de 3 stats inline" como ancoragem das credenciais DNA, mas não fixa visualmente onde ficam (acima ou abaixo dos quote cards). Esclarecer no card design.
- **m3 (minor):** AC-19 lista "Tokio Marine SVG <15KB conforme NFR-027" mas alguns logos serão PNG (Mapfre, SulAmérica, Suhai). Critério de tamanho para PNG não especificado. **Ação:** acrescentar "PNG <30KB cada" ou similar.

**Pré-requisito hard:** ✅ Texto canônico de Rômulo inserido em `05-copy-landing.md` antes do start (Dependência #11 do PRD). Validar antes de Dex pegar.

---

### Story 1.5 — Seções 8-10 (Como Funciona + Caminhos + Compromisso)
**Score: 10 / 10**

| # | Critério | Avaliação |
|---|---------|-----------|
| 1 | User Story clara | ✅ "Como Marcelo... metade final pronto pra clicar 5 CTAs concentrados" |
| 2 | AC binário e testável | ✅ 32 ACs incluindo asserts textuais (sem "garantia", sem R$ 180/380/580, "13 anos") |
| 3 | Tasks concretas | ✅ 12 tasks; T9 atualiza content.test com 4 asserts CON-013 |
| 4 | File List explícito | ✅ 6 novos + 3 modificados |
| 5 | Dev Notes completos | ✅ CON-002/003/013, L-002, I-002, Decisão 6 wireframes, Effect #6 reuso |
| 6 | Testing strategy | ✅ Unit (4 asserts CON-013) + E2E (3 CTAs + headline) + Manual 4 mensagens |
| 7 | DoD coerente | ✅ 8 itens incluindo bônus literais conferidos |
| 8 | Cobertura FRs/CONs | ✅ FR-010/011/012, FR-021 (msgs 2/3/4/5), FR-025, FR-029, FR-032, CON-002/003/013 |
| 9 | Dependências corretas | ✅ Depends 1.4 |
| 10 | Complexidade razoável | ✅ L (12-16h) coerente com 3 seções + Caminho 2 featured + 4 CTAs |

**Findings:** zero.

**Pré-requisito hard:** Nenhum. Dependência #12 (validar "menos de R$ 200") é da 1.6, não 1.5.

---

### Story 1.6 — Seções 11-13 (Visão + Objeções + FAQ) + Footer
**Score: 9 / 10**

| # | Critério | Avaliação |
|---|---------|-----------|
| 1 | User Story clara | ✅ "Como Marcelo bem informado... resolver últimas dúvidas + footer institucional" |
| 2 | AC binário e testável | ✅ 32 ACs com asserts textuais ("Quem está perto", FAQ 7 reescrita, "13 anos") |
| 3 | Tasks concretas | ✅ 17 tasks; T13 estende content.test com 4 asserts |
| 4 | File List explícito | ✅ 8 novos + 3 modificados |
| 5 | Dev Notes completos | ✅ CON-013/014, M-003/M-004, Maps lazy, FAQ a11y, foto Hero LCP |
| 6 | Testing strategy | ✅ Unit (asserts) + E2E (FAQ single-open + 2 CTAs) + Manual NVDA/VoiceOver |
| 7 | DoD coerente | ✅ 9 itens incluindo busca textual final |
| 8 | Cobertura FRs/CONs | ✅ FR-013/014/015/016, FR-021 (7/8), FR-047, NFR-022, CON-013/014 |
| 9 | Dependências corretas | ✅ Depends 1.5 + Dependência #12 (R$ 200 ou "uma fração disso") |
| 10 | Complexidade razoável | ✅ L (12-16h) coerente com 4 seções/footer + Maps + FAQ a11y |

**Findings:**
- **m4 (minor):** AC-23 cita "Registro SUSEP nº [a coletar]" mas a Dependência #9 do PRD é hard antes do go-live. Esta story é 1.6, não 1.8 — placeholder é aceitável aqui mas precisa flag de TODO no PR. **Ação:** explicitar no AC-23 que placeholder é aceitável até a 1.8.
- **m5 (minor):** AC-10 ("foto sócios opcional na Seção 12") deixa decisão pra Dex — pode reusar `socios-01` ou `socios-02`. Recomenda-se fixar `socios-02-estudio.webp` (já lazy-loaded da 1.4, sem competir com Hero LCP).

**Pré-requisito hard:** Dependência #12 (Anderson valida "menos de R$ 200" OU suaviza para "uma fração disso") — **validar antes do start**.

---

### Story 1.7 — SEO + Structured Data + LGPD + Páginas Legais
**Score: 9 / 10**

| # | Critério | Avaliação |
|---|---------|-----------|
| 1 | User Story clara | ✅ "Como bot Google/Facebook... rich snippets + OG cards + LGPD compliance" |
| 2 | AC binário e testável | ✅ 26 ACs com Schema.org Validator + Rich Results Test + view-source |
| 3 | Tasks concretas | ✅ 18 tasks; T1 é pré-flight ADR-005 |
| 4 | File List explícito | ✅ 11 novos + 4 modificados |
| 5 | Dev Notes completos | ✅ CON-014, I-006, Schema.org dual @type, OG edge runtime, LGPD review |
| 6 | Testing strategy | ✅ Unit (`seo.test.ts` valida email/founder) + E2E (canonical + JSON-LD parse) + Manual validators |
| 7 | DoD coerente | ✅ 11 itens incluindo Lighthouse SEO=100 hard |
| 8 | Cobertura FRs/CONs | ✅ FR-033/034/035/036/037/038/039/040, FR-046/047/048/049, CON-004/014 |
| 9 | Dependências corretas | ✅ Depends 1.6 + ADR-005 corrigido (Dependência #13 hard) |
| 10 | Complexidade razoável | ✅ M (8-12h) coerente com infra não-visual + 2 LGPD pages |

**Findings:**
- **m6 (minor):** AC-11 inclui `geo: { lat -9.6498, lng -35.7089 — Maceió aproximado }` com TODO para refinar com endereço exato. Recomenda-se geocodificar o endereço da RFG (Rua José Pontes Magalhães, 70 — Jatiúca) antes do JSON-LD ir pra produção (impacta Knowledge Graph local). **Ação:** adicionar task explícita ou marcar como TODO da 1.8.
- **m7 (minor):** AC-15 + AC-16 (`/privacidade` e `/termos` template padrão) carecem de critério de aceitação preciso de "qual template padrão". Para evitar Dex inventar, referenciar template existente (ex.: copiar adaptado de PostFeito ou outro projeto Anderson) ou tornar entregável pré-Story.

**Pré-requisito hard:** ✅ ADR-005 corrigido (`comercial@` + "Ricardo Farias") — Dependência #13. **Validar antes do start.**

---

### Story 1.8 — Deploy Vercel + DNS + Analytics Live + Smoke Real
**Score: 9 / 10**

| # | Critério | Avaliação |
|---|---------|-----------|
| 1 | User Story clara | ✅ "Como Anderson... www.rfgcorretora.com.br ativo + 8 CTAs em meu celular" |
| 2 | AC binário e testável | ✅ 37 ACs (story de fechamento, mais densa) com checklist final QG §9 |
| 3 | Tasks concretas | ✅ 22 tasks; @devops exclusivo; T8 prevê propagação 24h |
| 4 | File List explícito | ✅ 1 novo (release-notes) + 7 modificados (placeholders → SUSEP nº real) |
| 5 | Dev Notes completos | ✅ Agent Authority, CON-007/008/014, R7 (DNS prop), R8 (SUSEP fictício), R5 |
| 6 | Testing strategy | ✅ E2E opcional contra prod + Manual Anderson + QG §9 inteira |
| 7 | DoD coerente | ✅ 17 itens incluindo "Anderson dá GO oficial" |
| 8 | Cobertura FRs/CONs | ✅ FR-016, FR-021 (8/8), FR-041..048, NFR-001..008, NFR-021/022, CON-007/008/014, QG inteiras |
| 9 | Dependências corretas | ✅ Depends 1.1-1.7 + revisão jurídica + SUSEP nº (Dependência #9 hard) |
| 10 | Complexidade razoável | ⚠️ Header diz "L (6-10h)" mas roadmap PRD §8.1 diz "M". Operacional + smoke + 22 tasks justifica L. |

**Findings:**
- **m8 (cosmetic):** Linha 6 do header diz "Complexity: L" mas roadmap PRD §8.1 diz "M". 37 ACs + 22 tasks + Anderson sign-off justificam L. **Ação:** atualizar PRD §8.1 de M para L (mesmo padrão da 1.1).
- **m9 (minor):** AC-2 diz que SUSEP nº deve ser aplicado em "Footer + CommitmentSection (1.5) + JSON-LD (1.7)". Mas a 1.5 e 1.7 já foram entregues como Done com placeholder. **Esclarecer:** 1.8 substitui placeholder via PR de hotfix antes do deploy final ou deixa como já está? Recomenda-se: hotfix antes do go-live (NÃO criar nova story).

**Pré-requisitos hard:**
1. ✅ Revisão jurídica `/privacidade` + `/termos` aprovada por Anderson + advogado (Risco #4)
2. ✅ Número SUSEP da RFG fornecido (Dependência #9)
3. ✅ Stories 1.1-1.7 todas Done

---

## Cobertura Cruzada — FRs do PRD → Stories

> **Total FRs no PRD: 52** (FR-001 a FR-052). Tabela abaixo mostra qual story implementa cada FR. Zero órfãos.

| FR | Descrição (resumo) | Story que implementa |
|----|---------------------|---------------------|
| FR-001 | 13 seções + sticky + footer ordem | 1.3 + 1.4 + 1.5 + 1.6 |
| FR-002 | Sticky nav variação responsiva | 1.3 |
| FR-003 | Seção 1 Hero (tríade credenciais) | 1.3 |
| FR-004 | Seção 2 Problema (Ponto Cego) | 1.3 |
| FR-005 | Seção 3 Oportunidade (Diagnóstico Ângulo Morto) | 1.3 |
| FR-006 | Seção 4 Personas (prefixo "Isso é para você se...") | 1.4 |
| FR-007 | Seção 5 Valor (Title Case + "faz com que") | 1.4 |
| FR-008 | Seção 6 Prova (3 quote cards + tríade DNA) | 1.4 |
| FR-009 | Seção 7 Origem (bento + nomes literais) | 1.4 |
| FR-010 | Seção 8 Como Funciona (Title Case) | 1.5 |
| FR-011 | Seção 9 Caminhos (bônus literais) | 1.5 |
| FR-012 | Seção 10 Compromisso ("NOSSO COMPROMISSO") | 1.5 |
| FR-013 | Seção 11 Visão (mobile positivo no topo) | 1.6 |
| FR-014 | Seção 12 Objeções (5 blocos + CTA) | 1.6 |
| FR-015 | Seção 13 FAQ (acordeão single-open) | 1.6 |
| FR-016 | Footer (e-mail `comercial@` + Maps) | 1.6 |
| FR-017 | Foto Hero priority + blur | 1.3 |
| FR-018 | Foto sócios-02 (individuais reservadas v2) | 1.4 |
| FR-019 | Logo RFG SVG | 1.1 (estrutura) + 1.3 (consumo nav) + 1.6 (consumo footer) |
| FR-020 | 10 logos parceiros otimizados | 1.4 |
| FR-021 | 8 CTAs WhatsApp tabela canônica | 1.2 (helper) + 1.3/1.5/1.6 (consumo) + 1.8 (smoke) |
| FR-022 | Helper centralizado `whatsapp.ts` | 1.2 |
| FR-023 | Links WhatsApp `target/rel/aria` | 1.2 (helper) + consumo 1.3-1.6 |
| FR-024 | Efeito #1 Hero text reveal | 1.3 |
| FR-025 | Efeito #2 Card stagger | 1.4 + 1.5 + 1.6 |
| FR-026 | Efeito #3 Scroll pinned NÃO usado v1 | N/A (declarativo, sem story) |
| FR-027 | Efeito #4 Curve divider | 1.3 |
| FR-028 | Efeito #5 Counter tween | 1.3 |
| FR-029 | Efeito #6 Icon burst | 1.4 + 1.5 (reuso Compromisso) |
| FR-030 | Efeito #7 Bento scrubbed | 1.4 |
| FR-031 | Efeito #8 Marquee + fallback grid | 1.4 |
| FR-032 | `prefers-reduced-motion` em todos efeitos | 1.2 (hook) + consumo 1.3-1.6 |
| FR-033 | `generateMetadata` raiz | 1.7 |
| FR-034 | Sitemap dinâmico | 1.7 |
| FR-035 | Robots dinâmico | 1.7 |
| FR-036 | OG image dinâmica | 1.7 |
| FR-037 | JSON-LD LocalBusiness + InsuranceAgency | 1.7 |
| FR-038 | JSON-LD FAQPage | 1.7 |
| FR-039 | Páginas `/privacidade` e `/termos` | 1.7 |
| FR-040 | `<html lang="pt-BR">` + SkipLink | 1.1 (parcial) + 1.2 (componente) + 1.3 (integração final) |
| FR-041 | GA4 com `anonymize_ip` | 1.2 (componente) + 1.7 (validação) + 1.8 (live) |
| FR-042 | Meta Pixel gated por consent | 1.2 (componente) + 1.7 (validação) + 1.8 (live) |
| FR-043 | Vercel Analytics + Speed Insights | 1.2 |
| FR-044 | Helper `tracking.ts` 8 eventos | 1.2 |
| FR-045 | ScrollDepthTracker 25/50/75/100% | 1.2 |
| FR-046 | ConsentBanner LGPD | 1.2 (componente) + 1.7 (ativação prod) |
| FR-047 | LGPD `mailto:` | 1.6 |
| FR-048 | GA4/Pixel só em prod | 1.2 (guard) + 1.7 (validação) + 1.8 (smoke) |
| FR-049 | Ícones + manifest PWA | 1.7 |
| FR-050 | Aplicar copy-audit pré-implementação | **Pré-Story 1.3** (PRD declarativa, executada por Morgan/Anderson) |
| FR-051 | Tipografia Manrope + Inter `next/font` | 1.1 (config) + 1.2 (uso visual) |
| FR-052 | Paleta + neutros tingidos azul | 1.1 |

**Resultado:** **0 FRs órfãos.** FR-026 é declarativo ("não usar v1"), FR-050 é declarativo executado pré-Story 1.3 por Morgan/Anderson. Todos os outros 50 FRs estão alocados.

---

## Cobertura de Compliance

### CON-013 — 10 Termos Proibidos (busca textual)

| Termo proibido | Story que valida | Como (asserts) |
|----------------|------------------|----------------|
| "garantia" / "garantir" | 1.4 (Pilar 3) + 1.5 (Caminho 1, Compromisso) + 1.8 (smoke prod) | Unit `content.test.ts` + E2E + grep prod |
| "contemplação rápida/certa" | Implícito em 1.5 (Caminho 3 Consórcio) + 1.8 smoke | Pode reforçar test textual |
| "100% de sucesso" / "milagre" / "fórmula mágica" | 1.4 + 1.5 (textos completos) + 1.8 grep prod | Visual review |
| "fácil" / "sem esforço" | Mesma cobertura | Visual review |
| "12 anos" (RFG) | 1.4 (Seção 7) + 1.5 (Seção 10) + 1.6 (FAQ 10) + 1.8 prod | Unit asserts em `originStory.ts`, `commitment.ts`, `faq.ts` |
| "Marcelo" | 1.4 (AC-29 visual + content test) + 1.8 prod | Unit `content.test.ts` |
| "Sua esposa sente isso" | 1.6 (AC-3 + content test em `vision.ts`) + 1.8 prod | Unit + grep |
| Preços R$ 180/380/580 | 1.5 (AC-19 + content test em `paths.ts`) + 1.8 prod | Unit + grep |
| Headlines CAIXA ALTA (Seções 5/8) | 1.4 (AC-6/8) + 1.5 (AC-3) | Visual review |
| Mistura "registro SUSEP 1995" + "12 anos" (FAQ 7) | 1.6 (AC-16/28 + content test FAQ 7 separado) | Unit asserts |

**Cobertura:** ✅ Os 10 termos têm asserts textuais (unit + E2E + grep prod) ou visual review explícito.

### CON-014 — E-mail + Ricardo Farias

| Item | Story que valida |
|------|------------------|
| E-mail `comercial@rfgcorretora.com.br` (footer) | 1.6 (AC-21/24 + content test) |
| E-mail (LGPD mailto) | 1.6 (AC-24) |
| E-mail (JSON-LD `email`) | 1.7 (AC-11/T8 + `seo.test.ts`) |
| E-mail (`.env.local.example`) | 1.1 (AC-11) |
| E-mail (env vars Vercel produção) | 1.8 (AC-8) |
| Founder "Ricardo Farias" (não "Guimarães") em JSON-LD | 1.7 (AC-11/T8 + `seo.test.ts`) |
| Founder "Ricardo Farias" em copy Seção 7 | 1.4 (AC-28) |
| Pré-flight ADR-005 corrigido | 1.7 (AC-1/T1) |
| Smoke prod (`comercial@`, sem `contato@`) | 1.8 (AC-30, T19 grep) |

**Cobertura:** ✅ 9 pontos de validação distribuídos em 4 stories + smoke final em 1.8.

### Bônus dos 3 Caminhos (FR-011 + L-002)

| Caminho | Bônus literais | Story |
|---------|---------------|-------|
| Caminho 1 (Essencial) | 1 bônus — Checklist "Meu Patrimônio Blindado" | 1.5 (AC-11 + content test "exatamente 1 bônus") |
| Caminho 2 (Completa) | 2 bônus — Guia Previdência + Checklist | 1.5 (AC-12 + content test "exatamente 2") |
| Caminho 3 (Legado) | 3 bônus — Guia + Checklist + Sessão Consórcio | 1.5 (AC-13 + content test "exatamente 3") |

**Cobertura:** ✅ Asserts textuais por caminho na 1.5.

### 8 Mensagens WhatsApp (FR-021)

| # | Chave | Story consumidora | Smoke final |
|---|-------|-------------------|-------------|
| 1 | `diagnostico` (Hero) | 1.3 (AC-7/11) | 1.8 (AC-17.1) |
| 2 | `essencial` (Caminho 1) | 1.5 (AC-11) | 1.8 (AC-17.2) |
| 3 | `completa` (Caminho 2) | 1.5 (AC-12) | 1.8 (AC-17.3) |
| 4 | `legado` (Caminho 3) | 1.5 (AC-13) | 1.8 (AC-17.4) |
| 5 | `cta_unico` (CTA único Seção 9) | 1.5 (AC-16) | 1.8 (AC-17.5) |
| 6 | `sticky_nav` | 1.3 (AC-3) | 1.8 (AC-17.6) |
| 7 | `objecoes` (Seção 12) | 1.6 (AC-11) | 1.8 (AC-17.7) |
| 8 | `footer` (FAQ + Footer) | 1.6 (AC-19/25) | 1.8 (AC-17.8) |

**Cobertura:** ✅ 1.2 cria helper com 8 chaves; 1.3/1.5/1.6 consomem; 1.8 valida em celular real.

### 3 Depoimentos

| Cliente | Story | Validação |
|---------|-------|-----------|
| Rômulo (M-001 — texto canônico) | 1.4 (AC-14 + Dependência #11 PRD) | Pré-flight: texto inserido em copy |
| Rodrigo | 1.4 (AC-14) | Literal de copy |
| Marcos Roberto | 1.4 (AC-14) | Literal de copy |

**Cobertura:** ✅ Story 1.4 cobre os 3.

### 10 Logos Parceiros

| Logo | Formato | Story |
|------|---------|-------|
| Porto Seguro, Yelum, Bradesco, Allianz, Akad, Tokio Marine, HDI | SVG (svgo otimizado) | 1.4 |
| Mapfre, SulAmérica, Suhai | PNG/WebP transparente | 1.4 |

**Cobertura:** ✅ Story 1.4 lista 10 logos nominalmente no File List + AC-19.

---

## Pré-requisitos Hard — Validação dos 3 que River Identificou

| # | Pré-requisito | Story bloqueada | Status |
|---|--------------|-----------------|--------|
| 1 | Texto canônico de Rômulo em `05-copy-landing.md` | 1.4 | **❌ Pendente** — confirmar com Anderson/Morgan se já foi inserido (Dependência #11 PRD) |
| 2 | ADR-005 corrigido (`comercial@` + "Ricardo Farias") | 1.7 | **❌ Pendente** — confirmar com @architect Aria (Dependência #13 PRD) |
| 3 | Número SUSEP da RFG fornecido + revisão jurídica `/privacidade`/`/termos` | 1.8 | **❌ Pendente** — Dependência #9 PRD + Risco #4 |

**Status global:** 3/3 pré-requisitos identificados são reais e bloqueantes. **Nenhum está executado ainda** — todos têm janela até suas respectivas stories começarem.

---

## Matriz de Dependências (depends_on / blocks)

```
1.1 (Setup Foundation)
 ├─→ 1.2 (UI Primitives)
 │    ├─→ 1.3 (Seções 1-3)  +  pré-req: FR-050 aplicado em copy
 │    │    └─→ 1.4 (Seções 4-7)  +  pré-req: texto Rômulo em copy
 │    │         └─→ 1.5 (Seções 8-10)
 │    │              └─→ 1.6 (Seções 11-13 + Footer)  +  pré-req: validar "R$ 200"
 │    │                   └─→ 1.7 (SEO + LGPD)  +  pré-req: ADR-005 corrigido
 │    │                        └─→ 1.8 (Deploy)  +  pré-req: SUSEP nº + jurídico
```

**Avaliação:** ✅ Cadeia limpa, sem ciclos, sem conflitos. Pipeline serializado faz sentido (cada story depende do estado de copy/content acumulado da anterior).

---

## Top 3 Findings (Priorizados)

### 1. **M1 — Story 1.4 AC-14: Layout não-determinístico dos 3 quote cards**
- **Linha:** `1.4.sections-4-7-personas-valor-prova-historia.story.md` linha 58 (AC-14)
- **Problema:** Oferece 2 layouts ("3-col uniforme" OU "2+1 com Marcos Roberto destacado"). Dex precisa decidir sozinho — quebra `Quality First` (Constitution Article V).
- **Ação:** Anderson decide ANTES da 1.4 começar. Recomenda-se **3-col uniforme** alinhado com FR-008.

### 2. **m1 + m8 — Discrepância de complexidade (Stories 1.1 e 1.8)**
- **Linhas:** Header das 1.1 (linha 5: "L") e 1.8 (linha 6: "L") vs PRD §8.1 (ambas como "M").
- **Problema:** Inconsistência cosmética entre header da story e roadmap do PRD. Não bloqueia execução, mas confunde planning.
- **Ação:** Atualizar PRD §8.1 — marcar 1.1 e 1.8 como **L** (alinhadas com headers das stories, justificadas por 20+/37 ACs).

### 3. **m2/m3/m6/m7 — Critérios "soft" em ACs (atomicidade)**
- **Stories afetadas:** 1.4 (AC-18 "faixa inline" sem posição fixa), 1.4 (AC-19 sem critério tamanho PNG), 1.7 (AC-11 geo lat/lng aproximado), 1.7 (AC-15/16 "template padrão" sem referência fixa).
- **Problema:** Permitem decisão de Dex em tempo de implementação. Não-bloqueante (Dex consegue avançar com bom-senso) mas reduz determinismo.
- **Ação:** Refinar 4 ACs com decisões antecipadas OU aceitar como "design discretion" documentado no PR.

---

## Veredito Final

### 🟢 GO com 2 ajustes minor

**Score médio:** 9.6 / 10
**Stories 10/10:** 1.1 (com asterisco cosmético), 1.2, 1.3, 1.5
**Stories 9/10:** 1.4, 1.6, 1.7, 1.8

**Ajustes obrigatórios antes de Dex pegar 1.1:**
1. **PRD §8.1:** atualizar 1.1 e 1.8 de "M" para "L" (alinhar com headers das stories) — 5min
2. **Story 1.4 AC-14:** Anderson decide layout dos 3 quote cards (3-col uniforme recomendado) — 5min

**Ajustes desejáveis antes da Story respectiva começar:**
- **1.4:** Refinar AC-18 (posição da faixa de credenciais) e AC-19 (critério tamanho PNG) — 10min
- **1.6:** Fixar foto Seção 12 (recomenda `socios-02`) e marcar SUSEP nº como TODO até 1.8 — 5min
- **1.7:** Geocodificar endereço RFG para `geo` exato; referenciar template LGPD-base — 15min

**Total ajustes:** ~40min.

**Após esses ajustes:** Dex pode começar 1.1 imediatamente. River não precisa redraftar.

---

## Recomendação Final

### Pipeline: Sequencial 1.1 → 1.8 (NÃO paralelizar 1.4-1.6)

**Motivos para NÃO paralelizar:**
1. **Estado de copy acumulado:** cada section story depende de `src/content/*.ts` + `tests/unit/content.test.ts` da anterior (1.4 estende, 1.5 estende, 1.6 estende).
2. **Compliance check incremental:** asserts CON-013 vão se acumulando (`commitment.ts` na 1.5, `vision.ts/faq.ts` na 1.6) — paralelizar gera merge conflicts no `content.test.ts`.
3. **Lighthouse acumulativo:** cada story valida que ≥95 manteve. Sequencial permite isolar regressões.
4. **Dependências hard escalonadas:** Rômulo (pré-1.4) ≠ R$200 validation (pré-1.6) ≠ ADR-005 (pré-1.7) ≠ SUSEP+jurídico (pré-1.8). Cada uma tem janela de tempo diferente.

**Worktree para 1.4-1.6 só faria sentido se:**
- Copy estivesse 100% travada (já está, via CON-013) E
- File List não tivesse overlap (1.4/1.5/1.6 todos modificam `page.tsx`, `content.test.ts`) — **tem overlap, não recomendado**.

### Decisões pendentes de Anderson antes do início

**Bloqueadoras para 1.1 (mínimo):**
1. Confirmar layout AC-14 da 1.4 (3-col vs 2+1 destaque)
2. OK para PRD §8.1 ajustar 1.1 e 1.8 para "L"

**Não-bloqueadoras para 1.1, mas necessárias antes da story respectiva:**
3. Inserir texto canônico de Rômulo em `05-copy-landing.md` (antes da 1.4)
4. Validar valor "menos de R$ 200" ou suavizar (antes da 1.6)
5. Corrigir ADR-005 do `architecture.md` (antes da 1.7)
6. Fornecer número SUSEP + revisão jurídica páginas legais (antes da 1.8)

**Conclusão:** River fez um trabalho exemplar (média 9.6/10, zero FRs órfãos, 3 pré-requisitos hard identificados corretamente). Anderson autoriza Dex a começar 1.1 após resolver os 2 ajustes minor obrigatórios (~10min de trabalho).

---

## Próximos Passos

1. **Anderson:** decide AC-14 da 1.4 + autoriza ajuste cosmético no PRD §8.1
2. **Morgan (PM):** aplica ajuste cosmético no PRD §8.1 (1.1+1.8 → L)
3. **Pax (PO — eu):** marca este relatório como Final
4. **Dex (Dev):** começa Story 1.1 (10-14h estimadas)
5. **Anderson + Morgan:** insere Rômulo na copy (janela: durante 1.1+1.2+1.3 = ~30h)
6. **Aria (Architect):** corrige ADR-005 (janela: durante 1.4+1.5+1.6 = ~50h)
7. **Anderson + Advogado:** revisão jurídica páginas LGPD (janela: durante 1.6+1.7 = ~20h)

---

**Pax (PO Agent) — assinatura:** Validação 10-point checklist concluída. Veredito: 🟢 **GO com 2 ajustes minor (~10min)**. Dex pode começar Story 1.1.

**Data:** 2026-05-05
**Próxima revisão:** Após Story 1.4 Done (validar que M-001 Rômulo + AC-14 layout foram resolvidos corretamente).

---

## Resolução das pendências (2026-05-05)

Anderson ratificou as 3 decisões finais antes de Dex iniciar a Story 1.1. Aplicação in-place concluída por Pax (PO):

- [x] **M1 — Opção A ratificada** (3-col uniforme): Story 1.4 AC-14 + Dev Notes atualizados; FR-008 do PRD fixado em layout uniforme.
- [x] **m1+m8 — Stories 1.1/1.8 atualizadas para L** no PRD §8.1 (alinhadas com headers das stories).
- [x] **Dependência #9 (SUSEP nº)** — removida (Anderson não exibirá número). Stories 1.6, 1.7, 1.8 e PRD atualizados para usar apenas "Registro SUSEP ativo desde 1995" (sem número específico). Risco R8 da Story 1.8 renomeado para "Compliance SUSEP textual".
- [x] **Risco #4 (LGPD jurídico)** — descalonado (template padrão). Stories 1.7 e 1.8 + PRD §10 atualizados; revisão jurídica externa fica como melhoria opcional para v1.1.

**Status:** Projeto pronto para Dex iniciar Story 1.1.
