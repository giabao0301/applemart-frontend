"use client";
import ProductDetail from "@/components/ProductDetail";
import { getProductBySlug } from "@/services/productService";
import { Product, ProductItem } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const Page = ({ params }: { params: { product: string } }) => {
  const productSlug = params.product;

  const {
    data: product,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["product", productSlug],
    queryFn: () => getProductBySlug(productSlug),
    enabled: !!productSlug,
  });

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error fetching product</div>;

  return <ProductDetail product={product} />;
};

export default Page;
