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
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/userService";
import { Eye, Pencil, Trash, Trash2 } from "lucide-react";

type Props = {};

type UserTable = {
  userId: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  status: boolean;
};

const columns: ColumnDef<UserTable>[] = [
  {
    accessorKey: "userId",
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
            `https://api.dicebear.com/7.x/lorelei/svg?seed=${Math.random()}`
          }
        />
      );
    },
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
    accessorKey: "phoneNumber",
    header: "Số điện thoại",
  },
  {
    accessorKey: "role",
    header: "Vai trò",
  },
  {
    accessorKey: "status",
    header: "Tình trạng",
    cell: ({ row }) => {
      return (
        <Chip
          color={row.getValue("status") === true ? "success" : "default"}
          className="text-white"
        >
          {row.getValue("status") === true ? "Hoạt động" : "Chưa kích hoạt"}
        </Chip>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Hành động",
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

export default function UsersPage({}: Props) {
  const { data: users } = useQuery({
    queryKey: ["users", { page: 0, size: 10, sort: "id", dir: "asc" }],
    queryFn: () => getUsers({ page: 0, size: 10, sort: "id", dir: "asc" }),
  });

  const data: UserTable[] =
    users?.content.map((user) => {
      return {
        userId: user.id,
        profileImageUrl: user.profileImageUrl,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        role: user.roles[0].name,
        status: user.enabled,
      };
    }) || [];

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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
