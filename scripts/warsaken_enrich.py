#!/usr/bin/env python3
"""
warsaken_enrich.py -- fetch all Warsaken cards from the WAX blockchain,
run vision OCR on each card image, and produce enriched.json compatible
with the Warsaken Companion artifact.

REQUIREMENTS
------------
    pip install anthropic requests pillow

USAGE
-----
    export ANTHROPIC_API_KEY="sk-ant-..."
    python warsaken_enrich.py                    # full run, sets 000-002
    python warsaken_enrich.py --set 001          # one set only
    python warsaken_enrich.py --limit 10         # smoke-test on 10 cards
    python warsaken_enrich.py --resume           # skip cards already in enriched.json
    python warsaken_enrich.py --concurrency 5    # parallel OCR (default 3)

OUTPUT
------
    enriched.json   -- array of card records matching the artifact's schema
    ocr_log.jsonl   -- per-card log line, useful for debugging
    images/         -- cached card images (skipped if present)

COST ESTIMATE
-------------
    Claude Sonnet vision: ~$0.005 per card -> ~$3.30 for full 659-card run.
    Use --model claude-3-5-haiku-latest to cut cost ~5x.

WORKFLOW
--------
    1. Pulls every template from https://wax.api.atomicassets.io
    2. Filters to playable game cards (set 000-002, types Force/Leader/etc.)
    3. Downloads each card's full-art image from wrskn.io (cached locally)
    4. Sends image to Claude vision with a strict JSON-output prompt
    5. Validates output against the schema; logs failures
    6. Writes enriched.json -- copy this into warsaken-companion.jsx,
       replacing the ENRICHED constant.
"""
from __future__ import annotations

import argparse
import base64
import json
import os
import re
import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

try:
    from anthropic import Anthropic
except ImportError:
    print("ERROR: pip install anthropic requests pillow", file=sys.stderr)
    sys.exit(1)


# ============================================================================
# CONFIG
# ============================================================================
ATOMIC_API = "https://wax.api.atomicassets.io/atomicassets/v1/templates"
COLLECTION = "warsaken"
IMG_BASE = "https://wrskn.io"  # https://wrskn.io/{set}/full/{card}
GAME_TYPES = {
    "Force", "Territory", "Building", "Leader",
    "Intel", "WMD", "Morale", "Weather", "G Force",
    "Upgrade", "Resource",
}
GAME_SETS = {"000", "001", "002"}

CACHE_DIR = Path("./images")
ENRICHED_FILE = Path("./enriched.json")
LOG_FILE = Path("./ocr_log.jsonl")


# ============================================================================
# CARD SCHEMA -- what each enriched card looks like, matching the artifact
# ============================================================================
SCHEMA_PROMPT = """You are reading a Warsaken trading card game card. Extract ALL game data
from the image and return a SINGLE JSON object with EXACTLY these fields:

{
  "id": "string -- set-card e.g. '001-055' (provided in user message)",
  "cost": "integer cooldown timer (the number top-left), or null for Leaders/Territories",
  "costIcons": ["array of resource icon codes in deploy cost"],
  "atk": "integer attack value (left number in the type bar), or null for WMD/Intel/Morale/Weather",
  "hp": "integer health value (right number in the type bar, in yellow box), or null for WMD/Intel/Morale/Weather",
  "morale": "integer START MORALE for Leaders, null otherwise",
  "subtype": "string -- the right-side label after type, e.g. 'ARMY : MECH', 'SOLDIER : HEAVY', 'NUCLEAR', or null",
  "keywords": ["array of UPPERCASE ability keyword names appearing in the rules box, e.g. ['BLITZ','STEALTH','ARMORED']"],
  "abilities": [
    {"type": "cooldown|keyword|named|passive",
     "cost": "int (only for cooldown abilities)",
     "name": "string ability name in caps, or null for plain passives starting with *",
     "text": "string full rules text"}
  ],
  "produces": ["array of resource codes this Territory produces per turn, or null"],
  "playRequirement": "string play condition shown in red text at bottom, or null",
  "flavor": "string italic flavor text below rules box, or null",
  "loseEffect": "string red text in bottom area like 'LOSE THE GAME IF ELIMINATED' or '-N MORALE IF ELIMINATED', or null"
}

ICON CODES for costIcons and produces:
  "G"  = generic (white/black star icon)
  "F"  = food (green apple icon)
  "P"  = power (yellow lightning bolt in dark circle)
  "Fu" = fuel (red jerry can icon)
  "M"  = metal/equipment (blue gear icon)

For "OR" choice on territories like "FOOD, FUEL", use combined codes like "F|Fu".

ABILITY TYPES:
  "cooldown" -- appears as cooldown : NAME format. Always set "cost" to N.
  "keyword"  -- appears as KEYWORD followed by description (e.g. BLITZ Excess damage...)
  "named"    -- non-keyword named ability with no cooldown timer (e.g. NUCLEAR DETONATION on a WMD)
  "passive"  -- starts with * and has no name (raw passive text). Set name to null.

Return ONLY the JSON object. No markdown, no commentary, no code fences."""


