<!--
Mondrian Project — executable MVP product definition.
Author: Rubén Vega Balbás, PhD · amended 27 October 2026 (D-21…D-31)
This is an instructor/product-owner contract, not the student brief.
Wins over PITCH.md, MONDRIAN-RATIONALE.md, and phase files when they differ.
Canonical blend: DECISIONS/D21-D25-… · D-26…D-31 (print, URL, liquid-fill, format)
-->

# Neoplastix — MVP product specification

**Status:** adopted product definition. Amended 27 Oct 2026 for Astro +
Svelte island + SVG canvas, build-time Python catalog, Addendum B
(no internal node/edge dragging; no runtime FastAPI), **D-27** stickers /
URL recipe, **D-30** liquid-fill, **D-31** format aspect chips.

## 1. Product sentence

A touch-first web application lets a visitor pick a Mondrian **texture**,
choose a **format** (aspect ratio), produce mathematical and colorimetric
**variations**, and take away a **personal version** (URL, print, export)—
while the interface exposes the ratios that turn art into a pattern and the
pattern into a new study.

**The game:** texture → format → variations → your version.

The works may be called **textures** inside the interface, meaning
selectable mathematical compositions. They are Mondrian / Neoplasticism
studies, not Kandinsky works. Public copy uses “composition” or “texture
after Mondrian”; internal code uses `work`.

## 2. Primary journey

`choose texture → choose format → vary → personal version (URL / print / export)`

Paper/sticker **surface** is always present (kiosk default `sticker-50`) so
there is a physical printable area; it is not the headline of the game.

1. Choose a **texture** (catalog work). Frame defaults to **`fmt=original`**:
   maximised at the work’s native aspect inside the current paper’s
   printable area; pattern **liquid-fills** that frame (D-30).
2. Choose a **format** chip (D-31) — common aspects, one control:
   - `original` — native canvas ratio;
   - `1:1` — square;
   - `5:4` — classic / photo;
   - social big four: `4:5` (feed portrait), `16:9` (landscape), `9:16`
     (stories / reels), and `1:1` again as the square social default.
   Selecting a chip **maximises** the largest frame of that aspect that
   fits the printable area (limit on the constraining side; centre it).
   The grid liquid-fills the new rectangle — another Mondrian version.
3. Optionally change **surface** (print stock) — stickers `50×50`, `70×70`,
   `100×70` mm; cards A6/A5; sheets A4; optional digital screen-only
   presets. Changing surface keeps the current `fmt` and **re-maximises**
   the frame into the new printable area.
4. **Free-format corner drag stays MVP** (D-30): drag any corner to change
   aspect freely → `fmt=custom`; pattern liquid-fills. Format chips are a
   shortcut to common ratios; they do **not** replace corners. Internal
   dividers are not dragged (MVP).
5. Apply **variations** (mirrors, rotate 180°, invert rank / complement /
   reciprocal / equalize, invert contrast) and colour controls (hue,
   palette inversion, line-weight). These compose on the current fill.
   Reset → original texture + `fmt=original` + maximised native frame.
6. Compare with the original (press-and-hold).
7. **Personal version** (no server copy):
   - **Live URL** — every decision (texture, format, surface, variation,
     hue, corners) rewrites the query immediately (D-27).
   - **localStorage** draft; download SVG / HTML / CSV; PNG secondary.
   - **Print** (kiosk giveaway) at the selected `@page` size.

The application never overwrites the measured source data. A visitor's
state is a separate `CompositionState`. **No button on this journey calls
a backend.** Presets load `/patterns/*.json`. Resize and cheap variations
run in the Svelte island. Weight-redistributing variations load a
build-time artefact.

## 3. Coordinate model

Three nested rectangles prevent “size” from becoming ambiguous:

```text
viewport                browser / kiosk screen (any size)
└── paper silhouette    fixed aspect of the chosen preset (scaled to fit)
    └── printableArea   silhouette minus margins
        └── frame       corner-resizable; free aspect (D-30)
            └── pattern liquid-fill: fractions → full frame
```

Ideal: kiosk panel aspect ≈ sticker/paper aspect. Otherwise the paper
silhouette is letterboxed in the viewport; the Mondrian never escapes the
paper. Pattern-in-frame letterboxing is **not** MVP (D-30).

