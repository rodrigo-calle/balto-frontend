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
  validateToken: (val: boolean, user?: UserWithToken | null) => void;
};

export const useAuthStore = create<State & AuthStoreActions>()(
  persist(
    (set) => ({
      user: null,
      isAuthValidated: false,
      validateToken: (val: boolean, user?: UserWithToken | null) => {
        set({ isAuthValidated: val });
        set({ user: val ? user : null });
      },
      logIn: (user: UserWithToken) => {
        set({ user });
        setCookie("auth_token", user.token, {
          domain: "balto-frontend-lyart.vercel.app",
          secure: true,
          sameSite: "lax",
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
            secure: true,
            sameSite: "lax",
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
      }),
    }
  )
);
