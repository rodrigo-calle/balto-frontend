import { getGoal } from "@/_services/goals/getById";
import { GoalWithWeeks } from "@/_types";
import { useQuery } from "@tanstack/react-query";

export function useGetGoal(token: string, id: string) {
  return useQuery<GoalWithWeeks | undefined, Error, GoalWithWeeks>({
    queryKey: ["goal"],
    queryFn: () => getGoal(id, token),
  });
}