- `SurfaceSpec`: `{ preset, width, height, unit, orientation, margins }`.
- `CompositionState`: `{ workId, formatId, variationId,
  frame: { x, y, width, height }, theta, paletteMode, reflectX, reflectY,
  lineWeightScale }`.
  `formatId` is `original` \| `1-1` \| `5-4` \| `4-5` \| `16-9` \| `9-16` \|
  `custom` (D-31). `variationId` defaults to `original`. Reflections that
  are also available as named variations must round-trip to the same geometry.
- `Recipe`: `{ surface, compositionState }`. The **URL query string**,
  local draft, and export metadata always serialize this complete recipe.
  The URL does **not** contain SVG markup or the full work JSON (D-27 §4).
- Bounds and margins are normalized to `[0,1]` in URLs and saved recipes.
  Physical millimetres live in `SurfaceSpec` and drive `@page` at print.
- Format chips and texture load call `maximizeFrame(aspect, printableArea)`
  (D-31): largest fitting rectangle; centre; then liquid-fill.
- Corner-dragging changes **frame** geometry (including aspect) and sets
  `formatId=custom`. It never mutates `work.yml` and never moves internal
  edges. Absolute cell shapes change because fractions are reapplied (the joke).
- **Fit mode (MVP):** `liquid-fill` (D-30) — pattern fills the frame;
  relative `fr` rhythm preserved. `preserve-ratio` letterbox is not MVP.
  `refit` (solver that rewrites fractions) remains Phase 2.

## 4. Rendering and interaction contract

### 4.1 Two serialisations, one plan

`deriveRenderPlan(work, lineWeightScale)` (JS and Python, identical JSON)
feeds:

| Surface | Implementation | Interactive? |
| --- | --- | --- |
| Live editor | Svelte island draws **inline SVG** from the plan | Frame corner handles only |
| Gallery / About | CSS Grid from the same tracks / plane / line items | No |
| Export | SVG document + optional HTML/CSV | No |
| LAN preview (M5) | FastAPI HTML/CSS Grid and/or SVG, same semantics | No |

JavaScript / Svelte only:

- validates catalog JSON and holds `Recipe` state;
- draws SVG from the plan;
- handles Pointer Events on **frame corner handles**;
- writes CSS custom properties (`--theta`, `--line-weight-scale`,
  `--swatch-*`);
- serializes URLs, local drafts, and exports;
- calls `window.print()`.

CSS still owns colour (`hsl(from … calc(h + var(--theta)) s l)` on
chromatic roles; explicit HSL involution for `paletteMode=inverted`;
never `filter: invert()`). Container queries adapt **controls** to the
editor chrome, not the painting. `@page` and print media produce the
physical output.

### 4.2 SVG responsibility (MVP)

```text
Python / matrix JSON
      ↓
Svelte state
      ↓
Inline SVG canvas
      ↓
Frame corner-resize / preset variation
      ↓
Updated SVG
      ↓
Export
```

- `<rect>` elements represent Mondrian areas (planes).
- Explicit lines overlay planes (Andrzejewski distinction preserved).
- Divider lines are **not draggable**.
- Junction circles, if present, are **not draggable**.
- Only the outer frame’s corner handles are interactive.
- Predefined transformations update SVG geometry or styling.

### 4.3 Predefined variations

Every variation preserves:

```text
Σ area(rectangles) = area(pattern bbox)
```

and ensures: no gaps, no overlaps, all rectangles inside the pattern
bbox, minimum-area constraints respected, outer print canvas unchanged.

| Variation | Effect | Computation |
| --- | --- | --- |
| **Original** | Restore the measured work | catalog |
| **Mirror horizontal** | Reflect across vertical axis | JS + Python |
| **Mirror vertical** | Reflect across horizontal axis | JS + Python |
| **Rotate 180°** | Both mirrors | JS + Python |
| **Invert visual rank** | Reverse ordering of visual weights | build-time Python artefact |
| **Complement weights** | Dominant areas become subordinate | build-time Python artefact |
| **Reciprocal weights** | Strongly emphasise formerly light areas | build-time Python artefact |
| **Equalize** | Move weights toward equal distribution | build-time Python artefact |
| **Invert contrast** | Geometry unchanged; colour/value emphasis flips | JS + Python (same involution as palette inversion when that is the chosen reading; otherwise a named styling preset) |
| **Another catalog work** | Alternative measured composition | catalog |

### 4.4 Critical design rule

Ask this for every control:

> Does this need Python’s mathematical authority, or can the browser
> apply an already-computed model?

If Python already computed it at build, **do not call FastAPI**.

