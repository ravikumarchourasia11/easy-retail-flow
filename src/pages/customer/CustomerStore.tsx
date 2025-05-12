
import React, { useState } from "react";
import { usePos } from "@/contexts/pos-context";
import ProductCard from "@/components/products/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CustomerStore = () => {
  const { state } = usePos();
  const { products } = state;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pos-container py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Browse Products</h1>
        <p className="text-muted-foreground mt-2">
          Discover our wide range of products at amazing prices
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              <Button 
                variant={selectedCategory === "" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setSelectedCategory("")}
              >
                All Categories
              </Button>
              {categories.map(category => (
                <Button 
                  key={category} 
                  variant={selectedCategory === category ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="mb-6">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-600">No products found</h2>
              <p className="mt-2 text-gray-500">
                Try adjusting your search or category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerStore;
