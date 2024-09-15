"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { getProductItemsByProductName } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import SkeletonCard from "./SkeletonCard";
import formatPrice from "@/utils/priceFormatter";

interface ProductProps {
  product: Product;
}

const ProductItem: React.FC<ProductProps> = ({ product }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["productItems", product.name],
    queryFn: () => getProductItemsByProductName(product.name),
  });

  const productItems = useMemo(() => data || [], [data]);

  const variations = useMemo(
    () =>
      productItems
        .map((item) => item.configurations)
        .flat()
        .map((config) => config.variationOption),
    [productItems]
  );

  const colors = useMemo(
    () =>
      variations
        .filter((variation) => variation.name === "Màu")
        .filter(
          (variation, index, self) =>
            self.findIndex((v) => v.value === variation.value) === index
        ),
    [variations]
  );

  if (isPending) return <SkeletonCard />;

  if (error) {
    console.log("Error fetching product items: ", error);
    return <div>Error fetching product items</div>;
  }

  return (
    <li key={product.id}>
      <Link
        href={`/${product.parentCategory}/${product.category}/${productItems[0]?.slug}`}
      >
        <div className="flex flex-col h-[29.4117647059rem] overflow-hidden p-8 transition-all duration-300 ease-ease cursor-pointer w-72 bg-white rounded-[18px] shadow-product-card mr-5 mb-12 hover:shadow-product-card-hover hover:scale-101">
          <div className="my-0 mx-auto min-h-[13.5294117647rem] pb-0 pt-[2.4rem] w-full">
            <Image
              className="block mx-auto my-0 h-auto w-auto"
              src={product.thumbnailUrl}
              alt={product.name}
              width={216}
              height={216}
              priority
            />
          </div>
          <div className="flex flex-col h-[9.7647058824rem] pt-[1.176rem] relative">
            <div>
              <ul className="flex justify-center gap-2 pt-[19px] pb-[14px]">
                {colors.map((color) => (
                  <li key={color.id}>
                    <Image
                      width={12}
                      height={12}
                      src={color.imageUrl}
                      alt={color.value}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-0 pt-2">
              <span className="text-lg font-semibold text-primary line-clamp-2">
                {product.name}
              </span>
            </div>
            <div className="pt-0 mt-auto ">
              <span className="text-base font-normal leading-5 tracking-wide">
                {formatPrice(product.lowestPrice)}đ
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;
