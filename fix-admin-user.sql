-- Fix untuk user aisyahnobita@gmail.com
-- User ID: 18d27cf9-150a-4f56-98eb-9d21455724cf

-- 1. Cek apakah user sudah ada di admin_users
SELECT * FROM admin_users WHERE user_id = '18d27cf9-150a-4f56-98eb-9d21455724cf';

-- 2. Jika belum ada, tambahkan user sebagai admin
INSERT INTO admin_users (user_id, name, role) 
VALUES ('18d27cf9-150a-4f56-98eb-9d21455724cf', 'Aisyah Admin', 'admin');

-- 3. Verifikasi user sudah ditambahkan
SELECT au.*, u.email 
FROM admin_users au 
JOIN auth.users u ON au.user_id = u.id 
WHERE au.user_id = '18d27cf9-150a-4f56-98eb-9d21455724cf';

-- 4. Cek semua admin users
SELECT au.*, u.email 
FROM admin_users au 
JOIN auth.users u ON au.user_id = u.id;