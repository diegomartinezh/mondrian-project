# Work schema — source / semantic / derived

Geometry adapts **Andrzejewski et al. 2010 §3.2** only (grid points, rectangles,
explicit black lines). Not the paper’s classifier, MLE generator, or authenticity
claims. See [`../docs` path in product](../../../docs/DEV_PLAN/MONDRIAN/grounding/ANDRZEJEWSKI-2010.md).

## Three columns

| Layer | Lives in | Responsibility |
| --- | --- | --- |
| **Source** | `work.yml` | Measured primitives: points, rectangles, lines, swatches, provenance, rights |
| **Semantic** | JS `validateWork` + pydantic `Work` | Ordered points, 0/1 borders, refs, no plane overlap, ≥1 chromatic + ≥1 line |
| **Derived** | render plan JSON | Tracks `dᵢ = bᵢ₊₁ − bᵢ`, SVG/Grid items — **never** written back into `work.yml` |

## Formulas

| Symbol | Meaning |
| --- | --- |
| `u = p / L` | Point position normalized by axis length |
| `τ = t / L⊥` | Line thickness normalized by perpendicular canvas axis |
| `dᵢ = bᵢ₊₁ − bᵢ` | Track weight between consecutive boundary positions |

## Line weight scale

Requested scale is clamped to `[0.25, min(2, canvasLimit, neighbourLimit)]` where
canvasLimit = `2 × min(c,1−c) / τ` and neighbourLimit uses adjacent parallel
lines that overlap in extent. Edges are never clipped individually.

## Colour

Roles: red / yellow / blue / black / white (+ optional gray extension).
Non-chromatic roles never rotate with `--theta`. Lines are black overlays
(`z=1`), not inferred from black planes.

## Catalog variations (MVP)

Shipped: `original`, `mirror-h`, `mirror-v`, `rotate-180`, `invert-contrast`.

Omitted until a closed-form area rewrite is documented (no invented proportions):
`invert-rank`, `complement`, `reciprocal`, `equalize`.

## Out of scope

Material colour variation, brush texture, generation, authenticity scoring.
