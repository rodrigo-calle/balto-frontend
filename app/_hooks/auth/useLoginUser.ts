import { loginUser } from "@/_services/auth";
import { UserWithToken } from "@/_types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLoginUser() {
  const queryClient = useQueryClient();
  return useMutation<
    UserWithToken,
    Error,
    { email: string; password: string },
    unknown
  >({
    mutationFn: (user) => loginUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: Error) => {
      console.error("Error logging in user:", error);
    },
  });
}
