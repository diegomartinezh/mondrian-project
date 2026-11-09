"""Pure geometric + closed-form weight variations."""

from __future__ import annotations

import copy
from typing import Any


def vary(work: dict[str, Any], variation_id: str) -> dict[str, Any]:
    if variation_id == "original":
        return copy.deepcopy(work)
    if variation_id == "mirror-h":
        return _mirror(work, "x")
    if variation_id == "mirror-v":
        return _mirror(work, "y")
    if variation_id == "rotate-180":
        return _mirror(_mirror(work, "x"), "y")
    if variation_id == "invert-contrast":
        return _invert_contrast(work)
    raise ValueError(f"unknown or omitted MVP variation: {variation_id}")


def _mirror(work: dict[str, Any], axis: str) -> dict[str, Any]:
    out = copy.deepcopy(work)
    pts = out["geometry"]["points"][axis]
    for p in pts:
        p["position"] = 1.0 - p["position"]
    pts.sort(key=lambda p: p["position"])
    for r in out["geometry"]["rectangles"]:
        if axis == "x":
            r["x"] = [r["x"][1], r["x"][0]]
        else:
            r["y"] = [r["y"][1], r["y"][0]]
    _normalize(out)
    return out


def _invert_contrast(work: dict[str, Any]) -> dict[str, Any]:
    out = copy.deepcopy(work)
    flip = {
        "red": "blue",
        "blue": "red",
        "yellow": "yellow",
        "black": "white",
        "white": "black",
        "gray": "gray",
    }
    for r in out["geometry"]["rectangles"]:
        r["role"] = flip.get(r["role"], r["role"])
    return out


def _normalize(work: dict[str, Any]) -> None:
    xm = {p["id"]: p["position"] for p in work["geometry"]["points"]["x"]}
    ym = {p["id"]: p["position"] for p in work["geometry"]["points"]["y"]}
    for r in work["geometry"]["rectangles"]:
        if xm[r["x"][0]] > xm[r["x"][1]]:
            r["x"] = [r["x"][1], r["x"][0]]
        if ym[r["y"][0]] > ym[r["y"][1]]:
            r["y"] = [r["y"][1], r["y"][0]]
    for ln in work["geometry"]["lines"]:
        if ln["orientation"] == "h":
            if xm[ln["extent"][0]] > xm[ln["extent"][1]]:
                ln["extent"] = [ln["extent"][1], ln["extent"][0]]
        elif ym[ln["extent"][0]] > ym[ln["extent"][1]]:
            ln["extent"] = [ln["extent"][1], ln["extent"][0]]
