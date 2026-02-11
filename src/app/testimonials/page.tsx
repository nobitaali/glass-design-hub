import { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestimonialCard from '@/components/TestimonialCard';
import {
  getAllTestimonials,
  getTestimonialStats,
  generateAggregateRatingSchema
} from '@/lib/supabase-testimonials';
import { generateTestimonialsPageMetadata, renderStars } from '@/lib/testimonial-utils';

// ISR: Revalidate every 10 minutes
export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getTestimonialStats();
  return generateTestimonialsPageMetadata(stats.total_count, stats.average_rating);
}

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials();
  const stats = await getTestimonialStats();
  const aggregateSchema = generateAggregateRatingSchema(stats);

  const displayStats = [
    { number: `${stats.total_count}+`, label: 'Testimoni Pelanggan' },
    { number: stats.average_rating.toFixed(1), label: 'Rating Rata-rata' },
    { number: `${stats.five_star_count}`, label: 'Rating 5 Bintang' },
    { number: '99%', label: 'Kepuasan Pelanggan' }
  ];

  return (
    <>
      {/* Aggregate Rating Schema */}
      <Script
        id="aggregate-rating-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aggregateSchema)
        }}
      />

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Testimoni Pelanggan
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Kepercayaan dari {stats.total_count}+ pelanggan yang puas dengan layanan kaca film, sandblast,
              dan stiker dekoratif kami di Yogyakarta dan sekitarnya.
            </p>

            {/* Rating Display */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="text-5xl font-bold text-primary">
                {stats.average_rating.toFixed(1)}
              </div>
              <div>
                <div className="text-3xl text-yellow-500 mb-1">
                  {renderStars(stats.average_rating)}
                </div>
                <p className="text-sm text-muted-foreground">
                  dari {stats.total_count} testimoni
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {displayStats.map((stat, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-4 shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 container mx-auto px-4">
          {testimonials.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Apa Kata Mereka?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Testimoni asli dari pelanggan yang telah mempercayakan kebutuhan
                  kaca film dan sandblast mereka kepada kami.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-2xl font-bold mb-4">Testimoni Segera Hadir</h3>
              <p className="text-muted-foreground mb-8">
                Kami sedang mengumpulkan testimoni dari pelanggan kami. <br />
                Sementara itu, hubungi kami untuk konsultasi!
              </p>
              <a
                href="https://wa.me/6285156275565"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Hubungi Kami
              </a>
            </div>
          )}
        </section>

        {/* Rating Breakdown */}
        {testimonials.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-8 text-center">
                  Distribusi Rating
                </h3>
                <div className="space-y-4">
                  {[5, 4, 3].map((rating) => {
                    const count = rating === 5 ? stats.five_star_count :
                      rating === 4 ? stats.four_star_count :
                        stats.three_star_count;
                    const percentage = stats.total_count > 0
                      ? Math.round((count / stats.total_count) * 100)
                      : 0;

                    return (
                      <div key={rating} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-semibold flex items-center gap-1">
                          {rating} <span className="text-yellow-500">⭐</span>
                        </div>
                        <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                          <div
                            className="bg-primary h-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="w-16 text-sm text-muted-foreground text-right">
                          {count} ({percentage}%)
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Siap Bergabung dengan Pelanggan Puas Kami?
            </h2>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Dapatkan layanan kaca film dan sandblast berkualitas tinggi dengan
              pelayanan profesional yang telah dipercaya oleh {stats.total_count}+ pelanggan!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/6285156275565"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Konsultasi Gratis
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-card hover:bg-accent text-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all border border-border shadow-lg"
              >
                Lihat Katalog Produk
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}