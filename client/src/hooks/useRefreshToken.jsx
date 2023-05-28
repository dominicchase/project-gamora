import axios from "../api/axios";
import useAuth from "./useAuth";

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/user/refresh", {
      withCredentials: true,
    });

    setAuth((prevState) => {
      return {
        ...prevState,
        accessToken: response.data.accessToken,
        ...(response.data.isAdmin && { isAdmin: response.data.isAdmin }),
      };
    });

    return response.data.accessToken;
  };

  return refresh;
};
