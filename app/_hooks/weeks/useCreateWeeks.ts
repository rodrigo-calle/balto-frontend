import { createWeek } from "@/_services";
import { Week, NewWeek } from "@/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateWeeks() {
  const queryClient = useQueryClient();

  return useMutation<Week, Error, NewWeek, unknown>({
    mutationFn: (newWeek) => createWeek(newWeek),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["weeks"] });
      await queryClient.refetchQueries();
    },
    onError: (error: Error) => {
      console.error("Error creating week:", error);
    },
  });
}
