"use client";
import AddressSelector from "@/components/landing/address/AddressSelector"; // Ensure this path is correct or update it to the correct path
import CheckoutItem from "@/components/landing/order/CheckoutItem";
import { useCart } from "@/context/CartContext";
import { getAddresses } from "@/services/addressService";
import { CartItem } from "@/types/cart";
import { Address } from "@/types/user";
import formatPhoneNumber from "@/utils/phoneNumberFormatter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CheckIcon, MapPin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Loading from "../../loading";
import {
  createOrder,
  getPaymentMethods,
  getShippingMethods,
} from "@/services/orderService";
import formatPrice from "@/utils/priceFormatter";
import ShippingMethodSelector from "@/components/landing/order/ShippingMethodSelector";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { NewOrderRequest, PaymentMethod, ShippingMethod } from "@/types/order";
import AddressFormModal from "@/components/landing/address/AddressFormModal";

type CheckoutState = {
  cartItems: number[];
  userId: number;
};

const Checkout = () => {
  const router = useRouter();
  const { cartItems, getCartItems } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<ShippingMethod | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [order, setOrder] = useState<NewOrderRequest | null>(null);

  const searchParams = useSearchParams();

  const state = searchParams.get("state");

  useEffect(() => {
    if (state) {
      try {
        const decodedState: CheckoutState = JSON.parse(
          atob(decodeURIComponent(state))
        );

        if (decodedState.cartItems && cartItems) {
          const items = cartItems.filter((item) =>
            decodedState.cartItems.includes(item.productItem.id)
          );

          setSelectedCartItems(items);
        }
      } catch (err) {
        router.replace("/cart");
      }
    }
  }, [cartItems, router, state]);

  const {
    data: addresses,
    isLoading,
    isFetching,
    error,
  } = useQuery<Address[] | null>({
    queryKey: ["addresses"],
    queryFn: async () => {
      return isAuthenticated ? getAddresses() : null;
    },
  });

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess(data) {
      console.log(data);
      if (data.vnpayLink) {
        router.push(data.vnpayLink);
      } else {
        router.replace(`/user/purchase/order/${data.order.id}`);
        getCartItems(user?.id as number);
      }
    },
    onError(error) {
      toast({
        description: "Không thể đặt hàng vui lòng thử lại sau ❌",
      });
      router.push("/cart");
      console.log(error);
    },
  });

  const { data: shippingMethods } = useQuery<ShippingMethod[] | null>({
    queryKey: ["shippingMethods"],
    queryFn: getShippingMethods,
  });

  const { data: paymentMethods } = useQuery<PaymentMethod[] | null>({
    queryKey: ["paymentMethods"],
    queryFn: getPaymentMethods,
  });

  useEffect(() => {
    if (addresses && addresses.length) {
      setSelectedAddress(
        addresses.find((address) => address.isDeliveryAddress) as Address
      );
    }
  }, [addresses]);

  useEffect(() => {
    if (shippingMethods && shippingMethods.length) {
      setSelectedShippingMethod(shippingMethods[0]);
    }
  }, [shippingMethods]);

  useEffect(() => {
    if (paymentMethods && paymentMethods.length) {
      setSelectedPaymentMethod(
        paymentMethods.find((method) => method.isDefault) || paymentMethods[0]
      );
    }
  }, [paymentMethods]);

  useEffect(() => {
    if (selectedCartItems.length && selectedAddress && selectedShippingMethod) {
      setOrder({
        userId: user?.id as number,
        addressId: selectedAddress.id,
        paymentMethod: selectedPaymentMethod?.name ?? "cod",
        shippingMethod: selectedShippingMethod.name,
        orderLines: selectedCartItems.map((item) => ({
          productItemId: item.productItem.id,
          quantity: item.quantity,
        })),
      });
    }
  }, [
    selectedAddress,
    selectedCartItems,
    selectedPaymentMethod?.name,
    selectedShippingMethod,
    user?.id,
  ]);

  const selectAddressHandler = (address: Address) => {
    setSelectedAddress(address);
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return <div>Đã có lỗi xảy ra</div>;
  }

  const selectShippingMethodHandler = (shippingMethod: ShippingMethod) => {
    setSelectedShippingMethod(shippingMethod);
  };

  const totalQuantity = selectedCartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const totalAmount = selectedCartItems.reduce((acc, item) => {
    return acc + item.quantity * item.productItem.price;
  }, 0);

  const placeOrderHandler = () => {
    if (order) {
      mutation.mutate(order);
    }
  };

  return (
    <>
      <div className="mb-3 h-16 border-b-2">
        <h2 className="text-xl text-primary">Thanh toán</h2>
      </div>
      <div className="pt-7 px-8 pb-6 border-b-2">
        <div className="flex gap-2 text-primary">
          <MapPin size={24} />
          <h2 className="text-lg">Địa chỉ nhận hàng</h2>
        </div>
        <div className="flex justify-between items-center mt-5">
          <div>
            <h2 className="font-bold">{selectedAddress?.recipient}</h2>
            <span className="font-bold">
              {selectedAddress?.phone &&
                formatPhoneNumber(selectedAddress.phone)}
            </span>
          </div>
          <div>
            {selectedAddress &&
              `${selectedAddress.address}, ${selectedAddress.ward},
            ${selectedAddress.district}, ${selectedAddress.city}`}
          </div>
          {selectedAddress?.isDeliveryAddress && (
            <div className="text-primary p-1 text-sm border border-primary">
              Mặc định
            </div>
          )}

          {addresses && addresses.length ? (
            <AddressSelector
              addresses={addresses || []}
              onSelect={selectAddressHandler}
            />
          ) : (
            <AddressFormModal header="Thêm địa chỉ mới" />
          )}
        </div>
      </div>
      <div className="px-8 mt-4 bg-white rounded-lg">
        <div className="border-b-2 py-4">
          <div className="flex justify-between items-center py-2">
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
          </div>
          <ul>
            {selectedCartItems?.map((item) => (
              <CheckoutItem key={item.productItem.id} item={item} />
            ))}
          </ul>
        </div>

        <div className="border-b-2 py-8 px-0.5">
          <div className="flex justify-between items-center my-8">
            <div className=" w-[29.03811%]">
              <span className="text-lg pl-2">Phương thức vận chuyển</span>
            </div>
            <div>
              <span>{selectedShippingMethod?.name}</span>
            </div>
            <ShippingMethodSelector
              selectedItem={selectedShippingMethod}
              shippingMethods={shippingMethods || []}
              onSelect={selectShippingMethodHandler}
            />
            <div>
              <span>{formatPrice(selectedShippingMethod?.price ?? 0)}đ</span>
            </div>
          </div>
          <div className="flex justify-end gap-10">
            <div>{`Tổng số tiền (${totalQuantity} sản phẩm)`}:</div>
            <div className="text-primary text-xl">
              {formatPrice(totalAmount)}đ
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center py-8 border-b-2">
          <div className=" w-[29.03811%]">
            <span className="text-lg pl-2">Phương thức thanh toán</span>
          </div>
          {paymentMethods?.map((paymentMethod) => (
            <div
              className={`flex gap-2 items-center py-2 px-3 cursor-pointer border-primary ${
                paymentMethod.id === selectedPaymentMethod?.id ? "border" : ""
              }`}
              key={paymentMethod.id}
            >
              <div onClick={() => setSelectedPaymentMethod(paymentMethod)}>
                {paymentMethod.name === "cod" && "Thanh toán khi nhận hàng"}
                {paymentMethod.name === "vnpay" && (
                  <div className="flex items-center gap-2">
                    <Image
                      className="w-8 h-8"
                      width={20}
                      height={20}
                      src="https://res.cloudinary.com/dipiog2a2/image/upload/v1732691062/sqeue1pi7hhusw1urb1z.png"
                      alt="vnpay"
                      quality={100}
                      unoptimized={true}
                      priority={true}
                    />
                    <div className="text-sm">
                      {paymentMethod.name.toUpperCase()}
                    </div>
                    {/* <div className="flex flex-col justify-around">
                      <div className="text-sm">{paymentMethod.provider}</div>
                      <div className="text-sm text-secondaryText">
                        {paymentMethod.accountNumber}
                      </div>
                    </div> */}
                  </div>
                )}
              </div>
              {paymentMethod.id === selectedPaymentMethod?.id && (
                <CheckIcon size={20} color="#0070c9" />
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-8 items-end border-b-2">
          <div className="flex justify-between w-1/3">
            <div className="text-secondaryText text-right">Tổng tiền hàng</div>
            <span>{formatPrice(totalAmount)}đ</span>
          </div>
          <div className="flex justify-between  w-1/3">
            <div className="text-secondaryText">Tổng tiền phí vận chuyển</div>
            <span>{formatPrice(selectedShippingMethod?.price ?? 0)}đ</span>
          </div>
          <div className="flex justify-between  w-1/3">
            <div className="text-secondaryText">Tổng thanh toán</div>
            <span className="text-primary text-3xl">
              {formatPrice(totalAmount + (selectedShippingMethod?.price ?? 0))}đ
            </span>
          </div>
        </div>
        <div className="flex justify-between py-8">
          <div className="text-sm text-secondaryText">
            Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo
            Điều khoản Applemart
          </div>
          <div className="w-52">
            <Button
              onClick={placeOrderHandler}
              isDisabled={
                selectedCartItems.length === 0 ||
                !selectedAddress ||
                !selectedShippingMethod ||
                !selectedPaymentMethod
              }
              type="button"
              radius="full"
              className="w-full bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white shadow-lg text-lg py-1 px-[15px] focus:outline-none"
            >
              Đặt hàng
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default function CheckoutPage() {
  return (
    <Suspense>
      <Checkout />
    </Suspense>
  );
}
