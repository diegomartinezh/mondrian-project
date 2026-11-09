# PHASE-M2: The contracts — source geometry, derived render plan, surface and state

> **Track:** L0 contract, L1 first reference work, L2 geometry/state core. Freezes the spine every later phase depends on.
> **Status:** DONE — owner flip 8 Nov 2026 after cold review + F1–F5 triage. See [`PHASE-M2-REPORT.md`](PHASE-M2-REPORT.md) · [`PHASE-M2-COLD-REVIEW.md`](PHASE-M2-COLD-REVIEW.md).

## Goal

Write immutable `work.schema.json`, mirror it in zod and pydantic, and prove
the three agree. Its canonical geometry adapts the grid-point, rectangle and
explicit-line representation in Andrzejewski et al. (2010, §3.2), not the
paper's classifier or generator. Define separate `surface.schema.json` and
`composition-state.schema.json` from the MVP spec (including `variationId`).
Build identical JS/Python derivations from source primitives to **one** render
plan that serialises to **SVG and CSS Grid**. Emit the build-time pattern
catalog (original + named variations). Source measurement, derived
presentation and visitor customization must never share a model.

## Deliverables

- `packages/works/schema/work.schema.json` (JSON Schema 2020-12), with:
  required top-level `id`, `title`, `year` and `source` (catalogue/object
  record); `canvas { width, height, unit }`; `geometry.coordinateSpace:
  normalized-0-1`; ordered `points.x[]` and `points.y[]` (`{ id, position }`,
  mandatory 0/1 borders); `rectangles[]` (`{ id, x: [left,right], y:
  [top,bottom], role }`, references to point IDs); and `lines[]` (`{ id,
  orientation, center, extent: [start,end], thickness }`, where centre/extent
  reference points and thickness is normalized by the perpendicular canvas
  axis). A horizontal line uses a y-point centre and x-point extent; a vertical
  line uses an x-point centre and y-point extent. Lines are black and
  superimposed; white is the implicit background; black rectangles remain
  planes, never inferred as lines.
- The same schema carries a discriminated `provenance` union with common
  `reproduction { source, px_w, px_h, crop }` and `review { status:
  proposal|accepted, reviewed_by?, date? }`. `method: hand` requires
  `{ measured_by, date }`; `method: analyzer` requires `{ analyzer_version,
  run_at }`; `method: external` requires `{ dataset, citation, record_id,
  license, imported_by, date }`. Only `accepted` requires review identity/date;
  analyzer proposals validate before human acceptance. It also carries
  `rights { eu, us, checked_by, date }`, explicit uncertainty and
  `swatches.<role>.measured`. Red/yellow/blue/black/white follow the 2010
  representation; one gray plane is a declared project extension.
  Non-chromatic roles never rotate.
- `packages/works/schema/README.md`: source-versus-derived boundary, formulas,
  paper mapping and limits. For point position `p` measured on an axis of length
  `L`, `u = p/L`; for a line of pixel width `t`, `τ = t/L⊥`; derived track
  weight `dᵢ = bᵢ₊₁ − bᵢ`. Cite
  [`grounding/ANDRZEJEWSKI-2010.md`](grounding/ANDRZEJEWSKI-2010.md), retaining
  its separate full-node anchors for points, borders, line centre/extent,
  rectangles, thickness, overlap and roles. State that normalization and the
  source/derived boundary are project adaptations, and that material colour
  variation, brush texture, generation and authenticity are not represented.
- `packages/matrix/schema/{surface,composition-state,recipe}.schema.json`,
  matching `MVP-PRODUCT-SPEC.md` §3. A `Recipe` contains both surface and
  composition state, including `variationId` (default `original`). Frame/margins
  are normalized; physical dimensions, units and orientation remain explicit;
  enums cover presets/palette/reflections/variations; requested line-weight
  scale is clamped to the work-specific safe interval
  `[0.25, min(2, canvasLimit, neighbourLimit)]`. Fit mode is `liquid-fill`
  (D-30); fraction-rewriting `refit` is not implemented.
- `packages/works/fixtures/valid.yml` = the first measured reference work.
  `fixtures/broken/structural/*.yml` and `broken/semantic/*.yml` derive from it
  with exactly one corruption. Structural cases include missing fields, wrong
  types/enums, mismatched provenance payload, accepted record without reviewer,
  external record without licence, missing swatch and `h = 360`. Semantic cases
  include duplicate/non-increasing points, missing 0/1 borders, unknown point
  references, reversed/overlapping rectangles, reversed line extent,
  out-of-bounds or colliding line geometry, no chromatic plane, and no explicit
  line.
