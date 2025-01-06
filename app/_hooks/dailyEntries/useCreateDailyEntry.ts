import { createDailyEntry } from "@/_services";
import { useAuthStore } from "@/_store";
import { DailyEntry, NewDailyEntry } from "@/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateDailyEntry() {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const token = user?.token;

  return useMutation<DailyEntry, Error, NewDailyEntry, unknown>({
    mutationFn: (newDailyEntry) => {
      if (!token) return Promise.reject(new Error("User not logged in"));
      return createDailyEntry(newDailyEntry, token);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dailyEntries"] });
      await queryClient.refetchQueries();
    },
    onError: (error: Error) => {
      console.error("Error creating daily entry:", error);
    },
  });
}
