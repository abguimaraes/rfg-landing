# RFG Landing PRD v0.2 — Auditoria do Product Owner (2º round)

> **Auditor:** Pax (Product Owner) · **Data:** 2026-05-05
> **PRD auditado:** `docs/prd/rfg-landing-prd.md` (v0.2, autor Morgan)
> **Auditoria anterior:** `docs/prd/rfg-landing-prd-audit.md` (v1, 28 findings — 7 M / 9 m / 8 L / 6 I, veredito 8/10)
> **Método:** verificação cirúrgica 1 a 1 dos 28 findings da v1 + caça a regressões + validação de coerência estrutural + cross-check com `03-contato.md`, `01-dna-completo.md`, `05-copy-landing.md`, `parceiros-fontes.md`, `architecture.md`.

---

## 1. Tabela de Findings v1 → Status v2

### 1.1 Findings Críticos (M — Major)

| ID | Título | Status v2 | Onde foi aplicado no PRD v0.2 | Comentário |
|----|--------|-----------|-------------------------------|------------|
| **M-001** | Rômulo (3º depoimento) | ✅ **resolvido** | FR-008 (3 quote cards Rômulo+Rodrigo+Marcos Roberto) + Story 1.4 AC + Dependência #11 + texto canônico de Rômulo embutido em FR-008 | Excelente — Morgan inseriu o texto literal do depoimento de Rômulo direto no FR-008 e marcou a inserção em `05-copy-landing.md` como **prerequisite** da Story 1.4. Sem ambiguidade. |
| **M-002** | Copy canônica como CON | ✅ **resolvido** | CON-013 com checklist textual de 10 termos proibidos + referência à versão pós-correções 2026-05-05 + 3 ajustes 🔴 inegociáveis explicitados | Resolução superior ao sugerido — a tabela de termos proibidos com substitutos cobre todos os ataques de regressão futura via `pnpm test` ou grep. |
| **M-003** | Correções da copy-audit como FR | ✅ **resolvido** | FR-050 (lista os 7 ajustes) + reflexões em FR-006 (prefixo), FR-007 (Title Case + "faz com que"), FR-009 (sem "Marcelo"), FR-010 (Title Case), FR-012 ("13 anos" + "NOSSO COMPROMISSO"), FR-013 ("Quem está perto"), FR-014 ("menos de R$ 200"), FR-015 (FAQ 7 + "13 anos") | Cobertura redundante propositalmente: cada ajuste aparece tanto no FR-050 quanto no FR da seção específica. Reduz risco de esquecer no PR. |
| **M-004** | E-mail divergente (`contato@` vs `comercial@`) | ✅ **resolvido** | CON-014 (canônico) + FR-016 (footer) + FR-037 (JSON-LD) + FR-047 (LGPD) + Story 1.7/1.8 ACs + QG 9.5/9.6 + Riscos §10.1 + Dependência #13 | Endereçamento múltiplo. Cross-check com `03-contato.md` linha 9 confirma `comercial@rfgcorretora.com.br` como canônico. |
| **M-005** | Tipografia formalizada | ✅ **resolvido** | FR-051 (Manrope+Inter via `next/font/google`, weights, `display: swap`, `adjustFontFallback`, `preload`) + Story 1.2 AC + Risco R2 mitigação | FR-051 cita explicitamente o Risco R2 como justificativa — boa rastreabilidade. |
| **M-006** | Paleta + neutros tingidos | ✅ **resolvido** | FR-052 (paleta primária + neutros tingidos azul hue ~210 + tokens drop-in + sem dark mode) + Story 1.1 AC | Inclusive cita os hex codes literais (`#246BB2`/`#3688C8`/`#4CB3E6`) — congelado contra drift. |
| **M-007** | Mensagens WhatsApp canônicas | ✅ **resolvido** | FR-021 reescrito com **tabela canônica de 8 mensagens** (texto literal + URL final encoded) + FR-022 referencia o enum + Story 1.2 AC + QG 9.3 valida as 8 strings | Implementação superior ao pedido — incluiu até as URLs URL-encoded prontas, validando spot-check de URL-encoding. Cross-check com `03-contato.md` confirma `5582982359028` no número e os textos batem com `wireframes.md` §3. |

**Resumo M:** 7/7 ✅ resolvidos.

---

### 1.2 Findings Importantes (m — minor)

