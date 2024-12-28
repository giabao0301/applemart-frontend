"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { getVariationOptionsByProductId } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import formatPrice from "@/utils/priceFormatter";
import { ProductCardSkeleton } from "../../ui/custom/custom-skeletons";

interface ProductProps {
  product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["variationOptions", product.id],
    queryFn: () => getVariationOptionsByProductId(product.id),
    staleTime: 1000 * 60 * 5,
  });

  const variations = useMemo(() => data || [], [data]);

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

  if (isPending) return <ProductCardSkeleton />;

  if (error) {
    console.log("Error fetching product items: ", error);
    return <div>Error fetching product items</div>;
  }

  return (
    <li key={product.id}>
      <Link
        href={`/store/${product.category || product.parentCategory}/${
          product.slug
        }`}
      >
        <div className="flex flex-col overflow-hidden p-8 transition-all duration-300 ease-ease cursor-pointer w-72 bg-white rounded-[18px] shadow-product-card mr-5 mb-12 hover:shadow-product-card-hover hover:scale-101">
          <div className="my-0 mx-auto pb-0 pt-[2.4rem] w-full">
            <Image
              className="block mx-auto my-0 h-[216px] w-auto object-cover"
              src={product.thumbnailUrl}
              alt={product.name}
              width={216}
              height={216}
              quality={100}
              unoptimized={true}
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
                      quality={100}
                      unoptimized={true}
                      priority
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-0 pt-2">
              <span className="text-lg font-semibold text-primaryText line-clamp-2">
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

export default ProductCard;
