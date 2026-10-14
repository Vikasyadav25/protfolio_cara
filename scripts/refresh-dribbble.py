#!/usr/bin/env python3
"""Refresh the portfolio's public Dribbble snapshot using Python's standard library."""

import datetime
import json
from pathlib import Path
import re
import sys
import tempfile
import urllib.request


SOURCE = "https://dribbble.com/vanshikapandey05"
ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT / "dist" / "dribbble-stats.js"


def fetch_snapshot():
    request = urllib.request.Request(
        SOURCE, headers={"User-Agent": "Mozilla/5.0", "Accept": "text/html"}
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        if response.status != 200:
            raise ValueError(f"Dribbble returned HTTP {response.status}")
        html = response.read(8_000_001)
    if len(html) > 8_000_000:
        raise ValueError("Dribbble response exceeded the expected page size")

    html = html.decode("utf-8")
    marker = re.search(r"\bvar\s+newestShots\s*=\s*", html)
    if not marker:
        raise ValueError("Dribbble's public shot data was not found")
    entries, _ = json.JSONDecoder().raw_decode(html[marker.end():])
    if not isinstance(entries, list) or not entries:
        raise ValueError("Dribbble returned an empty or invalid shot list")

    shots = {}
    for entry in entries:
        shot_id = str(entry["id"])
        views = str(entry["view_count"])
        likes = str(entry["likes_count"]).replace(",", "")
        if not shot_id.isdigit() or shot_id in shots:
            raise ValueError(f"Invalid or duplicated shot ID: {shot_id}")
        if not re.fullmatch(r"[0-9][0-9,]*(?:\.[0-9]+)?[kKmM]?", views):
            raise ValueError(f"Unexpected view count for shot {shot_id}: {views}")
        if not likes.isdigit():
            raise ValueError(f"Likes for shot {shot_id} are not an exact integer")
        shots[shot_id] = {"views": views, "likes": int(likes)}

    # Refuse an incomplete response so a challenge page or pagination change
    # cannot replace the existing snapshot with missing portfolio counts.
    work_data = (ROOT / "dist" / "work-data.js").read_text(encoding="utf-8")
    archive = re.search(r"\bdribbble:\s*\[(.*?)\n\s*\]", work_data, re.DOTALL)
    if not archive:
        raise ValueError("The portfolio's Dribbble archive was not found")
    expected_ids = set(re.findall(r"['\"]([0-9]+)-", archive.group(1)))
    if not expected_ids:
        raise ValueError("The portfolio's Dribbble archive has no shot IDs")
    missing_ids = expected_ids - shots.keys()
    if missing_ids:
        raise ValueError("Snapshot is missing shots: " + ", ".join(sorted(missing_ids)))

    return {
        "date": datetime.date.today().isoformat(),
        "source": SOURCE,
        "shots": shots,
    }


def main():
    temporary_path = None
    try:
        snapshot = fetch_snapshot()
        content = (
            "// Public Dribbble snapshot. View counts retain Dribbble's rounding.\n"
            "// Refresh with: python scripts/refresh-dribbble.py\n"
            "window.dribbbleStats = "
            + json.dumps(snapshot, ensure_ascii=False, indent=2)
            + ";\n"
        )
        with tempfile.NamedTemporaryFile(
            mode="w", encoding="utf-8", newline="\n", dir=DESTINATION.parent,
            prefix=".dribbble-stats-", suffix=".tmp", delete=False
        ) as temporary:
            temporary_path = Path(temporary.name)
            temporary.write(content)
        temporary_path.replace(DESTINATION)
        print(f"Updated {len(snapshot['shots'])} shots ({snapshot['date']}): {DESTINATION}")
        return 0
    except (OSError, ValueError, KeyError, TypeError) as error:
        print(f"Dribbble refresh failed; previous snapshot preserved: {error}", file=sys.stderr)
        return 1
    finally:
        if temporary_path is not None:
            temporary_path.unlink(missing_ok=True)


if __name__ == "__main__":
    sys.exit(main())
