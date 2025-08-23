import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Eye } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import QuoteRequestButton from "@/components/QuoteRequestButton";
import { ProductImage } from "@/components/OptimizedImage";
import { Product } from "@/lib/supabase";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg group flex flex-col h-full justify-between transition-all duration-300 hover:-translate-y-1 overflow-hidden critical-render">
      <div className="relative h-48 overflow-hidden" role="img" aria-label={`${product.title} product image`}>
        <ProductImage 
          src={product.image_url} 
          alt={`${product.title} - ${product.category} product`}
          className="group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground" aria-label={`Category: ${product.category}`}>
          {product.category}
        </Badge>
        {product.price && (
          <div className="absolute bottom-3 left-3 text-white font-bold text-lg" aria-label={`Price: ${product.price}`}>
            {product.price}
          </div>
        )}
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {product.title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2 mb-6">
          {product.features.slice(0, 3).map((feature: string, index: number) => (
            <div key={index} className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button size="sm" className="flex-1" variant="outline" asChild>
              <Link href={`/product/${product.slug}`}>
                <Eye className="h-4 w-4 mr-1" />
                Detail
              </Link>
            </Button>
            <WhatsAppButton title={product.title} category={product.category} price={product.price} />
          </div>
          <QuoteRequestButton title={product.title} />
        </div>
      </CardContent>
    </Card>
  );
}