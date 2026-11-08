from __future__ import annotations

import json
from pathlib import Path

import pytest
import yaml
from mondrian_work_schema import Work, derive_render_plan, vary, write_catalog
from mondrian_work_schema.derive import clamp_line_weight_scale
from pydantic import ValidationError

ROOT = Path(__file__).resolve().parents[2]  # packages/works
FIXTURES = ROOT / "fixtures"
VALID = yaml.safe_load((FIXTURES / "valid.yml").read_text())


def test_valid_work_model() -> None:
    Work.model_validate(VALID)


def test_unknown_point_rejected() -> None:
    doc = yaml.safe_load(
        (FIXTURES / "broken/semantic/unknown-point-reference.yml").read_text()
    )
    with pytest.raises(ValidationError):
        Work.model_validate(doc)


def test_derive_tracks_sum() -> None:
    plan = derive_render_plan(VALID, 1)
    assert abs(sum(t["weight"] for t in plan["xTracks"]) - 1.0) < 1e-9
    assert abs(sum(t["weight"] for t in plan["yTracks"]) - 1.0) < 1e-9
    assert all(i["z"] == 0 for i in plan["items"] if i["kind"] == "plane")
    assert all(i["z"] == 1 for i in plan["items"] if i["kind"] == "line")


def test_clamp_scale() -> None:
    assert clamp_line_weight_scale(VALID, 99) <= 2
    assert clamp_line_weight_scale(VALID, 0.01) == 0.25


def test_vary_involution() -> None:
    once = vary(VALID, "invert-contrast")
    twice = vary(once, "invert-contrast")
    assert [r["role"] for r in twice["geometry"]["rectangles"]] == [
        r["role"] for r in VALID["geometry"]["rectangles"]
    ]


def test_catalog(tmp_path: Path) -> None:
    paths = write_catalog(VALID, tmp_path)
    # 5 MVP variations × (json + svg)
    assert len(paths) == 10
    data = json.loads((tmp_path / f"{VALID['id']}.json").read_text())
    assert data["coordinateSpace"] == "normalized-0-1"
    stems = {p.name for p in paths}
    assert f"{VALID['id']}--invert-rank.json" not in stems
