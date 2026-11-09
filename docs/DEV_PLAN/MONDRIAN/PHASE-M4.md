# PHASE-M4: Analyzer — image to source primitives, with provenance and evaluation

> **Track:** L4 (Python). Parallel lane with M3/M6 once M2 is DONE. Owned by the Analyzer & API lane.
> **Status:** READY — M2 DONE (8 Nov 2026); parallel Python lane may open

## Goal

Build `mondrian-analyzer`: a Typer CLI that emits a schema-valid `work.yml`.
The classical pipeline—rectification, normalized grid points, coloured
rectangles, explicit line centres/extents/thicknesses and swatches—is the MVP.
Its output follows D-05's adaptation of Andrzejewski et al. (2010, §3.2). It
must distinguish superimposed lines from black planes because the editor scales
line thickness only. Catalog variation emission (`vary`/`catalog`) is M2, not
this phase. TensorFlow is a non-blocking research extension only after
enough labelled primitives exist.

## Deliverables

- `packages/analyzer/src/mondrian_analyzer/{rectify,lines,rectangles,swatch,emit,cli}.py`,
  typed, logged (structured JSON logs), no global state; domain functions pure
  (NumPy in/out), I/O at the edges.
- CLI: `mondrian-analyzer analyze <image> --id <slug> --title "<title>"
  --year <year> --canvas 80x60 --unit cm --source "<catalogue/object record>"
  --reproduction "<source>" --out work.yml [--roles classical|learned]`;
  `mondrian-analyzer evaluate <work.yml> --against <hand-measured.yml>` printing
  per-primitive error in canvas units and as percentage of the relevant side.
- `evaluation/REPORT.md`: method, references, per-point position,
  rectangle-edge/role and line centre/extent/thickness errors, failures and
  runtime.
- Optional `research/train_roles.py` only if M0 ratifies a labelled split.
  Model files are ignored. It never blocks MVP and never scores authenticity.
- `docs/research/ANDRZEJEWSKI-SCHEMA-MAPPING.md`: field-by-field mapping to the
  2010 representation, project adaptations (normalized coordinates,
  provenance, uncertainty, gray extension), omissions (texture/materiality,
  classifier/generator), and whether the paper's works can legally be imported
  as `method: external` entries.
- pytest: unit tests per stage on synthetic rasters rendered **from** the valid
  primitive fixture (primitives → derived plan → PNG → analyze → compare);
  positions/edges recover within 1 px and roles exactly; property test that
  `emit()` always validates and JS/Python derivations agree.
- `PHASE-M4-COLD-REVIEW.md`, `PHASE-M4-REPORT.md` (PARTIAL allowed if the learned component is not yet evaluated).

## Scope

**In:** the above; OpenCV, NumPy, scikit-image, PyYAML, Typer and the shared
Pydantic schema package from M2. TensorFlow belongs only to a separately
ratified `learned` optional dependency group.
**Out:** the API (M5); any cloud service; any claim about a painting's "true" colours — swatches from a reproduction are labelled `measured: true` with the reproduction named, which is what they are.

## Prompt (Implementation Agent)

```text
Implement PHASE-M4 per docs/DEV_PLAN/MONDRIAN/PHASE-M4.md.

## Deliver
1. Pure stages. `rectify(img, corners?)` → canvas-aligned raster;
   `lines(raster)` → orientation, centre, start/end and thickness in pixels
   using darkness projections with Hough as cross-check;
   `rectangles(raster, lines)` → coloured/black plane bounds and roles using Lab
   clustering with white/gray thresholds; `swatch(raster, rectangles)` → median
   HSL per chromatic role; `emit(...)` → D-05 primitives normalized to `[0,1]`
   and validated by M2 pydantic. Never emit derived tracks or visible cells.
2. Round-trip test first: derive and rasterize the valid primitive fixture at
   2000 px wide, analyze it, and assert point/rectangle/line edges within 1 px
   and roles exact. This test must fail with any stage stubbed.
3. Evaluate on the three hand-measured references (reproductions named in corpus/REFERENCE-WORKS.md; images are
   fetched locally by the operator and never committed). Write evaluation/REPORT.md with real numbers.
4. Emit explicit line primitives. Normalize horizontal thickness by canvas
   height and vertical thickness by canvas width; normalize centres and extents
   by their corresponding axes. Classify black planes as rectangles rather than
   guessing every dark region is a line. Evaluate line detection, centre,
   extent and thickness separately from rectangle extraction.
5. Optional learned roles only when a held-out split exists; report against the
   same classical baseline. Missing TensorFlow is not PARTIAL for MVP.
6. Structured logging (json lines) with stage, duration_ms, counts. No print.
7. Full suite: uv run pytest (whole workspace), mypy strict on the package; also pnpm -r test (nothing should
   break, prove it).
8. Hand off for cold review — do NOT mark DONE yourself.

## Constraints
- Output is a proposal: analyzer provenance includes version/run time and
  `review.status: proposal`; reviewer identity/date are absent until a student
  accepts it. The CLI refuses to write into `packages/works/works/` directly
  (writes to `--out` only).
- No images under version control; fixtures are generated at test time.
- Local inference only; no cloud SDK imports (CI greps for them).
```

## Acceptance

- `uv run pytest packages/analyzer` green; the round-trip test recovers every
  source point, rectangle edge and line edge within 1 px at 2000 px.
- `uv run mondrian-analyzer analyze <ref-1 image> --id … --title … --year …
  --canvas … --source … --reproduction … --out /tmp/ref1.yml` exits 0 and
  `/tmp/ref1.yml` passes `scripts/conformance.sh` (copied into a temporary
  fixtures directory).
- `evaluation/REPORT.md` reports median point/rectangle-edge error ≤ 1% of the
  canvas side on the three references, or states the actual larger number with
  failure analysis (a true number above threshold is PARTIAL, not a lie).
- Classical rectangle-role confusion and line centre/extent/thickness error
  tables are in the report.
  If a learned extension exists, its same-split comparison is appended.
- `grep -rE "import (openai|anthropic|langchain_openai)" packages services` returns nothing (CI step).
- Cold review filed; blocking findings closed.

## Risks

- Reproductions are colour-managed and cropped (pitch risk 10) → rectification needs the canvas corners; the CLI accepts `--corners` and the report records which images needed it.
- TensorFlow is unavailable or unjustified by corpus size → omit it and record
  `not run: insufficient labelled data` (MVP remains complete).
- The lane is tempted to “improve” points toward nice ratios → forbidden; the
  evaluation measures against hand data, not aesthetics.
