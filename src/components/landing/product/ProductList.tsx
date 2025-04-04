"use client";
import React, { useState } from "react";
import { getProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "../../ui/custom/custom-skeletons";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ProductList({ page }: { page?: string }) {
  const router = useRouter();
  const [params, setParams] = useState({
    page: page ? parseInt(page) - 1 : 0,
    size: 12,
    sort: "id",
    dir: "asc",
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    enabled: !!params.size && !!params.sort && !!params.dir,
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

  const products: Array<Product> = data?.content || [];
  const pages = data?.totalPages || 1;

  const changePageHandler = (page: number) => {
    setParams({ ...params, page: page - 1 });
    router.push(`/store?page=${page}`);
  };

  return (
    <>
      <ul className="grid grid-cols-2 lg:grid-cols-4 w-full">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
      <div className="flex justify-center mt-8">
        <Pagination
          showControls
          total={pages}
          initialPage={1}
          page={params.page + 1}
          size="lg"
          onChange={changePageHandler}
        />
      </div>
    </>
  );
}
