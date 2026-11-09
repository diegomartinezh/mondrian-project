# The Mondrian Project — pitch

**Status:** instructor draft, 22 October 2026, revised the same day after a check against the repository (FE I session table, institutional weights, Jekyll pin, portfolio brief, Strand B ethics package). Decision document. It is not a student brief and not a published track page.

> **Adopted 25 October 2026.** The project proceeds under the cascade pack in
> this folder—start at [`INDEX.md`](INDEX.md). The exact application is now
> [`MVP-PRODUCT-SPEC.md`](MVP-PRODUCT-SPEC.md): physical/digital surfaces,
> bounded inner frame, transformations, save/export and calibrated print.
> [`MONDRIAN-CASCADE.md`](MONDRIAN-CASCADE.md) §7 lists all points where this
> pitch is superseded. Everything not listed there stands.
>
> **Atmosphere (not the product):** recursive “Mondrian tree” pitch/course
> backgrounds from Q-FA1 live under [`assets/mondrian-tree/`](assets/mondrian-tree/)
> (and `web-foundations/docs/assets/images/mondrian-tree/`). They are early-tree
> prologue studies after Bountis et al. (2017)—not the neoplastic matrix (§5).
>
> **Naming (9 Nov 2026):** visitor marque is **Neoplastix** ([D-33](DECISIONS/D33-2026-11-09-NEOPLASTIX-MARQUE.md)).
> In this pitch, **Liquid** means the **Jekyll templating language** (§1, §9), not
> the retired “Liquid Mondrian” product name. Stack is Astro (cascade §7), not Jekyll.

**Course:** Front-End I, semester 1 integrator. Alternative to the portfolio-template assignment (session 13, three grade levels).

**Author:** Rubén Vega Balbás, PhD · `ruvebal@crea-comm.net`

**Sibling method:** Tao of Development, Strand B — project-based learning by doing, with disclosed agentic assistance and a defence of process. Documented in `~/src/ttod/docs/research/STRAND-B-PEDAGOGICAL-DESIGN.md`. The Mondrian project uses the same research terms the ethics committee gave that study (§3).

---

## 1. Elevator pitch

Students publish a small Jekyll site on GitHub Pages. The site has one header, one menu, one footer, and one HTML head, shared by every page through Liquid. The pages themselves are digital studies of neoplastic compositions: each work is a matrix of column boundaries, row boundaries, and cell roles, taken from the proportions of an original canvas. JavaScript paints that matrix into an SVG frame. The frame keeps the original aspect ratio and fits the viewport that remains after the header, the caption-and-control row, and the footer. A control adds a hue angle θ, from 0° to 360°, to every chromatic cell. HSL saturation and lightness stay put. The angular distance between two chromatic swatches, measured on the HSL hue wheel, stays constant as θ changes. Black, white, and gray stay black, white, and gray: they are the armature, and they do not travel around the wheel.

The public page is a geometric study after a named work. It carries the measurements, the source of those measurements, and a statement that the rotated colors are the study. It does not present itself as the painting.

---

## 2. What this replaces, and what it still has to prove

The current semester-1 integrator is the portfolio template: vanilla, then Bootstrap + GSAP, then Tailwind + Vite. Its learning target is a reusable personal site. Assessment sits inside the official 60% for trabajos, entregables y proyectos, together with the semester-2 React capstone.

The Mondrian project keeps that weight only if a student who finishes it can show the same durable core:

| Front-End I outcome | Session that teaches it | Where it lives in this project |
| --- | --- | --- |
| Semantic HTML, one `h1`, landmarks, skip link | S3 | `default.html` |
| CSS box model, grid, fluid page chrome | S3, S5 | header, menu, footer, stage |
| Responsive layout that has a rule | S5 | frame-fit, §8 |
| JavaScript: data in, DOM out, events | S7, S8 | matrix → SVG, hue slider |
| ES modules | S9 | `assets/js/render.js`, `assets/js/hue.js` |
| Git, GitHub, GitHub Pages | S1, S2 | the delivery itself |
| Accessible interaction | S6 | named slider, computed text alternative, focus |
| Docs-first AI use, then a defence | S13 brief, shared rubric | `plans/`, declaration, oral defence |
| Jekyll layouts, includes, front matter, `_data`, Liquid | **none** | the whole chrome (§9, §10) |

The last row is a gap, not a mapping. No session in S1–S13 teaches Jekyll or Liquid. The course site is built with them, but students have never authored a layout chain. Either the starter carries the chain and depth 1 is "read it, change it, explain it", or a taught slot is found (§15). The pitch does not assume one.

The portfolio ladder carried three framework stacks, and only one of them has its own semester-1 session. GSAP is S11. Bootstrap and Tailwind have lessons in the repository but no row in the S1–S13 table; Vite reaches students in semester 2 as the React build tool (S27). If Mondrian replaces the portfolio, semester 1 loses its only Bootstrap and Tailwind evidence. That is a decision (§15, risk 41), not a side effect. A student is not asked to rebuild Mondrian three times in three frameworks. One stack, three depths (§11).

---

## 3. Relation to the Tao of Development study

Strand B asks how participation in a real, agentic-assisted product, inside a cohort, can be a learning activity with observable outcomes. Evidence is process: plans, commits, reviews, declarations, and an oral defence. The product working is not, by itself, evidence that anyone learned. Code produced and learning demonstrated are allowed to diverge, and the defence is where that divergence becomes visible.

The Mondrian project is the semester-1 form of that idea, and it runs under the same ethics terms.

