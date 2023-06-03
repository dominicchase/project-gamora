import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
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
        toast.success("Added to cart");
      } catch (error) {
        response = await axiosPrivate.get(`/cart/?id=${id}`);
        toast.error(error.response.data.error);
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
