<!--
Neoplastix — SVG-only shell + optional plane clip (silhouette lab).
Author: Rubén Vega Balbás, PhD · 11 November 2026
Amends D-08 / D-22 dual CSS Grid + SVG render for product UI.
-->

# D-38 — SVG-only UI + optional plane clip

**Status:** adopted 11 November 2026 (owner amend; teaching eve).  
**Amends:** D-08 / D-22 (CSS Grid as gallery/About live renderer).  
**Does not amend:** D-05 core primitives (AABB points / rectangles / H|V lines);
D-12 corpus scope; Ser III No. 5 refuse (REFERENCE-WORKS § Limit cases).

## Decision

1. **Product UI draws SVG only.** Gallery, About miniatures, editor, export, and
   LAN preview (when SVG) use `renderSvg(plan)`. CSS Grid serialisation may
   remain in `packages/matrix` for pedagogy/tests but **must not** paint the
   public Neoplastix shell.
2. **Optional plane `clip`** on `geometry.rectangles[]` (schema extension):
   `clip.shape ∈ { rect, circle, triangle }`. Absent `clip` ≡ `rect` (AABB).
   Render as `<rect>` + `<clipPath>` (circle or polygon) in normalized space —
   same idea as “square with a hole in the alpha,” without inventing freeform
   Bézier silhouettes in MVP.
3. **Editor (M6)** exposes clip chips as a **silhouette lab** (Seat 6 U6-T7):
   visitor/demo may apply circle/triangle masks to AABB planes. Recipe may
   carry per-plane clip overrides as append-only keys later; until then clip
   lives on work JSON / local editor state, never as invented catalogue
   proportions.
4. **Hilma af Klint *Ser III No. 5*** stays a **limit-case refuse** for
   neoplastic `work.yml` / analyzer goldens / M8 slugs. Clip exists so the
   class can *see* why AABB colour patches are a Mondrian-ish lie about that
   silhouette — not to promote HaK480 into the corpus.

## Why

- One live graphic language (inline SVG) matches D-21/D-22 editor and removes
  a dual-path bug surface (Grid collapse, relative colour on `div`s).
- Circles/triangles are ordinary SVG; they are **not** silent fits into D-05
  without a named field. Naming `clip` keeps Andrzejewski §3.2 rectangles
  honest while allowing an explicit second lane.
- SVG master session pedagogy (who owns time / space / pixels) maps cleanly:
  matrix owns plan; SVG owns pixels; Svelte owns chrome state.

## Out of scope (still)

- Free polygon / path silhouettes as corpus sources.
- Encoding Ser III (or other wrong-armature works) as measured neoplastic YAML.
- Rive / Lottie / Three.js / Canvas 2.5D inside the editor painting.
- CSS Grid gallery miniatures.

## Acceptance

- `/gallery/` and `/gallery/<slug>/` paint via SVG; no `.study__grid` fr tracks
  in product HTML.
- Schema + zod + pydantic accept optional `clip`; kunsthaus fixture unchanged
  (implicit rect).
- `renderSvg` emits `<defs><clipPath>` when `clip.shape` ≠ `rect`.
- REFERENCE-WORKS limit-case row names the clip lab without lifting the refuse.
