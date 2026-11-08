/** Pure geometric variations (JS). Weight redistributions are Python catalog-only. */

/**
 * @param {object} work
 * @param {string} variationId
 */
export function vary(work, variationId) {
  switch (variationId) {
    case "original":
      return structuredClone(work);
    case "mirror-h":
      return mirror(work, "x");
    case "mirror-v":
      return mirror(work, "y");
    case "rotate-180":
      return mirror(mirror(work, "x"), "y");
    case "invert-contrast":
      return invertContrast(work);
    default:
      throw new Error(`unknown or omitted MVP variation: ${variationId}`);
  }
}

function mirror(work, axis) {
  const out = structuredClone(work);
  const pts = out.geometry.points[axis];
  for (const p of pts) p.position = 1 - p.position;
  pts.sort((a, b) => a.position - b.position);
  // rectangle/line refs stay valid (ids unchanged; positions mirrored)
  for (const r of out.geometry.rectangles) {
    if (axis === "x") r.x = [r.x[1], r.x[0]];
    else r.y = [r.y[1], r.y[0]];
  }
  for (const ln of out.geometry.lines) {
    if (axis === "x" && ln.orientation === "h") {
      ln.extent = [ln.extent[1], ln.extent[0]];
    } else if (axis === "y" && ln.orientation === "v") {
      ln.extent = [ln.extent[1], ln.extent[0]];
    }
    // center point id still points at mirrored position via points array
  }
  // After mirroring positions, extent order may be wrong — normalize by position
  normalizeExtents(out);
  normalizeRects(out);
  return out;
}

function normalizeRects(work) {
  const map = maps(work);
  for (const r of work.geometry.rectangles) {
    if (map.x.get(r.x[0]) > map.x.get(r.x[1])) r.x = [r.x[1], r.x[0]];
    if (map.y.get(r.y[0]) > map.y.get(r.y[1])) r.y = [r.y[1], r.y[0]];
  }
}

function normalizeExtents(work) {
  const map = maps(work);
  for (const ln of work.geometry.lines) {
    if (ln.orientation === "h") {
      if (map.x.get(ln.extent[0]) > map.x.get(ln.extent[1])) {
        ln.extent = [ln.extent[1], ln.extent[0]];
      }
    } else if (map.y.get(ln.extent[0]) > map.y.get(ln.extent[1])) {
      ln.extent = [ln.extent[1], ln.extent[0]];
    }
  }
}

function invertContrast(work) {
  const out = structuredClone(work);
  const flip = {
    red: "blue",
    blue: "red",
    yellow: "yellow",
    black: "white",
    white: "black",
    gray: "gray",
  };
  for (const r of out.geometry.rectangles) {
    r.role = flip[r.role] || r.role;
  }
  // swatches stay; paletteMode handles HSL involution for chromatic at render
  return out;
}

function maps(work) {
  const x = new Map();
  const y = new Map();
  for (const p of work.geometry.points.x) x.set(p.id, p.position);
  for (const p of work.geometry.points.y) y.set(p.id, p.position);
  return { x, y };
}
