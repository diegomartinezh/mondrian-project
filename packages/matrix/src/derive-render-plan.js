/** Derive canonical render plan (tracks + plane/line items) from work. */

/**
 * @param {object} work
 */
export function maxLineWeightScale(work) {
  let max = 2;
  const map = axisMaps(work);
  for (const ln of work.geometry.lines) {
    const c = centerPos(map, ln);
    const tau = ln.thickness;
    max = Math.min(max, (2 * Math.min(c, 1 - c)) / tau);
  }
  const byOri = { h: [], v: [] };
  for (const ln of work.geometry.lines) {
    byOri[ln.orientation].push({
      c: centerPos(map, ln),
      tau: ln.thickness,
      e0: extentPos(map, ln)[0],
      e1: extentPos(map, ln)[1],
    });
  }
  for (const ori of ["h", "v"]) {
    const arr = byOri[ori];
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const A = arr[i];
        const B = arr[j];
        if (Math.min(A.e1, B.e1) - Math.max(A.e0, B.e0) <= 0) continue;
        max = Math.min(max, (2 * Math.abs(A.c - B.c)) / (A.tau + B.tau));
      }
    }
  }
  return Math.max(0.25, max);
}

/**
 * @param {object} work
 * @param {number} [requested=1]
 */
export function clampLineWeightScale(work, requested = 1) {
  const max = maxLineWeightScale(work);
  const r = Number.isFinite(requested) ? requested : 1;
  return Math.min(max, Math.max(0.25, r));
}

/**
 * @param {object} work
 * @param {number} [lineWeightScale=1]
 */
export function deriveRenderPlan(work, lineWeightScale = 1) {
  const scale = clampLineWeightScale(work, lineWeightScale);
  const map = axisMaps(work);
  const xTracks = tracksFromEdges(collectEdges(work, map, scale, "x"));
  const yTracks = tracksFromEdges(collectEdges(work, map, scale, "y"));

  const planes = work.geometry.rectangles.map((r) => {
    const item = {
      kind: "plane",
      id: r.id,
      role: r.role,
      x0: map.x.get(r.x[0]),
      x1: map.x.get(r.x[1]),
      y0: map.y.get(r.y[0]),
      y1: map.y.get(r.y[1]),
      z: 0,
    };
    // D-38: optional silhouette inside AABB; absent ≡ rect.
    if (r.clip?.shape && r.clip.shape !== "rect") {
      item.clip = { shape: r.clip.shape };
    }
    return item;
  });

  const lines = work.geometry.lines.map((ln) => {
    const c = centerPos(map, ln);
    const half = (scale * ln.thickness) / 2;
    const [e0, e1] = extentPos(map, ln);
    if (ln.orientation === "h") {
      return {
        kind: "line",
        id: ln.id,
        role: "black",
        orientation: "h",
        x0: e0,
        x1: e1,
        y0: c - half,
        y1: c + half,
        z: 1,
      };
    }
    return {
      kind: "line",
      id: ln.id,
      role: "black",
      orientation: "v",
      x0: c - half,
      x1: c + half,
      y0: e0,
      y1: e1,
      z: 1,
    };
  });

  return {
    coordinateSpace: "normalized-0-1",
    lineWeightScale: scale,
    xTracks,
    yTracks,
    items: [...planes, ...lines],
  };
}

function collectEdges(work, map, scale, axis) {
  const edges = new Set([0, 1]);
  for (const p of work.geometry.points[axis]) edges.add(p.position);
  for (const r of work.geometry.rectangles) {
    if (axis === "x") {
      edges.add(map.x.get(r.x[0]));
      edges.add(map.x.get(r.x[1]));
    } else {
      edges.add(map.y.get(r.y[0]));
      edges.add(map.y.get(r.y[1]));
    }
  }
  for (const ln of work.geometry.lines) {
    const c = centerPos(map, ln);
    const half = (scale * ln.thickness) / 2;
    const [e0, e1] = extentPos(map, ln);
    if (ln.orientation === "h") {
      if (axis === "y") {
        edges.add(c - half);
        edges.add(c + half);
      } else {
        edges.add(e0);
        edges.add(e1);
      }
    } else if (axis === "x") {
      edges.add(c - half);
      edges.add(c + half);
    } else {
      edges.add(e0);
      edges.add(e1);
    }
  }
  return [...edges];
}

function tracksFromEdges(raw) {
  const sorted = raw
    .map((v) => Math.min(1, Math.max(0, v)))
    .sort((a, b) => a - b);
  const uniq = [];
  for (const v of sorted) {
    if (!uniq.length || Math.abs(v - uniq[uniq.length - 1]) > 1e-9) uniq.push(v);
  }
  if (uniq[0] !== 0) uniq.unshift(0);
  if (uniq[uniq.length - 1] !== 1) uniq.push(1);
  const tracks = [];
  for (let i = 0; i < uniq.length - 1; i++) {
    const weight = uniq[i + 1] - uniq[i];
    if (weight > 1e-12) {
      tracks.push({ start: uniq[i], end: uniq[i + 1], weight });
    }
  }
  return tracks;
}

function axisMaps(work) {
  const x = new Map();
  const y = new Map();
  for (const p of work.geometry.points.x) x.set(p.id, p.position);
  for (const p of work.geometry.points.y) y.set(p.id, p.position);
  return { x, y };
}

function centerPos(map, ln) {
  return ln.orientation === "h" ? map.y.get(ln.center) : map.x.get(ln.center);
}

function extentPos(map, ln) {
  if (ln.orientation === "h") {
    return [map.x.get(ln.extent[0]), map.x.get(ln.extent[1])];
  }
  return [map.y.get(ln.extent[0]), map.y.get(ln.extent[1])];
}
