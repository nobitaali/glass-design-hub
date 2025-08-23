# Mobile Performance Optimization Guide

## Current Issue
Mobile Lighthouse score: 78 vs Desktop: 98
Primary bottleneck: Largest Contentful Paint (LCP) at 3.0s

## Key Mobile-Specific Optimizations

### 1. Image Optimization for Mobile

#### A. Responsive Image Sizes
```javascript
// Update next.config.js - Add mobile-first image sizes
const nextConfig = {
  images: {
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200], // Mobile-first
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    // Add mobile-specific quality settings
    quality: 75, // Reduce from 80 for mobile
  }
}
```

#### B. Mobile Image Component
Create a mobile-optimized image component:
```javascript
// src/components/MobileOptimizedImage.tsx
import Image from 'next/image'
import { useState } from 'react'

interface MobileImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export const MobileOptimizedImage = ({ src, alt, className, priority }: MobileImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  
  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={priority ? 85 : 65} // Higher quality for priority images
        priority={priority}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}
```

### 2. Mobile-First JavaScript Optimization

#### A. Reduce Bundle Size
```javascript
// src/lib/mobile-optimized-imports.ts
// Use dynamic imports for non-critical components
export const LazyProductCatalog = dynamic(
  () => import('@/components/ProductCatalog'),
  { 
    ssr: false,
    loading: () => <ProductCatalogSkeleton />
  }
)

// Optimize icon imports
export { 
  ArrowRight,
  Shield,
  Award,
  Truck,
  Menu,
  X
} from 'lucide-react' // Import only needed icons
```

#### B. Mobile-Specific Slider
```javascript
// src/components/MobileImageSlider.tsx
"use client"

import { useState, useEffect, useCallback } from 'react'
import { MobileOptimizedImage } from './MobileOptimizedImage'
import { ProductSummary } from '@/lib/supabase-optimized'

interface MobileSliderProps {
  products: ProductSummary[]
}

export const MobileImageSlider = ({ products }: MobileSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg">
      <div 
        className="flex transition-transform duration-300 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {products.map((product, index) => (
          <div key={product.id} className="w-full h-full flex-shrink-0 relative">
            <MobileOptimizedImage
              src={product.image_url}
              alt={product.title}
              priority={index === 0}
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-lg font-bold mb-2">{product.title}</h3>
              <p className="text-sm opacity-90 line-clamp-2">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile-friendly dots indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
```

### 3. Mobile Layout Optimizations

#### A. Mobile-First Hero Component
```javascript
// src/components/MobileHero.tsx
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Award, Truck } from "lucide-react"
import { MobileImageSlider } from "./MobileImageSlider"

const MobileHero = ({ products }: { products: ProductSummary[] }) => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-8 md:py-16">
      <div className="container mx-auto px-4">
        {/* Mobile-first layout */}
        <div className="space-y-6 md:grid md:grid-cols-2 md:gap-8 md:items-center md:space-y-0">
          {/* Content - appears first on mobile */}
          <div className="order-2 md:order-1">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              Kaca Film & Sandblast Terbaik di Indonesia
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              Spesialis kaca film, sandblast, dan stiker dekoratif untuk rumah, kantor, dan kendaraan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
              <Button size="lg" className="group w-full sm:w-auto">
                Lihat Katalog
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Konsultasi Gratis
              </Button>
            </div>
            
            {/* Mobile-optimized features grid */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 pt-6 md:pt-8 border-t border-border">
              <div className="text-center">
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-1 md:mb-2" />
                <p className="text-xs md:text-sm font-medium">Garansi Resmi</p>
              </div>
              <div className="text-center">
                <Award className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-1 md:mb-2" />
                <p className="text-xs md:text-sm font-medium">Kualitas Premium</p>
              </div>
              <div className="text-center">
                <Truck className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-1 md:mb-2" />
                <p className="text-xs md:text-sm font-medium">Pemasangan Pro</p>
              </div>
            </div>
          </div>

          {/* Image slider - appears second on mobile */}
          <div className="order-1 md:order-2">
            <MobileImageSlider products={products} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileHero
```

### 4. Critical Resource Optimization

#### A. Preload Critical Resources
```javascript
// src/app/layout.tsx - Add mobile-specific preloads
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        {/* Mobile-critical preloads */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://hyztwerpkhopdcsenbsn.supabase.co" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Mobile viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

#### B. Service Worker for Mobile Caching
```javascript
// public/mobile-sw.js
const CACHE_NAME = 'glass-design-mobile-v1'
const CRITICAL_RESOURCES = [
  '/',
  '/manifest.json',
  '/_next/static/css/app.css',
  '/_next/static/chunks/main.js'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CRITICAL_RESOURCES))
  )
})

self.addEventListener('fetch', (event) => {
  // Cache images aggressively on mobile
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) return response
          
          return fetch(event.request).then((response) => {
            const responseClone = response.clone()
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseClone))
            return response
          })
        })
    )
  }
})
```

### 5. Mobile Performance Monitoring

#### A. Mobile-Specific Web Vitals
```javascript
// src/lib/mobile-performance.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

export function initMobilePerformanceMonitoring() {
  const isMobile = window.innerWidth < 768
  
  if (isMobile) {
    // Mobile-specific thresholds
    getCLS((metric) => {
      if (metric.value > 0.1) { // Stricter for mobile
        console.warn('Mobile CLS issue:', metric.value)
      }
    })
    
    getLCP((metric) => {
      if (metric.value > 2500) { // Mobile LCP threshold
        console.warn('Mobile LCP issue:', metric.value)
      }
    })
    
    getFID((metric) => {
      if (metric.value > 100) { // Mobile FID threshold
        console.warn('Mobile FID issue:', metric.value)
      }
    })
  }
}
```

### 6. Implementation Priority

1. **Immediate (High Impact)**:
   - Implement MobileOptimizedImage component
   - Add mobile-specific image sizes to next.config.js
   - Create mobile-first Hero component

2. **Short Term (Medium Impact)**:
   - Implement touch-friendly MobileImageSlider
   - Add service worker for mobile caching
   - Optimize bundle splitting for mobile

3. **Long Term (Optimization)**:
   - Implement mobile performance monitoring
   - Add progressive loading strategies
   - Optimize for different mobile network conditions

### 7. Expected Improvements

After implementing these optimizations:
- **LCP**: Reduce from 3.0s to ~1.8s (40% improvement)
- **Mobile Score**: Increase from 78 to 90+ (15% improvement)
- **Bundle Size**: Reduce mobile-critical JS by 30%
- **Image Loading**: 50% faster on mobile networks

### 8. Testing Strategy

```bash
# Test mobile performance
npm run build
npm start

# Run Lighthouse mobile audit
lighthouse http://localhost:3000 --preset=perf --form-factor=mobile --throttling-method=devtools

# Test on real devices
# Use Chrome DevTools Device Mode
# Test on actual mobile devices with slow 3G
```

## Next Steps

1. Start with image optimization (highest impact)
2. Implement mobile-first components
3. Add performance monitoring
4. Test on real mobile devices
5. Iterate based on metrics

This mobile-first approach should significantly improve your Lighthouse mobile score while maintaining the desktop performance.