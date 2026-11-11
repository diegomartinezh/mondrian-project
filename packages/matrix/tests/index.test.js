import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { describe, expect, it } from "vitest";
import {
  clampFrame,
  clampLineWeightScale,
  defaultState,
  deriveRenderPlan,
  deriveVisibleCells,
  maximizeFrame,
  parseRecipe,
  renderSvg,
  serializeRecipe,
  surfaceFromPreset,
  validateWork,
  vary,
  withOrientation,
  wrapTheta,
} from "../src/index.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../works");
const valid = parseYaml(readFileSync(join(root, "fixtures/valid.yml"), "utf8"));

describe("validateWork", () => {
  it("accepts valid.yml", () => {
    expect(validateWork(valid).ok).toBe(true);
  });

  it("rejects unknown point reference", () => {
    const broken = parseYaml(
      readFileSync(join(root, "fixtures/broken/semantic/unknown-point-reference.yml"), "utf8"),
    );
    const r = validateWork(broken);
    expect(r.ok).toBe(false);
    expect(r.path).toContain("geometry.rectangles");
  });

  it("rejects missing chromatic plane", () => {
    const broken = parseYaml(
      readFileSync(join(root, "fixtures/broken/semantic/no-chromatic-plane.yml"), "utf8"),
    );
    expect(validateWork(broken).ok).toBe(false);
  });
});

describe("deriveRenderPlan", () => {
  it("is deterministic and planes below lines", () => {
    const a = deriveRenderPlan(valid, 1);
    const b = deriveRenderPlan(valid, 1);
    expect(a).toEqual(b);
    const planeZ = a.items.filter((i) => i.kind === "plane").every((i) => i.z === 0);
    const lineZ = a.items.filter((i) => i.kind === "line").every((i) => i.z === 1);
    expect(planeZ && lineZ).toBe(true);
  });

  it("clamps scale and keeps positive tracks summing to 1", () => {
    for (const req of [0.25, 1, 2, 99]) {
      const plan = deriveRenderPlan(valid, req);
      const sx = plan.xTracks.reduce((s, t) => s + t.weight, 0);
      const sy = plan.yTracks.reduce((s, t) => s + t.weight, 0);
      expect(sx).toBeCloseTo(1, 9);
      expect(sy).toBeCloseTo(1, 9);
      expect(plan.lineWeightScale).toBeLessThanOrEqual(clampLineWeightScale(valid, 99) + 1e-12);
      expect(plan.xTracks.every((t) => t.weight > 0)).toBe(true);
    }
  });

  it("does not mutate source work", () => {
    const before = structuredClone(valid);
    deriveRenderPlan(valid, 1.5);
    expect(valid).toEqual(before);
  });
});

describe("visible cells", () => {
  it("area shares sum to 1", () => {
    const plan = deriveRenderPlan(valid, 1);
    const { areaShares } = deriveVisibleCells(plan);
    const sum = Object.values(areaShares).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 9);
  });
});

describe("vary", () => {
  it("mirror/rotate agree and invert-contrast is involution on roles", () => {
    const once = vary(valid, "invert-contrast");
    const twice = vary(once, "invert-contrast");
    expect(twice.geometry.rectangles.map((r) => r.role)).toEqual(
      valid.geometry.rectangles.map((r) => r.role),
    );
    const mh = vary(valid, "mirror-h");
    expect(validateWork(mh).ok).toBe(true);
    expect(deriveRenderPlan(mh, 1).items.length).toBe(deriveRenderPlan(valid, 1).items.length);
  });
});

describe("svg", () => {
  it("renders sorted rects", () => {
    const svg = renderSvg(deriveRenderPlan(valid, 1));
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain('data-kind="line"');
    expect(svg).toContain('data-role="red"');
  });

  it("emits clipPath for circle / triangle plane clips (D-38)", () => {
    const clipped = structuredClone(valid);
    const red = clipped.geometry.rectangles.find((r) => r.role === "red");
    red.clip = { shape: "circle" };
    const blue = clipped.geometry.rectangles.find((r) => r.role === "blue");
    blue.clip = { shape: "triangle" };
    const plan = deriveRenderPlan(clipped, 1);
    expect(plan.items.find((i) => i.id === red.id).clip.shape).toBe("circle");
    const svg = renderSvg(plan);
    expect(svg).toContain("<clipPath");
    expect(svg).toContain("<circle");
    expect(svg).toContain("<polygon");
    expect(svg).toContain(`clip-path="url(#clip-${red.id})"`);
  });
});

describe("state / recipe", () => {
  it("A4 is 210×297", () => {
    const s = surfaceFromPreset("a4");
    expect(s.width).toBe(210);
    expect(s.height).toBe(297);
  });

  it("default frame is bounded; recipe round-trips", () => {
    const surface = withOrientation(surfaceFromPreset("a4"), "portrait");
    const state = defaultState(valid, surface);
    const framed = clampFrame(state.frame, surface);
    expect(framed.x).toBeGreaterThanOrEqual(surface.margins.left - 1e-12);
    const recipe = { surface, compositionState: { ...state, variationId: "mirror-h" } };
    const q = serializeRecipe(recipe);
    const back = parseRecipe(q, valid);
    expect(back.compositionState.variationId).toBe("mirror-h");
    expect(back.surface.width).toBe(210);
    expect(back.compositionState.frame.width).toBeCloseTo(recipe.compositionState.frame.width, 9);
  });

  it("maximizeFrame centres liquid-fill aspect", () => {
    const area = { x: 0.1, y: 0.1, width: 0.8, height: 0.8 };
    const f = maximizeFrame(1, area);
    expect(f.width).toBeCloseTo(0.8, 9);
    expect(f.height).toBeCloseTo(0.8, 9);
  });

  it("theta banana → 0; wrap works", () => {
    expect(wrapTheta(Number("banana"))).toBe(0);
    expect(wrapTheta(370)).toBeCloseTo(10, 9);
  });
});