## 5. Screens / sitemap

```text
/                    Landing: **Know more** → /about/; **Open the app** →
                     texture picker → /create/<work>/
/create/<work>/      Editor game: texture · format chips · variations →
                     personal version; paper surface; corners; live URL;
                     Print / Export / QR; kiosk; compare/undo/reset
/gallery/            Measured source compositions (CSS Grid miniatures); open one
/about/              Scroll story (+ GSAP parallax): painting → measurement →
                     ratios → CSS/SVG → colour → variation → print
/about-us/           Professor's proposition, cohort roles and credits, research
                     framing, institutional communication, AI disclosure
/method/             Analyzer, schema, catalog build, uncertainty, sources, rights
/contribute/         Cohort workflow, lanes, CODEOWNERS paths
/declaration/        Public/research/AI/data statement
/kiosk/              Attract loop → start → editor island; idle reset
/calibrate-print/    50 mm sticker + 100 mm sheet; hidden from normal nav
/es/…                Spanish prose mirror; editor state shared
```

The old `/studies/` route becomes `/gallery/`; `/play/` becomes `/create/`.

## 6. About: the story to scroll

**Epigraph (flag quote — French primary, imprint 1920):**

> La Plastique nouvelle met ses rapports en équilibre esthétique et exprime par là l'harmonie nouvelle.
>
> — *Le Néoplasticisme*. Paris: Éditions de l'Effort Moderne (Léonce Rosenberg), 1920.

Anchor: [`grounding/FLAG-QUOTE-1920.md`](grounding/FLAG-QUOTE-1920.md).

The story has seven short scenes, each useful without animation:

1. **A painting is measured** — original canvas, points, rectangles and lines.
2. **Geometry becomes ratios** — coordinates and perpendicular line thickness
   become normalized values; derived boundary deltas become CSS tracks and
   SVG coordinates.
3. **Ratios become CSS and SVG** — the same plan draws a Grid miniature and
   an SVG study.
4. **A frame changes** — corner-resize free aspect; the grid liquid-fills
   the new rectangle (same rhythm, new Mondrian). Container queries reveal
   chrome around the paper, not letterbox bands inside the frame.
5. **Colour becomes an angle** — HSL wheel, θ, directed Δ, and its perceptual limit.
6. **A pattern becomes yours** — variation presets, hue, line weight.
7. **The screen returns to paper** — SVG, millimetres, calibration, print.

**Motion decision (D-29):** no Framer Motion / `motion`. `/about/` uses
**GSAP + ScrollTrigger** for scrubbed **parallax** (background / art / copy
layers with different `data-speed`). Dynamic-import GSAP only on this route.
With `prefers-reduced-motion: reduce`, kill all ScrollTriggers — scenes stay
visible and static. With JavaScript disabled, all seven scenes remain complete
in the HTML. Optional CSS `animation-timeline: view()` may fade non-parallax
chrome only. The Svelte island is not loaded on `/about/`.

## 7. Kiosk and handheld

Kiosk is the primary exhibition mode; handheld is the take-home continuation.
They share routes, the editor island, and URL state.

- Kiosk: **`sticker-50` (50×50 mm)** is the initial surface; one-touch
  operation; targets ≥44 px; no required keyboard, mouse, browser back,
  hover, or text entry; 60-second idle reset; wake lock; offline cache of
  the **catalog + island**; **Print** = giveaway; QR continues on a phone.
- Handheld: same editor; controls in a bottom sheet; paper silhouette fitted
  to the container; accessible presets as a non-drag alternative.
- OS-level lockdown is a runbook, separate from PWA fullscreen.

## 8. Save, URL permanence, and print

### 8.1 Permanent form = live URL `Recipe` (not SVG, not work JSON)

Without a server, the **query string is the durable form state** — the same
fields a multi-step form would POST, flattened into `?key=value`.

**Live, not deferred:** hue, invert, mathematical variations, corner resize,
preset change — each updates the canvas **and** the query params in the same
interaction. The visitor can glance at the address bar at any moment and see
their current decisions; Copy link / QR / Print read that bar. Leaving the
booth, they keep that URL (bookmark, QR, share). Reloading elsewhere rebuilds
the sticker: parse recipe → load catalog `/patterns/<workId>.json` →
re-derive SVG → paint inside the paper silhouette. The URL never stores
pixels or markup; it stores **choices** (D-27 §4.0).

One-line example (~140 characters of query; full URL usually ~210 chars):

