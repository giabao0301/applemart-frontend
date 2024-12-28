import { Logo } from "@/assets/icons/Logo";
import ProfileActions from "@/components/landing/layout/ProfileActions";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  CircleUser,
  Grid2x2,
  House,
  LogOut,
  Settings,
  ShoppingBag,
  TabletSmartphone,
} from "lucide-react";

export function AppSidebar() {
  const items = [
    {
      title: "Trang chủ",
      url: "/admin/dashboard",
      icon: House,
    },
    {
      title: "Sản phẩm",
      url: "/admin/product",
      icon: TabletSmartphone,
    },
    {
      title: "Danh mục",
      url: "/admin/category",
      icon: Grid2x2,
    },
    {
      title: "Đơn hàng",
      url: "/admin/order",
      icon: ShoppingBag,
    },
    {
      title: "Người dùng",
      url: "/admin/user",
      icon: CircleUser,
    },
    {
      title: "Cài đặt",
      url: "/admin/setting",
      icon: Settings,
    },
    {
      title: "Thoát",
      url: "/",
      icon: LogOut,
    },
  ];
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-center py-16">
            <div>
              <Logo className="w-36 h-36" />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="pl-12">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size={"lg"}>
                    <a
                      href={item.url}
                      className={item.title === "Thoát" ? "text-error" : ""}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
