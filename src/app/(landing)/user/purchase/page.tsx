"use client";
import OrderItem from "@/components/landing/order/OrderItem";
import OrderDetail from "@/components/landing/order/OrderItem";
import { useAuth } from "@/context/AuthContext";
import { getOrdersByUserId } from "@/services/orderService";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  const { data: orders } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => (user ? getOrdersByUserId(user.id) : Promise.resolve([])),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="p-2 flex flex-col gap-10">
      {orders?.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default Page;
