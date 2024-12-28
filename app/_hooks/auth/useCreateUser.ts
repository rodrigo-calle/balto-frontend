import { createUser } from "@/_services/auth";
import { NewUser, UserWithToken } from "@/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation<UserWithToken, Error, NewUser, unknown>({
    mutationFn: (newUser) => createUser(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: Error) => {
      console.error("Error creating user:", error);
    },
  });
}
