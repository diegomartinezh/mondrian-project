<!--
Mondrian Project — decision record.
Owner request 10 Nov 2026 ("landing page layout is a mess … flagship presentation … minimal square
partition that will substitute the current favicon"). Implemented with the studio skill
`neoplasticizer` (~/src/.cursor/skills/neoplasticizer). Author: Rubén Vega Balbás, PhD (agent-assisted).
-->

# D-37 — Neoplastic landing: squared-square field, minimal-partition mark

**Status:** `proposed` · **Date:** 2026-11-10 · owner review on the PR  
**Amends:** D-35 (canonical mark geometry; landing hero). Keeps D-35's favicon *pipeline*
(`pnpm favicon:build`, rects-only source) and D-34 (tokens, radius 0). Does **not** touch D-07
(painting fills come from work JSON) or any measured study.  
**Runtime:** `packages/neoplastic` = vendored copy of the skill's `lib/` (see `SOURCE.txt` for hashes).

## Decision

| Item | Lock |
| --- | --- |
| Hero field | **Duijvestijn's order-21 squared square** (1978; side 112; 21 unequal squares; the unique lowest-order simple perfect squared square). Bouwkamp code frozen in code and re-derived by tests |
| Fractal rule | Any **white** plane may be re-tiled by the whole, under a D4 orientation; colour planes stay whole. New planes arrive by **orthogonal wipe**; lines thicken into place. Never an alpha blend between colours |
| Colour | `équilibre()`: one red, one blue, one yellow, one small black, picked deterministically for asymmetric balance (studio formula). Roles map to `--nx-role-*` |
| Mark / favicon | **Minimal Mondrian partition**: the Mondrian Art Problem optimum for n = 3 (defect 2, unique up to symmetry): rectangles 2×2 red, 1×3 blue, 2×1 yellow. Replaces D-35's mark in `favicon.svg` ≡ `brand/mark.svg` |
| Layout | The landing grid is itself neoplastic: columns `50fr 35fr 27fr` (Duijvestijn's first row), armature = black gaps, cells = planes. Studio-professor welcome card with signature |
| Versions | Six lab landings at `/lab/landing/v1…v6/` (noindex), registry in `src/data/landing-variants.ts`; canonical `/` = v3 *Relief* |

## Grounding boundary (read before quoting)

The grounding rule of this programme holds: **do not invent proportions from quotes; numbers stay
measured** ([`grounding/GRAPHRAG-PHASE-QUERIES.md`](../grounding/GRAPHRAG-PHASE-QUERIES.md)). The squared
square and the Mondrian Art Problem are **mathematics**, presented as a homage to the 1920 text's
*rapports en équilibre* (ratios held in balance) and to its refusal of repetition. They are **not**
claims about Mondrian's own proportions. Public copy says so ("Mathematics, not a claim about
Mondrian's own proportions"). The golden-section reading of Mondrian is not used anywhere.

| Claim on the page | Evidence |
| --- | --- |
| 21 unequal squares tile a 112 square | `packages/neoplastic/tests/grounding.test.js` (exact cover on the lattice) |
| Lowest order, unique | Duijvestijn, *J. Comb. Theory B* 25 (1978) 240–243; MathWorld "Perfect Square Dissection" |
| Moroń 9 squares in 33 × 32 (v6) | Moroń 1925; decoded and verified by the same test |
| Mondrian Art defects 2, 4, 4, 5 (n = 3…6) | Exhaustive search in code = OEIS A276523; n = 7, 8 (5, 6) computed, labelled "computed" |
| Favicon is the n = 3 optimum | test: unique solution, areas {2, 3, 4}, shapes non-congruent |

## Accessibility and motion

Canvas fields are decorative (`aria-hidden`); an SVG twin paints first and stays under
`prefers-reduced-motion` or script failure. Camera: dead zone 0.24, low-pass 0.08, critically damped
spring, scale clamp 0.94–1.06 (canvas-25d invariants). Animated lab versions with autoplay (v4, v6)
carry Pause controls (WCAG 2.2.2). Text contrast on planes: paper/red 4.83:1, paper/blue 5.86:1,
ink/yellow 12.5:1; ink on red (3.47:1) is not used.

## Consequences

- `landing-hero.js` / `landing-hero.css` (D-35 landing) are no longer imported; remove in a follow-up PR
  once the owner accepts D-37. `@mondrian/mark-canvas` stays (rects-only mark still parses).
- New routes registered in [`../LOCATORS.md`](../LOCATORS.md) (noindex).
- Students: the lab is a teaching surface (same idea, six techniques). Seat 7 may extend palettes; Seat 3
  may link About scenes to v4 (Mondrian Art Problem) as a maths aside.

## Reverses if

- The owner prefers the D-35 mark: revert `favicon.svg` and rerun `pnpm favicon:build`; the field and
  lab stay independent of the mark.
- A measured-study page needs the hero space: the field becomes a lab-only surface.
