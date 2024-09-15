"use client";
import ProductDetail from "@/components/ProductDetail";
import { getProductBySlug } from "@/services/productService";
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

type GroupedOptions = {
  [key: string]: Option[];
};

const Page = () => {
  const params = useParams<{ slug: string }>();

  const slug: string = params.slug;

  const { isPending, error, data } = useQuery({
    queryKey: ["products", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });

  // TODO: return skeleton loading for product detail
  if (isPending) return <div>Loading...</div>;

  if (error) {
    console.log("Error fetching product: ", error);
    return <div>Error fetching product</div>;
  }

  const product: Product = data;

  console.log(product);

  return <ProductDetail product={product} />;
};

export default Page;
