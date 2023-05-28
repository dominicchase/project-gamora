import React, { useReducer, useState } from "react";

import { login } from "../../api/auth/POST.api";
import { getToken, setToken } from "../../utils/token";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

export const Auth = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { state } = useLocation();
  const [userState, userDispatch] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      email: "",
      password: "",
    }
  );
  const [newUser, toggleNewUser] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();

    console.log("registering user");
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await axios.post("/user/login", userState, {
      withCredentials: true,
    });

    console.log(response.data.isAdmin);

    await setAuth({
      accessToken: response.data.accessToken,
      ...(response.data.isAdmin && { isAdmin: response.data.isAdmin }),
    });

    navigate("/");
  };

  return newUser ? (
    <form>
      <fieldset className="mb-3">
        <label className="d-block mb-2">Email</label>
        <input type="text" />
      </fieldset>

      <fieldset className="mb-3">
        <label className="d-block mb-2">Password</label>
        <input type="text" />
      </fieldset>

      <fieldset className="mb-3">
        <label className="d-block mb-2">Re-enter password</label>
        <input type="text" />
      </fieldset>

      <button onClick={handleRegister}>Register</button>

      <span>Already have an account?</span>

      <button onClick={() => toggleNewUser((prevState) => !prevState)}>
        Sign in
      </button>
    </form>
  ) : (
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

      <span className="d-block">New to Game Garaj?</span>

      <button onClick={() => toggleNewUser((prevState) => !prevState)}>
        Register
      </button>
    </form>
  );
};
