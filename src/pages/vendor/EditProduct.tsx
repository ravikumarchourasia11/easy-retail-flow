
import React from "react";
import { useParams } from "react-router-dom";
import { usePos } from "@/contexts/pos-context";
import ProductForm from "@/components/products/product-form";

const EditProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const { state } = usePos();
  
  const product = state.products.find(product => product.id === productId);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-500">Product Not Found</h1>
        <p className="mt-2 text-gray-500">
          The product you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <p className="text-muted-foreground">
          Update product details using the form below.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <ProductForm product={product} mode="edit" />
      </div>
    </div>
  );
};

export default EditProduct;
