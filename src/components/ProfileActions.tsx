"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
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
import { isAuthenticated, logout } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserInfo } from "@/services/userService";
import { Skeleton } from "./ui/skeleton";
import { User } from "@/types/user";

type ProfileProps = {
  isMenuOpen: boolean;
};

const ProfileActions = ({ isMenuOpen }: ProfileProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isFetching,
    error,
  } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const authenticated = await isAuthenticated();
      return authenticated ? getUserInfo() : null;
    },
  });

  if (isLoading || isFetching) {
    return (
      <NavbarContent as="div" justify="end" className="hidden lg:flex">
        <Skeleton className="w-7 h-7 rounded-full" />
      </NavbarContent>
    );
  }

  if (error) {
    console.log("Error fetching user info: ", error);
    return (
      <NavbarContent as="div" justify="end" className="hidden lg:flex">
        <Skeleton className="w-7 h-7 rounded-full" />
      </NavbarContent>
    );
  }

  const logoutHandler = () => {
    logout();
    queryClient.invalidateQueries({ queryKey: ["user"] });
    router.push("/login");
  };

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
                name={user.fullName}
                src={user.profileImageUrl}
                fallback={user.fullName
                  .split(" ")
                  .filter((n, index) => !n[index - 1] || !n[index + 1])
                  .map((n) => n[0])}
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
              <DropdownItem href="/user/account/profile" key="account">
                Tài khoản
              </DropdownItem>
              <DropdownItem href="/user/cart" key="cart">
                Giỏ hàng
              </DropdownItem>
              <DropdownItem href="/user/saved" key="saved">
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
              <DropdownItem key="login" color="primary" href="/login">
                Đăng nhập
              </DropdownItem>
              <DropdownItem key="register" color="primary" href="/signup">
                Đăng ký
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
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
                className="w-full py-2"
                color="foreground"
                href="/account"
                size="lg"
              >
                Tài khoản
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="w-full py-2"
                color="foreground"
                href="/cart"
                size="lg"
              >
                Giỏ hàng
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="w-full py-2"
                color="foreground"
                href="/saved"
                size="lg"
              >
                Mục đã lưu
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="w-full py-2"
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
                className="w-full py-2"
                color="foreground"
                href="/login"
                size="lg"
              >
                Đăng nhập
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="w-full py-2"
                color="foreground"
                href="/signup"
                size="lg"
              >
                Đăng ký
              </Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </React.Fragment>
  );
};

export default ProfileActions;
