import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kaca Film & Sandblast Jakarta | Interior Solutions",
  description: "Spesialis kaca film, sandblast & stiker dekoratif Jakarta. Pemasangan profesional seluruh Indonesia. Garansi resmi, harga terjangkau!",
  keywords: "kaca film jakarta, sandblast jakarta, stiker dekoratif jakarta, kaca film mobil, kaca film gedung, sandblast motif, stiker vinyl, interior design jakarta, kaca film hitam, kaca film silver, stiker tembok, one way vision, cutting sticker, reflektor, pemasangan kaca film jakarta, jasa sandblast jakarta, dekorasi interior, privasi kaca, anti panas, UV protection, kaca film murah jakarta, sandblast murah jakarta",
  authors: [{ name: "Interior Solutions Indonesia" }],
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  openGraph: {
    locale: "id_ID",
    siteName: "Interior Solutions Indonesia",
    title: "Kaca Film, Sandblast & Stiker Dekoratif Terbaik Jakarta | Interior Solutions Indonesia",
    description: "✅ Spesialis kaca film, sandblast, dan stiker dekoratif untuk interior rumah, kantor, dan kendaraan. Pemasangan profesional ke seluruh Indonesia. Harga terjangkau, kualitas terbaik!",
    type: "website",
    url: "https://14ed50bb-4d5d-4d96-9b7e-3900a484f421.lovableproject.com",
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
    title: "Kaca Film, Sandblast & Stiker Dekoratif Jakarta | Interior Solutions Indonesia",
    description: "✅ Spesialis kaca film, sandblast, dan stiker dekoratif. Pemasangan profesional seluruh Indonesia. Harga terjangkau!",
    images: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=630&fit=crop"],
  },
  other: {
    "theme-color": "#1a1a1a",
    "geo.region": "ID-JK",
    "geo.country": "Indonesia",
    "geo.placename": "Jakarta",
    "ICBM": "-6.200000, 106.816666",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="canonical" href="https://14ed50bb-4d5d-4d96-9b7e-3900a484f421.lovableproject.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Interior Solutions Indonesia",
              "description": "Spesialis kaca film, sandblast, dan stiker dekoratif untuk interior rumah, kantor, dan kendaraan",
              "url": "https://14ed50bb-4d5d-4d96-9b7e-3900a484f421.lovableproject.com",
              "telephone": "+62851-5627-5565",
              "email": "info@interiorfilm.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jakarta Selatan",
                "addressLocality": "Jakarta",
                "addressRegion": "DKI Jakarta",
                "postalCode": "12560",
                "addressCountry": "Indonesia"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-6.200000",
                "longitude": "106.816666"
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
              "sameAs": [
                "https://www.facebook.com/interiorsolutions.id",
                "https://www.instagram.com/interiorsolutions.id",
                "https://www.youtube.com/c/InteriorSolutionsIndonesia",
                "https://www.linkedin.com/company/interior-solutions-indonesia"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ReactQueryProvider>
          <TooltipProvider>
            {children}
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}