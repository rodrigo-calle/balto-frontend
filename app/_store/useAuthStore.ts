"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QueryClient } from "@tanstack/react-query";
import { UserWithToken } from "@/_types";
import { setCookie, removeCookie, getCookie } from "typescript-cookie";
import { addHours } from "date-fns";
import { isAuthorized } from "@/_services/auth";
import { cookieEnvSettings } from "@/_services/common";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

interface AuthState {
  user: UserWithToken | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userAuthenticated: UserWithToken) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (user: UserWithToken) => {
        try {
          setCookie("auth_token", user.token, {
            domain: cookieEnvSettings.domain,
            secure: cookieEnvSettings.secure,
            sameSite: "lax",
            path: "/",
            expires: addHours(new Date(), 24),
          });
          queryClient.invalidateQueries();

          set({
            user: user,
            token: user.token,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error(error);
        }
      },
      logout: () => {
        removeCookie("auth_token", {
          domain: cookieEnvSettings.domain,
          secure: cookieEnvSettings.secure,
          sameSite: "lax",
          path: "/",
        });

        queryClient.clear();

        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      refreshToken: async () => {
        try {
          const token = getCookie("auth_token");
          const user = await isAuthorized(token!);

          set({ token: user.token });
        } catch (error) {
          console.error("Error refreshing token:", error);
          useAuthStore.getState().logout();
        }
      },
    }),
    {
      name: "auth_storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
