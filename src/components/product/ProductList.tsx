"use client";
import React from "react";
import { getProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import ProductItem from "./ProductItem";
import { ProductCardSkeleton } from "../ui/custom-skeletons";

export default function ProductList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
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
  const pages = data?.totalElements || "";

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 w-full">
      {products.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}
