"use client";
import { useAuth } from "@/context/AuthContext";
import { isAuthenticated } from "@/services/authService";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen -mt-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <section className="flex my-0">
      <ul className="flex flex-col gap-6 w-64">
        <Link className="hover:text-[#0070c9]" href="/user/account/profile">
          Hồ sơ
        </Link>
        <Link className="hover:text-[#0070c9]" href="/user/account/address">
          Địa chỉ
        </Link>
        <Link className="hover:text-[#0070c9]" href="/user/account/password">
          Đổi mật khẩu
        </Link>
        <Link className="hover:text-[#0070c9]" href="/user/setting/privacy">
          Thiết lập riêng tư
        </Link>
      </ul>
      {children}
    </section>
  );
}
