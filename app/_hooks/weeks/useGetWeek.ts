import { getWeek } from "@/_services/week/getWeek";
import { Week } from "@/_types";
import { useQuery } from "@tanstack/react-query";

export function useGetWeek(token: string, id: string) {
  return useQuery<Week | undefined, Error, Week>({
    queryKey: ["week"],
    queryFn: () => getWeek(id, token),
  });
}
