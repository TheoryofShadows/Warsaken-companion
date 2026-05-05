import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Crown, Heart, Plus, Minus, Dice5, Trash2, RotateCcw, Apple, Zap, Fuel,
  Cog, Star, Search, Pause, Play, Swords, Skull, X, ChevronRight,
} from 'lucide-react';

const RES_META = {
  G:  { Icon: Star,   color: '#e7e5e4', label: 'GENERIC' },
  F:  { Icon: Apple,  color: '#86efac', label: 'FOOD' },
  P:  { Icon: Zap,    color: '#fde047', label: 'POWER' },
  Fu: { Icon: Fuel,   color: '#fda4af', label: 'FUEL' },
  M:  { Icon: Cog,    color: '#7dd3fc', label: 'METAL' },
};

function newPlayer(name, leaderId, getCard) {
  const leader = leaderId ? getCard(leaderId) : null;
  const startMorale = leader?.morale || 17;
  return {
    id: `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
    name,
    leaderId: leaderId || null,
    morale: startMorale,
    startMorale,
    resources: { G: 0, F: 0, P: 0, Fu: 0, M: 0 },
    cooldowns: [], // [{ id, name, cd, max }]
  };
}

export default function PlayTab({ getCard, leaders, openCardDetail }) {
  const [players, setPlayers] = useState(() => [
    newPlayer('Player 1', null, getCard),
    newPlayer('Player 2', null, getCard),
  ]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [turn, setTurn] = useState(1);
  const [paused, setPaused] = useState(false);
  const [log, setLog] = useState([]);
  const [showLeaderPicker, setShowLeaderPicker] = useState(null); // playerIdx | null
  const [diceResult, setDiceResult] = useState(null);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const logEvent = (text) =>
    setLog((l) => [{ id: Date.now() + Math.random(), turn, text }, ...l].slice(0, 50));

  const setPlayer = (i, mut) =>
    setPlayers((prev) => prev.map((p, idx) => (idx === i ? { ...p, ...mut(p) } : p)));

  const adjMorale = (i, delta) => {
    setPlayer(i, (p) => ({ morale: Math.max(0, p.morale + delta) }));
    logEvent(`${players[i].name}: morale ${delta > 0 ? '+' : ''}${delta}`);
  };

  const adjResource = (i, key, delta) => {
    setPlayer(i, (p) => ({
      resources: { ...p.resources, [key]: Math.max(0, (p.resources[key] || 0) + delta) },
    }));
  };

  const addCooldown = (i, name, cd) => {
    setPlayer(i, (p) => ({
      cooldowns: [
        ...p.cooldowns,
        { id: `cd_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`, name, cd, max: cd },
      ],
    }));
    logEvent(`${players[i].name}: queued ${name} (${cd})`);
  };

  const tickCooldown = (i, cdId) => {
    setPlayer(i, (p) => ({
      cooldowns: p.cooldowns
        .map((c) => (c.id === cdId ? { ...c, cd: Math.max(0, c.cd - 1) } : c))
        .filter((c) => c.cd > 0),
    }));
  };

  const removeCooldown = (i, cdId) =>
    setPlayer(i, (p) => ({ cooldowns: p.cooldowns.filter((c) => c.id !== cdId) }));

  const tickAllCooldowns = (i) => {
    setPlayer(i, (p) => ({
      cooldowns: p.cooldowns.map((c) => ({ ...c, cd: Math.max(0, c.cd - 1) })).filter((c) => c.cd > 0),
    }));
  };

  const nextTurn = () => {
    setTurn((t) => t + 1);
    setActiveIdx((idx) => (idx + 1) % players.length);
    setPlayers((prev) => prev.map((p) => ({
      ...p,
      cooldowns: p.cooldowns.map((c) => ({ ...c, cd: Math.max(0, c.cd - 1) })).filter((c) => c.cd > 0),
    })));
    logEvent('--- NEXT TURN ---');
  };

  const resetGame = () => {
    if (!confirm('Reset all players, turn counter, and log?')) return;
    setPlayers((prev) => prev.map((p) => ({
      ...p,
      morale: p.startMorale,
      resources: { G: 0, F: 0, P: 0, Fu: 0, M: 0 },
      cooldowns: [],
    })));
    setTurn(1);
    setActiveIdx(0);
    setLog([]);
    logEvent('Game reset');
  };

  const addPlayer = () => {
    if (players.length >= 4) return;
    setPlayers((prev) => [...prev, newPlayer(`Player ${prev.length + 1}`, null, getCard)]);
  };

  const removePlayer = (i) => {
    if (players.length <= 1) return;
    setPlayers((prev) => prev.filter((_, idx) => idx !== i));
    setActiveIdx((idx) => Math.min(idx, players.length - 2));
  };

  const renamePlayer = (i) => {
    const next = window.prompt('Player name:', players[i].name);
    if (next && next.trim()) setPlayer(i, () => ({ name: next.trim() }));
  };

  const setLeader = (i, leaderId) => {
    const leader = leaderId ? getCard(leaderId) : null;
    const startMorale = leader?.morale || 17;
    setPlayer(i, () => ({
      leaderId,
      startMorale,
      morale: startMorale,
    }));
    setShowLeaderPicker(null);
    if (leader) logEvent(`${players[i].name} chose ${leader.name}`);
  };

  const rollDice = (sides) => {
    const result = 1 + Math.floor(Math.random() * sides);
    setDiceResult({ sides, result, ts: Date.now() });
    logEvent(`Rolled d${sides}: ${result}`);
  };

  const filteredCards = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    const all = leaders;
    return all.filter((c) =>
      c.name.toLowerCase().includes(q) || c.id.includes(q)
    ).slice(0, 8);
  }, [search, leaders]);

  return (
    <div className="px-4 pt-6 pb-24 max-w-2xl mx-auto">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <div className="text-[10px] tracking-[0.3em] text-stone-400">// LIVE GAME</div>
          <div className="text-2xl font-bold text-yellow-300">PLAY</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] tracking-[0.2em] text-stone-500">TURN</div>
          <div className="text-3xl font-bold tabular-nums text-stone-100">{turn}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <button
          onClick={nextTurn}
          className="rounded-xl py-3 px-3 text-xs font-bold tracking-wider border border-yellow-500/30 bg-yellow-400/10 text-yellow-200 hover:bg-yellow-400/20 transition"
        >
          NEXT TURN <ChevronRight className="inline h-3 w-3 ml-1" />
        </button>
        <button
          onClick={resetGame}
          className="rounded-xl py-3 px-3 text-xs font-bold tracking-wider border border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800 transition flex items-center justify-center gap-1"
        >
          <RotateCcw className="h-3 w-3" /> RESET
        </button>
        {players.length < 4 ? (
          <button
            onClick={addPlayer}
            className="rounded-xl py-3 px-3 text-xs font-bold tracking-wider border border-stone-700 bg-stone-900/60 text-stone-300 hover:bg-stone-800 transition flex items-center justify-center gap-1"
          >
            <Plus className="h-3 w-3" /> PLAYER
          </button>
        ) : (
          <div className="rounded-xl py-3 px-3 text-xs font-bold tracking-wider border border-stone-800 bg-stone-900/30 text-stone-600 flex items-center justify-center">
            MAX 4
          </div>
        )}
      </div>

      <div className="space-y-3">
        {players.map((p, i) => (
          <PlayerCard
            key={p.id}
            player={p}
            active={i === activeIdx}
            getCard={getCard}
            onActivate={() => setActiveIdx(i)}
            onRename={() => renamePlayer(i)}
            onRemove={() => removePlayer(i)}
            onMorale={(d) => adjMorale(i, d)}
            onResource={(k, d) => adjResource(i, k, d)}
            onAddCooldown={(name, cd) => addCooldown(i, name, cd)}
            onTickCooldown={(cdId) => tickCooldown(i, cdId)}
            onRemoveCooldown={(cdId) => removeCooldown(i, cdId)}
            onTickAll={() => tickAllCooldowns(i)}
            onPickLeader={() => setShowLeaderPicker(i)}
            onClearLeader={() => setLeader(i, null)}
            canRemove={players.length > 1}
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {[2, 4, 6, 20].map((s) => (
          <button
            key={s}
            onClick={() => rollDice(s)}
            className="rounded-xl py-3 px-2 text-xs font-bold border border-stone-700 bg-stone-900/60 text-stone-200 hover:bg-stone-800 transition flex flex-col items-center gap-1"
          >
            <Dice5 className="h-3 w-3 text-stone-400" />
            <span>D{s}</span>
          </button>
        ))}
      </div>
      {diceResult && (
        <div
          key={diceResult.ts}
          className="mt-2 rounded-xl py-4 px-4 text-center border border-yellow-500/30 bg-yellow-400/5 animate-[pulse_0.6s_ease-out_1]"
        >
          <div className="text-[10px] tracking-[0.2em] text-yellow-200/70">D{diceResult.sides}</div>
          <div className="text-4xl font-bold text-yellow-300 tabular-nums">{diceResult.result}</div>
        </div>
      )}

      <div className="mt-6 border border-stone-800 bg-stone-900/40 rounded-xl">
        <button
          onClick={() => setSearchOpen((s) => !s)}
          className="w-full flex items-center justify-between p-3 text-xs font-bold tracking-wider text-stone-300"
        >
          <span className="flex items-center gap-2">
            <Search className="h-3 w-3" /> QUICK CARD LOOKUP
          </span>
          <span className="text-stone-500">{searchOpen ? '−' : '+'}</span>
        </button>
        {searchOpen && (
          <div className="px-3 pb-3 space-y-2">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="card name or 001-203"
              className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-stone-100 text-sm placeholder-stone-600 focus:outline-none focus:border-yellow-500/50"
            />
            <div className="space-y-1">
              {filteredCards.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { openCardDetail?.(c.id); setSearch(''); }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg bg-stone-950/60 border border-stone-800 hover:border-yellow-500/40 transition text-left"
                >
                  <span className="text-[10px] text-stone-500 font-mono">{c.id}</span>
                  <span className="text-sm text-stone-200 truncate flex-1">{c.name}</span>
                  <span className="text-[9px] text-stone-500">{c.type}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 border border-stone-800 bg-stone-900/40 rounded-xl">
        <div className="flex items-center justify-between p-3 border-b border-stone-800">
          <span className="text-xs font-bold tracking-wider text-stone-300">EVENT LOG</span>
          <button
            onClick={() => setLog([])}
            className="text-[10px] text-stone-500 hover:text-stone-300"
          >
            clear
          </button>
        </div>
        <div className="max-h-56 overflow-y-auto">
          {log.length === 0 ? (
            <div className="p-3 text-[11px] text-stone-600 italic">No events yet.</div>
          ) : (
            log.map((e) => (
              <div key={e.id} className="px-3 py-1.5 text-[11px] border-b border-stone-800/40 flex items-start gap-2">
                <span className="text-stone-600 font-mono">T{e.turn}</span>
                <span className="text-stone-300 flex-1">{e.text}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {showLeaderPicker !== null && (
        <LeaderPicker
          leaders={leaders}
          onPick={(id) => setLeader(showLeaderPicker, id)}
          onClose={() => setShowLeaderPicker(null)}
        />
      )}
    </div>
  );
}

function PlayerCard({
  player, active, getCard, onActivate, onRename, onRemove, onMorale, onResource,
  onAddCooldown, onTickCooldown, onRemoveCooldown, onTickAll, onPickLeader, onClearLeader, canRemove,
}) {
  const leader = player.leaderId ? getCard(player.leaderId) : null;
  const moraleColor = player.morale === 0 ? 'text-rose-400' : player.morale <= 3 ? 'text-orange-400' : 'text-yellow-300';
  const [cdName, setCdName] = useState('');
  const [cdCount, setCdCount] = useState(2);

  const submitCd = () => {
    if (!cdName.trim() || cdCount < 1) return;
    onAddCooldown(cdName.trim(), cdCount);
    setCdName('');
    setCdCount(2);
  };

  return (
    <div
      onClick={onActivate}
      className={`rounded-xl p-3 border transition cursor-pointer ${
        active
          ? 'border-yellow-500/50 bg-yellow-400/[0.04] shadow-[0_0_24px_rgba(253,224,71,0.06)]'
          : 'border-stone-800 bg-stone-900/40'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {active && <span className="h-2 w-2 rounded-full bg-yellow-300 animate-pulse" />}
            <button
              onClick={(e) => { e.stopPropagation(); onRename(); }}
              className="text-sm font-bold text-stone-100 hover:text-yellow-300 truncate text-left"
            >
              {player.name}
            </button>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); leader ? onClearLeader() : onPickLeader(); }}
            className="mt-1 flex items-center gap-1.5 text-[11px] text-stone-400 hover:text-yellow-300 transition"
          >
            <Crown className="h-3 w-3" />
            {leader ? leader.name : <span className="italic text-stone-500">choose leader</span>}
          </button>
        </div>
        {canRemove && (
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="text-stone-600 hover:text-rose-400 transition"
            aria-label="Remove player"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-stone-950/60 border border-stone-800 p-2">
        <button
          onClick={(e) => { e.stopPropagation(); onMorale(-1); }}
          className="h-9 w-9 rounded-lg flex items-center justify-center bg-stone-900 border border-stone-700 text-stone-200 hover:bg-rose-900/30 hover:border-rose-500/50 transition"
        >
          <Minus className="h-4 w-4" />
        </button>
        <div className="text-center">
          <div className="text-[9px] tracking-[0.2em] text-stone-500">MORALE</div>
          <div className={`text-3xl font-bold tabular-nums ${moraleColor}`}>
            {player.morale}
            <span className="text-stone-600 text-sm font-normal"> / {player.startMorale}</span>
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onMorale(1); }}
          className="h-9 w-9 rounded-lg flex items-center justify-center bg-stone-900 border border-stone-700 text-stone-200 hover:bg-emerald-900/30 hover:border-emerald-500/50 transition"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-5 gap-1.5">
        {Object.entries(RES_META).map(([k, m]) => {
          const Icon = m.Icon;
          const v = player.resources[k] || 0;
          return (
            <div
              key={k}
              onClick={(e) => e.stopPropagation()}
              className="rounded-lg border border-stone-800 bg-stone-950/40 p-1.5 flex flex-col items-center gap-0.5"
            >
              <Icon className="h-3 w-3" style={{ color: m.color }} />
              <button
                onClick={() => onResource(k, 1)}
                onContextMenu={(e) => { e.preventDefault(); onResource(k, -1); }}
                className="text-sm font-bold tabular-nums text-stone-200 hover:text-yellow-300 transition w-full text-center"
              >
                {v}
              </button>
              <div className="grid grid-cols-2 gap-0.5 w-full">
                <button
                  onClick={() => onResource(k, -1)}
                  className="text-[9px] text-stone-500 hover:text-stone-300 leading-tight"
                >−</button>
                <button
                  onClick={() => onResource(k, 1)}
                  className="text-[9px] text-stone-500 hover:text-stone-300 leading-tight"
                >+</button>
              </div>
            </div>
          );
        })}
      </div>

      <div onClick={(e) => e.stopPropagation()} className="mt-3 rounded-lg border border-stone-800 bg-stone-950/40 p-2">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-[10px] tracking-[0.2em] text-stone-400 font-bold flex items-center gap-1">
            <Swords className="h-3 w-3" /> COOLDOWNS
          </div>
          {player.cooldowns.length > 0 && (
            <button
              onClick={onTickAll}
              className="text-[9px] text-stone-500 hover:text-yellow-300"
              title="Tick all cooldowns -1"
            >
              tick all
            </button>
          )}
        </div>
        {player.cooldowns.length === 0 ? (
          <div className="text-[10px] text-stone-600 italic mb-1.5">No cooldowns active.</div>
        ) : (
          <div className="space-y-1 mb-2">
            {player.cooldowns.map((c) => (
              <div key={c.id} className="flex items-center gap-2 px-2 py-1 rounded bg-stone-900/60 border border-stone-800">
                <button
                  onClick={() => onTickCooldown(c.id)}
                  className="flex-1 text-left text-[11px] text-stone-200 hover:text-yellow-300 transition flex items-center justify-between"
                >
                  <span className="truncate">{c.name}</span>
                  <span className="font-bold text-yellow-300 tabular-nums">{c.cd}</span>
                </button>
                <button
                  onClick={() => onRemoveCooldown(c.id)}
                  className="text-stone-600 hover:text-rose-400"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-1.5">
          <input
            value={cdName}
            onChange={(e) => setCdName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitCd()}
            placeholder="card name"
            className="flex-1 px-2 py-1 rounded bg-stone-950 border border-stone-700 text-stone-100 text-xs placeholder-stone-600 focus:outline-none focus:border-yellow-500/40"
          />
          <input
            type="number"
            value={cdCount}
            min={1}
            max={9}
            onChange={(e) => setCdCount(parseInt(e.target.value || '1', 10))}
            className="w-12 px-2 py-1 rounded bg-stone-950 border border-stone-700 text-stone-100 text-xs text-center"
          />
          <button
            onClick={submitCd}
            className="px-2 rounded bg-yellow-400/10 border border-yellow-500/30 text-yellow-300 text-xs hover:bg-yellow-400/20 transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function LeaderPicker({ leaders, onPick, onClose }) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return leaders;
    return leaders.filter((l) => l.name.toLowerCase().includes(s) || l.id.includes(s));
  }, [q, leaders]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md bg-stone-950 border border-stone-800 rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col"
      >
        <div className="p-3 border-b border-stone-800 flex items-center gap-2">
          <Crown className="h-4 w-4 text-yellow-300" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="search leaders"
            className="flex-1 bg-transparent text-stone-100 text-sm placeholder-stone-600 focus:outline-none"
          />
          <button onClick={onClose} className="text-stone-500 hover:text-stone-200">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-stone-500 text-sm">No leaders match.</div>
          ) : (
            filtered.map((l) => (
              <button
                key={l.id}
                onClick={() => onPick(l.id)}
                className="w-full p-3 text-left border-b border-stone-800/60 hover:bg-stone-900/60 transition flex items-center gap-3"
              >
                <div className="text-[10px] text-stone-500 font-mono">{l.id}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-stone-100 truncate">{l.name}</div>
                  <div className="text-[10px] text-stone-500">
                    {l.morale ? `Morale ${l.morale}` : 'Leader'}
                  </div>
                </div>
                <ChevronRight className="h-3 w-3 text-stone-600" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
