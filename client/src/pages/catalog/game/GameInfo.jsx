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

  const cartGame = cart?.length
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

  const handleAddToCart = async () => {
    const newCartGame = { game, quantity: 1 };

    if (id) {
      try {
        const response = await axiosPrivate.post(
          `/cart/add-to-cart/?id=${id}`,
          [newCartGame]
        );

        toast.success("Added to cart");

        dispatch(setCart(response.data.games));
      } catch (error) {
        toast.error(error);
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

  const description =
    "Persona 5 is a fantasy based on reality which follows a group of troubled high school students: the protagonist and a collection of compatriots he meets along the way. All having lost their place to belong in a broken world, these troubled teenagers gradually realize that they are living in a toxic and dangerous society resembling a prison full of slavery, oppression and injustice, ruled by corrupted and twisted adults. They can't live with the system and can't live without it, and simply existing means they are at risk of being doomed and condemned to a life of slavery.";

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

      <p className="mb-5">{description}</p>

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
