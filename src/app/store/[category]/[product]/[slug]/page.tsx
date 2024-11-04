"use client";
import ProductDetail from "@/components/ProductDetail";
import { getProductBySlug } from "@/services/productService";
import { Product, ProductItem } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { error } from "console";
import { useMemo } from "react";

const Page = ({ params }: { params: { product: string; slug: string } }) => {
  const productSlug = decodeURIComponent(params.product);
  const slug = decodeURIComponent(`${params.product}-${params.slug}`);

  const { data, isPending, error } = useQuery({
    queryKey: ["product", productSlug],
    queryFn: () => getProductBySlug(productSlug),
    enabled: !!productSlug,
  });

  const product = useMemo(() => data || ({} as Product), [data]);

  if (isPending) return <div>Loading...</div>;

  if (error) throw new Error("Error fetching product: " + error.message);

  return <ProductDetail product={product} slug={slug} />;
};

export default Page;
