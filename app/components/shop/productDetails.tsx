"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ShopProduct } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";

type ProductDetailsProps = {
  product: ShopProduct;
};

const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const soldOut = product.stock <= 0;
  const subtotal = product.price * quantity;

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(current + 1, product.stock)
    );
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleAddToCart = () => {
    if (soldOut || quantity > product.stock) return;

    addToCart(product, quantity);

    toast.success(
      `${quantity} × ${product.name} added to cart`
    );
  };

  return (
    <main className="min-h-screen bg-[#faf8ef] px-5 py-5 text-[#062d25] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-360">
        <Link
          href="/"
          className="mb-7 inline-flex items-center gap-2 text-sm text-[#53675f] transition-colors hover:text-[#062d25]"
        >
          <ArrowLeft className="size-4" />
          Back to the fridge
        </Link>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
          {/* Product image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-[#f8c1a2]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Product details */}
          <section className="flex flex-col pt-0 md:pt-1">
            <Badge className="mb-4 w-fit rounded-full border-0 bg-[#dc171e] px-3 py-1 text-xs font-semibold text-white hover:bg-[#dc171e]">
              {product.category}
            </Badge>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[44px]">
              {product.name}
            </h1>

            <p className="mt-4 text-base leading-7 text-[#53675f] sm:text-lg">
              {product.description}
            </p>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full border-0 bg-[#eeeed8] px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-[#062d25] hover:bg-[#eeeed8]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Price */}
            <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="text-3xl font-extrabold tracking-tight sm:text-[34px]">
                {formatNaira(product.price)}
              </span>

              {product.calories !== undefined && (
                <span className="text-sm text-[#53675f]">
                  {product.calories} kcal / bottle
                </span>
              )}
            </div>

            {/* Quantity and cart button */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex h-12 items-center gap-5 rounded-full border border-[#dfdfcf] px-4">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1 || soldOut}
                  aria-label="Decrease quantity"
                  className="disabled:opacity-40"
                >
                  <Minus className="size-4" />
                </button>

                <span
                  aria-live="polite"
                  className="min-w-4 text-center text-sm font-semibold"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={
                    soldOut || quantity >= product.stock
                  }
                  aria-label="Increase quantity"
                  className="disabled:opacity-40"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <Button
                type="button"
                disabled={soldOut}
                onClick={handleAddToCart}
                className="h-12 min-w-42 rounded-full bg-[#dc171e] px-7 font-semibold text-white shadow-sm hover:bg-[#bd1118]"
              >
                <ShoppingBag className="mr-2 size-4" />
                {soldOut ? "Sold out" : "Add to cart"}
              </Button>
            </div>

            {/* Stock */}
            <p className="mt-5 text-sm text-[#53675f]">
              {soldOut
                ? "Currently out of stock"
                : `${product.stock} bottles left in this batch`}
            </p>

            {/* {quantity > 1 && 
            (
              <p className="mt-2 text-sm text-[#53675f]">
                Subtotal:{" "}
                <span className="font-semibold text-[#062d25]">
                  {formatNaira(subtotal)}
                </span>
              </p>
            )
            } */}

            {/* Ingredients */}
            {product.ingredients &&
              product.ingredients.length > 0 && (
                <div className="mt-10 border-t border-[#e5e3d8] pt-6">
                  <h2 className="text-lg font-bold">
                    Ingredients
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#53675f]">
                    {product.ingredients.join(", ")}
                  </p>
                </div>
              )}
          </section>
        </div>
      </div>
    </main>
  );
}