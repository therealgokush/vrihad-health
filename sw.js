// Caches only this shell (page, manifest, icons) so the app opens instantly. Health data is never cached:
// the portal always loads live from Google. Shares the therealgokush.github.io origin with the Saiyan Health
// shell, so it only ever touches caches that start with its own prefix.
const PREFIX = 'vrihad-shell-';
const CACHE = PREFIX + 'v1';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const scope = new URL(self.registration.scope);
  // Google requests, and anything outside this app's folder, go straight to the network.
  if (e.request.method !== 'GET' || url.origin !== location.origin || !url.pathname.startsWith(scope.pathname)) return;
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
