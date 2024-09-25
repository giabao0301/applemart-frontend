"use client";
import ProductDetail from "@/components/ProductDetail";
import {
  getProductBySlug,
  getProductItemsByProductSlug,
} from "@/services/productService";
import { Product, ProductItem } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const Page = ({ params }: { params: { product: string; slug: string } }) => {
  const productSlug = decodeURIComponent(params.product);
  const slug = decodeURIComponent(`${params.product}-${params.slug}`);

  const { data, isPending, isError } = useQuery({
    queryKey: ["product", productSlug],
    queryFn: () => getProductBySlug(productSlug),
    enabled: !!productSlug,
  });

  const product = useMemo(() => data || ({} as Product), [data]);

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error fetching product</div>;

  return <ProductDetail product={product} slug={slug} />;
};

export default Page;
