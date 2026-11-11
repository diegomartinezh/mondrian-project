# Stack fundamentals — how to start (Neoplastix / Mondrian)

FE I integrator for UDIT 2026–27. Lessons live on **Web Atelier**
([course site](https://ruvebal.github.io/web-atelier-udit/)); this repo is the
product, not a second syllabus.

**Tracks:** [FE I 26–27](https://ruvebal.github.io/web-atelier-udit/tracks/en/udit/2627-fei/) ·
[FE II 26–27](https://ruvebal.github.io/web-atelier-udit/tracks/en/udit/2627-feii/)
(ES mirrors under `/tracks/es/udit/…`).

## 1. Run the site locally

```bash
# Node ≥24.22.1 (.nvmrc) — refuse unpatched 22.22.x / 24.22.0
nvm use   # or fnm use
pnpm install
pnpm develop          # Astro dev server → services/web
# optional Python lane
uv sync && uv run pytest
pnpm check            # lint + test + build (before claiming done)
```

Open the printed `localhost` URL. Shell pages (`/`, `/gallery/`, `/method/`,
`/about/`) are **Astro `.astro`** with **no** Svelte island. Editor routes
(`/create/`, `/kiosk/`, `/probe/svelte/`) hydrate the **Svelte 5** island.

## 2. What each layer owns (read this once)

| Layer | In this repo | Mental model |
| --- | --- | --- |
| **Astro 7** | `services/web` | Static multi-page host + content. Ships HTML to GitHub Pages. |
| **Vite** | *under* Astro (and **Vitest**) | Bundler / HMR / test runner. **Not** a product SPA (D-06: no Bootstrap / Tailwind / standalone Vite app). |
| **Svelte 5** | `packages/editor` only | Client island on create/kiosk. Owns chrome state; SVG owns pixels (D-21, D-38). |
| **Vanilla ESM** | `packages/matrix` | Schema → render plan → SVG. **No** `svelte` import. |
| **JSON Schema** | `packages/works/schema/work.schema.json` | Single contract. Zod + pydantic **mirror** it — Python does **not** emit TypeScript types. |
| **Python 3.12** | `packages/works/python` | Build-time catalog + derive/vary. Never called from public Pages at runtime. |

Official docs (when Web Atelier is not enough): [Astro](https://docs.astro.build) ·
[Svelte 5](https://svelte.dev/docs) · [Vite](https://vite.dev/guide/) ·
[Vitest](https://vitest.dev/).

## 3. Web Atelier map (teach / self-study order)

Use the session that already exists; do not invent a parallel Mondrian course.

### FE I semester 1 — prerequisites already on the calendar

| Topic in Neoplastix | Web Atelier lesson | Session |
| --- | --- | --- |
| Tooling, Git, Pages | [Development environment](https://ruvebal.github.io/web-atelier-udit/lessons/en/development-environment/) · [First steps / Git](https://ruvebal.github.io/web-atelier-udit/lessons/en/first-steps/) | S1–S2 |
| ES modules (`packages/matrix`) | [JavaScript modules](https://ruvebal.github.io/web-atelier-udit/lessons/en/js-modules/) | S9 |
| Lint / format | [Linting and formatting](https://ruvebal.github.io/web-atelier-udit/lessons/en/linting-and-formatting/) | S10 |
| `/about/` motion + SVG craft | [GSAP overview](https://ruvebal.github.io/web-atelier-udit/lessons/en/gsap/overview/) · [SVG master session](https://ruvebal.github.io/web-atelier-udit/lessons/en/web-animations/svg-master-session/) | S11 |
| Integrator context (Mondrian vs portfolio) | [Portfolio template brief](https://ruvebal.github.io/web-atelier-udit/lessons/en/portfolio-template-brief/challenge/) | S13 |

Vite as a **student-chosen** stack appears in the portfolio **grade-3**
(Tailwind+Vite) ladder —
[portfolio SPA architecture](https://ruvebal.github.io/web-atelier-udit/lessons/en/tailwind/portfolio-template/) —
not as Neoplastix’s app entry. Here Vite only shows up *inside* Astro.

### FE I semester 2 — frameworks, Vite, Vitest (when you need the words)

| Topic in Neoplastix | Web Atelier lesson | Session |
| --- | --- | --- |
| Why an island, not a SPA; Vite setup vocabulary | [Framework fundamentals & comparison](https://ruvebal.github.io/web-atelier-udit/lessons/en/react/frameworks-comparative/) | S15 |
| Unit tests (`vitest` in `services/web`) | [Testing: Vitest, RTL, Cypress](https://ruvebal.github.io/web-atelier-udit/lessons/en/react/react-testing/) | S25 |
| Production build / CI mental model | [Deployment](https://ruvebal.github.io/web-atelier-udit/lessons/en/react/react-deployment/) | S27 |

**Svelte is not an FE I S1–S13 row.** Editor-lane students learn the island from
this starter (`packages/editor`, `/probe/svelte/`) plus the comparative matrix
in S15. React lessons are **not** Neoplastix code — React stays forbidden in
product (D-21).

### FE II / Astro sequence — islands for real (annual track or advance reading)

| Topic in Neoplastix | Web Atelier lesson |
| --- | --- |
| Astro host, islands, content-first | [Astro teaching sequence](https://ruvebal.github.io/web-atelier-udit/lessons/en/astro/) |
| Islands + SSR/SSG vocabulary | [FE II Unit 2 — Astro fundamentals](https://ruvebal.github.io/web-atelier-udit/lessons/en/feii/unit-2-astro-fundamentals/) |
| Content collections, multi-framework islands | [FE II Unit 3 — Astro advanced](https://ruvebal.github.io/web-atelier-udit/lessons/en/feii/unit-3-astro-advanced/) |

Neoplastix MVP is **static** Astro (SSG → Pages). Do not assume a Node adapter
or runtime SSR in class demos.

## 4. First walk in *this* repo (30 minutes)

1. `pnpm develop` → open `/` and `/gallery/` — Astro + SVG from `renderSvg`.
2. Open `/method/` — schema story; contract lives in `work.schema.json`.
3. Open `/probe/svelte/` or `/create/<slug>/` — where Svelte is allowed to hydrate.
4. Read `packages/matrix/src/derive-render-plan.js` — vanilla modules (S9).
5. Skim [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for lane ownership; open an
   issue only in your path.

## 5. Hard product rules (do not “learn past” them)

- Public Pages / kiosk **never** call FastAPI.
- No SVG or full work JSON in URL query params.
- No inventing proportions; measured works stay in `work.yml`.
- Optional `clip.shape` ∈ {`rect`,`circle`,`triangle`} is an editor silhouette
  lab (D-38), not a freeform corpus schema.

Deeper ADRs: [`docs/DEV_PLAN/MONDRIAN/DECISIONS/D21-D25-…`](../DEV_PLAN/MONDRIAN/DECISIONS/D21-D25-2026-10-27-ASTRO-SVELTE-SVG-MVP.md),
[`D38`](../DEV_PLAN/MONDRIAN/DECISIONS/D38-2026-11-11-SVG-ONLY-PLANE-CLIP.md).
Agent pin: [`AGENTS.md`](../../AGENTS.md).
