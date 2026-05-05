# GitHub Rulesets — Status e Alternativas

> ⚠️ **DEPRECATED — 2026-05-05.** Este documento descreve a tentativa inicial de proteger a branch `main` via Repository Rulesets, que foi bloqueada pelo plano GitHub Free em repos privados. A solução final adotada foi **Opção A: tornar o repo público + Branch Protection API** (sem custo). A configuração ativa está documentada em [`github-branch-protection.md`](./github-branch-protection.md). Este arquivo permanece como histórico do problema e da decisão.

---

**Data:** 2026-05-05
**Executor:** @devops (Gage)
**Story relacionada:** Story 1.1 AC-2 (proteção da branch `main`) — ✅ resolvido via Branch Protection API após repo virar público

---

## TL;DR

A configuração de **Repository Rulesets** em `abguimaraes/rfg-landing` **não pôde ser aplicada inicialmente** porque a feature requer GitHub Pro em repositórios privados. A conta `abguimaraes` está no plano Free.

**Status atual da branch `main` (atualizado 2026-05-05):** ✅ **PROTEGIDA** via Branch Protection API após repo ser tornado público. Ver `github-branch-protection.md`.

---

## Tentativa Realizada

### Comando

```bash
gh api --method POST \
  -H "Accept: application/vnd.github+json" \
  repos/abguimaraes/rfg-landing/rulesets \
  --input ruleset-payload.json
```

### Payload preparado (não aplicado)

```json
{
  "name": "main-protection",
  "target": "branch",
  "enforcement": "active",
  "conditions": {
    "ref_name": {
      "include": ["refs/heads/main"],
      "exclude": []
    }
  },
  "rules": [
    {"type": "deletion"},
    {"type": "non_fast_forward"},
    {"type": "required_linear_history"},
    {
      "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": false,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": false
      }
    },
    {
      "type": "required_status_checks",
      "parameters": {
        "strict_required_status_checks_policy": true,
        "required_status_checks": [
          {"context": "lint"},
          {"context": "typecheck"},
          {"context": "build"}
        ]
      }
    }
  ]
}
```

### Resposta da API

```
HTTP 403
{
  "message": "Upgrade to GitHub Pro or make this repository public to enable this feature.",
  "documentation_url": "https://docs.github.com/rest/repos/rules#create-a-repository-ruleset",
  "status": "403"
}
```

O erro também ocorre no endpoint `GET /repos/{owner}/{repo}/rulesets` (mesma mensagem 403), confirmando que toda a superfície da API de Rulesets está bloqueada para repos privados no plano Free.

---

## Causa-raiz

Documentação oficial GitHub:

> "Branch protection rules and rulesets are only available on public repositories with GitHub Free, and on public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server."

A premissa da Story 1.1 (e da memória do projeto) de que **Rulesets funcionam em repos privados Free** está **incorreta**. Tanto Branch Protection quanto Rulesets exigem o mesmo nível de plano em repos privados.

Verificação da conta:

```bash
gh api user --jq '{login, plan: .plan.name}'
# {"login":"abguimaraes","plan":null}
```

`plan: null` no retorno da API GitHub indica plano Free.

---

## Alternativas para Anderson decidir

### Opção A — Tornar o repo público

- **Custo:** $0
- **Trade-off:** código exposto publicamente. Aceitável se o repo é landing page institucional sem segredos.
- **Implementação:** `gh repo edit abguimaraes/rfg-landing --visibility public --accept-visibility-change-consequences`
- **Resultado:** Rulesets passam a funcionar, payload acima pode ser aplicado direto.

### Opção B — Upgrade pra GitHub Pro

- **Custo:** ~US$ 4/mês por usuário (cobrado em USD).
- **Trade-off:** custo recorrente. Habilita Rulesets, Branch Protection, Codespaces avançado, Pages privado.
- **Implementação:** upgrade manual em `https://github.com/settings/billing/plans`. Após upgrade, aplicar payload via `gh api`.

### Opção C — Proteção client-side (sem Rulesets)

- **Custo:** $0
- **Trade-off:** proteção depende de disciplina + hooks locais. Não há garantia server-side.
- **Implementação:**
  1. **Husky pre-push hook** bloqueando push direto pra `main` quando o branch local for `main`.
  2. **Workflow CI obrigatório** (já existe em `.github/workflows/ci.yml`) — garante que merges quebrados sejam visíveis, mesmo sem bloqueio.
  3. **Convenção de fluxo:** sempre criar feature branch + PR mesmo sem bloqueio server-side. @devops faz merge via `gh pr merge --squash`.
  4. **Auditoria periódica** dos commits diretos em `main` via `git log --first-parent main`.

### Opção D — Migrar pra organização GitHub Free

- **Custo:** $0
- **Trade-off:** organizações Free **também não têm** Rulesets em repos privados. Não resolve.
- **Resultado:** descartar.

---

## Recomendação @devops

**Opção C (proteção client-side) como medida imediata + Opção A (repo público) como meta de curto prazo.**

Justificativas:
- Repo é landing page. Conteúdo provavelmente não-sensível (verificar com Anderson antes).
- Upgrade pra Pro só por causa de proteção de branch é overkill pro estágio atual.
- Husky pre-push hook + disciplina de PR cobre 95% dos casos.
- Se/quando o repo virar público, ativar o ruleset é 1 comando.

---

## Como aplicar o ruleset NO FUTURO (quando plano permitir)

Salvar o payload acima em `ruleset-main.json` e rodar:

```bash
gh api --method POST \
  -H "Accept: application/vnd.github+json" \
  repos/abguimaraes/rfg-landing/rulesets \
  --input ruleset-main.json
```

Validar criação:

```bash
gh api repos/abguimaraes/rfg-landing/rulesets
gh api repos/abguimaraes/rfg-landing/rulesets/{ID}
```

### Modificar ruleset existente

```bash
gh api --method PUT \
  -H "Accept: application/vnd.github+json" \
  repos/abguimaraes/rfg-landing/rulesets/{ID} \
  --input ruleset-main.json
```

### Adicionar developer ao bypass list

Editar o JSON adicionando:

```json
"bypass_actors": [
  {
    "actor_id": <USER_OR_TEAM_ID>,
    "actor_type": "User",
    "bypass_mode": "always"
  }
]
```

Obter `actor_id` via:

```bash
gh api users/{username} --jq '.id'
```

`actor_type` aceita: `RepositoryRole`, `Team`, `Integration`, `OrganizationAdmin`, `User` (apenas em GHEC com Enterprise Managed Users).

---

## Referências

- GitHub Rulesets API: https://docs.github.com/rest/repos/rules
- About rulesets: https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets
- Plans comparison: https://docs.github.com/get-started/learning-about-github/githubs-plans

---

## Próxima ação — RESOLVIDA

Anderson decidiu **Opção A** em 2026-05-05.

✅ Executado por @devops:
1. `gh repo edit abguimaraes/rfg-landing --visibility public --accept-visibility-change-consequences`
2. LICENSE MIT adicionado ao root
3. Branch protection aplicada via `PUT /repos/.../branches/main/protection` (em vez de Rulesets — ambos funcionam em repos públicos no Free, e a API de Branch Protection é mais estável e amplamente documentada)

📄 Configuração ativa documentada em [`github-branch-protection.md`](./github-branch-protection.md).

Story 1.1 AC-2 ✅ desbloqueada e resolvida.
