import React, { useReducer, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/reducers/CartReducer";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";

export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { state } = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [userState, userDispatch] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      email: "",
      password: "",
    }
  );
  const [newUser, toggleNewUser] = useState(false);
  const { cart } = useSelector((state) => state.cartState);

  const handleRegister = (event) => {
    event.preventDefault();

    console.log("registering user");
  };

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

    navigate(state.from);
  };

  const syncCart = async (id) => {
    let response;

    if (cart.length) {
      response = await axiosPrivate.post(`/cart/create/?id=${id}`, cart);
    } else {
      response = await axiosPrivate.get(`/cart/?id=${id}`);
    }

    dispatch(setCart(response.data.games));
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
