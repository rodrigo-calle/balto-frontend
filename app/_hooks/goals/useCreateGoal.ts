import { createGoal } from "@/_services";
import { Goal, NewGoal } from "@/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateGoal() {
  const queryClient = useQueryClient();

  return useMutation<Goal, Error, NewGoal, unknown>({
    mutationFn: (newGoal) => createGoal(newGoal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (error: Error) => {
      console.error("Error creating goal:", error);
    },
  });
}
