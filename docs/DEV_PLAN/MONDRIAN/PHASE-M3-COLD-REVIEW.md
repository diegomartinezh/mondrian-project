<!--
Mondrian Project — PHASE-M3 cold review (scaffold close).
Reviewer did not implement student Wave A polish. DONE flip is owner/scaffold gate.
-->

# PHASE-M3 cold review

| Field | Value |
| --- | --- |
| **Reviewer** | Cascade scaffold close (9 Nov 2026) |
| **Pack root** | `docs/DEV_PLAN/MONDRIAN/` |
| **Inputs** | `PHASE-M3.md` Acceptance; PR #5 diff; `pnpm check`; Playwright smoke; hard constraints |
| **Verdict** | **PASS-WITH-DEFERRALS** (scaffold DONE; Wave A polish is student-owned) |

Implementer shipped the **public shell scaffold** and did not claim student seat polish as finished product copy.

---

## Summary

Routes `/gallery/`, `/gallery/<slug>/`, `/about/`, `/about-us/`, `/method/`, `/create/<slug>/` exist on `main` (PR #5). Studies render from the M2 CSS Grid plan; no Svelte island on these routes; GSAP loads only on `/about/`; create is an M6 placeholder. Dist link assert and Playwright smoke are green.

Acceptance items that are **pedagogy / seat ownership** (About prose depth, gallery pedagogy, axe/Lighthouse CI matrix, full viewport fit suite) are deferred to Wave A seats 3–5 / 7 — not blocking scaffold DONE.

---

## Findings

### F1 — Full Playwright fit / axe / Lighthouse matrix not yet CI-gated

| | |
| --- | --- |
| **Severity** | P2 |
| **Blocks scaffold DONE?** | **no** |
| **Blocks product DONE?** | yes for seats 3–4 before defence |
| **Evidence** | Smoke e2e only (3 tests). Acceptance wants fit at two viewports, axe, Lighthouse. |
| **Owner** | Seat 4 (+ CI with seat 2) — Wave A |

### F2 — About / method / about-us prose is instructor scaffold, not seat-final

| | |
| --- | --- |
| **Severity** | P2 |
| **Blocks scaffold DONE?** | **no** |
| **Evidence** | Scenes exist and are no-JS complete; cites use imprint + Andrzejewski (2010) author-date without vault IDs. Seat 3/4/5 own polish per TEAM-ASSIGNMENTS. |
| **Owner** | Seats 3–5 |

### F3 — Token barrel / visual QA not deepened

| | |
| --- | --- |
| **Severity** | P3 |
| **Blocks scaffold DONE?** | **no** |
| **Owner** | Seat 7 (U7-T1, U7-T6) |

### F4 — Geometry still `proposal` on reference work 1

| | |
| --- | --- |
| **Severity** | P3 |
| **Blocks scaffold DONE?** | **no** |
| **Evidence** | Do not quote millimetre-perfect numbers on About until `accepted`. |
| **Owner** | Instructor / M8 second pass |

---

## Hard constraints spot-check

| Constraint | Result |
| --- | --- |
| No Svelte on public shell | **PASS** (smoke + dist) |
| No FastAPI from Pages | **PASS** |
| No painting photos | **PASS** |
| Base-aware URLs | **PASS** (`assert-dist-links`) |
| GSAP only on `/about/` | **PASS** (module import scoped) |

---

**Scaffold DONE authorized.** Student Wave A remains open work, not a second implementer takeover.
