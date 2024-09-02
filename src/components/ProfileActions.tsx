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
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/services/userService";
import { Skeleton } from "./ui/skeleton";
import { User } from "@/types/user";
import { set } from "react-hook-form";

type ProfileProps = {
  isMenuOpen: boolean;
};

const ProfileActions = ({ isMenuOpen }: ProfileProps) => {
  const isAuthed: boolean = isAuthenticated();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    if (isAuthed) {
      setIsLoggedIn(true);
      setIsLoading(false);
    }
  }, [isAuthed]);

  const router = useRouter();

  const { error, data, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: isLoggedIn,
  });

  if (isLoading || isFetching)
    return (
      <NavbarContent as="div" justify="end" className="hidden lg:flex">
        <Skeleton className="w-7 h-7 rounded-full" />
      </NavbarContent>
    );

  if (error) {
    console.log("Error fetching user info: ", error);
  }

  const user: User = data?.data;

  const logoutHandler = () => {
    logout();
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <React.Fragment>
      <NavbarContent as="div" justify="end" className="hidden lg:flex">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            {isLoggedIn ? (
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

          {isLoggedIn ? (
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
              <DropdownItem href="/account" key="account">
                Tài khoản
              </DropdownItem>
              <DropdownItem href="/cart" key="cart">
                Giỏ hàng
              </DropdownItem>
              <DropdownItem href="/saved" key="saved">
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
        {isLoggedIn ? (
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
