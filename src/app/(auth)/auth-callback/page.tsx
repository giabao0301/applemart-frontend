"use client";
import { useAuth } from "@/context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  return (
    <div>
      <h2>Redirecting...</h2>
    </div>
  );
};

export default Page;
