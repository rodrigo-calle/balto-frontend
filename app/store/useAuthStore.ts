import { UserWithToken } from "@/_types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type State = {
  user: UserWithToken | null;
};

export type AuthStoreActions = {
  logIn: (user: UserWithToken) => void;
  logOut: () => void;
};

export const useAuthStore = create<State & AuthStoreActions>()(
  persist<State & AuthStoreActions>(
    (set) => ({
      user: null,
      logIn: (user: UserWithToken) => {
        set({ user });
      },
      logOut: () => {
        set({ user: null });
      },
    }),
    {
      name: "auth",
    }
  )
);
