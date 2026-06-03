// Self-destroying service worker
self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  self.clients.claim().then(function() {
    self.registration.unregister().then(function() {
      console.log('Service Worker successfully self-destroyed.');
    });
  });
});
