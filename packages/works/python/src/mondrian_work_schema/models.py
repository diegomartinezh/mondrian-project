"""Pydantic mirror of work.schema.json (semantic checks in validate-style helpers)."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator

Role = Literal["red", "yellow", "blue", "black", "white", "gray"]


class AxisPoint(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id: str
    position: float = Field(ge=0, le=1)


class Rectangle(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id: str
    x: list[str] = Field(min_length=2, max_length=2)
    y: list[str] = Field(min_length=2, max_length=2)
    role: Role


class Line(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id: str
    orientation: Literal["h", "v"]
    center: str
    extent: list[str] = Field(min_length=2, max_length=2)
    thickness: float = Field(gt=0, le=0.25)


class Geometry(BaseModel):
    model_config = ConfigDict(extra="forbid")
    coordinateSpace: Literal["normalized-0-1"]
    points: dict[str, list[AxisPoint]]
    rectangles: list[Rectangle] = Field(min_length=1)
    lines: list[Line] = Field(min_length=1)


class Measured(BaseModel):
    model_config = ConfigDict(extra="forbid")
    h: float = Field(ge=0, lt=360)
    s: float = Field(ge=0, le=100)
    l: float = Field(ge=0, le=100)


class Swatch(BaseModel):
    model_config = ConfigDict(extra="forbid")
    measured: Measured


class Crop(BaseModel):
    model_config = ConfigDict(extra="forbid")
    x0: float
    y0: float
    x1: float
    y1: float


class Reproduction(BaseModel):
    model_config = ConfigDict(extra="forbid")
    source: str
    px_w: int
    px_h: int
    crop: Crop


class Review(BaseModel):
    model_config = ConfigDict(extra="forbid")
    status: Literal["proposal", "accepted"]
    reviewed_by: str | None = None
    date: str | None = None


class Provenance(BaseModel):
    model_config = ConfigDict(extra="forbid")
    method: Literal["hand", "analyzer", "external"]
    reproduction: Reproduction
    review: Review
    measured_by: str | None = None
    date: str | None = None
    analyzer_version: str | None = None
    run_at: str | None = None
    dataset: str | None = None
    citation: str | None = None
    record_id: str | None = None
    license: str | None = None
    imported_by: str | None = None

    @model_validator(mode="after")
    def _payload(self) -> Provenance:
        if self.method == "hand" and (not self.measured_by or not self.date):
            raise ValueError("hand provenance requires measured_by and date")
        if self.method == "analyzer" and (
            not self.analyzer_version or not self.run_at
        ):
            raise ValueError("analyzer provenance requires analyzer_version and run_at")
        if self.method == "external":
            need = [
                self.dataset,
                self.citation,
                self.record_id,
                self.license,
                self.imported_by,
                self.date,
            ]
            if not all(need):
                raise ValueError("external provenance incomplete")
        if self.review.status == "accepted" and (
            not self.review.reviewed_by or not self.review.date
        ):
            raise ValueError("accepted review requires reviewed_by and date")
        return self


class Source(BaseModel):
    model_config = ConfigDict(extra="forbid")
    collection: str
    inventory: str
    catalogueNote: str | None = None


class Canvas(BaseModel):
    model_config = ConfigDict(extra="forbid")
    width: float
    height: float
    unit: Literal["mm", "cm", "in"]


class Rights(BaseModel):
    model_config = ConfigDict(extra="forbid")
    eu: str
    us: str
    checked_by: str
    date: str
    credit: str | None = None


class Work(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id: str
    title: str
    year: int
    source: Source
    canvas: Canvas
    geometry: Geometry
    provenance: Provenance
    rights: Rights
    uncertainty: dict[str, Any] | None = None
    swatches: dict[str, Swatch]

    @model_validator(mode="after")
    def _semantic(self) -> Work:
        # mirrors JS validateWork first-path spirit
        for axis in ("x", "y"):
            pts = self.geometry.points.get(axis) or []
            if len(pts) < 2:
                raise ValueError(f"geometry.points.{axis}")
            ids: set[str] = set()
            prev = -1.0
            has0 = has1 = False
            for p in pts:
                if p.id in ids:
                    raise ValueError(f"geometry.points.{axis}")
                ids.add(p.id)
                if p.position <= prev:
                    raise ValueError(f"geometry.points.{axis}")
                prev = p.position
                has0 |= p.position == 0
                has1 |= p.position == 1
            if not (has0 and has1):
                raise ValueError(f"geometry.points.{axis}")
        xm = {p.id: p.position for p in self.geometry.points["x"]}
        ym = {p.id: p.position for p in self.geometry.points["y"]}
        chromatic = 0
        planes: list[tuple[float, float, float, float, int]] = []
        for i, r in enumerate(self.geometry.rectangles):
            for pid in r.x:
                if pid not in xm:
                    raise ValueError("geometry.rectangles")
            for pid in r.y:
                if pid not in ym:
                    raise ValueError("geometry.rectangles")
            x0, x1 = xm[r.x[0]], xm[r.x[1]]
            y0, y1 = ym[r.y[0]], ym[r.y[1]]
            if x0 >= x1 or y0 >= y1:
                raise ValueError("geometry.rectangles")
            if r.role in ("red", "yellow", "blue"):
                chromatic += 1
            if r.role != "white" and r.role not in self.swatches:
                raise ValueError(f"swatches.{r.role}")
            if r.role != "white":
                planes.append((x0, x1, y0, y1, i))
        if chromatic < 1:
            raise ValueError("geometry.rectangles")
        for a in range(len(planes)):
            for b in range(a + 1, len(planes)):
                ax0, ax1, ay0, ay1, _ = planes[a]
                bx0, bx1, by0, by1, bi = planes[b]
                ox = min(ax1, bx1) - max(ax0, bx0)
                oy = min(ay1, by1) - max(ay0, by0)
                if ox > 1e-12 and oy > 1e-12:
                    raise ValueError(f"geometry.rectangles[{bi}]")
        if not self.geometry.lines:
            raise ValueError("geometry.lines")
        parallels: dict[str, list[tuple[float, float, float, float]]] = {
            "h": [],
            "v": [],
        }
        for ln in self.geometry.lines:
            if ln.orientation == "h":
                if ln.center not in ym or any(e not in xm for e in ln.extent):
                    raise ValueError("geometry.lines")
                if xm[ln.extent[0]] >= xm[ln.extent[1]]:
                    raise ValueError("geometry.lines")
                c = ym[ln.center]
                e0, e1 = xm[ln.extent[0]], xm[ln.extent[1]]
            else:
                if ln.center not in xm or any(e not in ym for e in ln.extent):
                    raise ValueError("geometry.lines")
                if ym[ln.extent[0]] >= ym[ln.extent[1]]:
                    raise ValueError("geometry.lines")
                c = xm[ln.center]
                e0, e1 = ym[ln.extent[0]], ym[ln.extent[1]]
            half = ln.thickness / 2.0
            if c - half < -1e-12 or c + half > 1.0 + 1e-12:
                raise ValueError("geometry.lines")
            parallels[ln.orientation].append((c, half, e0, e1))
        for arr in parallels.values():
            for i, a in enumerate(arr):
                for b in arr[i + 1 :]:
                    if min(a[3], b[3]) - max(a[2], b[2]) <= 0:
                        continue
                    if abs(a[0] - b[0]) < a[1] + b[1] - 1e-12:
                        raise ValueError("geometry.lines")
        return self
