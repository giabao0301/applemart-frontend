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
import React, { useState } from "react";
import PageTitle from "@/components/admin/PageTitle";
import { Chip, Navbar, Pagination, Spinner, Tooltip } from "@nextui-org/react";
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
import { Category, Product } from "@/types/product";
import {
  deleteCategoryById,
  deleteProductById,
  getCategories,
  getProducts,
} from "@/services/productService";
import { ProductFormModal } from "@/components/admin/ProductFormModal";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

type Props = {};

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Mã sản phẩm",
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
    header: "Tên sản phẩm",
  },
  {
    accessorKey: "category",
    header: "Danh mục",
  },
  {
    accessorKey: "lowestPrice",
    header: "Giá",
    cell: ({ row }) => {
      return formatPrice(row.original.lowestPrice);
    },
  },
  {
    accessorKey: "action",
    header: "Hành động",
  },
];

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";
  console.log("page", page);

  const [params, setParams] = useState({
    page: page ? parseInt(page) - 1 : 0,
    size: 12,
    sort: "id",
    dir: "desc",
  });

  console.log("params", params);

  const { data, isPending, error } = useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    enabled: !!params.size && !!params.sort && !!params.dir,
  });

  const pages = data?.totalPages || 1;

  if (isPending) return <Loading />;

  if (error) {
    console.log("Error fetching products: ", error);
  }

  const changePageHandler = (page: number) => {
    setParams({ ...params, page: page - 1 });
    router.push(`/admin/product?page=${page}`);
  };

  const deleteProductHandler = async (id: number) => {
    await deleteProductById(id);
    queryClient.invalidateQueries({ queryKey: ["products", params] });
  };

  columns[columns.length - 1].cell = ({ row }) => {
    return (
      <div className="flex gap-4 items-center">
        <ProductFormModal
          type="read"
          header="Chi tiết sản phẩm"
          data={row.original}
        >
          <Tooltip content="Xem chi tiết">
            <Eye size={16} className="cursor-pointer text-secondaryText" />
          </Tooltip>
        </ProductFormModal>
        <ProductFormModal
          type="update"
          header="Chỉnh sửa thông tin sản phẩm"
          data={row.original}
        >
          <Tooltip content="Chỉnh sửa">
            <Pencil size={16} className="cursor-pointer text-secondaryText" />
          </Tooltip>
        </ProductFormModal>
        <Alert
          title={"Bạn chắc chắn muốn xóa này?"}
          description={`Mã đơn hàng: ${row.original.id}`}
          action="Có"
          cancel="Không"
          onAction={() => deleteProductHandler(row.original.id)}
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
        <PageTitle title="Sản phẩm" />
        <ProductFormModal header="Thêm danh mục sản phẩm" type="create">
          <Chip color="primary" className="cursor-pointer">
            <div className="flex items-center gap-1 text-white">
              <Plus size={12} />
              <div>Thêm sản phẩm</div>
            </div>
          </Chip>
        </ProductFormModal>
        <ProfileActions />
      </Navbar>
      <DataTable columns={columns} data={data?.content || []} />
      <div className="flex justify-center mt-8">
        <Pagination
          showControls
          total={pages}
          initialPage={1}
          page={params.page + 1}
          size="lg"
          onChange={changePageHandler}
        />
      </div>
    </div>
  );
}
