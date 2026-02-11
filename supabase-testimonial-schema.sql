-- =====================================================
-- TESTIMONIALS SCHEMA WITH SEO SUPPORT
-- =====================================================
-- This schema creates a comprehensive testimonial system
-- with image upload support and SEO optimization

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_title TEXT, -- e.g., "Pemilik Rumah di Bantul"
    customer_location TEXT, -- For local SEO
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    testimonial_text TEXT NOT NULL,
    project_type TEXT, -- e.g., "Kaca Film", "Sandblast", "Cutting Sticker"
    image_url TEXT, -- URL to project result image in Supabase Storage
    avatar_url TEXT, -- URL to customer avatar in Supabase Storage
    keywords TEXT[] DEFAULT '{}', -- SEO keywords array
    featured BOOLEAN DEFAULT false, -- Show on homepage
    verified BOOLEAN DEFAULT false, -- Verified testimonial badge
    published BOOLEAN DEFAULT true, -- Publish status
    display_order INTEGER DEFAULT 0, -- For custom ordering
    views INTEGER DEFAULT 0, -- Track views
    helpful_count INTEGER DEFAULT 0, -- "Was this helpful?" counter
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON public.testimonials(published);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON public.testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON public.testimonials(rating);
CREATE INDEX IF NOT EXISTS idx_testimonials_location ON public.testimonials(customer_location);
CREATE INDEX IF NOT EXISTS idx_testimonials_project_type ON public.testimonials(project_type);
CREATE INDEX IF NOT EXISTS idx_testimonials_keywords ON public.testimonials USING GIN(keywords);
CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON public.testimonials(display_order);

