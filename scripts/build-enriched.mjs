/**
 * build-enriched.mjs
 * Transforms warsaken.cards JSON data into the ENRICHED constant format
 * used by WarsakenCompanion.jsx.
 *
 * Usage: node scripts/build-enriched.mjs
 * Output: src/enriched-data.js  (importable constant)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ── Load raw data ──────────────────────────────────────────────────────────
const set001 = JSON.parse(fs.readFileSync(path.join(__dirname, '001.v4.json'), 'utf8'));
const set002 = JSON.parse(fs.readFileSync(path.join(__dirname, '002.json'), 'utf8'));

// ── Build AtomicHub template ID lookup (Full Art preferred) ───────────────
// templates.json.cards is { templateId: { setid, cardid, subset, ... } }
const ATOMICHUB_BASE = 'https://atomichub.io/explorer/template/wax-mainnet/warsaken';
const atomicHubById = {};
try {
  const tmpl = JSON.parse(fs.readFileSync(path.join(__dirname, 'templates.json'), 'utf8'));
  const SUBSET_PRIORITY = ['Full Art', 'Full Art Medal', 'Base', 'Promo'];
  for (const [templateId, t] of Object.entries(tmpl.cards || {})) {
    const cardKey = `${t.setid}-${String(t.cardid).padStart(3, '0')}`;
    const existing = atomicHubById[cardKey];
    const newRank = SUBSET_PRIORITY.indexOf(t.subset);
    const oldRank = existing ? SUBSET_PRIORITY.indexOf(existing.subset) : 999;
    if (!existing || (newRank !== -1 && (oldRank === -1 || newRank < oldRank))) {
      atomicHubById[cardKey] = { templateId, subset: t.subset };
    }
  }
  console.log(`Loaded AtomicHub template IDs for ${Object.keys(atomicHubById).length} cards.`);
} catch {
  console.warn('templates.json not found — AtomicHub links will be omitted.');
}

// ── Attribute/keyword definitions (from warsaken.cards/attributes.json) ───
// We embed a subset mapping keyword function names → display text.
// The full attributes.json is fetched once and baked in here.
let attrDefs = {};
try {
  const attrRaw = fs.readFileSync(path.join(__dirname, 'attributes.json'), 'utf8');
  const arr = JSON.parse(attrRaw);
  for (const entry of arr) {
    attrDefs[entry.function.replace(/\(.*$/, '').trim()] = {
      title: entry.title,
      description: entry.description,
    };
  }
} catch {
  // attributes.json may not exist yet; we'll rely on the raw Attributes string instead
}

// ── Resource icon mapping ─────────────────────────────────────────────────
// Maps raw JSON cost/produce field names → short icons used in ENRICHED
const COST_MAP = {
  'Cost Counter': 'C',      // turn cost (counter)
  'Cost Generic': 'G',
  'Cost Food': 'F',
  'Cost Power': 'P',
  'Cost Fuel': 'Fu',
  'Cost Equip.': 'M',       // equipment / manufacturing
};

const PRODUCE_MAP = {
  'Make Generic': 'G',
  'Make Food': 'F',
  'Make Power': 'P',
  'Make Fuel': 'Fu',
  'Make Equip.': 'M',
  'Make Hollow': 'H',
};

// ── Parse cost icons array from a card object ────────────────────────────
function parseCostIcons(card) {
  const icons = [];
  for (const [field, icon] of Object.entries(COST_MAP)) {
    if (field === 'Cost Counter') continue; // counter is a separate numeric field
    const qty = parseInt(card[field] || '0', 10);
    for (let i = 0; i < qty; i++) icons.push(icon);
  }
  return icons;
}

function parseCostCounter(card) {
  const v = card['Cost Counter'];
  if (!v) return null;
  const n = parseInt(v, 10);
  return isNaN(n) ? null : n;
}

// ── Parse produce array from a card object ───────────────────────────────
function parseProduces(card) {
  const out = [];
  for (const [field, icon] of Object.entries(PRODUCE_MAP)) {
    const qty = parseInt(card[field] || '0', 10);
    for (let i = 0; i < qty; i++) out.push(icon);
  }
  // Handle "Make Food or Fuel" style combos in Sub Type
  const subtype1 = (card['Sub Type L1'] || '').toUpperCase();
  if (out.length === 0) {
    // Infer from subtype for territories that have no explicit Make fields
    // (e.g. "Food, Fuel" subtype means it probably produces both)
  }
  return out.length > 0 ? out : undefined;
}

// ── Parse the Attributes string into keywords + abilities ────────────────
// The Attributes field is a comma-separated list like:
//   "START_MORALE(17), CYCLE(2), REVENGE(5)"
//   "CRACK_SHOT, STEALTH, PICK-OFF"
//   "SUPPLY"
//   "MORALE(2)"   (passive morale bonus on territories)
//
// Returns: { keywords, abilities, startMorale, passives }
function parseAttributes(card) {
  const raw = (card['Attributes'] || '').trim();
  const starAttr = (card['* Attributes'] || '').trim();

  const keywords = [];
  const abilities = [];
  let startMorale = null;

  if (!raw) return { keywords, abilities, startMorale };

  // Split on commas that are NOT inside parentheses
  const parts = raw.split(/,\s*(?=[^)]*(?:\(|$))/g);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // START_MORALE(X) — handled separately
    const smMatch = trimmed.match(/^(?:START_)?MORALE\((-?\d+)\)$/i);
    if (smMatch && trimmed.toUpperCase().includes('START')) {
      startMorale = parseInt(smMatch[1], 10);
      continue;
    }

    // MORALE(X) or MORALE(-X) on non-leader cards = passive morale modifier
    const moraleMatch = trimmed.match(/^MORALE\((-?\d+)\)$/i);
    if (moraleMatch) {
      const val = parseInt(moraleMatch[1], 10);
      abilities.push({ type: 'passive', name: null, text: `${val >= 0 ? '+' : ''}${val} MORALE` });
      continue;
    }

    // Named abilities with cooldown cost: NAME(numericCost) — no commas
    const cooldownMatch = trimmed.match(/^([A-Z][A-Z0-9_\-\s]*)\((\d+)\)$/i);
    if (cooldownMatch) {
      const abilName = cooldownMatch[1].replace(/_/g, ' ').trim();
      const cost = parseInt(cooldownMatch[2], 10);
      const defKey = cooldownMatch[1].replace(/_/g, '_').toUpperCase();
      const def = attrDefs[defKey] || attrDefs[abilName.replace(/\s+/g, '_').toUpperCase()];
      abilities.push({
        type: 'cooldown',
        cost,
        name: def ? def.title || abilName : abilName,
        text: def ? def.description || '' : '',
      });
      continue;
    }

    // Complex ability patterns: NAME(args…) with non-numeric or multi-arg content
    // e.g. ATTACH(3, FIGHTER, fighter forces), INTEL(+1), DEPLOY(5, SOLDIER, …)
    // Treat as named passive abilities rather than keywords.
    if (trimmed.includes('(')) {
      const parenIdx = trimmed.indexOf('(');
      const rawName = trimmed.slice(0, parenIdx).replace(/_/g, ' ').trim().toUpperCase();
      const argsRaw = trimmed.slice(parenIdx + 1, trimmed.lastIndexOf(')')).trim();
      abilities.push({ type: 'passive', name: rawName, text: `${rawName}(${argsRaw})` });
      continue;
    }

    // Plain keywords (no parens): CRACK_SHOT, STEALTH, ANTI-AIR, SUPPLY, etc.
    const kwName = trimmed.replace(/_/g, ' ').trim().toUpperCase();
    const defKey = trimmed.replace(/[-\s]/g, '_').toUpperCase();
    const def = attrDefs[defKey] || attrDefs[kwName.replace(/\s+/g, '_')];
    if (def) {
      keywords.push(kwName);
      abilities.push({
        type: 'keyword',
        name: def.title || kwName,
        text: def.description || '',
      });
    } else {
      // Still add as keyword even without a known description
      keywords.push(kwName);
    }
  }

  // Process * Attributes as passive ability text blocks
  if (starAttr) {
    for (const line of starAttr.split(/\n|;/).map(s => s.trim()).filter(Boolean)) {
      abilities.push({ type: 'passive', name: null, text: line });
    }
  }

  return { keywords, abilities, startMorale };
}

// ── Subtype formatter ─────────────────────────────────────────────────────
function formatSubtype(card) {
  const parts = [card['Sub Type L1'], card['Sub Type L2']].filter(Boolean);
  return parts.length > 0 ? parts.join(' : ').toUpperCase() : null;
}

// ── Transform one raw card entry → ENRICHED record ───────────────────────
function transform(setPrefix, cardIndex, card) {
  const id = `${setPrefix}-${cardIndex.padStart(3, '0')}`;

  const { keywords, abilities, startMorale } = parseAttributes(card);

  const costIcons = parseCostIcons(card);
  const cost = parseCostCounter(card);
  const produces = parseProduces(card);

  const atk = card['Attack'] != null ? parseInt(card['Attack'], 10) : null;
  const hp  = card['Health'] != null ? parseInt(card['Health'], 10) : null;

  const cardType = (card['Type'] || '').trim();
  const warningMsg = (card['Warning Message'] || '').trim();
  // Leaders use Warning Message as loseEffect; Intel/Morale use it as playRequirement
  const playRequirementTypes = new Set(['Intel', 'Morale']);
  const loseEffect = (card['Morale Loss'] || (cardType === 'Leader' ? warningMsg : '')).trim() || null;
  const playRequirement = playRequirementTypes.has(cardType) && warningMsg ? warningMsg : null;

  const record = {
    id,
    cost,
    costIcons,
    atk: isNaN(atk) ? null : atk,
    hp: isNaN(hp) ? null : hp,
    morale: startMorale,
    subtype: formatSubtype(card),
    keywords,
    abilities,
    flavor: (card['Flavor Text'] || '').trim() || null,
    artist: (card['Artist'] || '').trim() || null,
    loseEffect,
  };

  if (playRequirement) {
    record.playRequirement = playRequirement;
  }

  if (produces && produces.length > 0) {
    record.produces = produces;
  }

  const hub = atomicHubById[id];
  if (hub) {
    record.atomicHubUrl = `${ATOMICHUB_BASE}/${hub.templateId}`;
  }

  return record;
}

// ── Process both sets ─────────────────────────────────────────────────────
const enriched = [];

for (const [idx, card] of Object.entries(set001)) {
  enriched.push(transform('001', idx, card));
}

for (const [idx, card] of Object.entries(set002)) {
  enriched.push(transform('002', idx, card));
}

console.log(`Transformed ${enriched.length} cards (${Object.keys(set001).length} from Set 001, ${Object.keys(set002).length} from Set 002)`);

// ── Build CARDS array from templates.json (one entry per unique card) ─────
// Prefer subset order: Base > Full Art > Promo > others.
// This gives the canonical image/url per card and is the browse/deck source.
const SUBSET_BASE_PRIORITY = ['Base', 'Full Art', 'Full Art Medal', 'Promo'];
const cardsByKey = {};
try {
  const tmpl = JSON.parse(fs.readFileSync(path.join(__dirname, 'templates.json'), 'utf8'));
  for (const t of Object.values(tmpl.cards || {})) {
    const cardKey = `${t.setid}-${String(t.cardid).padStart(3, '0')}`;
    const existing = cardsByKey[cardKey];
    const newRank = SUBSET_BASE_PRIORITY.indexOf(t.subset);
    const oldRank = existing ? SUBSET_BASE_PRIORITY.indexOf(existing.subset) : 999;
    if (!existing || (newRank !== -1 && (oldRank === -1 || newRank < oldRank))) {
      cardsByKey[cardKey] = t;
    }
  }
} catch {
  console.warn('templates.json not found — CARDS_GENERATED will be empty.');
}

const cardsArr = Object.entries(cardsByKey)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([id, t]) => ({
    id,
    name: t.name,
    setid: t.setid,
    cardid: String(t.cardid).padStart(3, '0'),
    type: t.type,
    rarity: t.rarity === 'Promo' ? 'Uncommon' : t.rarity, // normalise Promo → Uncommon for deck rules
    img: t.img,
    url: t.cardurl,
  }));

console.log(`Built CARDS_GENERATED: ${cardsArr.length} unique cards`);

// ── Write output ──────────────────────────────────────────────────────────
const output = `// AUTO-GENERATED by scripts/build-enriched.mjs — do not edit manually.
// Source: https://warsaken.cards/001.v4.json + 002.json + templates.json
// ${enriched.length} enriched records · ${cardsArr.length} unique cards in CARDS_GENERATED
export const ENRICHED_GENERATED = ${JSON.stringify(enriched, null, 0)};
export const CARDS_GENERATED = ${JSON.stringify(cardsArr, null, 0)};
`;

const outPath = path.join(ROOT, 'src', 'enriched-data.js');
fs.writeFileSync(outPath, output, 'utf8');
console.log(`Written to ${outPath}`);

// Also write a summary for inspection
const summary = {
  total: enriched.length,
  withAtk: enriched.filter(c => c.atk !== null && c.atk > 0).length,
  withHp: enriched.filter(c => c.hp !== null).length,
  withCost: enriched.filter(c => c.cost !== null).length,
  withAbilities: enriched.filter(c => c.abilities.length > 0).length,
  withKeywords: enriched.filter(c => c.keywords.length > 0).length,
  withFlavor: enriched.filter(c => c.flavor).length,
  sample: enriched.slice(0, 3),
};
console.log('\nSummary:', JSON.stringify(summary, null, 2));
