# RFG — Auditoria da Copy da Landing Page

> **Auditor:** Morgan (PM)
> **Data:** 2026-05-05
> **Inputs auditados:** `docs/briefing/01-dna-completo.md` (DNA + compliance) e `docs/briefing/05-copy-landing.md` (copy das 13 seções)
> **Critérios:** gramática/ortografia pt-BR, palavras proibidas pelo DNA, aderência ao tom (fraternal + urgência construtiva + transparência vulnerável), consistência factual e compliance SUSEP.

---

## 1. Erros Gramaticais e Ortográficos

| Linha (em `05-copy-landing.md`) | Trecho original | Problema | Correção sugerida |
|---|---|---|---|
| 33 | "Não um dia ruim qualquer — um acidente, uma incapacidade, um processo judicial, um sinistro grave." | OK gramaticalmente, mas a vírgula final antes de "um sinistro grave" está adequada. **Sem erro.** | — |
| 35 | "Banco quer vender produto, não resolver sua vida." | Frase forte, sem erro. | — |
| 47 | "Nada de produto empurrado. Nada de contrato que você assina sem entender. Só clareza — talvez pela primeira vez." | OK. | — |
| 51 | "Você fala diretamente com quem sabe." | OK. | — |
| 65 | "Médicos, engenheiros, advogados, dentistas — você exerce sua profissão exposto a riscos que um único processo pode transformar em prejuízo milionário." | "exposto a riscos" — concordância correta com "você" masculino genérico; tudo bem. | — |
| 91 | "O seguro de vida certo garante que eles continuam bem — mesmo sem você por perto." | **"garantir" é palavra de risco SUSEP** (ver seção 2). Recomendo substituir o verbo. | "O seguro de vida certo faz com que eles continuem bem…" |
| 105 | "Vocês têm carta branca para providenciar o melhor para mim e minha família, como sempre." | OK (depoimento literal). | — |
| 116 | "priorizar Mapfre, Porto Seguro, Bradesco Seguros e demais reconhecidas" | Adjetivo "reconhecidas" sozinho fica truncado. | "…e demais seguradoras reconhecidas" |
| 145 | "Mas para ser o consultor que o Marcelo nunca teve" | "o Marcelo" é a persona avatar do briefing — em landing pública, **referência interna vazada**. | "…ser o consultor que ninguém antes tinha sido." (remover nome da persona) |
| 195 | "Ricardo e Anderson acompanham cada cliente pelo nome — na renovação, no sinistro, na mudança de vida." | OK. | — |
| 232 | "**Preço:** A partir de R$ 180/mês *(valor varia conforme perfil e coberturas)*" | **Inconsistência factual** — Anderson confirmou que NÃO há valores definidos (ver Seção 9 reescrita). | Remover. |
| 251, 271 | Demais preços (R$ 380, R$ 580). | Mesma inconsistência factual. | Remover. |
| 277 | "Os valores acima são referências de entrada." | Idem — não existem valores definidos. | Remover bloco inteiro de preços. |
| 369 | "Em muitos casos, menos de R$ 200." | Cita valor sem fonte; confirmar com Ricardo/Anderson antes de publicar ou suavizar. | "Em muitos casos, uma fração disso." |
| 423 | "**O momento certo não vai aparecer com uma placa. Ele é agora**" | OK. | — |
| 444 | "Não. Enquanto 90% dos corretores focam só nisso, a RFG trabalha com o portfólio completo…" | OK. | — |
| 462 | "…com taxas que corroem o rendimento em silêncio." | OK. | — |

**Observações gerais de português:**
- Acentuação e crase: corretos em todo o texto.
- Pontuação: bem cuidada; uso intencional de frases curtas é estilístico e funciona.
- Não foram encontrados erros ortográficos relevantes — a copy está **limpa em pt-BR**.

---

## 2. Palavras Proibidas Detectadas (DNA — seção "Palavras Proibidas")

### 🚫 Proibidas Absolutas

