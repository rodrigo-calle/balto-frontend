"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/_store";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      const refreshInterval = setInterval(() => {
        refreshToken();
      }, 12 * 60 * 60 * 1000);

      return () => clearInterval(refreshInterval);
    }
  }, [isAuthenticated, router, refreshToken]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}