from typer.testing import CliRunner

from mondrian_analyzer.cli import app

runner = CliRunner()


def test_version() -> None:
    result = runner.invoke(app, ["version"])
    assert result.exit_code == 0
    assert result.stdout.strip() == "0.0.0"


def test_analyze_scaffold_exits_2() -> None:
    result = runner.invoke(
        app,
        [
            "analyze",
            "/tmp/fake.png",
            "--id",
            "demo",
            "--title",
            "Demo",
            "--year",
            "1930",
            "--canvas",
            "450x450",
            "--source",
            "catalogue",
            "--reproduction",
            "https://example.invalid/repro.jpg",
        ],
    )
    assert result.exit_code == 2
    assert "scaffold" in result.stderr
