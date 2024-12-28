"use client";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import useDebounce from "@/hooks/useDebounce";
import { CartItem } from "@/types/cart";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert } from "../../ui/custom/AlertDialog";

type Props = {
  item: CartItem;
};

const QuantityInput: React.FC<Props> = ({ item }) => {
  const [quantity, setQuantity] = useState<string>(item.quantity.toString());
  const debouncedQuantity = useDebounce<string>(quantity, 300);

  const { user } = useAuth();
  const { updateCartItemLocally, syncCartItemWithBackend, removeCartItem } =
    useCart();

  const quantityInStock = item.productItem.quantityInStock;

  useEffect(() => {
    if (parseInt(debouncedQuantity) !== item.quantity && user) {
      if (parseInt(debouncedQuantity) !== item.quantity && user) {
        updateCartItemLocally(item.productItem.id, parseInt(debouncedQuantity));

        syncCartItemWithBackend(
          user.id,
          item.productItem.id,
          parseInt(debouncedQuantity)
        );
      }
    }
  }, [
    debouncedQuantity,
    item.productItem.id,
    item.quantity,
    syncCartItemWithBackend,
    updateCartItemLocally,
    user,
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

  const removeCartItemHandler = () => {
    const productItemId = item.productItem.id;
    if (!user) return;
    removeCartItem(user?.id, { productItemIds: [productItemId] });
  };

  return (
    <div className="flex gap-8">
      <div className="flex border-2 items-center justify-center space-x-2 rounded-full p-1 w-24 bg-white text-[#222222] shadow-[0_10px_65px_-10px_rgba(0,0,0,0.25)]">
        {parseInt(quantity) === 1 ? (
          <Alert
            title={"Bạn chắc chắn muốn bỏ sản phẩm này?"}
            description={`${item.productItem.name}`}
            action="Có"
            cancel="Không"
            onAction={removeCartItemHandler}
          >
            <button
              className="text-gray-500 font-bold text-md hover:opacity-75"
              onClick={() => changeQuantityHandler("decrease")}
            >
              <MinusIcon color="#000" />
            </button>
          </Alert>
        ) : (
          <button
            className="text-gray-500 font-bold text-md hover:opacity-75"
            onClick={() => changeQuantityHandler("decrease")}
          >
            <MinusIcon color="#000" />
          </button>
        )}

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
  );
};

export default QuantityInput;
