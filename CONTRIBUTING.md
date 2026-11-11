# Contributing — Mondrian Project

**Product marque:** Neoplastix · **Programme / repo:** Mondrian Project · D-33 (cascade `DECISIONS/D33-2026-11-09-NEOPLASTIX-MARQUE.md`)

## How to start (stack + Web Atelier)

Before your first PR, read
[`docs/guides/stack-fundamentals.md`](docs/guides/stack-fundamentals.md): local
`pnpm develop`, what Astro / Vite / Svelte / matrix each own, and which
[Web Atelier](https://ruvebal.github.io/web-atelier-udit/) FE I / FE II lessons
teach them (S9 modules, S11 GSAP+SVG, S15 frameworks/Vite, FE II Astro units).

## Sync before you branch

1. `git fetch origin && git checkout main && git pull --ff-only`
2. Branch from **current** `main` only (never from a stale local topic branch).
3. Prefer small PRs; rebase onto `main` before asking for review.

## Branch naming

```text
lane/<handle>-issue-<n>-<slug>
```

Example: `lane/atiaas-issue-12-catalog-cli`

Instructor / agent scaffold branches use `cursor/<descriptive-slug>-29ae` (Cloud Agent convention).

A branch created before current `main` fails the sync preflight — rebase or recreate.

## Pull requests

- One concern per PR.
- Resolve your own conflicts; do not rename an open-PR branch.
- Same-branch amend loop after review.
- When ready again, comment exactly: `Ready for re-review`
- Cross-lane human approval required before merge.
- Branch behind `main` is hygiene, not a rejection reason — update and continue.

## Path owners (D-25)

| Surface | Owns | Notes |
| --- | --- | --- |
| **Analyzer** | `packages/analyzer/`, `packages/works/python/` | Seat 1 |
| **API** | `services/api/` | Seat 2 |
| **Geometry contract** | `packages/works/schema/`, `packages/matrix/` | Dual: Analyzer **and** Editor |
| **Shell** | About, gallery, method, about-us, declaration, contribute, `/es/` | Seats 3–5 |
| **Editor** | `packages/editor/`, `/create/`, `/kiosk/` | Seats 6–7 |
| **Design** | `packages/tokens/`, export/print/PWA | Seat 7 |

Svelte stays in `packages/editor`. Schema/matrix PRs need Analyzer and Editor human approval.

### Geometry contract (do not reverse)

`packages/works/schema/work.schema.json` is the single source. **Python does not
generate TypeScript interfaces.** Zod and pydantic are hand-written mirrors;
`scripts/conformance.sh` requires Ajv + JS semantic + zod + pydantic agreement
and identical JS/Python render plans. “Derived” = geometry plan from `work.yml`,
not codegen. Optional `rectangles[].clip.shape` (`rect`|`circle`|`triangle`) is
a silhouette lab mask (D-38), not freeform paths — details in
[`packages/works/schema/README.md`](packages/works/schema/README.md).

## Plan before code

Link your `docs/plans/<handle>/` note in the PR. Expect **one defended REJECT** per semester on an assisted suggestion. Coding assistants ≠ analyzer ML. Shared summative instrument: [AI declaration / oral defence rubric v2.0.3](https://ruvebal.github.io/web-atelier-udit/evaluation/shared/ai-declaration-oral-defence-rubric/).

## AI on PRs

Assisted work requires the AI Review Log in the PR template. Assistant-run checks are **not** human checks. AI never approves or merges.

## Review tooling

Instructors: `make review-queue` (read-only) and `make review-pr PR=<n>` — local Ollama comments only (`MUST FIX` / `NIT`). See `docs/guides/reviewing-cohort-prs.md`.
