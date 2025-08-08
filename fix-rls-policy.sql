-- Fix RLS Policy untuk admin_users table

-- 1. Cek policy yang ada
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'admin_users';

-- 2. Drop existing policies jika ada
DROP POLICY IF EXISTS "Allow admin access to admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow public read access to admin_users" ON admin_users;

-- 3. Create new policies yang lebih permissive untuk setup
CREATE POLICY "Allow insert for setup" ON admin_users
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow select for authenticated users" ON admin_users
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow update for admin users" ON admin_users
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- 4. Atau disable RLS sementara untuk setup (tidak recommended untuk production)
-- ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- 5. Verifikasi policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'admin_users';