| | Tao of Development, Strand B | Mondrian project |
| --- | --- | --- |
| Course | Front-End II, 2026–27 | Front-End I, semester 1 |
| Product | Oracle platform (Astro, islands, review culture) | One Jekyll study-site per student |
| AI rule | Declared assistance, human review before merge | Two-phase plan, then implementation; defence of one number and of the hue formula |
| Ethics terms | The committee’s reply, below | The same reply, applied here |

### Ethics terms

On 22 October 2026 the instructor reported the ethics committee’s position on the Tao of Development research project. The committee does not need to issue a positive or negative report. The research goes ahead, and the committee is kept informed. Four conditions travel with that position:

1. The department has accepted the practice as a teaching activity.
2. The students have accepted.
3. Students are anonymized in the research.
4. Students are present as co-authors.

The Mondrian project uses those same four conditions. It does not wait for a dictamen. When the study is ready to be told, the committee is informed that this Front-End I project is underway on those terms. Strand A (the philosophical strand of Tao of Development) stays parked and is not evidence for this assignment.

**Same terms does not mean already met.** The acceptances on file were given by a different cohort, in a different course, for a different product: Front-End II students in the Oracle platform. They do not carry over to Front-End I students building Mondrian sites. Each condition has to be satisfied again here:

| Condition | What it takes for Mondrian |
| --- | --- |
| 1. Department acceptance | Confirm that the department's acceptance covers this integrator as a teaching activity, not only the Front-End II practice. It depends on the syllabus decision (§15). |
| 2. Student acceptance | A Front-End I information sheet and acceptance form, adapted from the Strand B package in `~/src/ttod/docs/research/ethics/` (participant information sheet and consent form, EN/ES). Refusing has no effect on the grade and is recorded only in the custody file. |
| 3. Anonymization | Pseudonyms (`P01…Pn`) in the corpus, as in Strand B. Research instruments limited to the ones already declared there: commit history, AI declaration, structured defence notes, and code excerpts only with dissemination consent. |
| 4. Co-authorship | Opt-in, named on the author line of the publication. |

Conditions 3 and 4 look contradictory and are not. A co-author's name appears on the byline. That name is never linked to a pseudonym, and no trace in the analysis is attributed to a named person. Two Strand B practices carry over with the terms. Analysis starts only after the relevant grades are closed, because the instructor is both grader and researcher. A quoted code excerpt can be found again by searching GitHub, because student repositories are public, so excerpts need dissemination consent.

The September 2026 map in `~/src/ttod/docs/research/INDEX.md` still says the committee review is in progress. That sentence is older than this report. This pitch follows the instructor’s account of the reply.

The research question for Mondrian, under those conditions:

> When the artefact is a measured mathematical study, and the tempting failure is an AI-drawn “Mondrian,” which process traces make a student’s authorship explainable?

Process traces enter the study anonymized. Students who have accepted appear as co-authors. Grades and names stay out of the corpus. A student who has not accepted is absent from the research, and their coursework still counts as the teaching activity.

---

## 4. The artefact

Each student ships a public GitHub Pages site containing:

1. A home page that states the project in their own words and links every study.
2. Three study pages. Each page renders one work from its matrix.
3. A shared chrome: skip link, header, menu of the studies, footer with credit and licence line.
4. A hue control on each study, 0–360, keyboard operable, value reflected in the URL (`?theta=40`) so a state can be opened again without a backend. The query is named `theta`, not `h`, because `h` is already the stored base hue of each swatch, and one name for two quantities invites writing θ into the data.
5. A short caption on the page: title, year, original canvas size, where the numbers were measured, a computed one-line summary of the partition (§10), and the sentence that θ changes hue and preserves angular distance. It stays short because it shares the first screen with the frame (§8).
6. `plans/plan1.md` (and further plans) written before the feature they describe.
7. An AI-use declaration that names what the assistant drafted and what the student measured, rejected, or rewrote.
8. A README with the live URL, the local command, and the declaration link.

The instructor starter provides the Jekyll shell and one example matrix whose numbers are already sourced. Students replace the example with assigned works. They do not invent proportions.

Excluding `plans/` keeps it off the Pages site. It does not make it private: the repository itself is public, so plans and the declaration are readable on GitHub under the student's account, as they already are in the portfolio. The brief should say so before the first plan is written.

---

## 5. Art-historical contract

The student-facing name for the works is **Neoplasticism** (De Stijl), the mature orthogonal compositions of Piet Mondrian. The word the studio used while designing this pitch — “constructivism” — is reserved for the mathematical construction below, and it is a poor art-historical label for these paintings. Russian Constructivism is a different programme. The risk list treats the naming collision as a teaching defect if it reaches students.

Mature neoplastic compositions in this assignment:

- use horizontal and vertical bands only
- separate chromatic planes (red, yellow, blue in the source) from non-colors (black, white, gray)
- balance by area and position, asymmetrically
- have no depicted space

**Perspective.** Mondrian’s neoplastic paintings are the work he did after leaving pictorial perspective. The project teaches proportion and aspect ratio. A change of screen must not introduce foreshortening: the same scale factor applies to width and height, and parallel bands stay parallel. Early perspectival pictures (the tree series and what precedes it) may appear as a single prologue sentence in the instructor’s introduction, as the kind of picture this matrix refuses. They are not student deliverables.

**Hue rotation is a study, and it breaks the doctrine.** In the paintings, red is red. Rotating the primaries around the wheel is the student’s instrument for seeing color *relationships* (the angular gaps), and it is a departure from the work. The page has to say so in one sentence the student writes. Theo van Doesburg’s argument with Mondrian over the diagonal (mid-1920s, after which Mondrian left De Stijl) is the historical warning against “improving” the grammar: this assignment rotates hue and does not rotate the grid. Diagonals are out of scope.

**Excluded from the three required studies:**

