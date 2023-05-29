import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useRefreshToken } from "./useRefreshToken";

export const useIsAuthenticated = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  const [isLoading, toggleIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const isAuthenticated = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        toggleIsLoading(false);
      }
    };

    !auth?.accessToken ? isAuthenticated() : toggleIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return { isLoading };
};
