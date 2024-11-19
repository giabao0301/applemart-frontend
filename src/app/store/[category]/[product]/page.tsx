"use client";
import NotFound from "@/app/not-found";
import ProductDetail from "@/components/product/ProductDetail";
import { getProductBySlug } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

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

  if (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      return <NotFound />;
    }
    return <div>Something went wrong...</div>;
  }

  return <ProductDetail product={product} />;
};

export default Page;