- **Late New York pictures** (*Broadway Boogie Woogie*, *Victory Boogie Woogie*) are mosaics of small units. A coarse partition cannot hold them.
- **Works with colored lines** (*New York City I* and its siblings, 1941–44) have no black armature. `validate` requires black cells, and §7's rule that the structure does not rotate has nothing to hold on to.
- **Lozenge (diamond) compositions**, from 1918 to *Victory Boogie Woogie*, hang the canvas at 45°. The grid inside is orthogonal, but the frame is not, and “the `viewBox` is the canvas” stops being true. Rendering one would need a rotated clip path, which is a transformation of the plane the project explicitly avoids (§6).
- **Works with several distinct grays** (common in the early 1920s) need either one gray approximation, stated in the caption, or a different work. Non-colors are renderer constants (§6).

**Sources.** The claims in this section are instructor knowledge and are not yet cited. Before any of them reaches a student brief, they need a catalogue or museum source resolved under `frontend-pedagogy/AI-EVIDENCE-HARNESS.md`, or a visible `[BIBLIO-GAP]` (§15).

---

## 6. The matrix

A work is a non-uniform partition of the original canvas. Black bands are rows or columns with their own width. There is no CSS border standing in for a line, because a border double-counts width and breaks the proportions.

```yaml
# Template — every number must be replaced from a named measurement.
# Units are the original canvas units (mm from a catalogue, or px on a
# reproduction whose pixel size is recorded). Bounds are absolute in that
# unit, from the top-left of the canvas.
id: study-id
title: ""
year: 0
canvas: { w: 0, h: 0, unit: mm }
source: ""          # catalogue or reproduction actually used
measured_by: ""     # student, and the date
x: [0]              # column boundaries, strictly increasing, first 0, last = canvas.w
y: [0]              # row boundaries, strictly increasing, first 0, last = canvas.h
# role has (y.length - 1) rows and (x.length - 1) columns
# allowed roles: white | black | gray | red | yellow | blue
role:
  - [white]
# hue, saturation, lightness at θ = 0, one entry per chromatic role used in
# `role`. Non-colors have no swatch: white, gray and black are constants in
# render.js, the same for every work, and never rotated.
swatch:
  red:    { h: 0,   s: 0, l: 0 }
  yellow: { h: 0,   s: 0, l: 0 }
  blue:   { h: 0,   s: 0, l: 0 }
```

Derived facts, computed in JavaScript, never typed by hand:

- cell `(i, j)` origin `(x[j], y[i])`, size `(x[j+1] − x[j]) × (y[i+1] − y[i])`
- area share = that product ÷ `(canvas.w × canvas.h)`
- area share per role = the sum of its cells' shares (this feeds the computed caption, §10)

A black “line” is not a separate type. It is a run of `black` cells along a thin row or column. A line that stops short of the edge is the same thin row with `white` (or a color) in the cells past its end. Nothing in the schema needs to know which bands are lines.

`validate(work)` runs before paint and refuses to draw a broken partition. It checks: bounds strictly increasing; endpoints equal the canvas; `role` has `y.length − 1` rows of `x.length − 1` entries each; roles inside the enum; a swatch for every chromatic role that appears, with `h` in `[0, 360)`, `s` and `l` in `[0, 100]`; at least one chromatic cell and one black cell. Swatches for roles that do not appear are ignored. Failure is a visible message on the page, not a silent blank SVG.

This is a matrix in the plain sense: a rectangular array `role[i][j]`, plus the two boundary vectors that give it physical size. It is not a linear-algebra transformation of the plane. The student brief should use those words so “matrix” does not drift into a matrix library.

Overlaps cannot be represented. That is intentional. Neoplastic planes tile the canvas.

---

## 7. Color on a 360° wheel

At rotation θ (degrees):

```text
h′ = (h + θ) mod 360
s′ = s
l′ = l
```

For any two chromatic swatches A and B:

```text
Δ(A, B) = (hB − hA) mod 360
```

Δ does not depend on θ. That identity is the learning claim. The defence asks a student to compute it for their own swatches at two different slider positions, one of them chosen so that exactly one swatch wraps past 360°. That is the case where naive subtraction of the displayed hues gives a negative or wrong answer and the `mod` earns its place.

`mod` here is the mathematical one, always in `[0, 360)`. JavaScript's `%` keeps the sign of the left operand, so the code form is `((h + θ) % 360 + 360) % 360`. With θ and `h` both validated as non-negative the outer correction is redundant, and it stays anyway. The same expression applied to `hB − hA` is the one that matters, because that difference is negative half the time.

Δ is directed: Δ(A, B) + Δ(B, A) = 360 unless the hues coincide. The shortest arc, `min(Δ, 360 − Δ)`, is invariant too. The brief uses the directed form because it is one line.

θ from the URL is untrusted input. `hue.js` parses it as a number, ignores it if it is not finite, rounds it to the slider step, and clamps it to `[0, 360]`. A malformed `?theta=` falls back to 0 without an error.

Non-colors are excluded from the formula. Rotating black into a hue dissolves the structure that makes the picture readable at every angle.

**What the invariant does not promise.** Δ is invariant in the HSL hue coordinate. It is not a perceptual invariant. HSL lightness is not perceived lightness: a yellow and a blue at the same `l` look very different in brightness. As θ carries the yellow swatch toward blue, the cell darkens to the eye although `l` never changed, and the visual balance of the picture shifts. The defence claim is about the coordinate. The caption must not say that the picture "looks the same at every angle." CSS `oklch()` keeps lightness closer to perception under the same `(h + θ) mod 360` rotation, but at some hues its chroma falls outside the display gamut and the browser silently maps it back. That is a color change the student did not write. Decision: HSL for the integrator, because every value is displayable and the formula is legible. OKLCH is a named depth-3 comparison for students who want it, not a requirement.

