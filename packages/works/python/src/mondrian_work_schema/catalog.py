"""Emit public/patterns/<id>.json|.svg and variation artefacts."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .derive import derive_render_plan
from .vary import vary

# MVP catalog: geometric + invert-contrast only. Weight remaps
# (invert-rank/complement/reciprocal/equalize) omitted until closed-form
# area rewrite is documented (PHASE-M2 prompt: no invented proportions).
VARIATIONS = [
    "original",
    "mirror-h",
    "mirror-v",
    "rotate-180",
    "invert-contrast",
]


def write_catalog(work: dict[str, Any], out_dir: Path) -> list[Path]:
    out_dir.mkdir(parents=True, exist_ok=True)
    written: list[Path] = []
    wid = work["id"]
    for vid in VARIATIONS:
        w = vary(work, vid)
        plan = derive_render_plan(w, 1.0)
        stem = wid if vid == "original" else f"{wid}--{vid}"
        jp = out_dir / f"{stem}.json"
        sp = out_dir / f"{stem}.svg"
        jp.write_text(json.dumps(plan, separators=(",", ":"), allow_nan=False))
        sp.write_text(_svg(plan))
        written.extend([jp, sp])
    return written


def _svg(plan: dict[str, Any]) -> str:
    items = sorted(plan["items"], key=lambda it: (it["z"], it["id"]))
    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" width="100%" height="100%">'
    ]
    for it in items:
        parts.append(
            f'<rect data-kind="{it["kind"]}" data-role="{it["role"]}" data-id="{it["id"]}" '
            f'x="{it["x0"]:.9f}" y="{it["y0"]:.9f}" '
            f'width="{it["x1"] - it["x0"]:.9f}" height="{it["y1"] - it["y0"]:.9f}" '
            f'class="{"line" if it["kind"] == "line" else "plane"}"/>'
        )
    parts.append("</svg>")
    return "".join(parts)
