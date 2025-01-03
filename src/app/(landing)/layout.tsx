"use client";
import Chat from "@/components/Chat";
import Footer from "@/components/landing/layout/Footer";
import MainNavigation from "@/components/landing/layout/MainNavigation";
import { useAuth } from "@/context/AuthContext";
import { Avatar, Chip, useDisclosure } from "@nextui-org/react";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const isAdmin = user?.roles.some((role) => role.name === "ADMIN");

  const isShowChat = !isAdmin && user;

  return (
    <>
      <MainNavigation />
      <main className="lg:pt-11 lg:px-36 pb-56 min-h-screen bg-[#f5f5f7] max-w-md lg:max-w-full">
        {children}
        {isShowChat && (
          <Chat>
            <Chip
              className="z-50 fixed bottom-12 right-4 cursor-pointer"
              size="lg"
              avatar={
                <Avatar
                  name=""
                  src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/store-chat-holiday-specialist-icon-202411_AV1?wid=35&hei=35&fmt=jpeg&qlt=95&.v=1728685028384"
                />
              }
              variant="flat"
            >
              <div className="flex flex-col text-sm">
                Bạn cần tư vấn?
                <div className="text-sm text-primary cursor-pointer">
                  Chat ngay
                </div>
              </div>
            </Chip>
          </Chat>
        )}
      </main>
      <Footer />
    </>
  );
}
