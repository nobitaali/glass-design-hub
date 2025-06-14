import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, Truck } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Transformasi Interior dengan
              <span className="text-primary block">Kaca Film Premium</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Spesialis kaca film, sandblast, dan stiker dekoratif untuk rumah, kantor, dan kendaraan. 
              Dengan pengalaman bertahun-tahun dan teknologi terdepan.
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
          
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-20 h-20 bg-primary rounded-full"></div>
                </div>
                <p className="text-sm text-muted-foreground">Tampilan Hasil Kaca Film Premium</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;