Default swatches are approximations stored per work, with saturation and lightness chosen so yellow stays light and blue stays deep. `hsl(θ 100% 50%)` is rejected: at 50% lightness, yellow becomes mud, and the relationship the student is meant to see disappears. The pitch does not invent catalogue swatches. The starter’s example must record that its `h, s, l` are measured from a named reproduction (or picked and labeled as a teaching approximation), and student works follow the same rule.

The control is a native range input, `min=0`, `max=360`, `step=1`, with a visible `<output>` for the value, `aria-valuetext` such as “40 degrees”, and an accessible name (“Hue rotation, degrees”). The user moves it. An automatic spin is opt-in, off by default, has a visible pause control (WCAG 2.2.2, because it is moving content that lasts more than five seconds), and stays off when `prefers-reduced-motion: reduce`. The URL query `theta` is read on load and written when the slider moves, using `history.replaceState`, so the page does not grow a trail of history entries.

WCAG contrast of rotated color against white, or of two rotated fields against each other, will fail for some θ. Chrome text never sits on a chromatic cell. The structure remains readable because the black bands do not rotate. The page note can state the contrast limit in one sentence; the assignment does not promise that every angle is a conformant color pair.

---

## 8. Responsive contract: the frame inside the viewport

The composition does not reflow. A narrow screen shows the same partition, smaller. Internal ratios are invariant. This is the sense in which the study “keeps the spirit” of the original: the relationship of areas survives the device.

A study page is a column of three rows: header, main, footer. Inside `main`, a `<figure>` is a column of two rows: the stage, then the caption and the control. The stage is whatever is left.

```css
/* Template — study pages only (default.html prints <body class="layout-{{ page.layout }}">).
   height, not min-height: with min-height the stage row is sized from its content,
   and a portrait SVG at 100% width makes the row taller than the screen. */
body.layout-study {
  margin: 0;
  height: 100vh;               /* fallback for browsers without dvh */
  height: 100dvh;
  display: grid;
  grid-template-rows: auto minmax(12rem, 1fr) auto;
}
body.layout-study main {
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr);
}
.study {                       /* the <figure> */
  margin: 0;
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
}
.stage {
  position: relative;
  min-height: 0;
}
/* Out of flow, so the SVG's aspect ratio can never push the row taller. */
.stage svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
```

The SVG `viewBox` is `0 0 canvas.w canvas.h` and `preserveAspectRatio="xMidYMid meet"`. The browser letterboxes or pillarboxes inside the stage. JavaScript does not listen to resize to perform the fit. JavaScript builds rectangles and applies hue.

Three details carry the contract. `height: 100dvh` gives the grid a definite height, so `1fr` means "what is left after the chrome". With `min-height`, it means "as tall as the content wants". The SVG is absolutely positioned inside the stage, so its intrinsic size takes no part in sizing the row. `minmax(12rem, 1fr)` is the floor: on a very short viewport (a phone in landscape), the chrome plus 12rem can exceed the screen, and then the page scrolls rather than shrinking the frame to nothing. Other page types (home) keep normal document flow.

The skip link must be absolutely positioned (the usual visually-hidden-until-focus pattern). A skip link left in normal flow as the first child of `body` becomes the first grid row, and the header, stage, and footer each shift down one track.

`100dvh` is the viewport unit that tracks mobile browser chrome better than `100vh`. It still needs a check on an actual phone. A frame sized to the full viewport hides its bottom band behind the footer or the browser bar.

Subpixel risk: many thin black bands at fractional device pixels collapse or double. Prefer boundary numbers that are integers in the viewBox unit. Accept that a band thinner than one device pixel may vanish, and record that limit next to `validate` if a work’s line weight is extreme.

Seam risk: two abutting rectangles of the same color, anti-aliased at a fractional pixel edge, show a faint light hairline between them. A black line made of three black cells shows two seams, and a white plane split by a band boundary shows a seam that reads as a line Mondrian never painted. `shape-rendering="crispEdges"` on the cell group snaps edges to device pixels and removes the seams, at the cost of moving an edge by up to one device pixel. That is the same order of error as the subpixel risk above, and it is the accepted one. A black background rectangle under the cells is the tempting alternative and is wrong: it turns every seam between white cells into a dark line.

Dark mode styles the chrome only. The study’s white cells stay the swatch white. Inverting the painting for `prefers-color-scheme` would rotate the non-colors, which §7 forbids.

---

## 9. Stack

Pinned as a decision on **22 October 2026**. Re-verify the resolved gem version with `bundle exec jekyll -v` before the term starts. The course site itself pins Jekyll `~> 3.9` with a hand-picked plugin list (`web-foundations/Gemfile`, checked). Student sites should build with the `github-pages` gem instead, so the local Jekyll and plugin set match GitHub Pages’ branch builder (a Jekyll 3.x release) rather than a newer Jekyll 4 that the branch builder will not run.

The `github-pages` gem also switches on the plugins Pages enables by default, among them `jekyll-optional-front-matter`, `jekyll-readme-index`, `jekyll-relative-links`, `jekyll-titles-from-headings`, and `jekyll-github-metadata`. Two consequences for this scaffold. Any Markdown file without front matter becomes a page, so `README.md` must be in `exclude` or it publishes as `/README.html`. And `jekyll-github-metadata` prints an authentication warning on local builds without a token, which is noise to explain once in the brief, not an error.

Ruby is the setup risk. Jekyll 3 on a current Ruby can need gems that newer Rubies no longer bundle. The starter is built once on the lab image and on a fresh student laptop before it is handed out, and the README records the Ruby version that worked.

