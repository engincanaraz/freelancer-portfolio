const CACHE_NAME = 'akeller-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/products.html',
  '/contact.html',
  '/css/main.css',
  '/js/main.js',
  '/img/logo.png',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css'
];

// Service Worker Kurulumu
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache ve Network Stratejisi
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache'de varsa cache'den döndür
        if (response) {
          return response;
        }

        // Cache'de yoksa network'den al ve cache'e ekle
        return fetch(event.request).then(
          response => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Cache Güncelleme
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 