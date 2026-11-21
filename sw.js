// Service worker de SYNAPSE: guarda la app en caché para funcionar sin conexión.
// La versión viene de version.js; al cambiarla, el navegador detecta la actualización.
importScripts('./version.js');

const CACHE = `synapse-${self.SYNAPSE_VERSION}`;
const ASSETS = [
  "./",
  "./index.html",
  "./version.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener('install', (event) => {
  // cache: 'reload' evita copiar versiones viejas desde la caché HTTP.
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS.map((u) => new Request(u, { cache: 'reload' })))));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('synapse-') && k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // MQTT, CDN, etc. pasan directo

  if (req.mode === 'navigate') {
    // La app es de una sola página: cualquier navegación sirve index.html desde caché.
    event.respondWith(caches.match('./index.html').then((r) => r || fetch(req)));
    return;
  }
  event.respondWith(caches.match(req, { ignoreSearch: true }).then((r) => r || fetch(req)));
});
