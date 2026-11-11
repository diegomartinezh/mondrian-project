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
    clips: list[str] = []
    bodies: list[str] = []
    for it in items:
        x0, y0 = it["x0"], it["y0"]
        w = it["x1"] - x0
        h = it["y1"] - y0
        clip = it.get("clip") or {}
        shape = clip.get("shape")
        clip_attr = ""
        if shape and shape != "rect":
            cid = f"clip-{it['id']}"
            clips.append(_clip_def(cid, shape, x0, y0, w, h))
            clip_attr = f' clip-path="url(#{cid})"'
        bodies.append(
            f'<rect data-kind="{it["kind"]}" data-role="{it["role"]}" data-id="{it["id"]}" '
            f'x="{x0:.9f}" y="{y0:.9f}" width="{w:.9f}" height="{h:.9f}" '
            f'class="{"line" if it["kind"] == "line" else "plane"}"{clip_attr}/>'
        )
    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" width="100%" height="100%">'
    ]
    if clips:
        parts.append(f"<defs>{''.join(clips)}</defs>")
    parts.extend(bodies)
    parts.append("</svg>")
    return "".join(parts)


def _clip_def(cid: str, shape: str, x: float, y: float, w: float, h: float) -> str:
    if shape == "circle":
        cx, cy, r = x + w / 2, y + h / 2, min(w, h) / 2
        return (
            f'<clipPath id="{cid}" clipPathUnits="userSpaceOnUse">'
            f'<circle cx="{cx:.9f}" cy="{cy:.9f}" r="{r:.9f}"/></clipPath>'
        )
    mid = x + w / 2
    return (
        f'<clipPath id="{cid}" clipPathUnits="userSpaceOnUse">'
        f'<polygon points="{mid:.9f},{y:.9f} {x + w:.9f},{y + h:.9f} {x:.9f},{y + h:.9f}"/>'
        f"</clipPath>"
    )
