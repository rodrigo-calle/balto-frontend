import { isAuthorized } from "@/_services/auth";
import { useAuthStore } from "@/_store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useValidateToken = () => {
  const { validateToken, isAuthValidated, logOut, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthValidated && user) {
      return;
    }
    const checkAuth = async () => {
      const authToken =
        typeof window !== "undefined"
          ? document.cookie.split("auth_token=")[1]?.split(";")[0]
          : null;

      if (!authToken) {
        validateToken(false);
        logOut();
        return;
      }
      const res = await isAuthorized(authToken);

      if (res.status === 200) {
        validateToken(true);
        router.push("/dashboard");
      }
    };
    checkAuth();
  }, [isAuthValidated, logOut, router, user, validateToken]);

  return { isAuthValidated };
};
