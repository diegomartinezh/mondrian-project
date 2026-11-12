# Mondrian Project

**Product:** [Neoplastix](docs/DEV_PLAN/MONDRIAN/DECISIONS/D33-2026-11-09-NEOPLASTIX-MARQUE.md) — cohort-built touch web app: measure neoplastic compositions after Mondrian, liquid-fill a frame, apply mathematical variations, and take a personal version away as URL, print, or file. Front-End I integrator for UDIT 2026–27.

**Live site:** https://neoplastix.crea-comm.net/  
**Repository:** https://github.com/ruvebal/mondrian-project

> La Plastique nouvelle met ses rapports en équilibre esthétique et exprime par là l'harmonie nouvelle.  
> — *Le Néoplasticisme*. Paris: Éditions de l'Effort Moderne (Léonce Rosenberg), 1920.

## How to start (stack fundamentals)

FE I students: run the site, then map Astro / Vite / Svelte / modules to **Web Atelier** sessions — see [`docs/guides/stack-fundamentals.md`](docs/guides/stack-fundamentals.md).

```bash
nvm use          # Node ≥24.22.1
pnpm install
pnpm develop     # Astro (Vite under the hood) → localhost
```

Short version: **Astro** owns pages; **Svelte** only on `/create/` + `/kiosk/`; **`packages/matrix`** is vanilla ESM; **Vite** is Astro’s bundler + Vitest, not a standalone SPA in this product.

## How to contribute

Read [CONTRIBUTING.md](CONTRIBUTING.md) and the in-app [/contribute/](https://neoplastix.crea-comm.net/contribute/) page. Seats and path ownership are listed there.

| Lane | Owns |
| --- | --- |
| Analyzer | Measurement pipeline, catalog CLI |
| Geometry contract | `work.schema.json` + matrix (dual review). Zod/pydantic **mirror** the schema — Python does **not** emit TypeScript types. See [`packages/works/schema/README.md`](packages/works/schema/README.md). |
| Shell | About, gallery, method, about-us |
| Editor | Svelte+SVG island, create/kiosk |
| Design | Tokens, export, print, PWA |

## Front End Cohorts

| Person | Role |
| --- | --- |
| [diegomartinezh](https://github.com/diegomartinezh) | API |

## Redeploy Pages

```bash
gh workflow run "Deploy Pages" --ref main
```

## Licences

- Code: [MIT](LICENSE-CODE)
- Content (measured works, prose): [CC BY-NC-SA 4.0](LICENSE-CONTENT)

## Declaration

Visitor / research / AI / data statement: `/declaration/` (placeholder until M9).

## Toolchain

Node **≥24.22.1** (`.nvmrc`). Python **3.12** via `uv`. pnpm via `packageManager`. See [AGENTS.md](AGENTS.md) and [`docs/guides/stack-fundamentals.md`](docs/guides/stack-fundamentals.md).
