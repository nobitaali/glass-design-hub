-- =====================================================
-- SEO OPTIMIZATION SCHEMA FOR JAYASTICKER.ID
-- =====================================================
-- This schema adds comprehensive SEO management tables
-- to support location-based pages, dynamic metadata,
-- keyword tracking, and FAQ management
-- =====================================================

-- =====================================================
-- 1. SEO METADATA TABLE
-- =====================================================
-- Manages page-specific SEO data for all pages
CREATE TABLE IF NOT EXISTS seo_metadata (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path VARCHAR(500) NOT NULL UNIQUE,
  page_type VARCHAR(50) NOT NULL, -- 'homepage', 'location', 'blog', 'product', 'service'
  
  -- Meta Tags
  meta_title VARCHAR(255) NOT NULL,
  meta_description TEXT NOT NULL,
  meta_keywords TEXT[] DEFAULT '{}',
  canonical_url VARCHAR(500),
  
  -- Open Graph
  og_title VARCHAR(255),
  og_description TEXT,
  og_image VARCHAR(500),
  og_type VARCHAR(50) DEFAULT 'website',
  
  -- Twitter Card
  twitter_card VARCHAR(50) DEFAULT 'summary_large_image',
  twitter_title VARCHAR(255),
  twitter_description TEXT,
  twitter_image VARCHAR(500),
  
  -- Schema.org
  schema_type VARCHAR(100), -- 'LocalBusiness', 'Article', 'Product', etc.
  schema_data JSONB, -- Flexible JSON storage for schema markup
  
  -- SEO Settings
  robots VARCHAR(200) DEFAULT 'index, follow',
  priority DECIMAL(2,1) DEFAULT 0.5, -- For sitemap
  change_frequency VARCHAR(20) DEFAULT 'weekly', -- For sitemap
  
  -- Tracking
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  
  CONSTRAINT valid_priority CHECK (priority >= 0.0 AND priority <= 1.0),
  CONSTRAINT valid_page_type CHECK (page_type IN ('homepage', 'location', 'blog', 'product', 'service', 'other'))
);

-- Indexes for seo_metadata
CREATE INDEX IF NOT EXISTS idx_seo_metadata_page_path ON seo_metadata(page_path);
CREATE INDEX IF NOT EXISTS idx_seo_metadata_page_type ON seo_metadata(page_type);
CREATE INDEX IF NOT EXISTS idx_seo_metadata_published ON seo_metadata(published);

-- =====================================================
-- 2. LOCATION PAGES TABLE
-- =====================================================
-- Manages location-based landing pages for local SEO
CREATE TABLE IF NOT EXISTS location_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Location Info
  name VARCHAR(100) NOT NULL UNIQUE, -- 'Bantul', 'Sleman', 'Solo', etc.
  slug VARCHAR(100) NOT NULL UNIQUE,
  province VARCHAR(100) NOT NULL DEFAULT 'Yogyakarta',
  
  -- Geographic Data
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  address TEXT,
  postal_code VARCHAR(10),
  
  -- Content
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  content TEXT, -- Rich HTML content for the page
  hero_image VARCHAR(500),
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  keywords TEXT[] DEFAULT '{}',
  
  -- Local Business Data
  service_areas TEXT[] DEFAULT '{}', -- Sub-areas served
  phone VARCHAR(50),
  email VARCHAR(100),
  opening_hours VARCHAR(200) DEFAULT 'Mo-Su 00:00-23:59',
  
  -- Features
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  
  -- Tracking
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for location_pages
CREATE INDEX IF NOT EXISTS idx_location_pages_slug ON location_pages(slug);
CREATE INDEX IF NOT EXISTS idx_location_pages_published ON location_pages(published);
CREATE INDEX IF NOT EXISTS idx_location_pages_featured ON location_pages(featured);
CREATE INDEX IF NOT EXISTS idx_location_pages_display_order ON location_pages(display_order);

