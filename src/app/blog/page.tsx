import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, User, ArrowRight } from "lucide-react";
import { blogService, BlogPost } from "@/lib/supabase";

// SEO Metadata yang dioptimalkan
export const metadata: Metadata = {
  title: "Blog Interior & Desain Rumah | Tips & Inspirasi Terbaru - Glass Design Hub",
  description: "Temukan artikel terbaru tentang desain interior, tips dekorasi rumah, tren furniture, dan inspirasi ruang modern. Panduan lengkap untuk menciptakan rumah impian Anda.",
  keywords: [
    "blog interior",
    "desain rumah",
    "tips dekorasi",
    "furniture modern",
    "inspirasi interior",
    "desain ruang tamu",
    "kamar tidur minimalis",
    "dapur modern",
    "glass design",
    "interior indonesia"
  ],
  authors: [{ name: "Glass Design Hub Team" }],
  openGraph: {
    title: "Blog Interior & Desain Rumah | Glass Design Hub",
    description: "Inspirasi dan tips terbaru untuk desain interior rumah modern",
    type: "website",
    locale: "id_ID",
    siteName: "Glass Design Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Interior & Desain Rumah | Glass Design Hub",
    description: "Inspirasi dan tips terbaru untuk desain interior rumah modern",
  },
  alternates: {
    canonical: "/blog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Get categories from Supabase
async function getCategories() {
  try {
    const categories = await blogService.getAllCategories();
    return ["Semua", ...categories.map(cat => cat.name)];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return ["Semua", "Tren Design", "Tips & Tricks", "Desain Ruang", "Pencahayaan", "Sustainable Design"];
  }
}

// Loading component untuk Suspense
function BlogPostsSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded-t-lg"></div>
          <CardHeader>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Component untuk featured post
function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="relative h-64 md:h-full">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                Featured
              </Badge>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <Badge variant="outline">{post.category}</Badge>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {new Date(post.published_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.read_time} menit
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <User className="h-4 w-4" />
              {post.author}
            </div>
          </div>
          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Baca Selengkapnya
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
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

export default async function BlogPage() {
  // Fetch data from Supabase
  const [allPosts, featuredPosts, categories] = await Promise.all([
    blogService.getAllPosts(),
    blogService.getFeaturedPosts(),
    getCategories()
  ]);

  const regularPosts = allPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog Interior & Desain
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Temukan inspirasi, tips, dan tren terbaru dalam dunia desain interior. 
              Dari ruang minimalis hingga luxury modern, dapatkan panduan lengkap untuk menciptakan rumah impian Anda.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Artikel Pilihan</h2>
            <div className="space-y-8">
              {featuredPosts.map(post => (
                <FeaturedPost key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Categories Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <Badge 
                key={category} 
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2"
              >
                {category}
              </Badge>
            ))}
          </div>
        </section>

        {/* All Posts Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Semua Artikel</h2>
          <Suspense fallback={<BlogPostsSkeleton />}>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </Suspense>
        </section>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Muat Artikel Lainnya
          </button>
        </div>

        {/* Newsletter Subscription */}
        <section className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Dapatkan Tips Interior Terbaru</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Berlangganan newsletter kami untuk mendapatkan artikel terbaru, tips eksklusif, 
            dan inspirasi desain interior langsung di inbox Anda.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
            />
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
              Berlangganan
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}