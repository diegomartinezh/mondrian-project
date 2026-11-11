import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

// Origin and base come from the environment only (D-36 rule 1). Defaults = localhost at root,
// matching production BASE=/. Deploy sets SITE/BASE once in .github/workflows/deploy-pages.yml;
// a future brand domain changes that env, never this file.
const base = process.env.BASE || "/";

export default defineConfig({
  site: process.env.SITE || "http://localhost:4321",
  base,
  integrations: [svelte()],
  outDir: "dist",
  // TTOD-AA P1: Astro 7 default is 'jsx' (strips whitespace between inline
  // elements). Visible-text diff on /, /gallery/, /method/ (11 Nov 2026):
  // 'jsx' glued NeoplastixGallery…, ScholarInvestigador, ·UDIT·;
  // true inserts the spaces; false also safe but noisier HTML. Pin true.
  compressHTML: true,
});
