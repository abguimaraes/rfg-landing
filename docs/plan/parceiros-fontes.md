# Parceiros — Logos Oficiais das Seguradoras

**Documento:** Inventário e procedência dos logos das 10 seguradoras parceiras da RFG Corretora, usados na faixa de autoridade institucional da landing.

**Coletado por:** @analyst (Alex)
**Data da captura:** 2026-05-05
**Diretório dos arquivos:** `assets/brand/parceiros/`

---

## Tabela de Procedência

| # | Seguradora | Site Oficial | Logo URL Capturada | Arquivo Local | Formato | Observações |
|---|------------|--------------|--------------------|---------------|---------|-------------|
| 1 | Porto Seguro | https://www.portoseguro.com.br/ | https://upload.wikimedia.org/wikipedia/commons/1/14/Porto_2022.svg | `porto-seguro.svg` | SVG | Fallback Wikimedia: home oficial estava em estado de loading SPA, sem asset estático no HTML inicial. Wikimedia hospeda a marca atual (rebrand 2022) — domínio público (formas geométricas + texto). |
| 2 | Yelum Seguros | https://www.yelumseguros.com.br/Pages/Home.aspx | https://www.yelumseguros.com.br/SiteAssets/img/logo-cia-primary.svg | `yelum-seguros.svg` | SVG | Captura direta do site oficial (header). Asset primário da companhia. |
| 3 | Bradesco Seguros | https://www.bradescoseguros.com.br/clientes | https://upload.wikimedia.org/wikipedia/commons/8/8a/Banco_Bradesco_logo.svg | `bradesco-seguros.svg` | SVG | Fallback Wikimedia: portal cliente carrega imagens via JS dinâmico (placeholders base64). Logo institucional Bradesco unificado (mesma marca usada em "Bradesco Seguros"). |
| 4 | Mapfre | https://www.mapfre.com.br/para-voce/ | https://www.mapfre.com.br/media/logo-mapfre.png | `mapfre.png` | PNG (159x24, RGBA) | Captura direta do site oficial (alt: "MAPFRE Brasil"). PNG transparente em baixa resolução — recomenda-se substituição por SVG vetorial via brand portal corporativo se disponível. |
| 5 | Allianz | https://www.allianz.com.br/ | https://upload.wikimedia.org/wikipedia/commons/6/6e/Allianz_logo.svg | `allianz.svg` | SVG | Fallback Wikimedia: CDN oficial (`allianz.com.br/content/dam/...`) retornou 403 a curl direto (proteção bot). Wikimedia tem o logo corporativo global oficial (300x134). |
| 6 | Akad Seguros | https://akadseguros.com.br/ | SVG inline em `<a class="banner__logo">` (extraído do HTML do header) | `akad-seguros.svg` | SVG | Logo é renderizado como SVG inline no HTML (não há arquivo estático). Extraído via parse do HTML do banner do site oficial — corresponde exatamente à marca atual pós-rebrand (Argo → Akad), com o "K" cuneiforme. |
| 7 | SulAmérica | https://portal.sulamericaseguros.com.br/ | https://portal.sulamericaseguros.com.br/assets/logo-sula130.png | `sulamerica.png` | PNG (2560x590, RGBA) | Captura direta do portal oficial. Resolução alta (otimizado para retina). |
| 8 | Tokio Marine | https://www.tokiomarine.com.br/ | https://www.tokiomarine.com.br/wp-content/themes/tokiomarine/images/icons/common/logo-tokiomarine.svg | `tokio-marine.svg` | SVG | Captura direta do site oficial (header WP theme). Asset oficial atual. |
| 9 | Suhai Seguradora | https://suhaiseguradora.com/ | https://suhaiseguradora.com/wp-content/uploads/2025/04/AF_SUHAI_LOGOTIPO_VERDE_ESCURO_RGB.png | `suhai-seguradora.png` | PNG (4250x2000, indexed color) | Captura direta do site oficial. Versão verde escuro (variante institucional principal). Arquivo "AF" (arte-final) sugere ativo entregue por design — alta fidelidade. |
| 10 | HDI Seguros | https://www.hdiseguros.com.br/ | https://upload.wikimedia.org/wikipedia/commons/0/04/HDI-Logo.svg | `hdi-seguros.svg` | SVG | Fallback Wikimedia: site oficial retornou 403 a WebFetch e páginas internas tentadas resultaram em 404. Wikimedia hospeda o logo corporativo global HDI (HDI Versicherungen, marca-mãe alemã, idêntica à HDI Seguros Brasil). |

---

## Resumo Executivo

| Métrica | Valor |
|---------|-------|
| Total capturado | 10/10 |
| SVG (escala perfeita) | 7 (Porto, Yelum, Bradesco, Allianz, Akad, Tokio, HDI) |
| PNG transparente | 3 (Mapfre, SulAmérica, Suhai) |
| Captura direta do site oficial | 6 (Yelum, Mapfre, Akad, SulAmérica, Tokio, Suhai) |
| Captura via Wikimedia Commons (fallback) | 4 (Porto, Bradesco, Allianz, HDI) |

