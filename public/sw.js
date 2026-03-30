/* LexNext Lab — service worker mínimo para critérios de instalação PWA (Chrome).
 * Não faz cache agressivo; apenas repassa a rede. */
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
