# Quick Setup Guide - SEO Optimization

## 🚀 Deployment Steps

### Step 1: Deploy Supabase Schema

1. Open your Supabase dashboard: https://supabase.com/dashboard
2. Navigate to: **SQL Editor**
3. Copy the contents of `supabase-seo-schema.sql`
4. Paste and **Run** the SQL

**Expected Result**: 4 new tables created with seed data

---

### Step 2: Verify Environment Variables

Check your `.env` file has these variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://hyztwerpkhopdcsenbsn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ Already configured!

---

### Step 3: Test Locally

```bash
# Install dependencies (already done)
npm install

# Run development server
npm run dev
```

Visit these URLs to test:
- http://localhost:3000 (homepage with new meta tags)
- http://localhost:3000/lokasi/bantul
- http://localhost:3000/lokasi/sleman
- http://localhost:3000/lokasi/solo
- http://localhost:3000/sitemap.xml

---

### Step 4: Build for Production

```bash
npm run build
npm run start
```

---

### Step 5: Deploy to Production

Deploy to your hosting platform (Vercel/Netlify):

```bash
# If using Vercel
vercel --prod

# If using Netlify
netlify deploy --prod
```

---

### Step 6: Submit to Google

1. **Google Search Console**
   - Submit sitemap: `https://jayasticker.id/sitemap.xml`
   - Request indexing for location pages

2. **Rich Results Test**
   - Test: https://search.google.com/test/rich-results
   - Verify LocalBusiness and FAQ schemas

---

## 📊 What to Monitor

### Week 1-2
- ✅ Location pages indexed by Google
- ✅ Schema markup validated
- ✅ No crawl errors in Search Console

### Month 1
- 📈 Keyword rankings for location-specific terms
- 👥 Organic traffic to location pages
- 📞 WhatsApp inquiries from location pages

### Month 3+
- 🏆 Top 3 rankings for target keywords
- ⭐ Rich snippets appearing in SERP
- 💼 Increased business conversions

---

## 🎯 Target Keywords to Track

### Primary (Track Weekly)
- stiker kaca jogja
- kaca film jogja
- sandblast jogja

### Location-Specific (Track Monthly)
- stiker kaca bantul
- stiker kaca sleman
- kaca film solo
- sandblast magelang
- stiker kaca klaten

---

## ⚠️ Important Notes

1. **Database Required**: Location pages won't work until Supabase schema is deployed
2. **Build Errors**: If build fails, check import statements in new files
3. **Schema Validation**: Use Google's tools to verify structured data
4. **Mobile Testing**: Test all location pages on mobile devices

---

## 📞 Need Help?

Review the comprehensive [walkthrough.md](file:///Users/ali/.gemini/antigravity/brain/eee30ab6-30da-443b-b456-a8ccfaf34f66/walkthrough.md) for detailed information.
