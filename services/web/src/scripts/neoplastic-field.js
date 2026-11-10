/**
 * Mount every [data-np-field] plane. Progressive: the SVG twin is already painted; the canvas
 * fades in over it only when motion is allowed and the field mounted without error.
 */
import { createNeoplasticField } from "@mondrian/neoplastic/field";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

export function mountNeoplasticFields(root = document) {
  const fields = [];
  if (reduced) return fields;
  for (const host of root.querySelectorAll("[data-np-field]")) {
    const canvas = host.querySelector(".np-field__canvas");
    if (!canvas) continue;
    try {
      const field = createNeoplasticField(canvas, {
        mode: host.dataset.npField,
        seed: Number(host.dataset.npSeed || 7),
        fit: host.dataset.npFit || "cover",
        pointerRoot: host.dataset.npPointer === "page" ? document.documentElement : host,
      });
      host.classList.add("is-live");
      fields.push(field);
      // A foreground mark that takes pointer ownership freezes the camera (canvas-25d rule).
      host.closest("[data-np-hero]")?.querySelectorAll("[data-np-owner]").forEach((el) => {
        el.addEventListener("pointerenter", () => field.setCameraPaused(true));
        el.addEventListener("pointerleave", () => field.setCameraPaused(false));
        el.addEventListener("focusin", () => field.setCameraPaused(true));
        el.addEventListener("focusout", () => field.setCameraPaused(false));
      });
    } catch (error) {
      console.warn("[neoplastic-field] static twin kept", error);
    }
  }
  addEventListener("pagehide", () => fields.forEach((f) => f.destroy()), { once: true });
  return fields;
}

mountNeoplasticFields();
