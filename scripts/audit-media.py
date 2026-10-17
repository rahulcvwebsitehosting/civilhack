"""Audit every shipped character clip. Requires Python 3 and FFmpeg on PATH."""
import json
import re
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main():
    if not shutil.which("ffprobe") or not shutil.which("ffmpeg"):
        raise SystemExit("Install FFmpeg (including ffprobe) before running media:check.")
    catalog = json.loads((ROOT / "src/data/character-media.json").read_text())
    assert len(catalog) == 10, "Expected ten character clips"
    assert len({clip["id"] for clip in catalog}) == len(catalog), "Duplicate clip IDs"
    for clip in catalog:
        path = ROOT / "public/assets/jjk/media" / (clip["id"] + "-synced.mp4")
        result = subprocess.check_output([
            "ffprobe", "-v", "error", "-show_entries",
            "stream=codec_type,codec_name,start_time,duration:format=duration",
            "-of", "json", str(path)
        ], text=True)
        metadata = json.loads(result)
        video = next(s for s in metadata["streams"] if s["codec_type"] == "video")
        audio = next(s for s in metadata["streams"] if s["codec_type"] == "audio")
        assert video["codec_name"] == "h264", f"{clip['id']}: browser video codec"
        assert audio["codec_name"] == "aac", f"{clip['id']}: browser audio codec"
        assert abs(float(video["start_time"]) - float(audio["start_time"])) < .05, clip["id"]
        assert abs(float(video["duration"]) - float(audio["duration"])) < .12, clip["id"]
        duration = float(metadata["format"]["duration"])
        assert 1 < duration <= clip["maxDuration"], f"{clip['id']}: clip exceeds its approved reveal cut"
        decode = subprocess.run([
            "ffmpeg", "-hide_banner", "-i", str(path), "-af", "volumedetect",
            "-f", "null", "-"
        ], capture_output=True, text=True, check=True)
        mean = re.search(r"mean_volume: (-?[\d.]+) dB", decode.stderr)
        peak = re.search(r"max_volume: (-?[\d.]+) dB", decode.stderr)
        assert mean and peak, f"{clip['id']}: silent or undecodable audio"
        assert float(mean[1]) > -40 and float(peak[1]) > -20, f"{clip['id']}: inaudible soundtrack"
        # Fast-start metadata must precede the video payload for streamed playback.
        container = path.read_bytes()
        assert container.find(b"moov") < container.find(b"mdat"), f"{clip['id']}: missing fast-start layout"
        print(f"PASS {clip['id']}: {duration:.2f}s, aligned AAC/H.264, audible, fully decoded")
    print("All 10 clips passed. This checks media integrity, not subjective dialogue quality.")


if __name__ == "__main__":
    main()
