self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim().then(() => {
    self.registration.unregister().then(() => {
      console.log('Nicepage Worker Cleared Successfully.');
    });
  });
});
