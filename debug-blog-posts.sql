-- Debug blog posts table

-- 1. Cek apakah tabel blog_posts ada
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'blog_posts';

-- 2. Cek struktur tabel blog_posts
\d blog_posts;

-- 3. Cek semua blog posts yang ada
SELECT id, title, slug, published, created_at 
FROM blog_posts 
ORDER BY created_at DESC;

-- 4. Cek RLS policies untuk blog_posts
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'blog_posts';

-- 5. Cek apakah RLS enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'blog_posts';

-- 6. Test query yang mungkin gagal
SELECT * FROM blog_posts WHERE id = 'some-uuid-here' LIMIT 1;