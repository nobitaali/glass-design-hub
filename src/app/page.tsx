import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Header = dynamic(() => import("@/components/Header"), {
  loading: () => <div>Loading header...</div>,
  ssr: false
});

const Hero = dynamic(() => import("@/components/Hero"), {
  loading: () => <div>Loading hero...</div>,
  ssr: false
});

const ProductCatalog = dynamic(() => import("@/components/ProductCatalog"), {
  loading: () => <div>Loading products...</div>,
  ssr: false
});

const CustomDesign = dynamic(() => import("@/components/CustomDesign"), {
  loading: () => <div>Loading custom design...</div>,
  ssr: false
});

const GoogleMaps = dynamic(() => import("@/components/GoogleMaps"), {
  loading: () => <div>Loading map...</div>,
  ssr: false
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div>Loading footer...</div>,
  ssr: false
});

const WhatsAppFloat = dynamic(() => import("@/components/WhatsAppFloat"), {
  loading: () => <div>Loading WhatsApp...</div>,
  ssr: false
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div>Loading page...</div>}>
        <Header />
        <Hero />
        <ProductCatalog />
        <CustomDesign />
        <GoogleMaps />
        <Footer />
        <WhatsAppFloat />
      </Suspense>
    </div>
  );
}