| ID | Título | Status v2 | Onde foi aplicado | Comentário |
|----|--------|-----------|-------------------|------------|
| **m-001** | Versões pinadas GSAP | ✅ **resolvido** | NFR-026 (`gsap@^3.14 + @gsap/react@^2`) + Risco R3 mitigação | — |
| **m-002** | Marquee fallback reduced-motion | ✅ **resolvido** | FR-031 ("grid estático 5x2 desktop / 2x5 mobile, todos os 10 logos visíveis") + Story 1.4 AC | Especificação clara de layout fallback. |
| **m-003** | Otimização SVG parceiros | ✅ **resolvido** | NFR-027 (svgo + Tokio Marine target <15KB + PNG transparência alpha) + FR-020 + Story 1.4 AC | Inclui target numérico (Tokio Marine 43KB → <15KB) — testável em CI. |
| **m-004** | Storytelling Seção 7 — nomes literais | ✅ **resolvido** | FR-009 ("preserva nomes literais Ricardo Farias + Anderson Guimarães + Mapfre + datas 1995 e 2013") + Story 1.4 AC | — |
| **m-005** | Sticky nav variação mobile/desktop | ✅ **resolvido** | FR-002 reescrito com bullets desktop (≥1024px com 4 links âncora + CTA) e mobile (<1024px logo + ícone WhatsApp 24px sem hambúrguer) + Story 1.3 AC | — |
| **m-006** | Tríade credenciais Hero AC | ✅ **resolvido** | FR-003 expandido com ordem (badge SUSEP em cima + 2 badges no rodapé) + responsivo "2 badges em linha + 1 abaixo se não couber em 320px" + Story 1.3 AC | — |
| **m-007** | Reflow Seção 11 mobile | ✅ **resolvido** | FR-013 ("stack mobile com positivo no topo, negativo abaixo") + Story 1.6 AC | — |
| **m-008** | Conversão Meta Pixel | ✅ **resolvido** | FR-044 (`whatsapp_redirect → Lead` + `cta_click → InitiateCheckout` gated por consent) + Story 1.2 AC | — |
| **m-009** | Scroll depth 75% conversão | ✅ **resolvido** | FR-045 ("marco 75% como conversion event no GA4") + QG 9.5 + §1.3 KPI secundária + Story 1.8 AC | Cobertura tripla (FR + KPI + QG). |

**Resumo m:** 9/9 ✅ resolvidos.

---

### 1.3 Lacunas (L)

| ID | Título | Status v2 | Onde foi aplicado | Comentário |
|----|--------|-----------|-------------------|------------|
| **L-001** | Sem Framer Motion / Lenis | ✅ **resolvido** | CON-015 (animation lib única — GSAP + ScrollTrigger; Framer Motion e Lenis "explicitamente proibidos") | — |
| **L-002** | Bônus dos 3 Caminhos | ✅ **resolvido** | FR-011 com bônus literais por caminho (Caminho 1: Checklist; Caminho 2: Guia + Checklist; Caminho 3: Guia + Checklist + Sessão Estratégica) + Story 1.5 AC | Bônus com nomes literais ("Meu Patrimônio Blindado — 7 Passos...", "Desvendando a Previdência Inteligente", "Consórcio sem juros — Seu Próximo Imóvel ou Carro"). |
| **L-003** | Single-page architecture | ✅ **resolvido** | CON-016 (apenas `/`, `/privacidade`, `/termos`; navegação por âncoras `#sobre/#como-funciona/#caminhos/#faq`) | — |
| **L-004** | Tríade de Autoridade DNA | ✅ **resolvido** | FR-008 ("ancora visualmente as 3 credenciais oficiais do DNA: Experiência de Vida Real + Resultados Comprovados + Especialização Real") | — |
| **L-005** | KPI primária 3% CTR — rastreamento | ✅ **resolvido** | §1.3 ("Ambos eventos configurados como conversion event") + QG 9.5 + Story 1.8 AC ("`whatsapp_redirect` e `scroll_depth=75` marcados como conversion events") | — |
| **L-006** | Separação RFG ≠ PostFeito | ✅ **resolvido** | CON-011 reforçado ("nenhum import direto, nenhum mono-repo, nenhum reuso de tokens CSS via package; deploy isolado") | — |
| **L-007** | Premissa Persuasiva e Mecanismos Únicos | ✅ **resolvido** | FR-004 ("Ponto Cego Patrimonial" mecanismo único do problema) + FR-005 ("Diagnóstico de Ângulo Morto Patrimonial" mecanismo único da solução) + US-03/US-04 atualizadas | — |
| **L-008** | Fotos individuais Ricardo+Anderson | ✅ **resolvido** | FR-018 ("Fotos individuais `ricardo-01` e `anderson-01` ficam reservadas para v2 — não usadas em v1") | Decisão (a) escolhida — limpa e sem ambiguidade. |

