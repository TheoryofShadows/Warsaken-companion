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
    navigator.serviceWorker.register('/sw.js').catch(() => { /* ignore */ });
  });
}
