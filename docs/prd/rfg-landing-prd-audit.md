# RFG Landing PRD v1.0 — Auditoria do Product Owner

> **Auditor:** Pax (Product Owner) · **Data:** 2026-05-05
> **PRD auditado:** `docs/prd/rfg-landing-prd.md` (v1.0, autor Morgan, 49 FRs / 25 NFRs / 12 CONs / 8 stories)
> **Inputs comparados:** briefings 01, 03, 05; plan/00-execution-plan; plan/wireframes; plan/architecture; plan/design-system; plan/effects-reference; plan/parceiros-fontes; plan/copy-audit
> **Método:** comparação 1-a-1 entre cada decisão dos documentos-fonte e a presença de FR/NFR/CON correspondente no PRD; identificação de gaps, inconsistências, lacunas e refinamentos.

---

## 1. Findings Críticos (M — Major)

Findings que, se não corrigidos, viram bug em produção, lacuna de produto ou risco de compliance.

### M-001 — PRD ignora o depoimento de **Rômulo** (faltam **3 depoimentos** confirmados no briefing)
- **Onde está o gap:** PRD `FR-008` linha 113 e Story 1.4 AC ("Seção 6: 2 quote cards (Rodrigo + Marcos Roberto)") consideram **apenas 2 depoimentos**.
- **Fonte do fato:** `01-dna-completo.md` linhas 344-354 (3 depoimentos: Rômulo, Rodrigo, Marcos Roberto). `05-copy-landing.md` linhas 105-110 cita só 2 — mas o briefing-mãe traz 3, confirmados como reais. A omissão de Rômulo no copy de seção foi não-intencional (briefing 01 é fonte primária).
- **Por que é crítico:** desperdiça prova social qualificada (Rômulo é cliente que pediu adequação financeira — endereça objeção "seguro é caro" da Seção 12, linhas 394-401). Reduzir o painel a 2 depoimentos enfraquece a Seção 6.
- **Sugestão de correção:** alterar `FR-008` para "**3 quote cards** (Rômulo, Rodrigo, Marcos Roberto)" e ajustar layout sugerido para grid 3-col desktop / stack mobile (ou 2+1 com Marcos Roberto destacado pelo sinistro). Atualizar Story 1.4 AC. Sinalizar a Morgan/Anderson que a copy-landing precisa receber o terceiro depoimento textualmente em pt-BR antes da Story 1.4.

### M-002 — Ausência de FR/CON que torne `05-copy-landing.md` a fonte canônica da copy
- **Onde está o gap:** PRD referencia "linhas X-Y de 05-copy-landing.md" em vários FRs, mas não declara que a copy aprovada é **canonical e literal**. A copy-audit (`copy-audit.md`) lista correções críticas que NÃO foram refletidas no PRD como FRs/CONs.
- **Por que é crítico:** sem âncora formal, dev tem liberdade para "reescrever" sem consultar. Os 3 ajustes 🔴 críticos do `copy-audit.md` (Seção 9 reescrita, Seção 10 sem "GARANTIA", Pilar 3 sem "garante") podem voltar por descuido na implementação.
- **Sugestão de correção:** novo `CON-013: Copy canônica` — "A copy de cada uma das 13 seções está fixada em `05-copy-landing.md` + correções aplicadas em `copy-audit.md` §7. Qualquer alteração de wording exige aprovação @pm + @po antes do PR. Os 3 ajustes críticos da copy-audit (Seção 9 reescrita sem preços + Seção 10 sem palavra "garantia" + Pilar 3 sem verbo "garantir") são inegociáveis pré-go-live."

### M-003 — Falta FR/CON explícito que obrigue as **correções da copy-audit** (8 ajustes pendentes)
- **Onde está o gap:** o `CON-003` cobre apenas compliance SUSEP via lista de palavras proibidas. Mas a copy-audit identifica **outros 7 ajustes** que afetam tom, factualidade e inclusão e que NÃO viraram FR/CON:
  1. Seção 7 — remover nome "Marcelo" (persona-avatar vazada, linha 145 da copy original)
  2. Seções 7 e 10 — atualizar "12 anos" para "13 anos" (em 2026)
  3. FAQ 7 — separar "registro SUSEP desde 1995" de "RFG opera desde 2013" (linha 459 da copy)
  4. Seção 11 — trocar "Sua esposa sente isso" por "Quem está perto de você sente isso" (inclusão)
  5. Seções 5 e 8 — trocar headlines em CAIXA ALTA por Title Case
  6. Seção 4 — aplicar prefixo "Isso é para você se..." (sugestão do próprio briefing 05 linha 73)
  7. Seção 12 linha 369 — validar "menos de R$ 200" com Ricardo/Anderson antes do go-live
