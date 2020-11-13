'use strict';

// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v-DR';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/offline.html',
  '/index.html',
  'game.css',
  '/files/main.js',
  '/files/Boss.js',
  '/files/Game.js',
  '/files/Player.js',
  '/files/Opponent.js',
  '/files/Character.js',
  '/files/Entity.js',
  '/files/Shot.js',
  '/files/assets/bueno.png',
  '/files/assets/bueno_muerto.png',
  '/files/assets/clases.png',
  '/files/assets/game_over.png',
  '/files/assets/jefe.png',
  '/files/assets/jefe_muerto.png',
  '/files/assets/malo.png',
  '/files/assets/malo_muerto.png',
  '/files/assets/screenshot.png',
  '/files/assets/shot1.png',
  '/files/assets/shot2.png',
  '/files/assets/you_win.png',
  '/files/install.js'
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  // CODELAB: Add fetch event handler here.
  // if (evt.request.mode !== 'navigate') {
  //   // Not a page navigation, bail.
  //   console.log("Fetch no navigate");
  //   return;
  // }
  console.log('[ServiceWorker] Fetch', evt.request.url);
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              console.log("RESP", response);
              return response || fetch(evt.request);
            });
      })
  );
});