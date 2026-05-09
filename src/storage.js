// Lightweight localStorage-backed shim for window.storage that the artifact
// expects. The artifact calls `window.storage.get(key)` and
// `window.storage.set(key, value)` — both return Promises and use { value } shape.

const PREFIX = 'wsk:';

function safeGet(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw == null) return null;
    return { value: raw };
  } catch (e) {
    return null;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(PREFIX + key, value);
  } catch (e) {
    // quota exceeded or storage disabled — fail silently
  }
}

function safeRemove(key) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch (e) {}
}

if (typeof window !== 'undefined' && !window.storage) {
  window.storage = {
    get: async (key) => safeGet(key),
    set: async (key, value) => safeSet(key, value),
    delete: async (key) => safeRemove(key),
    remove: async (key) => safeRemove(key),
  };
}
