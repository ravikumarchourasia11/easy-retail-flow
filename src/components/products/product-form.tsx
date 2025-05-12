
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePos, Product } from "@/contexts/pos-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ProductFormProps {
  product?: Product;
  mode: "create" | "edit";
}

const ProductForm: React.FC<ProductFormProps> = ({ product, mode }) => {
  const navigate = useNavigate();
  const { addProduct, updateProduct } = usePos();
  const { toast } = useToast();

  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: product?.name || "",
    price: product?.price || 0,
    description: product?.description || "",
    image: product?.image || "/placeholder.svg",
    stock: product?.stock || 0,
    category: product?.category || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "create") {
      // Create a new product with a unique ID
      const newProduct: Product = {
        ...formData,
        id: Date.now().toString(),
      };
      addProduct(newProduct);
      toast({
        title: "Product created",
        description: "Your product has been created successfully.",
      });
    } else if (mode === "edit" && product) {
      // Update existing product
      const updatedProduct: Product = {
        ...formData,
        id: product.id,
      };
      updateProduct(updatedProduct);
      toast({
        title: "Product updated",
        description: "Your product has been updated successfully.",
      });
    }

    navigate("/vendor/products");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter product category"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit">
          {mode === "create" ? "Create Product" : "Update Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/vendor/products")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
