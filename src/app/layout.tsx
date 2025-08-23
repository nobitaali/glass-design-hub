import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryProvider } from "./providers";
import { ThemeProvider } from "next-themes";
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
  title: "Kaca Film | Sandblast Jogja | Interior Solutions | Stiker Gedung | Jaya Sticker Custom",
  description: "Spesialis kaca film, sandblast & stiker dekoratif Yogyakarta. Pemasangan profesional seluruh Indonesia. Garansi resmi, harga terjangkau!",
  keywords: "kaca film jogja, sandblast jogja, stiker dekoratif jogja, kaca film mobil jogja, kaca film rumah jogja, sandblast motif, stiker vinyl jogja, interior design jogja, kaca film hitam, kaca film silver, stiker tembok, one way vision, cutting sticker, reflektor, pemasangan kaca film jogja, jasa sandblast jogja, dekorasi interior, privasi kaca, anti panas, UV protection, kaca film murah jogja, sandblast murah jogja",
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
    title: "Kaca Film, Sandblast & Stiker Dekoratif Jogja | Interior Solutions Indonesia",
    description: "✅ Spesialis kaca film, sandblast, dan stiker dekoratif. Pemasangan profesional seluruh Indonesia. Harga terjangkau!",
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
        {/* Performance-optimized resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://hyztwerpkhopdcsenbsn.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        <meta name="google-site-verification" content="Z4jQZ-VVe8LrGUuWK1404dn7o6-tnNeQvmf-pLytdWQ" />

        {/* Optimized script loading - defer analytics to improve performance */}
        {analitics==="true"&& 
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-91VW4NNVRS`}
        />
        }

        {analitics==="true"&&<Script
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
              "priceRange": "$$",
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
            </TooltipProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}