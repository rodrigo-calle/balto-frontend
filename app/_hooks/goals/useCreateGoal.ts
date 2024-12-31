import { createGoal } from "@/_services";
import { Goal, NewGoal } from "@/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateGoal() {
  const queryClient = useQueryClient();

  return useMutation<
    Goal,
    Error,
    {
      goal: NewGoal;
      userToken: string;
    },
    unknown
  >({
    mutationFn: (newGoal) => createGoal(newGoal.goal, newGoal.userToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (error: Error) => {
      console.error("Error creating goal:", error);
    },
  });
}
