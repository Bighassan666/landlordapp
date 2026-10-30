/* ============================================================
   LANDLORD — service-worker.js
   Caches the app shell so it works offline and installs cleanly.
   ============================================================ */

const CACHE = "landlord-v2";

const SHELL = [
  "./",
  "./index.html",
  "./landlord.css",
  "./landlord.js",
  "./icon.png",
  "./palace.jpg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      // Use addAll but tolerate missing files (e.g. shots/ images you may not have)
      Promise.all(SHELL.map((url) => c.add(url).catch(() => {})))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  // Network-first for HTML so updates land immediately when online.
  // Cache-first for everything else for instant load and offline use.
  const isHTML = req.headers.get("accept")?.includes("text/html");

  if (isHTML) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => cached);
    })
  );
});