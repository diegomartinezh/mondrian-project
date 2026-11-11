<!--
Ready-to-open GitHub issue titles for the cohort. Instructor pastes into Issues.
Do not auto-spam the tracker without human go-ahead on mass create.
-->

# Issue seeds (cohort)

Branch naming reminder: `lane/<handle>-issue-<n>-<slug>`

## Wave A — M3 shell polish (after scaffold DONE)

| Suggested title | Seat | Spec IDs |
| --- | --- | --- |
| `[shell] About scenes prose + parallax QA` | 3 | S3-T1, S3-T2, S3-T3, S3-T5 |
| `[shell] Gallery SVG pedagogy + method page depth (D-38)` | 4 | S4-T1, S4-T2, S4-T3 |
| `[shell] About-us credits + contribute sync` | 5 | S5-T1, S5-T4 |
| `[design] Token barrel consumption + visual QA checklist` | 7 | U7-T1, U7-T6 · D-34 |
| `[design] Type specimen / tokens preview page` | 7 | U7-T1 · [`TOKEN-SYSTEM.md`](../../style/TOKEN-SYSTEM.md) |
| `[brand] Neoplastix wordmark / --nx token QA` | 7 ∩ instructor | D-33 |
| `[ci] Playwright fit + axe on gallery/about` | 4 ∩ 2 | M3 Acceptance |

## D-36 — locators and edge (small, falsifiable; open after owner adopts D-36)

| Suggested title | Seat | Spec IDs |
| --- | --- | --- |
| `[ops] Flip deploy SITE/BASE to neoplastix.crea-comm.net` | instructor | D-36 H1 · D-33 D5 (**P0**, before any other row) |
| `[shell] One PUBLIC_CANONICAL_ORIGIN helper; drop hardcoded github.io` | 5 | D-36 H2 |
| `[shell] rel=canonical + robots.txt + sitemap; noindex assignments/tokens/probe` | 4 | D-36 H6 |
| `[ci] Build under dummy non-root BASE + LOCATORS registry smoke` | 2 | D-36 H11 · LOCATORS §How it is proven |
| `[editor] Recipe tolerance tests + golden recipe URLs` | 6 | D-36 H4 · PHASE-M6 Acceptance |
| `[design] Manifest id/scope + maskable icons` | 7 | D-36 H9 · PHASE-M7 |
| `[shell] Visitor nav ≤ 5; cohort pages to footer "Project"` | 3 ∩ 7 | D-36 H8 (scaffold close) |

## TTOD-AA — avoid repeats ([`TTOD-AA-LESSONS-2026-11-11.md`](TTOD-AA-LESSONS-2026-11-11.md))

Not a cascade phase. Open when ready; do not block class demos on these.

| Suggested title | When / owner | Spec |
| --- | --- | --- |
| `[ops] Pin Astro compressHTML + visible-text diff /, /gallery/, /method/` | Soon · instructor | TTOD-AA **P1** (Astro 7 default `'jsx'` can glue words) |
| `[ci] LOCATORS walk: //evil.example/x and /\\evil.example/x → 404` | LOCATORS / D-36 H11 · seat 2 ∩ instructor | TTOD-AA **P2** (edge honesty; probed live 11 Nov) |
| `[pwa] Offline pages anonymous + network-first (before any SW)` | **M7** · seat 7 | TTOD-AA **P3** (shared-lab cookie leak) |
| `[ci] Playwright browser install: timeout, apt retry, cache by version` | CI · instructor | TTOD-AA **P4** |
| `[shell] Disclosure nav (aria-expanded), not modal focus-trap` | Wave A / M6 a11y · seat 3 ∩ 5 | TTOD-AA §2 |
| `[shell] prefers-reduced-motion: put motion rules inside no-preference` | Wave A / M6 · seat 3 ∩ 7 | TTOD-AA §2 |
| `[shell] One html scroll-padding-top from header token` | Wave A / M6 · seat 4 ∩ 7 | TTOD-AA §2 · D-36 H10 |

Every Mn close also reuses TTOD-AA §3 method (exit gate first, falsify checks, look at screenshots, re-run prior gates unchanged) — see cascade §5.

## Wave C — Editor (after M3 DONE)

| Suggested title | Seat | Spec IDs |
| --- | --- | --- |
| `[editor] Plane clip chips circle/triangle silhouette lab` | 6 | U6-T7 · D-38 |

## M4 — Analyzer (parallel)

| Suggested title | Seat | Spec IDs |
| --- | --- | --- |
| `[analyzer] Classical pipeline: lines/rects/swatches → emit` | 1 | B1-T3 |
| `[analyzer] evaluate vs hand-measured + REPORT.md` | 1 | B1-T3 |
| `[analyzer] Synthetic raster pytest round-trip` | 1 | PHASE-M4 |
| `[contract] OpenAPI / dual-review on schema touch` | 2 | B2-T2 |

## M8 — Corpus (every seat)

| Suggested title | Seat | Spec IDs |
| --- | --- | --- |
| `[measure] <slug> — catalogue + reproduction + rights` | each | U-5 / M8 |
| `[corpus] Instructor reference 2 (vertical)` | instructor | D-12 |
| `[corpus] Instructor reference 3 (horizontal)` | instructor | D-12 |
| `[analyzer] Limit-case note — refuse af Klint Ser III No. 5 (wrong partition)` | 1 ∩ instructor | B1-T3 / M8 triage · [`corpus/REFERENCE-WORKS.md`](corpus/REFERENCE-WORKS.md) § Limit cases |

Full acceptance lines: [`TEAM-ASSIGNMENTS.md`](TEAM-ASSIGNMENTS.md) · handout [`STUDENT-ASSIGNMENT-LIST.md`](STUDENT-ASSIGNMENT-LIST.md).
