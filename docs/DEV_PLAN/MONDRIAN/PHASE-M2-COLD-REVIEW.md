<!--
Mondrian Project — PHASE-M2 cold review.
Reviewer did not implement this phase. Status flip to DONE is owner-only after triage.
-->

# PHASE-M2 cold review

| Field | Value |
| --- | --- |
| **Reviewer** | Cursor cold-review subagent (no implementer memory of this phase) |
| **Date** | 2026-11-08 |
| **Pack root** | `docs/DEV_PLAN/MONDRIAN/` (product repo `ruvebal/mondrian-project`) |
| **Inputs** | `PHASE-M2.md` Acceptance; `PHASE-M2-HANDOFF.md`; `MONDRIAN-CASCADE.md` §3; suite transcript; spot-check of schema/fixtures/matrix/python/conformance; one mutation sample (restored) |
| **Verdict** | **FAIL** → triage closed same day (see REPORT) |

Implementer correctly left status **VERIFYING** and did not self-certify DONE. This review does **not** mark PHASE-M2 DONE by itself.

---

## Summary

L0 geometry is the right shape: Andrzejewski §3.2 points / rectangles / explicit lines, not a dense matrix; `valid.yml` matches the Kunsthaus reference; JS/Python plans equal; matrix has no `svelte`; MEASUREMENT.md records catalogue, pixels, crop, wall time, and σ. That spine is real.

Acceptance still failed its own arbiter at review time: missing zod column (weak Astro passthrough), dishonest weight-variation clones under real IDs, incomplete named fixtures, and no works-count assertion. Mutation sample (restored) proved Ajv `required` and semantic layers are load-bearing when broken.

---

## Findings

### F1 — Conformance lacked a load-bearing zod column

| | |
| --- | --- |
| **Severity** | P1 |
| **Blocks DONE?** | **yes** (at review) |
| **Evidence** | Acceptance required `schema\|js\|zod\|py`. Handoff printed Ajv\|JS\|py only; `content.config.ts` used `z.record(...).passthrough()` for provenance/swatches and accepted several structural fixtures. |
| **Triage** | **CLOSED** — `packages/works/schema/work.zod.mjs` + conformance `zod=` column; Astro collection schema tightened; semantic refine shares `validateWork` paths. |

### F2 — Weight variations were catalog clones under real IDs

| | |
| --- | --- |
| **Severity** | P1 |
| **Blocks DONE?** | **yes** (at review) |
| **Evidence** | `invert-rank` / `complement` / `reciprocal` / `equalize` returned deepcopy and byte-identical catalog JSON while remaining in the state enum. Prompt: closed-form rewrite or omit. |
| **Triage** | **CLOSED** — omitted from MVP catalog, composition-state enum, and JS/Python `vary`; documented in schema README. |

### F3 — Structural “four rejections” vs JS semantic-only design

| | |
| --- | --- |
| **Severity** | P2 |
| **Blocks DONE?** | **yes** (wording) |
| **Evidence** | JS accepted several structural fixtures by design (semantic layer). Deliverable text claimed all four paths reject structural. |
| **Triage** | **CLOSED** — Acceptance amended: structural = Ajv + zod + pydantic reject; JS is semantic-only. Conformance enforces that split. |

### F4 — Named broken fixtures missing

| | |
| --- | --- |
| **Severity** | P2 |
| **Blocks DONE?** | **yes** (at review) |
| **Evidence** | Missing ONE-corruption fixtures for overlapping rectangles, out-of-bounds line, missing swatch. |
| **Triage** | **CLOSED** — added under `fixtures/broken/semantic/` (missing swatch is role-usage semantic, not Ajv-required keys). |

### F5 — `getCollection('works')` never asserted

| | |
| --- | --- |
| **Severity** | P2 |
| **Blocks DONE?** | **yes** literal; deferral accepted |
| **Evidence** | Loader wired; no page called `getCollection`. |
| **Triage** | **CLOSED (deferral)** — `scripts/assert-works-count.mjs` asserts exactly one `work.yml` on web build; page-level `getCollection` remains M3. |

### F6 — Mutation bullet overstated “unknown-point alone”

| | |
| --- | --- |
| **Severity** | P2 |
| **Blocks DONE?** | **no** |
| **Evidence** | Removing only the unknown-ref check still fails via ordered-extent; dual-gate disable fails conformance. Removing schema `required: title` → missing-title `schema=ok`, zod still rejects, conformance exit 1. |
| **Triage** | Recorded in REPORT; Acceptance wording softened. |

### F7 — Reference work remains `proposal`

| | |
| --- | --- |
| **Severity** | P3 |
| **Blocks DONE?** | **no** |
| **Evidence** | Provisional measurement with σ recorded; cascade allows named uncertainty. |
| **Triage** | **DEFERRED** — second pass → `accepted` before M3 About quotes geometry numbers. |

### F8 — `patterns/.gitkeep` gitignore negation

| | |
| --- | --- |
| **Severity** | P3 |
| **Blocks DONE?** | **no** |
| **Triage** | **CLOSED** — ignore `patterns/*`, un-ignore `.gitkeep`, file tracked. |

### F9 — Line-scale / junction named tests thinner than Acceptance prose

| | |
| --- | --- |
| **Severity** | P3 |
| **Blocks DONE?** | **no** |
| **Triage** | **DEFERRED** — covered by reference work + clamp loop; optional pedagogy tests later. |

---

## Schema vs Andrzejewski §3.2

**Pass.** Point / rectangle / explicit-line representation; no dense matrix in `work.yml`; derived plan only.

---

## Post-triage suite (2026-11-08)

```text
pnpm --filter @mondrian/matrix test   → 13 passed
uv run pytest packages/works/python/tests → 7 passed
./scripts/conformance.sh              → OK (schema|js|zod|py + plan=equal; catalog 10 files)
pnpm check                            → green
assert-works-count                    → OK (kunsthaus-1930-rbby)
```

Owner flips DONE in `PHASE-M2-REPORT.md` after this triage.
