/**
 * Same plan → CSS Grid model (tracks + placed items).
 * D-38: product UI is SVG-only; keep for conformance/pedagogy tests, not shell paint.
 */

/**
 * @param {object} plan
 */
export function renderGrid(plan) {
  return {
    display: "grid",
    gridTemplateColumns: plan.xTracks.map((t) => `${t.weight}fr`).join(" "),
    gridTemplateRows: plan.yTracks.map((t) => `${t.weight}fr`).join(" "),
    items: [...plan.items]
      .sort((a, b) => a.z - b.z || a.id.localeCompare(b.id))
      .map((it) => ({
        id: it.id,
        kind: it.kind,
        role: it.role,
        column: trackSpan(plan.xTracks, it.x0, it.x1),
        row: trackSpan(plan.yTracks, it.y0, it.y1),
        zIndex: it.z,
      })),
  };
}

function trackSpan(tracks, a, b) {
  let start = 1;
  let end = 1;
  let acc = 0;
  for (let i = 0; i < tracks.length; i++) {
    const t0 = acc;
    const t1 = acc + tracks[i].weight;
    if (Math.abs(t0 - a) < 1e-9) start = i + 1;
    if (Math.abs(t1 - b) < 1e-9) end = i + 2;
    acc = t1;
  }
  return { start, end };
}
