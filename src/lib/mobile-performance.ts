/**
 * Mobile Performance Monitoring
 * Monitors and optimizes performance metrics specifically for mobile devices
 */

import { getCLS, getINP, getFCP, getLCP, getTTFB } from 'web-vitals'

// Mobile-specific thresholds (stricter than desktop)
const MOBILE_THRESHOLDS = {
  CLS: 0.1,      // Cumulative Layout Shift
  LCP: 2500,      // Largest Contentful Paint (ms)
  INP: 100,       // Interaction to Next Paint (ms)
  FCP: 1800,      // First Contentful Paint (ms)
  TTFB: 600,      // Time to First Byte (ms)
}

interface PerformanceMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
  isMobile: boolean
}

class MobilePerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private isMobile: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 768
    }
  }

  /**
   * Initialize mobile performance monitoring
   */
  init() {
    if (typeof window === 'undefined') return

    console.log('[Mobile Performance] Initializing monitoring for', this.isMobile ? 'mobile' : 'desktop')

    // Monitor Core Web Vitals
    this.monitorCLS()
    this.monitorLCP()
    this.monitorINP()
    this.monitorFCP()
    this.monitorTTFB()

    // Monitor resource loading
    this.monitorResources()

    // Monitor long tasks
    this.monitorLongTasks()
  }

  /**
   * Monitor Cumulative Layout Shift
   */
  private monitorCLS() {
    getCLS((metric) => {
      const rating = this.getRating(metric.value, MOBILE_THRESHOLDS.CLS)
      this.recordMetric('CLS', metric.value, rating)

      if (rating !== 'good') {
        console.warn('[Mobile Performance] CLS issue detected:', metric.value, 'threshold:', MOBILE_THRESHOLDS.CLS)
        this.suggestCLSFixes()
      }
    })
  }

  /**
   * Monitor Largest Contentful Paint
   */
  private monitorLCP() {
    getLCP((metric) => {
      const rating = this.getRating(metric.value, MOBILE_THRESHOLDS.LCP)
      this.recordMetric('LCP', metric.value, rating)

      if (rating !== 'good') {
        console.warn('[Mobile Performance] LCP issue detected:', metric.value, 'threshold:', MOBILE_THRESHOLDS.LCP)
        this.suggestLCPFixes()
      }
    })
  }

  /**
   * Monitor Interaction to Next Paint (replaces deprecated FID)
   */
  private monitorINP() {
    getINP((metric) => {
      const rating = this.getRating(metric.value, MOBILE_THRESHOLDS.INP)
      this.recordMetric('INP', metric.value, rating)

      if (rating !== 'good') {
        console.warn('[Mobile Performance] INP issue detected:', metric.value, 'threshold:', MOBILE_THRESHOLDS.INP)
        this.suggestINPFixes()
      }
    })
  }

  /**
   * Monitor First Contentful Paint
   */
  private monitorFCP() {
    getFCP((metric) => {
      const rating = this.getRating(metric.value, MOBILE_THRESHOLDS.FCP)
      this.recordMetric('FCP', metric.value, rating)

      if (rating !== 'good') {
        console.warn('[Mobile Performance] FCP issue detected:', metric.value, 'threshold:', MOBILE_THRESHOLDS.FCP)
      }
    })
  }

  /**
   * Monitor Time to First Byte
   */
  private monitorTTFB() {
    getTTFB((metric) => {
      const rating = this.getRating(metric.value, MOBILE_THRESHOLDS.TTFB)
      this.recordMetric('TTFB', metric.value, rating)

      if (rating !== 'good') {
        console.warn('[Mobile Performance] TTFB issue detected:', metric.value, 'threshold:', MOBILE_THRESHOLDS.TTFB)
      }
    })
  }

  /**
   * Monitor resource loading performance
   */
  private monitorResources() {
    if (typeof window === 'undefined' || !window.performance) return

    // Use PerformanceObserver for resource timing
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.entryType === 'resource') {
            const resource = entry as PerformanceResourceTiming
            const duration = resource.duration

            // Flag slow resources (> 2 seconds)
            if (duration > 2000) {
              console.warn('[Mobile Performance] Slow resource detected:', {
                name: resource.name,
                duration: `${duration.toFixed(0)}ms`,
                size: resource.transferSize ? `${(resource.transferSize / 1024).toFixed(0)}KB` : 'unknown'
              })
            }
          }
        })
      })

      observer.observe({ entryTypes: ['resource'] })
    }
  }

  /**
   * Monitor long tasks that block the main thread
   */
  private monitorLongTasks() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.duration > 50) {
            console.warn('[Mobile Performance] Long task detected:', {
              duration: `${entry.duration.toFixed(0)}ms`,
              startTime: `${entry.startTime.toFixed(0)}ms`
            })
          }
        })
      })

      observer.observe({ entryTypes: ['longtask'] })
    } catch (e) {
      // Long task API might not be supported
      console.log('[Mobile Performance] Long task monitoring not supported')
    }
  }

  /**
   * Get rating for a metric value
   */
  private getRating(value: number, threshold: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= threshold) return 'good'
    if (value <= threshold * 1.5) return 'needs-improvement'
    return 'poor'
  }

  /**
   * Record a performance metric
   */
  private recordMetric(name: string, value: number, rating: 'good' | 'needs-improvement' | 'poor') {
    const metric: PerformanceMetric = {
      name,
      value,
      rating,
      timestamp: Date.now(),
      isMobile: this.isMobile
    }

    this.metrics.push(metric)

    // Store in sessionStorage for debugging
    if (typeof sessionStorage !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('mobile-performance-metrics')
        const metrics = stored ? JSON.parse(stored) : []
        metrics.push(metric)
        // Keep only last 50 metrics
        if (metrics.length > 50) metrics.shift()
        sessionStorage.setItem('mobile-performance-metrics', JSON.stringify(metrics))
      } catch (e) {
        // SessionStorage might be disabled
      }
    }
  }

  /**
   * Suggest fixes for CLS issues
   */
  private suggestCLSFixes() {
    console.log('[Mobile Performance] CLS Optimization Suggestions:')
    console.log('1. Ensure images have explicit width and height attributes')
    console.log('2. Reserve space for dynamic content (ads, widgets)')
    console.log('3. Avoid inserting content above existing content')
    console.log('4. Use CSS transform animations instead of changing layout properties')
  }

  /**
   * Suggest fixes for LCP issues
   */
  private suggestLCPFixes() {
    console.log('[Mobile Performance] LCP Optimization Suggestions:')
    console.log('1. Optimize images: use WebP/AVIF, lazy load non-critical images')
    console.log('2. Preload critical resources (fonts, critical CSS)')
    console.log('3. Reduce server response time (TTFB)')
    console.log('4. Minify CSS and JavaScript')
    console.log('5. Use HTTP/2 or HTTP/3')
  }

  /**
   * Suggest fixes for INP issues
   */
  private suggestINPFixes() {
    console.log('[Mobile Performance] INP Optimization Suggestions:')
    console.log('1. Break up long tasks (code splitting)')
    console.log('2. Reduce JavaScript execution time')
    console.log('3. Use web workers for heavy computations')
    console.log('4. Minimize main thread work')
    console.log('5. Use requestIdleCallback for non-critical work')
  }

  /**
   * Get all recorded metrics
   */
  getMetrics(): PerformanceMetric[] {
    return this.metrics
  }

  /**
   * Get metrics by rating
   */
  getMetricsByRating(rating: 'good' | 'needs-improvement' | 'poor'): PerformanceMetric[] {
    return this.metrics.filter(m => m.rating === rating)
  }

  /**
   * Get performance summary
   */
  getSummary() {
    const summary = {
      total: this.metrics.length,
      good: this.metrics.filter(m => m.rating === 'good').length,
      needsImprovement: this.metrics.filter(m => m.rating === 'needs-improvement').length,
      poor: this.metrics.filter(m => m.rating === 'poor').length,
      isMobile: this.isMobile
    }

    const score = Math.round((summary.good / summary.total) * 100)

    return {
      ...summary,
      score,
      rating: score >= 90 ? 'excellent' : score >= 75 ? 'good' : score >= 50 ? 'fair' : 'poor'
    }
  }
}

// Singleton instance
let monitor: MobilePerformanceMonitor | null = null

/**
 * Initialize mobile performance monitoring
 */
export function initMobilePerformanceMonitoring() {
  if (!monitor) {
    monitor = new MobilePerformanceMonitor()
    monitor.init()
  }
  return monitor
}

/**
 * Get the performance monitor instance
 */
export function getMobilePerformanceMonitor() {
  return monitor
}

/**
 * Preload critical mobile resources
 */
export function preloadCriticalMobileResources() {
  if (typeof window === 'undefined') return

  // Preload critical fonts
  const fonts = [
    '/fonts/inter-var.woff2',
  ]

  fonts.forEach(font => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.href = font
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })

  // Preconnect to critical domains
  const domains = [
    'https://hyztwerpkhopdcsenbsn.supabase.co',
    'https://images.unsplash.com',
  ]

  domains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = domain
    document.head.appendChild(link)
  })
}

/**
 * Check if current device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

/**
 * Get network information (if available)
 */
export function getNetworkInfo() {
  if (typeof window === 'undefined' || !('connection' in navigator)) {
    return null
  }

  const connection = (navigator as any).connection
  return {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData
  }
}
