<!--
Mondrian Project — decision record.
-->

# D-33 — Neoplastix visitor marque (`neoplastix.crea-comm.net`)

**Status:** `adopted` · **Date:** 2026-11-09 · **Owner**  
**Amends / clarifies:** dual naming (Liquid Mondrian marque vs Mondrian Project programme); does **not** amend D-15 corpus nomenclature or D-01 repo slug this term.  
**Amended:** 9 Nov 2026 — canonical domain → `neoplastix.crea-comm.net` (vanity `.io` / `.art` deferred).  
**Plan:** Project store `docs/neoplastix-rebrand-plan.md` (owner §9 locked 9 Nov 2026; D4 amended).

## Decision

| Layer | Name |
| --- | --- |
| Visitor product / marque | **Neoplastix** |
| Canonical domain (medium-term) | **https://neoplastix.crea-comm.net** |
| Programme / cascade / repo this AY | **Mondrian Project** · `ruvebal/mondrian-project` |
| Corpus (D-15) | **Mondrian / Neoplasticism** — unchanged |
| Feature (D-30) | **liquid-fill** — keep; not a marque |

Policy sentence:

> **Neoplastix** is the visitor-facing product and domain (`https://neoplastix.crea-comm.net`). **Mondrian Project** remains the FE I cohort programme, cascade pack, and GitHub repository identity for this academic year. Corpus nomenclature stays **Mondrian / Neoplasticism** (D-15). Studies are attributed “after Mondrian”; the product is not a Mondrian estate product.

## Owner locks (§9)

| ID | Lock |
| --- | --- |
| D1 | Keep programme name **Mondrian Project** |
| D2 | Keep repo slug **now**; revisit post-term |
| D3 | `@neoplastix` package scope **after Wave A** (P5) |
| D4 | Canonical domain = **neoplastix.crea-comm.net** (medium-term). Vanity TLDs `neoplastix.io` / `.art` = deferred optional, not canonical. **Live** on custom domain after 10 Nov 2026 cutover (github.io = D6 legacy). |
| D5 | `BASE=/` when neoplastix.crea-comm.net is live (apex path on subdomain) |
| D6 | Legacy github.io = **doc-only** (no redirect stub required) |
| D7 | **Hard-delete** user-visible “Liquid Mondrian” strings |
| D8 | CSS `--nx-*` + keep `--mp-*` aliases |
| D9 | CLI preferred name **hard-cut** to `neoplastix-analyzer` |
| D10 | Instructor wordmark v1; seat 7 QA |
| D11 | Athanor slug **`mondrian-project`** kept |
| D12 | Cascade folder `docs/DEV_PLAN/MONDRIAN/` **not** renamed this term |
| D13 | Announce via **class LMS** |

## Deploy / DNS cutover

| Path | When | Notes |
| --- | --- | --- |
| **Live now** | After 10 Nov 2026 Path A cutover | `https://neoplastix.crea-comm.net/` · `SITE=https://neoplastix.crea-comm.net` · `BASE=/` · `services/web/public/CNAME` |
| **Legacy (D6)** | Doc-only | `https://ruvebal.github.io/mondrian-project/` (GH redirects to custom domain when configured) |
| **GitHub Pages custom domain** | Done (Path A) | CNAME `neoplastix.crea-comm.net` → `ruvebal.github.io`; Enforce HTTPS |
| **Studio host (Lilith / Traefik)** | Only if studio later fronts the marque | Point A/AAAA at Lilith once Traefik terminates TLS for `neoplastix.crea-comm.net` |

## Out of this decision

- DNS / registrar writes (human)
- Lilith / Traefik config (human)
- npm `@mondrian` → `@neoplastix` (Wave A first)
- GitHub repo rename
- Athanor / Ahmes path or slug changes
- Rewriting graded student seat prose
- TTOD product identity (out of scope)

## Fallback

If custom-domain deploy breaks: revert gated `SITE`/`BASE`/`CNAME` commit; site returns on github.io project URL. DNS CNAME may stay. See Project store DNS playbook §8.
