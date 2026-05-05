# Warsaken Companion

Mobile-first card browser, deck builder, and AI deck composer for the Warsaken trading card game (sets 000-002).

## Features

- **Browse**: searchable, filterable card list (type, set, rarity) with full-art card detail views
- **Deck**: build, save, rename, import/export, and validate decks against the official rules
- **AI**: two builders -- Recipe (curated official decks) and Novel (visible reasoning, theme + leader-driven composition)
- **Synergy**: keyword-graph explorer with combo scoring, counters, and per-card synergy breakdowns
- **Rules**: searchable rulebook excerpts (keywords, deck rules, etc.)

Decks persist to `localStorage` via a tiny `window.storage` shim.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build
```

## Updating card data

The `CARDS`, `RULES`, `ENRICHED`, `RECIPES`, and `SYN` constants live inline in `src/WarsakenCompanion.jsx`. To regenerate enriched card data from the WAX blockchain + Claude vision OCR:

```bash
pip install anthropic
export ANTHROPIC_API_KEY=sk-ant-...
python scripts/warsaken_enrich.py --limit 5     # smoke test
python scripts/warsaken_enrich.py --resume      # full run, ~$3 with Sonnet
```

The script writes `enriched.json` next to itself; paste the contents into the `ENRICHED` constant.

## Project layout

```
index.html
src/
  main.jsx                 entry point, mounts WarsakenCompanion
  WarsakenCompanion.jsx    the artifact -- ~2700 lines of React
  storage.js               localStorage-backed window.storage shim
  index.css                tailwind base + body styles
scripts/
  warsaken_enrich.py       AtomicAssets crawler + Claude vision OCR
```
