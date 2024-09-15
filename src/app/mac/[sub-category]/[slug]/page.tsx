"use client";
import ProductDetail from "@/components/ProductDetail";
import {
  getProductItemBySlug,
  getProductByName,
} from "@/services/productService";
import {
  Configuration,
  Option,
  Product,
  ProductImage,
  ProductItem,
  Variation,
} from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const Page = () => {
  const params = useParams<{ slug: string }>();

  const slug: string = params.slug;

  const { isPending, error, data } = useQuery({
    queryKey: ["productItem", slug],
    queryFn: () => getProductItemBySlug(slug),
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

  return <ProductDetail productItem={productItem} product={product} />;
};

export default Page;
