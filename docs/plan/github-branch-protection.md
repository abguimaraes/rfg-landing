# GitHub Branch Protection — `main`

**Data de aplicação:** 2026-05-05
**Executor:** @devops (Gage)
**Story relacionada:** Story 1.1 AC-2 (proteção da branch `main`)
**Substitui:** `docs/plan/github-rulesets.md` (deprecated — ver §Histórico)

---

## TL;DR

A branch `main` de `abguimaraes/rfg-landing` está protegida server-side via **GitHub Branch Protection API**. Pré-requisito (repo público) foi atendido em 2026-05-05 quando Anderson aprovou a Opção A (tornar o repo público) — solução que destravou Branch Protection no plano GitHub Free sem custo recorrente.

**AC-2 da Story 1.1:** ✅ resolvido.

---

## Decisão Anderson 2026-05-05

| Opção avaliada | Custo | Resultado |
|----------------|-------|-----------|
| **A — Repo público + Branch Protection** | $0 | ✅ **Escolhida** |
| B — Upgrade GitHub Pro (privado + protection) | ~US$ 4/mês | Descartada (overkill) |
| C — Apenas hook client-side (Husky) | $0 | Descartada (sem garantia server-side) |
| D — Migrar pra organização Free | $0 | Inviável (organização Free também não libera) |

**Justificativa Anderson:** repo é landing institucional. Sem secrets, sem código proprietário diferenciado, sem segredo competitivo. Tornar público + MIT habilita branch protection imediatamente, valoriza portfólio público de Anderson e elimina custo recorrente.

---

## Configuração aplicada

### Endpoint

```
PUT /repos/abguimaraes/rfg-landing/branches/main/protection
```

### Payload (JSON)

```json
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["lint", "typecheck", "build"]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": false,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 0
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": false,
  "lock_branch": false,
  "allow_fork_syncing": false
}
```

### Comando completo

```bash
# Pré-requisito: tornar o repo público
gh repo edit abguimaraes/rfg-landing --visibility public --accept-visibility-change-consequences

# Aplicar branch protection
gh api -X PUT repos/abguimaraes/rfg-landing/branches/main/protection \
  -H "Accept: application/vnd.github+json" \
  --input branch-protection.json
```

---

## O que está protegido

| Regra | Status | Efeito |
|-------|--------|--------|
| Required status checks (`lint`, `typecheck`, `build`) | ✅ ativo | PR só pode ser merge se os 3 checks passarem |
| `strict: true` (status checks) | ✅ ativo | Branch precisa estar atualizada com `main` antes do merge |
| Required linear history | ✅ ativo | Sem merge commits — só squash ou rebase |
| Allow force pushes | ❌ bloqueado | Ninguém pode reescrever histórico de `main` |
| Allow deletions | ❌ bloqueado | `main` não pode ser deletada |
| Required PR review count | `0` | Anderson dev solo — review próprio não-obrigatório |
| Enforce admins | ❌ desligado | Anderson admin pode bypassar emergencialmente (use com parcimônia) |

**Notas:**

- `required_approving_review_count: 0` permite que Anderson (admin/único colaborador) faça merge dos próprios PRs sem precisar de revisor humano. PR ainda é obrigatório por causa do gate de status checks + linear history (push direto em `main` é bloqueado).
- `enforce_admins: false` é segurança de escape — se algum hook quebrar e o admin precisar destravar, ainda consegue. Para projetos com múltiplos contribuidores, ligar.

---

## Validação

### Verificar config aplicada

```bash
gh api repos/abguimaraes/rfg-landing/branches/main/protection
```

Saída esperada (campos relevantes):

```json
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["lint", "typecheck", "build"]
  },
  "required_linear_history": { "enabled": true },
  "allow_force_pushes": { "enabled": false },
  "allow_deletions": { "enabled": false }
}
```

### Smoke test (deve falhar)

```bash
# 1. Push direto em main com checks pendentes — DEVE FALHAR
git checkout main
echo "test" >> README.md
git commit -am "test"
git push origin main
# Esperado: remote rejected (protected branch)

# 2. Force push em main — DEVE FALHAR
git push --force origin main
# Esperado: remote rejected
```

---

## Próximos passos sugeridos (opcionais)

1. **CODEOWNERS** — adicionar `.github/CODEOWNERS` com `* @abguimaraes` para quando a equipe crescer (`require_code_owner_reviews: true` passa a fazer sentido).
2. **Subir review count para 1** quando houver mais 1 dev no time — habilita peer review.
3. **`required_signatures: true`** se Anderson quiser assinar commits com GPG/SSH (impede commits não-assinados).
4. **Ruleset paralelo** para outras branches `release/*` quando o projeto crescer.

---

## Modificar a configuração no futuro

Edite `branch-protection.json` localmente e rode:

```bash
gh api -X PUT repos/abguimaraes/rfg-landing/branches/main/protection \
  -H "Accept: application/vnd.github+json" \
  --input branch-protection.json
```

A API substitui (não merge) — sempre passe o payload completo.

### Remover proteção (não recomendado)

```bash
gh api -X DELETE repos/abguimaraes/rfg-landing/branches/main/protection
```

---

## Histórico

| Data | Evento |
|------|--------|
| 2026-05-05 | Tentativa inicial via Repository Rulesets (`POST /rulesets`) — bloqueada por GitHub Free em repo privado (HTTP 403). Documentado em `github-rulesets.md` (deprecated). |
| 2026-05-05 | Anderson aprova Opção A: repo público + MIT. `gh repo edit --visibility public` + Branch Protection API aplicados com sucesso. AC-2 resolvido. |

---

## Referências

- [GitHub Docs — Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub REST API — Branch protection](https://docs.github.com/en/rest/branches/branch-protection)
- Story 1.1 AC-2 — `docs/stories/1.1.setup-foundation.story.md`
- Plano de execução — `docs/plan/00-execution-plan.md` (D10)
