import { getGoal } from "@/_services/goals/getById";
import { GoalWithWeeks } from "@/_types";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "typescript-cookie";

export function useGetGoal(id: string) {
  const token = typeof window !== "undefined" ? getCookie("auth_token") : null;

  return useQuery<GoalWithWeeks | undefined, Error, GoalWithWeeks>({
    queryKey: ["goal"],
    queryFn: () => getGoal(id, token!),
    enabled: !!token,
  });
}
