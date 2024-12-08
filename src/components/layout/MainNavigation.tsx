"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Badge,
} from "@nextui-org/react";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import ProfileActions from "./ProfileActions";
import { CartIcon } from "@/assets/icons/CartIcon";
import { useCart } from "@/context/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
// import { AcmeLogo } from "./AcmeLogo.jsx";

export default function MainNavigation() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { cartItems } = useCart();

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
        <NavbarItem isActive={pathname === "/store/mac"}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <nav className="cursor-pointer ">Mac</nav>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
              <DropdownMenuItem className="hover:opacity-70 ">
                <Link
                  className="text-primaryText text-sm"
                  href={`/store/macbook-air`}
                >
                  MacBook Air
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:opacity-70">
                <Link
                  className="text-primaryText text-sm"
                  href={`/store/macbook-pro`}
                >
                  MacBook Pro
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/store/ipad"}>
          <Link color="foreground" href="/store/ipad">
            iPad
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/store/iphone"}>
          <Link color="foreground" href="/store/iphone">
            iPhone
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/store/watch"}>
          <Link color="foreground" href="/store/apple-watch">
            Apple Watch
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/store/airpods"}>
          <Link color="foreground" href="/store/airpods">
            AirPods
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/store/accessories"}>
          <Link color="foreground" href="/store/phu-kien">
            Phụ kiện
          </Link>
        </NavbarItem>
        <NavbarItem className="mb-0.5">
          <div className="cursor-pointer hover:opacity-75">
            <SearchIcon />
          </div>
        </NavbarItem>
        <NavbarItem className="mt-1">
          <Badge
            color="primary"
            content={cartItems?.length || 0}
            size="sm"
            className="mt-[14px] -mr-0.5"
          >
            <Link className="cursor-pointer hover:opacity-75" href="/cart">
              <CartIcon />
            </Link>
          </Badge>
        </NavbarItem>
      </NavbarContent>
      <ProfileActions isMenuOpen={isMenuOpen} />
    </Navbar>
  );
}
