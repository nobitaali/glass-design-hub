-- Script untuk membuat admin user
-- Jalankan ini di Supabase SQL Editor setelah user sudah sign up

-- 1. Cek user yang sudah terdaftar
SELECT id, email, created_at FROM auth.users;

-- 2. Cek admin_users yang sudah ada
SELECT * FROM admin_users;

-- 3. Buat admin user (ganti 'USER_ID_DARI_AUTH_USERS' dengan ID yang sebenarnya)
-- Contoh:
-- INSERT INTO admin_users (user_id, name, role) 
-- VALUES ('12345678-1234-1234-1234-123456789012', 'Admin User', 'admin');

-- 4. Verifikasi admin user sudah dibuat
SELECT au.*, u.email 
FROM admin_users au 
JOIN auth.users u ON au.user_id = u.id;