```text
/create/comp-b/?surface=sticker-50&orient=square&mt=2&mr=2&mb=2&ml=2&fmt=16-9&var=mirror-h&fx=0.05&fy=0.18&fw=0.90&fh=0.506&theta=12&pal=direct&lw=1
```

| In the URL? | Payload | Typical size |
| --- | --- | --- |
| **Yes** | Flat Recipe form fields (above) | **~0.14 KB** query |
| **Yes (Phase 2)** | Generate seeds as flat params | ~0.1–0.2 KB |
| Optional | One compressed Recipe blob (`r=`) | ~0.3–0.6 KB encoded |
| **No** | Full work / generative JSON | ~2–15 KB raw → **3–20+ KB** encoded |
| **No** | SVG markup in `?svg=` | ~5–80+ KB → **fails QR** (~2.9 KB max) |
| **No** | Standalone HTML | ~10–100+ KB — **download / Print only** |

Practical limits: shareable URL &lt; ~2 KB; QR max ~2.9 KB for the *entire*
payload; our MVP full URL ≪ 0.5 KB. Detail + worked sizes: D-27 §4.

### 8.2 Files and print

- Also local: `localStorage` draft; SVG; **standalone HTML**; CSV; PNG.
- **Standalone HTML** embeds the SVG for offline opening without the app.
- **QR / Copy link** = live Recipe query on the **canonical public origin**
  (`PUBLIC_CANONICAL_ORIGIN`, GitHub Pages) — not `localhost` / LAN, even if
  the kiosk is offline (D-27 §4.4). Kiosk needs an online deploy for portable
  URLs; Print + HTML download cover air-gapped takeaway.
- **Print** button: same-origin document, `@page { size: <preset>; }`,
  physical units, chrome hidden, `window.print()`. Warn “Actual size /
  100%”. Never claim mm accuracy without `/calibrate-print/`.
- Artefacts embed credit, variation id, recipe, app version, “study after”
  metadata; visible print credit on by default.

## 9. MVP acceptance

The MVP is complete when a first-time kiosk visitor can, without instructions:

1. see the paper stage (kiosk default `sticker-50`);
2. select a **texture** and see a maximised native-aspect frame liquid-filled;
3. select a **format** chip (`1:1`, `5:4`, `4:5`, `16:9`, `9:16`, …) and see
   the **largest** frame of that aspect fitting the printable area, still
   liquid-filled;
4. free-format corner-drag (aspect unlocked → `custom`) with the same liquid fill;
5. apply predefined variations: original, mirror H/V, rotate 180°, invert
   rank, complement, reciprocal, equalize, invert contrast;
6. see each variation as a valid, fully filled SVG partition;
7. rotate hue and change line weight;
8. undo one action and reset to original texture + `fmt=original`;
9. reload / share the **URL recipe** (includes `fmt`) and recover the same
   form without any SVG in the address bar;
10. download a valid SVG, standalone HTML (SVG embedded), and CSV;
11. use **Print** to output at the selected sticker/sheet size;
12. complete the workflow **offline after first load** and **without any
    runtime backend**;
13. scan a QR (**recipe URL**) and recover the same state on a phone.

Automated gates cover state round-trips, bounds, liquid-fill (D-30),
maximise-in-printableArea per format chip (D-31), variation invariants,
accessibility, export validity, print stylesheet, offline reload, and
reduced motion. One real-printer and one real-touch-device run are mandatory.

## 10. Explicitly not MVP

- Dragging internal dividers, junction nodes, or internal edges.
- Interactive split/merge of areas.
- Edge-midpoint handles on the containing frame; `refit` solver (fraction rewrite).
  Corner free-aspect + `liquid-fill` **are** MVP (D-30).
- Custom / recursive pattern generation; FastAPI `POST /patterns/calculate`.
- **Make your own Mondrian** — FastAPI `POST /patterns/generate` (complexity,
  density, colorimetry, seed). Last Phase-2 feature (D-26); not MVP.
- Runtime FastAPI as a dependency of the public site or kiosk.
- Accounts, cloud saves, a public gallery of visitor creations.
- Live camera analysis at the kiosk.
- QR payloads that embed full HTML+SVG (rejected for capacity/reliability).
- A neural “quality” or authenticity score.
- React, WebGL, canvas rendering, XYFlow, Interact.js as the editor.
- Arbitrary free rotation or diagonal grid lines.
- Python calculation endpoints **inside** the Astro application.
