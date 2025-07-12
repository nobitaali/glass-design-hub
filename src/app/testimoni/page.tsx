import { Star, Building2, Car, Home, Quote } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimoni Klien - Interior Solutions Indonesia",
  description: "Kepercayaan dari 500+ perusahaan besar Indonesia. Lihat testimoni klien kami yang telah menggunakan layanan kaca film, sandblast, dan stiker dekoratif.",
  openGraph: {
    title: "Testimoni Klien - Interior Solutions Indonesia",
    description: "Kepercayaan dari 500+ perusahaan besar Indonesia. Lihat testimoni klien kami yang telah menggunakan layanan kaca film, sandblast, dan stiker dekoratif.",
  },
};

export default function Testimoni() {
  const testimoni = [
    {
      company: "PT Indofood Sukses Makmur",
      type: "Perusahaan Multinasional",
      project: "Pemasangan kaca film dan sandblast untuk 15 cabang kantor",
      testimonial: "Pelayanan sangat profesional, hasil pemasangan rapi dan sesuai jadwal. Tim sangat berpengalaman dan memberikan solusi terbaik untuk kebutuhan privasi kantor kami.",
      rating: 5,
      location: "Jakarta, Surabaya, Medan",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
    },
    {
      company: "Hotel Santika Premier",
      type: "Jaringan Hotel",
      project: "Sandblast motif untuk lobby dan kaca film untuk kamar",
      testimonial: "Desain sandblast yang dibuat sangat elegan dan sesuai dengan konsep hotel kami. Kaca film di kamar-kamar memberikan privasi yang sempurna untuk tamu.",
      rating: 5,
      location: "Bali, Yogyakarta, Bandung",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
    },
    {
      company: "Blue Bird Group",
      type: "Perusahaan Transportasi",
      project: "Kaca film untuk 500+ unit armada taksi",
      testimonial: "Kualitas kaca film sangat baik, pemasangan cepat dan hasil yang memuaskan. Sudah 3 tahun masih awet dan tidak ada masalah.",
      rating: 5,
      location: "Seluruh Indonesia",
      icon: Car,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
    },
    {
      company: "Ciputra Group",
      type: "Developer Properti",
      project: "Sandblast dan stiker dekoratif untuk showroom",
      testimonial: "Tim sangat kreatif dalam memberikan ide desain. Hasil akhir sangat memuaskan dan meningkatkan estetika showroom kami secara signifikan.",
      rating: 5,
      location: "Jakarta, Surabaya, Makassar",
      icon: Home,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop"
    },
    {
      company: "Bank Mandiri",
      type: "Perbankan",
      project: "One way vision untuk branding cabang",
      testimonial: "Stiker one way vision sangat efektif untuk branding dan tetap memberikan privasi dari dalam. Kualitas printing tajam dan tahan lama.",
      rating: 5,
      location: "Jakarta, Bandung, Semarang",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop"
    },
    {
      company: "IKEA Indonesia",
      type: "Retail Furniture",
      project: "Sandblast cutting untuk partisi display",
      testimonial: "Presisi cutting sangat detail sesuai dengan desain yang kami minta. Pemasangan di berbagai store berjalan lancar dan tepat waktu.",
      rating: 5,
      location: "Jakarta, Tangerang, Bandung",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
    }
  ];

  const stats = [
    { number: "500+", label: "Perusahaan Klien" },
    { number: "10,000+", label: "Proyek Selesai" },
    { number: "15", label: "Tahun Pengalaman" },
    { number: "99%", label: "Kepuasan Klien" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Testimoni Klien
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Kepercayaan dari perusahaan-perusahaan besar Indonesia adalah motivasi kami untuk terus memberikan pelayanan terbaik
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimoni.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.company}</CardTitle>
                        <CardDescription className="text-sm">{item.type}</CardDescription>
                      </div>
                    </div>
                    <Quote className="h-8 w-8 text-primary/20" />
                  </div>
                  
                  <div className="relative h-32 overflow-hidden rounded-lg mb-4">
                    <img 
                      src={item.image} 
                      alt={item.company}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Proyek:</h4>
                    <p className="text-sm text-muted-foreground">{item.project}</p>
                  </div>
                  
                  <blockquote className="text-sm text-muted-foreground italic mb-4 leading-relaxed">
                    &quot;{item.testimonial}&quot;
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">{item.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Bergabunglah dengan Klien-Klien Terpercaya Kami
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Dapatkan solusi interior berkualitas tinggi dengan pelayanan profesional yang telah dipercaya oleh perusahaan-perusahaan besar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6285156275565?text=Halo! Saya tertarik untuk berkonsultasi tentang kebutuhan interior perusahaan kami."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
            >
              Konsultasi Gratis
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors"
            >
              Lihat Katalog Produk
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}