# ============================================================================
# DATA FETCHING
# ============================================================================
def fetch_all_templates() -> list[dict]:
    """Pull all templates from AtomicAssets, paging until exhausted."""
    print("Fetching templates from AtomicAssets...", file=sys.stderr)
    out: list[dict] = []
    page = 1
    while True:
        url = f"{ATOMIC_API}?collection_name={COLLECTION}&limit=1000&page={page}"
        req = urllib.request.Request(url, headers={"User-Agent": "warsaken-enrich/1.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = json.loads(r.read())
        if not data.get("success"):
            raise RuntimeError(f"AtomicAssets error: {data}")
        chunk = data.get("data", [])
        if not chunk:
            break
        out.extend(chunk)
        print(f"  page {page}: +{len(chunk)} (total {len(out)})", file=sys.stderr)
        if len(chunk) < 1000:
            break
        page += 1
        if page > 20:
            print("  page limit reached, stopping", file=sys.stderr)
            break
    return out


def filter_to_unique_game_cards(templates: list[dict], allowed_sets: set[str]) -> list[dict]:
    """Dedupe templates to one per (setid, cardid), preferring 'Full Art' subset."""
    by_card: dict[str, list[dict]] = {}
    for t in templates:
        d = t.get("immutable_data", {})
        if d.get("type") not in GAME_TYPES:
            continue
        if d.get("setid") not in allowed_sets:
            continue
        key = f"{d.get('setid','?')}-{d.get('cardid','?')}"
        by_card.setdefault(key, []).append(t)

    priority = ["Full Art", "Full Art Medal", "Base", "Promo"]

    def rank(t: dict) -> int:
        s = t.get("immutable_data", {}).get("subset", "")
        return priority.index(s) if s in priority else 99

    out = []
    for key, variants in by_card.items():
        variants.sort(key=rank)
        d = variants[0]["immutable_data"]
        out.append({
            "id": f"{d.get('setid','?')}-{d.get('cardid','?')}",
            "name": d.get("name", ""),
            "setid": d.get("setid", ""),
            "cardid": d.get("cardid", ""),
            "type": d.get("type", ""),
            "rarity": d.get("rarity", ""),
            "img": d.get("img", ""),
        })
    out.sort(key=lambda c: (c["setid"], int(c["cardid"]) if c["cardid"].isdigit() else 9999))
    return out


# ============================================================================
# IMAGE FETCHING
# ============================================================================
def image_path_for(card: dict) -> Path:
    return CACHE_DIR / f"{card['id']}.png"


def download_image(card: dict) -> bytes | None:
    """Fetch card image, with on-disk caching."""
    path = image_path_for(card)
    if path.exists() and path.stat().st_size > 1000:
        return path.read_bytes()
    url = f"{IMG_BASE}/{card['setid']}/full/{card['cardid']}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "warsaken-enrich/1.0"})
        with urllib.request.urlopen(req, timeout=15) as r:
            data = r.read()
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
        return data
    except Exception as e:
        log_event({"id": card["id"], "stage": "download", "error": str(e)})
        return None


# ============================================================================
# OCR via Claude Vision
# ============================================================================
def ocr_one(client: Anthropic, model: str, card: dict, image_bytes: bytes) -> dict | None:
    """Run a single card through Claude vision."""
    media_type = "image/png"
    # webp images from wrskn.io still come back with .png extension; detect from header
    if image_bytes[:4] == b"RIFF" and image_bytes[8:12] == b"WEBP":
        media_type = "image/webp"
    elif image_bytes[:3] == b"\xff\xd8\xff":
        media_type = "image/jpeg"

    img_b64 = base64.standard_b64encode(image_bytes).decode("ascii")

    user_text = (
        f"Card ID: {card['id']}\n"
        f"Name (for sanity check): {card['name']}\n"
        f"Type (for sanity check): {card['type']}\n\n"
        "Extract the JSON now."
    )

    try:
        msg = client.messages.create(
            model=model,
            max_tokens=2000,
            system=SCHEMA_PROMPT,
            messages=[{
                "role": "user",
                "content": [
                    {"type": "image", "source": {"type": "base64",
                                                  "media_type": media_type,
                                                  "data": img_b64}},
                    {"type": "text", "text": user_text},
                ],
            }],
        )
    except Exception as e:
        log_event({"id": card["id"], "stage": "api", "error": str(e)})
        return None

    text = "".join(b.text for b in msg.content if hasattr(b, "text")).strip()
    # Strip code fences if the model added them despite instructions
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)

    try:
        parsed = json.loads(text)
    except json.JSONDecodeError as e:
        log_event({"id": card["id"], "stage": "parse", "error": str(e), "raw": text[:500]})
        return None

    parsed["id"] = card["id"]  # always trust our id, not the model's
    return parsed


def validate(record: dict) -> list[str]:
    """Return a list of issues with the OCR'd record. Empty list = clean."""
    issues = []
    required = ["id", "cost", "atk", "hp", "morale", "subtype", "keywords",
                "abilities", "flavor", "loseEffect"]
    for f in required:
        if f not in record:
            issues.append(f"missing field: {f}")
    if "abilities" in record and not isinstance(record["abilities"], list):
        issues.append("abilities is not a list")
    if "keywords" in record and not isinstance(record["keywords"], list):
        issues.append("keywords is not a list")
    if "costIcons" in record and not isinstance(record.get("costIcons"), (list, type(None))):
        issues.append("costIcons is not a list or null")
    return issues


# ============================================================================
# LOG / RESUME
# ============================================================================
def log_event(payload: dict) -> None:
    payload["ts"] = time.time()
    with LOG_FILE.open("a") as f:
        f.write(json.dumps(payload) + "\n")


def load_existing() -> dict[str, dict]:
    if not ENRICHED_FILE.exists():
        return {}
    try:
        data = json.loads(ENRICHED_FILE.read_text())
        return {r["id"]: r for r in data if "id" in r}
    except Exception:
        return {}


def save_all(records: dict[str, dict]) -> None:
    sorted_records = sorted(records.values(), key=lambda r: r["id"])
    ENRICHED_FILE.write_text(json.dumps(sorted_records, indent=2))


# ============================================================================
# MAIN
# ============================================================================
def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--set", action="append", help="Limit to specific set (000/001/002). Repeatable.")
    parser.add_argument("--limit", type=int, default=None, help="Process only first N cards (smoke test).")
    parser.add_argument("--resume", action="store_true", help="Skip cards already in enriched.json.")
    parser.add_argument("--model", default="claude-sonnet-4-20250514",
                        help="Anthropic model. Use claude-3-5-haiku-latest for cheaper run.")
    parser.add_argument("--concurrency", type=int, default=3, help="Parallel OCR workers.")
    parser.add_argument("--save-every", type=int, default=20, help="Persist enriched.json every N cards.")
    args = parser.parse_args()

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("ERROR: set ANTHROPIC_API_KEY in your environment.", file=sys.stderr)
        return 1

    allowed_sets = set(args.set) if args.set else GAME_SETS

    # Step 1: list cards
    templates = fetch_all_templates()
    cards = filter_to_unique_game_cards(templates, allowed_sets)
    print(f"Found {len(cards)} unique game cards across sets {sorted(allowed_sets)}.", file=sys.stderr)

    # Step 2: load existing if resuming
    enriched = load_existing()
    if args.resume:
        before = len(cards)
        cards = [c for c in cards if c["id"] not in enriched]
        print(f"Resume: skipping {before - len(cards)} already-enriched cards.", file=sys.stderr)

    if args.limit:
        cards = cards[: args.limit]
        print(f"Limited to first {len(cards)} cards (smoke test).", file=sys.stderr)

    if not cards:
        print("Nothing to do.", file=sys.stderr)
        save_all(enriched)
        return 0

    # Step 3: process
    client = Anthropic(api_key=api_key)
    print(f"Starting OCR with model={args.model}, concurrency={args.concurrency}", file=sys.stderr)

    processed = 0
    failed = 0

    def work(card: dict):
        img = download_image(card)
        if img is None:
            return card, None, ["download failed"]
        rec = ocr_one(client, args.model, card, img)
        if rec is None:
            return card, None, ["OCR returned None"]
        issues = validate(rec)
        return card, rec, issues

    with ThreadPoolExecutor(max_workers=args.concurrency) as pool:
        futures = {pool.submit(work, c): c for c in cards}
        for fut in as_completed(futures):
            card, rec, issues = fut.result()
            processed += 1
            if rec and not issues:
                enriched[card["id"]] = rec
                log_event({"id": card["id"], "stage": "ok", "name": card["name"]})
            else:
                failed += 1
                log_event({"id": card["id"], "stage": "fail", "issues": issues})
            print(f"  [{processed}/{len(cards)}] {card['id']} {card['name'][:40]:40} "
                  f"{'OK' if rec and not issues else 'FAIL: ' + ', '.join(issues[:2])}",
                  file=sys.stderr)
            if processed % args.save_every == 0:
                save_all(enriched)

    save_all(enriched)
    print(f"\nDone. {processed - failed}/{processed} succeeded. Output: {ENRICHED_FILE}",
          file=sys.stderr)
    print(f"Total enriched cards now in dataset: {len(enriched)}", file=sys.stderr)
    print("\nDrop the contents of enriched.json into the ENRICHED constant in", file=sys.stderr)
    print("warsaken-companion.jsx and you have a complete dataset.", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
