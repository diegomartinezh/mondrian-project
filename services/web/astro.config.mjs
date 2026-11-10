import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

const base = process.env.BASE || "/";

export default defineConfig({
  site: process.env.SITE || "https://neoplastix.crea-comm.net",
  base,
  integrations: [svelte()],
  outDir: "dist",
});
