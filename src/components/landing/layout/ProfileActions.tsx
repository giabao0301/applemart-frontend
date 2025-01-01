"use client";
import React from "react";
import {
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { AccountIcon } from "@/assets/icons/AccountIcon";
import { useRouter } from "next/navigation";
import { Skeleton } from "../../ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

type ProfileProps = {
  isMenuOpen?: boolean;
};

const ProfileActions = ({ isMenuOpen }: ProfileProps) => {
  const router = useRouter();

  const { user, isLoading, logout } = useAuth();

  const logoutHandler = async () => {
    await logout();
    console.log("logout");

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
                  textValue="dashboard"
                >
                  <Link href="/admin/dashboard">Bảng điều khiển</Link>
                </DropdownItem>
              ) : null}
              <DropdownItem
                key="account"
                className="text-primaryText"
                textValue="account"
              >
                <Link href="/user/account/profile"> Tài khoản</Link>
              </DropdownItem>
              <DropdownItem
                key="purchase"
                className="text-primaryText"
                textValue="purchase"
              >
                <Link href="/user/purchase">Đơn mua</Link>
              </DropdownItem>
              <DropdownItem
                key="saved"
                className="text-primaryText"
                textValue="saved"
              >
                <Link href="/user/saved">Mục đã lưu</Link>
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
                textValue="login"
              >
                <Link href="/login"> Đăng nhập</Link>
              </DropdownItem>
              <DropdownItem
                className="text-primaryText"
                key="signup"
                textValue="signup"
              >
                <Link href="/signup">Đăng ký</Link>
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
