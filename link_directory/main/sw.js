self.addEventListener('install', event => {
  self.skipWaiting(); // optional: activates immediately
});

self.addEventListener('activate', event => {
  // optional: cleanup or logging
});

self.addEventListener('fetch', event => {
  // basic pass-through, required to make it a PWA
});
