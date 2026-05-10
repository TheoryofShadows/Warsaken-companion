import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

// Lightweight global command palette. Toggled with Cmd/Ctrl+K.
// Searches cards by name and id; Enter / click selects → onPick(cardId).

export default function CommandPalette({ open, onClose, cards, onPick }) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQ('');
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return cards.slice(0, 20);
    const exact = [];
    const startsWith = [];
    const contains = [];
    for (const c of cards) {
      const name = c.name.toLowerCase();
      const id = c.id.toLowerCase();
      if (id === s || name === s) exact.push(c);
      else if (name.startsWith(s) || id.startsWith(s)) startsWith.push(c);
      else if (name.includes(s) || id.includes(s)) contains.push(c);
    }
    return [...exact, ...startsWith, ...contains].slice(0, 25);
  }, [q, cards]);

  useEffect(() => { setIdx(0); }, [q]);

  const onKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const c = results[idx];
      if (c) { onPick(c.id); onClose(); }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md flex items-start justify-center p-4 sm:pt-20" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-xl bg-stone-950 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center gap-2 p-3 border-b border-stone-800">
          <Search className="h-4 w-4 text-stone-500" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search cards…"
            className="flex-1 bg-transparent text-stone-100 text-sm placeholder-stone-600 focus:outline-none"
          />
          <kbd className="text-[10px] text-stone-500 px-1.5 py-0.5 rounded border border-stone-700">ESC</kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-8 text-center text-stone-500 text-sm">No cards match.</div>
          ) : (
            results.map((c, i) => (
              <button
                key={c.id}
                onClick={() => { onPick(c.id); onClose(); }}
                onMouseEnter={() => setIdx(i)}
                className={`w-full px-3 py-2.5 text-left border-b border-stone-800/40 transition flex items-center gap-3 ${
                  i === idx ? 'bg-yellow-400/10 border-l-2 border-l-yellow-400' : 'hover:bg-stone-900/60'
                }`}
              >
                <span className="text-[10px] text-stone-500 font-mono shrink-0 w-14">{c.id}</span>
                <span className="text-sm text-stone-100 truncate flex-1">{c.name}</span>
                <span className="text-[9px] text-stone-500 shrink-0">{c.type}</span>
                <ChevronRight className="h-3 w-3 text-stone-600 shrink-0" />
              </button>
            ))
          )}
        </div>
        <div className="px-3 py-2 border-t border-stone-800 bg-stone-900/40 flex items-center gap-3 text-[10px] text-stone-500">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded border border-stone-700">↑↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded border border-stone-700">↵</kbd> select
          </span>
          <span className="ml-auto">{results.length} result{results.length === 1 ? '' : 's'}</span>
        </div>
      </div>
    </div>
  );
}
