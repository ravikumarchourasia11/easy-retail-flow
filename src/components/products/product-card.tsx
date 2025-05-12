
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePos, Product } from "@/contexts/pos-context";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  isVendor?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isVendor = false }) => {
  const { addToCart } = usePos();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="pos-card overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" 
        />
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg">{product.name}</h3>
          <p className="font-bold text-pos-purple">${product.price.toFixed(2)}</p>
        </div>
        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{product.description}</p>
        <p className="text-sm mt-2">
          <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
            {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
          </span>
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isVendor ? (
          <Button variant="outline" className="w-full" asChild>
            <a href={`/vendor/products/${product.id}`}>Edit Product</a>
          </Button>
        ) : (
          <Button 
            className="w-full" 
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
