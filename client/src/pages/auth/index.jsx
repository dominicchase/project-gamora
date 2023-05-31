import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/reducers/CartReducer";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { Register } from "./Register";
import { Login } from "./Login";

export const Auth = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [isNewUser, toggleIsNewUser] = useState(false);
  const { cart } = useSelector((state) => state.cartState);

  const syncCart = async (id) => {
    let response;

    if (cart.length) {
      try {
        response = await axiosPrivate.post(`/cart/add-to-cart/?id=${id}`, cart);
      } catch {
        response = await axiosPrivate.get(`/cart/?id=${id}`);
      }
    } else {
      response = await axiosPrivate.get(`/cart/?id=${id}`);
    }
    dispatch(setCart(response.data.games ?? []));
  };

  return isNewUser ? (
    <Register toggleIsNewUser={toggleIsNewUser} syncCart={syncCart} />
  ) : (
    <Login toggleIsNewUser={toggleIsNewUser} syncCart={syncCart} />
  );
};
