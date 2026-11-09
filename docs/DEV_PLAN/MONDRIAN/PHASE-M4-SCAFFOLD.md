<!--
M4 open scaffold — not a DONE report. Seat 1 owns implementation.
-->

# PHASE-M4 scaffold (OPEN for seat 1)

**Status:** OPEN / READY for Analyzer lane  
**Opened:** 2026-11-09  
**Paste:** [`PHASE-M4.md`](PHASE-M4.md)  
**Seat:** 1 `ATIaas` (B1-T3…); dual-review schema with seat 2

## What the scaffold already provides

| Artefact | Notes |
| --- | --- |
| Package | `packages/analyzer` uv member |
| CLI contract | `mondrian-analyzer analyze|evaluate|version` (stub exits 2 with JSON) |
| Schema / derive | Frozen at M2 — consume, do not fork |
| Fixtures | `packages/works/fixtures/valid.yml` for synthetic round-trips |

## What seat 1 must ship (do not ask the instructor agent to finish)

1. Classical stages: rectify → lines → rectangles → swatches → emit  
2. `evaluate` against hand-measured YAML  
3. `evaluation/REPORT.md`  
4. pytest on synthetic rasters from valid primitives  
5. Optional: `docs/research/ANDRZEJEWSKI-SCHEMA-MAPPING.md`

## Issue seeds

See [`ISSUE-SEEDS.md`](ISSUE-SEEDS.md) § M4.
