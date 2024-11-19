"use client";
import { getProductBySlug } from "@/services/productService";
import type { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import formatPrice from "@/utils/priceFormatter";
import slugify from "@/utils/slugConverter";
import { useQuery } from "@tanstack/react-query";
import {
  Delete,
  DeleteIcon,
  MinusIcon,
  PlusIcon,
  RemoveFormatting,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  item: CartItem;
}

const CartItem: React.FC<Props> = ({ item }) => {
  const [quantity, setQuantity] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    setQuantity(item.quantity.toString());
  }, [item.quantity]);

  const quantityInStock = item.productItem.quantityInStock;
  const slug = slugify(item.productItem.productName);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 0,
  });

  useEffect(() => {
    if (product === undefined) return;
    setUrl(
      `/store/${
        product?.parentCategory
      }/${slug}/${item.productItem.slug.substring(slug.length + 1)}`
    );

    console.log(url);
  }, [
    item.productItem.productName,
    item.productItem.slug,
    product,
    product?.category,
    slug,
    url,
  ]);

  const quantityChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      return setQuantity("");
    }

    const value = parseInt(e.target.value);

    if (value > quantityInStock) {
      return setQuantity(quantityInStock.toString());
    } else {
      return setQuantity(value.toString());
    }
  };

  const changeQuantityHandler = (action: string) => {
    if (action === "increase") {
      setQuantity((prev) => {
        const value = parseInt(prev) + 1;
        if (value > quantityInStock) return prev;
        return value.toString();
      });
    }

    if (action === "decrease") {
      setQuantity((prev) => {
        const value = parseInt(prev) - 1;
        if (value < 1) return prev;
        return value.toString();
      });
    }
  };

  const deleteCartItemHandler = () => {
    console.log("delete");
  };

  return (
    <li className="px-8 mt-4 bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <Link
          href={url}
          className="flex items-center justify-between w-[29.03811%]"
        >
          <Image
            className="w-32 h-32"
            width={20}
            height={20}
            src={item.productItem.imageUrl}
            alt={item.productItem.name}
            quality={100}
            unoptimized={true}
            priority
          />
          <h2 className="pl-3">{item.productItem.name}</h2>
        </Link>
        <div>
          <span>{formatPrice(item.productItem.price)}đ</span>
        </div>
        <div className="flex gap-8">
          <div className="flex border-2 items-center justify-center space-x-2 rounded-full p-1 w-24 bg-white text-[#222222] shadow-[0_10px_65px_-10px_rgba(0,0,0,0.25)]">
            <button
              className="text-gray-500 font-bold text-md hover:opacity-75"
              onClick={() => changeQuantityHandler("decrease")}
            >
              <MinusIcon color="#000" />
            </button>
            <input
              type="number"
              className="text-center w-6 text-md appearance-none focus:outline-none"
              value={quantity}
              onChange={quantityChangeHandler}
            />
            <button
              className="text-gray-500 font-bold text-md hover:opacity-75"
              onClick={() => changeQuantityHandler("increase")}
            >
              <PlusIcon color="#000" />
            </button>
          </div>
        </div>
        <div>
          <span className="text-[#0070c9]">
            {formatPrice(item.productItem.price * item.quantity)}đ
          </span>
        </div>
        <div>
          <button
            onClick={deleteCartItemHandler}
            className="hover:text-[#0070c9] hover:opacity-75"
          >
            <span>Xóa</span>
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
