import {
  deriveRenderPlan,
  deriveVisibleCells,
  renderGrid,
  wrapTheta,
} from "@mondrian/matrix";

export type WorkDoc = {
  id: string;
  title: string;
  year: number;
  source: { collection: string; inventory: string; catalogueNote?: string };
  canvas: { width: number; height: number; unit: string };
  geometry: unknown;
  provenance: unknown;
  rights: { eu: string; us: string; checked_by: string; date: string; credit?: string };
  uncertainty?: Record<string, unknown>;
  swatches: Record<string, { measured: { h: number; s: number; l: number } }>;
};

export function planFromWork(work: WorkDoc, lineWeightScale = 1) {
  return deriveRenderPlan(work, lineWeightScale);
}

export function gridFromWork(work: WorkDoc, lineWeightScale = 1) {
  const plan = planFromWork(work, lineWeightScale);
  return { plan, grid: renderGrid(plan), visible: deriveVisibleCells(plan) };
}

export function captionStats(work: WorkDoc) {
  const { plan, visible } = gridFromWork(work);
  const cols = plan.xTracks.length;
  const rows = plan.yTracks.length;
  const parts = Object.entries(visible.areaShares)
    .sort((a, b) => b[1] - a[1])
    .map(([role, share]) => `${role} ${Math.round(share * 100)}%`);
  return {
    cols,
    rows,
    partition: `${cols} columns, ${rows} rows; ${parts.join(", ")}`,
  };
}

export function deltaSentence(work: WorkDoc, thetaRaw: unknown) {
  const theta = wrapTheta(Number(thetaRaw) || 0);
  const red = work.swatches.red?.measured;
  const blue = work.swatches.blue?.measured;
  if (!red || !blue) {
    return {
      theta,
      sentence: `Hue offset θ = ${theta}°. Chromatic planes rotate together; black, white and gray stay put.`,
    };
  }
  const baseDelta = ((blue.h - red.h) % 360 + 360) % 360;
  return {
    theta,
    sentence: `Hue offset θ = ${theta}°. Directed Δ between measured red (h=${red.h}) and blue (h=${blue.h}) stays ${baseDelta}° on the HSL wheel.`,
  };
}

export function safeWorkJson(work: WorkDoc): string {
  return JSON.stringify(work).replace(/</g, "\\u003c");
}

export function swatchCssVars(work: WorkDoc): string {
  const roles = ["red", "yellow", "blue"] as const;
  const parts: string[] = [];
  for (const role of roles) {
    const m = work.swatches[role]?.measured;
    if (!m) continue;
    parts.push(`--swatch-${role}-h: ${m.h}`);
    parts.push(`--swatch-${role}-s: ${m.s}%`);
    parts.push(`--swatch-${role}-l: ${m.l}%`);
  }
  return parts.join("; ");
}
