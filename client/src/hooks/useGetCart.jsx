import { useEffect } from "react";
import { useAxiosPrivate } from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { setCart } from "../store/reducers/CartReducer";
import { useDispatch } from "react-redux";

export const useGetCart = () => {
  const dispatch = useDispatch();
  const { id } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getCart = async () => {
      const response = await axiosPrivate.get(`/cart?id=${id}`);

      dispatch(setCart(response.data));
    };

    if (id) {
      getCart();
    }
  }, [id]);
};
