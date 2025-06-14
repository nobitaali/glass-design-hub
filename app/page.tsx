import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCatalog from "@/components/ProductCatalog";
import CustomDesign from "@/components/CustomDesign";
import GoogleMaps from "@/components/GoogleMaps";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProductCatalog />
      <CustomDesign />
      <GoogleMaps />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}