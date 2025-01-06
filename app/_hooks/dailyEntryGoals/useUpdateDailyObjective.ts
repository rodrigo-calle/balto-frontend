import { updateDailyEntryGoals } from "@/_services/dailyEntryGoals";
import { useAuthStore } from "@/_store";
import { DailyEntryObjectives, UpdateDailyEntryGoal } from "@/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateDailyObjective() {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const token = user?.token;

  return useMutation<
    DailyEntryObjectives,
    Error,
    { id: string; dailyEntryGoals: UpdateDailyEntryGoal },
    unknown
  >({
    mutationFn: ({ id, dailyEntryGoals }) => {
      if (!token) return Promise.reject(new Error("User not logged in"));
      return updateDailyEntryGoals(id, dailyEntryGoals, token);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dailyEntryGoals"] });
      await queryClient.refetchQueries();
    },
    onError: (error: Error) => {
      console.error("Error updating daily entry:", error);
    },
  });
}
