import { AppSidebar } from "@/components/ui/custom/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="min-h-screen w-full bg-white text-black flex">
        <div className="p-8 w-full">
          <div className="ml-4">
            <SidebarTrigger />
          </div>
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
