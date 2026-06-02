const CACHE_NAME = 'symmetry-v1';
const ASSETS = [
  '/dashboard.html',
  '/index.css',
  '/images/symmetrysvg.png'
];

// Installs the background script
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Runs the fetch operations safely
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

