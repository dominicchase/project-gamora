import { useEffect } from "react";
import { useAxiosPrivate } from "./useAxiosPrivate";
import useAuth from "./useAuth";

export const useGetUser = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUser = async () => {
      axiosPrivate.get("/user");
    };

    if (auth?.id) {
      getUser();
    }
  }, []);
};
