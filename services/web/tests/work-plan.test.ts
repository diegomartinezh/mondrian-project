import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { describe, expect, it } from "vitest";
import {
  captionStats,
  deltaSentence,
  gridFromWork,
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
  it("builds a CSS Grid model with plane and line items", () => {
    const { grid } = gridFromWork(work);
    expect(grid.items.some((i) => i.kind === "plane")).toBe(true);
    expect(grid.items.some((i) => i.kind === "line")).toBe(true);
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
