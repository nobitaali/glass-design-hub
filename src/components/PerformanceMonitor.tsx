"use client";

import { useEffect } from 'react';

// Declare gtag function type
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production and in browser
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
      return;
    }

    // Web Vitals monitoring
    const observeWebVitals = () => {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        // Send to analytics or console
        console.log('LCP:', lastEntry.startTime);
        
        // You can send this to your analytics service
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'web_vitals', {
            name: 'LCP',
            value: Math.round(lastEntry.startTime),
            event_category: 'Web Vitals'
          });
        }
      });

      if ('PerformanceObserver' in window) {
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      }

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fid = (entry as any).processingStart - entry.startTime;
          console.log('FID:', fid);
          
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'web_vitals', {
              name: 'FID',
              value: Math.round(fid),
              event_category: 'Web Vitals'
            });
          }
        }
      });

      if ('PerformanceObserver' in window) {
        fidObserver.observe({ type: 'first-input', buffered: true });
      }

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        
        console.log('CLS:', clsValue);
        
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'web_vitals', {
            name: 'CLS',
            value: Math.round(clsValue * 1000),
            event_category: 'Web Vitals'
          });
        }
      });

      if ('PerformanceObserver' in window) {
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      }
    };

    // Resource loading performance
    const observeResourceTiming = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;
          
          // Monitor slow resources
          if (resource.duration > 1000) {
            console.warn('Slow resource:', resource.name, resource.duration);
          }
          
          // Monitor large resources
          if (resource.transferSize && resource.transferSize > 500000) {
            console.warn('Large resource:', resource.name, resource.transferSize);
          }
        }
      });

      if ('PerformanceObserver' in window) {
        observer.observe({ type: 'resource', buffered: true });
      }
    };

    // Initialize monitoring
    observeWebVitals();
    observeResourceTiming();

    // Cleanup
    return () => {
      // Observers are automatically cleaned up when component unmounts
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;