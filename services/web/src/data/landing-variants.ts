/**
 * Landing lab registry (D-37). Single source for /lab/landing/ and LOCATORS.md.
 * Ids are append-only: a retired version keeps its id and page (D-36 rule).
 */
export interface LandingVariant {
  id: string;
  name: string;
  technique: string;
  idea: string;
  js: "none" | "canvas" | "waapi" | "css";
  canonical?: boolean;
}

export const landingVariants: LandingVariant[] = [
  {
    id: "v1",
    name: "Armature",
    technique: "Inline SVG + CSS stroke draw-on",
    idea: "The economy baseline: the squared square drawn line by line, no script at all.",
    js: "none",
  },
  {
    id: "v2",
    name: "Descent",
    technique: "Canvas, exponential zoom, seamless re-rooting",
    idea: "An endless fall into white planes: each one opens into the whole square again.",
    js: "canvas",
  },
  {
    id: "v3",
    name: "Relief",
    technique: "Canvas 2.5D, spring-damped camera, painter order",
    idea: "Colour planes lift off their footprints toward the pointer; the ground stays flat.",
    js: "canvas",
    canonical: true,
  },
  {
    id: "v4",
    name: "Equivalence",
    technique: "HTML planes + WAAPI, exhaustive search data",
    idea: "The Mondrian Art Problem: n×n squares split into unequal rectangles, n = 3 … 8.",
    js: "waapi",
  },
  {
    id: "v5",
    name: "Foveal",
    technique: "Canvas, pointer-led level of detail",
    idea: "The grid subdivides where you look and settles where you do not.",
    js: "canvas",
  },
  {
    id: "v6",
    name: "Moroń",
    technique: "SVG + CSS keyframes colour cycle",
    idea: "Nine unequal squares, 33 × 32: a square that almost is. Colour rotates; geometry never moves.",
    js: "css",
  },
];
