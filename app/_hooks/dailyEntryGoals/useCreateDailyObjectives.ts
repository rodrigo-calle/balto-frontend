import { createDailyEntryGoals } from "@/_services/dailyEntryGoals";
import { useAuthStore } from "@/_store";
import { DailyEntryObjectives, NewDailyEntryGoal } from "@/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateDailyObjectives() {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const token = user?.token;

  return useMutation<DailyEntryObjectives, Error, NewDailyEntryGoal, unknown>({
    mutationFn: (newDailyEntryGoal) => {
      if (!token) return Promise.reject(new Error("User not logged in"));
      return createDailyEntryGoals(newDailyEntryGoal, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyEntryGoals"] });
    },
    onError: (error: Error) => {
      console.error("Error creating daily entry:", error);
    },
  });
}