| Linha | Trecho | Termo problemático | Sugestão |
|---|---|---|---|
| 91 (Seção 5, pilar 3) | "O seguro de vida certo **garante** que eles continuam bem" | "garante" — risco SUSEP em seguros, agrava em consórcio. Aproxima de "garantia" | "…faz com que eles continuem bem" / "…assegura que a vida deles segue" |
| 224 (Seção 9, Pacote 1) | "garantir que a família não fica desamparada" | "garantir" — mesmo problema | "…fazer com que a família não fique desamparada" / "…cuidar para que a família não fique desamparada" |
| 286-288 (Seção 10, headline) | "**NOSSA GARANTIA** — Você não arrisca nada. O risco é todo nosso." | Termo "garantia" no headline da seção. **Para seguro/consórcio, "garantia" é palavra-bandeira vermelha SUSEP.** Mesmo que o conteúdo seja "garantia de processo", o título é ambíguo. | "**NOSSO COMPROMISSO**" ou "**A NOSSA PROMESSA DE PROCESSO**" |
| 310 | "Essa é a **nossa garantia real**: transparência total antes, durante e depois." | Reforça o termo proibido. | "Esse é o nosso compromisso real: transparência total…" |

### ⚠️ Risco Moderado

| Linha | Trecho | Termo | Sugestão |
|---|---|---|---|
| 87 (Pilar 2) | "REALIZE SEUS SONHOS SEM PAGAR JUROS DE BANCO" | OK — não usa "fácil" nem "barato". | — |
| 232, 251, 271 | "A partir de R$…" | "A partir de" combinado com preço gera percepção de oferta-isca. Além da remoção (Seção 9 reescrita), evitar o padrão na landing. | Remover. |
| 282 | "**Confirmar preços com Ricardo e Anderson** antes de publicar" | Esta é nota de design, não copy publicada. OK. | — |
| 282 | "**Escassez honesta**: 'As vagas de diagnóstico são limitadas por mês.'" | "Vagas limitadas" é permitido pelo DNA. OK. | — |

**Termos do DNA que NÃO foram encontrados (bom sinal):** "fácil", "barato", "milagre", "100% de sucesso", "vendedor", "ganhe", "segredo", "fórmula mágica", "oferta por tempo limitado", "contemplação rápida".

**Palavra "corretor" aparece 9x** — o DNA marca como risco moderado. Está sendo usada de forma **intencionalmente contrastiva** ("90% dos corretores…", "a maioria dos corretores some") para diferenciar a RFG. Esse uso é **estratégico e correto** — a RFG se posiciona como o anti-corretor. Manter.

---

## 3. Quebras de Tom (Aderência ao DNA "Fraternal + Urgência Construtiva + Transparência Vulnerável")