**Resumo L:** 8/8 ✅ resolvidos.

---

### 1.4 Inconsistências (I)

| ID | Título | Status v2 | Onde foi aplicado | Comentário |
|----|--------|-----------|-------------------|------------|
| **I-001** | E-mail divergente | ✅ **resolvido** | Coberto em M-004 / CON-014 | Duplicado proposital com M-004 — OK. |
| **I-002** | "12 anos" vs "13 anos" | ✅ **resolvido** | CON-013 (checklist) + FR-012 (Seção 10) + FR-015 (FAQ 10) + Stories 1.4-1.6 ACs ("texto '13 anos' não '12 anos'") | Reforçado em 4 pontos do PRD. |
| **I-003** | Layout iframe Maps | ✅ **resolvido** | FR-016 ("1 col mobile / coluna lateral desktop") + Story 1.6 AC | — |
| **I-004** | CTAs 6 vs 8 | ✅ **resolvido** | PRD consistente em 8 + sinalizado update silencioso de `00-execution-plan.md` e `architecture.md` ADR-002 (não bloqueante v1) | Aceitável — finding original já era informacional. |
| **I-005** | Logos SVG vs PNG mistos | ✅ **resolvido** | FR-020 ("SVG preferencial OU PNG/WebP transparente para Mapfre, SulAmérica, Suhai") + Story 1.4 AC | — |
| **I-006** | Founder "Ricardo Guimarães" → "Ricardo Farias" | ✅ **resolvido** | CON-014 + FR-037 (validação `founder[0].name = "Ricardo Farias"` + `founder[1].name = "Anderson Guimarães"`) + Story 1.7 dependência + Riscos §10.1 + Dependência #13 + QG 9.5 | Endereçamento múltiplo, com Quality Gate de inspeção textual no JSON-LD. |

**Resumo I:** 6/6 ✅ resolvidos.

---

### 1.5 Resumo agregado

| Categoria | Total v1 | Resolvidos v2 | Parciais | Não resolvidos | Mudança de direção |
|-----------|----------|---------------|----------|----------------|-------------------|
| Major (M) | 7 | 7 | 0 | 0 | 0 |
| minor (m) | 9 | 9 | 0 | 0 | 0 |
| Lacunas (L) | 8 | 8 | 0 | 0 | 0 |
| Inconsistências (I) | 6 | 6 | 0 | 0 | 0 |
| **TOTAL** | **30** | **30** | **0** | **0** | **0** |

> **Nota:** a auditoria v1 declarou 28 findings no resumo de capa, mas a contagem 1 a 1 totaliza 30 itens distintos (7 M + 9 m + 8 L + 6 I). Independente da contagem, **todos foram endereçados na v0.2**.

---

## 2. Findings Novos no Re-audit

Nenhum finding **Major** ou **minor** detectado como regressão ou descoberta nova. A revisão cirúrgica buscou:

- **Numeração quebrada:** ❌ não — FRs 001-052 / NFRs 001-027 / CONs 001-016 totalmente sequenciais.
- **Conflitos entre CONs novos e antigos:** ❌ não — CON-013 (copy canônica) reforça CON-003 (SUSEP) e CON-006 (tom de voz); CON-014 (contato canônico) não conflita com nenhum existente; CON-015 (animation lib) não conflita; CON-016 (single-page) reforça implícitos do escopo §2.1.
- **ACs de Stories desalinhados com FRs alterados:** ❌ não — verificado 1 a 1: Story 1.1 cita FR-052; Story 1.2 cita FR-051 + tabela FR-021; Story 1.3 cita FR-002/FR-003 atualizados + FR-050 prerequisite; Story 1.4 cita FR-008 (3 depoimentos) + FR-009 + FR-031 fallback; Story 1.5 cita FR-011 bônus + "NOSSO COMPROMISSO"; Story 1.6 cita FR-013 (mobile order) + FR-015 (FAQ 7/10) + e-mail comercial + Maps layout; Story 1.7 cita FR-037 validações + ADR-005 corrigido; Story 1.8 cita FR-021 + e-mail comercial + conversion events.
- **Tabela WhatsApp coerente com `03-contato.md`:** ✅ sim — número `5582982359028` confirmado, mensagem #1 espelha exemplo da linha 28 do briefing, formato `wa.me` com `?text=` URL-encoded coerente com linha 23. As 8 chaves do enum (`diagnostico`, `essencial`, `completa`, `legado`, `cta_unico`, `sticky_nav`, `objecoes`, `footer`) cobrem 100% dos pontos definidos em `wireframes.md` §3.
- **Persona "Marcelo" em §3.1:** ⚠️ **observação informacional (I — não bloqueante)** — Persona aparece em §3.1 com **warning explícito** "interna / NUNCA aparece na landing" + referência ao bug original do `05-copy-landing.md`. Decisão correta (PRD precisa documentar a persona-avatar para entendimento de público-alvo, mas marca explicitamente que é mater interno). Não é regressão — é estrutura editorial defensável.

