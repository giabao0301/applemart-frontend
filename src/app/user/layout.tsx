"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

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

  return (
    <section className="flex my-0">
      <ul className="flex flex-col gap-6 w-1/5">
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
      <div className="w-4/5 ">{children}</div>
    </section>
  );
}