- **Por que é crítico:** sem FR/CON, esses ajustes ficam no "memorando" do auditor da copy e podem ser esquecidos no PR final. Item 4 (heteronormatividade) e item 1 (vazamento de persona interna) são bugs de produto evidentes em produção.
- **Sugestão de correção:** adicionar `FR-050` "**Aplicar correções da copy-audit pré-implementação:** Morgan/Anderson revisam e aplicam os 7 ajustes 🟡/🟢 do `copy-audit.md` §7 antes da Story 1.3 começar; Anderson valida o valor 'menos de R$ 200' (Seção 12 objeção #1) ou suaviza para 'uma fração disso'."

### M-004 — Inconsistência de **e-mail** entre PRD/briefing e architecture.md
- **Onde está o gap:** `FR-016` (PRD linha 121) e `03-contato.md` linha 9 fixam **`comercial@rfgcorretora.com.br`** como e-mail oficial. `architecture.md` ADR-005 (linha 167) e §9.1 `.env.local.example` (linha 860) usam **`contato@rfgcorretora.com.br`**. JSON-LD irá ser publicado com e-mail errado.
- **Por que é crítico:** e-mail errado em LocalBusiness JSON-LD + footer + `mailto:` direitos LGPD = lead que escreve no e-mail errado, prejuízo direto à captação. SEO local (Knowledge Panel) também consome o JSON-LD.
- **Sugestão de correção:** novo `CON-014: Contato canônico` ou anotação no `FR-016` e `FR-037` reforçando: "E-mail oficial RFG = `comercial@rfgcorretora.com.br` (ver `03-contato.md`). Architecture.md ADR-005 e `.env.local.example` devem ser corrigidos antes da Story 1.7. `mailto:` LGPD em `FR-047` também deve usar o e-mail comercial."

### M-005 — Falta FR/CON sobre **tipografia oficial** (Manrope + Inter)
- **Onde está o gap:** Manrope (display) + Inter (body) está fixado em `design-system.md` §3, `architecture.md` §3.3 e Story 1.2 AC, mas **nenhum FR/NFR/CON do PRD** declara isso como requisito formal.
- **Por que é crítico:** decisão tipográfica é parte do DNA visual ("premium consultivo brasileiro"). Se virar mutável, qualquer dev pode trocar por defaults Tailwind ou system fonts e quebrar o posicionamento. Risco R2 (CLS por fontes) também depende dessa decisão estar congelada.
- **Sugestão de correção:** novo `FR-051: Tipografia` — "Carregar **Manrope (400-800)** + **Inter (400-700)** via `next/font/google` com `display: 'swap'` + `adjustFontFallback: true` + `preload: true` para weights críticos (Manrope 700 + Inter 400). Self-host `.woff2` reservado como contingência (Risco R2 mitigação)."

### M-006 — Falta FR/CON sobre **paleta primária + neutros tingidos** RFG
- **Onde está o gap:** `design-system.md` §2 fixa paleta primária (`#246BB2`/`#3688C8`/`#4CB3E6` + gradiente) e neutros tingidos azul (hue ~210). PRD não tem FR/NFR/CON que torne isso compliance.
- **Por que é crítico:** identidade da marca. Sem âncora formal, ESLint não detecta drift. Risco operacional baixo individualmente, mas combinado com M-005 (tipografia) cria buraco de governança visual.
- **Sugestão de correção:** novo `FR-052: Paleta` — "Aplicar paleta primária `--rfg-blue-dark/mid/light` + neutros tingidos azul (hue ~210) conforme `design-system.md` §2.1-2.2. Tokens drop-in copiados em `src/styles/tokens.css`. Sem dark mode em v1 (`design-system.md` §13)."