-- =====================================================
-- 3. SEO KEYWORDS TABLE
-- =====================================================
-- Tracks and manages target keywords for SEO strategy
CREATE TABLE IF NOT EXISTS seo_keywords (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Keyword Data
  keyword VARCHAR(255) NOT NULL UNIQUE,
  keyword_type VARCHAR(50) NOT NULL, -- 'primary', 'secondary', 'long-tail'
  category VARCHAR(100), -- 'kaca-film', 'sandblast', 'stiker', etc.
  
  -- Metrics
  search_volume INTEGER DEFAULT 0,
  difficulty INTEGER DEFAULT 0, -- 0-100 scale
  current_ranking INTEGER, -- Current position in SERP
  target_ranking INTEGER DEFAULT 1,
  
  -- Competitor Analysis
  competitor_urls TEXT[] DEFAULT '{}',
  competitor_rankings JSONB, -- Store competitor positions
  
  -- Target Pages
  target_pages TEXT[] DEFAULT '{}', -- Pages targeting this keyword
  
  -- Performance
  monthly_searches INTEGER DEFAULT 0,
  click_through_rate DECIMAL(5,2) DEFAULT 0.00,
  conversion_rate DECIMAL(5,2) DEFAULT 0.00,
  
  -- Tracking
  last_checked TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_keyword_type CHECK (keyword_type IN ('primary', 'secondary', 'long-tail', 'branded')),
  CONSTRAINT valid_difficulty CHECK (difficulty >= 0 AND difficulty <= 100)
);

-- Indexes for seo_keywords
CREATE INDEX IF NOT EXISTS idx_seo_keywords_keyword ON seo_keywords(keyword);
CREATE INDEX IF NOT EXISTS idx_seo_keywords_type ON seo_keywords(keyword_type);
CREATE INDEX IF NOT EXISTS idx_seo_keywords_category ON seo_keywords(category);
CREATE INDEX IF NOT EXISTS idx_seo_keywords_ranking ON seo_keywords(current_ranking);

-- =====================================================
-- 4. FAQ ITEMS TABLE
-- =====================================================
-- Dynamic FAQ management with Schema.org support
CREATE TABLE IF NOT EXISTS faq_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- FAQ Content
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  
  -- Categorization
  category VARCHAR(100) NOT NULL, -- 'kaca-film', 'sandblast', 'pemasangan', 'harga', etc.
  tags TEXT[] DEFAULT '{}',
  
  -- Targeting
  target_pages TEXT[] DEFAULT '{}', -- Which pages should show this FAQ
  location_specific VARCHAR(100), -- NULL for general, or location name
  
  -- Display
  display_order INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  
  -- SEO
  include_in_schema BOOLEAN DEFAULT TRUE, -- Include in FAQ schema markup
  
  -- Analytics
  views INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  
  -- Tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Indexes for faq_items
CREATE INDEX IF NOT EXISTS idx_faq_items_category ON faq_items(category);
CREATE INDEX IF NOT EXISTS idx_faq_items_published ON faq_items(published);
CREATE INDEX IF NOT EXISTS idx_faq_items_featured ON faq_items(featured);
CREATE INDEX IF NOT EXISTS idx_faq_items_display_order ON faq_items(display_order);
CREATE INDEX IF NOT EXISTS idx_faq_items_schema ON faq_items(include_in_schema);
CREATE INDEX IF NOT EXISTS idx_faq_items_location ON faq_items(location_specific);

-- =====================================================
-- 5. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 6. RLS POLICIES - PUBLIC READ ACCESS
-- =====================================================

-- SEO Metadata - Public can read published pages
CREATE POLICY "Allow public read access to published seo_metadata" ON seo_metadata
  FOR SELECT USING (published = true);

-- Location Pages - Public can read published pages
CREATE POLICY "Allow public read access to published location_pages" ON location_pages
  FOR SELECT USING (published = true);

-- SEO Keywords - Public read (for transparency)
CREATE POLICY "Allow public read access to seo_keywords" ON seo_keywords
  FOR SELECT USING (true);

-- FAQ Items - Public can read published FAQs
CREATE POLICY "Allow public read access to published faq_items" ON faq_items
  FOR SELECT USING (published = true);

-- =====================================================
-- 7. UPDATE TRIGGERS
-- =====================================================

-- Trigger for seo_metadata
CREATE TRIGGER update_seo_metadata_updated_at BEFORE UPDATE ON seo_metadata
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for location_pages
CREATE TRIGGER update_location_pages_updated_at BEFORE UPDATE ON location_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for seo_keywords
CREATE TRIGGER update_seo_keywords_updated_at BEFORE UPDATE ON seo_keywords
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for faq_items
CREATE TRIGGER update_faq_items_updated_at BEFORE UPDATE ON faq_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 8. SEED DATA - LOCATION PAGES
-- =====================================================

