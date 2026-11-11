# packages/works

Measured neoplastic compositions and their schema (M2).

| Layer | Path | Role |
| --- | --- | --- |
| **L0** | `schema/` | JSON Schema 2020-12 — **the** contract (`work.schema.json`) |
| **L1** | `works/<slug>/` | Measured works (`work.yml` + `MEASUREMENT.md`) |
| **Fixtures** | `fixtures/` | `valid.yml` + one-corruption broken cases |
| **Python** | `python/` | Pydantic **mirror** + derive / vary / catalog (not a TS codegen source) |

**Contract rule:** TypeScript does not come from Python. Zod and pydantic both
mirror `schema/work.schema.json`; CI checks they agree and that JS/Python
`derive_render_plan` emit the same plan. Optional rectangle `clip.shape`
(`rect`|`circle`|`triangle`) is a silhouette lab mask — see `schema/README.md`.

Reference work 1: `works/kunsthaus-1930-rbby/` (provisional measurement).

Do not invent proportions. Derived tracks never land in `work.yml`.

**Limit case (do not encode):** Hilma af Klint *Ser III No. 5* (1920) — see
[`docs/DEV_PLAN/MONDRIAN/corpus/REFERENCE-WORKS.md`](../../docs/DEV_PLAN/MONDRIAN/corpus/REFERENCE-WORKS.md)
§ Limit cases for digitalization.
