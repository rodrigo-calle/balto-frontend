"use client";
import { UserWithToken } from "@/_types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setCookie, removeCookie, getCookie } from "typescript-cookie";
import { addHours } from "date-fns";

export type State = {
  user: UserWithToken | null;
  isAuthValidated: boolean;
};

export type AuthStoreActions = {
  logIn: (user: UserWithToken) => void;
  logOut: () => void;
  validateToken: (val: boolean) => void;
};

export const useAuthStore = create<State & AuthStoreActions>()(
  persist(
    (set) => ({
      user: null,
      isAuthValidated: false,
      validateToken: (val: boolean) => {
        set({ isAuthValidated: val });
      },
      logIn: (user: UserWithToken) => {
        set({ user });
        setCookie("auth_token", user.token, {
          domain: "balto-frontend-lyart.vercel.app",
          sameSite: "lax",
          secure: true,
          path: "/",
          expires: addHours(new Date(), 24),
        });
      },

      logOut: () => {
        set({ user: null });
        set({ isAuthValidated: false });
        const token = getCookie("auth_token");
        if (token) {
          removeCookie("auth_token", {
            domain: "balto-frontend-lyart.vercel.app",
            sameSite: "lax",
            secure: true,
            path: "/",
          });
        }
      },
    }),
    {
      name: "auth_token",
      partialize: (state) => ({
        user: state.user,
        isAuthValidated: state.isAuthValidated,
        logIn: state.logIn,
        logOut: state.logOut,
      }),
    }
  )
);