| Seção | Trecho | Análise | Recomendação |
|---|---|---|---|
| 1 (Hero) | "Você construiu muito. Sua família está protegida se algo acontecer?" | Direto, mas falta o "tempero" fraternal de Anderson. Está mais "publicitário" do que "irmão mais velho". | Considerar variação: "Meu amigo, você construiu muito. Mas e se algo acontecer amanhã — sua família está protegida?" Testar A/B se houver dúvida. |
| 2 (Problema) | "Não é sua culpa não saber essa resposta. Banco quer vender produto, não resolver sua vida." | **Excelente** — fraternal + transparência ("não é sua culpa") + urgência construtiva. | Manter. |
| 3 (Oportunidade) | "Nada de produto empurrado. Nada de contrato que você assina sem entender. Só clareza — talvez pela primeira vez." | **Excelente** — espelha "deixa eu explicar" do DNA. | Manter. |
| 4 (Para Quem É) | "Você sustenta tudo sozinho e sabe que, se sair de cena, a família fica sem plano." | Direto e fraternal. OK. | Considerar a sugestão do próprio briefing: prefixar com "Isso é para você se…" (linha 73). |
| 5 (Pilares) | Headlines em CAIXA ALTA ("PROTEJA O QUE JÁ TEM") | DNA pede tom **conversacional, não protocolar**. CAIXA ALTA cheira a panfleto. | Trocar para Title Case: "Proteja o que já tem". O peso vem do conteúdo, não da capitulação. |
| 6 (Prova) | "Veja o que algumas delas têm a dizer." | OK, mas frio. Anderson diria "olha o que essa galera fala da gente". | Suavizar: "Olha o que parte dessa galera nos diz." (opcional — manter padrão se preferir tom mais sóbrio para Hero/Prova). |
| 7 (História) | "Em 1995, Ricardo Farias estava no mercado de seguros…" | **Excelente** — narrativa cinematográfica, tem cadência de "deixa eu explicar". | Manter. **MAS** ver inconsistência factual no item 4. |
| 8 (Como Funciona) | Headlines "PASSO 1", "PASSO 2" em maiúsculas. | Idem Seção 5 — estilo demais corporativo. | "Passo 1: O Diagnóstico…" funciona melhor. |
| 9 (Oferta) | Estrutura inteira **fora do DNA por causa dos preços fictícios.** | Reescrita completa em `05b-secao-9-revisada.md`. | Ver arquivo separado. |
| 10 (Garantia) | "Sabemos que você já foi enganado antes. Corretor que sumiu. Produto que não era o que prometeram." | **Perfeito** — transparência vulnerável genuína. | Manter (trocar apenas o termo "garantia" — ver item 2). |
| 11 (Visão Futuro) | "Sua esposa sente isso. Não precisa nem falar." | **Pressuposto heteronormativo** — exclui clientes solo, casais homoafetivos, mães solo, etc. | Trocar por: "Quem está perto de você sente isso. Não precisa nem falar." |
| 12 (Objeções) | "Entendo. Parece mais uma parcela num mês que já está apertado." | **Excelente** — fraternal puro. | Manter. |
| 13 (FAQ) | "Vocês somem depois que a gente assina?" / "Não. O Marcos Roberto…" | **Excelente** — usa nome próprio, prova social específica. | Manter. |

**Resumo de tom:** A copy tem **alta aderência ao DNA** (≈85%). Os principais pontos de quebra são:
1. Caixa alta excessiva nos headlines de pilares e passos (Seções 5 e 8).
2. Pressuposto heteronormativo na Seção 11.
3. Vazamento da persona-avatar "Marcelo" na Seção 7.
4. Headline "Garantia" da Seção 10 (compliance + tom).

---

## 4. Inconsistências Factuais

| Linha | Trecho | Problema | Correção |
|---|---|---|---|
| 49 (Seção 3) | "Ricardo Farias e Anderson Guimarães trabalham com o portfólio completo há mais de **35 anos**" | DNA diz "**35 anos de experiência combinados**" (somados). "Trabalham há 35 anos" sugere que cada um tem 35, ou que a empresa tem 35. **Ambíguo.** | "…trabalham com o portfólio completo há décadas — somando 35 anos de experiência combinada." |
| 129 (Seção 7) | "Em 1995, Ricardo Farias estava no mercado de seguros" | DNA diz Ricardo está desde 1995 (28 anos em 2023, ~31 em 2026). Coerente. | OK. |
| 134 | "Anderson Guimarães vivia o mesmo problema — só que do outro lado do balcão. Como gerente territorial na Mapfre" | DNA confirma. OK. | — |
| 143 | "Em **2013**, Ricardo e Anderson decidiram fazer diferente. Fundaram a RFG…" | DNA confirma 2013 (12 anos em 2025, **13 anos em 2026**). | Atualizar referências para "13 anos" se a landing for ao ar em 2026. Ver linhas 13, 100, 305, 467. |
| 147 | "**Nos 12 anos seguintes**, mais de 1.200 famílias passaram pela RFG." | Em 2026, são 13 anos. | "Em pouco mais de uma década, mais de 1.200 famílias…" (evita data dura) ou "Nos 13 anos seguintes…" |
| 100 (Seção 6) | "Mais de **1.200 famílias atendidas**" | DNA confirma. OK. | — |
| 153 | "registro SUSEP ativo desde 1995" | DNA confirma. OK. | — |
| 305 (Seção 10) | "Trabalhamos com mais de 1.200 famílias em **12 anos**." | Idem linha 147. | Atualizar para 13 anos OU usar "em mais de uma década". |
| 399 (Seção 12) | "Você fala direto com Ricardo e Anderson — os fundadores, com **35 anos de experiência combinados**." | OK — coerente com DNA. | — |
| 447 (FAQ) | "Dois especialistas com **mais de 35 anos de experiência combinada**." | OK. | — |
| 459 (FAQ) | "Mais de **30 anos** operando" | DNA diz registro SUSEP **desde 1995** (31 anos em 2026). RFG **fundada em 2013** (13 anos). **CONFUSÃO factual** — "30 anos operando" mistura registro do Ricardo com fundação da RFG. | "Registro SUSEP ativo desde 1995. A RFG opera desde 2013 — atravessamos crises porque fazemos certo." |
| 232, 251, 271 | Preços R$ 180 / R$ 380 / R$ 580 | **Anderson confirmou em 2026-05-05: NÃO há valores definidos.** Diagnóstico é gratuito; produtos personalizados. | Remover (ver `05b-secao-9-revisada.md`). |
| 369 (Seção 12) | "Em muitos casos, menos de R$ 200." | Cita valor sem fonte. | Validar com Ricardo/Anderson ou suavizar para "Em muitos casos, uma fração disso." |
| 12 (DNA, biografia) | "**35 anos de experiência combinados**" | Em 2026: Ricardo 31 anos (desde 1995) + Anderson (anos no mercado a confirmar). Soma ≈ 35 anos? **Validar com sócios.** | Confirmar antes de publicar. |

