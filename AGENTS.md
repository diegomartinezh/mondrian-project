# AGENTS.md — Mondrian Project

**Format:** [AGENTS.md](https://github.com/agentsmd/agents.md) · tool-agnostic  
**Product:** Neoplastix (visitor marque; canonical `https://neoplastix.crea-comm.net` — live remains github.io until cutover) · programme/repo `ruvebal/mondrian-project`  
**Cascade:** `docs/DEV_PLAN/MONDRIAN/` · naming [D-33](docs/DEV_PLAN/MONDRIAN/DECISIONS/D33-2026-11-09-NEOPLASTIX-MARQUE.md)

## Dev environment

| Tool | Pin |
| --- | --- |
| Node | **≥24.22.1** (`.nvmrc`) — refuse ≤20 and unpatched 22.22.x / 24.22.0 |
| pnpm | via `packageManager` field; `engine-strict=true` |
| Python | **3.12** via `uv` (`.python-version`) |
| Astro | 7.x in `services/web` |

```bash
cd ~/projects/ruvebal/scholar/udit/courses-repos/mondrian-project
nvm use   # or fnm use
pnpm install
pnpm check
uv sync && uv run pytest
BASE=/mondrian-project pnpm --filter @mondrian/web build
```

## Verification before claiming done

- `pnpm check` green
- `uv run pytest` green
- No Svelte island on `/` or `/contribute/` dist HTML
- Never force-push `main`; never commit unless the human asks

## Do not

- Call FastAPI from the public Pages / kiosk MVP path
- Put SVG or full work JSON in URL query params
- Import `svelte` into `packages/matrix`
- Approve or merge as an assistant
- Copy `_private/` correspondence into this repo

## Lanes

See `CONTRIBUTING.md` and `.github/CODEOWNERS`.

`CLAUDE.md` redirects here.
