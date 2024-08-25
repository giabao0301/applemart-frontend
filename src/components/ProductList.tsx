"use client";
import React from "react";
import { getProduct } from "@/api/lib/product";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: getProduct,
  });

  if (isPending) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;

  const response = data.data;

  const products: Array<Product> = response.data.content;

  console.log(products);

  return (
    <div className="">
      <ul className="grid grid-cols-2 lg:grid-cols-4 w-full">
        {products.map((product: Product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