---

## 5. Score de Qualidade por Seção (0-10)

| Seção | Título | Score | Comentário |
|---|---|---|---|
| 1 | Hero | **8.5** | Headline forte e direto; CTA claro. Falta um toque mais "irmão mais velho" — está mais "marketing" do que "Anderson conversando". |
| 2 | Problema Primário | **9.5** | **Destaque da landing.** Aplica perfeitamente "Ponto Cego Patrimonial" do DNA. Transparência vulnerável + urgência construtiva. Excelente. |
| 3 | A Oportunidade | **9.0** | Apresenta solução com clareza. Pequeno ajuste em "35 anos" (ver item 4). |
| 4 | Para Quem É | **8.0** | 3 personas bem segmentadas. Pode ganhar com o prefixo "Isso é para você se…" sugerido no próprio briefing. |
| 5 | Proposta de Valor | **7.5** | Bons pilares, mas headlines em CAIXA ALTA quebram tom fraternal. Pilar 3 usa "garante" (proibido). Trocar maiúsculas por Title Case. |
| 6 | Prova | **8.0** | Depoimentos reais e fortes. Headline neutra (poderia ser mais quente). Aguardar depoimentos com dados mensuráveis (sugestão do próprio briefing). |
| 7 | História de Origem | **9.0** | Storytelling forte. Pequenos ajustes: remover nome "Marcelo" (persona interna vazada) e atualizar "12 anos" para coerência factual. |
| 8 | Como Funciona | **8.5** | Estrutura em 3 passos é clara. Reduzir CAIXA ALTA dos headlines. |
| 9 | Oferta e Preços | **3.0** | **Reescrita necessária.** Preços fictícios + termo "garantir" + estrutura assume escolha de pacote antes do diagnóstico. **Reescrita em `05b-secao-9-revisada.md`.** |
| 10 | Garantia | **6.5** | Conteúdo é excelente (transparência vulnerável genuína). Mas o **título "GARANTIA" é compliance-risk** para SUSEP. Trocar headline para "NOSSO COMPROMISSO" / "A NOSSA PROMESSA DE PROCESSO". |
| 11 | Visão de Futuro | **8.0** | Imersão funciona bem. Único ajuste: trocar "Sua esposa sente isso" por "Quem está perto de você sente isso" (inclusão). |
| 12 | Últimas Dúvidas | **9.0** | Cada objeção responde com tom fraternal e prova social. Validar valor "menos de R$ 200" com sócios. |
| 13 | FAQ | **8.5** | 10 perguntas cobrem dúvidas reais. Corrigir "30 anos operando" (FAQ 7) — confusão factual. |

**Score médio da landing: 7.95 / 10** — copy de **alta qualidade** com 3 ajustes críticos (Seção 9 reescrita, headline da Seção 10, palavra "garante" no pilar 3) e ~10 ajustes finos.

---

## 6. ✅ Compliance SUSEP — Checklist

