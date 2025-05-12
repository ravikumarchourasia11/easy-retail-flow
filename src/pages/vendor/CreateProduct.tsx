
import React from "react";
import ProductForm from "@/components/products/product-form";

const CreateProduct = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create Product</h1>
        <p className="text-muted-foreground">
          Add a new product to your inventory.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <ProductForm mode="create" />
      </div>
    </div>
  );
};

export default CreateProduct;
