"use client";
import { isAuthorized } from "@/_services/auth";
import { useAuthStore } from "@/_store";
import { UserWithToken } from "@/_types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";

function useGetAuth() {
  const token = typeof window !== "undefined" ? getCookie("auth_token") : null;

  return useQuery<UserWithToken | null, Error, UserWithToken>({
    queryKey: ["auth"],
    queryFn: () => isAuthorized(token!),
    enabled: !!token,
  });
}

export const useValidateToken = () => {
  const { validateToken, isAuthValidated, logOut, user } = useAuthStore();
  const [newState, setNewState] = useState({ isAuthValidated, user });
  const router = useRouter();
  const { data, isSuccess } = useGetAuth();

  useEffect(() => {
    if (typeof window === "undefined") return; // Verifica entorno cliente

    if (newState.isAuthValidated && newState.user) {
      return;
    }

    const checkAuth = async () => {
      const authToken = getCookie("auth_token");

      if (!authToken) {
        validateToken(false, null);
        logOut();
        return;
      }

      if (isSuccess && data) {
        validateToken(true, data);
        router.push("/dashboard");
        setNewState({ isAuthValidated: isSuccess, user: data });
      }
    };
    checkAuth();
  }, [
    data,
    isSuccess,
    logOut,
    newState.isAuthValidated,
    newState.user,
    router,
    validateToken,
  ]);
  return newState;
};
