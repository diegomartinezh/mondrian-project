# PHASE-M5: Analysis API — validated JSON and an HTML/CSS preview

> **Track:** L5 (FastAPI on the studio LAN host). Owned by the Analyzer & API lane. Parallel with M3/M6.
> **Status:** BLOCKED (M4 for `/analyze`) — schema frozen at M2

## Goal

A FastAPI service exposes the corpus and analyzer and renders a self-contained
HTML/CSS **and SVG** preview of the same composition contract as Astro. The
conformance test compares source primitives and the canonical derived plan:
track ratios, plane/line placements, SVG rects, roles and custom
properties—not byte order. `POST /analyze` wraps M4. The public site and kiosk
**never** depend on this service (D-23). Preset buttons do not call it.
`POST /patterns/calculate` is **out of this phase**.

## Deliverables

- `services/api/src/mondrian_api/{main,routes/works,routes/analyze,render,negotiate,settings}.py`; pydantic models from M2; structured JSON logging; health endpoint.
- Routes: `GET /works`; `GET /works/{id}` (JSON); `GET
  /works/{id}/preview?theta=&lineWeightScale=&paletteMode=&reflectX=&reflectY=`
  (`text/html`); `POST /analyze`; OpenAPI.
- `render.py`: complete accessible HTML response containing the figure and
  scoped CSS, plus an SVG serialisation of the same plan. It consumes M2's
  Python render plan, emits overlapping `.plane`/`.line` grid items **or**
  SVG rects/lines, and uses the same data attributes and custom properties as
  Astro.
- `scripts/preview-conformance.py`: parse Astro's test figure and the FastAPI
  preview for each work across a small recipe matrix: θ `{0,40,350}`, line
  scale `{0.25,1,max}`, normal/inverted palette and each reflection; compare
  semantic facts.
- Deployment: `services/api/Dockerfile` (multi-stage, slim), compose fragment for the studio LAN host behind the existing reverse proxy with mkcert TLS; `docs/runbooks/lan-api.md` naming the service generically in any text that could be copied into institutional documents.
- Contract tests (pytest + httpx): status codes, negotiation, `Vary`, θ clamping (same rule as `hue.js`), 404 shape, `/analyze` rejecting non-images and over-size uploads, rate limit on `/analyze`.
- `PHASE-M5-COLD-REVIEW.md`, `PHASE-M5-REPORT.md`.

## Scope

**In:** the above. **Out:** auth, accounts, persistence of uploads, any write to `packages/works`, any call from the public site, `POST /patterns/calculate`, server PDF jobs, putting Python inside the Astro app.

## Prompt (Implementation Agent)

```text
Implement PHASE-M5 per docs/DEV_PLAN/MONDRIAN/PHASE-M5.md.

## Deliver
1. Implement the four routes above. JSON is the source contract; preview is a
   separate route, not content negotiation magic.
2. `render.py` mirrors semantic facts, not Astro template source. It never
   derives directly from a persisted dense matrix. Astro adds a noindex fixture
   route for comparison.
3. preview-conformance.py parses both DOMs; never normalize HTML with regex.
4. Dockerfile multi-stage (python:3.12-slim), non-root, healthcheck; compose snippet with labels for the LAN
   reverse proxy; runbook with the deploy command and the HTTPS URL pattern (service name, not host).
5. Full suite: uv run pytest (workspace), pnpm -r test/build, conformance scripts. Deploy once; curl from a development
   device network; record the exit codes.
6. Hand off for cold review — do NOT mark DONE yourself.

## Constraints
- /analyze never writes under packages/works; uploads live in memory or a tmpdir deleted after the response.
- Request size limit and a simple per-IP rate limit on /analyze; timeouts on the analyzer call; structured logs.
- No cloud SDK imports; CI grep.
```

## Acceptance

- `uv run pytest services/api` green; response content types are exact.
- Preview conformance exits 0 for the recipe matrix; source primitive identity,
  clamped scale and derived tracks/planes/lines/custom properties agree.
  Changing one line extent, inversion token or reflection makes it fail
  (record, revert).
- `curl -sS https://<lan-service>/works/<ref-1>/preview?theta=40` returns
  `text/html` with one accessible figure.
- `curl -F image=@/dev/null …/analyze` → 4xx with a JSON error body; a 50 MB upload → 413.
- `docs/runbooks/lan-api.md` contains no private host name or LAN IP (grep for `10.0.0.` and `.loc` returns nothing).
- Cold review filed; blocking findings closed.

## Risks

- Attribute ordering and whitespace are irrelevant → compare parsed semantic
  facts, not serialized HTML.
- Temptation to make the public site fetch from the API "because it's there" → forbidden by the master paste; Playwright in M7 asserts no request leaves the Pages origin except fonts (if any).
