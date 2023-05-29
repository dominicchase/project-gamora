import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);

  return { auth, setAuth, id: auth.id };
};

export default useAuth;
