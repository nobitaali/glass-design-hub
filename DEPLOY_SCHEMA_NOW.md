# 🚨 Deploy Supabase Schema First!

## Error You're Seeing

```
Error: relation "public.location_pages" does not exist
```

This means the Supabase tables haven't been created yet.

---

## ✅ Quick Fix (5 minutes)

### Step 1: Open Supabase Dashboard
Visit: https://supabase.com/dashboard/project/hyztwerpkhopdcsenbsn

### Step 2: Go to SQL Editor
Click on **SQL Editor** in the left sidebar

### Step 3: Run the Schema
1. Click **New Query**
2. Open `supabase-seo-schema.sql` in your editor
3. Copy ALL the contents (Ctrl/Cmd + A, then Ctrl/Cmd + C)
4. Paste into the Supabase SQL Editor
5. Click **Run** (or press Ctrl/Cmd + Enter)

### Step 4: Verify Tables Created
Go to **Table Editor** and you should see:
- ✅ `seo_metadata`
- ✅ `location_pages`
- ✅ `seo_keywords`
- ✅ `faq_items`

### Step 5: Refresh Your Browser
Visit: http://localhost:3000/lokasi/sleman

**It should now work!** 🎉

---

## What Gets Created

- **5 Location Pages**: Bantul, Sleman, Solo, Magelang, Klaten
- **20 SEO Keywords**: Primary, secondary, and long-tail
- **8 FAQ Items**: With schema markup support
- **1 Homepage SEO Metadata**: Optimized meta tags

---

## Need Help?

The SQL file is here: `supabase-seo-schema.sql`

If you get any errors when running the SQL:
1. Make sure you're connected to the right project
2. Check that the `update_updated_at_column()` function exists (it should from the blog schema)
3. Try running the schema in smaller sections if needed
