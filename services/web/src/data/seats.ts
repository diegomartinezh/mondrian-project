/**
 * Cohort seat map — single source for /assignments/ and scaffold pages.
 * Keep in sync with docs/DEV_PLAN/MONDRIAN/TEAM-ASSIGNMENTS.md + STUDENT-ASSIGNMENT-LIST.md.
 */

export type Wave = "A" | "B" | "C" | "shared";

export type Link = { label: string; href: string };

export type Seat = {
  id: number;
  handle: string;
  title: string;
  track: string;
  wave: Wave;
  owns: string[];
  routes: { href: string; label: string }[];
  tasks: { id: string; summary: string }[];
  outcome: string;
  lessons: Link[];
  docs: Link[];
  specs: Link[];
};

const LESSON = "https://ruvebal.github.io/web-atelier-udit/lessons/en";
const GH =
  "https://github.com/ruvebal/mondrian-project/blob/main/docs/DEV_PLAN/MONDRIAN";

export const seats: Seat[] = [
  {
    id: 1,
    handle: "ATIaas",
    title: "Analyzer & catalog",
    track: "Backend",
    wave: "B",
    owns: ["packages/analyzer/", "packages/works/python/", "catalog CLI"],
    routes: [
      { href: "/method/", label: "Method (consume)" },
      { href: "/gallery/", label: "Gallery patterns" },
    ],
    tasks: [
      { id: "B1-T3", summary: "Classical analyzer → work.yml draft + evaluation" },
      { id: "B1-T5", summary: "Personal measured work (M8)" },
      {
        id: "B1-T6",
        summary: "Limit-case refuse — af Klint Ser III No. 5 (wrong partition)",
      },
    ],
    outcome:
      "M4 analyzer + M8 personal work; weight remaps only with closed-form proofs; document Ser III No. 5 refuse.",
    lessons: [
      { label: "Method page (in product)", href: "/method/" },
    ],
    docs: [
      {
        label: "JSON Schema 2020-12",
        href: "https://json-schema.org/draft/2020-12/json-schema-core.html",
      },
      {
        label: "work.schema.json (repo)",
        href: "https://github.com/ruvebal/mondrian-project/blob/main/packages/works/schema/work.schema.json",
      },
    ],
    specs: [
      { label: "TEAM-ASSIGNMENTS · Seat 1", href: `${GH}/TEAM-ASSIGNMENTS.md` },
      { label: "PHASE-M4", href: `${GH}/PHASE-M4.md` },
      { label: "ISSUE-SEEDS", href: `${GH}/ISSUE-SEEDS.md` },
    ],
  },
  {
    id: 2,
    handle: "diegomartinezh",
    title: "Contract / API",
    track: "Backend",
    wave: "B",
    owns: ["services/api/", "conformance harness", "OpenAPI"],
    routes: [{ href: "/method/", label: "Method (contract story)" }],
    tasks: [
      { id: "B2-T3", summary: "JS ↔ Python conformance ownership" },
      { id: "B2-T7", summary: "Prove Pages never fetches the API" },
    ],
    outcome: "Conformance + M5 LAN API; public build has zero API fetches.",
    lessons: [
      { label: "JS modules (S9)", href: `${LESSON}/js-modules/` },
    ],
    docs: [
      { label: "FastAPI", href: "https://fastapi.tiangolo.com/" },
      {
        label: "OpenAPI 3.1",
        href: "https://spec.openapis.org/oas/v3.1.0.html",
      },
    ],
    specs: [
      { label: "TEAM-ASSIGNMENTS · Seat 2", href: `${GH}/TEAM-ASSIGNMENTS.md` },
      { label: "ISSUE-SEEDS", href: `${GH}/ISSUE-SEEDS.md` },
    ],
  },
  {
    id: 3,
    handle: "medinaxd29",
    title: "About story",
    track: "Storytelling",
    wave: "A",
    owns: ["/about/"],
    routes: [{ href: "/about/", label: "About (your page)" }],
    tasks: [
      { id: "S3-T1", summary: "Seven About scenes" },
      { id: "S3-T2", summary: "GSAP ScrollTrigger parallax (About only)" },
      { id: "S3-T5", summary: "Reduced-motion / no-JS complete" },
    ],
    outcome: "Seven scenes; parallax on /about/ only; safe cites.",
    lessons: [
      { label: "GSAP overview (S11)", href: `${LESSON}/gsap/overview/` },
    ],
    docs: [
      {
        label: "GSAP ScrollTrigger",
        href: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
      },
      {
        label: "prefers-reduced-motion (MDN)",
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion",
      },
    ],
    specs: [
      { label: "TEAM-ASSIGNMENTS · Seat 3", href: `${GH}/TEAM-ASSIGNMENTS.md` },
      { label: "D-29 About GSAP", href: `${GH}/DECISIONS/D29-2026-10-27-ABOUT-GSAP-PARALLAX.md` },
      { label: "ISSUE-SEEDS", href: `${GH}/ISSUE-SEEDS.md` },
    ],
  },
  {
    id: 4,
    handle: "Yassin-Skirej",
    title: "Gallery & method",
    track: "Storytelling",
    wave: "A",
    owns: ["/gallery/", "/method/"],
    routes: [
      { href: "/gallery/", label: "Gallery (your page)" },
      { href: "/method/", label: "Method (your page)" },
    ],
    tasks: [
      { id: "S4-T1", summary: "Live SVG gallery miniatures (same plan as editor)" },
      { id: "S4-T2", summary: "/method/ pedagogy depth" },
      { id: "S4-T3", summary: "Container-query chrome" },
    ],
    outcome: "SVG gallery + method page; no painting photos.",
    lessons: [
      { label: "HTML/CSS basics (S3)", href: `${LESSON}/html-css-basics/` },
      { label: "Intrinsic web design (S5)", href: `${LESSON}/intrinsic-web-design/` },
      {
        label: "SVG master session",
        href: `${LESSON}/web-animations/svg-master-session/`,
      },
    ],
    docs: [
      {
        label: "SVG (MDN)",
        href: "https://developer.mozilla.org/en-US/docs/Web/SVG",
      },
      {
        label: "clipPath (MDN)",
        href: "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath",
      },
      {
        label: "Container queries (MDN)",
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries",
      },
    ],
    specs: [
      { label: "TEAM-ASSIGNMENTS · Seat 4", href: `${GH}/TEAM-ASSIGNMENTS.md` },
      { label: "D-38 SVG-only + plane clip", href: `${GH}/DECISIONS/D38-2026-11-11-SVG-ONLY-PLANE-CLIP.md` },
      { label: "ISSUE-SEEDS", href: `${GH}/ISSUE-SEEDS.md` },
    ],
  },
  {
    id: 5,
    handle: "itzy-4Qunn7",
    title: "About-us / contribute",
    track: "Storytelling",
    wave: "A",
    owns: ["/about-us/", "/contribute/", "/declaration/"],
    routes: [
      { href: "/about-us/", label: "About us" },
      { href: "/contribute/", label: "Contribute" },
      { href: "/declaration/", label: "Declaration (scaffold)" },
    ],
    tasks: [
      { id: "S5-T1", summary: "Credits + research / AI notice" },
      { id: "S5-T4", summary: "Contribute lanes for classmates" },
    ],
    outcome: "/about-us/ credits; /contribute/ lanes; declaration scaffold.",
    lessons: [
      { label: "First steps · Git/Pages (S2)", href: `${LESSON}/first-steps/` },
      {
        label: "Portfolio brief / defence (S13)",
        href: `${LESSON}/portfolio-template-brief/challenge/`,
      },
    ],
    docs: [
      {
        label: "GitHub Flow",
        href: "https://docs.github.com/en/get-started/using-github/github-flow",
      },
    ],
    specs: [
      { label: "TEAM-ASSIGNMENTS · Seat 5", href: `${GH}/TEAM-ASSIGNMENTS.md` },
      { label: "ISSUE-SEEDS", href: `${GH}/ISSUE-SEEDS.md` },
    ],
  },
  {
    id: 6,
    handle: "galarp2005",
    title: "Editor island",
    track: "App UI",
    wave: "C",
    owns: ["/create/", "/kiosk/", "packages/editor/"],
    routes: [
      { href: "/create/kunsthaus-1930-rbby/", label: "Create (probe)" },
      { href: "/kiosk/", label: "Kiosk (scaffold)" },
    ],
    tasks: [
      { id: "U6-T1", summary: "Svelte+SVG on /create/ and /kiosk/ only" },
      { id: "U6-T2", summary: "Liquid-fill free-aspect frame" },
      {
        id: "U6-T7",
        summary: "Plane clip chips (circle / triangle) — silhouette lab, not corpus",
      },
    ],
    outcome:
      "Editor island; liquid-fill; format chips; plane clipPath lab; no node drag.",
    lessons: [
      {
        label: "SVG master session",
        href: `${LESSON}/web-animations/svg-master-session/`,
      },
      { label: "DOM manipulation (S8)", href: `${LESSON}/js-dom-manipulation/` },
      { label: "JS modules (S9)", href: `${LESSON}/js-modules/` },
    ],
    docs: [
      { label: "Svelte 5", href: "https://svelte.dev/docs/svelte/overview" },
      {
        label: "SVG clipPath (MDN)",
        href: "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath",
      },
      {
        label: "Web Animations API (MDN)",
        href: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API",
      },
    ],
    specs: [
      { label: "TEAM-ASSIGNMENTS · Seat 6", href: `${GH}/TEAM-ASSIGNMENTS.md` },
      { label: "PHASE-M6", href: `${GH}/PHASE-M6.md` },
      { label: "D-38 SVG-only + plane clip", href: `${GH}/DECISIONS/D38-2026-11-11-SVG-ONLY-PLANE-CLIP.md` },
      { label: "ISSUE-SEEDS", href: `${GH}/ISSUE-SEEDS.md` },
    ],
  },
  {
    id: 7,
    handle: "PauLAanDReEa-Ai",
    title: "Export / PWA / tokens",
    track: "App UI + Design",
    wave: "A",
    owns: ["packages/tokens/", "export/print/QR", "/design/tokens/"],
    routes: [
      { href: "/design/tokens/", label: "Token specimen (your page)" },
      { href: "/kiosk/", label: "Kiosk / PWA (later)" },
    ],
    tasks: [
      { id: "U7-T1", summary: "Token barrel + type specimen" },
      { id: "U7-T6", summary: "Visual QA on chrome PRs" },
    ],
    outcome: "Token barrel consumption; visual QA; later export/PWA.",
    lessons: [
      { label: "Typography & colour (S4)", href: `${LESSON}/typography-color/` },
    ],
    docs: [
      {
        label: "Web App Manifest",
        href: "https://developer.mozilla.org/en-US/docs/Web/Manifest",
      },
    ],
    specs: [
      { label: "TEAM-ASSIGNMENTS · Seat 7", href: `${GH}/TEAM-ASSIGNMENTS.md` },
      { label: "TOKEN-SYSTEM", href: "https://github.com/ruvebal/mondrian-project/blob/main/docs/style/TOKEN-SYSTEM.md" },
      { label: "ISSUE-SEEDS", href: `${GH}/ISSUE-SEEDS.md` },
    ],
  },
];

export const sharedRules = [
  "Node ≥24.22.1; pnpm check green locally.",
  "Branch lane/<handle>-issue-<n>-<slug> from current main.",
  "Plan under docs/plans/<handle>/; AI Review Log on assisted PRs.",
  "Measure one work in M8 (work.yml + MEASUREMENT.md + rights).",
  "Defend one bound in M9.",
];

export const neverRules = [
  "Museum photos in git",
  "FastAPI from Pages / kiosk",
  "Svelte outside editor routes",
  "Invented proportions",
  "SVG or work JSON in URL query",
  "Encoding a wrong-partition work as neoplastic work.yml (limit case: af Klint Ser III No. 5)",
];

export const theoryHub: Link[] = [
  {
    label: "FE I lessons hub",
    href: "https://ruvebal.github.io/web-atelier-udit/lessons/en/",
  },
  {
    label: "SVG master session",
    href: `${LESSON}/web-animations/svg-master-session/`,
  },
  {
    label: "Student assignment list (repo)",
    href: `${GH}/STUDENT-ASSIGNMENT-LIST.md`,
  },
];

export function seatById(id: number): Seat | undefined {
  return seats.find((seat) => seat.id === id);
}
