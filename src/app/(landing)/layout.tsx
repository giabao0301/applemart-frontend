import Footer from "@/components/landing/layout/Footer";
import MainNavigation from "@/components/landing/layout/MainNavigation";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainNavigation />
      <main className="lg:pt-11 lg:px-36 pb-56 min-h-screen bg-[#f5f5f7] max-w-md lg:max-w-full">
        {children}
      </main>
      <Footer />
    </>
  );
}
