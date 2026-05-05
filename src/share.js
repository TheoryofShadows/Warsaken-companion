// Deck sharing via URL hash. Encodes a deck (cards + name) into a compact
// base64url string so a deck can travel as `#deck=...&name=...`.

const enc = (s) => btoa(unescape(encodeURIComponent(s)))
  .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const dec = (s) => {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4));
  const b64 = (s + pad).replace(/-/g, '+').replace(/_/g, '/');
  return decodeURIComponent(escape(atob(b64)));
};

// Compact deck format: [["001-000", 4], ["001-203", 2], ...]
export function encodeDeck(name, cards) {
  const entries = Object.entries(cards || {}).filter(([, n]) => n > 0);
  const payload = JSON.stringify(entries);
  return { d: enc(payload), n: enc(name || 'Shared Deck') };
}

export function decodeDeck(d, n) {
  if (!d) return null;
  try {
    const entries = JSON.parse(dec(d));
    if (!Array.isArray(entries)) return null;
    const cards = {};
    for (const [id, qty] of entries) {
      if (typeof id === 'string' && Number.isFinite(qty) && qty > 0) cards[id] = qty;
    }
    const name = n ? dec(n) : 'Shared Deck';
    return { name, cards };
  } catch {
    return null;
  }
}

export function buildShareUrl(name, cards) {
  const { d, n } = encodeDeck(name, cards);
  const base = window.location.origin + window.location.pathname;
  return `${base}#deck=${d}&name=${n}`;
}

export function readShareFromHash() {
  const h = window.location.hash || '';
  if (!h.startsWith('#')) return null;
  const params = new URLSearchParams(h.slice(1));
  const d = params.get('deck');
  const n = params.get('name');
  if (!d) return null;
  return decodeDeck(d, n);
}

export function clearShareHash() {
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  } else {
    window.location.hash = '';
  }
}
