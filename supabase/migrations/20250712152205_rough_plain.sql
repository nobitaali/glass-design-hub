/*
  # Create Products Table and Data Migration

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `title` (text)
      - `description` (text)
      - `long_description` (text)
      - `category` (text)
      - `image_url` (text)
      - `price` (text)
      - `features` (jsonb array)
      - `specifications` (jsonb object)
      - `seo_meta_title` (text)
      - `seo_meta_description` (text)
      - `seo_keywords` (jsonb array)
      - `seo_structured_data` (jsonb object)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access
    - Add policy for authenticated users to manage products

  3. Data Migration
    - Insert all existing product data from product-data.ts
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  long_description text,
  category text NOT NULL,
  image_url text NOT NULL,
  price text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  specifications jsonb DEFAULT '{}'::jsonb,
  seo_meta_title text,
  seo_meta_description text,
  seo_keywords jsonb DEFAULT '[]'::jsonb,
  seo_structured_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- Insert product data
INSERT INTO products (
  slug, title, description, long_description, category, image_url, price,
  features, specifications, seo_meta_title, seo_meta_description, seo_keywords, seo_structured_data
) VALUES 
(
  'sandblast-polos',
  'Sandblast Polos - Solusi Privasi Elegan untuk Kaca',
  'Tampilan elegan & minimalis untuk privasi maksimal',
  'Sandblast polos memberikan solusi privasi yang elegan tanpa mengurangi pencahayaan alami. Cocok untuk berbagai aplikasi interior dan eksterior dengan hasil finishing yang halus dan profesional.',
  'SAND BLAST',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
  'Mulai Rp 85.000/m²',
  '["Tampilan elegan & minimalis", "Memberi privasi tanpa menghalangi cahaya", "Cocok untuk partisi, pintu, dan jendela kaca", "Tahan lama dan mudah perawatan", "Hasil finishing halus dan merata"]'::jsonb,
  '{"Ketebalan": "0.5-1mm", "Transparansi": "30-50%", "Aplikasi": "Interior & Eksterior", "Garansi": "2 Tahun"}'::jsonb,
  'Sandblast Polos | Kaca Privasi Minimalis & Elegan',
  'Temukan solusi privasi kaca elegan dengan sandblast polos. Maksimalkan privasi tanpa mengurangi cahaya alami. Cocok untuk rumah, kantor, dan ruang komersial.',
  '["sandblast kaca", "privasi kaca", "kaca minimalis", "desain interior", "partisi kaca", "privasi ruangan", "kaca estetis"]'::jsonb,
  '{"@type": "Product", "name": "Sandblast Polos", "description": "Solusi privasi kaca elegan dengan tampilan minimalis", "offers": {"@type": "Offer", "priceCurrency": "IDR", "price": "85000", "priceValidUntil": "2025-12-31"}}'::jsonb
),
(
  'sandblast-motif',
  'Sandblast Motif - Seni Privasi Dekoratif',
  'Motif artistik pilihan untuk nilai estetika tinggi',
  'Sandblast motif menggabungkan fungsi privasi dengan keindahan artistik. Berbagai pilihan motif tersedia untuk memberikan sentuhan dekoratif yang elegan pada kaca Anda, cocok untuk kantor, showroom, dan rumah modern.',
  'SAND BLAST',
  'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
  'Mulai Rp 125.000/m²',
  '["Motif artistik pilihan", "Menambah nilai estetika ruang", "Ideal untuk kantor, showroom, dan rumah", "Berbagai pilihan desain tersedia", "Kombinasi fungsi dan keindahan"]'::jsonb,
  '{"Ketebalan": "0.5-1mm", "Transparansi": "40-60%", "Aplikasi": "Interior & Eksterior", "Garansi": "2 Tahun"}'::jsonb,
  'Sandblast Motif | Kaca Artistik dengan Privasi Estetis',
  'Tingkatkan estetika ruangan dengan sandblast motif. Kombinasi sempurna antara privasi dan seni dekoratif untuk ruang modern.',
  '["sandblast motif", "kaca artistik", "desain interior", "privasi dekoratif", "kaca estetis", "motif kaca"]'::jsonb,
  '{"@type": "Product", "name": "Sandblast Motif", "description": "Kaca dekoratif dengan motif artistik untuk privasi elegan", "offers": {"@type": "Offer", "priceCurrency": "IDR", "price": "125000", "priceValidUntil": "2025-12-31"}}'::jsonb
),
(
  'sandblast-cutting',
  'Sandblast Cutting - Presisi Desain Kustom',
  'Motif custom sesuai desain dengan presisi tinggi',
  'Sandblast cutting menggunakan teknologi pemotongan presisi untuk menciptakan motif custom sesuai desain Anda. Ideal untuk logo perusahaan, tulisan, dan dekorasi khusus dengan hasil yang tajam dan profesional.',
  'SAND BLAST',
  'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&h=600&fit=crop',
  'Mulai Rp 175.000/m²',
  '["Motif custom sesuai desain", "Cocok untuk logo, tulisan, dan dekorasi", "Hasil presisi dengan detail tajam", "Teknologi cutting modern", "Personalisasi sesuai kebutuhan"]'::jsonb,
  '{"Ketebalan": "0.5-1mm", "Transparansi": "Custom", "Aplikasi": "Interior & Eksterior", "Garansi": "2 Tahun"}'::jsonb,
  'Sandblast Cutting | Desain Kaca Kustom Presisi Tinggi',
  'Wujudkan desain kaca unik dengan sandblast cutting. Teknologi presisi untuk logo, tulisan, dan dekorasi khusus yang memukau.',
  '["sandblast cutting", "kaca custom", "desain kaca kustom", "logo kaca", "cutting kaca", "dekorasi kaca presisi"]'::jsonb,
  '{"@type": "Product", "name": "Sandblast Cutting", "description": "Teknologi cutting presisi untuk desain kaca kustom", "offers": {"@type": "Offer", "priceCurrency": "IDR", "price": "175000", "priceValidUntil": "2025-12-31"}}'::jsonb
),
(
  'sandblast-print',
  'Sandblast Print - Inovasi Teknologi Printing',
  'Teknologi printing untuk efek visual menarik',
  'Sandblast print menggabungkan teknik sandblast tradisional dengan teknologi printing modern untuk menciptakan efek visual yang unik dan menarik. Sempurna untuk branding, signage, dan interior yang membutuhkan tampilan eksklusif.',
  'SAND BLAST',
  'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=600&fit=crop',
  'Mulai Rp 225.000/m²',
  '["Sandblast + teknologi printing", "Efek visual menarik dan eksklusif", "Pas untuk branding, signage, dan interior unik", "Kombinasi teknik tradisional dan modern", "Hasil berkualitas tinggi"]'::jsonb,
  '{"Ketebalan": "0.5-1mm", "Transparansi": "Custom", "Aplikasi": "Interior & Eksterior", "Garansi": "2 Tahun"}'::jsonb,
  'Sandblast Print | Teknologi Printing Kaca Inovatif',
  'Hadirkan desain kaca revolusioner dengan sandblast print. Kombinasi teknik tradisional dan teknologi printing modern untuk tampilan eksklusif.',
  '["sandblast print", "printing kaca", "kaca inovatif", "desain kaca modern", "branding kaca", "signage kaca"]'::jsonb,
  '{"@type": "Product", "name": "Sandblast Print", "description": "Teknologi printing modern untuk efek kaca unik", "offers": {"@type": "Offer", "priceCurrency": "IDR", "price": "225000", "priceValidUntil": "2025-12-31"}}'::jsonb
),
(
  'kaca-film-black',
  'Kaca Film Black - Privasi & Reduksi Panas Optimal',
  'Privasi maksimal dengan reduksi panas optimal',
  'Kaca film hitam premium dengan teknologi canggih untuk memberikan privasi maksimal sekaligus mengurangi panas dan sinar UV berbahaya. Ideal untuk kendaraan, gedung perkantoran, dan rumah tinggal.',
  'KACA FILM',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop&sat=-100',
  'Mulai Rp 65.000/m²',
  '["Privasi maksimal dari luar", "Reduksi panas dan sinar UV hingga 99%", "Cocok untuk kendaraan, kantor, rumah", "Anti gores dan tahan lama", "Pemasangan mudah tanpa gelembung"]'::jsonb,
  '{"VLT": "5-20%", "UV Rejection": "99%", "Heat Rejection": "60-80%", "Garansi": "5 Tahun"}'::jsonb,
  'Kaca Film Hitam | Solusi Privasi & Pendingin Ruangan',
  'Lindungi ruangan Anda dengan kaca film hitam berkualitas. Reduksi panas hingga 99% dengan privasi maksimal untuk kendaraan dan bangunan.',
  '["kaca film hitam", "reduksi panas", "privasi kaca", "UV protection", "kaca mobil", "pendingin ruangan"]'::jsonb,
  '{"@type": "Product", "name": "Kaca Film Black", "description": "Kaca film hitam premium untuk privasi dan pendingin", "offers": {"@type": "Offer", "priceCurrency": "IDR", "price": "65000", "priceValidUntil": "2025-12-31"}}'::jsonb
),
(
  'kaca-film-silver',
  'Kaca Film Silver - Refleksi Elegan & Efisien',
  'Efek reflektif elegan dengan teknologi canggih',
  'Kaca film silver memberikan efek reflektif yang elegan sambil menolak panas hingga 80%. Teknologi canggih yang digunakan memberikan kesan modern dan bersih, cocok untuk bangunan komersial dan residensial.',
  'KACA FILM',
  'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop&sat=-50',
  'Mulai Rp 75.000/m²',
  '["Efek reflektif elegan", "Menolak panas hingga 80%", "Memberikan kesan modern dan bersih", "Teknologi canggih", "Cocok untuk berbagai aplikasi"]'::jsonb,
  '{"VLT": "15-35%", "UV Rejection": "99%", "Heat Rejection": "70-80%", "Garansi": "5 Tahun"}'::jsonb,
  'Kaca Film Silver | Refleksi Modern & Pendingin Ruang',
  'Tingkatkan estetika dan kenyamanan dengan kaca film silver. Efek reflektif elegan dengan teknologi penolak panas terbaik.',
  '["kaca film silver", "refleksi kaca", "penolak panas", "kaca modern", "film kaca komersial", "desain arsitektur"]'::jsonb,
  '{"@type": "Product", "name": "Kaca Film Silver", "description": "Kaca film silver dengan efek reflektif modern", "offers": {"@type": "Offer", "priceCurrency": "IDR", "price": "75000", "priceValidUntil": "2025-12-31"}}'::jsonb
),
(
  'kaca-film-brown',
  'Kaca Film Brown - Nuansa Hangat & Nyaman',
  'Nuansa hangat & nyaman untuk ruangan',
  'Kaca film brown memberikan nuansa hangat dan nyaman untuk ruangan Anda. Cocok untuk rumah dan tempat usaha yang ingin menciptakan atmosfer yang lebih personal sambil mengurangi silau dan menjaga suhu ruangan.',
  'KACA FILM',
  'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&h=600&fit=crop&sepia=100',
  'Mulai Rp 70.000/m²',
  '["Nuansa hangat & nyaman", "Cocok untuk rumah & tempat usaha", "Mengurangi silau & menjaga suhu ruangan", "Atmosfer personal", "Kualitas premium"]'::jsonb,
  '{"VLT": "20-40%", "UV Rejection": "99%", "Heat Rejection": "60-70%", "Garansi": "5 Tahun"}'::jsonb,
  'Kaca Film Brown | Kehangatan & Kenyamanan Ruangan',
  'Ciptakan suasana hangat dan nyaman dengan kaca film brown. Solusi premium untuk mengurangi silau dan menjaga suhu ruangan.',
  '["kaca film brown", "nuansa hangat", "kenyamanan ruangan", "film kaca rumah", "reduksi silau", "kontrol suhu"]'::jsonb,
  '{"@type": "Product", "name": "Kaca Film Brown", "description": "Kaca film brown untuk atmosfer hangat dan nyaman", "offers": {"@type": "Offer", "priceCurrency": "IDR", "price": "70000", "priceValidUntil": "2025-12-31"}}'::jsonb
),
(
  'stiker-oneway',
  'Stiker Oneway - Privasi & Branding Maksimal',
  'One Way Vision untuk branding dan privasi',
  'Stiker oneway menggunakan teknologi One Way Vision yang memungkinkan tampilan dari luar tertutup namun dari dalam tetap terlihat. Ideal untuk branding kendaraan dan kaca toko dengan daya tahan cuaca yang excellent.',
  'STIKER & VINYL',
  'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=600&fit=crop&hue=240',
  'Mulai Rp 45.000/m²',
  '["Tampilan dari luar tertutup, dari dalam tetap terlihat", "Ideal untuk branding kendaraan & kaca toko", "Tahan cuaca & mudah dipasang", "Teknologi One Way Vision", "Kualitas premium"]'::jsonb,
  '{"Material": "Vinyl Premium", "Ketahanan": "5-7 Tahun", "Aplikasi": "Outdoor & Indoor", "Garansi": "2 Tahun"}'::jsonb,
  'Stiker Oneway | Solusi Privasi & Branding Inovatif',
  'Maksimalkan privasi dan branding dengan stiker oneway. Teknologi One Way Vision yang memungkinkan tampilan unik dari dalam dan luar.',
  '["stiker oneway", "one way vision", "branding kendaraan", "privasi kaca", "stiker transparan", "desain marketing"]'::jsonb,
  '{"@type": "Product", "name": "Stiker Oneway", "description": "Stiker oneway dengan teknologi One Way Vision", "offers": {"@type": "Offer", "priceCurrency": "IDR", "price": "45000", "priceValidUntil": "2025-12-31"}}'::jsonb
),
(
  'stiker-tembok',
  'Stiker Tembok - Dekorasi Mudah & Fleksibel',
  'Wall sticker untuk dekorasi dinding',
  'Stiker tembok atau wall sticker memberikan solusi dekorasi dinding yang mudah dan fleksibel. Mudah dipasang dan dilepas tanpa merusak cat dinding, cocok untuk dekorasi rumah, café, dan kantor.',
  'STIKER & VINYL',
  'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop&hue=320',
  'Mulai Rp 25.000/m²',
  '["Mudah dipasang & dilepas", "Tidak merusak cat dinding", "Cocok untuk dekorasi rumah, café, kantor", "Berbagai pilihan desain", "Ramah lingkungan"]'::jsonb,
  '{"Material": "Vinyl Removable", "Ketahanan": "3-5 Tahun", "Aplikasi": "Indoor", "Garansi": "1 Tahun"}'::jsonb,
  'Stiker Tembok | Dekorasi Dinding Kreatif & Mudah',
  'Ubah ruangan Anda dengan stiker tembok yang mudah dipasang. Solusi dekorasi kreatif tanpa merusak cat dinding.',
  '["stiker tembok", "wall sticker", "dekorasi dinding", "stiker removable", "desain interior", "dekorasi rumah"]'::jsonb,
  '{"@type": "Product", "name": "Stiker Tembok", "description": "Wall sticker mudah dipasang untuk dekorasi ruangan", "offers": {"@type": "Offer", "priceCurrency": "IDR", "price": "25000", "priceValidUntil": "2025-12-31"}}'::jsonb
),
(
  'stiker-kaca',
  'Stiker Kaca - Dekorasi Estetis & Fungsional',
  'Dekorasi kaca jendela dan pintu',
  'Stiker kaca memberikan sentuhan dekoratif pada kaca jendela dan pintu Anda. Dengan banyak pilihan warna dan motif, stiker ini tahan lama dan mudah dirawat untuk berbagai kebutuhan dekorasi.',
  'STIKER & VINYL',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop&hue=180',
  'Mulai Rp 35.000/m²',
  '["Menambah dekorasi pada kaca jendela/pintu", "Banyak pilihan warna & motif", "Tahan lama dan mudah dirawat", "Pemasangan profesional", "Hasil rapi dan berkualitas"]'::jsonb,
  '{"Material": "Vinyl Glass", "Ketahanan": "5-7 Tahun", "Aplikasi": "Indoor & Outdoor", "Garansi": "2 Tahun"}'::jsonb,
  'Stiker Kaca | Dekorasi Kaca Profesional & Menarik',
  'Percantik kaca jendela dan pintu dengan stiker kaca berkualitas. Berbagai pilihan warna dan motif untuk dekorasi yang unik.',
  '["stiker kaca", "dekorasi kaca", "stiker jendela", "desain kaca", "dekorasi interior", "stiker transparan"]'::jsonb,
  '{"@type": "Product", "name": "Stiker Kaca", "description": "Stiker kaca dekoratif untuk jendela dan pintu", "offers": {"@type": "Offer", "priceCurrency": "IDR", "price": "35000", "priceValidUntil": "2025-12-31"}}'::jsonb
),
(
  'stiker-vinyl-print',
  'Stiker Vinyl Print - Cetakan Full Color Berkualitas',
  'Cetakan full color berkualitas tinggi',
  'Stiker vinyl print menggunakan teknologi cetak full color berkualitas tinggi untuk menghasilkan gambar yang tajam dan warna yang vibrant. Cocok untuk promosi, branding, dan display dengan ketahanan terhadap air dan sinar matahari.',
  'STIKER & VINYL',
  'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&h=600&fit=crop&hue=30',
  'Mulai Rp 55.000/m²',
  '["Cetakan full color berkualitas tinggi", "Cocok untuk promosi, branding, & display", "Tahan air dan sinar matahari", "Warna vibrant dan tajam", "Teknologi printing modern"]'::jsonb,
  '{"Material": "Vinyl Print Premium", "Ketahanan": "5-7 Tahun", "Aplikasi": "Outdoor & Indoor", "Garansi": "3 Tahun"}'::jsonb,
  'Stiker Vinyl Print | Cetakan Full Color Premium',
  'Hasilkan cetakan berkualitas tinggi dengan stiker vinyl print. Warna tajam, tahan air, dan cocok untuk berbagai kebutuhan promosi dan branding.',
  '["stiker vinyl print", "cetakan full color", "branding print", "stiker promosi", "digital printing", "desain marketing"]'::jsonb,
  '{"@type": "Product", "name": "Stiker Vinyl Print", "description": "Stiker vinyl print dengan teknologi cetak full color", "offers": {"@type": "Offer", "priceCurrency": "IDR", "price": "55000", "priceValidUntil": "2025-12-31"}}'::jsonb
),
(
  'stiker-vinyl-cutting',
  'Stiker Vinyl Cutting - Presisi & Profesional',
  'Potongan presisi sesuai desain',
  'Stiker vinyl cutting menggunakan teknologi pemotongan presisi untuk menghasilkan bentuk sesuai design atau logo Anda. Tampilan bersih dan profesional membuatnya cocok untuk kendaraan, kaca toko, dan pintu.',
  'STIKER & VINYL',
  'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=600&fit=crop&hue=160',
  'Mulai Rp 65.000/m²',
  '["Potongan sesuai design/logo", "Tampilan bersih dan profesional", "Cocok untuk kendaraan, kaca toko, pintu", "Teknologi cutting presisi", "Custom sesuai kebutuhan"]'::jsonb,
  '{"Material": "Vinyl Cutting Premium", "Ketahanan": "5-7 Tahun", "Aplikasi": "Outdoor & Indoor", "Garansi": "3 Tahun"}'::jsonb,
  'Stiker Vinyl Cutting | Desain Presisi & Profesional',
  'Wujudkan desain logo dan branding dengan stiker vinyl cutting. Potongan presisi untuk tampilan profesional dan unik.',
  '["stiker vinyl cutting", "cutting stiker", "logo stiker", "branding presisi", "desain custom", "stiker profesional"]'::jsonb,
  '{"@type": "Product", "name": "Stiker Vinyl Cutting", "description": "Stiker vinyl cutting dengan teknologi pemotongan presisi", "offers": {"@type": "Offer", "priceCurrency": "IDR", "price": "65000", "priceValidUntil": "2025-12-31"}}'::jsonb
),
(
  'stiker-reflektor',
  'Stiker Reflektor - Keselamatan dengan Teknologi Reflektif',
  'Keselamatan dengan teknologi reflektif',
  'Stiker reflektor menggunakan teknologi reflektif yang memantulkan cahaya di malam hari untuk keselamatan. Cocok untuk rambu-rambu, branding kendaraan, dan aplikasi keselamatan lainnya dengan berbagai pilihan warna cerah.',
  'STIKER & VINYL',
  'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop&hue=60',
  'Mulai Rp 85.000/m²',
  '["Memantulkan cahaya di malam hari", "Cocok untuk keselamatan, rambu, dan branding kendaraan", "Tersedia dalam berbagai warna cerah", "Teknologi reflektif canggih", "Standar keselamatan internasional"]'::jsonb,
  '{"Material": "Vinyl Reflective", "Ketahanan": "7-10 Tahun", "Aplikasi": "Outdoor & Indoor", "Garansi": "3 Tahun"}'::jsonb,
  'Stiker Reflektor | Solusi Keselamatan Reflektif Terbaik',
  'Tingkatkan keselamatan dengan stiker reflektor berkualitas tinggi. Ideal untuk rambu lalu lintas, kendaraan, dan aplikasi keselamatan dengan teknologi reflektif canggih.',
  '["stiker reflektor", "keselamatan lalu lintas", "reflective sticker", "branding kendaraan", "stiker keselamatan", "teknologi reflektif"]'::jsonb,
  '{"@type": "Product", "name": "Stiker Reflektor", "description": "Stiker reflektif untuk keselamatan maksimal", "offers": {"@type": "Offer", "priceCurrency": "IDR", "price": "85000", "priceValidUntil": "2025-12-31"}}'::jsonb
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();