### M-007 — Mensagens WhatsApp por CTA não estão fixadas como requisito (apenas referenciadas)
- **Onde está o gap:** `FR-021` e `FR-022` mencionam "8 CTAs" e "URLs URL-encoded" mas **não fixam o texto exato** das 8 mensagens. `wireframes.md` §3 traz a lista canônica (Olá! Quero fazer o Diagnóstico..., Olá! Tenho interesse no Caminho 1..., etc).
- **Por que é crítico:** a mensagem pré-preenchida é a **primeira impressão da conversa** — afeta taxa de resposta de Ricardo/Anderson e a qualificação do lead. Se virar variável, dev coloca placeholder inglês ou genérico.
- **Sugestão de correção:** alterar `FR-021` para "8 CTAs WhatsApp distribuídos conforme `wireframes.md` §3, **com mensagens contextuais literais conforme tabela canônica** (Olá! Vim pelo site da RFG / Olá! Quero fazer o Diagnóstico de Ângulo Morto Patrimonial / etc — 8 strings fixadas). Helper `whatsapp.ts` exporta enum com chaves contextuais."

---

## 2. Findings Importantes (m — minor)

### m-001 — Versões pinadas de GSAP não estão em FR/NFR
- **Onde:** `architecture.md` §11 fixa `gsap@^3.14` + `@gsap/react@^2`. PRD não pin.
- **Por que importa:** updates major de GSAP podem quebrar `useGSAP` hook ou ScrollTrigger. Pin em PRD reforça contrato.
- **Sugestão:** adicionar nota no `FR-024..FR-031` ou novo `NFR-026: Animation stack pinned — GSAP ^3.14 + @gsap/react ^2`.

### m-002 — Story 1.4 cita marquee mas não exige fallback de redução de movimento
- **Onde:** Story 1.4 AC ("Marquee respeita `prefers-reduced-motion` (vira grid estático)") menciona, mas `FR-031` não detalha que vira **grid estático com 10 logos visíveis** (não pausado/oculto).
- **Sugestão:** refinar `FR-031` para incluir "fallback `prefers-reduced-motion`: marquee desativado, logos exibidos em grid estático 5x2 desktop / 2x5 mobile".

### m-003 — Otimização SVG dos parceiros não tem FR
- **Onde:** `parceiros-fontes.md` recomenda otimização via svgo (Tokio Marine 43KB) e fallback PNG @2x para SVGs.
- **Sugestão:** novo `NFR-027: Otimização de logos parceiros — svgo aplicado em todos os SVGs; logos PNG (Mapfre, SulAmérica, Suhai) confirmados com transparência alpha pré-go-live.`

### m-004 — Storytelling Seção 7 — preservação de nomes não é AC formal
- **Onde:** `FR-009` exige bento grid com "1995 + 2013 + Hoje + citação Rodrigo" mas não cita que **Ricardo + Anderson + Mapfre + nomes próprios** devem aparecer literais (ver copy `05-copy-landing.md` linhas 124-153).
- **Sugestão:** complementar `FR-009`: "Copy preserva nomes literais Ricardo Farias + Anderson Guimarães + Mapfre + datas 1995 e 2013 conforme copy aprovada."

### m-005 — Sticky nav variação mobile vs desktop não está em FR
- **Onde:** `wireframes.md` §5 detalha "ghost desktop" com links âncora vs "ícone-only mobile" sem hambúrguer. `FR-002` não distingue.
- **Sugestão:** alterar `FR-002` para "Sticky nav: desktop com logo + 4 links âncora (Sobre, Como Funciona, Caminhos, FAQ) + CTA `btn-secondary-md`; mobile com logo + ícone WhatsApp 24px (sem menu hambúrguer)."

### m-006 — Tríade de credenciais Hero não tem AC fechado
- **Onde:** `FR-003` cita tríade "(1.200 famílias / 35 anos / SUSEP)" mas wireframe `Seção 1` mostra ordem específica (badge SUSEP separado em cima + 2 outros badges no rodapé do hero) e responsivo "2 badges em linha + 1 abaixo se não couber".
- **Sugestão:** complementar `FR-003` com a ordem e o comportamento mobile.

### m-007 — Reflow Seção 11 (positivo/negativo) só descreve 2 colunas, sem ordem mobile
- **Onde:** `FR-013` "stack mobile" — não declara qual bloco vem primeiro. `wireframes.md` Seção 11 implica positivo primeiro.
- **Sugestão:** "Mobile: positivo no topo, negativo abaixo com `--bg-secondary`."