| Decision | Choice | Why |
| --- | --- | --- |
| Host | GitHub Pages, branch build from the repository root | Same delivery as session 2. No server, no account beyond GitHub. |
| Generator | Jekyll via the `github-pages` gem | Shared header, menu, footer, and `<head>`. Liquid fills metadata per page. |
| Jekyll source | Repository root | A `/docs` source would collide with process notes if those notes lived in `docs/`. |
| Process notes | `plans/`, listed in `_config.yml` `exclude` | Jekyll publishes stray Markdown. Excluded plans stay in the repo for the defence and off the Pages site (the repo itself is still public, §4). The portfolio brief uses `docs/plan1.md`. Mondrian deliberately does not: if a student picks “/docs” in the Pages settings, `plans/` fails loudly with a 404, while an excluded `docs/` would silently become the published site. |
| Markup | One layout, HTML5 landmarks | Semester-1 durable core. |
| Painting surface | Inline SVG | `viewBox` is the original canvas. Aspect ratio is the file’s geometry. |
| Painting logic | Vanilla ES modules, no bundler | Modules are session 9. A bundler is the grade-3 portfolio stack, which this alternative does not require. |
| Data | `_data/works/*.yml`, emitted by Liquid as JSON in the study layout | One source of numbers. The renderer does not re-state them. |
| CSS | One hand-written stylesheet | Tailwind on the course site is the course site’s tooling. Here it would hide the grid and the stage. |
| JS framework | None | React is semester 2. |
| Bootstrap, GSAP | Not in this project | Taught elsewhere in the term if the syllabus still includes those sessions. Motion on the composition is the hue control only. |
| i18n | `lang` on `<html>` from front matter; one language required | A second language doubles an integrator that is already a measurement project. |
| Persistence | URL query only | No database, no accounts. |
| Tests | `validate(work)` plus a fixture of one valid and one broken partition, run in the browser console or a tiny Node-free assertion page that is published but not linked from the menu | Enough to prove the check can fail. A test runner is out of scope for this stack. |

Plugins: `jekyll-seo-tag` only if it does not fight the hand-written head. Prefer a hand-written `head.html` modeled on the course’s include, so students can read every meta tag they ship. If both are used, tags will duplicate. Decision: hand-written head, no SEO plugin.

Node is not required to build or to publish.

---

## 10. Scaffold

```text
mondrian-study/                  # one repo per student; starter is the shell + one example
├── _config.yml                  # title, url, baseurl, exclude: [plans, README.md, Gemfile, Gemfile.lock, vendor, node_modules]
├── Gemfile                      # gem "github-pages", group: :jekyll_plugins ; gem "webrick"
├── index.md                     # home: layout: default
├── _data/
│   ├── navigation.yml           # label + url for each study
│   └── works/
│       └── example.yml          # the sourced example matrix
├── _layouts/
│   ├── default.html             # html, head, header, main, footer
│   └── study.html               # extends the chrome; emits the work JSON; mounts the stage
├── _includes/
│   ├── head.html                # metadata from page + site
│   ├── header.html
│   ├── nav.html                 # loops navigation.yml
│   └── footer.html
├── studies/
│   └── example.md               # front matter: layout: study, work: example
├── assets/
│   ├── css/site.css
│   └── js/
│       ├── render.js            # validate, build SVG rects from the matrix
│       └── hue.js               # slider, formula, query string
├── plans/                       # excluded from Jekyll
│   ├── plan1.md
│   └── ai-usage.md
└── README.md
```

`baseurl` is `""` for a user site (`username.github.io`) and `"/repo-name"` for a project site. Every asset and internal link goes through `relative_url`. A root-absolute `/assets/...` path 404s on project Pages. This is the same defect class the course publishing rules already record.

### Layout chain

`default.html` is the document. `study.html` sets `layout: default` and fills `{{ content }}` with the stage, the control, and the note. Jekyll’s layout chain is the “component” model for this course level: includes for repeated fragments, layouts for the page type, front matter for the page’s identity.

### Head

`_includes/head.html` prints, from front matter and site config, and from nothing else:

- `charset`, `viewport`
- `<title>` as `page.title` · `site.title`
- `meta name="description"` from `page.description`
- `link rel="canonical"` from `page.url | absolute_url`, which needs `url` set in `_config.yml` (without it the canonical is a relative path, which is not a canonical)
- `og:title`, `og:description`, `og:type=article`, `og:url` (same `absolute_url`)
- no `og:image`, by design: there is no photograph to point at (§13)
- `html lang` lives on the root element in the layout, from `page.lang` or `site.lang`

Study front matter adds `work` (the data-file id), `title`, `description`, `lang`. The matrix stays in `_data`, so a content edit and a measurement edit are different files.

### Study page, data bridge

The study layout finds the work with `site.data.works[page.work]` and prints it as JSON inside `<script type="application/json" id="work-data">`. The module reads that element with `JSON.parse(el.textContent)`. Liquid’s `jsonify` is the bridge. Students do not copy numbers into JavaScript. `jsonify` does not escape `</`, so a free-text field containing `</script>` would end the block early. Titles and sources are the student's own text, so this is a known limit stated in the brief, not a sanitizer to build.

A Markdown page that *documents* Liquid must not be published with raw `{{` in it, or Jekyll will evaluate the braces. Process notes live in excluded `plans/`. The public note on a study page is prose.

### Renderer (contract, not the starter’s full source)

