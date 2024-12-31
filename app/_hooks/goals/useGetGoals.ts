import { getGoals } from "@/_services";
import { Goal } from "@/_types";
import { useQuery } from "@tanstack/react-query";

export function useGetGoals(token: string) {
  return useQuery<Goal[], Error, Goal[]>({
    queryKey: ["goals"],
    queryFn: () => getGoals(token),
  });
}
