import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCatalog from '@/components/ProductCatalog';
import { getLocationPage, generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/supabase-seo';
import { generateLocationMetadata } from '@/lib/seo-utils';

// Dynamic import untuk client component
const WhatsAppFloat = dynamic(() => import('@/components/WhatsAppFloat'), {
    ssr: false
});

interface LocationPageProps {
    params: {
        slug: string;
    };
}

// Generate static params for all location pages
export async function generateStaticParams() {
    return [
        { slug: 'bantul' },
        { slug: 'sleman' },
        { slug: 'solo' },
        { slug: 'magelang' },
        { slug: 'klaten' }
    ];
}

// Generate metadata for each location page
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
    const location = await getLocationPage(params.slug);

    if (!location) {
        return {
            title: 'Lokasi Tidak Ditemukan'
        };
    }

    return generateLocationMetadata(location.name, location.province);
}

export default async function LocationPage({ params }: LocationPageProps) {
    const location = await getLocationPage(params.slug);

    if (!location) {
        notFound();
    }

    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Lokasi', url: '/' },
        { name: location.name, url: `/lokasi/${location.slug}` }
    ];

    const localBusinessSchema = generateLocalBusinessSchema(location);
    const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

    return (
        <>
            {/* Schema Markup */}
            <Script
                id={`local-business-schema-${location.slug}`}
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(localBusinessSchema)
                }}
            />
            <Script
                id={`breadcrumb-schema-${location.slug}`}
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema)
                }}
            />

            <div className="min-h-screen bg-background">
                {/* Header - sama seperti homepage */}
                <Header />

                {/* Hero Section dengan style yang konsisten */}
                <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 pt-24 pb-16">
                    <div className="container mx-auto px-4">
                        {/* Breadcrumbs */}
                        <nav className="mb-6 text-sm" aria-label="Breadcrumb">
                            <ol className="flex items-center space-x-2 text-muted-foreground">
                                {breadcrumbs.map((crumb, index) => (
                                    <li key={crumb.url} className="flex items-center">
                                        {index > 0 && <span className="mx-2">/</span>}
                                        <a
                                            href={crumb.url}
                                            className="hover:text-foreground transition-colors"
                                        >
                                            {crumb.name}
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </nav>

                        <div className="max-w-4xl">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                {location.title}
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                                {location.description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="https://wa.me/6285156275565"
                                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    Hubungi Kami
                                </a>
                                <a
                                    href="tel:+6285156275565"
                                    className="inline-flex items-center gap-2 bg-card hover:bg-accent text-foreground px-6 py-3 rounded-lg font-semibold transition-all border border-border shadow-lg"
                                >
                                    📞 +62 851-5627-5565
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-16 container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                        Layanan Kami di {location.name}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-border">
                            <div className="text-5xl mb-4">🎨</div>
                            <h3 className="text-xl font-bold mb-3">Kaca Film Premium</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Kaca film berkualitas tinggi dengan teknologi nano-ceramic. Anti panas, UV protection hingga 99%, dan garansi resmi hingga 5 tahun.
                            </p>
                        </div>

                        <div className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-border">
                            <div className="text-5xl mb-4">✨</div>
                            <h3 className="text-xl font-bold mb-3">Sandblast Custom</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Stiker sandblast dengan motif custom sesuai keinginan. Cocok untuk privasi kaca kantor, rumah, dan dekorasi interior modern.
                            </p>
                        </div>

                        <div className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-border">
                            <div className="text-5xl mb-4">🎯</div>
                            <h3 className="text-xl font-bold mb-3">Cutting Sticker</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Cutting sticker oracal untuk branding, dekorasi, dan signage. Tahan lama, warna tidak mudah pudar, dan mudah diaplikasikan.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Coverage Area */}
                {location.service_areas && location.service_areas.length > 0 && (
                    <section className="py-16 bg-muted/30">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                                Area Layanan di {location.name}
                            </h2>
                            <div className="flex flex-wrap justify-center gap-4">
                                {location.service_areas.map((area) => (
                                    <span
                                        key={area}
                                        className="bg-card px-6 py-3 rounded-full shadow-md text-foreground font-medium border border-border hover:bg-accent transition-colors"
                                    >
                                        📍 {area}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Why Choose Us */}
                <section className="py-16 container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                        Mengapa Memilih Kami?
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">✅</span>
                            </div>
                            <h3 className="font-bold mb-2 text-lg">Garansi Resmi</h3>
                            <p className="text-muted-foreground text-sm">Garansi 1-5 tahun untuk semua produk</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">👨‍🔧</span>
                            </div>
                            <h3 className="font-bold mb-2 text-lg">Tim Profesional</h3>
                            <p className="text-muted-foreground text-sm">Teknisi berpengalaman dan terlatih</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">💰</span>
                            </div>
                            <h3 className="font-bold mb-2 text-lg">Harga Terjangkau</h3>
                            <p className="text-muted-foreground text-sm">Harga kompetitif dengan kualitas terbaik</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">🆓</span>
                            </div>
                            <h3 className="font-bold mb-2 text-lg">Gratis Survey</h3>
                            <p className="text-muted-foreground text-sm">Survey dan konsultasi gratis untuk area {location.name}</p>
                        </div>
                    </div>
                </section>

                {/* Product Catalog - Produk Kami */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Produk Kami di {location.name}
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Pilihan lengkap kaca film, sandblast, dan stiker dekoratif berkualitas tinggi
                                dengan harga terjangkau dan garansi resmi.
                            </p>
                        </div>
                        <ProductCatalog />
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Siap Mempercantik Ruangan Anda?
                        </h2>
                        <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
                            Hubungi kami sekarang untuk konsultasi gratis dan penawaran terbaik di {location.name}!
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="https://wa.me/6285156275565"
                                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                Chat WhatsApp
                            </a>
                            <a
                                href="tel:+6285156275565"
                                className="inline-flex items-center gap-2 bg-card hover:bg-accent text-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all border border-border shadow-lg"
                            >
                                📞 Telepon Sekarang
                            </a>
                        </div>
                    </div>
                </section>

                {/* Footer - sama seperti homepage */}
                <Footer />

                {/* WhatsApp Float - sama seperti homepage */}
                <WhatsAppFloat />

                {/* Keywords untuk SEO (hidden) */}
                <div className="sr-only">
                    <h2>Keywords</h2>
                    <p>{location.keywords.join(', ')}</p>
                </div>
            </div>
        </>
    );
}
