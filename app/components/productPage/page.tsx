"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "../productCard/page";
import { StaticImageData } from "next/image";
import heroImg from "../../../assets/hero zobo.jpeg";

// 1. Define the structural shape of an item in the cart
interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string | StaticImageData;
  quantity: number;
}

export default function ProductPage() {
  // 2. Create the local cart state
  const [cart, setCart] = useState<CartItem[]>([]);

  // 3. Create the "add" function that maps directly to your JSX setup
  const add = (itemToBuild: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      // Check if the item already exists in the cart
      const existingItem = prevCart.find(
        (i) => i.productId === itemToBuild.productId,
      );

      if (existingItem) {
        // Increment quantity if it already exists
        return prevCart.map((i) =>
          i.productId === itemToBuild.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }

      // Add as a new item with a default quantity of 1
      return [...prevCart, { ...itemToBuild, quantity: 1 }];
    });
  };

  return (
    <div className="p-6">
      {/* Your exact implementation remains untouched and works seamlessly now */}
      <ProductCard
        product={{
          id: "1",
          slug: "riifresh-zobo-50cl",
          name: "RiiFresh Zobo 50cl",
          description:
            "The big-bottle RiiFresh: deep-red hibiscus squash infused with ginger, pineapple and dates.",
          imageUrl: heroImg,
          price: 1500,
          category: "Zobo",
          stock: 24,
        }}
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
    </div>
  );
}