import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { setCart } from "../../../store/reducers/CartReducer";

import { ReactComponent as CloseIcon } from "../../../assets/svg/x-thin.svg";
import { ReactComponent as CartIcon } from "../../../assets/svg/cart.svg";

export const GameInfo = ({ toggleShowGame }) => {
  const { id } = useAuth();
  const dispatch = useDispatch();

  const { game } = useSelector((state) => state.gameState);
  const { cart } = useSelector((state) => state.cartState);

  const axiosPrivate = useAxiosPrivate();

  const cartGame = cart.length
    ? cart.find((cartGame) => cartGame.game._id === game._id)
    : null;

  const currQuantity = cartGame ? cartGame.quantity : 0;

  const cartComplement = cart
    ? cart.filter((cartGame) => cartGame.game._id !== game._id)
    : null;

  const maxQuantity = useMemo(
    () => game.numInStock - currQuantity,
    [game.numInStock, currQuantity]
  );

  console.log({ cart });

  const handleAddToCart = async () => {
    const newCartGame = { game, quantity: 1 };

    if (id) {
      try {
        const response = await axiosPrivate.post(
          `/cart/add-to-cart/?id=${id}`,
          [newCartGame]
        );
        toast.success("Added to cart");
        console.log(response);
        dispatch(setCart(response.data.games));
      } catch (error) {
        console.log("here");
        toast.error(error.response?.data?.message ?? "Error");
      }
    } else {
      if (cartGame) {
        dispatch(
          setCart([
            ...cartComplement,
            { ...cartGame, quantity: cartGame.quantity + newCartGame.quantity },
          ])
        );
      } else {
        dispatch(setCart([...cartComplement, newCartGame]));
      }

      toast.success("Added to cart");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>{game.name}</h3>

        <button
          className="bg-transparent border-0 mb-2 p-0"
          onClick={() => toggleShowGame(false)}
        >
          <CloseIcon />
        </button>
      </div>

      <span className="d-block mb-4">${game.price}</span>

      <p className="mb-5">{game?.description ?? ""}</p>

      <div>
        <button
          className="btn-secondary d-block mx-auto p-3 w-25"
          onClick={handleAddToCart}
          disabled={!maxQuantity}
        >
          <CartIcon width={20} height={20} />
        </button>
      </div>
    </>
  );
};
