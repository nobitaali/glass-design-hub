import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryProvider } from "./providers";
import { ThemeProvider } from "next-themes";
import PerformanceMonitor, { ResourceHints } from "@/components/PerformanceMonitor";
const analitics = process.env.NEXT_PUBLIC_ENABLE_GA_TRACKING!
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jayasticker.id"),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
    other: [
      {
        rel: 'android-chrome',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'android-chrome',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
      },
    ],
  },
  manifest: '/site.webmanifest',
  title: "Stiker Kaca Jogja | Kaca Film, Sandblast Es Buram & Cutting Oracal – Jaya Sticker Custom",
  description: "Spesialis kaca film, sandblast & stiker dekoratif Yogyakarta. Pemasangan profesional seluruh Indonesia. Garansi resmi, harga terjangkau! Melayani Bantul, Sleman, Solo, Magelang, Klaten.",
  keywords: "stiker kaca jogja, kaca film jogja, sandblast jogja, kaca film yogyakarta, jasa pasang kaca film jogja, stiker dekoratif jogja, kaca film murah jogja, sandblast custom jogja, one way vision jogja, cutting sticker jogja, kaca film anti panas jogja, stiker kaca kantor jogja, kaca film gedung jogja, wall branding jogja, wrapping stiker jogja, stiker kaca bantul, stiker kaca sleman, kaca film solo",
  authors: [{ name: "Interior Solutions Indonesia" }],
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    locale: "id_ID",
    siteName: "Interior Solutions Indonesia",
    title: "Stiker Kaca Jogja | Kaca Film, Sandblast Es Buram & Cutting Oracal – Jaya Sticker Custom",
    description: "✅ Spesialis kaca film, sandblast, dan stiker dekoratif untuk interior rumah, kantor, dan kendaraan di Yogyakarta. Pemasangan profesional seluruh Indonesia. Harga terjangkau, kualitas terbaik!",
    type: "website",
    url: "/",
    images: [
      {
        url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Kaca Film dan Sandblast Berkualitas - Interior Solutions Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stiker Kaca Jogja | Kaca Film, Sandblast & Cutting Oracal",
    description: "✅ Spesialis kaca film, sandblast, dan stiker dekoratif Yogyakarta. Pemasangan profesional seluruh Indonesia. Harga terjangkau!",
    images: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=630&fit=crop"],
  },
  other: {
    "theme-color": "#1a1a1a",
    "geo.region": "ID-YO",
    "geo.country": "Indonesia",
    "geo.placename": "Yogyakarta",
    "ICBM": "-7.794295016481657, 110.39691781552109",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Enhanced resource hints for better performance */}
        <ResourceHints />

        <meta name="google-site-verification" content="Z4jQZ-VVe8LrGUuWK1404dn7o6-tnNeQvmf-pLytdWQ" />

        {/* Optimized script loading - defer analytics to improve performance */}
        {analitics === "true" &&
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=G-91VW4NNVRS`}
          />
        }

        {analitics === "true" && <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-91VW4NNVRS', {
                page_title: document.title,
                page_location: window.location.href
              });
            `,
          }}
        />}

        {/* Optimized schema loading */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Interior Solutions Indonesia",
              "description": "Spesialis kaca film, sandblast, dan stiker dekoratif untuk interior rumah, kantor, dan kendaraan",
              "url": "https://www.jayasticker.id/",
              "telephone": "+62851-5627-5565",
              "email": "jayastiker25@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Nakula No.82A, RT.03/RW.15, Sokowaten, Banguntapan, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55198",
                "addressLocality": "Bantul",
                "addressRegion": "Yogyakarta",
                "postalCode": "12560",
                "addressCountry": "Indonesia"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-7.794307601516723",
                "longitude": "110.3968939298367"
              },
              "areaServed": {
                "@type": "Country",
                "name": "Indonesia"
              },
              "priceRange": "$",
              "openingHours": "Mo-Su 00:00-23:59",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "bestRating": "5",
                "worstRating": "1",
                "ratingCount": "127"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+62851-5627-5565",
                "contactType": "customer service",
                "areaServed": "ID",
                "availableLanguage": "Indonesian"
              },

            })
          }}
        />

        {/* Mobile performance monitoring */}
        <Script
          id="mobile-performance"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined' && window.innerWidth < 768) {
                  // Mobile-specific performance monitoring
                  const script = document.createElement('script');
                  script.type = 'module';
                  script.textContent = \`
                    import { initMobilePerformanceMonitoring, preloadCriticalMobileResources } from '/src/lib/mobile-performance.js';
                    initMobilePerformanceMonitoring();
                    preloadCriticalMobileResources();
                  \`;
                  document.head.appendChild(script);
                }
              })();
            `,
          }}
        />

        {/* FAQ Schema */}
        <Script
          id="faq-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Berapa lama proses pemasangan kaca film?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Proses pemasangan kaca film untuk mobil biasanya memakan waktu 2-3 jam, sedangkan untuk rumah atau kantor tergantung luas area kaca yang akan dipasang, biasanya 1-2 hari untuk area yang luas."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Apakah kaca film yang Anda jual bergaransi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ya, semua produk kaca film kami dilengkapi garansi resmi. Garansi dapat mencakup 1-5 tahun tergantung jenis kaca film yang dipilih. Garansi mencakup pengelupasan, perubahan warna, dan kerusakan akibat cacat produksi."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Apakah Anda melayani pemasangan di luar Yogyakarta?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ya, kami melayani pemasangan kaca film dan stiker ke seluruh Indonesia. Untuk area luar Yogyakarta, kami dapat mengirimkan produk dengan panduan instalasi atau menghubungkan Anda dengan mitra pemasangan kami di area tersebut."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Bagaimana cara merawat kaca film agar tahan lama?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Untuk merawat kaca film agar tahan lama: hindari membersihkan kaca dalam 7 hari pertama setelah pemasangan, gunakan kain microfiber dan pembersih kaca non-ammonia, hindari penggunaan benda tajam di dekat kaca film, dan hindari menempel stiker langsung pada kaca film."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Berapa harga kaca film per meter persegi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Harga kaca film bervariasi tergantung jenis dan kualitas, mulai dari Rp 100.000 hingga Rp 500.000 per meter persegi. Untuk kaca film mobil berkisar Rp 1.500.000 hingga Rp 5.000.000 per unit tergantung jenis kendaraan dan kualitas kaca film."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Apakah sandblast bisa dicustom motif sesuai keinginan?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ya, kami menerima custom design untuk stiker sandblast. Anda bisa mengirimkan desain sendiri atau berkonsultasi dengan tim desain kami untuk membuat motif yang sesuai dengan kebutuhan dan tema interior Anda."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Apakah cutting sticker bisa dilepas tanpa merusak permukaan?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Cutting sticker oracal yang kami gunakan dapat dilepas tanpa merusak permukaan jika dilepas dengan cara yang benar. Namun, untuk pemasangan jangka panjang lebih dari 1 tahun, kemungkinan ada residu yang perlu dibersihkan dengan pembersih khusus."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Apakah Anda menyediakan layanan survey lokasi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ya, kami menyediakan layanan survey lokasi gratis untuk area Yogyakarta dan sekitarnya. Tim kami akan datang ke lokasi untuk mengukur dan memberikan rekomendasi terbaik untuk kebutuhan kaca film atau stiker Anda."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${inter.className}`}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              {children}
              <Toaster />
              <Sonner />
              <PerformanceMonitor />
            </TooltipProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}