# Warsaken Companion

An unofficial, fan-made mobile-first card browser, deck builder, and deck composer for the [Warsaken®](https://www.warsaken.com) trading card game (sets 000-002).

> **Warsaken® is created by Brandon Adams and published by Eclectic Nerds LLC.**  
> This companion app is not affiliated with or endorsed by Eclectic Nerds LLC.  
> All card names, artwork, rules text, and the Warsaken® trademark are property of Eclectic Nerds LLC.

**Official Warsaken links:** [Website](https://www.warsaken.com) · [Rules](https://rules.warsaken.com) · [Cards](https://warsaken.cards) · [Discord](https://discord.gg/warsaken) · [Twitter/X](https://x.com/TheWarsaken) · [Instagram](https://instagram.com/thewarsaken)

## Features

- **Browse**: full-text searchable card list — name, ID, ability text, keywords, flavor — with type/set/rarity filters and full-art detail views
- **Deck**: build, save, rename, import/export, share-link, and validate against official rules; the **Analysis** tab detects archetype (aggro / control / tempo / ramp / midrange) from keyword density + cost curve and ships a Predicted Matchups panel scoring counter coverage against every leader's recipes; the **Practice** tab is a goldfish mode with mulligan + turn-by-turn hypergeometric draw probabilities for any card in your arsenal
- **AI**: three builders -- Recipe (curated official decks), Novel (visible reasoning, theme + leader-driven composition), and Counter-Meta (adversarial -- pick the leader you expect to face and the AI builds a deck designed to counter them, with a threat-coverage matrix showing which opposing keywords your deck shuts down)
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
