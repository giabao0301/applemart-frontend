"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Avatar,
  DropdownTrigger,
} from "@nextui-org/react";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { AccountIcon } from "@/assets/icons/AccountIcon";
// import { AcmeLogo } from "./AcmeLogo.jsx";

export default function App() {
  const isLoggedIn: Boolean = false;

  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const menuItems = isLoggedIn
    ? ["Tài khoản", "Giỏ hàng", "Mục đã lưu", "Đăng xuất"]
    : ["Đăng nhập", "Đăng ký"];

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white/80 backdrop-blur-sm"
      maxWidth="xl"
      height="3rem"
    >
      <NavbarContent className="lg:hidden pr-3" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <Link href="/" className="font-bold text-inherit">
            Applemart
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-12" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link color="foreground" href="/">
            Cửa hàng
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/ipad"}>
          <Link color="foreground" href="/ipad">
            iPad
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/iphone"}>
          <Link color="foreground" href="/iphone">
            iPhone
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/watch"}>
          <Link color="foreground" href="watch">
            Apple Watch
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/airpods"}>
          <Link color="foreground" href="airpods">
            AirPods
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/accessories"}>
          <Link color="foreground" href="accessories">
            Phụ kiện
          </Link>
        </NavbarItem>
        <NavbarItem>
          <div className="cursor-pointer hover:opacity-75">
            <SearchIcon />
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end" className="hidden lg:flex">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            {isLoggedIn ? (
              <Avatar
                as="button"
                className="transition-transform w-7 h-7"
                color="secondary"
                name="Jason Hughes"
                src="https://i.pavatar.cc/150?u=a042581f4e29026704d"
                fallback="JH"
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
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Xin chào,</p>
                <p className="font-semibold">Jason Hughes</p>
              </DropdownItem>
              <DropdownItem key="account">Tài khoản</DropdownItem>
              <DropdownItem key="cart">Giỏ hàng</DropdownItem>
              <DropdownItem key="saved">Mục đã lưu</DropdownItem>
              <DropdownItem key="logout" color="danger" className="text-danger">
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
        <div className="cursor-pointer hover:opacity-75">
          <SearchIcon />
        </div>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full py-2"
              color={
                isLoggedIn && index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
