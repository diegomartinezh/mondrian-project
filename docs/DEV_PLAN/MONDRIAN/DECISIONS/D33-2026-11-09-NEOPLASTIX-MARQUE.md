<!--
Mondrian Project — decision record.
-->

# D-33 — Neoplastix visitor marque (`neoplastix.io`)

**Status:** `adopted` · **Date:** 2026-11-09 · **Owner**  
**Amends / clarifies:** dual naming (Liquid Mondrian marque vs Mondrian Project programme); does **not** amend D-15 corpus nomenclature or D-01 repo slug this term.  
**Plan:** Project store `docs/neoplastix-rebrand-plan.md` (owner §9 locked 9 Nov 2026).

## Decision

| Layer | Name |
| --- | --- |
| Visitor product / marque | **Neoplastix** |
| Canonical domain (post cohort demo) | **neoplastix.io** |
| Programme / cascade / repo this AY | **Mondrian Project** · `ruvebal/mondrian-project` |
| Corpus (D-15) | **Mondrian / Neoplasticism** — unchanged |
| Feature (D-30) | **liquid-fill** — keep; not a marque |

Policy sentence:

> **Neoplastix** is the visitor-facing product and domain (`neoplastix.io`). **Mondrian Project** remains the FE I cohort programme, cascade pack, and GitHub repository identity for this academic year. Corpus nomenclature stays **Mondrian / Neoplasticism** (D-15). Studies are attributed “after Mondrian”; the product is not a Mondrian estate product.

## Owner locks (§9)

| ID | Lock |
| --- | --- |
| D1 | Keep programme name **Mondrian Project** |
| D2 | Keep repo slug **now**; revisit post-term |
| D3 | `@neoplastix` package scope **after Wave A** (P5) |
| D4 | Custom domain **after cohort demo** |
| D5 | `BASE=/` when neoplastix.io is live |
| D6 | Legacy github.io = **doc-only** (no redirect stub required) |
| D7 | **Hard-delete** user-visible “Liquid Mondrian” strings |
| D8 | CSS `--nx-*` + keep `--mp-*` aliases |
| D9 | CLI preferred name **hard-cut** to `neoplastix-analyzer` |
| D10 | Instructor wordmark v1; seat 7 QA |
| D11 | Athanor slug **`mondrian-project`** kept |
| D12 | Cascade folder `docs/DEV_PLAN/MONDRIAN/` **not** renamed this term |
| D13 | Announce via **class LMS** |

## Out of this decision

- DNS registration / Pages CNAME (human; after demo)
- npm `@mondrian` → `@neoplastix` (Wave A first)
- GitHub repo rename
- Athanor / Ahmes path or slug changes
- Rewriting graded student seat prose

## Fallback

If neoplastix.io is delayed, keep serving `https://ruvebal.github.io/mondrian-project/` with Neoplastix chrome and document the domain as forthcoming.
