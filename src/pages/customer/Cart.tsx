
import React from "react";
import { useNavigate } from "react-router-dom";
import { usePos } from "@/contexts/pos-context";
import { Button } from "@/components/ui/button";
import CartItemComponent from "@/components/cart/cart-item";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ShoppingCart } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { state, clearCart, getCartTotal } = usePos();
  const { toast } = useToast();
  const { cart } = state;
  
  const handleCheckout = () => {
    toast({
      title: "Order placed successfully",
      description: "Thank you for your purchase!",
    });
    clearCart();
    navigate("/customer");
  };
  
  if (cart.length === 0) {
    return (
      <div className="pos-container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-pos-gray-light">
              <ShoppingCart className="h-12 w-12 text-pos-purple" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button 
            className="mt-6" 
            onClick={() => navigate("/customer")}
            variant="default"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pos-container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.product.id} className="py-2">
                    <CartItemComponent item={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-lg font-medium">Order Summary</h2>
            
            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-base font-medium">
                <p>Subtotal</p>
                <p>${getCartTotal().toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              
              <div className="border-t pt-4 flex justify-between text-base font-medium">
                <p>Total</p>
                <p>${getCartTotal().toFixed(2)}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <Button className="w-full" onClick={handleCheckout}>
                Checkout
              </Button>
              
              <div className="mt-4 text-center">
                <Button 
                  variant="link" 
                  onClick={() => navigate("/customer")}
                  className="text-pos-purple"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
