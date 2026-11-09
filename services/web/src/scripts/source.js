/**
 * Gallery / source study helpers: clamp θ from query; optional caption refresh.
 * Does not mutate measured work JSON.
 */
import { wrapTheta } from "@mondrian/matrix";

function readTheta() {
  const raw = new URLSearchParams(window.location.search).get("theta");
  if (raw == null || raw === "") return 0;
  const n = Number(raw);
  return Number.isFinite(n) ? wrapTheta(n) : 0;
}

function applyTheta(root, theta) {
  root.style.setProperty("--theta", `${theta}deg`);
  const caption = document.querySelector("[data-study-caption]");
  if (!caption) return;
  caption.dataset.theta = String(theta);
  const delta = caption.querySelector("[data-delta]");
  if (!delta) return;
  // Rebuild only the θ number; Δ between swatches is invariant (server prose).
  delta.textContent = delta.textContent.replace(
    /θ = [-\d.]+°/,
    `θ = ${theta}°`,
  );
}

export function bootSourceStudy() {
  const frame = document.querySelector("[data-study-frame]");
  if (!frame) return;
  const theta = readTheta();
  applyTheta(frame, theta);
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootSourceStudy);
  } else {
    bootSourceStudy();
  }
}
