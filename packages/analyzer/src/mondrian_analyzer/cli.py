"""M4 scaffold CLI — seat 1 owns the real pipeline.

This entry point documents the contract from PHASE-M4.md without implementing
classical extraction (that is graded Analyzer-lane work).
"""

from __future__ import annotations

import json
import sys
from typing import Optional

import typer

app = typer.Typer(
    add_completion=False,
    help="Neoplastix classical analyzer (M4). Scaffold stub — implement in seat 1.",
)


@app.command()
def analyze(
    image: str = typer.Argument(..., help="Path to reproduction raster (not committed)."),
    id: str = typer.Option(..., "--id", help="Work slug."),
    title: str = typer.Option(..., "--title"),
    year: int = typer.Option(..., "--year"),
    canvas: str = typer.Option(..., "--canvas", help="e.g. 450x450"),
    unit: str = typer.Option("mm", "--unit"),
    source: str = typer.Option(..., "--source"),
    reproduction: str = typer.Option(..., "--reproduction"),
    out: str = typer.Option("work.yml", "--out"),
    roles: str = typer.Option("classical", "--roles"),
) -> None:
    """Emit schema-valid work.yml — not implemented in scaffold."""
    typer.echo(
        json.dumps(
            {
                "status": "scaffold",
                "message": "Seat 1 implements classical analyze per PHASE-M4.md (neoplastix-analyzer)",
                "image": image,
                "id": id,
                "title": title,
                "year": year,
                "canvas": canvas,
                "unit": unit,
                "source": source,
                "reproduction": reproduction,
                "out": out,
                "roles": roles,
            }
        ),
        err=True,
    )
    raise typer.Exit(code=2)


@app.command()
def evaluate(
    work: str = typer.Argument(..., help="Candidate work.yml"),
    against: str = typer.Option(..., "--against", help="Hand-measured ground truth"),
) -> None:
    """Print per-primitive errors — not implemented in scaffold."""
    typer.echo(
        json.dumps(
            {
                "status": "scaffold",
                "message": "Seat 1 implements evaluate per PHASE-M4.md",
                "work": work,
                "against": against,
            }
        ),
        err=True,
    )
    raise typer.Exit(code=2)


@app.command("version")
def version_cmd() -> None:
    from mondrian_analyzer import __version__

    typer.echo(__version__)


def main(argv: Optional[list[str]] = None) -> None:
    app(args=argv)


if __name__ == "__main__":
    main(sys.argv[1:])
