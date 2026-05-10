# Warsaken Companion

An unofficial, fan-made mobile-first card browser, deck builder, and AI deckbuilder for the [Warsaken®](https://www.warsaken.com) trading card game (sets 001–002).

> **Warsaken® is created by Brandon Adams and published by Eclectic Nerds LLC.**
> This companion app is not affiliated with or endorsed by Eclectic Nerds LLC.
> All card names, artwork, rules text, and the Warsaken® trademark are property of Eclectic Nerds LLC.

**Official Warsaken links:** [Website](https://www.warsaken.com) · [Rules](https://rules.warsaken.com) · [Cards](https://warsaken.cards) · [Discord](https://discord.gg/warsaken) · [Twitter/X](https://x.com/TheWarsaken) · [Instagram](https://instagram.com/thewarsaken)

---

## Features

- **Browse** — full-text searchable card list (name, ID, ability text, keywords, flavor) with type/set/rarity filters and full-art detail views with stats, costs, and abilities
- **Deck** — build, save, rename, import/export, share-link, and validate against official rules
  - *Analysis* tab: detects archetype (aggro / control / tempo / ramp / midrange) from keyword density + cost curve; Predicted Matchups panel scores counter coverage against every leader's recipe
  - *Practice* tab: goldfish mode with mulligan + turn-by-turn hypergeometric draw probabilities for any card in your arsenal
- **AI** — three local deckbuilders (no API key, no server):
  - *Recipe* — curated official decks from rules.warsaken.com
  - *Novel* — visible reasoning, theme + leader-driven composition
  - *Counter-Meta* — pick the leader you expect to face; the engine builds a deck to counter them with a keyword threat-coverage matrix
- **Synergy** — keyword-graph explorer with combo scoring, counters, and per-card synergy breakdowns
- **Rules** — searchable rulebook excerpts (keywords, deck rules, game modes)

Decks persist to `localStorage`.

---

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build
```

---

## Project layout

```
index.html
src/
  WarsakenCompanion.jsx   main app (~3900 lines) — all tabs, AI engine, synergy graph
  enriched-data.js        auto-generated full card dataset (671 cards)
  CommandPalette.jsx      ⌘K command palette
  ShareBanner.jsx         share-link toast
  share.js                URL hash encode/decode for deck sharing
  storage.js              localStorage-backed window.storage shim
  main.jsx                entry point
  index.css               Tailwind base + body styles
scripts/
  build-enriched.mjs      transforms raw card JSON → src/enriched-data.js
  001.v4.json             raw card data for Set 001 (from warsaken.cards)
  002.json                raw card data for Set 002 (from warsaken.cards)
public/
  manifest.webmanifest    PWA manifest
  sw.js                   service worker
  favicon.svg / icon.svg
.github/workflows/
  deploy.yml              GitHub Pages CI/CD (builds on push to main)
```

---

## Updating card data

Card stats, abilities, costs, and flavor text live in `src/enriched-data.js`, generated from the official `warsaken.cards` JSON files. To regenerate:

```bash
# Fetch fresh JSON from warsaken.cards and drop into scripts/
# (001.v4.json and 002.json)
node scripts/build-enriched.mjs
```

The script writes `src/enriched-data.js`. Commit the result.

### Field mapping reference

| Raw field | Enriched field | Notes |
|-----------|---------------|-------|
| `Cost Counter` | `cost` | Turn timer cost |
| `Cost Generic/Food/Fuel/Equip.` | `costIcons[]` | Resource deploy cost |
| `Make Power/Food/Fuel/…` | `produces[]` | Territory output |
| `Attributes` | `keywords[]`, `abilities[]` | Parsed: plain words → keywords; `NAME(N)` → cooldown ability; `MORALE(±N)` → passive; complex `NAME(…,…)` → passive |
| `* Attributes` | `abilities[]` | Passive ability text blocks |
| `Warning Message` | `playRequirement` | Intel/Morale cards only |
| `Warning Message` | `loseEffect` | Leaders only |
| `Morale Loss` | `loseEffect` | Territories/Buildings |
| `Flavor Text` | `flavor` | |
| `Artist` | `artist` | |