---

## Pontos de Atenção Técnicos

### Logos com possível upgrade futuro
- **Mapfre (PNG 159x24):** baixa resolução. Sugestão: solicitar SVG via portal de imprensa Mapfre ou consultar brand guideline.
- **Suhai (PNG indexed color):** ativo de alta fidelidade mas em paleta indexada — pode requerer conversão para RGBA se for renderizado em fundos coloridos com transparência.

### Logos cuja captura direta foi bloqueada
- **Porto Seguro:** site é SPA em estado de loading no HTML inicial; logo carregado via JS após hidratação.
- **Bradesco Seguros:** portal usa placeholders base64 e carrega imagens via JS dinâmico.
- **Allianz:** CDN `content/dam/onemarketing` retorna 403 a clientes não-browser (proteção bot).
- **HDI Seguros:** site oficial bloqueou WebFetch (403). Páginas alternativas testadas retornaram 404.

Em todos esses casos, a marca extraída do Wikimedia é equivalente à oficial atual (verificado por inspeção visual e correspondência com identidade institucional vigente em 2025-2026).

---

## Compliance e Uso de Marca

### Autorização de uso
- **Anderson Guimarães**, sócio da RFG Corretora, confirmou parceria comercial real e ativa com as 10 seguradoras listadas.
- Uso de logos de seguradoras parceiras em **faixa de autoridade institucional** ("trabalhamos com") é prática padrão e amplamente aceita no mercado de corretoras de seguros no Brasil — análoga ao uso de logos de clientes em case-studies B2B.
- O uso aqui restringe-se a **identificação institucional da parceria comercial**, sem implicar endosso, recomendação ou exclusividade.

### Brand guidelines conhecidos (consultar antes de qualquer manipulação visual)

| Seguradora | Brand Portal / Guideline | Restrições conhecidas |
|------------|--------------------------|------------------------|
| Mapfre | https://www.mapfre.com/recursos-corporativos/identidad-corporativa/ (corporate global) | Cor institucional vermelha (Pantone Red 032) é mandatória; manter área de respiro mínima (`x` = altura do "M"). |
| SulAmérica | Brand portal interno (acesso via parceria); guideline público em https://www.sulamerica.com.br/ → rodapé "Imprensa" | Não distorcer proporção; não alterar cor primária (azul institucional). |
| Allianz | https://www.allianz.com/en/about-us/who-we-are/brand.html | Logo em azul Allianz Pantone 280C ou versão monocromática preta/branca. Vetar uso sobre fundos visualmente conflitantes. |
| Porto Seguro | https://www.portoseguro.com.br/imprensa | Versão pós-rebrand 2022 (atual). Não usar versões anteriores ("Porto Seguro" com bandeira azul antiga). |
| Bradesco Seguros | https://www.bradescori.com.br/ → seção "Identidade Visual" | Manter o sistema visual Bradesco corporativo. |
| Tokio Marine | https://www.tokiomarine.com.br/imprensa/ | Logo institucional sem alteração de proporções. |
| HDI Seguros | https://www.hdi.de/ueberuns/medien (HDI global) | Marca corporativa global; respeitar tipografia e espaçamento. |
| Yelum, Akad, Suhai | Brand portals públicos não localizados na captura — solicitar via canal comercial se houver retrabalho visual. |

### Recomendações operacionais
1. **Não recolorir** os logos. Usar sempre na versão de cor original entregue (mesmo que isso quebre uniformidade visual da faixa — uniformidade NUNCA pode vir antes da fidelidade de marca).
2. **Renderizar com fundo claro neutro** (branco, off-white, ou cinza claro #F5F5F5). Evitar fundos coloridos saturados que conflitem com cores institucionais.
3. **Respeitar área de respiro** — mínimo 16px ao redor de cada logo na faixa.
4. **Em caso de demanda formal de takedown** por qualquer seguradora, remover imediatamente o logo e abrir contato comercial para esclarecimento.
5. **Logos PNG (Mapfre, SulAmérica, Suhai)** devem ter fundo verificado — confirmar transparência alpha em design review antes de publicar.

---

## Próximos passos sugeridos

- [ ] Design review dos 10 ativos pelo @design-chief antes de embarcar na faixa
- [ ] Otimização SVG (svgo) para reduzir tamanho de `tokio-marine.svg` (43KB) — atual está com path data não otimizado
- [ ] Criar fallback PNG @2x para todos os SVGs (caso navegador não renderize SVG)
- [ ] Validar contraste/legibilidade da faixa em fundos da landing v2
- [ ] Considerar upgrade Mapfre para SVG via canal oficial RFG → Mapfre

---

*Documento mantido por @analyst — atualizar sempre que houver troca de portfólio de seguradoras parceiras ou rebrand de qualquer companhia listada.*
