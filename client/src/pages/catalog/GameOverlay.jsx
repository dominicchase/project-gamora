import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/Game.css";
import { ReactComponent as CloseIcon } from "../../assets/svg/x-thin.svg";
import { setCart } from "../../store/reducers/CartReducer";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";

export const GameOverlay = ({ toggleShowGame, toggleShowCart }) => {
  const dispatch = useDispatch();
  const { id } = useAuth();

  const { game } = useSelector((state) => state.gameState);
  const { cart } = useSelector((state) => state.cartState);

  const cartGame = cart?.length
    ? cart.find((cartGame) => cartGame.game._id === game._id)
    : null;

  const currQuantity = cartGame ? cartGame.quantity : 0;

  const [quantity, setQuantity] = useState(0);

  const maxQuantity = useMemo(
    () => game.numInStock - currQuantity,
    [game.numInStock, currQuantity]
  );

  const cartComplement = cart
    ? cart.filter((cartGame) => cartGame.game._id !== game._id)
    : null;

  const handleAddToCart = async () => {
    const newCartGame = { game, quantity: +quantity };

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

    setQuantity(0);
  };

  return (
    <div className="game-overlay d-flex p-5">
      <div className="col-5">
        <img className="game" src={game.image} width={"100%"} height={"100%"} />
      </div>

      <div className="game-info col p-4">
        <div className="d-flex justify-content-between">
          <h3>{game.name}</h3>

          <button
            className="bg-transparent border-0 w-25 mb-2 text-end"
            onClick={() => toggleShowGame(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <span className="d-block mb-4">${game.price}</span>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <span className="d-block mb-3">Qty: {game.numInStock}</span>

        <div className="mb-3">
          <input
            type="number"
            min={0}
            max={maxQuantity}
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
          <button
            className="success"
            onClick={handleAddToCart}
            disabled={!maxQuantity}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