### m-008 — Nenhum FR de **conversão** (track `Lead` no Meta Pixel)
- **Onde:** `FR-044` lista nomes de eventos GA4 mas não menciona o mapeamento Meta Pixel `Lead` que está em `architecture.md` §6.2.
- **Sugestão:** complementar `FR-044`: "Meta Pixel: `whatsapp_redirect` → `track('Lead')` + `cta_click` → `track('InitiateCheckout')` (gated por consent marketing)."

### m-009 — KPI secundária scroll depth não tem FR de tracking dedicado
- **Onde:** seção 1.3 do PRD define KPI "scroll depth >=75% em ≥40% sessões" mas o `FR-045` faz scroll depth genérico em 25/50/75/100. Não há marcador de "milestone 75% conversão".
- **Sugestão:** garantir em `FR-045` que `scroll_depth=75` é um evento conversão configurado no GA4 (ou listá-lo em Quality Gate 9.5).

---

## 3. Lacunas (L)

Itens dos brainstorms/decisões que não estão no PRD.

### L-001 — Decisão D1 (effects-reference) "Sem Framer Motion / Sem Lenis" não está em CON
- **Onde:** `architecture.md` cabeçalho linha 9 e ADR-003 menciona, mas PRD não tem CON banindo Framer Motion / Lenis.
- **Sugestão:** novo `CON-015: Animation lib única — GSAP + ScrollTrigger são as únicas libs de animação. Framer Motion e Lenis explicitamente proibidos para evitar duplicação de runtime e divergência de timing.`

### L-002 — Faltam menções aos **bônus específicos** dos 3 caminhos
- **Onde:** `05-copy-landing.md` linhas 234-275 lista bônus por caminho (Caminho 1: Checklist; Caminho 2: Guia Previdência + Checklist; Caminho 3: Guia + Checklist + Sessão Estratégica). PRD `FR-011` apenas diz "3 caminhos sem preço, microcopy, badge". Bônus literais não estão fixados.
- **Sugestão:** complementar `FR-011`: "Cada Caminho exibe bullets fiéis à copy aprovada, incluindo bônus listados (Caminho 1: 1 bônus; Caminho 2: 2 bônus; Caminho 3: 3 bônus)."

### L-003 — Falta declaração de que a **landing é uma página única em /** (sem rotas /sobre, /faq, /produtos)
- **Onde:** decisão implícita em `00-execution-plan.md` §2.1 e `architecture.md` estrutura de pastas. PRD diz "Landing única em `/`" no Escopo §2.1 mas não há FR/CON.
- **Sugestão:** adicionar no `CON-001` ou novo `CON-016: Single-page architecture — toda a landing renderiza em `/`; navegação interna por âncoras (#sobre, #como-funciona, etc); apenas `/`, `/privacidade`, `/termos` têm rotas dedicadas.`

### L-004 — Brainstorm da **Tríade de Autoridade (DNA)** não tem mapeamento explícito
- **Onde:** `01-dna-completo.md` linhas 126-154 define 3 credenciais oficiais (Experiência de Vida Real / Resultados Comprovados / Especialização Real). PRD captura "1.200 famílias / 35 anos / SUSEP" (que é versão resumida) mas não obriga a Seção 6 (Prova) a contemplar as 3 credenciais com texto correspondente.
- **Sugestão:** complementar `FR-008`: "Seção Prova ancora visualmente as 3 credenciais do DNA (linhas 126-154 do briefing 01): selo SUSEP 1995 + faixa 1.200 famílias + faixa 35 anos / portfólio completo."

### L-005 — KPI primária 3% CTR — sem rastreamento operacional
- **Onde:** PRD §1.3 define o KPI mas Quality Gates 9.5 não checam se ele é configurado como **conversion event** no GA4.
- **Sugestão:** adicionar em QG 9.5: "GA4 com `whatsapp_redirect` marcado como `conversion event` no painel; `scroll_depth=75` configurado para acompanhar KPI secundária."

