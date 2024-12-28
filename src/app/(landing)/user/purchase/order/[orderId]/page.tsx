"use client";
import OrderDetail from "@/components/landing/order/OrderDetail";
import { useAuth } from "@/context/AuthContext";
import { getAddressById } from "@/services/addressService";
import { getOrdersByUserId } from "@/services/orderService";
import { formatDate } from "@/utils/dateFormatter";
import formatPhoneNumber from "@/utils/phoneNumberFormatter";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = ({ params }: { params: { orderId: string } }) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  const { data: orders } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => (user ? getOrdersByUserId(user.id) : Promise.resolve([])),
    enabled: !!user?.id,
  });

  const order = orders?.find((order) => order.id === Number(params.orderId));

  const { data: address } = useQuery({
    queryKey: ["address", order?.addressId],
    queryFn: () =>
      order?.addressId
        ? getAddressById(order.addressId)
        : Promise.resolve(null),
    enabled: !!order?.addressId,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  console.log(order);

  return (
    <div className="p-4 bg-white">
      <div className="flex items-center justify-between">
        <div className="text-sm">
          Đơn hàng đã đặt vào lúc {formatDate(order?.orderDate || "")}
        </div>
        <div className="flex justify-end gap-8 items-center py-2 border-b-2">
          <div className="flex gap-2 items-center">
            MÃ ĐƠN HÀNG: {order?.id}
          </div>
          <div className="text-primary border-l-2 py-1 px-4">
            {order?.orderStatus.toUpperCase()}
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="text-xl mb-4">Địa chỉ nhận hàng</div>
        <div className="text-sm">{address?.recipient}</div>
        <div className="text-sm text-secondaryText">
          {address?.phone && formatPhoneNumber(address.phone)}
        </div>
        <div className="text-sm text-secondaryText">
          {address &&
            `${address.address}, ${address.ward},
            ${address.district}, ${address.city}`}
        </div>
      </div>
      <div>{order && <OrderDetail key={order.id} order={order} />}</div>
    </div>
  );
};

export default Page;
