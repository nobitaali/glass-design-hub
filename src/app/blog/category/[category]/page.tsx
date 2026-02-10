import { notFound } from "next/navigation";
import { blogService, BlogPost } from "@/lib/supabase-optimized";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// ISR: Revalidate category pages every 10 minutes
export const revalidate = 600;

// Deskripsi unik untuk setiap kategori
const categoryDescriptions: Record<string, { title: string; description: string; content: string }> = {
  "tren-design": {
    title: "Tren Desain Interior Terbaru | Inspirasi Modern & Kekinian",
    description: "Temukan artikel terbaru tentang tren desain interior yang sedang populer. Dari minimalis hingga luxury, dapatkan inspirasi untuk ruang impian Anda.",
    content: "Kategori ini menyajikan informasi terkini tentang tren desain interior yang sedang berkembang. Kami mengulas berbagai gaya desain dari minimalis skandinavia, industrial modern, hingga luxury klasik. Setiap artikel memberikan insight mendalam tentang warna, material, dan layout yang sedang menjadi favorit di dunia desain interior. Temukan inspirasi untuk menciptakan ruang yang tidak hanya estetis tapi juga fungsional dan sesuai dengan gaya hidup modern."
  },
  "tips-tricks": {
    title: "Tips & Tricks Dekorasi Rumah | Panduan Praktis DIY",
    description: "Panduan praktis dan tips dekorasi rumah yang bisa Anda terapkan sendiri. Solusi cerdas untuk berbagai masalah interior.",
    content: "Kumpulan tips dan trik dekorasi rumah yang praktis dan mudah diterapkan. Kami berbagi solusi untuk berbagai masalah interior seperti cara memilih warna cat yang tepat, mengatur tata letak ruangan kecil, memilih furniture yang multifungsi, dan banyak lagi. Setiap tips didasarkan pada pengalaman praktis dan prinsip desain yang teruji, cocok untuk pemula maupun yang sudah berpengalaman dalam dekorasi interior."
  },
  "desain-ruang": {
    title: "Desain Ruangan Lengkap | Living Room, Bedroom, Kitchen & More",
    description: "Panduan desain untuk setiap ruangan di rumah Anda. Dari living room hingga kitchen, temukan inspirasi dan tipsnya.",
    content: "Panduan lengkap desain untuk setiap ruangan di rumah Anda. Kami membahas secara detail desain living room yang nyaman untuk keluarga, bedroom yang menenangkan untuk istirahat, kitchen yang fungsional untuk memasak, bathroom yang mewah, home office yang produktif, dan berbagai ruangan lainnya. Setiap artikel memberikan tips spesifik untuk layout, lighting, storage, dan dekorasi yang sesuai dengan fungsi masing-masing ruangan."
  },
  "pencahayaan": {
    title: "Tips Pencahayaan Interior | Lighting Design & Lampu",
    description: "Panduan lengkap tentang pencahayaan interior. Jenis lampu, penempatan yang tepat, dan tips menciptakan suasana ruangan.",
    content: "Pencahayaan adalah elemen krusial dalam desain interior yang sering diabaikan. Kategori ini membahas semua aspek pencahayaan interior: jenis lampu (ambient, task, accent), cara mengatur intensitas cahaya, penempatan lampu yang tepat, memilih warna cahaya yang sesuai, dan tips menciptakan suasana ruangan yang diinginkan. Temukan bagaimana pencahayaan yang tepat dapat mengubah tampilan dan nuansa seluruh ruangan."
  },
  "sustainable-design": {
    title: "Desain Interior Berkelanjutan | Eco-Friendly & Ramah Lingkungan",
    description: "Inspirasi desain interior yang ramah lingkungan dan berkelanjutan. Material eco-friendly dan tips hemat energi.",
    content: "Desain interior berkelanjutan adalah tren masa depan yang menggabungkan estetika dengan tanggung jawab lingkungan. Kategori ini membahas penggunaan material ramah lingkungan seperti bambu, kayu daur ulang, dan cat non-toxic. Kami juga berbagi tips hemat energi dengan pencahayaan dan appliance yang efisien, serta cara menciptakan ruangan yang sehat dengan sirkulasi udara yang baik. Temukan bagaimana Anda bisa menciptakan rumah impian tanpa merusak lingkungan."
  }
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryInfo = categoryDescriptions[params.category];
  const categoryName = params.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: categoryInfo?.title || `${categoryName} - Jaya Sticker Custom`,
    description: categoryInfo?.description || `Lihat semua artikel dalam kategori ${categoryName}`,
    keywords: [params.category, "blog interior", "desain rumah", "tips dekorasi", "jaya sticker"],
    openGraph: {
      title: categoryInfo?.title || `${categoryName}`,
      description: categoryInfo?.description || `Lihat semua artikel dalam kategori ${categoryName}`,
      type: "website",
      locale: "id_ID",
      siteName: "Jaya Sticker Custom",
    },
    alternates: {
      canonical: `/blog/category/${params.category}`,
    },
  };
}

export async function generateStaticParams() {
  const categories = await blogService.getAllCategories();
  return categories.map((cat) => ({
    category: cat.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Component untuk blog post card
function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48">
        <Image
          src={post.image_url}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <CardHeader className="flex-grow">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Badge variant="outline" className="text-xs">{post.category}</Badge>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.read_time} menit
          </div>
        </div>
        <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {post.author}
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {new Date(post.published_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm"
        >
          Baca Artikel
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Get all posts
  const allPosts = await blogService.getAllPosts();
  
  // Filter posts by category
  const categoryName = params.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const filteredPosts = allPosts.filter(post => 
    post.category.toLowerCase() === categoryName.toLowerCase()
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  const categoryInfo = categoryDescriptions[params.category];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: "Blog", href: "/blog" },
            { label: categoryName, href: `/blog/category/${params.category}` }
          ]}
        />

        {/* Header Section dengan konten unik */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {categoryInfo?.title || categoryName}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            {categoryInfo?.description || `Lihat semua artikel dalam kategori ${categoryName}`}
          </p>
          
          {categoryInfo?.content && (
            <div className="prose prose-lg max-w-none mb-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
              <p className="text-muted-foreground leading-relaxed">
                {categoryInfo.content}
              </p>
            </div>
          )}
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="font-medium">{filteredPosts.length}</span> artikel tersedia
            </span>
            <span>•</span>
            <span>Diperbarui secara berkala</span>
          </div>
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Butuh Inspirasi Lebih Banyak?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Jelajahi kategori blog lainnya atau hubungi kami untuk konsultasi gratis tentang desain interior dan solusi kaca film terbaik untuk rumah atau kantor Anda.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Lihat Semua Artikel
            </Link>
            <a 
              href="https://wa.me/6285156275565" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-input px-6 py-3 rounded-lg hover:bg-accent transition-colors font-medium"
            >
              Konsultasi Gratis
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