### L-006 — Falta CON sobre **separação de projetos PostFeito ≠ RFG**
- **Onde:** `00-execution-plan.md` "Separação de Projetos" é declarada como CRÍTICO. PRD captura parcialmente em `CON-011` (codebase 100% novo) mas não cobre: deploy isolado, sem cross-pollination de tokens/components/CSS variables.
- **Sugestão:** complementar `CON-011`: "Nenhum import direto, nenhum mono-repo compartilhado, nenhum reuso de tokens CSS via package; reimplementação a partir do inventário em `effects-reference.md`."

### L-007 — Premissa Persuasiva e Mecanismos Únicos não estão explícitos como FR
- **Onde:** `01-dna-completo.md` linhas 322-410 (Premissa Persuasiva, Ponto Cego Patrimonial 8.6, Diagnóstico de Ângulo Morto Patrimonial 8.9). PRD usa o nome "Diagnóstico de Ângulo Morto Patrimonial" em vários FRs mas não fixa "Ponto Cego Patrimonial" como termo na Seção 2.
- **Sugestão:** complementar `FR-004`: "Seção 2 explicita o conceito 'Ponto Cego Patrimonial' (briefing 01 linha 399) — copy original de `05-copy-landing.md` linhas 28-37 já cobre."

### L-008 — Foto cards individuais (`ricardo-01` + `anderson-01`) — uso não definido
- **Onde:** `00-execution-plan.md` §1.1 menciona "cards individuais = `ricardo-01` + `anderson-01`". PRD/wireframes só contemplam `socios-01-perfil-rfg` e `socios-02-estudio` — fotos individuais ficam órfãs.
- **Sugestão:** decidir explicitamente: ou (a) reservar fotos individuais para v2 e remover da lista de assets v1 (preferência); ou (b) usar em algum bloco — sugestão Seção 7 bento grid (1995 = Ricardo, 2013 = ambos, blocos de citação podem ter avatar). Adicionar nota em `FR-018`.

---

## 4. Inconsistências (I)

### I-001 — E-mail divergente (PRD/briefing usa `comercial@`, architecture usa `contato@`)
- Já capturado em **M-004**.

### I-002 — Storytelling histórico: "12 anos" vs "13 anos" em 2026
- **Onde:** `01-dna-completo.md` linha 13 ("12 anos de existência") + `05-copy-landing.md` linha 147 ("Nos 12 anos seguintes") + Seção 10 linha 305 ("12 anos") foram escritos baseando-se em 2025. Em 2026 a RFG completa **13 anos**. PRD não trata.
- **Impacto:** factualmente inconsistente em produção em 2026.
- **Sugestão:** já capturado em M-003 item 2 (atualizar copy) — reforçar correção textual antes da Story 1.3.

### I-003 — Story 1.6 lista "iframe Google Maps lazy-loaded" mas wireframe Decisão 10 sugere posição "1 col mobile / coluna lateral desktop"
- **Onde:** `FR-016` apenas menciona "iframe Google Maps lazy-loaded" sem layout. `wireframes.md` §1 Decisão 10 detalha "1 col mobile / coluna lateral desktop".
- **Sugestão:** complementar `FR-016` ou Story 1.6 AC com layout do mapa.

### I-004 — Total de CTAs: PRD menciona "8" (FR-021), copy-audit/wireframes confirmam "8", mas execução-plan §4.1 fala em "6 CTAs" em alguns trechos antigos
- **Onde:** `00-execution-plan.md` Fase 4.1 "Verificar todos os 6 CTAs". `architecture.md` ADR-002 linha 43 "Todos os 6 CTAs". `wireframes.md` §3 e PRD `FR-021` consolidam em **8**.
- **Impacto:** baixo (PRD prevalece), mas sinaliza que docs antigos precisam ser sincronizados ou anotados.
- **Sugestão:** PRD ja é coerente em 8; sugerir update silencioso de execution-plan.md / architecture.md (não bloqueante).

### I-005 — `parceiros-fontes.md` lista "Mapfre PNG 159x24 baixa res" e PRD `CON-005` confirma — mas Story 1.4 AC pede "10 logos parceiros otimizados em SVG/WebP"
- **Onde:** Story 1.4 AC pode ser interpretado como exigindo SVG para todos. Mapfre + SulAmérica + Suhai são PNG.
- **Sugestão:** ajustar Story 1.4 AC para "10 logos otimizados em SVG (preferencial) ou PNG/WebP transparente (Mapfre, SulAmérica, Suhai conforme `parceiros-fontes.md`)".

