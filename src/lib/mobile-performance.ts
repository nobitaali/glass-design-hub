// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Mobile Performance Monitoring
export function initMobilePerformanceMonitoring() {
  if (typeof window === 'undefined') return

  const isMobile = window.innerWidth < 768
  
  if (isMobile) {
    // Monitor mobile-specific metrics
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        // Mobile-specific thresholds (stricter than desktop)
        getCLS((metric) => {
          if (metric.value > 0.1) { // Stricter for mobile
            console.warn('Mobile CLS issue:', metric.value)
            // Send to analytics
            if (typeof window.gtag !== 'undefined') {
              window.gtag('event', 'mobile_cls_issue', {
                value: metric.value,
                custom_parameter: 'mobile_performance'
              })
            }
          }
        })
        
        getLCP((metric) => {
          if (metric.value > 2500) { // Mobile LCP threshold
            console.warn('Mobile LCP issue:', metric.value)
            if (typeof window.gtag !== 'undefined') {
              window.gtag('event', 'mobile_lcp_issue', {
                value: metric.value,
                custom_parameter: 'mobile_performance'
              })
            }
          }
        })
        
        getFID((metric) => {
          if (metric.value > 100) { // Mobile FID threshold
            console.warn('Mobile FID issue:', metric.value)
            if (typeof window.gtag !== 'undefined') {
              window.gtag('event', 'mobile_fid_issue', {
                value: metric.value,
                custom_parameter: 'mobile_performance'
              })
            }
          }
        })

        getFCP((metric) => {
          if (metric.value > 1800) { // Mobile FCP threshold
            console.warn('Mobile FCP issue:', metric.value)
          }
        })

        getTTFB((metric) => {
          if (metric.value > 800) { // Mobile TTFB threshold
            console.warn('Mobile TTFB issue:', metric.value)
          }
        })
      }).catch((error) => {
        console.warn('Failed to load web-vitals:', error)
      })
    }

    // Monitor mobile-specific issues
    monitorMobileSpecificIssues()
  }
}

function monitorMobileSpecificIssues() {
  // Monitor memory usage on mobile
  if ('memory' in performance) {
    const memoryInfo = (performance as any).memory
    if (memoryInfo.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB threshold
      console.warn('High memory usage on mobile:', memoryInfo.usedJSHeapSize)
    }
  }

  // Monitor network conditions
  if ('connection' in navigator) {
    const connection = (navigator as any).connection
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      console.warn('Slow network detected:', connection.effectiveType)
      // Could trigger different loading strategies
    }
  }

  // Monitor viewport changes (orientation)
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      // Re-measure after orientation change
      console.log('Orientation changed, viewport:', window.innerWidth, 'x', window.innerHeight)
    }, 100)
  })
}

// Utility to detect mobile device capabilities
export function getMobileCapabilities() {
  if (typeof window === 'undefined') return null

  return {
    isMobile: window.innerWidth < 768,
    isTouch: 'ontouchstart' in window,
    supportsWebP: checkWebPSupport(),
    supportsAVIF: checkAVIFSupport(),
    connectionType: getConnectionType(),
    memoryInfo: getMemoryInfo(),
    devicePixelRatio: window.devicePixelRatio || 1
  }
}

function checkWebPSupport(): boolean {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
}

function checkAVIFSupport(): boolean {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0
}

function getConnectionType(): string {
  if ('connection' in navigator) {
    return (navigator as any).connection.effectiveType || 'unknown'
  }
  return 'unknown'
}

function getMemoryInfo() {
  if ('memory' in performance) {
    const memory = (performance as any).memory
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit
    }
  }
  return null
}

// Preload critical resources for mobile
export function preloadCriticalMobileResources() {
  if (typeof window === 'undefined') return

  const isMobile = window.innerWidth < 768
  
  if (isMobile) {
    // Critical mobile resources (fonts are handled by Next.js font optimization)
    const criticalResources = [
      // Add other critical mobile resources as needed
    ]

    criticalResources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = resource
      link.as = resource.endsWith('.woff2') ? 'font' : 'image'
      if (resource.endsWith('.woff2')) {
        link.type = 'font/woff2'
        link.crossOrigin = 'anonymous'
      }
      document.head.appendChild(link)
    })
  }
}