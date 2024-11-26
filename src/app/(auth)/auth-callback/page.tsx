"use client";
import { useAuth } from "@/context/AuthContext";
import { setToken } from "@/services/cookieService";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    const token = new URL(window.location.href).hash.split("token=")[1];
    if (token) {
      setToken(token);
      loginWithGoogle();
    }
    router.replace("/");
  }, [loginWithGoogle, router]);

  return (
    <div>
      <h2>Redirecting...</h2>
    </div>
  );
};

export default Page;
