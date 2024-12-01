import { CartItem } from "@/types/cart";
import formatPrice from "@/utils/priceFormatter";
import Image from "next/image";

const CheckoutItem = ({ item }: { item: CartItem }) => {
  return (
    <li className="mt-4 bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-between w-[29.03811%]">
          <Image
            className="w-24 h-24"
            width={20}
            height={20}
            src={item.productItem.imageUrl}
            alt={item.productItem.name}
            quality={100}
            unoptimized={true}
            priority
          />
          <h2 className="pl-3">{item.productItem.name}</h2>
        </div>
        <div>
          <span>{formatPrice(item.productItem.price)}đ</span>
        </div>
        <div>
          <span>{item.quantity}</span>
        </div>
        <div>
          <span>{formatPrice(item.productItem.price * item.quantity)}đ</span>
        </div>
      </div>
    </li>
  );
};

export default CheckoutItem;
