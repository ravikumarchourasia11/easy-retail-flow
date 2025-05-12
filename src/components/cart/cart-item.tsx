
import React from 'react';
import { Button } from "@/components/ui/button";
import { usePos, CartItem } from "@/contexts/pos-context";
import { Plus, Minus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItem;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { updateCartItem, removeFromCart } = usePos();
  
  const handleIncrement = () => {
    if (item.quantity < item.product.stock) {
      updateCartItem(item.product.id, item.quantity + 1);
    }
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateCartItem(item.product.id, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.product.id);
  };

  return (
    <div className="flex items-center py-4 border-b">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{item.product.name}</h3>
          <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.product.description}</p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-2">{item.quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={handleIncrement}
              disabled={item.quantity >= item.product.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
