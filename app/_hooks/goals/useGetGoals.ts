import { getGoals } from "@/_services";
import { Goal } from "@/_types";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "typescript-cookie";

export function useGetGoals() {
  const token = typeof window !== "undefined" ? getCookie("auth_token") : null;

  return useQuery<Goal[], Error, Goal[]>({
    queryKey: ["goals"],
    queryFn: () => getGoals(token!),
    enabled: !!token,
  });
}
