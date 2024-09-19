import ProductDetail from "@/components/ProductDetail";
import {
  getProductBySlug,
  getProductItemBySlug,
  getProductItemsByProductSlug,
} from "@/services/productService";
import { Product, ProductItem } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export async function generateStaticParams({
  params,
}: {
  params: { product: string; slug: string };
}) {
  const productSlug = decodeURIComponent(params.product);

  const productItems: ProductItem[] = await getProductItemsByProductSlug(
    productSlug
  );

  return productItems.map((productItem) => ({
    params: {
      slug: productItem.slug.replace(`${productSlug}-`, ""),
    },
  }));
}

const Page = async ({
  params,
}: {
  params: { product: string; slug: string };
}) => {
  const productSlug = decodeURIComponent(params.product);
  const slug = decodeURIComponent(`${params.product}-${params.slug}`);

  console.log("slug", slug);

  const fetchProduct = async () => {
    const product = await getProductBySlug(productSlug);
    return product;
  };

  const product: Product = await fetchProduct();

  // const {
  //   data: product,
  //   isPending,
  //   isError,
  // } = useQuery({
  //   queryKey: ["product", productSlug],
  //   queryFn: () => getProductBySlug(productSlug),
  //   enabled: !!productSlug,
  // });

  // const productItemQuery = useQuery({
  //   queryKey: ["productItem", slug],
  //   queryFn: () => getProductItemBySlug(slug),
  //   enabled: !!slug,
  // });

  // const productItem = useMemo(
  //   () => productItemQuery.data,
  //   [productItemQuery.data]
  // );

  // if (isPending) return <div>Loading...</div>;

  // if (isError) return <div>Error fetching product</div>;

  // if (productItemQuery.isPending) return <div>Loading product item...</div>;

  // if (productItemQuery.isError) return <div>Error fetching product item</div>;

  return <ProductDetail product={product} slug={slug} />;
};

export default Page;
