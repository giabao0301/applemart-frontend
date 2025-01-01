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
import { Eye, Pen, Pencil, Plus, Trash2 } from "lucide-react";
import { OrderFormModal } from "@/components/admin/OrderFormModal";
import Image from "next/image";
import { Alert } from "@/components/ui/custom/AlertDialog";
import { formatDate } from "@/utils/dateFormatter";
import { Order } from "@/types/order";
import { Category } from "@/types/product";
import { deleteCategoryById, getCategories } from "@/services/productService";
import { CategoryFormModal } from "@/components/admin/CategoryFormModal";

type Props = {};

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "Mã danh mục",
  },
  {
    accessorKey: "thumbnailUrl",
    header: "Ảnh",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.thumbnailUrl}
          alt={row.original.name}
          width={50}
          height={50}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Tên danh mục",
  },
  {
    accessorKey: "action",
    header: "Hành động",
  },
];

export default function CategoriesPage({}: Props) {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const deleteCategoryHandler = async (id: number) => {
    await deleteCategoryById(id);
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };

  columns[columns.length - 1].cell = ({ row }) => {
    return (
      <div className="flex gap-4 items-center">
        <CategoryFormModal
          type="read"
          header="Chi tiết danh mục sản phẩm"
          data={row.original}
        >
          <Tooltip content="Xem chi tiết">
            <Eye size={16} className="cursor-pointer text-secondaryText" />
          </Tooltip>
        </CategoryFormModal>
        <CategoryFormModal
          type="update"
          header="Chỉnh sửa thông tin danh mục"
          data={row.original}
        >
          <Tooltip content="Chỉnh sửa">
            <Pencil size={16} className="cursor-pointer text-secondaryText" />
          </Tooltip>
        </CategoryFormModal>
        <Alert
          title={"Bạn chắc chắn muốn xóa danh mục này?"}
          description={`Mã đơn hàng: ${row.original.id}`}
          action="Có"
          cancel="Không"
          onAction={() => deleteCategoryHandler(row.original.id)}
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
        <PageTitle title="Danh mục sản phẩm" />
        <CategoryFormModal header="Thêm danh mục sản phẩm" type="create">
          <Chip color="primary" className="cursor-pointer">
            <div className="flex items-center gap-1 text-white">
              <Plus size={12} />
              <div>Thêm danh mục</div>
            </div>
          </Chip>
        </CategoryFormModal>
        <ProfileActions />
      </Navbar>
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}
