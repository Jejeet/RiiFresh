"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "../components/shop/productCard/page"; 
import { getProducts, ShopProduct } from "@/lib/products"; // Adjust path to your lib file

interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: any;
  quantity: number;
}

export default function ProductCatalogPage() {
  // Fetch all products using your library function
  const allProducts: ShopProduct[] = getProducts();

  // Cart state management
  const [cart, setCart] = useState<CartItem[]>([]);

  const add = (itemToBuild: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.productId === itemToBuild.productId);

      if (existingItem) {
        return prevCart.map((i) =>
          i.productId === itemToBuild.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prevCart, { ...itemToBuild, quantity: 1 }];
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-zinc-900">Explore Our Flavors</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allProducts.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onAdd={(p) => {
              add({
                productId: p.id,
                slug: p.slug,
                name: p.name,
                price: p.price,
                imageUrl: p.imageUrl,
              });
              toast.success(`${p.name} added to cart`);
            }}
          />
        ))}
      </div>
    </div>
  );
}

