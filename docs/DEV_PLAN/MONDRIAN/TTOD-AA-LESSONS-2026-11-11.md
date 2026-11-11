# Lessons from TTOD Phase AA, for the Neoplastix owners (11 Nov 2026)

**Status:** owner checklist — **wired 11 Nov 2026** into [`INDEX.md`](INDEX.md),
[`ISSUE-SEEDS.md`](ISSUE-SEEDS.md) § TTOD-AA, [`LOCATORS.md`](LOCATORS.md) live walk,
[`PHASE-M7.md`](PHASE-M7.md) SW rules, and [`MONDRIAN-CASCADE.md`](MONDRIAN-CASCADE.md) §5.
Not a cascade phase. D-36 already holds locator lessons; P1–P4 become issues / Mn gates,
not a new “Phase AA.”
**Source:** TTOD `docs/DEV_PLAN/PHASE-AA-PREPROD-HARDENING/` (phases AA0–AA7, findings F1–F62, seven cold reviews).
**Follows:** [D-36](DECISIONS/D36-2026-11-10-LOCATORS-ORIGIN-EDGE.md) and [LOCATORS.md](LOCATORS.md), which already
carry the locator lessons of 10 Nov.
**Checked against Mondrian today:**
- `services/web` runs Astro **7.4.2** (static, no adapter, GitHub Pages) with `@astrojs/svelte` 9.1.1 and Vitest 3.2.4;
- `pnpm audit --prod` reports **1 low** (`deepmerge`, build tooling), and nothing else;
- live, `https://neoplastix.crea-comm.net//evil.example/x` and `/\evil.example/x` answer **404**, and `/about`
  301s to `/about/` on the owned domain.

## 1. What applies to Mondrian, and how to check it

| # | Lesson (TTOD evidence) | Mondrian today | Suggested check or action |
| - | ---------------------- | -------------- | ------------------------- |
| 1 | **Astro 7's `compressHTML` default is `'jsx'`:** whitespace between inline elements is stripped, so `<a>Library</a> <a>Ada</a>` renders "LibraryAda" (TTOD AA7 pinned `compressHTML: true` and diffed the visible text) | **Done 11 Nov 2026:** `compressHTML: true` in `services/web/astro.config.mjs`. Diff `/`, `/gallery/`, `/method/` visible text: default `'jsx'` glued `NeoplastixGalleryAboutMethodCreate`, `ScholarInvestigador` (+ Novelist/Teacher/Developer pairs), `Skip to contentNeoplastixHome`, `·UDIT·`; `true` restores spaces; `false` also safe (larger HTML). Kept `true`. | Re-diff those three routes after any Astro minor that touches HTML compression |
| 2 | **`import.meta.env.X` is inlined at build time** (Astro 6+). TTOD had a server-only `BACKEND_URL` that would have frozen silently, so it reads `process.env` at request time now | Static output: build-time is the intended behaviour (`SITE`/`BASE`, D-36) | Nothing today. If an adapter is ever added, read runtime settings from `process.env` and never from `import.meta.env` |
| 3 | **Behind a proxy, Astro 7's Node adapter normalizes the path** (`//host/x` → `/host/x`) before middleware sees it, so an app-level open-redirect guard goes blind. TTOD moved the guard to the edge (Caddy answers 404 on the raw request line) | Pages already answers 404 to `//host` and `/\host` (probed above) | Keep that probe in the LOCATORS walk; it is the edge's behaviour, not the app's |
| 4 | **Markdown heading ids** (v6 keeps trailing hyphens; v7 renders through Sätteri). TTOD's ids, accented ones included, came out unchanged | Not probed | Before anyone cites a heading anchor, snapshot the ids once and diff after every Astro minor |
| 5 | **The Container API renderer moved:** `getContainerRenderer` comes from `@astrojs/<x>/container-renderer` in v7. Astro components no longer render in jsdom (v6) | Not used today | If Astro container tests are added: Node environment, new import path |
| 6 | **A service worker must never store personalized HTML.** TTOD's SW cached the Oracle page at install, with the signed-in header inside it; the next student on a shared lab browser saw the previous student's name. Fix: precache with `credentials: 'omit'`, serve network-first, never store a credentialed response, and bump the cache version | `site.webmanifest`, no service worker found | Rule for M-phases: an offline page is fetched without cookies, network-first |
| 7 | **CI: a Playwright browser install can die on a stalling Ubuntu mirror** (twice on 11 Nov). TTOD: a 15 min job limit, apt retries with short timeouts, the browser download cached by Playwright version, and `install-deps` best effort with a warning | Check your Playwright CI jobs | Same three changes if a job installs browsers |
| 8 | **A new required check must exist on `main` first.** Requiring a job that only lives on a branch leaves every other PR waiting for it forever | Branch protection | Merge the job, then mark it required |
| 9 | **Unknown facet or filter values should be 404, not an empty 200 list** (soft 404s confuse crawlers and the AA4 sitemap) | Gallery filters, if any | Add a `notFound` row to the LOCATORS registry for an unknown value |

