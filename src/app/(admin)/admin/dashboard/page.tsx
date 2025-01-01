"use client";
import BarChart from "@/components/admin/BarChart";
import Card, { CardContent, CardProps } from "@/components/admin/Card";
import PageTitle from "@/components/admin/PageTitle";
import SalesCard, { SalesProps } from "@/components/admin/SalesCard";
import ProfileActions from "@/components/landing/layout/ProfileActions";
import { getUsers } from "@/services/userService";
import { Navbar } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import {
  Clock,
  DollarSign,
  Grid2X2,
  ShoppingBag,
  TabletSmartphone,
} from "lucide-react";
import { useState } from "react";
import { User } from "@/types/user";
import { getOrderStats } from "@/services/orderService";
import formatPrice from "@/utils/priceFormatter";
import { getProductStats } from "@/services/productService";

const cardData: CardProps[] = [
  {
    label: "Tổng doanh thu",
    amount: "+450.231.899đ",
    description: "+20.1% so với tháng trước",
    icon: DollarSign,
  },
  {
    label: "Đơn hàng",
    amount: "+2350",
    description: "+180.1% so với tháng trước",
    icon: ShoppingBag,
  },
  {
    label: "Sản phẩm",
    amount: "573",
    description: "Tổng số sản phẩm",
    icon: TabletSmartphone,
  },
  {
    label: "Doanh mục",
    amount: "12",
    description: "Tổng số danh mục sản phẩm",
    icon: Grid2X2,
  },
];

export default function Dashboard() {
  const { data: orderStats } = useQuery({
    queryKey: ["orderStats"],
    queryFn: () => getOrderStats(),
  });

  const { data: productStats } = useQuery({
    queryKey: ["productStats"],
    queryFn: () => getProductStats(),
  });

  console.log(productStats);

  cardData[0].amount = `+${formatPrice(orderStats?.totalRevenue || 0)}đ`;

  cardData[1].amount = `+${orderStats?.totalOrders || 0}`;

  cardData[2].amount = `${productStats?.totalProductItems || 0}`;

  cardData[3].amount = `${productStats?.totalCategories || 0}`;

  const { data } = useQuery({
    queryKey: ["users", { page: 0, size: 5, sort: "id", dir: "desc" }],
    queryFn: () => getUsers({ page: 0, size: 5, sort: "id", dir: "desc" }),
  });

  const users: User[] = data?.content || [];

  const recentUsers = users.map((user) => ({
    name: user.fullName,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
  }));

  return (
    <div className="flex flex-col w-full">
      <Navbar
        className="bg-white/80 backdrop-blur-sm"
        maxWidth="xl"
        height="3rem"
      >
        <PageTitle title="Bảng điều khiển" />
        <ProfileActions />
      </Navbar>
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            description={d.description}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-3 mt-4">
        <CardContent className="col-span-2">
          <p className="p-4 font-semibold">Tổng quan</p>
          <BarChart />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <div className="flex justify-between gap-3">
              <p>Người dùng đăng ký gần đây</p>
              <Clock size={20} />
            </div>
          </section>
          {recentUsers.map((user, index) => (
            <SalesCard
              key={index}
              email={user.email}
              name={user.name}
              profileImageUrl={user.profileImageUrl}
            />
          ))}
        </CardContent>
      </section>
    </div>
  );
}
