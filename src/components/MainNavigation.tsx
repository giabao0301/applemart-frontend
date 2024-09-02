"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import ProfileActions from "./ProfileActions";
// import { AcmeLogo } from "./AcmeLogo.jsx";

export default function MainNavigation() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
        <NavbarItem isActive={pathname === "/mac"}>
          <Link color="foreground" href="/mac">
            Mac
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
          <Link color="foreground" href="/airpods">
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
      <ProfileActions isMenuOpen={isMenuOpen} />
    </Navbar>
  );
}
