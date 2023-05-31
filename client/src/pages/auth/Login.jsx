import { useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const initialState = {
  email: "",
  password: "",
};

export const Login = ({ toggleIsNewUser, syncCart }) => {
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
    <form className="" onSubmit={handleLogin}>
      <fieldset>
        <label className="text-muted">Email</label>

        <input
          type="text"
          onChange={(event) =>
            userDispatch({ ...userState, email: event.target.value })
          }
        />
      </fieldset>

      <fieldset>
        <label className="text-muted">Password</label>

        <input
          type="text"
          onChange={(event) =>
            userDispatch({ ...userState, password: event.target.value })
          }
        />
      </fieldset>

      <button type="submit">Login</button>

      <span className="d-block">New to Gamora.games?</span>

      <button
        type="button"
        onClick={() => toggleIsNewUser((prevState) => !prevState)}
      >
        Register
      </button>
    </form>
  );
};
