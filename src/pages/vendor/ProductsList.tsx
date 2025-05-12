
import React from "react";
import { useNavigate } from "react-router-dom";
import { usePos } from "@/contexts/pos-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/products/product-card";
import { Plus } from "lucide-react";

const ProductsList = () => {
  const navigate = useNavigate();
  const { state } = usePos();
  const { products } = state;
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => navigate("/vendor/products/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex items-center">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-600">No products found</h2>
          <p className="mt-2 text-gray-500">
            {searchTerm
              ? "Try adjusting your search term."
              : "Start by adding your first product."}
          </p>
          {!searchTerm && (
            <Button
              className="mt-4"
              onClick={() => navigate("/vendor/products/create")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} isVendor={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