INSERT INTO location_pages (name, slug, province, latitude, longitude, title, description, keywords, service_areas, phone, email) VALUES
(
  'Bantul',
  'bantul',
  'Yogyakarta',
  -7.888,
  110.329,
  'Stiker Kaca Bantul | Kaca Film & Sandblast Profesional',
  'Spesialis kaca film, sandblast, dan stiker dekoratif di Bantul, Yogyakarta. Pemasangan profesional dengan garansi resmi. Harga terjangkau, kualitas terbaik!',
  ARRAY['stiker kaca bantul', 'kaca film bantul', 'sandblast bantul', 'jasa pasang kaca film bantul', 'stiker dekoratif bantul'],
  ARRAY['Banguntapan', 'Sewon', 'Kasihan', 'Pandak', 'Piyungan'],
  '+62851-5627-5565',
  'jayastiker25@gmail.com'
),
(
  'Sleman',
  'sleman',
  'Yogyakarta',
  -7.706,
  110.354,
  'Stiker Kaca Sleman | Kaca Film & Sandblast Berkualitas',
  'Layanan kaca film, sandblast, dan stiker kaca profesional di Sleman, Yogyakarta. Gratis konsultasi dan survey. Garansi resmi hingga 5 tahun!',
  ARRAY['stiker kaca sleman', 'kaca film sleman', 'sandblast sleman', 'jasa kaca film sleman', 'stiker rumah sleman'],
  ARRAY['Depok', 'Mlati', 'Ngaglik', 'Gamping', 'Godean'],
  '+62851-5627-5565',
  'jayastiker25@gmail.com'
),
(
  'Solo',
  'solo',
  'Jawa Tengah',
  -7.566,
  110.828,
  'Stiker Kaca Solo | Kaca Film & Sandblast Surakarta',
  'Jasa pemasangan kaca film, sandblast, dan stiker dekoratif di Solo (Surakarta). Profesional, cepat, dan bergaransi. Melayani area Solo Raya!',
  ARRAY['stiker kaca solo', 'kaca film solo', 'sandblast solo', 'kaca film surakarta', 'jasa stiker kaca solo'],
  ARRAY['Laweyan', 'Banjarsari', 'Jebres', 'Pasar Kliwon', 'Serengan'],
  '+62851-5627-5565',
  'jayastiker25@gmail.com'
),
(
  'Magelang',
  'magelang',
  'Jawa Tengah',
  -7.470,
  110.217,
  'Stiker Kaca Magelang | Kaca Film & Sandblast Terpercaya',
  'Spesialis kaca film dan sandblast di Magelang. Pemasangan profesional untuk rumah, kantor, dan kendaraan. Harga kompetitif dengan kualitas terjamin!',
  ARRAY['stiker kaca magelang', 'kaca film magelang', 'sandblast magelang', 'jasa kaca film magelang'],
  ARRAY['Mertoyudan', 'Muntilan', 'Salaman', 'Mungkid'],
  '+62851-5627-5565',
  'jayastiker25@gmail.com'
),
(
  'Klaten',
  'klaten',
  'Jawa Tengah',
  -7.706,
  110.606,
  'Stiker Kaca Klaten | Kaca Film & Sandblast Profesional',
  'Layanan kaca film, sandblast, dan cutting sticker di Klaten. Tim profesional berpengalaman. Gratis konsultasi dan survey lokasi!',
  ARRAY['stiker kaca klaten', 'kaca film klaten', 'sandblast klaten', 'jasa pasang kaca film klaten'],
  ARRAY['Klaten Utara', 'Klaten Tengah', 'Klaten Selatan', 'Delanggu', 'Prambanan'],
  '+62851-5627-5565',
  'jayastiker25@gmail.com'
)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 9. SEED DATA - SEO KEYWORDS
-- =====================================================

INSERT INTO seo_keywords (keyword, keyword_type, category, search_volume, difficulty, target_ranking, target_pages) VALUES
-- Primary Keywords
('stiker kaca jogja', 'primary', 'kaca-film', 1200, 45, 1, ARRAY['/', '/lokasi/bantul', '/lokasi/sleman']),
('kaca film jogja', 'primary', 'kaca-film', 1500, 50, 1, ARRAY['/', '/lokasi/bantul', '/lokasi/sleman']),
('sandblast jogja', 'primary', 'sandblast', 800, 40, 1, ARRAY['/', '/lokasi/bantul', '/lokasi/sleman']),
('jasa pasang stiker kaca jogja', 'primary', 'kaca-film', 600, 35, 1, ARRAY['/', '/lokasi/bantul']),

