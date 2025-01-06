import { updateWeekleObjective } from "@/_services";
import { useAuthStore } from "@/_store";
import { UpdateWeekleObjective, WeekleObjective } from "@/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateWeekleObjective() {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const token = user?.token;

  return useMutation<
    WeekleObjective,
    Error,
    {
      weekleObjective: UpdateWeekleObjective;
      weekleObjectiveId: string;
    },
    unknown
  >({
    mutationFn: ({ weekleObjective, weekleObjectiveId }) => {
      if (!token) return Promise.reject(new Error("User not logged in"));
      return updateWeekleObjective(weekleObjectiveId, weekleObjective, token);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["weekleObjectives"] });
      await queryClient.refetchQueries();
    },
    onError: (error: Error) => {
      console.error("Error updating weekle objective:", error);
    },
  });
}