`render.js` exports `validate` and `render(svg, work, theta)`. `hue.js` owns the slider. `render` clears the SVG, appends one `<rect>` per cell in canvas units inside a `<g shape-rendering="crispEdges">` (§8), and sets `fill` from the role. Chromatic fills use the formula in §7. A slider move re-sets fills only. It does not rebuild the rectangles.

SVG elements are created with `document.createElementNS("http://www.w3.org/2000/svg", "rect")`. `document.createElement("rect")` creates an unknown HTML element that draws nothing and throws no error, which makes it the most likely silent blank frame in week one. No course lesson mentions `createElementNS`, so the brief has to name the namespace explicitly. Building the SVG as an `innerHTML` string works, but S8's position on strings and XSS applies, and the brief keeps the native path.

The SVG is `aria-hidden="true"` so a screen reader does not walk every rectangle. The `<figure>` takes its accessible name from the `<figcaption>`. The caption includes one sentence that `render` computes from the matrix, never typed by hand. For example: “5 columns, 4 rows; white 61%, black 14%, red 18%, blue 5%, yellow 2% of the area.” This is the text alternative, and it is the same derived area share the student defends (§6). It does not change with θ.

Menu entries come from `_data/navigation.yml`. The current study's link carries `aria-current="page"`. Adding a study is: a YAML file, a Markdown page, a nav row. The header, footer, and head do not change.

---

## 11. Three depths, one stack

Mapped to a term that already teaches HTML/CSS before JavaScript modules. Dates follow the session order, not a new calendar.

| Depth | Student adds | Done when |
| --- | --- | --- |
| 1. Chrome and one given matrix | Layout, includes, head, CSS stage, example study published to Pages | Live URL; one frame fitted to a phone-width window and a wide window; source visible in view-source |
| 2. Two further works | Measured YAML, validation visible on a deliberately broken copy, nav entries, measurement note | `validate` rejects the broken fixture; each live study names its measuring source |
| 3. Hue | Slider, formula, URL state, the Δ sentence in the student’s own words, AI declaration, defence | Moving θ leaves Δ unchanged on their swatches; non-colors unchanged; declaration matches the commits |

The integrator sits at S13, after modules (S9), so on the current calendar every depth has its prerequisites. If the project instead starts early as a running thread alongside S3–S8, depth 1 can render the example with a static SVG written by hand, before modules exist. Depth 3 replaces that hand SVG with the renderer. The hand SVG is deleted so two painters cannot drift apart.

The Jekyll layer is not in any session (§2). On the current calendar, depth 1 is where it is learned, which makes depth 1 heavier than it looks in this table.

---

## 12. AI rule

Same two-phase rule as the portfolio brief.

1. **Plan.** The assistant may propose a plan for a feature (the stage, the validator, the slider). The student saves it under `plans/` before implementation.
2. **Implement.** The assistant may draft Liquid, CSS, and JavaScript. The student runs the site and reads the diff.

Plans live in `plans/plan1.md`, `plan2.md`, … rather than the portfolio's `docs/plan1.md`. The reason is in §9, and the brief should say it, because students who read the portfolio brief will expect `docs/`.

The assistant does not choose proportions. A matrix value without a measurement note is an academic integrity failure, including a value that “looks Mondrian.” The defence asks the student to point at one boundary in the YAML and say where it was measured, and to compute Δ at two slider positions on the live site, one of them past the wrap (§7).

The defence is scored with the existing shared rubric, [AI Use Declaration & Oral Defence Rubric](../../../web-foundations/docs/evaluation/shared/ai-declaration-oral-defence-rubric/index.md) (`/evaluation/shared/ai-declaration-oral-defence-rubric/`, v2.0.3). Its FE I row already covers “any AI-assisted project”. Mondrian needs no new instrument, only the three prompts above as the defence questions.

The declaration distinguishes generated scaffolding from measured data. A site that renders a plausible grid and whose author cannot explain a single bound fails the integrator, however clean the CSS.

---

## 13. Rights and corpus

The corpus is three works, assigned so they are not the same three aspect ratios for the whole class: one square or near-square, one vertical, one horizontal. This pitch does not select the titles and does not invent canvas sizes. Selection waits on a checklist:

