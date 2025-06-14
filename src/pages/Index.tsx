import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCatalog from "@/components/ProductCatalog";
import CustomDesign from "@/components/CustomDesign";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProductCatalog />
      <CustomDesign />
      <Footer />
    </div>
  );
};

export default Index;
