#!/usr/bin/env node
/** M2 smoke: exactly one measured work.yml under packages/works/works. */
import { readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const worksRoot = join(root, "packages/works/works");
const dirs = readdirSync(worksRoot, { withFileTypes: true }).filter((d) =>
  d.isDirectory(),
);
const withYml = dirs.filter((d) =>
  existsSync(join(worksRoot, d.name, "work.yml")),
);
if (withYml.length !== 1) {
  console.error(
    `assert-works-count: expected 1 work.yml, found ${withYml.length}: ${withYml
      .map((d) => d.name)
      .join(", ")}`,
  );
  process.exit(1);
}
console.log(`assert-works-count: OK (${withYml[0].name})`);
