"use client";
import {
  CircleUser,
  Fingerprint,
  icons,
  MapPinned,
  Settings,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = [
    {
      title: "Hồ sơ",
      href: "/user/account/profile",
      icon: CircleUser,
    },
    {
      title: "Địa chỉ",
      href: "/user/account/address",
      icon: MapPinned,
    },
    {
      title: "Đổi mật khẩu",
      href: "/user/account/password",
      icon: Fingerprint,
    },
    {
      title: "Thiết lập riêng tư",
      href: "/user/setting/privacy",
      icon: Settings,
    },
  ];

  return (
    <section className="flex my-0">
      <ul className="flex flex-col gap-6 w-1/5">
        {items.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className="flex items-center gap-4 hover:text-primary"
            >
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="w-4/5 ">{children}</div>
    </section>
  );
}
