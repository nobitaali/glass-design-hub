const CACHE_NAME = 'glass-design-mobile-v1'
const CRITICAL_RESOURCES = [
  '/',
  '/manifest.json',
  '/_next/static/css/app.css'
]

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Mobile SW: Caching critical resources')
        return cache.addAll(CRITICAL_RESOURCES)
      })
      .catch((error) => {
        console.error('Mobile SW: Failed to cache critical resources', error)
      })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Mobile SW: Deleting old cache', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - cache strategy for different resource types
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip cross-origin requests (except images)
  if (url.origin !== location.origin && !request.destination.includes('image')) {
    return
  }

  // Cache images aggressively on mobile
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            console.log('Mobile SW: Serving cached image', request.url)
            return response
          }
          
          return fetch(request).then((response) => {
            // Only cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone()
              caches.open(CACHE_NAME)
                .then((cache) => {
                  console.log('Mobile SW: Caching new image', request.url)
                  cache.put(request, responseClone)
                })
                .catch((error) => {
                  console.error('Mobile SW: Failed to cache image', error)
                })
            }
            return response
          })
        })
        .catch(() => {
          // Return a fallback image if network fails
          return new Response(
            '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af">Image unavailable</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          )
        })
    )
    return
  }

  // Cache CSS and JS files
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            console.log('Mobile SW: Serving cached resource', request.url)
            return response
          }
          
          return fetch(request).then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone()
              caches.open(CACHE_NAME)
                .then((cache) => {
                  console.log('Mobile SW: Caching new resource', request.url)
                  cache.put(request, responseClone)
                })
            }
            return response
          })
        })
    )
    return
  }

  // For HTML pages, use network-first strategy
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseClone)
              })
          }
          return response
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request)
            .then((response) => {
              return response || new Response('Offline - Please check your connection', {
                status: 503,
                statusText: 'Service Unavailable'
              })
            })
        })
    )
  }
})

// Handle background sync for mobile
self.addEventListener('sync', (event) => {
  if (event.tag === 'mobile-performance-sync') {
    event.waitUntil(
      // Sync performance data when connection is restored
      console.log('Mobile SW: Syncing performance data')
    )
  }
})

// Handle push notifications (if needed)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/android-chrome-192x192.png',
      badge: '/android-chrome-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      }
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})