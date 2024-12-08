"use client";
import CartItem from "@/components/CartItem";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { CartItem as cartItem } from "@/types/cart";
import { Button, Checkbox, Spinner } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import formatPrice from "@/utils/priceFormatter";
import { Alert } from "@/components/ui/custom/AlertDialog";
import Loading from "../loading";

const Page = () => {
  const router = useRouter();
  const [selectedCartItems, setSelectedCartItems] = useState<cartItem[]>([]);
  const { isAuthenticated, isLoading, user } = useAuth();
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const { cartItems, isLoading: isPending, clearCart } = useCart();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const ids = selectedCartItems.map((item) => item.id);

    const newCartItems =
      cartItems?.filter((item) => ids.includes(item.id)) || [];
    if (JSON.stringify(newCartItems) !== JSON.stringify(selectedCartItems)) {
      setSelectedCartItems(newCartItems);
    }
  }, [cartItems, selectedCartItems, setSelectedCartItems]);

  useEffect(() => {
    if (selectedCartItems) {
      setTotalQuantity(
        selectedCartItems.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0)
      );

      setTotalAmount(
        selectedCartItems.reduce((acc, item) => {
          return acc + item.quantity * item.productItem.price;
        }, 0)
      );
    }
  }, [selectedCartItems]);

  if (isLoading || isPending) {
    return <Loading />;
  }

  const selectItemHandler = (selectedItem: cartItem, selected: boolean) => {
    if (selected) {
      setSelectedCartItems((prev) => [...prev, selectedItem]);
    } else {
      setSelectedCartItems((prev) =>
        prev.filter(
          (item) => item.productItem.id !== selectedItem.productItem.id
        )
      );
    }
  };

  const clearCartHandler = () => {
    if (user) {
      clearCart(user.id);
    }
  };

  const selectAllHandler = (isSelected: boolean) => {
    if (isSelected && cartItems) {
      setSelectedCartItems(cartItems);
    } else {
      setSelectedCartItems([]);
    }
  };

  const state = {
    cartItems: selectedCartItems.map((item) => item.productItem.id),
    userId: user?.id,
  };

  const serializedState = btoa(JSON.stringify(state));

  return (
    <div>
      <h1 className="text-[#0070c9] text-xl">Giỏ hàng</h1>
      {cartItems?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-8 h-screen -mt-20">
          <Image
            className="w-60 h-60"
            width={20}
            height={20}
            src={
              "https://res.cloudinary.com/dipiog2a2/image/upload/v1732177432/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626_cqrsoi.png"
            }
            alt=""
            quality={100}
            unoptimized={true}
            priority
          />
          <h1 className="text-xl">
            Không có sản phẩm nào trong giỏ hàng của bạn
          </h1>
          <Link href={"/"}>
            <Button
              type="button"
              radius="full"
              className="w-full bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white shadow-lg text-lg py-1 px-11 focus:outline-none"
            >
              Tiếp tục mua hàng
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="pl-8 pr-4 mt-4 bg-white rounded-lg">
            <div className="flex justify-between items-center py-2">
              <Checkbox
                color="primary"
                isSelected={selectedCartItems.length === cartItems?.length}
                onValueChange={selectAllHandler}
              />
              <div className=" w-[29.03811%]">
                <span className="text-lg pl-2">Sản phẩm</span>
              </div>
              <div>
                <span>Đơn Giá</span>
              </div>
              <div>
                <span>Số lượng</span>
              </div>
              <div>
                <span>Thành tiền</span>
              </div>
              <div>
                <span>Thao tác</span>
              </div>
            </div>
          </div>
          <ul>
            {cartItems?.map((item) => (
              <CartItem
                selectedItems={selectedCartItems}
                onSelect={selectItemHandler}
                key={item.productItem.id}
                item={item}
              />
            ))}
          </ul>
          <div className="mt-8 h-32 bg-white flex justify-between items-center px-8 sticky bottom-0">
            <div>
              <Checkbox
                color="primary"
                isSelected={selectedCartItems.length === cartItems?.length}
                onValueChange={selectAllHandler}
              >
                <span className="text-lg pl-2">Chọn tất cả</span>
              </Checkbox>
            </div>
            <Alert
              title={"Bạn chắc chắn muốn bỏ tất cả sản phẩm này?"}
              description={
                "Hành động này sẽ xóa tất cả các sản phẩm trong giỏ hàng của bạn."
              }
              action="Có"
              cancel="Không"
              onAction={clearCartHandler}
            >
              <button className="text-lg">
                Xóa tất cả sản phẩm trong giỏ hàng
              </button>
            </Alert>
            <div className="text-lg">
              {`Tổng thanh toán (${totalQuantity} sản phẩm):`}
              <span className="text-primary">
                &nbsp; {`${formatPrice(totalAmount)}đ`}
              </span>
            </div>
            <div className="w-52">
              <Button
                isDisabled={selectedCartItems.length === 0}
                type="button"
                radius="full"
                className="w-full bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white shadow-lg text-lg py-1 px-[15px] focus:outline-none"
                onClick={() =>
                  router.push(`/checkout?state=${serializedState}`)
                }
              >
                Mua hàng
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