-- Secondary Keywords
('stiker kaca murah jogja', 'secondary', 'kaca-film', 400, 30, 3, ARRAY['/', '/lokasi/bantul']),
('kaca film gedung jogja', 'secondary', 'kaca-film', 350, 35, 3, ARRAY['/']),
('sandblast custom jogja', 'secondary', 'sandblast', 250, 28, 3, ARRAY['/']),
('one way vision jogja', 'secondary', 'kaca-film', 200, 25, 5, ARRAY['/']),
('cutting sticker jogja', 'secondary', 'stiker', 500, 40, 5, ARRAY['/']),

-- Long-tail Keywords
('harga stiker sandblast per meter jogja', 'long-tail', 'sandblast', 150, 20, 1, ARRAY['/blog']),
('jasa pemasangan kaca film profesional jogja', 'long-tail', 'kaca-film', 120, 18, 1, ARRAY['/', '/lokasi/bantul']),
('stiker kaca kantor murah yogyakarta', 'long-tail', 'kaca-film', 100, 15, 1, ARRAY['/', '/lokasi/sleman']),
('kaca film anti panas jogja', 'long-tail', 'kaca-film', 180, 22, 3, ARRAY['/']),
('sandblast motif custom jogja', 'long-tail', 'sandblast', 90, 18, 3, ARRAY['/']),

-- Location-specific Keywords
('stiker kaca bantul', 'primary', 'kaca-film', 200, 25, 1, ARRAY['/lokasi/bantul']),
('stiker kaca sleman', 'primary', 'kaca-film', 180, 25, 1, ARRAY['/lokasi/sleman']),
('kaca film solo', 'primary', 'kaca-film', 400, 35, 1, ARRAY['/lokasi/solo']),
('sandblast magelang', 'secondary', 'sandblast', 80, 20, 3, ARRAY['/lokasi/magelang']),
('stiker kaca klaten', 'secondary', 'kaca-film', 100, 22, 3, ARRAY['/lokasi/klaten'])
ON CONFLICT (keyword) DO NOTHING;

-- =====================================================
-- 10. SEED DATA - FAQ ITEMS
-- =====================================================

