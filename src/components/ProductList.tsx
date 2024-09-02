"use client";
import React from "react";
import { getProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import ProductItem from "./ProductItem";
import SkeletonCard from "./SkeletonCard";

export default function ProductList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isPending)
    return (
      <ul className="grid grid-cols-2 lg:grid-cols-4 w-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </ul>
    );

  if (error) {
    console.log("Error fetching products: ", error);
  }

  const response = data?.data;

  const products: Array<Product> = response.data.content;

  console.log(products);

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 w-full">
      {products.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}
