import { create } from "zustand";
import type { ShopProduct } from "@/lib/products";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: ShopProduct["imageUrl"];
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: ShopProduct, quantity?: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existing = state.cart.find(
        (item) => item.productId === product.id
      );

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.productId === product.id
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity + quantity,
                    product.stock
                  ),
                }
              : item
          ),
        };
      }

      return {
        cart: [
          ...state.cart,
          {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: Math.min(quantity, product.stock),
          },
        ],
      };
    }),

  clearCart: () => set({ cart: [] }),
}));