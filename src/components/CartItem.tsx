"use client";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import useDebounce from "@/hooks/use-debounce";
import { getProductBySlug } from "@/services/productService";
import type { CartItem } from "@/types/cart";
import formatPrice from "@/utils/priceFormatter";
import slugify from "@/utils/slugConverter";
import { Checkbox } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import QuantityInput from "./QuantityInput";

interface Props {
  selectedItems: CartItem[];
  item: CartItem;
  onSelect: (selectedItem: CartItem, selected: boolean) => void;
}

const CartItem: React.FC<Props> = ({ item, onSelect, selectedItems }) => {
  const [url, setUrl] = useState<string>("");

  const { user } = useAuth();
  const { removeCartItem } = useCart();

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
  }, [
    item.productItem.productName,
    item.productItem.slug,
    product,
    product?.category,
    slug,
    url,
  ]);

  const selectCartItemHandler = (isSelected: boolean) => {
    onSelect(item, isSelected);
  };

  const removerCartItemHandler = () => {
    const productItemId = item.productItem.id;
    if (!user) return;
    removeCartItem(user?.id, { productItemIds: [productItemId] });
  };

  const isSelected = selectedItems.some(
    (selectedItem) => selectedItem.id === item.id
  );

  return (
    <li className="px-8 mt-4 bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <Checkbox
          color="primary"
          isSelected={isSelected}
          onValueChange={selectCartItemHandler}
        />
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
        <QuantityInput item={item} />
        <div>
          <span className="text-[#0070c9]">
            {formatPrice(item.productItem.price * item.quantity)}đ
          </span>
        </div>
        <div>
          <button
            onClick={removerCartItemHandler}
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
