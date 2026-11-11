/**
 * Zod mirror of work.schema.json for conformance.
 * Structural shape here; semantic geometry via validateWork (shared paths).
 */
import { z } from "zod";
import { pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const axisPoint = z.object({
  id: z.string().min(1),
  position: z.number().min(0).max(1),
});

const measured = z.object({
  h: z.number().min(0).lt(360),
  s: z.number().min(0).max(100),
  l: z.number().min(0).max(100),
});

const swatch = z.object({ measured });

const reproduction = z.object({
  source: z.string().min(1),
  px_w: z.number().int().positive(),
  px_h: z.number().int().positive(),
  crop: z.object({
    x0: z.number(),
    y0: z.number(),
    x1: z.number(),
    y1: z.number(),
  }),
});

const reviewBase = z.object({
  status: z.enum(["proposal", "accepted"]),
  reviewed_by: z.string().optional(),
  date: z.string().optional(),
});

const provenance = z
  .object({
    method: z.enum(["hand", "analyzer", "external"]),
    reproduction,
    review: reviewBase,
    measured_by: z.string().optional(),
    date: z.string().optional(),
    analyzer_version: z.string().optional(),
    run_at: z.string().optional(),
    dataset: z.string().optional(),
    citation: z.string().optional(),
    record_id: z.string().optional(),
    license: z.string().optional(),
    imported_by: z.string().optional(),
  })
  .superRefine((p, ctx) => {
    if (p.method === "hand" && (!p.measured_by || !p.date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "hand requires measured_by and date",
        path: ["measured_by"],
      });
    }
    if (p.method === "analyzer" && (!p.analyzer_version || !p.run_at)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "analyzer requires analyzer_version and run_at",
        path: ["analyzer_version"],
      });
    }
    if (p.method === "external") {
      for (const k of [
        "dataset",
        "citation",
        "record_id",
        "license",
        "imported_by",
        "date",
      ]) {
        if (!p[k]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `external requires ${k}`,
            path: [k],
          });
          break;
        }
      }
    }
    if (p.review.status === "accepted" && (!p.review.reviewed_by || !p.review.date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "accepted review requires reviewed_by and date",
        path: ["review", "reviewed_by"],
      });
    }
  });

const workObject = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  year: z.number().int().min(1000).max(2100),
  source: z.object({
    collection: z.string().min(1),
    inventory: z.string().min(1),
    catalogueNote: z.string().optional(),
  }),
  canvas: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
    unit: z.enum(["mm", "cm", "in"]),
  }),
  geometry: z.object({
    coordinateSpace: z.literal("normalized-0-1"),
    points: z.object({
      x: z.array(axisPoint).min(2),
      y: z.array(axisPoint).min(2),
    }),
    rectangles: z
      .array(
        z.object({
          id: z.string(),
          x: z.tuple([z.string(), z.string()]),
          y: z.tuple([z.string(), z.string()]),
          role: z.enum(["red", "yellow", "blue", "black", "white", "gray"]),
          clip: z
            .object({ shape: z.enum(["rect", "circle", "triangle"]) })
            .optional(),
        }),
      )
      .min(1),
    lines: z
      .array(
        z.object({
          id: z.string(),
          orientation: z.enum(["h", "v"]),
          center: z.string(),
          extent: z.tuple([z.string(), z.string()]),
          thickness: z.number().positive().max(0.25),
        }),
      )
      .min(1),
  }),
  provenance,
  rights: z.object({
    eu: z.string().min(1),
    us: z.string().min(1),
    checked_by: z.string().min(1),
    date: z.string().min(1),
    credit: z.string().optional(),
  }),
  uncertainty: z.record(z.string(), z.unknown()).optional(),
  swatches: z.record(z.string(), swatch),
});

/**
 * @param {(work: object) => { ok: true } | { ok: false, path?: string, message?: string }} validateWork
 */
export function createWorkSchema(validateWork) {
  return workObject.superRefine((data, ctx) => {
    const r = validateWork(data);
    if (!r.ok) {
      const parts = (r.path || "").split(".").filter(Boolean);
      const path = parts.map((p) => (/^\d+$/.test(p) ? Number(p) : p));
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: r.message || "semantic",
        path,
      });
    }
  });
}

/** Standalone parse helper used by conformance.sh */
export async function loadWorkZod() {
  const here = dirname(fileURLToPath(import.meta.url));
  const matrixUrl = pathToFileURL(
    join(here, "../../matrix/src/validate.js"),
  ).href;
  const { validateWork } = await import(matrixUrl);
  return createWorkSchema(validateWork);
}

/** First error path in JSON-path-ish form matching JS semantic paths. */
export function firstZodPath(error) {
  if (!error?.issues?.length) return "";
  const issue = error.issues[0];
  return issue.path.map(String).join(".");
}
