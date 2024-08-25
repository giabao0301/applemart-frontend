"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductProps {
  product: Product;
}

const ProductItem: React.FC<ProductProps> = ({ product }) => {
  const colors =
    product.category.variations.find((variation) => variation.name === "color")
      ?.options || [];

  return (
    <li key={product.id}>
      <Link href={"/"}>
        <div className="flex flex-col h-[29.4117647059rem] overflow-hidden p-8 transition-all duration-300 ease-ease cursor-pointer w-72 bg-white rounded-[18px] shadow-product-card mr-5 mb-12 hover:shadow-product-card-hover hover:scale-101">
          <div className="my-0 mx-auto min-h-[13.5294117647rem] pb-0 pt-[2.4rem] w-full">
            <Image
              className="block h-[13.5294117647rem] mx-auto w-auto my-0"
              src={product?.imageUrl}
              alt=""
              width={200}
              height={200}
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
                Chỉ từ {product.lowestPrice}đ
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;
