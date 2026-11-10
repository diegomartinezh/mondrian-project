import { describe, expect, it } from "vitest";
import * as G from "../src/neoplastic-grid.js";
import { minimalPartitionSVG, squaredSquareSVG, MINIMAL_PARTITION } from "../src/neoplastic-svg.js";
import art from "../src/mondrian-art.json" with { type: "json" };

// The frozen mathematics (D-37). A failure here means the art stopped telling the truth.
describe("squared tilings", () => {
  it.each([G.DUIJVESTIJN_21, G.MORON_9])("$id is an exact perfect tiling", (T) => {
    const tiles = G.decodeBouwkamp(T);
    expect(G.verifyTiling(tiles, T.width, T.height)).toEqual({ ok: true, why: "" });
  });
  it("Duijvestijn: 21 unequal squares in 112×112", () => {
    const sides = G.decodeBouwkamp(G.DUIJVESTIJN_21).map((t) => t.w);
    expect(sides).toHaveLength(21);
    expect(new Set(sides).size).toBe(21);
    expect(sides.reduce((s, x) => s + x * x, 0)).toBe(112 * 112);
  });
  it("every D4 orientation still tiles the square (fractal substitution is exact)", () => {
    const unit = G.normalise(G.DUIJVESTIJN_21);
    for (const o of G.D4) {
      const t = unit.map((u) => G.orient(u, o)).map((r) => ({ x: Math.round(r.x * 112), y: Math.round(r.y * 112), w: Math.round(r.w * 112), h: Math.round(r.h * 112), i: r.i }));
      expect(G.verifyTiling(t, 112, 112).ok).toBe(true);
    }
  });
});

describe("équilibre colouring", () => {
  it("is deterministic, one plane per primary + one black, off-centre", () => {
    const unit = G.normalise(G.DUIJVESTIJN_21);
    const e = G.equilibre(unit);
    expect(G.equilibre(unit)).toEqual(e);
    for (const r of ["red", "blue", "yellow", "black"]) expect(e.roles.filter((x) => x === r)).toHaveLength(1);
    expect(e.centroidOffset).toBeGreaterThanOrEqual(0.04);
  });
});

describe("Mondrian Art Problem (OEIS A276523)", () => {
  it("search reproduces the published first terms", () => {
    expect([3, 4, 5].map((n) => G.mondrianArt(n).defect)).toEqual([2, 4, 4]);
  });
  it("frozen data agrees with OEIS for n = 3..6", () => {
    expect([3, 4, 5, 6].map((n) => art.map[n].defect)).toEqual([2, 4, 4, 5]);
  });
  it("the favicon is the unique n = 3 optimum: three non-congruent rectangles, defect 2", () => {
    expect(art.map[3].solutions).toHaveLength(1);
    const areas = MINIMAL_PARTITION.map((p) => p.w * p.h).sort();
    expect(areas).toEqual([2, 3, 4]);
    const shapes = MINIMAL_PARTITION.map((p) => [p.w, p.h].sort().join("x"));
    expect(new Set(shapes).size).toBe(3);
  });
});

describe("SVG output", () => {
  it("minimal partition mark is rects only (mark-canvas contract)", () => {
    const svg = minimalPartitionSVG();
    expect(svg).not.toMatch(/<(path|line|polygon|circle|text)\b/);
    expect(svg.match(/<rect/g).length).toBeGreaterThanOrEqual(3);
  });
  it("squared-square twin carries no text", () => {
    expect(squaredSquareSVG({ depth: 1 })).not.toMatch(/<text\b/);
  });
});
