"use client";
import NotFound from "@/app/not-found";
import ProductDetail from "@/components/landing/product/ProductDetail";
import {
  getProductBySlug,
  getProductItemsByProductId,
} from "@/services/productService";
import { Avatar, Chip, Link } from "@nextui-org/react";
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

  const productItemsQuery = useQuery({
    queryKey: ["productItems", product?.id],
    queryFn: () => getProductItemsByProductId(product?.id as number),
    enabled: !!product?.id,
    staleTime: 0,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      return <NotFound />;
    }
    return <div>Something went wrong...</div>;
  }

  if (
    productItemsQuery.data?.length === 1 &&
    productItemsQuery.data[0].slug === productSlug
  ) {
    return (
      <ProductDetail
        product={product}
        productItem={productItemsQuery.data[0]}
      />
    );
  }

  return <ProductDetail product={product} />;
};

export default Page;
