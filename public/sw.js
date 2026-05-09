// Minimal app-shell service worker.
// - Network-first for same-origin navigations (so deploys land fast)
// - Cache-first for static assets
// - Bypasses non-GET and cross-origin entirely

const VERSION = 'wsk-v2';
// BASE is injected at build time via vite; falls back to '/' for local dev.
const BASE = self.location.pathname.replace(/\/sw\.js$/, '') || '';
const SHELL = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/manifest.webmanifest',
  BASE + '/icon.svg',
  BASE + '/favicon.svg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(BASE + '/', copy)).catch(() => {});
          return res;
        })
        .catch(() =>
          caches.match(BASE + '/').then((r) => r || caches.match(BASE + '/index.html'))
        )
    );
    return;
  }

  e.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((res) => {
        if (!res || res.status !== 200) return res;
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(request, copy)).catch(() => {});
        return res;
      });
    })
  );
});
