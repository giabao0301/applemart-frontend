"use client";
import { setToken } from "@/services/cookieService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = new URL(window.location.href).hash.split("token=")[1];
    if (token) {
      setToken(token);
    }
    router.push("/");
  }, [router]);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};

export default Page;
