import { UserWithToken } from "@/_types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setCookie, removeCookie } from "typescript-cookie";
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
          domain: "localhost",
          sameSite: "lax",
          secure: false,
          path: "/",
          expires: addHours(new Date(), 24),
        });
      },
      logOut: () => {
        set({ user: null });
        set({ isAuthValidated: false });
        removeCookie("auth_token", {
          domain: "localhost",
          sameSite: "lax",
          secure: false,
          path: "/",
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthValidated: state.isAuthValidated,
      }),
    }
  )
);
