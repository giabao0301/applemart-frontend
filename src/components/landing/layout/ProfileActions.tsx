"use client";
import React from "react";
import {
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { AccountIcon } from "@/assets/icons/AccountIcon";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "../../ui/skeleton";
import { useAuth } from "@/context/AuthContext";

type ProfileProps = {
  isMenuOpen?: boolean;
};

const ProfileActions = ({ isMenuOpen }: ProfileProps) => {
  const router = useRouter();

  const { user, isLoading, logout } = useAuth();

  const logoutHandler = () => {
    logout();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <NavbarContent as="div" justify="end" className="hidden lg:flex">
        <Skeleton className="w-7 h-7 rounded-full" />
      </NavbarContent>
    );
  }

  const isAdmin: boolean =
    user?.roles.some((role) => role.name === "ADMIN") || false;

  return (
    <React.Fragment>
      <NavbarContent as="div" justify="end" className="hidden lg:flex">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            {user ? (
              <Avatar
                as="button"
                className="transition-transform w-7 h-7"
                color="secondary"
                name={user.fullName || user.username}
                src={user.profileImageUrl}
                fallback={
                  user.fullName &&
                  user.fullName
                    .split(" ")
                    .filter((n, index) => !n[index - 1] || !n[index + 1])
                    .map((n) => n[0])
                }
                showFallback
              />
            ) : (
              <div className="cursor-pointer hover:opacity-75">
                <AccountIcon />
              </div>
            )}
          </DropdownTrigger>

          {user ? (
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                isReadOnly
                textValue={`Xin chào, ${user.fullName}`}
                className="h-14 gap-2 font-semibold"
              >
                <p className="font-semibold">Xin chào,</p>
                <p className="font-semibold">{user.fullName}</p>
              </DropdownItem>
              {isAdmin ? (
                <DropdownItem
                  key="dashboard"
                  className="text-primaryText"
                  onClick={() => router.push("/admin/dashboard")}
                >
                  Bảng điều khiển
                </DropdownItem>
              ) : null}
              <DropdownItem
                key="account"
                className="text-primaryText"
                onClick={() => router.push("/user/account/profile")}
              >
                Tài khoản
              </DropdownItem>
              <DropdownItem
                key="purchase"
                className="text-primaryText"
                onClick={() => router.push("/user/purchase")}
              >
                Đơn mua
              </DropdownItem>
              <DropdownItem
                key="saved"
                className="text-primaryText"
                onClick={() => router.push("/user/saved")}
              >
                Mục đã lưu
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                className="text-danger"
                onClick={logoutHandler}
              >
                Đăng xuất
              </DropdownItem>
            </DropdownMenu>
          ) : (
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                className="text-primaryText"
                key="login"
                onClick={() => router.push("/login")}
              >
                Đăng nhập
              </DropdownItem>
              <DropdownItem
                className="text-primaryText"
                key="register"
                onClick={() => router.push("/signup")}
              >
                Đăng ký
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </NavbarContent>

      {/* <NavbarContent className="sm:hidden" justify="end">
        <SearchIcon className="cursor-pointer hover:opacity-75" />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarMenu>
        {user ? (
          <>
            <NavbarMenuItem>
              <Link
                className="text-primaryText w-full py-2"
                color="foreground"
                href="/account"
                size="lg"
              >
                Tài khoản
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="text-primaryText w-full py-2"
                color="foreground"
                href="/cart"
                size="lg"
              >
                Giỏ hàng
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="text-primaryText w-full py-2"
                color="foreground"
                href="/saved"
                size="lg"
              >
                Mục đã lưu
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="text-primaryText w-full py-2"
                color="foreground"
                href="/logout"
                size="lg"
              >
                Đăng xuất
              </Link>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <Link
                className="text-primaryText w-full py-2"
                color="foreground"
                href="/login"
                size="lg"
              >
                Đăng nhập
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="text-primaryText w-full py-2"
                color="foreground"
                href="/signup"
                size="lg"
              >
                Đăng ký
              </Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu> */}
    </React.Fragment>
  );
};

export default ProfileActions;
