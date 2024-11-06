"use client";
import { isAuthenticated } from "@/services/authService";
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

  const {
    data: isAuthed,
    isLoading,
    isFetching,
  } = useQuery<boolean>({
    queryKey: ["authenticated"],
    queryFn: isAuthenticated,
  });

  useEffect(() => {
    if (isAuthed === false) {
      router.replace("/login");
    }
  }, [isAuthed, router]);

  if (isAuthed === undefined) {
    return;
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex mx-36 my-0">
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
