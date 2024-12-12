"use client";
import ProductCard from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/custom/custom-skeletons";
import { getCategories, getProductByCategory } from "@/services/productService";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

const Page = ({ params }: { params: { category: string } }) => {
  const category = params.category;

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const {
    data: products,
    isPending,
    error,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getProductByCategory(category),
    enabled: !!category,
  });

  if (isPending)
    return (
      <ul className="grid grid-cols-2 lg:grid-cols-4 w-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </ul>
    );

  if (error) {
    console.log("Error fetching products: ", error);
  }

  return (
    <>
      <div className="lg:max-w-[780px] max-w-md pt-20 pb-16 px-0 min-h-60">
        <h1 className="block lg:inline text-2xl lg:text-5xl font-semibold lg:leading-tight lg:tracking-tight mr-2">
          {categories?.find((c) => c.urlKey === category)?.name}
        </h1>
      </div>
      <ul className="grid grid-cols-2 lg:grid-cols-4 w-full">
        {products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
};

export default Page;
