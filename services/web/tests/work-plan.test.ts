import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { describe, expect, it } from "vitest";
import { deriveRenderPlan, renderSvg } from "@mondrian/matrix";
import {
  captionStats,
  deltaSentence,
  type WorkDoc,
} from "../src/lib/work-plan";

const root = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../packages/works",
);
const work = parseYaml(
  readFileSync(join(root, "fixtures/valid.yml"), "utf8"),
) as WorkDoc;

describe("work-plan", () => {
  it("builds an SVG study with plane and line items", () => {
    const plan = deriveRenderPlan(work, 1);
    const svg = renderSvg(plan);
    expect(svg).toContain('data-kind="plane"');
    expect(svg).toContain('data-kind="line"');
  });

  it("caption partition sums roles", () => {
    const stats = captionStats(work);
    expect(stats.cols).toBeGreaterThan(1);
    expect(stats.partition).toContain("columns");
    expect(stats.partition).toContain("red");
  });

  it("banana theta falls back via wrap / Number", () => {
    const a = deltaSentence(work, "banana");
    const b = deltaSentence(work, 0);
    expect(a.theta).toBe(0);
    expect(a.sentence).toContain("θ = 0°");
    expect(b.theta).toBe(0);
  });

  it("θ wrap leaves directed Δ prose stable", () => {
    const a = deltaSentence(work, 0);
    const b = deltaSentence(work, 350);
    expect(a.sentence.replace(/θ = [-\d.]+°/, "")).toBe(
      b.sentence.replace(/θ = [-\d.]+°/, ""),
    );
  });
});
