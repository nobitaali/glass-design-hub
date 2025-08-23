// Performance optimization utilities

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload critical fonts
    const fontPreloads = [
      '/fonts/inter-var.woff2',
      '/fonts/inter-var-latin.woff2'
    ];

    fontPreloads.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Preconnect to external domains
    const preconnectDomains = [
      'https://hyztwerpkhopdcsenbsn.supabase.co',
      'https://images.unsplash.com'
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });
  }
};

// Optimize images for better loading
export const optimizeImageUrl = (url: string, width?: number, quality?: number): string => {
  if (!url) return '';
  
  // For Supabase images, add optimization parameters
  if (url.includes('supabase.co')) {
    const params = new URLSearchParams();
    if (width) params.set('width', width.toString());
    if (quality) params.set('quality', quality.toString());
    params.set('format', 'webp');
    
    return `${url}?${params.toString()}`;
  }
  
  return url;
};

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  });
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
};

// Web Vitals tracking
export const trackWebVitals = () => {
  if (typeof window !== 'undefined') {
    // Track CLS (Cumulative Layout Shift)
    let clsValue = 0;
    let clsEntries: any[] = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          clsEntries.push(entry);
        }
      }
    });

    if ('PerformanceObserver' in window) {
      observer.observe({ type: 'layout-shift', buffered: true });
    }

    // Track LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });

    if ('PerformanceObserver' in window) {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    }

    // Track FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('FID:', (entry as any).processingStart - entry.startTime);
      }
    });

    if ('PerformanceObserver' in window) {
      fidObserver.observe({ type: 'first-input', buffered: true });
    }
  }
};

// Resource hints for better loading
export const addResourceHints = () => {
  if (typeof document !== 'undefined') {
    // DNS prefetch for external domains
    const dnsPrefetchDomains = [
      '//hyztwerpkhopdcsenbsn.supabase.co',
      '//images.unsplash.com'
    ];

    dnsPrefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  }
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  }
};