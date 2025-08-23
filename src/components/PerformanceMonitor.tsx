"use client";

import { useEffect } from 'react';

// Web Vitals monitoring
export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Dynamic import to avoid loading in development
    import('web-vitals').then((webVitals) => {
      // Core Web Vitals
      if (webVitals.onCLS) webVitals.onCLS(console.log);
      if (webVitals.onFID) webVitals.onFID(console.log);
      if (webVitals.onFCP) webVitals.onFCP(console.log);
      if (webVitals.onLCP) webVitals.onLCP(console.log);
      if (webVitals.onTTFB) webVitals.onTTFB(console.log);
    }).catch(() => {
      // Silently fail if web-vitals is not available
    });

    // Performance observer for additional metrics
    if ('PerformanceObserver' in window) {
      try {
        // Observe layout shifts
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
              console.log('Layout Shift:', entry);
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Observe long tasks
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.log('Long Task:', entry);
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });

        // Observe largest contentful paint
        const lcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log('LCP:', entry);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Cleanup observers
        return () => {
          clsObserver.disconnect();
          longTaskObserver.disconnect();
          lcpObserver.disconnect();
        };
      } catch (error) {
        console.warn('Performance monitoring setup failed:', error);
      }
    }
  }, []);

  return null;
}

// Resource hints component
export function ResourceHints() {
  return (
    <>
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//hyztwerpkhopdcsenbsn.supabase.co" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//maps.googleapis.com" />
      
      {/* Preconnect to critical origins */}
      <link rel="preconnect" href="https://hyztwerpkhopdcsenbsn.supabase.co" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* Preload critical resources */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin=""
      />
    </>
  );
}