## 2. Accessibility patterns that held up under cold review

- **Disclosure navigation, not a modal:** the button has `aria-expanded`/`aria-controls`, the panel pushes content
  down, there is no focus trap, and Escape returns focus to the button. A focus trap belongs only in a real `<dialog>`.
- **Accessible name = visible text plus purpose:** a link that shows "Ada" is named "Account: Ada" through a visually
  hidden prefix (WCAG 2.4.4, 2.5.3). A language switch shows `EN`, with `aria-label="English (EN)"`, `hreflang`
  and `lang`. Never a `title` that leaks an email.
- **Reduced motion loses to specificity:** `.x { transition: none }` inside `prefers-reduced-motion` was beaten by
  a more specific `.x[data-a]:not(...)` rule that set its own transition. Put the animated rule *inside*
  `@media (prefers-reduced-motion: no-preference)`, and test the result in a browser.
- **One anchor offset for the whole site:** `html { scroll-padding-top: calc(var(--header-height) + 1rem) }` from a
  single token, and no per-view `scroll-margin` patches (they add up).
- **Copy-link:** a real `<a href="#id">` whose click copies the absolute URL. Announce the result in a polite live
  region, *inside* a dialog when one is open. On non-secure origins (plain HTTP on a LAN) `navigator.clipboard` is
  missing, so say "copy it from the address bar" and don't fail silently.

## 3. Method lessons (how the harness kept finding real bugs)

1. **Write the exit gate before the code**, and commit it alone. Every later edit to it is disclosed in the report.
2. **Falsify every new check:** put the old code back, confirm the check fails, restore. Twice a rebuild silently
   kept the new code; always confirm the swap really happened (e.g. the served file's version string).
3. **Look at your own screenshots.** In TTOD AA3 the unit test passed while the desktop bar still showed a link it
   should hide (a CSS specificity bug), and an email wrapped letter by letter at 390 px.
4. **On a platform upgrade, re-run the earlier gates unchanged** and refuse if one was edited to pass. TTOD's
   Astro 5 → 7: all 271 unit tests passed, and the re-run gates still found two real breaks:
   - the production image crashed (`cookie` imported bare while only a nested copy existed; `npm ci --omit=dev`
     dropped it);
   - the open-redirect guard went blind behind the proxy.
5. **Scan the built server's bare imports** against the lockfile (each must be a top-level, non-dev package) when
   deploying with `--omit=dev`. That doesn't apply to static output.
6. **The cold reviewer is a fresh agent with no context.** It writes its own review file, and every finding is
   amended in the same session. In TTOD, all seven reviews returned PASS-WITH-AMENDMENTS, with real P1s each time
   (open redirect, slow-network deep links, a stale service-worker header, Linux bind-mount permissions).
7. **Harness quirks** (shared `cascade-harness.sh`):
   - it parses numeric steps only, so a `3b` row can never be `start`ed (open it by hand with the same naming and
     a `.cascade-lane` file);
   - `verify` needs the `PHASES/` prefix;
   - one phase per lane is enforced. Close or remove a DONE phase's worktree before starting the next.

## 4. Proposals for the owners (optional, not filed)

- **P1 (done 11 Nov 2026):** `compressHTML: true` in `services/web/astro.config.mjs` (item 1); evidence in the table row.
- **P2:** add the `//host` and `/\host` probes to the LOCATORS walk (item 3; they pass today).
- **P3:** a short "offline pages are anonymous and network-first" rule in the PWA phase, before any service worker
  ships (item 6).
- **P4:** reuse the TTOD CI hardening for any job that installs Playwright browsers (item 7).
