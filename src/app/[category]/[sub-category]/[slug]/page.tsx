"use client";
import ProductDetail from "@/components/ProductDetail";
import {
  getProductItemBySlug,
  getProductByName,
} from "@/services/productService";
import { Product, ProductItem } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const Page = () => {
  const params = useParams<{ slug: string }>();

  const slug: string = params.slug;

  const { isPending, error, data } = useQuery({
    queryKey: ["productItem", slug],
    queryFn: () => getProductItemBySlug(slug),
    enabled: !!slug,
  });

  const productItem = useMemo(() => data as ProductItem, [data]);

  const productQuery = useQuery({
    queryKey: ["product", productItem?.productName],
    queryFn: () => getProductByName(productItem?.productName),
    enabled: !!productItem,
  });

  const product = useMemo(
    () => productQuery.data as Product,
    [productQuery.data]
  );

  if (isPending) return <div>Loading...</div>;

  if (error) {
    console.log("Error fetching product items: ", error);
    return <div>Error fetching product items</div>;
  }

  if (productQuery.isPending) return <div>Loading...</div>;

  if (productQuery.error) {
    console.log("Error fetching product: ", productQuery.error);
    return <div>Error fetching product</div>;
  }

  const decodedSlug = decodeURIComponent(slug);

  return <ProductDetail decodedSlug={decodedSlug} product={product} />;
};

export default Page;
