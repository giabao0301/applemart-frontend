"use client";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "@/context/AuthContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );
  1;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </AuthProvider>
  );
}
