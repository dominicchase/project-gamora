import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/admin.css";
import "../../assets/css/Game.css";
import { ReactComponent as CloseIcon } from "../../assets/svg/x-thin.svg";
import { setCart } from "../../store/reducers/CartReducer";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";

export const GameOverlay = ({ toggleShowGame, toggleShowCart }) => {
  const dispatch = useDispatch();

  const { id } = useAuth();
  const { game } = useSelector((state) => state.gameState);
  const { cart } = useSelector((state) => state.cartState);

  const cartGame = cart
    ? cart.find((cartGame) => cartGame.game._id === game._id)
    : null;

  const cartComplement = cart
    ? cart.filter((cartGame) => cartGame.game._id !== game._id)
    : null;

  const handleAddToCart = async () => {
    // TODO: modify qty later based on form amt
    const newCartGame = { game, quantity: 1 };

    if (id) {
      const response = await axiosPrivate.post(`/cart/add-to-cart/?id=${id}`, [
        newCartGame,
      ]);

      dispatch(setCart(response.data.games));
    } else {
      if (cartGame) {
        console.log(cartGame);
        dispatch(
          setCart([
            ...cartComplement,
            { ...cartGame, quantity: cartGame.quantity + newCartGame.quantity },
          ])
        );
      } else {
        dispatch(setCart([...cartComplement, newCartGame]));
      }
    }
  };

  if (!game) {
    return null;
  }

  return (
    <div className="game-overlay d-flex p-5 gap-4">
      <div className="w-50">
        <img src={game.image} width={"100%"} alt="" />
      </div>

      <div className="w-50">
        <span>{game.name}</span>

        <span className="d-block">${game.price}</span>

        <span className="d-block">Quantity</span>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <button
          onClick={handleAddToCart}
          disabled={cartGame ? cartGame.quantity === game.numInStock : false}
        >
          Add to Cart
        </button>

        <button onClick={() => toggleShowGame(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
