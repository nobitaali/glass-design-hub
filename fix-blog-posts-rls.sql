-- Fix RLS policies untuk blog_posts

-- 1. Drop existing policies jika ada masalah
DROP POLICY IF EXISTS "Allow public read access to published blog_posts" ON blog_posts;

-- 2. Create comprehensive policies
CREATE POLICY "Allow public read access to all blog_posts" ON blog_posts
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow admin full access to blog_posts" ON blog_posts
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- 3. Atau disable RLS sementara untuk testing
-- ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;

-- 4. Verifikasi policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'blog_posts';