- dimensions copied from a named catalogue or from a reproduction whose pixel size and crop are recorded
- no museum photograph committed to the repository or hotlinked
- the public credit line reads as a geometric study after the work, with the measuring source
- a rights check, per work, before the starter is handed out. The EU term (70 years after death, so Mondrian's works have been in the EU public domain since 1 January 2015) is not a substitute for checking the specific edition, the photograph, and the institution’s policy
- a US check as well, because GitHub Pages is US-hosted and world-readable. US term runs from publication, not death, so a work first published from 1929 on may have a different status there. The Mondrian/Holtzman Trust has asserted rights in the past. To be confirmed per work, not assumed either way
- color swatches labeled as measured or as teaching approximations

The geometry is generated. That avoids shipping a photograph. It does not, by itself, settle the question: the measurements are facts, but a faithful rendering of a composition is a rendering of the composition, and hue-rotating it may read as a derivative rather than an analysis. Whether a public study needs a further institutional look is an open decision in §15.

---

## 14. Flaws and risks

Severity is for the instructor: **block** means do not hand the starter out until it is handled; **teach** means put it in the brief as part of the lesson; **watch** means likely in week 6, recoverable in critique.

### Art and truth

| # | Risk | Sev. | What to do |
| --- | --- | --- | --- |
| 1 | The word “constructivism” names the wrong movement if it reaches the student brief. | Teach | Say Neoplasticism / De Stijl. Keep “construction” for the matrix. |
| 2 | Hue rotation contradicts Mondrian’s fixed primaries. A page that says “this is the painting” is false. | Block | Credit line and the student’s own sentence are part of depth 3. |
| 3 | Treating HSL primaries as equally spaced 120° apart falsifies the pigments and falsifies Δ. | Block | Store measured or clearly approximate `h, s, l`. Rotate H only. |
| 4 | `hsl(h 100% 50%)` turns yellow into olive. The relationship becomes invisible. | Block | Preserve S and L. Reject the one-argument hue. |
| 5 | “Δ is invariant” heard as “the picture looks the same at every angle.” HSL lightness is not perceived lightness, so balance shifts as θ moves. | Teach | The claim is about the hue coordinate (§7). The caption must not promise visual sameness. OKLCH is an optional comparison. |
| 6 | Perspective as a Mondrian feature misstates the mature work. | Teach | The invariant is uniform scale. Perspective pictures are the prologue, not the deliverable. |
| 7 | *Boogie Woogie* canvases do not fit a coarse partition. Students will pick them because they are famous. | Teach | Exclude them in the brief. |
| 8 | Lozenge canvases, colored-line works, and works with several grays break the frame model, the black armature, or the fixed non-colors. | Teach | Excluded in §5. `validate` already rejects a work with no black cell. |
| 9 | Van Doesburg’s diagonal is the historical trap for “just one more transformation.” | Teach | Grid stays orthogonal. |
| 10 | A JPEG from search is cropped, color-managed, and sometimes mis-titled. Measuring it bakes the error into the matrix. | Block | Named source required, or the cell is not gradable. |
| 11 | The art-historical claims in §5 are uncited instructor knowledge. | Block | Before the student brief: a catalogue or museum source for each, or a visible `[BIBLIO-GAP]`. |

### Rights

| # | Risk | Sev. | What to do |
| --- | --- | --- | --- |
| 12 | Public Pages URLs are publication, not a closed classroom. Photograph rights and work rights are different questions. | Block | No images in the repo. Institutional check before the first public starter. |
| 13 | EU public domain taken as worldwide. Pages is US-hosted and US term runs from publication. | Block | Per-work US check (§13), recorded next to the EU one. |
| 14 | A generated study can still read as a fake Mondrian if the credit is missing or the title is casual. | Block | Prescribed credit sentence. |

### Mathematics and rendering

| # | Risk | Sev. | What to do |
| --- | --- | --- | --- |
| 15 | CSS borders or outlines used as black lines change the areas. | Teach | Black is a cell in the partition. |
| 16 | Percentage divs plus a gap produce a different picture from the matrix. | Teach | SVG in canvas units. |
| 17 | JavaScript resize math drifting from CSS `meet` produces a second, disagreeing fit. | Teach | Fit is CSS + `viewBox` only. |
| 18 | Thin bands collapse on phone DPR. | Watch | Integer viewBox units; show the failure in critique when it happens. |
| 19 | Hairline seams between abutting same-color cells draw lines that are not in the painting. | Teach | `shape-rendering="crispEdges"` on the cell group. No black underlay (§8). |
| 20 | Overlapping rectangles from an AI “scene graph” cannot be validated as a partition. | Teach | Schema is boundaries plus a role grid. `validate` rejects overlaps by construction. |
| 21 | Calling the role grid a linear transformation invites a matrix library and a false model. | Teach | Say array and boundary vectors. |
| 22 | `document.createElement("rect")` draws nothing and throws nothing. | Teach | `createElementNS` with the SVG namespace, named in the brief (§10). |
| 23 | JavaScript `%` returns negatives, so Δ comes out wrong whenever `hB < hA`. | Teach | `((x % 360) + 360) % 360`. The defence includes a wrap case (§7). |
| 24 | `?theta=` is user input: `NaN`, `-40`, `1e9`, or text. | Teach | Parse, require finite, round, clamp to `[0, 360]`, fall back to 0. |

### Responsive and accessibility

| # | Risk | Sev. | What to do |
| --- | --- | --- | --- |
| 25 | `min-height` lets a portrait SVG stretch the stage past the screen. `100vh` hides the lower band behind mobile browser chrome. Either way the student thinks the matrix is wrong. | Teach | `height: 100dvh`, the SVG out of flow, checked on a phone (§8). |
| 26 | A skip link in normal flow becomes the first grid row and shifts every row. | Teach | Absolutely positioned skip link. |
| 27 | Some θ fails contrast. Auto-fixing contrast would change L and break the formula. | Teach | Text stays in the chrome. Black bands stay black. State the limit. |
| 28 | A screen reader announcing fifty rectangles. | Teach | SVG hidden; the figcaption carries a computed partition summary (§10). |
| 29 | Auto-rotating hue as the default motion. | Teach | Slider is the contract. Autoplay off, a pause control when on, and off under reduced motion. |
| 30 | Dark mode inverting white cells. | Teach | Chrome may go dark. The study does not. |
| 31 | The slider without a name, or a div with a drag handler. | Block | Native range input. |

### Jekyll and Pages

| # | Risk | Sev. | What to do |
| --- | --- | --- | --- |
| 32 | Local Jekyll 4, Pages Jekyll 3.x: a tag works locally and vanishes in public. | Block | `github-pages` gem. Build with `bundle exec` before submitting the URL. |
| 33 | Jekyll 3 on a current Ruby fails to install or build on some laptops. | Block | Starter built on the lab image and a fresh laptop. README records the Ruby that worked. |
| 34 | `baseurl` forgotten. Assets 404 only in production. | Block | `relative_url` on every href and src. Submit the Pages URL, not `localhost`. |
| 35 | Liquid eats `{{ }}` inside a published Markdown explanation of the template. | Teach | Plans are excluded. Public copy is prose. |
| 36 | `README.md` published through Pages' default optional-front-matter plugin; `plans/` published; or Pages set to serve `/docs`. | Block | Root source, `README.md` and `plans` in `exclude`, Pages setting written in the README. |
| 37 | `jsonify` of a hand-edited YAML date or string surprises the renderer; a `</script>` in free text ends the data block. | Watch | `validate` checks shape after parse, not only the YAML indentation. The `</` limit is stated in the brief. |
| 38 | Two sources of truth: numbers in YAML and numbers copied into a hand-written SVG. | Teach | Depth 3 deletes the hand SVG. |

### Pedagogy, assessment, research

| # | Risk | Sev. | What to do |
| --- | --- | --- | --- |
| 39 | Jekyll, Liquid, layouts, and `_data` are taught in no FE I session. The integrator assumes them. | Block | Decide in §15: starter carries the chain and depth 1 is reading it, or a taught slot is found. |
| 40 | The portfolio’s “your voice, your future template” outcome disappears. | Teach | Voice moves to the measurement notes, the Δ sentence, and the defence. Say that openly so the rubric matches the work. |
| 41 | Bootstrap and Tailwind evidence disappears with the portfolio ladder. Neither has a semester-1 session; only GSAP (S11) does, and Vite comes in S27. | Block | Decide explicitly: add Bootstrap and Tailwind as session exercises, accept their removal from FE I, or keep the portfolio for students who need that ladder. Do not assume this pitch covers them. |
| 42 | An AI can emit a handsome fake in one prompt. The site looks finished and the matrix is fiction. | Block | Ungrounded numbers do not count. Defence of one bound is mandatory. |
| 43 | Measurement expands and eats the term. Students become cataloguers. | Teach | Three works. Instructor example is pre-measured. Depth 2 is transcription plus one work they measure themselves, not a research edition. |
| 44 | A shared class repo leaves one person owning `render.js`. | Teach | One repository per student. The starter is copied, not forked into a single org monorepo. |
| 45 | The Front-End II cohort's acceptances treated as covering Front-End I students. | Block | A Front-End I information sheet and acceptance, adapted from the Strand B package (§3). No research use before it. |
| 46 | Named students, grades, or process traces in the research write-up; a quoted excerpt that GitHub search traces back to a named repo; co-authors omitted; the committee never told that Mondrian is underway. | Block | Pseudonymized corpus, excerpts only with dissemination consent, opt-in co-authors on the byline and never linked to a pseudonym, analysis after grades close, committee informed. No dictamen required. |
| 47 | Students read “excluded from the site” as “private.” | Teach | The brief says the repository, its plans, and its declaration are public (§4). |
| 48 | Publishing this pitch on the course site as if the alternative were already the official integrator. | Block | This file stays under `frontend-pedagogy/` until the syllabus decision is made. |
| 49 | Oral defence scheduled on top of an already full session-13 slot. | Watch | Defence is short: one bound, one Δ with a wrap, one AI choice. It fits a critique, not a new exam, and uses the existing shared rubric. |
| 50 | Official evaluation weights are institutional. Renaming the semester-1 project in a track page does not change the guía. | Block | Internal alignment only, until the guía language is actually updated. The 60% still reads as the project slot. |

---

## 15. Open decisions

These are not resolved by the scaffold:

1. **Syllabus.** Alternative for everyone, alternative by request, or pilot with one group. Bootstrap and Tailwind either become session exercises, are accepted as dropped from FE I, or the portfolio remains the official integrator (risk 41).
2. **Jekyll slot.** Where students learn layouts, includes, front matter, `_data`, and Liquid: inside depth 1 from the starter, as an extension of S2 (which already publishes to Pages), or a new short session. Nothing in S1–S13 covers it today (risk 39).
3. **Corpus.** Three titles, their measuring sources, and who prepares the example YAML. Lozenge, colored-line, *Boogie Woogie*, and multi-gray works are already out (§5).
4. **Rights.** Institutional confirmation before any public starter URL, with the EU and US status recorded per work (§13).
5. **Art-historical sources.** §5's claims grounded or marked `[BIBLIO-GAP]` before the student brief exists.
6. **Research notice and acceptance.** The committee is informed that Mondrian is underway on the four terms in §3. The notice is a letting-know, not a request for a verdict. Wording and date of that notice are still to be sent. Separately, and before any research use: the department confirms that its acceptance covers this integrator, and the Front-End I information sheet and acceptance form are adapted from the Strand B package. The stale “review in progress” line in `~/src/ttod/docs/research/INDEX.md` is updated in that repository, not here.
7. **Language of the student brief.** This pitch is English. The brief, when authorised, should exist in Spanish and English, as the portfolio brief does.
8. **Starter timing.** The shell is small enough to publish once the example matrix is real. Publishing a shell with placeholder zeros invites students to treat zeros as data.

---

## 16. What a finished student site demonstrates

A reviewer, opening the Pages URL on a phone and on a laptop, should be able to see:

- the same partition, same aspect ratio, fitted to the stage, with chrome still reachable, and no page scroll on a laptop
- black bands that stay black while the slider moves, and no hairline seams that the painting does not have
- a URL that restores the angle, and a nonsense `?theta=` that falls back to 0 instead of breaking the page
- a caption that names the work, the canvas, the measuring source, the computed partition summary, and the Δ claim, without promising that the picture looks the same at every angle
- view-source that shows one layout, a JSON blob of the matrix, and module scripts
- with a screen reader, one figure with a caption, not a list of rectangles
- a repository where `plans/` precedes the feature commits, and the declaration matches the history

If those are visible, the technological decisions in this pitch are doing their job. If the grid looks right and none of the notes are true, the project has failed in the way Strand B is designed to catch: the artefact got ahead of the learning.
