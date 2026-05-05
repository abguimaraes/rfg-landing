# RFG Landing — PRD v0.4

> **Autor:** Morgan (PM Agent) · **Data:** 2026-05-05
> **Status:** Draft v0.3 (decisões finais Anderson aplicadas) — pronto para Dex iniciar Story 1.1
> **Escopo:** Landing institucional v1 da RFG Corretora de Seguros (`www.rfgcorretora.com.br`)
> **Epic:** RFG Landing v1 — Captação via WhatsApp

**Documentos-fonte (rastreabilidade):**
- DNA, voz e avatar: `docs/briefing/01-dna-completo.md`
- Contato e CTAs: `docs/briefing/03-contato.md`
- Copy aprovada (13 seções): `docs/briefing/05-copy-landing.md`
- Auditoria de copy (correções): `docs/plan/copy-audit.md`
- Decisões D1-D9: `docs/plan/00-execution-plan.md`
- Wireframes + ordem efeitos: `docs/plan/wireframes.md`
- Stack + ADRs + perf: `docs/plan/architecture.md`
- Tokens + Tailwind: `docs/plan/design-system.md`
- Tipografia: `assets/brand/typography.md`
- Cores: `assets/brand/colors.md`

---

## Changelog
- **v0.4 (2026-05-05):** Anderson informou que os 3 depoimentos antigos (Rômulo, Rodrigo, Marcos Roberto) eram fakes. Substituídos por 4 reais (Felipe Alexandre Oliveira, Eder Clemente Pio, Henrique Martins Santos, Walter Campos). Layout 2×2 substituindo 3-col uniforme. FR-008 e CON-013 atualizados; Story 1.4 AC-14 ajustada; wireframes Seção 6 redesenhada para 4 cards.
- **v0.3 (2026-05-05):** aplicadas decisões finais Anderson — Opção A para Seção 6 (3-col uniforme), número SUSEP não será exibido (mantido apenas "desde 1995"), LGPD template padrão sem revisão jurídica hard. Stories 1.1/1.8 Complexity ajustada para L (audit Pax v2 m1+m8 resolvido).
- **v0.2 (2026-05-05):** aplicação dos findings da auditoria PO Pax (8/10 → ratificação esperada 10/10). Inclui M-001 (3º depoimento Rômulo), M-002 (canonização da copy), M-003 (correções da copy-audit), M-004 (e-mail comercial canônico + nome do sócio Ricardo Farias), M-005 (tipografia formalizada), M-006 (paleta formalizada), M-007 (tabela das 8 mensagens WhatsApp), todos os L/m/I do audit. Total: 7 FRs novos, 4 CONs novos, 1 NFR novo, ajustes em ~15 FRs/Stories existentes.
- **v0.1 (2026-05-05):** primeira versão — 49 FRs, 25 NFRs, 12 CONs, 8 stories, 5 riscos, 10 dependências.

---

## 1. Visão e Objetivo

### 1.1 Problema do negócio
A RFG Corretora de Seguros opera há **13 anos** (fundada em 2013) em Maceió/AL com mais de 1.200 famílias atendidas, registro SUSEP ativo desde 1995 e portfólio completo (vida, patrimônio, consórcio, previdência, RC profissional). **Apesar disso, não tem presença digital institucional.** Toda captação hoje depende de indicação direta — o avatar **persona "Marcelo"** (interno; **não exposto na landing**, ver `01-dna-completo.md` linhas 244-296: profissional liberal/pequeno empresário, 32-52 anos, classe média/média-alta) que pesquisa "corretora de seguros Maceió" no Google ou clica num anúncio do Instagram **não encontra a RFG online**. Resultado: a marca perde leads qualificados que já estão no momento de pesquisa ativa.

### 1.2 Objetivo do produto
Publicar uma landing institucional única em `www.rfgcorretora.com.br` que:
1. Apresente a RFG com clareza, autoridade e tom fraternal-consultivo (DNA do briefing)
2. Direcione todo o tráfego qualificado para o **Diagnóstico de Ângulo Morto Patrimonial gratuito** via WhatsApp
3. Sirva como destino de campanhas pagas (Meta Ads) e tráfego orgânico (SEO local "corretora de seguros Maceió")

### 1.3 Métrica de sucesso (KPI primária v1)
**Taxa de clique nos CTAs WhatsApp ≥ 3% do tráfego** (eventos `whatsapp_redirect` / sessões únicas), medido via GA4. KPI secundária: **scroll depth >=75% em ≥40% das sessões** (indica que a copy fraternal está prendendo). Ambos eventos configurados como `conversion event` no painel GA4 (ver QG 9.5 — endereça **L-005**).

### 1.4 Não-objetivos v1
Captura via formulário, área autenticada de cliente, blog, A/B testing, CRM, e-mail marketing, calculadoras interativas, agendamento Calendly. Tudo isso é evolução v2.

---

## 2. Escopo e Não-Escopo

### 2.1 In-scope (v1)
- Landing única em `/` com **13 seções + sticky nav + footer** conforme `05-copy-landing.md` e `wireframes.md`
- Páginas legais LGPD: `/privacidade` e `/termos`
- `sitemap.xml` + `robots.txt` dinâmicos (Next.js metadata)
- **8 CTAs WhatsApp** com mensagens contextuais URL-encoded (tabela canônica em §5.3)
- 8 efeitos GSAP/CSS conforme `wireframes.md` §2 (ordem de scroll)
- Faixa marquee de **10 logos parceiros** (Porto, Yelum, Bradesco, Mapfre, Allianz, Akad, SulAmérica, Tokio Marine, Suhai, HDI — `00-execution-plan.md` D1)
- Cookie banner LGPD (consent gate para Meta Pixel)
- Analytics: GA4 + Meta Pixel + Vercel Analytics + Speed Insights
- Structured data JSON-LD: `LocalBusiness` + `InsuranceAgency` + `FAQPage` (`architecture.md` ADR-005)
- OG image dinâmica + favicon + apple-icon + manifest
- Deploy Vercel + DNS Registro.br (A + CNAME) + SSL automático
- Domínio principal `www.rfgcorretora.com.br` + redirect raiz → www

### 2.2 Out-of-scope (explicitamente v2+)
- Formulário de captação / backend / Supabase
- Blog ou CMS editorial
- Área autenticada de cliente / CRM
- E-mail marketing / sequência drip
- A/B testing
- Calculadoras interativas (simulador de seguro, calculadora de cobertura)
- Vídeo institucional embedado (`00-execution-plan.md`: D ratificada — sem vídeo v1)
- Internacionalização (landing é pt-BR exclusivo)
- Dark mode (`design-system.md` §13)

---

## 3. Personas

### 3.1 Persona primária INTERNA — "Marcelo, O Protetor Despreparado"
> ⚠️ **Persona-avatar é interna (briefing/marketing).** O nome "Marcelo" **NUNCA aparece na landing** (vazamento de persona = bug — endereça `copy-audit.md` §7 item 1, M-003).

Definida em `01-dna-completo.md` linhas 244-296. Resumo:
- **Demográfico:** 32-52 anos, casado, 2 filhos, profissional liberal autônomo (engenheiro civil no avatar canonical), renda estável, carro financiado, apartamento em pagamento
- **Estado mental:** ansiedade silenciosa, culpa reprimida, confusão paralisante, desconfiança crônica de corretores, orgulho vulnerável
- **Maior medo:** morrer/ficar incapacitado e deixar família desamparada
- **Crença a derrubar (principal):** "Eu não preciso de seguro agora — ainda sou novo e tenho outras prioridades"
- **Canal de descoberta:** Instagram (`@rfg.seguros`) + busca local Google

### 3.2 Personas secundárias (Seção 4 da landing)
- **Pais e provedores de família** (médio para alto envolvimento emocional)
- **Profissionais liberais e autônomos** — médicos, engenheiros, advogados, dentistas (foco em RC profissional)
- **Quem quer realizar sonhos sem juros de banco** (foco em consórcio)

---

## 4. User Stories de Alto Nível (User Journey)

Como **visitante alinhado com a persona "Marcelo"**, eu quero...

- **US-01:** ...vir do anúncio Instagram ou da busca Google e cair numa landing que carrega rápido (LCP <2.5s) — para não perder paciência antes do conteúdo aparecer
- **US-02:** ...ler o hero e reconhecer imediatamente que isso fala comigo ("Você construiu muito. Sua família está protegida?") — para querer continuar lendo
- **US-03:** ...descer até a Seção 2 e ver minha dor nomeada (**Ponto Cego Patrimonial**, mecanismo único do problema) — para sentir que a marca entende meu contexto
- **US-04:** ...descobrir na Seção 3 que existe uma solução personalizada (**Diagnóstico de Ângulo Morto Patrimonial**) — para entender o que estou comprando
- **US-05:** ...me identificar na Seção 4 com uma das 3 personas — para sentir pertencimento
- **US-06:** ...entender o valor concreto na Seção 5 (4 pilares) — para racionalizar a decisão
- **US-07:** ...ganhar confiança nas Seções 6 (3 depoimentos + SUSEP + logos parceiros) e 7 (origem dos sócios Ricardo Farias + Anderson Guimarães) — para reduzir a desconfiança crônica
- **US-08:** ...entender o processo na Seção 8 (3 passos) — para saber o que vai acontecer depois do clique
- **US-09:** ...ver os 3 caminhos na Seção 9 sem ser surpreendido por preço — para sentir que a oferta é consultiva, não transacional
- **US-10:** ...ter minhas objeções endereçadas na Seção 12 — para destravar a hesitação final
- **US-11:** ...clicar em "Falar no WhatsApp" e cair direto numa conversa com Ricardo Farias ou Anderson Guimarães — para vivenciar o "acesso direto" prometido
- **US-12:** ...se sou usuário com leitor de tela ou que prefere reduzir movimento, navegar a landing sem barreiras de acessibilidade — para a marca cumprir o que promete (atender todos)

