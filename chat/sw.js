// sw.js - Combined Service Worker for PWA and Notifications

self.addEventListener("install", (event) => {
    // Forces the waiting service worker to become the active service worker.
    self.skipWaiting();
    console.log("Service Worker installed");
});

self.addEventListener("activate", (event) => {
    // Allows the service worker to take control of the page immediately
    event.waitUntil(clients.claim());
    console.log("Service Worker activated");
});

// Basic fetch handler (required for the "Install App" prompt on many browsers)
self.addEventListener("fetch", (event) => {
    event.respondWith(fetch(event.request));
});

// Handles what happens when a user clicks a notification
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Close the notification bubble
    
    // This logic finds your chat tab and brings it to the front
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes('/') && 'focus' in client) {
                    return client.focus();
                }
            }
            // If the chat isn't open, open it
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
