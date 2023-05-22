import React, { useReducer } from "react";

import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/user";

import { login } from "./api/POST.api";

export const Auth = () => {
  const dispatch = useDispatch();

  const [userState, userDispatch] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      email: "",
      password: "",
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    login(userState)
      .then((res) => res.json())
      .then((data) => dispatch(setUser(data)));
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>Email</label>
        <input
          type="text"
          onChange={(event) =>
            userDispatch({ ...userState, email: event.target.value })
          }
        />
      </fieldset>

      <fieldset>
        <label>Password</label>
        <input
          type="text"
          onChange={(event) =>
            userDispatch({ ...userState, password: event.target.value })
          }
        />
      </fieldset>

      <button type="submit">Login</button>
    </form>
  );
};
