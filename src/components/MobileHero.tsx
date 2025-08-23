import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Award, Truck } from "lucide-react"
import { MobileImageSlider } from "./MobileImageSlider"
import { ProductSummary } from "@/lib/supabase-optimized"

interface MobileHeroProps {
  products: ProductSummary[]
}

const MobileHero = ({ products }: MobileHeroProps) => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-8 md:py-16">
      <div className="container mx-auto px-4">
        {/* Mobile-first layout */}
        <div className="space-y-6 md:grid md:grid-cols-2 md:gap-8 md:items-center md:space-y-0">
          {/* Image slider - appears first on mobile for better LCP */}
          <div className="order-1 md:order-2">
            <MobileImageSlider products={products} />
          </div>

          {/* Content - appears second on mobile */}
          <div className="order-2 md:order-1">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              Kaca Film & Sandblast Terbaik di Indonesia
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              Spesialis kaca film, sandblast, dan stiker dekoratif untuk rumah, kantor, dan kendaraan. 
              Pemasangan profesional ke seluruh Indonesia dengan garansi resmi.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
              <Button size="lg" className="group w-full sm:w-auto">
                Lihat Katalog
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Konsultasi Gratis
              </Button>
            </div>
            
            {/* Mobile-optimized features grid */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 pt-6 md:pt-8 border-t border-border">
              <div className="text-center">
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-1 md:mb-2" />
                <p className="text-xs md:text-sm font-medium">Garansi Resmi</p>
              </div>
              <div className="text-center">
                <Award className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-1 md:mb-2" />
                <p className="text-xs md:text-sm font-medium">Kualitas Premium</p>
              </div>
              <div className="text-center">
                <Truck className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-1 md:mb-2" />
                <p className="text-xs md:text-sm font-medium">Pemasangan Pro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileHero