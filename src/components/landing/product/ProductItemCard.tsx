"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, ProductItem } from "@/types/product";
import { getVariationOptionsByProductId } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import formatPrice from "@/utils/priceFormatter";
import { ProductCardSkeleton } from "../../ui/custom/custom-skeletons";
import slugify from "@/utils/slugConverter";

interface ProductProps {
  productItem: ProductItem;
}

const ProductItemCard: React.FC<ProductProps> = ({ productItem }) => {
  const colorImage = productItem?.configurations.find(
    (config) => config.variationOption.name === "Màu"
  )?.variationOption.imageUrl;

  const url = `/store/${productItem.category}/${slugify(
    productItem.productName
  )}/${productItem.slug.replace(`${slugify(productItem.productName)}-`, "")}`;

  return (
    <li key={productItem.id}>
      <Link href={url}>
        <div className="flex flex-col overflow-hidden p-8 transition-all duration-300 ease-ease cursor-pointer w-72 bg-white rounded-[18px] shadow-product-card mr-5 mb-12 hover:shadow-product-card-hover hover:scale-101">
          <div className="my-0 mx-auto pb-0 pt-[2.4rem] w-full">
            <Image
              className="block mx-auto my-0 h-[216px] w-auto object-cover"
              src={productItem.imageUrl}
              alt={productItem.name}
              width={216}
              height={216}
              quality={100}
              unoptimized={true}
              priority
            />
          </div>
          <div className="flex flex-col h-[9.7647058824rem] pt-[1.176rem] relative">
            <div className="flex justify-center">
              <Image
                width={12}
                height={12}
                src={
                  colorImage ||
                  "https://res.cloudinary.com/dipiog2a2/image/upload/v1733911229/default_vkggcm.jpg"
                }
                alt={""}
                quality={100}
                unoptimized={true}
                priority
              />
            </div>
            <div className="mt-0 pt-2">
              <span className="text-lg font-semibold text-primaryText line-clamp-2">
                {productItem.name}
              </span>
            </div>
            <div className="pt-0 mt-auto ">
              <span className="text-base font-normal leading-5 tracking-wide">
                {formatPrice(productItem.price)}đ
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductItemCard;
