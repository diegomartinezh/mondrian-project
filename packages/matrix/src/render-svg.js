/** Serialize a render plan to an SVG string (viewBox 0 0 1 1). D-38 clipPath. */

/**
 * @param {object} plan
 * @returns {string}
 */
export function renderSvg(plan) {
  const sorted = [...plan.items].sort((a, b) => a.z - b.z || a.id.localeCompare(b.id));
  const clips = [];
  const bodies = [];

  for (const it of sorted) {
    const w = it.x1 - it.x0;
    const h = it.y1 - it.y0;
    const clipId = it.clip?.shape && it.clip.shape !== "rect" ? `clip-${escapeAttr(it.id)}` : null;
    if (clipId) {
      clips.push(clipPathDef(clipId, it.clip.shape, it.x0, it.y0, w, h));
    }
    const clipAttr = clipId ? ` clip-path="url(#${clipId})"` : "";
    bodies.push(
      `<rect data-kind="${it.kind}" data-role="${it.role}" data-id="${escapeAttr(it.id)}" x="${n(it.x0)}" y="${n(it.y0)}" width="${n(w)}" height="${n(h)}" class="${it.kind === "line" ? "line" : "plane"}"${clipAttr}/>`,
    );
  }

  const parts = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" width="100%" height="100%" role="img">',
  ];
  if (clips.length) {
    parts.push(`<defs>${clips.join("")}</defs>`);
  }
  parts.push(...bodies, "</svg>");
  return parts.join("");
}

/**
 * Inscribed silhouette inside AABB (normalized).
 * @param {string} id
 * @param {"circle"|"triangle"} shape
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 */
function clipPathDef(id, shape, x, y, w, h) {
  if (shape === "circle") {
    const cx = x + w / 2;
    const cy = y + h / 2;
    const r = Math.min(w, h) / 2;
    return `<clipPath id="${id}" clipPathUnits="userSpaceOnUse"><circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}"/></clipPath>`;
  }
  // triangle: apex top-centre, base bottom AABB corners
  const x0 = x;
  const x1 = x + w;
  const y0 = y;
  const y1 = y + h;
  const mid = x + w / 2;
  return `<clipPath id="${id}" clipPathUnits="userSpaceOnUse"><polygon points="${n(mid)},${n(y0)} ${n(x1)},${n(y1)} ${n(x0)},${n(y1)}"/></clipPath>`;
}

function n(v) {
  return Number(v).toFixed(9).replace(/\.?0+$/, (m) => (m.startsWith(".") ? "" : m));
}

function escapeAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
