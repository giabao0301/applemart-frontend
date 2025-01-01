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
import { cn } from "@/lib/utils";
import { Avatar, Chip, Navbar, Tooltip } from "@nextui-org/react";
import ProfileActions from "@/components/landing/layout/ProfileActions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAccount, getUsers } from "@/services/userService";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "@/utils/dateFormatter";
import { Alert } from "@/components/ui/custom/AlertDialog";
import { UserFormModal } from "@/components/admin/UserFormModal";
import { User } from "@/types/user";

type Props = {};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Mã người dùng",
  },
  {
    accessorKey: "profileImageUrl",
    header: "Ảnh đại diện",
    cell: ({ row }) => {
      return (
        <Avatar
          src={
            row.getValue("profileImageUrl") ||
            `https://api.dicebear.com/7.x/lorelei/svg?seed=${row.original.email}`
          }
        />
      );
    },
  },
  {
    accessorKey: "username",
    header: "Tên đăng nhập",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "fullName",
    header: "Tên đầy đủ",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Ngày sinh",
    cell: ({ row }) => {
      return formatDate(row.getValue("dateOfBirth"));
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Số điện thoại",
  },
  {
    accessorKey: "role",
    header: "Vai trò",
    cell: ({ row }) => {
      return row.original.roles.map((role) => role.name).join(", ");
    },
  },
  {
    accessorKey: "enabled",
    header: "Tình trạng",
    cell: ({ row }) => {
      return (
        <Chip
          color={row.getValue("enabled") === true ? "success" : "default"}
          className="text-white"
        >
          {row.getValue("enabled") === true ? "Hoạt động" : "Chưa kích hoạt"}
        </Chip>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Hành động",
  },
];

export default function UsersPage({}: Props) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["users", { page: 0, size: 10, sort: "id", dir: "asc" }],
    queryFn: () => getUsers({ page: 0, size: 10, sort: "id", dir: "asc" }),
  });

  const deleteUserHandler = async (userId: number) => {
    await deleteAccount(userId);
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  columns[columns.length - 1].cell = ({ row }) => {
    return (
      <div className="flex gap-4 items-center">
        <UserFormModal header="Chi tiết người dùng" data={row.original}>
          <Tooltip content="Xem chi tiết">
            <Eye size={16} className="cursor-pointer text-secondaryText" />
          </Tooltip>
        </UserFormModal>
        <UserFormModal
          header="Chỉnh sửa thông tin người dùng"
          data={row.original}
        >
          <Tooltip content="Chỉnh sửa">
            <Pencil size={16} className="cursor-pointer text-secondaryText" />
          </Tooltip>
        </UserFormModal>
        <Alert
          title={"Bạn chắc chắn muốn xóa người dùng này?"}
          description={`Mã người dùng: ${row.original.id}`}
          action="Có"
          cancel="Không"
          onAction={() => deleteUserHandler(row.original.id)}
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
        <PageTitle title="Người dùng" />
        <ProfileActions />
      </Navbar>
      <DataTable columns={columns} data={data?.content || []} />
    </div>
  );
}