-- Enable Row Level Security
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Public can read published testimonials
CREATE POLICY "Public can view published testimonials"
    ON public.testimonials
    FOR SELECT
    USING (published = true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Authenticated users can manage testimonials"
    ON public.testimonials
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_testimonials_updated_at
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- SEED DATA - Sample Testimonials
-- =====================================================

INSERT INTO public.testimonials (
    customer_name,
    customer_title,
    customer_location,
    rating,
    testimonial_text,
    project_type,
    keywords,
    featured,
    verified,
    published,
    display_order
) VALUES
(
    'Budi Santoso',
    'Pemilik Rumah',
    'Bantul, Yogyakarta',
    5,
    'Pelayanan sangat memuaskan! Kaca film yang dipasang berkualitas tinggi dan hasilnya sangat rapi. Tim teknisi profesional dan ramah. Rumah jadi lebih sejuk dan hemat listrik AC. Highly recommended!',
    'Kaca Film',
    ARRAY['kaca film bantul', 'kaca film rumah', 'kaca film yogyakarta', 'jasa kaca film'],
    true,
    true,
    true,
    1
),
(
    'Siti Nurhaliza',
    'Owner Cafe',
    'Sleman, Yogyakarta',
    5,
    'Sandblast untuk kaca cafe saya hasilnya luar biasa! Motif custom sesuai request, pemasangan cepat dan rapi. Cafe jadi lebih aesthetic dan privat. Terima kasih Jaya Sticker!',
    'Sandblast',
    ARRAY['sandblast sleman', 'sandblast cafe', 'sandblast custom', 'stiker kaca'],
    true,
    true,
    true,
    2
),
(
    'Ahmad Fauzi',
    'Manajer Kantor',
    'Solo, Jawa Tengah',
    5,
    'Pesan sandblast untuk partisi kantor. Hasilnya sangat profesional, kualitas premium dengan harga terjangkau. Proses dari konsultasi sampai pemasangan lancar. Puas banget!',
    'Sandblast',
    ARRAY['sandblast solo', 'sandblast kantor', 'partisi kaca', 'sandblast profesional'],
    true,
    true,
    true,
    3
),
(
    'Dewi Lestari',
    'Pemilik Toko',
    'Magelang, Jawa Tengah',
    5,
    'Cutting sticker untuk branding toko sangat bagus! Warna tajam, tidak mudah pudar, dan pemasangannya rapi. Harga bersaing dan pelayanan ramah. Recommended!',
    'Cutting Sticker',
    ARRAY['cutting sticker magelang', 'sticker branding', 'sticker toko', 'oracal'],
    true,
    true,
    true,
    4
),
(
    'Eko Prasetyo',
    'Pemilik Rumah',
    'Klaten, Jawa Tengah',
    5,
    'Kaca film mobil dan rumah dipasang bersamaan. Hasilnya memuaskan, garansi jelas, dan after sales service bagus. Teknisi datang tepat waktu dan bekerja dengan cepat. Mantap!',
    'Kaca Film',
    ARRAY['kaca film klaten', 'kaca film mobil', 'kaca film rumah', 'garansi kaca film'],
    true,
    true,
    true,
    5
),
(
    'Rina Wijaya',
    'Interior Designer',
    'Yogyakarta',
    5,
    'Sudah beberapa kali order untuk klien saya. Kualitas selalu konsisten, pilihan motif banyak, dan bisa custom design. Partner terpercaya untuk project interior!',
    'Sandblast',
    ARRAY['sandblast jogja', 'interior design', 'sandblast custom', 'jasa sandblast'],
    true,
    true,
    true,
    6
),
(
    'Hendra Kusuma',
    'Pemilik Showroom',
    'Bantul, Yogyakarta',
    5,
    'One way vision untuk kaca showroom sangat membantu! Dari luar tidak terlihat tapi dari dalam tetap terang. Kualitas bagus dan awet. Terima kasih!',
    'Stiker Oneway',
    ARRAY['oneway vision', 'stiker showroom', 'kaca film oneway', 'bantul'],
    false,
    true,
    true,
    7
),
(
    'Linda Permata',
    'Pemilik Kost',
    'Sleman, Yogyakarta',
    5,
    'Pasang kaca film untuk semua kamar kost. Hasilnya kamar jadi lebih privat dan sejuk. Harga paket sangat terjangkau. Mahasiswa pada senang semua!',
    'Kaca Film',
    ARRAY['kaca film sleman', 'kaca film kost', 'kaca film murah', 'paket kaca film'],
    false,
    true,
    true,
    8
);

-- =====================================================
-- STORAGE BUCKET SETUP (Run in Supabase Dashboard)
-- =====================================================
-- Note: Storage buckets must be created via Supabase Dashboard or API
-- 
-- 1. Go to Storage in Supabase Dashboard
-- 2. Create new bucket: "testimonial-images"
-- 3. Set as Public bucket
-- 4. Configure policies:
--    - Allow public read access
--    - Allow authenticated users to upload/update/delete
--
-- Or run this in SQL Editor after creating bucket:

-- Storage policies for testimonial-images bucket
-- CREATE POLICY "Public can view testimonial images"
--     ON storage.objects FOR SELECT
--     USING (bucket_id = 'testimonial-images');
-- 
-- CREATE POLICY "Authenticated users can upload testimonial images"
--     ON storage.objects FOR INSERT
--     WITH CHECK (bucket_id = 'testimonial-images' AND auth.role() = 'authenticated');
-- 
-- CREATE POLICY "Authenticated users can update testimonial images"
--     ON storage.objects FOR UPDATE
--     USING (bucket_id = 'testimonial-images' AND auth.role() = 'authenticated');
-- 
-- CREATE POLICY "Authenticated users can delete testimonial images"
--     ON storage.objects FOR DELETE
--     USING (bucket_id = 'testimonial-images' AND auth.role() = 'authenticated');

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to get average rating
CREATE OR REPLACE FUNCTION public.get_average_rating()
RETURNS NUMERIC AS $$
BEGIN
    RETURN (
        SELECT ROUND(AVG(rating)::numeric, 2)
        FROM public.testimonials
        WHERE published = true AND verified = true
    );
END;
$$ LANGUAGE plpgsql;

-- Function to get total testimonials count
CREATE OR REPLACE FUNCTION public.get_testimonials_count()
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)::integer
        FROM public.testimonials
        WHERE published = true
    );
END;
$$ LANGUAGE plpgsql;

-- Function to increment views
CREATE OR REPLACE FUNCTION public.increment_testimonial_views(testimonial_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.testimonials
    SET views = views + 1
    WHERE id = testimonial_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE public.testimonials IS 'Customer testimonials with SEO support and image upload';
COMMENT ON COLUMN public.testimonials.keywords IS 'SEO keywords array for search optimization';
COMMENT ON COLUMN public.testimonials.featured IS 'Display on homepage if true';
COMMENT ON COLUMN public.testimonials.verified IS 'Show verified badge if true';
COMMENT ON COLUMN public.testimonials.image_url IS 'URL to project result image in Supabase Storage';
COMMENT ON COLUMN public.testimonials.avatar_url IS 'URL to customer avatar in Supabase Storage';