### 2.1 Observações informacionais (i — não bloqueantes)

| ID | Observação | Justificativa para não bloqueio |
|----|------------|--------------------------------|
| **i-001** | §3.1 expõe Marcelo na seção de personas do PRD com warning "interna / NUNCA aparece na landing" | Aceitável — PRD é doc interno e o warning é claro. CON-013 + FR-009 + QG 9.4 garantem que o nome não vaza no produto final. |
| **i-002** | FR-005 referencia `05-copy-landing.md` linhas 43-51 mas a copy-audit indica que a Seção 3 não teve revisão crítica — manter como está | Não bloqueante. |
| **i-003** | Section §1.1 cita "Marcelo" novamente (parêntese no §1.1 sobre persona interna) — coerente com §3.1 | Aceitável, mesmo padrão de §3.1 com warning. |
| **i-004** | "35 anos de experiência combinada" (FR-003, FR-008) vs "13 anos da RFG" — coerente com `01-dna-completo.md` (35 = Ricardo SUSEP 1995 + Anderson combinado; 13 = empresa RFG fundada 2013) | OK, números têm âncoras distintas. |

Nenhuma das observações `i-*` configura bloqueio ou ajuste obrigatório.

---

## 3. Coerência Estrutural

### 3.1 Numeração sequencial

| Tipo | Faixa | Total | Sequencial sem buracos? |
|------|-------|-------|------------------------|
| FR | FR-001 → FR-052 | 52 | ✅ sim |
| NFR | NFR-001 → NFR-027 | 27 | ✅ sim |
| CON | CON-001 → CON-016 | 16 | ✅ sim |
| US | US-01 → US-12 | 12 | ✅ sim |
| Stories | 1.1 → 1.8 | 8 | ✅ sim |
| Riscos | 1 → 5 + secundários | 5 + lista §10.1 | ✅ sim |
| Dependências | 1 → 13 | 13 | ✅ sim |

> Crescimento da v0.1 para v0.2: +3 FRs (049→052), +2 NFRs (025→027), +4 CONs (012→016), +3 Dependências (10→13). Coerente com o que Morgan declarou no Changelog v0.2.

### 3.2 Stories vs FRs — coerência

Todas as 8 stories citam explicitamente os FRs alterados:
- Story 1.1 → FR-052 (paleta) ✅
- Story 1.2 → FR-051 (tipografia) + FR-021 (tabela 8 mensagens WhatsApp) + FR-022 (helper) + FR-044 (Meta Pixel mapping) ✅
- Story 1.3 → FR-002 (sticky nav variação) + FR-003 (tríade Hero) + FR-050 prerequisite ✅
- Story 1.4 → FR-008 (3 depoimentos) + FR-009 (nomes literais + sem "Marcelo" + "13 anos") + FR-020 (logos SVG/PNG) + FR-031 (marquee fallback) ✅
- Story 1.5 → FR-011 (bônus por caminho) + FR-012 ("NOSSO COMPROMISSO" + "13 anos") ✅
- Story 1.6 → FR-013 (mobile order) + FR-014 ("menos de R$ 200") + FR-015 (FAQ 7/10) + FR-016 (e-mail + Maps layout) ✅
- Story 1.7 → FR-037 (validações JSON-LD) + ADR-005 dependency ✅
- Story 1.8 → FR-021 (8 CTAs validados) + e-mail comercial + conversion events ✅

### 3.3 Changelog atualizado

✅ Changelog topo (linha 23) lista correções aplicadas. Tabela §14 "Changelog (legado)" também atualizada com v0.2 e v0.1. Coerentes entre si.

### 3.4 §13 "Resposta à Auditoria PO" — rastreabilidade

✅ Seção §13 completa lista os 30 findings da v1 (M-001..M-007, m-001..m-009, L-001..L-008, I-001..I-006) marcados como `[x]` e indica onde cada um foi aplicado. Documento auto-rastreável.

### 3.5 Cross-check com documentos-fonte

