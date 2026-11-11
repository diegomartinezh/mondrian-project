"""JS-parity render-plan derivation."""

from __future__ import annotations

from typing import Any


def max_line_weight_scale(work: dict[str, Any]) -> float:
    max_s = 2.0
    xm, ym = _maps(work)
    for ln in work["geometry"]["lines"]:
        c = _center(xm, ym, ln)
        tau = ln["thickness"]
        max_s = min(max_s, (2.0 * min(c, 1.0 - c)) / tau)
    by: dict[str, list[dict[str, float]]] = {"h": [], "v": []}
    for ln in work["geometry"]["lines"]:
        e0, e1 = _extent(xm, ym, ln)
        by[ln["orientation"]].append(
            {"c": _center(xm, ym, ln), "tau": ln["thickness"], "e0": e0, "e1": e1}
        )
    for arr in by.values():
        for i, a in enumerate(arr):
            for b in arr[i + 1 :]:
                if min(a["e1"], b["e1"]) - max(a["e0"], b["e0"]) <= 0:
                    continue
                max_s = min(max_s, (2.0 * abs(a["c"] - b["c"])) / (a["tau"] + b["tau"]))
    return max(0.25, max_s)


def clamp_line_weight_scale(work: dict[str, Any], requested: float = 1.0) -> float:
    mx = max_line_weight_scale(work)
    r = requested if isinstance(requested, (int, float)) else 1.0
    return min(mx, max(0.25, float(r)))


def derive_render_plan(
    work: dict[str, Any], line_weight_scale: float = 1.0
) -> dict[str, Any]:
    scale = clamp_line_weight_scale(work, line_weight_scale)
    xm, ym = _maps(work)
    x_tracks = _tracks(_edges(work, xm, ym, scale, "x"))
    y_tracks = _tracks(_edges(work, xm, ym, scale, "y"))
    planes = []
    for r in work["geometry"]["rectangles"]:
        item = {
            "kind": "plane",
            "id": r["id"],
            "role": r["role"],
            "x0": xm[r["x"][0]],
            "x1": xm[r["x"][1]],
            "y0": ym[r["y"][0]],
            "y1": ym[r["y"][1]],
            "z": 0,
        }
        clip = r.get("clip") or {}
        shape = clip.get("shape")
        if shape and shape != "rect":
            item["clip"] = {"shape": shape}
        planes.append(item)
    lines = []
    for ln in work["geometry"]["lines"]:
        c = _center(xm, ym, ln)
        half = (scale * ln["thickness"]) / 2.0
        e0, e1 = _extent(xm, ym, ln)
        if ln["orientation"] == "h":
            lines.append(
                {
                    "kind": "line",
                    "id": ln["id"],
                    "role": "black",
                    "orientation": "h",
                    "x0": e0,
                    "x1": e1,
                    "y0": c - half,
                    "y1": c + half,
                    "z": 1,
                }
            )
        else:
            lines.append(
                {
                    "kind": "line",
                    "id": ln["id"],
                    "role": "black",
                    "orientation": "v",
                    "x0": c - half,
                    "x1": c + half,
                    "y0": e0,
                    "y1": e1,
                    "z": 1,
                }
            )
    return {
        "coordinateSpace": "normalized-0-1",
        "lineWeightScale": scale,
        "xTracks": x_tracks,
        "yTracks": y_tracks,
        "items": planes + lines,
    }


def _maps(work: dict[str, Any]) -> tuple[dict[str, float], dict[str, float]]:
    xm = {p["id"]: p["position"] for p in work["geometry"]["points"]["x"]}
    ym = {p["id"]: p["position"] for p in work["geometry"]["points"]["y"]}
    return xm, ym


def _center(xm: dict[str, float], ym: dict[str, float], ln: dict[str, Any]) -> float:
    return ym[ln["center"]] if ln["orientation"] == "h" else xm[ln["center"]]


def _extent(
    xm: dict[str, float], ym: dict[str, float], ln: dict[str, Any]
) -> tuple[float, float]:
    if ln["orientation"] == "h":
        return xm[ln["extent"][0]], xm[ln["extent"][1]]
    return ym[ln["extent"][0]], ym[ln["extent"][1]]


def _edges(
    work: dict[str, Any],
    xm: dict[str, float],
    ym: dict[str, float],
    scale: float,
    axis: str,
) -> list[float]:
    edges = {0.0, 1.0}
    for p in work["geometry"]["points"][axis]:
        edges.add(p["position"])
    for r in work["geometry"]["rectangles"]:
        if axis == "x":
            edges.add(xm[r["x"][0]])
            edges.add(xm[r["x"][1]])
        else:
            edges.add(ym[r["y"][0]])
            edges.add(ym[r["y"][1]])
    for ln in work["geometry"]["lines"]:
        c = _center(xm, ym, ln)
        half = (scale * ln["thickness"]) / 2.0
        e0, e1 = _extent(xm, ym, ln)
        if ln["orientation"] == "h":
            if axis == "y":
                edges.add(c - half)
                edges.add(c + half)
            else:
                edges.add(e0)
                edges.add(e1)
        elif axis == "x":
            edges.add(c - half)
            edges.add(c + half)
        else:
            edges.add(e0)
            edges.add(e1)
    return list(edges)


def _tracks(raw: list[float]) -> list[dict[str, float]]:
    uniq: list[float] = []
    for v in sorted(max(0.0, min(1.0, x)) for x in raw):
        if not uniq or abs(v - uniq[-1]) > 1e-9:
            uniq.append(v)
    if uniq[0] != 0.0:
        uniq.insert(0, 0.0)
    if uniq[-1] != 1.0:
        uniq.append(1.0)
    out = []
    for i in range(len(uniq) - 1):
        w = uniq[i + 1] - uniq[i]
        if w > 1e-12:
            out.append({"start": uniq[i], "end": uniq[i + 1], "weight": w})
    return out
