import React from 'react';
import { Sparkles, X, ArrowRight, Layers } from 'lucide-react';

// Banner shown at the top of the app when a deck has been loaded from a
// shared URL. Lets the user import as a new deck or dismiss.

export default function ShareBanner({ payload, onImport, onDismiss }) {
  const total = Object.values(payload.cards || {}).reduce((s, n) => s + n, 0);
  return (
    <div className="sticky top-0 z-30 border-b border-yellow-500/20" style={{
      background: 'linear-gradient(180deg, rgba(253,224,71,0.10) 0%, rgba(10,10,12,0.95) 100%)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-yellow-400/10 border border-yellow-500/30 shrink-0">
          <Sparkles className="h-4 w-4 text-yellow-300" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] tracking-[0.2em] text-yellow-200/80">// SHARED DECK</div>
          <div className="text-sm font-bold text-stone-100 truncate">
            {payload.name} <span className="text-stone-500 font-normal">· {total} cards</span>
          </div>
        </div>
        <button
          onClick={onImport}
          className="px-3 py-1.5 rounded-lg bg-yellow-400/15 border border-yellow-500/40 text-yellow-200 text-xs font-bold tracking-wider hover:bg-yellow-400/25 transition flex items-center gap-1"
        >
          <Layers className="h-3 w-3" /> IMPORT
          <ArrowRight className="h-3 w-3" />
        </button>
        <button
          onClick={onDismiss}
          className="text-stone-500 hover:text-stone-200 shrink-0"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
