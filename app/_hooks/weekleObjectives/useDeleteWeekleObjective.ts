import { deleteWeekleObjective } from "@/_services";
import { useAuthStore } from "@/_store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteWeekleObjective() {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const token = user?.token;

  return useMutation<void, Error, string, unknown>({
    mutationFn: (weekleObjectiveId) => {
      if (!token) return Promise.reject(new Error("User not logged in"));
      return deleteWeekleObjective(weekleObjectiveId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weekleObjectives"] });
    },
    onError: (error: Error) => {
      console.error("Error deleting weekle objective:", error);
    },
  });
}
