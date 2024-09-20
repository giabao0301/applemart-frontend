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

  console.log("slug", slug);

  const { data, isPending, isError } = useQuery({
    queryKey: ["product", productSlug],
    queryFn: () => getProductBySlug(productSlug),
    enabled: !!productSlug,
  });

  const product = useMemo(() => data || ({} as Product), [data]);

  const productItemsQuery = useQuery({
    queryKey: ["productItems", product.slug],
    queryFn: () => getProductItemsByProductSlug(product.slug),
    enabled: !!product.slug,
  });

  const productItems = useMemo(
    () => productItemsQuery.data || [],
    [productItemsQuery.data]
  );

  const productItem = useMemo(
    () => productItems.find((item: ProductItem) => item.slug === slug),
    [productItems, slug]
  );

  if (!productItem) return <div>Not found</div>;

  console.log("productItem", productItem);

  if (isPending || productItemsQuery.isPending) return <div>Loading...</div>;

  if (isError || productItemsQuery.isError)
    return <div>Error fetching product</div>;

  return <ProductDetail product={product} productItem={productItem} />;
};

export default Page;
