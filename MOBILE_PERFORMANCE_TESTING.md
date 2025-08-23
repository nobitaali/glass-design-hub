# Mobile Performance Testing Guide

## Quick Test Commands

### 1. Build and Test Locally
```bash
# Build the optimized version
npm run build

# Start production server
npm start

# Test in another terminal
lighthouse http://localhost:3000 --preset=perf --form-factor=mobile --throttling-method=devtools --output=html --output-path=./mobile-lighthouse-report.html
```

### 2. Mobile-Specific Lighthouse Test
```bash
# Mobile audit with slow 3G simulation
lighthouse http://localhost:3000 \
  --form-factor=mobile \
  --throttling-method=devtools \
  --throttling.rttMs=150 \
  --throttling.throughputKbps=1638.4 \
  --throttling.cpuSlowdownMultiplier=4 \
  --output=html \
  --output-path=./mobile-slow-3g-report.html
```

### 3. Compare Before/After
```bash
# Run both desktop and mobile tests
lighthouse http://localhost:3000 --preset=perf --form-factor=desktop --output=html --output-path=./desktop-after.html
lighthouse http://localhost:3000 --preset=perf --form-factor=mobile --output=html --output-path=./mobile-after.html
```

## Expected Improvements

### Before Optimization:
- **Mobile Score**: 78
- **LCP**: 3.0s
- **FID**: ~100ms
- **CLS**: Variable

### After Optimization (Target):
- **Mobile Score**: 90+
- **LCP**: ~1.8s (40% improvement)
- **FID**: <100ms
- **CLS**: <0.1

## Key Changes Made

### 1. Image Optimization
- ✅ Added mobile-first device sizes (320px, 420px, etc.)
- ✅ Created MobileOptimizedImage component with progressive loading
- ✅ Reduced image quality to 75% for mobile (from 80%)
- ✅ Added proper loading states and error handling

### 2. Mobile-First Components
- ✅ Created MobileImageSlider with touch gestures
- ✅ Built MobileHero component optimized for mobile layout
- ✅ Implemented mobile-first responsive design

### 3. Performance Monitoring
- ✅ Added mobile-specific Web Vitals monitoring
- ✅ Created mobile performance utilities
- ✅ Added service worker for aggressive mobile caching

### 4. Bundle Optimization
- ✅ Updated webpack config for better mobile splitting
- ✅ Optimized imports for mobile-critical resources
- ✅ Added mobile-specific resource preloading

## Testing Checklist

### Manual Testing
- [ ] Test on actual mobile devices (Android/iOS)
- [ ] Test with slow 3G connection
- [ ] Test touch gestures on image slider
- [ ] Verify image loading states work properly
- [ ] Check responsive layout on different screen sizes

### Automated Testing
- [ ] Run Lighthouse mobile audit
- [ ] Check Web Vitals in Chrome DevTools
- [ ] Verify service worker is working (Application tab)
- [ ] Test offline functionality
- [ ] Monitor network requests in DevTools

### Performance Metrics to Monitor
1. **Largest Contentful Paint (LCP)**
   - Target: <2.5s
   - Critical for mobile score

2. **First Input Delay (FID)**
   - Target: <100ms
   - Important for interactivity

3. **Cumulative Layout Shift (CLS)**
   - Target: <0.1
   - Prevents layout jumping

4. **First Contentful Paint (FCP)**
   - Target: <1.8s
   - Shows content loading speed

## Debugging Mobile Issues

### Chrome DevTools Mobile Testing
1. Open DevTools (F12)
2. Click device toggle (Ctrl+Shift+M)
3. Select mobile device (iPhone 12, Pixel 5, etc.)
4. Set throttling to "Slow 3G"
5. Run Performance audit

### Real Device Testing
1. Connect mobile device via USB
2. Enable USB debugging (Android) or Web Inspector (iOS)
3. Use Chrome DevTools remote debugging
4. Test on actual mobile networks

### Common Mobile Performance Issues
- **Large images**: Check if WebP/AVIF is working
- **JavaScript blocking**: Verify lazy loading is working
- **Layout shifts**: Check if skeleton loaders have fixed dimensions
- **Touch responsiveness**: Test gesture handling
- **Network timeouts**: Test on slow connections

## Monitoring in Production

### Web Vitals Monitoring
The mobile performance monitoring will automatically track:
- LCP issues (>2.5s)
- FID issues (>100ms)
- CLS issues (>0.1)
- Memory usage on mobile devices
- Network connection quality

### Analytics Integration
Performance issues are automatically reported to Google Analytics (if enabled):
```javascript
// Example events sent
gtag('event', 'mobile_lcp_issue', {
  value: 3200, // LCP time in ms
  custom_parameter: 'mobile_performance'
})
```

## Rollback Plan

If mobile performance degrades:

1. **Quick Rollback**:
   ```bash
   # Revert to previous components
   git checkout HEAD~1 -- src/components/MobileHero.tsx
   git checkout HEAD~1 -- src/components/MobileImageSlider.tsx
   ```

2. **Disable Mobile Components**:
   ```javascript
   // In src/app/page.tsx, comment out mobile components
   // <div className="block md:hidden">
   //   <MobileHero products={products} />
   // </div>
   ```

3. **Revert Next.js Config**:
   ```bash
   git checkout HEAD~1 -- next.config.js
   ```

## Next Steps for Further Optimization

1. **Advanced Image Optimization**:
   - Implement responsive images with art direction
   - Add blur-up placeholders
   - Use progressive JPEG for large images

2. **Advanced Caching**:
   - Implement HTTP/2 Server Push
   - Add edge caching with Vercel/Cloudflare
   - Optimize cache headers

3. **Code Splitting**:
   - Split components by route
   - Implement dynamic imports for heavy components
   - Use React.lazy for non-critical components

4. **Network Optimization**:
   - Implement resource hints (preload, prefetch)
   - Add critical CSS inlining
   - Optimize font loading strategy

## Success Metrics

### Primary Goals
- Mobile Lighthouse score: 78 → 90+
- LCP improvement: 3.0s → <2.5s
- User engagement: Reduce bounce rate on mobile

### Secondary Goals
- Faster image loading on mobile
- Better touch interaction experience
- Reduced data usage on mobile networks
- Improved Core Web Vitals scores

Run the tests and monitor the results to ensure the optimizations are working as expected!