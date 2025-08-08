# Troubleshooting Guide - Admin Panel

## Error PGRST116: "JSON object requested, multiple (or no) rows returned"

### Penyebab
Error ini terjadi ketika:
1. User yang login tidak memiliki record di tabel `admin_users`
2. Query `.single()` tidak menemukan data yang sesuai

### Solusi

#### 1. Cek User ID yang Login
Ketika login gagal, error message akan menampilkan User ID. Catat ID ini.

#### 2. Verifikasi Database
Jalankan query berikut di Supabase SQL Editor:

```sql
-- Cek semua user yang terdaftar
SELECT id, email, created_at FROM auth.users;

-- Cek admin users yang sudah ada
SELECT * FROM admin_users;

-- Cek apakah user ID sudah ada di admin_users
SELECT au.*, u.email 
FROM admin_users au 
RIGHT JOIN auth.users u ON au.user_id = u.id;
```

#### 3. Tambahkan User ke Admin
Ganti `USER_ID_DARI_ERROR_MESSAGE` dengan ID yang muncul di error:

```sql
INSERT INTO admin_users (user_id, name, role) 
VALUES ('USER_ID_DARI_ERROR_MESSAGE', 'Admin User', 'admin');
```

#### 4. Verifikasi
```sql
-- Pastikan user sudah ditambahkan
SELECT au.*, u.email 
FROM admin_users au 
JOIN auth.users u ON au.user_id = u.id 
WHERE au.user_id = 'USER_ID_DARI_ERROR_MESSAGE';
```

## Cara Mudah: Gunakan Setup Page

### Langkah-langkah:
1. **Buka** `/admin/setup` di browser
2. **Isi form** dengan data admin baru
3. **Submit** - sistem akan otomatis:
   - Membuat user di Supabase Auth
   - Menambahkan record ke tabel admin_users
   - Menampilkan User ID untuk referensi

### Keuntungan Setup Page:
- ✅ Otomatis membuat user dan admin record
- ✅ Tidak perlu akses manual ke database
- ✅ Error handling yang lebih baik
- ✅ User ID ditampilkan untuk referensi

## Error Lainnya

### "Invalid login credentials"
**Penyebab**: Email/password salah atau user belum terverifikasi
**Solusi**: 
- Pastikan email dan password benar
- Cek email untuk link verifikasi
- Cek di Supabase Auth dashboard apakah user sudah confirmed

### "User not found"
**Penyebab**: User belum sign up
**Solusi**: Gunakan `/admin/setup` untuk membuat user baru

### Middleware Redirect Loop
**Penyebab**: Middleware tidak bisa verifikasi user
**Solusi**: 
- Clear browser cookies
- Logout dan login ulang
- Cek environment variables

## Debugging Tips

### 1. Browser Console
Buka Developer Tools (F12) dan cek:
- Console untuk error JavaScript
- Network tab untuk API calls
- Application tab untuk cookies/localStorage

### 2. Supabase Dashboard
Cek di dashboard:
- Authentication > Users (untuk melihat user yang terdaftar)
- Table Editor > admin_users (untuk melihat admin records)
- Logs untuk error database

### 3. Environment Variables
Pastikan `.env.local` berisi:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Quick Fix Commands

### Reset Admin User
```sql
-- Hapus admin user lama
DELETE FROM admin_users WHERE user_id = 'USER_ID';

-- Tambah admin user baru
INSERT INTO admin_users (user_id, name, role) 
VALUES ('USER_ID', 'New Admin', 'admin');
```

### Cek RLS Policies
```sql
-- Lihat policies yang aktif
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('admin_users', 'blog_posts', 'blog_categories');
```

### Reset Database (Hati-hati!)
```sql
-- Hapus semua data (HANYA untuk development)
TRUNCATE admin_users, blog_posts, blog_categories CASCADE;

-- Jalankan ulang schema dari supabase-blog-schema.sql
```

## Kontak Support

Jika masih mengalami masalah:
1. Cek dokumentasi Supabase
2. Periksa GitHub issues
3. Buat issue baru dengan detail:
   - Error message lengkap
   - Langkah yang sudah dicoba
   - Screenshot jika perlu

## Prevention Tips

### 1. Backup Regular
```sql
-- Export admin users
SELECT * FROM admin_users;

-- Export blog data
SELECT * FROM blog_posts;
```

### 2. Monitor Logs
- Cek Supabase logs secara berkala
- Monitor authentication events
- Track database performance

### 3. Testing
- Test login setelah perubahan
- Verifikasi admin permissions
- Test di browser berbeda

Dengan mengikuti panduan ini, sebagian besar masalah admin panel dapat diselesaikan dengan cepat.