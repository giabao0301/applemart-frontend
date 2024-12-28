"use client";
import React, { useEffect, useState } from "react";
import { getProducts, searchProductItem } from "@/services/productService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Product, ProductItem as productItem } from "@/types/product";
import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "../../ui/custom/custom-skeletons";
import { Pagination } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import slugify from "@/utils/slugConverter";
import ProductItemCard from "./ProductItemCard";

export default function ProductItemList({
  page,
  keyword,
  sort,
  dir,
  minPrice,
  maxPrice,
}: {
  page?: string;
  keyword?: string;
  sort?: string;
  dir?: string;
  minPrice?: string;
  maxPrice?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [params, setParams] = useState({
    page: page ? parseInt(page) - 1 : 0,
    size: 12,
    sort: sort || "id",
    dir: dir || "asc",
    minPrice: minPrice || "",
    maxPrice: maxPrice || "",
  });

  const { data, isPending, error } = useQuery({
    queryKey: [
      "searchProductItem",
      keyword,
      params.page,
      params.size,
      params.sort,
      params.dir,
      params.minPrice,
      params.maxPrice,
    ],
    queryFn: () =>
      searchProductItem(
        keyword as string,
        params.page,
        params.size,
        params.sort,
        params.dir,
        params.minPrice,
        params.maxPrice
      ),
    enabled: !!params.size && !!params.sort && !!params.dir,
  });

  useEffect(() => {
    setParams({
      page: page ? parseInt(page) - 1 : 0,
      size: 12,
      sort: sort || "id",
      dir: dir || "asc",
      minPrice: minPrice || "",
      maxPrice: maxPrice || "",
    });
  }, [page, sort, dir, minPrice, maxPrice]);

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

  const productItems: Array<productItem> = data?.content || [];
  const pages = data?.totalPages || 1;

  const changePageHandler = (page: number) => {
    setParams({ ...params, page: page - 1 });
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", `${page}`);
    router.push(`/search?${newParams.toString()}`);
  };

  if (productItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-2xl">Không tìm thấy sản phẩm</div>
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 lg:grid-cols-4 w-full">
        {productItems.map((productItem: productItem) => (
          <ProductItemCard key={productItem.id} productItem={productItem} />
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
