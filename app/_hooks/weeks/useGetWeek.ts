import { getWeek } from "@/_services/week/getWeek";
import { useAuthStore } from "@/_store";
import { Week } from "@/_types";
import { useQuery } from "@tanstack/react-query";

export function useGetWeek(id: string) {
  const user = useAuthStore((state) => state.user);
  const token = user?.token;

  return useQuery<Week | undefined, Error, Week>({
    queryKey: ["week"],
    queryFn: () => getWeek(id, token!),
    enabled: !!token,
  });
}