| Item | Status | Detalhe |
|---|---|---|
| ❌ **Promessas de tempo de contemplação?** | **OK — sem violação** | A FAQ 4 (linha 449-450) responde de forma exemplar: "Depende do seu perfil… sem prometer o que não pode ser prometido." |
| ❌ **Garantias absolutas?** | **3 violações detectadas** | Linha 91: "garante que eles continuam bem". Linha 224: "garantir que a família não fica desamparada". Linhas 286, 310: headline e fechamento da Seção 10 usando "Garantia"/"garantia real". **Trocar todas.** |
| ❌ **Comparações enganosas de rendimento?** | **OK — sem violação** | Seção 5 e Seção 12 mencionam "juros de banco" e "previdência do banco com taxas absurdas" de forma factual e qualitativa, sem comparação numérica enganosa. FAQ 8 (linha 462) é direta sem prometer rendimento específico. |
| ❌ **Promessas de resultado em consórcio?** | **OK — sem violação** | "Consórcio sem juros de banco" é fato (consórcio realmente não tem juros, tem taxa de administração). Não há promessa de "contemplação rápida". |
| ❌ **Linguagem de "milagre", "fórmula", "100% de sucesso"?** | **OK — sem violação** | Nenhum desses termos aparece. |
| ❌ **Preços fictícios ou não confirmados?** | **3 violações** | Pacotes Seção 9 com "A partir de R$ 180/380/580" — Anderson confirmou que não há valores definidos. **Reescrita em `05b-secao-9-revisada.md`.** Validar também valor "menos de R$ 200" na linha 369. |
| ✓ **Linguagem permitida ("estratégia", "metodologia", "processo otimizado")** | **OK — bem aplicada** | "Diagnóstico de Ângulo Morto Patrimonial" (mecanismo único), "processo em três etapas" (Seção 8), "estratégia clara" (Pacote Legado), "sessão estratégica" (Pacote 2 e 3). Aderência forte ao vocabulário recomendado pelo DNA. |
| ✓ **Transparência sobre limitações** | **OK — Seção 10 e FAQ 4** | "Não controlamos a sorte, controlamos a estratégia" (DNA, linha 193) está bem refletido na FAQ 4 e Seção 10. |
| ✓ **Registro SUSEP citado corretamente** | **OK** | Hero, Seção 6 (sugestão de design), Seção 10, FAQ 7. **Mas:** corrigir FAQ 7 ("30 anos operando" — confunde registro do Ricardo com fundação da RFG). |

---

## 7. Resumo Executivo de Ajustes Necessários

### 🔴 Crítico (bloqueia publicação)
1. **Seção 9 — reescrita completa** (preços fictícios + "garantir") → ver `05b-secao-9-revisada.md`.
2. **Seção 10 — trocar headline "GARANTIA"** por "NOSSO COMPROMISSO" / "PROMESSA DE PROCESSO" (compliance SUSEP).
3. **Seção 5, Pilar 3 — trocar "garante que eles continuam bem"** por "faz com que eles continuem bem".

### 🟡 Importante (afeta qualidade percebida)
4. **Seção 7** — remover nome "Marcelo" (persona-avatar vazada na linha 145).
5. **Seções 7 e 10** — atualizar "12 anos" para coerência factual (2026 = 13 anos da RFG).
6. **FAQ 7 (linha 459)** — separar "registro SUSEP desde 1995" de "RFG opera desde 2013".
7. **Seção 11** — trocar "Sua esposa sente isso" por "Quem está perto de você sente isso".
8. **Seções 5 e 8** — trocar headlines em CAIXA ALTA por Title Case.

### 🟢 Refinamento
9. Validar com Ricardo/Anderson o valor "menos de R$ 200" (linha 369).
10. Considerar prefixo "Isso é para você se…" na Seção 4 (sugestão do próprio briefing).
11. Considerar variação mais fraternal no Hero ("Meu amigo, você construiu muito…").

---

> **Próximo passo:** aplicar reescrita da Seção 9 (`05b-secao-9-revisada.md`), revisar pelo menos os 3 ajustes críticos, e enviar para validação de Ricardo/Anderson antes de publicar.
