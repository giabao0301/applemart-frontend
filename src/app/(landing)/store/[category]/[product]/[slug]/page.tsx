"use client";
import NotFound from "@/app/not-found";
import ProductDetail from "@/components/landing/product/ProductDetail";
import { getProductBySlug } from "@/services/productService";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
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

  if (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      return <NotFound />;
    }

    return <div>Something went wrong...</div>;
  }

  return <ProductDetail product={product} slug={slug} />;
};

export default Page;
