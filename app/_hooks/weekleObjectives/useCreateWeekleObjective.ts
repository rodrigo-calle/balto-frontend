import { createWeekleObjectives } from "@/_services";
import { useAuthStore } from "@/_store";
import { NewWeekleObjective, WeekleObjective } from "@/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateWeekleObjective() {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const token = user?.token;

  return useMutation<WeekleObjective, Error, NewWeekleObjective, unknown>({
    mutationFn: (newWeekleObjective) => {
      if (!token) return Promise.reject(new Error("User not logged in"));
      return createWeekleObjectives(newWeekleObjective, token);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["weekleObjectives"] });
      await queryClient.refetchQueries();
    },
    onError: (error: Error) => {
      console.error("Error creating weekle objective:", error);
    },
  });
}