- `packages/works/works/<ref-1>/work.yml` + `MEASUREMENT.md` (what was measured, from which reproduction, how long it took, where the uncertainty is).
- `packages/matrix/src/`: `validate.js`; `derive-render-plan.js` (union of
  rectangle bounds, line extents and line edges `center ± thickness/2`, sorted
  into positive tracks; planes below explicit line items); `derive-visible-cells.js`
  (topmost visible role cells and area shares); `render-svg.js` (same plan → SVG
  element tree / string, no pointer handles); `render-grid.js` (same plan → CSS
  Grid model); `vary.js` (mirror H/V, rotate 180, invert-contrast involution —
  pure, must agree with Python); `surface.js`; `state.js`; `hue.js`; `index.js`.
  Derived values are never serialized into `work.yml`. No `svelte` import.
- `packages/matrix/styles/matrix.css`: role → colour via custom properties and relative colour syntax; non-colours as constants; `@property --theta`.
- Vitest: source validation, deterministic render-plan derivation, planes below
  lines, partial-line junctions, visible area shares sum to 1, hue wrap,
  malformed input, every preset frame bounded and URL state round-trip.
- Python:
  `packages/works/python/src/mondrian_work_schema/models.py` (installable
  pydantic mirror) plus `derive.py`, `vary.py`, `catalog.py`. `derive`
  produces the same canonical render-plan JSON as JS. `catalog` writes
  `services/web/public/patterns/<id>.json|.svg` and
  `<id>--<variation>.json|.svg` for original, mirrors, rotate-180, invert-rank,
  complement, reciprocal, equalize, invert-contrast. Weight-redistributing
  variations are Python-only artefacts; JS loads them, it does not re-solve.
  pytest over the same fixtures plus catalog invariants.
- Astro: `services/web/src/content.config.ts` zod schema + `works` collection loading `packages/works/works/*/work.yml`.
- `scripts/conformance.sh`: runs the canonical schema directly with Ajv 8
  (2020-12), then JS semantic validation, zod (`work.zod.mjs`) and pydantic over
  `fixtures/`; adapters normalize each validator's native location into one
  JSON-path convention. Structural cases: Ajv + zod + pydantic reject (JS is
  semantic-only and may accept). Semantic cases: Ajv may accept while JS, zod
  refinements (via `validateWork`) and pydantic reject at the same first path.
  The script then canonicalizes and diffs JS/Python render plans for every
  valid work. Catalog MVP variations omit weight remaps until closed-form.
- `PHASE-M2-COLD-REVIEW.md`, `PHASE-M2-REPORT.md`.

## Scope

**In:** the above; the hand measurement of reference work 1 (time-box: one afternoon; record the actual time).
**Out:** pages (M3), the Svelte editor island (M6), internal node dragging,
the analyzer (M4), the API (M5), runtime `POST /patterns/calculate`, the
other two reference works (M8 opens with them).

## Prompt (Implementation Agent)

```text
Implement PHASE-M2 per docs/DEV_PLAN/MONDRIAN/PHASE-M2.md.

## Deliver
1. `work.schema.json` first. Implement D-05's source primitives, not pitch §6's
   dense matrix. Structural validation belongs in JSON Schema, including
   `if/then` branches that require exactly the payload for each provenance
   method and accepted-review fields. Execute that schema directly with Ajv;
   do not treat a mirror as its validator. Document and implement identical
   JS/Python semantic checks: unique/ordered point IDs and positions; 0/1
   borders; known references; ordered rectangle and line extents; no interior
   overlap between coloured/black planes; line edges inside the canvas;
   positive thickness; non-overlapping parallel lines at source scale; swatch
   for each used chromatic role; at least one chromatic plane and explicit
   line. Return the same first error paths (for
   example `geometry.points.x[3].position`, `geometry.lines[1].extent`,
   `swatches.red`).
2. Fixtures: valid.yml is the measured reference work, not an invention. Each broken fixture derives from valid.yml
   with ONE change and a comment naming it.
3. Implement `deriveRenderPlan(work, lineWeightScale=1)` independently in JS
   and Python. `maxLineWeightScale(work)` is the minimum of 2, each line's
   perpendicular canvas-clearance bound `2 × min(c,1-c) / τ`, and each adjacent
   parallel-line non-collision bound `2 × |c₂-c₁| / (τ₁+τ₂)`; clamp requested
   scale to `[0.25,max]`. Never clip individual edges. Expand every line to
   `center ± scale×thickness/2`, union those edges with point positions and
   primitive extents, sort/deduplicate deterministically, compute positive
   deltas, and place rectangle planes below overlapping line items. Derive
   visible cells only for area statistics and tests. Canonical plan JSON uses
   stable key/order rules and numerical comparison tolerance `1e-9`.
4. Surface/state/recipe schemas next. Test A4 portrait and landscape, square,
   story and a custom surface.
   `defaultState(work, surface)` maximizes original ratio inside printable area;
   `clampFrame` keeps every edge inside; corner-resize is free-aspect and the
   pattern liquid-fills the frame (D-30). URL serialization is deterministic and
   round-trips the complete recipe, including surface dimensions, unit,
   orientation, margins and `variationId`.
5. packages/matrix as plain ESM, no dependencies (especially no svelte), JSDoc
   types. Keep every function under ~40 lines; a student reads these. Add
   `renderSvg(plan)` and `vary(work, id)` for the cheap variations; Python
   `catalog` emits all variation artefacts including weight operations.
   Each weight operation is a closed-form function of measured area shares,
   documented in the schema README; if it cannot be stated without an
   aesthetic guess, omit that variation from MVP (cascade: no invented
   proportions).
6. matrix.css: `.plane[data-role="red"]` uses relative HSL; `.line` has source
   role `black`, overlaps planes with a higher z-index and renders through the
   current `--black` palette token—not a literal colour. JS exposes the clamped
   `--line-weight-scale` for inspection/captioning, but derived tracks are the
   sole geometric effect; CSS must not multiply thickness a second time. Use
   `--swatch-*`, typed `--theta`, the exact HSL inversion from the product spec
   and reflection transforms. Non-colours are constants. No per-work CSS files.
7. Python work mirror + derive/vary/catalog + pytest; Astro zod source mirror;
   scripts/conformance.sh. It prints four validation columns
   (`schema|js|zod|py`) and exits 0 only when all agree, JS/Python canonical
   plans are semantically equal, SVG serialisations match, and catalog
   variation artefacts satisfy the area invariant.
8. Full suite: pnpm -r test && pnpm -r build && uv run pytest. Import every module you touched.
9. Hand off for cold review — do NOT mark DONE yourself.

## Constraints
- Schema changes after this phase go through amend-on-surprise; design it to be right once.
- No dense matrix in `work.yml`; no derived track/cell data persisted beside
  source primitives. No CSS borders for lines. No `hsl(θ 100% 50%)`.
- Do not commit unless asked.
```

