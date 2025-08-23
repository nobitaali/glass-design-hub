import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, Truck } from "lucide-react";
import AutoImageSliderOptimized from "@/components/AutoImageSliderOptimized";

const HeroOptimized = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Kaca Film & Sandblast Terbaik di Indonesia
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Spesialis kaca film, sandblast, dan stiker dekoratif untuk rumah, kantor, dan kendaraan. 
              Pemasangan profesional ke seluruh Indonesia dengan garansi resmi. Konsultasi gratis, 
              survey lokasi, dan after sales service terbaik. Teknologi terdepan dengan harga terjangkau 
              untuk solusi interior dan dekorasi yang berkualitas tinggi.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" className="group">
                Lihat Katalog
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Konsultasi Gratis
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div className="text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Garansi Resmi</p>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Kualitas Premium</p>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Pemasangan Pro</p>
              </div>
            </div>
          </div>

          <AutoImageSliderOptimized />
        </div>
      </div>
    </section>
  );
};

export default HeroOptimized;