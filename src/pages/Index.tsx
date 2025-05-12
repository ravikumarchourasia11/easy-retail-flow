
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-pos-gray-light">
      <div className="pos-container text-center px-6 animate-fade-in">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pos-purple to-pos-purple-dark">
          POS System
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          A comprehensive, user-friendly, and efficient SaaS-based Point of Sale system 
          that empowers retail businesses to manage their operations seamlessly.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-4 flex justify-center">
              <div className="p-3 rounded-full bg-pos-purple/10">
                <Package className="h-10 w-10 text-pos-purple" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Vendor</h2>
            <p className="text-gray-500 mb-6">
              Manage your products, track inventory, and process orders with our 
              powerful vendor dashboard.
            </p>
            <Button className="w-full" onClick={() => navigate("/vendor")}>
              Go to Vendor Dashboard
            </Button>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-4 flex justify-center">
              <div className="p-3 rounded-full bg-pos-purple/10">
                <ShoppingCart className="h-10 w-10 text-pos-purple" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Customer</h2>
            <p className="text-gray-500 mb-6">
              Browse products, add items to cart, and complete purchases with our 
              streamlined customer interface.
            </p>
            <Button className="w-full" onClick={() => navigate("/customer")}>
              Go to Customer Store
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
