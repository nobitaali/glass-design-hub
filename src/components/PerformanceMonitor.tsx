"use client";

import { useEffect } from 'react';

// Web Vitals monitoring
export default function PerformanceMonitor() {
useEffect(() => {
  // Hanya jalan di development
  if (process.env.NODE_ENV !== 'development') return;

  import('web-vitals').then((webVitals) => {
    if (webVitals.onCLS) webVitals.onCLS(console.log);
    if (webVitals.onFID) webVitals.onFID(console.log);
    if (webVitals.onFCP) webVitals.onFCP(console.log);
    if (webVitals.onLCP) webVitals.onLCP(console.log);
    if (webVitals.onTTFB) webVitals.onTTFB(console.log);
  }).catch(() => {});

  // Observers untuk dev only
  if ('PerformanceObserver' in window) {
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            console.log('Layout Shift:', entry);
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.log('Long Task:', entry);
          }
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });

      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('LCP:', entry);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

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
      
      {/* Critical resources are handled by Next.js font optimization */}
    </>
  );
}