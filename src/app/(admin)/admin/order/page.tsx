/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import { DataTable } from "@/components/admin/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/admin/PageTitle";
import { Chip, Navbar, Tooltip } from "@nextui-org/react";
import ProfileActions from "@/components/landing/layout/ProfileActions";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/orderService";
import formatPrice from "@/utils/priceFormatter";
import { Eye, Pen, Pencil, Trash2 } from "lucide-react";
import { OrderForm } from "@/components/admin/OrderForm";

type Props = {};

type OrderTable = {
  orderId: number;
  userId: number;
  orderDate: string;
  totalAmount: string;
  paymentMethod: string;
  paymentStatus: string;
  shippingMethod: string;
  orderStatus: string;
};

const columns: ColumnDef<OrderTable>[] = [
  {
    accessorKey: "orderId",
    header: "Mã đơn hàng",
  },
  {
    accessorKey: "userId",
    header: "Khách hàng",
  },
  {
    accessorKey: "orderDate",
    header: "Ngày đặt hàng",
  },
  {
    accessorKey: "totalAmount",
    header: "Tổng tiền",
  },
  {
    accessorKey: "paymentMethod",
    header: "Phương thức thanh toán",
  },
  {
    accessorKey: "paymentStatus",
    header: "Trạng thái thanh toán",
    cell: ({ row }) => {
      return (
        <Chip
          color={
            (row.getValue("paymentStatus") === "Hoàn tất" && "success") ||
            (row.getValue("paymentStatus") === "Đang chờ" && "warning") ||
            (row.getValue("paymentStatus") === "Thất bại" && "danger") ||
            "default"
          }
          className="text-white"
        >
          {row.getValue("paymentStatus")}
        </Chip>
      );
    },
  },
  {
    accessorKey: "shippingMethod",
    header: "Phương thức vận chuyển",
  },
  {
    accessorKey: "orderStatus",
    header: "Tình trạng đơn hàng",
    cell: ({ row }) => {
      return (
        <Chip
          color={
            (row.getValue("orderStatus") === "Hoàn thành" && "success") ||
            (row.getValue("orderStatus") === "Chờ xác nhận" && "default") ||
            (row.getValue("orderStatus") === "Đang chuẩn bị hàng" &&
              "secondary") ||
            (row.getValue("orderStatus") === "Đang giao" && "warning") ||
            (row.getValue("orderStatus") === "Đã hủy" && "danger") ||
            (row.getValue("orderStatus") === "Đã trả hàng" && "danger") ||
            "default"
          }
          className="text-white"
        >
          {row.getValue("orderStatus")}
        </Chip>
      );
    },
  },
  {
    accessorKey: "edit",
    header: "Chỉnh sửa",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4 items-center">
          <Tooltip content="Xem chi tiết">
            <Eye
              size={16}
              onClick={() => {}}
              className="cursor-pointer text-secondaryText"
            />
          </Tooltip>
          <Tooltip content="Chỉnh sửa">
            <Pencil
              size={16}
              onClick={() => {}}
              className="cursor-pointer text-secondaryText"
            />
          </Tooltip>
          <Tooltip content="Xóa" className="text-error">
            <Trash2
              className="text-error cursor-pointer"
              size={16}
              onClick={() => {}}
            />
          </Tooltip>
        </div>
      );
    },
  },
];

export default function OrdersPage({}: Props) {
  const { data: orders } = useQuery({
    queryKey: ["orders", { page: 0, size: 10, sort: "id", dir: "desc" }],
    queryFn: () =>
      getOrders({
        page: 0,
        size: 10,
        sort: "id",
        dir: "desc",
      }),
  });

  const data: OrderTable[] =
    orders?.content.map((order) => {
      return {
        orderId: order.id,
        userId: order.userId,
        orderDate: new Date(order.orderDate).toLocaleDateString(),
        totalAmount: formatPrice(order.totalAmount).concat("đ"),
        paymentMethod: order.paymentMethod.toUpperCase(),
        paymentStatus: order.paymentStatus,
        shippingMethod: order.shippingMethod,
        orderStatus: order.orderStatus,
      };
    }) || [];

  return (
    <div className="flex flex-col gap-5 w-full">
      <Navbar
        className="bg-white/80 backdrop-blur-sm"
        maxWidth="xl"
        height="3rem"
      >
        <PageTitle title="Đơn hàng" />
        <ProfileActions />
      </Navbar>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
