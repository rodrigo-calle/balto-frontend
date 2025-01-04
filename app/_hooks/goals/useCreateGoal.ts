import { createGoal } from "@/_services";
import { Goal, NewGoal } from "@/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "typescript-cookie";

export function useCreateGoal() {
  const queryClient = useQueryClient();
  const token = typeof window !== "undefined" ? getCookie("auth_token") : null;
  return useMutation<
    Goal,
    Error,
    {
      goal: NewGoal;
    },
    unknown
  >({
    mutationFn: (newGoal) => createGoal(newGoal.goal, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (error: Error) => {
      console.error("Error creating goal:", error);
    },
  });
}
