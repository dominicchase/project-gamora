import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import { useRefreshToken } from "./useRefreshToken";

export const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const request = error?.config;

        if (error?.response?.status === 403 && !request?.sent) {
          request.sent = true;
          const newAccessToken = await refresh();

          request.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosPrivate(request);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};