| Documento | Coerência v0.2 |
|-----------|---------------|
| `03-contato.md` (linhas 8-9, 23, 28, 33, 37-38) | ✅ e-mail `comercial@rfgcorretora.com.br`, telefone `+55 82 98235-9028`, número `5582982359028`, mensagem #1 confirmada |
| `01-dna-completo.md` (linhas 126-154, 244-296, 322-410) | ✅ 3 credenciais oficiais + persona Marcelo INTERNA + Ponto Cego Patrimonial + Diagnóstico de Ângulo Morto Patrimonial |
| `05-copy-landing.md` (versão pós-correções 2026-05-05) | ✅ canonização explícita em CON-013; texto Rômulo a inserir antes da Story 1.4 (Dependência #11) |
| `parceiros-fontes.md` | ✅ 10 logos com SVG preferencial, Mapfre/SulAmérica/Suhai PNG transparência |
| `wireframes.md` §2 e §3 | ✅ ordem das 13 seções + 8 CTAs com chaves enum |
| `architecture.md` ADR-005 | ⚠️ ainda contém erros (`contato@` + "Ricardo Guimarães") — endereçado como **dependência da Story 1.7** (CON-014 + Dependência #13). **Não é falha do PRD** — PRD declara explicitamente que é correção pré-Story 1.7. |
| `design-system.md` §2-3 + §13 | ✅ paleta + tipografia + sem dark mode |
| `effects-reference.md` | ✅ 8 efeitos GSAP rastreados em FR-024..FR-031 |

---

## 4. Veredito Final

# 🟢 GO FINAL — Nota **10/10**

**Justificativa:**
- **30/30 findings da auditoria v1 resolvidos** (7 Major, 9 minor, 8 Lacunas, 6 Inconsistências), com cobertura redundante em FR + Story AC + Quality Gate em todos os pontos críticos.
- **Zero regressões** introduzidas pelas mudanças. Numeração FR/NFR/CON 100% sequencial sem buracos.
- **Coerência estrutural superior à v0.1** — tabela canônica das 8 mensagens WhatsApp (FR-021), checklist de palavras proibidas (CON-013), validações textuais no JSON-LD (FR-037 + QG 9.5), referências cruzadas Story↔FR↔Quality Gate.
- **Rastreabilidade exemplar** — §13 lista os 30 findings com mapeamento explícito; cross-check com 8 documentos-fonte (03-contato, 01-dna, 05-copy, parceiros, wireframes, architecture, design-system, effects-reference) sem divergências (exceto ADR-005, que é pré-existente e endereçado como dependência da Story 1.7).
- **Documento ainda funciona como PRD único** — uma pessoa lendo só este arquivo entende escopo, decisões, requisitos, stories, gates, riscos e dependências. A v0.2 não inflou o doc — apenas o adensou onde fazia falta.

Pequenas observações `i-*` (4 itens) são **informacionais e não bloqueantes** — não afetam a entrega nem a qualidade do produto final.

---

## 5. Próximos Passos

1. **@po (Pax) — concluído:** 2º round aprovado em 10/10. PRD está pronto para drafting de stories.
2. **Anderson:** GO/NO-GO formal — sugestão **GO** sem ressalvas.
3. **@sm (River):** assumir e draftar Story 1.1 (`*draft 1.1`) usando `template-sdc.yaml` + checklist `story-draft-checklist.md`.
4. **@architect (Aria) em paralelo:** corrigir `architecture.md` ADR-005 (e-mail `comercial@` + founder "Ricardo Farias") — Dependência #13 — antes da Story 1.7 começar.
5. **Anderson + @pm (Morgan):** inserir texto canônico do depoimento de Rômulo em `05-copy-landing.md` antes da Story 1.4 — Dependência #11.
6. **Anderson:** validar com Ricardo o valor "menos de R$ 200" (Seção 12, FR-014) ou autorizar a substituição por "uma fração disso".

---

## 6. Aprovações

- [x] **@po (Pax) — auditoria v0.1:** 2026-05-05 — 8/10 (28 findings)
- [x] **@pm (Morgan) — v0.2:** 2026-05-05 — todos os findings aplicados
- [x] **@po (Pax) — auditoria v0.2 (este documento):** 2026-05-05 — **🟢 GO FINAL 10/10**
- [ ] **Anderson:** GO/NO-GO final — pendente

---

## 7. Changelog desta auditoria

| Data | Versão | Autor | Mudança |
|------|--------|-------|---------|
| 2026-05-05 | audit v2 | Pax | Re-auditoria do PRD v0.2 — 30/30 findings v1 resolvidos, zero regressões, veredito 10/10 GO FINAL |
| 2026-05-05 | audit v1 | Pax | Auditoria inicial PRD v0.1 — 28 findings (7 M / 9 m / 8 L / 6 I), veredito 8/10 GO com ajustes minor |
