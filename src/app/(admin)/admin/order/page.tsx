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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteOrderById, getOrders } from "@/services/orderService";
import formatPrice from "@/utils/priceFormatter";
import { Eye, Pen, Pencil, Trash2 } from "lucide-react";
import { OrderFormModal } from "@/components/admin/OrderFormModal";
import Image from "next/image";
import { Alert } from "@/components/ui/custom/AlertDialog";
import { formatDate } from "@/utils/dateFormatter";
import { Order } from "@/types/order";

type Props = {};

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Mã đơn hàng",
  },
  {
    accessorKey: "userId",
    header: "Khách hàng",
  },
  {
    accessorKey: "orderDate",
    header: "Thời gian đặt hàng",
    cell: ({ row }) => {
      return formatDate(row.original.orderDate || "");
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Tổng tiền",
    cell: ({ row }) => {
      return formatPrice(row.getValue("totalAmount")).concat("đ");
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Phương thức thanh toán",
    cell: ({ row }) => {
      const paymentMethod: string = row.getValue("paymentMethod");

      if (paymentMethod === "vnpay") {
        return (
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
            <div className="text-sm">{paymentMethod.toUpperCase()}</div>
          </div>
        );
      } else {
        return <div className="ml-10">{paymentMethod.toUpperCase()}</div>;
      }
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Trạng thái thanh toán",
    cell: ({ row }) => {
      return (
        <Chip
          color={
            (row.getValue("paymentStatus") === "Hoàn thành" && "success") ||
            (row.getValue("paymentStatus") === "Chưa thanh toán" &&
              "warning") ||
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
    accessorKey: "orderStatus",
    header: "Tình trạng đơn hàng",
    cell: ({ row }) => {
      return (
        <Chip
          color={
            (row.getValue("orderStatus") === "Hoàn thành" && "success") ||
            (row.getValue("orderStatus") === "Chờ xác nhận" && "default") ||
            (row.getValue("orderStatus") === "Đang chuẩn bị" && "secondary") ||
            (row.getValue("orderStatus") === "Đang giao" && "warning") ||
            (row.getValue("orderStatus") === "Đã hủy" && "danger") ||
            (row.getValue("orderStatus") === "Đã trả" && "danger") ||
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
    accessorKey: "actions",
    header: "Hành động",
  },
];

export default function OrdersPage({}: Props) {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["orders", { page: 0, size: 10, sort: "id", dir: "desc" }],
    queryFn: () =>
      getOrders({
        page: 0,
        size: 10,
        sort: "id",
        dir: "desc",
      }),
  });

  const deleteOrderHandler = async (orderId: number) => {
    await deleteOrderById(orderId);
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  };

  columns[columns.length - 1].cell = ({ row }) => {
    return (
      <div className="flex gap-4 items-center">
        <OrderFormModal header="Chi tiết đơn hàng" data={row.original}>
          <Tooltip content="Xem chi tiết">
            <Eye size={16} className="cursor-pointer text-secondaryText" />
          </Tooltip>
        </OrderFormModal>
        <OrderFormModal
          header="Chỉnh sửa thông tin đơn hàng"
          data={row.original}
        >
          <Tooltip content="Chỉnh sửa">
            <Pencil size={16} className="cursor-pointer text-secondaryText" />
          </Tooltip>
        </OrderFormModal>
        <Alert
          title={"Bạn chắc chắn muốn xóa đơn hàng này?"}
          description={`Mã đơn hàng: ${row.original.id}`}
          action="Có"
          cancel="Không"
          onAction={() => deleteOrderHandler(row.original.id)}
        >
          {/* <Tooltip content="Xóa" className="text-error"> */}
          <Trash2 className="text-error cursor-pointer" size={16} />
          {/* </Tooltip> */}
        </Alert>
      </div>
    );
  };

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
      <DataTable columns={columns} data={data?.content || []} />
    </div>
  );
}
