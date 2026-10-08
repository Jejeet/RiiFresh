"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

import type { ShopProduct } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: ShopProduct;
  onAdd?: (product: ShopProduct) => void;
  className?: string;
};

const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export function ProductCard({
  product,
  onAdd,
  className,
}: ProductCardProps) {
  const soldOut = product.stock <= 0;
  const href = `/products/${product.slug}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-md",
        className
      )}
    >
      <Link
        href={href}
        aria-label={`View ${product.name}`}
        className="relative block aspect-[4/3.6] overflow-hidden bg-orange-100 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />

        <Badge
          variant="secondary"
          className="absolute left-4 top-4 rounded-full bg-background/90 px-4 py-1.5 text-sm font-semibold capitalize text-foreground hover:bg-background/90"
        >
          {product.category}
        </Badge>
      </Link>

      <div className="flex flex-1 flex-col px-7 pb-6 pt-6">
        <h3 className="text-xl font-extrabold tracking-tight text-foreground">
          <Link href={href} className="hover:underline">
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-base leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="text-2xl font-extrabold tracking-tight text-foreground">
            {formatNaira(product.price)}
          </span>

          <Button
            type="button"
            size="lg"
            disabled={soldOut}
            onClick={() => onAdd?.(product)}
            className="h-12 rounded-full px-6 text-base font-semibold shadow-md"
          >
            <Plus className="size-5" aria-hidden="true" />
            {soldOut ? "Sold out" : "Add"}
          </Button>
        </div>
      </div>
    </article>
  );
}
// "use client";

// import Image, { StaticImageData } from "next/image";
// import Link from "next/link";
// import { Plus } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// export type ShopProduct = {
//   id: string;
//   slug: string;
//   name: string;
//   description: string;
//   imageUrl: string | StaticImageData;
//   /** Price in naira (major units), e.g. 1500 */
//   price: number;
//   category: string;
//   stock: number;
// };

// type ProductCardProps = {
//   product: ShopProduct;
//   /** Called when the Add button is pressed. Wire this to your cart + toast. */
//   onAdd?: (product: ShopProduct) => void;
//   className?: string;
// };

// const formatNaira = (amount: number) =>
//   new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     maximumFractionDigits: 0,
//   }).format(amount);

// export function ProductCard({ product, onAdd, className }: ProductCardProps) {
//   const soldOut = product.stock <= 0;
//   const href = `/products/${product.slug}`;

//   return (
//     <article
//       className={cn(
//         "group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-md",
//         className,
//       )}
//     >
//       {/* Image */}
//       <Link
//         href={href}
//         aria-label={product.name}
//         className="relative block aspect-[4/3.6] overflow-hidden bg-orange-100 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
//       >
//         {product.imageUrl ? (
//           <Image
//             src={product.imageUrl}
//             alt={product.name}
//             fill
//             sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
//             className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
//           />
//         ) : (
//           <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
//             No image
//           </div>
//         )}

//         <Badge
//           variant="secondary"
//           className="absolute left-4 top-4 rounded-full bg-background/90 px-4 py-1.5 text-sm font-semibold capitalize text-foreground hover:bg-background/90"
//         >
//           {product.category}
//         </Badge>
//       </Link>

//       {/* Details */}
//       <div className="flex flex-1 flex-col px-7 pb-6 pt-6">
//         <h3 className="text-xl font-extrabold tracking-tight text-foreground">
//           <Link href={href} className="hover:underline">
//             {product.name}
//           </Link>
//         </h3>

//         <p className="mt-2 line-clamp-2 text-base leading-relaxed text-muted-foreground">
//           {product.description}
//         </p>

//         <div className="mt-auto flex items-center justify-between gap-4 pt-6">
//           <span className="text-2xl font-extrabold tracking-tight text-foreground">
//             {formatNaira(product.price)}
//           </span>

//           <Button
//             type="button"
//             size="lg"
//             disabled={soldOut}
//             onClick={() => onAdd?.(product)}
//             className="h-12 rounded-full px-6 text-base font-semibold shadow-md"
//           >
//             <Plus className="size-5" aria-hidden />
//             {soldOut ? "Sold out" : "Add"}
//           </Button>
//         </div>
//       </div>
//     </article>
//   );
// }