INSERT INTO faq_items (question, answer, category, tags, target_pages, include_in_schema, display_order) VALUES
(
  'Berapa harga kaca film per meter persegi di Jogja?',
  'Harga kaca film di Jogja bervariasi tergantung jenis dan kualitas, mulai dari Rp 100.000 hingga Rp 500.000 per meter persegi. Untuk kaca film mobil berkisar Rp 1.500.000 hingga Rp 5.000.000 per unit tergantung jenis kendaraan dan kualitas kaca film. Kami menyediakan berbagai pilihan sesuai budget Anda dengan kualitas terjamin dan garansi resmi.',
  'harga',
  ARRAY['harga', 'kaca film', 'jogja'],
  ARRAY['/', '/lokasi/bantul', '/lokasi/sleman'],
  true,
  1
),
(
  'Berapa lama proses pemasangan kaca film?',
  'Proses pemasangan kaca film untuk mobil biasanya memakan waktu 2-3 jam, sedangkan untuk rumah atau kantor tergantung luas area kaca yang akan dipasang, biasanya 1-2 hari untuk area yang luas. Tim kami bekerja dengan cepat namun tetap teliti untuk hasil maksimal.',
  'pemasangan',
  ARRAY['pemasangan', 'durasi', 'kaca film'],
  ARRAY['/', '/lokasi/bantul', '/lokasi/sleman', '/lokasi/solo'],
  true,
  2
),
(
  'Apakah kaca film yang dijual bergaransi?',
  'Ya, semua produk kaca film kami dilengkapi garansi resmi. Garansi dapat mencakup 1-5 tahun tergantung jenis kaca film yang dipilih. Garansi mencakup pengelupasan, perubahan warna, dan kerusakan akibat cacat produksi. Kami juga memberikan after sales service terbaik untuk kepuasan pelanggan.',
  'garansi',
  ARRAY['garansi', 'kaca film', 'kualitas'],
  ARRAY['/', '/lokasi/bantul', '/lokasi/sleman', '/lokasi/solo', '/lokasi/magelang', '/lokasi/klaten'],
  true,
  3
),
(
  'Apakah melayani pemasangan di luar Yogyakarta?',
  'Ya, kami melayani pemasangan kaca film dan stiker ke seluruh Indonesia. Untuk area Yogyakarta dan sekitarnya (Bantul, Sleman, Solo, Magelang, Klaten), kami melayani langsung dengan tim profesional kami. Untuk area luar Jawa, kami dapat mengirimkan produk dengan panduan instalasi atau menghubungkan Anda dengan mitra pemasangan kami.',
  'layanan',
  ARRAY['area layanan', 'pemasangan', 'jangkauan'],
  ARRAY['/', '/lokasi/bantul', '/lokasi/sleman', '/lokasi/solo'],
  true,
  4
),
(
  'Bagaimana cara merawat kaca film agar tahan lama?',
  'Untuk merawat kaca film agar tahan lama: 1) Hindari membersihkan kaca dalam 7 hari pertama setelah pemasangan, 2) Gunakan kain microfiber dan pembersih kaca non-ammonia, 3) Hindari penggunaan benda tajam di dekat kaca film, 4) Hindari menempel stiker langsung pada kaca film. Dengan perawatan yang tepat, kaca film dapat bertahan hingga 5-10 tahun.',
  'perawatan',
  ARRAY['perawatan', 'tips', 'kaca film'],
  ARRAY['/', '/blog'],
  true,
  5
),
(
  'Apakah sandblast bisa dicustom motif sesuai keinginan?',
  'Ya, kami menerima custom design untuk stiker sandblast. Anda bisa mengirimkan desain sendiri atau berkonsultasi dengan tim desain kami untuk membuat motif yang sesuai dengan kebutuhan dan tema interior Anda. Kami memiliki berbagai pilihan motif dari yang simple hingga kompleks, termasuk logo perusahaan dan desain artistik.',
  'sandblast',
  ARRAY['sandblast', 'custom', 'desain'],
  ARRAY['/', '/lokasi/bantul', '/lokasi/sleman'],
  true,
  6
),
(
  'Apakah menyediakan layanan survey lokasi gratis?',
  'Ya, kami menyediakan layanan survey lokasi gratis untuk area Yogyakarta dan sekitarnya (Bantul, Sleman, Solo, Magelang, Klaten). Tim kami akan datang ke lokasi untuk mengukur, memberikan rekomendasi terbaik, dan estimasi biaya yang akurat untuk kebutuhan kaca film atau stiker Anda. Hubungi kami untuk jadwalkan survey!',
  'layanan',
  ARRAY['survey', 'gratis', 'konsultasi'],
  ARRAY['/', '/lokasi/bantul', '/lokasi/sleman', '/lokasi/solo', '/lokasi/magelang', '/lokasi/klaten'],
  true,
  7
),
(
  'Apa perbedaan kaca film biasa dengan kaca film premium?',
  'Kaca film premium memiliki beberapa keunggulan: 1) Teknologi nano-ceramic yang lebih efektif menolak panas hingga 99%, 2) Kejernihan lebih tinggi tanpa mengurangi visibilitas, 3) Garansi lebih lama (5-10 tahun), 4) Anti-UV hingga 99.9%, 5) Lebih tahan lama dan tidak mudah pudar. Kaca film biasa tetap berkualitas baik namun dengan spesifikasi standar dan harga lebih terjangkau.',
  'produk',
  ARRAY['kaca film', 'premium', 'perbedaan'],
  ARRAY['/', '/blog'],
  true,
  8
)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 11. SEED DATA - SEO METADATA
-- =====================================================

INSERT INTO seo_metadata (
  page_path, 
  page_type, 
  meta_title, 
  meta_description, 
  meta_keywords,
  og_title,
  og_description,
  og_image,
  priority,
  change_frequency
) VALUES
(
  '/',
  'homepage',
  'Stiker Kaca Jogja | Kaca Film, Sandblast Es Buram & Cutting Oracal – Jaya Sticker Custom',
  'Spesialis kaca film, sandblast & stiker dekoratif Yogyakarta. Pemasangan profesional seluruh Indonesia. Garansi resmi, harga terjangkau! Melayani Bantul, Sleman, Solo, Magelang, Klaten.',
  ARRAY['stiker kaca jogja', 'kaca film jogja', 'sandblast jogja', 'kaca film yogyakarta', 'jasa pasang kaca film jogja', 'stiker dekoratif jogja', 'one way vision jogja', 'cutting sticker jogja'],
  'Stiker Kaca Jogja | Kaca Film, Sandblast Es Buram & Cutting Oracal – Jaya Sticker Custom',
  '✅ Spesialis kaca film, sandblast, dan stiker dekoratif untuk interior rumah, kantor, dan kendaraan di Yogyakarta. Pemasangan profesional seluruh Indonesia. Harga terjangkau, kualitas terbaik!',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=630&fit=crop',
  1.0,
  'daily'
)
ON CONFLICT (page_path) DO UPDATE SET
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  meta_keywords = EXCLUDED.meta_keywords,
  updated_at = NOW();

-- =====================================================
-- END OF SCHEMA
-- =====================================================