## Acceptance

- `scripts/conformance.sh` exit 0; output shows
  `valid.yml: schema=ok js=ok zod=ok py=ok plan=equal`. Structural fixtures show
  Ajv+zod+pydantic rejections (JS may accept); semantic fixtures show Ajv
  structural-ok (or note) plus JS/zod/pydantic rejections at the same first
  path.
- `pnpm --filter @mondrian/matrix test` is green, including source immutability,
  deterministic tracks, line-over-plane stacking, visible-area sum-to-one, the
  wrap-around `mod` case and `?theta=banana → 0`.
- State tests prove A4 = 210×297 mm; every preset default frame is bounded;
  source work remains deep-equal after transformations; liquid-fill never
  mutates source fractions while absolute cells follow the frame; every state
  field including `variationId`
  survives serialize→parse; every custom surface field and orientation survives the
  recipe round-trip; malformed/out-of-range input falls back or clamps.
- Mirror/rotate-180 JS and Python agree within `1e-9`; each catalog variation
  satisfies Σ area = pattern bbox, no gaps/overlaps; invert-contrast does not
  move edges. Changing one Python variation makes catalog/conformance fail.
- Line tests cover a partial line, intersecting horizontal/vertical lines,
  canvas-edge termination and a black rectangle. Scaling changes explicit line
  thickness only; a black plane remains unchanged. Test scale `0.25`, `1`,
  requested `2`, the computed maximum and one over-maximum request; include a
  canvas-adjacent line and two near parallel lines. JS/Python clamp identically,
  no edge is clipped, all derived tracks stay positive and sum to 1. Applying
  palette inversion twice restores every source value for both lines and black
  planes.
- Mutation sample (recorded in REPORT): remove one canonical `required` field
  from Ajv schema → structural fixture may pass Ajv while zod still rejects and
  conformance exits non-zero. Unknown-point fixture is dual-gated with ordered
  extents; disable both to prove the semantic layer is load-bearing.
- Catalog emits original + four geometric/contrast variations only (no false
  weight-remap clones). `assert-works-count.mjs` proves one measured work;
  page-level `getCollection('works')` is M3.
- Canonical JS and Python render-plan JSON agree within `1e-9`; deliberately
  changing one Python line edge makes conformance fail at scales `1` and
  non-default safe maximum.
- `packages/works/works/<ref-1>/MEASUREMENT.md` names the catalogue, the reproduction's pixel size and crop, and the wall time.
- `astro check` and `astro build` pass with the collection loaded; `getCollection('works')` returns 1 entry.
- Cold review filed; blocking findings closed.

## Risks

- JSON Schema vs semantic split confuses the lanes → the schema README states
  source, semantic and derived responsibilities in a three-column table; the
  conformance script is the arbiter.
- “Based on the paper” drifts into “implements its ML” → the README cites §3.2
  only and explicitly excludes decision trees, MLE generation and authenticity.
- Measuring by hand takes longer than the time-box → ship with the uncertainty recorded in `MEASUREMENT.md`; partial precision is a fact, an invented bound is a failure.
- `@property` or relative colour syntax missing in a target browser → `hue.js` keeps a JS fallback that writes computed `fill`s when `CSS.supports('color', 'hsl(from red calc(h + 10deg) s l)')` is false; amend D-07 if the fallback becomes the main path.
