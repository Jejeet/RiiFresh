import type { StaticImageData } from "next/image";
import heroImg from "../assets/hero zobo.jpeg";

export interface ShopProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string | StaticImageData;
  price: number;
  category: string;
  stock: number;
  tags?: string[];
  calories?: number;
  ingredients?: string[];
}

export const products: ShopProduct[] = [
  {
    id: "1",
    slug: "riifresh-zobo-50cl",
    name: "RiiFresh Zobo 50cl",
    description:
      "The big-bottle RiiFresh: deep-red hibiscus squash infused with ginger, pineapple and dates.",
    imageUrl: heroImg,
    price: 1500,
    category: "Zobo",
    stock: 24,
    tags: ["Hibiscus", "Ginger", "No added sugar"],
    calories: 45,
    ingredients: ["Hibiscus", "Ginger", "Pineapple", "Dates"],
  },
  {
    id: "2",
    slug: "riifresh-ginger-50cl",
    name: "RiiFresh Spicy Ginger 50cl",
    description:
      "A fiery twist on our classic brew, packed with extra hand-crushed organic ginger.",
    imageUrl: heroImg,
    price: 1600,
    category: "Ginger",
    stock: 15,
    tags: ["Ginger", "Bold flavour"],
    ingredients: ["Ginger", "Hibiscus"],
  },
  {
    id: "3",
    slug: "riifresh-pineapple-mini",
    name: "RiiFresh Pineapple 35cl",
    description:
      "Sweet, refreshing mini-bottle infused heavily with tropical pineapple chunks.",
    imageUrl: heroImg,
    price: 1200,
    category: "Pineapple",
    stock: 40,
    tags: ["Pineapple", "Refreshing"],
    ingredients: ["Pineapple", "Hibiscus"],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
export function getProducts() {
  return products;
}