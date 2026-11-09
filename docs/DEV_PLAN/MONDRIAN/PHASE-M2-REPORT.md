<!--
Mondrian Project — PHASE-M2 report. Implementer stops at VERIFYING; DONE is cold review + owner.
Author: Rubén Vega Balbás, PhD · closeout agent 8 November 2026
-->

# PHASE-M2 report

**Status:** DONE  
**Date:** 2026-11-08  
**Implementer:** Cursor agent (handoff 29 Oct 2026)  
**Owner flip:** 2026-11-08 after cold-review FAIL + F1–F5 triage (zod column, omit weight stubs, missing fixtures, works-count assert, Acceptance amend).  
**Cascade amended:** `INDEX.md`, `MONDRIAN-CASCADE.md` §2, `PHASE-M2.md`, `PHASE-M2-HANDOFF.md`, `PHASE-M3.md` → M2 DONE; M3 READY; M4/M5/M8 unblocked on schema.

---

## 1. What shipped

| Deliverable | Path |
| --- | --- |
| Work schema (Andrzejewski §3.2) | `packages/works/schema/work.schema.json` + `README.md` + `work.zod.mjs` |
| Surface / state / recipe schemas | `packages/matrix/schema/*.schema.json` |
| Reference work 1 | `packages/works/works/kunsthaus-1930-rbby/{work.yml,MEASUREMENT.md}` |
| Fixtures | `valid.yml` + structural + semantic (incl. overlap / OOB / missing-swatch) |
| JS matrix | `packages/matrix/src/*` + `styles/matrix.css` + vitest |
| Python | `packages/works/python` — pydantic `Work`, derive, vary, catalog |
| Catalog artefacts | build-time `services/web/public/patterns/` (gitignored; `.gitkeep` tracked) |
| Conformance | `scripts/conformance.sh` → `schema\|js\|zod\|py` + `plan=equal` |
| Astro collection | `services/web/src/content.config.ts` |

**MVP catalog variations:** `original`, `mirror-h`, `mirror-v`, `rotate-180`, `invert-contrast` (10 files). Weight remaps omitted until closed-form area rewrite exists.

---

## 2. Acceptance checklist

| Acceptance | Result | Evidence |
| --- | --- | --- |
| Conformance `valid.yml: schema=ok js=ok zod=ok py=ok plan=equal` | **PASS** | `./scripts/conformance.sh` exit 0 |
| Structural: Ajv+zod+py reject; JS semantic-only | **PASS** (amended) | structural fixtures; F3 triage |
| Semantic: JS+zod+py reject at shared paths | **PASS** | conformance output |
| `pnpm --filter @mondrian/matrix test` | **PASS** | 13 tests |
| State / recipe / liquid-fill / URL round-trip | **PASS** | matrix vitest |
| Mirror/rotate-180 + invert-contrast involution | **PASS** | JS + pytest |
| Line clamp / planes below lines / area sum | **PASS** | matrix + pytest |
| Mutation: remove schema `required: title` | **PASS** | exit 1; zod still rejects; restored |
| MEASUREMENT.md catalogue / px / crop / wall time | **PASS** | Kunsthaus; ~45 min; proposal |
| Astro build + works count = 1 | **PASS** | `assert-works-count.mjs` |
| Cold review filed; blockers closed | **PASS** | this report + COLD-REVIEW |
| Weight stub clones | **PASS** (omitted) | F2 triage |
| `getCollection` on a page | **DEFER M3** | F5; count assert on build |

---

## 3. Leftovers (do not block M2 DONE)

1. `kunsthaus-1930-rbby` remains `review.status: proposal` — second pass before About quotes geometry (F7).  
2. Page-level `getCollection('works')` assertion — M3 gallery/home.  
3. Weight remaps (`invert-rank` / `complement` / `reciprocal` / `equalize`) — reintroduce only with documented closed-form area rewrite.  
4. Optional named line-junction vitest cases (F9).  
5. Parallel Overy OCR/ingest — out of band; does not block M3.

---

## 4. Hard constraints (M2 scope)

| Constraint | Check |
| --- | --- |
| No dense matrix in `work.yml` | PASS |
| No `svelte` in `packages/matrix` | PASS |
| No invented proportions / fake weight variations | PASS (omitted) |
| Numbers from named measurement + uncertainty | PASS (`proposal`) |
| Implementer does not self-certify DONE | Held VERIFYING until owner flip — now **DONE** |

---

## 5. Resume

**M2 DONE → M3 next** (`PHASE-M3.md` READY).  
Parallel: M8 corpus lane may open; M4–M5 Python lane may open once seats pick them up. Do not expand M3 into editor island (M6).
