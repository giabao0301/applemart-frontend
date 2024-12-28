"use client";
import Loading from "@/app/loading";
import { getShippingMethods } from "@/services/orderService";
import { getProductItemById } from "@/services/productService";
import { ProductItem } from "@/types/product";
import formatPrice from "@/utils/priceFormatter";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const OrderItem = ({ order }: { order: Order }) => {
  const orderLines: OrderLine[] = order.orderLines;

  const productItemIds = orderLines.map((orderLine) => orderLine.productItemId);

  console.log(productItemIds);

  const productItemQueries = useQueries({
    queries: productItemIds.map((productItemId) => {
      return {
        queryKey: ["productItem", productItemId],
        queryFn: () => getProductItemById(productItemId),
      };
    }),
  });

  if (productItemQueries.some((query) => query.isLoading)) {
    return <Loading />;
  }

  const productItems = productItemQueries.map(
    (query) => query.data
  ) as ProductItem[];

  const calculateTotalAmount = () => {
    return orderLines.reduce((total, orderLine) => {
      const productItem = productItems.find(
        (productItem) => productItem.id === orderLine.productItemId
      );
      return productItem
        ? total + productItem.price * orderLine.quantity
        : total;
    }, 0);
  };

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-end gap-8 items-center py-2 border-b-2">
        {order.orderStatus === "Hoàn thành" &&
          order.paymentStatus === "Hoàn thành" && (
            <div className="text-[#26aa99] flex gap-2 items-center">
              <Truck size={20} />
              Giao hàng thành công
            </div>
          )}
        <div className="border-l-2 py-1 px-4">
          {order.orderStatus.toUpperCase()}
        </div>
      </div>
      <Link href={`/user/purchase/order/${order.id}`}>
        {productItems &&
          productItems.map((productItem) => (
            <div
              key={productItem.id}
              className="flex justify-between py-2 border-b-2"
            >
              <div className="flex items-center gap-4">
                <Image
                  className="w-24 h-24"
                  width={20}
                  height={20}
                  src={productItem?.imageUrl}
                  alt={productItem.name}
                  quality={100}
                  unoptimized={true}
                  priority
                />
                <div>
                  <div>{productItem.name}</div>
                  <div>
                    x
                    {
                      orderLines.find(
                        (orderLine) =>
                          orderLine.productItemId === productItem.id
                      )?.quantity
                    }
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end text-sm">
                {formatPrice(calculateTotalAmount())}đ
              </div>
            </div>
          ))}
      </Link>

      <div className="flex justify-end items-center gap-4 py-4">
        <div>Thành tiền:</div>
        <div className="text-primary text-xl">
          {formatPrice(order.totalAmount)}đ
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
