import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, MessageCircle } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  features: string[];
  category: string;
  gradient: string;
}

const ProductCard = ({ title, description, features, category, gradient }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <div className={`w-12 h-12 rounded-full ${gradient} flex items-center justify-center`}>
            <div className="w-6 h-6 bg-white rounded-full opacity-80"></div>
          </div>
        </div>
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
        
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            Detail Produk
          </Button>
          <Button size="sm" variant="outline">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;