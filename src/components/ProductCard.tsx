"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, MessageCircle, Eye } from "lucide-react";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import QuoteRequestButton from "@/components/QuoteRequestButton";
import { normalizeSlug } from "@/lib/utils";

interface ProductCardProps {
  title: string;
  description: string;
  features: string[];
  category: string;
  gradient: string;
  imageUrl: string;
  price?: string;
}

const ProductCard = ({ title, description, features, category, gradient, imageUrl, price }: ProductCardProps) => {
  const productSlug = normalizeSlug(title);
  console.log(`ProductCard: Generating slug - Title: "${title}", Normalized Slug: "${productSlug}"`);
  console.log(`ProductCard: Link href: "/product/${productSlug}"`);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {category}
        </Badge>
        {price && (
          <div className="absolute bottom-3 left-3 text-white font-bold text-lg">
            {price}
          </div>
        )}
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button size="sm" className="flex-1" variant="outline" asChild>
              <Link href={`/product/${productSlug}`}>
                <Eye className="h-4 w-4 mr-1" />
                Detail
              </Link>
            </Button>
            <WhatsAppButton title={title} category={category} price={price} />
          </div>
          <QuoteRequestButton title={title} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;