### I-006 — `architecture.md` ADR-005 cita founder "Ricardo **Guimarães**" — sobrenome incorreto
- **Onde:** ADR-005 linha 181 — JSON-LD escrito como "Ricardo Guimarães". Briefing fixa **Ricardo Farias** + **Anderson Guimarães** (linhas 9-10 e 134-135 do DNA).
- **Impacto:** se o JSON-LD for publicado como está, Knowledge Panel do Google retorna nome errado do fundador. Não é falha do PRD em si, mas precisa ser sinalizado para correção pré-Story 1.7.
- **Sugestão:** anotar em `FR-037` ou Risco 4: "JSON-LD `founder` deve usar Ricardo **Farias** + Anderson **Guimarães** (corrigir architecture.md ADR-005 antes da Story 1.7)."

---

## 5. Cobertura — Verificação 1 a 1

### Da copy (briefing 05)

| Item | Status | Onde no PRD / Comentário |
|------|--------|--------------------------|
| Headline Hero "Você construiu muito..." | ✓ | `FR-003` referencia linhas 11-22 |
| Mecanismo "Diagnóstico de Ângulo Morto Patrimonial" mencionado | ✓ | Citado em §1.2, `FR-005`, `FR-011`, US-04 |
| 3 personas com texto fiel | ✓ (com nota L-007) | `FR-006` referencia linhas 60-69 |
| 4 pilares de valor com copy fiel | ✓ (com M-003 item 5 — caixa alta) | `FR-007` referencia linhas 81-94 |
| **3 depoimentos** (Rômulo, Rodrigo, Marcos Roberto) | ✗ | **M-001 — PRD só cita 2** |
| Storytelling Seção 7 com nomes Ricardo+Anderson+Mapfre+1995+2013 | ⚠️ parcial | `FR-009` exige bento grid mas não obriga preservação nominal — m-004 |
| 3 passos da Seção 8 | ✓ | `FR-010` |
| 3 caminhos da Seção 9 (sem preços) com bônus listados | ⚠️ parcial | `FR-011` cobre estrutura mas não bônus — L-002 |
| Nosso Compromisso (ex-Garantia) sem palavras proibidas | ✓ | `FR-012` + `CON-003` |
| Visão de Futuro (positivo + negativo) | ✓ | `FR-013` |
| 5 objeções da Seção 12 | ✓ | `FR-014` |
| 10 perguntas do FAQ | ✓ | `FR-015` |
| Footer com endereço, CNPJ 18.940.835/0001-97, SUSEP, redes | ✓ | `FR-016` (mas e-mail divergente — M-004) |

### Da arquitetura/design

| Item | Status | Onde / Comentário |
|------|--------|-------------------|
| Manrope + Inter | ✗ | **M-005 — sem FR explícito** |
| Paleta primária + neutros tingidos azul | ✗ | **M-006 — sem FR explícito** |
| GSAP 3.14 + @gsap/react | ⚠️ parcial | Mencionados em Stories e architecture; sem pin no PRD — m-001 |
| 8 padrões de efeito mapeados em FRs | ✓ | `FR-024` a `FR-031` (1 FR por efeito) |
| Reduced-motion respeitado | ✓ | `FR-032` + `NFR-014` |
| Lighthouse targets ≥95 | ✓ | `NFR-001..004` |
| JSON-LD: LocalBusiness + InsuranceAgency + FAQPage | ✓ | `FR-037` + `FR-038` (mas I-006 sinaliza correção do nome do fundador) |
| next/image AVIF+WebP | ✓ | `FR-017`, `FR-020`, `NFR-020` |
| Bundle <100KB inicial | ✓ | `NFR-018` |

### Compliance

| Item | Status | Onde / Comentário |
|------|--------|-------------------|
| SUSEP "garantia/garantir" proibido | ✓ | `CON-003` cobre lista; reforçar correções da copy-audit (M-003) |
| Cookie banner consentimento (LGPD) | ✓ | `FR-046` + `CON-004` |
| /privacidade + /termos páginas | ✓ | `FR-039` + Story 1.7 + Risco #4 sinaliza revisão jurídica |

### Stories

