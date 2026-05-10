import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './storage.js';
import WarsakenCompanion from './WarsakenCompanion.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WarsakenCompanion />
  </React.StrictMode>
);

// Register service worker for offline + installability. Only in production
// builds — running it under `vite dev` will spam the console with HMR misses.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    // Use the Vite base path so the SW scope covers the deployed sub-path on GitHub Pages
    const base = import.meta.env.BASE_URL || '/';
    navigator.serviceWorker.register(`${base}sw.js`, { scope: base }).catch(() => { /* ignore */ });
  });
}
