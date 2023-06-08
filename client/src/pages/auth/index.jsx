import { useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const initialState = {
  email: "",
  password: "",
};

export const Auth = ({ toggleIsNewUser, syncCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { setAuth } = useAuth();

  const [userState, userDispatch] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    initialState
  );

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await axios.post("/user/login", userState, {
      withCredentials: true,
    });

    await setAuth({
      id: response.data.id,
      accessToken: response.data.accessToken,
      ...(response.data.isAdmin && { isAdmin: response.data.isAdmin }),
    });

    syncCart(response.data.id);

    navigate(state?.from ?? "/");
  };

  return (
    <form onSubmit={handleLogin}>
      <fieldset>
        <input
          className="d-block mx-auto mb-4"
          onChange={(event) =>
            userDispatch({ ...userState, email: event.target.value })
          }
          type="text"
          placeholder="Email"
        />
      </fieldset>

      <fieldset className="mb-5">
        <input
          className="d-block mx-auto"
          onChange={(event) =>
            userDispatch({ ...userState, password: event.target.value })
          }
          type="password"
          placeholder="Password"
        />
      </fieldset>

      <button type="submit" className="d-block btn-secondary mx-auto mb-3">
        Login
      </button>

      <div className="text-center">
        <span>New to Gamora?</span>

        <button
          className="btn-no-bg"
          onClick={() =>
            navigate("/auth/register", { state: { from: location.pathname } })
          }
          type="button"
        >
          Register
        </button>
      </div>
    </form>
  );
};
