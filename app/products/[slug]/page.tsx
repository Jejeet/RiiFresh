import { notFound } from "next/navigation";

import ProductDetails from "../../components/shop/productDetails";
import { getProductBySlug } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({
  params,
}: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}