# Admin Panel Setup Guide

## Overview
This admin panel provides a complete content management system for the blog with authentication, role-based access, and a user-friendly interface for creating and managing blog posts.

## Features

### ✅ Authentication System
- **Secure Login**: Email/password authentication via Supabase Auth
- **Role-based Access**: Admin-only access with role verification
- **Session Management**: Automatic session handling and logout
- **Route Protection**: Middleware protection for admin routes

### ✅ Blog Management
- **Create Posts**: Rich form with all necessary fields
- **Edit Posts**: Full editing capabilities with preview
- **Delete Posts**: Safe deletion with confirmation
- **Draft System**: Save as draft or publish immediately
- **Featured Posts**: Mark posts as featured
- **SEO Optimization**: Built-in SEO fields and optimization

### ✅ Content Features
- **Categories**: Organized content categorization
- **Tags**: Flexible tagging system
- **Media Management**: Image URL handling with preview
- **Auto-calculations**: Automatic read time calculation
- **Slug Generation**: Auto-generate SEO-friendly URLs

### ✅ Dashboard Analytics
- **Statistics**: Total posts, published, drafts, views
- **Recent Posts**: Quick access to latest content
- **Performance Metrics**: View tracking and analytics

## Setup Instructions

### 1. Database Setup

Run the complete SQL schema in your Supabase SQL editor:

```sql
-- Execute the entire supabase-blog-schema.sql file
-- This creates all necessary tables and sample data
```

### 2. Create Admin User

Ada beberapa cara untuk membuat admin user:

#### Opsi A: Menggunakan Setup Page (Recommended)
1. **Kunjungi** `/admin/setup` di browser Anda
2. **Isi form** dengan data admin:
   - Nama lengkap
   - Email
   - Password (minimal 6 karakter)
3. **Klik** "Buat Admin User"
4. **Cek email** untuk verifikasi (jika email confirmation diaktifkan)
5. **Login** di `/admin/login`

#### Opsi B: Manual via Supabase Dashboard
1. **Sign up user** di Supabase Auth dashboard atau via aplikasi
2. **Cek User ID** di tabel auth.users:
   ```sql
   SELECT id, email, created_at FROM auth.users;
   ```
3. **Insert admin record**:
   ```sql
   INSERT INTO admin_users (user_id, name, role) 
   VALUES ('your-user-id-here', 'Admin Name', 'admin');
   ```

#### Opsi C: Menggunakan SQL Script
Jalankan script `create-admin-user.sql` yang sudah disediakan untuk melihat dan membuat admin user.

### 3. Environment Setup

Ensure your `.env.local` contains:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Install Dependencies

Make sure you have the required dependencies:

```bash
npm install date-fns @supabase/auth-helpers-nextjs
```

## Admin Routes

### Authentication
- `/admin/login` - Admin login page

### Dashboard
- `/admin/dashboard` - Main dashboard with statistics
- `/admin/blog` - Blog management page
- `/admin/blog/new` - Create new blog post
- `/admin/blog/edit/[id]` - Edit existing blog post

## Usage Guide

### Creating a New Blog Post

1. **Navigate** to `/admin/dashboard`
2. **Click** "Buat Artikel Baru" or go to `/admin/blog/new`
3. **Fill in** all required fields:
   - Title (auto-generates slug)
   - Excerpt (150-200 characters)
   - Content (HTML format)
   - Author information
   - Category selection
   - Tags (at least one required)
   - Featured image URL
   - SEO metadata

4. **Save as Draft** or **Publish** immediately

### Editing Blog Posts

1. **Go to** `/admin/blog` for the management page
2. **Use filters** to find specific posts
3. **Click edit icon** on any post
4. **Make changes** and save
5. **Toggle publish status** as needed

### Managing Content

- **Search & Filter**: Use the search and filter options to find specific content
- **Bulk Actions**: Toggle publish/featured status directly from the list
- **Preview**: View posts as they appear to users
- **Analytics**: Track views and engagement

## Security Features

### Authentication
- **Supabase Auth**: Secure authentication system
- **Role Verification**: Admin role required for access
- **Session Management**: Automatic session handling
- **Route Protection**: Middleware-based protection

### Data Security
- **Row Level Security**: Database-level security policies
- **Input Validation**: Form validation and sanitization
- **CSRF Protection**: Built-in Next.js CSRF protection

## Content Guidelines

### Writing Best Practices
1. **SEO-Friendly Titles**: Clear, descriptive, keyword-rich
2. **Compelling Excerpts**: 150-200 characters, engaging summary
3. **Structured Content**: Use proper HTML headings (H2, H3, etc.)
4. **Quality Images**: High-resolution, optimized images
5. **Relevant Tags**: 3-5 specific, relevant tags
6. **Meta Descriptions**: 150-160 characters for SEO

### HTML Content Format
The content editor accepts HTML. Use these tags:
- `<h2>`, `<h3>` for headings
- `<p>` for paragraphs
- `<ul>`, `<ol>`, `<li>` for lists
- `<strong>`, `<em>` for emphasis
- `<a href="">` for links

### Image Requirements
- **Featured Images**: 1200x630px (16:9 ratio)
- **Format**: JPG, PNG, WebP
- **Optimization**: Compressed for web
- **Alt Text**: Descriptive for accessibility

## Troubleshooting

### Common Issues

**Login Issues**
- Check Supabase credentials
- Verify admin_users table entry
- Check browser console for errors

**Permission Errors**
- Ensure user has admin role in admin_users table
- Check RLS policies in Supabase
- Verify middleware configuration

**Content Not Saving**
- Check required field validation
- Verify Supabase connection
- Check browser network tab for API errors

### Database Issues

**Missing Tables**
```sql
-- Re-run the schema file
-- Check table creation in Supabase dashboard
```

**RLS Policies**
```sql
-- Verify policies are created
SELECT * FROM pg_policies WHERE tablename IN ('blog_posts', 'blog_categories');
```

## Performance Optimization

### Content Management
- **Image Optimization**: Use optimized images
- **Content Caching**: Leverage Next.js caching
- **Database Indexing**: Proper indexes for search

### User Experience
- **Loading States**: Skeleton loaders during data fetch
- **Error Handling**: Comprehensive error messages
- **Responsive Design**: Mobile-friendly interface

## Future Enhancements

### Potential Features
- [ ] Rich text editor (WYSIWYG)
- [ ] Image upload functionality
- [ ] Bulk operations
- [ ] Content scheduling
- [ ] Comment moderation
- [ ] Analytics dashboard
- [ ] Multi-author support
- [ ] Content versioning
- [ ] Export/import functionality

### Technical Improvements
- [ ] Real-time collaboration
- [ ] Auto-save drafts
- [ ] Content templates
- [ ] Advanced SEO analysis
- [ ] Performance monitoring

## Support

### Getting Help
1. Check this documentation
2. Review Supabase documentation
3. Check Next.js documentation
4. Inspect browser console for errors
5. Verify database schema and data

### Maintenance
- **Regular Backups**: Backup your Supabase database
- **Security Updates**: Keep dependencies updated
- **Performance Monitoring**: Monitor page load times
- **Content Audits**: Regular content quality checks

This admin panel provides a robust foundation for content management while maintaining security and performance standards.