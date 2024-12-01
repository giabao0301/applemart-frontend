"use client";
import Loading from "@/app/loading";
import { getShippingMethods } from "@/services/orderService";
import { getProductItemById } from "@/services/productService";
import { ProductItem } from "@/types/product";
import formatPrice from "@/utils/priceFormatter";
import slugify from "@/utils/slugConverter";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const OrderDetail = ({ order }: { order: Order }) => {
  const orderLines: OrderLine[] = order.orderLines;

  const productItemIds = orderLines.map((orderLine) => orderLine.productItemId);

  const productItemQueries = useQueries({
    queries: productItemIds.map((productItemId) => {
      return {
        queryKey: ["productItem", productItemId],
        queryFn: () => getProductItemById(productItemId),
      };
    }),
  });

  const { data: shippingMethods } = useQuery<ShippingMethod[] | null>({
    queryKey: ["shippingMethods"],
    queryFn: getShippingMethods,
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
      {productItems &&
        productItems.map((productItem) => (
          // <Link
          //   href={`/store/${
          //     product?.parentCategory
          //   }/${slug}/${item.productItem.slug.substring(slug.length + 1)}`}
          //   key={productItem.id}
          // >
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
                      (orderLine) => orderLine.productItemId === productItem.id
                    )?.quantity
                  }
                </div>
              </div>
            </div>
            <div className="text-primary flex flex-col justify-end text-sm">
              {formatPrice(calculateTotalAmount())}đ
            </div>
          </div>
          // </Link>
        ))}
      <div className="flex flex-col gap-4 py-8 items-end border-b-2">
        <div className="flex justify-between w-1/3">
          <div className="text-secondaryText text-right">Tổng tiền hàng</div>
          <span>{formatPrice(order.totalAmount)}đ</span>
        </div>
        <div className="flex justify-between  w-1/3">
          <div className="text-secondaryText">Phí vận chuyển</div>
          <span>
            {formatPrice(
              shippingMethods?.find(
                (shippingMethod) => shippingMethod.name === order.shippingMethod
              )?.price ?? 0
            )}
            đ
          </span>
        </div>
        <div className="flex justify-between  w-1/3">
          <div className="text-secondaryText">Thành tiền</div>
          <span className="text-primary text-2xl">
            {formatPrice(order.totalAmount ?? 0)}đ
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-8 items-end border-b-2">
        <div className="flex justify-between w-1/3">
          <div className="text-secondaryText text-right">
            Phương thức thanh toán
          </div>
          {order.paymentMethod === "cod" && (
            <div className="text-sm">Thanh toán khi nhận hàng</div>
          )}
          {order.paymentMethod === "vnpay" && (
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
              <div className="text-sm">{order.paymentMethod.toUpperCase()}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
