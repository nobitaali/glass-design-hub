import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';
import { getAllLocationPages } from '@/lib/supabase-seo';

const WhatsAppFloat = dynamic(() => import('@/components/WhatsAppFloat'), {
    ssr: false
});

export const metadata: Metadata = {
    title: 'Lokasi Layanan Kami | Kaca Film & Sandblast - Jaya Sticker',
    description: 'Kami melayani pemasangan kaca film, sandblast, dan stiker dekoratif di Yogyakarta dan sekitarnya: Bantul, Sleman, Solo, Magelang, Klaten. Gratis konsultasi dan survey!',
    keywords: 'lokasi layanan, kaca film jogja, sandblast bantul, stiker sleman, kaca film solo'
};

export default async function LokasiPage() {
    const locations = await getAllLocationPages();

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 pt-24 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Lokasi Layanan Kami
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                        Kami melayani pemasangan kaca film, sandblast, dan stiker dekoratif profesional di berbagai kota.
                        Pilih lokasi Anda untuk informasi lebih detail!
                    </p>
                </div>
            </section>

            {/* Location Cards */}
            <section className="py-16 container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {locations.map((location) => (
                        <Link
                            key={location.slug}
                            href={`/lokasi/${location.slug}`}
                            className="group"
                        >
                            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 h-full">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                                            {location.name}
                                        </h2>
                                        <p className="text-sm text-muted-foreground">{location.province}</p>
                                    </div>
                                    <div className="text-4xl">📍</div>
                                </div>

                                <p className="text-muted-foreground mb-6 line-clamp-3">
                                    {location.description}
                                </p>

                                {/* Service Areas */}
                                {location.service_areas && location.service_areas.length > 0 && (
                                    <div className="mb-6">
                                        <p className="text-sm font-semibold mb-2">Area Layanan:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {location.service_areas.slice(0, 3).map((area) => (
                                                <span
                                                    key={area}
                                                    className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                                                >
                                                    {area}
                                                </span>
                                            ))}
                                            {location.service_areas.length > 3 && (
                                                <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                                                    +{location.service_areas.length - 3} lainnya
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* CTA */}
                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                    <span className="text-sm font-semibold text-primary group-hover:underline">
                                        Lihat Detail →
                                    </span>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        <span>Gratis Survey</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Fallback jika belum ada data */}
                {locations.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📍</div>
                        <h3 className="text-2xl font-bold mb-4">Lokasi Segera Hadir</h3>
                        <p className="text-muted-foreground mb-8">
                            Kami sedang mempersiapkan informasi lokasi layanan kami. <br />
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

            {/* Coverage Info */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Melayani Seluruh Indonesia
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Meskipun kami berbasis di Yogyakarta, kami melayani pemasangan kaca film dan sandblast
                        ke seluruh Indonesia dengan tim profesional dan garansi resmi.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <div className="text-4xl mb-3">🚚</div>
                            <h3 className="font-bold mb-2">Pengiriman Nasional</h3>
                            <p className="text-sm text-muted-foreground">Produk dikirim ke seluruh Indonesia</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <div className="text-4xl mb-3">👨‍🔧</div>
                            <h3 className="font-bold mb-2">Tim Profesional</h3>
                            <p className="text-sm text-muted-foreground">Teknisi berpengalaman di setiap kota</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <div className="text-4xl mb-3">✅</div>
                            <h3 className="font-bold mb-2">Garansi Resmi</h3>
                            <p className="text-sm text-muted-foreground">Garansi 1-5 tahun untuk semua produk</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <WhatsAppFloat />
        </div>
    );
}
