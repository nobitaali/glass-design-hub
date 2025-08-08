-- Blog Categories Table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  author_bio TEXT,
  author_avatar VARCHAR(500),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_time INTEGER NOT NULL DEFAULT 5,
  category VARCHAR(100) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image_url VARCHAR(500) NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  seo_meta_title VARCHAR(255),
  seo_meta_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}',
  views INTEGER DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Create indexes for categories
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to blog_categories" ON blog_categories
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to published blog_posts" ON blog_posts
  FOR SELECT USING (published = true);

-- Insert default categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Tren Design', 'tren-design', 'Tren terbaru dalam dunia desain interior'),
  ('Tips & Tricks', 'tips-tricks', 'Tips dan trik praktis untuk menata rumah'),
  ('Desain Ruang', 'desain-ruang', 'Panduan desain untuk berbagai ruang di rumah'),
  ('Pencahayaan', 'pencahayaan', 'Tips dan inspirasi pencahayaan rumah'),
  ('Sustainable Design', 'sustainable-design', 'Desain interior ramah lingkungan')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  author, 
  author_bio,
  read_time, 
  category, 
  tags, 
  image_url, 
  featured,
  seo_meta_title,
  seo_meta_description,
  seo_keywords
) VALUES
(
  '10 Tren Desain Interior 2024 yang Wajib Anda Ketahui',
  'tren-desain-interior-2024',
  'Discover the latest interior design trends that will dominate 2024, from sustainable materials to bold color palettes and innovative space solutions.',
  '<h2>Tren Desain Interior 2024: Masa Depan Rumah Modern</h2>
  
  <p>Tahun 2024 membawa berbagai tren desain interior yang menarik dan inovatif. Dari material berkelanjutan hingga teknologi smart home, mari kita jelajahi tren-tren yang akan mendominasi dunia desain interior tahun ini.</p>
  
  <h3>1. Material Berkelanjutan dan Ramah Lingkungan</h3>
  <p>Kesadaran akan lingkungan semakin meningkat, dan ini tercermin dalam pilihan material interior. Material seperti bambu, cork, dan kayu daur ulang menjadi pilihan utama untuk furniture dan dekorasi.</p>
  
  <h3>2. Warna Earth Tone yang Hangat</h3>
  <p>Palet warna earth tone seperti terracotta, sage green, dan warm beige mendominasi tren warna 2024. Warna-warna ini menciptakan suasana yang tenang dan natural di dalam rumah.</p>
  
  <h3>3. Furniture Multifungsi</h3>
  <p>Dengan semakin terbatasnya ruang, furniture multifungsi menjadi solusi cerdas. Meja yang bisa dilipat, ottoman dengan storage, dan sofa bed adalah beberapa contoh furniture yang praktis dan stylish.</p>
  
  <h3>4. Teknologi Smart Home yang Terintegrasi</h3>
  <p>Smart home bukan lagi masa depan, tetapi sudah menjadi kenyataan. Dari lighting otomatis hingga thermostat pintar, teknologi ini membuat rumah lebih nyaman dan efisien.</p>
  
  <h3>5. Ruang Outdoor yang Diperluas</h3>
  <p>Tren outdoor living semakin populer. Balkon, teras, dan taman dirancang sebagai perpanjangan ruang indoor dengan furniture dan dekorasi yang weather-resistant.</p>
  
  <h2>Kesimpulan</h2>
  <p>Tren desain interior 2024 menggabungkan keberlanjutan, teknologi, dan kenyamanan. Dengan mengadopsi tren-tren ini, Anda dapat menciptakan rumah yang tidak hanya indah tetapi juga fungsional dan ramah lingkungan.</p>',
  'Sarah Interior',
  'Interior Designer dengan pengalaman 10+ tahun. Spesialis dalam desain modern dan sustainable.',
  8,
  'Tren Design',
  ARRAY['tren 2024', 'desain modern', 'interior', 'sustainable'],
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=630&fit=crop',
  true,
  '10 Tren Desain Interior 2024 yang Wajib Anda Ketahui - Glass Design Hub',
  'Temukan tren desain interior terbaru 2024 yang akan mengubah rumah Anda. Dari material berkelanjutan hingga teknologi smart home.',
  ARRAY['tren desain interior 2024', 'desain rumah modern', 'interior trends', 'sustainable design']
),
(
  'Cara Memilih Furniture yang Tepat untuk Ruang Tamu Kecil',
  'furniture-ruang-tamu-kecil',
  'Tips praktis memilih dan mengatur furniture untuk memaksimalkan ruang tamu kecil agar terlihat lebih luas dan fungsional.',
  '<h2>Memaksimalkan Ruang Tamu Kecil dengan Furniture yang Tepat</h2>
  
  <p>Ruang tamu kecil bukan berarti harus mengorbankan kenyamanan dan gaya. Dengan pemilihan furniture yang tepat dan penataan yang cerdas, ruang tamu kecil dapat terlihat lebih luas dan fungsional.</p>
  
  <h3>1. Pilih Furniture dengan Skala yang Proporsional</h3>
  <p>Hindari furniture yang terlalu besar untuk ruang Anda. Pilih sofa 2-seater atau loveseat daripada sofa 3-seater yang besar. Meja kopi yang compact dan kursi accent yang tidak terlalu bulky akan membuat ruang terasa lebih lapang.</p>
  
  <h3>2. Manfaatkan Furniture Multifungsi</h3>
  <p>Ottoman yang bisa digunakan sebagai tempat duduk sekaligus storage, meja kopi dengan rak bawah, atau side table dengan drawer adalah pilihan cerdas untuk ruang tamu kecil.</p>
  
  <h3>3. Gunakan Warna Terang dan Netral</h3>
  <p>Warna terang seperti putih, cream, atau light gray akan membuat ruang terlihat lebih besar. Hindari warna gelap yang dapat membuat ruang terasa sempit.</p>
  
  <h3>4. Posisikan Furniture dengan Cerdas</h3>
  <p>Letakkan furniture di sepanjang dinding untuk memaksimalkan ruang tengah. Hindari menempatkan furniture di tengah ruangan yang dapat menghalangi alur pergerakan.</p>
  
  <h3>5. Manfaatkan Ruang Vertikal</h3>
  <p>Gunakan rak dinding, floating shelves, atau wall-mounted TV untuk menghemat ruang lantai. Furniture tinggi seperti bookshelf yang ramping dapat memberikan storage tanpa memakan banyak ruang.</p>
  
  <h2>Tips Tambahan</h2>
  <ul>
    <li>Gunakan cermin untuk menciptakan ilusi ruang yang lebih besar</li>
    <li>Pilih furniture dengan kaki yang terlihat untuk menciptakan kesan airy</li>
    <li>Hindari terlalu banyak aksesoris yang dapat membuat ruang terlihat cluttered</li>
  </ul>',
  'Ahmad Furniture',
  'Furniture consultant dan space planner dengan fokus pada solusi ruang kecil.',
  6,
  'Tips & Tricks',
  ARRAY['ruang tamu', 'furniture', 'space saving', 'ruang kecil'],
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=630&fit=crop',
  false,
  'Cara Memilih Furniture untuk Ruang Tamu Kecil - Glass Design Hub',
  'Panduan lengkap memilih furniture yang tepat untuk ruang tamu kecil. Tips praktis agar ruang terlihat lebih luas dan fungsional.',
  ARRAY['furniture ruang tamu kecil', 'tips ruang tamu', 'space saving furniture', 'desain ruang kecil']
),
(
  'Panduan Lengkap Desain Dapur Minimalis Modern',
  'desain-dapur-minimalis-modern',
  'Langkah-langkah detail untuk menciptakan dapur minimalis yang modern, fungsional, dan estetis sesuai dengan kebutuhan keluarga Indonesia.',
  '<h2>Menciptakan Dapur Minimalis Modern yang Fungsional</h2>
  
  <p>Dapur minimalis modern menjadi pilihan favorit keluarga Indonesia karena tampilannya yang clean, fungsional, dan mudah dirawat. Berikut panduan lengkap untuk menciptakan dapur impian Anda.</p>
  
  <h3>1. Perencanaan Layout yang Efisien</h3>
  <p>Terapkan konsep kitchen triangle antara kompor, sink, dan kulkas. Pastikan jarak antar elemen tidak terlalu jauh namun tidak terlalu dekat sehingga memudahkan aktivitas memasak.</p>
  
  <h3>2. Pemilihan Warna yang Tepat</h3>
  <p>Dominasi warna putih, abu-abu, atau beige untuk menciptakan kesan bersih dan luas. Tambahkan aksen warna pada backsplash atau aksesoris untuk menghindari kesan monoton.</p>
  
  <h3>3. Storage Solution yang Cerdas</h3>
  <p>Maksimalkan setiap sudut dengan cabinet hingga langit-langit, drawer organizer, dan pull-out storage. Hidden storage di bawah island atau peninsula juga sangat membantu.</p>
  
  <h3>4. Material dan Finishing</h3>
  <p>Pilih material yang mudah dibersihkan seperti quartz untuk countertop, ceramic atau porcelain tile untuk backsplash, dan laminate atau solid wood untuk cabinet.</p>
  
  <h3>5. Pencahayaan yang Optimal</h3>
  <p>Kombinasikan general lighting (ceiling light), task lighting (under cabinet light), dan accent lighting untuk menciptakan suasana yang nyaman dan fungsional.</p>
  
  <h2>Tips Maintenance</h2>
  <p>Dapur minimalis membutuhkan kedisiplinan dalam menjaga kerapihan. Selalu bersihkan setelah digunakan dan hindari menumpuk barang di atas countertop.</p>',
  'Lisa Kitchen',
  'Kitchen designer dengan spesialisasi dapur modern dan minimalis untuk rumah Indonesia.',
  10,
  'Desain Ruang',
  ARRAY['dapur', 'minimalis', 'modern', 'kitchen design'],
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=630&fit=crop',
  true,
  'Panduan Desain Dapur Minimalis Modern - Glass Design Hub',
  'Panduan lengkap menciptakan dapur minimalis modern yang fungsional dan estetis. Tips layout, material, dan storage solution.',
  ARRAY['desain dapur minimalis', 'dapur modern', 'kitchen design', 'dapur indonesia']
);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_categories_updated_at BEFORE UPDATE ON blog_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();