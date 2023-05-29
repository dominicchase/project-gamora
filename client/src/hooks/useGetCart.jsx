import { useEffect } from "react";
import { useAxiosPrivate } from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { setCart } from "../store/reducers/CartReducer";
import { useDispatch, useSelector } from "react-redux";

export const useGetCart = () => {
  const dispatch = useDispatch();
  const { id } = useAuth();
  const { cart } = useSelector((state) => state.cartState);
  const axiosPrivate = useAxiosPrivate();

  //   console.log(cart);

  useEffect(() => {
    const getCart = async () => {
      const response = await axiosPrivate.get(`/cart?id=${id}`);

      dispatch(setCart(response.data));

      //   console.log(response.data);
    };

    if (id) {
      getCart();
    }
  }, [id]);
};