---

## 5. Functional Requirements (FRs)

### 5.1 Composição e estrutura
- **FR-001:** Landing renderiza **13 seções + sticky nav + footer** na ordem definida em `wireframes.md` §2 (Hero → Problema → Oportunidade → Personas → Valor → Prova → Origem → Como Funciona → 3 Caminhos → Compromisso → Visão → Objeções → FAQ → Footer)
- **FR-002:** Sticky nav com variação responsiva (endereça **m-005**):
  - **Desktop (≥1024px):** logo RFG + 4 links âncora (Sobre, Como Funciona, Caminhos, FAQ) + CTA `btn-secondary-md` WhatsApp; `position: sticky; top: 0; z-index: 50`; slide-down 200ms ao scroll >80px; backdrop-blur 12px
  - **Mobile (<1024px):** logo RFG + ícone WhatsApp 24px (sem menu hambúrguer) — minimalismo intencional
  - Mensagem WhatsApp do sticky nav: ver tabela canônica em §5.3 (CTA #6)
- **FR-003:** **Seção 1 (Hero)** — H1 "Você construiu muito. Sua família está protegida se algo acontecer?", subheadline, CTA primário lg "Fazer meu diagnóstico", microcopy, foto sócios `socios-01-perfil-rfg.webp`, **tríade de credenciais** conforme copy de `05-copy-landing.md` linhas 11-22 e wireframes §1 (endereça **m-006**):
  - Badge SUSEP separado em cima ("Registro ativo desde 1995")
  - 2 badges no rodapé do hero: "1.200+ famílias atendidas" + "35 anos de experiência combinada"
  - Mobile responsivo: 2 badges em linha + 1 abaixo se não couber em 320px
- **FR-004:** **Seção 2 (Problema)** — copy storytelling de 4 parágrafos em `container-narrow` (760px max), tom fraternal preservado, **explicita o conceito "Ponto Cego Patrimonial"** (mecanismo único do problema, `01-dna-completo.md` linhas 399-402; copy de `05-copy-landing.md` linhas 28-37 já cobre — endereça **L-007**)
- **FR-005:** **Seção 3 (Oportunidade)** — eyebrow + H2 + 3 parágrafos body com destaque em **"Diagnóstico de Ângulo Morto Patrimonial"** (mecanismo único da solução, `01-dna-completo.md` linhas 404-410; copy linhas 43-51)
- **FR-006:** **Seção 4 (Personas)** — 3 cards em grid 3-col desktop / 1-col mobile, cada card com ícone Lucide + H3 + body curto, **prefixo "Isso é para você se..."** aplicado por padrão em cada card (sugestão do próprio briefing 05 linha 73 — endereça `copy-audit.md` §7 item 6, M-003); linhas 60-69
- **FR-007:** **Seção 5 (Proposta de Valor)** — grid 2x2 desktop / 1-col mobile, 4 pilares com emoji/ícone + H3 + body. **Headlines em Title Case** (não CAIXA ALTA — endereça `copy-audit.md` §7 item 5, M-003); linhas 81-94. Pilar 3 com verbo "**faz com que**" (não "garante" — compliance SUSEP, endereça `copy-audit.md` §2)
- **FR-008:** **Seção 6 (Prova)** — **4 quote cards (Felipe Alexandre Oliveira + Eder Clemente Pio + Henrique Martins Santos + Walter Campos)** em **grid 2×2 desktop / 1-col stack mobile**, **todos com dimensões/tratamento visual uniformes** (Decisão Anderson 2026-05-05 substituindo a Opção A original de 3-col uniforme; sem destaque entre os 4); cada card exibe nome + profissão (ex.: "Felipe Alexandre Oliveira — Segurança do Trabalho"). Inclui:
  - Faixa marquee de 10 logos parceiros
  - Selo SUSEP visível
  - Ancora visualmente as **3 credenciais oficiais do DNA** (`01-dna-completo.md` linhas 126-154): Experiência de Vida Real (35 anos combinados) + Resultados Comprovados (1.200+ famílias) + Especialização Real (portfólio completo / SUSEP 1995) — endereça **L-004**
  - **Texto canônico dos 4 depoimentos** definido em `01-dna-completo.md` (seção "Depoimentos Reais") e replicado em `05-copy-landing.md` Seção 6. Ordem sugerida: Felipe Alexandre (consórcio/contemplação) → Eder (parceria longa portfólio completo) → Henrique (sinistro/suporte) → Walter (12+ anos cliente).
- **FR-009:** **Seção 7 (Origem)** — bento grid de 4-5 áreas: foto `socios-02-estudio.webp` + bloco "1995" + bloco "2013" + bloco "Hoje" + citação do Walter Campos (cliente há 12+ anos, conforme reescrita de copy 2026-05-05 substituindo a antiga citação do Rodrigo). Mobile: stack 1 coluna sequencial. **Copy preserva nomes literais Ricardo Farias + Anderson Guimarães + Mapfre + datas 1995 e 2013** conforme copy aprovada (endereça **m-004**). **Persona-avatar interna "Marcelo" NÃO aparece** nesta seção (endereça `copy-audit.md` §7 item 1, M-003 — versão revisada de `05-copy-landing.md` linha 145 já remove o nome).
- **FR-010:** **Seção 8 (Como Funciona)** — 3 cards verticais numerados (01/02/03) com ícone + H3 + body + lista bullet, linha conectora sutil entre eles em desktop. **Headlines "Passo 1/2/3" em Title Case** (não CAIXA ALTA — endereça `copy-audit.md` §7 item 5, M-003); linhas 165-200, decisão 7 dos wireframes
- **FR-011:** **Seção 9 (3 Caminhos)** — 3 cards horizontais desktop / stack mobile, **Caminho 2 destacado** com `card-featured` + badge "MAIS PROCURADO" + shadow-xl, **sem campo de preço**, microcopy "Diagnóstico gratuito antes de qualquer decisão" abaixo de cada CTA, faixa "Como o Investimento É Definido" + CTA único final + selo "Vagas limitadas" (linhas 220-310). **Cada Caminho exibe os bônus literais conforme copy aprovada** (endereça **L-002**):
  - **Caminho 1 (Proteção Essencial):** 1 bônus — Checklist "Meu Patrimônio Blindado — 7 Passos para a Proteção Total"
  - **Caminho 2 (Proteção Completa):** 2 bônus — Guia "Desvendando a Previdência Inteligente" + Checklist "Meu Patrimônio Blindado"
  - **Caminho 3 (Legado Familiar):** 3 bônus — Guia "Desvendando a Previdência Inteligente" + Checklist "Meu Patrimônio Blindado" + Sessão Estratégica "Consórcio sem juros — Seu Próximo Imóvel ou Carro"
- **FR-012:** **Seção 10 (Compromisso)** — copy do briefing **com headline "NOSSO COMPROMISSO"** (não "GARANTIA" — compliance SUSEP, endereça `copy-audit.md` §2 e §7 item 2, M-003), **sem palavra "garantia/garantir" em nenhum trecho** (`01-dna-completo.md` linhas 213-230; auditoria de copy `copy-audit.md`), selo visual escudo/aperto de mão. Texto "13 anos" (não "12 anos" — endereça `copy-audit.md` §7 item 5 / I-002 / M-003); linhas 318-343 da copy revisada.
- **FR-013:** **Seção 11 (Visão de Futuro)** — 2 colunas desktop (positivo esquerda + negativo com `--bg-secondary` direita) / **stack mobile com positivo no topo, negativo abaixo** (endereça **m-007**); linhas 354-385. Frase **"Quem está perto de você sente isso"** (não "Sua esposa sente isso" — inclusão, endereça `copy-audit.md` §7 item 4, M-003)
- **FR-014:** **Seção 12 (Objeções)** — 5 blocos com ícone + H3 + body + frase-chave em negrito + CTA primary-lg final (linhas 394-457). **Validar valor "menos de R$ 200" com Ricardo/Anderson antes do go-live** ou suavizar para "uma fração disso" (endereça `copy-audit.md` §7 item 9, M-003)
- **FR-015:** **Seção 13 (FAQ)** — acordeão single-open de 10 perguntas + CTA secondary-md final "Ainda tem dúvida? Fala direto com a gente." FAQ 7 com texto correto: **"Registro SUSEP ativo desde 1995. A RFG opera desde 2013 — atravessamos crises porque fazemos certo."** (separa registro do Ricardo de fundação da RFG — endereça `copy-audit.md` §7 item 3, M-003); linhas 467-501. FAQ 10 com "1.200+ famílias em **13 anos**" (não "12 anos" — endereça I-002).
- **FR-016:** **Footer** com logo RFG + CNPJ 18.940.835/0001-97 + endereço completo (Rua José Pontes Magalhães, 70, Edifício Itália, salas 506-509, Jatiúca, Maceió/AL) + telefone/WhatsApp clicável (82) 98235-9028 + **e-mail `comercial@rfgcorretora.com.br`** (canônico, ver CON-014 e `03-contato.md` — endereça **M-004**) + selo SUSEP "Registro ativo desde 1995" + link Instagram `@rfg.seguros` + links âncora (Sobre, Como Funciona, FAQ) + links `/privacidade` e `/termos` + iframe Google Maps lazy-loaded **(layout: 1 col mobile / coluna lateral desktop conforme wireframes.md §1 Decisão 10 — endereça I-003)** + disclaimer SUSEP (`architecture.md` §7.4)

### 5.2 Assets e mídia
- **FR-017:** Hero exibe `socios-01-perfil-rfg.webp` (convertido de PNG, <300KB) com `priority={true}`, `fetchPriority="high"`, `placeholder="blur"`, `sizes="(max-width: 768px) 100vw, 50vw"` (`architecture.md` ADR-004)
- **FR-018:** Seção 7 exibe `socios-02-estudio.webp` em bento grid com `--radius-2xl` e `--shadow-2xl`. **Fotos individuais `ricardo-01` e `anderson-01` ficam reservadas para v2** (não usadas em v1 — endereça **L-008**)
- **FR-019:** Logo RFG vetorizado SVG (`/public/logo-rfg.svg`) + fallback PNG; horizontal no nav e quadrado/empilhado no footer
- **FR-020:** 10 logos de seguradoras parceiras em SVG (preferencial; otimizados via svgo) ou PNG/WebP transparente (Mapfre, SulAmérica, Suhai conforme `parceiros-fontes.md` — endereça **I-005, m-003**); marquee CSS keyframes 30s linear infinite

### 5.3 CTAs e conversão — Tabela canônica das 8 mensagens WhatsApp (endereça **M-007**)

- **FR-021:** **8 CTAs WhatsApp** distribuídos conforme `wireframes.md` §3, com **mensagens contextuais literais** conforme tabela abaixo. Helper `whatsapp.ts` exporta enum com chaves contextuais (`diagnostico`, `essencial`, `completa`, `legado`, `cta_unico`, `sticky_nav`, `objecoes`, `footer`).

| # | Localização | Chave enum | Mensagem (texto literal antes do encode) | URL final |
|---|---|---|---|---|
| 1 | Hero (Seção 1) | `diagnostico` | Olá! Quero agendar meu Diagnóstico de Ângulo Morto Patrimonial. | `https://wa.me/5582982359028?text=Ol%C3%A1!%20Quero%20agendar%20meu%20Diagn%C3%B3stico%20de%20%C3%82ngulo%20Morto%20Patrimonial.` |
| 2 | Caminho 1 (Seção 9) | `essencial` | Olá! Quero proteger minha família — Caminho Proteção Essencial. | `https://wa.me/5582982359028?text=Ol%C3%A1!%20Quero%20proteger%20minha%20fam%C3%ADlia%20%E2%80%94%20Caminho%20Prote%C3%A7%C3%A3o%20Essencial.` |
| 3 | Caminho 2 (Seção 9) | `completa` | Olá! Quero o plano completo para minha família — Caminho Proteção Completa. | `https://wa.me/5582982359028?text=Ol%C3%A1!%20Quero%20o%20plano%20completo%20para%20minha%20fam%C3%ADlia%20%E2%80%94%20Caminho%20Prote%C3%A7%C3%A3o%20Completa.` |
| 4 | Caminho 3 (Seção 9) | `legado` | Olá! Quero construir um legado — Caminho Legado Familiar. | `https://wa.me/5582982359028?text=Ol%C3%A1!%20Quero%20construir%20um%20legado%20%E2%80%94%20Caminho%20Legado%20Familiar.` |
| 5 | CTA Único Final Seção 9 | `cta_unico` | Olá! Quero fazer meu diagnóstico gratuito. | `https://wa.me/5582982359028?text=Ol%C3%A1!%20Quero%20fazer%20meu%20diagn%C3%B3stico%20gratuito.` |
| 6 | Sticky nav | `sticky_nav` | Olá! Vim pela landing. Quero falar com a RFG. | `https://wa.me/5582982359028?text=Ol%C3%A1!%20Vim%20pela%20landing.%20Quero%20falar%20com%20a%20RFG.` |
| 7 | Pós-objeções (Seção 12) | `objecoes` | Olá! Quero falar direto com a RFG sobre meu diagnóstico. | `https://wa.me/5582982359028?text=Ol%C3%A1!%20Quero%20falar%20direto%20com%20a%20RFG%20sobre%20meu%20diagn%C3%B3stico.` |
| 8 | Footer / FAQ | `footer` | Olá! Vim pelo site da RFG. | `https://wa.me/5582982359028?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20RFG.` |

- **FR-022:** Helper centralizado em `src/lib/whatsapp.ts` constrói URLs no formato `https://wa.me/5582982359028?text={encoded}` e expõe enum com as 8 chaves canônicas (`architecture.md` ADR-002). Cada chave mapeia para mensagem literal da tabela FR-021.
- **FR-023:** Todos os links WhatsApp com `target="_blank"` + `rel="noopener noreferrer"` + `aria-label` contextual ("Falar no WhatsApp sobre o Caminho Proteção Essencial", etc).

### 5.4 Animações e efeitos (GSAP/CSS — 1 FR por padrão)
- **FR-024:** **Efeito #1 — Hero text reveal** com word stagger 80ms via GSAP no Hero
- **FR-025:** **Efeito #2 — Card grid stagger** (150-200ms) aplicado nas Seções 4, 5, 8, 9
- **FR-026:** **Efeito #3 — Scroll pinned** explicitamente **NÃO usado em v1** (decisão 7 dos wireframes — performance prioritária); reservado para v2
- **FR-027:** **Efeito #4 — Curve divider** clip-path scroll-driven entre Hero e Seção 2 (versão simplificada em mobile)
- **FR-028:** **Efeito #5 — Counter tween** opcional na Seção 8 ("35 anos", "1.200 famílias")
- **FR-029:** **Efeito #6 — Icon scale-in burst** com `back.out` elastic nos 4 ícones da Seção 5
- **FR-030:** **Efeito #7 — Bento grid scrubbed** na Seção 7 (História de Origem)
- **FR-031:** **Efeito #8 — Marquee infinito CSS** na faixa de logos parceiros da Seção 6 (30s linear infinite). **Fallback `prefers-reduced-motion`:** marquee desativado, logos exibidos em **grid estático 5x2 desktop / 2x5 mobile** (todos os 10 logos visíveis, não pausados/ocultos — endereça **m-002**)
- **FR-032:** Acessibilidade — TODOS os 8 efeitos respeitam `@media (prefers-reduced-motion: reduce)`: animações desativadas, `opacity: 1` final aplicado direto (`architecture.md` ADR-006)

### 5.5 SEO, metadata e structured data
- **FR-033:** `generateMetadata` na rota `/` com title/description/keywords/canonical/OG/Twitter conforme `architecture.md` §4.1
- **FR-034:** `app/sitemap.ts` exporta sitemap dinâmico com 3 URLs (`/`, `/privacidade`, `/termos`) (`architecture.md` §4.4)
- **FR-035:** `app/robots.ts` exporta robots.txt dinâmico permitindo `/`, bloqueando `/api/`, `/_next/`, `/admin/` + linka sitemap
- **FR-036:** `app/opengraph-image.tsx` gera OG image dinâmica 1200x630 via `next/og` (edge runtime) com logo + headline + gradiente RFG
- **FR-037:** Componente `OrganizationSchema.tsx` injeta JSON-LD `LocalBusiness` + `InsuranceAgency` em `layout.tsx` (`architecture.md` ADR-005, schema completo definido lá). **Validações pré-Story 1.7 (endereça M-004 + I-006):**
  - Campo `email`: usar **`comercial@rfgcorretora.com.br`** (não `contato@`)
  - Campo `founder[0].name`: usar **"Ricardo Farias"** (não "Ricardo Guimarães")
  - Campo `founder[1].name`: usar **"Anderson Guimarães"**
  - `architecture.md` ADR-005 e `.env.local.example` devem ser corrigidos antes da Story 1.7
- **FR-038:** Componente `FaqSchema.tsx` injeta JSON-LD `FAQPage` na Seção 13 com as 10 perguntas/respostas mapeadas
- **FR-039:** Páginas `/privacidade` e `/termos` com `generateMetadata` próprio + `robots: { index: true, follow: true }`
- **FR-040:** `<html lang="pt-BR">` + `<SkipLink href="#conteudo">Pular para o conteúdo</SkipLink>` no body

### 5.6 Analytics, tracking e LGPD
- **FR-041:** GA4 (`G-XXXXXXXXXX`) carregado via `next/script strategy="afterInteractive"` com `anonymize_ip: true`
- **FR-042:** Meta Pixel (`000000000000000`) carregado **apenas** após consent explícito de marketing
- **FR-043:** Vercel Analytics + Speed Insights built-in (zero config)
- **FR-044:** Helper centralizado em `src/lib/tracking.ts` dispara eventos: `cta_click`, `whatsapp_redirect`, `scroll_depth`, `section_view`, `faq_open`, `partner_logo_click`, `consent_granted`, `consent_declined` (`architecture.md` §6.2). **Mapeamento Meta Pixel** (gated por consent marketing — endereça **m-008**): `whatsapp_redirect` → `fbq('track', 'Lead', params)` + `cta_click` → `fbq('track', 'InitiateCheckout', params)`
- **FR-045:** `<ScrollDepthTracker>` dispara `scroll_depth` em 25/50/75/100% (debounced, uma vez por sessão). **Marco 75% configurado como conversion event no GA4** para acompanhar KPI secundária (endereça **m-009, L-005**)
- **FR-046:** `<ConsentBanner>` LGPD com 3 categorias (Necessários sempre ativo, Analytics opt-in, Marketing opt-in), persistência em `localStorage.rfg_consent`, re-validação anual
- **FR-047:** Footer expõe `mailto:` com subject "Solicitação de exclusão de dados (LGPD)" para direitos do titular (LGPD Art. 18) usando **`comercial@rfgcorretora.com.br`** (canônico — endereça **M-004**)
- **FR-048:** GA4 + Meta Pixel **só carregam em produção** (`process.env.VERCEL_ENV === 'production'`) para não contaminar métricas com previews (`architecture.md` Risco R5)

### 5.7 PWA, ícones e manifest
- **FR-049:** `app/icon.tsx` (32x32) + `app/apple-icon.tsx` (180x180) + `app/manifest.ts` (PWA manifest básico — base v2)

### 5.8 Tipografia e identidade visual (novos — endereçam M-005, M-006)
- **FR-050:** **Aplicar correções da copy-audit pré-implementação** (endereça **M-003**) — Morgan/Anderson revisam e aplicam os 7 ajustes 🟡/🟢 do `copy-audit.md` §7 antes da Story 1.3 começar:
  1. Seção 7 — remover nome "Marcelo" (já refletido em `05-copy-landing.md` revisado linha 145)
  2. Seções 7, 10 e FAQ 10 — atualizar "12 anos" → "13 anos" (já refletido em `05-copy-landing.md` revisado)
  3. FAQ 7 — separar "registro SUSEP desde 1995" de "RFG opera desde 2013" (já refletido)
  4. Seção 11 — "Quem está perto de você sente isso" (já refletido)
  5. Seções 5 e 8 — headlines em Title Case (já refletido)
  6. Seção 4 — prefixo "Isso é para você se..." aplicado (FR-006)
  7. Seção 12 linha 369 — Anderson valida "menos de R$ 200" ou suaviza para "uma fração disso" (FR-014)
- **FR-051:** **Tipografia (endereça M-005)** — carregar **Manrope (display, weights 400-800)** + **Inter (body, weights 400-700)** via `next/font/google` com `display: 'swap'` + `adjustFontFallback: true` + `preload: true` para weights críticos (Manrope 700 + Inter 400). Subset `['latin']`. Self-host `.woff2` reservado como contingência (mitigação Risco R2). Fonte: `assets/brand/typography.md` + `architecture.md` §3.3 + `design-system.md` §3.
- **FR-052:** **Paleta + neutros tingidos azul (endereça M-006)** — aplicar paleta primária `--rfg-blue-dark` `#246BB2` / `--rfg-blue-mid` `#3688C8` / `--rfg-blue-light` `#4CB3E6` + gradiente RFG conforme `assets/brand/colors.md` e `design-system.md` §2.1. **Neutros tingidos azul** (hue ~210) conforme `design-system.md` §2.2. Tokens drop-in copiados em `src/styles/tokens.css`. **Sem dark mode em v1** (`design-system.md` §13).

---

## 6. Non-Functional Requirements (NFRs)

### 6.1 Performance
- **NFR-001:** Lighthouse **Performance ≥95** em mobile (smoke real Vercel Preview pós-build)
- **NFR-002:** Lighthouse **Accessibility ≥95**
- **NFR-003:** Lighthouse **Best Practices ≥95**
- **NFR-004:** Lighthouse **SEO = 100**
- **NFR-005:** **LCP < 2.5s** em throttle 3G (Core Web Vital "Good")
- **NFR-006:** **CLS < 0.1** (Core Web Vital "Good")
- **NFR-007:** **INP < 200ms** (Core Web Vital "Good")
- **NFR-008:** **TBT < 200ms** + **FCP < 1.8s** + **TTFB < 600ms** (Vercel edge GRU1)

### 6.2 Acessibilidade
- **NFR-009:** **WCAG 2.1 AA** mínimo (aspirações AAA onde possível) conforme matriz `architecture.md` ADR-006
- **NFR-010:** Contraste mínimo 4.5:1 body, 3:1 UI/large text (validado em `design-system.md` §2.7)
- **NFR-011:** Navegação completa via teclado (Tab, Enter, Space, Esc); FAQ acordeão com `aria-expanded` + `aria-controls`
- **NFR-012:** ESLint plugin `jsx-a11y` zero warnings em CI
- **NFR-013:** 1 `<h1>` único na landing + hierarquia `<h2>` → `<h3>` sem saltos
- **NFR-014:** `prefers-reduced-motion` respeitado em todas as animações GSAP via `gsap.matchMedia()`

### 6.3 Compatibilidade
- **NFR-015:** Cross-browser: Chrome, Safari, Firefox, Edge — últimas 2 versões cada
- **NFR-016:** Mobile: iOS Safari (iPhone SE 320px e iPhone 14 390px) + Android Chrome (Pixel/Samsung 360-412px)
- **NFR-017:** Mobile-first responsive (320-768px) + tablet (768-1024) + desktop (>=1024px)

### 6.4 Bundle e otimização
- **NFR-018:** **Initial JS shared < 100KB gzipped**; First Load JS por route < 150KB gzipped (validado via `pnpm build` + `@next/bundle-analyzer`)
- **NFR-019:** GSAP + ScrollTrigger via dynamic import (lazy load) — fora do bundle initial (`architecture.md` ADR-003)
- **NFR-020:** Imagens em WebP (AVIF habilitado para Chrome/Edge); fotos sócios <300KB cada após otimização

### 6.5 Segurança e infraestrutura
- **NFR-021:** TLS 1.3 + Let's Encrypt automático via Vercel
- **NFR-022:** Headers de segurança via `vercel.json`: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- **NFR-023:** Sem credenciais hardcoded em código — todos os IDs (GA4, Meta Pixel) via `.env` + Vercel env vars

### 6.6 Operacional
- **NFR-024:** Branch protection na `main`: PR obrigatório, status checks (`quality` job: lint + typecheck + build + test), sem force push
- **NFR-025:** Deploy automático: `main` → produção, `feature/*` → preview Vercel com URL única

### 6.7 Stack pinada (novo — endereça m-001)
- **NFR-026:** **Animation stack pinned** — `gsap@^3.14` + `@gsap/react@^2`. Updates major requerem revisão arquitetural (Aria) antes do bump.
- **NFR-027:** **Otimização de logos parceiros** — svgo aplicado em todos os SVGs (target Tokio Marine 43KB → <15KB); logos PNG (Mapfre, SulAmérica, Suhai) confirmados com transparência alpha pré-go-live (endereça **m-003**).

---

## 7. Constraints (CONs)

- **CON-001:** **Sem backend v1** — captura exclusivamente via deep link WhatsApp (`00-execution-plan.md` D3, `architecture.md` ADR-002)
- **CON-002:** **Sem preços na Seção 9** — diagnóstico é gratuito; o investimento real só aparece pós-diagnóstico em conversa direta (`00-execution-plan.md` Premissa "pacotes/preços", copy `05-copy-landing.md` linhas 285-291)
- **CON-003:** **Compliance SUSEP** — palavras "garantia/garantir/contemplação rápida/contemplação certa/100% sucesso/milagre/fórmula mágica/fácil" são proibidas no copy; já removidas conforme `01-dna-completo.md` linhas 209-237 e auditoria de copy. Validação manual obrigatória antes do go-live
- **CON-004:** **LGPD** — cookie banner com consent granular (analytics + marketing opt-in) + páginas `/privacidade` e `/termos` obrigatórias antes do go-live (`architecture.md` §7)
- **CON-005:** **Logos de parceiros** — uso institucional sem alteração de cor/proporção; **Mapfre PNG está em baixa resolução** (sinalizar pra trocar futuramente quando fonte vetorial disponível); fontes documentadas em `docs/plan/parceiros-fontes.md`
- **CON-006:** **Tom de voz** — fraternal + consultivo + transparência radical (DNA do briefing). Banido: tom corporativo frio, jargão de seguro, urgência manipulativa estilo "última chance!"
- **CON-007:** **Domínio Registro.br** — apontamento por A/AAAA records + CNAME `www` para Vercel (`architecture.md` §8.5); nameservers default Registro.br (D4 ratificada)
- **CON-008:** **GA4 + Meta Pixel a criar do zero** — properties novas sob conta Anderson (`00-execution-plan.md` D6); IDs preenchidos no `.env` Vercel após criação por @devops
- **CON-009:** **Repo privado** `abguimaraes/rfg-landing` no GitHub (D8); branch protection na `main`
- **CON-010:** **Deploy Vercel** na **mesma conta** dos outros projetos Anderson, mas com domínio próprio e isolamento total (sem mistura com PostFeito) (D9, `00-execution-plan.md` "Separação de Projetos")
- **CON-011:** **Codebase 100% novo** — zero importação de código do PostFeito; efeitos GSAP são **reimplementados do zero** a partir do inventário de padrões (`00-execution-plan.md` "Separação de Projetos"). **Reforço (endereça L-006):** nenhum import direto, nenhum mono-repo compartilhado, nenhum reuso de tokens CSS via package; deploy isolado; reimplementação a partir do inventário em `effects-reference.md`.
- **CON-012:** **pt-BR exclusivo** — landing 100% em português brasileiro, sem internacionalização v1
- **CON-013:** **Copy canônica (endereça M-002)** — A copy de cada uma das 13 seções está fixada em `docs/briefing/05-copy-landing.md` versão pós-correções de **2026-05-05** + correções aplicadas em `docs/plan/copy-audit.md` §7. Qualquer alteração de wording exige aprovação @pm + @po antes do PR. **Os 3 ajustes 🔴 críticos da copy-audit são inegociáveis pré-go-live:**
  1. Seção 9 reescrita sem preços (não citar R$ 180/380/580)
  2. Seção 10 sem palavra "garantia" (headline "NOSSO COMPROMISSO")
  3. Pilar 3 da Seção 5 sem verbo "garantir" (usar "faz com que")

  **Checklist explícito de palavras/expressões proibidas (validar via busca textual em todas as seções pré-go-live, endereça M-002):**

  | Termo proibido | Onde NÃO pode aparecer | Substituir por |
  |---|---|---|
  | "garantia" / "garantir" | Em qualquer seção (especial Seção 5 Pilar 3, Seção 9 Caminho 1, Seção 10) | "compromisso" / "fazer com que" / "assegurar" |
  | "contemplação rápida/certa" | Qualquer lugar | "processo otimizado" |
  | "100% de sucesso" | Qualquer lugar | "alta taxa de sucesso" |
  | "milagre" / "fórmula mágica" | Qualquer lugar | "metodologia" / "processo comprovado" |
  | "fácil" / "sem esforço" | Qualquer lugar | "estratégico" / "otimizado" |
  | "12 anos" (referindo à RFG) | Seções 7, 10, FAQ 10 | "13 anos" (em 2026) |
  | "Marcelo" (persona-avatar interna) | Seção 7 e qualquer outra | Removido (não citar nome de persona interna) |
  | "Sua esposa sente isso" | Seção 11 | "Quem está perto de você sente isso" |
  | Preços (R$ 180 / R$ 380 / R$ 580) | Seção 9 | Removidos (faixa "Como o Investimento É Definido") |
  | Headlines em CAIXA ALTA | Seções 5 e 8 | Title Case |
  | "Rômulo" / "Rodrigo" / "Marcos Roberto" (nomes de depoimentos) | Qualquer seção (especial Seções 6, 7, 12 e FAQ 6) | Felipe Alexandre Oliveira / Eder Clemente Pio / Henrique Martins Santos / Walter Campos |

  **Nomes canônicos dos depoimentos (decisão Anderson 2026-05-05):** Felipe Alexandre Oliveira (Segurança do Trabalho), Eder Clemente Pio (Empresário), Henrique Martins Santos (Supervisor de Produção), Walter Campos (Agente publicitário). Os nomes anteriores (Rômulo, Rodrigo, Marcos Roberto) eram fakes — qualquer ocorrência fora dos arquivos de audit histórico (`rfg-landing-prd-audit.md`, `rfg-landing-prd-audit-v2.md`) é regressão.

  **Qualquer regressão é violação de compliance/qualidade e bloqueia o go-live.**

- **CON-014:** **Contato canônico (endereça M-004)** — E-mail comercial canônico é **`comercial@rfgcorretora.com.br`** (ver `docs/briefing/03-contato.md`). Telefone/WhatsApp canônico é **+55 82 98235-9028** (`5582982359028` sem máscara). Verificar TODOS os lugares antes do go-live: footer (FR-016), JSON-LD `email` (FR-037), `mailto:` LGPD (FR-047), `.env.local.example` (`NEXT_PUBLIC_CONTACT_EMAIL`), `architecture.md` ADR-005 §9.1. **Qualquer outro e-mail (`contato@`, `info@`, etc) é gap e bloqueia o go-live.** Adicionalmente: **nome do sócio fundador é "Ricardo Farias"** (não "Ricardo Guimarães") — corrigir `architecture.md` ADR-005 founder antes da Story 1.7 (endereça **I-006**).
- **CON-015:** **Animation lib única (endereça L-001)** — GSAP + ScrollTrigger são as únicas libs de animação. **Framer Motion e Lenis explicitamente proibidos** para evitar duplicação de runtime e divergência de timing. Refletido em `architecture.md` cabeçalho linha 9 e ADR-003.
- **CON-016:** **Single-page architecture (endereça L-003)** — toda a landing renderiza em `/`; navegação interna por âncoras (`#sobre`, `#como-funciona`, `#caminhos`, `#faq`); apenas `/`, `/privacidade`, `/termos` têm rotas dedicadas. Sem rotas `/sobre`, `/produtos`, `/blog` em v1.

---

## 8. Roadmap por Stories

**Epic:** RFG Landing v1 — Captação via WhatsApp
**Stories:** 8 (1.1 a 1.8) cobrindo todo o escopo. Complexidade T-shirt: XS (≤2h), S (2-4h), M (4-8h), L (8-16h), XL (>16h).

### Story 1.1 — Setup repo + Next.js boilerplate + design tokens + CI
**Descrição:** Criar repo `abguimaraes/rfg-landing` no GitHub, scaffolding Next.js 15 + TypeScript strict + Tailwind 3.4 + ESLint flat config + Prettier + pnpm + GitHub Actions CI (lint + typecheck + build + test).
**Complexidade:** **L**
**Dependências:** Nenhuma (story de abertura)
**AC alto nível:**
- Repo criado, primeiro commit em `main`, branch protection ativa
- `pnpm install && pnpm dev` roda local na porta 3000
- `pnpm lint && pnpm typecheck && pnpm build` verdes
- Tailwind config + tokens.css drop-in conforme `design-system.md` §9-10 (tokens da paleta RFG conforme FR-052)
- GitHub Actions `ci.yml` rodando em PR (`architecture.md` §8.1)
- Página inicial vazia ("Hello RFG") deploya em Vercel preview

### Story 1.2 — UI primitives + tipografia + analytics infra + helpers
**Descrição:** Implementar componentes primitives (Button, Card, Badge, Eyebrow, SectionHeader, Container, AccordionItem, SkipLink), carregar **Manrope + Inter via `next/font/google`** (FR-051), scaffolding analytics (GA4 + Meta Pixel + Vercel + ConsentBanner + ScrollDepthTracker + tracking helpers), helper `whatsapp.ts` com enum de 8 chaves canônicas (FR-021/FR-022).
**Complexidade:** **L**
**Dependências:** Story 1.1
**AC alto nível:**
- Todos os primitives renderizam conforme `design-system.md` §7
- **Manrope (400-800) + Inter (400-700) carregam via `next/font/google`** com `display: 'swap'` + `adjustFontFallback: true` + `preload: true` para Manrope 700 e Inter 400 — zero CLS por fonte
- `<ConsentBanner>` aparece no primeiro acesso, persiste em `localStorage.rfg_consent`
- `trackEvent()` dispara em GA4 + Meta Pixel (gated por consent) + Vercel; mapeamento `whatsapp_redirect → Lead` e `cta_click → InitiateCheckout` no Meta Pixel implementado
- `whatsapp.ts` exporta enum com **8 chaves canônicas** (`diagnostico`, `essencial`, `completa`, `legado`, `cta_unico`, `sticky_nav`, `objecoes`, `footer`) e mensagens contextuais URL-encoded conforme tabela FR-021
- Storybook ou page de demo `/dev/components` (interno) com todos os primitives

### Story 1.3 — Seções 1-3 (Hero + Problema + Oportunidade) com efeitos GSAP
**Descrição:** Implementar Seção 1 (Hero), 2 (Problema), 3 (Oportunidade) com copy canônica de `05-copy-landing.md` (versão pós-correções 2026-05-05) + foto sócios `socios-01-perfil-rfg.webp` (priority + blur) + Efeito #1 (hero text reveal) + Efeito #4 (curve divider) + sticky nav (variação desktop/mobile FR-002).
**Complexidade:** **L**
**Dependências:** Story 1.2; **FR-050 aplicado** (copy-audit revisada antes desta story começar)
**AC alto nível:**
- Sticky nav: desktop com 4 links âncora + CTA secondary-md / mobile com logo + ícone WhatsApp 24px (sem hambúrguer); slide-down 200ms ao scroll >80px
- Hero: H1 word stagger 80ms, badge SUSEP, CTA primary-lg "Fazer meu diagnóstico" (mensagem WhatsApp #1 — `diagnostico`), tríade credenciais (badge SUSEP em cima + 2 badges no rodapé), foto WebP <300KB com `fetchPriority="high"`
- Seção 2 em `container-narrow` (760px) com fade-in body; texto explicita "Ponto Cego Patrimonial"
- Seção 3 com eyebrow + H2 + body reveal por parágrafo; texto destaca "Diagnóstico de Ângulo Morto Patrimonial"
- LCP <2.5s validado em Vercel Preview com throttle 3G
- `prefers-reduced-motion`: efeitos desativados, opacidade final aplicada

### Story 1.4 — Seções 4-7 (Personas + Valor + Prova + Origem) com bento grid
**Descrição:** Implementar Seção 4 (Personas com prefixo "Isso é para você se..."), 5 (Proposta de Valor com Title Case + Pilar 3 sem "garante"), 6 (Prova com **4 depoimentos reais** em grid 2×2), 7 (História de Origem com nomes Ricardo Farias + Anderson Guimarães + Mapfre + 1995 + 2013 + "13 anos") + Efeito #2 (card stagger) + Efeito #6 (icon burst) + Efeito #7 (bento grid scrubbed) + Efeito #8 (marquee logos com fallback grid estático).
**Complexidade:** **XL**
**Dependências:** Story 1.3; textos canônicos dos 4 depoimentos reais (Felipe Alexandre Oliveira, Eder Clemente Pio, Henrique Martins Santos, Walter Campos) já inseridos em `05-copy-landing.md` Seção 6 (decisão Anderson 2026-05-05 substituindo os 3 fakes anteriores).
**AC alto nível:**
- Seção 4: 3 cards uniformes com ícones Lucide e prefixo "Isso é para você se..." em cada bloco
- Seção 5: grid 2x2 com 4 pilares (headlines em **Title Case**, não CAIXA ALTA) + icon burst back.out elastic; Pilar 3 usa "**faz com que**" (não "garante")
- **Seção 6: 4 quote cards (Felipe Alexandre Oliveira + Eder Clemente Pio + Henrique Martins Santos + Walter Campos)** em **grid 2×2 desktop / 1-col stack mobile** + cada card com nome + profissão + faixa marquee 10 logos parceiros (CSS keyframes 30s) + selo SUSEP + ancoragem das 3 credenciais do DNA (FR-008)
- Seção 7: bento grid 4-5 áreas com `socios-02-estudio.webp` (1995/2013/Hoje + citação do Walter Campos — cliente há 12+ anos); preserva nomes literais; **NÃO contém o nome "Marcelo"**; texto "13 anos" (não "12 anos")
- Marquee respeita `prefers-reduced-motion` (vira **grid estático 5x2 desktop / 2x5 mobile** com todos os 10 logos visíveis)
- 10 logos parceiros otimizados em **SVG (preferencial; svgo aplicado) ou PNG/WebP transparente** (Mapfre, SulAmérica, Suhai conforme `parceiros-fontes.md`) carregados de `public/images/parceiros/`

### Story 1.5 — Seções 8-10 (Como Funciona + 3 Caminhos + Compromisso)
**Descrição:** Implementar Seção 8 (Como Funciona — 3 steps verticais com headlines em **Title Case**), 9 (3 Caminhos com Caminho 2 destacado, **bônus literais por caminho** conforme FR-011, sem preços, CTA único final, faixa "vagas limitadas"), 10 (Compromisso — **headline "NOSSO COMPROMISSO"** + copy compliance SUSEP + "13 anos").
**Complexidade:** **L**
**Dependências:** Story 1.4
**AC alto nível:**
- Seção 8: 3 cards numerados (01/02/03) com ícone + H3 (**Title Case**) + body + bullets, linha conectora desktop
- Seção 9: card-featured no Caminho 2 com badge "MAIS PROCURADO", microcopy abaixo de cada CTA, sem campo de preço, **bônus literais exibidos** (Caminho 1: 1 bônus / Caminho 2: 2 bônus / Caminho 3: 3 bônus conforme FR-011), CTA único primary-lg final (mensagem WhatsApp #5 — `cta_unico`), selo "Vagas limitadas"
- Seção 10: headline "**NOSSO COMPROMISSO**" (não "GARANTIA"); copy validada (sem palavra "garantia/garantir" em nenhum trecho); selo escudo; texto "13 anos"
- 5 CTAs WhatsApp da Seção 9 (Caminho 1, 2, 3 + CTA único + qualquer botão extra) disparam `cta_click` + `whatsapp_redirect` corretos com mensagens canônicas (FR-021)

### Story 1.6 — Seções 11-13 (Visão + Objeções + FAQ) + Footer
**Descrição:** Implementar Seção 11 (Visão de Futuro 2 colunas com frase "Quem está perto de você sente isso"), 12 (Objeções com 5 blocos + CTA), 13 (FAQ acordeão single-open com **FAQ 7 reescrita** + **FAQ 10 com "13 anos"** + CTA "ainda tem dúvida"), Footer completo (logo + CNPJ + endereço + contatos com **`comercial@rfgcorretora.com.br`** + SUSEP + redes + Maps iframe **lateral desktop / 1 col mobile** + LGPD links + disclaimer).
**Complexidade:** **L**
**Dependências:** Story 1.5
**AC alto nível:**
- Seção 11: 2 colunas (positivo/negativo com `--bg-secondary` no negativo) desktop / **stack mobile com positivo no topo**; frase "**Quem está perto de você sente isso**" (não "Sua esposa")
- Seção 12: 5 blocos com ícones, frases-chave em negrito, CTA primary-lg final (mensagem WhatsApp #7 — `objecoes`); valor "menos de R$ 200" validado por Anderson ou suavizado para "uma fração disso"
- Seção 13: acordeão single-open com 10 perguntas, `aria-expanded`, transição altura 250ms; **FAQ 7: "Registro SUSEP ativo desde 1995. A RFG opera desde 2013..."**; FAQ 10: "1.200+ famílias em **13 anos**"
- Footer com todos os elementos de FR-016, e-mail **`comercial@rfgcorretora.com.br`**, Maps iframe lazy-loaded **(1 col mobile / coluna lateral desktop)**, mensagem WhatsApp #8 (`footer`)
- Todos os ícones acessíveis (`aria-hidden="true"` em decorativos)

### Story 1.7 — SEO + structured data + OG dinâmico + LGPD pages + cookie banner
**Descrição:** Configurar `generateMetadata` raiz + sitemap + robots + OG image dinâmica + favicon/apple-icon + manifest + JSON-LD (LocalBusiness + InsuranceAgency com **e-mail `comercial@` e founders Ricardo Farias + Anderson Guimarães** + FAQPage) + páginas `/privacidade` e `/termos` + ConsentBanner em produção. **Inclui correção pré-Story de `architecture.md` ADR-005 e `.env.local.example` (CON-014).**
**Complexidade:** **M**
**Dependências:** Story 1.6; **architecture.md ADR-005 corrigido** (e-mail `comercial@` + founder "Ricardo Farias")
**AC alto nível:**
- `view-source` em `/` mostra metadata completa + 2 blocos JSON-LD válidos (Schema.org validator passa); **JSON-LD `email` = `comercial@rfgcorretora.com.br`**; **`founder[0].name` = "Ricardo Farias"** + **`founder[1].name` = "Anderson Guimarães"**
- OG image gerada em `/opengraph-image` (1200x630) renderiza com logo + headline
- `/privacidade` e `/termos` com conteúdo LGPD válido (template padrão revisado por Anderson antes go-live); `mailto:` LGPD usa `comercial@rfgcorretora.com.br`
- `sitemap.xml` lista 3 URLs corretas
- `robots.txt` permite `/`, bloqueia `/api/` `/_next/` `/admin/` + linka sitemap
- ConsentBanner aceitar/recusar funciona; Meta Pixel só inicializa após accept

### Story 1.8 — Deploy Vercel + DNS Registro.br + analytics live + smoke real
**Descrição:** Setup projeto Vercel (mesma conta Anderson), conectar repo, configurar env vars (GA4 + Meta Pixel IDs reais + `NEXT_PUBLIC_CONTACT_EMAIL=comercial@rfgcorretora.com.br`), apontar DNS Registro.br (A 76.76.21.21 + CNAME www→cname.vercel-dns.com), redirect raiz→www, validar SSL, smoke real Anderson em mobile + desktop, validar 8 CTAs com mensagens canônicas.
**Complexidade:** **L** (executor exclusivo: @devops/Gage)
**Dependências:** Story 1.7 + Stories 1.1-1.6 todas done
**AC alto nível:**
- `https://www.rfgcorretora.com.br` resolve com SSL válido
- `https://rfgcorretora.com.br` redireciona 301 para `www`
- GA4 recebe eventos em produção (validar em DebugView); `whatsapp_redirect` e `scroll_depth=75` marcados como conversion events
- Meta Pixel dispara `Lead` no `whatsapp_redirect` (gated por consent)
- Lighthouse mobile real: Perf ≥95, A11y ≥95, BP ≥95, SEO 100
- Smoke real Anderson: **8 CTAs WhatsApp** abrem com **mensagens canônicas corretas** (verificadas no celular dele conforme tabela FR-021 — todas as 8 strings)
- Headers de segurança presentes (validar via `securityheaders.com`)

### 8.1 Resumo do Roadmap

| Story | Título | Complexidade | Dependência |
|-------|--------|--------------|-------------|
| 1.1 | Setup repo + boilerplate + tokens + CI | L | — |
| 1.2 | UI primitives + tipografia + analytics infra | L | 1.1 |
| 1.3 | Seções 1-3 (Hero/Problema/Oportunidade) | L | 1.2 + FR-050 |
| 1.4 | Seções 4-7 (Personas/Valor/Prova/Origem + bento) | XL | 1.3 + 4 depoimentos reais já inseridos em copy |
| 1.5 | Seções 8-10 (Como Funciona/Caminhos/Compromisso) | L | 1.4 |
| 1.6 | Seções 11-13 (Visão/Objeções/FAQ) + Footer | L | 1.5 |
| 1.7 | SEO + structured data + LGPD + cookie banner | M | 1.6 + ADR-005 corrigido |
| 1.8 | Deploy Vercel + DNS + analytics live | L | 1.7 |

**Total estimado:** 1 XL + 6 L + 1 M ≈ 50-70h dev (alinhado com `00-execution-plan.md` §Estimativa: 16-24h apenas em fase 3 Implementação, mas o cálculo deste PRD inclui também Fases 4-5 — QA loop e Deploy).

---

## 9. Quality Gates (gates de saída do projeto)

Critérios obrigatórios para considerar a v1 **Done** e liberar go-live:

### 9.1 Build & Tooling
- [ ] `pnpm lint` verde (zero warnings ESLint, incluindo `jsx-a11y`)
- [ ] `pnpm typecheck` verde (TypeScript strict)
- [ ] `pnpm build` verde (zero erros, bundle initial JS <100KB shared gzipped)
- [ ] `pnpm test` verde (Vitest unit + Playwright e2e smoke)

### 9.2 Performance & Lighthouse
- [ ] Lighthouse mobile real (Vercel Preview, 3G throttle): **Perf ≥95, A11y ≥95, BP ≥95, SEO = 100** (NFR-001..004)
- [ ] Core Web Vitals "Good": LCP <2.5s, CLS <0.1, INP <200ms validados em Vercel Speed Insights pós go-live (24h)

### 9.3 Smoke manual (Anderson + @qa)
- [ ] **8 CTAs WhatsApp testados em celular real** abrem WhatsApp com **mensagem canônica correta conforme tabela FR-021** (URL-encoding sem caracteres quebrados)
- [ ] Visual approved por Anderson em desktop + mobile (foto sócios, gradiente, tipografia Manrope+Inter)
- [ ] Mobile real iOS Safari + Android Chrome — sem layout quebrado, animações fluidas, touch targets ≥44px
- [ ] Sticky nav funciona em iOS (problema histórico de `position: sticky` em Safari); variação mobile sem hambúrguer confirmada
- [ ] FAQ acordeão abre/fecha corretamente, single-open respeitado

### 9.4 LGPD & Compliance
- [ ] Cookie banner aparece no primeiro acesso, aceitar/recusar funciona
- [ ] Meta Pixel **só inicializa após consent explícito de marketing** (validar via Network tab)
- [ ] GA4 inicializa com `anonymize_ip: true`
- [ ] `/privacidade` e `/termos` publicadas com template padrão LGPD (Decisão Anderson 2026-05-05 — revisão jurídica externa opcional para v1.1, não bloqueia go-live); `mailto:` LGPD usa `comercial@rfgcorretora.com.br`
- [ ] **Compliance SUSEP — busca textual em todas as seções (CON-013):** copy validada sem "garantia/garantir/contemplação rápida/100% sucesso/milagre/fórmula mágica/fácil/sem esforço". Confirmar:
  - [ ] Pilar 3 da Seção 5 usa "faz com que" (não "garante")
  - [ ] Caminho 1 da Seção 9 sem "garantir"
  - [ ] Headline da Seção 10 = "NOSSO COMPROMISSO" (não "GARANTIA")
  - [ ] Sem preços em nenhum dos 3 Caminhos (Seção 9)
  - [ ] Texto "13 anos" presente em Seção 7, Seção 10 e FAQ 10 (não "12 anos")
  - [ ] Persona-avatar interna "Marcelo" não aparece em nenhum lugar da landing
  - [ ] Frase "Quem está perto de você sente isso" na Seção 11 (não "Sua esposa")
  - [ ] Headlines das Seções 5 e 8 em Title Case (não CAIXA ALTA)

### 9.5 SEO & Discoverability
- [ ] `https://www.rfgcorretora.com.br/sitemap.xml` retorna XML válido com 3 URLs
- [ ] `robots.txt` permite indexação raiz e linka sitemap
- [ ] Schema.org validator (Google Rich Results Test) aprova `LocalBusiness` + `InsuranceAgency` + `FAQPage`
- [ ] **JSON-LD inspecionado:** `email` = `comercial@rfgcorretora.com.br`; `founder[0].name` = "Ricardo Farias"; `founder[1].name` = "Anderson Guimarães"
- [ ] OG image renderiza no Facebook Sharing Debugger e LinkedIn Post Inspector
- [ ] **GA4 com `whatsapp_redirect` marcado como conversion event** + `scroll_depth=75` configurado para acompanhar KPI secundária (endereça L-005, m-009)

### 9.6 Infraestrutura
- [ ] Domínio `www.rfgcorretora.com.br` resolve com SSL Let's Encrypt válido
- [ ] Redirect 301 `rfgcorretora.com.br` → `www.rfgcorretora.com.br`
- [ ] Headers de segurança validados via `securityheaders.com` (nota mínima A)
- [ ] GA4 property ativa recebendo eventos em produção
- [ ] Meta Pixel ativo recebendo `PageView` + `Lead`
- [ ] **Footer e `.env` finais usam `comercial@rfgcorretora.com.br`** (verificação textual)

---

## 10. Riscos e Mitigações

Replicados de `architecture.md` §10 (top 3 técnicos) + 2 produto:

| # | Risco | Categoria | Probabilidade | Impacto | Mitigação |
|---|-------|-----------|---------------|---------|-----------|
| 1 | **GSAP SSR hydration mismatch** — flicker visual entre HTML SSR e client mount, ou animação inicia antes da hidratação | Técnico | Alta | Médio | Sections animadas `'use client'`; GSAP via `useGSAP` hook; estados iniciais via CSS (`opacity: 0` SSR; GSAP só remove); `ScrollTrigger.refresh()` em `requestAnimationFrame` pós-hidratação. **Validação:** smoke Vercel Preview throttle 3G — confirmar zero flicker |
| 2 | **CLS por fontes (FOUT/FOIT)** — Manrope/Inter trocam métricas durante swap, reflow visível | Técnico | Média | Alto | `next/font/google` com `adjustFontFallback: true` (auto-ajusta size-adjust); `display: 'swap'`; `preload: true` para weights críticos (Manrope 700 + Inter 400 conforme FR-051); Lighthouse CI bloqueia PR se CLS >0.1; self-host como contingência. **Validação:** WebPageTest filmstrip |
| 3 | **Bundle GSAP excede budget** — GSAP + ScrollTrigger inflam JS inicial se mal lazy-loaded | Técnico | Média | Médio | Dynamic import por componente (não no provider); `@next/bundle-analyzer` em CI; budget initial JS <100KB gzipped; tree-shake plugins (importar só `ScrollTrigger`, não `gsap/all`); pin `gsap@^3.14 + @gsap/react@^2` (NFR-026). **Validação:** `pnpm build` First Load JS <100KB shared |
| 4 | **LGPD template padrão aceito por Anderson em 2026-05-05** | Produto | Baixa | Baixo | Risco descalonado. Decisão Anderson 2026-05-05: páginas `/privacidade` e `/termos` usam template padrão LGPD para SaaS/landing institucional brasileira. Revisão jurídica externa pode ser feita em v1.1 sem bloquear go-live. Mitigação aplicada. |
| 5 | **Logos parceiros — Mapfre em baixa resolução** | Produto | Alta | Baixo | Usar PNG atual em v1 com alerta visual interno (já documentado em `00-execution-plan.md`); buscar fonte vetorial oficial via canal comercial Anderson↔Mapfre; substituir em hotfix v1.0.1 quando disponível. **Não bloqueia go-live** — degradação aceitável |

### 10.1 Riscos secundários monitorados (não bloqueantes v1)
- Comportamento `wa.me` deep link em iOS Safari vs Chrome Android (validar em devices reais — ver QG 9.3)
- Propagação DNS Registro.br pode levar até 24h — agendar deploy com janela de tolerância
- SUSEP número específico no footer — descalonado em 2026-05-05 (Anderson decidiu não exibir número específico). Landing v1 usa apenas texto institucional "Registro SUSEP ativo desde 1995" no footer, JSON-LD `hasCredential` e CommitmentSection.
- **Architecture.md ADR-005 contém erros (e-mail `contato@` em vez de `comercial@`; founder "Ricardo Guimarães" em vez de "Ricardo Farias")** — bloqueio de pré-Story 1.7. Endereçado em CON-014 e dependência da Story 1.7.

---

## 11. Dependências Externas

Itens **fora do escopo de código** que precisam estar prontos para go-live:

| # | Dependência | Owner | Bloqueante? | Status |
|---|-------------|-------|-------------|--------|
| 1 | **GA4 property** criada (Anderson account) | @devops (cria) | Sim para FR-041 | A criar |
| 2 | **Meta Pixel** criado (Business Manager Anderson) | @devops (cria) | Sim para FR-042 | A criar |
| 3 | **Conta Vercel** com escopo deploy (mesma conta dos outros projetos Anderson) | Anderson | Sim para Story 1.8 | Existente (D9) |
| 4 | **GitHub `abguimaraes`** com permissão de criar repo privado | Anderson | Sim para Story 1.1 | Existente (D8) |
| 5 | **DNS Registro.br** acesso ao painel para apontar A + CNAME | Anderson | Sim para Story 1.8 | Existente (D4) |
| 6 | **Conteúdo legal** (`/privacidade` + `/termos`) — template padrão LGPD aceito por Anderson 2026-05-05 (sem revisão jurídica externa hard; opcional para v1.1) | Anderson | Não-bloqueante para go-live | Aceito (template padrão) |
| 7 | **Logos parceiros** otimizados (10 SVG/WebP) | @analyst (Alex — `00-execution-plan.md` Fase 0.3) | Sim para Story 1.4 | Em coleta |
| 8 | **Fotos sócios** convertidas PNG→WebP <300KB | @dev (script `scripts/optimize-images.ts`) | Sim para Story 1.3 | Pendente |
| 9 | **Horário de atendimento** (a coletar — `03-contato.md`) | Anderson | Não-bloqueante (default 9-18h) | A coletar |
| 10 | **Textos canônicos dos 4 depoimentos reais em `05-copy-landing.md`** (Felipe Alexandre Oliveira, Eder Clemente Pio, Henrique Martins Santos, Walter Campos — texto-fonte: `01-dna-completo.md` seção "Depoimentos Reais") | Anderson + @pm (Morgan) | **Sim para Story 1.4** | ✅ Aplicado 2026-05-05 (substitui os 3 fakes Rômulo/Rodrigo/Marcos Roberto que constavam no briefing inicial) |
| 11 | **Validação do valor "menos de R$ 200"** com Ricardo/Anderson (Seção 12 objeção #1) | Anderson | Sim para Story 1.6 (ou usar "uma fração disso") | A validar |
| 12 | **Correção de `architecture.md` ADR-005** — e-mail `comercial@` + founder "Ricardo Farias" | @architect (Aria) | **Sim para Story 1.7** (CON-014, I-006) | A corrigir |

---

## 12. Aprovações

- [x] **@pm (Morgan):** rascunho v0.1 concluído — 2026-05-05
- [x] **@po (Pax):** auditoria v0.1 — 2026-05-05 — veredito 🟡 GO com ajustes minor (8/10)
- [x] **@pm (Morgan):** v0.2 com correções aplicadas — 2026-05-05
- [ ] **@po (Pax):** 2º round de validação — pendente (ratificação esperada 10/10)
- [ ] **Anderson:** GO/NO-GO — pendente após 2º round PO

---

## 13. Resposta à Auditoria PO (Pax v1)

Lista completa dos findings da auditoria `rfg-landing-prd-audit.md` e onde foram aplicados:

### Findings Críticos (M)
- [x] **M-001 (Rômulo — 3º depoimento)** — ~~aplicado em FR-008 (3 quote cards), Story 1.4 AC e Dependência #10~~. **Superseded em 2026-05-05 (v0.4):** Anderson informou que os 3 testemunhos originais (Rômulo, Rodrigo, Marcos Roberto) eram fakes. Substituídos por 4 reais (Felipe Alexandre Oliveira, Eder Clemente Pio, Henrique Martins Santos, Walter Campos) em layout grid 2×2. M-001 não se aplica mais.
- [x] **M-002 (Copy canônica como CON)** — adicionado **CON-013** com checklist explícito de palavras/expressões proibidas e referência à versão pós-correções 2026-05-05 da copy.
- [x] **M-003 (Correções da copy-audit como FR/CON)** — adicionado **FR-050** listando os 7 ajustes 🟡/🟢 + reflexões em FR-006 (prefixo "Isso é para você se..."), FR-007 (Title Case + "faz com que"), FR-009 (sem "Marcelo"), FR-010 (Title Case), FR-012 ("13 anos" + "NOSSO COMPROMISSO"), FR-013 ("Quem está perto"), FR-014 (validar "menos de R$ 200"), FR-015 (FAQ 7 reescrita + "13 anos").
- [x] **M-004 (E-mail divergente)** — adicionado **CON-014** com e-mail canônico `comercial@rfgcorretora.com.br`. Reflexões em FR-016 (footer), FR-037 (JSON-LD), FR-047 (LGPD mailto), Story 1.7 e 1.8 ACs, QG 9.5/9.6, Riscos §10.1, Dependência #12.
- [x] **M-005 (Tipografia formalizada)** — adicionado **FR-051** (Manrope + Inter via `next/font/google`), refletido em Story 1.2 AC e Risco #2.
- [x] **M-006 (Paleta + neutros tingidos)** — adicionado **FR-052** (paleta primária + neutros tingidos azul + sem dark mode), refletido em Story 1.1 AC.
- [x] **M-007 (Mensagens WhatsApp canônicas)** — **FR-021 reescrito** com tabela canônica de 8 mensagens (literal + URL final encoded); FR-022 referencia o enum; Story 1.2 AC alinhada; QG 9.3 valida as 8 strings.

### Findings Importantes (m)
- [x] **m-001 (Versões pinadas GSAP)** — adicionado **NFR-026** (`gsap@^3.14 + @gsap/react@^2`).
- [x] **m-002 (Marquee fallback reduced-motion)** — refinado FR-031 com fallback "grid estático 5x2 desktop / 2x5 mobile".
- [x] **m-003 (Otimização SVG parceiros)** — adicionado **NFR-027** (svgo + PNG transparência alpha).
- [x] **m-004 (Storytelling Seção 7 — nomes literais)** — refinado FR-009 ("Copy preserva nomes literais Ricardo Farias + Anderson Guimarães + Mapfre + datas 1995 e 2013").
- [x] **m-005 (Sticky nav variação mobile/desktop)** — FR-002 reescrito com variação responsiva detalhada.
- [x] **m-006 (Tríade credenciais Hero AC)** — refinado FR-003 com ordem (badge SUSEP em cima + 2 badges no rodapé) e responsivo.
- [x] **m-007 (Reflow Seção 11 mobile)** — refinado FR-013 ("stack mobile com positivo no topo, negativo abaixo").
- [x] **m-008 (Conversão Meta Pixel)** — refinado FR-044 com mapeamento `whatsapp_redirect → Lead` + `cta_click → InitiateCheckout`.
- [x] **m-009 (Scroll depth 75% conversão)** — refinado FR-045 + QG 9.5 ("marco 75% configurado como conversion event no GA4").

### Lacunas (L)
- [x] **L-001 (Sem Framer Motion / Lenis)** — adicionado **CON-015** (animation lib única — GSAP + ScrollTrigger).
- [x] **L-002 (Bônus dos 3 Caminhos)** — refinado FR-011 com bônus literais por caminho (1/2/3 bônus).
- [x] **L-003 (Single-page architecture)** — adicionado **CON-016** (apenas `/`, `/privacidade`, `/termos`; navegação por âncoras).
- [x] **L-004 (Tríade de Autoridade DNA)** — refinado FR-008 ("ancora visualmente as 3 credenciais oficiais do DNA").
- [x] **L-005 (KPI primária 3% CTR — rastreamento)** — refinado §1.3 + QG 9.5 (eventos como conversion events no GA4).
- [x] **L-006 (Separação RFG ≠ PostFeito)** — reforçado CON-011 ("nenhum import direto, nenhum mono-repo, nenhum reuso de tokens via package").
- [x] **L-007 (Premissa Persuasiva e Mecanismos Únicos)** — refinado FR-004 ("explicita o conceito 'Ponto Cego Patrimonial'") + FR-005 ("destaque em Diagnóstico de Ângulo Morto Patrimonial") + US-03/US-04.
- [x] **L-008 (Fotos individuais Ricardo+Anderson)** — refinado FR-018 ("fotos individuais reservadas para v2 — não usadas em v1").

### Inconsistências (I)
- [x] **I-001 (E-mail divergente)** — coberto em M-004 / CON-014.
- [x] **I-002 ("12 anos" vs "13 anos")** — coberto em CON-013 (checklist) + FR-012 + FR-015 + Story 1.4-1.6 ACs.
- [x] **I-003 (Layout iframe Maps)** — refinado FR-016 e Story 1.6 AC ("1 col mobile / coluna lateral desktop").
- [x] **I-004 (CTAs 6 vs 8)** — PRD já consistente em 8 CTAs; sinalizado update silencioso de `00-execution-plan.md` e `architecture.md` ADR-002 (não bloqueante).
- [x] **I-005 (Logos SVG vs PNG mistos)** — refinado FR-020 e Story 1.4 AC ("SVG preferencial OU PNG/WebP transparente para Mapfre, SulAmérica, Suhai").
- [x] **I-006 (Founder "Ricardo Guimarães" → "Ricardo Farias")** — coberto em CON-014, FR-037, Story 1.7 dependência, Riscos §10.1, Dependência #12.

**Anderson ratificou 2026-05-05:** M1 (Opção A 3-col uniforme), m1+m8 (Stories 1.1/1.8 → L), CON-014 mantido com texto institucional sem número SUSEP, Risco #4 descalonado (LGPD template padrão).

---

## 14. Changelog (legado)

| Data | Versão | Autor | Mudança |
|------|--------|-------|---------|
| 2026-05-05 | 0.4 | Pax + Morgan | Anderson informou que os 3 depoimentos antigos (Rômulo, Rodrigo, Marcos Roberto) eram fakes. Substituídos por 4 reais (Felipe Alexandre Oliveira, Eder Clemente Pio, Henrique Martins Santos, Walter Campos). Layout 2×2 substituindo 3-col uniforme. FR-008 e CON-013 atualizados; Story 1.4 AC-14 ajustada; wireframes Seção 6 redesenhada para 4 cards. |
| 2026-05-05 | 0.3 | Pax | Aplicadas decisões finais Anderson — Opção A para Seção 6 (3-col uniforme), número SUSEP não será exibido (mantido apenas "desde 1995"), LGPD template padrão sem revisão jurídica hard. Stories 1.1/1.8 Complexity ajustada para L (audit Pax v2 m1+m8 resolvido). Dependência #9 (SUSEP nº) removida e Risco #4 descalonado. |
| 2026-05-05 | 0.2 | Morgan | Aplicação dos findings da auditoria PO Pax — 7 FRs novos (FR-050..052 + ajustes em ~12 FRs), 4 CONs novos (CON-013..016), 2 NFRs novos (NFR-026..027), tabela canônica das 8 mensagens WhatsApp, todos os ajustes M/m/L/I endereçados |
| 2026-05-05 | 0.1 | Morgan | PRD inicial — 49 FRs, 25 NFRs, 12 CONs, 8 stories, 5 riscos, 10 dependências |
