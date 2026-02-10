/**
 * Mobile Service Worker
 * Optimized caching strategy for mobile devices
 */

const CACHE_NAME = 'glass-design-mobile-v1'
const CRITICAL_RESOURCES = [
  '/',
  '/manifest.json',
  '/_next/static/css/app.css',
  '/_next/static/chunks/main.js',
  '/_next/static/chunks/pages/_app.js',
  '/_next/static/chunks/pages/_document.js',
]

const IMAGE_CACHE = 'glass-design-images-v1'
const API_CACHE = 'glass-design-api-v1'

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first, then network (for static assets)
  CACHE_FIRST: 'cache-first',
  // Network first, then cache (for API calls)
  NETWORK_FIRST: 'network-first',
  // Stale while revalidate (for frequently updated content)
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
}

/**
 * Install event - cache critical resources
 */
self.addEventListener('install', (event) => {
  console.log('[Mobile SW] Installing service worker')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Mobile SW] Caching critical resources')
        return cache.addAll(CRITICAL_RESOURCES)
      })
      .then(() => {
        console.log('[Mobile SW] Critical resources cached')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('[Mobile SW] Failed to cache critical resources:', error)
      })
  )
})

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[Mobile SW] Activating service worker')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== IMAGE_CACHE && 
                cacheName !== API_CACHE) {
              console.log('[Mobile SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('[Mobile SW] Old caches cleaned up')
        return self.clients.claim()
      })
  )
})

/**
 * Fetch event - handle requests with different strategies
 */
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return

  // Handle different resource types
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request))
  } else if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleAPIRequest(request))
  } else if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(handleStaticRequest(request))
  } else {
    event.respondWith(handleNavigationRequest(request))
  }
})

/**
 * Handle image requests with aggressive caching
 */
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE)
  const cachedResponse = await cache.match(request)

  if (cachedResponse) {
    // Return cached image and update in background
    fetchAndCache(request, cache)
    return cachedResponse
  }

  // Fetch and cache new image
  const networkResponse = await fetch(request)
  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone())
  }

  return networkResponse
}

/**
 * Handle API requests with network-first strategy
 */
async function handleAPIRequest(request) {
  const cache = await caches.open(API_CACHE)
  
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // Cache successful responses for 5 minutes
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    // Fall back to cache if network fails
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      console.log('[Mobile SW] Returning cached API response for:', request.url)
      return cachedResponse
    }
    
    // Return offline fallback
    return new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

/**
 * Handle static Next.js resources with cache-first strategy
 */
async function handleStaticRequest(request) {
  const cache = await caches.open(CACHE_NAME)
  const cachedResponse = await cache.match(request)

  if (cachedResponse) {
    return cachedResponse
  }

  const networkResponse = await fetch(request)
  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone())
  }

  return networkResponse
}

/**
 * Handle navigation requests
 */
async function handleNavigationRequest(request) {
  const cache = await caches.open(CACHE_NAME)
  const cachedResponse = await cache.match(request)

  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    // Return cached index.html for SPA navigation
    const cachedIndex = await cache.match('/')
    if (cachedIndex) {
      return cachedIndex
    }
    
    // Return offline page
    return new Response('<h1>Offline</h1><p>Please check your connection</p>', {
      status: 503,
      headers: { 'Content-Type': 'text/html' }
    })
  }
}

/**
 * Fetch and cache in background
 */
async function fetchAndCache(request, cache) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
  } catch (error) {
    console.error('[Mobile SW] Failed to fetch and cache:', error)
  }
}

/**
 * Handle message events
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(urls))
    )
  }
})