| Item | Status | Comentário |
|------|--------|------------|
| Coerência das 8 stories com escopo total | ✓ | 13 seções + footer + SEO + Deploy todos cobertos |
| Dependências entre stories declaradas | ✓ | Tabela §8.1 lista dependência linear 1.1→1.8 |
| Complexidade T-shirt razoável | ✓ | 1×XL (Stories 1.4 — 4 seções com 4 efeitos), 4×L, 3×M — coerente com 16-24h de Fase 3 do execution-plan |
| AC alto-nível mencionado | ✓ | Cada story tem 4-7 ACs alto-nível |

⚠️ Notas em stories:
- Story 1.4 AC reflete erro M-001 (cita 2 quote cards) — corrigir
- Story 1.4 AC `parceiros-fontes.md` mismatch (I-005) — flexibilizar para SVG/PNG
- Story 1.7 deve incluir correção do e-mail (M-004) e do nome do fundador (I-006) antes do JSON-LD virar fonte

---

## 6. Veredito

**🟡 GO com ajustes minor — Nota 8/10**

**Justificativa:** o PRD é estruturalmente sólido, com cobertura ampla (49 FRs, 25 NFRs, 12 CONs, 8 stories, 5 riscos, 10 dependências), rastreabilidade aos documentos-fonte e quality gates explícitos. Captura corretamente: 13 seções, 8 CTAs, 8 efeitos GSAP, LGPD, compliance SUSEP base, estrutura de stories.

Pontos que tiram da nota máxima:
- **M-001 (Rômulo)** é gap de produto detectável em produção — mas conserto trivial.
- **M-002, M-003, M-005, M-006** são lacunas de governança (canonização da copy / tipografia / paleta) que o PO precisa fechar formalmente.
- **M-004 (e-mail) e I-006 (nome do fundador)** são bugs concretos no SEO/JSON-LD se não corrigidos pré-Story 1.7.
- **M-007 (mensagens WhatsApp)** afeta diretamente a conversão.

Nenhum dos findings é estrutural. Todos cabem em 1 ciclo Morgan→Pax (≤1h de revisão).

---

## 7. Prioridade de Correção

Lista ordenada — Morgan endereça nesta sequência antes de devolver para Pax:

1. **M-001** — Adicionar Rômulo: ajustar `FR-008` para 3 quote cards + atualizar Story 1.4 AC + sinalizar a Anderson que copy do depoimento de Rômulo precisa entrar em `05-copy-landing.md` (texto-fonte: `01-dna-completo.md` linhas 344-346).
2. **M-004** — Padronizar e-mail `comercial@rfgcorretora.com.br` no PRD (`FR-016`, `FR-037`, `FR-047`) e sinalizar correção pendente em `architecture.md` ADR-005 + `.env.local.example`.
3. **I-006** — Anotar em `FR-037` e Riscos: corrigir `architecture.md` ADR-005 founder de "Ricardo Guimarães" para "Ricardo Farias" pré-Story 1.7.
4. **M-002 + M-003** — Adicionar `CON-013` (copy canônica) e `FR-050` (correções da copy-audit) — fixa todos os 7 ajustes pendentes da copy-audit como AC formal.
5. **M-005 + M-006** — Adicionar `FR-051` (Manrope+Inter via next/font) e `FR-052` (paleta + neutros tingidos azul, sem dark mode).
6. **M-007** — Reforçar `FR-021` com tabela canônica das 8 mensagens WhatsApp (importar de `wireframes.md` §3).
7. **L-002, L-003, L-006, L-007** — Quatro CONs/FRs novos pequenos (single-page architecture, bônus por Caminho, Premissa Persuasiva, separação RFG≠PostFeito reforçada).
8. **m-001 a m-009 + I-002 a I-005 + L-001, L-004, L-005, L-008** — Refinamentos textuais nos FRs existentes (1-2 linhas cada).

**Estimativa de correção:** 45-60 minutos de @pm. Após retorno, segundo round de @po deve fechar GO sem ajustes (10/10).

---

## 8. Aprovações

- [x] **@po (Pax):** auditoria concluída — 2026-05-05 — veredito 🟡 GO com ajustes minor (8/10)
- [ ] **@pm (Morgan):** aplicar correções P1-P8 acima e devolver para 2º round @po
- [ ] **Anderson:** GO/NO-GO final pós-segundo round
