"use client";
import ProductDetail from "@/components/ProductDetail";
import { getProductBySlug } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

const Page = ({ params }: { params: { product: string } }) => {
  const productSlug = params.product;

  const {
    data: product,
    isPending,
    error,
  } = useQuery({
    queryKey: ["product", productSlug],
    queryFn: () => getProductBySlug(productSlug),
    enabled: !!productSlug,
  });

  if (isPending) return <div>Loading...</div>;

  if (!product) notFound();

  if (error) throw new Error(error.message);

  return <ProductDetail product={product} />;
};

export default Page;
