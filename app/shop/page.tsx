"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { toast } from "sonner";

import { ProductCard } from "../components/shop/productCard/page";
import { getProducts, type ShopProduct } from "@/lib/products";

type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "name";

type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export default function ShopPage() {
  const products = getProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("featured");
  const [sortOpen, setSortOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );

    return ["All", ...uniqueCategories];
  }, [products]);

  const addToCart = (product: ShopProduct) => {
    // setCart((current) => {
    //   const existing = current.find(
    //     (item) => item.productId === product.id
    //   );

    //   if (existing) {
    //     return current.map((item) =>
    //       item.productId === product.id
    //         ? {
    //             ...item,
    //             quantity: item.quantity + 1,
    //           }
    //         : item
    //     );
//     //   }

//       return [
//         ...current,
//         {
//           productId: product.id,
//           slug: product.slug,
//           name: product.name,
//           price: product.price,
//           imageUrl: product.imageUrl,
//           quantity: 1,
//         },
//       ];
//     });

//     toast.success(`${product.name} added to cart`);
 };

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesCategory =
        category === "All" ||
        product.category.toLowerCase() === category.toLowerCase();

      const matchesSearch =
        !query ||
        [
          product.name,
          product.description,
          product.category,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });

    return [...result].sort((a, b) => {
      switch (sort) {
        case "price-low":
          return a.price - b.price;

        case "price-high":
          return b.price - a.price;

        case "name":
          return a.name.localeCompare(b.name);

        case "featured":
        default:
          return 0;
      }
    });
  }, [products, search, category, sort]);

  const sortLabel = {
    featured: "Featured first",
    "price-low": "Price: low to high",
    "price-high": "Price: high to low",
    name: "Name A-Z",
  }[sort];

  return (
    <main className="min-h-screen bg-[#faf8ef] px-7 py-6 sm:px-12">
      <div className="max-w-275">
        {/* =========================
            HEADER
        ========================= */}
        <header>
          <h1 className="text-[32px] font-black leading-none tracking-[-0.04em] text-[#062b25] sm:text-[36px]">
            The fridge
          </h1>

          <p className="mt-2 text-[12px] text-[#596b66]">
            2 drinks pressed this week. Free chilled delivery over ₦25,000.
          </p>
        </header>

        {/* =========================
            SEARCH + SORT
        ========================= */}
        <div className="relative mt-7 w-full rounded-[28px] border border-[#ddd9ce] bg-white/60 p-2">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#65736f]"
                strokeWidth={1.8}
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search drinks, tags or ingredients"
                className="h-7 w-full rounded-full border border-[#ddd9ce]  bg-white px-9 text-[11px] text-[#263a36] outline-none   focus:ring-2 focus:ring-[#076806]/10"
              />
            </div>

            {/* Sort */}
            <div className="relative w-37 shrink-0">
              <button
                type="button"
                onClick={() => setSortOpen((open) => !open)}
                className="flex h-7 w-full items-center justify-between rounded-full border border-[#ddd9ce] bg-white px-3 text-[11px] text-[#344541]"
              >
                <span>{sortLabel}</span>

                <ChevronDown
                  className={`size-3 transition-transform ${
                    sortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {sortOpen && (
                <div className="absolute right-0 top-9 z-50 w-37 overflow-hidden rounded-xl border border-[#ddd9ce] bg-[#fffefa] p-1 shadow-[0_4px_10px_rgba(0,0,0,0.14)]">
                  <SortItem
                    label="Featured first"
                    active={sort === "featured"}
                    onClick={() => {
                      setSort("featured");
                      setSortOpen(false);
                    }}
                  />

                  <SortItem
                    label="Price: low to high"
                    active={sort === "price-low"}
                    onClick={() => {
                      setSort("price-low");
                      setSortOpen(false);
                    }}
                  />

                  <SortItem
                    label="Price: high to low"
                    active={sort === "price-high"}
                    onClick={() => {
                      setSort("price-high");
                      setSortOpen(false);
                    }}
                  />

                  <SortItem
                    label="Name A-Z"
                    active={sort === "name"}
                    onClick={() => {
                      setSort("name");
                      setSortOpen(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =========================
            CATEGORIES
        ========================= */}
        <div className="mt-5 flex items-center gap-2">
          {categories.map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={[
                  "rounded-full border px-3 py-1 text-[10px] font-medium transition",
                  active
                    ? "border-[#df171c] bg-[#df171c] text-white"
                    : "border-[#d8d5ca] bg-transparent text-[#344541] hover:bg-white",
                ].join(" ")}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* =========================
            PRODUCTS
        ========================= */}
        <section className="mt-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                  className="
                   
                  "
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-sm font-semibold text-[#18322d]">
                No drinks found
              </p>

              <p className="mt-1 text-xs text-[#71807c]">
                Try another search or category.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

type SortItemProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function SortItem({
  label,
  active,
  onClick,
}: SortItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-[11px] text-[#344541] hover:bg-[#f3f1e8]"
    >
      <span>{label}</span>

      {active && (
        <Check
          className="size-3"
          strokeWidth={2}
        />
      )}
    </button>
  );
}
// export default function shop(){
//     return(
//         <div>
//             shop
//         </div>
//     )
// }