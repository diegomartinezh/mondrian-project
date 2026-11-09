#!/usr/bin/env bash
# M2 conformance: Ajv | JS semantic | zod | pydantic + plan equality
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

node --input-type=module <<'NODE'
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";
import Ajv2020 from "ajv/dist/2020.js";
import {
  validateWork,
  deriveRenderPlan,
  renderSvg,
} from "./packages/matrix/src/index.js";
import {
  loadWorkZod,
  firstZodPath,
} from "./packages/works/schema/work.zod.mjs";

const root = process.cwd();
const schema = JSON.parse(
  readFileSync(join(root, "packages/works/schema/work.schema.json"), "utf8"),
);
const stripFormats = (node) => {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) return node.forEach(stripFormats);
  if ("format" in node) delete node.format;
  Object.values(node).forEach(stripFormats);
};
stripFormats(schema);
const ajv = new Ajv2020({ allErrors: true, strict: false });
const validateSchema = ajv.compile(schema);
const workZod = await loadWorkZod();

const fixturesDir = join(root, "packages/works/fixtures");
const valid = parseYaml(readFileSync(join(fixturesDir, "valid.yml"), "utf8"));

function zodResult(doc) {
  const r = workZod.safeParse(doc);
  if (r.success) return { ok: true, path: "" };
  return { ok: false, path: firstZodPath(r.error) };
}

function checkDoc(label, doc, expect) {
  const schemaOk = validateSchema(doc);
  const js = validateWork(doc);
  const zod = zodResult(doc);
  const schemaCol = schemaOk ? "ok" : "reject";
  const jsCol = js.ok ? "ok" : "reject";
  const zodCol = zod.ok ? "ok" : "reject";
  const extra = [
    !js.ok ? `jsPath=${js.path}` : "",
    !zod.ok ? `zodPath=${zod.path}` : "",
  ]
    .filter(Boolean)
    .join(" ");
  console.log(
    `${label}: schema=${schemaCol} js=${jsCol} zod=${zodCol}${extra ? " " + extra : ""}`,
  );
  if (expect === "all-ok") {
    if (!(schemaOk && js.ok && zod.ok)) process.exitCode = 1;
  } else if (expect === "structural") {
    // Ajv + zod must reject; JS is semantic-only and may accept.
    if (schemaOk || zod.ok) process.exitCode = 1;
  } else if (expect === "semantic") {
    if (!schemaOk) {
      console.log(`  (note) schema rejected semantic case — still require js+zod reject`);
    }
    if (js.ok || zod.ok) process.exitCode = 1;
  }
}

checkDoc("valid.yml", valid, "all-ok");

for (const f of readdirSync(join(fixturesDir, "broken/structural"))) {
  if (!f.endsWith(".yml")) continue;
  const doc = parseYaml(
    readFileSync(join(fixturesDir, "broken/structural", f), "utf8"),
  );
  checkDoc(`structural/${f}`, doc, "structural");
}
for (const f of readdirSync(join(fixturesDir, "broken/semantic"))) {
  if (!f.endsWith(".yml")) continue;
  const doc = parseYaml(
    readFileSync(join(fixturesDir, "broken/semantic", f), "utf8"),
  );
  checkDoc(`semantic/${f}`, doc, "semantic");
}

const plan = deriveRenderPlan(valid, 1);
const svg = renderSvg(plan);
process.stdout.write(`plan items=${plan.items.length} svgChars=${svg.length}\n`);
mkdirSync("/tmp/mondrian-m2", { recursive: true });
writeFileSync("/tmp/mondrian-m2/js-plan.json", JSON.stringify(plan));
writeFileSync("/tmp/mondrian-m2/js-svg.svg", svg);
NODE

# pydantic + plan equality
uv run python <<'PY'
import json
from pathlib import Path
import yaml
from mondrian_work_schema import Work, derive_render_plan, write_catalog

root = Path('.').resolve()
valid = yaml.safe_load((root/'packages/works/fixtures/valid.yml').read_text())
Work.model_validate(valid)
print('valid.yml: py=ok')

from pydantic import ValidationError
struct_dir = root/'packages/works/fixtures/broken/structural'
for f in sorted(struct_dir.glob('*.yml')):
    doc = yaml.safe_load(f.read_text())
    try:
        Work.model_validate(doc)
        print(f'structural/{f.name}: py=ok (UNEXPECTED)')
        raise SystemExit(1)
    except (ValidationError, Exception):
        print(f'structural/{f.name}: py=reject')

sem_dir = root/'packages/works/fixtures/broken/semantic'
for f in sorted(sem_dir.glob('*.yml')):
    doc = yaml.safe_load(f.read_text())
    try:
        Work.model_validate(doc)
        print(f'semantic/{f.name}: py=ok (UNEXPECTED)')
        raise SystemExit(1)
    except Exception:
        print(f'semantic/{f.name}: py=reject')

js_plan = json.loads(Path('/tmp/mondrian-m2/js-plan.json').read_text())
py_plan = derive_render_plan(valid, 1)

def close(a, b, tol=1e-9):
    if type(a) != type(b):
        if isinstance(a, (int, float)) and isinstance(b, (int, float)):
            return abs(a-b) <= tol
        return False
    if isinstance(a, float):
        return abs(a-b) <= tol
    if isinstance(a, list):
        return len(a)==len(b) and all(close(x,y,tol) for x,y in zip(a,b))
    if isinstance(a, dict):
        return a.keys()==b.keys() and all(close(a[k], b[k], tol) for k in a)
    return a == b

if not close(js_plan, py_plan):
    for key in ('lineWeightScale', 'xTracks', 'yTracks'):
        if not close(js_plan[key], py_plan[key]):
            print('plan DIFF at', key)
            print(' js', js_plan[key][:3] if isinstance(js_plan[key], list) else js_plan[key])
            print(' py', py_plan[key][:3] if isinstance(py_plan[key], list) else py_plan[key])
            raise SystemExit(1)
    if len(js_plan['items']) != len(py_plan['items']):
        print('plan item count mismatch')
        raise SystemExit(1)
    for a,b in zip(js_plan['items'], py_plan['items']):
        if not close(a,b):
            print('plan item DIFF', a.get('id'), b.get('id'))
            raise SystemExit(1)
print('valid.yml: plan=equal')

out = root/'services/web/public/patterns'
paths = write_catalog(valid, out)
print(f'catalog wrote {len(paths)} files -> {out}')
print('conformance: OK')
PY
